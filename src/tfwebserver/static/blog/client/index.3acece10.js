import{S as t,i as s,s as e,e as a,t as n,a as r,c as l,b as o,g as c,d as i,f as u,h,j as f,k as g,l as m,n as p,y as d,A as b,B as k,G as $,z as v,F as x,q as E,r as j,m as q,o as w,p as y,u as z}from"./client.27f3b1be.js";import{c as A}from"./_api.5f596b86.js";function L(t,s,e){const a=t.slice();return a[7]=s[e],a}function B(t){let s,e,p,d,b,k=t[7]+"";return{c(){s=a("li"),e=a("a"),p=n(k),b=r(),this.h()},l(t){s=l(t,"LI",{});var a=o(s);e=l(a,"A",{href:!0});var n=o(e);p=c(n,k),n.forEach(i),b=u(a),a.forEach(i),this.h()},h(){h(e,"href",d=t[2]+"/tags/"+t[7])},m(t,a){f(t,s,a),g(s,e),g(e,p),g(s,b)},p(t,s){1&s&&k!==(k=t[7]+"")&&m(p,k),5&s&&d!==(d=t[2]+"/tags/"+t[7])&&h(e,"href",d)},d(t){t&&i(s)}}}function F(t){let s,e,b,k,$=t[0],v=[];for(let s=0;s<$.length;s+=1)v[s]=B(L(t,$,s));return{c(){s=a("h1"),e=n(t[1]),b=r(),k=a("ul");for(let t=0;t<v.length;t+=1)v[t].c();this.h()},l(a){s=l(a,"H1",{});var n=o(s);e=c(n,t[1]),n.forEach(i),b=u(a),k=l(a,"UL",{class:!0});var r=o(k);for(let t=0;t<v.length;t+=1)v[t].l(r);r.forEach(i),this.h()},h(){h(k,"class","svelte-1uzksw3")},m(t,a){f(t,s,a),g(s,e),f(t,b,a),f(t,k,a);for(let t=0;t<v.length;t+=1)v[t].m(k,null)},p(t,[s]){if(2&s&&m(e,t[1]),5&s){let e;for($=t[0],e=0;e<$.length;e+=1){const a=L(t,$,e);v[e]?v[e].p(a,s):(v[e]=B(a),v[e].c(),v[e].m(k,null))}for(;e<v.length;e+=1)v[e].d(1);v.length=$.length}},i:p,o:p,d(t){t&&i(s),t&&i(b),t&&i(k),d(v,t)}}}function G(t,s,e){let a,{tags:n=[]}=s,{title:r=""}=s;const{preloading:l,page:o,session:c}=b();k(t,o,t=>e(4,a=t));let{username:i=a.params.theuser}=s;return t.$set=(t=>{"tags"in t&&e(0,n=t.tags),"title"in t&&e(1,r=t.title),"username"in t&&e(2,i=t.username)}),[n,r,i,o]}class H extends t{constructor(t){super(),s(this,t,G,F,e,{tags:0,title:1,username:2})}}function I(t){return{c:p,l:p,m:p,p:p,i:p,o:p,d:p}}function N(t){let s;const e=new H({props:{tags:t[1]}});return{c(){q(e.$$.fragment)},l(t){w(e.$$.fragment,t)},m(t,a){y(e,t,a),s=!0},p(t,s){const a={};1&s&&(a.tags=t[1]),e.$set(a)},i(t){s||(E(e.$$.fragment,t),s=!0)},o(t){j(e.$$.fragment,t),s=!1},d(t){z(e,t)}}}function S(t){return{c:p,l:p,m:p,p:p,i:p,o:p,d:p}}function T(t){let s,e,a,n,l={ctx:t,current:null,token:null,pending:S,then:N,catch:I,value:1,blocks:[,,,]};return $(a=t[0],l),{c(){s=r(),e=v(),l.block.c(),this.h()},l(t){x('[data-svelte="svelte-7o39qi"]',document.head).forEach(i),s=u(t),e=v(),l.block.l(t),this.h()},h(){document.title="Tags"},m(t,a){f(t,s,a),f(t,e,a),l.block.m(t,l.anchor=a),l.mount=(()=>e.parentNode),l.anchor=e,n=!0},p(s,[e]){if(t=s,l.ctx=t,1&e&&a!==(a=t[0])&&$(a,l));else{const s=t.slice();s[1]=l.resolved,l.block.p(s,e)}},i(t){n||(E(l.block),n=!0)},o(t){for(let t=0;t<3;t+=1){const s=l.blocks[t];j(s)}n=!1},d(t){t&&i(s),t&&i(e),l.block.d(t),l.token=null,l=null}}}async function U({params:t,query:s}){return{tags:await A(t.theuser)}}function _(t,s,e){let{tags:a=[]}=s;return t.$set=(t=>{"tags"in t&&e(0,a=t.tags)}),[a]}export default class extends t{constructor(t){super(),s(this,t,_,T,e,{tags:0})}}export{U as preload};
