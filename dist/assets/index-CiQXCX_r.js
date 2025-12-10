(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();var nc={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yl=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Nh=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const o=n[t++];e[r++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=n[t++],a=n[t++],l=n[t++],u=((s&7)<<18|(o&63)<<12|(a&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const o=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(o&63)<<6|a&63)}}return e.join("")},vl={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const o=n[s],a=s+1<n.length,l=a?n[s+1]:0,u=s+2<n.length,d=u?n[s+2]:0,p=o>>2,y=(o&3)<<4|l>>4;let b=(l&15)<<2|d>>6,S=d&63;u||(S=64,a||(b=64)),r.push(t[p],t[y],t[b],t[S])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(yl(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Nh(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const o=t[n.charAt(s++)],l=s<n.length?t[n.charAt(s)]:0;++s;const d=s<n.length?t[n.charAt(s)]:64;++s;const y=s<n.length?t[n.charAt(s)]:64;if(++s,o==null||l==null||d==null||y==null)throw new Oh;const b=o<<2|l>>4;if(r.push(b),d!==64){const S=l<<4&240|d>>2;if(r.push(S),y!==64){const x=d<<6&192|y;r.push(x)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Oh extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Mh=function(n){const e=yl(n);return vl.encodeByteArray(e,!0)},mi=function(n){return Mh(n).replace(/\./g,"")},wl=function(n){try{return vl.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uh(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fh=()=>Uh().__FIREBASE_DEFAULTS__,Bh=()=>{if(typeof process>"u"||typeof nc>"u")return;const n=nc.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},qh=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&wl(n[1]);return e&&JSON.parse(e)},Pi=()=>{try{return Fh()||Bh()||qh()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},El=n=>{var e,t;return(t=(e=Pi())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},jh=n=>{const e=El(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Il=()=>{var n;return(n=Pi())===null||n===void 0?void 0:n.config},Tl=n=>{var e;return(e=Pi())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $h{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zh(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},n);return[mi(JSON.stringify(t)),mi(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Hh(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(tt())}function Gh(){var n;const e=(n=Pi())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Kh(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Wh(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Qh(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Jh(){const n=tt();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Yh(){return!Gh()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Xh(){try{return typeof indexedDB=="object"}catch{return!1}}function Zh(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var o;e(((o=s.error)===null||o===void 0?void 0:o.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ed="FirebaseError";class en extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=ed,Object.setPrototypeOf(this,en.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,_s.prototype.create)}}class _s{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,o=this.errors[e],a=o?td(o,r):"Error",l=`${this.serviceName}: ${a} (${s}).`;return new en(s,l,r)}}function td(n,e){return n.replace(nd,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const nd=/\{\$([^}]+)}/g;function rd(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function cs(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const o=n[s],a=e[s];if(rc(o)&&rc(a)){if(!cs(o,a))return!1}else if(o!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function rc(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ys(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Yr(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,o]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(o)}}),e}function Xr(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function sd(n,e){const t=new id(n,e);return t.subscribe.bind(t)}class id{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");od(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=lo),s.error===void 0&&(s.error=lo),s.complete===void 0&&(s.complete=lo);const o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),o}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function od(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function lo(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ve(n){return n&&n._delegate?n._delegate:n}class Jn{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ad{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new $h;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(o){if(s)return null;throw o}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(ld(e))try{this.getOrInitializeService({instanceIdentifier:Gn})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const o=this.getOrInitializeService({instanceIdentifier:s});r.resolve(o)}catch{}}}}clearInstance(e=Gn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Gn){return this.instances.has(e)}getOptions(e=Gn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[o,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(o);r===l&&a.resolve(s)}return s}onInit(e,t){var r;const s=this.normalizeInstanceIdentifier(t),o=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;o.add(e),this.onInitCallbacks.set(s,o);const a=this.instances.get(s);return a&&e(a,s),()=>{o.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:cd(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Gn){return this.component?this.component.multipleInstances?e:Gn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function cd(n){return n===Gn?void 0:n}function ld(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ud{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new ad(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ne;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(ne||(ne={}));const hd={debug:ne.DEBUG,verbose:ne.VERBOSE,info:ne.INFO,warn:ne.WARN,error:ne.ERROR,silent:ne.SILENT},dd=ne.INFO,fd={[ne.DEBUG]:"log",[ne.VERBOSE]:"log",[ne.INFO]:"info",[ne.WARN]:"warn",[ne.ERROR]:"error"},pd=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=fd[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Go{constructor(e){this.name=e,this._logLevel=dd,this._logHandler=pd,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ne))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?hd[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ne.DEBUG,...e),this._logHandler(this,ne.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ne.VERBOSE,...e),this._logHandler(this,ne.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ne.INFO,...e),this._logHandler(this,ne.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ne.WARN,...e),this._logHandler(this,ne.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ne.ERROR,...e),this._logHandler(this,ne.ERROR,...e)}}const md=(n,e)=>e.some(t=>n instanceof t);let sc,ic;function gd(){return sc||(sc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function _d(){return ic||(ic=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const bl=new WeakMap,Eo=new WeakMap,Al=new WeakMap,uo=new WeakMap,Ko=new WeakMap;function yd(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",o),n.removeEventListener("error",a)},o=()=>{t(pn(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",o),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&bl.set(t,n)}).catch(()=>{}),Ko.set(e,n),e}function vd(n){if(Eo.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",a),n.removeEventListener("abort",a)},o=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",o),n.addEventListener("error",a),n.addEventListener("abort",a)});Eo.set(n,e)}let Io={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Eo.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Al.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return pn(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function wd(n){Io=n(Io)}function Ed(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(ho(this),e,...t);return Al.set(r,e.sort?e.sort():[e]),pn(r)}:_d().includes(n)?function(...e){return n.apply(ho(this),e),pn(bl.get(this))}:function(...e){return pn(n.apply(ho(this),e))}}function Id(n){return typeof n=="function"?Ed(n):(n instanceof IDBTransaction&&vd(n),md(n,gd())?new Proxy(n,Io):n)}function pn(n){if(n instanceof IDBRequest)return yd(n);if(uo.has(n))return uo.get(n);const e=Id(n);return e!==n&&(uo.set(n,e),Ko.set(e,n)),e}const ho=n=>Ko.get(n);function Td(n,e,{blocked:t,upgrade:r,blocking:s,terminated:o}={}){const a=indexedDB.open(n,e),l=pn(a);return r&&a.addEventListener("upgradeneeded",u=>{r(pn(a.result),u.oldVersion,u.newVersion,pn(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),l.then(u=>{o&&u.addEventListener("close",()=>o()),s&&u.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),l}const bd=["get","getKey","getAll","getAllKeys","count"],Ad=["put","add","delete","clear"],fo=new Map;function oc(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(fo.get(e))return fo.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=Ad.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||bd.includes(t)))return;const o=async function(a,...l){const u=this.transaction(a,s?"readwrite":"readonly");let d=u.store;return r&&(d=d.index(l.shift())),(await Promise.all([d[t](...l),s&&u.done]))[0]};return fo.set(e,o),o}wd(n=>({...n,get:(e,t,r)=>oc(e,t)||n.get(e,t,r),has:(e,t)=>!!oc(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sd{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Rd(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function Rd(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const To="@firebase/app",ac="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jt=new Go("@firebase/app"),Cd="@firebase/app-compat",kd="@firebase/analytics-compat",Pd="@firebase/analytics",Ld="@firebase/app-check-compat",xd="@firebase/app-check",Dd="@firebase/auth",Vd="@firebase/auth-compat",Nd="@firebase/database",Od="@firebase/data-connect",Md="@firebase/database-compat",Ud="@firebase/functions",Fd="@firebase/functions-compat",Bd="@firebase/installations",qd="@firebase/installations-compat",jd="@firebase/messaging",$d="@firebase/messaging-compat",zd="@firebase/performance",Hd="@firebase/performance-compat",Gd="@firebase/remote-config",Kd="@firebase/remote-config-compat",Wd="@firebase/storage",Qd="@firebase/storage-compat",Jd="@firebase/firestore",Yd="@firebase/vertexai-preview",Xd="@firebase/firestore-compat",Zd="firebase",ef="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bo="[DEFAULT]",tf={[To]:"fire-core",[Cd]:"fire-core-compat",[Pd]:"fire-analytics",[kd]:"fire-analytics-compat",[xd]:"fire-app-check",[Ld]:"fire-app-check-compat",[Dd]:"fire-auth",[Vd]:"fire-auth-compat",[Nd]:"fire-rtdb",[Od]:"fire-data-connect",[Md]:"fire-rtdb-compat",[Ud]:"fire-fn",[Fd]:"fire-fn-compat",[Bd]:"fire-iid",[qd]:"fire-iid-compat",[jd]:"fire-fcm",[$d]:"fire-fcm-compat",[zd]:"fire-perf",[Hd]:"fire-perf-compat",[Gd]:"fire-rc",[Kd]:"fire-rc-compat",[Wd]:"fire-gcs",[Qd]:"fire-gcs-compat",[Jd]:"fire-fst",[Xd]:"fire-fst-compat",[Yd]:"fire-vertex","fire-js":"fire-js",[Zd]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gi=new Map,nf=new Map,Ao=new Map;function cc(n,e){try{n.container.addComponent(e)}catch(t){Jt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Ir(n){const e=n.name;if(Ao.has(e))return Jt.debug(`There were multiple attempts to register component ${e}.`),!1;Ao.set(e,n);for(const t of gi.values())cc(t,n);for(const t of nf.values())cc(t,n);return!0}function Wo(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function yt(n){return n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rf={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},mn=new _s("app","Firebase",rf);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sf{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Jn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw mn.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xr=ef;function Sl(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:bo,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw mn.create("bad-app-name",{appName:String(s)});if(t||(t=Il()),!t)throw mn.create("no-options");const o=gi.get(s);if(o){if(cs(t,o.options)&&cs(r,o.config))return o;throw mn.create("duplicate-app",{appName:s})}const a=new ud(s);for(const u of Ao.values())a.addComponent(u);const l=new sf(t,r,a);return gi.set(s,l),l}function Rl(n=bo){const e=gi.get(n);if(!e&&n===bo&&Il())return Sl();if(!e)throw mn.create("no-app",{appName:n});return e}function gn(n,e,t){var r;let s=(r=tf[n])!==null&&r!==void 0?r:n;t&&(s+=`-${t}`);const o=s.match(/\s|\//),a=e.match(/\s|\//);if(o||a){const l=[`Unable to register library "${s}" with version "${e}":`];o&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),o&&a&&l.push("and"),a&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Jt.warn(l.join(" "));return}Ir(new Jn(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const of="firebase-heartbeat-database",af=1,ls="firebase-heartbeat-store";let po=null;function Cl(){return po||(po=Td(of,af,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(ls)}catch(t){console.warn(t)}}}}).catch(n=>{throw mn.create("idb-open",{originalErrorMessage:n.message})})),po}async function cf(n){try{const t=(await Cl()).transaction(ls),r=await t.objectStore(ls).get(kl(n));return await t.done,r}catch(e){if(e instanceof en)Jt.warn(e.message);else{const t=mn.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Jt.warn(t.message)}}}async function lc(n,e){try{const r=(await Cl()).transaction(ls,"readwrite");await r.objectStore(ls).put(e,kl(n)),await r.done}catch(t){if(t instanceof en)Jt.warn(t.message);else{const r=mn.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Jt.warn(r.message)}}}function kl(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lf=1024,uf=30*24*60*60*1e3;class hf{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new ff(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=uc();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o)?void 0:(this._heartbeatsCache.heartbeats.push({date:o,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(a=>{const l=new Date(a.date).valueOf();return Date.now()-l<=uf}),this._storage.overwrite(this._heartbeatsCache))}catch(r){Jt.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=uc(),{heartbeatsToSend:r,unsentEntries:s}=df(this._heartbeatsCache.heartbeats),o=mi(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(t){return Jt.warn(t),""}}}function uc(){return new Date().toISOString().substring(0,10)}function df(n,e=lf){const t=[];let r=n.slice();for(const s of n){const o=t.find(a=>a.agent===s.agent);if(o){if(o.dates.push(s.date),hc(t)>e){o.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),hc(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class ff{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Xh()?Zh().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await cf(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return lc(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return lc(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function hc(n){return mi(JSON.stringify({version:2,heartbeats:n})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pf(n){Ir(new Jn("platform-logger",e=>new Sd(e),"PRIVATE")),Ir(new Jn("heartbeat",e=>new hf(e),"PRIVATE")),gn(To,ac,n),gn(To,ac,"esm2017"),gn("fire-js","")}pf("");var mf="firebase",gf="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */gn(mf,gf,"app");function Qo(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(n);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(n,r[s])&&(t[r[s]]=n[r[s]]);return t}function Pl(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const _f=Pl,Ll=new _s("auth","Firebase",Pl());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _i=new Go("@firebase/auth");function yf(n,...e){_i.logLevel<=ne.WARN&&_i.warn(`Auth (${xr}): ${n}`,...e)}function oi(n,...e){_i.logLevel<=ne.ERROR&&_i.error(`Auth (${xr}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mt(n,...e){throw Yo(n,...e)}function vt(n,...e){return Yo(n,...e)}function Jo(n,e,t){const r=Object.assign(Object.assign({},_f()),{[e]:t});return new _s("auth","Firebase",r).create(e,{appName:n.name})}function Qt(n){return Jo(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function vf(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&mt(n,"argument-error"),Jo(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Yo(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Ll.create(n,...e)}function H(n,e,...t){if(!n)throw Yo(e,...t)}function Gt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw oi(e),new Error(e)}function Yt(n,e){n||Gt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function So(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function wf(){return dc()==="http:"||dc()==="https:"}function dc(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ef(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(wf()||Wh()||"connection"in navigator)?navigator.onLine:!0}function If(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vs{constructor(e,t){this.shortDelay=e,this.longDelay=t,Yt(t>e,"Short delay should be less than long delay!"),this.isMobile=Hh()||Qh()}get(){return Ef()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xo(n,e){Yt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xl{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Gt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Gt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Gt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tf={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bf=new vs(3e4,6e4);function tn(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function Dt(n,e,t,r,s={}){return Dl(n,s,async()=>{let o={},a={};r&&(e==="GET"?a=r:o={body:JSON.stringify(r)});const l=ys(Object.assign({key:n.config.apiKey},a)).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const d=Object.assign({method:e,headers:u},o);return Kh()||(d.referrerPolicy="no-referrer"),xl.fetch()(Vl(n,n.config.apiHost,t,l),d)})}async function Dl(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},Tf),e);try{const s=new Sf(n),o=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await o.json();if("needConfirmation"in a)throw ti(n,"account-exists-with-different-credential",a);if(o.ok&&!("errorMessage"in a))return a;{const l=o.ok?a.errorMessage:a.error.message,[u,d]=l.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw ti(n,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw ti(n,"email-already-in-use",a);if(u==="USER_DISABLED")throw ti(n,"user-disabled",a);const p=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw Jo(n,p,d);mt(n,p)}}catch(s){if(s instanceof en)throw s;mt(n,"network-request-failed",{message:String(s)})}}async function ws(n,e,t,r,s={}){const o=await Dt(n,e,t,r,s);return"mfaPendingCredential"in o&&mt(n,"multi-factor-auth-required",{_serverResponse:o}),o}function Vl(n,e,t,r){const s=`${e}${t}?${r}`;return n.config.emulator?Xo(n.config,s):`${n.config.apiScheme}://${s}`}function Af(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Sf{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(vt(this.auth,"network-request-failed")),bf.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function ti(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=vt(n,e,r);return s.customData._tokenResponse=t,s}function fc(n){return n!==void 0&&n.enterprise!==void 0}class Rf{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Af(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function Cf(n,e){return Dt(n,"GET","/v2/recaptchaConfig",tn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kf(n,e){return Dt(n,"POST","/v1/accounts:delete",e)}async function Nl(n,e){return Dt(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rs(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Pf(n,e=!1){const t=Ve(n),r=await t.getIdToken(e),s=Li(r);H(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const o=typeof s.firebase=="object"?s.firebase:void 0,a=o==null?void 0:o.sign_in_provider;return{claims:s,token:r,authTime:rs(mo(s.auth_time)),issuedAtTime:rs(mo(s.iat)),expirationTime:rs(mo(s.exp)),signInProvider:a||null,signInSecondFactor:(o==null?void 0:o.sign_in_second_factor)||null}}function mo(n){return Number(n)*1e3}function Li(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return oi("JWT malformed, contained fewer than 3 sections"),null;try{const s=wl(t);return s?JSON.parse(s):(oi("Failed to decode base64 JWT payload"),null)}catch(s){return oi("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function pc(n){const e=Li(n);return H(e,"internal-error"),H(typeof e.exp<"u","internal-error"),H(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Tr(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof en&&Lf(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function Lf({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xf{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ro{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=rs(this.lastLoginAt),this.creationTime=rs(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yi(n){var e;const t=n.auth,r=await n.getIdToken(),s=await Tr(n,Nl(t,{idToken:r}));H(s==null?void 0:s.users.length,t,"internal-error");const o=s.users[0];n._notifyReloadListener(o);const a=!((e=o.providerUserInfo)===null||e===void 0)&&e.length?Ol(o.providerUserInfo):[],l=Vf(n.providerData,a),u=n.isAnonymous,d=!(n.email&&o.passwordHash)&&!(l!=null&&l.length),p=u?d:!1,y={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:l,metadata:new Ro(o.createdAt,o.lastLoginAt),isAnonymous:p};Object.assign(n,y)}async function Df(n){const e=Ve(n);await yi(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Vf(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Ol(n){return n.map(e=>{var{providerId:t}=e,r=Qo(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Nf(n,e){const t=await Dl(n,{},async()=>{const r=ys({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:o}=n.config,a=Vl(n,s,"/v1/token",`key=${o}`),l=await n._getAdditionalHeaders();return l["Content-Type"]="application/x-www-form-urlencoded",xl.fetch()(a,{method:"POST",headers:l,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Of(n,e){return Dt(n,"POST","/v2/accounts:revokeToken",tn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _r{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){H(e.idToken,"internal-error"),H(typeof e.idToken<"u","internal-error"),H(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):pc(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){H(e.length!==0,"internal-error");const t=pc(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(H(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:o}=await Nf(e,t);this.updateTokensAndExpiration(r,s,Number(o))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:o}=t,a=new _r;return r&&(H(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(H(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),o&&(H(typeof o=="number","internal-error",{appName:e}),a.expirationTime=o),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new _r,this.toJSON())}_performRefresh(){return Gt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ln(n,e){H(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Kt{constructor(e){var{uid:t,auth:r,stsTokenManager:s}=e,o=Qo(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new xf(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=o.displayName||null,this.email=o.email||null,this.emailVerified=o.emailVerified||!1,this.phoneNumber=o.phoneNumber||null,this.photoURL=o.photoURL||null,this.isAnonymous=o.isAnonymous||!1,this.tenantId=o.tenantId||null,this.providerData=o.providerData?[...o.providerData]:[],this.metadata=new Ro(o.createdAt||void 0,o.lastLoginAt||void 0)}async getIdToken(e){const t=await Tr(this,this.stsTokenManager.getToken(this.auth,e));return H(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Pf(this,e)}reload(){return Df(this)}_assign(e){this!==e&&(H(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Kt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){H(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await yi(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(yt(this.auth.app))return Promise.reject(Qt(this.auth));const e=await this.getIdToken();return await Tr(this,kf(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,s,o,a,l,u,d,p;const y=(r=t.displayName)!==null&&r!==void 0?r:void 0,b=(s=t.email)!==null&&s!==void 0?s:void 0,S=(o=t.phoneNumber)!==null&&o!==void 0?o:void 0,x=(a=t.photoURL)!==null&&a!==void 0?a:void 0,U=(l=t.tenantId)!==null&&l!==void 0?l:void 0,L=(u=t._redirectEventId)!==null&&u!==void 0?u:void 0,X=(d=t.createdAt)!==null&&d!==void 0?d:void 0,O=(p=t.lastLoginAt)!==null&&p!==void 0?p:void 0,{uid:re,emailVerified:be,isAnonymous:Ne,providerData:we,stsTokenManager:I}=t;H(re&&I,e,"internal-error");const m=_r.fromJSON(this.name,I);H(typeof re=="string",e,"internal-error"),ln(y,e.name),ln(b,e.name),H(typeof be=="boolean",e,"internal-error"),H(typeof Ne=="boolean",e,"internal-error"),ln(S,e.name),ln(x,e.name),ln(U,e.name),ln(L,e.name),ln(X,e.name),ln(O,e.name);const _=new Kt({uid:re,auth:e,email:b,emailVerified:be,displayName:y,isAnonymous:Ne,photoURL:x,phoneNumber:S,tenantId:U,stsTokenManager:m,createdAt:X,lastLoginAt:O});return we&&Array.isArray(we)&&(_.providerData=we.map(E=>Object.assign({},E))),L&&(_._redirectEventId=L),_}static async _fromIdTokenResponse(e,t,r=!1){const s=new _r;s.updateFromServerResponse(t);const o=new Kt({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await yi(o),o}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];H(s.localId!==void 0,"internal-error");const o=s.providerUserInfo!==void 0?Ol(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!(o!=null&&o.length),l=new _r;l.updateFromIdToken(r);const u=new Kt({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:a}),d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new Ro(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(o!=null&&o.length)};return Object.assign(u,d),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mc=new Map;function Wt(n){Yt(n instanceof Function,"Expected a class definition");let e=mc.get(n);return e?(Yt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,mc.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ml{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Ml.type="NONE";const gc=Ml;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ai(n,e,t){return`firebase:${n}:${e}:${t}`}class yr{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:o}=this.auth;this.fullUserKey=ai(this.userKey,s.apiKey,o),this.fullPersistenceKey=ai("persistence",s.apiKey,o),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Kt._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new yr(Wt(gc),e,r);const s=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let o=s[0]||Wt(gc);const a=ai(r,e.config.apiKey,e.name);let l=null;for(const d of t)try{const p=await d._get(a);if(p){const y=Kt._fromJSON(e,p);d!==o&&(l=y),o=d;break}}catch{}const u=s.filter(d=>d._shouldAllowMigration);return!o._shouldAllowMigration||!u.length?new yr(o,e,r):(o=u[0],l&&await o._set(a,l.toJSON()),await Promise.all(t.map(async d=>{if(d!==o)try{await d._remove(a)}catch{}})),new yr(o,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _c(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(ql(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Ul(e))return"Firefox";if(e.includes("silk/"))return"Silk";if($l(e))return"Blackberry";if(zl(e))return"Webos";if(Fl(e))return"Safari";if((e.includes("chrome/")||Bl(e))&&!e.includes("edge/"))return"Chrome";if(jl(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Ul(n=tt()){return/firefox\//i.test(n)}function Fl(n=tt()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Bl(n=tt()){return/crios\//i.test(n)}function ql(n=tt()){return/iemobile/i.test(n)}function jl(n=tt()){return/android/i.test(n)}function $l(n=tt()){return/blackberry/i.test(n)}function zl(n=tt()){return/webos/i.test(n)}function Zo(n=tt()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Mf(n=tt()){var e;return Zo(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Uf(){return Jh()&&document.documentMode===10}function Hl(n=tt()){return Zo(n)||jl(n)||zl(n)||$l(n)||/windows phone/i.test(n)||ql(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gl(n,e=[]){let t;switch(n){case"Browser":t=_c(tt());break;case"Worker":t=`${_c(tt())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${xr}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ff{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=o=>new Promise((a,l)=>{try{const u=e(o);a(u)}catch(u){l(u)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bf(n,e={}){return Dt(n,"GET","/v2/passwordPolicy",tn(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qf=6;class jf{constructor(e){var t,r,s,o;const a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:qf,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(o=e.forceUpgradeOnSignin)!==null&&o!==void 0?o:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,s,o,a,l;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(t=u.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(s=u.containsLowercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(o=u.containsUppercaseLetter)!==null&&o!==void 0?o:!0),u.isValid&&(u.isValid=(a=u.containsNumericCharacter)!==null&&a!==void 0?a:!0),u.isValid&&(u.isValid=(l=u.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),u}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,o){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $f{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new yc(this),this.idTokenSubscription=new yc(this),this.beforeStateQueue=new Ff(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Ll,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Wt(t)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await yr.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Nl(this,{idToken:e}),r=await Kt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(yt(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(l,l))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,o=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,l=s==null?void 0:s._redirectEventId,u=await this.tryRedirectSignIn(e);(!a||a===l)&&(u!=null&&u.user)&&(s=u.user,o=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(o)try{await this.beforeStateQueue.runMiddleware(s)}catch(a){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return H(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await yi(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=If()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(yt(this.app))return Promise.reject(Qt(this));const t=e?Ve(e):null;return t&&H(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&H(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return yt(this.app)?Promise.reject(Qt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return yt(this.app)?Promise.reject(Qt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Wt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Bf(this),t=new jf(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new _s("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await Of(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Wt(e)||this._popupRedirectResolver;H(t,this,"argument-error"),this.redirectPersistenceManager=await yr.create(this,[Wt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const o=typeof t=="function"?t:t.next.bind(t);let a=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(H(l,this,"internal-error"),l.then(()=>{a||o(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,s);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return H(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Gl(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&yf(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function Tn(n){return Ve(n)}class yc{constructor(e){this.auth=e,this.observer=null,this.addObserver=sd(t=>this.observer=t)}get next(){return H(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let xi={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function zf(n){xi=n}function Kl(n){return xi.loadJS(n)}function Hf(){return xi.recaptchaEnterpriseScript}function Gf(){return xi.gapiScript}function Kf(n){return`__${n}${Math.floor(Math.random()*1e6)}`}const Wf="recaptcha-enterprise",Qf="NO_RECAPTCHA";class Jf{constructor(e){this.type=Wf,this.auth=Tn(e)}async verify(e="verify",t=!1){async function r(o){if(!t){if(o.tenantId==null&&o._agentRecaptchaConfig!=null)return o._agentRecaptchaConfig.siteKey;if(o.tenantId!=null&&o._tenantRecaptchaConfigs[o.tenantId]!==void 0)return o._tenantRecaptchaConfigs[o.tenantId].siteKey}return new Promise(async(a,l)=>{Cf(o,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const d=new Rf(u);return o.tenantId==null?o._agentRecaptchaConfig=d:o._tenantRecaptchaConfigs[o.tenantId]=d,a(d.siteKey)}}).catch(u=>{l(u)})})}function s(o,a,l){const u=window.grecaptcha;fc(u)?u.enterprise.ready(()=>{u.enterprise.execute(o,{action:e}).then(d=>{a(d)}).catch(()=>{a(Qf)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((o,a)=>{r(this.auth).then(l=>{if(!t&&fc(window.grecaptcha))s(l,o,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let u=Hf();u.length!==0&&(u+=l),Kl(u).then(()=>{s(l,o,a)}).catch(d=>{a(d)})}}).catch(l=>{a(l)})})}}async function vc(n,e,t,r=!1){const s=new Jf(n);let o;try{o=await s.verify(t)}catch{o=await s.verify(t,!0)}const a=Object.assign({},e);return r?Object.assign(a,{captchaResp:o}):Object.assign(a,{captchaResponse:o}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function Co(n,e,t,r){var s;if(!((s=n._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await vc(n,e,t,t==="getOobCode");return r(n,o)}else return r(n,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const a=await vc(n,e,t,t==="getOobCode");return r(n,a)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yf(n,e){const t=Wo(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),o=t.getOptions();if(cs(o,e??{}))return s;mt(s,"already-initialized")}return t.initialize({options:e})}function Xf(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(Wt);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Zf(n,e,t){const r=Tn(n);H(r._canInitEmulator,r,"emulator-config-failed"),H(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,o=Wl(e),{host:a,port:l}=ep(e),u=l===null?"":`:${l}`;r.config.emulator={url:`${o}//${a}${u}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:a,port:l,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:s})}),tp()}function Wl(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function ep(n){const e=Wl(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const o=s[1];return{host:o,port:wc(r.substr(o.length+1))}}else{const[o,a]=r.split(":");return{host:o,port:wc(a)}}}function wc(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function tp(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ea{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Gt("not implemented")}_getIdTokenResponse(e){return Gt("not implemented")}_linkToIdToken(e,t){return Gt("not implemented")}_getReauthenticationResolver(e){return Gt("not implemented")}}async function np(n,e){return Dt(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rp(n,e){return ws(n,"POST","/v1/accounts:signInWithPassword",tn(n,e))}async function sp(n,e){return Dt(n,"POST","/v1/accounts:sendOobCode",tn(n,e))}async function ip(n,e){return sp(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function op(n,e){return ws(n,"POST","/v1/accounts:signInWithEmailLink",tn(n,e))}async function ap(n,e){return ws(n,"POST","/v1/accounts:signInWithEmailLink",tn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class us extends ea{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new us(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new us(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Co(e,t,"signInWithPassword",rp);case"emailLink":return op(e,{email:this._email,oobCode:this._password});default:mt(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Co(e,r,"signUpPassword",np);case"emailLink":return ap(e,{idToken:t,email:this._email,oobCode:this._password});default:mt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vr(n,e){return ws(n,"POST","/v1/accounts:signInWithIdp",tn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cp="http://localhost";class Yn extends ea{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Yn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):mt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=t,o=Qo(t,["providerId","signInMethod"]);if(!r||!s)return null;const a=new Yn(r,s);return a.idToken=o.idToken||void 0,a.accessToken=o.accessToken||void 0,a.secret=o.secret,a.nonce=o.nonce,a.pendingToken=o.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return vr(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,vr(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,vr(e,t)}buildRequest(){const e={requestUri:cp,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=ys(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lp(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function up(n){const e=Yr(Xr(n)).link,t=e?Yr(Xr(e)).deep_link_id:null,r=Yr(Xr(n)).deep_link_id;return(r?Yr(Xr(r)).link:null)||r||t||e||n}class ta{constructor(e){var t,r,s,o,a,l;const u=Yr(Xr(e)),d=(t=u.apiKey)!==null&&t!==void 0?t:null,p=(r=u.oobCode)!==null&&r!==void 0?r:null,y=lp((s=u.mode)!==null&&s!==void 0?s:null);H(d&&p&&y,"argument-error"),this.apiKey=d,this.operation=y,this.code=p,this.continueUrl=(o=u.continueUrl)!==null&&o!==void 0?o:null,this.languageCode=(a=u.languageCode)!==null&&a!==void 0?a:null,this.tenantId=(l=u.tenantId)!==null&&l!==void 0?l:null}static parseLink(e){const t=up(e);try{return new ta(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dr{constructor(){this.providerId=Dr.PROVIDER_ID}static credential(e,t){return us._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=ta.parseLink(t);return H(r,"argument-error"),us._fromEmailAndCode(e,r.code,r.tenantId)}}Dr.PROVIDER_ID="password";Dr.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Dr.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class na{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Es extends na{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class un extends Es{constructor(){super("facebook.com")}static credential(e){return Yn._fromParams({providerId:un.PROVIDER_ID,signInMethod:un.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return un.credentialFromTaggedObject(e)}static credentialFromError(e){return un.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return un.credential(e.oauthAccessToken)}catch{return null}}}un.FACEBOOK_SIGN_IN_METHOD="facebook.com";un.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ht extends Es{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Yn._fromParams({providerId:Ht.PROVIDER_ID,signInMethod:Ht.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Ht.credentialFromTaggedObject(e)}static credentialFromError(e){return Ht.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return Ht.credential(t,r)}catch{return null}}}Ht.GOOGLE_SIGN_IN_METHOD="google.com";Ht.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hn extends Es{constructor(){super("github.com")}static credential(e){return Yn._fromParams({providerId:hn.PROVIDER_ID,signInMethod:hn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return hn.credentialFromTaggedObject(e)}static credentialFromError(e){return hn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return hn.credential(e.oauthAccessToken)}catch{return null}}}hn.GITHUB_SIGN_IN_METHOD="github.com";hn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dn extends Es{constructor(){super("twitter.com")}static credential(e,t){return Yn._fromParams({providerId:dn.PROVIDER_ID,signInMethod:dn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return dn.credentialFromTaggedObject(e)}static credentialFromError(e){return dn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return dn.credential(t,r)}catch{return null}}}dn.TWITTER_SIGN_IN_METHOD="twitter.com";dn.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hp(n,e){return ws(n,"POST","/v1/accounts:signUp",tn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const o=await Kt._fromIdTokenResponse(e,r,s),a=Ec(r);return new Xn({user:o,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=Ec(r);return new Xn({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function Ec(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vi extends en{constructor(e,t,r,s){var o;super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,vi.prototype),this.customData={appName:e.name,tenantId:(o=e.tenantId)!==null&&o!==void 0?o:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new vi(e,t,r,s)}}function Ql(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(o=>{throw o.code==="auth/multi-factor-auth-required"?vi._fromErrorAndOperation(n,o,e,r):o})}async function dp(n,e,t=!1){const r=await Tr(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Xn._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fp(n,e,t=!1){const{auth:r}=n;if(yt(r.app))return Promise.reject(Qt(r));const s="reauthenticate";try{const o=await Tr(n,Ql(r,s,e,n),t);H(o.idToken,r,"internal-error");const a=Li(o.idToken);H(a,r,"internal-error");const{sub:l}=a;return H(n.uid===l,r,"user-mismatch"),Xn._forOperation(n,s,o)}catch(o){throw(o==null?void 0:o.code)==="auth/user-not-found"&&mt(r,"user-mismatch"),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Jl(n,e,t=!1){if(yt(n.app))return Promise.reject(Qt(n));const r="signIn",s=await Ql(n,r,e),o=await Xn._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(o.user),o}async function pp(n,e){return Jl(Tn(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Yl(n){const e=Tn(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function mp(n,e,t){if(yt(n.app))return Promise.reject(Qt(n));const r=Tn(n),a=await Co(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",hp).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&Yl(n),u}),l=await Xn._fromIdTokenResponse(r,"signIn",a);return await r._updateCurrentUser(l.user),l}function gp(n,e,t){return yt(n.app)?Promise.reject(Qt(n)):pp(Ve(n),Dr.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Yl(n),r})}async function _p(n,e){const t=Ve(n),s={requestType:"VERIFY_EMAIL",idToken:await n.getIdToken()},{email:o}=await ip(t.auth,s);o!==n.email&&await n.reload()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yp(n,e){return Dt(n,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ic(n,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;const r=Ve(n),o={idToken:await r.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},a=await Tr(r,yp(r.auth,o));r.displayName=a.displayName||null,r.photoURL=a.photoUrl||null;const l=r.providerData.find(({providerId:u})=>u==="password");l&&(l.displayName=r.displayName,l.photoURL=r.photoURL),await r._updateTokensIfNecessary(a)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vp(n){var e,t;if(!n)return null;const{providerId:r}=n,s=n.rawUserInfo?JSON.parse(n.rawUserInfo):{},o=n.isNewUser||n.kind==="identitytoolkit#SignupNewUserResponse";if(!r&&(n!=null&&n.idToken)){const a=(t=(e=Li(n.idToken))===null||e===void 0?void 0:e.firebase)===null||t===void 0?void 0:t.sign_in_provider;if(a){const l=a!=="anonymous"&&a!=="custom"?a:null;return new wr(o,l)}}if(!r)return null;switch(r){case"facebook.com":return new wp(o,s);case"github.com":return new Ep(o,s);case"google.com":return new Ip(o,s);case"twitter.com":return new Tp(o,s,n.screenName||null);case"custom":case"anonymous":return new wr(o,null);default:return new wr(o,r,s)}}class wr{constructor(e,t,r={}){this.isNewUser=e,this.providerId=t,this.profile=r}}class Xl extends wr{constructor(e,t,r,s){super(e,t,r),this.username=s}}class wp extends wr{constructor(e,t){super(e,"facebook.com",t)}}class Ep extends Xl{constructor(e,t){super(e,"github.com",t,typeof(t==null?void 0:t.login)=="string"?t==null?void 0:t.login:null)}}class Ip extends wr{constructor(e,t){super(e,"google.com",t)}}class Tp extends Xl{constructor(e,t,r){super(e,"twitter.com",t,r)}}function Tc(n){const{user:e,_tokenResponse:t}=n;return e.isAnonymous&&!t?{providerId:null,isNewUser:!1,profile:null}:vp(t)}function bp(n,e,t,r){return Ve(n).onIdTokenChanged(e,t,r)}function Ap(n,e,t){return Ve(n).beforeAuthStateChanged(e,t)}function Sp(n,e,t,r){return Ve(n).onAuthStateChanged(e,t,r)}function Rp(n){return Ve(n).signOut()}const wi="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zl{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(wi,"1"),this.storage.removeItem(wi),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cp=1e3,kp=10;class eu extends Zl{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Hl(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,l,u)=>{this.notifyListeners(a,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},o=this.storage.getItem(r);Uf()&&o!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,kp):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Cp)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}eu.type="LOCAL";const Pp=eu;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tu extends Zl{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}tu.type="SESSION";const nu=tu;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lp(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Di{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new Di(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:o}=t.data,a=this.handlersMap[s];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const l=Array.from(a).map(async d=>d(t.origin,o)),u=await Lp(l);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Di.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ra(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xp{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let o,a;return new Promise((l,u)=>{const d=ra("",20);s.port1.start();const p=setTimeout(()=>{u(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(y){const b=y;if(b.data.eventId===d)switch(b.data.status){case"ack":clearTimeout(p),o=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(o),l(b.data.response);break;default:clearTimeout(p),clearTimeout(o),u(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ct(){return window}function Dp(n){Ct().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ru(){return typeof Ct().WorkerGlobalScope<"u"&&typeof Ct().importScripts=="function"}async function Vp(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Np(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function Op(){return ru()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const su="firebaseLocalStorageDb",Mp=1,Ei="firebaseLocalStorage",iu="fbase_key";class Is{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Vi(n,e){return n.transaction([Ei],e?"readwrite":"readonly").objectStore(Ei)}function Up(){const n=indexedDB.deleteDatabase(su);return new Is(n).toPromise()}function ko(){const n=indexedDB.open(su,Mp);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Ei,{keyPath:iu})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Ei)?e(r):(r.close(),await Up(),e(await ko()))})})}async function bc(n,e,t){const r=Vi(n,!0).put({[iu]:e,value:t});return new Is(r).toPromise()}async function Fp(n,e){const t=Vi(n,!1).get(e),r=await new Is(t).toPromise();return r===void 0?null:r.value}function Ac(n,e){const t=Vi(n,!0).delete(e);return new Is(t).toPromise()}const Bp=800,qp=3;class ou{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ko(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>qp)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return ru()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Di._getInstance(Op()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await Vp(),!this.activeServiceWorker)return;this.sender=new xp(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Np()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ko();return await bc(e,wi,"1"),await Ac(e,wi),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>bc(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>Fp(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Ac(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const o=Vi(s,!1).getAll();return new Is(o).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:o}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(o)&&(this.notifyListeners(s,o),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Bp)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}ou.type="LOCAL";const jp=ou;new vs(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function au(n,e){return e?Wt(e):(H(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sa extends ea{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return vr(e,this._buildIdpRequest())}_linkToIdToken(e,t){return vr(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return vr(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function $p(n){return Jl(n.auth,new sa(n),n.bypassAuthState)}function zp(n){const{auth:e,user:t}=n;return H(t,e,"internal-error"),fp(t,new sa(n),n.bypassAuthState)}async function Hp(n){const{auth:e,user:t}=n;return H(t,e,"internal-error"),dp(t,new sa(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cu{constructor(e,t,r,s,o=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=o,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:o,error:a,type:l}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:o||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(u))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return $p;case"linkViaPopup":case"linkViaRedirect":return Hp;case"reauthViaPopup":case"reauthViaRedirect":return zp;default:mt(this.auth,"internal-error")}}resolve(e){Yt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Yt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gp=new vs(2e3,1e4);async function Sc(n,e,t){if(yt(n.app))return Promise.reject(vt(n,"operation-not-supported-in-this-environment"));const r=Tn(n);vf(n,e,na);const s=au(r,t);return new Kn(r,"signInViaPopup",e,s).executeNotNull()}class Kn extends cu{constructor(e,t,r,s,o){super(e,t,s,o),this.provider=r,this.authWindow=null,this.pollId=null,Kn.currentPopupAction&&Kn.currentPopupAction.cancel(),Kn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return H(e,this.auth,"internal-error"),e}async onExecution(){Yt(this.filter.length===1,"Popup operations only handle one event");const e=ra();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(vt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(vt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Kn.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(vt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Gp.get())};e()}}Kn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kp="pendingRedirect",ci=new Map;class Wp extends cu{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=ci.get(this.auth._key());if(!e){try{const r=await Qp(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}ci.set(this.auth._key(),e)}return this.bypassAuthState||ci.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Qp(n,e){const t=Xp(e),r=Yp(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function Jp(n,e){ci.set(n._key(),e)}function Yp(n){return Wt(n._redirectPersistence)}function Xp(n){return ai(Kp,n.config.apiKey,n.name)}async function Zp(n,e,t=!1){if(yt(n.app))return Promise.reject(Qt(n));const r=Tn(n),s=au(r,e),a=await new Wp(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const em=10*60*1e3;class tm{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!nm(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!lu(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(vt(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=em&&this.cachedEventUids.clear(),this.cachedEventUids.has(Rc(e))}saveEventToCache(e){this.cachedEventUids.add(Rc(e)),this.lastProcessedEventTime=Date.now()}}function Rc(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function lu({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function nm(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return lu(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rm(n,e={}){return Dt(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sm=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,im=/^https?/;async function om(n){if(n.config.emulator)return;const{authorizedDomains:e}=await rm(n);for(const t of e)try{if(am(t))return}catch{}mt(n,"unauthorized-domain")}function am(n){const e=So(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!im.test(t))return!1;if(sm.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cm=new vs(3e4,6e4);function Cc(){const n=Ct().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function lm(n){return new Promise((e,t)=>{var r,s,o;function a(){Cc(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Cc(),t(vt(n,"network-request-failed"))},timeout:cm.get()})}if(!((s=(r=Ct().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((o=Ct().gapi)===null||o===void 0)&&o.load)a();else{const l=Kf("iframefcb");return Ct()[l]=()=>{gapi.load?a():t(vt(n,"network-request-failed"))},Kl(`${Gf()}?onload=${l}`).catch(u=>t(u))}}).catch(e=>{throw li=null,e})}let li=null;function um(n){return li=li||lm(n),li}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hm=new vs(5e3,15e3),dm="__/auth/iframe",fm="emulator/auth/iframe",pm={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},mm=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function gm(n){const e=n.config;H(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Xo(e,fm):`https://${n.config.authDomain}/${dm}`,r={apiKey:e.apiKey,appName:n.name,v:xr},s=mm.get(n.config.apiHost);s&&(r.eid=s);const o=n._getFrameworks();return o.length&&(r.fw=o.join(",")),`${t}?${ys(r).slice(1)}`}async function _m(n){const e=await um(n),t=Ct().gapi;return H(t,n,"internal-error"),e.open({where:document.body,url:gm(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:pm,dontclear:!0},r=>new Promise(async(s,o)=>{await r.restyle({setHideOnLeave:!1});const a=vt(n,"network-request-failed"),l=Ct().setTimeout(()=>{o(a)},hm.get());function u(){Ct().clearTimeout(l),s(r)}r.ping(u).then(u,()=>{o(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ym={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},vm=500,wm=600,Em="_blank",Im="http://localhost";class kc{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Tm(n,e,t,r=vm,s=wm){const o=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const u=Object.assign(Object.assign({},ym),{width:r.toString(),height:s.toString(),top:o,left:a}),d=tt().toLowerCase();t&&(l=Bl(d)?Em:t),Ul(d)&&(e=e||Im,u.scrollbars="yes");const p=Object.entries(u).reduce((b,[S,x])=>`${b}${S}=${x},`,"");if(Mf(d)&&l!=="_self")return bm(e||"",l),new kc(null);const y=window.open(e||"",l,p);H(y,n,"popup-blocked");try{y.focus()}catch{}return new kc(y)}function bm(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Am="__/auth/handler",Sm="emulator/auth/handler",Rm=encodeURIComponent("fac");async function Pc(n,e,t,r,s,o){H(n.config.authDomain,n,"auth-domain-config-required"),H(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:xr,eventId:s};if(e instanceof na){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",rd(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,y]of Object.entries({}))a[p]=y}if(e instanceof Es){const p=e.getScopes().filter(y=>y!=="");p.length>0&&(a.scopes=p.join(","))}n.tenantId&&(a.tid=n.tenantId);const l=a;for(const p of Object.keys(l))l[p]===void 0&&delete l[p];const u=await n._getAppCheckToken(),d=u?`#${Rm}=${encodeURIComponent(u)}`:"";return`${Cm(n)}?${ys(l).slice(1)}${d}`}function Cm({config:n}){return n.emulator?Xo(n,Sm):`https://${n.authDomain}/${Am}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const go="webStorageSupport";class km{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=nu,this._completeRedirectFn=Zp,this._overrideRedirectResult=Jp}async _openPopup(e,t,r,s){var o;Yt((o=this.eventManagers[e._key()])===null||o===void 0?void 0:o.manager,"_initialize() not called before _openPopup()");const a=await Pc(e,t,r,So(),s);return Tm(e,a,ra())}async _openRedirect(e,t,r,s){await this._originValidation(e);const o=await Pc(e,t,r,So(),s);return Dp(o),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:o}=this.eventManagers[t];return s?Promise.resolve(s):(Yt(o,"If manager is not set, promise should be"),o)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await _m(e),r=new tm(e);return t.register("authEvent",s=>(H(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(go,{type:go},s=>{var o;const a=(o=s==null?void 0:s[0])===null||o===void 0?void 0:o[go];a!==void 0&&t(!!a),mt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=om(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Hl()||Fl()||Zo()}}const Pm=km;var Lc="@firebase/auth",xc="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lm{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){H(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xm(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Dm(n){Ir(new Jn("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),o=e.getProvider("app-check-internal"),{apiKey:a,authDomain:l}=r.options;H(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:a,authDomain:l,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Gl(n)},d=new $f(r,s,o,u);return Xf(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Ir(new Jn("auth-internal",e=>{const t=Tn(e.getProvider("auth").getImmediate());return(r=>new Lm(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),gn(Lc,xc,xm(n)),gn(Lc,xc,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vm=5*60,Nm=Tl("authIdTokenMaxAge")||Vm;let Dc=null;const Om=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>Nm)return;const s=t==null?void 0:t.token;Dc!==s&&(Dc=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function Mm(n=Rl()){const e=Wo(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Yf(n,{popupRedirectResolver:Pm,persistence:[jp,Pp,nu]}),r=Tl("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const o=new URL(r,location.origin);if(location.origin===o.origin){const a=Om(o.toString());Ap(t,a,()=>a(t.currentUser)),bp(t,l=>a(l))}}const s=El("auth");return s&&Zf(t,`http://${s}`),t}function Um(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}zf({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const o=vt("internal-error");o.customData=s,t(o)},r.type="text/javascript",r.charset="UTF-8",Um().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Dm("Browser");var Vc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Qn,uu;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(I,m){function _(){}_.prototype=m.prototype,I.D=m.prototype,I.prototype=new _,I.prototype.constructor=I,I.C=function(E,v,w){for(var g=Array(arguments.length-2),ue=2;ue<arguments.length;ue++)g[ue-2]=arguments[ue];return m.prototype[v].apply(E,g)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(I,m,_){_||(_=0);var E=Array(16);if(typeof m=="string")for(var v=0;16>v;++v)E[v]=m.charCodeAt(_++)|m.charCodeAt(_++)<<8|m.charCodeAt(_++)<<16|m.charCodeAt(_++)<<24;else for(v=0;16>v;++v)E[v]=m[_++]|m[_++]<<8|m[_++]<<16|m[_++]<<24;m=I.g[0],_=I.g[1],v=I.g[2];var w=I.g[3],g=m+(w^_&(v^w))+E[0]+3614090360&4294967295;m=_+(g<<7&4294967295|g>>>25),g=w+(v^m&(_^v))+E[1]+3905402710&4294967295,w=m+(g<<12&4294967295|g>>>20),g=v+(_^w&(m^_))+E[2]+606105819&4294967295,v=w+(g<<17&4294967295|g>>>15),g=_+(m^v&(w^m))+E[3]+3250441966&4294967295,_=v+(g<<22&4294967295|g>>>10),g=m+(w^_&(v^w))+E[4]+4118548399&4294967295,m=_+(g<<7&4294967295|g>>>25),g=w+(v^m&(_^v))+E[5]+1200080426&4294967295,w=m+(g<<12&4294967295|g>>>20),g=v+(_^w&(m^_))+E[6]+2821735955&4294967295,v=w+(g<<17&4294967295|g>>>15),g=_+(m^v&(w^m))+E[7]+4249261313&4294967295,_=v+(g<<22&4294967295|g>>>10),g=m+(w^_&(v^w))+E[8]+1770035416&4294967295,m=_+(g<<7&4294967295|g>>>25),g=w+(v^m&(_^v))+E[9]+2336552879&4294967295,w=m+(g<<12&4294967295|g>>>20),g=v+(_^w&(m^_))+E[10]+4294925233&4294967295,v=w+(g<<17&4294967295|g>>>15),g=_+(m^v&(w^m))+E[11]+2304563134&4294967295,_=v+(g<<22&4294967295|g>>>10),g=m+(w^_&(v^w))+E[12]+1804603682&4294967295,m=_+(g<<7&4294967295|g>>>25),g=w+(v^m&(_^v))+E[13]+4254626195&4294967295,w=m+(g<<12&4294967295|g>>>20),g=v+(_^w&(m^_))+E[14]+2792965006&4294967295,v=w+(g<<17&4294967295|g>>>15),g=_+(m^v&(w^m))+E[15]+1236535329&4294967295,_=v+(g<<22&4294967295|g>>>10),g=m+(v^w&(_^v))+E[1]+4129170786&4294967295,m=_+(g<<5&4294967295|g>>>27),g=w+(_^v&(m^_))+E[6]+3225465664&4294967295,w=m+(g<<9&4294967295|g>>>23),g=v+(m^_&(w^m))+E[11]+643717713&4294967295,v=w+(g<<14&4294967295|g>>>18),g=_+(w^m&(v^w))+E[0]+3921069994&4294967295,_=v+(g<<20&4294967295|g>>>12),g=m+(v^w&(_^v))+E[5]+3593408605&4294967295,m=_+(g<<5&4294967295|g>>>27),g=w+(_^v&(m^_))+E[10]+38016083&4294967295,w=m+(g<<9&4294967295|g>>>23),g=v+(m^_&(w^m))+E[15]+3634488961&4294967295,v=w+(g<<14&4294967295|g>>>18),g=_+(w^m&(v^w))+E[4]+3889429448&4294967295,_=v+(g<<20&4294967295|g>>>12),g=m+(v^w&(_^v))+E[9]+568446438&4294967295,m=_+(g<<5&4294967295|g>>>27),g=w+(_^v&(m^_))+E[14]+3275163606&4294967295,w=m+(g<<9&4294967295|g>>>23),g=v+(m^_&(w^m))+E[3]+4107603335&4294967295,v=w+(g<<14&4294967295|g>>>18),g=_+(w^m&(v^w))+E[8]+1163531501&4294967295,_=v+(g<<20&4294967295|g>>>12),g=m+(v^w&(_^v))+E[13]+2850285829&4294967295,m=_+(g<<5&4294967295|g>>>27),g=w+(_^v&(m^_))+E[2]+4243563512&4294967295,w=m+(g<<9&4294967295|g>>>23),g=v+(m^_&(w^m))+E[7]+1735328473&4294967295,v=w+(g<<14&4294967295|g>>>18),g=_+(w^m&(v^w))+E[12]+2368359562&4294967295,_=v+(g<<20&4294967295|g>>>12),g=m+(_^v^w)+E[5]+4294588738&4294967295,m=_+(g<<4&4294967295|g>>>28),g=w+(m^_^v)+E[8]+2272392833&4294967295,w=m+(g<<11&4294967295|g>>>21),g=v+(w^m^_)+E[11]+1839030562&4294967295,v=w+(g<<16&4294967295|g>>>16),g=_+(v^w^m)+E[14]+4259657740&4294967295,_=v+(g<<23&4294967295|g>>>9),g=m+(_^v^w)+E[1]+2763975236&4294967295,m=_+(g<<4&4294967295|g>>>28),g=w+(m^_^v)+E[4]+1272893353&4294967295,w=m+(g<<11&4294967295|g>>>21),g=v+(w^m^_)+E[7]+4139469664&4294967295,v=w+(g<<16&4294967295|g>>>16),g=_+(v^w^m)+E[10]+3200236656&4294967295,_=v+(g<<23&4294967295|g>>>9),g=m+(_^v^w)+E[13]+681279174&4294967295,m=_+(g<<4&4294967295|g>>>28),g=w+(m^_^v)+E[0]+3936430074&4294967295,w=m+(g<<11&4294967295|g>>>21),g=v+(w^m^_)+E[3]+3572445317&4294967295,v=w+(g<<16&4294967295|g>>>16),g=_+(v^w^m)+E[6]+76029189&4294967295,_=v+(g<<23&4294967295|g>>>9),g=m+(_^v^w)+E[9]+3654602809&4294967295,m=_+(g<<4&4294967295|g>>>28),g=w+(m^_^v)+E[12]+3873151461&4294967295,w=m+(g<<11&4294967295|g>>>21),g=v+(w^m^_)+E[15]+530742520&4294967295,v=w+(g<<16&4294967295|g>>>16),g=_+(v^w^m)+E[2]+3299628645&4294967295,_=v+(g<<23&4294967295|g>>>9),g=m+(v^(_|~w))+E[0]+4096336452&4294967295,m=_+(g<<6&4294967295|g>>>26),g=w+(_^(m|~v))+E[7]+1126891415&4294967295,w=m+(g<<10&4294967295|g>>>22),g=v+(m^(w|~_))+E[14]+2878612391&4294967295,v=w+(g<<15&4294967295|g>>>17),g=_+(w^(v|~m))+E[5]+4237533241&4294967295,_=v+(g<<21&4294967295|g>>>11),g=m+(v^(_|~w))+E[12]+1700485571&4294967295,m=_+(g<<6&4294967295|g>>>26),g=w+(_^(m|~v))+E[3]+2399980690&4294967295,w=m+(g<<10&4294967295|g>>>22),g=v+(m^(w|~_))+E[10]+4293915773&4294967295,v=w+(g<<15&4294967295|g>>>17),g=_+(w^(v|~m))+E[1]+2240044497&4294967295,_=v+(g<<21&4294967295|g>>>11),g=m+(v^(_|~w))+E[8]+1873313359&4294967295,m=_+(g<<6&4294967295|g>>>26),g=w+(_^(m|~v))+E[15]+4264355552&4294967295,w=m+(g<<10&4294967295|g>>>22),g=v+(m^(w|~_))+E[6]+2734768916&4294967295,v=w+(g<<15&4294967295|g>>>17),g=_+(w^(v|~m))+E[13]+1309151649&4294967295,_=v+(g<<21&4294967295|g>>>11),g=m+(v^(_|~w))+E[4]+4149444226&4294967295,m=_+(g<<6&4294967295|g>>>26),g=w+(_^(m|~v))+E[11]+3174756917&4294967295,w=m+(g<<10&4294967295|g>>>22),g=v+(m^(w|~_))+E[2]+718787259&4294967295,v=w+(g<<15&4294967295|g>>>17),g=_+(w^(v|~m))+E[9]+3951481745&4294967295,I.g[0]=I.g[0]+m&4294967295,I.g[1]=I.g[1]+(v+(g<<21&4294967295|g>>>11))&4294967295,I.g[2]=I.g[2]+v&4294967295,I.g[3]=I.g[3]+w&4294967295}r.prototype.u=function(I,m){m===void 0&&(m=I.length);for(var _=m-this.blockSize,E=this.B,v=this.h,w=0;w<m;){if(v==0)for(;w<=_;)s(this,I,w),w+=this.blockSize;if(typeof I=="string"){for(;w<m;)if(E[v++]=I.charCodeAt(w++),v==this.blockSize){s(this,E),v=0;break}}else for(;w<m;)if(E[v++]=I[w++],v==this.blockSize){s(this,E),v=0;break}}this.h=v,this.o+=m},r.prototype.v=function(){var I=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);I[0]=128;for(var m=1;m<I.length-8;++m)I[m]=0;var _=8*this.o;for(m=I.length-8;m<I.length;++m)I[m]=_&255,_/=256;for(this.u(I),I=Array(16),m=_=0;4>m;++m)for(var E=0;32>E;E+=8)I[_++]=this.g[m]>>>E&255;return I};function o(I,m){var _=l;return Object.prototype.hasOwnProperty.call(_,I)?_[I]:_[I]=m(I)}function a(I,m){this.h=m;for(var _=[],E=!0,v=I.length-1;0<=v;v--){var w=I[v]|0;E&&w==m||(_[v]=w,E=!1)}this.g=_}var l={};function u(I){return-128<=I&&128>I?o(I,function(m){return new a([m|0],0>m?-1:0)}):new a([I|0],0>I?-1:0)}function d(I){if(isNaN(I)||!isFinite(I))return y;if(0>I)return L(d(-I));for(var m=[],_=1,E=0;I>=_;E++)m[E]=I/_|0,_*=4294967296;return new a(m,0)}function p(I,m){if(I.length==0)throw Error("number format error: empty string");if(m=m||10,2>m||36<m)throw Error("radix out of range: "+m);if(I.charAt(0)=="-")return L(p(I.substring(1),m));if(0<=I.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=d(Math.pow(m,8)),E=y,v=0;v<I.length;v+=8){var w=Math.min(8,I.length-v),g=parseInt(I.substring(v,v+w),m);8>w?(w=d(Math.pow(m,w)),E=E.j(w).add(d(g))):(E=E.j(_),E=E.add(d(g)))}return E}var y=u(0),b=u(1),S=u(16777216);n=a.prototype,n.m=function(){if(U(this))return-L(this).m();for(var I=0,m=1,_=0;_<this.g.length;_++){var E=this.i(_);I+=(0<=E?E:4294967296+E)*m,m*=4294967296}return I},n.toString=function(I){if(I=I||10,2>I||36<I)throw Error("radix out of range: "+I);if(x(this))return"0";if(U(this))return"-"+L(this).toString(I);for(var m=d(Math.pow(I,6)),_=this,E="";;){var v=be(_,m).g;_=X(_,v.j(m));var w=((0<_.g.length?_.g[0]:_.h)>>>0).toString(I);if(_=v,x(_))return w+E;for(;6>w.length;)w="0"+w;E=w+E}},n.i=function(I){return 0>I?0:I<this.g.length?this.g[I]:this.h};function x(I){if(I.h!=0)return!1;for(var m=0;m<I.g.length;m++)if(I.g[m]!=0)return!1;return!0}function U(I){return I.h==-1}n.l=function(I){return I=X(this,I),U(I)?-1:x(I)?0:1};function L(I){for(var m=I.g.length,_=[],E=0;E<m;E++)_[E]=~I.g[E];return new a(_,~I.h).add(b)}n.abs=function(){return U(this)?L(this):this},n.add=function(I){for(var m=Math.max(this.g.length,I.g.length),_=[],E=0,v=0;v<=m;v++){var w=E+(this.i(v)&65535)+(I.i(v)&65535),g=(w>>>16)+(this.i(v)>>>16)+(I.i(v)>>>16);E=g>>>16,w&=65535,g&=65535,_[v]=g<<16|w}return new a(_,_[_.length-1]&-2147483648?-1:0)};function X(I,m){return I.add(L(m))}n.j=function(I){if(x(this)||x(I))return y;if(U(this))return U(I)?L(this).j(L(I)):L(L(this).j(I));if(U(I))return L(this.j(L(I)));if(0>this.l(S)&&0>I.l(S))return d(this.m()*I.m());for(var m=this.g.length+I.g.length,_=[],E=0;E<2*m;E++)_[E]=0;for(E=0;E<this.g.length;E++)for(var v=0;v<I.g.length;v++){var w=this.i(E)>>>16,g=this.i(E)&65535,ue=I.i(v)>>>16,nt=I.i(v)&65535;_[2*E+2*v]+=g*nt,O(_,2*E+2*v),_[2*E+2*v+1]+=w*nt,O(_,2*E+2*v+1),_[2*E+2*v+1]+=g*ue,O(_,2*E+2*v+1),_[2*E+2*v+2]+=w*ue,O(_,2*E+2*v+2)}for(E=0;E<m;E++)_[E]=_[2*E+1]<<16|_[2*E];for(E=m;E<2*m;E++)_[E]=0;return new a(_,0)};function O(I,m){for(;(I[m]&65535)!=I[m];)I[m+1]+=I[m]>>>16,I[m]&=65535,m++}function re(I,m){this.g=I,this.h=m}function be(I,m){if(x(m))throw Error("division by zero");if(x(I))return new re(y,y);if(U(I))return m=be(L(I),m),new re(L(m.g),L(m.h));if(U(m))return m=be(I,L(m)),new re(L(m.g),m.h);if(30<I.g.length){if(U(I)||U(m))throw Error("slowDivide_ only works with positive integers.");for(var _=b,E=m;0>=E.l(I);)_=Ne(_),E=Ne(E);var v=we(_,1),w=we(E,1);for(E=we(E,2),_=we(_,2);!x(E);){var g=w.add(E);0>=g.l(I)&&(v=v.add(_),w=g),E=we(E,1),_=we(_,1)}return m=X(I,v.j(m)),new re(v,m)}for(v=y;0<=I.l(m);){for(_=Math.max(1,Math.floor(I.m()/m.m())),E=Math.ceil(Math.log(_)/Math.LN2),E=48>=E?1:Math.pow(2,E-48),w=d(_),g=w.j(m);U(g)||0<g.l(I);)_-=E,w=d(_),g=w.j(m);x(w)&&(w=b),v=v.add(w),I=X(I,g)}return new re(v,I)}n.A=function(I){return be(this,I).h},n.and=function(I){for(var m=Math.max(this.g.length,I.g.length),_=[],E=0;E<m;E++)_[E]=this.i(E)&I.i(E);return new a(_,this.h&I.h)},n.or=function(I){for(var m=Math.max(this.g.length,I.g.length),_=[],E=0;E<m;E++)_[E]=this.i(E)|I.i(E);return new a(_,this.h|I.h)},n.xor=function(I){for(var m=Math.max(this.g.length,I.g.length),_=[],E=0;E<m;E++)_[E]=this.i(E)^I.i(E);return new a(_,this.h^I.h)};function Ne(I){for(var m=I.g.length+1,_=[],E=0;E<m;E++)_[E]=I.i(E)<<1|I.i(E-1)>>>31;return new a(_,I.h)}function we(I,m){var _=m>>5;m%=32;for(var E=I.g.length-_,v=[],w=0;w<E;w++)v[w]=0<m?I.i(w+_)>>>m|I.i(w+_+1)<<32-m:I.i(w+_);return new a(v,I.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,uu=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=p,Qn=a}).apply(typeof Vc<"u"?Vc:typeof self<"u"?self:typeof window<"u"?window:{});var ni=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var hu,Zr,du,ui,Po,fu,pu,mu;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(i,c,h){return i==Array.prototype||i==Object.prototype||(i[c]=h.value),i};function t(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof ni=="object"&&ni];for(var c=0;c<i.length;++c){var h=i[c];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var r=t(this);function s(i,c){if(c)e:{var h=r;i=i.split(".");for(var f=0;f<i.length-1;f++){var T=i[f];if(!(T in h))break e;h=h[T]}i=i[i.length-1],f=h[i],c=c(f),c!=f&&c!=null&&e(h,i,{configurable:!0,writable:!0,value:c})}}function o(i,c){i instanceof String&&(i+="");var h=0,f=!1,T={next:function(){if(!f&&h<i.length){var A=h++;return{value:c(A,i[A]),done:!1}}return f=!0,{done:!0,value:void 0}}};return T[Symbol.iterator]=function(){return T},T}s("Array.prototype.values",function(i){return i||function(){return o(this,function(c,h){return h})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},l=this||self;function u(i){var c=typeof i;return c=c!="object"?c:i?Array.isArray(i)?"array":c:"null",c=="array"||c=="object"&&typeof i.length=="number"}function d(i){var c=typeof i;return c=="object"&&i!=null||c=="function"}function p(i,c,h){return i.call.apply(i.bind,arguments)}function y(i,c,h){if(!i)throw Error();if(2<arguments.length){var f=Array.prototype.slice.call(arguments,2);return function(){var T=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(T,f),i.apply(c,T)}}return function(){return i.apply(c,arguments)}}function b(i,c,h){return b=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?p:y,b.apply(null,arguments)}function S(i,c){var h=Array.prototype.slice.call(arguments,1);return function(){var f=h.slice();return f.push.apply(f,arguments),i.apply(this,f)}}function x(i,c){function h(){}h.prototype=c.prototype,i.aa=c.prototype,i.prototype=new h,i.prototype.constructor=i,i.Qb=function(f,T,A){for(var D=Array(arguments.length-2),ve=2;ve<arguments.length;ve++)D[ve-2]=arguments[ve];return c.prototype[T].apply(f,D)}}function U(i){const c=i.length;if(0<c){const h=Array(c);for(let f=0;f<c;f++)h[f]=i[f];return h}return[]}function L(i,c){for(let h=1;h<arguments.length;h++){const f=arguments[h];if(u(f)){const T=i.length||0,A=f.length||0;i.length=T+A;for(let D=0;D<A;D++)i[T+D]=f[D]}else i.push(f)}}class X{constructor(c,h){this.i=c,this.j=h,this.h=0,this.g=null}get(){let c;return 0<this.h?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function O(i){return/^[\s\xa0]*$/.test(i)}function re(){var i=l.navigator;return i&&(i=i.userAgent)?i:""}function be(i){return be[" "](i),i}be[" "]=function(){};var Ne=re().indexOf("Gecko")!=-1&&!(re().toLowerCase().indexOf("webkit")!=-1&&re().indexOf("Edge")==-1)&&!(re().indexOf("Trident")!=-1||re().indexOf("MSIE")!=-1)&&re().indexOf("Edge")==-1;function we(i,c,h){for(const f in i)c.call(h,i[f],f,i)}function I(i,c){for(const h in i)c.call(void 0,i[h],h,i)}function m(i){const c={};for(const h in i)c[h]=i[h];return c}const _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function E(i,c){let h,f;for(let T=1;T<arguments.length;T++){f=arguments[T];for(h in f)i[h]=f[h];for(let A=0;A<_.length;A++)h=_[A],Object.prototype.hasOwnProperty.call(f,h)&&(i[h]=f[h])}}function v(i){var c=1;i=i.split(":");const h=[];for(;0<c&&i.length;)h.push(i.shift()),c--;return i.length&&h.push(i.join(":")),h}function w(i){l.setTimeout(()=>{throw i},0)}function g(){var i=An;let c=null;return i.g&&(c=i.g,i.g=i.g.next,i.g||(i.h=null),c.next=null),c}class ue{constructor(){this.h=this.g=null}add(c,h){const f=nt.get();f.set(c,h),this.h?this.h.next=f:this.g=f,this.h=f}}var nt=new X(()=>new ot,i=>i.reset());class ot{constructor(){this.next=this.g=this.h=null}set(c,h){this.h=c,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let st,at=!1,An=new ue,nn=()=>{const i=l.Promise.resolve(void 0);st=()=>{i.then(Yi)}};var Yi=()=>{for(var i;i=g();){try{i.h.call(i.g)}catch(h){w(h)}var c=nt;c.j(i),100>c.h&&(c.h++,i.next=c.g,c.g=i)}at=!1};function Ae(){this.s=this.s,this.C=this.C}Ae.prototype.s=!1,Ae.prototype.ma=function(){this.s||(this.s=!0,this.N())},Ae.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Oe(i,c){this.type=i,this.g=this.target=c,this.defaultPrevented=!1}Oe.prototype.h=function(){this.defaultPrevented=!0};var Mr=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var i=!1,c=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const h=()=>{};l.addEventListener("test",h,c),l.removeEventListener("test",h,c)}catch{}return i}();function Sn(i,c){if(Oe.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i){var h=this.type=i.type,f=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;if(this.target=i.target||i.srcElement,this.g=c,c=i.relatedTarget){if(Ne){e:{try{be(c.nodeName);var T=!0;break e}catch{}T=!1}T||(c=null)}}else h=="mouseover"?c=i.fromElement:h=="mouseout"&&(c=i.toElement);this.relatedTarget=c,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=typeof i.pointerType=="string"?i.pointerType:Xi[i.pointerType]||"",this.state=i.state,this.i=i,i.defaultPrevented&&Sn.aa.h.call(this)}}x(Sn,Oe);var Xi={2:"touch",3:"pen",4:"mouse"};Sn.prototype.h=function(){Sn.aa.h.call(this);var i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var sr="closure_listenable_"+(1e6*Math.random()|0),Ur=0;function M(i,c,h,f,T){this.listener=i,this.proxy=null,this.src=c,this.type=h,this.capture=!!f,this.ha=T,this.key=++Ur,this.da=this.fa=!1}function K(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function N(i){this.src=i,this.g={},this.h=0}N.prototype.add=function(i,c,h,f,T){var A=i.toString();i=this.g[A],i||(i=this.g[A]=[],this.h++);var D=Z(i,c,f,T);return-1<D?(c=i[D],h||(c.fa=!1)):(c=new M(c,this.src,A,!!f,T),c.fa=h,i.push(c)),c};function Re(i,c){var h=c.type;if(h in i.g){var f=i.g[h],T=Array.prototype.indexOf.call(f,c,void 0),A;(A=0<=T)&&Array.prototype.splice.call(f,T,1),A&&(K(c),i.g[h].length==0&&(delete i.g[h],i.h--))}}function Z(i,c,h,f){for(var T=0;T<i.length;++T){var A=i[T];if(!A.da&&A.listener==c&&A.capture==!!h&&A.ha==f)return T}return-1}var je="closure_lm_"+(1e6*Math.random()|0),Ee={};function ct(i,c,h,f,T){if(Array.isArray(c)){for(var A=0;A<c.length;A++)ct(i,c[A],h,f,T);return null}return h=Rn(h),i&&i[sr]?i.K(c,h,d(f)?!!f.capture:!1,T):fe(i,c,h,!1,f,T)}function fe(i,c,h,f,T,A){if(!c)throw Error("Invalid event type");var D=d(T)?!!T.capture:!!T,ve=xe(i);if(ve||(i[je]=ve=new N(i)),h=ve.add(c,h,f,D,A),h.proxy)return h;if(f=he(),h.proxy=f,f.src=i,f.listener=h,i.addEventListener)Mr||(T=D),T===void 0&&(T=!1),i.addEventListener(c.toString(),f,T);else if(i.attachEvent)i.attachEvent(de(c.toString()),f);else if(i.addListener&&i.removeListener)i.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return h}function he(){function i(h){return c.call(i.src,i.listener,h)}const c=Me;return i}function se(i,c,h,f,T){if(Array.isArray(c))for(var A=0;A<c.length;A++)se(i,c[A],h,f,T);else f=d(f)?!!f.capture:!!f,h=Rn(h),i&&i[sr]?(i=i.i,c=String(c).toString(),c in i.g&&(A=i.g[c],h=Z(A,h,f,T),-1<h&&(K(A[h]),Array.prototype.splice.call(A,h,1),A.length==0&&(delete i.g[c],i.h--)))):i&&(i=xe(i))&&(c=i.g[c.toString()],i=-1,c&&(i=Z(c,h,f,T)),(h=-1<i?c[i]:null)&&J(h))}function J(i){if(typeof i!="number"&&i&&!i.da){var c=i.src;if(c&&c[sr])Re(c.i,i);else{var h=i.type,f=i.proxy;c.removeEventListener?c.removeEventListener(h,f,i.capture):c.detachEvent?c.detachEvent(de(h),f):c.addListener&&c.removeListener&&c.removeListener(f),(h=xe(c))?(Re(h,i),h.h==0&&(h.src=null,c[je]=null)):K(i)}}}function de(i){return i in Ee?Ee[i]:Ee[i]="on"+i}function Me(i,c){if(i.da)i=!0;else{c=new Sn(c,this);var h=i.listener,f=i.ha||i.src;i.fa&&J(i),i=h.call(f,c)}return i}function xe(i){return i=i[je],i instanceof N?i:null}var $e="__closure_events_fn_"+(1e9*Math.random()>>>0);function Rn(i){return typeof i=="function"?i:(i[$e]||(i[$e]=function(c){return i.handleEvent(c)}),i[$e])}function ge(){Ae.call(this),this.i=new N(this),this.M=this,this.F=null}x(ge,Ae),ge.prototype[sr]=!0,ge.prototype.removeEventListener=function(i,c,h,f){se(this,i,c,h,f)};function oe(i,c){var h,f=i.F;if(f)for(h=[];f;f=f.F)h.push(f);if(i=i.M,f=c.type||c,typeof c=="string")c=new Oe(c,i);else if(c instanceof Oe)c.target=c.target||i;else{var T=c;c=new Oe(f,i),E(c,T)}if(T=!0,h)for(var A=h.length-1;0<=A;A--){var D=c.g=h[A];T=Pe(D,f,!0,c)&&T}if(D=c.g=i,T=Pe(D,f,!0,c)&&T,T=Pe(D,f,!1,c)&&T,h)for(A=0;A<h.length;A++)D=c.g=h[A],T=Pe(D,f,!1,c)&&T}ge.prototype.N=function(){if(ge.aa.N.call(this),this.i){var i=this.i,c;for(c in i.g){for(var h=i.g[c],f=0;f<h.length;f++)K(h[f]);delete i.g[c],i.h--}}this.F=null},ge.prototype.K=function(i,c,h,f){return this.i.add(String(i),c,!1,h,f)},ge.prototype.L=function(i,c,h,f){return this.i.add(String(i),c,!0,h,f)};function Pe(i,c,h,f){if(c=i.i.g[String(c)],!c)return!0;c=c.concat();for(var T=!0,A=0;A<c.length;++A){var D=c[A];if(D&&!D.da&&D.capture==h){var ve=D.listener,He=D.ha||D.src;D.fa&&Re(i.i,D),T=ve.call(He,f)!==!1&&T}}return T&&!f.defaultPrevented}function Vt(i,c,h){if(typeof i=="function")h&&(i=b(i,h));else if(i&&typeof i.handleEvent=="function")i=b(i.handleEvent,i);else throw Error("Invalid listener argument");return 2147483647<Number(c)?-1:l.setTimeout(i,c||0)}function rn(i){i.g=Vt(()=>{i.g=null,i.i&&(i.i=!1,rn(i))},i.l);const c=i.h;i.h=null,i.m.apply(null,c)}class sn extends Ae{constructor(c,h){super(),this.m=c,this.l=h,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:rn(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function lt(i){Ae.call(this),this.h=i,this.g={}}x(lt,Ae);var Fr=[];function Ls(i){we(i.g,function(c,h){this.g.hasOwnProperty(h)&&J(c)},i),i.g={}}lt.prototype.N=function(){lt.aa.N.call(this),Ls(this)},lt.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Cn=l.JSON.stringify,xs=l.JSON.parse,Ds=class{stringify(i){return l.JSON.stringify(i,void 0)}parse(i){return l.JSON.parse(i,void 0)}};function kn(){}kn.prototype.h=null;function Vs(i){return i.h||(i.h=i.i())}function Ns(){}var Pn={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Ln(){Oe.call(this,"d")}x(Ln,Oe);function It(){Oe.call(this,"c")}x(It,Oe);var Nt={},Br=null;function Ot(){return Br=Br||new ge}Nt.La="serverreachability";function Os(i){Oe.call(this,Nt.La,i)}x(Os,Oe);function xn(i){const c=Ot();oe(c,new Os(c))}Nt.STAT_EVENT="statevent";function Ms(i,c){Oe.call(this,Nt.STAT_EVENT,i),this.stat=c}x(Ms,Oe);function ze(i){const c=Ot();oe(c,new Ms(c,i))}Nt.Ma="timingevent";function Us(i,c){Oe.call(this,Nt.Ma,i),this.size=c}x(Us,Oe);function Dn(i,c){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){i()},c)}function Vn(){this.g=!0}Vn.prototype.xa=function(){this.g=!1};function Zi(i,c,h,f,T,A){i.info(function(){if(i.g)if(A)for(var D="",ve=A.split("&"),He=0;He<ve.length;He++){var ce=ve[He].split("=");if(1<ce.length){var Je=ce[0];ce=ce[1];var Ye=Je.split("_");D=2<=Ye.length&&Ye[1]=="type"?D+(Je+"="+ce+"&"):D+(Je+"=redacted&")}}else D=null;else D=A;return"XMLHTTP REQ ("+f+") [attempt "+T+"]: "+c+`
`+h+`
`+D})}function ft(i,c,h,f,T,A,D){i.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+T+"]: "+c+`
`+h+`
`+A+" "+D})}function Ce(i,c,h,f){i.info(function(){return"XMLHTTP TEXT ("+c+"): "+Fs(i,h)+(f?" "+f:"")})}function Mt(i,c){i.info(function(){return"TIMEOUT: "+c})}Vn.prototype.info=function(){};function Fs(i,c){if(!i.g)return c;if(!c)return null;try{var h=JSON.parse(c);if(h){for(i=0;i<h.length;i++)if(Array.isArray(h[i])){var f=h[i];if(!(2>f.length)){var T=f[1];if(Array.isArray(T)&&!(1>T.length)){var A=T[0];if(A!="noop"&&A!="stop"&&A!="close")for(var D=1;D<T.length;D++)T[D]=""}}}}return Cn(h)}catch{return c}}var Ut={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Nn={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Tt;function bt(){}x(bt,kn),bt.prototype.g=function(){return new XMLHttpRequest},bt.prototype.i=function(){return{}},Tt=new bt;function pt(i,c,h,f){this.j=i,this.i=c,this.l=h,this.R=f||1,this.U=new lt(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new qr}function qr(){this.i=null,this.g="",this.h=!1}var jr={},On={};function $r(i,c,h){i.L=1,i.v=ur(gt(c)),i.m=h,i.P=!0,ir(i,null)}function ir(i,c){i.F=Date.now(),Un(i),i.A=gt(i.v);var h=i.A,f=i.R;Array.isArray(f)||(f=[String(f)]),pe(h.i,"t",f),i.C=0,h=i.j.J,i.h=new qr,i.g=Xa(i.j,h?c:null,!i.m),0<i.O&&(i.M=new sn(b(i.Y,i,i.g),i.O)),c=i.U,h=i.g,f=i.ca;var T="readystatechange";Array.isArray(T)||(T&&(Fr[0]=T.toString()),T=Fr);for(var A=0;A<T.length;A++){var D=ct(h,T[A],f||c.handleEvent,!1,c.h||c);if(!D)break;c.g[D.key]=D}c=i.H?m(i.H):{},i.m?(i.u||(i.u="POST"),c["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.A,i.u,i.m,c)):(i.u="GET",i.g.ea(i.A,i.u,null,c)),xn(),Zi(i.i,i.u,i.A,i.l,i.R,i.m)}pt.prototype.ca=function(i){i=i.target;const c=this.M;c&&zt(i)==3?c.j():this.Y(i)},pt.prototype.Y=function(i){try{if(i==this.g)e:{const Ye=zt(this.g);var c=this.g.Ba();const fr=this.g.Z();if(!(3>Ye)&&(Ye!=3||this.g&&(this.h.h||this.g.oa()||qa(this.g)))){this.J||Ye!=4||c==7||(c==8||0>=fr?xn(3):xn(2)),At(this);var h=this.g.Z();this.X=h;t:if(on(this)){var f=qa(this.g);i="";var T=f.length,A=zt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Ft(this),Fn(this);var D="";break t}this.h.i=new l.TextDecoder}for(c=0;c<T;c++)this.h.h=!0,i+=this.h.i.decode(f[c],{stream:!(A&&c==T-1)});f.length=0,this.h.g+=i,this.C=0,D=this.h.g}else D=this.g.oa();if(this.o=h==200,ft(this.i,this.u,this.A,this.l,this.R,Ye,h),this.o){if(this.T&&!this.K){t:{if(this.g){var ve,He=this.g;if((ve=He.g?He.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!O(ve)){var ce=ve;break t}}ce=null}if(h=ce)Ce(this.i,this.l,h,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Bn(this,h);else{this.o=!1,this.s=3,ze(12),Ft(this),Fn(this);break e}}if(this.P){h=!0;let _t;for(;!this.J&&this.C<D.length;)if(_t=Mn(this,D),_t==On){Ye==4&&(this.s=4,ze(14),h=!1),Ce(this.i,this.l,null,"[Incomplete Response]");break}else if(_t==jr){this.s=4,ze(15),Ce(this.i,this.l,D,"[Invalid Chunk]"),h=!1;break}else Ce(this.i,this.l,_t,null),Bn(this,_t);if(on(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Ye!=4||D.length!=0||this.h.h||(this.s=1,ze(16),h=!1),this.o=this.o&&h,!h)Ce(this.i,this.l,D,"[Invalid Chunked Response]"),Ft(this),Fn(this);else if(0<D.length&&!this.W){this.W=!0;var Je=this.j;Je.g==this&&Je.ba&&!Je.M&&(Je.j.info("Great, no buffering proxy detected. Bytes received: "+D.length),ao(Je),Je.M=!0,ze(11))}}else Ce(this.i,this.l,D,null),Bn(this,D);Ye==4&&Ft(this),this.o&&!this.J&&(Ye==4?Wa(this.j,this):(this.o=!1,Un(this)))}else Dh(this.g),h==400&&0<D.indexOf("Unknown SID")?(this.s=3,ze(12)):(this.s=0,ze(13)),Ft(this),Fn(this)}}}catch{}finally{}};function on(i){return i.g?i.u=="GET"&&i.L!=2&&i.j.Ca:!1}function Mn(i,c){var h=i.C,f=c.indexOf(`
`,h);return f==-1?On:(h=Number(c.substring(h,f)),isNaN(h)?jr:(f+=1,f+h>c.length?On:(c=c.slice(f,f+h),i.C=f+h,c)))}pt.prototype.cancel=function(){this.J=!0,Ft(this)};function Un(i){i.S=Date.now()+i.I,zr(i,i.I)}function zr(i,c){if(i.B!=null)throw Error("WatchDog timer not null");i.B=Dn(b(i.ba,i),c)}function At(i){i.B&&(l.clearTimeout(i.B),i.B=null)}pt.prototype.ba=function(){this.B=null;const i=Date.now();0<=i-this.S?(Mt(this.i,this.A),this.L!=2&&(xn(),ze(17)),Ft(this),this.s=2,Fn(this)):zr(this,this.S-i)};function Fn(i){i.j.G==0||i.J||Wa(i.j,i)}function Ft(i){At(i);var c=i.M;c&&typeof c.ma=="function"&&c.ma(),i.M=null,Ls(i.U),i.g&&(c=i.g,i.g=null,c.abort(),c.ma())}function Bn(i,c){try{var h=i.j;if(h.G!=0&&(h.g==i||ar(h.h,i))){if(!i.K&&ar(h.h,i)&&h.G==3){try{var f=h.Da.g.parse(c)}catch{f=null}if(Array.isArray(f)&&f.length==3){var T=f;if(T[0]==0){e:if(!h.u){if(h.g)if(h.g.F+3e3<i.F)Xs(h),Js(h);else break e;oo(h),ze(18)}}else h.za=T[1],0<h.za-h.T&&37500>T[2]&&h.F&&h.v==0&&!h.C&&(h.C=Dn(b(h.Za,h),6e3));if(1>=qs(h.h)&&h.ca){try{h.ca()}catch{}h.ca=void 0}}else zn(h,11)}else if((i.K||h.g==i)&&Xs(h),!O(c))for(T=h.Da.g.parse(c),c=0;c<T.length;c++){let ce=T[c];if(h.T=ce[0],ce=ce[1],h.G==2)if(ce[0]=="c"){h.K=ce[1],h.ia=ce[2];const Je=ce[3];Je!=null&&(h.la=Je,h.j.info("VER="+h.la));const Ye=ce[4];Ye!=null&&(h.Aa=Ye,h.j.info("SVER="+h.Aa));const fr=ce[5];fr!=null&&typeof fr=="number"&&0<fr&&(f=1.5*fr,h.L=f,h.j.info("backChannelRequestTimeoutMs_="+f)),f=h;const _t=i.g;if(_t){const ei=_t.g?_t.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ei){var A=f.h;A.g||ei.indexOf("spdy")==-1&&ei.indexOf("quic")==-1&&ei.indexOf("h2")==-1||(A.j=A.l,A.g=new Set,A.h&&(qn(A,A.h),A.h=null))}if(f.D){const co=_t.g?_t.g.getResponseHeader("X-HTTP-Session-Id"):null;co&&(f.ya=co,_e(f.I,f.D,co))}}h.G=3,h.l&&h.l.ua(),h.ba&&(h.R=Date.now()-i.F,h.j.info("Handshake RTT: "+h.R+"ms")),f=h;var D=i;if(f.qa=Ya(f,f.J?f.ia:null,f.W),D.K){js(f.h,D);var ve=D,He=f.L;He&&(ve.I=He),ve.B&&(At(ve),Un(ve)),f.g=D}else Ga(f);0<h.i.length&&Ys(h)}else ce[0]!="stop"&&ce[0]!="close"||zn(h,7);else h.G==3&&(ce[0]=="stop"||ce[0]=="close"?ce[0]=="stop"?zn(h,7):io(h):ce[0]!="noop"&&h.l&&h.l.ta(ce),h.v=0)}}xn(4)}catch{}}var or=class{constructor(i,c){this.g=i,this.map=c}};function Bs(i){this.l=i||10,l.PerformanceNavigationTiming?(i=l.performance.getEntriesByType("navigation"),i=0<i.length&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Hr(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function qs(i){return i.h?1:i.g?i.g.size:0}function ar(i,c){return i.h?i.h==c:i.g?i.g.has(c):!1}function qn(i,c){i.g?i.g.add(c):i.h=c}function js(i,c){i.h&&i.h==c?i.h=null:i.g&&i.g.has(c)&&i.g.delete(c)}Bs.prototype.cancel=function(){if(this.i=jn(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function jn(i){if(i.h!=null)return i.i.concat(i.h.D);if(i.g!=null&&i.g.size!==0){let c=i.i;for(const h of i.g.values())c=c.concat(h.D);return c}return U(i.i)}function eo(i){if(i.V&&typeof i.V=="function")return i.V();if(typeof Map<"u"&&i instanceof Map||typeof Set<"u"&&i instanceof Set)return Array.from(i.values());if(typeof i=="string")return i.split("");if(u(i)){for(var c=[],h=i.length,f=0;f<h;f++)c.push(i[f]);return c}c=[],h=0;for(f in i)c[h++]=i[f];return c}function to(i){if(i.na&&typeof i.na=="function")return i.na();if(!i.V||typeof i.V!="function"){if(typeof Map<"u"&&i instanceof Map)return Array.from(i.keys());if(!(typeof Set<"u"&&i instanceof Set)){if(u(i)||typeof i=="string"){var c=[];i=i.length;for(var h=0;h<i;h++)c.push(h);return c}c=[],h=0;for(const f in i)c[h++]=f;return c}}}function $s(i,c){if(i.forEach&&typeof i.forEach=="function")i.forEach(c,void 0);else if(u(i)||typeof i=="string")Array.prototype.forEach.call(i,c,void 0);else for(var h=to(i),f=eo(i),T=f.length,A=0;A<T;A++)c.call(void 0,f[A],h&&h[A],i)}var zs=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Hs(i,c){if(i){i=i.split("&");for(var h=0;h<i.length;h++){var f=i[h].indexOf("="),T=null;if(0<=f){var A=i[h].substring(0,f);T=i[h].substring(f+1)}else A=i[h];c(A,T?decodeURIComponent(T.replace(/\+/g," ")):"")}}}function Bt(i){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,i instanceof Bt){this.h=i.h,cr(this,i.j),this.o=i.o,this.g=i.g,lr(this,i.s),this.l=i.l;var c=i.i,h=new R;h.i=c.i,c.g&&(h.g=new Map(c.g),h.h=c.h),Gs(this,h),this.m=i.m}else i&&(c=String(i).match(zs))?(this.h=!1,cr(this,c[1]||"",!0),this.o=$n(c[2]||""),this.g=$n(c[3]||"",!0),lr(this,c[4]),this.l=$n(c[5]||"",!0),Gs(this,c[6]||"",!0),this.m=$n(c[7]||"")):(this.h=!1,this.i=new R(null,this.h))}Bt.prototype.toString=function(){var i=[],c=this.j;c&&i.push(an(c,Ws,!0),":");var h=this.g;return(h||c=="file")&&(i.push("//"),(c=this.o)&&i.push(an(c,Ws,!0),"@"),i.push(encodeURIComponent(String(h)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.s,h!=null&&i.push(":",String(h))),(h=this.l)&&(this.g&&h.charAt(0)!="/"&&i.push("/"),i.push(an(h,h.charAt(0)=="/"?no:Gr,!0))),(h=this.i.toString())&&i.push("?",h),(h=this.m)&&i.push("#",an(h,C)),i.join("")};function gt(i){return new Bt(i)}function cr(i,c,h){i.j=h?$n(c,!0):c,i.j&&(i.j=i.j.replace(/:$/,""))}function lr(i,c){if(c){if(c=Number(c),isNaN(c)||0>c)throw Error("Bad port number "+c);i.s=c}else i.s=null}function Gs(i,c,h){c instanceof R?(i.i=c,ee(i.i,i.h)):(h||(c=an(c,ro)),i.i=new R(c,i.h))}function _e(i,c,h){i.i.set(c,h)}function ur(i){return _e(i,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),i}function $n(i,c){return i?c?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function an(i,c,h){return typeof i=="string"?(i=encodeURI(i).replace(c,Ks),h&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function Ks(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var Ws=/[#\/\?@]/g,Gr=/[#\?:]/g,no=/[#\?]/g,ro=/[#\?@]/g,C=/#/g;function R(i,c){this.h=this.g=null,this.i=i||null,this.j=!!c}function B(i){i.g||(i.g=new Map,i.h=0,i.i&&Hs(i.i,function(c,h){i.add(decodeURIComponent(c.replace(/\+/g," ")),h)}))}n=R.prototype,n.add=function(i,c){B(this),this.i=null,i=q(this,i);var h=this.g.get(i);return h||this.g.set(i,h=[]),h.push(c),this.h+=1,this};function V(i,c){B(i),c=q(i,c),i.g.has(c)&&(i.i=null,i.h-=i.g.get(c).length,i.g.delete(c))}function z(i,c){return B(i),c=q(i,c),i.g.has(c)}n.forEach=function(i,c){B(this),this.g.forEach(function(h,f){h.forEach(function(T){i.call(c,T,f,this)},this)},this)},n.na=function(){B(this);const i=Array.from(this.g.values()),c=Array.from(this.g.keys()),h=[];for(let f=0;f<c.length;f++){const T=i[f];for(let A=0;A<T.length;A++)h.push(c[f])}return h},n.V=function(i){B(this);let c=[];if(typeof i=="string")z(this,i)&&(c=c.concat(this.g.get(q(this,i))));else{i=Array.from(this.g.values());for(let h=0;h<i.length;h++)c=c.concat(i[h])}return c},n.set=function(i,c){return B(this),this.i=null,i=q(this,i),z(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[c]),this.h+=1,this},n.get=function(i,c){return i?(i=this.V(i),0<i.length?String(i[0]):c):c};function pe(i,c,h){V(i,c),0<h.length&&(i.i=null,i.g.set(q(i,c),U(h)),i.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],c=Array.from(this.g.keys());for(var h=0;h<c.length;h++){var f=c[h];const A=encodeURIComponent(String(f)),D=this.V(f);for(f=0;f<D.length;f++){var T=A;D[f]!==""&&(T+="="+encodeURIComponent(String(D[f]))),i.push(T)}}return this.i=i.join("&")};function q(i,c){return c=String(c),i.j&&(c=c.toLowerCase()),c}function ee(i,c){c&&!i.j&&(B(i),i.i=null,i.g.forEach(function(h,f){var T=f.toLowerCase();f!=T&&(V(this,f),pe(this,T,h))},i)),i.j=c}function Ie(i,c){const h=new Vn;if(l.Image){const f=new Image;f.onload=S(Y,h,"TestLoadImage: loaded",!0,c,f),f.onerror=S(Y,h,"TestLoadImage: error",!1,c,f),f.onabort=S(Y,h,"TestLoadImage: abort",!1,c,f),f.ontimeout=S(Y,h,"TestLoadImage: timeout",!1,c,f),l.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=i}else c(!1)}function ae(i,c){const h=new Vn,f=new AbortController,T=setTimeout(()=>{f.abort(),Y(h,"TestPingServer: timeout",!1,c)},1e4);fetch(i,{signal:f.signal}).then(A=>{clearTimeout(T),A.ok?Y(h,"TestPingServer: ok",!0,c):Y(h,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(T),Y(h,"TestPingServer: error",!1,c)})}function Y(i,c,h,f,T){try{T&&(T.onload=null,T.onerror=null,T.onabort=null,T.ontimeout=null),f(h)}catch{}}function ut(){this.g=new Ds}function Ue(i,c,h){const f=h||"";try{$s(i,function(T,A){let D=T;d(T)&&(D=Cn(T)),c.push(f+A+"="+encodeURIComponent(D))})}catch(T){throw c.push(f+"type="+encodeURIComponent("_badmap")),T}}function qt(i){this.l=i.Ub||null,this.j=i.eb||!1}x(qt,kn),qt.prototype.g=function(){return new jt(this.l,this.j)},qt.prototype.i=function(i){return function(){return i}}({});function jt(i,c){ge.call(this),this.D=i,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}x(jt,ge),n=jt.prototype,n.open=function(i,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=i,this.A=c,this.readyState=1,Rt(this)},n.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const c={headers:this.u,method:this.B,credentials:this.m,cache:void 0};i&&(c.body=i),(this.D||l).fetch(new Request(this.A,c)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,St(this)),this.readyState=0},n.Sa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,Rt(this)),this.g&&(this.readyState=3,Rt(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;cn(this)}else i.text().then(this.Ra.bind(this),this.ga.bind(this))};function cn(i){i.j.read().then(i.Pa.bind(i)).catch(i.ga.bind(i))}n.Pa=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var c=i.value?i.value:new Uint8Array(0);(c=this.v.decode(c,{stream:!i.done}))&&(this.response=this.responseText+=c)}i.done?St(this):Rt(this),this.readyState==3&&cn(this)}},n.Ra=function(i){this.g&&(this.response=this.responseText=i,St(this))},n.Qa=function(i){this.g&&(this.response=i,St(this))},n.ga=function(){this.g&&St(this)};function St(i){i.readyState=4,i.l=null,i.j=null,i.v=null,Rt(i)}n.setRequestHeader=function(i,c){this.u.append(i,c)},n.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],c=this.h.entries();for(var h=c.next();!h.done;)h=h.value,i.push(h[0]+": "+h[1]),h=c.next();return i.join(`\r
`)};function Rt(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(jt.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function hr(i){let c="";return we(i,function(h,f){c+=f,c+=":",c+=h,c+=`\r
`}),c}function $t(i,c,h){e:{for(f in h){var f=!1;break e}f=!0}f||(h=hr(h),typeof i=="string"?h!=null&&encodeURIComponent(String(h)):_e(i,c,h))}function ye(i){ge.call(this),this.headers=new Map,this.o=i||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}x(ye,ge);var so=/^https?$/i,xh=["POST","PUT"];n=ye.prototype,n.Ha=function(i){this.J=i},n.ea=function(i,c,h,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);c=c?c.toUpperCase():"GET",this.D=i,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Tt.g(),this.v=this.o?Vs(this.o):Vs(Tt),this.g.onreadystatechange=b(this.Ea,this);try{this.B=!0,this.g.open(c,String(i),!0),this.B=!1}catch(A){Ma(this,A);return}if(i=h||"",h=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var T in f)h.set(T,f[T]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const A of f.keys())h.set(A,f.get(A));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(h.keys()).find(A=>A.toLowerCase()=="content-type"),T=l.FormData&&i instanceof l.FormData,!(0<=Array.prototype.indexOf.call(xh,c,void 0))||f||T||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[A,D]of h)this.g.setRequestHeader(A,D);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Ba(this),this.u=!0,this.g.send(i),this.u=!1}catch(A){Ma(this,A)}};function Ma(i,c){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=c,i.m=5,Ua(i),Qs(i)}function Ua(i){i.A||(i.A=!0,oe(i,"complete"),oe(i,"error"))}n.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=i||7,oe(this,"complete"),oe(this,"abort"),Qs(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Qs(this,!0)),ye.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Fa(this):this.bb())},n.bb=function(){Fa(this)};function Fa(i){if(i.h&&typeof a<"u"&&(!i.v[1]||zt(i)!=4||i.Z()!=2)){if(i.u&&zt(i)==4)Vt(i.Ea,0,i);else if(oe(i,"readystatechange"),zt(i)==4){i.h=!1;try{const D=i.Z();e:switch(D){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break e;default:c=!1}var h;if(!(h=c)){var f;if(f=D===0){var T=String(i.D).match(zs)[1]||null;!T&&l.self&&l.self.location&&(T=l.self.location.protocol.slice(0,-1)),f=!so.test(T?T.toLowerCase():"")}h=f}if(h)oe(i,"complete"),oe(i,"success");else{i.m=6;try{var A=2<zt(i)?i.g.statusText:""}catch{A=""}i.l=A+" ["+i.Z()+"]",Ua(i)}}finally{Qs(i)}}}}function Qs(i,c){if(i.g){Ba(i);const h=i.g,f=i.v[0]?()=>{}:null;i.g=null,i.v=null,c||oe(i,"ready");try{h.onreadystatechange=f}catch{}}}function Ba(i){i.I&&(l.clearTimeout(i.I),i.I=null)}n.isActive=function(){return!!this.g};function zt(i){return i.g?i.g.readyState:0}n.Z=function(){try{return 2<zt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(i){if(this.g){var c=this.g.responseText;return i&&c.indexOf(i)==0&&(c=c.substring(i.length)),xs(c)}};function qa(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.H){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function Dh(i){const c={};i=(i.g&&2<=zt(i)&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<i.length;f++){if(O(i[f]))continue;var h=v(i[f]);const T=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const A=c[T]||[];c[T]=A,A.push(h)}I(c,function(f){return f.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Kr(i,c,h){return h&&h.internalChannelParams&&h.internalChannelParams[i]||c}function ja(i){this.Aa=0,this.i=[],this.j=new Vn,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Kr("failFast",!1,i),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Kr("baseRetryDelayMs",5e3,i),this.cb=Kr("retryDelaySeedMs",1e4,i),this.Wa=Kr("forwardChannelMaxRetries",2,i),this.wa=Kr("forwardChannelRequestTimeoutMs",2e4,i),this.pa=i&&i.xmlHttpFactory||void 0,this.Xa=i&&i.Tb||void 0,this.Ca=i&&i.useFetchStreams||!1,this.L=void 0,this.J=i&&i.supportsCrossDomainXhr||!1,this.K="",this.h=new Bs(i&&i.concurrentRequestLimit),this.Da=new ut,this.P=i&&i.fastHandshake||!1,this.O=i&&i.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=i&&i.Rb||!1,i&&i.xa&&this.j.xa(),i&&i.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&i&&i.detectBufferingProxy||!1,this.ja=void 0,i&&i.longPollingTimeout&&0<i.longPollingTimeout&&(this.ja=i.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=ja.prototype,n.la=8,n.G=1,n.connect=function(i,c,h,f){ze(0),this.W=i,this.H=c||{},h&&f!==void 0&&(this.H.OSID=h,this.H.OAID=f),this.F=this.X,this.I=Ya(this,null,this.W),Ys(this)};function io(i){if($a(i),i.G==3){var c=i.U++,h=gt(i.I);if(_e(h,"SID",i.K),_e(h,"RID",c),_e(h,"TYPE","terminate"),Wr(i,h),c=new pt(i,i.j,c),c.L=2,c.v=ur(gt(h)),h=!1,l.navigator&&l.navigator.sendBeacon)try{h=l.navigator.sendBeacon(c.v.toString(),"")}catch{}!h&&l.Image&&(new Image().src=c.v,h=!0),h||(c.g=Xa(c.j,null),c.g.ea(c.v)),c.F=Date.now(),Un(c)}Ja(i)}function Js(i){i.g&&(ao(i),i.g.cancel(),i.g=null)}function $a(i){Js(i),i.u&&(l.clearTimeout(i.u),i.u=null),Xs(i),i.h.cancel(),i.s&&(typeof i.s=="number"&&l.clearTimeout(i.s),i.s=null)}function Ys(i){if(!Hr(i.h)&&!i.s){i.s=!0;var c=i.Ga;st||nn(),at||(st(),at=!0),An.add(c,i),i.B=0}}function Vh(i,c){return qs(i.h)>=i.h.j-(i.s?1:0)?!1:i.s?(i.i=c.D.concat(i.i),!0):i.G==1||i.G==2||i.B>=(i.Va?0:i.Wa)?!1:(i.s=Dn(b(i.Ga,i,c),Qa(i,i.B)),i.B++,!0)}n.Ga=function(i){if(this.s)if(this.s=null,this.G==1){if(!i){this.U=Math.floor(1e5*Math.random()),i=this.U++;const T=new pt(this,this.j,i);let A=this.o;if(this.S&&(A?(A=m(A),E(A,this.S)):A=this.S),this.m!==null||this.O||(T.H=A,A=null),this.P)e:{for(var c=0,h=0;h<this.i.length;h++){t:{var f=this.i[h];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break t}f=void 0}if(f===void 0)break;if(c+=f,4096<c){c=h;break e}if(c===4096||h===this.i.length-1){c=h+1;break e}}c=1e3}else c=1e3;c=Ha(this,T,c),h=gt(this.I),_e(h,"RID",i),_e(h,"CVER",22),this.D&&_e(h,"X-HTTP-Session-Id",this.D),Wr(this,h),A&&(this.O?c="headers="+encodeURIComponent(String(hr(A)))+"&"+c:this.m&&$t(h,this.m,A)),qn(this.h,T),this.Ua&&_e(h,"TYPE","init"),this.P?(_e(h,"$req",c),_e(h,"SID","null"),T.T=!0,$r(T,h,null)):$r(T,h,c),this.G=2}}else this.G==3&&(i?za(this,i):this.i.length==0||Hr(this.h)||za(this))};function za(i,c){var h;c?h=c.l:h=i.U++;const f=gt(i.I);_e(f,"SID",i.K),_e(f,"RID",h),_e(f,"AID",i.T),Wr(i,f),i.m&&i.o&&$t(f,i.m,i.o),h=new pt(i,i.j,h,i.B+1),i.m===null&&(h.H=i.o),c&&(i.i=c.D.concat(i.i)),c=Ha(i,h,1e3),h.I=Math.round(.5*i.wa)+Math.round(.5*i.wa*Math.random()),qn(i.h,h),$r(h,f,c)}function Wr(i,c){i.H&&we(i.H,function(h,f){_e(c,f,h)}),i.l&&$s({},function(h,f){_e(c,f,h)})}function Ha(i,c,h){h=Math.min(i.i.length,h);var f=i.l?b(i.l.Na,i.l,i):null;e:{var T=i.i;let A=-1;for(;;){const D=["count="+h];A==-1?0<h?(A=T[0].g,D.push("ofs="+A)):A=0:D.push("ofs="+A);let ve=!0;for(let He=0;He<h;He++){let ce=T[He].g;const Je=T[He].map;if(ce-=A,0>ce)A=Math.max(0,T[He].g-100),ve=!1;else try{Ue(Je,D,"req"+ce+"_")}catch{f&&f(Je)}}if(ve){f=D.join("&");break e}}}return i=i.i.splice(0,h),c.D=i,f}function Ga(i){if(!i.g&&!i.u){i.Y=1;var c=i.Fa;st||nn(),at||(st(),at=!0),An.add(c,i),i.v=0}}function oo(i){return i.g||i.u||3<=i.v?!1:(i.Y++,i.u=Dn(b(i.Fa,i),Qa(i,i.v)),i.v++,!0)}n.Fa=function(){if(this.u=null,Ka(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var i=2*this.R;this.j.info("BP detection timer enabled: "+i),this.A=Dn(b(this.ab,this),i)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,ze(10),Js(this),Ka(this))};function ao(i){i.A!=null&&(l.clearTimeout(i.A),i.A=null)}function Ka(i){i.g=new pt(i,i.j,"rpc",i.Y),i.m===null&&(i.g.H=i.o),i.g.O=0;var c=gt(i.qa);_e(c,"RID","rpc"),_e(c,"SID",i.K),_e(c,"AID",i.T),_e(c,"CI",i.F?"0":"1"),!i.F&&i.ja&&_e(c,"TO",i.ja),_e(c,"TYPE","xmlhttp"),Wr(i,c),i.m&&i.o&&$t(c,i.m,i.o),i.L&&(i.g.I=i.L);var h=i.g;i=i.ia,h.L=1,h.v=ur(gt(c)),h.m=null,h.P=!0,ir(h,i)}n.Za=function(){this.C!=null&&(this.C=null,Js(this),oo(this),ze(19))};function Xs(i){i.C!=null&&(l.clearTimeout(i.C),i.C=null)}function Wa(i,c){var h=null;if(i.g==c){Xs(i),ao(i),i.g=null;var f=2}else if(ar(i.h,c))h=c.D,js(i.h,c),f=1;else return;if(i.G!=0){if(c.o)if(f==1){h=c.m?c.m.length:0,c=Date.now()-c.F;var T=i.B;f=Ot(),oe(f,new Us(f,h)),Ys(i)}else Ga(i);else if(T=c.s,T==3||T==0&&0<c.X||!(f==1&&Vh(i,c)||f==2&&oo(i)))switch(h&&0<h.length&&(c=i.h,c.i=c.i.concat(h)),T){case 1:zn(i,5);break;case 4:zn(i,10);break;case 3:zn(i,6);break;default:zn(i,2)}}}function Qa(i,c){let h=i.Ta+Math.floor(Math.random()*i.cb);return i.isActive()||(h*=2),h*c}function zn(i,c){if(i.j.info("Error code "+c),c==2){var h=b(i.fb,i),f=i.Xa;const T=!f;f=new Bt(f||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||cr(f,"https"),ur(f),T?Ie(f.toString(),h):ae(f.toString(),h)}else ze(2);i.G=0,i.l&&i.l.sa(c),Ja(i),$a(i)}n.fb=function(i){i?(this.j.info("Successfully pinged google.com"),ze(2)):(this.j.info("Failed to ping google.com"),ze(1))};function Ja(i){if(i.G=0,i.ka=[],i.l){const c=jn(i.h);(c.length!=0||i.i.length!=0)&&(L(i.ka,c),L(i.ka,i.i),i.h.i.length=0,U(i.i),i.i.length=0),i.l.ra()}}function Ya(i,c,h){var f=h instanceof Bt?gt(h):new Bt(h);if(f.g!="")c&&(f.g=c+"."+f.g),lr(f,f.s);else{var T=l.location;f=T.protocol,c=c?c+"."+T.hostname:T.hostname,T=+T.port;var A=new Bt(null);f&&cr(A,f),c&&(A.g=c),T&&lr(A,T),h&&(A.l=h),f=A}return h=i.D,c=i.ya,h&&c&&_e(f,h,c),_e(f,"VER",i.la),Wr(i,f),f}function Xa(i,c,h){if(c&&!i.J)throw Error("Can't create secondary domain capable XhrIo object.");return c=i.Ca&&!i.pa?new ye(new qt({eb:h})):new ye(i.pa),c.Ha(i.J),c}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Za(){}n=Za.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Zs(){}Zs.prototype.g=function(i,c){return new ht(i,c)};function ht(i,c){ge.call(this),this.g=new ja(c),this.l=i,this.h=c&&c.messageUrlParams||null,i=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(i?i["X-WebChannel-Content-Type"]=c.messageContentType:i={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.va&&(i?i["X-WebChannel-Client-Profile"]=c.va:i={"X-WebChannel-Client-Profile":c.va}),this.g.S=i,(i=c&&c.Sb)&&!O(i)&&(this.g.m=i),this.v=c&&c.supportsCrossDomainXhr||!1,this.u=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!O(c)&&(this.g.D=c,i=this.h,i!==null&&c in i&&(i=this.h,c in i&&delete i[c])),this.j=new dr(this)}x(ht,ge),ht.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},ht.prototype.close=function(){io(this.g)},ht.prototype.o=function(i){var c=this.g;if(typeof i=="string"){var h={};h.__data__=i,i=h}else this.u&&(h={},h.__data__=Cn(i),i=h);c.i.push(new or(c.Ya++,i)),c.G==3&&Ys(c)},ht.prototype.N=function(){this.g.l=null,delete this.j,io(this.g),delete this.g,ht.aa.N.call(this)};function ec(i){Ln.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var c=i.__sm__;if(c){e:{for(const h in c){i=h;break e}i=void 0}(this.i=i)&&(i=this.i,c=c!==null&&i in c?c[i]:void 0),this.data=c}else this.data=i}x(ec,Ln);function tc(){It.call(this),this.status=1}x(tc,It);function dr(i){this.g=i}x(dr,Za),dr.prototype.ua=function(){oe(this.g,"a")},dr.prototype.ta=function(i){oe(this.g,new ec(i))},dr.prototype.sa=function(i){oe(this.g,new tc)},dr.prototype.ra=function(){oe(this.g,"b")},Zs.prototype.createWebChannel=Zs.prototype.g,ht.prototype.send=ht.prototype.o,ht.prototype.open=ht.prototype.m,ht.prototype.close=ht.prototype.close,mu=function(){return new Zs},pu=function(){return Ot()},fu=Nt,Po={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Ut.NO_ERROR=0,Ut.TIMEOUT=8,Ut.HTTP_ERROR=6,ui=Ut,Nn.COMPLETE="complete",du=Nn,Ns.EventType=Pn,Pn.OPEN="a",Pn.CLOSE="b",Pn.ERROR="c",Pn.MESSAGE="d",ge.prototype.listen=ge.prototype.K,Zr=Ns,ye.prototype.listenOnce=ye.prototype.L,ye.prototype.getLastError=ye.prototype.Ka,ye.prototype.getLastErrorCode=ye.prototype.Ba,ye.prototype.getStatus=ye.prototype.Z,ye.prototype.getResponseJson=ye.prototype.Oa,ye.prototype.getResponseText=ye.prototype.oa,ye.prototype.send=ye.prototype.ea,ye.prototype.setWithCredentials=ye.prototype.Ha,hu=ye}).apply(typeof ni<"u"?ni:typeof self<"u"?self:typeof window<"u"?window:{});const Nc="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ze{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Ze.UNAUTHENTICATED=new Ze(null),Ze.GOOGLE_CREDENTIALS=new Ze("google-credentials-uid"),Ze.FIRST_PARTY=new Ze("first-party-uid"),Ze.MOCK_USER=new Ze("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Vr="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vn=new Go("@firebase/firestore");function Qr(){return vn.logLevel}function Fm(n){vn.setLogLevel(n)}function F(n,...e){if(vn.logLevel<=ne.DEBUG){const t=e.map(ia);vn.debug(`Firestore (${Vr}): ${n}`,...t)}}function Xt(n,...e){if(vn.logLevel<=ne.ERROR){const t=e.map(ia);vn.error(`Firestore (${Vr}): ${n}`,...t)}}function br(n,...e){if(vn.logLevel<=ne.WARN){const t=e.map(ia);vn.warn(`Firestore (${Vr}): ${n}`,...t)}}function ia(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function G(n="Unexpected state"){const e=`FIRESTORE (${Vr}) INTERNAL ASSERTION FAILED: `+n;throw Xt(e),new Error(e)}function me(n,e){n||G()}function Q(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class j extends en{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _n{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gu{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Bm{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Ze.UNAUTHENTICATED))}shutdown(){}}class qm{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class jm{constructor(e){this.t=e,this.currentUser=Ze.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){me(this.o===void 0);let r=this.i;const s=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let o=new _n;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new _n,e.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const u=o;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},l=u=>{F("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):(F("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new _n)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(F("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(me(typeof r.accessToken=="string"),new gu(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return me(e===null||typeof e=="string"),new Ze(e)}}class $m{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=Ze.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class zm{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new $m(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(Ze.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Hm{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Gm{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){me(this.o===void 0);const r=o=>{o.error!=null&&F("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.R;return this.R=o.token,F("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(o.token):Promise.resolve()};this.o=o=>{e.enqueueRetryable(()=>r(o))};const s=o=>{F("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(o=>s(o)),setTimeout(()=>{if(!this.appCheck){const o=this.A.getImmediate({optional:!0});o?s(o):F("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(me(typeof t.token=="string"),this.R=t.token,new Hm(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Km(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _u{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const s=Km(40);for(let o=0;o<s.length;++o)r.length<20&&s[o]<t&&(r+=e.charAt(s[o]%e.length))}return r}}function le(n,e){return n<e?-1:n>e?1:0}function Ar(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new j(k.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new j(k.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new j(k.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new j(k.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return Be.fromMillis(Date.now())}static fromDate(e){return Be.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new Be(t,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?le(this.nanoseconds,e.nanoseconds):le(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W{constructor(e){this.timestamp=e}static fromTimestamp(e){return new W(e)}static min(){return new W(new Be(0,0))}static max(){return new W(new Be(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hs{constructor(e,t,r){t===void 0?t=0:t>e.length&&G(),r===void 0?r=e.length-t:r>e.length-t&&G(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return hs.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof hs?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const o=e.get(s),a=t.get(s);if(o<a)return-1;if(o>a)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class Se extends hs{construct(e,t,r){return new Se(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new j(k.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new Se(t)}static emptyPath(){return new Se([])}}const Wm=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ke extends hs{construct(e,t,r){return new Ke(e,t,r)}static isValidIdentifier(e){return Wm.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ke.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new Ke(["__name__"])}static fromServerFormat(e){const t=[];let r="",s=0;const o=()=>{if(r.length===0)throw new j(k.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const l=e[s];if(l==="\\"){if(s+1===e.length)throw new j(k.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new j(k.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else l==="`"?(a=!a,s++):l!=="."||a?(r+=l,s++):(o(),s++)}if(o(),a)throw new j(k.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ke(t)}static emptyPath(){return new Ke([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ${constructor(e){this.path=e}static fromPath(e){return new $(Se.fromString(e))}static fromName(e){return new $(Se.fromString(e).popFirst(5))}static empty(){return new $(Se.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Se.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Se.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new $(new Se(e.slice()))}}function Qm(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=W.fromTimestamp(r===1e9?new Be(t+1,0):new Be(t,r));return new wn(s,$.empty(),e)}function Jm(n){return new wn(n.readTime,n.key,-1)}class wn{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new wn(W.min(),$.empty(),-1)}static max(){return new wn(W.max(),$.empty(),-1)}}function Ym(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=$.comparator(n.documentKey,e.documentKey),t!==0?t:le(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xm="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Zm{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ts(n){if(n.code!==k.FAILED_PRECONDITION||n.message!==Xm)throw n;F("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&G(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new P((r,s)=>{this.nextCallback=o=>{this.wrapSuccess(e,o).next(r,s)},this.catchCallback=o=>{this.wrapFailure(t,o).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof P?t:P.resolve(t)}catch(t){return P.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):P.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):P.reject(t)}static resolve(e){return new P((t,r)=>{t(e)})}static reject(e){return new P((t,r)=>{r(e)})}static waitFor(e){return new P((t,r)=>{let s=0,o=0,a=!1;e.forEach(l=>{++s,l.next(()=>{++o,a&&o===s&&t()},u=>r(u))}),a=!0,o===s&&t()})}static or(e){let t=P.resolve(!1);for(const r of e)t=t.next(s=>s?P.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,o)=>{r.push(t.call(this,s,o))}),this.waitFor(r)}static mapArray(e,t){return new P((r,s)=>{const o=e.length,a=new Array(o);let l=0;for(let u=0;u<o;u++){const d=u;t(e[d]).next(p=>{a[d]=p,++l,l===o&&r(a)},p=>s(p))}})}static doWhile(e,t){return new P((r,s)=>{const o=()=>{e()===!0?t().next(()=>{o()},s):r()};o()})}}function eg(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function bs(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oa{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ie(r),this.se=r=>t.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}oa.oe=-1;function Ni(n){return n==null}function Ii(n){return n===0&&1/n==-1/0}function tg(n){return typeof n=="number"&&Number.isInteger(n)&&!Ii(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oc(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function nr(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function yu(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke{constructor(e,t){this.comparator=e,this.root=t||Ge.EMPTY}insert(e,t){return new ke(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Ge.BLACK,null,null))}remove(e){return new ke(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ge.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new ri(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new ri(this.root,e,this.comparator,!1)}getReverseIterator(){return new ri(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new ri(this.root,e,this.comparator,!0)}}class ri{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let o=1;for(;!e.isEmpty();)if(o=t?r(e.key,t):1,t&&s&&(o*=-1),o<0)e=this.isReverse?e.left:e.right;else{if(o===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ge{constructor(e,t,r,s,o){this.key=e,this.value=t,this.color=r??Ge.RED,this.left=s??Ge.EMPTY,this.right=o??Ge.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,o){return new Ge(e??this.key,t??this.value,r??this.color,s??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const o=r(e,s.key);return s=o<0?s.copy(null,null,null,s.left.insert(e,t,r),null):o===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Ge.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return Ge.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ge.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ge.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw G();const e=this.left.check();if(e!==this.right.check())throw G();return e+(this.isRed()?0:1)}}Ge.EMPTY=null,Ge.RED=!0,Ge.BLACK=!1;Ge.EMPTY=new class{constructor(){this.size=0}get key(){throw G()}get value(){throw G()}get color(){throw G()}get left(){throw G()}get right(){throw G()}copy(e,t,r,s,o){return this}insert(e,t,r){return new Ge(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class We{constructor(e){this.comparator=e,this.data=new ke(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Mc(this.data.getIterator())}getIteratorFrom(e){return new Mc(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof We)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,o=r.getNext().key;if(this.comparator(s,o)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new We(this.comparator);return t.data=e,t}}class Mc{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dt{constructor(e){this.fields=e,e.sort(Ke.comparator)}static empty(){return new dt([])}unionWith(e){let t=new We(Ke.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new dt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Ar(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vu extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qe{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new vu("Invalid base64 string: "+o):o}}(e);return new Qe(t)}static fromUint8Array(e){const t=function(s){let o="";for(let a=0;a<s.length;++a)o+=String.fromCharCode(s[a]);return o}(e);return new Qe(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return le(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Qe.EMPTY_BYTE_STRING=new Qe("");const ng=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function En(n){if(me(!!n),typeof n=="string"){let e=0;const t=ng.exec(n);if(me(!!t),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Le(n.seconds),nanos:Le(n.nanos)}}function Le(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Zn(n){return typeof n=="string"?Qe.fromBase64String(n):Qe.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aa(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function ca(n){const e=n.mapValue.fields.__previous_value__;return aa(e)?ca(e):e}function ds(n){const e=En(n.mapValue.fields.__local_write_time__.timestampValue);return new Be(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rg{constructor(e,t,r,s,o,a,l,u,d){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=o,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=d}}class fs{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new fs("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof fs&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const si={mapValue:{}};function er(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?aa(n)?4:ig(n)?9007199254740991:sg(n)?10:11:G()}function Lt(n,e){if(n===e)return!0;const t=er(n);if(t!==er(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return ds(n).isEqual(ds(e));case 3:return function(s,o){if(typeof s.timestampValue=="string"&&typeof o.timestampValue=="string"&&s.timestampValue.length===o.timestampValue.length)return s.timestampValue===o.timestampValue;const a=En(s.timestampValue),l=En(o.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,o){return Zn(s.bytesValue).isEqual(Zn(o.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,o){return Le(s.geoPointValue.latitude)===Le(o.geoPointValue.latitude)&&Le(s.geoPointValue.longitude)===Le(o.geoPointValue.longitude)}(n,e);case 2:return function(s,o){if("integerValue"in s&&"integerValue"in o)return Le(s.integerValue)===Le(o.integerValue);if("doubleValue"in s&&"doubleValue"in o){const a=Le(s.doubleValue),l=Le(o.doubleValue);return a===l?Ii(a)===Ii(l):isNaN(a)&&isNaN(l)}return!1}(n,e);case 9:return Ar(n.arrayValue.values||[],e.arrayValue.values||[],Lt);case 10:case 11:return function(s,o){const a=s.mapValue.fields||{},l=o.mapValue.fields||{};if(Oc(a)!==Oc(l))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(l[u]===void 0||!Lt(a[u],l[u])))return!1;return!0}(n,e);default:return G()}}function ps(n,e){return(n.values||[]).find(t=>Lt(t,e))!==void 0}function Sr(n,e){if(n===e)return 0;const t=er(n),r=er(e);if(t!==r)return le(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return le(n.booleanValue,e.booleanValue);case 2:return function(o,a){const l=Le(o.integerValue||o.doubleValue),u=Le(a.integerValue||a.doubleValue);return l<u?-1:l>u?1:l===u?0:isNaN(l)?isNaN(u)?0:-1:1}(n,e);case 3:return Uc(n.timestampValue,e.timestampValue);case 4:return Uc(ds(n),ds(e));case 5:return le(n.stringValue,e.stringValue);case 6:return function(o,a){const l=Zn(o),u=Zn(a);return l.compareTo(u)}(n.bytesValue,e.bytesValue);case 7:return function(o,a){const l=o.split("/"),u=a.split("/");for(let d=0;d<l.length&&d<u.length;d++){const p=le(l[d],u[d]);if(p!==0)return p}return le(l.length,u.length)}(n.referenceValue,e.referenceValue);case 8:return function(o,a){const l=le(Le(o.latitude),Le(a.latitude));return l!==0?l:le(Le(o.longitude),Le(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Fc(n.arrayValue,e.arrayValue);case 10:return function(o,a){var l,u,d,p;const y=o.fields||{},b=a.fields||{},S=(l=y.value)===null||l===void 0?void 0:l.arrayValue,x=(u=b.value)===null||u===void 0?void 0:u.arrayValue,U=le(((d=S==null?void 0:S.values)===null||d===void 0?void 0:d.length)||0,((p=x==null?void 0:x.values)===null||p===void 0?void 0:p.length)||0);return U!==0?U:Fc(S,x)}(n.mapValue,e.mapValue);case 11:return function(o,a){if(o===si.mapValue&&a===si.mapValue)return 0;if(o===si.mapValue)return 1;if(a===si.mapValue)return-1;const l=o.fields||{},u=Object.keys(l),d=a.fields||{},p=Object.keys(d);u.sort(),p.sort();for(let y=0;y<u.length&&y<p.length;++y){const b=le(u[y],p[y]);if(b!==0)return b;const S=Sr(l[u[y]],d[p[y]]);if(S!==0)return S}return le(u.length,p.length)}(n.mapValue,e.mapValue);default:throw G()}}function Uc(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return le(n,e);const t=En(n),r=En(e),s=le(t.seconds,r.seconds);return s!==0?s:le(t.nanos,r.nanos)}function Fc(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const o=Sr(t[s],r[s]);if(o)return o}return le(t.length,r.length)}function Rr(n){return Lo(n)}function Lo(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=En(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Zn(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return $.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const o of t.values||[])s?s=!1:r+=",",r+=Lo(o);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",o=!0;for(const a of r)o?o=!1:s+=",",s+=`${a}:${Lo(t.fields[a])}`;return s+"}"}(n.mapValue):G()}function xo(n){return!!n&&"integerValue"in n}function la(n){return!!n&&"arrayValue"in n}function Bc(n){return!!n&&"nullValue"in n}function qc(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function hi(n){return!!n&&"mapValue"in n}function sg(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function ss(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return nr(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=ss(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=ss(n.arrayValue.values[t]);return e}return Object.assign({},n)}function ig(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class it{constructor(e){this.value=e}static empty(){return new it({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!hi(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=ss(t)}setAll(e){let t=Ke.emptyPath(),r={},s=[];e.forEach((a,l)=>{if(!t.isImmediateParentOf(l)){const u=this.getFieldsMap(t);this.applyChanges(u,r,s),r={},s=[],t=l.popLast()}a?r[l.lastSegment()]=ss(a):s.push(l.lastSegment())});const o=this.getFieldsMap(t);this.applyChanges(o,r,s)}delete(e){const t=this.field(e.popLast());hi(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Lt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];hi(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){nr(t,(s,o)=>e[s]=o);for(const s of r)delete e[s]}clone(){return new it(ss(this.value))}}function wu(n){const e=[];return nr(n.fields,(t,r)=>{const s=new Ke([t]);if(hi(r)){const o=wu(r.mapValue).fields;if(o.length===0)e.push(s);else for(const a of o)e.push(s.child(a))}else e.push(s)}),new dt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et{constructor(e,t,r,s,o,a,l){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=o,this.data=a,this.documentState=l}static newInvalidDocument(e){return new et(e,0,W.min(),W.min(),W.min(),it.empty(),0)}static newFoundDocument(e,t,r,s){return new et(e,1,t,W.min(),r,s,0)}static newNoDocument(e,t){return new et(e,2,t,W.min(),W.min(),it.empty(),0)}static newUnknownDocument(e,t){return new et(e,3,t,W.min(),W.min(),it.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(W.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=it.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=it.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=W.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof et&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new et(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ti{constructor(e,t){this.position=e,this.inclusive=t}}function jc(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const o=e[s],a=n.position[s];if(o.field.isKeyField()?r=$.comparator($.fromName(a.referenceValue),t.key):r=Sr(a,t.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function $c(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Lt(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bi{constructor(e,t="asc"){this.field=e,this.dir=t}}function og(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eu{}class Fe extends Eu{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new cg(e,t,r):t==="array-contains"?new hg(e,r):t==="in"?new dg(e,r):t==="not-in"?new fg(e,r):t==="array-contains-any"?new pg(e,r):new Fe(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new lg(e,r):new ug(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Sr(t,this.value)):t!==null&&er(this.value)===er(t)&&this.matchesComparison(Sr(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return G()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class xt extends Eu{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new xt(e,t)}matches(e){return Iu(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Iu(n){return n.op==="and"}function Tu(n){return ag(n)&&Iu(n)}function ag(n){for(const e of n.filters)if(e instanceof xt)return!1;return!0}function Do(n){if(n instanceof Fe)return n.field.canonicalString()+n.op.toString()+Rr(n.value);if(Tu(n))return n.filters.map(e=>Do(e)).join(",");{const e=n.filters.map(t=>Do(t)).join(",");return`${n.op}(${e})`}}function bu(n,e){return n instanceof Fe?function(r,s){return s instanceof Fe&&r.op===s.op&&r.field.isEqual(s.field)&&Lt(r.value,s.value)}(n,e):n instanceof xt?function(r,s){return s instanceof xt&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((o,a,l)=>o&&bu(a,s.filters[l]),!0):!1}(n,e):void G()}function Au(n){return n instanceof Fe?function(t){return`${t.field.canonicalString()} ${t.op} ${Rr(t.value)}`}(n):n instanceof xt?function(t){return t.op.toString()+" {"+t.getFilters().map(Au).join(" ,")+"}"}(n):"Filter"}class cg extends Fe{constructor(e,t,r){super(e,t,r),this.key=$.fromName(r.referenceValue)}matches(e){const t=$.comparator(e.key,this.key);return this.matchesComparison(t)}}class lg extends Fe{constructor(e,t){super(e,"in",t),this.keys=Su("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class ug extends Fe{constructor(e,t){super(e,"not-in",t),this.keys=Su("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Su(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>$.fromName(r.referenceValue))}class hg extends Fe{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return la(t)&&ps(t.arrayValue,this.value)}}class dg extends Fe{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&ps(this.value.arrayValue,t)}}class fg extends Fe{constructor(e,t){super(e,"not-in",t)}matches(e){if(ps(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!ps(this.value.arrayValue,t)}}class pg extends Fe{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!la(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>ps(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mg{constructor(e,t=null,r=[],s=[],o=null,a=null,l=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=o,this.startAt=a,this.endAt=l,this.ue=null}}function zc(n,e=null,t=[],r=[],s=null,o=null,a=null){return new mg(n,e,t,r,s,o,a)}function ua(n){const e=Q(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>Do(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(o){return o.field.canonicalString()+o.dir}(r)).join(","),Ni(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>Rr(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>Rr(r)).join(",")),e.ue=t}return e.ue}function ha(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!og(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!bu(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!$c(n.startAt,e.startAt)&&$c(n.endAt,e.endAt)}function Vo(n){return $.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oi{constructor(e,t=null,r=[],s=[],o=null,a="F",l=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=o,this.limitType=a,this.startAt=l,this.endAt=u,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function gg(n,e,t,r,s,o,a,l){return new Oi(n,e,t,r,s,o,a,l)}function Mi(n){return new Oi(n)}function Hc(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function _g(n){return n.collectionGroup!==null}function is(n){const e=Q(n);if(e.ce===null){e.ce=[];const t=new Set;for(const o of e.explicitOrderBy)e.ce.push(o),t.add(o.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new We(Ke.comparator);return a.filters.forEach(u=>{u.getFlattenedFilters().forEach(d=>{d.isInequality()&&(l=l.add(d.field))})}),l})(e).forEach(o=>{t.has(o.canonicalString())||o.isKeyField()||e.ce.push(new bi(o,r))}),t.has(Ke.keyField().canonicalString())||e.ce.push(new bi(Ke.keyField(),r))}return e.ce}function kt(n){const e=Q(n);return e.le||(e.le=yg(e,is(n))),e.le}function yg(n,e){if(n.limitType==="F")return zc(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const o=s.dir==="desc"?"asc":"desc";return new bi(s.field,o)});const t=n.endAt?new Ti(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Ti(n.startAt.position,n.startAt.inclusive):null;return zc(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function No(n,e,t){return new Oi(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Ui(n,e){return ha(kt(n),kt(e))&&n.limitType===e.limitType}function Ru(n){return`${ua(kt(n))}|lt:${n.limitType}`}function pr(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>Au(s)).join(", ")}]`),Ni(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>Rr(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>Rr(s)).join(",")),`Target(${r})`}(kt(n))}; limitType=${n.limitType})`}function Fi(n,e){return e.isFoundDocument()&&function(r,s){const o=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):$.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)}(n,e)&&function(r,s){for(const o of is(r))if(!o.field.isKeyField()&&s.data.field(o.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const o of r.filters)if(!o.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(a,l,u){const d=jc(a,l,u);return a.inclusive?d<=0:d<0}(r.startAt,is(r),s)||r.endAt&&!function(a,l,u){const d=jc(a,l,u);return a.inclusive?d>=0:d>0}(r.endAt,is(r),s))}(n,e)}function vg(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Cu(n){return(e,t)=>{let r=!1;for(const s of is(n)){const o=wg(s,e,t);if(o!==0)return o;r=r||s.field.isKeyField()}return 0}}function wg(n,e,t){const r=n.field.isKeyField()?$.comparator(e.key,t.key):function(o,a,l){const u=a.data.field(o),d=l.data.field(o);return u!==null&&d!==null?Sr(u,d):G()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return G()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nr{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,o]of r)if(this.equalsFn(s,e))return o}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let o=0;o<s.length;o++)if(this.equalsFn(s[o][0],e))return void(s[o]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){nr(this.inner,(t,r)=>{for(const[s,o]of r)e(s,o)})}isEmpty(){return yu(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eg=new ke($.comparator);function Zt(){return Eg}const ku=new ke($.comparator);function es(...n){let e=ku;for(const t of n)e=e.insert(t.key,t);return e}function Pu(n){let e=ku;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function Wn(){return os()}function Lu(){return os()}function os(){return new Nr(n=>n.toString(),(n,e)=>n.isEqual(e))}const Ig=new ke($.comparator),Tg=new We($.comparator);function te(...n){let e=Tg;for(const t of n)e=e.add(t);return e}const bg=new We(le);function Ag(){return bg}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function da(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ii(e)?"-0":e}}function xu(n){return{integerValue:""+n}}function Sg(n,e){return tg(e)?xu(e):da(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bi{constructor(){this._=void 0}}function Rg(n,e,t){return n instanceof ms?function(s,o){const a={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return o&&aa(o)&&(o=ca(o)),o&&(a.fields.__previous_value__=o),{mapValue:a}}(t,e):n instanceof Cr?Vu(n,e):n instanceof gs?Nu(n,e):function(s,o){const a=Du(s,o),l=Gc(a)+Gc(s.Pe);return xo(a)&&xo(s.Pe)?xu(l):da(s.serializer,l)}(n,e)}function Cg(n,e,t){return n instanceof Cr?Vu(n,e):n instanceof gs?Nu(n,e):t}function Du(n,e){return n instanceof Ai?function(r){return xo(r)||function(o){return!!o&&"doubleValue"in o}(r)}(e)?e:{integerValue:0}:null}class ms extends Bi{}class Cr extends Bi{constructor(e){super(),this.elements=e}}function Vu(n,e){const t=Ou(e);for(const r of n.elements)t.some(s=>Lt(s,r))||t.push(r);return{arrayValue:{values:t}}}class gs extends Bi{constructor(e){super(),this.elements=e}}function Nu(n,e){let t=Ou(e);for(const r of n.elements)t=t.filter(s=>!Lt(s,r));return{arrayValue:{values:t}}}class Ai extends Bi{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function Gc(n){return Le(n.integerValue||n.doubleValue)}function Ou(n){return la(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mu{constructor(e,t){this.field=e,this.transform=t}}function kg(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof Cr&&s instanceof Cr||r instanceof gs&&s instanceof gs?Ar(r.elements,s.elements,Lt):r instanceof Ai&&s instanceof Ai?Lt(r.Pe,s.Pe):r instanceof ms&&s instanceof ms}(n.transform,e.transform)}class Pg{constructor(e,t){this.version=e,this.transformResults=t}}class wt{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new wt}static exists(e){return new wt(void 0,e)}static updateTime(e){return new wt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function di(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class qi{}function Uu(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new fa(n.key,wt.none()):new As(n.key,n.data,wt.none());{const t=n.data,r=it.empty();let s=new We(Ke.comparator);for(let o of e.fields)if(!s.has(o)){let a=t.field(o);a===null&&o.length>1&&(o=o.popLast(),a=t.field(o)),a===null?r.delete(o):r.set(o,a),s=s.add(o)}return new bn(n.key,r,new dt(s.toArray()),wt.none())}}function Lg(n,e,t){n instanceof As?function(s,o,a){const l=s.value.clone(),u=Wc(s.fieldTransforms,o,a.transformResults);l.setAll(u),o.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,e,t):n instanceof bn?function(s,o,a){if(!di(s.precondition,o))return void o.convertToUnknownDocument(a.version);const l=Wc(s.fieldTransforms,o,a.transformResults),u=o.data;u.setAll(Fu(s)),u.setAll(l),o.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(n,e,t):function(s,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function as(n,e,t,r){return n instanceof As?function(o,a,l,u){if(!di(o.precondition,a))return l;const d=o.value.clone(),p=Qc(o.fieldTransforms,u,a);return d.setAll(p),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,e,t,r):n instanceof bn?function(o,a,l,u){if(!di(o.precondition,a))return l;const d=Qc(o.fieldTransforms,u,a),p=a.data;return p.setAll(Fu(o)),p.setAll(d),a.convertToFoundDocument(a.version,p).setHasLocalMutations(),l===null?null:l.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(y=>y.field))}(n,e,t,r):function(o,a,l){return di(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l}(n,e,t)}function xg(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),o=Du(r.transform,s||null);o!=null&&(t===null&&(t=it.empty()),t.set(r.field,o))}return t||null}function Kc(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Ar(r,s,(o,a)=>kg(o,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class As extends qi{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class bn extends qi{constructor(e,t,r,s,o=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function Fu(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function Wc(n,e,t){const r=new Map;me(n.length===t.length);for(let s=0;s<t.length;s++){const o=n[s],a=o.transform,l=e.data.field(o.field);r.set(o.field,Cg(a,l,t[s]))}return r}function Qc(n,e,t){const r=new Map;for(const s of n){const o=s.transform,a=t.data.field(s.field);r.set(s.field,Rg(o,a,e))}return r}class fa extends qi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Dg extends qi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vg{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const o=this.mutations[s];o.key.isEqual(e.key)&&Lg(o,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=as(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=as(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Lu();return this.mutations.forEach(s=>{const o=e.get(s.key),a=o.overlayedDocument;let l=this.applyToLocalView(a,o.mutatedFields);l=t.has(s.key)?null:l;const u=Uu(a,l);u!==null&&r.set(s.key,u),a.isValidDocument()||a.convertToNoDocument(W.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),te())}isEqual(e){return this.batchId===e.batchId&&Ar(this.mutations,e.mutations,(t,r)=>Kc(t,r))&&Ar(this.baseMutations,e.baseMutations,(t,r)=>Kc(t,r))}}class pa{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){me(e.mutations.length===r.length);let s=function(){return Ig}();const o=e.mutations;for(let a=0;a<o.length;a++)s=s.insert(o[a].key,r[a].version);return new pa(e,t,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ng{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Og{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var De,ie;function Mg(n){switch(n){default:return G();case k.CANCELLED:case k.UNKNOWN:case k.DEADLINE_EXCEEDED:case k.RESOURCE_EXHAUSTED:case k.INTERNAL:case k.UNAVAILABLE:case k.UNAUTHENTICATED:return!1;case k.INVALID_ARGUMENT:case k.NOT_FOUND:case k.ALREADY_EXISTS:case k.PERMISSION_DENIED:case k.FAILED_PRECONDITION:case k.ABORTED:case k.OUT_OF_RANGE:case k.UNIMPLEMENTED:case k.DATA_LOSS:return!0}}function Bu(n){if(n===void 0)return Xt("GRPC error has no .code"),k.UNKNOWN;switch(n){case De.OK:return k.OK;case De.CANCELLED:return k.CANCELLED;case De.UNKNOWN:return k.UNKNOWN;case De.DEADLINE_EXCEEDED:return k.DEADLINE_EXCEEDED;case De.RESOURCE_EXHAUSTED:return k.RESOURCE_EXHAUSTED;case De.INTERNAL:return k.INTERNAL;case De.UNAVAILABLE:return k.UNAVAILABLE;case De.UNAUTHENTICATED:return k.UNAUTHENTICATED;case De.INVALID_ARGUMENT:return k.INVALID_ARGUMENT;case De.NOT_FOUND:return k.NOT_FOUND;case De.ALREADY_EXISTS:return k.ALREADY_EXISTS;case De.PERMISSION_DENIED:return k.PERMISSION_DENIED;case De.FAILED_PRECONDITION:return k.FAILED_PRECONDITION;case De.ABORTED:return k.ABORTED;case De.OUT_OF_RANGE:return k.OUT_OF_RANGE;case De.UNIMPLEMENTED:return k.UNIMPLEMENTED;case De.DATA_LOSS:return k.DATA_LOSS;default:return G()}}(ie=De||(De={}))[ie.OK=0]="OK",ie[ie.CANCELLED=1]="CANCELLED",ie[ie.UNKNOWN=2]="UNKNOWN",ie[ie.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ie[ie.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ie[ie.NOT_FOUND=5]="NOT_FOUND",ie[ie.ALREADY_EXISTS=6]="ALREADY_EXISTS",ie[ie.PERMISSION_DENIED=7]="PERMISSION_DENIED",ie[ie.UNAUTHENTICATED=16]="UNAUTHENTICATED",ie[ie.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ie[ie.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ie[ie.ABORTED=10]="ABORTED",ie[ie.OUT_OF_RANGE=11]="OUT_OF_RANGE",ie[ie.UNIMPLEMENTED=12]="UNIMPLEMENTED",ie[ie.INTERNAL=13]="INTERNAL",ie[ie.UNAVAILABLE=14]="UNAVAILABLE",ie[ie.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ug(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fg=new Qn([4294967295,4294967295],0);function Jc(n){const e=Ug().encode(n),t=new uu;return t.update(e),new Uint8Array(t.digest())}function Yc(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),o=e.getUint32(12,!0);return[new Qn([t,r],0),new Qn([s,o],0)]}class ma{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new ts(`Invalid padding: ${t}`);if(r<0)throw new ts(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new ts(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new ts(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=Qn.fromNumber(this.Ie)}Ee(e,t,r){let s=e.add(t.multiply(Qn.fromNumber(r)));return s.compare(Fg)===1&&(s=new Qn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const t=Jc(e),[r,s]=Yc(t);for(let o=0;o<this.hashCount;o++){const a=this.Ee(r,s,o);if(!this.de(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,o=new Uint8Array(Math.ceil(e/8)),a=new ma(o,s,t);return r.forEach(l=>a.insert(l)),a}insert(e){if(this.Ie===0)return;const t=Jc(e),[r,s]=Yc(t);for(let o=0;o<this.hashCount;o++){const a=this.Ee(r,s,o);this.Ae(a)}}Ae(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class ts extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ji{constructor(e,t,r,s,o){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,Ss.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new ji(W.min(),s,new ke(le),Zt(),te())}}class Ss{constructor(e,t,r,s,o){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Ss(r,t,te(),te(),te())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fi{constructor(e,t,r,s){this.Re=e,this.removedTargetIds=t,this.key=r,this.Ve=s}}class qu{constructor(e,t){this.targetId=e,this.me=t}}class ju{constructor(e,t,r=Qe.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class Xc{constructor(){this.fe=0,this.ge=el(),this.pe=Qe.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=te(),t=te(),r=te();return this.ge.forEach((s,o)=>{switch(o){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:G()}}),new Ss(this.pe,this.ye,e,t,r)}Ce(){this.we=!1,this.ge=el()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,me(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class Bg{constructor(e){this.Le=e,this.Be=new Map,this.ke=Zt(),this.qe=Zc(),this.Qe=new ke(le)}Ke(e){for(const t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(const t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,t=>{const r=this.Ge(t);switch(e.state){case 0:this.ze(t)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),r.De(e.resumeToken));break;default:G()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach((r,s)=>{this.ze(s)&&t(s)})}He(e){const t=e.targetId,r=e.me.count,s=this.Je(t);if(s){const o=s.target;if(Vo(o))if(r===0){const a=new $(o.path);this.Ue(t,a,et.newNoDocument(a,W.min()))}else me(r===1);else{const a=this.Ye(t);if(a!==r){const l=this.Ze(e),u=l?this.Xe(l,e,a):1;if(u!==0){this.je(t);const d=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,d)}}}}}Ze(e){const t=e.me.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:o=0}=t;let a,l;try{a=Zn(r).toUint8Array()}catch(u){if(u instanceof vu)return br("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{l=new ma(a,s,o)}catch(u){return br(u instanceof ts?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return l.Ie===0?null:l}Xe(e,t,r){return t.me.count===r-this.nt(e,t.targetId)?0:2}nt(e,t){const r=this.Le.getRemoteKeysForTarget(t);let s=0;return r.forEach(o=>{const a=this.Le.tt(),l=`projects/${a.projectId}/databases/${a.database}/documents/${o.path.canonicalString()}`;e.mightContain(l)||(this.Ue(t,o,null),s++)}),s}rt(e){const t=new Map;this.Be.forEach((o,a)=>{const l=this.Je(a);if(l){if(o.current&&Vo(l.target)){const u=new $(l.target.path);this.ke.get(u)!==null||this.it(a,u)||this.Ue(a,u,et.newNoDocument(u,e))}o.be&&(t.set(a,o.ve()),o.Ce())}});let r=te();this.qe.forEach((o,a)=>{let l=!0;a.forEachWhile(u=>{const d=this.Je(u);return!d||d.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(o))}),this.ke.forEach((o,a)=>a.setReadTime(e));const s=new ji(e,t,this.Qe,this.ke,r);return this.ke=Zt(),this.qe=Zc(),this.Qe=new ke(le),s}$e(e,t){if(!this.ze(e))return;const r=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,r),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,r){if(!this.ze(e))return;const s=this.Ge(e);this.it(e,t)?s.Fe(t,1):s.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),r&&(this.ke=this.ke.insert(t,r))}removeTarget(e){this.Be.delete(e)}Ye(e){const t=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new Xc,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new We(le),this.qe=this.qe.insert(e,t)),t}ze(e){const t=this.Je(e)!==null;return t||F("WatchChangeAggregator","Detected inactive target",e),t}Je(e){const t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new Xc),this.Le.getRemoteKeysForTarget(e).forEach(t=>{this.Ue(e,t,null)})}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}}function Zc(){return new ke($.comparator)}function el(){return new ke($.comparator)}const qg={asc:"ASCENDING",desc:"DESCENDING"},jg={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},$g={and:"AND",or:"OR"};class zg{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Oo(n,e){return n.useProto3Json||Ni(e)?e:{value:e}}function Si(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function $u(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Hg(n,e){return Si(n,e.toTimestamp())}function Pt(n){return me(!!n),W.fromTimestamp(function(t){const r=En(t);return new Be(r.seconds,r.nanos)}(n))}function ga(n,e){return Mo(n,e).canonicalString()}function Mo(n,e){const t=function(s){return new Se(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function zu(n){const e=Se.fromString(n);return me(Qu(e)),e}function Uo(n,e){return ga(n.databaseId,e.path)}function _o(n,e){const t=zu(e);if(t.get(1)!==n.databaseId.projectId)throw new j(k.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new j(k.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new $(Gu(t))}function Hu(n,e){return ga(n.databaseId,e)}function Gg(n){const e=zu(n);return e.length===4?Se.emptyPath():Gu(e)}function Fo(n){return new Se(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Gu(n){return me(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function tl(n,e,t){return{name:Uo(n,e),fields:t.value.mapValue.fields}}function Kg(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:G()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],o=function(d,p){return d.useProto3Json?(me(p===void 0||typeof p=="string"),Qe.fromBase64String(p||"")):(me(p===void 0||p instanceof Buffer||p instanceof Uint8Array),Qe.fromUint8Array(p||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,l=a&&function(d){const p=d.code===void 0?k.UNKNOWN:Bu(d.code);return new j(p,d.message||"")}(a);t=new ju(r,s,o,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=_o(n,r.document.name),o=Pt(r.document.updateTime),a=r.document.createTime?Pt(r.document.createTime):W.min(),l=new it({mapValue:{fields:r.document.fields}}),u=et.newFoundDocument(s,o,a,l),d=r.targetIds||[],p=r.removedTargetIds||[];t=new fi(d,p,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=_o(n,r.document),o=r.readTime?Pt(r.readTime):W.min(),a=et.newNoDocument(s,o),l=r.removedTargetIds||[];t=new fi([],l,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=_o(n,r.document),o=r.removedTargetIds||[];t=new fi([],o,s,null)}else{if(!("filter"in e))return G();{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:o}=r,a=new Og(s,o),l=r.targetId;t=new qu(l,a)}}return t}function Wg(n,e){let t;if(e instanceof As)t={update:tl(n,e.key,e.value)};else if(e instanceof fa)t={delete:Uo(n,e.key)};else if(e instanceof bn)t={update:tl(n,e.key,e.data),updateMask:r_(e.fieldMask)};else{if(!(e instanceof Dg))return G();t={verify:Uo(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(o,a){const l=a.transform;if(l instanceof ms)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Cr)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof gs)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Ai)return{fieldPath:a.field.canonicalString(),increment:l.Pe};throw G()}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,o){return o.updateTime!==void 0?{updateTime:Hg(s,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:G()}(n,e.precondition)),t}function Qg(n,e){return n&&n.length>0?(me(e!==void 0),n.map(t=>function(s,o){let a=s.updateTime?Pt(s.updateTime):Pt(o);return a.isEqual(W.min())&&(a=Pt(o)),new Pg(a,s.transformResults||[])}(t,e))):[]}function Jg(n,e){return{documents:[Hu(n,e.path)]}}function Yg(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Hu(n,s);const o=function(d){if(d.length!==0)return Wu(xt.create(d,"and"))}(e.filters);o&&(t.structuredQuery.where=o);const a=function(d){if(d.length!==0)return d.map(p=>function(b){return{field:mr(b.field),direction:e_(b.dir)}}(p))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const l=Oo(n,e.limit);return l!==null&&(t.structuredQuery.limit=l),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{_t:t,parent:s}}function Xg(n){let e=Gg(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){me(r===1);const p=t.from[0];p.allDescendants?s=p.collectionId:e=e.child(p.collectionId)}let o=[];t.where&&(o=function(y){const b=Ku(y);return b instanceof xt&&Tu(b)?b.getFilters():[b]}(t.where));let a=[];t.orderBy&&(a=function(y){return y.map(b=>function(x){return new bi(gr(x.field),function(L){switch(L){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(x.direction))}(b))}(t.orderBy));let l=null;t.limit&&(l=function(y){let b;return b=typeof y=="object"?y.value:y,Ni(b)?null:b}(t.limit));let u=null;t.startAt&&(u=function(y){const b=!!y.before,S=y.values||[];return new Ti(S,b)}(t.startAt));let d=null;return t.endAt&&(d=function(y){const b=!y.before,S=y.values||[];return new Ti(S,b)}(t.endAt)),gg(e,s,a,o,l,"F",u,d)}function Zg(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return G()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Ku(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=gr(t.unaryFilter.field);return Fe.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=gr(t.unaryFilter.field);return Fe.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=gr(t.unaryFilter.field);return Fe.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=gr(t.unaryFilter.field);return Fe.create(a,"!=",{nullValue:"NULL_VALUE"});default:return G()}}(n):n.fieldFilter!==void 0?function(t){return Fe.create(gr(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return G()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return xt.create(t.compositeFilter.filters.map(r=>Ku(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return G()}}(t.compositeFilter.op))}(n):G()}function e_(n){return qg[n]}function t_(n){return jg[n]}function n_(n){return $g[n]}function mr(n){return{fieldPath:n.canonicalString()}}function gr(n){return Ke.fromServerFormat(n.fieldPath)}function Wu(n){return n instanceof Fe?function(t){if(t.op==="=="){if(qc(t.value))return{unaryFilter:{field:mr(t.field),op:"IS_NAN"}};if(Bc(t.value))return{unaryFilter:{field:mr(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(qc(t.value))return{unaryFilter:{field:mr(t.field),op:"IS_NOT_NAN"}};if(Bc(t.value))return{unaryFilter:{field:mr(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:mr(t.field),op:t_(t.op),value:t.value}}}(n):n instanceof xt?function(t){const r=t.getFilters().map(s=>Wu(s));return r.length===1?r[0]:{compositeFilter:{op:n_(t.op),filters:r}}}(n):G()}function r_(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Qu(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fn{constructor(e,t,r,s,o=W.min(),a=W.min(),l=Qe.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=u}withSequenceNumber(e){return new fn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new fn(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new fn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new fn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s_{constructor(e){this.ct=e}}function i_(n){const e=Xg({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?No(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class o_{constructor(){this.un=new a_}addToCollectionParentIndex(e,t){return this.un.add(t),P.resolve()}getCollectionParents(e,t){return P.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return P.resolve()}deleteFieldIndex(e,t){return P.resolve()}deleteAllFieldIndexes(e){return P.resolve()}createTargetIndexes(e,t){return P.resolve()}getDocumentsMatchingTarget(e,t){return P.resolve(null)}getIndexType(e,t){return P.resolve(0)}getFieldIndexes(e,t){return P.resolve([])}getNextCollectionGroupToUpdate(e){return P.resolve(null)}getMinOffset(e,t){return P.resolve(wn.min())}getMinOffsetFromCollectionGroup(e,t){return P.resolve(wn.min())}updateCollectionGroup(e,t,r){return P.resolve()}updateIndexEntries(e,t){return P.resolve()}}class a_{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new We(Se.comparator),o=!s.has(r);return this.index[t]=s.add(r),o}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new We(Se.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kr{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new kr(0)}static kn(){return new kr(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class c_{constructor(){this.changes=new Nr(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,et.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?P.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class l_{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u_{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&as(r.mutation,s,dt.empty(),Be.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,te()).next(()=>r))}getLocalViewOfDocuments(e,t,r=te()){const s=Wn();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(o=>{let a=es();return o.forEach((l,u)=>{a=a.insert(l,u.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=Wn();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,te()))}populateOverlays(e,t,r){const s=[];return r.forEach(o=>{t.has(o)||s.push(o)}),this.documentOverlayCache.getOverlays(e,s).next(o=>{o.forEach((a,l)=>{t.set(a,l)})})}computeViews(e,t,r,s){let o=Zt();const a=os(),l=function(){return os()}();return t.forEach((u,d)=>{const p=r.get(d.key);s.has(d.key)&&(p===void 0||p.mutation instanceof bn)?o=o.insert(d.key,d):p!==void 0?(a.set(d.key,p.mutation.getFieldMask()),as(p.mutation,d,p.mutation.getFieldMask(),Be.now())):a.set(d.key,dt.empty())}),this.recalculateAndSaveOverlays(e,o).next(u=>(u.forEach((d,p)=>a.set(d,p)),t.forEach((d,p)=>{var y;return l.set(d,new l_(p,(y=a.get(d))!==null&&y!==void 0?y:null))}),l))}recalculateAndSaveOverlays(e,t){const r=os();let s=new ke((a,l)=>a-l),o=te();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const l of a)l.keys().forEach(u=>{const d=t.get(u);if(d===null)return;let p=r.get(u)||dt.empty();p=l.applyToLocalView(d,p),r.set(u,p);const y=(s.get(l.batchId)||te()).add(u);s=s.insert(l.batchId,y)})}).next(()=>{const a=[],l=s.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),d=u.key,p=u.value,y=Lu();p.forEach(b=>{if(!o.has(b)){const S=Uu(t.get(b),r.get(b));S!==null&&y.set(b,S),o=o.add(b)}}),a.push(this.documentOverlayCache.saveOverlays(e,d,y))}return P.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return function(a){return $.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):_g(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(o=>{const a=s-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-o.size):P.resolve(Wn());let l=-1,u=o;return a.next(d=>P.forEach(d,(p,y)=>(l<y.largestBatchId&&(l=y.largestBatchId),o.get(p)?P.resolve():this.remoteDocumentCache.getEntry(e,p).next(b=>{u=u.insert(p,b)}))).next(()=>this.populateOverlays(e,d,o)).next(()=>this.computeViews(e,u,d,te())).next(p=>({batchId:l,changes:Pu(p)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new $(t)).next(r=>{let s=es();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const o=t.collectionGroup;let a=es();return this.indexManager.getCollectionParents(e,o).next(l=>P.forEach(l,u=>{const d=function(y,b){return new Oi(b,null,y.explicitOrderBy.slice(),y.filters.slice(),y.limit,y.limitType,y.startAt,y.endAt)}(t,u.child(o));return this.getDocumentsMatchingCollectionQuery(e,d,r,s).next(p=>{p.forEach((y,b)=>{a=a.insert(y,b)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,s){let o;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(o=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,o,s))).next(a=>{o.forEach((u,d)=>{const p=d.getKey();a.get(p)===null&&(a=a.insert(p,et.newInvalidDocument(p)))});let l=es();return a.forEach((u,d)=>{const p=o.get(u);p!==void 0&&as(p.mutation,d,dt.empty(),Be.now()),Fi(t,d)&&(l=l.insert(u,d))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class h_{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return P.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:Pt(s.createTime)}}(t)),P.resolve()}getNamedQuery(e,t){return P.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,function(s){return{name:s.name,query:i_(s.bundledQuery),readTime:Pt(s.readTime)}}(t)),P.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d_{constructor(){this.overlays=new ke($.comparator),this.Ir=new Map}getOverlay(e,t){return P.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Wn();return P.forEach(t,s=>this.getOverlay(e,s).next(o=>{o!==null&&r.set(s,o)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,o)=>{this.ht(e,t,o)}),P.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Ir.get(r);return s!==void 0&&(s.forEach(o=>this.overlays=this.overlays.remove(o)),this.Ir.delete(r)),P.resolve()}getOverlaysForCollection(e,t,r){const s=Wn(),o=t.length+1,a=new $(t.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const u=l.getNext().value,d=u.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===o&&u.largestBatchId>r&&s.set(u.getKey(),u)}return P.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let o=new ke((d,p)=>d-p);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let p=o.get(d.largestBatchId);p===null&&(p=Wn(),o=o.insert(d.largestBatchId,p)),p.set(d.getKey(),d)}}const l=Wn(),u=o.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((d,p)=>l.set(d,p)),!(l.size()>=s)););return P.resolve(l)}ht(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Ir.get(s.largestBatchId).delete(r.key);this.Ir.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new Ng(t,r));let o=this.Ir.get(t);o===void 0&&(o=te(),this.Ir.set(t,o)),this.Ir.set(t,o.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class f_{constructor(){this.sessionToken=Qe.EMPTY_BYTE_STRING}getSessionToken(e){return P.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,P.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _a{constructor(){this.Tr=new We(qe.Er),this.dr=new We(qe.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const r=new qe(e,t);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Vr(new qe(e,t))}mr(e,t){e.forEach(r=>this.removeReference(r,t))}gr(e){const t=new $(new Se([])),r=new qe(t,e),s=new qe(t,e+1),o=[];return this.dr.forEachInRange([r,s],a=>{this.Vr(a),o.push(a.key)}),o}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new $(new Se([])),r=new qe(t,e),s=new qe(t,e+1);let o=te();return this.dr.forEachInRange([r,s],a=>{o=o.add(a.key)}),o}containsKey(e){const t=new qe(e,0),r=this.Tr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class qe{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return $.comparator(e.key,t.key)||le(e.wr,t.wr)}static Ar(e,t){return le(e.wr,t.wr)||$.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p_{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new We(qe.Er)}checkEmpty(e){return P.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const o=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Vg(o,t,r,s);this.mutationQueue.push(a);for(const l of s)this.br=this.br.add(new qe(l.key,o)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return P.resolve(a)}lookupMutationBatch(e,t){return P.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.vr(r),o=s<0?0:s;return P.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return P.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return P.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new qe(t,0),s=new qe(t,Number.POSITIVE_INFINITY),o=[];return this.br.forEachInRange([r,s],a=>{const l=this.Dr(a.wr);o.push(l)}),P.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new We(le);return t.forEach(s=>{const o=new qe(s,0),a=new qe(s,Number.POSITIVE_INFINITY);this.br.forEachInRange([o,a],l=>{r=r.add(l.wr)})}),P.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let o=r;$.isDocumentKey(o)||(o=o.child(""));const a=new qe(new $(o),0);let l=new We(le);return this.br.forEachWhile(u=>{const d=u.key.path;return!!r.isPrefixOf(d)&&(d.length===s&&(l=l.add(u.wr)),!0)},a),P.resolve(this.Cr(l))}Cr(e){const t=[];return e.forEach(r=>{const s=this.Dr(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){me(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return P.forEach(t.mutations,s=>{const o=new qe(s.key,t.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,t){const r=new qe(t,0),s=this.br.firstAfterOrEqual(r);return P.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,P.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class m_{constructor(e){this.Mr=e,this.docs=function(){return new ke($.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),o=s?s.size:0,a=this.Mr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-o,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return P.resolve(r?r.document.mutableCopy():et.newInvalidDocument(t))}getEntries(e,t){let r=Zt();return t.forEach(s=>{const o=this.docs.get(s);r=r.insert(s,o?o.document.mutableCopy():et.newInvalidDocument(s))}),P.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let o=Zt();const a=t.path,l=new $(a.child("")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:d,value:{document:p}}=u.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||Ym(Jm(p),r)<=0||(s.has(p.key)||Fi(t,p))&&(o=o.insert(p.key,p.mutableCopy()))}return P.resolve(o)}getAllFromCollectionGroup(e,t,r,s){G()}Or(e,t){return P.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new g_(this)}getSize(e){return P.resolve(this.size)}}class g_ extends c_{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.cr.addEntry(e,s)):this.cr.removeEntry(r)}),P.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class __{constructor(e){this.persistence=e,this.Nr=new Nr(t=>ua(t),ha),this.lastRemoteSnapshotVersion=W.min(),this.highestTargetId=0,this.Lr=0,this.Br=new _a,this.targetCount=0,this.kr=kr.Bn()}forEachTarget(e,t){return this.Nr.forEach((r,s)=>t(s)),P.resolve()}getLastRemoteSnapshotVersion(e){return P.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return P.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),P.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Lr&&(this.Lr=t),P.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new kr(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,P.resolve()}updateTargetData(e,t){return this.Kn(t),P.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,P.resolve()}removeTargets(e,t,r){let s=0;const o=[];return this.Nr.forEach((a,l)=>{l.sequenceNumber<=t&&r.get(l.targetId)===null&&(this.Nr.delete(a),o.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)}),P.waitFor(o).next(()=>s)}getTargetCount(e){return P.resolve(this.targetCount)}getTargetData(e,t){const r=this.Nr.get(t)||null;return P.resolve(r)}addMatchingKeys(e,t,r){return this.Br.Rr(t,r),P.resolve()}removeMatchingKeys(e,t,r){this.Br.mr(t,r);const s=this.persistence.referenceDelegate,o=[];return s&&t.forEach(a=>{o.push(s.markPotentiallyOrphaned(e,a))}),P.waitFor(o)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),P.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Br.yr(t);return P.resolve(r)}containsKey(e,t){return P.resolve(this.Br.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class y_{constructor(e,t){this.qr={},this.overlays={},this.Qr=new oa(0),this.Kr=!1,this.Kr=!0,this.$r=new f_,this.referenceDelegate=e(this),this.Ur=new __(this),this.indexManager=new o_,this.remoteDocumentCache=function(s){return new m_(s)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new s_(t),this.Gr=new h_(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new d_,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.qr[e.toKey()];return r||(r=new p_(t,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,r){F("MemoryPersistence","Starting transaction:",e);const s=new v_(this.Qr.next());return this.referenceDelegate.zr(),r(s).next(o=>this.referenceDelegate.jr(s).next(()=>o)).toPromise().then(o=>(s.raiseOnCommittedEvent(),o))}Hr(e,t){return P.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,t)))}}class v_ extends Zm{constructor(e){super(),this.currentSequenceNumber=e}}class ya{constructor(e){this.persistence=e,this.Jr=new _a,this.Yr=null}static Zr(e){return new ya(e)}get Xr(){if(this.Yr)return this.Yr;throw G()}addReference(e,t,r){return this.Jr.addReference(r,t),this.Xr.delete(r.toString()),P.resolve()}removeReference(e,t,r){return this.Jr.removeReference(r,t),this.Xr.add(r.toString()),P.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),P.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach(s=>this.Xr.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(o=>this.Xr.add(o.toString()))}).next(()=>r.removeTargetData(e,t))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return P.forEach(this.Xr,r=>{const s=$.fromPath(r);return this.ei(e,s).next(o=>{o||t.removeEntry(s,W.min())})}).next(()=>(this.Yr=null,t.apply(e)))}updateLimboDocument(e,t){return this.ei(e,t).next(r=>{r?this.Xr.delete(t.toString()):this.Xr.add(t.toString())})}Wr(e){return 0}ei(e,t){return P.or([()=>P.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class va{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.$i=r,this.Ui=s}static Wi(e,t){let r=te(),s=te();for(const o of t.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:s=s.add(o.doc.key)}return new va(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class w_{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E_{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return Yh()?8:eg(tt())>0?6:4}()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,r,s){const o={result:null};return this.Yi(e,t).next(a=>{o.result=a}).next(()=>{if(!o.result)return this.Zi(e,t,s,r).next(a=>{o.result=a})}).next(()=>{if(o.result)return;const a=new w_;return this.Xi(e,t,a).next(l=>{if(o.result=l,this.zi)return this.es(e,t,a,l.size)})}).next(()=>o.result)}es(e,t,r,s){return r.documentReadCount<this.ji?(Qr()<=ne.DEBUG&&F("QueryEngine","SDK will not create cache indexes for query:",pr(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),P.resolve()):(Qr()<=ne.DEBUG&&F("QueryEngine","Query:",pr(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Hi*s?(Qr()<=ne.DEBUG&&F("QueryEngine","The SDK decides to create cache indexes for query:",pr(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,kt(t))):P.resolve())}Yi(e,t){if(Hc(t))return P.resolve(null);let r=kt(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=No(t,null,"F"),r=kt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(o=>{const a=te(...o);return this.Ji.getDocuments(e,a).next(l=>this.indexManager.getMinOffset(e,r).next(u=>{const d=this.ts(t,l);return this.ns(t,d,a,u.readTime)?this.Yi(e,No(t,null,"F")):this.rs(e,d,t,u)}))})))}Zi(e,t,r,s){return Hc(t)||s.isEqual(W.min())?P.resolve(null):this.Ji.getDocuments(e,r).next(o=>{const a=this.ts(t,o);return this.ns(t,a,r,s)?P.resolve(null):(Qr()<=ne.DEBUG&&F("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),pr(t)),this.rs(e,a,t,Qm(s,-1)).next(l=>l))})}ts(e,t){let r=new We(Cu(e));return t.forEach((s,o)=>{Fi(e,o)&&(r=r.add(o))}),r}ns(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const o=e.limitType==="F"?t.last():t.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(s)>0)}Xi(e,t,r){return Qr()<=ne.DEBUG&&F("QueryEngine","Using full collection scan to execute query:",pr(t)),this.Ji.getDocumentsMatchingQuery(e,t,wn.min(),r)}rs(e,t,r,s){return this.Ji.getDocumentsMatchingQuery(e,r,s).next(o=>(t.forEach(a=>{o=o.insert(a.key,a)}),o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class I_{constructor(e,t,r,s){this.persistence=e,this.ss=t,this.serializer=s,this.os=new ke(le),this._s=new Nr(o=>ua(o),ha),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new u_(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.os))}}function T_(n,e,t,r){return new I_(n,e,t,r)}async function Ju(n,e){const t=Q(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(o=>(s=o,t.ls(e),t.mutationQueue.getAllMutationBatches(r))).next(o=>{const a=[],l=[];let u=te();for(const d of s){a.push(d.batchId);for(const p of d.mutations)u=u.add(p.key)}for(const d of o){l.push(d.batchId);for(const p of d.mutations)u=u.add(p.key)}return t.localDocuments.getDocuments(r,u).next(d=>({hs:d,removedBatchIds:a,addedBatchIds:l}))})})}function b_(n,e){const t=Q(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),o=t.cs.newChangeBuffer({trackRemovals:!0});return function(l,u,d,p){const y=d.batch,b=y.keys();let S=P.resolve();return b.forEach(x=>{S=S.next(()=>p.getEntry(u,x)).next(U=>{const L=d.docVersions.get(x);me(L!==null),U.version.compareTo(L)<0&&(y.applyToRemoteDocument(U,d),U.isValidDocument()&&(U.setReadTime(d.commitVersion),p.addEntry(U)))})}),S.next(()=>l.mutationQueue.removeMutationBatch(u,y))}(t,r,e,o).next(()=>o.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let u=te();for(let d=0;d<l.mutationResults.length;++d)l.mutationResults[d].transformResults.length>0&&(u=u.add(l.batch.mutations[d].key));return u}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function Yu(n){const e=Q(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Ur.getLastRemoteSnapshotVersion(t))}function A_(n,e){const t=Q(n),r=e.snapshotVersion;let s=t.os;return t.persistence.runTransaction("Apply remote event","readwrite-primary",o=>{const a=t.cs.newChangeBuffer({trackRemovals:!0});s=t.os;const l=[];e.targetChanges.forEach((p,y)=>{const b=s.get(y);if(!b)return;l.push(t.Ur.removeMatchingKeys(o,p.removedDocuments,y).next(()=>t.Ur.addMatchingKeys(o,p.addedDocuments,y)));let S=b.withSequenceNumber(o.currentSequenceNumber);e.targetMismatches.get(y)!==null?S=S.withResumeToken(Qe.EMPTY_BYTE_STRING,W.min()).withLastLimboFreeSnapshotVersion(W.min()):p.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(p.resumeToken,r)),s=s.insert(y,S),function(U,L,X){return U.resumeToken.approximateByteSize()===0||L.snapshotVersion.toMicroseconds()-U.snapshotVersion.toMicroseconds()>=3e8?!0:X.addedDocuments.size+X.modifiedDocuments.size+X.removedDocuments.size>0}(b,S,p)&&l.push(t.Ur.updateTargetData(o,S))});let u=Zt(),d=te();if(e.documentUpdates.forEach(p=>{e.resolvedLimboDocuments.has(p)&&l.push(t.persistence.referenceDelegate.updateLimboDocument(o,p))}),l.push(S_(o,a,e.documentUpdates).next(p=>{u=p.Ps,d=p.Is})),!r.isEqual(W.min())){const p=t.Ur.getLastRemoteSnapshotVersion(o).next(y=>t.Ur.setTargetsMetadata(o,o.currentSequenceNumber,r));l.push(p)}return P.waitFor(l).next(()=>a.apply(o)).next(()=>t.localDocuments.getLocalViewOfDocuments(o,u,d)).next(()=>u)}).then(o=>(t.os=s,o))}function S_(n,e,t){let r=te(),s=te();return t.forEach(o=>r=r.add(o)),e.getEntries(n,r).next(o=>{let a=Zt();return t.forEach((l,u)=>{const d=o.get(l);u.isFoundDocument()!==d.isFoundDocument()&&(s=s.add(l)),u.isNoDocument()&&u.version.isEqual(W.min())?(e.removeEntry(l,u.readTime),a=a.insert(l,u)):!d.isValidDocument()||u.version.compareTo(d.version)>0||u.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(u),a=a.insert(l,u)):F("LocalStore","Ignoring outdated watch update for ",l,". Current version:",d.version," Watch version:",u.version)}),{Ps:a,Is:s}})}function R_(n,e){const t=Q(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function C_(n,e){const t=Q(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.Ur.getTargetData(r,e).next(o=>o?(s=o,P.resolve(s)):t.Ur.allocateTargetId(r).next(a=>(s=new fn(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.Ur.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.os.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.os=t.os.insert(r.targetId,r),t._s.set(e,r.targetId)),r})}async function Bo(n,e,t){const r=Q(n),s=r.os.get(e),o=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",o,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!bs(a))throw a;F("LocalStore",`Failed to update sequence numbers for target ${e}: ${a}`)}r.os=r.os.remove(e),r._s.delete(s.target)}function nl(n,e,t){const r=Q(n);let s=W.min(),o=te();return r.persistence.runTransaction("Execute query","readwrite",a=>function(u,d,p){const y=Q(u),b=y._s.get(p);return b!==void 0?P.resolve(y.os.get(b)):y.Ur.getTargetData(d,p)}(r,a,kt(e)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(a,l.targetId).next(u=>{o=u})}).next(()=>r.ss.getDocumentsMatchingQuery(a,e,t?s:W.min(),t?o:te())).next(l=>(k_(r,vg(e),l),{documents:l,Ts:o})))}function k_(n,e,t){let r=n.us.get(e)||W.min();t.forEach((s,o)=>{o.readTime.compareTo(r)>0&&(r=o.readTime)}),n.us.set(e,r)}class rl{constructor(){this.activeTargetIds=Ag()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class P_{constructor(){this.so=new rl,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,r){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new rl,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L_{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sl{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){F("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){F("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ii=null;function yo(){return ii===null?ii=function(){return 268435456+Math.round(2147483648*Math.random())}():ii++,"0x"+ii.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const x_={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D_{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xe="WebChannelConnection";class V_ extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const r=t.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),o=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+t.host,this.vo=`projects/${s}/databases/${o}`,this.Co=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${o}`}get Fo(){return!1}Mo(t,r,s,o,a){const l=yo(),u=this.xo(t,r.toUriEncodedString());F("RestConnection",`Sending RPC '${t}' ${l}:`,u,s);const d={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(d,o,a),this.No(t,u,d,s).then(p=>(F("RestConnection",`Received RPC '${t}' ${l}: `,p),p),p=>{throw br("RestConnection",`RPC '${t}' ${l} failed with error: `,p,"url: ",u,"request:",s),p})}Lo(t,r,s,o,a,l){return this.Mo(t,r,s,o,a)}Oo(t,r,s){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Vr}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((o,a)=>t[a]=o),s&&s.headers.forEach((o,a)=>t[a]=o)}xo(t,r){const s=x_[t];return`${this.Do}/v1/${r}:${s}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,r,s){const o=yo();return new Promise((a,l)=>{const u=new hu;u.setWithCredentials(!0),u.listenOnce(du.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case ui.NO_ERROR:const p=u.getResponseJson();F(Xe,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(p)),a(p);break;case ui.TIMEOUT:F(Xe,`RPC '${e}' ${o} timed out`),l(new j(k.DEADLINE_EXCEEDED,"Request time out"));break;case ui.HTTP_ERROR:const y=u.getStatus();if(F(Xe,`RPC '${e}' ${o} failed with status:`,y,"response text:",u.getResponseText()),y>0){let b=u.getResponseJson();Array.isArray(b)&&(b=b[0]);const S=b==null?void 0:b.error;if(S&&S.status&&S.message){const x=function(L){const X=L.toLowerCase().replace(/_/g,"-");return Object.values(k).indexOf(X)>=0?X:k.UNKNOWN}(S.status);l(new j(x,S.message))}else l(new j(k.UNKNOWN,"Server responded with status "+u.getStatus()))}else l(new j(k.UNAVAILABLE,"Connection failed."));break;default:G()}}finally{F(Xe,`RPC '${e}' ${o} completed.`)}});const d=JSON.stringify(s);F(Xe,`RPC '${e}' ${o} sending request:`,s),u.send(t,"POST",d,r,15)})}Bo(e,t,r){const s=yo(),o=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=mu(),l=pu(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(u.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Oo(u.initMessageHeaders,t,r),u.encodeInitMessageHeaders=!0;const p=o.join("");F(Xe,`Creating RPC '${e}' stream ${s}: ${p}`,u);const y=a.createWebChannel(p,u);let b=!1,S=!1;const x=new D_({Io:L=>{S?F(Xe,`Not sending because RPC '${e}' stream ${s} is closed:`,L):(b||(F(Xe,`Opening RPC '${e}' stream ${s} transport.`),y.open(),b=!0),F(Xe,`RPC '${e}' stream ${s} sending:`,L),y.send(L))},To:()=>y.close()}),U=(L,X,O)=>{L.listen(X,re=>{try{O(re)}catch(be){setTimeout(()=>{throw be},0)}})};return U(y,Zr.EventType.OPEN,()=>{S||(F(Xe,`RPC '${e}' stream ${s} transport opened.`),x.yo())}),U(y,Zr.EventType.CLOSE,()=>{S||(S=!0,F(Xe,`RPC '${e}' stream ${s} transport closed`),x.So())}),U(y,Zr.EventType.ERROR,L=>{S||(S=!0,br(Xe,`RPC '${e}' stream ${s} transport errored:`,L),x.So(new j(k.UNAVAILABLE,"The operation could not be completed")))}),U(y,Zr.EventType.MESSAGE,L=>{var X;if(!S){const O=L.data[0];me(!!O);const re=O,be=re.error||((X=re[0])===null||X===void 0?void 0:X.error);if(be){F(Xe,`RPC '${e}' stream ${s} received error:`,be);const Ne=be.status;let we=function(_){const E=De[_];if(E!==void 0)return Bu(E)}(Ne),I=be.message;we===void 0&&(we=k.INTERNAL,I="Unknown error status: "+Ne+" with message "+be.message),S=!0,x.So(new j(we,I)),y.close()}else F(Xe,`RPC '${e}' stream ${s} received:`,O),x.bo(O)}}),U(l,fu.STAT_EVENT,L=>{L.stat===Po.PROXY?F(Xe,`RPC '${e}' stream ${s} detected buffering proxy`):L.stat===Po.NOPROXY&&F(Xe,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{x.wo()},0),x}}function vo(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $i(n){return new zg(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xu{constructor(e,t,r=1e3,s=1.5,o=6e4){this.ui=e,this.timerId=t,this.ko=r,this.qo=s,this.Qo=o,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),s=Math.max(0,t-r);s>0&&F("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zu{constructor(e,t,r,s,o,a,l,u){this.ui=e,this.Ho=r,this.Jo=s,this.connection=o,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new Xu(e,t)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():t&&t.code===k.RESOURCE_EXHAUSTED?(Xt(t.toString()),Xt("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===k.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.Yo===t&&this.P_(r,s)},r=>{e(()=>{const s=new j(k.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(s)})})}P_(e,t){const r=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(s=>{r(()=>this.I_(s))}),this.stream.onMessage(s=>{r(()=>++this.e_==1?this.E_(s):this.onNext(s))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return F("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget(()=>this.Yo===e?t():(F("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class N_ extends Zu{constructor(e,t,r,s,o,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=o}T_(e,t){return this.connection.Bo("Listen",e,t)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const t=Kg(this.serializer,e),r=function(o){if(!("targetChange"in o))return W.min();const a=o.targetChange;return a.targetIds&&a.targetIds.length?W.min():a.readTime?Pt(a.readTime):W.min()}(e);return this.listener.d_(t,r)}A_(e){const t={};t.database=Fo(this.serializer),t.addTarget=function(o,a){let l;const u=a.target;if(l=Vo(u)?{documents:Jg(o,u)}:{query:Yg(o,u)._t},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=$u(o,a.resumeToken);const d=Oo(o,a.expectedCount);d!==null&&(l.expectedCount=d)}else if(a.snapshotVersion.compareTo(W.min())>0){l.readTime=Si(o,a.snapshotVersion.toTimestamp());const d=Oo(o,a.expectedCount);d!==null&&(l.expectedCount=d)}return l}(this.serializer,e);const r=Zg(this.serializer,e);r&&(t.labels=r),this.a_(t)}R_(e){const t={};t.database=Fo(this.serializer),t.removeTarget=e,this.a_(t)}}class O_ extends Zu{constructor(e,t,r,s,o,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=o}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,t){return this.connection.Bo("Write",e,t)}E_(e){return me(!!e.streamToken),this.lastStreamToken=e.streamToken,me(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){me(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const t=Qg(e.writeResults,e.commitTime),r=Pt(e.commitTime);return this.listener.g_(r,t)}p_(){const e={};e.database=Fo(this.serializer),this.a_(e)}m_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>Wg(this.serializer,r))};this.a_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M_ extends class{}{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.y_=!1}w_(){if(this.y_)throw new j(k.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,r,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.Mo(e,Mo(t,r),s,o,a)).catch(o=>{throw o.name==="FirebaseError"?(o.code===k.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new j(k.UNKNOWN,o.toString())})}Lo(e,t,r,s,o){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,l])=>this.connection.Lo(e,Mo(t,r),s,a,l,o)).catch(a=>{throw a.name==="FirebaseError"?(a.code===k.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new j(k.UNKNOWN,a.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class U_{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(Xt(t),this.D_=!1):F("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F_{constructor(e,t,r,s,o){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=o,this.k_._o(a=>{r.enqueueAndForget(async()=>{rr(this)&&(F("RemoteStore","Restarting streams for network reachability change."),await async function(u){const d=Q(u);d.L_.add(4),await Rs(d),d.q_.set("Unknown"),d.L_.delete(4),await zi(d)}(this))})}),this.q_=new U_(r,s)}}async function zi(n){if(rr(n))for(const e of n.B_)await e(!0)}async function Rs(n){for(const e of n.B_)await e(!1)}function eh(n,e){const t=Q(n);t.N_.has(e.targetId)||(t.N_.set(e.targetId,e),Ta(t)?Ia(t):Or(t).r_()&&Ea(t,e))}function wa(n,e){const t=Q(n),r=Or(t);t.N_.delete(e),r.r_()&&th(t,e),t.N_.size===0&&(r.r_()?r.o_():rr(t)&&t.q_.set("Unknown"))}function Ea(n,e){if(n.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(W.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Or(n).A_(e)}function th(n,e){n.Q_.xe(e),Or(n).R_(e)}function Ia(n){n.Q_=new Bg({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>n.N_.get(e)||null,tt:()=>n.datastore.serializer.databaseId}),Or(n).start(),n.q_.v_()}function Ta(n){return rr(n)&&!Or(n).n_()&&n.N_.size>0}function rr(n){return Q(n).L_.size===0}function nh(n){n.Q_=void 0}async function B_(n){n.q_.set("Online")}async function q_(n){n.N_.forEach((e,t)=>{Ea(n,e)})}async function j_(n,e){nh(n),Ta(n)?(n.q_.M_(e),Ia(n)):n.q_.set("Unknown")}async function $_(n,e,t){if(n.q_.set("Online"),e instanceof ju&&e.state===2&&e.cause)try{await async function(s,o){const a=o.cause;for(const l of o.targetIds)s.N_.has(l)&&(await s.remoteSyncer.rejectListen(l,a),s.N_.delete(l),s.Q_.removeTarget(l))}(n,e)}catch(r){F("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Ri(n,r)}else if(e instanceof fi?n.Q_.Ke(e):e instanceof qu?n.Q_.He(e):n.Q_.We(e),!t.isEqual(W.min()))try{const r=await Yu(n.localStore);t.compareTo(r)>=0&&await function(o,a){const l=o.Q_.rt(a);return l.targetChanges.forEach((u,d)=>{if(u.resumeToken.approximateByteSize()>0){const p=o.N_.get(d);p&&o.N_.set(d,p.withResumeToken(u.resumeToken,a))}}),l.targetMismatches.forEach((u,d)=>{const p=o.N_.get(u);if(!p)return;o.N_.set(u,p.withResumeToken(Qe.EMPTY_BYTE_STRING,p.snapshotVersion)),th(o,u);const y=new fn(p.target,u,d,p.sequenceNumber);Ea(o,y)}),o.remoteSyncer.applyRemoteEvent(l)}(n,t)}catch(r){F("RemoteStore","Failed to raise snapshot:",r),await Ri(n,r)}}async function Ri(n,e,t){if(!bs(e))throw e;n.L_.add(1),await Rs(n),n.q_.set("Offline"),t||(t=()=>Yu(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{F("RemoteStore","Retrying IndexedDB access"),await t(),n.L_.delete(1),await zi(n)})}function rh(n,e){return e().catch(t=>Ri(n,t,e))}async function Hi(n){const e=Q(n),t=In(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;z_(e);)try{const s=await R_(e.localStore,r);if(s===null){e.O_.length===0&&t.o_();break}r=s.batchId,H_(e,s)}catch(s){await Ri(e,s)}sh(e)&&ih(e)}function z_(n){return rr(n)&&n.O_.length<10}function H_(n,e){n.O_.push(e);const t=In(n);t.r_()&&t.V_&&t.m_(e.mutations)}function sh(n){return rr(n)&&!In(n).n_()&&n.O_.length>0}function ih(n){In(n).start()}async function G_(n){In(n).p_()}async function K_(n){const e=In(n);for(const t of n.O_)e.m_(t.mutations)}async function W_(n,e,t){const r=n.O_.shift(),s=pa.from(r,e,t);await rh(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await Hi(n)}async function Q_(n,e){e&&In(n).V_&&await async function(r,s){if(function(a){return Mg(a)&&a!==k.ABORTED}(s.code)){const o=r.O_.shift();In(r).s_(),await rh(r,()=>r.remoteSyncer.rejectFailedWrite(o.batchId,s)),await Hi(r)}}(n,e),sh(n)&&ih(n)}async function il(n,e){const t=Q(n);t.asyncQueue.verifyOperationInProgress(),F("RemoteStore","RemoteStore received new credentials");const r=rr(t);t.L_.add(3),await Rs(t),r&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await zi(t)}async function J_(n,e){const t=Q(n);e?(t.L_.delete(2),await zi(t)):e||(t.L_.add(2),await Rs(t),t.q_.set("Unknown"))}function Or(n){return n.K_||(n.K_=function(t,r,s){const o=Q(t);return o.w_(),new N_(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)}(n.datastore,n.asyncQueue,{Eo:B_.bind(null,n),Ro:q_.bind(null,n),mo:j_.bind(null,n),d_:$_.bind(null,n)}),n.B_.push(async e=>{e?(n.K_.s_(),Ta(n)?Ia(n):n.q_.set("Unknown")):(await n.K_.stop(),nh(n))})),n.K_}function In(n){return n.U_||(n.U_=function(t,r,s){const o=Q(t);return o.w_(),new O_(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)}(n.datastore,n.asyncQueue,{Eo:()=>Promise.resolve(),Ro:G_.bind(null,n),mo:Q_.bind(null,n),f_:K_.bind(null,n),g_:W_.bind(null,n)}),n.B_.push(async e=>{e?(n.U_.s_(),await Hi(n)):(await n.U_.stop(),n.O_.length>0&&(F("RemoteStore",`Stopping write stream with ${n.O_.length} pending writes`),n.O_=[]))})),n.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ba{constructor(e,t,r,s,o){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=o,this.deferred=new _n,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,o){const a=Date.now()+r,l=new ba(e,t,a,s,o);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new j(k.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Aa(n,e){if(Xt("AsyncQueue",`${e}: ${n}`),bs(n))return new j(k.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Er{constructor(e){this.comparator=e?(t,r)=>e(t,r)||$.comparator(t.key,r.key):(t,r)=>$.comparator(t.key,r.key),this.keyedMap=es(),this.sortedSet=new ke(this.comparator)}static emptySet(e){return new Er(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Er)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,o=r.getNext().key;if(!s.isEqual(o))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Er;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ol{constructor(){this.W_=new ke($.comparator)}track(e){const t=e.doc.key,r=this.W_.get(t);r?e.type!==0&&r.type===3?this.W_=this.W_.insert(t,e):e.type===3&&r.type!==1?this.W_=this.W_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.W_=this.W_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.W_=this.W_.remove(t):e.type===1&&r.type===2?this.W_=this.W_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):G():this.W_=this.W_.insert(t,e)}G_(){const e=[];return this.W_.inorderTraversal((t,r)=>{e.push(r)}),e}}class Pr{constructor(e,t,r,s,o,a,l,u,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=o,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=u,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,s,o){const a=[];return t.forEach(l=>{a.push({type:0,doc:l})}),new Pr(e,t,Er.emptySet(t),a,r,s,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Ui(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y_{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class X_{constructor(){this.queries=al(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,r){const s=Q(t),o=s.queries;s.queries=al(),o.forEach((a,l)=>{for(const u of l.j_)u.onError(r)})})(this,new j(k.ABORTED,"Firestore shutting down"))}}function al(){return new Nr(n=>Ru(n),Ui)}async function oh(n,e){const t=Q(n);let r=3;const s=e.query;let o=t.queries.get(s);o?!o.H_()&&e.J_()&&(r=2):(o=new Y_,r=e.J_()?0:1);try{switch(r){case 0:o.z_=await t.onListen(s,!0);break;case 1:o.z_=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const l=Aa(a,`Initialization of query '${pr(e.query)}' failed`);return void e.onError(l)}t.queries.set(s,o),o.j_.push(e),e.Z_(t.onlineState),o.z_&&e.X_(o.z_)&&Sa(t)}async function ah(n,e){const t=Q(n),r=e.query;let s=3;const o=t.queries.get(r);if(o){const a=o.j_.indexOf(e);a>=0&&(o.j_.splice(a,1),o.j_.length===0?s=e.J_()?0:1:!o.H_()&&e.J_()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function Z_(n,e){const t=Q(n);let r=!1;for(const s of e){const o=s.query,a=t.queries.get(o);if(a){for(const l of a.j_)l.X_(s)&&(r=!0);a.z_=s}}r&&Sa(t)}function ey(n,e,t){const r=Q(n),s=r.queries.get(e);if(s)for(const o of s.j_)o.onError(t);r.queries.delete(e)}function Sa(n){n.Y_.forEach(e=>{e.next()})}var qo,cl;(cl=qo||(qo={})).ea="default",cl.Cache="cache";class ch{constructor(e,t,r){this.query=e,this.ta=t,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Pr(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.na?this.ia(e)&&(this.ta.next(e),t=!0):this.sa(e,this.onlineState)&&(this.oa(e),t=!0),this.ra=e,t}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let t=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),t=!0),t}sa(e,t){if(!e.fromCache||!this.J_())return!0;const r=t!=="Offline";return(!this.options._a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const t=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}oa(e){e=Pr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==qo.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lh{constructor(e){this.key=e}}class uh{constructor(e){this.key=e}}class ty{constructor(e,t){this.query=e,this.Ta=t,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=te(),this.mutatedKeys=te(),this.Aa=Cu(e),this.Ra=new Er(this.Aa)}get Va(){return this.Ta}ma(e,t){const r=t?t.fa:new ol,s=t?t.Ra:this.Ra;let o=t?t.mutatedKeys:this.mutatedKeys,a=s,l=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,d=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((p,y)=>{const b=s.get(p),S=Fi(this.query,y)?y:null,x=!!b&&this.mutatedKeys.has(b.key),U=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations);let L=!1;b&&S?b.data.isEqual(S.data)?x!==U&&(r.track({type:3,doc:S}),L=!0):this.ga(b,S)||(r.track({type:2,doc:S}),L=!0,(u&&this.Aa(S,u)>0||d&&this.Aa(S,d)<0)&&(l=!0)):!b&&S?(r.track({type:0,doc:S}),L=!0):b&&!S&&(r.track({type:1,doc:b}),L=!0,(u||d)&&(l=!0)),L&&(S?(a=a.add(S),o=U?o.add(p):o.delete(p)):(a=a.delete(p),o=o.delete(p)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const p=this.query.limitType==="F"?a.last():a.first();a=a.delete(p.key),o=o.delete(p.key),r.track({type:1,doc:p})}return{Ra:a,fa:r,ns:l,mutatedKeys:o}}ga(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const o=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const a=e.fa.G_();a.sort((p,y)=>function(S,x){const U=L=>{switch(L){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return G()}};return U(S)-U(x)}(p.type,y.type)||this.Aa(p.doc,y.doc)),this.pa(r),s=s!=null&&s;const l=t&&!s?this.ya():[],u=this.da.size===0&&this.current&&!s?1:0,d=u!==this.Ea;return this.Ea=u,a.length!==0||d?{snapshot:new Pr(this.query,e.Ra,o,a,e.mutatedKeys,u===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:l}:{wa:l}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new ol,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(t=>this.Ta=this.Ta.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ta=this.Ta.delete(t)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=te(),this.Ra.forEach(r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))});const t=[];return e.forEach(r=>{this.da.has(r)||t.push(new uh(r))}),this.da.forEach(r=>{e.has(r)||t.push(new lh(r))}),t}ba(e){this.Ta=e.Ts,this.da=te();const t=this.ma(e.documents);return this.applyChanges(t,!0)}Da(){return Pr.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class ny{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class ry{constructor(e){this.key=e,this.va=!1}}class sy{constructor(e,t,r,s,o,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=o,this.maxConcurrentLimboResolutions=a,this.Ca={},this.Fa=new Nr(l=>Ru(l),Ui),this.Ma=new Map,this.xa=new Set,this.Oa=new ke($.comparator),this.Na=new Map,this.La=new _a,this.Ba={},this.ka=new Map,this.qa=kr.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function iy(n,e,t=!0){const r=gh(n);let s;const o=r.Fa.get(e);return o?(r.sharedClientState.addLocalQueryTarget(o.targetId),s=o.view.Da()):s=await hh(r,e,t,!0),s}async function oy(n,e){const t=gh(n);await hh(t,e,!0,!1)}async function hh(n,e,t,r){const s=await C_(n.localStore,kt(e)),o=s.targetId,a=n.sharedClientState.addLocalQueryTarget(o,t);let l;return r&&(l=await ay(n,e,o,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&eh(n.remoteStore,s),l}async function ay(n,e,t,r,s){n.Ka=(y,b,S)=>async function(U,L,X,O){let re=L.view.ma(X);re.ns&&(re=await nl(U.localStore,L.query,!1).then(({documents:I})=>L.view.ma(I,re)));const be=O&&O.targetChanges.get(L.targetId),Ne=O&&O.targetMismatches.get(L.targetId)!=null,we=L.view.applyChanges(re,U.isPrimaryClient,be,Ne);return ul(U,L.targetId,we.wa),we.snapshot}(n,y,b,S);const o=await nl(n.localStore,e,!0),a=new ty(e,o.Ts),l=a.ma(o.documents),u=Ss.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),d=a.applyChanges(l,n.isPrimaryClient,u);ul(n,t,d.wa);const p=new ny(e,t,a);return n.Fa.set(e,p),n.Ma.has(t)?n.Ma.get(t).push(e):n.Ma.set(t,[e]),d.snapshot}async function cy(n,e,t){const r=Q(n),s=r.Fa.get(e),o=r.Ma.get(s.targetId);if(o.length>1)return r.Ma.set(s.targetId,o.filter(a=>!Ui(a,e))),void r.Fa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Bo(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&wa(r.remoteStore,s.targetId),jo(r,s.targetId)}).catch(Ts)):(jo(r,s.targetId),await Bo(r.localStore,s.targetId,!0))}async function ly(n,e){const t=Q(n),r=t.Fa.get(e),s=t.Ma.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),wa(t.remoteStore,r.targetId))}async function uy(n,e,t){const r=_y(n);try{const s=await function(a,l){const u=Q(a),d=Be.now(),p=l.reduce((S,x)=>S.add(x.key),te());let y,b;return u.persistence.runTransaction("Locally write mutations","readwrite",S=>{let x=Zt(),U=te();return u.cs.getEntries(S,p).next(L=>{x=L,x.forEach((X,O)=>{O.isValidDocument()||(U=U.add(X))})}).next(()=>u.localDocuments.getOverlayedDocuments(S,x)).next(L=>{y=L;const X=[];for(const O of l){const re=xg(O,y.get(O.key).overlayedDocument);re!=null&&X.push(new bn(O.key,re,wu(re.value.mapValue),wt.exists(!0)))}return u.mutationQueue.addMutationBatch(S,d,X,l)}).next(L=>{b=L;const X=L.applyToLocalDocumentSet(y,U);return u.documentOverlayCache.saveOverlays(S,L.batchId,X)})}).then(()=>({batchId:b.batchId,changes:Pu(y)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(a,l,u){let d=a.Ba[a.currentUser.toKey()];d||(d=new ke(le)),d=d.insert(l,u),a.Ba[a.currentUser.toKey()]=d}(r,s.batchId,t),await Cs(r,s.changes),await Hi(r.remoteStore)}catch(s){const o=Aa(s,"Failed to persist write");t.reject(o)}}async function dh(n,e){const t=Q(n);try{const r=await A_(t.localStore,e);e.targetChanges.forEach((s,o)=>{const a=t.Na.get(o);a&&(me(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?a.va=!0:s.modifiedDocuments.size>0?me(a.va):s.removedDocuments.size>0&&(me(a.va),a.va=!1))}),await Cs(t,r,e)}catch(r){await Ts(r)}}function ll(n,e,t){const r=Q(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Fa.forEach((o,a)=>{const l=a.view.Z_(e);l.snapshot&&s.push(l.snapshot)}),function(a,l){const u=Q(a);u.onlineState=l;let d=!1;u.queries.forEach((p,y)=>{for(const b of y.j_)b.Z_(l)&&(d=!0)}),d&&Sa(u)}(r.eventManager,e),s.length&&r.Ca.d_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function hy(n,e,t){const r=Q(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Na.get(e),o=s&&s.key;if(o){let a=new ke($.comparator);a=a.insert(o,et.newNoDocument(o,W.min()));const l=te().add(o),u=new ji(W.min(),new Map,new ke(le),a,l);await dh(r,u),r.Oa=r.Oa.remove(o),r.Na.delete(e),Ra(r)}else await Bo(r.localStore,e,!1).then(()=>jo(r,e,t)).catch(Ts)}async function dy(n,e){const t=Q(n),r=e.batch.batchId;try{const s=await b_(t.localStore,e);ph(t,r,null),fh(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Cs(t,s)}catch(s){await Ts(s)}}async function fy(n,e,t){const r=Q(n);try{const s=await function(a,l){const u=Q(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let p;return u.mutationQueue.lookupMutationBatch(d,l).next(y=>(me(y!==null),p=y.keys(),u.mutationQueue.removeMutationBatch(d,y))).next(()=>u.mutationQueue.performConsistencyCheck(d)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(d,p,l)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,p)).next(()=>u.localDocuments.getDocuments(d,p))})}(r.localStore,e);ph(r,e,t),fh(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Cs(r,s)}catch(s){await Ts(s)}}function fh(n,e){(n.ka.get(e)||[]).forEach(t=>{t.resolve()}),n.ka.delete(e)}function ph(n,e,t){const r=Q(n);let s=r.Ba[r.currentUser.toKey()];if(s){const o=s.get(e);o&&(t?o.reject(t):o.resolve(),s=s.remove(e)),r.Ba[r.currentUser.toKey()]=s}}function jo(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Ma.get(e))n.Fa.delete(r),t&&n.Ca.$a(r,t);n.Ma.delete(e),n.isPrimaryClient&&n.La.gr(e).forEach(r=>{n.La.containsKey(r)||mh(n,r)})}function mh(n,e){n.xa.delete(e.path.canonicalString());const t=n.Oa.get(e);t!==null&&(wa(n.remoteStore,t),n.Oa=n.Oa.remove(e),n.Na.delete(t),Ra(n))}function ul(n,e,t){for(const r of t)r instanceof lh?(n.La.addReference(r.key,e),py(n,r)):r instanceof uh?(F("SyncEngine","Document no longer in limbo: "+r.key),n.La.removeReference(r.key,e),n.La.containsKey(r.key)||mh(n,r.key)):G()}function py(n,e){const t=e.key,r=t.path.canonicalString();n.Oa.get(t)||n.xa.has(r)||(F("SyncEngine","New document in limbo: "+t),n.xa.add(r),Ra(n))}function Ra(n){for(;n.xa.size>0&&n.Oa.size<n.maxConcurrentLimboResolutions;){const e=n.xa.values().next().value;n.xa.delete(e);const t=new $(Se.fromString(e)),r=n.qa.next();n.Na.set(r,new ry(t)),n.Oa=n.Oa.insert(t,r),eh(n.remoteStore,new fn(kt(Mi(t.path)),r,"TargetPurposeLimboResolution",oa.oe))}}async function Cs(n,e,t){const r=Q(n),s=[],o=[],a=[];r.Fa.isEmpty()||(r.Fa.forEach((l,u)=>{a.push(r.Ka(u,e,t).then(d=>{var p;if((d||t)&&r.isPrimaryClient){const y=d?!d.fromCache:(p=t==null?void 0:t.targetChanges.get(u.targetId))===null||p===void 0?void 0:p.current;r.sharedClientState.updateQueryState(u.targetId,y?"current":"not-current")}if(d){s.push(d);const y=va.Wi(u.targetId,d);o.push(y)}}))}),await Promise.all(a),r.Ca.d_(s),await async function(u,d){const p=Q(u);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",y=>P.forEach(d,b=>P.forEach(b.$i,S=>p.persistence.referenceDelegate.addReference(y,b.targetId,S)).next(()=>P.forEach(b.Ui,S=>p.persistence.referenceDelegate.removeReference(y,b.targetId,S)))))}catch(y){if(!bs(y))throw y;F("LocalStore","Failed to update sequence numbers: "+y)}for(const y of d){const b=y.targetId;if(!y.fromCache){const S=p.os.get(b),x=S.snapshotVersion,U=S.withLastLimboFreeSnapshotVersion(x);p.os=p.os.insert(b,U)}}}(r.localStore,o))}async function my(n,e){const t=Q(n);if(!t.currentUser.isEqual(e)){F("SyncEngine","User change. New user:",e.toKey());const r=await Ju(t.localStore,e);t.currentUser=e,function(o,a){o.ka.forEach(l=>{l.forEach(u=>{u.reject(new j(k.CANCELLED,a))})}),o.ka.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Cs(t,r.hs)}}function gy(n,e){const t=Q(n),r=t.Na.get(e);if(r&&r.va)return te().add(r.key);{let s=te();const o=t.Ma.get(e);if(!o)return s;for(const a of o){const l=t.Fa.get(a);s=s.unionWith(l.view.Va)}return s}}function gh(n){const e=Q(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=dh.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=gy.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=hy.bind(null,e),e.Ca.d_=Z_.bind(null,e.eventManager),e.Ca.$a=ey.bind(null,e.eventManager),e}function _y(n){const e=Q(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=dy.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=fy.bind(null,e),e}class Ci{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=$i(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return T_(this.persistence,new E_,e.initialUser,this.serializer)}Ga(e){return new y_(ya.Zr,this.serializer)}Wa(e){return new P_}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ci.provider={build:()=>new Ci};class $o{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>ll(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=my.bind(null,this.syncEngine),await J_(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new X_}()}createDatastore(e){const t=$i(e.databaseInfo.databaseId),r=function(o){return new V_(o)}(e.databaseInfo);return function(o,a,l,u){return new M_(o,a,l,u)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,o,a,l){return new F_(r,s,o,a,l)}(this.localStore,this.datastore,e.asyncQueue,t=>ll(this.syncEngine,t,0),function(){return sl.D()?new sl:new L_}())}createSyncEngine(e,t){return function(s,o,a,l,u,d,p){const y=new sy(s,o,a,l,u,d);return p&&(y.Qa=!0),y}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const o=Q(s);F("RemoteStore","RemoteStore shutting down."),o.L_.add(5),await Rs(o),o.k_.shutdown(),o.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}$o.provider={build:()=>new $o};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _h{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):Xt("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yy{constructor(e,t,r,s,o){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=Ze.UNAUTHENTICATED,this.clientId=_u.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,async a=>{F("FirestoreClient","Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(F("FirestoreClient","Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new _n;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Aa(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function wo(n,e){n.asyncQueue.verifyOperationInProgress(),F("FirestoreClient","Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await Ju(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function hl(n,e){n.asyncQueue.verifyOperationInProgress();const t=await vy(n);F("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>il(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>il(e.remoteStore,s)),n._onlineComponents=e}async function vy(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){F("FirestoreClient","Using user provided OfflineComponentProvider");try{await wo(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===k.FAILED_PRECONDITION||s.code===k.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;br("Error using user provided cache. Falling back to memory cache: "+t),await wo(n,new Ci)}}else F("FirestoreClient","Using default OfflineComponentProvider"),await wo(n,new Ci);return n._offlineComponents}async function yh(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(F("FirestoreClient","Using user provided OnlineComponentProvider"),await hl(n,n._uninitializedComponentsProvider._online)):(F("FirestoreClient","Using default OnlineComponentProvider"),await hl(n,new $o))),n._onlineComponents}function wy(n){return yh(n).then(e=>e.syncEngine)}async function zo(n){const e=await yh(n),t=e.eventManager;return t.onListen=iy.bind(null,e.syncEngine),t.onUnlisten=cy.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=oy.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=ly.bind(null,e.syncEngine),t}function Ey(n,e,t={}){const r=new _n;return n.asyncQueue.enqueueAndForget(async()=>function(o,a,l,u,d){const p=new _h({next:b=>{p.Za(),a.enqueueAndForget(()=>ah(o,y));const S=b.docs.has(l);!S&&b.fromCache?d.reject(new j(k.UNAVAILABLE,"Failed to get document because the client is offline.")):S&&b.fromCache&&u&&u.source==="server"?d.reject(new j(k.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(b)},error:b=>d.reject(b)}),y=new ch(Mi(l.path),p,{includeMetadataChanges:!0,_a:!0});return oh(o,y)}(await zo(n),n.asyncQueue,e,t,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vh(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dl=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wh(n,e,t){if(!t)throw new j(k.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function Iy(n,e,t,r){if(e===!0&&r===!0)throw new j(k.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function fl(n){if(!$.isDocumentKey(n))throw new j(k.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function pl(n){if($.isDocumentKey(n))throw new j(k.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Ca(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":G()}function Et(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new j(k.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Ca(n);throw new j(k.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ml{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new j(k.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new j(k.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Iy("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=vh((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new j(k.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new j(k.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new j(k.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Gi{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new ml({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new j(k.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new j(k.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new ml(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Bm;switch(r.type){case"firstParty":return new zm(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new j(k.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=dl.get(t);r&&(F("ComponentProvider","Removing Datastore"),dl.delete(t),r.terminate())}(this),Promise.resolve()}}function Ty(n,e,t,r={}){var s;const o=(n=Et(n,Gi))._getSettings(),a=`${e}:${t}`;if(o.host!=="firestore.googleapis.com"&&o.host!==a&&br("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},o),{host:a,ssl:!1})),r.mockUserToken){let l,u;if(typeof r.mockUserToken=="string")l=r.mockUserToken,u=Ze.MOCK_USER;else{l=zh(r.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const d=r.mockUserToken.sub||r.mockUserToken.user_id;if(!d)throw new j(k.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");u=new Ze(d)}n._authCredentials=new qm(new gu(l,u))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ki{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Ki(this.firestore,e,this._query)}}class rt{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new yn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new rt(this.firestore,e,this._key)}}class yn extends Ki{constructor(e,t,r){super(e,t,Mi(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new rt(this.firestore,null,new $(e))}withConverter(e){return new yn(this.firestore,e,this._path)}}function by(n,e,...t){if(n=Ve(n),wh("collection","path",e),n instanceof Gi){const r=Se.fromString(e,...t);return pl(r),new yn(n,null,r)}{if(!(n instanceof rt||n instanceof yn))throw new j(k.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Se.fromString(e,...t));return pl(r),new yn(n.firestore,null,r)}}function Ay(n,e,...t){if(n=Ve(n),arguments.length===1&&(e=_u.newId()),wh("doc","path",e),n instanceof Gi){const r=Se.fromString(e,...t);return fl(r),new rt(n,null,new $(r))}{if(!(n instanceof rt||n instanceof yn))throw new j(k.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Se.fromString(e,...t));return fl(r),new rt(n.firestore,n instanceof yn?n.converter:null,new $(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gl{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new Xu(this,"async_queue_retry"),this.Vu=()=>{const r=vo();r&&F("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const t=vo();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=vo();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const t=new _n;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!bs(e))throw e;F("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const t=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const s=function(a){let l=a.message||"";return a.stack&&(l=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),l}(r);throw Xt("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.du=!1,r))));return this.mu=t,t}enqueueAfterDelay(e,t,r){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const s=ba.createAndSchedule(this,e,t,r,o=>this.yu(o));return this.Tu.push(s),s}fu(){this.Eu&&G()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}function _l(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const o of r)if(o in s&&typeof s[o]=="function")return!0;return!1}(n,["next","error","complete"])}class tr extends Gi{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new gl,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new gl(e),this._firestoreClient=void 0,await e}}}function Sy(n,e){const t=typeof n=="object"?n:Rl(),r=typeof n=="string"?n:"(default)",s=Wo(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const o=jh("firestore");o&&Ty(s,...o)}return s}function ka(n){if(n._terminated)throw new j(k.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Ry(n),n._firestoreClient}function Ry(n){var e,t,r;const s=n._freezeSettings(),o=function(l,u,d,p){return new rg(l,u,d,p.host,p.ssl,p.experimentalForceLongPolling,p.experimentalAutoDetectLongPolling,vh(p.experimentalLongPollingOptions),p.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((t=s.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new yy(n._authCredentials,n._appCheckCredentials,n._queue,o,n._componentsProvider&&function(l){const u=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(u),_online:u}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lr{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Lr(Qe.fromBase64String(e))}catch(t){throw new j(k.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Lr(Qe.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wi{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new j(k.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ke(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ks{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pa{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new j(k.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new j(k.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return le(this._lat,e._lat)||le(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class La{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==s[o])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cy=/^__.*__$/;class ky{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new bn(e,this.data,this.fieldMask,t,this.fieldTransforms):new As(e,this.data,t,this.fieldTransforms)}}class Eh{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new bn(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Ih(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw G()}}class Qi{constructor(e,t,r,s,o,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,o===void 0&&this.vu(),this.fieldTransforms=o||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new Qi(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Fu({path:r,xu:!1});return s.Ou(e),s}Nu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Fu({path:r,xu:!1});return s.vu(),s}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return ki(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(Ih(this.Cu)&&Cy.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class Py{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||$i(e)}Qu(e,t,r,s=!1){return new Qi({Cu:e,methodName:t,qu:r,path:Ke.emptyPath(),xu:!1,ku:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Th(n){const e=n._freezeSettings(),t=$i(n._databaseId);return new Py(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Ly(n,e,t,r,s,o={}){const a=n.Qu(o.merge||o.mergeFields?2:0,e,t,s);Va("Data must be an object, but it was:",a,r);const l=bh(r,a);let u,d;if(o.merge)u=new dt(a.fieldMask),d=a.fieldTransforms;else if(o.mergeFields){const p=[];for(const y of o.mergeFields){const b=Ho(e,y,t);if(!a.contains(b))throw new j(k.INVALID_ARGUMENT,`Field '${b}' is specified in your field mask but missing from your input data.`);Sh(p,b)||p.push(b)}u=new dt(p),d=a.fieldTransforms.filter(y=>u.covers(y.field))}else u=null,d=a.fieldTransforms;return new ky(new it(l),u,d)}class Ji extends ks{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Ji}}function xy(n,e,t){return new Qi({Cu:3,qu:e.settings.qu,methodName:n._methodName,xu:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class xa extends ks{_toFieldTransform(e){return new Mu(e.path,new ms)}isEqual(e){return e instanceof xa}}class Da extends ks{constructor(e,t){super(e),this.Ku=t}_toFieldTransform(e){const t=xy(this,e,!0),r=this.Ku.map(o=>Ps(o,t)),s=new Cr(r);return new Mu(e.path,s)}isEqual(e){return e instanceof Da&&cs(this.Ku,e.Ku)}}function Dy(n,e,t,r){const s=n.Qu(1,e,t);Va("Data must be an object, but it was:",s,r);const o=[],a=it.empty();nr(r,(u,d)=>{const p=Na(e,u,t);d=Ve(d);const y=s.Nu(p);if(d instanceof Ji)o.push(p);else{const b=Ps(d,y);b!=null&&(o.push(p),a.set(p,b))}});const l=new dt(o);return new Eh(a,l,s.fieldTransforms)}function Vy(n,e,t,r,s,o){const a=n.Qu(1,e,t),l=[Ho(e,r,t)],u=[s];if(o.length%2!=0)throw new j(k.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let b=0;b<o.length;b+=2)l.push(Ho(e,o[b])),u.push(o[b+1]);const d=[],p=it.empty();for(let b=l.length-1;b>=0;--b)if(!Sh(d,l[b])){const S=l[b];let x=u[b];x=Ve(x);const U=a.Nu(S);if(x instanceof Ji)d.push(S);else{const L=Ps(x,U);L!=null&&(d.push(S),p.set(S,L))}}const y=new dt(d);return new Eh(p,y,a.fieldTransforms)}function Ps(n,e){if(Ah(n=Ve(n)))return Va("Unsupported field value:",e,n),bh(n,e);if(n instanceof ks)return function(r,s){if(!Ih(s.Cu))throw s.Bu(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Bu(`${r._methodName}() is not currently supported inside arrays`);const o=r._toFieldTransform(s);o&&s.fieldTransforms.push(o)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(r,s){const o=[];let a=0;for(const l of r){let u=Ps(l,s.Lu(a));u==null&&(u={nullValue:"NULL_VALUE"}),o.push(u),a++}return{arrayValue:{values:o}}}(n,e)}return function(r,s){if((r=Ve(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Sg(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const o=Be.fromDate(r);return{timestampValue:Si(s.serializer,o)}}if(r instanceof Be){const o=new Be(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Si(s.serializer,o)}}if(r instanceof Pa)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Lr)return{bytesValue:$u(s.serializer,r._byteString)};if(r instanceof rt){const o=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(o))throw s.Bu(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:ga(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof La)return function(a,l){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:a.toArray().map(u=>{if(typeof u!="number")throw l.Bu("VectorValues must only contain numeric values.");return da(l.serializer,u)})}}}}}}(r,s);throw s.Bu(`Unsupported field value: ${Ca(r)}`)}(n,e)}function bh(n,e){const t={};return yu(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):nr(n,(r,s)=>{const o=Ps(s,e.Mu(r));o!=null&&(t[r]=o)}),{mapValue:{fields:t}}}function Ah(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Be||n instanceof Pa||n instanceof Lr||n instanceof rt||n instanceof ks||n instanceof La)}function Va(n,e,t){if(!Ah(t)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(t)){const r=Ca(t);throw r==="an object"?e.Bu(n+" a custom object"):e.Bu(n+" "+r)}}function Ho(n,e,t){if((e=Ve(e))instanceof Wi)return e._internalPath;if(typeof e=="string")return Na(n,e);throw ki("Field path arguments must be of type string or ",n,!1,void 0,t)}const Ny=new RegExp("[~\\*/\\[\\]]");function Na(n,e,t){if(e.search(Ny)>=0)throw ki(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Wi(...e.split("."))._internalPath}catch{throw ki(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function ki(n,e,t,r,s){const o=r&&!r.isEmpty(),a=s!==void 0;let l=`Function ${e}() called with invalid data`;t&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(o||a)&&(u+=" (found",o&&(u+=` in field ${r}`),a&&(u+=` in document ${s}`),u+=")"),new j(k.INVALID_ARGUMENT,l+n+u)}function Sh(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rh{constructor(e,t,r,s,o){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new rt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Oy(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Ch("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class Oy extends Rh{data(){return super.data()}}function Ch(n,e){return typeof e=="string"?Na(n,e):e instanceof Wi?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function My(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new j(k.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Uy{convertValue(e,t="none"){switch(er(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Le(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Zn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw G()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return nr(e,(s,o)=>{r[s]=this.convertValue(o,t)}),r}convertVectorValue(e){var t,r,s;const o=(s=(r=(t=e.fields)===null||t===void 0?void 0:t.value.arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(a=>Le(a.doubleValue));return new La(o)}convertGeoPoint(e){return new Pa(Le(e.latitude),Le(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=ca(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(ds(e));default:return null}}convertTimestamp(e){const t=En(e);return new Be(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=Se.fromString(e);me(Qu(r));const s=new fs(r.get(1),r.get(3)),o=new $(r.popFirst(5));return s.isEqual(t)||Xt(`Document ${o} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fy(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ns{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class kh extends Rh{constructor(e,t,r,s,o,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=o}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new pi(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Ch("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class pi extends kh{data(e={}){return super.data(e)}}class By{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new ns(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new pi(this._firestore,this._userDataWriter,r.key,r,new ns(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new j(k.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,o){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(l=>{const u=new pi(s._firestore,s._userDataWriter,l.doc.key,l.doc,new ns(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(l=>o||l.type!==3).map(l=>{const u=new pi(s._firestore,s._userDataWriter,l.doc.key,l.doc,new ns(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let d=-1,p=-1;return l.type!==0&&(d=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),p=a.indexOf(l.doc.key)),{type:qy(l.type),doc:u,oldIndex:d,newIndex:p}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function qy(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return G()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jy(n){n=Et(n,rt);const e=Et(n.firestore,tr);return Ey(ka(e),n._key).then(t=>Lh(e,n,t))}class Ph extends Uy{constructor(e){super(),this.firestore=e}convertBytes(e){return new Lr(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new rt(this.firestore,null,t)}}function $y(n,e,t){n=Et(n,rt);const r=Et(n.firestore,tr),s=Fy(n.converter,e,t);return Oa(r,[Ly(Th(r),"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,wt.none())])}function zy(n,e,t,...r){n=Et(n,rt);const s=Et(n.firestore,tr),o=Th(s);let a;return a=typeof(e=Ve(e))=="string"||e instanceof Wi?Vy(o,"updateDoc",n._key,e,t,r):Dy(o,"updateDoc",n._key,e),Oa(s,[a.toMutation(n._key,wt.exists(!0))])}function Hy(n){return Oa(Et(n.firestore,tr),[new fa(n._key,wt.none())])}function Gy(n,...e){var t,r,s;n=Ve(n);let o={includeMetadataChanges:!1,source:"default"},a=0;typeof e[a]!="object"||_l(e[a])||(o=e[a],a++);const l={includeMetadataChanges:o.includeMetadataChanges,source:o.source};if(_l(e[a])){const y=e[a];e[a]=(t=y.next)===null||t===void 0?void 0:t.bind(y),e[a+1]=(r=y.error)===null||r===void 0?void 0:r.bind(y),e[a+2]=(s=y.complete)===null||s===void 0?void 0:s.bind(y)}let u,d,p;if(n instanceof rt)d=Et(n.firestore,tr),p=Mi(n._key.path),u={next:y=>{e[a]&&e[a](Lh(d,n,y))},error:e[a+1],complete:e[a+2]};else{const y=Et(n,Ki);d=Et(y.firestore,tr),p=y._query;const b=new Ph(d);u={next:S=>{e[a]&&e[a](new By(d,b,y,S))},error:e[a+1],complete:e[a+2]},My(n._query)}return function(b,S,x,U){const L=new _h(U),X=new ch(S,L,x);return b.asyncQueue.enqueueAndForget(async()=>oh(await zo(b),X)),()=>{L.Za(),b.asyncQueue.enqueueAndForget(async()=>ah(await zo(b),X))}}(ka(d),p,l,u)}function Oa(n,e){return function(r,s){const o=new _n;return r.asyncQueue.enqueueAndForget(async()=>uy(await wy(r),s,o)),o.promise}(ka(n),e)}function Lh(n,e,t){const r=t.docs.get(e._key),s=new Ph(n);return new kh(n,s,e._key,r,new ns(t.hasPendingWrites,t.fromCache),e.converter)}function Ky(){return new xa("serverTimestamp")}function Wy(...n){return new Da("arrayUnion",n)}(function(e,t=!0){(function(s){Vr=s})(xr),Ir(new Jn("firestore",(r,{instanceIdentifier:s,options:o})=>{const a=r.getProvider("app").getImmediate(),l=new tr(new jm(r.getProvider("auth-internal")),new Gm(r.getProvider("app-check-internal")),function(d,p){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new j(k.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new fs(d.options.projectId,p)}(a,s),a);return o=Object.assign({useFetchStreams:t},o),l._setSettings(o),l},"PUBLIC").setMultipleInstances(!0)),gn(Nc,"4.7.3",e),gn(Nc,"4.7.3","esm2017")})();class Qy{constructor(e,t,r,s){this.db=e.db,this.doc=e.doc,this.getDoc=e.getDoc,this.updateDoc=e.updateDoc,this.onSnapshot=e.onSnapshot,this.CLASS_COLLECTION_PATH=e.CLASS_COLLECTION_PATH,this.classCode=t,this.userId=r,this.isPresenter=s,this.classData=null,this.localStream=null,s?this.peerConnections={}:this.peerConnection=null,this.signalingUnsubscribe=null,this.rtcConfig={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun1.l.google.com:19302"},{urls:"stun:stun2.l.google.com:19302"},{urls:"turn:relay1.expressturn.com:3480?transport=udp",username:"00000002079503648",credential:"R0TBdLBNcsSyrioMyVk5bJebG16I="},{urls:"turn:relay1.expressturn.com:3480?transport=tcp",username:"00000002079503648",credential:"R0TBdLBNcsSyrioMyVk5bJebG16I="}]}}updateClassData(e){this.classData=e}async startScreenShare(){if(!this.isPresenter)throw new Error("Only presenter can start screen sharing");try{this.localStream=await navigator.mediaDevices.getDisplayMedia({video:{cursor:"always",displaySurface:"monitor"},audio:!1});const e=this.classData.participantList.filter(r=>!r.isPresenter&&r.isOnline);console.log(`Creating peer connections for ${e.length} participants`);for(const r of e)await this.createPeerConnectionForParticipant(r.id);const t=this.doc(this.db,this.CLASS_COLLECTION_PATH,this.classCode);return await this.updateDoc(t,{"sessionState.screenShareActive":!0,"sessionState.screenShareOffer":{type:"offer",sdp:"placeholder"},"sessionState.screenShareIceCandidates":{presenter:[],participants:{}}}),this.startSignalingListener(),this.localStream.getVideoTracks()[0].onended=()=>{this.stopScreenShare()},this.localStream}catch(e){throw console.error("Error starting screen share:",e),e}}async createPeerConnectionForParticipant(e){console.log(`Creating peer connection for participant: ${e}`);const t=new RTCPeerConnection(this.rtcConfig);this.localStream.getTracks().forEach(o=>{t.addTrack(o,this.localStream)}),t.onicecandidate=async o=>{o.candidate&&await this.addIceCandidate("presenter",o.candidate,e)},t.onconnectionstatechange=()=>{console.log(`Connection state for ${e}: ${t.connectionState}`)};const r=await t.createOffer();await t.setLocalDescription(r),this.peerConnections[e]=t;const s=this.doc(this.db,this.CLASS_COLLECTION_PATH,this.classCode);await this.updateDoc(s,{[`sessionState.screenShareOffers.${e}`]:{type:r.type,sdp:r.sdp}}),console.log(`Offer created and stored for participant: ${e}`)}async stopScreenShare(){this.localStream&&(this.localStream.getTracks().forEach(t=>t.stop()),this.localStream=null),this.isPresenter&&this.peerConnections&&(Object.values(this.peerConnections).forEach(t=>{t&&t.close()}),this.peerConnections={}),this.signalingUnsubscribe&&(this.signalingUnsubscribe(),this.signalingUnsubscribe=null);const e=this.doc(this.db,this.CLASS_COLLECTION_PATH,this.classCode);await this.updateDoc(e,{"sessionState.screenShareActive":!1,"sessionState.screenShareOffer":null,"sessionState.screenShareOffers":null,"sessionState.screenShareAnswers":null,"sessionState.screenShareIceCandidates":null})}async joinScreenShare(e){var t,r;if(!this.isPresenter)try{const s=this.doc(this.db,this.CLASS_COLLECTION_PATH,this.classCode),a=(await this.getDoc(s)).data(),l=(r=(t=a==null?void 0:a.sessionState)==null?void 0:t.screenShareOffers)==null?void 0:r[this.userId];if(!l){console.log("No offer available yet for this participant");return}this.peerConnection=new RTCPeerConnection(this.rtcConfig),this.peerConnection.ontrack=d=>{console.log("Received remote track"),d.streams&&d.streams[0]&&this.onRemoteStream(d.streams[0])},this.peerConnection.onicecandidate=async d=>{d.candidate&&await this.addIceCandidate(this.userId,d.candidate)},this.peerConnection.onconnectionstatechange=()=>{console.log(`Participant connection state: ${this.peerConnection.connectionState}`)},await this.peerConnection.setRemoteDescription(new RTCSessionDescription(l));const u=await this.peerConnection.createAnswer();await this.peerConnection.setLocalDescription(u),await this.updateDoc(s,{[`sessionState.screenShareAnswers.${this.userId}`]:{type:u.type,sdp:u.sdp}}),console.log("Answer sent to presenter"),this.startSignalingListener()}catch(s){throw console.error("Error joining screen share:",s),s}}async leaveScreenShare(){this.peerConnection&&(this.peerConnection.close(),this.peerConnection=null),this.signalingUnsubscribe&&(this.signalingUnsubscribe(),this.signalingUnsubscribe=null)}async addIceCandidate(e,t,r=null){var s;try{const o=this.doc(this.db,this.CLASS_COLLECTION_PATH,this.classCode),l=(await this.getDoc(o)).data(),u=((s=l==null?void 0:l.sessionState)==null?void 0:s.screenShareIceCandidates)||{presenter:{},participants:{}};e==="presenter"?(u.presenter[r]||(u.presenter[r]=[]),u.presenter[r].push({candidate:t.candidate,sdpMLineIndex:t.sdpMLineIndex,sdpMid:t.sdpMid})):(u.participants[e]||(u.participants[e]=[]),u.participants[e].push({candidate:t.candidate,sdpMLineIndex:t.sdpMLineIndex,sdpMid:t.sdpMid})),await this.updateDoc(o,{"sessionState.screenShareIceCandidates":u})}catch(o){console.error("Error adding ICE candidate:",o)}}startSignalingListener(){const e=this.doc(this.db,this.CLASS_COLLECTION_PATH,this.classCode);let t={presenter:{},participants:{}};this.signalingUnsubscribe=this.onSnapshot(e,async r=>{var a,l,u;if(!r.exists())return;const o=r.data().sessionState;if(this.isPresenter){const d=o.screenShareAnswers||{};for(const[y,b]of Object.entries(d)){const S=this.peerConnections[y];if(!S){console.log(`New participant detected: ${y}, creating connection`),await this.createPeerConnectionForParticipant(y);continue}if(b&&S.remoteDescription===null)try{await S.setRemoteDescription(new RTCSessionDescription(b)),console.log(`Set remote description from participant ${y}`)}catch(x){console.error(`Error setting remote description for ${y}:`,x)}}const p=((a=o.screenShareIceCandidates)==null?void 0:a.participants)||{};for(const[y,b]of Object.entries(p)){const S=this.peerConnections[y];if(!S)continue;const x=t.participants[y]||0,U=b.slice(x);for(const L of U)try{await S.addIceCandidate(new RTCIceCandidate(L))}catch(X){console.error(`Error adding ICE candidate for ${y}:`,X)}t.participants[y]=b.length}}else{if((o.screenShareOffers||{})[this.userId]&&!this.peerConnection&&await this.joinScreenShare(this.userId),!this.peerConnection)return;const y=((u=(l=o.screenShareIceCandidates)==null?void 0:l.presenter)==null?void 0:u[this.userId])||[],b=t.presenter[this.userId]||0,S=y.slice(b);for(const x of S)try{this.peerConnection.remoteDescription&&await this.peerConnection.addIceCandidate(new RTCIceCandidate(x))}catch(U){console.error("Error adding ICE candidate:",U)}t.presenter[this.userId]=y.length}})}onRemoteStream(e){console.log("Remote stream received, callback not set")}}class Jy{constructor(e){this.auth=e,this.googleProvider=new Ht}async loginWithGoogle(){try{const e=await Sc(this.auth,this.googleProvider),t=e.user,r=Tc(e);return r&&r.isNewUser?(await this.logout(),{success:!1,message:'Akunbelum terdaftar. Silakan gunakan tombol "Daftar dengan Google" di tab Daftar.',notExists:!0}):(console.log("Login Google Berhasil:",t.uid),{success:!0,message:"Login Google berhasil!",user:{uid:t.uid,name:t.displayName||t.email}})}catch(e){console.error("Login Google Gagal:",e);let r=e.message;return e.code==="auth/account-exists-with-different-credential"&&(r="Email ini sudah terdaftar menggunakan metode lain (Email/Password). Silakan login menggunakan metode tersebut."),{success:!1,message:`Otentikasi gagal: ${r}`}}}async registerWithGoogle(e){try{const t=await Sc(this.auth,this.googleProvider),r=t.user,s=Tc(t);return s&&!s.isNewUser?(await this.logout(),{success:!1,message:"Akun sudah terdaftar, gunakan akun lain",alreadyExists:!0}):(await Ic(r,{displayName:e}),console.log("Registrasi Google Berhasil:",r.uid),{success:!0,message:"Registrasi Google berhasil!",user:{uid:r.uid,name:r.displayName||r.email}})}catch(t){console.error("Registrasi Google Gagal:",t);let s=t.message;return t.code==="auth/account-exists-with-different-credential"&&(s="Email ini sudah terdaftar menggunakan metode lain (Email/Password). Silakan daftar menggunakan email lain."),{success:!1,message:`Otentikasi gagal: ${s}`}}}async registerWithEmailPassword(e,t,r){try{const o=(await mp(this.auth,e,t)).user;return await Ic(o,{displayName:r}),await this.sendEmailVerification(o),console.log("Registrasi Berhasil:",o.uid),{success:!0,message:`Pendaftaran berhasil. Silakan cek email Anda (${e}) untuk verifikasi sebelum login.`,user:{uid:o.uid,email:o.email,name:r,emailVerified:o.emailVerified}}}catch(s){console.error("Registrasi Gagal:",s);let o=s.message;return s.code==="auth/email-already-in-use"?o="Email ini sudah terdaftar. Silakan login atau gunakan email lain.":s.code==="auth/invalid-email"?o="Format email tidak valid.":s.code==="auth/weak-password"&&(o="Password terlalu lemah, minimal 6 karakter."),{success:!1,message:`Registrasi gagal: ${o}`}}}async loginWithEmailPassword(e,t){try{const s=(await gp(this.auth,e,t)).user;return s.emailVerified?(console.log("Login Email/Password Berhasil:",s.uid),{success:!0,message:"Login berhasil!",user:{uid:s.uid,name:s.displayName||s.email}}):(await this.logout(),{success:!1,message:`Login gagal: Email Anda (${e}) belum terverifikasi. Silakan cek email Anda.`,needsVerification:!0})}catch(r){console.error("Login Email/Password Gagal:",r);let s=r.message;return r.code==="auth/invalid-credential"?s="Email atau password salah.":r.code==="auth/user-not-found"&&(s="Akun tidak ditemukan."),{success:!1,message:`Login gagal: ${s}`}}}async sendEmailVerification(e){try{return await _p(e),console.log("Email verifikasi dikirim"),{success:!0,message:"Email verifikasi berhasil dikirim."}}catch(t){return console.error("Gagal mengirim email verifikasi:",t),{success:!1,message:`Gagal mengirim email verifikasi: ${t.message}`}}}async logout(){try{return await Rp(this.auth),{success:!0,message:"Logout berhasil"}}catch(e){return console.error("Logout Gagal:",e),{success:!1,message:"Gagal logout"}}}}let Te=null,Hn=null;function Yy(n){const{db:e,auth:t,doc:r,getDoc:s,setDoc:o,updateDoc:a,collection:l,arrayUnion:u,serverTimestamp:d,onSnapshot:p,CLASS_COLLECTION_PATH:y}=n;Hn=new Jy(t);const b=document.getElementById("custom-modal-backdrop");document.getElementById("custom-modal-box");const S=document.getElementById("custom-modal-title"),x=document.getElementById("custom-modal-message");document.getElementById("custom-modal-buttons");const U=document.getElementById("custom-modal-cancel-btn"),L=document.getElementById("custom-modal-confirm-btn");let X=null;function O(M,K="Pemberitahuan"){S.textContent=K,x.textContent=M,U.classList.add("hidden"),L.textContent="OK",L.className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg transition-all",b.classList.remove("hidden"),X=null}function re(M,K,N,Re="OK",Z="bg-blue-600"){S.textContent=K,x.textContent=M,U.classList.remove("hidden"),L.textContent=Re,L.className=`${Z} hover:opacity-90 text-white font-bold py-2 px-5 rounded-lg transition-all`,b.classList.remove("hidden"),X=N}function be(){b.classList.add("hidden")}L.addEventListener("click",()=>{X&&X(),be()}),U.addEventListener("click",be);const Ne=10,we=2*Math.PI*45,I=10,m=-5,_=-10,E=[3,2,1];let v=null,w=null,g=null,ue=null,nt=0,ot=null,st=null,at=null;async function An(M){try{const K=r(e,y,M),N=await s(K);return N.exists()?N.data():(console.log("Dokumen tidak ditemukan:",M),null)}catch(K){return console.error("Gagal mengambil data kelas:",K),null}}async function nn(M,K){try{const N=r(e,y,M),Re={};for(const Z in K)Re[`sessionState.${Z}`]=K[Z];await a(N,Re)}catch(N){console.error("Gagal memperbarui state sesi:",N)}}function Yi(){const M="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";let K="";for(let N=0;N<5;N++)K+=M.charAt(Math.floor(Math.random()*M.length));return`QUIZ-${K}`}function Ae(M,K){const N=document.getElementById("result-toast");N&&(N.textContent=M,N.className=N.className.replace(/bg-\S+-\d+/g,""),N.classList.add(K),N.classList.remove("hidden","opacity-0","-translate-y-10"),setTimeout(()=>{N.classList.add("opacity-0","-translate-y-10"),setTimeout(()=>N.classList.add("hidden"),300)},2500))}function Oe(M,K,N=500){setTimeout(()=>{Ae(M,K)},N)}Sp(t,M=>{if(M)if(M.emailVerified||M.providerData.some(K=>K.providerId==="google.com")){g=M,n.currentUserId=M.uid,console.log("Firebase User State: Logged In",M.uid);const K=M.displayName||M.email.split("@")[0];w={id:M.uid,name:K,isPresenter:!1,score:0,streak:0,isOnline:!0},window.location.hash===""||window.location.hash==="#login"?window.location.hash="#home":Ur()}else Hn.logout(),g=null,n.currentUserId=null,w=null,window.location.hash!=="#login"?window.location.hash="#login":(Mr(),O("Email Anda belum terverifikasi. Silakan cek email Anda.","Verifikasi Diperlukan"));else g=null,n.currentUserId=null,w=null,console.log("Firebase User State: Logged Out"),window.location.hash!=="#login"?window.location.hash="#login":Mr()});async function Mr(){if(v=null,w=null,g)return;document.getElementById("modal-container").innerHTML="",document.getElementById("app-router-outlet").innerHTML=`
            <div id="login-container" class="login-container">
                <div class="login-bg-grid"></div>
                <div class="blob-glow blob-blue"></div>
                <div class="blob-glow blob-purple"></div>

                <div class="login-content-wrapper">
                    
                    <div class="visual-container" id="visual-container">
                        <div id="tilt-card" class="tilt-card">
                            <div class="tilt-card-bg"></div>

                            <div class="absolute inset-0 flex items-center justify-center"
                                style="transform: translateZ(20px);">
                                <div class="tilt-icon-box">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="1" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                                        <polyline points="2 17 12 22 22 17"></polyline>
                                        <polyline points="2 12 12 17 22 12"></polyline>
                                    </svg>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="login-card">
                        <div class="card-padding">

                            <div class="header">
                                <h2>Selamat Datang</h2>
                                <p>Silakan login atau daftar untuk melanjutkan</p>
                            </div>
                            
                            <div class="mb-6">
                                <div class="flex border-b border-gray-700">
                                    <button id="login-tab-btn" class="tab-btn tab-btn-active">Login</button>
                                    <button id="register-tab-btn" class="tab-btn tab-btn-inactive">Daftar</button>
                                </div>
                            </div>

                            <form id="login-form" class="form-wrapper">
                                <div class="form-group">
                                    <label class="form-label">Email</label>
                                    <input type="email" class="form-input"
                                        placeholder="Masukkan email Anda" required>
                                </div>

                                <div class="form-group">
                                    <label class="form-label">Password</label>
                                    <input type="password" class="form-input"
                                        placeholder="Masukkan password Anda" required>
                                </div>

                                <button type="submit" class="btn-login">
                                    Login dengan Email
                                </button>
                            </form>

                            <form id="register-form" class="form-wrapper hidden">
                                <div class="form-group">
                                    <label class="form-label">Nama Pengguna</label>
                                    <input type="text" class="form-input" placeholder="Pilih nama yang akan ditampilkan" maxlength="30" required>
                                </div>

                                <div class="form-group">
                                    <label class="form-label">Email</label>
                                    <input type="email" class="form-input" placeholder="Masukkan email Anda" required>
                                </div>

                                <div class="form-group">
                                    <label class="form-label">Password</label>
                                    <input type="password" class="form-input" placeholder="Buat password (min. 6 karakter)" minlength="6" required>
                                </div>

                                <div class="form-group">
                                    <label class="form-label">Konfirmasi Password</label>
                                    <input type="password" class="form-input" placeholder="Ulangi password" minlength="6" required>
                                </div>
                                <button type="submit" class="btn-success">
                                    Daftar & Kirim Verifikasi
                                </button>
                            </form>
                            
                            <div class="divider">
                                <div class="divider-line"></div>
                                <span class="divider-text">ATAU</span>
                                <div class="divider-line"></div>
                            </div>

                            <button id="google-login-btn" class="btn-google">
                                <svg class="google-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24">
                                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,19.5-8.521,19.5-19.5c0-1.207-0.127-2.388-0.319-3.53Z"/>
                                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.991,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,3.619,1.076,7.019,2.923,9.882l6.568-5.118C12.339,27.186,12,25.613,12,24C12,20.444,13.232,17.202,15.263,14.691L6.306,14.691z"/>
                                    <path fill="#4CAF50" d="M14.263,33.309C16.353,35.795,19.743,38,24,38c3.844,0,7.188-1.464,9.663-3.039l5.657,5.657C34.046,42.947,29.268,44,24,44C12.955,44,4,35.045,4,24c0-1.207-0.127-2.388-0.319-3.53L6.306,24.691L6.306,33.309z"/>
                                    <path fill="#1976D2" d="M24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4c-3.619,0-7.019,1.076-9.882,2.923l6.568,5.118C20.768,12.798,24,12,24,12z"/>
                                </svg>
                                <span id="google-btn-text">Login dengan Google</span>
                            </button>
                        </div>
                        
                        <div class="features-container">
                            <div class="features-grid">
                                <div class="feature-item">
                                    <div class="feature-icon-box icon-blue">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                    </div>
                                    <p class="feature-text">Real-time</p>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon-box icon-purple">                                     
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                    </div>
                                    <p class="feature-text">Interaktif</p>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon-box icon-green">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                                    </div>
                                    <p class="feature-text">Gratis</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="footer-copy animate-fade-in-delayed">
                        <p>© 2024 Rapath • Made for education</p>
                    </div>
                </div>
            </div>
        `;const M=document.getElementById("login-tab-btn"),K=document.getElementById("register-tab-btn"),N=document.getElementById("login-form"),Re=document.getElementById("register-form"),Z=document.getElementById("google-login-btn"),je=document.getElementById("register-username");function Ee(he){const se=document.getElementById("google-btn-text");he==="login"?(M.classList.add("tab-btn-active"),M.classList.remove("tab-btn-inactive"),K.classList.add("tab-btn-inactive"),K.classList.remove("tab-btn-active"),N.classList.remove("hidden"),Re.classList.add("hidden"),se&&(se.textContent="Login dengan Google")):(K.classList.add("tab-btn-active"),K.classList.remove("tab-btn-inactive"),M.classList.add("tab-btn-inactive"),M.classList.remove("tab-btn-active"),Re.classList.remove("hidden"),N.classList.add("hidden"),se&&(se.textContent="Daftar dengan Google"))}M.addEventListener("click",()=>Ee("login")),K.addEventListener("click",()=>Ee("register")),Z.addEventListener("click",async()=>{const se=document.getElementById("google-btn-text").textContent.includes("Daftar");let J;if(se){const de=je.value.trim();if(!de)return O("Harap isi Nama Pengguna untuk Daftar dengan Google.","Input Kosong");J=await Hn.registerWithGoogle(de)}else J=await Hn.loginWithGoogle();J.success?Ae(J.message,"bg-blue-600"):J.alreadyExists?(Ee("login"),O(J.message,"Registrasi Gagal")):J.notExists?(Ee("register"),O(J.message,"Login Gagal")):O(J.message,"Otentikasi Gagal")}),N.addEventListener("submit",async he=>{he.preventDefault();const se=document.getElementById("login-email").value.trim(),J=document.getElementById("login-password").value.trim();if(!se||!J)return O("Harap isi email dan password.","Input Kosong");const de=await Hn.loginWithEmailPassword(se,J);de.success?Ae("Login Berhasil!","bg-blue-600"):de.needsVerification?O(de.message,"Verifikasi Email"):O(de.message,"Login Gagal")}),Re.addEventListener("submit",async he=>{he.preventDefault();const se=document.getElementById("register-username").value.trim(),J=document.getElementById("register-email").value.trim(),de=document.getElementById("register-password").value.trim(),Me=document.getElementById("register-confirm-password").value.trim();if(!se||!J||!de||!Me)return O("Harap lengkapi semua bidang.","Input Kosong");if(de!==Me)return O("Password dan konfirmasi password tidak cocok.","Password Tidak Cocok");if(de.length<6)return O("Password minimal 6 karakter.","Password Terlalu Pendek");const xe=await Hn.registerWithEmailPassword(J,de,se);xe.success?(Ee("login"),O(xe.message,"Verifikasi Email Dikirim"),document.getElementById("login-email").value=J):O(xe.message,"Registrasi Gagal")});const ct=document.getElementById("login-container"),fe=document.getElementById("tilt-card");ct&&fe&&(ct.addEventListener("mousemove",he=>{const se=(window.innerWidth/2-he.pageX)/20,J=(window.innerHeight/2-he.pageY)/20;fe.style.transform=`rotateY(${se}deg) rotateX(${J}deg)`}),ct.addEventListener("mouseleave",()=>{fe.style.transition="all 0.5s ease",fe.style.transform="rotateY(-15deg) rotateX(10deg)"}),ct.addEventListener("mouseenter",()=>{fe.style.transition="none"}))}async function Sn(){if(!g){window.location.hash="#login";return}new URLSearchParams(window.location.hash.split("?")[1]||""),v=null,w=null;let M=[];document.getElementById("modal-container").innerHTML="";const K=g.displayName||g.email.split("@")[0];if(document.getElementById("app-router-outlet").innerHTML=`
            <div class="top-bar">
                <button id="logout-btn" class="logout-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="logout-icon">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                        <polyline points="16 17 21 12 16 7"/>
                        <line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    Logout
                </button>
            </div>

            <div class="home-wrapper">
                <div class="home-container">

                    <div class="home-header">
                        <div class="app-logo">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 20v-6M6 20v-4M18 20v-8M10 20h4M6 12H4a2 2 0 0 1-2-2V4
                                        a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6
                                        a2 2 0 0 1-2 2h-2M6 6h.01M10 6h.01M14 6h.01"/>
                            </svg>
                        </div>

                        <h1 class="app-title">Rapath</h1>
                        <p class="app-subtitle">
                            Selamat datang,
                            <span class="username">${K}</span>!
                        </p>
                    </div>

                    <div class="admin-card">
                        <h2 class="card-title">Admin</h2>

                        <div class="admin-actions">
                            <button id="create-btn" class="btn-primary">
                                Buat Sesi Baru
                            </button>

                            <div class="import-wrapper">
                                <input type="file" id="excel-input"
                                    accept=".xlsx, .xls"
                                    class="hidden" />

                                <button id="import-excel-btn" class="btn-excel">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        width="20" height="20"
                                        viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="import-icon">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16
                                                a2 2 0 0 0 2 2h12
                                                a2 2 0 0 0 2-2V8z"/>
                                        <polyline points="14 2 14 8 20 8"/>
                                        <line x1="12" y1="18" x2="12" y2="12"/>
                                        <line x1="9" y1="15" x2="15" y2="15"/>
                                    </svg>
                                    Import Quiz (.xlsx)
                                </button>

                                <div id="import-status"
                                    class="import-status hidden"></div>
                            </div>
                        </div>
                    </div>

                    <div class="participant-card">
                        <h2 class="card-title">Peserta</h2>

                        <form id="join-form" class="join-form">
                            <div>
                                <label for="class-code" class="form-label">
                                    Kode Sesi
                                </label>

                                <input type="text"
                                    id="class-code"
                                    placeholder="e.g., QUIZ-AB3X9"
                                    class="form-input code-input"
                                    maxlength="10"
                                    required>
                            </div>

                            <button type="submit" class="btn-success">
                                Gabung Sesi
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        `,!g.uid){O("Gagal mengautentikasi pengguna. Silakan segarkan halaman.","Auth Error");return}document.getElementById("logout-btn").addEventListener("click",()=>{re("Apakah Anda yakin ingin logout?","Konfirmasi Logout",async()=>{const fe=await Hn.logout();fe.success||O(fe.message,"Logout Gagal")},"Logout","bg-red-600")});const Re=document.getElementById("create-btn"),Z=document.getElementById("import-excel-btn"),je=document.getElementById("excel-input"),Ee=document.getElementById("import-status");Z.addEventListener("click",()=>je.click()),je.addEventListener("change",fe=>{const he=fe.target.files[0];if(!he)return;const se=new FileReader;se.onload=J=>{try{const de=new Uint8Array(J.target.result),Me=XLSX.read(de,{type:"array"}),xe=Me.SheetNames[0],$e=Me.Sheets[xe],Rn=XLSX.utils.sheet_to_json($e,{defval:""}),ge=[];let oe=null;if(Rn.forEach(Pe=>{const Vt=Pe.Question||Pe.question||"",rn=Pe.Option||Pe.option||"",sn=Pe.Answer||Pe.answer||"",lt=Pe["Correct Answer"]||Pe["correct answer"]||"";Vt&&Vt.trim()!==""&&(oe&&ct(oe,ge),oe={id:Date.now()+Math.random(),q:Vt,options:[],optionLabels:[],correctAnswerLabel:lt}),oe&&(sn&&sn.trim()!==""&&(oe.options.push(sn),oe.optionLabels.push(rn.trim().toUpperCase())),lt&&lt.trim()!==""&&(oe.correctAnswerLabel=lt.trim().toUpperCase()))}),oe&&ct(oe,ge),ge.length>0)M=ge,Re.innerHTML="Buat Sesi",Ee.classList.remove("hidden","text-red-400"),Ee.classList.add("text-green-400"),Ee.innerHTML=`✅ ${ge.length} Soal Siap!`,Ae(`${ge.length} Soal Berhasil Diimport!`,"bg-green-600");else throw new Error("Tidak ada soal valid.")}catch(de){console.error("Excel Error:",de),Ee.classList.remove("hidden","text-green-400"),Ee.classList.add("text-red-400"),Ee.textContent="Gagal membaca format file.",O("Gagal import. Cek format Excel.","Error")}},se.readAsArrayBuffer(he)});function ct(fe,he){let se=[];fe.correctAnswerLabel&&fe.correctAnswerLabel.toString().split(/[,;\s]+/).forEach(de=>{const Me=de.trim().toUpperCase(),xe=fe.optionLabels.indexOf(Me);xe!==-1&&se.push(xe)}),fe.options.length>=2&&se.length>0?he.push({id:he.length+1,q:fe.q,options:fe.options,correct:se}):console.warn("Soal dilewati (tidak valid/opsi kurang/kunci salah):",fe.q)}document.getElementById("create-btn").addEventListener("click",async()=>{const fe=Yi(),he=g.uid;if(!he)return O("Auth tidak siap.","Error");const se=K;let J=[];M&&M.length>0&&(console.log("Menggunakan Soal Import:",M),J=M);const de={code:fe,createdAt:d(),quizList:J,participantList:[{id:he,name:se,isPresenter:!0,score:0,streak:0,isOnline:!0}],sessionState:{state:"WAITING",currentQuestionId:null,quizStartTime:null,totalQuestions:0,currentAnswers:{},screenShareActive:!1,screenShareOffer:null,screenShareOffers:null,screenShareAnswers:{},screenShareIceCandidates:null,questionActive:!1,questionsQueue:[]},engagementStats:{[he]:{totalAnswered:0,correctAnswers:0,totalResponseTime:0,totalSpeedScore:0}},quizSessionHistory:[]};try{const Me=r(e,y,fe);await o(Me,de),w={id:he,name:se,isPresenter:!0},window.location.hash=`#meet?class=${encodeURIComponent(fe)}`}catch(Me){console.error("Gagal membuat sesi:",Me),O("Gagal membuat sesi di database.","Database Error")}}),document.getElementById("join-form").addEventListener("submit",async fe=>{fe.preventDefault();const he=document.getElementById("class-code").value.trim().toUpperCase(),se=K;if(!he||!se)return;const J=n.currentUserId;if(!J)return O("Auth tidak siap.","Error");const de=await An(he);if(!de){O("Sesi tidak ditemukan. Periksa kembali kodenya.","Gagal Bergabung");return}if(de.sessionState.state==="ENDED"){O("Sesi ini telah berakhir.","Sesi Berakhir");return}const Me=de.participantList.some($e=>$e.id===J&&$e.name===se),xe={id:J,name:se,isPresenter:!1,score:0,streak:0,isOnline:!0};try{const $e=r(e,y,he);if(Me){const ge=de.participantList.map(oe=>oe.id===J&&oe.name===se?{...oe,isOnline:!0}:oe);await a($e,{participantList:ge})}else await a($e,{participantList:u(xe),[`engagementStats.${J}`]:{totalAnswered:0,correctAnswers:0,totalResponseTime:0,totalSpeedScore:0}});w={id:J,name:K,isPresenter:!0},window.location.hash=`#meet?class=${encodeURIComponent(he)}`}catch($e){console.error("Gagal bergabung dengan sesi:",$e),O("Gagal memperbarui sesi di database.","Database Error")}})}async function Xi(){if(!g){window.location.hash="#login";return}v=new URLSearchParams(window.location.hash.split("?")[1]||"").get("class");const K=n.currentUserId;if(!v||!K){console.warn("Sesi tidak valid (kode atau user ID tidak ada), kembali ke home."),window.location.hash="#home";return}const N=await An(v);if(!N){O("Sesi tidak ditemukan. Kembali ke home.","Sesi Tidak Ditemukan"),window.location.hash="#home";return}const Re=N.participantList.find(je=>je.id===K);if(!Re){O("Anda tidak terdaftar di sesi ini.","Gagal Bergabung"),window.location.hash="#home";return}if(w=Re,N.sessionState.state==="ENDED"&&!w.isPresenter){O("Sesi ini telah berakhir.","Sesi Berakhir"),window.location.hash="#home";return}const Z=w.isPresenter;document.getElementById("app-router-outlet").innerHTML=`
            <div class="meet-layout">
                <main id="main-content" class="main-content">
                    <div class="presentation-container">
                        <div id="presentation-area" class="presentation-placeholder">
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                            <span class="presentation-text">Layar Presentasi</span>
                        </div>
                    </div>

                    ${Z?`
                    <div id="presenter-controls-header" class="presenter-controls">
                        <button id="quiz-btn" class="btn-control btn-blue">Kuis</button>
                        <button id="show-results-btn" class="btn-control btn-green">Hasil</button>
                        
                        <button id="toggle-qa-btn" class="btn-control btn-purple">
                            <span id="qa-status-text">Mulai Q&A</span>
                        </button>
                        <button id="view-qa-btn" class="btn-control btn-gray">
                            Pertanyaan
                            <span id="qa-badge" class="notification-badge hidden">0</span>
                        </button>
                    </div>
                    `:""}
                    
                    <button id="quiz-indicator-btn" class="quiz-indicator hidden">
                        Kuis Baru <span id="indicator-timer-text" class="timer-pill"></span>
                    </button>

                    <button id="ask-question-btn" class="ask-btn-float hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                        Tanya Sesuatu
                    </button>
                </main>

                <aside id="sidebar" class="sidebar">
                    <div class="sidebar-header">
                        <h2 class="sidebar-title">Leaderboard</h2>
                        <button id="close-sidebar-btn" class="btn-icon-only">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                    <ul id="leaderboard-list" class="leaderboard-container custom-scrollbar"></ul>
                    <div class="participant-footer">
                        <h3 class="text-lg font-bold text-gray-900 mb-3">Peserta (<span id="participant-count">0</span>)</h3>
                        <div id="participant-list-container" class="participant-grid"></div>
                    </div>
                </aside>
            </div>

            <footer class="meet-footer">
                <div class="session-info">Sesi: <span class="font-mono">${v}</span></div>
                
                <div class="footer-controls">
                    <button id="back-to-home-btn" title="Kembali ke Home" class="footer-btn footer-btn-red">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    </button>
                    <button class="footer-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
                    </button>
                    <button class="footer-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                    </button>
                    
                    <button id="share-screen-btn" title="Bagikan Layar" class="footer-btn">
                        <svg id="share-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h5"/><path d="M7 2v4"/><path d="M17 2v4"/><rect width="20" height="4" x="2" y="16"/><path d="M17 22l5-5-5-5"/><path d="M22 17H10"/></svg>
                        <svg id="stop-share-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="hidden"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect></svg>
                    </button>

                    ${Z?`
                    <button id="reset-session-btn" title="Reset Sesi" class="footer-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rotate-ccw-icon lucide-rotate-ccw"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                    </button>
                    `:""}
                </div>

                <div class="footer-controls">
                    <button id="open-sidebar-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    </button>
                </div>
            </footer>
        `,document.getElementById("modal-container").innerHTML=`
            <div id="result-toast" class="fixed top-24 left-1/2 -translate-x-1/2 z-[60] px-6 py-3 rounded-lg text-white font-semibold shadow-2xl transition-all duration-300 opacity-0 -translate-y-10 hidden">
                <span id="toast-message"></span>
            </div>

            <div id="quiz-modal" class="modal-backdrop hidden">
                <div class="modal-content-base quiz-modal-box">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-2xl font-bold text-blue-600">Kuis Cepat!</h3>
                        <div class="timer-container">
                            <svg class="w-full h-full" viewBox="0 0 100 100">
                                <circle class="text-gray-200" stroke-width="8" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
                                <circle id="timer-circle" class="text-blue-600 timer-circle-progress" stroke-width="8" stroke-dasharray="${we}" stroke-dashoffset="${we}" stroke-linecap="round" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
                            </svg>
                            <span id="timer-text" class="absolute inset-0 flex items-center justify-center text-xl font-bold">${Ne}</span>
                        </div>
                    </div>
                    <p id="question-text" class="text-xl font-medium mb-6">Ini adalah contoh pertanyaan?</p>
                    <div id="options-container" class="space-y-3"></div>
                </div>
            </div>

            <div id="summary-modal" class="modal-backdrop hidden">
                <div class="modal-content-base summary-modal-box">
                    <h2 class="text-3xl font-bold text-center text-blue-600 mb-8">Rekap Keterlibatan</h2>
                    <div class="summary-grid">
                        <div class="stat-card stat-blue">
                            <div class="stat-label text-blue-800">Skor Akhir</div>
                            <div id="summary-score" class="stat-value text-blue-600">0</div>
                        </div>
                        <div class="stat-card stat-gray">
                            <div class="stat-label text-gray-800">Peringkat Anda</div>
                            <div id="summary-rank" class="stat-value text-gray-600">#0 / 0</div>
                        </div>
                        <div class="stat-card stat-green">
                            <div class="stat-label text-green-800">Akurasi</div>
                            <div id="summary-accuracy" class="stat-value text-green-600">0%</div>
                        </div>
                        <div class="stat-card stat-yellow">
                            <div class="stat-label text-yellow-800">Kecepatan Rata-rata</div>
                            <div id="summary-speed" class="stat-value text-yellow-600">0s</div>
                        </div>
                    </div>
                    <p class="text-center text-gray-600 mb-8">Kerja bagus hari ini! Anda menjawab <span id="summary-answered" class="font-bold">0</span> dari <span id="summary-total-q" class="font-bold">0</span> pertanyaan.</p>
                    <div class="text-center">
                        <button id="close-summary-btn" class="btn-control btn-blue py-3 px-8">
                            Tutup
                        </button>
                    </div>
                </div>
            </div>

            <div id="quiz-management-modal" class="modal-backdrop hidden">
                <div class="modal-content-base quiz-mgmt-box">
                    <div class="p-5 border-b border-gray-200 flex justify-between items-center">
                        <h2 id="quiz-modal-title" class="text-2xl font-bold text-gray-900">Manajemen Kuis</h2>
                        <button id="close-quiz-mgmt-btn" class="text-gray-400 hover:text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                    <div class="flex-1 overflow-y-auto custom-scrollbar">
                        <div id="quiz-list-view" class="p-6">
                            <div class="flex justify-between items-center mb-4">
                                <h3 class="text-xl font-semibold">Kuis Anda</h3>
                                <button id="create-new-quiz-btn" class="btn-control btn-blue">
                                    Buat Baru
                                </button>
                            </div>
                            <ul id="quiz-list-container" class="space-y-3"></ul>
                        </div>
                        <div id="create-quiz-view" class="p-6 hidden">
                            <button id="back-to-quiz-list-btn" class="mb-4 text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1"><path d="m15 18-6-6 6-6"/></svg>
                                Kembali ke daftar
                            </button>
                            <form id="create-quiz-form">
                                <div class="mb-4">
                                    <label for="quiz-question-input" class="block text-sm font-medium text-gray-700 mb-1">Pertanyaan</label>
                                    <textarea id="quiz-question-input" rows="3" class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Ketik pertanyaan Anda..."></textarea>
                                </div>
                                <div class="mb-4">
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Opsi Jawaban (Pilih jawaban yang benar)</label>
                                    <div id="create-options-container" class="space-y-3"></div>
                                </div>
                                <div class="flex justify-between items-center mt-6">
                                    <button id="add-option-btn" type="button" class="btn-control bg-gray-200 text-gray-800 hover:bg-gray-300">
                                        Tambah Opsi
                                    </button>
                                    <button id="save-quiz-btn" type="submit" class="btn-control btn-green">
                                        Simpan Kuis
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div id="qa-submit-modal" class="modal-backdrop hidden">
                <div class="modal-content-base qa-modal-box">
                    <h3 class="text-xl font-bold text-purple-600 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                        Ajukan Pertanyaan
                    </h3>
                    <textarea id="qa-input-text" rows="4" class="qa-textarea" placeholder="Ketik pertanyaan Anda di sini..."></textarea>
                    <div class="flex justify-end space-x-2">
                        <button id="qa-cancel-btn" class="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium hover:bg-gray-100 rounded-lg transition-all">Batal</button>
                        <button id="qa-send-btn" class="btn-control btn-purple">Kirim</button>
                    </div>
                </div>
            </div>

            <div id="qa-management-modal" class="fixed inset-0 z-[60] hidden bg-white">
                
                <div class="w-full h-full text-gray-900 flex flex-col">
                    
                    <div class="p-5 border-b border-gray-200 flex justify-between items-center bg-purple-50">
                        <h2 class="text-2xl font-bold text-gray-900 flex items-center">
                            <span class="bg-purple-100 text-purple-600 p-2 rounded-lg mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                            </span>
                            Daftar Pertanyaan
                        </h2>
                        <button id="close-qa-mgmt-btn" class="text-gray-400 hover:text-gray-600 bg-white rounded-full p-1 hover:bg-gray-100 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>

                    <div class="flex border-b border-gray-200 bg-white">
                        <button id="tab-incoming" class="flex-1 py-3 text-sm font-bold text-purple-600 border-b-2 border-purple-600 hover:bg-purple-50 transition-all flex justify-center items-center gap-2">
                            Baru Masuk 
                            <span id="count-incoming" class="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">0</span>
                        </button>
                        <button id="tab-graded" class="flex-1 py-3 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:text-gray-700 hover:bg-gray-50 transition-all flex justify-center items-center gap-2">
                            Sudah Dinilai 
                            <span id="count-graded" class="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">0</span>
                        </button>
                    </div>

                    <div id="qa-list-container" class="flex-1 overflow-y-auto custom-scrollbar p-6 bg-gray-50 space-y-6">
                        <div class="text-center text-gray-500 mt-10">Belum ada pertanyaan masuk.</div>
                    </div>
                </div>
            </div>
        `,sr(Z,N)}function sr(M,K){let N=K;const Re=N.participantList.find(C=>C.id===w.id);Re&&!Re.isOnline&&(Re.isOnline=!0,a(r(e,y,v),{participantList:N.participantList})),Re&&(w=Re);let Z=K.sessionState,je=null,Ee=!1,ct=!1;const fe=document.getElementById("quiz-btn"),he=document.getElementById("show-results-btn"),se=document.getElementById("reset-session-btn"),J=document.getElementById("quiz-indicator-btn"),de=document.getElementById("indicator-timer-text");document.getElementById("result-toast");const Me=document.getElementById("sidebar"),xe=document.getElementById("leaderboard-list"),$e=document.getElementById("participant-list-container"),Rn=document.getElementById("participant-count"),ge=document.getElementById("close-sidebar-btn"),oe=document.getElementById("open-sidebar-btn"),Pe=document.getElementById("quiz-modal"),Vt=document.getElementById("question-text"),rn=document.getElementById("options-container"),sn=document.getElementById("timer-text"),lt=document.getElementById("timer-circle"),Fr=document.getElementById("quiz-management-modal"),Ls=document.getElementById("close-quiz-mgmt-btn"),Cn=document.getElementById("quiz-modal-title"),xs=document.getElementById("quiz-list-view"),Ds=document.getElementById("create-quiz-view"),kn=document.getElementById("quiz-list-container"),Vs=document.getElementById("create-new-quiz-btn"),Ns=document.getElementById("back-to-quiz-list-btn"),Pn=document.getElementById("create-quiz-form"),Ln=document.getElementById("quiz-question-input"),It=document.getElementById("create-options-container"),Nt=document.getElementById("add-option-btn"),Br=document.getElementById("save-quiz-btn"),Ot=document.getElementById("summary-modal"),Os=document.getElementById("close-summary-btn"),xn=document.getElementById("summary-score"),Ms=document.getElementById("summary-rank"),ze=document.getElementById("summary-accuracy"),Us=document.getElementById("summary-speed"),Dn=document.getElementById("summary-answered"),Vn=document.getElementById("summary-total-q"),Zi=document.getElementById("back-to-home-btn"),ft=document.getElementById("share-screen-btn"),Ce=document.getElementById("presentation-area"),Mt=document.getElementById("toggle-qa-btn"),Fs=document.getElementById("qa-status-text"),Ut=document.getElementById("view-qa-btn"),Nn=document.getElementById("qa-badge"),Tt=document.getElementById("ask-question-btn"),bt=document.getElementById("qa-submit-modal"),pt=document.getElementById("qa-input-text"),qr=document.getElementById("qa-cancel-btn"),jr=document.getElementById("qa-send-btn"),On=document.getElementById("qa-management-modal"),$r=document.getElementById("close-qa-mgmt-btn"),ir=document.getElementById("qa-list-container"),on=document.getElementById("tab-incoming"),Mn=document.getElementById("tab-graded"),Un=document.getElementById("count-incoming"),zr=document.getElementById("count-graded");let At="incoming";Ce&&(at=Ce.innerHTML),Te=new Qy(n,v,w.id,M),Te.updateClassData(K),M||(Te.onRemoteStream=C=>{if(console.log("Displaying remote screen share stream"),Ce){Ce.innerHTML="";const R=document.createElement("video");R.id="remote-screen-share-video",R.srcObject=C,R.autoplay=!0,R.muted=!0,R.playsInline=!0,R.style.width="100%",R.style.height="100%",R.style.objectFit="contain",Ce.appendChild(R),R.play().catch(B=>console.warn("Autoplay was prevented:",B))}});function Fn(){if(!xe)return;const C=[...N.participantList].filter(R=>!R.isPresenter).sort((R,B)=>B.score-R.score);xe.innerHTML="",C.length===0&&(xe.innerHTML='<p class="text-gray-500 text-sm p-3">Belum ada peserta yang bergabung.</p>'),C.forEach((R,B)=>{const V=B+1;let z="rank-other";V===1&&(z="rank-1"),V===2&&(z="rank-2"),V===3&&(z="rank-3");const pe=R.id===w.id,q=`
                    <li class="leaderboard-item ${pe?"is-you":"normal"}">
                        <div class="flex items-center">
                            <span class="rank-number ${z}">#${V}</span>
                            <div class="user-info">
                                <span class="user-name">${R.name}${pe?" (Anda)":""}</span>
                                <div class="text-xs text-gray-500 mt-0.5 flex items-center space-x-2">
                                    ${R.streak>=3?`<span class="streak-badge">🔥 ${R.streak} Streak</span>`:""}
                                </div>
                            </div>
                        </div>
                        <span class="score-text">${R.score}</span>
                    </li>
                `;xe.innerHTML+=q})}function Ft(){if(!$e)return;const C=N.participantList.filter(R=>R.isOnline===!0);$e.innerHTML="",Rn.textContent=C.length,C.forEach(R=>{const B=R.id===w.id,V=R.name.split(" ").map(pe=>pe[0]).join("").substring(0,2).toUpperCase(),z=`
                    <div class="participant-avatar-container" title="${R.name}${B?" (Anda)":""}">
                        <div class="participant-avatar ${B?"is-you":"others"}">
                            ${V}
                        </div>
                        <span class="participant-name-small">${R.name}${B?" (Anda)":""}</span>
                    </div>
                `;$e.innerHTML+=z})}function Bn(C=null){const R=document.getElementById("main-content"),B=Me.classList.contains("open");let V;C===!0?V=!0:C===!1?V=!1:V=!B,V?(Me.classList.add("open"),R&&R.classList.add("sidebar-open")):(Me.classList.remove("open"),R&&R.classList.remove("sidebar-open"))}function or(C){C=C||[];const R=C.filter(q=>!q.isGraded).length,B=C.filter(q=>q.isGraded).length;Un&&(Un.textContent=R),zr&&(zr.textContent=B),on&&Mn&&(At==="incoming"?(on.className="flex-1 py-3 text-sm font-bold text-purple-600 border-b-2 border-purple-600 bg-purple-50 transition-all flex justify-center items-center gap-2",Mn.className="flex-1 py-3 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:text-gray-700 hover:bg-gray-50 transition-all flex justify-center items-center gap-2"):(on.className="flex-1 py-3 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:text-gray-700 hover:bg-gray-50 transition-all flex justify-center items-center gap-2",Mn.className="flex-1 py-3 text-sm font-bold text-green-600 border-b-2 border-green-600 bg-green-50 transition-all flex justify-center items-center gap-2"));const V=C.filter(q=>At==="incoming"?!q.isGraded:q.isGraded);if(V.length===0){const q=At==="incoming"?"Tidak ada pertanyaan baru.":"Belum ada pertanyaan yang dinilai.";ir.innerHTML=`<div class="text-center text-gray-500 mt-10 italic">${q}</div>`;return}const z={};V.forEach(q=>{z[q.userId]||(z[q.userId]={name:q.userName,questions:[]}),z[q.userId].questions.push(q)}),ir.innerHTML="",Object.keys(z).sort((q,ee)=>{const Ie=z[q].questions[z[q].questions.length-1].timestamp;return z[ee].questions[z[ee].questions.length-1].timestamp-Ie}).forEach(q=>{const ee=z[q],Ie=document.createElement("div");Ie.className="qa-item-group",Ie.innerHTML=`
                    <div class="qa-group-header">
                        <div class="flex items-center space-x-3">
                            <div class="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                                ${ee.name.substring(0,2).toUpperCase()}
                            </div>
                            <span class="font-bold text-gray-800 text-sm md:text-base">${ee.name}</span>
                        </div>
                        <span class="text-xs font-mono bg-white px-2 py-1 rounded border border-gray-300 text-gray-500">${ee.questions.length} item</span>
                    </div>
                    <div class="p-4 space-y-4 question-items-container bg-gray-50"></div>
                `;const ae=Ie.querySelector(".question-items-container");ee.questions.sort((Y,ut)=>ut.timestamp-Y.timestamp),ee.questions.forEach(Y=>{const ut=document.createElement("div"),Ue=new Date(Y.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});ut.className=`qa-item-card ${Y.isGraded?"qa-item-graded":"qa-item-incoming"}`;let qt=Y.isGraded?`
                        <div class="flex-shrink-0 mt-3 md:mt-0 md:ml-4 flex items-center self-start md:self-center">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-800 border border-green-200 shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="mr-1.5"><polyline points="20 6 9 17 4 12"></polyline></svg> 
                                ${Y.pointsAwarded>0?"+":""}${Y.pointsAwarded} Poin
                            </span>
                        </div>`:`
                        <div class="flex-shrink-0 mt-3 md:mt-0 md:ml-4 flex items-center space-x-2 self-start md:self-center">
                            <input type="number" min="-10" max="10" value="0" id="grade-input-${Y.id}" 
                                class="grade-input" placeholder="0">
                            <button class="give-points-btn btn-control btn-purple text-sm" 
                                data-qid="${Y.id}" data-uid="${q}">
                                Nilai
                            </button>
                        </div>`;ut.innerHTML=`
                        <div class="flex-1 min-w-0 pr-0 md:pr-4 text-left">
                            <p class="text-gray-800 font-medium text-sm md:text-base leading-relaxed break-words whitespace-pre-wrap">${Y.text}</p>
                            <div class="flex items-center mt-2 text-xs text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mr-1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> 
                                ${Ue}
                            </div>
                        </div>
                        ${qt}`,ae.appendChild(ut)}),ir.appendChild(Ie)}),At==="incoming"&&document.querySelectorAll(".give-points-btn").forEach(q=>{q.addEventListener("click",async()=>{const ee=q.dataset.qid,Ie=q.dataset.uid,ae=document.getElementById(`grade-input-${ee}`),Y=parseInt(ae.value);if(isNaN(Y)||Y<-10||Y>10)return O("Masukkan poin valid (-10 sampai 10).");await no(ee,Ie,Y)})})}function Bs(){Fr.classList.remove("hidden"),qs(),qn()}function Hr(){Fr.classList.add("hidden"),je=null}function qs(){if(kn.innerHTML="",N.quizList.length===0){kn.innerHTML='<p class="text-gray-500">Belum ada kuis yang dibuat.</p>';return}N.quizList.forEach(C=>{const R=`
                    <li class="quiz-list-item">
                        <span class="text-gray-800 font-medium truncate w-3/5" title="${C.q}">${C.q}</span>
                        <div class="flex space-x-2">
                            <button class="quiz-edit-btn btn-control btn-yellow text-sm" data-id="${C.id}">
                                Edit
                            </button>
                            <button class="quiz-start-btn btn-control btn-green text-sm" data-id="${C.id}">
                                Mulai
                            </button>
                        </div>
                    </li>
                `;kn.innerHTML+=R}),document.querySelectorAll(".quiz-edit-btn").forEach(C=>{C.addEventListener("click",()=>to(parseInt(C.dataset.id)))}),document.querySelectorAll(".quiz-start-btn").forEach(C=>{C.addEventListener("click",()=>$s(parseInt(C.dataset.id)))})}function ar(){Cn.textContent="Buat Kuis Baru",xs.classList.add("hidden"),Ds.classList.remove("hidden"),Br.textContent="Simpan Kuis",js(),jn(),jn()}function qn(){Cn.textContent="Manajemen Kuis",Ds.classList.add("hidden"),xs.classList.remove("hidden")}function js(){Ln.value="",It.innerHTML=""}function jn(C="",R=!1){const B=`
                <div class="flex items-center space-x-2 quiz-option-input border border-gray-300 rounded-md p-2">
                    <input type="checkbox" class="correct-answer-checkbox form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500" ${R?"checked":""}>
                    
                    <input type="text" class="option-text-input w-full border-0 focus:ring-0 p-1" placeholder="Ketik opsi jawaban..." value="${C}">
                    <button type="button" class="remove-option-btn text-gray-400 hover:text-red-500" title="Hapus opsi">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
            `;It.insertAdjacentHTML("beforeend",B),It.lastElementChild.querySelector(".remove-option-btn").addEventListener("click",V=>{It.children.length>2&&V.target.closest(".quiz-option-input").remove()})}async function eo(C){C.preventDefault();const R=Ln.value.trim();if(!R)return O("Silakan masukkan pertanyaan.","Input Tidak Valid");const B=It.querySelectorAll(".quiz-option-input"),V=[],z=[];if(B.forEach((q,ee)=>{const Ie=q.querySelector(".option-text-input").value.trim(),ae=q.querySelector(".correct-answer-checkbox"),Y=ae?ae.checked:!1;Ie&&(V.push(Ie),Y&&z.push(V.length-1))}),V.length<2)return O("Harap berikan setidaknya 2 opsi jawaban yang valid.","Input Tidak Valid");if(z.length===0)return O("Silakan pilih setidaknya satu jawaban yang benar.","Input Tidak Valid");const pe={q:R,options:V,correct:z};if(je){const q=N.quizList.findIndex(ee=>ee.id===je);q!==-1&&(N.quizList[q]={...N.quizList[q],...pe})}else{const q=N.quizList.length>0?Math.max(...N.quizList.map(ee=>ee.id))+1:1;N.quizList.push({id:q,...pe})}try{await a(r(e,y,v),{quizList:N.quizList}),qn(),je=null,Ae("Kuis berhasil disimpan!","bg-green-600")}catch(q){console.error("Error saving quiz:",q),O("Gagal menyimpan kuis ke database.","Error")}}function to(C){const R=N.quizList.find(B=>B.id===C);R&&(je=C,ar(),Cn.textContent="Edit Kuis",Br.textContent="Perbarui Kuis",Ln.value=R.q,It.innerHTML="",R.options.forEach((B,V)=>{let z=!1;Array.isArray(R.correct)?z=R.correct.includes(V):z=V===R.correct,jn(B,z)}))}function $s(C){if(!N.quizList.find(B=>B.id===C))return console.error("Kuis tidak ditemukan!");a(r(e,y,v),{"sessionState.currentAnswers":{}}),nn(v,{state:"QUIZ_ACTIVE",currentQuestionId:C,quizStartTime:Date.now(),totalQuestions:N.sessionState.totalQuestions+1}),Hr()}function zs(C){!Pe||!Vt||!rn||(Vt.textContent=C.q,rn.innerHTML="",C.options.forEach((R,B)=>{const V=`
                    <button class="option-btn" data-index="${B}">
                        ${R}
                    </button>
                `;rn.innerHTML+=V}),document.querySelectorAll(".option-btn").forEach(R=>{R.addEventListener("click",()=>gt(parseInt(R.dataset.index)))}))}function Hs(){if(Z.state!=="QUIZ_ACTIVE"||!Z.quizStartTime){ue&&clearInterval(ue),ue=null;return}const C=Math.floor((Date.now()-Z.quizStartTime)/1e3);if(nt=Ne-C,nt<=0){nt=0,ue&&(clearInterval(ue),ue=null),sn.textContent=nt,de.textContent=nt;const B=0;lt.style.strokeDashoffset=we*(1-B),M&&N.sessionState.state==="QUIZ_ACTIVE"&&nn(v,{state:"AWAITING_RESULTS"});return}sn.textContent=nt,de.textContent=nt;let R=Math.max(0,nt/Ne);lt.style.strokeDashoffset=we*(1-R)}function Bt(C){return C===1?E[0]:C===2?E[1]:C===3?E[2]:0}async function gt(C){if(Ee)return;Ee=!0;const R=N.quizList.find(V=>V.id===Z.currentQuestionId);let B=!1;Array.isArray(R.correct)?B=R.correct.includes(C):B=C===R.correct;try{const V=r(e,y,v);await a(V,{[`sessionState.currentAnswers.${w.id}`]:{selectedIndex:C,isCorrect:B,timeSubmitted:Date.now()}}),B?Ae(`Jawaban Terkirim: Benar (+${I})`,"bg-green-600"):Ae(`Jawaban Terkirim: Salah (${m})`,"bg-red-600")}catch(V){console.error("Gagal menyimpan jawaban:",V),Ae("Gagal menyimpan jawaban ke server.","bg-red-800")}document.querySelectorAll(".option-btn").forEach(V=>{V.disabled=!0;const z=parseInt(V.dataset.index);z===C&&(V.classList.add("ring-blue"),B||V.classList.add("answer-wrong"));let pe=!1;Array.isArray(R.correct)?pe=R.correct.includes(z):pe=R.correct===z,pe&&V.classList.add("answer-correct")}),setTimeout(()=>{Pe.classList.add("hidden")},3e3)}async function cr(){if(!Ee&&(Ee=!0,!(!w||w.isPresenter))){Ae("Waktu habis! Menunggu hasil...","bg-gray-600");try{const C=r(e,y,v);await a(C,{[`sessionState.currentAnswers.${w.id}`]:{selectedIndex:-1,isCorrect:!1,timeSubmitted:Date.now()}})}catch(C){console.error("Gagal menyimpan jawaban (waktu habis):",C)}}}async function lr(C){if(C.sessionState.state!=="AWAITING_RESULTS")return;const R=C.quizList.find(ae=>ae.id===C.sessionState.currentQuestionId);if(!R)return;const B=C.sessionState.currentAnswers||{};let V=[...C.participantList],z={...C.engagementStats},pe={};const q=Object.entries(B).filter(([,ae])=>ae.selectedIndex!==-1).sort(([,ae],[,Y])=>ae.timeSubmitted-Y.timeSubmitted);for(let ae=0;ae<V.length;ae++){const Y=V[ae];if(Y.isPresenter)continue;const ut=Y.id,Ue=B[ut],qt=!!Ue;let jt=0,cn=0,St=0,Rt=Y.streak||0,hr=0,$t=Ne;qt?($t=(Ue.timeSubmitted-C.sessionState.quizStartTime)/1e3,$t=Math.min(Ne,Math.max(0,$t)),hr=q.findIndex(([so])=>so===ut)+1,St=Bt(hr),Ue.isCorrect?(cn=I,Rt+=1):(cn=m,Rt=0),jt=cn+St):(jt=_,cn=_,Rt=0),V[ae].score=(Y.score||0)+jt,V[ae].streak=Rt;const ye=z[ut]||{totalAnswered:0,correctAnswers:0,totalResponseTime:0,totalSpeedScore:0};z[ut]={totalAnswered:ye.totalAnswered+1,correctAnswers:ye.correctAnswers+(Ue!=null&&Ue.isCorrect?1:0),totalResponseTime:ye.totalResponseTime+(qt?$t:0),totalSpeedScore:ye.totalSpeedScore+St},pe[ut]={selectedIndex:(Ue==null?void 0:Ue.selectedIndex)??-1,isCorrect:(Ue==null?void 0:Ue.isCorrect)??!1,responseTime:$t,speedRank:hr,accuracyPoints:cn,speedPoints:St,totalPoints:jt,timeSubmitted:(Ue==null?void 0:Ue.timeSubmitted)??null}}const ee={quizId:R.id,question:R.q,correctIndex:R.correct,answers:pe},Ie=r(e,y,v);try{await a(Ie,{participantList:V,engagementStats:z,"sessionState.currentAnswers":{},quizSessionHistory:u(ee)}),console.log("Perhitungan skor selesai dan dipublikasikan."),await nn(v,{state:"WAITING"})}catch(ae){console.error("Gagal memperbarui skor dan riwayat kuis:",ae)}}function Gs(){M&&nn(v,{state:"RESULTS_PUBLISHED"})}function _e(){if(M)return;const C=N.participantList.find(ee=>ee.id===w.id),R=N.engagementStats[w.id];if(!C||!R)return;xn.textContent=C.score;const B=[...N.participantList].filter(ee=>!ee.isPresenter).sort((ee,Ie)=>Ie.score-ee.score),V=B.findIndex(ee=>ee.id===w.id)+1,z=B.length>0?B.length:1;Ms.textContent=`#${V} / ${z}`;const pe=R.totalAnswered>0?Math.round(R.correctAnswers/R.totalAnswered*100):0;ze.textContent=`${pe}%`;const q=R.totalAnswered>0?(R.totalResponseTime/R.totalAnswered).toFixed(1):0;Us.textContent=`${q}s`,Dn.textContent=R.totalAnswered,Vn.textContent=Z.totalQuestions,Ot.classList.remove("hidden")}function ur(){if(!M)return;const C=N,R=C.participantList.map(z=>({...z,score:0,streak:0})),B={};Object.keys(C.engagementStats).forEach(z=>{B[z]={totalAnswered:0,correctAnswers:0,totalResponseTime:0,totalSpeedScore:0}});const V={state:"WAITING",currentQuestionId:null,quizStartTime:null,totalQuestions:0,currentAnswers:{},screenShareActive:!1,screenShareOffer:null,screenShareOffers:null,screenShareAnswers:{},screenShareIceCandidates:null};a(r(e,y,v),{participantList:R,engagementStats:B,sessionState:V,quizSessionHistory:[]})}async function $n(){if(Te)try{if(M){const C=await Te.startScreenShare();if(Ce){Ce.innerHTML="";const R=document.createElement("video");R.id="local-screen-share-video",R.srcObject=C,R.autoplay=!0,R.muted=!0,R.playsInline=!0,R.style.width="100%",R.style.height="100%",R.style.objectFit="contain",Ce.appendChild(R)}ft&&(ft.title="Hentikan Berbagi",ft.classList.remove("bg-gray-700","hover:bg-gray-600"),ft.classList.add("bg-red-600","hover:bg-red-700"),document.getElementById("share-icon").classList.add("hidden"),document.getElementById("stop-share-icon").classList.remove("hidden")),Ae("Berbagi layar dimulai","bg-green-600")}}catch(C){console.error("Error starting screen share:",C),C.name==="NotAllowedError"?O("Anda membatalkan izin berbagi layar.","Dibatalkan"):O("Gagal memulai berbagi layar. Pastikan browser Anda mendukung fitur ini.","Berbagi Layar Gagal")}}async function an(){if(Te)try{M?(await Te.stopScreenShare(),Ce&&at&&(Ce.innerHTML=at),ft&&(ft.title="Bagikan Layar",ft.classList.remove("bg-red-600","hover:bg-red-700"),ft.classList.add("bg-gray-700","hover:bg-gray-600"),document.getElementById("share-icon").classList.remove("hidden"),document.getElementById("stop-share-icon").classList.add("hidden")),Ae("Berbagi layar dihentikan","bg-gray-600")):(await Te.leaveScreenShare(),Ce&&at&&Ce.innerHTML.includes("remote-screen-share-video")&&(Ce.innerHTML=at))}catch(C){console.error("Error stopping screen share:",C)}}async function Ks(){if(Te&&await an(),ct||!v||!w)return;ct=!0;const C=await An(v);if(C)if(M)console.log("Presenter meninggalkan sesi, mengakhiri sesi..."),await nn(v,{state:"ENDED"});else{console.log("Peserta meninggalkan sesi, set 'isOnline = false'");const R=C.participantList.findIndex(B=>B.id===w.id);R!==-1&&(C.participantList[R].isOnline=!1,await a(r(e,y,v),{participantList:C.participantList}))}}function Ws(){Ee=!1}function Gr(C){if(!C){st&&st(),ot&&(window.removeEventListener("beforeunload",ot),ot=null),O("Sesi telah berakhir atau tidak ada.","Sesi Berakhir"),window.location.hash="#home";return}const R=Z==null?void 0:Z.state;N=C,Te&&Te.updateClassData(C),w=N.participantList.find(V=>V.id===w.id)||w,Z=N.sessionState,!M&&Z.screenShareActive?(Z.screenShareOffers||{})[w.id]&&!Te.peerConnection&&Te.joinScreenShare(w.id).catch(pe=>console.error("Failed to join screen share:",pe)):!M&&!Z.screenShareActive&&(Ce&&at&&Ce.innerHTML.includes("remote-screen-share-video")&&(Ce.innerHTML=at),Te&&Te.peerConnection&&Te.leaveScreenShare());const B=Z.state;if(B==="ENDED"&&!M){st&&st(),ot&&(window.removeEventListener("beforeunload",ot),ot=null),O("Presenter telah mengakhiri sesi.","Sesi Berakhir"),window.location.hash="#home";return}if(R!=="QUIZ_ACTIVE"&&B==="QUIZ_ACTIVE"&&(Ws(),nt=Ne,ue&&clearInterval(ue),Hs(),ue=setInterval(Hs,1e3)),Fn(),Ft(),M&&(fe.disabled=Z.state==="QUIZ_ACTIVE",he.disabled=Z.state==="QUIZ_ACTIVE"||Z.totalQuestions===0),Z.questionActive?M?Mt&&(Mt.classList.remove("btn-purple"),Mt.classList.add("btn-red"),Fs.textContent="Tutup Q&A"):Tt&&Tt.classList.remove("hidden"):M?Mt&&(Mt.classList.add("btn-purple"),Mt.classList.remove("btn-red"),Fs.textContent="Mulai Q&A"):(Tt&&Tt.classList.add("hidden"),bt&&bt.classList.add("hidden")),M&&Ut&&Nn){const V=Z.questionsQueue||[],z=V.filter(pe=>!pe.isGraded).length;z>0?(Nn.textContent=z,Nn.classList.remove("hidden"),Ut.classList.add("animate-pulse")):(Nn.classList.add("hidden"),Ut.classList.remove("animate-pulse")),On.classList.contains("hidden")||or(V)}switch(Z.state){case"WAITING":if(ue&&clearInterval(ue),J.classList.add("hidden"),Pe.classList.add("hidden"),Ot.classList.add("hidden"),!M&&R==="AWAITING_RESULTS"){const V=N.quizSessionHistory.slice(-1)[0];if(V&&V.answers[w.id]){const z=V.answers[w.id],{isCorrect:pe,speedRank:q,speedPoints:ee,totalPoints:Ie}=z;let ae="",Y="bg-gray-700";pe?(ae=`Peringkat Kecepatan #${q}, Bonus Kecepatan +${ee}! Total: ${Ie} poin.`,Y="bg-green-700"):z.selectedIndex===-1?(ae=`Tidak menjawab! Total: ${Ie} poin.`,Y="bg-red-800"):(ae=`Peringkat Kecepatan #${q}, Bonus Kecepatan +${ee}! Total: ${Ie} poin.`,Y="bg-red-600"),Oe(ae,Y,1e3)}else!V.answers[w.id]&&Ee&&Oe("Hasil kuis terbaru sudah ada, skor Anda sudah diperbarui!","bg-gray-500",1e3);Ot.classList.add("hidden")}break;case"QUIZ_ACTIVE":if(!M&&!Ee){J.classList.remove("hidden"),Pe.classList.remove("hidden");const V=N.quizList.find(z=>z.id===Z.currentQuestionId);V&&zs(V)}break;case"AWAITING_RESULTS":ue&&(clearInterval(ue),ue=null),J.classList.add("hidden"),Pe.classList.add("hidden"),!M&&!Ee&&cr(),Bn(!0),M&&R==="QUIZ_ACTIVE"&&lr(N);break;case"RESULTS_PUBLISHED":ue&&clearInterval(ue),J.classList.add("hidden"),Pe.classList.add("hidden"),M||_e();break;case"ENDED":ue&&clearInterval(ue),J.classList.add("hidden"),Pe.classList.add("hidden"),M&&(fe.disabled=!0,he.disabled=!0);break}}async function no(C,R,B){try{const V=r(e,y,v),pe=(await s(V)).data();let q=[...pe.sessionState.questionsQueue||[]],ee=[...pe.participantList];const Ie=q.findIndex(Y=>Y.id===C);Ie!==-1&&(q[Ie].isGraded=!0,q[Ie].pointsAwarded=B);const ae=ee.findIndex(Y=>Y.id===R);ae!==-1&&(ee[ae].score=(ee[ae].score||0)+B),await a(V,{"sessionState.questionsQueue":q,participantList:ee}),Ae(`Berhasil memberi ${B} poin!`,"bg-green-600")}catch(V){console.error("Gagal memberi nilai:",V),O("Gagal menyimpan nilai ke database.","Error")}}Zi.addEventListener("click",()=>{re("Apakah Anda yakin ingin meninggalkan sesi?","Tinggalkan Sesi",async()=>{await Ks(),window.location.hash="#home"},"Tinggalkan","bg-red-600")}),ft&&ft.addEventListener("click",async()=>{Z.screenShareActive&&M?await an():await $n()}),oe.addEventListener("click",()=>Bn(!0)),ge.addEventListener("click",()=>Bn(!1)),Os.addEventListener("click",()=>{Ot.classList.add("hidden")}),M&&(fe.addEventListener("click",Bs),he.addEventListener("click",Gs),se.addEventListener("click",()=>re("Reset Sesi?","Reset",ur,"Reset","bg-red-600")),Ls.addEventListener("click",Hr),Vs.addEventListener("click",()=>{je=null,ar()}),Ns.addEventListener("click",qn),Nt.addEventListener("click",()=>jn()),Pn.addEventListener("submit",eo),Mt.addEventListener("click",()=>{const C=!N.sessionState.questionActive;a(r(e,y,v),{"sessionState.questionActive":C}),Ae(C?"Q&A Dibuka":"Q&A Ditutup","bg-purple-600")}),on&&on.addEventListener("click",()=>{At="incoming",or(N.sessionState.questionsQueue||[])}),Mn&&Mn.addEventListener("click",()=>{At="graded",or(N.sessionState.questionsQueue||[])}),Ut.addEventListener("click",()=>{On.classList.remove("hidden"),or(N.sessionState.questionsQueue||[])}),$r.addEventListener("click",()=>On.classList.add("hidden"))),Tt&&Tt.addEventListener("click",()=>{bt.classList.remove("hidden"),pt.value="",pt.focus()}),qr&&qr.addEventListener("click",()=>bt.classList.add("hidden")),jr&&jr.addEventListener("click",async()=>{const C=pt.value.trim();if(!C)return Ae("Isi pertanyaan.","bg-red-600");try{await a(r(e,y,v),{"sessionState.questionsQueue":u({id:"Q-"+Date.now(),userId:w.id,userName:w.name,text:C,timestamp:Date.now(),isGraded:!1,pointsAwarded:0})}),bt.classList.add("hidden"),Ae("Terkirim!","bg-purple-600")}catch{O("Gagal kirim.")}}),!M&&J&&J.addEventListener("click",()=>Pe.classList.remove("hidden"));const ro=r(e,y,v);st=p(ro,C=>{console.log("Menerima pembaruan data dari Firestore..."),C.exists()?Gr(C.data()):Gr(null)},C=>{console.error("Error mendengarkan onSnapshot:",C),O("Koneksi ke sesi terputus.","Koneksi Error")}),ot=Ks,window.addEventListener("beforeunload",ot),window.screenShareManager=Te,Gr(K)}function Ur(){const M=window.location.hash||"#login";ue&&(clearInterval(ue),ue=null),ot&&(window.removeEventListener("beforeunload",ot),ot=null),st&&(console.log("Berhenti mendengarkan sesi sebelumnya..."),st(),st=null),Te&&((Te.localStream||Te.peerConnection||Te.peerConnections)&&(Te.isPresenter?Te.stopScreenShare():Te.leaveScreenShare()),Te=null),M.startsWith("#meet")?Xi():M.startsWith("#home")?Sn():Mr()}window.addEventListener("hashchange",Ur),Ur()}const Xy={apiKey:"AIzaSyDjAMctceLqM0JMjs5yD3UGGOtLM2ERKtA",authDomain:"rapats-6e7cd.firebaseapp.com",projectId:"rapats-6e7cd",storageBucket:"rapats-6e7cd.firebasestorage.app",messagingSenderId:"416897724827",appId:"1:416897724827:web:6aabe72396ccc6eff8d713e",measurementId:"G-XTTZ4P054R"},Jr={db:null,auth:null,currentUserId:null,doc:Ay,getDoc:jy,setDoc:$y,updateDoc:zy,deleteDoc:Hy,onSnapshot:Gy,collection:by,arrayUnion:Wy,serverTimestamp:Ky,CLASS_COLLECTION_PATH:null};async function Zy(){try{console.log("Menginisialisasi Firebase...");const n="meet-quiz-app-local";Jr.CLASS_COLLECTION_PATH=`artifacts/${n}/public/data/meetQuizSessions`,console.log(`Menggunakan Jalur Koleksi: ${Jr.CLASS_COLLECTION_PATH}`);const e=Sl(Xy);Jr.db=Sy(e),Jr.auth=Mm(e),Fm("debug"),console.log("Auth siap, memulai aplikasi..."),Yy(Jr)}catch(n){console.error("Gagal menginisialisasi Firebase:",n),document.body.innerHTML=`<div style="color: white; padding: 20px;">Gagal terhubung ke Firebase. Periksa konsol (F12) untuk error. Error: ${n.message}</div>`}}Zy();
