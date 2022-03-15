const y=function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function t(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerpolicy&&(n.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?n.credentials="include":e.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(e){if(e.ep)return;e.ep=!0;const n=t(e);fetch(e.href,n)}};y();function h(){return typeof window!="undefined"&&typeof window.document!="undefined"}function v(){var o;try{o=window.localStorage;var i="__storage_test__";return o.setItem(i,i),o.removeItem(i),!0}catch(t){return t instanceof DOMException&&(t.code===22||t.code===1014||t.name==="QuotaExceededError"||t.name==="NS_ERROR_DOM_QUOTA_REACHED")&&typeof o!="undefined"&&o.length!==0}}var g="__tabsIntercom__",d=":",w=function(){function o(t){t===void 0&&(t=g),this.storageKeyPrefix=t,this.subscribers=new Map,window.addEventListener("storage",this.onMessageReceive.bind(this))}var i=o.prototype;return i.subscribe=function(r,e){this.subscribers.set(this.buildKey(r),e)},i.unsubscribe=function(r){this.subscribers.delete(this.buildKey(r))},i.emitMessage=function(r,e){e===void 0&&(e="");var n=Date.now().toString(36);window.localStorage.setItem(this.buildKey(r),n+d+JSON.stringify(e))},i.onMessageReceive=function(r){var e=r.key,n=r.newValue;if((e==null?void 0:e.startsWith(this.storageKeyPrefix))===!0&&n){var s=n.indexOf(d),u=n.substring(s+1),a=JSON.parse(u),l=this.subscribers.get(e);l==null||l(a)}},i.buildKey=function(r){return this.storageKeyPrefix+":"+r},o}(),E=function(){function o(t){t===void 0&&(t=new w(g)),this.eventBus=t,this.registeredFunctions=new Set}var i=o.prototype;return i.register=function(r,e){var n=this;if(e===void 0&&(e=r.name),e==="")throw new Error("Function with no name. Probably passed anonymous or arrow function.");if(this.registeredFunctions.has(e))throw new Error("Function with name '"+e+"' already registered. Please use other function name.");return this.registeredFunctions.add(e),this.eventBus.subscribe(e,r),function(){for(var s=arguments.length,u=new Array(s),a=0;a<s;a++)u[a]=arguments[a];return u.forEach(function(l){if(typeof l=="function")throw new Error("Function params serialization not supported yet.")}),n.eventBus.emitMessage(e,u),r.apply(void 0,u)}},i.unregister=function(r){return this.eventBus.unsubscribe(r),this.registeredFunctions.delete(r)},o}();h()||console.warn("Browser not detected \u2014 TabsIntercom core functions may not working correctly.");v()||console.warn("Browser's local storage seems to be unavailable \u2014 TabsIntercom core functions may not working correctly.");const f="Tabs Intercom Example";document.title=f;const c=document.querySelector("#app");c.innerHTML=`
  <h1>${f}</h1>
  <p class="warn"> You must have local storage access enabled to make Tabs Intercom working.</p>
  <p>To experience cross-tab function call, please follow these steps:</p>
  <ol>
    <li>open the same page in at least 2 tabs / windows</li>
    <li>fill up your name</li>
    <li>click one of the buttons to get a one of following results:</li>
    <ul>
      <li><b>Greet</b> - to see updated message in all tabs immediately</li>
      <li><b>Greet with delay</b> - to see updated in all tabs after 3 seconds</li>
    </ul>
  </ol>
  
  <div class="example">
    <label class="label" for="greeting-name">Name:</label>
    <input id="greeting-name" type="text" placeholder="e.g. John">
    <button type="button" class="button" id="greet-button">Greet</button>
    <button type="button" class="button" id="greet-delayed-button">Greet with delay</button>
    <div id="message" class="message"></div>
  </div>
`;const S=c.querySelector("#greeting-name"),T=c.querySelector("#greet-button"),_=c.querySelector("#greet-delayed-button"),M=c.querySelector("#message");function b(){return S.value||"Mr. Nobody"}function m(o){M.innerText=`Hello, ${o}!`}function I(o){setTimeout(()=>{m(o)},3e3)}const p=new E,O=p.register(m),L=p.register(I);T.addEventListener("click",()=>O(b()));_.addEventListener("click",()=>L(b()));
