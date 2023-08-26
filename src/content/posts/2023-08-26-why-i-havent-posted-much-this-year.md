---
title: "Why I haven't posted much this year"
date: 2023-08-26 18:39:00 +0000
layout: post
categories:
- php
- laravel
comments: true
---

If you regularly read this blog, you may have noticed that I haven't posted much this year. There's a reason for this - a lot of my spare time has been taken up working on a new personal project, which has just gone live.

One issue in particular that has been bugging me for a long time is misinformation about application performance, particularly when relating to Laravel. If you visit many PHP or web development-related communities, such as the PHP subreddit, it's quite common for inexperienced developers to post questions along the lines of "What is the fastest framework?". A lot of barely-more experienced commenters will then leap in with ill-informed comments about which frameworks are supposedly slower or faster, based on benchmarks. In actual fact, the idea of a framework being faster or slower really doesn't make sense - a framework isn't an application, the way something like WordPress is, and to compare the same "Hello world" application implemented in different frameworks gives a really poor idea of what the real reasons for poor application performance are. The actual causes of a slow application are nearly always something that isn't framework specific, and rewriting a working application into a supposedly "faster" framework won't generally resolve the issue.

And that, in a nutshell, is why I've created [High Performance Laravel](https://highperformancelaravel.com/). It's intended to be a repository of articles that will explain the following:

* Common performance myths relating to Laravel and PHP
* How to measure performance
* The actual bottlenecks likely to occur in your application
* How to optimise your application

A lot of this isn't *necessarily* specific either to Laravel or PHP, but it's written from the perspective of a Laravel developer. As such, if you work with a different framework or language, you still might find plenty of useful content there.
