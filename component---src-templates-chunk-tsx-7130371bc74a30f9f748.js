(self.webpackChunkmatthew_dalys_blog=self.webpackChunkmatthew_dalys_blog||[]).push([[578],{79973:function(e,t,a){"use strict";a.d(t,{Z:function(){return s}});var l=a(67294),n=a(25444),r=function(e){return l.createElement(n.Link,{to:e.path,rel:"next"},e.title," →")},i=function(e){return l.createElement(n.Link,{to:e.path,rel:"prev"},"← ",e.title)},s=function(e){return l.createElement("nav",{className:"pt-4 clear-both"},l.createElement("div",{className:"float-left"},e.previous&&l.createElement(i,{path:e.previous.path,title:e.previous.title})),l.createElement("div",{className:"float-right"},e.next&&l.createElement(r,{path:e.next.path,title:e.next.title})))}},62314:function(e,t,a){"use strict";a.r(t);var l=a(67294),n=a(25444),r=a(55655),i=a(79973),s=a(33350);t.default=function(e){var t=e.pageContext,a=e.data,c=a.site.siteMetadata.title,o=t.currentPage,p=t.nextPage,m=t.previousPage;return l.createElement(l.Fragment,null,l.createElement(s.Z,{title:"Page "+o,description:c+" - Page "+o}),l.createElement(r.Z,{title:c,siteUrl:a.site.siteMetadata.siteUrl},l.createElement(l.Fragment,null,a.allMdx.edges.map((function(e){var t=e.node;return l.createElement("section",{key:t.fields.path,className:"w-full py-2"},l.createElement(n.Link,{className:"float-left w-full text-2xl font-bold",to:t.fields.path},t.frontmatter.title),l.createElement("p",{className:"float-left py-2"},t.frontmatter.date),l.createElement("p",{className:"float-left py-2"},t.excerpt))}))),l.createElement(i.Z,{previous:m&&{path:"/posts/"+m,title:"Page "+m},next:p&&{path:"/posts/"+p,title:"Page "+p}})))}}}]);
//# sourceMappingURL=component---src-templates-chunk-tsx-7130371bc74a30f9f748.js.map