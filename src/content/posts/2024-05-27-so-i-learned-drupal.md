---
title: "So... I learned Drupal"
date: 2024-05-27 13:00:00 +0000
layout: post
categories:
- drupal
- php
- cms
comments: true
---

Late last year, at work they were looking for people to train up and get certified on working with Drupal so we could bid for jobs working with it. I can't say I'm a big fan of certification in general (before getting my first job, I got CIW certification, but no-one I've interviewed with has ever even heard of it), but I know in general that many larger organisations of the sort that use Drupal tend to require certification as a matter of course, and I wanted to spread my wings a bit so I put my hand up. Then, at the end of January I passed the Acquia Site Builder - Drupal 10 certification.

So far, I've been quite impressed with Drupal. It's a lot better than I had been led to believe, and the workflow is far superior to working with WordPress, even with Bedrock.

## Why are you impressed with Drupal?

Drupal has been around since before I started my development career, but I hadn't used it before, and had always assumed it was rather dated. To my surprise, Drupal actually satisfies most of [what I want in a PHP CMS](/blog/2020/09/28/what-i-want-in-a-php-cms/) nowadays:

* By default, you use Composer to create new projects, and install and update modules, and you can use it to pull in additional dependencies
* You can in theory fork `drupal/recommended-project` and use it as a basis for your project
* It has a proper, documented object-oriented API that isn't a million miles away from what you'd see in a modern framework. It also has a decent coding standard, and uses PHPStan (not my first choice as I'd prefer Psalm, but I can live with it)
* While it doesn't *completely* exclude the ability to edit presentation, it does seem to limit it to a modest degree that I can live with in most themes I've tried.
* It uses Twig, a proper templating engine, for front end templates.
* It's possible to create custom content types and taxonomies easily as and when you need them (I'd prefer they were defined exclusively in code so there was no risk of a production site getting out of sync with a dev site, but there are ways to define them in code).
* Drush allows most admin tasks to be done from the command line.
* It can be used as a headless CMS.

Also, it's noticeable that it's flexible enough that a lot of functionality which in other CMS solutions would require a plugin (cough... WordPress) or bespoke development can be done with just the core CMS. This eliminates the "wood for the trees" issue I've had with WordPress whereby you can find many plugins that do sort of what you want, but all of them seem to cater to a specific use case that's not quite what you want. For instance, if I needed to create event listing functioality, all I would need to do is to create a new content type for the events with the required fields (possibly with another content type for the locations and a relation between them).

I'd always heard that Drupal was particularly hard to use, but after having used it for a bit, I really don't agree with that. I came to it after having used multiple other CMS solutions and if you've already been exposed to the underlying concepts like taxonomies and different content types, it's really not hard to understand. It has a powerful permissions system that allows you to grant and remove permissions in a very granular way, and the only way I could see clients struggling to understand it would be if they were given permissions that they didn't need - a good developer shouldn't be doing this.

I'm sure that prior versions of Drupal would have been much worse on these points, but I so far haven't used a version below 10 so I can't really comment on it. I'm impressed that unlike with Wordpress, they haven't been afraid to make breaking changes for the sake of the long-term health of the project and haven't left in in a state where it's a tired backwater of bad practices that's able to keep going solely due to the popularity of the platform.

I maintain a large legacy Zend 1 application at work, and a rewrite of that has been on the cards for a while. Drupal is the first off the shelf CMS where I haven't been able to dismiss using it as the basis of a rewrite out of hand. I honestly couldn't conclusively say at the moment how viable it would be to rebuild it from scratch in Drupal, since it would depend on a *lot* of bespoke module development that I wouldn't yet feel confident about quoting for, but the mere fact I haven't been able to dismiss it is a testament to its flexibility and power. Working with Drupal so far hasn't felt like I'm stuck in a ghetto of bad practices and dated code like it does with WordPress.

## Summary

I don't want this to sound like a sponsored post, and so far my experience with it is quite limited, but so far I've been pleasantly surprised by how good Drupal is these days. It's a far more modern PHP CMS than WordPress, and the developer experience is a lot better. While I haven't really got too far into it and have yet to delve into bespoke theme and module development, I'm looking forward to doing so in the future.
