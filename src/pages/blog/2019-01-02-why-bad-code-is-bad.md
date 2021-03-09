---
title: "Why bad code is bad"
date: 2019-01-02 23:00:50 +0000
categories:
- productivity
comments: true
---

This may sound a little trite, but why is it bad to write bad code?

Suppose you're a client, or a line manager for a team of developers. You work with developers regularly, but when they say that a code base is bad, what are the consequences of that, and how can you justify spending time and money to fix it? I've often heard the refrain "If it works, it doesn't matter", which may have a grain of truth, but is somewhat disingenuous. In this post, I'll explain some of the consequences when your code base is bad. It can be hard to put a definitive price tag on the costs associated with delivering bad code, but this should give some idea of the sort of issues you should take into account.

Bad code kills developer productivity
=====================================

Bad code is harder to understand, navigate and reason about than good code. Developers are not superhuman, and we can only hold so much in our heads at one time, which is why many of the principles behind a clean and maintainable code base can essentially be boiled down to "break it into bite-sized chunks so developers can understand each one in isolation before seeing how they fit together".

If one particular class or function gets too big and starts doing too much, it quickly becomes very, very hard to get your head around what that code does. Developers typically have to build a mental model of how a class or function works before they can use it effectively, and the smaller and simpler you can keep each unit of code, the less time and effort it takes to do so. The mark of a skilled developer is not the complexity of their code bases, but their simplicity - they've learned to make their code as small, simple, and readable as possible. A clean and well laid-out code base makes it easy for developers to get into the mental state called "flow" that is significantly more productive.

In addition, if an application doesn't conform to accepted conventions in some way, such as using inappropriate HTTP verbs (eg `GET` to change the state of something), then quite apart from the fact that it won't play well with proxy servers, it imposes an additional mental load on developers by forcing them to drop a reasonable set of assumptions about how the application works. If the application used the correct HTTP verbs, experienced developers would know without being told that to create a new report, you'd send a `POST` request to the `reports` API endpoint.

During the initial stages of a project, functionality can be delivered quite quickly, but if the code quality is poor, then over time developer velocity can decrease. Ensuring a higher quality code base helps to maintain velocity at a consistent level as it gets bigger. This also means estimates will be more accurate, so if you quote a given number of hours for a feature, you're more likely to deliver inside that number of hours.

Bad code is bad for developer welfare
=====================================

A code base that's repetitive, badly organised, overly complex and hard to read is a recipe for stressed developers, making burnout more likely. If a developer suffers burnout, their productivity will drop substantially.

In the longer term, if developer burnout isn't managed correctly, it could easily increase developer turnover as stressed developers quit. It's also harder to recruit new developers if they're faced with the prospect of dealing with a messy, stressful code base.

Bad code hampers your ability to pivot
======================================

If the quality of your code base is poor, it can mean that if functionality needs to be changed or added, then more work is involved. Repetitive code can mean something has to be updated in more than one place, and if it becomes too onerous, it can make it too time-consuming or expensive to justify the changes.

Bad code may threaten the long-term viability of your project
=============================================================

One thing that is certain in our industry is that things change. Libraries, languages and frameworks are constantly being updated, and sometimes there will be potentially breaking changes to some of these. On occasion, a library or framework will be discontinued, making it necessary to migrate to a replacement.

Bad code is often tightly coupled to a particular framework or library, and sometimes even to a particular version, making it harder to migrate if it becomes necessary. If a project was written with a language or framework version that had a serious issue, and was too tightly coupled to migrate to a newer version, it might be too risky to keep it running, or it might be necessary to run an insecure application in spite of the risks it posed.

Bad code is more brittle
========================

A poor code base will break, a lot, and often in ways that are clearly visible to end users. Duplicate code makes it easy to miss cases where something needs to be updated in more than one place, and if the code base lacks tests, a serious error may not be noticed for a long time, especially if it's something comparatively subtle.

Bad code is hard, if not impossible, to write automated tests for
=================================================================

If a particular class or function does too much, it becomes *much* harder to write automated tests for it because there are more variables going in and more expected outcomes. A sufficiently messy code base may only really be testable by automating the browser, which tends to be very slow and brittle, making test-driven development impractical. Manual testing is no substitute for a proper suite of automated tests, since it's slower, less consistent and not repeatable in the same way, and it's only sufficient by itself for the most trivial of web apps.

Bad code is often insecure
==========================

A bad code base may inadvertently expose user's data, or be at risk from all kinds of attacks such as cross-site scripting and SQL injection attacks that can also potentially expose too much data.

For any business with EU-based users, the risks of exposing user's data are very serious. Under the GDPR, there's a potential fine of up to &euro;20 million, or 4% of turnover. That's potentially an existential risk for many companies.

In addition, a bad code base is often more vulnerable to denial-of-service attacks. If it has poor or no caching, excessive queries, or inefficient queries, then every time a page loads it will carry out more queries than a more optimised site would. Given the same server specs, the inefficient site will be overwhelmed quicker than the efficient one.

Summary
=======

It's all too easy to focus solely on delivering a working product and not worry about the quality of the code base when time spent cleaning it up doesn't pay the bills, and it can be hard to justify the cost of cleaning it up later to clients.

There are tools you can use to help keep up code quality, such as linters and static analysers, and it's never a bad idea to investigate the ones available for the language(s) you work in. For best results they should form part of your continuous integration pipeline, so you can monitor changes over time and prompt developers who check in problematic code to fix the issues. Code reviews are another good way to avoid bad code, since they allow developers to find problematic code and offer more elegant solutions.

I'm not suggesting that a code base that has a few warts has no value, or that you should sink huge amounts of developer time into refactoring messy code when money is tight, as commercial concerns do have to come first. But a bad code base does cause serious issues that have financial implications, and it's prudent to recognise the problems it could cause, and take action to resolve them, or better yet, prevent them occurring in the first place.
