/*! Spa Monitor Card v0.1.1
Derived from wilsto/pool-monitor-card.

MIT License

Copyright (c) 2026 JoeQuantum
Copyright (c) 2023-2026 wilsto

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const t="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,e=(t,e,s=null)=>{for(;e!==s;){const s=e.nextSibling;t.removeChild(e),e=s}},s=`{{lit-${String(Math.random()).slice(2)}}}`,i=`\x3c!--${s}--\x3e`,n=new RegExp(`${s}|${i}`),r="$lit$";class a{constructor(t,e){this.parts=[],this.element=e;const i=[],a=[],l=document.createTreeWalker(e.content,133,null,!1);let p=0,u=-1,h=0;const{strings:_,values:{length:g}}=t;for(;h<g;){const t=l.nextNode();if(null!==t){if(u++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:s}=e;let i=0;for(let t=0;t<s;t++)o(e[t].name,r)&&i++;for(;i-- >0;){const e=_[h],s=c.exec(e)[2],i=s.toLowerCase()+r,a=t.getAttribute(i);t.removeAttribute(i);const o=a.split(n);this.parts.push({type:"attribute",index:u,name:s,strings:o}),h+=o.length-1}}"TEMPLATE"===t.tagName&&(a.push(t),l.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(s)>=0){const s=t.parentNode,a=e.split(n),l=a.length-1;for(let e=0;e<l;e++){let i,n=a[e];if(""===n)i=d();else{const t=c.exec(n);null!==t&&o(t[2],r)&&(n=n.slice(0,t.index)+t[1]+t[2].slice(0,-5)+t[3]),i=document.createTextNode(n)}s.insertBefore(i,t),this.parts.push({type:"node",index:++u})}""===a[l]?(s.insertBefore(d(),t),i.push(t)):t.data=a[l],h+=l}}else if(8===t.nodeType)if(t.data===s){const e=t.parentNode;null!==t.previousSibling&&u!==p||(u++,e.insertBefore(d(),t)),p=u,this.parts.push({type:"node",index:u}),null===t.nextSibling?t.data="":(i.push(t),u--),h++}else{let e=-1;for(;-1!==(e=t.data.indexOf(s,e+1));)this.parts.push({type:"node",index:-1}),h++}}else l.currentNode=a.pop()}for(const t of i)t.parentNode.removeChild(t)}}const o=(t,e)=>{const s=t.length-e.length;return s>=0&&t.slice(s)===e},l=t=>-1!==t.index,d=()=>document.createComment(""),c=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function p(t,e){const{element:{content:s},parts:i}=t,n=document.createTreeWalker(s,133,null,!1);let r=h(i),a=i[r],o=-1,l=0;const d=[];let c=null;for(;n.nextNode();){o++;const t=n.currentNode;for(t.previousSibling===c&&(c=null),e.has(t)&&(d.push(t),null===c&&(c=t)),null!==c&&l++;void 0!==a&&a.index===o;)a.index=null!==c?-1:a.index-l,r=h(i,r),a=i[r]}d.forEach(t=>t.parentNode.removeChild(t))}const u=t=>{let e=11===t.nodeType?0:1;const s=document.createTreeWalker(t,133,null,!1);for(;s.nextNode();)e++;return e},h=(t,e=-1)=>{for(let s=e+1;s<t.length;s++){const e=t[s];if(l(e))return s}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const _=new WeakMap,g=t=>"function"==typeof t&&_.has(t),m={},v={};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class f{constructor(t,e,s){this.__parts=[],this.template=t,this.processor=e,this.options=s}update(t){let e=0;for(const s of this.__parts)void 0!==s&&s.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const e=t?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),s=[],i=this.template.parts,n=document.createTreeWalker(e,133,null,!1);let r,a=0,o=0,d=n.nextNode();for(;a<i.length;)if(r=i[a],l(r)){for(;o<r.index;)o++,"TEMPLATE"===d.nodeName&&(s.push(d),n.currentNode=d.content),null===(d=n.nextNode())&&(n.currentNode=s.pop(),d=n.nextNode());if("node"===r.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(d.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(d,r.name,r.strings,this.options));a++}else this.__parts.push(void 0),a++;return t&&(document.adoptNode(e),customElements.upgrade(e)),e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const b=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),y=` ${s} `;class x{constructor(t,e,s,i){this.strings=t,this.values=e,this.type=s,this.processor=i}getHTML(){const t=this.strings.length-1;let e="",n=!1;for(let a=0;a<t;a++){const t=this.strings[a],o=t.lastIndexOf("\x3c!--");n=(o>-1||n)&&-1===t.indexOf("--\x3e",o+1);const l=c.exec(t);e+=null===l?t+(n?y:i):t.substr(0,l.index)+l[1]+l[2]+r+l[3]+s}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return void 0!==b&&(e=b.createHTML(e)),t.innerHTML=e,t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const w=t=>null===t||!("object"==typeof t||"function"==typeof t),$=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class S{constructor(t,e,s){this.dirty=!0,this.element=t,this.name=e,this.strings=s,this.parts=[];for(let t=0;t<s.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new C(this)}_getValue(){const t=this.strings,e=t.length-1,s=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=s[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!$(t))return t}let i="";for(let n=0;n<e;n++){i+=t[n];const e=s[n];if(void 0!==e){const t=e.value;if(w(t)||!$(t))i+="string"==typeof t?t:String(t);else for(const e of t)i+="string"==typeof e?e:String(e)}}return i+=t[e],i}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class C{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===m||w(t)&&t===this.value||(this.value=t,g(t)||(this.committer.dirty=!0))}commit(){for(;g(this.value);){const t=this.value;this.value=m,t(this)}this.value!==m&&this.committer.commit()}}class k{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(d()),this.endNode=t.appendChild(d())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=d()),t.__insert(this.endNode=d())}insertAfterPart(t){t.__insert(this.startNode=d()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;g(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=m,t(this)}const t=this.__pendingValue;t!==m&&(w(t)?t!==this.value&&this.__commitText(t):t instanceof x?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):$(t)?this.__commitIterable(t):t===v?(this.value=v,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,s="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=s:this.__commitNode(document.createTextNode(s)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof f&&this.value.template===e)this.value.update(t.values);else{const s=new f(e,t.processor,this.options),i=s._clone();s.update(t.values),this.__commitNode(i),this.value=s}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let s,i=0;for(const n of t)s=e[i],void 0===s&&(s=new k(this.options),e.push(s),0===i?s.appendIntoPart(this):s.insertAfterPart(e[i-1])),s.setValue(n),s.commit(),i++;i<e.length&&(e.length=i,this.clear(s&&s.endNode))}clear(t=this.startNode){e(this.startNode.parentNode,t.nextSibling,this.endNode)}}class O{constructor(t,e,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=s}setValue(t){this.__pendingValue=t}commit(){for(;g(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=m,t(this)}if(this.__pendingValue===m)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=m}}class N extends S{constructor(t,e,s){super(t,e,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new P(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class P extends C{}let A=!1;(()=>{try{const t={get capture(){return A=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class T{constructor(t,e,s){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=s,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;g(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=m,t(this)}if(this.__pendingValue===m)return;const t=this.__pendingValue,e=this.value,s=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),i=null!=t&&(null==e||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),i&&(this.__options=E(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=m}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const E=t=>t&&(A?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function z(t){let e=M.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},M.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const n=t.strings.join(s);return i=e.keyString.get(n),void 0===i&&(i=new a(t,t.getTemplateElement()),e.keyString.set(n,i)),e.stringsArray.set(t.strings,i),i}const M=new Map,U=new WeakMap;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const I=new
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class{handleAttributeExpressions(t,e,s,i){const n=e[0];if("."===n){return new N(t,e.slice(1),s).parts}if("@"===n)return[new T(t,e.slice(1),i.eventContext)];if("?"===n)return[new O(t,e.slice(1),s)];return new S(t,e,s).parts}handleTextExpression(t){return new k(t)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.4.1");const j=(t,...e)=>new x(t,e,"html",I),V=(t,e)=>`${t}--${e}`;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */let B=!0;void 0===window.ShadyCSS?B=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),B=!1);const R=t=>e=>{const i=V(e.type,t);let n=M.get(i);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},M.set(i,n));let r=n.stringsArray.get(e.strings);if(void 0!==r)return r;const o=e.strings.join(s);if(r=n.keyString.get(o),void 0===r){const s=e.getTemplateElement();B&&window.ShadyCSS.prepareTemplateDom(s,t),r=new a(e,s),n.keyString.set(o,r)}return n.stringsArray.set(e.strings,r),r},q=["html","svg"],F=new Set,L=(t,e,s)=>{F.add(t);const i=s?s.element:document.createElement("template"),n=e.querySelectorAll("style"),{length:r}=n;if(0===r)return void window.ShadyCSS.prepareTemplateStyles(i,t);const a=document.createElement("style");for(let t=0;t<r;t++){const e=n[t];e.parentNode.removeChild(e),a.textContent+=e.textContent}(t=>{q.forEach(e=>{const s=M.get(V(e,t));void 0!==s&&s.keyString.forEach(t=>{const{element:{content:e}}=t,s=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{s.add(t)}),p(t,s)})})})(t);const o=i.content;s?function(t,e,s=null){const{element:{content:i},parts:n}=t;if(null==s)return void i.appendChild(e);const r=document.createTreeWalker(i,133,null,!1);let a=h(n),o=0,l=-1;for(;r.nextNode();)for(l++,r.currentNode===s&&(o=u(e),s.parentNode.insertBefore(e,s));-1!==a&&n[a].index===l;){if(o>0){for(;-1!==a;)n[a].index+=o,a=h(n,a);return}a=h(n,a)}}(s,a,o.firstChild):o.insertBefore(a,o.firstChild),window.ShadyCSS.prepareTemplateStyles(i,t);const l=o.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(s){o.insertBefore(a,o.firstChild);const t=new Set;t.add(a),p(s,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const D={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},H=(t,e)=>e!==t&&(e==e||t==t),G={attribute:!0,type:String,converter:D,reflect:!1,hasChanged:H},W="finalized";class J extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,s)=>{const i=this._attributeNameForProperty(s,e);void 0!==i&&(this._attributeToPropertyMap.set(i,s),t.push(i))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=G){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const s="symbol"==typeof t?Symbol():`__${t}`,i=this.getPropertyDescriptor(t,s,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const n=this[t];this[e]=i,this.requestUpdateInternal(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||G}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty(W)||t.finalize(),this[W]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const s of e)this.createProperty(s,t[s])}}static _attributeNameForProperty(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,s=H){return s(t,e)}static _propertyValueFromAttribute(t,e){const s=e.type,i=e.converter||D,n="function"==typeof i?i:i.fromAttribute;return n?n(t,s):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const s=e.type,i=e.converter;return(i&&i.toAttribute||D.toAttribute)(t,s)}initialize(){this._updateState=0,this._updatePromise=new Promise(t=>this._enableUpdatingResolver=t),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,s){e!==s&&this._attributeToProperty(t,s)}_propertyToAttribute(t,e,s=G){const i=this.constructor,n=i._attributeNameForProperty(t,s);if(void 0!==n){const t=i._propertyValueToAttribute(e,s);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(n):this.setAttribute(n,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const s=this.constructor,i=s._attributeToPropertyMap.get(t);if(void 0!==i){const t=s.getPropertyOptions(i);this._updateState=16|this._updateState,this[i]=s._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}requestUpdateInternal(t,e,s){let i=!0;if(void 0!==t){const n=this.constructor;s=s||n.getPropertyOptions(t),n._valueHasChanged(this[t],e,s.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==s.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,s))):i=!1}!this._hasRequestedUpdate&&i&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this.requestUpdateInternal(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}J[W]=!0;
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const K=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Q=Symbol();class Y{constructor(t,e){if(e!==Q)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(K?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const Z=(t,...e)=>{const s=e.reduce((e,s,i)=>e+(t=>{if(t instanceof Y)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+t[i+1],t[0]);return new Y(s,Q)};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litElementVersions||(window.litElementVersions=[])).push("2.5.1");const X={};class tt extends J{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(Array.isArray(t)){const e=(t,s)=>t.reduceRight((t,s)=>Array.isArray(s)?e(s,t):(t.add(s),t),s),s=e(t,new Set),i=[];s.forEach(t=>i.unshift(t)),this._styles=i}else this._styles=void 0===t?[]:[t];this._styles=this._styles.map(t=>{if(t instanceof CSSStyleSheet&&!K){const e=Array.prototype.slice.call(t.cssRules).reduce((t,e)=>t+e.cssText,"");return new Y(String(e),Q)}return t})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow(this.constructor.shadowRootOptions)}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?K?this.renderRoot.adoptedStyleSheets=t.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==X&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){return X}}tt.finalized=!0,tt.render=(t,s,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const n=i.scopeName,r=U.has(s),a=B&&11===s.nodeType&&!!s.host,o=a&&!F.has(n),l=o?document.createDocumentFragment():s;if(((t,s,i)=>{let n=U.get(s);void 0===n&&(e(s,s.firstChild),U.set(s,n=new k(Object.assign({templateFactory:z},i))),n.appendInto(s)),n.setValue(t),n.commit()})(t,l,Object.assign({templateFactory:R(n)},i)),o){const t=U.get(l);U.delete(l);const i=t.value instanceof f?t.value.template:void 0;L(n,l,i),e(s,s.firstChild),s.appendChild(l),U.set(s,t)}!r&&a&&window.ShadyCSS.styleElement(s.host)},tt.shadowRootOptions={mode:"open"};const et=Z`
  /* ===== Card Container (glassmorphism) ===== */
  :host {
    --_spa-card-bg: rgba(255, 255, 255, 0.72);
    --_spa-card-border: rgba(0, 0, 0, 0.12);
    --_spa-card-shadow: 0 2px 16px rgba(0, 0, 0, 0.08), 0 0 0 0.5px rgba(0, 0, 0, 0.06);
    --_spa-card-radius: 16px;
    --_spa-card-blur: 40px;
    --_spa-card-padding: 16px;

    --_spa-header-color: rgba(0, 0, 0, 0.75);
    --_spa-label-color: rgba(0, 0, 0, 0.6);
    --_spa-value-color: rgba(0, 0, 0, 0.45);

    --_spa-bar-width: 44px;
    --_spa-bar-height: 130px;
    --_spa-bar-radius: 3px;
    --_spa-bar-border: rgba(0, 0, 0, 0.1);

    --_spa-color-danger: #dc2626;
    --_spa-color-caution: #ca8a04;
    --_spa-color-ideal: #16a34a;

    --_spa-control-bg: rgba(0, 0, 0, 0.035);
    --_spa-control-border: rgba(0, 0, 0, 0.08);
    --_spa-control-active-bg: rgba(0, 0, 0, 0.14);
    --_spa-control-active-border: rgba(0, 0, 0, 0.25);
    --_spa-text-primary: rgba(0, 0, 0, 0.8);
    --_spa-text-secondary: rgba(0, 0, 0, 0.5);
    --_spa-text-tertiary: rgba(0, 0, 0, 0.3);

    --_spa-divider-color: rgba(0, 0, 0, 0.06);
  }

  .card {
    background: var(--spa-card-bg, var(--_spa-card-bg));
    backdrop-filter: blur(var(--spa-card-blur, var(--_spa-card-blur)));
    -webkit-backdrop-filter: blur(var(--spa-card-blur, var(--_spa-card-blur)));
    border-radius: var(--spa-card-radius, var(--_spa-card-radius));
    border: 1px solid var(--spa-card-border, var(--_spa-card-border));
    padding: var(--spa-card-padding, var(--_spa-card-padding));
    box-shadow: var(--spa-card-shadow, var(--_spa-card-shadow));
  }

  /* ===== Header ===== */
  .header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
  }
  .header-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--spa-header-color, var(--_spa-header-color));
  }

  /* ===== Bar Gauges Row ===== */
  .gauges-row {
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    padding-left: 12px;
    margin-bottom: 16px;
  }

  .gauge {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    flex: 1;
    min-width: 0;
  }
  .gauge-label, .gauge-value {
    max-width: 100%;
    overflow-wrap: anywhere;
    text-align: center;
  }
  .gauge-label {
    font-size: 12px;
    font-weight: 600;
    color: var(--spa-label-color, var(--_spa-label-color));
    letter-spacing: 0.01em;
  }
  .gauge-bar-container {
    position: relative;
    width: var(--spa-bar-width, var(--_spa-bar-width));
    height: var(--spa-bar-height, var(--_spa-bar-height));
  }
  .gauge-bar {
    width: 100%;
    height: 100%;
    border-radius: var(--spa-bar-radius, var(--_spa-bar-radius));
    box-shadow: inset 0 0 0 1.5px var(--spa-bar-border, var(--_spa-bar-border)), inset 0 1px 2px rgba(0, 0, 0, 0.08);
  }
  .gauge-bar.gradient-standard {
    background: linear-gradient(to top,
      var(--spa-color-danger, var(--_spa-color-danger)) 0%,
      var(--spa-color-danger, var(--_spa-color-danger)) 10%,
      var(--spa-color-caution, var(--_spa-color-caution)) 10%,
      var(--spa-color-caution, var(--_spa-color-caution)) 20%,
      var(--spa-color-ideal, var(--_spa-color-ideal)) 20%,
      var(--spa-color-ideal, var(--_spa-color-ideal)) 80%,
      var(--spa-color-caution, var(--_spa-color-caution)) 80%,
      var(--spa-color-caution, var(--_spa-color-caution)) 90%,
      var(--spa-color-danger, var(--_spa-color-danger)) 90%,
      var(--spa-color-danger, var(--_spa-color-danger)) 100%
    );
  }
  .gauge-bar.gradient-depletion {
    background: linear-gradient(to top,
      var(--spa-color-danger, var(--_spa-color-danger)) 0%,
      var(--spa-color-danger, var(--_spa-color-danger)) 10%,
      var(--spa-color-caution, var(--_spa-color-caution)) 10%,
      var(--spa-color-caution, var(--_spa-color-caution)) 20%,
      var(--spa-color-ideal, var(--_spa-color-ideal)) 20%,
      var(--spa-color-ideal, var(--_spa-color-ideal)) 100%
    );
  }
  .gauge-indicator {
    position: absolute;
    left: -8px;
    z-index: 2;
    line-height: 0;
    transform: translateY(50%);
  }
  .gauge-value {
    font-size: 12px;
    font-weight: 500;
    color: var(--spa-value-color, var(--_spa-value-color));
  }

  /* ===== Divider ===== */
  .divider {
    height: 1px;
    background: var(--spa-divider-color, var(--_spa-divider-color));
    margin: 4px 0 12px;
  }

  /* ===== Controls Row ===== */
  .controls-row {
    display: flex;
    gap: 10px;
    align-items: flex-end;
  }
  .output-level-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .output-level-label {
    font-size: 12px;
    font-weight: 600;
    color: var(--spa-label-color, var(--_spa-label-color));
    margin: 4px 0 8px 10px;
  }
  .output-level {
    background: var(--spa-control-bg, var(--_spa-control-bg));
    border-radius: 12px;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .stepper-btn {
    width: 34px;
    height: 34px;
    border-radius: 8px;
    border: 1px solid var(--spa-control-border, var(--_spa-control-border));
    background: var(--spa-control-bg, var(--_spa-control-bg));
    color: var(--spa-text-secondary, var(--_spa-text-secondary));
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }
  .output-level-value {
    font-size: 22px;
    font-weight: 700;
    color: var(--spa-text-primary, var(--_spa-text-primary));
    min-width: 30px;
    text-align: center;
  }

  .boost-btn {
    appearance: none;
    box-sizing: content-box;
    font: inherit;
    color: inherit;
    width: 100px;
    background: var(--spa-control-bg, var(--_spa-control-bg));
    border-radius: 12px;
    padding: 10px 12px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
    border: 1px solid transparent;
    transition: all 0.2s ease;
    user-select: none;
  }
  .boost-btn.active {
    background: var(--spa-control-active-bg, var(--_spa-control-active-bg));
    border-color: var(--spa-control-active-border, var(--_spa-control-active-border));
  }
  .boost-icon {
    stroke: var(--spa-text-secondary, var(--_spa-text-secondary));
  }
  .boost-btn.active .boost-icon {
    stroke: var(--spa-text-primary, var(--_spa-text-primary));
  }
  .boost-label {
    font-size: 12px;
    font-weight: 600;
    color: var(--spa-text-secondary, var(--_spa-text-secondary));
  }
  .boost-btn.active .boost-label {
    color: var(--spa-text-primary, var(--_spa-text-primary));
  }
  .boost-state {
    font-size: 11px;
    font-weight: 500;
    color: var(--spa-text-tertiary, var(--_spa-text-tertiary));
    opacity: 0.8;
  }
  .boost-btn.active .boost-state {
    color: var(--spa-text-secondary, var(--_spa-text-secondary));
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
  }
  .stepper-btn:focus-visible, .boost-btn:focus-visible, .gauge:focus-visible {
    outline: 2px solid var(--primary-color, #03a9f4);
    outline-offset: 3px;
  }
  .boost-btn:disabled { cursor: default; }

  /* ===== Unavailable state ===== */
  .gauge.unavailable {
    opacity: 0.4;
  }
  .output-level-wrapper.unavailable,
  .boost-btn.unavailable {
    opacity: 0.4;
    pointer-events: none;
  }
  .stepper-btn:disabled {
    opacity: 0.3;
    cursor: default;
  }

  /* ===== Dark mode ===== */
  .card.dark {
    --_spa-card-bg: rgba(30, 30, 30, 0.72);
    --_spa-card-border: rgba(255, 255, 255, 0.08);
    --_spa-card-shadow: 0 2px 16px rgba(0, 0, 0, 0.3);
    --_spa-header-color: rgba(255, 255, 255, 0.75);
    --_spa-label-color: rgba(255, 255, 255, 0.6);
    --_spa-value-color: rgba(255, 255, 255, 0.45);
    --_spa-bar-border: rgba(255, 255, 255, 0.15);
    --_spa-control-bg: rgba(255, 255, 255, 0.06);
    --_spa-control-border: rgba(255, 255, 255, 0.1);
    --_spa-control-active-bg: rgba(255, 255, 255, 0.35);
    --_spa-control-active-border: rgba(255, 255, 255, 0.3);
    --_spa-text-primary: rgba(255, 255, 255, 0.9);
    --_spa-text-secondary: rgba(255, 255, 255, 0.6);
    --_spa-text-tertiary: rgba(255, 255, 255, 0.35);
    --_spa-divider-color: rgba(255, 255, 255, 0.08);
  }

  /* ===== Glass mode (visionOS glassmorphism) ===== */
  .card.glass {
    --_spa-card-bg: rgba(255, 255, 255, 0.08);
    --_spa-card-border: rgba(255, 255, 255, 0.12);
    --_spa-card-shadow: 0 2px 16px rgba(0, 0, 0, 0.15);
    --_spa-card-blur: 40px;
    --_spa-header-color: rgba(255, 255, 255, 0.85);
    --_spa-label-color: rgba(255, 255, 255, 0.7);
    --_spa-value-color: rgba(255, 255, 255, 0.55);
    --_spa-bar-border: rgba(255, 255, 255, 0.18);
    --_spa-control-bg: rgba(255, 255, 255, 0.08);
    --_spa-control-border: rgba(255, 255, 255, 0.12);
    --_spa-control-active-bg: rgba(255, 255, 255, 0.35);
    --_spa-control-active-border: rgba(255, 255, 255, 0.35);
    --_spa-text-primary: rgba(255, 255, 255, 0.9);
    --_spa-text-secondary: rgba(255, 255, 255, 0.65);
    --_spa-text-tertiary: rgba(255, 255, 255, 0.4);
    --_spa-divider-color: rgba(255, 255, 255, 0.08);
  }
`,st={chlorine:{name:"Chlorine",unit:"ppm",min:0,max:10,setpoint:3,decimals:1,gradient:"standard",zones:[{value:10,position:0},{value:8,position:10},{value:5,position:20},{value:1,position:80},{value:.5,position:90},{value:0,position:100}]},ph:{name:"pH",unit:"",min:6,max:9,setpoint:7.5,decimals:1,gradient:"standard",zones:[{value:9,position:0},{value:8.2,position:10},{value:7.8,position:20},{value:7.2,position:80},{value:6.8,position:90},{value:6,position:100}]},salt:{name:"Salt",unit:"ppm",min:1e3,max:3e3,setpoint:1750,decimals:0,gradient:"standard",zones:[{value:3e3,position:0},{value:2500,position:10},{value:2e3,position:20},{value:1500,position:80},{value:1250,position:90},{value:1e3,position:100}]},iq_sensor:{name:"IQ Sensor",unit:"hours",min:508,max:1e4,setpoint:5e3,decimals:0,gradient:"depletion",display_format:"hours_to_months",hours_reserve:508,hours_per_month:730.5,zones:[{value:1e4,position:0},{value:1969,position:80},{value:654,position:90},{value:508,position:100}]}};function it(t,e){const s=e.zones;if(!s||s.length<2){return(Math.max(e.min,Math.min(e.max,t))-e.min)/(e.max-e.min)*100}const i=s[0].value,n=s[s.length-1].value,r=Math.max(n,Math.min(i,t));for(let t=0;t<s.length-1;t++){const e=s[t],i=s[t+1];if(r<=e.value&&r>=i.value){const t=e.value===i.value?0:(r-i.value)/(e.value-i.value);return 100-(i.position+t*(e.position-i.position))}}return 50}const nt=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),rt=(t,e)=>{throw new Error(`${t} ${e}`)},at=(t,e)=>{t&&"object"==typeof t&&!Array.isArray(t)&&[Object.prototype,null].includes(Object.getPrototypeOf(t))||rt(e,"must be an object.")},ot=(t,e)=>{"number"==typeof t&&Number.isFinite(t)||rt(e,"must be a finite number.")},lt=(t,e,s=!0)=>{"string"==typeof t&&(s||t.trim())||rt(e,s?"must be a string.":"must be a nonempty string.")},dt=(t,e,s)=>{"string"==typeof t&&t.trim()===t&&new RegExp(`^${s}\\.[a-z0-9_]+$`).test(t)||rt(e,s.startsWith("[")?"must be a Home Assistant entity ID (for example sensor.spa).":`must be a ${s} entity ID (for example ${s}.spa).`)};function ct(t,e){(!Array.isArray(t)||t.length<2)&&rt(e,"must contain at least two breakpoints.");const s=Array.from(t,(t,s)=>(at(t,`${e}[${s}]`),ot(t.value,`${e}[${s}].value`),ot(t.position,`${e}[${s}].position`),(t.position<0||t.position>100)&&rt(`${e}[${s}].position`,"must be between 0 and 100."),{...t}));0===s[0].position&&100===s.at(-1).position||rt(e,"must start at position 0 and end at 100 (top to bottom).");for(let t=1;t<s.length;t++)(s[t].value>=s[t-1].value||s[t].position<=s[t-1].position)&&rt(`${e}[${t}]`,"must have a lower value and a higher position than the previous breakpoint.");return s}function pt(t,e){const s=`sensors.${t}`;at(e,s);const i=nt(st,t)?st[t]:{},n={unit:"",decimals:1,gradient:"standard",display_format:null,...i,...e};if(nt(n,"attribute")&&lt(n.attribute,`${s}.attribute`,!1),dt(n.entity,`${s}.entity`,nt(n,"attribute")?"[a-z_][a-z0-9_]*":"sensor"),lt(n.name,`${s}.name`,!1),lt(n.unit,`${s}.unit`),(!Number.isInteger(n.decimals)||n.decimals<0||n.decimals>100)&&rt(`${s}.decimals`,"must be an integer from 0 to 100."),["standard","depletion"].includes(n.gradient)||rt(`${s}.gradient`,"must be standard or depletion."),[null,"numeric","hours_to_months"].includes(n.display_format)||rt(`${s}.display_format`,"must be null, numeric or hours_to_months."),nt(n,"setpoint")&&ot(n.setpoint,`${s}.setpoint`),nt(n,"availability")){at(n.availability,`${s}.availability`),dt(n.availability.entity,`${s}.availability.entity`,"[a-z_][a-z0-9_]*");const t=nt(n.availability,"state")?n.availability.state:"on";lt(t,`${s}.availability.state`,!1),["unknown","unavailable"].includes(t)&&rt(`${s}.availability.state`,"must identify a known available state."),n.availability={...n.availability,state:t}}if(nt(n,"freshness")){at(n.freshness,`${s}.freshness`);const t={...n.freshness};nt(t,"entity")&&dt(t.entity,`${s}.freshness.entity`,"[a-z_][a-z0-9_]*"),nt(t,"attribute")&&lt(t.attribute,`${s}.freshness.attribute`,!1),nt(t,"entity")||nt(t,"attribute")||rt(`${s}.freshness`,"requires an explicit sample-time entity or attribute."),ot(t.max_age,`${s}.freshness.max_age`),(t.max_age<=0||!Number.isFinite(1e3*t.max_age))&&rt(`${s}.freshness.max_age`,"must be a positive finite duration in seconds."),n.freshness=t}if(nt(n,"tap_action")&&(at(n.tap_action,`${s}.tap_action`),["none","more-info"].includes(n.tap_action.action)||rt(`${s}.tap_action.action`,"must be none or more-info."),nt(n.tap_action,"entity")&&dt(n.tap_action.entity,`${s}.tap_action.entity`,"[a-z_][a-z0-9_]*"),n.tap_action={...n.tap_action}),null===e.zones?n.zones=null:nt(e,"zones")?(n.zones=ct(e.zones,`${s}.zones`),nt(e,"min")||(n.min=n.zones.at(-1).value),nt(e,"max")||(n.max=n.zones[0].value)):i.zones&&(n.zones=i.zones.map(t=>({...t})),n.zones[0].value=n.max,n.zones.at(-1).value=n.min),ot(n.min,`${s}.min`),ot(n.max,`${s}.max`),(n.min>=n.max||!Number.isFinite(n.max-n.min))&&rt(s,"requires min < max with a finite span."),n.zones&&(n.zones=ct(n.zones,`${s}.zones`),n.zones[0].value===n.max&&n.zones.at(-1).value===n.min||rt(`${s}.zones`,"endpoints must equal max and min; supply matching bounds or omit them.")),"hours_to_months"===n.display_format||nt(n,"hours_per_month")){const t=void 0===n.hours_per_month?730.5:n.hours_per_month;("number"!=typeof t||!Number.isFinite(t)||t<=0)&&rt(`${s}.hours_per_month`,"must be a finite number greater than zero."),n.hours_per_month=t}if("hours_to_months"===n.display_format||nt(n,"hours_reserve")){const t=void 0===n.hours_reserve?0:n.hours_reserve;("number"!=typeof t||!Number.isFinite(t)||t<0)&&rt(`${s}.hours_reserve`,"must be a finite non-negative number."),n.hours_reserve=t}return n}function ut(t){at(t,"config"),at(t.sensors,"sensors"),0===Object.keys(t.sensors).length&&rt("sensors","must define at least one sensor."),nt(t,"title")&&lt(t.title,"title"),nt(t,"device_id")&&lt(t.device_id,"device_id",!1),nt(t,"theme")&&!["auto","light","dark","glass"].includes(t.theme)&&rt("theme","must be auto, light, dark or glass.");const e={};if(nt(t,"controls")){at(t.controls,"controls");for(const[s,i]of Object.entries(t.controls))["output_level","boost"].includes(s)||rt(`controls.${s}`,"is unsupported; use output_level or boost."),at(i,`controls.${s}`),dt(i.entity,`controls.${s}.entity`,"boost"===s?"switch":"number"),e[s]={...i}}return{...t,title:t.title??"",theme:t.theme??"auto",controls:e,sensors:Object.fromEntries(Object.entries(t.sensors).map(([t,e])=>[t,pt(t,e)]))}}function ht(t){if("string"==typeof t){const e=t.trim();if(!/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(e))return null;t=Number(e)}return"number"==typeof t&&Number.isFinite(t)?t:null}function _t(t){const e=ht(t?.state),s=t?.attributes||{},i=ht(void 0===s.min?0:s.min),n=ht(void 0===s.max?10:s.max),r=ht(void 0===s.step?1:s.step);return[e,i,n,r].includes(null)||i>=n||r<=0||e<i||e>n||!Number.isFinite((n-i)/r)?null:{value:e,min:i,max:n,step:r}}function gt(t,e,{min:s,max:i,step:n}){const r=(t-s)/n,a=Number.EPSILON*Math.max(1,Math.abs(r))*8,o=e>0?Math.floor(r+a)+1:Math.ceil(r-a)-1,l=Math.floor((i-s)/n+a),d=Number((s+Math.max(0,Math.min(l,o))*n).toPrecision(15));return!Number.isFinite(d)||d<s||d>i||(e>0?d<=t:d>=t)?null:d}function mt(t,e){const s=[...Object.values(t.sensors||{}),...Object.values(t.controls||{})],i=new Set(s.map(t=>e.entities?.[t?.entity]?.device_id).filter(Boolean)),n=t.device_id;return{deviceId:n||(1===i.size?[...i][0]:null),mixed:n?[...i].some(t=>t!==n):i.size>1,registryReady:!!e.entities}}function vt(t,e,s,i=""){const n=mt(t,e),r=Object.keys(e.states||{}).filter(i=>!(s&&!s.includes(i.split(".")[0]))&&(!(n.mixed&&!t.device_id)&&(!n.deviceId||e.entities?.[i]?.device_id===n.deviceId)));return i&&!r.includes(i)&&r.push(i),r.sort()}const ft=Object.keys(st),bt=(t,e)=>Object.hasOwn(t||{},e),yt=(t,e)=>bt(t,e)?t[e]:void 0;customElements.define("spa-monitor-card-editor",class extends tt{static get properties(){return{hass:{type:Object},_config:{type:Object},_error:{type:String},_pending:{type:Boolean}}}static get styles(){return Z`
      .editor, .section, .fields { display: flex; flex-direction: column; gap: 14px; }
      .editor { padding: 16px 0; }
      .section-title { font-weight: 600; font-size: 14px; color: var(--primary-text-color); }
      .section, details { min-width: 0; }
      details { border-bottom: 1px solid var(--divider-color); }
      summary { padding: 10px 0; font-size: 14px; font-weight: 500; cursor: pointer; overflow-wrap: anywhere; }
      .fields { padding: 0 0 16px; }
      .field { display: flex; flex-direction: column; gap: 5px; min-width: 0; }
      .field label, .hint { font-size: 12px; color: var(--secondary-text-color); }
      .field label { font-weight: 500; }
      .hint { margin: 0; line-height: 1.5; }
      .pair { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 12px; }
      input[type="text"], select {
        box-sizing: border-box; width: 100%; min-width: 0; padding: 10px;
        border: 1px solid var(--divider-color); border-radius: 4px;
        background: var(--card-background-color, #fff); color: var(--primary-text-color);
        font: inherit; font-size: 14px;
      }
      input[type="checkbox"] { margin: 0 8px 0 0; }
      .check { display: flex; align-items: center; font-size: 14px; }
      ha-entity-picker { display: block; min-width: 0; }
      button { align-self: flex-start; font: inherit; color: var(--primary-color); background: none; border: 0; padding: 6px 0; cursor: pointer; }
      :is(input, select, button, summary):focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
      .error { border-inline-start: 3px solid var(--error-color, #db4437); padding-inline-start: 10px; font-size: 14px; overflow-wrap: anywhere; }
      input[aria-invalid="true"] { border-color: var(--error-color, #db4437); }
      .field-error { color: var(--error-color, #db4437); font-size: 12px; overflow-wrap: anywhere; }
    `}setConfig(t){this._removedSensors??=new Map,this._removedControls??=new Map,this._removedOptions??=new Map,this._openGroups??=new Set([Object.keys(t.sensors||{})[0]||ft[0]]),this._pending&&JSON.stringify(t)===this._acceptedKey||(this._config={...t},this._acceptedConfig=this._config,this._acceptedKey=JSON.stringify(t),this._pending=!1,this._error=this._validate(this._config))}_validate(t){try{return ut(t),""}catch(t){return t.message}}render(){if(!this.hass||!this._config)return j``;const t=mt(this._config,this.hass),e=function(t,e){const s=new Set([...Object.keys(e.devices||{}),...Object.values(e.entities||{}).map(t=>t?.device_id).filter(t=>"string"==typeof t&&t),..."string"==typeof t.device_id&&t.device_id?[t.device_id]:[]]);return[...s].map(t=>{const s=e.devices?.[t];return{id:t,name:String(s?.name_by_user||s?.name||t)}}).sort((t,e)=>t.name.localeCompare(e.name)||t.id.localeCompare(e.id))}(this._config,this.hass),s=[...new Set([...ft,...Object.keys(this._config.sensors||{}),...this._removedSensors.keys()])];return j`
      <div class="editor">
        ${this._error?j`<div class="error" role="alert">
          ${this._pending?"Changes not applied yet. ":""}${this._error}
          ${this._pending?j`<p class="hint">Correct the fields before saving. HA still has the last accepted configuration.</p><button type="button" @click=${this._discardDraft}>Discard pending edits</button>`:""}
        </div>`:""}
        <div class="section">
          <div class="section-title">General</div>
          <div class="field">
            <label for="card-title">Title</label>
            <input type="text" id="card-title" .value=${this._config.title||""} @input=${this._titleChanged}>
          </div>
          <div class="field">
            <label for="card-theme">Theme</label>
            <select id="card-theme" .value=${this._config.theme||"auto"} @change=${this._themeChanged}>
              ${["auto","light","dark","glass"].map(t=>j`<option value=${t} ?selected=${t===(this._config.theme||"auto")}>${t[0].toUpperCase()+t.slice(1)}</option>`)}
            </select>
          </div>
          <div class="field">
            <label for="device-scope">Device for entity suggestions</label>
            <select id="device-scope" .value=${this._config.device_id||""} @change=${this._deviceChanged}>
              <option value="" ?selected=${!this._config.device_id}>Automatic from configured entities</option>
              ${e.map(t=>j`<option value=${t.id} ?selected=${this._config.device_id===t.id}>${t.name}${e.some(e=>e.id!==t.id&&e.name===t.name)?` (${t.id})`:""}</option>`)}
            </select>
            <p class="hint">Filters reading and control suggestions. Existing selections and explicitly chosen helper entities are retained.</p>
          </div>
          ${t.mixed?j`<div role="status">${this._config.device_id?"Some configured entities are outside the selected device. Suggestions follow that device; existing selections are retained.":"Configured entities span multiple devices. Choose a device for suggestions; existing selections are retained."}</div>`:""}
        </div>
        <div class="section">
          <div class="section-title">Sensors</div>
          <p class="hint">Open a sensor to edit its options. Blank overrides use the preset; a blank unit hides the unit. Custom breakpoints and extension options are preserved from YAML.</p>
          ${s.map(t=>this._renderSensorGroup(t))}
        </div>
        <div class="section">
          <div class="section-title">Controls</div>
          ${this._controlPicker("output_level","Output Level Entity","number")}
          ${this._controlPicker("boost","Boost Entity","switch")}
        </div>
      </div>
    `}_renderSensorGroup(t){const e=yt(this._config.sensors,t),s=e||this._removedSensors.get(t)||{},i=yt(st,t)||{},n=s.name||i.name||t,r=void 0===s.attribute?["sensor"]:void 0,a="hours_to_months"===(bt(e,"display_format")?e.display_format:i.display_format);return j`
      <details data-sensor=${t} .open=${this._openGroups.has(t)} @toggle=${e=>{e.target.open?this._openGroups.add(t):this._openGroups.delete(t)}}>
        <summary>${n}</summary>
        <div class="fields">
          <div class="field">
            <label>${n} Entity</label>
            <ha-entity-picker data-primary aria-label=${`${n} Entity`} .hass=${this.hass}
              .value=${e?.entity||""} .includeDomains=${r}
              .includeEntities=${vt(this._config,this.hass,r,e?.entity)}
              allow-custom-entity @value-changed=${e=>this._sensorChanged(t,e)}>
            </ha-entity-picker>
          </div>
          ${e?j`
            ${this._field(t,["name"],"Label",{fallback:i.name})}
            ${this._field(t,["unit"],"Unit",{fallback:i.unit,keepEmpty:!0})}
            ${bt(e,"unit")?j`<button type="button" @click=${()=>this._optionChanged(t,["unit"],void 0,!0)}>Use default unit</button>`:""}
            <div class="pair">
              ${this._field(t,["min"],"Minimum",{number:!0,fallback:i.min})}
              ${this._field(t,["max"],"Maximum",{number:!0,fallback:i.max})}
            </div>
            <label class="check"><input type="checkbox" .checked=${null===e.zones}
              @change=${e=>this._linearChanged(t,e.target.checked)}>Use a linear scale</label>
            ${Array.isArray(e.zones)?j`<p class="hint">Custom breakpoints are configured in YAML. Their endpoints must match any minimum and maximum overrides.</p>`:""}
            ${this._field(t,["decimals"],"Decimal places",{number:!0,fallback:i.decimals??1})}
            ${this._select(t,["gradient"],"Gradient",[["","Use preset"],["standard","Standard"],["depletion","Depletion"]])}
            ${this._select(t,["display_format"],"Display format",[["","Use preset"],["numeric","Number"],["hours_to_months","Estimated months"]])}
            ${a||bt(e,"hours_reserve")||bt(e,"hours_per_month")?j`
              <div class="pair">
                ${this._field(t,["hours_reserve"],"Reserve hours",{number:!0,fallback:i.hours_reserve??0})}
                ${this._field(t,["hours_per_month"],"Hours per month",{number:!0,fallback:i.hours_per_month??730.5})}
              </div><p class="hint">Months are an estimate. The IQ reserve is configurable and does not establish a confirmed expiry date.</p>`:""}
            ${this._field(t,["attribute"],"Numeric attribute")}
            <p class="hint">Leave the attribute blank to read the sensor state. A requested attribute never falls back to the state.</p>
            ${this._optionalGroup(t,"availability","Require an availability condition",j`
              ${this._helperPicker(t,["availability","entity"],"Availability entity")}
              ${this._field(t,["availability","state"],"Available state",{fallback:"on"})}
              <p class="hint">Only a known matching state allows the reading to display.</p>`)}
            ${this._optionalGroup(t,"freshness","Check sample age",j`
              ${this._helperPicker(t,["freshness","entity"],"Sample timestamp entity (optional)")}
              ${this._field(t,["freshness","attribute"],"Sample timestamp attribute")}
              ${this._field(t,["freshness","max_age"],"Maximum sample age (minutes)",{number:!0,factor:60})}
              <p class="hint">Use a true sample timestamp with a timezone. An attribute uses the reading entity unless another entity is selected. No age limit or sample time is inferred.</p>`)}
            ${this._select(t,["tap_action","action"],"Reading action",[["","Default (no action)"],["none","No action"],["more-info","Open HA history and details"]])}
            ${"more-info"===e.tap_action?.action?this._helperPicker(t,["tap_action","entity"],"History entity (optional)"):""}
          `:j`<p class="hint">Select an entity to configure this reading.</p>`}
        </div>
      </details>
    `}_value(t,e){const s=yt(this._config.sensors,t);return 1===e.length?yt(s,e[0]):yt(yt(s,e[0]),e[1])}_field(t,e,s,i={}){const n=`sensor-${encodeURIComponent(t)}-${e.join("-")}`,r=this._value(t,e),a=i.factor&&"number"==typeof r?r/i.factor:void 0===r&&i.keepEmpty?i.fallback:r,o=`sensors.${t}.${e.join(".")}`,l=!!this._error&&(this._error.startsWith(o+" ")||["min","max"].includes(e[0])&&this._error.startsWith(`sensors.${t} requires min`));return j`<div class="field">
      <label for=${n}>${s}</label>
      <input type="text" id=${n} inputmode=${i.number?"decimal":"text"}
        aria-invalid=${String(l)} aria-describedby=${l?`${n}-error`:""}
        .value=${void 0===a?"":String(a)} placeholder=${void 0===i.fallback?"":String(i.fallback)}
        @change=${s=>{const n=s.target.value,r=""===n&&!i.keepEmpty;let a=i.number?ht(n)??n:n;i.factor&&"number"==typeof a&&(a*=i.factor),this._optionChanged(t,e,a,r)}}>
      ${l?j`<span class="field-error" id=${`${n}-error`}>${this._error}</span>`:""}
    </div>`}_select(t,e,s,i){const n=`sensor-${encodeURIComponent(t)}-${e.join("-")}`,r=this._value(t,e),a=null===r&&"display_format"===e[0]?"numeric":r??"";return j`<div class="field"><label for=${n}>${s}</label>
      <select id=${n} .value=${a} @change=${s=>{"tap_action"===e[0]?this._actionChanged(t,s.target.value):this._optionChanged(t,e,s.target.value,""===s.target.value)}}>${i.map(([t,e])=>j`<option value=${t} ?selected=${a===t}>${e}</option>`)}</select></div>`}_helperPicker(t,e,s){return j`<div class="field"><label>${s}</label>
      <ha-entity-picker aria-label=${s} .hass=${this.hass} .value=${this._value(t,e)||""}
        allow-custom-entity @value-changed=${s=>this._optionChanged(t,e,s.detail.value,!s.detail.value)}>
      </ha-entity-picker></div>`}_optionalGroup(t,e,s,i){const n=bt(this._config.sensors[t],e);return j`<label class="check"><input type="checkbox" .checked=${n}
      @change=${s=>this._toggleOption(t,e,s.target.checked)}>${s}</label>
      ${n?i:""}`}_controlPicker(t,e,s){const i=this._config.controls?.[t]?.entity||"";return j`<div class="field"><label>${e}</label>
      <ha-entity-picker data-primary aria-label=${e} .hass=${this.hass} .value=${i}
        .includeDomains=${[s]} .includeEntities=${vt(this._config,this.hass,[s],i)}
        allow-custom-entity @value-changed=${e=>this._controlChanged(t,e)}>
      </ha-entity-picker></div>`}_titleChanged(t){this._updateConfig({title:t.target.value})}_themeChanged(t){this._updateConfig({theme:t.target.value})}_deviceChanged(t){const e={...this._config};t.target.value?e.device_id=t.target.value:delete e.device_id,this._publish(e)}_optionChanged(t,e,s,i=!1){this._publish(function(t,e,s,i,n=!1){let r={...Object.hasOwn(t.sensors||{},e)?t.sensors[e]:{}};if(1===s.length)n?delete r[s[0]]:r={...r,[s[0]]:i};else{let t={...r[s[0]]};n?delete t[s[1]]:t={...t,[s[1]]:i},r={...r,[s[0]]:t}}return{...t,sensors:{...t.sensors,[e]:r}}}(this._config,t,e,s,i))}_toggleOption(t,e,s){const i=JSON.stringify([t,e]);s||this._removedOptions.set(i,this._config.sensors[t][e]),this._optionChanged(t,[e],this._removedOptions.get(i)||{},!s)}_linearChanged(t,e){const s=JSON.stringify([t,"zones"]);if(e)this._removedOptions.set(s,this._config.sensors[t].zones),this._optionChanged(t,["zones"],null);else{const e=this._removedOptions.get(s);this._optionChanged(t,["zones"],e,void 0===e)}}_actionChanged(t,e){const s=JSON.stringify([t,"tap_action"]);e?this._optionChanged(t,["tap_action"],{...this._config.sensors[t].tap_action||this._removedOptions.get(s),action:e}):(this._removedOptions.set(s,this._config.sensors[t].tap_action),this._optionChanged(t,["tap_action"],void 0,!0))}_sensorChanged(t,e){const s=e.detail.value;let i={...this._config.sensors};s?(i={...i,[t]:{...yt(i,t)||this._removedSensors.get(t)||{},entity:s}},this._removedSensors.delete(t)):(bt(i,t)&&this._removedSensors.set(t,i[t]),delete i[t]),this._updateConfig({sensors:i})}_controlChanged(t,e){const s=e.detail.value,i={...this._config.controls};s?(i[t]={...i[t]||this._removedControls.get(t)||{},entity:s},this._removedControls.delete(t)):(i[t]&&this._removedControls.set(t,i[t]),delete i[t]),this._updateConfig({controls:i})}_updateConfig(t){this._publish({...this._config,...t})}_publish(t){var e,s;(this._config=t,this._error=this._validate(t),this._pending=!!this._error,this._pending)||(this._acceptedConfig=t,this._acceptedKey=JSON.stringify(t),e="config-changed",s={config:t},this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0,detail:s})))}_discardDraft(){this._config=this._acceptedConfig,this._pending=!1,this._error=this._validate(this._config)}});const xt=t=>!t||["unknown","unavailable",void 0,null,""].includes(t.state),wt=(t,e)=>({value:null,reason:t,status:e});function $t(t,e,s=Date.now()){const i=e?.[t.entity];if(xt(i))return wt("unavailable","Source unavailable");if(t.availability){const s=e?.[t.availability.entity];if(xt(s))return wt("availability_unknown","Availability unknown");if(s.state!==t.availability.state)return wt("disabled","Unavailable: availability condition not met")}const n=ht(void 0===t.attribute?i.state:i.attributes?.[t.attribute]);if(null===n)return wt("invalid",void 0===t.attribute?"Reading unavailable":"Attribute reading unavailable");if(!t.freshness)return{value:n};const r=t.freshness.entity?e?.[t.freshness.entity]:i;if(xt(r))return wt("freshness_unknown","Sample time unavailable");const a=function(t){if("string"!=typeof t)return null;const e=/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d{1,9})?(Z|[+-]\d{2}:\d{2})$/.exec(t);if(!e)return null;const[,s,i,n,r,a,o]=e.map((t,e)=>e>0&&e<7?Number(t):t);if(i<1||i>12||n<1||n>[31,s%4!=0||s%100==0&&s%400!=0?28:29,31,30,31,30,31,31,30,31,30,31][i-1]||r>23||a>59||o>59)return null;const l=Date.parse(t);return Number.isFinite(l)?l:null}(void 0===t.freshness.attribute?r.state:r.attributes?.[t.freshness.attribute]);if(null===a||!Number.isFinite(s)||a>s)return wt("freshness_unknown","Sample time unknown or in the future");const o=a+1e3*t.freshness.max_age;return s>=o?wt("stale","Stale sample"):{value:n,sampledAt:a,expiresAt:o}}let St=0;console.info("%c SPA-MONITOR-CARD %c v0.1.1 ","color: white; background: #16a34a; font-weight: bold;","color: #16a34a; background: white; font-weight: bold;");customElements.define("spa-monitor-card",class extends tt{constructor(){super(),this._instanceId=St++,this._pendingOutput=null,this._inflightOutput=null,this._outputTimer=null,this._outputError="",this._pendingBoost=null,this._boostTimer=null,this._boostError="",this._freshnessTimer=null,this._nextFreshnessAt=null,this._refreshAge=()=>this.requestUpdate()}static get properties(){return{hass:{type:Object},_config:{type:Object}}}static get styles(){return et}get hass(){return this._hass}set hass(t){const e=this._hass;this._hass=t;const s=this._pendingOutput;if(s){const i=t?.states?.[s.entity],n=_t(i);(!n||["min","max","step"].some(t=>n[t]!==s[t])||i!==e?.states?.[s.entity]&&n.value===s.value&&s.sentValue===s.value)&&this._clearOutputIntent()}const i=this._pendingBoost;if(i){const s=t?.states?.[i.entity];(!["on","off"].includes(s?.state)||s!==e?.states?.[i.entity]&&s.state===i.value)&&this._clearBoostIntent()}this.requestUpdate("hass",e)}connectedCallback(){super.connectedCallback(),document.addEventListener("visibilitychange",this._refreshAge),this.requestUpdate()}disconnectedCallback(){this._clearOutputIntent(),this._clearBoostIntent(),clearTimeout(this._freshnessTimer),this._freshnessTimer=null,document.removeEventListener("visibilitychange",this._refreshAge),super.disconnectedCallback()}updated(){clearTimeout(this._freshnessTimer),this._freshnessTimer=null,this.isConnected&&this.hass&&this._config&&Number.isFinite(this._nextFreshnessAt)&&(this._freshnessTimer=setTimeout(this._refreshAge,Math.min(2147483647,Math.max(1,this._nextFreshnessAt-Date.now()))))}static getConfigElement(){return document.createElement("spa-monitor-card-editor")}static getStubConfig(){return{sensors:{ph:{entity:"sensor.replace_with_spa_ph"}}}}setConfig(t){const e=ut(t);e.controls.output_level?.entity!==this._config?.controls?.output_level?.entity&&this._clearOutputIntent(),e.controls.boost?.entity!==this._config?.controls?.boost?.entity&&this._clearBoostIntent(),this._config=e}getConfig(){return this._config}getCardSize(){const t=this.shadowRoot?.querySelector(".card")?.getBoundingClientRect().height;return t>0?Math.ceil(t/50):Math.ceil((222+(this._config?.title?32:0)+(this._config&&this._hasControls()?90:0))/50)}render(){if(this._nextFreshnessAt=null,this._renderTime=Date.now(),!this._config||!this.hass)return j``;const t=this._config.theme,e="dark"===t||"auto"===t&&this.hass.themes?.darkMode;return j`
      <div class="card ${e?"dark":""} ${"glass"===t?"glass":""}">
        ${this._config.title?this._renderHeader():""}
        ${this._renderGauges()}
        ${this._hasControls()?j`
          <div class="divider"></div>
          ${this._renderControls()}
        `:""}
      </div>
    `}_renderHeader(){return j`
      <div class="header">
        <span class="header-title">${this._config.title}</span>
      </div>
    `}_renderGauges(){return j`
      <div class="gauges-row">
        ${Object.entries(this._config.sensors).map(([t,e])=>this._renderSingleGauge(t,e))}
      </div>
    `}_renderSingleGauge(t,e){const s=$t(e,this.hass.states,this._renderTime);Number.isFinite(s.expiresAt)&&(this._nextFreshnessAt=null===this._nextFreshnessAt?s.expiresAt:Math.min(this._nextFreshnessAt,s.expiresAt));const i=s.value,n=null===i,r=`gradient-${e.gradient||"standard"}`,a=n?0:function(t,e){return Math.max(5,Math.min(95,it(t,e)))}(i,e);let o="stale"===s.reason?"Stale":"---";n||(o=this._formatValue(i,e));const l=n?s.status:function(t,e){if(t<e.min)return"Below displayed range";if(t>e.max)return"Above displayed range";const s=it(t,e);return"depletion"===e.gradient?s>=20?"Within configured green band":s>=10?"Low (configured yellow band)":"Low (configured red band)":s>=20&&s<=80?"Within configured target band":s<20?s>=10?"Low (configured yellow band)":"Low (configured red band)":s<=90?"High (configured yellow band)":"High (configured red band)"}(i,e),d=n||"hours_to_months"!==e.display_format?"":`; ${i} raw hours; displayed months are an estimate`,c="more-info"===e.tap_action?.action,p=`${e.name}: ${o}; ${l}${d}${c?"; Open history and details":""}`;return j`
      <div class="gauge ${n?"unavailable":""}" role=${c?"button":"img"}
        aria-label=${p} title=${p} tabindex="0"
        @click=${()=>this._openMoreInfo(e)}
        @keydown=${t=>{c&&["Enter"," "].includes(t.key)&&(t.preventDefault(),t.repeat||this._openMoreInfo(e))}}>
        <span class="gauge-label">${e.name}</span>
        <div class="gauge-bar-container">
          <div class="gauge-bar ${r}"></div>
          ${n?"":j`
            <div class="gauge-indicator" style="bottom: ${a}%;">
              ${this._renderTriangle(t)}
            </div>
          `}
        </div>
        <span class="gauge-value">${o}</span>
      </div>
    `}_renderTriangle(t){const e=`triGrad-${this._instanceId}-${t}`;return j`
      <svg width="14" height="18" viewBox="0 0 14 18"
        style="filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.25));">
        <defs>
          <linearGradient id="${e}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="40%" stop-color="#e8e8e8"/>
            <stop offset="100%" stop-color="#cccccc"/>
          </linearGradient>
        </defs>
        <polygon points="0,0 14,9 0,18" fill="url(#${e})"/>
        <line x1="0" y1="0.5" x2="13" y2="8.5"
          stroke="rgba(255,255,255,0.9)" stroke-width="1"/>
        <line x1="0" y1="17.5" x2="13" y2="9.5"
          stroke="rgba(0,0,0,0.15)" stroke-width="0.8"/>
      </svg>
    `}_renderControls(){return j`
      <div class="controls-row">
        ${this._config.controls.output_level?this._renderOutputLevel():""}
        ${this._config.controls.boost?this._renderBoost():""}
      </div>
    `}_renderOutputLevel(){const t=this._config.controls.output_level.entity,e=_t(this.hass.states[t]),s=null===e,i=this._pendingOutput,n=i?.value??e?.value,r=e&&gt(n,-1,e),a=e&&gt(n,1,e),o=i?`Requested ${i.value}; waiting for the device report.`:this._outputError;return j`
      <div class="output-level-wrapper ${s?"unavailable":""}">
        <span class="output-level-label">Output Level</span>
        <div class="output-level" aria-busy=${i?"true":"false"} title=${o}>
          <span class="sr-only" role="status">${o}</span>
          <button type="button" class="stepper-btn"
            aria-label="Decrease output level"
            aria-describedby="output-report"
            ?disabled=${null===r}
            @click=${()=>this._adjustOutputLevel(-1)}>
            −
          </button>
          <span id="output-report" class="output-level-value" aria-live="polite">${s?"---":e.value}</span>
          <button type="button" class="stepper-btn"
            aria-label="Increase output level"
            aria-describedby="output-report"
            ?disabled=${null===a}
            @click=${()=>this._adjustOutputLevel(1)}>
            +
          </button>
        </div>
      </div>
    `}_renderBoost(){const t=this._config.controls.boost.entity,e=this.hass.states[t],s=!["on","off"].includes(e?.state),i="on"===e?.state,n=this._pendingBoost,r=n?`Requested Boost ${n.value}; waiting for the device report.`:this._boostError||(s?"Boost unavailable.":`Boost reported ${e.state}.`);return j`
      <button type="button" class="boost-btn ${i?"active":""} ${s?"unavailable":""}"
        aria-label="Boost" aria-pressed=${i?"true":"false"}
        aria-busy=${n?"true":"false"} aria-describedby="boost-status"
        ?disabled=${s||!!n} title=${r}
        @click=${this._requestBoost}>
        <svg class="boost-icon" width="20" height="20" viewBox="0 0 24 24" fill="none"
          aria-hidden="true"
          stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
        <span class="boost-label">Boost</span>
        <span class="boost-state">${s?"---":i?"On":"Off"}</span>
      </button>
      <span class="sr-only" id="boost-status" role="status">${r}</span>
    `}_formatValue(t,e){if(!Number.isFinite(t))return"---";if("hours_to_months"===e.display_format){const s=e.hours_reserve??0,i=e.hours_per_month??730.5,n=Math.max(0,(t-s)/i);return Number.isFinite(n)?`${Math.round(n)} mo`:"---"}const s=e.decimals??1,i=0===s?Math.round(t).toString():t.toFixed(s);return e.unit?`${i} ${e.unit}`:i}_hasControls(){return this._config.controls.output_level||this._config.controls.boost}_openMoreInfo(t){"more-info"===t.tap_action?.action&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t.tap_action.entity||t.entity},bubbles:!0,composed:!0}))}_clearOutputIntent(t=""){clearTimeout(this._outputTimer),this._outputTimer=null,this._pendingOutput=null,this._inflightOutput=null,this._outputError=t,this.requestUpdate()}_adjustOutputLevel(t){const e=this._config.controls.output_level.entity,s=_t(this.hass.states[e]);if(!s||![-1,1].includes(t))return;const i=gt(this._pendingOutput?.value??s.value,t,s);null!==i&&this._setOutputLevel(i)}_setOutputLevel(t){const e=this._config.controls.output_level.entity,s=_t(this.hass.states[e]);if(t=ht(t),!s||null===t||t<s.min||t>s.max)return;const i=(t-s.min)/s.step;Math.abs(i-Math.round(i))>Number.EPSILON*Math.max(1,Math.abs(i))*16||t!==(this._pendingOutput?.value??s.value)&&(this._pendingOutput={...s,entity:e,value:t,sentValue:this._inflightOutput?.value},this._outputError="",clearTimeout(this._outputTimer),this._outputTimer=setTimeout(()=>{this._clearOutputIntent("Output request timed out; showing the reported value.")},15e3),this.requestUpdate(),this._sendOutputIntent())}async _sendOutputIntent(){if(this._inflightOutput||!this._pendingOutput)return;const{entity:t,value:e}=this._pendingOutput,s={entity:t,value:e};this._inflightOutput=s,this._pendingOutput.sentValue=e;try{await this.hass.callService("number","set_value",{entity_id:t,value:e})}catch{return void(this._inflightOutput===s&&this._clearOutputIntent("Output request failed; showing the reported value."))}this._inflightOutput===s&&(this._inflightOutput=null,this._pendingOutput&&this._pendingOutput.value!==e&&this._sendOutputIntent())}_clearBoostIntent(t=""){clearTimeout(this._boostTimer),this._boostTimer=null,this._pendingBoost=null,this._boostError=t,this.requestUpdate()}async _requestBoost(){const t=this._config?.controls.boost?.entity,e=this.hass?.states?.[t]?.state;if(!this.isConnected||this._pendingBoost||!["on","off"].includes(e))return;const s={entity:t,value:"on"===e?"off":"on"};this._pendingBoost=s,this._boostError="",this._boostTimer=setTimeout(()=>{this._clearBoostIntent("Boost request timed out; showing the reported state.")},15e3),this.requestUpdate();try{await this.hass.callService("switch",`turn_${s.value}`,{entity_id:t})}catch{this._pendingBoost===s&&this._clearBoostIntent("Boost request failed; showing the reported state.")}}}),window.customCards=window.customCards||[],window.customCards.push({type:"spa-monitor-card",name:"Spa Monitor Card",description:"Water quality monitoring for HotSpring/ESP-IQ2020 salt systems"});
