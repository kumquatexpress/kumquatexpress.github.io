---
layout: post
title: Website Building Blocks - Part 2
categories:
- Design
- Meta
summary: The second iteration of this website from Summer 2013.
---

In the summer of 2013, I was interning as a software engineer at [Ooyala](http://ooyala.com). My team was responsible for site reliability, and so the work that I did mostly revolved around OS images, the PXE boot process, and managing (through software) our baremetal clusters in the data center. I write in more detail about the actual experience [here](/).

Because most of my time was spent working with low-level systems, I decided to round out my learning by focusing in detail on the website's frontend. This would involve a complete rewrite of all the content, including moving off of Drupal and switching from AWS to [DigitalOcean](http://digitalocean.com). The hardware migration was mostly influenced by DigitalOcean's lower monthly pricing and its easier setup process with prepared base images. I wasn't using the capabilities of Amazon and my small static website was never going to need all of the customizability that came with the VM, so I opted for a fast-booting SSD and easy DNS setup instead.

Now for the fun part. When I was deciding how to best revamp the site's frontend, I wanted to showcase newer technologies in a big way. During the year at school I'd picked up a lot of web scraping and backend development, so I thought some of these skills would aid me in implementing a cool and newfangled frontend framework. I knew that the page would be mostly a portfolio and that it would be one single landing page, so my choice was ultimately to use some newer HTML5 technologies and the KineticJS javascript library. 

The most important design decision I made here was to draw the entire page on a canvas element. This would turn out to be an enormous mistake later on, but I didn't realize it at the time. I also wanted the page to be responsive and fluid, so I decided to write the following without knowing how expensive it would be:

```js
//instantiate kineticJS
kineticGlobal.create($(document).width(), $(document).height());

//redraws all canvases to be correct size
$(window).load(function(){
	update_and_redraw();
});

update_and_redraw = function(){
	update_global_sizes();

	var winWidth = width;
	var winHeight = height;
	kineticGlobal.draw(winWidth, winHeight);
	kineticGlobal.setListeners();
}
```
I thought that resizing the window and redrawing the entire page on every window resize event would be the safest way to ensure that my page was always correctly displayed. I didn't anticipate that window.resize events occur many, many times when dragging a window, and at this point in time I still didn't know what debouncing a request was. 

<div class="thumbnail" style="text-align:center;">
	<strong>State of the site - 2013</strong>
	<p>Server(Hardware) - DigitalOcean VPS <br/>
	Server(Software) - Apache <br/>
	Frontend Framework - KineticJS, HTML5</p>
</div>