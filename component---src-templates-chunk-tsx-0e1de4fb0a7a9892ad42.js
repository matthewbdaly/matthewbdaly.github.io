"use strict";(self.webpackChunkmatthew_dalys_blog=self.webpackChunkmatthew_dalys_blog||[]).push([[578],{87770:function(e,t,a){a.d(t,{Z:function(){return o}});var l=a(67294),n=a(1597),r=function(e){return l.createElement(n.Link,{to:e.path,rel:"next",className:"float-right w-1/2 p-2 shadow-sm hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-300 ease-in-out"},l.createElement("p",null,l.createElement("strong",null,"→ Next page")),l.createElement("p",{className:"pl-6"},e.title))},s=function(e){return l.createElement(n.Link,{to:e.path,rel:"prev",className:"float-left w-1/2 p-2 shadow-sm hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-300 ease-in-out"},l.createElement("p",null,l.createElement("strong",{className:"font-bold clear-both"},"← Previous page")),l.createElement("p",{className:"pl-6"},e.title))},o=function(e){return l.createElement("nav",{className:"pt-4 clear-both box-border"},e.previous&&l.createElement(s,{path:e.previous.path,title:e.previous.title}),e.next&&l.createElement(r,{path:e.next.path,title:e.next.title}))}},79372:function(e,t,a){var l=a(67294),n=a(1597);t.Z=function(e){return l.createElement("div",{className:"w-full py-2"},l.createElement(n.Link,{className:"float-left w-full text-2xl font-bold",to:e.path},e.title),l.createElement("p",{className:"float-left py-2"},e.date),l.createElement("p",{className:"float-left py-2"},e.excerpt))}},45701:function(e,t,a){a.r(t);var l=a(67294),n=a(70007),r=a(87770),s=a(17135),o=a(79372);t.default=function(e){var t=e.pageContext,a=e.data,i=e.location,c=a.site.siteMetadata.title,p=t.currentPage,m=t.nextPage,u=t.previousPage,f=a.site.siteMetadata.siteUrl+i.pathname;return l.createElement(l.Fragment,null,l.createElement(s.Z,{title:"Page "+p,description:c+" - Page "+p,url:f}),l.createElement(n.Z,{title:c},l.createElement("div",{className:"space-y-32"},a.allMdx.edges.map((function(e){var t=e.node;return l.createElement(o.Z,{key:t.fields.path,path:t.fields.path,title:t.frontmatter.title,date:t.frontmatter.date,excerpt:t.excerpt})}))),l.createElement(r.Z,{previous:u&&{path:"/posts/"+u,title:"Page "+u},next:m&&{path:"/posts/"+m,title:"Page "+m}})))}}}]);
//# sourceMappingURL=component---src-templates-chunk-tsx-0e1de4fb0a7a9892ad42.js.map