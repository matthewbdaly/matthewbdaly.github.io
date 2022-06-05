---
title: "The ORM Delusion"
date: 2022-06-05 18:00:00 +0000
layout: post
categories:
- database
- orm
- laravel
- eloquent
comments: true
---

I've used some low-level database interfaces like PDO, and the database interfaces from several frameworks, including Codeigniter, Zend 1, Django, and Laravel, and I've been in the web development industry for over a decade at this point, so I've had a reasonable amount of experience working with various database interfaces. Based on this experience, I agree wholly with [this tweet](https://twitter.com/erikaheidi/status/1510347907819524105?s=20&t=0IjKFyO3O-EctVq43hRkVw) about the advantages of using an ORM on your project. I routinely use an ORM for the overwhelming majority of projects I work on and rarely need to drop down to writing raw SQL. Unfortunately, there seems to be an *awful* lot of misinformation and misconceptions about the advantages and disadvantages of choosing to use an ORM, and when to do so.

A lot of people seem to think that using an ORM inherently makes your application perform badly. However, this just isn't true, *as long as you're using the ORM the right way*. Using an ORM not only allows you to solve certain classes of performance problems more easily than by writing SQL statements, but they generally make it easier to reason about how your application works. However, there are some things you need to bear in mind when using one, to prevent you from introducing potential performance problems. In this post, I'll give you the reasons why you should consider using an ORM on your projects, at least by default, and warn you about some of the things that can cause trouble when using one.

<Notice title="Fair warning">

If you're going to patronize me, or other commenters, by mansplaining [ActiveRecord vs DataMapper](https://www.culttt.com/2014/06/18/whats-difference-active-record-data-mapper), you can get in the damned sea. I know the difference and I've chosen to use ActiveRecord. I'm categorically not interested in rehashing that argument, let alone being condescended to, and I will delete **any comments** that I think do either. If you *do* have *legitimate, specific gripes* about Eloquent, or any other implementation of ActiveRecord, or indeed ORMs in general, and can moan about them without being unpleasant to other people, I'm happy to accept those comments. No tool is perfect, and there are always some cases where it will cause problems, but I will not tolerate anyone being disrespectful. Using Laravel, Eloquent, or any ActiveRecord implementation, does not make someone Nooby McNoobface, and if you're going to claim it does, you're not welcome here.

</Notice>

Please note, that while I'm referring to Eloquent throughout this post, the overwhelming majority of what I'm talking about is also applicable to other ORMs, particularly other Active Record-style ORMs such as the Django ORM. I'm using Eloquent as the primary example here because it's the one I've used most often in the last few years.

Reasons to use an ORM
---------------------

Below I've listed the reasons I can think of for using an ORM. I don't think this is necessarily an exhaustive list, and others may be able to think of others or express these reasons more elegantly than I can. If you can think of other good reasons, feel free to add them to the comments.

### Resolving N+1 queries

In my experience, N+1 queries are *far and away* the most common performance problem I've encountered when dealing with legacy applications that don't use an ORM. They're typically somewhat less obvious than a single slow query would be when profiling your code because the problem comes from multiple small queries, rather than from single large ones, but they can have a crippling effect on the performance of your application.

It *is* possible to use JOINs to pull in another table and get the related data in a single query, but that *really* starts to get hairy if you have to pull in multiple levels of tables, and it can be *very* difficult to write a query that does so while remaining easy to understand.

Fortunately, most ORMs have simple methods for efficiently fetching related data via eager loading. For instance, Eloquent has the `with()` and `load()` methods. By making good use of these methods, you can write efficient queries that are still straightforward to understand. In addition, you can also use methods such as `has()` and `whereHas()` to query relationship existence, which is generally a lot more elegant than the underlying `WHERE EXISTS` statement.

Eloquent also carries out a degree of caching, particularly when dealing with relations. This can sometimes eliminate queries that would be made by a more naive ORM, but in the event you *do* need it, you can call the `refresh()` method on the model to ensure it's up to date.

### Type safety

Using an ORM, as opposed to a query builder or writing raw SQL, offers significant advantages in terms of the type safety of the code base.

For instance, say you have the below method in a Laravel project which returns an array of data from a query:

```php
<?php

use DB;

final class ProductRepository {
    // Rest of class...

    public function getFirstProductBelow(float $price): array
    {
        return DB::table('products')->where('price', '<', $price)->first();
    }
}
```

While having a return type at all is better than none, it isn't very useful for static analysis tools. Just telling Psalm that the response is an array doesn't tell it what fields to expect in that array.

You *can* use annotations to specify a more meaningful response...

```php
<?php

use DB;

final class ProductRepository {
    // Rest of class...

    /*
     * @psalm-return array{id: int, name: string, price: float}
     */
    public function getFirstProductBelow(float $price): array
    {
        return DB::table('products')->where('price', '<', $price)->first();
    }
}
```

And that *would* tell Psalm that it returns an array with the denoted keys. However, it's not the best solution:

* You'd need to either duplicate that `@psalm-return` docblock to any other method that returns a list of those items, in which case adding a new field becomes problematic, or you'd have to use a predefined template annotation
* Those annotations need to be maintained, and if they got out of sync with your database structure, Psalm might get confused
* The native PHP return type can only validate that the response is an array. The actual response could *theoretically* look very different and short of adding some potentially long-winded `assert()` calls about the shape of the array, we can't validate that the right values exist.

But suppose we instead use Eloquent. Our method might then look like this:

```php
<?php

use App\Models\Product;

final class ProductRepository {
    // Rest of class...

    public function getFirstProductBelow(float $price): Product
    {
        return Product::where('price', '<', $price)->first();
    }
}
```

We now know with absolute certainty that the response from this method is an instance of `App\Models\Product` because we've been able to declare a return type, and if it wasn't, the method would throw an exception.

By itself, that doesn't tell us what fields to expect on an instance of `App\Models\Product`, but Laravel IDE Helper can easily generate suitable `@property` annotations for us, based on the current database structure. If we run the following command:

```bash
$ php artisan ide-helper:models -W
```

Then our model might end up looking something like this:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/*
 * @property integer $id
 * @property string $name
 * @property float price
 */
final class Product extends Model
{
    // class body here
}
```

And that gives Psalm a single, canonical description of the structure of this class. Even if you couldn't use Laravel IDE Helper for some reason, it's not exactly onerous to manually define the properties on a given model in one place - it's the work of a few minutes if you do it at the same time you define your models and migrations.

For even better type safety on your models, you can add the `@psalm-seal-properties` annotation, which will ensure that if you try to use an undocumented property on the model, Psalm will flag it as an issue. And having comprehensive type information isn't just a matter of finding type issues, it also affects how good your autocompletion will be - with better type hints, you'll have more effective and accurate completion options.

### Refraining from reinventing the wheel, probably badly

I maintain a large legacy Zend 1 application where the original developer decided they didn't want to use an existing ORM. Instead, they wrote their own model classes which looked something like this:

```php title=application/models/Page.php
<?php

class Application_Model_Page
{
    protected $id;
    protected $name;
    protected $price;

    public function __construct()
    {
        $this->id = null;
        $this->name = null;
        $this->price = null;
    }

    public function getId()
    {
        return $this->id;
    }

    public function setId($val)
    {
        $this->id = $val;
        return $this;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($val)
    {
        $this->name = $val;
        return $this;
    }

    public function getPrice()
    {
        return $this->price;
    }

    public function setPrice($val)
    {
        $this->price = $val;
        return $this;
    }

    public function toArray()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'price' => $this->price,
        ];
    }

    public function populate(array $data)
    {
        $this->id = $data['id'];
        $this->name = $data['name'];
        $this->price = $data['price'];
        return $this;
    }

    public function save()
    {
        $db = Zend_Registry::get('db');
        $data = [
            'name' => $this->name,
            'price' => $this->price,
        ];
        $db->update('products', $data, 'id=' . $this->id);
    }

    public function find($id)
    {
        $db = Zend_Registry::get('db');
        $result = $db->fetchRow('SELECT * FROM products WHERE id = ' . $id);
        return $this->populate($result);
    }
}
```

Honestly, there are so many issues with this it's hard to know where to start:

* You can't define generic implementations of the various methods because they're dependent on a specific structure, so you have to define those methods from scratch for every single model
* The `find()` method requires that you first create an instance of the object, then call that method to return another instance, eg `(new Application_Model_Page())->find(1)`, which is extremely cumbersome
* And if you want to populate multiple instances, you have to do so manually like this:

```php
<?php
$response = [];
foreach ($result as $row) {
    $response[] = (new Application_Model_Page())->populate($row);
}
return $response;
```

We're in the process of migrating off these legacy models to Eloquent, with the intent of eventually migrating the whole application to Laravel, and the contrast between using the two model types could not be greater. The Eloquent models are easy to maintain, easy to work with, highly performant, and require far less boilerplate code when implementing functionality.

Martin Fowler covered this issue pretty well in [ORM Hate](https://martinfowler.com/bliki/OrmHate.html). To quote:

> Listening to some critics, you'd think that the best thing for a modern software developer to do is roll their own ORM. The implication is that tools like Hibernate and Active Record have just become bloatware, so you should come up with your own lightweight alternative. Now I've spent many an hour griping at bloatware, but ORMs really don't fit the bill - and I say this with bitter memory. For much of the 90's I saw project after project deal with the object/relational mapping problem by writing their own framework - it was always much tougher than people imagined. Usually you'd get enough early success to commit deeply to the framework and only after a while did you realize you were in a quagmire - this is where I sympathize greatly with Ted Neward's famous quote that object-relational mapping is the Vietnam of Computer Science.
>
> The widely available open source ORMs (such as iBatis, Hibernate, and Active Record) did a great deal to remove this problem. Certainly they are not trivial tools to use, as I said the underlying problem is hard, but you don't have to deal with the full experience of writing that stuff (the horror, the horror). However much you may hate using an ORM, take my word for it - you're better off.

And it's worth bearing in mind that those words were written a decade ago. We now have over ten years' more experience finding potential problems with ORMs and finding effective solutions for those problems, and Eloquent has benefited from those changes, as well as improvements in the PHP language. Many issues you might have with an ORM ten years ago may simply no longer be worth worrying about.

### Consistency

Eloquent's scopes in particular have been invaluable for me in ensuring consistency. On the Zend 1 project mentioned above, there are still some issues with poor, inconsistent database design that I haven't yet been able to get around to resolving. One of these is that different content types are stored in different tables with different field names, but we need to be able to make them work consistently when resolving whether a given item is in date, even though the fields have different names.

If we had to use the query builder or write SQL, we'd be stuck writing the same chunk of the query over and over each time we needed to get the in-date items of each type, and it would be all too easy to mess it up and use the wrong field name when doing a union of different content types. But if we define a local scope on each model called `scopeIsInDate()` with an implementation specific to that model, we can then easily reuse that and ensure consistency.

We also have a use case where, based on the value of one field, or whether the ID of the model is in a hard-coded list, it needs to be treated as a different object. By using a global scope, we can create two models that extend a common base, and apply one scope to one model, and another to the other model. That way, even though we have only one database table, we can effectively treat it as two separate ones when using the models. Yes, a better database structure would resolve that, but this is a big legacy application and there's already lots to do to clean it up, so we can't justify it any time soon.

### Reduces context switching

Going from writing PHP to writing SQL and back is *hard* on the grey matter. It will slow you down because:

* You have to go from one mental model of how to construct a correct statement in terms of grammar and punctuation to another
* You're mixing two or more languages up in the same file, which isn't great - your editor or IDE may not be able to easily apply proper syntax highlighting to the SQL if it's just a string. This may make it harder to spot syntax errors

If instead you only have to think about PHP's rules while writing a query, the mental load is significantly lower and your editor or IDE can help you out a lot more.

Now, it has to be said, sometimes there *are* queries where it's easier to write it out initially in SQL using something like MySQL Workbench, but I'd still advocate taking the time to go back and translate those queries into Eloquent if possible, or to the query builder if that's more practical. I consider raw SQL in a PHP file to be technical debt because, in addition to the other points above:

* It makes it all too easy to accidentally leave an SQL injection vulnerability in your code
* You can't extract a part of the query to a scope for reuse, or make use of existing scopes to handle a part of the query

As always, sometimes if you're in a rush you can justify adding technical debt on a temporary basis, but that should be the exception, not the rule, and has to be justified.

Things to bear in mind when using an ORM
----------------------------------------

With the reasons I'd recommend using an ORM out the way, here are some of the gotchas you should be aware of when making a decision about using one:

### The ORM is an abstraction for SQL, not a replacement

Honestly, the overwhelming majority of performance issues developers have with ORM's boil down to this. Again with a quote from Martin Fowler:

> I've often felt that much of the frustration with ORMs is about inflated expectations. Many people treat the relational database "like a crazy aunt who's shut up in an attic and whom nobody wants to talk about"

If a developer treats an ORM like a black box and just writes queries without thinking about the SQL it generates, it's no surprise whatsoever if the generated queries don't perform well. It's still running queries under the bonnet, it's just that some of it is implicit. For instance, take this (relatively simple) example of an Eloquent query:

```php
Post::join('user')->get();
```

If you use something like Clockwork to profile this query, the end result will probably look something like this:

```sql
SELECT * FROM posts
INNER JOIN users ON posts.user_id = users.id
```

And, to be fair, there *are* a few potential issues with this query.

* If you're retrieving all the fields from the `posts` and `users` tables, then that could easily include fields that you don't explicitly need
* Depending on the use case, returning an arbitrary number of database rows can be potentially problematic, performance-wise, and it may be better to
* If you haven't set an appropriate foreign key on `posts.user_id`, the join could perform badly

However, these issues really aren't inherent to using an ORM, but are to do with it being used naively. Assuming we do want to paginate these results, and the only field on `users` that we need is the name, we could achieve what we want by rewriting this query as follows:

```php
Post::join('user')->select('posts.*', 'users.name')->paginate(20);
```

<Notice>

Yes, [cursor pagination](https://laravel.com/docs/9.x/pagination#cursor-pagination) is a thing and will perform better than offset-based pagination in most cases, but I'm deliberately keeping this example as simple as possible.

</Notice>

As for the third issue, that's easy enough - just ensure that you're setting an appropriate foreign key.

### An ORM isn't training wheels, it's a power tool

This is nearly the same issue as that above, but it's important enough to deserve being mentioned separately.

Using an ORM effectively requires knowledge of your relational database. To write efficient queries with it, you need the same knowledge that you do to write the underlying query in SQL, AND knowledge of the ORM itself. If you start using it without learning to use a relational database (or let a junior dev who hasn't learned SQL properly), or don't profile your queries, you're going to run into problems.

I've often heard people suggest that using an ORM means your SQL skills atropy. Quite frankly, I find that utterly laughable. I make a point of avoiding writing raw SQL when I can use an ORM, and I still often find myself having to write raw SQL, particularly if I'm prototyping a complex query. It does make it unnecessary to write out simple queries in SQL, but I'm not going to benefit in the slightest at this point in my career by writing something like `SELECT * FROM posts` over and over if I can call `Post::all()` instead.

### Hydration can become a bottleneck for large datasets

It has to be said, there *is* inevitably some overhead from instantiating an ORM model, which can be quite a complex class, compared to instantiating an array of data, and if you have to work with a response that contains a large number of rows, it may be better to return arrays than model instances.

Case in point, the Zend 1 project I maintain has a number of reports which the client downloads once a week. This includes a report of all the current users in the system, and although users who leave are cleaned out of the system automatically, there's typically around thirty thousand rows returned from this query. That's big enough that the time taken to instantiate a model instance for each row can become significant, and you don't need a model instance if all you're going to do is dump the data out to a CSV file. So in those circumstances, you're better off using the query builder and returning an array - it'll be quicker and use less memory.

Fortunately, it's easy to convert an Eloquent query to a query builder one by calling the `getQuery()` method. That way you can write your query using Eloquent as normal, then convert it to a query builder instance, and return the data as an array.

### You can write nearly any query with an ORM, but it may require more effort

Just because there isn't a method for a particular SQL statement, or the methods it does have don't have the options you need, doesn't mean you need to write it the whole thing as a raw query. There's still the various raw methods:

* `selectRaw`
* `whereRaw`/`orWhereRaw`
* `havingRaw`/`orHavingRaw`
* `orderByRaw`
* `groupByRaw`

By making appropriate use of these methods, you can write only those parts of the query that absolutely need to be raw, without losing the advantages of using an ORM. For instance, if you need to use `CASE ... WHEN` statement to return a true or false value for if an entry is in date, or use `GROUP_CONCAT()` to concatenate some names from a related field into one field, you can easily do so using something like `->selectRaw('CASE WHEN expiry_date < NOW() THEN 'true' ELSE 'false', GROUP_CONCAT(name)')`.

Some more advanced parts of SQL can be harder to write using an ORM. For instance, take this query:

```sql
WITH RECURSIVE children(id, name, parent_id, depth) AS
  (SELECT teams.*,
          0 AS depth
   FROM `teams`
   WHERE id = 1
   UNION ALL SELECT teams.*,
                    children.depth + 1
   FROM teams
   INNER JOIN children ON children.parent_id = teams.id)
SELECT *
FROM children
```

The `WITH RECURSIVE` CTE is a relatively new feature in SQL and not every implementation supports it. In addition, it's only useful in certain, quite specific circumstances. As such, support for it is limited in most ORMs, and this is one use case where it *might* not be worth the bother of rewriting the query to use an ORM. However, it's not impossible. The [Laravel CTE](https://github.com/staudenmeir/laravel-cte) package extends Eloquent to add support for recursive queries, and even if you can't use that for some reason, it might be worth rewriting the inner query alone in Eloquent, then using `toSql()` to get the SQL from it and insert that into the outer query, something like this:

```php
$teams = Team::where('id', 1)
	->unionAll(Team::join('children', 'children.parent_id', '=', 'teams.id')
	->selectRaw('teams.*, children.depth + 1')
	->toSql();
$query = "WITH RECURSIVE children(id, name, parent_id, depth) AS ($teams) SELECT * FROM children";
```

It's not perfect, but this at least means some of the query is expressed using Eloquent, making it easier to maintain and debug.

### You need to profile your queries to ensure they're efficient

Just because a query isn't written manually doesn't mean it's not inefficient, and sometimes there can be hidden queries you're not aware of. Third-party packages can be a source of this, and [the authentication system can trigger some less-than-obvious queries which can be cached](/blog/2020/03/11/caching-the-laravel-user-provider-with-a-decorator/). For this reason, it's a really good idea to profile your pages to make sure they're performing as expected.

I favour [Clockwork](https://underground.works/clockwork/) as my profiling tool of choice, but [Laravel Telescope](https://laravel.com/docs/9.x/telescope) and [Laravel Debugbar](https://github.com/barryvdh/laravel-debugbar) are also solid options for this.

### It's unlikely you can swap databases without rewriting at least some queries

One of the advantages I've heard claimed for ORMs in the past is being able to migrate from, say, MySQL to PostgreSQL without making any changes to the code base. Honestly, I don't think this one is very likely unless your queries are *very* simple. Any call to any of the `*raw()` would need to be manually checked and migrated, and I don't think any sizeable application would be able to get away without having any of these. It may be you can find a third-party package to add custom methods to support these features directly, or can write your own, but it may not be worth the bother for only a handful of uses of that feature.

It can be convenient to be able to use an in-memory SQLite database for running your tests locally, but it likely won't be practical if you depend on any database-specific functionality, or for all the tables in a large application. As such I only tend to do this when working on packages, where there's only a handful of tables to deal with.

Summary
-------

Hopefully this article has helped dispel some of the appalling myths, misconceptions, and general confusion that seem to be widespread around using an ORM. If there's one thing I hope you take away from this article it's that the ORM isn't a black box, but a layer of abstraction over your relational database, and if you don't bear that in mind, it's no surprise if you go on to experience performance problems. When used properly, an ORM is an extremely useful tool that is applicable to nearly every query you're likely to write, and it will help you make your code more readable, maintainable, performant, type-safe and secure.
