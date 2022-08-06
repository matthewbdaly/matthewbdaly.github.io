---
title: "How Psalm helped me refactor a Zend 1 legacy application"
date: 2022-08-06 18:00:00 +0000
layout: post
categories:
- php
- legacy
- psalm
- static
- analysis
comments: true
---

### Ensuring purity of functions, and immutability of objects

There has been talk in the past of adding a way for PHP to declare a class as immutable, and have it enforced at language level, but so far it isn't available in the language. Fortunately, Psalm can help in this regard. By adding a `@psalm-immutable` annotation to a class, Psalm will know that class is meant to be immutable, and report issues that render a class mutable.

Similarly, if you annotate a function with `@psalm-pure`, Psalm will flag anything that makes the function impure. It's also possible to use `pure-callable` as a type elsewhere, such as in a parameter type declaration, to check that the value passed is a callable which is pure.

Along similar lines, there's also a `@psalm-mutation-free` annotation, which verifies that the output is just a function of the instance's properties and the method input, or `@psalm-external-mutation-free`, which verifies that the function does not mutate any state external to the class. Together, these methods will help you adopt more functional programming paradigms in your PHP code.


### Keeping track of properties on models

If you're using an Active Record-style ORM like Eloquent, the dynamic nature of it can sometimes bite you in the proverbial. If you change the name of a property, or remove it, it's easy to overlook updating or removing a reference to it, and thereby introduce a bug into your application. Fortunately, Psalm can help here. If you set the following annotation on a model:

```php
* @psalm-seal-properties
```

Psalm will then flag any use of undefined dynamic properties on that model as an error. For dynamic ORM's like Eloquent that don't specifically define properties on the model itself, that would mean you'd have to use the `@property` annotation on the model to define each property. Fortunately, for Laravel, there's an easy way to automate this if you're using Laravel IDE Helper. Just run the following command and your models will have property annotations added automatically, based on the fields defined in the database and the relations defined on the models:

```bash
$ php artisan ide-helper:models -W
```

If you're using the Psalm plugin for Laravel (which you should), Laravel IDE Helper is a dependency of that, and so should already be installed. Don't forget that if your models, or the underlying fields, change, then you'll need to re-run that command to update the models.

Using `@psalm-seal-properties` can also reduce the need to write boilerplate getter and setter methods over and over in other contexts than Eloquent models, and I also find it useful for ensuring the correct fields on Zend form classes are used. Honestly, at this point, now that we can type properties, I struggle to think of a use case where it even makes sense to write getter and setter methods in modern code - the only one I can think of right now is if something needs to be validated or transformed in the getter or setter, such as converting a string date into a Carbon object.

### Refactoring away deprecated classes

The project I maintain has a number of truly awful legacy models that were built on top of the Zend 1 database interface, and are an utter nightmare to maintain. I'm in the process of migrating off of these and onto Eloquent, which I've managed to get working in this application. In order to facilitate this, we need to ensure any new code doesn't use the legacy models (at least, not directly). If we apply the `@deprecated` annotation to each of these classes, and then run `vendor/bin/psalm`, Psalm will flag every use of those deprecated classes as an issue. However, that's not very useful if you have too many uses of those deprecated classes to refactor them away in one go.

By instead creating a baseline file (or if you already have one, removing it, removing the reference to it in the `psalm.xml` file, and generating a new one), we can then keep track of existing references to the deprecated classes, and refactor them away at our own pace, while preventing any new uses of the deprecated classes.

### Fixing incorrect class name resolution within the framework without changing the source

One issue I frequently have is that the type annotations within Zend 1 are not terribly accurate, and as it's no longer maintained there's no point in trying to fix them. For instance, fetching the current request object in a controller requires that we call `$this->getRequest()`, but the return type for this is `Zend_Controller_Request_Abstract`, which is missing a number of methods that I typically need, but these methods do exist on `Zend_Controller_Request_Http`, which extends `Zend_Controller_Request_Abstract` and is what actually gets returned. So Psalm will flag use of those methods on the returned object as an error. To resolve this, I use an assert to tell Psalm what the actual class is:

```php
$request = $this->getRequest();
assert($request instanceof Zend_Controller_Request_Http);
```

Along similar lines, the view class in the controller is typehinted as an instance of `Zend_View_Interface`, but interfaces can't have properties, so Psalm flags that as an error, which can be resolved by using an assert to clarify the actual concrete class used:

```php
assert($this->view instanceof Zend_View);
```

Adding the call to `assert()` means that the PHP interpreter itself will enforce the type of the item, and it will throw an exception if the code executes and the type is wrong.

If you're still a little bit dubious and don't want the PHP interpreter to enforce the type, and would instead prefer to rely wholly on Psalm to find any instances where the type might be something else, you can instead annotate the type of the variable in the usual way, and Psalm will understand this:

```php
/** @var Zend_Controller_Request_Http $request */
```

However, I'd urge you to seriously consider using assertions in your code. They can be disabled in production, either by setting `zend.assertions` to `-1` in the `php.ini` file, or with the `assert_options()` function.

If you're dealing with a library or framework which has more widespread issues with inaccurate or incomplete types for parameters, return values or properties, it may be more convenient to [generate a stub file](https://psalm.dev/docs/running_psalm/plugins/authoring_plugins/) for it, and apply the fixes there. It may also be worth doing this if scanning said library or framework is something of a bottleneck for Psalm - this is the main reason why I wound up creating [a Psalm plugin for Zend 1](https://github.com/matthewbdaly/psalm-plugin-zendframework1). You don't have to publish the plugin if it doesn't make sense, but generating a stub file is a useful way of working around any inaccurate type declarations in third-party code.
