import{c as t,d as n,e as r,f as e,i as a,s as c,g as o,S as u,h as s,v as i,t as f,j as l,k as h,w as v,l as p,u as g,m as d,n as m,o as y,y as k,A as $,p as b,D as R,B as x,C as w,a as D,b as E,O as j,z as L,R as S,L as q,M as z,I as A,J as C,K as I,N}from"./client.958d130b.js";import{c as P}from"./_api.e275dd68.js";function B(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var a,c=n(t);if(e){var o=n(this).constructor;a=Reflect.construct(c,arguments,o)}else a=c.apply(this,arguments);return r(this,a)}}function H(t,n,r){var e=t.slice();return e[7]=n[r],e}function J(t){var n,r,e,a,c,o=t[7]+"";return{c:function(){n=s("li"),r=s("a"),e=i(o),c=f(),this.h()},l:function(t){n=l(t,"LI",{});var a=h(n);r=l(a,"A",{href:!0});var u=h(r);e=v(u,o),u.forEach(p),c=g(a),a.forEach(p),this.h()},h:function(){d(r,"href",a=t[2]+"/tags/"+t[7])},m:function(t,a){m(t,n,a),y(n,r),y(r,e),y(n,c)},p:function(t,n){1&n&&o!==(o=t[7]+"")&&k(e,o),5&n&&a!==(a=t[2]+"/tags/"+t[7])&&d(r,"href",a)},d:function(t){t&&p(n)}}}function K(t){for(var n,r,e,a,c=t[0],o=[],u=0;u<c.length;u+=1)o[u]=J(H(t,c,u));return{c:function(){n=s("h1"),r=i(t[1]),e=f(),a=s("ul");for(var c=0;c<o.length;c+=1)o[c].c();this.h()},l:function(c){n=l(c,"H1",{});var u=h(n);r=v(u,t[1]),u.forEach(p),e=g(c),a=l(c,"UL",{class:!0});for(var s=h(a),i=0;i<o.length;i+=1)o[i].l(s);s.forEach(p),this.h()},h:function(){d(a,"class","svelte-1uzksw3")},m:function(t,c){m(t,n,c),y(n,r),m(t,e,c),m(t,a,c);for(var u=0;u<o.length;u+=1)o[u].m(a,null)},p:function(t,n){var e=$(n,1)[0];if(2&e&&k(r,t[1]),5&e){var u;for(c=t[0],u=0;u<c.length;u+=1){var s=H(t,c,u);o[u]?o[u].p(s,e):(o[u]=J(s),o[u].c(),o[u].m(a,null))}for(;u<o.length;u+=1)o[u].d(1);o.length=c.length}},i:b,o:b,d:function(t){t&&p(n),t&&p(e),t&&p(a),R(o,t)}}}function M(t,n,r){var e,a=n.tags,c=void 0===a?[]:a,o=n.title,u=void 0===o?"":o,s=x(),i=(s.preloading,s.page);s.session;w(t,i,(function(t){return r(4,e=t)}));var f=n.username,l=void 0===f?e.params.theuser:f;return t.$$set=function(t){"tags"in t&&r(0,c=t.tags),"title"in t&&r(1,u=t.title),"username"in t&&r(2,l=t.username)},[c,u,l,i]}var O=function(n){t(s,u);var r=B(s);function s(t){var n;return e(this,s),n=r.call(this),a(o(n),t,M,K,c,{tags:0,title:1,username:2}),n}return s}();function T(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var a,c=n(t);if(e){var o=n(this).constructor;a=Reflect.construct(c,arguments,o)}else a=c.apply(this,arguments);return r(this,a)}}function U(t){return{c:b,l:b,m:b,p:b,i:b,o:b,d:b}}function _(t){var n,r;return n=new O({props:{tags:t[1]}}),{c:function(){A(n.$$.fragment)},l:function(t){C(n.$$.fragment,t)},m:function(t,e){I(n,t,e),r=!0},p:function(t,r){var e={};1&r&&(e.tags=t[1]),n.$set(e)},i:function(t){r||(q(n.$$.fragment,t),r=!0)},o:function(t){z(n.$$.fragment,t),r=!1},d:function(t){N(n,t)}}}function F(t){return{c:b,l:b,m:b,p:b,i:b,o:b,d:b}}function G(t){var n,r,e,a,c={ctx:t,current:null,token:null,hasCatch:!1,pending:F,then:_,catch:U,value:1,blocks:[,,,]};return j(e=t[0],c),{c:function(){n=f(),r=L(),c.block.c(),this.h()},l:function(t){S('[data-svelte="svelte-7o39qi"]',document.head).forEach(p),n=g(t),r=L(),c.block.l(t),this.h()},h:function(){document.title="Tags"},m:function(t,e){m(t,n,e),m(t,r,e),c.block.m(t,c.anchor=e),c.mount=function(){return r.parentNode},c.anchor=r,a=!0},p:function(n,r){var a=$(r,1)[0];if(t=n,c.ctx=t,1&a&&e!==(e=t[0])&&j(e,c));else{var o=t.slice();o[1]=c.resolved,c.block.p(o,a)}},i:function(t){a||(q(c.block),a=!0)},o:function(t){for(var n=0;n<3;n+=1){var r=c.blocks[n];z(r)}a=!1},d:function(t){t&&p(n),t&&p(r),c.block.d(t),c.token=null,c=null}}}function Q(t){return V.apply(this,arguments)}function V(){return(V=D(E.mark((function t(n){var r,e;return E.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=n.params,n.query,t.next=3,P(r.theuser);case 3:return e=t.sent,t.abrupt("return",{tags:e});case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function W(t,n,r){var e=n.tags,a=void 0===e?[]:e;return t.$$set=function(t){"tags"in t&&r(0,a=t.tags)},[a]}var X=function(n){t(s,u);var r=T(s);function s(t){var n;return e(this,s),n=r.call(this),a(o(n),t,W,G,c,{tags:0}),n}return s}();export default X;export{Q as preload};
