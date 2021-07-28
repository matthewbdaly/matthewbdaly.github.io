---
title: "Moving to Gatsby.js"
date: 2021-07-28 14:36:00 +0000
layout: post
categories:
- javascript
- typescript
- react
- gatsbyjs
comments: true
---

If you're visting this site directly, rather than via RSS, you may have noticed that I've updated the whole thing. It's now built in Typescript, using Gatsby.js, and with Tailwind for the styling.

This site has been through several incarnations, going from flat HTML, to Wordpress, to Octopress, before in 2015 I settled on my own custom static site generator, built as a Grunt plugin. This worked fine and produced a performant, simple flat HTML site, but over the last few years I'd started to have issues with it:

* I haven't used Grunt as a build tool for anything else since 2015, and it's not as performant as more modern tools
* I also don't use Handlebars anymore, and that was the templating system I used for the site. These days React is my go-to and that makes a lot of dynamic functionality simpler
* I also don't use Bootstrap anymore, having dropped it for Tailwind, but that would be difficult to integrate with a Grunt-based workflow

As such, for the last couple of years I've wanted to migrate off it for something more modern. Early on, Gatsby looked like the strongest candidate since it used React, offered a GraphQL-based abstraction layer for easier querying, had a rich ecosystem of plugins for common functionality, and was highly performant, but I made about three attempts to rebuild my site in it which petered out over time. Then, earlier this year I decided to start over and had a lot more success. I did struggle a bit getting a halfway decent design, and for a while pivoted to trying to build it with Next.js instead - this was ultimately abandoned because without the GraphQL abstraction layer, a lot of the querying became a real chore, but I did ultimately decide to port the appearance of that over to the Gatsby site.

One of the things that made this particular implementation the one that stuck was [MDX](https://mdxjs.com/). If you're not familiar with it, it's a superset of Markdown that lets you include JSX in your content, allowing for easy addition of reusable UI components within page and blog post content. Also, building it in Typescript was a good call - I'd been sticking with Flow for several years, but unfortunately it's looking like Flow has fallen by the wayside and Typescript has become the only realistic typed solution for Javascript developers, so I felt it was time to adopt that. I've also enjoyed how easy Tailwind was to use (implementing dark mode was really simple), and have been able to implement JSON feeds as well as the standard RSS and Atom ones. Also, for the first time since I dropped Octopress, I now have the ability to add a title and highlight individual lines in code blocks.

I did have to make a few tough decisions about what to drop as well:

* These days I have a few issues with how AMP works, and the site is responsive and works well on mobile, so I decided to drop AMP entirely. The old AMP versions of pages redirect to their standard versions now.
* Due to issues with creating dynamic RSS feeds in Gatsby.js, I decided not to port over the per-category RSS feeds.

I have to admit, I've been neglecting posting on this site for a while, largely because I was working on this - it's now nearly the end of July and this is my first post of the year - but now that I've got this done, I'm hoping I will be able to post more. One of my biggest motivations to do this has been that I'm particularly interested in doing more posts about React.js, and adopting MDX not only means that I can embed components in my posts, but I've also been able to integrate `react-live` into the site so I can embed editable examples in here too, which is potentially very powerful when demonstrating a concept.
