(self.webpackChunkmatthew_dalys_blog=self.webpackChunkmatthew_dalys_blog||[]).push([[186],{76837:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.CommentCount=void 0;var r=a(n(67294)),o=a(n(45697)),i=n(73222),u=n(94911);function a(t){return t&&t.__esModule?t:{default:t}}function c(t){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function s(){return(s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function l(t,e){if(null==t)return{};var n,r,o=function(t,e){if(null==t)return{};var n,r,o={},i=Object.keys(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||(o[n]=t[n]);return o}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(o[n]=t[n])}return o}function f(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function p(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function d(t,e){return(d=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function y(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=h(t);if(e){var o=h(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return m(this,n)}}function m(t,e){return!e||"object"!==c(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function h(t){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var b=(0,i.debounce)((function(){window.DISQUSWIDGETS&&window.DISQUSWIDGETS.getCount({reset:!0})}),300,!1),v=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&d(t,e)}(c,t);var e,n,o,a=y(c);function c(){return f(this,c),a.apply(this,arguments)}return e=c,(n=[{key:"componentDidMount",value:function(){this.loadInstance()}},{key:"shouldComponentUpdate",value:function(t){return this.props!==t&&(0,i.shallowComparison)(this.props,t)}},{key:"componentDidUpdate",value:function(t){this.props.shortname!==t.shortname&&this.cleanInstance(),this.loadInstance()}},{key:"componentWillUnmount",value:function(){this.cleanInstance()}},{key:"loadInstance",value:function(){var t=window.document;t.getElementById(u.COMMENT_COUNT_SCRIPT_ID)?b():(0,i.insertScript)("https://".concat(this.props.shortname,".disqus.com/count.js"),u.COMMENT_COUNT_SCRIPT_ID,t.body)}},{key:"cleanInstance",value:function(){var t=window.document;(0,i.removeScript)(u.COMMENT_COUNT_SCRIPT_ID,t.body),window.DISQUSWIDGETS=void 0}},{key:"render",value:function(){var t=this.props,e=(t.shortname,t.config),n=t.children,o=t.className,i=l(t,["shortname","config","children","className"]),a=o?" ".concat(o):"";return r.default.createElement("span",s({},i,{className:"".concat(u.COMMENT_COUNT_CLASS).concat(a),"data-disqus-identifier":e.identifier,"data-disqus-url":e.url}),n)}}])&&p(e.prototype,n),o&&p(e,o),c}(r.default.Component);e.CommentCount=v,v.propTypes={shortname:o.default.string.isRequired,config:o.default.shape({identifier:o.default.string,url:o.default.string,title:o.default.string}).isRequired,className:o.default.string,children:o.default.node}},79888:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.CommentEmbed=void 0;var r=u(n(67294)),o=u(n(45697)),i=n(94911);function u(t){return t&&t.__esModule?t:{default:t}}function a(t){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function c(){return(c=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function s(t,e){if(null==t)return{};var n,r,o=function(t,e){if(null==t)return{};var n,r,o={},i=Object.keys(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||(o[n]=t[n]);return o}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(o[n]=t[n])}return o}function l(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function f(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function p(t,e){return(p=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function d(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=m(t);if(e){var o=m(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return y(this,n)}}function y(t,e){return!e||"object"!==a(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function m(t){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var h=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&p(t,e)}(u,t);var e,n,o,i=d(u);function u(){return l(this,u),i.apply(this,arguments)}return e=u,(n=[{key:"getSrc",value:function(){var t=Number(this.props.commentId).toString(36),e=this.props.showParentComment?"1":"0",n=this.props.showMedia?"1":"0";return"https://embed.disqus.com/p/".concat(t,"?p=").concat(e,"&m=").concat(n)}},{key:"render",value:function(){var t=this.props,e=t.width,n=t.height,o=(t.commentId,t.showMedia,t.showParentComment,s(t,["width","height","commentId","showMedia","showParentComment"]));return r.default.createElement("iframe",c({},o,{src:this.getSrc(),width:e,height:n,seamless:"seamless",scrolling:"no",frameBorder:"0"}))}}])&&f(e.prototype,n),o&&f(e,o),u}(r.default.Component);e.CommentEmbed=h,h.defaultProps={showMedia:!0,showParentComment:!0,width:i.COMMENT_EMBED_WIDTH,height:i.COMMENT_EMBED_HEIGHT},h.propTypes={commentId:o.default.string.isRequired,showMedia:o.default.bool,showParentComment:o.default.bool,width:o.default.number,height:o.default.number,className:o.default.string}},51629:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.DiscussionEmbed=void 0;var r=a(n(67294)),o=a(n(45697)),i=n(73222),u=n(94911);function a(t){return t&&t.__esModule?t:{default:t}}function c(t){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function s(){return(s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function l(t,e){if(null==t)return{};var n,r,o=function(t,e){if(null==t)return{};var n,r,o={},i=Object.keys(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||(o[n]=t[n]);return o}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(o[n]=t[n])}return o}function f(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function p(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function d(t,e){return(d=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function y(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=h(t);if(e){var o=h(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return m(this,n)}}function m(t,e){return!e||"object"!==c(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function h(t){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var b=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&d(t,e)}(c,t);var e,n,o,a=y(c);function c(){return f(this,c),a.apply(this,arguments)}return e=c,(n=[{key:"componentDidMount",value:function(){"undefined"!=typeof window&&window.disqus_shortname&&window.disqus_shortname!==this.props.shortname&&this.cleanInstance(),this.loadInstance()}},{key:"shouldComponentUpdate",value:function(t){return this.props!==t&&(0,i.shallowComparison)(this.props,t)}},{key:"componentDidUpdate",value:function(t){this.props.shortname!==t.shortname&&this.cleanInstance(),this.loadInstance()}},{key:"componentWillUnmount",value:function(){this.cleanInstance()}},{key:"loadInstance",value:function(){var t=window.document;window&&window.DISQUS&&t.getElementById(u.EMBED_SCRIPT_ID)?window.DISQUS.reset({reload:!0,config:this.getDisqusConfig(this.props.config)}):(window.disqus_config=this.getDisqusConfig(this.props.config),window.disqus_shortname=this.props.shortname,(0,i.insertScript)("https://".concat(this.props.shortname,".disqus.com/embed.js"),u.EMBED_SCRIPT_ID,t.body))}},{key:"cleanInstance",value:function(){var t=window.document;(0,i.removeScript)(u.EMBED_SCRIPT_ID,t.body),window&&window.DISQUS&&window.DISQUS.reset({});try{delete window.DISQUS}catch(n){window.DISQUS=void 0}var e=t.getElementById(u.THREAD_ID);if(e)for(;e.hasChildNodes();)e.removeChild(e.firstChild)}},{key:"getDisqusConfig",value:function(t){return function(){var e=this;this.page.identifier=t.identifier,this.page.url=t.url,this.page.title=t.title,this.page.category_id=t.categoryID,this.page.remote_auth_s3=t.remoteAuthS3,this.page.api_key=t.apiKey,t.language&&(this.language=t.language),u.CALLBACKS.forEach((function(n){e.callbacks[n]=[t[n]]}))}}},{key:"render",value:function(){var t=this.props,e=(t.shortname,t.config,l(t,["shortname","config"]));return r.default.createElement("div",s({},e,{id:u.THREAD_ID}))}}])&&p(e.prototype,n),o&&p(e,o),c}(r.default.Component);e.DiscussionEmbed=b,b.propTypes={shortname:o.default.string.isRequired,config:o.default.shape({identifier:o.default.string,url:o.default.string,title:o.default.string,language:o.default.string,categoryID:o.default.string,remoteAuthS3:o.default.string,apiKey:o.default.string,preData:o.default.func,preInit:o.default.func,onInit:o.default.func,onReady:o.default.func,afterRender:o.default.func,preReset:o.default.func,onIdentify:o.default.func,beforeComment:o.default.func,onNewComment:o.default.func,onPaginate:o.default.func}).isRequired}},17122:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Recommendations=void 0;var r=a(n(67294)),o=a(n(45697)),i=n(73222),u=n(94911);function a(t){return t&&t.__esModule?t:{default:t}}function c(t){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function s(){return(s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function l(t,e){if(null==t)return{};var n,r,o=function(t,e){if(null==t)return{};var n,r,o={},i=Object.keys(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||(o[n]=t[n]);return o}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(o[n]=t[n])}return o}function f(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function p(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function d(t,e){return(d=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function y(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=h(t);if(e){var o=h(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return m(this,n)}}function m(t,e){return!e||"object"!==c(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function h(t){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var b=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&d(t,e)}(c,t);var e,n,o,a=y(c);function c(){return f(this,c),a.apply(this,arguments)}return e=c,(n=[{key:"componentDidMount",value:function(){this.loadInstance()}},{key:"shouldComponentUpdate",value:function(t){return this.props!==t&&(0,i.shallowComparison)(this.props,t)}},{key:"componentDidUpdate",value:function(){this.loadInstance()}},{key:"componentWillUnmount",value:function(){this.cleanInstance()}},{key:"getDisqusConfig",value:function(t){return function(){this.page.identifier=t.identifier,this.page.url=t.url,this.page.title=t.title,this.language=t.language}}},{key:"loadInstance",value:function(){"undefined"!=typeof window&&window.document&&(window.disqus_config=this.getDisqusConfig(this.props.config),window.document.getElementById(u.RECOMMENDATIONS_SCRIPT_ID)?this.reloadInstance():(0,i.insertScript)("https://".concat(this.props.shortname,".disqus.com/recommendations.js"),u.RECOMMENDATIONS_SCRIPT_ID,window.document.body))}},{key:"reloadInstance",value:function(){window&&window.DISQUS_RECOMMENDATIONS&&window.DISQUS_RECOMMENDATIONS.reset({reload:!0})}},{key:"cleanInstance",value:function(){(0,i.removeScript)(u.RECOMMENDATIONS_SCRIPT_ID,window.document.body);try{delete window.DISQUS_RECOMMENDATIONS}catch(e){window.DISQUS_RECOMMENDATIONS=void 0}var t=window.document.getElementById(u.RECOMMENDATIONS_ID);if(t)for(;t.hasChildNodes();)t.removeChild(t.firstChild)}},{key:"render",value:function(){var t=this.props,e=(t.shortname,t.config,l(t,["shortname","config"]));return r.default.createElement("div",s({},e,{id:u.RECOMMENDATIONS_ID}))}}])&&p(e.prototype,n),o&&p(e,o),c}(r.default.Component);e.Recommendations=b,b.propTypes={shortname:o.default.string.isRequired,config:o.default.shape({identifier:o.default.string,url:o.default.string,title:o.default.string,language:o.default.string})}},94911:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.CALLBACKS=e.RECOMMENDATIONS_SCRIPT_ID=e.RECOMMENDATIONS_ID=e.COMMENT_EMBED_HEIGHT=e.COMMENT_EMBED_WIDTH=e.COMMENT_COUNT_SCRIPT_ID=e.COMMENT_COUNT_CLASS=e.EMBED_SCRIPT_ID=e.THREAD_ID=void 0;e.THREAD_ID="disqus_thread";e.EMBED_SCRIPT_ID="dsq-embed-scr";e.COMMENT_COUNT_CLASS="disqus-comment-count";e.COMMENT_COUNT_SCRIPT_ID="dsq-count-scr";e.COMMENT_EMBED_WIDTH=420;e.COMMENT_EMBED_HEIGHT=320;e.RECOMMENDATIONS_ID="disqus_recommendations";e.RECOMMENDATIONS_SCRIPT_ID="dsq-recs-scr";e.CALLBACKS=["preData","preInit","onInit","onReady","afterRender","preReset","onIdentify","beforeComment","onNewComment","onPaginate"]},57202:function(t,e,n){"use strict";Object.defineProperty(e,"qw",{enumerable:!0,get:function(){return i.DiscussionEmbed}});var r=n(76837),o=n(79888),i=n(51629),u=n(17122);r.CommentCount,o.CommentEmbed,i.DiscussionEmbed,u.Recommendations},73222:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.insertScript=function(t,e,n){var r=window.document.createElement("script");return r.async=!0,r.src=t,r.id=e,n.appendChild(r),r},e.removeScript=function(t,e){var n=window.document.getElementById(t);n&&e.removeChild(n)},e.debounce=function(t,e,n){var r;return function(){var o=this,i=arguments,u=function(){r=null,n||t.apply(o,i)},a=n&&!r;window.clearTimeout(r),r=setTimeout(u,e),a&&t.apply(o,i)}},e.isReactElement=a,e.shallowComparison=function t(e,n){var r,o=function(t){if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(t=function(t,e){if(!t)return;if("string"==typeof t)return u(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return u(t,e)}(t))){var e=0,n=function(){};return{s:n,n:function(){return e>=t.length?{done:!0}:{done:!1,value:t[e++]}},e:function(t){throw t},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,o,i=!0,a=!1;return{s:function(){r=t[Symbol.iterator]()},n:function(){var t=r.next();return i=t.done,t},e:function(t){a=!0,o=t},f:function(){try{i||null==r.return||r.return()}finally{if(a)throw o}}}}(new Set(Object.keys(e),Object.keys(n)));try{for(o.s();!(r=o.n()).done;){var c=r.value;if("object"===i(e[c])){if(t(e[c],n[c]))return!0}else if(e[c]!==n[c]&&!a(e[c]))return!0}}catch(s){o.e(s)}finally{o.f()}return!1};var r,o=(r=n(67294))&&r.__esModule?r:{default:r};function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function u(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function a(t){return!!o.default.isValidElement(t)||!!Array.isArray(t)&&t.some((function(t){return o.default.isValidElement(t)}))}},79973:function(t,e,n){"use strict";n.d(e,{Z:function(){return a}});var r=n(67294),o=n(25444),i=function(t){return r.createElement(o.Link,{to:t.path,rel:"next"},t.title," →")},u=function(t){return r.createElement(o.Link,{to:t.path,rel:"prev"},"← ",t.title)},a=function(t){return r.createElement("nav",{className:"pt-4 clear-both"},r.createElement("div",{className:"float-left"},t.previous&&r.createElement(u,{path:t.previous.path,title:t.previous.title})),r.createElement("div",{className:"float-right"},t.next&&r.createElement(i,{path:t.next.path,title:t.next.title})))}},52144:function(t,e,n){"use strict";n.r(e);var r=n(67294),o=n(34606),i=n(42516),u=n(79973),a=n(97520),c=n(33350),s=n(57202);e.default=function(t){var e=t.pageContext,n=t.data,l=n.mdx,f=n.site.siteMetadata.title,p=e.previous,d=e.next,y={shortname:"matthewdaly",config:{url:n.site.siteMetadata.siteUrl+l.fields.path,identifier:l.fields.path,title:l.frontmatter.title,languge:"en_GB"}};return r.createElement(r.Fragment,null,r.createElement(c.Z,{title:l.frontmatter.title,description:l.excerpt}),r.createElement(o.Z,{title:f,siteUrl:n.site.siteMetadata.siteUrl},r.createElement("article",null,r.createElement("header",null,r.createElement("h2",{className:"py-4 text-2xl font-bold"},l.frontmatter.title),r.createElement("p",{className:"my-4 text-lg font-semibold"},l.frontmatter.date)),r.createElement(i.Z,null,l.body),r.createElement("hr",null),r.createElement("div",{className:"py-4"},l.frontmatter.categories&&l.frontmatter.categories.map((function(t){return r.createElement(a.Z,{key:t,category:t})}))),r.createElement(u.Z,{previous:p&&{path:p.fields.path,title:p.frontmatter.title},next:d&&{path:d.fields.path,title:d.frontmatter.title}}),r.createElement(s.qw,y))))}}}]);
//# sourceMappingURL=component---src-templates-post-tsx-55ed2cd62abec231eac0.js.map