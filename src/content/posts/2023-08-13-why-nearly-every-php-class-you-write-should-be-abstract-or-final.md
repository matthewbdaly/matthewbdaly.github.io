---
title: "Why (nearly) every PHP class you write should be abstract or final"
date: 2023-08-13 15:00:00 +0000
layout: post
categories:
- php
comments: true
---

If your introduction to object-oriented PHP was anything like mine, inheritance was probably touted as one of the biggest advantages. It allowed you to easily extend existing code with minimal effort, and bend existing third-party packages to suit your needs. However, after nearly twelve years in the industry, I've come to the conclusion that in fact, inheritance is only a *comparatively* fringe benefit of object-oriented PHP. Nowadays, I declare most classes I write as final. Where I don't (probably less than 10% of all the classes I write), I nearly always declare them as abstract. And I'm finding it increasingly hard to *ever* justify leaving any class as neither abstract nor final.

I've come to appreciate that explicitly declaring every class you can as either abstract or final is a powerful method for enforcing certain aspects of good software design, for the following reasons:

## It signifies intent

If you declare a class as final, you are stating to any other developers that it's designed to do one thing, and one thing only, and so it's not intended to be extended to do something else. This is consistent with the Single Responsibility principle in SOLID.

Similarly, if you declare a class as abstract, you are stating to any other developers working with the code that this class has been designed specifically to be extended, and so they should feel free to do so as appropriate.

## It prevents other developers shooting themselves in the foot

It's relatively easy to design a class to do one thing and one thing only. It's a *lot* harder to design a class to do multiple things, or to do things in a generic fashion, and it's outright dangerous to just assume that your use case for something isn't different enough that you're going to have problems if you extend a class that's not designed to be extended.

It also means you're dependent on the private API of the code you're extending remaining compatible with the rest of the code. If you extend a third-party class, and make use of private methods declared on that class, then potentially *any* changes made to that class can break your class, not just documented changes to the public API.

In addition, if you develop or maintain a library, framework or other application that can be extended by other developers such as a content management system, declaring all your classes as abstract or final can potentially save you a lot of grief. If you receive a bug report on said project which touches on a class that is neither abstract nor final, it's entirely possible that said class has been inappropriately extended, and that the issue is actually caused by something in the reporter's class which extends yours.

## It prevents the "inheritance chain of doom"

We've all seen it, a long chain of classes where each one extends a preceding one slightly, with the ones lowest in the chain having been amended just to fix some minor inconvenience. Often the change is itself something comparatively trivial, such as a getter or setter, but often it's something that would be better solved through other means. Which leads us to...

## It encourages the use of composition over inheritance

Consider the use case of an existing class within a framework which fetches a user based on an ID, and can be swapped with an alternative implementation of the same class. This class means that every time the page loads while a user is logged in, it carries out the same query to get the user. This query could potentially be cached to improve application performance.

You *could* extend that class and add caching, but it's not a very good way to do it:

* It's dependent on the private API of that class, so in theory any undocumented changes to that API could break the class.
* It's bound to that class only, and can't be reused for alternative implementations.
* Adding caching to the wrapped class violates the single responsibility principle.

So instead, you could use composition, by creating a decorator class, which implements the same interface as the original class, but wraps the original class in a caching layer. This resolves both issues:

* The decorator class is completely independent of the original class, so it can be reused for alternative implementations without any changes.
* The decorator class relies *only* on the public API of the original class, so changes to the private API of the original class won't affect the decorator class in the slightest.
* If the public API of the interface changes, it will very obviously break the decorator class, making it easy to identify and fix.

This isn't a purely theoretical example - [I've used exactly this approach myself in Laravel](/blog/2020/03/11/caching-the-laravel-user-provider-with-a-decorator/). And it's a far more elegant, flexible and reusable approach than extending the class.

## A lot of classes don't ever need to be extended

For many classes in a typical project, particularly those built with an off-the-shelf MVC framework, you'll never need to extend them. Migrations are a good example of this - each migration does one thing and one thing only, and if you extend a migration you're doing something *seriously* dodgy. And there's very little need to ever extend controllers - if you're building a REST API, it might be useful to place common functionality in one resource controller for reuse, but it just doesn't make sense to extend one concrete class with another. Instead you're better off creating an abstract `ResourceController` class, and having your concrete resource classes extend that.

## Isn't OOP all about inheritance? Surely I'm giving up some of the benefits of OOP?

No, and this is a very bad misconception it took me *years* to unlearn.

The first web application I built solo in PHP, back in 2012, was using CodeIgniter 2, and at that point in my career I was still writing what was effectively procedural code, but stuffing it inside objects. That wasn't OOP, and it wasn't for around another five years before I realised that OOP wasn't about just *putting code in objects*, but about the *interactions between objects*. Nowadays, I rarely use primitive types such as arrays and scalar variables, because objects that can be more specifically typed are more type-safe (making tools like Psalm happier), and you can add functionality to them to make interactions easier.

The more granular you can make a class, the more likely it is that it can be easily reused (again, this is part of the single responsibility principle). Understanding this was a pivotal moment in my career. If each class is a relatively small thing that does one thing only, and depends on an interface, code reuse *really* doesn't require inheritance all that often. It's actually quite rare these days that I have any need whatsoever to extend a class, because most of my classes can be reused as-is, without the need for any changes, or if they do need extending, I can do so via composition.

## But if my classes are declared final, I can't mock them in tests?

No, you can't, unless you're going to [jump through hoops to do so](https://github.com/dg/bypass-finals). However, a sufficiently well-designed class shouldn't need you to do that anyway. For an awful lot of use cases, mocking isn't the best option anyway during testing:

* For value objects, you are probably best off working directly with the value objects themselves, rather than creating a mock of them. Creating an instance of a value object is often easier than creating a mock anyway. For instance, if I had the need to unit test a Laravel controller, I'd create a request object rather than mocking it.
* Likewise, many other utility classes are better off just being used directly. Something like a Laravel collection class is a good example - you may as well just use that as-is.
* For any class which implements an interface, you can just mock that interface. Any class that you might conceivably want to extend in the future should probably implement an interface anyway - the *only* ones where it doesn't make sense are generally single, irreplaceable classes like models or controllers. Even if it's a service that's irreplaceable (such as a third party service whose continued existence is essential to the project), it should *probably* implement an interface - you don't know what alternatives might become available in future, it may be useful to be able to decorate the service to add caching or logging, and it might also be useful to create a "dummy" version of said service for testing purposes.

## But if I can't extend classes, I can't reuse X part of the functionality of that class

This is a code smell, suggesting that said class is probably too large, and does too much. You should consider extracting that functionality into a new class, which is then a dependency of that class.

For instance, say you have a library that sends emails to users, and that has drivers for, say, SMTP, and the Mailgun API. Suppose you want to create a new driver for Mailchimp transactional emails which also works over HTTP, so you want to reuse some of the functionality from the Mailgun driver. Extending the Mailgun driver to reuse the HTTP request functionality that makes the requests *might* allow you to achieve that, but it causes several additional problems:

* The Mailgun driver is now a dependency of the Mailchimp driver, so any change to the Mailgun driver can potentially break the Mailchimp driver.
* If Mailgun driver is removed, the functionality will need to be moved over to the Mailchimp driver.

<Notice>
Yes, this is a somewhat contrived (and probably rather excessive) example, but it demonstrates the point.
</Notice>

Under these circumstances, the best solution would likely be to create a `Transport` interface, extract the HTTP functionality into a new `HttpTransport` class that implements the `Transport` interface, and then use the class in both the Mailgun and Mailchimp drivers. This would also allow the transport method to be mocked, so it could be tested more easily without sending actual HTTP requests. Another option might be to extract the HTTP functionality to an `HttpDriver` abstract class, which is extended by both the Mailgun and Mailchimp API drivers.

## Surely making the mistakes stopped by declaring classes final is just a training issue?

No, it's more complex than that.

If I'm not your line manager or a member of the same development team, I'm not responsible for your training and personal development as a coder, and likely can have little influence on that. But even if our only interaction is in regards to, say, a library I wrote and put on Github that you're using, I have a vested interest in making sure you use it in a way I'd consider safe. If you go and extend it and report a bug that turns out to be in a class that extends mine, that's going to be a waste of my time to deal with. And I can fill my documentation with notes about "This class isn't meant to be extended. Don't extend it", but I've still got no guarantees. But if I add one single final keyword I have a cast-iron guarantee that it's impossible to extend, and I don't need to think about it any more.

Preventing people from taking the quick and easy way of extending a class that's not intended to be extended also stops quick-and-dirty solutions, and enables teachable moments. If someone on my team can't extend a class I wrote, they'll go looking for other ways around it, and will likely discover a more appropriate alternative, such as the decorator pattern. And if someone does the same with an open source library I wrote, either they'll do the same through research, or if they come to me, I merely need to point them at a more appropriate alternative approach.

## Isn't this a bit of a fringe view?

Not in the slightest. Here are some other posts by experienced PHP developers that cover the same subject:

* [When to declare classes final](https://ocramius.github.io/blog/when-to-declare-classes-final/)
* [Final classes in PHP](https://verraes.net/2014/05/final-classes-in-php/)
* [Final classes by default, why?](https://matthiasnoback.nl/2018/09/final-classes-by-default-why/)

## Okay, I'm sold. How can I enforce this on my projects?

There are a number of ways you can do so:

* PHP CS Fixer has a [rule](https://cs.symfony.com/doc/rules/class_notation/final_class.html) to enforce that every class **must** be abstract or final, except for Doctrine classes. If you're not *quite* ready to adopt that, you may want to consider enforcing that [all internal classes should be final](https://cs.symfony.com/doc/rules/class_notation/final_internal_class.html), and/or that [all public methods of abstract classes must be final](https://cs.symfony.com/doc/rules/class_notation/final_public_method_for_abstract_class.html).
* The Slevomat coding standard for PHP Codesniffer has a [sniff](https://github.com/slevomat/coding-standard/blob/master/doc/classes.md#slevomatcodingstandardclassesrequireabstractorfinal-) that enforces that every class must be abstract or final.
* The [Pest Architecture plugin](https://pestphp.com/docs/arch-testing) has rules that allow you to enforce use of the abstract or final modifier on classes based on rules you define.

## Summary

Explicitly declaring all classes I can as either `abstract` or `final` has greatly improved the quality of my code. It's forced me to up my game in terms of application design, by stopping me from taking all kinds of dodgy shortcuts, and to find better solutions. It's also encouraged me to shrink my classes down to be more granular, enabling code reuse *without* extension. I highly recommend giving it a try if you aren't already, and seeing what kind of difference it makes to the code you write in the long term.
