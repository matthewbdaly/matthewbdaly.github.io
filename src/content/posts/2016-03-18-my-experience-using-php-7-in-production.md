---
title: "My experience using PHP 7 in production"
date: 2016-03-18 19:42:37 +0000
categories:
- php
- php7
- laravel
comments: true
---

In the last couple of weeks I've been working on a PHP web app. Nothing unusual there, except this was the first time we'd used PHP 7 in production. We discussed the possibility a while back, and eventually decided that for certain projects we'd use PHP 7 without waiting another year or so (or maybe longer) for a version of Debian stable with it by default. I wanted to talk about how our experience has been using it in production.

Background
----------

We've never really had a fixed stack that we work with at work before until recently - it was largely based on personal preferences and experience. For many jobs, especially content-based sites, we generally used WordPress - it has its issues, but it does fine for a lot of work. For more complex websites, I tended to use CodeIgniter because I'd learned it during my previous job and knew it fairly well, but I was not terribly happy with it - it's a bit too basic and simplistic, as well as being somewhat behind the times, and I only really kept using it through inertia. For mobile app backends, I tended to use Django, partly for the admin interface, and partly because Django REST Framework makes it easy to build a REST API quickly and easily in a way that wasn't viable with CodeIgniter.

This state of affairs couldn't really continue. I love Python and Django, but I was the only one at work who had ever used Python, so in the event I got hit by a bus there would have been no-one who could have taken over from me. As for CodeIgniter, it was clearly falling further and further behind the curve, and I was sick of it and looking to replace it. Ideally we needed a PHP framework as both myself and my colleague knew it.

I'd also been playing around with Laravel on a few little projects, but I didn't get the chance to use it for a new web app until autumn last year. Around the same time, we hired a third developer, who also had some experience using Laravel. In addition, the presence of Lumen meant that we could use that for smaller apps or services that were too small to use Laravel. We therefore decided to adopt Laravel as our default framework - in future we'd only use something else if there was a particular justification for it. I was rather sad to have to abandon Django for work, but pleased to have something more modern than CodeIgniter for PHP projects.

This also enabled us to standardise our new server builds. Over the last year or so I've been pushing to automate what we can of our server setup using Ansible. We now have two standard stacks that we plan to use for future projects. One is for WordPress sites and consists of:

* Debian stable
* Apache
* MySQL
* PHP 5.6
* Memcached
* Varnish

The other is for Laravel or Lumen web apps or APIs and consists of:

* Debian stable
* Nginx
* PHP 7
* PostgreSQL
* Redis

It took some time to decide what we wanted to settle on, and indeed we had a mobile app backend that went up around Christmas time that we wrote with Laravel, but deployed to Apache with PHP 5.6 because when we first pushed it up PHP 7 wasn't out yet. However, given that Laravel 5 already had good support for PHP 7, we decided we'd consider it for the next app. I tend to use PostgreSQL rather than MySQL these days because it has a lot of nifty features like JSON fields and full text search, and using an ORM minimises the learning curve in switching, and Redis is much more versatile than Memcached, so they were vital parts of our stack.

Our first PHP 7 app
-------------------

As it happened, we had a Laravel app in the pipeline that was ideal. In the summer of last year, we were hired to make an existing site responsive. In the end, it turned out not to be viable - it was built with Zend Framework, which none of us had ever touched before, and the front end used a lot of custom widgets and fields tied together with RequireJS. The whole thing was rather unwieldy and extremely difficult to maintain and develop. In the end, we decided to tell the client it wasn't worth developing further and offer to rewrite the whole thing from scratch using Laravel and AngularJS, with Browserify used to handle JavaScript modules - the basic idea was quite simple, it was just the implementation that was overly complex, and AngularJS made it possible to do the same kind of thing with a fraction of the code, so a rewrite in only a few weeks was perfectly viable.

I'd already built a simple prototype to demonstrate the viability of a from-scratch rewrite using Laravel and Angular, and once the client had agreed to the rewrite, we were able to work on this further. As the web app was going to be particularly useful on mobile devices, I wanted to ensure that the performance was as good as I could possibly make it. By the time we were looking at deploying it to a server, three months had passed since PHP 7 had been first released, and I figured that was long enough for the most serious issues to be resolved, and we could definitely do with the very significant speed boost we'd get from using PHP 7 for this app.

I use Jenkins to run my unit tests, and so I decided to try installing PHP 7 on the Jenkins server and using that to run the tests. The results were encouraging - nothing broke as a result of the switch. So we therefore decided that when we deployed it, we'd try it with PHP 7, and if it failed, we'd switch to PHP 5.6.

I opted to use FPM with Nginx rather than Apache and `mod_php` as since the web app was purely custom we didn't really need things like `.htaccess`, and while the amount of static content was limited, Nginx might well perform better for this use case. The results are fairly encouraging - the document for the home page is typically being returned in under 40ms, with the uncached homepage taking around 1.5s in total to load, despite having to load several external fonts. In its current state, the web app scores a solid 93% on YSlow, which I'm very happy with. I don't know how much of that is down to using PHP 7, but choosing to use it was definitely a good call. I have had absolutely zero issues with it during that time.

Summary
-------

As always, you should bear in mind that your needs may not be the same as mine, and it could well be that you need something that PHP 7 doesn't yet provide. However, I have had a very good experience with PHP 7 in production. I may have had to jump through a few more hoops to get it up and running, and there may be some level of risk associated with using PHP 7 when it's only been available for three months, but it's more than justified by the speed we get from our web app. Using a configuration management system like Ansible means that even if you do have to jump through some extra hoops, it's relatively easy to automate that process so it's not as much of an issue as you might think. For me, using PHP 7 with a Laravel app has worked as well as I could have possibly hoped.
