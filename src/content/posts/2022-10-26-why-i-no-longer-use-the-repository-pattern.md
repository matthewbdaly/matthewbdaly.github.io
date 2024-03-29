---
title: "Why I no longer use the repository pattern"
date: 2022-10-26 17:30:00 +0000
layout: post
categories:
- php
- laravel
comments: true
---

In September 2016, I started a new job after my previous employer went into liquidation. I expected a certain learning curve because I was going from an environment where I'd been the main driver of establishing coding standards and TDD (and which often felt like pushing a boulder up a hill) to one where there was a large-ish team of ten developers, and so there would be established standards in order to try to help keep things consistent between projects. One of the biggest changes for me was adopting the repository pattern - it was used routinely on every project. The lead developer was very keen on it as it offered the following benefits:

* A high-level abstraction over Eloquent, allowing for relatively easy replacement of Eloquent with raw database queries, Doctrine, MongoDB, CouchDB etc
* Easy caching by wrapping the repository class in a caching decorator

I quite quickly embraced this concept, and began routinely using the repository pattern as a matter of course on new projects. Yet nowadays, I've largely stopped using the repository pattern, because experience has taught me that it's really not all it's cracked up to be. It often adds very little value for a lot of effort, and I really don't think it's often worthwhile. Here I'll break down the reasons I no longer use it.

## Eloquent is already an abstraction

Out of the box, Eloquent supports SQLite, MySQL/MariaDB, PostgreSQL and MSSQL. It *is* a somewhat leaky abstraction, but that can't be helped, and as [Martin Fowler said](https://www.martinfowler.com/bliki/OrmHate.html), that isn't a reason to avoid them. Mapping relational data to object oriented code is *hard*, and if you expect your ORM to completely abstract away the difference between relational databases, then your expectations are unreasonable. ORMs cover the 90% use cases very well, which makes a lot of stuff significantly easier, and offer escape hatches for when you need them. Unless you have a really good reason not to, you should be using the default ORM provided by your framework, and the onus is on you to justify not doing so if you feel it makes sense.

Furthermore, it's possible to extend Eloquent to support various non-relational data backends such as:

* Markdown, YAML and JSON files, through [Ryan Chandler's Orbit package](https://github.com/ryangjchandler/orbit)
* MongoDB, through [Jens Seger's laravel-mongodb package](https://github.com/jenssegers/laravel-mongodb)

If you *really* need to rewrite an existing application to support a whole new database backend that isn't supported out of the box by Eloquent, or by an off-the-shelf package, then ultimately you could consider writing your own Eloquent extension to facilitate this. But I'd be very surprised if that happens often.

## You *probably* won't ever need to switch database backends to something Eloquent doesn't support

If you're building an application that uses a relational database, then it's likely that most of the data you are storing is fairly well-suited to a relational data model (if it wasn't, why would you be using a relational model now?). As such, it's decidedly unlikely that you're ever going to need to migrate it to a non-relational database store, unless something fairly fundamental changes. Building out repositories on the offchance you *might* one day need to migrate to a database backend not supported by Eloquent, or to a database interface other than Eloquent, is probably excessive, and unless you have a very specific use case, a violation of the [YAGNI principle](https://www.martinfowler.com/bliki/Yagni.html).

I'm not going to pretend my own experience is necessarily representative of *every* possible experience (nor should you insinuate the same), but I've been in the industry since 2011, and the only time I've *ever* had to migrate a website from one database engine to another was with a legacy Zend 1 application that takes up a lot of my time at work. That had been on the same server since around 2010, despite a rather shaky rewrite in 2015 before I got there, and was still using MySQL 5.0, and PHP 5.4. It became necessary to move it to a new server, and it wasn't possible (or desirable) to install a version of MySQL that old on the new server. As such I took the decision that we needed to bite the bullet and migrate to a currently supported database, despite the potential issues it could cause. Given there were inevitably going to be teething troubles when migrating a large, *very* legacy application with no tests, but that most of the existing queries were not very sophisticated, then migrating to MariaDB 10.2 would be no harder than migrating to MySQL 5.7, so I opted for the former. While this did cause some grief (particularly with respect to boolean fields), it used the same Zend 1 database layer, built on top of PDO, despite migrating to a different version of a different database (albeit a fork of the original).

And if the problem is that the amount of data means that queries are taking too long, it could easily be simply that there aren't appropriate indexes set up, as [memorably demonstrated in Commitstrip](https://www.commitstrip.com/en/2014/06/03/the-problem-is-not-the-tool-itself/).

## You *probably* won't ever need to switch away from Eloquent to another database interface

This is an edge case that's probably not worth even thinking about. The only circumstances under which you might be confronted with an explicit need to migrate away from Eloquent are the following:

* Laravel drops Eloquent in favour of a new ORM, in which case there will be a clear migration path to the new ORM
* A site built in another framework, or without a framework, but using Eloquent, can no longer use it and must be migrated to an alternative database interface
* Laravel development ceases, or you have to move an existing site away from it without doing a full rewrite for some other reason

I've been in the situation on the aforementioned legacy project of migrating from Zend 1 DB to Eloquent, and it really isn't that big a deal to do so because all these query builders and database interfaces do largely the same thing - there are some implementation details that differ, but they're never all that different, and where you're using database-specific functionality then you're likely using one of the escape hatches to write raw SQL anyway. The only problems I've encountered are down to the original developer rolling their own crappy legacy models, not to the underlying queries.

And if you're planning on migrating away from Eloquent to raw database queries, just because someone told you it's faster, [don't](/blog/2022/06/05/the-orm-delusion/).

## If you *do* need to switch to an unsupported backend, you probably won't need to switch *every* table, and if you do, it won't all be at once

If you do determine that you need to switch part of your application to a different database engine, it's very unlikely that the whole database needs to be replaced lock, stock and barrel. Most likely, it'll be a handful of tables that are a better fit for a different data store. Under these circumstances, why would you want to move other tables, which *are* a good fit for the relational model, to a different database, and potentially degrade performance?

Most likely, what you'll end up with is a hybrid model where most of your data is relational and is stored in something Eloquent can work with, while the other data which is a better fit for a different data store is handled by an alternative backend. That limits the scope of any changes you need to make to just those queries that touch on the table you plan to migrate. And as stated above, implementing that on the offchance you may need it in future is a violation of YAGNI.

And if the reason for switching is due to the sheer size of the data, different tables will likely reach that point at different times, so you can migrate each one to the new store at the point it starts to become an issue.

## The availability of JSON fields in relational databases reduce the necessity for non-relational databases

It used to be the case that storing arbitrary keys and values in a relational database was tricky, and you had to resort to sub-optimal solutions such as [Entity-Attribute-Value](https://en.wikipedia.org/wiki/Entity%E2%80%93attribute%E2%80%93value_model), as used by, for example, the WordPress `wp_postmeta` table. At that time, a relational database such as MongoDB offered a significant advantages in terms of being able to store arbitrary data.

Since then, most relational databases have introduced new field types such as HStoreField or JSON field types, which allow for easily storing arbitrary keys and values within a row of a relational database, and ORMs such as Eloquent allow for casting that data to a convenient form. As such, that particular use case for a non-relational database over a relational one is now largely redundant. It's also possible to enforce a JSON schema so that you can exercise as much or as little control over the data as necessary.

There are other use cases for non-relational databases, but most of those only really come into play when you have truly colossal amounts of data, and to be honest it takes a *long* time to get to that point. If you get to the point where you need to worry about those kind of issues, you can probably afford to deal with it.

## Using the repository pattern for every query involves writing a *lot* of boilerplate code

Writing a repository class for all the models you plan to use in an application is something not to be taken lightly. You have to collect every query you're ever going to make against a specific table and place it in one class, and for a large application that will be a lot of work. Yes, there will be some common methods that can live in a base class, such as ones for all items, items by ID, paginated list etc, but there will still be a lot of work involved, and it will likely be quite repetitive, with some differing only slightly.

And if you're also planning to decorate the repositories to be able to cache them, the burden increases significantly. For each model, you need an interface for the repository, a class for the repository implementation, and a class for the decorator, as well as all the boilerplate to resolve the interface correctly.

## Returning arrays sacrifices type safety

Honestly, this is probably the biggest issue for me these days. I routinely use Psalm on my projects these days, and it's been hugely beneficial to those projects to have that kind of feedback about how well-typed my code is. Abstracting away the difference between queries when using different repository implementations means we can't return ORM-specific objects, leaving us with two alternatives:

* Return arrays, which can't be so easily type-hinted - we can annotate those arrays to tell tools like Psalm what shape we expect back, but it's harder to enforce that, and the annotations can get out of sync easily.
* Return a more generic data transfer object (or a collection or array thereof) containing the data, in which case we have to write yet more boilerplate code - a DTO for each model, plus the logic to convert the data from an Eloquent model to an instance of the DTO.

Neither of these options are great. The first one reduces the type safety of the application substantially, and the second will cause you an awful lot of work for very little benefit. I would definitely struggle to justify this to my bosses or clients.

## The supposed improvements in testability don't really pan out in practice

A big part of the promise of the repository pattern is being able to run unit tests without hitting the database. The trouble is that a database is an integral part of your application, and replacing it with mocks often isn't very useful. Mocks are only as good as the data they provide, and if your mock data diverges from what the database actually provides, it's easy for issues to slip through without being caught by your tests.

As long as you have migrations that can recreate the structure of your database accurately (if not the content), then you can happily use an in-memory SQLite database as an alternative to your production database for most functionality that isn't database-specific. That's not to say it's always a drop-in replacement for your production database, and you should be aware of the possibility of differences in behaviour between databases if you're using something else in production, but it's a damn sight closer to MySQL in behaviour than mocking out the query. Often, a good compromise is to use an in-memory SQLite database for testing locally, where it's more important to be able to run tests quickly, but use your production database engine in continuous integration where it's more important for everything to be correct. If you're building a generic package where it needs to support every database engine supported by Eloquent, then your continuous integration solution should of course actively test against every supported database engine.

If there are use cases where you need to use functionality from MySQL or PostgreSQL that doesn't exist in SQLite in tests, James Bannister [suggested a way to patch missing functions that can help](https://bannister.me/blog/using-mysql-and-postgres-functions-in-sqlite).

## It's not a good fit for an ActiveRecord-style ORM

Repositories are generally a better fit for a DataMapper-style ORM than ActiveRecord, and many actually include a repository implementation by default, eg Doctrine. This isn't a criticism of ActiveRecord, which is a simple, intuitive way of building an ORM, and is implemented by many other frameworks too (Django is a good example), but sometimes it's just not a good fit for your application.

If you really *need* the specific advantages of the repository pattern, then trying to retrofit it to an ActiveRecord-style ORM like Eloquent from the outset is an awful lot of work. There's a [Doctrine integration for Laravel](http://laraveldoctrine.org/) and you're far better off just using that, rather than trying to wrap your own implementation around Eloquent. Almost invariably, your own implementation will be crappier than that, and involve a lot more work, so why waste time and effort on it?

## What I do nowadays

I haven't *completely* stopped using the repository pattern. What I tend to do nowadays is as follows:

* For simple or one-off queries, I use Eloquent directly. There's not much value in abstracting away something simple like `Page::find($id)`, or a *slightly* more complex query that's used only in one place.
* For repetitive parts of queries, local scopes offer a convenient and consistent way to abstract away that functionality. For instance, on the aforementioned legacy project, which now uses Eloquent, the various content types have a scope called `scopeIsInDate()` to retrieve only items which are in date.
* For a small number of queries that relate to a specific model instance, I define them as methods on the model class itself. These tend to be things to do with a relation of the model.
* For more complex queries, or those which are used in multiple places, I do use repository classes of a sort, but these are just convenient containers for those queries in order to avoid duplication.
* For *really* complex queries, such as those for reports across multiple tables, I use dedicated query classes. These break the subqueries for different tables out into different private methods and perform a `UNION` across those subqueries, so they require a lot of repetitive queries. Long-term the solution would be to refactor those tables down to a single table for the various content types, but that's not going to be practical any time soon.

That said, the work I do now is different - I used to build APIs for mobile apps where the endpoints were generally generic endpoints that exposed CRUD functionality for different types of resources. It's been a while since I've done that, and the repository pattern would arguably provide more benefit for that kind of functionality where most of the queries were things like "get this resource by ID", "get paginated list of these resources" etc.
