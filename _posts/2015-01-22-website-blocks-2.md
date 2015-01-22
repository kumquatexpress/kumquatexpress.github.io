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

[WIP]

<div class="thumbnail" style="text-align:center;">
	<strong>State of the site - 2013</strong>
	<p>Server(Hardware) - DigitalOcean VPS <br/>
	Server(Software) - Apache <br/>
	Frontend Framework - KineticJS, HTML5</p>
</div>