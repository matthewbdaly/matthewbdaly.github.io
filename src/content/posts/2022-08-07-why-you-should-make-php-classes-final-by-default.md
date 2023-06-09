---
title: Why you should make PHP classes final by default
date: 2022-08-07T15:21:27.097Z
categories:
  - php
---
With respect, I disagree vehemently with this. First off, it's not a "training issue" - sometimes the people using your class simply aren't your responsibility, such as if you're writing a library, but you still want to stop them shooting themselves in the foot with inheritance. The mock issue can be overcome by having the class implement an interface and mocking that. If some of the functionality needs to be reused it can be extracted to a subclass or trait, and if you need to duplicate a significant amount of code to reimplement functionality the class was probably too big anyway.

Sorry, the refactoring is called Extract class, not extract subclass.

As for flexibility, that again often comes down to the class doing too much - if your implementation isn't flexible enough without being extended it's probably doing too much and you should consider refactoring some of the functionality out into separate classes. And for some changes in behaviour such as adding caching or logging, decorating the class is a better method that's not tied to that implementation and keeps the new functionality separate.

If you're not someone's line manager or a member of the same development team, you aren't responsible for their training and personal development as coders, and likely can have little influence on that. But even if our only interaction is in regards to, say, a library I wrote and put on Github that you're using, I have a vested interest in making sure people use it in a way I'd consider safe. If you go and extend it and report a bug that turns out to be in a class that extends mine, that's going to be a waste of my time to deal with

And I can fill my documentation with notes about "This class isn't meant to be extended. Don't extend it", but I've still got no guarantees. But if I add one single `final` keyword I have a cast-iron guarantee that it's impossible to extend, and I don't need to think about it any more. If someone needs to add functionality they can do so the correct way, through composition.

As for the issue about a variant of the class, you have a number of options. For instance, suppose you had a library that dealt with sending emails, some via REST and some via SOAP. You could extract the part that deals with sending the actual request to two Transport subclasses, one for REST and one for SOAP, and use them in your variant classes. Or you could extract that functionality to a trait.

Yes, there are some occasional cases where it does mean you do wind up duplicating code a little, but if you're doing a good job of extracting things to subclasses it's pretty rare anyway. A handful of lines aren't that big a deal.

I'd also add this it's not entirely impossible to mock classes marked as final - the package `dg/bypass-finals` makes this possible. But a well-designed application should be dependent only on interfaces, not concrete classes. 

Using `final` is not an act of hubris, and it doesn't "crystallise" your code as being the best approach ever. All it is saying is "This class is not designed to be extended". Designing a class to be extended is a *lot* more work than designing one that isn't, and if you go and extend a class that's not explicitly designed to be extended, you're *extremely* likely to end up shooting yourself in the foot. Increasingly I'm of the opinion that inheritance is only a fringe benefit of OOP and should have less emphasis - OOP is more about interaction between objects than inheritance.

As long as you depend on interfaces, not concrete classes, mocking isn't an issue, and you can extend functionality without inheritance by using the [decorator pattern](https://refactoring.guru/design-patterns/decorator/php/example#example-1), which is a much more elegant and cleaner method in many cases. 

Extending classes that aren't explicitly intended to be extended can also be a minefield of bugs. The internal API may not be kept consistent, so it may break any time you run `composer update`. The decorator pattern is often a safer alternative because it depends on a defined interface, so as long as that interface remains consistent, it should be fairly safe.

Plus there are many classes that by definition you will almost never want to extend. Controllers and models will often fall into that category, and where they are intended to be extended (such as a generic "resource" controller for an API), they often represent abstract versions of those items, in which case they should be declared as `abstract` to make this explicit. Likewise, I can't think of any circumstances under which a database migration class would ever need to be extended.

For other purposes, as long as a class implements a given interface, that interface covers the entire public API of that class, and the things that depend on that class are dependent only on the interface, then I would always make that class final, because it's easy to replace with any other implementation, and we can change the functionality without changing the class by using a decorator.