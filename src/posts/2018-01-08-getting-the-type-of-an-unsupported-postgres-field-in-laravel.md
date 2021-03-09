---
title: "Getting the type of an unsupported Postgres field in Laravel"
date: 2018-01-08 14:00:15 +0000
categories:
- php
- laravel
- postgresql
comments: true
---

Today I've been working on a generic, reusable Laravel admin interface, loosely inspired by the Django admin, that dynamically picks up the field types and generates an appropriate input field accordingly.

One problem I've run into is that getting a representation of a database table's fields relies on `doctrine/dbal`, and its support for the more unusual PostgreSQL field types is spotty at best. I've been testing it out on a Laravel-based blogging engine, which has full-text search using the `TSVECTOR` field type, which isn't supported, and it threw a nasty `Unknown database type tsvector requested` error.

Fortunately, it's possible to register custom field type mappings easily enough. In this case we can safely treat a `TSVECTOR` field as a string` type anyway, so we can map it to the string type. We can do so in the boot method of a service provider:

```php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // Register the TSVECTOR column
        $conn = $this->app->make('Illuminate\Database\ConnectionInterface');
        $conn->getDoctrineSchemaManager()
            ->getDatabasePlatform()
            ->registerDoctrineTypeMapping('tsvector', 'string');
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
       //
    }
}
```

We register a Doctrine type mapping that maps the `tsvector` type to a string. Now Doctrine will just treat it as a string.

We can then retrieve the field types as follows:

```php
        $table = $this->model->getTable();
        $fields = array_values(Schema::getColumnListing($table));
        $fielddata = [];
        foreach ($fields as $field){
            if ($field != 'id' && $field != 'created_at' && $field != 'updated_at' && $field != 'deleted_at') {
                try {
                    $fielddata[$field] = Schema::getColumnType($table, $field);
                } catch (\Exception $e) {
                    $fielddata[$field] = 'unknown';
                }
            }
        }
```

Note that we specifically don't want to retrieve the ID or timestamps, so we exclude them - the user should never really have the need to update them manually. We fetch the table from the model and then call `Schema::getColumnListing()` to retrieve a list of fields for that table. Finally we call `Schema::getColumnType()` to actually get the type of each column.

Now, I suspect the performance of this admin interface is going to be inferior to a more specific one because it has to retrieve the fields all the time, but that's not the point here - with a non-user facing admin interface, performance isn't quite as much of an issue. For the same reason the admin doesn't do any caching at all. It's still useful under certain circumstances to be able to reverse-engineer the table structure and render an appropriate form dynamically.
