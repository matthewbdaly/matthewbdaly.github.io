---
title: "Retiring Laravel Azure Storage"
date: 2024-03-24 16:30:00 +0000
layout: post
categories:
- laravel
- php
comments: true
---

Today I abandoned my most popular open source package, [Laravel Azure Storage](https://github.com/matthewbdaly/laravel-azure-storage). According to Packagist, it's been installed nearly two million times down the years, and it has 221 stars and 45 forks on GitHub. And today it comes to an end.

It's been inevitable for a while that this had to happen, and here's why.

## Why am I abandoning it?

The package doesn't actually do very much itself. Laravel's Filesystem storage abstraction is built on top of the Flysystem package, and uses that to provide the underlying functionality to integrate with multiple storage backends. Writing a custom driver for this is therefore pretty easy as long as there's an existing Flysystem driver for the storage method in question.

In March 2023 Microsoft announced that they were retiring the PHP SDK for working with Azure Storage, in favour of working directly with the REST API. Off the back of this, the creator of Flysystem announced he could no longer maintain the Azure driver as a result of this, and that it too would be retired at the same time. As my package was directly dependent on the Flysystem package, which was itself also dependent on the PHP SDK, if it was going to have any future, then barring replacement packages for both of those, it was going to have to be completely rebuilt to include the functionality of both third party packages.

If I had a genuine need for the package, it might have been worth doing so, however that wasn't the case. I've actually never used this package myself except for testing. I originally worked with Azure Blob Storage in a Laravel application I built in 2015 at a previous employer, which was the first time I'd used Laravel, and used Graham Campbell's Flysystem package. It was only later that I realised I could have had a better experience by rolling a custom driver, and wound up producing the package. In the intervening period a few people contributed features and bug fixes, and I tightened up the code base a bit with type checking, more comprehensive tests, and better documentation, but the core of it didn't change much. It remained something of an annoyance to some extent - something I'd created for a specific project that I never even used, but wound up maintaining anyway.

Ironically, I did actually have a client at work wanting to use Azure Blob Storage for a use case only the other day. I'd built out a command line script that generated some text files and dropped them into a storage medium using Flysystem, and the client asked if they could use Azure storage for it. The Flysystem driver would have been useful for that, but as it's being retired I don't want to use it, and will instead need to move it away from Flysystem and work directly with the REST API to store the files. As it's not a Laravel project, I wouldn't find this project useful anyway, but the fact that I've only used Azure storage twice in my career, and those nearly two decades apart, emphasises that it's really not worth my time to continue working on this package if I need to do a load more development on it to keep it viable.

## I'm using this package on a project. Where do I go from here?

As at right now, there does seem to be an effort to create [an open source fork of the underlying Microsoft PHP SDK](https://github.com/Azure-OSS/azure-storage-php). This only covers the Microsoft SDK, not the Flysystem Azure driver, or this package, so it's not a drop in replacement for this, however there is talk on the issues of that repository around creating a Flysystem driver and possibly forking this package to work with it.

You could potentially fork this package and the Flysystem Azure driver, and adjust them both to use that package, but that would be a fair amount of work, and is probably only worth doing if you really have to continue using Azure Blob Storage and can't switch to an alternative like Amazon S3 or Digital Ocean Spaces.

Saying goodbye to this package will be a relief. It's been a bit of a time sink given the fact I've never used it, and given I have only had limited dealings with the Azure ecosystem since it was always a pain to maintain and test. It also provided some useful lessons on how to accept issues on GitHub - many of the feature requests and bug fixes were for things the package couldn't do because it was just a layer on top of Flysystem, so I wound up producing some quite complex issue templates to weed out things I couldn't do a thing about or that needed to be done in one of the dependencies.
