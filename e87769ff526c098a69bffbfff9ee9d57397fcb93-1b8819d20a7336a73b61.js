(self.webpackChunkmatthew_dalys_blog=self.webpackChunkmatthew_dalys_blog||[]).push([[977],{32993:function(e){var t="undefined"!=typeof Element,r="function"==typeof Map,n="function"==typeof Set,o="function"==typeof ArrayBuffer&&!!ArrayBuffer.isView;function a(e,i){if(e===i)return!0;if(e&&i&&"object"==typeof e&&"object"==typeof i){if(e.constructor!==i.constructor)return!1;var c,l,u,s;if(Array.isArray(e)){if((c=e.length)!=i.length)return!1;for(l=c;0!=l--;)if(!a(e[l],i[l]))return!1;return!0}if(r&&e instanceof Map&&i instanceof Map){if(e.size!==i.size)return!1;for(s=e.entries();!(l=s.next()).done;)if(!i.has(l.value[0]))return!1;for(s=e.entries();!(l=s.next()).done;)if(!a(l.value[1],i.get(l.value[0])))return!1;return!0}if(n&&e instanceof Set&&i instanceof Set){if(e.size!==i.size)return!1;for(s=e.entries();!(l=s.next()).done;)if(!i.has(l.value[0]))return!1;return!0}if(o&&ArrayBuffer.isView(e)&&ArrayBuffer.isView(i)){if((c=e.length)!=i.length)return!1;for(l=c;0!=l--;)if(e[l]!==i[l])return!1;return!0}if(e.constructor===RegExp)return e.source===i.source&&e.flags===i.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===i.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===i.toString();if((c=(u=Object.keys(e)).length)!==Object.keys(i).length)return!1;for(l=c;0!=l--;)if(!Object.prototype.hasOwnProperty.call(i,u[l]))return!1;if(t&&e instanceof Element)return!1;for(l=c;0!=l--;)if(("_owner"!==u[l]&&"__v"!==u[l]&&"__o"!==u[l]||!e.$$typeof)&&!a(e[u[l]],i[u[l]]))return!1;return!0}return e!=e&&i!=i}e.exports=function(e,t){try{return a(e,t)}catch(r){if((r.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw r}}},24839:function(e,t,r){"use strict";var n,o=r(67294),a=(n=o)&&"object"==typeof n&&"default"in n?n.default:n;function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var c=!("undefined"==typeof window||!window.document||!window.document.createElement);e.exports=function(e,t,r){if("function"!=typeof e)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof t)throw new Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==r&&"function"!=typeof r)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(n){if("function"!=typeof n)throw new Error("Expected WrappedComponent to be a React component.");var l,u=[];function s(){l=e(u.map((function(e){return e.props}))),f.canUseDOM?t(l):r&&(l=r(l))}var f=function(e){var t,r;function o(){return e.apply(this,arguments)||this}r=e,(t=o).prototype=Object.create(r.prototype),t.prototype.constructor=t,t.__proto__=r,o.peek=function(){return l},o.rewind=function(){if(o.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var e=l;return l=void 0,u=[],e};var i=o.prototype;return i.UNSAFE_componentWillMount=function(){u.push(this),s()},i.componentDidUpdate=function(){s()},i.componentWillUnmount=function(){var e=u.indexOf(this);u.splice(e,1),s()},i.render=function(){return a.createElement(n,this.props)},o}(o.PureComponent);return i(f,"displayName","SideEffect("+function(e){return e.displayName||e.name||"Component"}(n)+")"),i(f,"canUseDOM",c),f}}},34606:function(e,t,r){"use strict";r.d(t,{Z:function(){return c}});var n=r(67294),o=r(25444),a=function(e){return n.createElement("span",{className:"inline-block pr py-2 mr-8 lg:mt-4 text-sm text-gray-900 dark:text-gray-200 border-b-4 border-transparent hover:border-green-400 transition-colors duration-500"},n.createElement(o.Link,{to:e.to},e.text))},i=function(){var e=(0,o.useStaticQuery)("290055352").site;return n.createElement("footer",{className:"w-full p-4 text-gray-100 bg-gray-800"},n.createElement("div",{className:"w-full md:w-2/3 p-2 mx-auto text-center flex flex-col md:flex-row flex-wrap justify-center"},n.createElement(o.Link,{className:"my-2 mx-8",to:"/posts/1"},"Blog"),n.createElement(o.Link,{className:"my-2 mx-8",to:"/about"},"About"),n.createElement(o.Link,{className:"my-2 mx-8",to:"https://twitter.com/"+e.siteMetadata.social.twitter},"Twitter"),n.createElement(o.Link,{className:"my-2 mx-8",to:"https://github.com/"+e.siteMetadata.social.github},"Github"),n.createElement(o.Link,{className:"my-2 mx-8",to:"/rss.xml"},"Feed")),n.createElement("div",{className:"w-full p-4 mx-auto text-center md:w-2/3"},n.createElement("p",null,"© Matthew Daly ",(new Date).getFullYear())))},c=function(e){var t=e.title,r=e.children;return n.createElement(n.Fragment,null,n.createElement("div",{className:"flex flex-col min-h-screen font-sans text-lg antialiased text-gray-800 bg-gray-50 dark:text-gray-100 dark:bg-gray-700 leading-6 pb-16"},n.createElement("div",{className:"w-full h-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500"}),n.createElement("nav",{className:"w-full p-4 mx-auto lowercase md:w-2/3"},n.createElement("h1",{className:"block float-none py-4 text-4xl text-center lg:float-left lg:text-left"},n.createElement(o.Link,{to:"/"},t)),n.createElement("div",{className:"py-2 text-center lg:float-right md:block lg:text-left"},n.createElement(a,{to:"/blog/archives",text:"Archives"}),n.createElement(a,{to:"/about",text:"About"}),n.createElement(a,{to:"/uses",text:"Uses"}),n.createElement(a,{to:"/posts/1",text:"Blog"}),n.createElement(a,{to:"/blog/categories",text:"Categories"}),n.createElement(a,{to:"/search",text:"Search"}))),n.createElement("div",{className:"w-full h-4 clear"}),n.createElement("main",{className:"flex-grow w-full p-4 mx-auto md:w-2/3"},r)),n.createElement(i,null))}},33350:function(e,t,r){"use strict";r.d(t,{Z:function(){return ge}});var n,o,a,i,c=r(67294),l=r(45697),u=r.n(l),s=r(24839),f=r.n(s),p=r(32993),d=r.n(p),m=r(46494),h=r.n(m),y="bodyAttributes",b="htmlAttributes",g="titleAttributes",w={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title"},v=(Object.keys(w).map((function(e){return w[e]})),"charset"),T="cssText",E="href",A="http-equiv",x="innerHTML",C="itemprop",O="name",k="property",S="rel",j="src",L="target",P={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},M="defaultTitle",N="defer",I="encodeSpecialCharacters",R="onChangeClientState",_="titleTemplate",B=Object.keys(P).reduce((function(e,t){return e[P[t]]=t,e}),{}),D=[w.NOSCRIPT,w.SCRIPT,w.STYLE],F="data-react-helmet",H="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},q=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},U=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),Y=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},z=function(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r},K=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},V=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return!1===t?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},W=function(e){var t=J(e,w.TITLE),r=J(e,_);if(r&&t)return r.replace(/%s/g,(function(){return Array.isArray(t)?t.join(""):t}));var n=J(e,M);return t||n||void 0},Q=function(e){return J(e,R)||function(){}},Z=function(e,t){return t.filter((function(t){return void 0!==t[e]})).map((function(t){return t[e]})).reduce((function(e,t){return Y({},e,t)}),{})},$=function(e,t){return t.filter((function(e){return void 0!==e[w.BASE]})).map((function(e){return e[w.BASE]})).reverse().reduce((function(t,r){if(!t.length)for(var n=Object.keys(r),o=0;o<n.length;o++){var a=n[o].toLowerCase();if(-1!==e.indexOf(a)&&r[a])return t.concat(r)}return t}),[])},G=function(e,t,r){var n={};return r.filter((function(t){return!!Array.isArray(t[e])||(void 0!==t[e]&&ne("Helmet: "+e+' should be of type "Array". Instead found type "'+H(t[e])+'"'),!1)})).map((function(t){return t[e]})).reverse().reduce((function(e,r){var o={};r.filter((function(e){for(var r=void 0,a=Object.keys(e),i=0;i<a.length;i++){var c=a[i],l=c.toLowerCase();-1===t.indexOf(l)||r===S&&"canonical"===e[r].toLowerCase()||l===S&&"stylesheet"===e[l].toLowerCase()||(r=l),-1===t.indexOf(c)||c!==x&&c!==T&&c!==C||(r=c)}if(!r||!e[r])return!1;var u=e[r].toLowerCase();return n[r]||(n[r]={}),o[r]||(o[r]={}),!n[r][u]&&(o[r][u]=!0,!0)})).reverse().forEach((function(t){return e.push(t)}));for(var a=Object.keys(o),i=0;i<a.length;i++){var c=a[i],l=h()({},n[c],o[c]);n[c]=l}return e}),[]).reverse()},J=function(e,t){for(var r=e.length-1;r>=0;r--){var n=e[r];if(n.hasOwnProperty(t))return n[t]}return null},X=(n=Date.now(),function(e){var t=Date.now();t-n>16?(n=t,e(t)):setTimeout((function(){X(e)}),0)}),ee=function(e){return clearTimeout(e)},te="undefined"!=typeof window?window.requestAnimationFrame&&window.requestAnimationFrame.bind(window)||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||X:r.g.requestAnimationFrame||X,re="undefined"!=typeof window?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||ee:r.g.cancelAnimationFrame||ee,ne=function(e){return console&&"function"==typeof console.warn&&console.warn(e)},oe=null,ae=function(e,t){var r=e.baseTag,n=e.bodyAttributes,o=e.htmlAttributes,a=e.linkTags,i=e.metaTags,c=e.noscriptTags,l=e.onChangeClientState,u=e.scriptTags,s=e.styleTags,f=e.title,p=e.titleAttributes;le(w.BODY,n),le(w.HTML,o),ce(f,p);var d={baseTag:ue(w.BASE,r),linkTags:ue(w.LINK,a),metaTags:ue(w.META,i),noscriptTags:ue(w.NOSCRIPT,c),scriptTags:ue(w.SCRIPT,u),styleTags:ue(w.STYLE,s)},m={},h={};Object.keys(d).forEach((function(e){var t=d[e],r=t.newTags,n=t.oldTags;r.length&&(m[e]=r),n.length&&(h[e]=d[e].oldTags)})),t&&t(),l(e,m,h)},ie=function(e){return Array.isArray(e)?e.join(""):e},ce=function(e,t){void 0!==e&&document.title!==e&&(document.title=ie(e)),le(w.TITLE,t)},le=function(e,t){var r=document.getElementsByTagName(e)[0];if(r){for(var n=r.getAttribute(F),o=n?n.split(","):[],a=[].concat(o),i=Object.keys(t),c=0;c<i.length;c++){var l=i[c],u=t[l]||"";r.getAttribute(l)!==u&&r.setAttribute(l,u),-1===o.indexOf(l)&&o.push(l);var s=a.indexOf(l);-1!==s&&a.splice(s,1)}for(var f=a.length-1;f>=0;f--)r.removeAttribute(a[f]);o.length===a.length?r.removeAttribute(F):r.getAttribute(F)!==i.join(",")&&r.setAttribute(F,i.join(","))}},ue=function(e,t){var r=document.head||document.querySelector(w.HEAD),n=r.querySelectorAll(e+"["+"data-react-helmet]"),o=Array.prototype.slice.call(n),a=[],i=void 0;return t&&t.length&&t.forEach((function(t){var r=document.createElement(e);for(var n in t)if(t.hasOwnProperty(n))if(n===x)r.innerHTML=t.innerHTML;else if(n===T)r.styleSheet?r.styleSheet.cssText=t.cssText:r.appendChild(document.createTextNode(t.cssText));else{var c=void 0===t[n]?"":t[n];r.setAttribute(n,c)}r.setAttribute(F,"true"),o.some((function(e,t){return i=t,r.isEqualNode(e)}))?o.splice(i,1):a.push(r)})),o.forEach((function(e){return e.parentNode.removeChild(e)})),a.forEach((function(e){return r.appendChild(e)})),{oldTags:o,newTags:a}},se=function(e){return Object.keys(e).reduce((function(t,r){var n=void 0!==e[r]?r+'="'+e[r]+'"':""+r;return t?t+" "+n:n}),"")},fe=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,r){return t[P[r]||r]=e[r],t}),t)},pe=function(e,t,r){switch(e){case w.TITLE:return{toComponent:function(){return e=t.title,r=t.titleAttributes,(n={key:e})[F]=!0,o=fe(r,n),[c.createElement(w.TITLE,o,e)];var e,r,n,o},toString:function(){return function(e,t,r,n){var o=se(r),a=ie(t);return o?"<"+e+' data-react-helmet="true" '+o+">"+V(a,n)+"</"+e+">":"<"+e+' data-react-helmet="true">'+V(a,n)+"</"+e+">"}(e,t.title,t.titleAttributes,r)}};case y:case b:return{toComponent:function(){return fe(t)},toString:function(){return se(t)}};default:return{toComponent:function(){return function(e,t){return t.map((function(t,r){var n,o=((n={key:r})[F]=!0,n);return Object.keys(t).forEach((function(e){var r=P[e]||e;if(r===x||r===T){var n=t.innerHTML||t.cssText;o.dangerouslySetInnerHTML={__html:n}}else o[r]=t[e]})),c.createElement(e,o)}))}(e,t)},toString:function(){return function(e,t,r){return t.reduce((function(t,n){var o=Object.keys(n).filter((function(e){return!(e===x||e===T)})).reduce((function(e,t){var o=void 0===n[t]?t:t+'="'+V(n[t],r)+'"';return e?e+" "+o:o}),""),a=n.innerHTML||n.cssText||"",i=-1===D.indexOf(e);return t+"<"+e+' data-react-helmet="true" '+o+(i?"/>":">"+a+"</"+e+">")}),"")}(e,t,r)}}}},de=function(e){var t=e.baseTag,r=e.bodyAttributes,n=e.encode,o=e.htmlAttributes,a=e.linkTags,i=e.metaTags,c=e.noscriptTags,l=e.scriptTags,u=e.styleTags,s=e.title,f=void 0===s?"":s,p=e.titleAttributes;return{base:pe(w.BASE,t,n),bodyAttributes:pe(y,r,n),htmlAttributes:pe(b,o,n),link:pe(w.LINK,a,n),meta:pe(w.META,i,n),noscript:pe(w.NOSCRIPT,c,n),script:pe(w.SCRIPT,l,n),style:pe(w.STYLE,u,n),title:pe(w.TITLE,{title:f,titleAttributes:p},n)}},me=f()((function(e){return{baseTag:$([E,L],e),bodyAttributes:Z(y,e),defer:J(e,N),encode:J(e,I),htmlAttributes:Z(b,e),linkTags:G(w.LINK,[S,E],e),metaTags:G(w.META,[O,v,A,k,C],e),noscriptTags:G(w.NOSCRIPT,[x],e),onChangeClientState:Q(e),scriptTags:G(w.SCRIPT,[j,x],e),styleTags:G(w.STYLE,[T],e),title:W(e),titleAttributes:Z(g,e)}}),(function(e){oe&&re(oe),e.defer?oe=te((function(){ae(e,(function(){oe=null}))})):(ae(e),oe=null)}),de)((function(){return null})),he=(o=me,i=a=function(e){function t(){return q(this,t),K(this,e.apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype.shouldComponentUpdate=function(e){return!d()(this.props,e)},t.prototype.mapNestedChildrenToProps=function(e,t){if(!t)return null;switch(e.type){case w.SCRIPT:case w.NOSCRIPT:return{innerHTML:t};case w.STYLE:return{cssText:t}}throw new Error("<"+e.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")},t.prototype.flattenArrayTypeChildren=function(e){var t,r=e.child,n=e.arrayTypeChildren,o=e.newChildProps,a=e.nestedChildren;return Y({},n,((t={})[r.type]=[].concat(n[r.type]||[],[Y({},o,this.mapNestedChildrenToProps(r,a))]),t))},t.prototype.mapObjectTypeChildren=function(e){var t,r,n=e.child,o=e.newProps,a=e.newChildProps,i=e.nestedChildren;switch(n.type){case w.TITLE:return Y({},o,((t={})[n.type]=i,t.titleAttributes=Y({},a),t));case w.BODY:return Y({},o,{bodyAttributes:Y({},a)});case w.HTML:return Y({},o,{htmlAttributes:Y({},a)})}return Y({},o,((r={})[n.type]=Y({},a),r))},t.prototype.mapArrayTypeChildrenToProps=function(e,t){var r=Y({},t);return Object.keys(e).forEach((function(t){var n;r=Y({},r,((n={})[t]=e[t],n))})),r},t.prototype.warnOnInvalidChildren=function(e,t){return!0},t.prototype.mapChildrenToProps=function(e,t){var r=this,n={};return c.Children.forEach(e,(function(e){if(e&&e.props){var o=e.props,a=o.children,i=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,r){return t[B[r]||r]=e[r],t}),t)}(z(o,["children"]));switch(r.warnOnInvalidChildren(e,a),e.type){case w.LINK:case w.META:case w.NOSCRIPT:case w.SCRIPT:case w.STYLE:n=r.flattenArrayTypeChildren({child:e,arrayTypeChildren:n,newChildProps:i,nestedChildren:a});break;default:t=r.mapObjectTypeChildren({child:e,newProps:t,newChildProps:i,nestedChildren:a})}}})),t=this.mapArrayTypeChildrenToProps(n,t)},t.prototype.render=function(){var e=this.props,t=e.children,r=z(e,["children"]),n=Y({},r);return t&&(n=this.mapChildrenToProps(t,n)),c.createElement(o,n)},U(t,null,[{key:"canUseDOM",set:function(e){o.canUseDOM=e}}]),t}(c.Component),a.propTypes={base:u().object,bodyAttributes:u().object,children:u().oneOfType([u().arrayOf(u().node),u().node]),defaultTitle:u().string,defer:u().bool,encodeSpecialCharacters:u().bool,htmlAttributes:u().object,link:u().arrayOf(u().object),meta:u().arrayOf(u().object),noscript:u().arrayOf(u().object),onChangeClientState:u().func,script:u().arrayOf(u().object),style:u().arrayOf(u().object),title:u().string,titleAttributes:u().object,titleTemplate:u().string},a.defaultProps={defer:!0,encodeSpecialCharacters:!0},a.peek=o.peek,a.rewind=function(){var e=o.rewind();return e||(e=de({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),e},i);he.renderStatic=he.rewind;var ye=r(25444),be=function(e){var t=e.description,r=e.lang,n=e.meta,o=e.title,a=(0,ye.useStaticQuery)("2909664151").site,i=t||a.siteMetadata.description;return c.createElement(he,{htmlAttributes:{lang:r},title:o,titleTemplate:"%s | "+a.siteMetadata.title,meta:[{name:"description",content:i},{property:"og:title",content:o},{property:"og:description",content:i},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:a.siteMetadata.social.twitter},{name:"twitter:title",content:o},{name:"twitter:description",content:i}].concat(n)},c.createElement("link",{href:a.siteMetadata.siteUrl,rel:"canonical"}),c.createElement("link",{href:"https://twitter.com/"+a.siteMetadata.social.twitter,rel:"me"}),c.createElement("link",{href:"https://github.com/"+a.siteMetadata.social.github,rel:"me"}),c.createElement("link",{href:"mailto:"+a.siteMetadata.social.email,rel:"me"}),c.createElement("link",{href:"/key.pub",rel:"pgpkey"}),c.createElement("link",{href:"https://webmention.io/matthewdaly.co.uk/xmlrpc",rel:"pingback"}),c.createElement("link",{href:"https://webmention.io/matthewdaly.co.uk/webmention",rel:"webmention"}),c.createElement("link",{rel:"openid.delegate",href:a.siteMetadata.siteUrl}),c.createElement("link",{rel:"openid.server",href:"https://openid.indieauth.com/openid"}),c.createElement("link",{rel:"alternate",type:"application/rss+xml",title:a.siteMetadata.title+" - feed",href:"/rss.xml"}),c.createElement("link",{rel:"alternate",type:"application/atom+xml",title:a.siteMetadata.title+" - feed",href:"/atom.xml"}),c.createElement("link",{rel:"alternate",type:"application/feed+json",title:a.siteMetadata.title+" - feed",href:"/feed.json"}))};be.defaultProps={lang:"en",meta:[],description:""};var ge=be}}]);
//# sourceMappingURL=e87769ff526c098a69bffbfff9ee9d57397fcb93-1b8819d20a7336a73b61.js.map