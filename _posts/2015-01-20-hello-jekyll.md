---
layout: post
title: Hello Jekyll
category: Frameworks
summary: A brief overview of how I set up Jekyll as my templating engine.
---

I finally started using Jeykll as a templating engine and static generator for these blog pages. The setup was extremely brief, and the [Jeykll documentation](http://jekyllrb.com/docs/home/) contains all of the useful configuration metadata and links to plugins. For my current blog, I'm using the generate-categories plugin from [Recursive Design](http://recursive-design.com/projects/jekyll-plugins/). The plugins are ruby modules that extend Jekyll's existing classes; they can access the same global variables as the templates and help to populate and iterate over other fields.

Along the way, I ran into some minor troubles with naming conventions and accessing global variables, but these were cleared up quickly by reading the docs and following [this very simple Jekyll skeleton](https://github.com/maciakl/Sample-Jekyll-Site).