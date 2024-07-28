---
title: "Using Dolt with Lando"
date: 2024-07-28 18:00
layout: post
categories:
- dolt
- laravel
- lando
comments: true
---

For some years now, I've been using [Lando](https://lando.dev/) as my main development environment at work. It's a convenient and flexible way to work with most stacks I might need to use, as it's Docker-based it's more lightweight than things like Vagrant which depend on virtual machines, and the presets for Laravel, Drupal and WordPress cover the most common use cases I typically have.

One particular issue I often come across on one project in particular is the need to repeatedly run an importer to verify that it works as expected, then roll the changes back if the end result isn't what I expect. This importer is very hefty and takes a long time to run, and the database itself is very large and importing it takes a good while. I'd love a way to revert the changes when testing the importer so I can get it running again without having to reimport it.

[Dolt](https://docs.dolthub.com/) offers a possible solution to this problem. It basically combines a MySQL-compatible database with a Git-inspired versioning system that allows you to commit and roll back changes to your database.

Conveniently, Dolt is available as several Docker images, including `dolthub/dolt-sql-server`, which provides only the MySQL-compatible database server itself. Lando allows creating custom services using Docker images, so in principle we can just define that image as a service, specify a command and the right ports, add appropriate tooling, and we should be able to use Dolt largely as we would with MySQL, as in this example:

```yml
name: myapp
recipe: laravel
config:
  webroot: public
  php: '8.1'
services:
  database:
    api: 3
    type: lando
    services:
      image: dolthub/dolt-sql-server:latest
      ports:
        - 3306:3306
      command: tini -- docker-entrypoint.sh
tooling:
  mysql:
    service: appserver
    cmd: mysql -u root -h database
```

Unfortunately, since Dolt isn't an officially supported database service for Lando, it doesn't set up the database for you the way it would with MySQL. You therefore need to first of all connect to the database by running `lando mysql`, then running the following commands:

```sql
CREATE DATABASE laravel;
CREATE USER 'laravel'@'%' IDENTIFIED BY 'laravel';
GRANT ALL PRIVILEGES ON laravel.* TO 'laravel'@'%';
FLUSH PRIVILEGES:
```

Once that's done, we can then interact with our database largely as normal. In this example of a Laravel app, I can run the migrations as usual with `lando artisan migrate`. Then, we can examine the database state with a simple `SELECT` command against the `dolt_status` virtual table:

```sql
> SELECT * FROM dolt_status;
+------------------------+--------+-----------+
| table_name             | staged | status    |
+------------------------+--------+-----------+
| chirps                 |      0 | new table |
| failed_jobs            |      0 | new table |
| migrations             |      0 | new table |
| password_resets        |      0 | new table |
| personal_access_tokens |      0 | new table |
| users                  |      0 | new table |
+------------------------+--------+-----------+
6 rows in set (0.005 sec)
```

We can add the changes we want to commit:

```sql
call dolt_add('chirps', 'failed_jobs', 'migrations', 'password_resets', 'personal_access_tokens', 'users');
+--------+
| status |
+--------+
|      0 |
+--------+
1 row in set (0.016 sec)
```

And commit them:

```sql
call dolt_commit('-m', 'Created initial schema');
+----------------------------------+
| hash                             |
+----------------------------------+
| qj0cikee1nlv0j5n9tgqfjgq53b9hp2d |
+----------------------------------+
1 row in set (0.018 sec)
```

Suppose we make a changes in the database we want to roll back. We can do so as follows:

```sql
> call dolt_reset('--hard');
+--------+
| status |
+--------+
|      0 |
+--------+
1 row in set (0.015 sec)
```

Nice, eh? Before you start switching all your applications over to Dolt, there are two things to bear in mind:

* The performance isn't quite as good as MySQL. This is more likely to be an issue in production, but apparently there are people using it there, so your mileage may vary.
* While it aims to be MySQL compatible, it's not impossible that there might be some compatibility issues between MySQL and Dolt. If you're wanting to use MySQL in production and Dolt in development, you may want to be wary of this possibility.

Nonetheless, it offers some really exciting possibilities for when working with databases locally.

Summary
=======

This approach is quite limited because you need to set up the database manually, rather than having Lando set it up for you as specified out of the box. Given that the Docker SQL server container used above is intended to be as closely compatible as possible with the MySQL server already shipping with Lando, it sounds to me like in principle, adding support for Dolt via its own plugin would be straightforward and could be a relatively simple fork of the existing MySQL plugin. I've opened an issue in the repository to discuss this idea, but will have to see what happens. There's some suggestion it might be possible to run those database commands as build steps, but I couldn't get them working.

In local development, it may be worth your while considering whether the benefits of using Dolt over MySQL are worth it for your application. I'd personally be reluctant to consider using in production, but the benefits for local development sound pretty compelling.
