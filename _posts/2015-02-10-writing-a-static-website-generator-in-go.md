---
layout: post
title: Writing a Static Website Generator in Golang
category: Software
summary: How I designed the architecture and began to write Vroom
---

After porting my website over to Github Pages and using the [Jekyll](http://jekyll.com) engine for generating blog posts, I thought it would be a cool idea to write my own static website and blog engine, only this time in [Golang](http://golang.org). I had prior experience with Go during the summer of 2014 as an intern at [Edmodo](http://edmodo.com), where I redesigned the profile picture API and frontend. First, a few notes about Go. Go is awesome for writing production apps due to its type safety and great compile-time error checks. It also has a simple but powerful interface to concurrency and is [blazingly fast](http://benchmarksgame.alioth.debian.org/u64q/go.html). Some people regard Go as the possible replacement language for C. While Go is somewhat object-oriented, it has no real definition for classes and is like C in that structs hold collections of fields and functions. It differs from C with builtin garbage collection and memory management as well as being strongly typed. Now we move onto the actual process of designing the generator, which I cheekily titled [Vroom](http://github.com/kumquatexpress/Vroom).

Go has many useful packages in its standard library, one of which deals with [templating](http://godoc.org/pkg/text/template). In the same way that Jekyll uses the Liquid templating engine by default, I decided that Vroom would use this default templating to render layouts. I planned to have three distinct services as part of Vroom: a **metadata reader**, which would take in JSON data and incorporate it as an options struct, the **layout and content parser**, which took in the combined templates and read through them to compile the finished pages, and finally the **renderer**, which would take the finished templates and execute them by writing into the final build directory. I'll cover each of these services in detail, some more than others.


####Building a directory tree
The very first step was to build a directory tree common to all three services. This tree begins at a user-specified *pages* directory, which contains all of the content and represents the structure of the final website. *GetPagesDirectoryTree()* uses the [filepath](http://godoc.org/pkg/path/filepath) library to walk all files and create a map of directory name to a struct containing information about the files in the directory. 

{% highlight go %}
type DirTree struct {
	FileTemplates []FileTemplate
	Data          map[string]interface{}
}

func GetPagesDirectoryTree(vo *VroomOpts) map[string]DirTree {
	...
	// Look for files in pages
	dirTreeMap := make(map[string]DirTree)
	filepath.Walk("./", func(path string, info os.FileInfo, err error) error {
		...
		if isCorrectExtension(info) {
			dir, fn := filepath.Split(path)
			if existing, ok := dirTreeMap[dir]; ok {
				existing.FileTemplates = append(existing.FileTemplates,
					FileTemplate{Filename: fn})
				dirTreeMap[dir] = existing
			} else {
				dirTreeMap[dir] = DirTree{FileTemplates: []FileTemplate{FileTemplate{Filename: fn}}}
			}
		}
		return nil
	})
	return dirTreeMap
}
{% endhighlight %}

####Metadata
Coming up with a safe, generic way to look through the directory structure for metadata was one of the most complicated parts of building Vroom. Because Go does not support generics, I had to rely heavily on casting the *interface{}* class into usable types in my options and data map. The metadata parser goes through the directory structure and looks for \*.vroom.json files, which are then parsed into the type *map[string]interface{}* via the [json](http://godoc.org/pkg/encoding/json) package. Data is tracked at the directory level, which means that each directory of files has a unique map associated with it. Files in the child directory take precedence over files located in the parent directory. 

All of the data collection was accomplished through the *GetTreeWithMetadata()* function, which recursively calls *buildMetadata()*. Go, while having an expansive library of data structures, does not have the builtin utility functions found in other languages, so I had to write my own merge function for maps.

{% highlight go %}
func GetTreeWithMetadata(tree map[string]DirTree, vo *VroomOpts) map[string]DirTree {
	for dir, t := range tree {
		t.Data = buildMetadata(filepath.Join(vo.PagesDirectory, dir), make(map[string]interface{}))
		tree[dir] = t
	}
	return tree
}

func buildMetadata(path string, accumulator map[string]interface{}) map[string]interface{} {
	parent := filepath.Dir(path)
	data := utils.MergeMap(extractDataFromDirectory(path), accumulator)
	if parent == "." { // empty path, base case
		return data
	}
	return buildMetadata(parent, data)
}

func extractDataFromDirectory(path string) map[string]interface{} {
	files, err := filepath.Glob(filepath.Join(path, "*.vroom.json"))
		...
	for _, f := range files {
		buf, err := ioutil.ReadFile(f)
		if err != nil {
			logger.Warn(err.Error())
		} else {
			err = json.Unmarshal(buf, &data)
				...
		}
	}
		...
	return data.(map[string]interface{})
}
{% endhighlight %}


####Layout/Content Parser
By using the directory tree structure we built before, parsing the layouts and the content files for the site became almost trivial. There was one roadblock of note -- in the Go template package, each template is named in a *{{ define [name] }}*, either explicitly or by default, the name of the file. No directory structure was included in naming the templates. This meant that for some folder posts, both posts/index.vroom.html and posts/golang/index.vroom.html would have the same template name, which would lead to a conflict and subsequent error during rendering. To combat this problem, I associated all of the layout templates with each of the content files during parsing. So while the metadata service was associated per-directory, the content would be done file by file in *MakeAndParsePageTemplates*.

{% highlight go %}
func MakeAndParsePageTemplates(dirTreeMap map[string]DirTree,
	layouts []string, vo *VroomOpts) map[string]DirTree {
		...
	for dir, tree := range dirTreeMap {
		for idx, ft := range tree.FileTemplates {
			_filepaths := append(layouts, filepath.Join(vo.PagesDirectory, dir, ft.Filename))
			temp, err := template.ParseFiles(_filepaths...)
				...
			ft.Template = temp
			tree.FileTemplates[idx] = ft
		}
		dirTreeMap[dir] = tree
	}
	return dirTreeMap
}
{% endhighlight %}

####Renderer
Rendering the content and templates into a the real static site was the easiest of the functions to write. Because I had the directory and template information stored in map form already, I only needed a single iteration through the map, calling ExecuteTemplate on each file (the template associations and parsing had all been completed at this point).

{% highlight go %}
func generateAndWriteFiles(pagesMap map[string]helpers.DirTree,
	vo *helpers.VroomOpts) {
		...
	for dir, tree := range pagesMap {
		dirData := utils.MergeMap(vo.Metadata, tree.Data)

		for _, ft := range tree.FileTemplates {
			_builddir = filepath.Join(vo.BuildDirectory, dir)
			_filepath = filepath.Join(_builddir, ft.Filename)
				...
			ft.Template.ExecuteTemplate(file, ft.Filename, dirData)
		}
	}
}
{% endhighlight %}

####Conclusions
Vroom works pretty well as a standalone binary, but it isn't anywhere as full-fledged as Jekyll is right now. There's no support for plugins or for highly nested templates with content interspersed from multiple pages. I'm going to continue working on the project, but for the product of a few days' work I'm pretty happy with the outcome.
