---
title: "How I'm refactoring a Zend 1 legacy project"
date: 2018-09-24 22:30:46 +0100
categories:
- php
- legacy
- refactoring
comments: true
---

In my current job I've been maintaining and developing a Zend 1 legacy project for the best part of a year. It has to be said, it's the worst code base I have ever seen, with textbook examples of many antipatterns, spaghetti jQuery, copy-pasted code and overly complex methods. It's a fairly typical example of a project built on an older MVC framework by inexperienced developers (I've been responsible for building similar things in my CodeIgniter days).

In this article I'll go through some of the steps I've taken to help bring this legacy project under control. Not all of them are complete as at time of writing, but they've all helped to make this decidedly crappy project somewhat better. In working with this legacy project, I've found Paul Jones' book *Modernizing Legacy Applications in PHP* to be very useful, and if you're working on a similar legacy project, I highly recommend investing in a copy. I've also found [Sourcemaking](https://sourcemaking.com/) to be a useful resource in identifying antipatterns in use, refactoring strategies, and applicable design patterns.

Moving to Git
=============

When I first started working on the project, the repository was in Subversion, and was absolutely colossal - checking it out took two hours! Needless to say, my first action was to migrate it to Git. I used [this post](https://john.albin.net/git/convert-subversion-to-git) as a guide, and it was pretty straightforward, but took all of my first day.

Adding migrations
=================

The next job involved making some changes to the database. Unfortunately, Zend 1 doesn't include migrations, and no-one had added a third party solution. I therefore did some research and wound up stumbling across [Phinx](https://phinx.org/), which is a standalone migration package with a command-line runner. Using that, it was straightforward to start adding migrations to make any necessary changes to the database structure and fixtures.

Moving dependencies to Composer
===============================

The project was using Composer, but only to a limited degree - the framework itself was in the `library/` folder, and several other dependencies were also stored here. The `vendor/` directory was also checked into version control. I therefore took the vendor folder out of Git, and added `zendframework/zendframework1` as a dependency. This drastically reduced the size of the repository.

Cleaning up commented code
==========================

There was an awful lot of commented code. Some of it was even commented out incorrectly (PHP code commented out with HTML comments). I'm of the school of thought that commented code is best deleted without a second thought, since it can be retrieved from version control, and it can be confusing, so I've been removing any commented code I come across.

Refactoring duplicate code
==========================

One of the biggest problems with the code base was the high level of duplication - a lot of code, particularly in the view layer, had been copied and pasted around. Running PHPCPD on the repository showed that, not including the views, around 12% of the code base was copied-and-pasted, which is a horrific amount. I therefore started aggressively refactoring duplicate code out into helpers and traits. As at today, the amount of duplication excluding the views is around 2.6%, which is obviously a big improvement.

Refactoring object creation code into persisters
================================================

There was some extremely complex code for creating and updating various objects that was jammed into the controllers, and involved a lot of duplicate code. I've used dedicated persister classes in the past with great effect, so I pulled that code out into persisters to centralise the logic about the creation of different objects. It's still a lot more convoluted than I'd like, but at least now it's out of the controllers and can be tested to some extent.

Creating repositories
=====================

One of the most problematic parts of the code base is the models. Whoever was responsible for them couldn't seem to decide whether they represented a single domain object, or a container for methods for getting those objects, so both responsibilities were mixed up in the same class. This means you had to instantiate an object, then use it to call one of the methods to get another instance of that object, as in this example:

```php
$media = new Application_Model_Media;
$media = $media->find(1);
```

I've therefore resolved to pull those methods out into separate repository classes, leaving the models as pure domain objects. Unfortunately, the lack of dependency injection makes it problematic to instantiate the repositories. For that reason, right now the repositories only implement static methods - it's not ideal, but it's better than what we have now.

I started out by creating interfaces for the methods I wanted to migrate, and had the models implement them. Then, I moved those methods from the model to the repository classes and amended all references to them, before removing the interfaces from the models. Now, a typical find request looks like this:

```php
$media = App\Repository\Media::find(1);
```

It's not done yet, but over half of them have been migrated.

Once that's done, I'll then be in a position to look at refactoring the logic in the models to make them easier to work with - right now each model has dedicated setters and getters (as well as some horrific logic to populate them), and I'm considering amending them to allow access to the properties via the `__get()` and `__set()` magic methods. Another option is to consider migrating the database layer to Doctrine, since that way we can reuse the getters and setters, but I haven't yet made a firm decision about that.

Adding tests
============

The poor design of this application makes it difficult to test, so right now the coverage is poor. I've been using Behat to produce a basic set of acceptance tests for some of the most fundamental functionality, but they're brittle and can be broken by database changes. I've also added some (even more brittle) golden master tests using a technique I'll mention in a later blog post. I have got unit tests for three of the persister classes and some utility classes I've added, but nowhere near the level I want.

Refactoring code out of the fat controllers
===========================================

Fat controllers are an antipattern I've seen, and indeed been responsible for myself, in the past, and this project has them in spades - running PHP Mess Detector on them is pretty sobering. The overwhelming majority of the code base is concentrated in the controllers, and it's going to take a long time to refactor it into other classes.

Zend 1 does have the concept of controller helpers, and that's been useful for removing some duplicate code, while more shared code has been refactored out into traits. In addition, the utilities I've added include a Laravel-style collection class, and using that I've been able to refactor a lot of quite complex array handling into much simpler chained collection handling. However, this is still going to take a lot of effort.

Adding events
=============

The lack of a decent event system caused particular problems when I was asked to add tracking of when a user views certain resources, so I used the [PHP League's Event package](http://event.thephpleague.com/2.0/) for this. I've started moving some other functionality to event listeners too, but this is another thing that will take a long time.

Refactoring the front end
=========================

Like many legacy projects, the front end is a horrible mess of jQuery spaghetti code, with some Handlebars templates thrown in here and there for good measure. It's easily complex enough that it would benefit from a proper front-end framework, but a full rewrite is out of the question.

I was recently asked to add two new modals in the admin interface, and decided that it was worth taking a new approach rather than adding yet more jQuery spaghetti. Angular 1 is on its way out, so that wasn't an option, and Angular 2+ would necessitate using Typescript, which would likely be problematic in the context of a legacy app, as well as the complexity being an issue. Vue was a possibility, but I always feel like Vue tries to do too much. Instead, I decided to go for React, because:

* I've always enjoyed working with React, even though I haven't had much chance to do so in the past.
* We're using Laravel Mix for processing the CSS and JS files (it can be used on non-Laravel projects), and it has a preset for React
* React is well-suited to being added incrementally to existing projects without the need for a full rewrite (after all, it works for Facebook...), so it was straightforward to do a single modal with it
* It's easy to test - you can use snapshot tests to check it remains consistent, and using Enzyme it's straightforward to navigate the rendered component for other tests

Both modals turned out very well, and went live recently. The first one took a fair while to write, and then when I wrote the second one, I had to spend some time making the sub-components more generic and pulling some functionality out into a higher order component, but now that that's done it should be straightforward to write more.

In the longer term I plan to migrate more and more of the admin to React over time. The front end also has a new home page on the cards, and the plan is to use React for that too. Once the whole UI is using React, that will have eliminated most, if not all, of the problems with duplicate code in the view layer, as well as allowing for eventually turning the application into a single-page web app.

Upgrading the PHP version and migrating to a new server
=======================================================

When I started work on the project, it was running on an old server running PHP 5.4, but there were plans to migrate to a new server running PHP 5.6. The lack of tests made it difficult to verify it wouldn't break in 5.6, but using PHP Compatibility and CodeSniffer I was able to find most of the problems. I ran it on PHP 5.6 locally during development so that any new development would be done on a more modern version. In the end, the migration to the new server was fairly seamless.

We will have to consider migrating to a newer PHP version again, since 5.6 is no longer supported as at the end of this year, but it may be too risky for now.

Namespacing the code
====================

As Zend 1 predates PHP namespaces, the code wasn't namespaced. This is something I do plan to remedy - the form and model classes should be straightforward to namespace, but the controllers are a bit more problematic. I'm waiting on completing the repositories before I look at this.

Adding PSR-3 logging
====================

The existing logging solution was not all that great. It had drivers for several different logging solutions, but nothing terribly modern - one was for the now-discontinued Firebug extension for Firefox. However, it was fairly similar to PSR-3, so it wasn't too much work to replace it. I installed Monolog, and amended the bootstrap file to store that as the logger in the Zend registry - that way, we could set up many different handlers. I now have it logging to a dedicated Slack channel when an error occurs in staging or production, which makes it much easier to detect problems. This would also make it easy to set up many other logging handlers, such as the ELK stack.

Debugging
=========

[Clockwork](https://underground.works/clockwork/) is my usual PHP debugging solution, and the absence of support for it in Zend 1 made it difficult to work with. Fortunately, it's quite straightforward to implement your own [data sources](https://underground.works/clockwork/extending-data-sources?#content) for Clockwork. I set it up to use the aforementioned logger as a data source, as well as the [Zend 1 profiler](https://framework.zend.com/manual/1.12/en/zend.db.profiler.html). I also added a data source for the events implementation, and added a global `clock()` helper function, as well as one for the Symfony VarDumper component. Together these give me a reasonably good debugging experience.

Adding console commands
=======================

I've mentioned before that I've been using Symfony's console component a lot lately, and this project is why. Zend 1 does not come with any sort of console task runner, and we needed an easy way to carry out certain tasks, such as:

* Setting up a stored procedure
* Anonymizing user data with Faker
* Regenerating durations for audio and video files

In addition, I wanted a Laravel Tinker-style interactive shell. I was able to accomplish this with PsySh and the console components. For legacy projects that lack a console task runner, it's worth considering adding one.

Configuration
=============

The configuration system in Zend 1 is downright painful - it requires that you define multiple environments in there. I have integrated DotEnv, but only part of the configuration has been migrated over, so there's still plenty of work there.

What's left to do
=================

The code base is in a much better state than it was, but there's still an awful lot to do. Zend 1 does apparently still work with PHP 7.1, but not with 7.2, so at some point we'll likely need to leave Zend 1 behind entirely. This process has already started with us ditching Zend_Log for Monolog, and over time I plan to replace the various components of Zend 1 with other packages, either ones from newer versions of Zend Framework, or elsewhere. While there are many articles about migrating Zend 1 to later versions, very few of them actually seem to go into much detail - certainly nothing as useful as a step-by-step guide.

The database layer is particularly bad, and refactoring some of the methods into repository classes is only the first step in bringing that under control. Once that's finished, I'm going to start going through the models and seeing if any more methods would make more sense as static methods on the repository, and possibly rename some of them. Then, we can think about the possibility of either incrementally migrating to another database interface (either a newer version of Zend DB, or Doctrine), or refactoring the existing models to have less boilerplate by using magic methods instead of getters and setters.

Dependency injection is a must at some point, but isn't practical right now - Zend 1 controllers implement an interface that defines the constructor arguments, so you can't pass in any additional parameters, so that will need to wait until the controllers no longer use Zend 1. I have been using the Zend Registry as a poor man's DI container, since it allows sharing of a single object throughout the application, but it's not a good solution in the long term.

The routing is also painful - Zend 1's routes are all stored in the bootstrap file. I'd prefer to use something like `league/route`, which would allow for handling different HTTP methods to the same route using different controller methods, making it easier to separate out handling of GET and POST requests.

I also want at some point to set up a queue system for processing video and audio content - at present it's handled by running a shell command from PHP, which means you can't easily get feedback if something goes wrong. Migrating that to a queue system, backed with something like Redis, would help a great deal.

Share your stories
==================

I'd love to hear any similar stories about refactoring legacy applications - how you've solved various problems with those legacy apps (or how you'd solve the ones I've had), tools you've used, and so on. Feel free to provide details in the comments.

A legacy project like this can be very frustrating to work with, but it can also feel quite rewarding to bring it under control over a period of time. My experience has been that you get the best results by working in small, regular steps, and over time your experience working with the code base will improve.
