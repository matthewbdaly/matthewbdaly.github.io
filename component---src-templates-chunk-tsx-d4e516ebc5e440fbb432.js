(self.webpackChunkmatthew_dalys_blog=self.webpackChunkmatthew_dalys_blog||[]).push([[578],{79973:function(e,t,a){"use strict";a.d(t,{Z:function(){return c}});var l=a(67294),n=a(25444),r=function(e){return l.createElement(n.Link,{to:e.path,rel:"next"},e.title," →")},i=function(e){return l.createElement(n.Link,{to:e.path,rel:"prev"},"← ",e.title)},c=function(e){return l.createElement("nav",{className:"pt-4 clear-both"},l.createElement("div",{className:"float-left"},e.previous&&l.createElement(i,{path:e.previous.path,title:e.previous.title})),l.createElement("div",{className:"float-right"},e.next&&l.createElement(r,{path:e.next.path,title:e.next.title})))}},340:function(e,t,a){"use strict";var l=a(67294),n=a(25444);t.Z=function(e){return l.createElement("div",{className:"w-full py-2"},l.createElement(n.Link,{className:"float-left w-full text-2xl font-bold",to:e.path},e.title),l.createElement("p",{className:"float-left py-2"},e.date),l.createElement("p",{className:"float-left py-2"},e.excerpt))}},62314:function(e,t,a){"use strict";a.r(t);var l=a(67294),n=a(34606),r=a(79973),i=a(33350),c=a(340);t.default=function(e){var t=e.pageContext,a=e.data,s=a.site.siteMetadata.title,p=t.currentPage,o=t.nextPage,u=t.previousPage;return l.createElement(l.Fragment,null,l.createElement(i.Z,{title:"Page "+p,description:s+" - Page "+p}),l.createElement(n.Z,{title:s,siteUrl:a.site.siteMetadata.siteUrl},l.createElement("div",{className:"space-y-32"},a.allMdx.edges.map((function(e){var t=e.node;return l.createElement(c.Z,{key:t.fields.path,path:t.fields.path,title:t.frontmatter.title,date:t.frontmatter.date,excerpt:t.excerpt})}))),l.createElement(r.Z,{previous:u&&{path:"/posts/"+u,title:"Page "+u},next:o&&{path:"/posts/"+o,title:"Page "+o}})))}}}]);
//# sourceMappingURL=component---src-templates-chunk-tsx-d4e516ebc5e440fbb432.js.map