import{S as t,i as o,s,G as n,a as e,A as l,z as c,d as a,f as r,j as i,q as u,r as p,n as f,m,o as d,p as h,u as g}from"./client.8e656b4e.js";import{d as b}from"./_api.5f596b86.js";import"./showdown.20a62d9b.js";import{P as k}from"./PostList.18cbf979.js";function $(t){return{c:f,l:f,m:f,p:f,i:f,o:f,d:f}}function w(t){let o,s,e,c={ctx:t,current:null,token:null,pending:j,then:v,catch:x,value:3,blocks:[,,,]};return n(s=t[0],c),{c(){o=l(),c.block.c()},l(t){o=l(),c.block.l(t)},m(t,s){i(t,o,s),c.block.m(t,c.anchor=s),c.mount=(()=>o.parentNode),c.anchor=o,e=!0},p(o,e){if(t=o,c.ctx=t,1&e&&s!==(s=t[0])&&n(s,c));else{const o=t.slice();o[3]=c.resolved,c.block.p(o,e)}},i(t){e||(u(c.block),e=!0)},o(t){for(let t=0;t<3;t+=1){const o=c.blocks[t];p(o)}e=!1},d(t){t&&a(o),c.block.d(t),c.token=null,c=null}}}function x(t){return{c:f,l:f,m:f,p:f,i:f,o:f,d:f}}function v(t){let o;const s=new k({props:{title:"Posts with tag "+t[2],posts:t[3]}});return{c(){m(s.$$.fragment)},l(t){d(s.$$.fragment,t)},m(t,n){h(s,t,n),o=!0},p(t,o){const n={};2&o&&(n.title="Posts with tag "+t[2]),1&o&&(n.posts=t[3]),s.$set(n)},i(t){o||(u(s.$$.fragment,t),o=!0)},o(t){p(s.$$.fragment,t),o=!1},d(t){g(s,t)}}}function j(t){return{c:f,l:f,m:f,p:f,i:f,o:f,d:f}}function P(t){return{c:f,l:f,m:f,p:f,i:f,o:f,d:f}}function E(t){let o,s,f,m,d={ctx:t,current:null,token:null,pending:P,then:w,catch:$,value:2,blocks:[,,,]};return n(f=t[1],d),{c(){o=e(),s=l(),d.block.c(),this.h()},l(t){c('[data-svelte="svelte-10h7psl"]',document.head).forEach(a),o=r(t),s=l(),d.block.l(t),this.h()},h(){document.title="Blog"},m(t,n){i(t,o,n),i(t,s,n),d.block.m(t,d.anchor=n),d.mount=(()=>s.parentNode),d.anchor=s,m=!0},p(o,[s]){if(t=o,d.ctx=t,2&s&&f!==(f=t[1])&&n(f,d));else{const o=t.slice();o[2]=d.resolved,d.block.p(o,s)}},i(t){m||(u(d.block),m=!0)},o(t){for(let t=0;t<3;t+=1){const o=d.blocks[t];p(o)}m=!1},d(t){t&&a(o),t&&a(s),d.block.d(t),d.token=null,d=null}}}async function N({params:t}){let o=t.slug,s=await b(t.theuser);const n=new Map;return s.forEach(t=>{t.tags.forEach(o=>{n.has(o)?n.set(o,[...n.get(o),t]):n.set(o,[t])})}),{posts:n.get(o),tag:t.slug}}function q(t,o,s){let{posts:n=[]}=o,{tag:e=""}=o;return console.log("tag",e),t.$set=(t=>{"posts"in t&&s(0,n=t.posts),"tag"in t&&s(1,e=t.tag)}),[n,e]}export default class extends t{constructor(t){super(),o(this,t,q,E,s,{posts:0,tag:1})}}export{N as preload};
