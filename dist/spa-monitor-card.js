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
const e="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,t=(e,t,s=null)=>{for(;t!==s;){const s=t.nextSibling;e.removeChild(t),t=s}},s=`{{lit-${String(Math.random()).slice(2)}}}`,i=`\x3c!--${s}--\x3e`,n=new RegExp(`${s}|${i}`),r="$lit$";class a{constructor(e,t){this.parts=[],this.element=t;const i=[],a=[],l=document.createTreeWalker(t.content,133,null,!1);let u=0,p=-1,h=0;const{strings:_,values:{length:m}}=e;for(;h<m;){const e=l.nextNode();if(null!==e){if(p++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:s}=t;let i=0;for(let e=0;e<s;e++)o(t[e].name,r)&&i++;for(;i-- >0;){const t=_[h],s=c.exec(t)[2],i=s.toLowerCase()+r,a=e.getAttribute(i);e.removeAttribute(i);const o=a.split(n);this.parts.push({type:"attribute",index:p,name:s,strings:o}),h+=o.length-1}}"TEMPLATE"===e.tagName&&(a.push(e),l.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(s)>=0){const s=e.parentNode,a=t.split(n),l=a.length-1;for(let t=0;t<l;t++){let i,n=a[t];if(""===n)i=d();else{const e=c.exec(n);null!==e&&o(e[2],r)&&(n=n.slice(0,e.index)+e[1]+e[2].slice(0,-5)+e[3]),i=document.createTextNode(n)}s.insertBefore(i,e),this.parts.push({type:"node",index:++p})}""===a[l]?(s.insertBefore(d(),e),i.push(e)):e.data=a[l],h+=l}}else if(8===e.nodeType)if(e.data===s){const t=e.parentNode;null!==e.previousSibling&&p!==u||(p++,t.insertBefore(d(),e)),u=p,this.parts.push({type:"node",index:p}),null===e.nextSibling?e.data="":(i.push(e),p--),h++}else{let t=-1;for(;-1!==(t=e.data.indexOf(s,t+1));)this.parts.push({type:"node",index:-1}),h++}}else l.currentNode=a.pop()}for(const e of i)e.parentNode.removeChild(e)}}const o=(e,t)=>{const s=e.length-t.length;return s>=0&&e.slice(s)===t},l=e=>-1!==e.index,d=()=>document.createComment(""),c=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function u(e,t){const{element:{content:s},parts:i}=e,n=document.createTreeWalker(s,133,null,!1);let r=h(i),a=i[r],o=-1,l=0;const d=[];let c=null;for(;n.nextNode();){o++;const e=n.currentNode;for(e.previousSibling===c&&(c=null),t.has(e)&&(d.push(e),null===c&&(c=e)),null!==c&&l++;void 0!==a&&a.index===o;)a.index=null!==c?-1:a.index-l,r=h(i,r),a=i[r]}d.forEach(e=>e.parentNode.removeChild(e))}const p=e=>{let t=11===e.nodeType?0:1;const s=document.createTreeWalker(e,133,null,!1);for(;s.nextNode();)t++;return t},h=(e,t=-1)=>{for(let s=t+1;s<e.length;s++){const t=e[s];if(l(t))return s}return-1};
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
const _=new WeakMap,m=e=>"function"==typeof e&&_.has(e),g={},v={};
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
class f{constructor(e,t,s){this.__parts=[],this.template=e,this.processor=t,this.options=s}update(e){let t=0;for(const s of this.__parts)void 0!==s&&s.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const t=e?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),s=[],i=this.template.parts,n=document.createTreeWalker(t,133,null,!1);let r,a=0,o=0,d=n.nextNode();for(;a<i.length;)if(r=i[a],l(r)){for(;o<r.index;)o++,"TEMPLATE"===d.nodeName&&(s.push(d),n.currentNode=d.content),null===(d=n.nextNode())&&(n.currentNode=s.pop(),d=n.nextNode());if("node"===r.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(d.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(d,r.name,r.strings,this.options));a++}else this.__parts.push(void 0),a++;return e&&(document.adoptNode(t),customElements.upgrade(t)),t}}
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
 */const b=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),y=` ${s} `;class x{constructor(e,t,s,i){this.strings=e,this.values=t,this.type=s,this.processor=i}getHTML(){const e=this.strings.length-1;let t="",n=!1;for(let a=0;a<e;a++){const e=this.strings[a],o=e.lastIndexOf("\x3c!--");n=(o>-1||n)&&-1===e.indexOf("--\x3e",o+1);const l=c.exec(e);t+=null===l?e+(n?y:i):e.substr(0,l.index)+l[1]+l[2]+r+l[3]+s}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==b&&(t=b.createHTML(t)),e.innerHTML=t,e}}
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
 */const w=e=>null===e||!("object"==typeof e||"function"==typeof e),$=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class S{constructor(e,t,s){this.dirty=!0,this.element=e,this.name=t,this.strings=s,this.parts=[];for(let e=0;e<s.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new C(this)}_getValue(){const e=this.strings,t=e.length-1,s=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=s[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!$(e))return e}let i="";for(let n=0;n<t;n++){i+=e[n];const t=s[n];if(void 0!==t){const e=t.value;if(w(e)||!$(e))i+="string"==typeof e?e:String(e);else for(const t of e)i+="string"==typeof t?t:String(t)}}return i+=e[t],i}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class C{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===g||w(e)&&e===this.value||(this.value=e,m(e)||(this.committer.dirty=!0))}commit(){for(;m(this.value);){const e=this.value;this.value=g,e(this)}this.value!==g&&this.committer.commit()}}class k{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(d()),this.endNode=e.appendChild(d())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=d()),e.__insert(this.endNode=d())}insertAfterPart(e){e.__insert(this.startNode=d()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;m(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=g,e(this)}const e=this.__pendingValue;e!==g&&(w(e)?e!==this.value&&this.__commitText(e):e instanceof x?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):$(e)?this.__commitIterable(e):e===v?(this.value=v,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,s="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=s:this.__commitNode(document.createTextNode(s)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof f&&this.value.template===t)this.value.update(e.values);else{const s=new f(t,e.processor,this.options),i=s._clone();s.update(e.values),this.__commitNode(i),this.value=s}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let s,i=0;for(const n of e)s=t[i],void 0===s&&(s=new k(this.options),t.push(s),0===i?s.appendIntoPart(this):s.insertAfterPart(t[i-1])),s.setValue(n),s.commit(),i++;i<t.length&&(t.length=i,this.clear(s&&s.endNode))}clear(e=this.startNode){t(this.startNode.parentNode,e.nextSibling,this.endNode)}}class O{constructor(e,t,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=s}setValue(e){this.__pendingValue=e}commit(){for(;m(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=g,e(this)}if(this.__pendingValue===g)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=g}}class N extends S{constructor(e,t,s){super(e,t,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new T(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class T extends C{}let A=!1;(()=>{try{const e={get capture(){return A=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class P{constructor(e,t,s){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=s,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;m(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=g,e(this)}if(this.__pendingValue===g)return;const e=this.__pendingValue,t=this.value,s=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),i=null!=e&&(null==t||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),i&&(this.__options=E(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=g}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const E=e=>e&&(A?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);
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
 */function z(e){let t=M.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},M.set(e.type,t));let i=t.stringsArray.get(e.strings);if(void 0!==i)return i;const n=e.strings.join(s);return i=t.keyString.get(n),void 0===i&&(i=new a(e,e.getTemplateElement()),t.keyString.set(n,i)),t.stringsArray.set(e.strings,i),i}const M=new Map,U=new WeakMap;
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
class{handleAttributeExpressions(e,t,s,i){const n=t[0];if("."===n){return new N(e,t.slice(1),s).parts}if("@"===n)return[new P(e,t.slice(1),i.eventContext)];if("?"===n)return[new O(e,t.slice(1),s)];return new S(e,t,s).parts}handleTextExpression(e){return new k(e)}};
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
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.4.1");const j=(e,...t)=>new x(e,t,"html",I),V=(e,t)=>`${e}--${t}`;
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
 */let R=!0;void 0===window.ShadyCSS?R=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),R=!1);const B=e=>t=>{const i=V(t.type,e);let n=M.get(i);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},M.set(i,n));let r=n.stringsArray.get(t.strings);if(void 0!==r)return r;const o=t.strings.join(s);if(r=n.keyString.get(o),void 0===r){const s=t.getTemplateElement();R&&window.ShadyCSS.prepareTemplateDom(s,e),r=new a(t,s),n.keyString.set(o,r)}return n.stringsArray.set(t.strings,r),r},F=["html","svg"],q=new Set,L=(e,t,s)=>{q.add(e);const i=s?s.element:document.createElement("template"),n=t.querySelectorAll("style"),{length:r}=n;if(0===r)return void window.ShadyCSS.prepareTemplateStyles(i,e);const a=document.createElement("style");for(let e=0;e<r;e++){const t=n[e];t.parentNode.removeChild(t),a.textContent+=t.textContent}(e=>{F.forEach(t=>{const s=M.get(V(t,e));void 0!==s&&s.keyString.forEach(e=>{const{element:{content:t}}=e,s=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{s.add(e)}),u(e,s)})})})(e);const o=i.content;s?function(e,t,s=null){const{element:{content:i},parts:n}=e;if(null==s)return void i.appendChild(t);const r=document.createTreeWalker(i,133,null,!1);let a=h(n),o=0,l=-1;for(;r.nextNode();)for(l++,r.currentNode===s&&(o=p(t),s.parentNode.insertBefore(t,s));-1!==a&&n[a].index===l;){if(o>0){for(;-1!==a;)n[a].index+=o,a=h(n,a);return}a=h(n,a)}}(s,a,o.firstChild):o.insertBefore(a,o.firstChild),window.ShadyCSS.prepareTemplateStyles(i,e);const l=o.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)t.insertBefore(l.cloneNode(!0),t.firstChild);else if(s){o.insertBefore(a,o.firstChild);const e=new Set;e.add(a),u(s,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const D={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},H=(e,t)=>t!==e&&(t==t||e==e),G={attribute:!0,type:String,converter:D,reflect:!1,hasChanged:H},W="finalized";class J extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,s)=>{const i=this._attributeNameForProperty(s,t);void 0!==i&&(this._attributeToPropertyMap.set(i,s),e.push(i))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=G){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const s="symbol"==typeof e?Symbol():`__${e}`,i=this.getPropertyDescriptor(e,s,t);void 0!==i&&Object.defineProperty(this.prototype,e,i)}static getPropertyDescriptor(e,t,s){return{get(){return this[t]},set(i){const n=this[e];this[t]=i,this.requestUpdateInternal(e,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||G}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty(W)||e.finalize(),this[W]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const s of t)this.createProperty(s,e[s])}}static _attributeNameForProperty(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,s=H){return s(e,t)}static _propertyValueFromAttribute(e,t){const s=t.type,i=t.converter||D,n="function"==typeof i?i:i.fromAttribute;return n?n(e,s):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const s=t.type,i=t.converter;return(i&&i.toAttribute||D.toAttribute)(e,s)}initialize(){this._updateState=0,this._updatePromise=new Promise(e=>this._enableUpdatingResolver=e),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,s){t!==s&&this._attributeToProperty(e,s)}_propertyToAttribute(e,t,s=G){const i=this.constructor,n=i._attributeNameForProperty(e,s);if(void 0!==n){const e=i._propertyValueToAttribute(t,s);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(n):this.setAttribute(n,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const s=this.constructor,i=s._attributeToPropertyMap.get(e);if(void 0!==i){const e=s.getPropertyOptions(i);this._updateState=16|this._updateState,this[i]=s._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,s){let i=!0;if(void 0!==e){const n=this.constructor;s=s||n.getPropertyOptions(e),n._valueHasChanged(this[e],t,s.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==s.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,s))):i=!1}!this._hasRequestedUpdate&&i&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}J[W]=!0;
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
const K=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Q=Symbol();class Y{constructor(e,t){if(t!==Q)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(K?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const Z=(e,...t)=>{const s=t.reduce((t,s,i)=>t+(e=>{if(e instanceof Y)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+e[i+1],e[0]);return new Y(s,Q)};
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.5.1");const X={};class ee extends J{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,s)=>e.reduceRight((e,s)=>Array.isArray(s)?t(s,e):(e.add(s),e),s),s=t(e,new Set),i=[];s.forEach(e=>i.unshift(e)),this._styles=i}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map(e=>{if(e instanceof CSSStyleSheet&&!K){const t=Array.prototype.slice.call(e.cssRules).reduce((e,t)=>e+t.cssText,"");return new Y(String(t),Q)}return e})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow(this.constructor.shadowRootOptions)}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?K?this.renderRoot.adoptedStyleSheets=e.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==X&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){return X}}ee.finalized=!0,ee.render=(e,s,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const n=i.scopeName,r=U.has(s),a=R&&11===s.nodeType&&!!s.host,o=a&&!q.has(n),l=o?document.createDocumentFragment():s;if(((e,s,i)=>{let n=U.get(s);void 0===n&&(t(s,s.firstChild),U.set(s,n=new k(Object.assign({templateFactory:z},i))),n.appendInto(s)),n.setValue(e),n.commit()})(e,l,Object.assign({templateFactory:B(n)},i)),o){const e=U.get(l);U.delete(l);const i=e.value instanceof f?e.value.template:void 0;L(n,l,i),t(s,s.firstChild),s.appendChild(l),U.set(s,e)}!r&&a&&window.ShadyCSS.styleElement(s.host)},ee.shadowRootOptions={mode:"open"};const te=Z`
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
    display: block;
    box-sizing: border-box;
    transition: none;
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
  .gauge-label, .gauge-value, .gauge-trend, .gauge-estimate {
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
  .gauge-trend, .gauge-estimate {
    font-size: 12px;
    line-height: 1.4;
    padding-inline: 3px;
    box-sizing: border-box;
    color: var(--spa-trend-color, var(--spa-label-color, var(--_spa-label-color)));
    font-variant-numeric: tabular-nums;
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
`,se={chlorine:{name:"Chlorine",unit:"ppm",min:0,max:10,setpoint:3,decimals:1,gradient:"standard",zones:[{value:10,position:0},{value:8,position:10},{value:5,position:20},{value:1,position:80},{value:.5,position:90},{value:0,position:100}]},ph:{name:"pH",unit:"",min:6,max:9,setpoint:7.5,decimals:1,gradient:"standard",zones:[{value:9,position:0},{value:8.2,position:10},{value:7.8,position:20},{value:7.2,position:80},{value:6.8,position:90},{value:6,position:100}]},salt:{name:"Salt",unit:"ppm",min:1e3,max:3e3,setpoint:1750,decimals:0,gradient:"standard",zones:[{value:3e3,position:0},{value:2500,position:10},{value:2e3,position:20},{value:1500,position:80},{value:1250,position:90},{value:1e3,position:100}]},iq_sensor:{name:"IQ Sensor",unit:"hours",min:508,max:1e4,setpoint:5e3,decimals:0,gradient:"depletion",display_format:"hours_to_months",hours_reserve:508,hours_per_month:730.5,zones:[{value:1e4,position:0},{value:1969,position:80},{value:654,position:90},{value:508,position:100}]}};function ie(e,t){const s=t.zones;if(!s||s.length<2){return(Math.max(t.min,Math.min(t.max,e))-t.min)/(t.max-t.min)*100}const i=s[0].value,n=s[s.length-1].value,r=Math.max(n,Math.min(i,e));for(let e=0;e<s.length-1;e++){const t=s[e],i=s[e+1];if(r<=t.value&&r>=i.value){const e=t.value===i.value?0:(r-i.value)/(t.value-i.value);return 100-(i.position+e*(t.position-i.position))}}return 50}const ne=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),re=(e,t)=>{throw new Error(`${e} ${t}`)},ae=(e,t)=>{e&&"object"==typeof e&&!Array.isArray(e)&&[Object.prototype,null].includes(Object.getPrototypeOf(e))||re(t,"must be an object.")},oe=(e,t)=>{"number"==typeof e&&Number.isFinite(e)||re(t,"must be a finite number.")},le=(e,t,s=!0)=>{"string"==typeof e&&(s||e.trim())||re(t,s?"must be a string.":"must be a nonempty string.")},de=(e,t,s)=>{"string"==typeof e&&e.trim()===e&&new RegExp(`^${s}\\.[a-z0-9_]+$`).test(e)||re(t,s.startsWith("[")?"must be a Home Assistant entity ID (for example sensor.spa).":`must be a ${s} entity ID (for example ${s}.spa).`)};function ce(e,t){(!Array.isArray(e)||e.length<2)&&re(t,"must contain at least two breakpoints.");const s=Array.from(e,(e,s)=>(ae(e,`${t}[${s}]`),oe(e.value,`${t}[${s}].value`),oe(e.position,`${t}[${s}].position`),(e.position<0||e.position>100)&&re(`${t}[${s}].position`,"must be between 0 and 100."),{...e}));0===s[0].position&&100===s.at(-1).position||re(t,"must start at position 0 and end at 100 (top to bottom).");for(let e=1;e<s.length;e++)(s[e].value>=s[e-1].value||s[e].position<=s[e-1].position)&&re(`${t}[${e}]`,"must have a lower value and a higher position than the previous breakpoint.");return s}function ue(e,t){ae(e,t);const s={...e};if(ne(s,"attribute")&&le(s.attribute,`${t}.attribute`,!1),de(s.entity,`${t}.entity`,ne(s,"attribute")?"[a-z_][a-z0-9_]*":"sensor"),ne(s,"availability")){ae(s.availability,`${t}.availability`),de(s.availability.entity,`${t}.availability.entity`,"[a-z_][a-z0-9_]*");const e=ne(s.availability,"state")?s.availability.state:"on";le(e,`${t}.availability.state`,!1),["unknown","unavailable"].includes(e)&&re(`${t}.availability.state`,"must identify a known available state."),s.availability={...s.availability,state:e}}if(ne(s,"freshness")){ae(s.freshness,`${t}.freshness`);const e={...s.freshness};ne(e,"entity")&&de(e.entity,`${t}.freshness.entity`,"[a-z_][a-z0-9_]*"),ne(e,"attribute")&&le(e.attribute,`${t}.freshness.attribute`,!1),ne(e,"entity")||ne(e,"attribute")||re(`${t}.freshness`,"requires an explicit sample-time entity or attribute."),oe(e.max_age,`${t}.freshness.max_age`),(e.max_age<=0||!Number.isFinite(1e3*e.max_age))&&re(`${t}.freshness.max_age`,"must be a positive finite duration in seconds."),s.freshness=e}return s}function pe(e,t){const s=`sensors.${e}`;ae(t,s);const i=ne(se,e)?se[e]:{},n=ue({unit:"",decimals:1,gradient:"standard",display_format:null,...i,...t},s);if(le(n.name,`${s}.name`,!1),le(n.unit,`${s}.unit`),(!Number.isInteger(n.decimals)||n.decimals<0||n.decimals>100)&&re(`${s}.decimals`,"must be an integer from 0 to 100."),["standard","depletion"].includes(n.gradient)||re(`${s}.gradient`,"must be standard or depletion."),[null,"numeric","hours_to_months"].includes(n.display_format)||re(`${s}.display_format`,"must be null, numeric or hours_to_months."),ne(n,"setpoint")&&oe(n.setpoint,`${s}.setpoint`),ne(n,"trend")){const e=`${s}.trend`,t=ue(n.trend,e);le(t.unit,`${e}.unit`,!1),t.unit.trim()===t.unit&&/^.*\/(s|min|h|d)$/.test(t.unit)||re(`${e}.unit`,"must declare a rate unit ending in /s, /min, /h or /d (for example ppm/h or /h for unitless readings)."),ne(t,"deadband")||(t.deadband=0),ne(t,"hysteresis")||(t.hysteresis=0),ne(t,"decimals")||(t.decimals=2),oe(t.deadband,`${e}.deadband`),oe(t.hysteresis,`${e}.hysteresis`),t.deadband<0&&re(`${e}.deadband`,"must be non-negative in the declared rate unit."),(t.hysteresis<0||t.hysteresis>t.deadband||!Number.isFinite(t.deadband+t.hysteresis))&&re(`${e}.hysteresis`,"must be between zero and deadband with a finite sum."),(!Number.isInteger(t.decimals)||t.decimals<0||t.decimals>6)&&re(`${e}.decimals`,"must be an integer from 0 to 6."),n.trend=t}if(ne(n,"tap_action")&&(ae(n.tap_action,`${s}.tap_action`),["none","more-info"].includes(n.tap_action.action)||re(`${s}.tap_action.action`,"must be none or more-info."),ne(n.tap_action,"entity")&&de(n.tap_action.entity,`${s}.tap_action.entity`,"[a-z_][a-z0-9_]*"),n.tap_action={...n.tap_action}),null===t.zones?n.zones=null:ne(t,"zones")?(n.zones=ce(t.zones,`${s}.zones`),ne(t,"min")||(n.min=n.zones.at(-1).value),ne(t,"max")||(n.max=n.zones[0].value)):i.zones&&(n.zones=i.zones.map(e=>({...e})),n.zones[0].value=n.max,n.zones.at(-1).value=n.min),oe(n.min,`${s}.min`),oe(n.max,`${s}.max`),(n.min>=n.max||!Number.isFinite(n.max-n.min))&&re(s,"requires min < max with a finite span."),n.zones&&(n.zones=ce(n.zones,`${s}.zones`),n.zones[0].value===n.max&&n.zones.at(-1).value===n.min||re(`${s}.zones`,"endpoints must equal max and min; supply matching bounds or omit them.")),"hours_to_months"===n.display_format||ne(n,"hours_per_month")){const e=void 0===n.hours_per_month?730.5:n.hours_per_month;("number"!=typeof e||!Number.isFinite(e)||e<=0)&&re(`${s}.hours_per_month`,"must be a finite number greater than zero."),n.hours_per_month=e}if("hours_to_months"===n.display_format||ne(n,"hours_reserve")){const e=void 0===n.hours_reserve?0:n.hours_reserve;("number"!=typeof e||!Number.isFinite(e)||e<0)&&re(`${s}.hours_reserve`,"must be a finite non-negative number."),n.hours_reserve=e}return n}function he(e){ae(e,"config"),ae(e.sensors,"sensors"),0===Object.keys(e.sensors).length&&re("sensors","must define at least one sensor."),ne(e,"title")&&le(e.title,"title"),ne(e,"device_id")&&le(e.device_id,"device_id",!1),ne(e,"theme")&&!["auto","light","dark","glass"].includes(e.theme)&&re("theme","must be auto, light, dark or glass.");const t={};if(ne(e,"controls")){ae(e.controls,"controls");for(const[s,i]of Object.entries(e.controls))["output_level","boost"].includes(s)||re(`controls.${s}`,"is unsupported; use output_level or boost."),ae(i,`controls.${s}`),de(i.entity,`controls.${s}.entity`,"boost"===s?"switch":"number"),t[s]={...i}}return{...e,title:e.title??"",theme:e.theme??"auto",controls:t,sensors:Object.fromEntries(Object.entries(e.sensors).map(([e,t])=>[e,pe(e,t)]))}}function _e(e){if("string"==typeof e){const t=e.trim();if(!/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(t))return null;e=Number(t)}return"number"==typeof e&&Number.isFinite(e)?e:null}function me(e){const t=_e(e?.state),s=e?.attributes||{},i=_e(void 0===s.min?0:s.min),n=_e(void 0===s.max?10:s.max),r=_e(void 0===s.step?1:s.step);return[t,i,n,r].includes(null)||i>=n||r<=0||t<i||t>n||!Number.isFinite((n-i)/r)?null:{value:t,min:i,max:n,step:r}}function ge(e,t,{min:s,max:i,step:n}){const r=(e-s)/n,a=Number.EPSILON*Math.max(1,Math.abs(r))*8,o=t>0?Math.floor(r+a)+1:Math.ceil(r-a)-1,l=Math.floor((i-s)/n+a),d=Number((s+Math.max(0,Math.min(l,o))*n).toPrecision(15));return!Number.isFinite(d)||d<s||d>i||(t>0?d<=e:d>=e)?null:d}function ve(e,t){const s=[...Object.values(e.sensors||{}),...Object.values(e.controls||{})],i=new Set(s.map(e=>t.entities?.[e?.entity]?.device_id).filter(Boolean)),n=e.device_id;return{deviceId:n||(1===i.size?[...i][0]:null),mixed:n?[...i].some(e=>e!==n):i.size>1,registryReady:!!t.entities}}function fe(e,t,s,i=""){const n=ve(e,t),r=Object.keys(t.states||{}).filter(i=>!(s&&!s.includes(i.split(".")[0]))&&(!(n.mixed&&!e.device_id)&&(!n.deviceId||t.entities?.[i]?.device_id===n.deviceId)));return i&&!r.includes(i)&&r.push(i),r.sort()}const be=Object.keys(se),ye=(e,t)=>Object.hasOwn(e||{},t),xe=(e,t)=>ye(e,t)?e[t]:void 0;customElements.define("spa-monitor-card-editor",class extends ee{static get properties(){return{hass:{type:Object},_config:{type:Object},_error:{type:String},_pending:{type:Boolean}}}static get styles(){return Z`
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
    `}setConfig(e){this._removedSensors??=new Map,this._removedControls??=new Map,this._removedOptions??=new Map,this._openGroups??=new Set([Object.keys(e.sensors||{})[0]||be[0]]),this._pending&&JSON.stringify(e)===this._acceptedKey||(this._config={...e},this._acceptedConfig=this._config,this._acceptedKey=JSON.stringify(e),this._pending=!1,this._error=this._validate(this._config))}_validate(e){try{return he(e),""}catch(e){return e.message}}render(){if(!this.hass||!this._config)return j``;const e=ve(this._config,this.hass),t=function(e,t){const s=new Set([...Object.keys(t.devices||{}),...Object.values(t.entities||{}).map(e=>e?.device_id).filter(e=>"string"==typeof e&&e),..."string"==typeof e.device_id&&e.device_id?[e.device_id]:[]]);return[...s].map(e=>{const s=t.devices?.[e];return{id:e,name:String(s?.name_by_user||s?.name||e)}}).sort((e,t)=>e.name.localeCompare(t.name)||e.id.localeCompare(t.id))}(this._config,this.hass),s=[...new Set([...be,...Object.keys(this._config.sensors||{}),...this._removedSensors.keys()])];return j`
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
              ${["auto","light","dark","glass"].map(e=>j`<option value=${e} ?selected=${e===(this._config.theme||"auto")}>${e[0].toUpperCase()+e.slice(1)}</option>`)}
            </select>
          </div>
          <div class="field">
            <label for="device-scope">Device for entity suggestions</label>
            <select id="device-scope" .value=${this._config.device_id||""} @change=${this._deviceChanged}>
              <option value="" ?selected=${!this._config.device_id}>Automatic from configured entities</option>
              ${t.map(e=>j`<option value=${e.id} ?selected=${this._config.device_id===e.id}>${e.name}${t.some(t=>t.id!==e.id&&t.name===e.name)?` (${e.id})`:""}</option>`)}
            </select>
            <p class="hint">Filters reading and control suggestions. Existing selections and explicitly chosen helper entities are retained.</p>
          </div>
          ${e.mixed?j`<div role="status">${this._config.device_id?"Some configured entities are outside the selected device. Suggestions follow that device; existing selections are retained.":"Configured entities span multiple devices. Choose a device for suggestions; existing selections are retained."}</div>`:""}
        </div>
        <div class="section">
          <div class="section-title">Sensors</div>
          <p class="hint">Open a sensor to edit its options. Blank overrides use the preset; a blank unit hides the unit. Custom breakpoints and extension options are preserved from YAML.</p>
          ${s.map(e=>this._renderSensorGroup(e))}
        </div>
        <div class="section">
          <div class="section-title">Controls</div>
          ${this._controlPicker("output_level","Output Level Entity","number")}
          ${this._controlPicker("boost","Boost Entity","switch")}
        </div>
      </div>
    `}_renderSensorGroup(e){const t=xe(this._config.sensors,e),s=t||this._removedSensors.get(e)||{},i=xe(se,e)||{},n=s.name||i.name||e,r=void 0===s.attribute?["sensor"]:void 0,a="hours_to_months"===(ye(t,"display_format")?t.display_format:i.display_format);return j`
      <details data-sensor=${e} .open=${this._openGroups.has(e)} @toggle=${t=>{t.target.open?this._openGroups.add(e):this._openGroups.delete(e)}}>
        <summary>${n}</summary>
        <div class="fields">
          <div class="field">
            <label>${n} Entity</label>
            <ha-entity-picker data-primary aria-label=${`${n} Entity`} .hass=${this.hass}
              .value=${t?.entity||""} .includeDomains=${r}
              .includeEntities=${fe(this._config,this.hass,r,t?.entity)}
              allow-custom-entity @value-changed=${t=>this._sensorChanged(e,t)}>
            </ha-entity-picker>
          </div>
          ${t?j`
            ${this._field(e,["name"],"Label",{fallback:i.name})}
            ${this._field(e,["unit"],"Unit",{fallback:i.unit,keepEmpty:!0})}
            ${ye(t,"unit")?j`<button type="button" @click=${()=>this._optionChanged(e,["unit"],void 0,!0)}>Use default unit</button>`:""}
            <div class="pair">
              ${this._field(e,["min"],"Minimum",{number:!0,fallback:i.min})}
              ${this._field(e,["max"],"Maximum",{number:!0,fallback:i.max})}
            </div>
            <label class="check"><input type="checkbox" .checked=${null===t.zones}
              @change=${t=>this._linearChanged(e,t.target.checked)}>Use a linear scale</label>
            ${Array.isArray(t.zones)?j`<p class="hint">Custom breakpoints are configured in YAML. Their endpoints must match any minimum and maximum overrides.</p>`:""}
            ${this._field(e,["decimals"],"Decimal places",{number:!0,fallback:i.decimals??1})}
            ${this._select(e,["gradient"],"Gradient",[["","Use preset"],["standard","Standard"],["depletion","Depletion"]])}
            ${this._select(e,["display_format"],"Display format",[["","Use preset"],["numeric","Number"],["hours_to_months","Estimated months"]])}
            ${a||ye(t,"hours_reserve")||ye(t,"hours_per_month")?j`
              <div class="pair">
                ${this._field(e,["hours_reserve"],"Reserve hours",{number:!0,fallback:i.hours_reserve??0})}
                ${this._field(e,["hours_per_month"],"Hours per month",{number:!0,fallback:i.hours_per_month??730.5})}
              </div><p class="hint">Months are an estimate. The IQ reserve is configurable and does not establish a confirmed expiry date.</p>`:""}
            ${this._field(e,["attribute"],"Numeric attribute")}
            <p class="hint">Leave the attribute blank to read the sensor state. A requested attribute never falls back to the state.</p>
            ${this._optionalGroup(e,"availability","Require an availability condition",j`
              ${this._helperPicker(e,["availability","entity"],"Availability entity")}
              ${this._field(e,["availability","state"],"Available state",{fallback:"on"})}
              <p class="hint">Only a known matching state allows the reading to display.</p>`)}
            ${this._optionalGroup(e,"freshness","Check sample age",j`
              ${this._helperPicker(e,["freshness","entity"],"Sample timestamp entity (optional)")}
              ${this._field(e,["freshness","attribute"],"Sample timestamp attribute")}
              ${this._field(e,["freshness","max_age"],"Maximum sample age (minutes)",{number:!0,factor:60})}
              <p class="hint">Use a true sample timestamp with a timezone. An attribute uses the reading entity unless another entity is selected. No age limit or sample time is inferred.</p>`)}
            ${this._select(e,["tap_action","action"],"Reading action",[["","Default (no action)"],["none","No action"],["more-info","Open HA history and details"]])}
            ${"more-info"===t.tap_action?.action?this._helperPicker(e,["tap_action","entity"],"History entity (optional)"):""}
            ${this._optionalGroup(e,"trend","Show trend caption",j`
              ${this._helperPicker(e,["trend","entity"],"Trend entity",void 0===t.trend?.attribute?["sensor"]:void 0)}
              ${this._field(e,["trend","attribute"],"Trend numeric attribute")}
              ${this._field(e,["trend","unit"],"Trend rate unit")}
              <p class="hint">Match the trend entity's reported unit exactly, such as ppm/h or /h for a unitless reading. Use a numeric Derivative helper, not an on/off Trend helper. Smoothing is configured in that helper.</p>
              <div class="pair">
                ${this._field(e,["trend","deadband"],"Trend deadband",{number:!0,fallback:0})}
                ${this._field(e,["trend","hysteresis"],"Trend hysteresis",{number:!0,fallback:0})}
              </div>
              <p class="hint">Direction starts at deadband plus hysteresis and clears at deadband minus hysteresis, in the declared rate unit. Hysteresis must not exceed deadband.</p>
              ${this._field(e,["trend","decimals"],"Trend decimal places",{number:!0,fallback:2})}
              ${this._optionalGroup(e,["trend","availability"],"Require trend availability",j`
                ${this._helperPicker(e,["trend","availability","entity"],"Trend availability entity")}
                ${this._field(e,["trend","availability","state"],"Trend available state",{fallback:"on"})}`)}
              ${this._optionalGroup(e,["trend","freshness"],"Check trend sample age",j`
                ${this._helperPicker(e,["trend","freshness","entity"],"Trend sample timestamp entity (optional)")}
                ${this._field(e,["trend","freshness","attribute"],"Trend sample timestamp attribute")}
                ${this._field(e,["trend","freshness","max_age"],"Maximum trend sample age (minutes)",{number:!0,factor:60})}
                <p class="hint">Use a trustworthy sample timestamp with timezone. An attribute uses the trend entity unless another entity is selected. HA update times are not sample times.</p>`)}
              <p class="hint">The caption hides when either reading is unavailable or fails its configured age check. A zero rate does not prove freshness or safe water.</p>`)}
          `:j`<p class="hint">Select an entity to configure this reading.</p>`}
        </div>
      </details>
    `}_value(e,t){return t.reduce((e,t)=>xe(e,t),xe(this._config.sensors,e))}_field(e,t,s,i={}){const n=`sensor-${encodeURIComponent(e)}-${t.join("-")}`,r=this._value(e,t),a=i.factor&&"number"==typeof r?r/i.factor:void 0===r&&i.keepEmpty?i.fallback:r,o=`sensors.${e}.${t.join(".")}`,l=!!this._error&&(this._error.startsWith(o+" ")||["min","max"].includes(t[0])&&this._error.startsWith(`sensors.${e} requires min`));return j`<div class="field">
      <label for=${n}>${s}</label>
      <input type="text" id=${n} inputmode=${i.number?"decimal":"text"}
        aria-invalid=${String(l)} aria-describedby=${l?`${n}-error`:""}
        .value=${void 0===a?"":String(a)} placeholder=${void 0===i.fallback?"":String(i.fallback)}
        @change=${s=>{const n=s.target.value,r=""===n&&!i.keepEmpty;let a=i.number?_e(n)??n:n;i.factor&&"number"==typeof a&&(a*=i.factor),this._optionChanged(e,t,a,r)}}>
      ${l?j`<span class="field-error" id=${`${n}-error`}>${this._error}</span>`:""}
    </div>`}_select(e,t,s,i){const n=`sensor-${encodeURIComponent(e)}-${t.join("-")}`,r=this._value(e,t),a=null===r&&"display_format"===t[0]?"numeric":r??"";return j`<div class="field"><label for=${n}>${s}</label>
      <select id=${n} .value=${a} @change=${s=>{"tap_action"===t[0]?this._actionChanged(e,s.target.value):this._optionChanged(e,t,s.target.value,""===s.target.value)}}>${i.map(([e,t])=>j`<option value=${e} ?selected=${a===e}>${t}</option>`)}</select></div>`}_helperPicker(e,t,s,i){return j`<div class="field"><label>${s}</label>
      <ha-entity-picker aria-label=${s} .hass=${this.hass} .value=${this._value(e,t)||""}
        .includeDomains=${i}
        allow-custom-entity @value-changed=${s=>this._optionChanged(e,t,s.detail.value,!s.detail.value)}>
      </ha-entity-picker></div>`}_optionalGroup(e,t,s,i){const n=Array.isArray(t)?t:[t],r=n.slice(0,-1).reduce((e,t)=>xe(e,t),this._config.sensors[e]),a=ye(r,n.at(-1));return j`<label class="check"><input type="checkbox" .checked=${a}
      @change=${t=>this._toggleOption(e,n,t.target.checked)}>${s}</label>
      ${a?i:""}`}_controlPicker(e,t,s){const i=this._config.controls?.[e]?.entity||"";return j`<div class="field"><label>${t}</label>
      <ha-entity-picker data-primary aria-label=${t} .hass=${this.hass} .value=${i}
        .includeDomains=${[s]} .includeEntities=${fe(this._config,this.hass,[s],i)}
        allow-custom-entity @value-changed=${t=>this._controlChanged(e,t)}>
      </ha-entity-picker></div>`}_titleChanged(e){this._updateConfig({title:e.target.value})}_themeChanged(e){this._updateConfig({theme:e.target.value})}_deviceChanged(e){const t={...this._config};e.target.value?t.device_id=e.target.value:delete t.device_id,this._publish(t)}_optionChanged(e,t,s,i=!1){this._publish(function(e,t,s,i,n=!1){const r=Object.hasOwn(e.sensors||{},t)?e.sensors[t]:{},a=(e,[t,...s])=>{const r={...e};return s.length?{...r,[t]:a(Object.hasOwn(r,t)?r[t]:{},s)}:n?(delete r[t],r):{...r,[t]:i}},o=a(r,s);return{...e,sensors:{...e.sensors,[t]:o}}}(this._config,e,t,s,i))}_toggleOption(e,t,s){const i=Array.isArray(t)?t:[t],n=JSON.stringify([e,...i]);s||this._removedOptions.set(n,this._value(e,i)),this._optionChanged(e,i,this._removedOptions.get(n)||{},!s)}_linearChanged(e,t){const s=JSON.stringify([e,"zones"]);if(t)this._removedOptions.set(s,this._config.sensors[e].zones),this._optionChanged(e,["zones"],null);else{const t=this._removedOptions.get(s);this._optionChanged(e,["zones"],t,void 0===t)}}_actionChanged(e,t){const s=JSON.stringify([e,"tap_action"]);t?this._optionChanged(e,["tap_action"],{...this._config.sensors[e].tap_action||this._removedOptions.get(s),action:t}):(this._removedOptions.set(s,this._config.sensors[e].tap_action),this._optionChanged(e,["tap_action"],void 0,!0))}_sensorChanged(e,t){const s=t.detail.value;let i={...this._config.sensors};s?(i={...i,[e]:{...xe(i,e)||this._removedSensors.get(e)||{},entity:s}},this._removedSensors.delete(e)):(ye(i,e)&&this._removedSensors.set(e,i[e]),delete i[e]),this._updateConfig({sensors:i})}_controlChanged(e,t){const s=t.detail.value,i={...this._config.controls};s?(i[e]={...i[e]||this._removedControls.get(e)||{},entity:s},this._removedControls.delete(e)):(i[e]&&this._removedControls.set(e,i[e]),delete i[e]),this._updateConfig({controls:i})}_updateConfig(e){this._publish({...this._config,...e})}_publish(e){var t,s;(this._config=e,this._error=this._validate(e),this._pending=!!this._error,this._pending)||(this._acceptedConfig=e,this._acceptedKey=JSON.stringify(e),t="config-changed",s={config:e},this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0,detail:s})))}_discardDraft(){this._config=this._acceptedConfig,this._pending=!1,this._error=this._validate(this._config)}});const we=e=>!e||["unknown","unavailable",void 0,null,""].includes(e.state),$e=(e,t)=>({value:null,reason:e,status:t});function Se(e,t,s=Date.now()){const i=t?.[e.entity];if(we(i))return $e("unavailable","Source unavailable");if(e.availability){const s=t?.[e.availability.entity];if(we(s))return $e("availability_unknown","Availability unknown");if(s.state!==e.availability.state)return $e("disabled","Unavailable: availability condition not met")}const n=_e(void 0===e.attribute?i.state:i.attributes?.[e.attribute]);if(null===n)return $e("invalid",void 0===e.attribute?"Reading unavailable":"Attribute reading unavailable");if(!e.freshness)return{value:n};const r=e.freshness.entity?t?.[e.freshness.entity]:i;if(we(r))return $e("freshness_unknown","Sample time unavailable");const a=function(e){if("string"!=typeof e)return null;const t=/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d{1,9})?(Z|[+-]\d{2}:\d{2})$/.exec(e);if(!t)return null;const[,s,i,n,r,a,o]=t.map((e,t)=>t>0&&t<7?Number(e):e);if(i<1||i>12||n<1||n>[31,s%4!=0||s%100==0&&s%400!=0?28:29,31,30,31,30,31,31,30,31,30,31][i-1]||r>23||a>59||o>59)return null;const l=Date.parse(e);return Number.isFinite(l)?l:null}(void 0===e.freshness.attribute?r.state:r.attributes?.[e.freshness.attribute]);if(null===a||!Number.isFinite(s)||a>s)return $e("freshness_unknown","Sample time unknown or in the future");const o=a+1e3*e.freshness.max_age;return s>=o?$e("stale","Stale sample"):{value:n,sampledAt:a,expiresAt:o}}const Ce=(e,t)=>Math.abs(e-t)<=Number.EPSILON*Math.max(Math.abs(e),Math.abs(t))*4;function ke(e,t,s="flat"){const i=t.deadband+t.hysteresis,n=t.deadband-t.hysteresis;return e>0&&(e>=i||Ce(e,i))?"rising":e<0&&(-e>=i||Ce(-e,i))?"falling":"rising"===s&&e>n&&!Ce(e,n)?"rising":"falling"===s&&e<-n&&!Ce(-e,n)?"falling":"flat"}function Oe(e,t,s,i,n=Date.now()){if(!e||null===s.value)return null;const r=Se(e,t,n);return null===r.value||t?.[e.entity]?.attributes?.unit_of_measurement!==e.unit?null:{...r,direction:ke(r.value,e,i),unit:e.unit}}let Ne=0;console.info("%c SPA-MONITOR-CARD %c v0.1.1 ","color: white; background: #16a34a; font-weight: bold;","color: #16a34a; background: white; font-weight: bold;");customElements.define("spa-monitor-card",class extends ee{constructor(){super(),this._instanceId=Ne++,this._pendingOutput=null,this._inflightOutput=null,this._outputTimer=null,this._outputError="",this._pendingBoost=null,this._boostTimer=null,this._boostError="",this._freshnessTimer=null,this._trendStates=new Map,this._nextFreshnessAt=null,this._refreshAge=()=>this.requestUpdate()}static get properties(){return{hass:{type:Object},_config:{type:Object}}}static get styles(){return te}get hass(){return this._hass}set hass(e){const t=this._hass;if(this._hass=e,this.isConnected&&this._config&&e){const t=Date.now();for(const[s,i]of Object.entries(this._config.sensors))this._readTrend(s,i,Se(i,e.states,t),e.states,t)}else this._trendStates.clear();const s=this._pendingOutput;if(s){const i=e?.states?.[s.entity],n=me(i);(!n||["min","max","step"].some(e=>n[e]!==s[e])||i!==t?.states?.[s.entity]&&n.value===s.value&&s.sentValue===s.value)&&this._clearOutputIntent()}const i=this._pendingBoost;if(i){const s=e?.states?.[i.entity];(!["on","off"].includes(s?.state)||s!==t?.states?.[i.entity]&&s.state===i.value)&&this._clearBoostIntent()}this.requestUpdate("hass",t)}connectedCallback(){super.connectedCallback(),document.addEventListener("visibilitychange",this._refreshAge),this.requestUpdate()}disconnectedCallback(){this._trendStates.clear(),this._clearOutputIntent(),this._clearBoostIntent(),clearTimeout(this._freshnessTimer),this._freshnessTimer=null,document.removeEventListener("visibilitychange",this._refreshAge),super.disconnectedCallback()}updated(){clearTimeout(this._freshnessTimer),this._freshnessTimer=null,this.isConnected&&this.hass&&this._config&&Number.isFinite(this._nextFreshnessAt)&&(this._freshnessTimer=setTimeout(this._refreshAge,Math.min(2147483647,Math.max(1,this._nextFreshnessAt-Date.now()))))}static getConfigElement(){return document.createElement("spa-monitor-card-editor")}static getStubConfig(){return{sensors:{ph:{entity:"sensor.replace_with_spa_ph"}}}}setConfig(e){const t=he(e);this._trendStates.clear(),t.controls.output_level?.entity!==this._config?.controls?.output_level?.entity&&this._clearOutputIntent(),t.controls.boost?.entity!==this._config?.controls?.boost?.entity&&this._clearBoostIntent(),this._config=t}getConfig(){return this._config}getCardSize(){const e=this.shadowRoot?.querySelector(".card")?.getBoundingClientRect().height;return e>0?Math.ceil(e/50):Math.ceil((222+(this._config?.title?32:0)+(this._config&&this._hasControls()?90:0))/50)}getGridOptions(){return{columns:12,rows:"auto",min_columns:Object.keys(this._config?.sensors||{}).length>2?12:6}}render(){if(this._nextFreshnessAt=null,this._renderTime=Date.now(),!this._config||!this.hass)return j``;const e=this._config.theme,t="dark"===e||"auto"===e&&this.hass.themes?.darkMode;return j`
      <ha-card class="card ${t?"dark":""} ${"glass"===e?"glass":""}">
        ${this._config.title?this._renderHeader():""}
        ${this._renderGauges()}
        ${this._hasControls()?j`
          <div class="divider"></div>
          ${this._renderControls()}
        `:""}
      </ha-card>
    `}_renderHeader(){return j`
      <div class="header">
        <span class="header-title">${this._config.title}</span>
      </div>
    `}_renderGauges(){return j`
      <div class="gauges-row">
        ${Object.entries(this._config.sensors).map(([e,t])=>this._renderSingleGauge(e,t))}
      </div>
    `}_renderSingleGauge(e,t){const s=Se(t,this.hass.states,this._renderTime),i=this._readTrend(e,t,s,this.hass.states,this._renderTime);this._trackExpiry(s),this._trackExpiry(i);const n=s.value,r=null===n,a=`gradient-${t.gradient||"standard"}`,o=r?0:function(e,t){return Math.max(5,Math.min(95,ie(e,t)))}(n,t);let l="stale"===s.reason?"Stale":"---";r||(l=this._formatValue(n,t));const d=r?s.status:function(e,t){if(e<t.min)return"Below displayed range";if(e>t.max)return"Above displayed range";const s=ie(e,t);return"depletion"===t.gradient?s>=20?"Within configured green band":s>=10?"Low (configured yellow band)":"Low (configured red band)":s>=20&&s<=80?"Within configured target band":s<20?s>=10?"Low (configured yellow band)":"Low (configured red band)":s<=90?"High (configured yellow band)":"High (configured red band)"}(n,t),c=r||"hours_to_months"!==t.display_format?"":`; ${n} raw hours; displayed months are an estimate`,u="more-info"===t.tap_action?.action,p=i?function(e,t){const s=Math.abs(e.value).toFixed(t);if("flat"===e.direction){const s=e.value.toFixed(t);return`${0===Number(s)?(0).toFixed(t):s} ${e.unit}`}return`${"rising"===e.direction?"Rising":"Falling"} ${0===Number(s)?"< "+(10**-t).toFixed(t):s} ${e.unit}`}(i,t.trend.decimals):"",h=i?`; Trend: ${p}; reported rate ${i.value} ${i.unit}`:"",_=`${t.name}: ${l}; ${d}${c}${h}${u?"; Open history and details":""}`;return j`
      <div class="gauge ${r?"unavailable":""}" role=${u?"button":"img"}
        aria-label=${_} title=${_} tabindex="0"
        @click=${()=>this._openMoreInfo(t)}
        @keydown=${e=>{u&&["Enter"," "].includes(e.key)&&(e.preventDefault(),e.repeat||this._openMoreInfo(t))}}>
        <span class="gauge-label">${t.name}</span>
        <div class="gauge-bar-container">
          <div class="gauge-bar ${a}"></div>
          ${r?"":j`
            <div class="gauge-indicator" style="bottom: ${o}%;">
              ${this._renderTriangle(e)}
            </div>
          `}
        </div>
        <span class="gauge-value">${l}</span>
        ${i?j`<span class="gauge-trend" data-direction=${i.direction} aria-hidden="true">${p}</span>`:r||"hours_to_months"!==t.display_format?"":j`<span class="gauge-estimate" aria-hidden="true">Estimate</span>`}
      </div>
    `}_trackExpiry(e){Number.isFinite(e?.expiresAt)&&(this._nextFreshnessAt=null===this._nextFreshnessAt?e.expiresAt:Math.min(this._nextFreshnessAt,e.expiresAt))}_readTrend(e,t,s,i,n){if(!this.isConnected)return Oe(t.trend,i,s,"flat",n);const r=this._trendStates.get(e),a=r?.expiresAt<=n?"flat":r?.direction,o=Oe(t.trend,i,s,a,n);if(o){const t=[s.expiresAt,o.expiresAt].filter(Number.isFinite);this._trendStates.set(e,{direction:o.direction,expiresAt:t.length?Math.min(...t):1/0})}else this._trendStates.delete(e);return o}_renderTriangle(e){const t=`triGrad-${this._instanceId}-${e}`;return j`
      <svg width="14" height="18" viewBox="0 0 14 18"
        style="filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.25));">
        <defs>
          <linearGradient id="${t}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="40%" stop-color="#e8e8e8"/>
            <stop offset="100%" stop-color="#cccccc"/>
          </linearGradient>
        </defs>
        <polygon points="0,0 14,9 0,18" fill="url(#${t})"/>
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
    `}_renderOutputLevel(){const e=this._config.controls.output_level.entity,t=me(this.hass.states[e]),s=null===t,i=this._pendingOutput,n=i?.value??t?.value,r=t&&ge(n,-1,t),a=t&&ge(n,1,t),o=i?`Requested ${i.value}; waiting for the device report.`:this._outputError;return j`
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
          <span id="output-report" class="output-level-value" aria-live="polite">${s?"---":t.value}</span>
          <button type="button" class="stepper-btn"
            aria-label="Increase output level"
            aria-describedby="output-report"
            ?disabled=${null===a}
            @click=${()=>this._adjustOutputLevel(1)}>
            +
          </button>
        </div>
      </div>
    `}_renderBoost(){const e=this._config.controls.boost.entity,t=this.hass.states[e],s=!["on","off"].includes(t?.state),i="on"===t?.state,n=this._pendingBoost,r=n?`Requested Boost ${n.value}; waiting for the device report.`:this._boostError||(s?"Boost unavailable.":`Boost reported ${t.state}.`);return j`
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
    `}_formatValue(e,t){if(!Number.isFinite(e))return"---";if("hours_to_months"===t.display_format){const s=t.hours_reserve??0,i=t.hours_per_month??730.5,n=Math.max(0,(e-s)/i);return Number.isFinite(n)?`${Math.round(n)} mo`:"---"}const s=t.decimals??1,i=0===s?Math.round(e).toString():e.toFixed(s);return t.unit?`${i} ${t.unit}`:i}_hasControls(){return this._config.controls.output_level||this._config.controls.boost}_openMoreInfo(e){"more-info"===e.tap_action?.action&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e.tap_action.entity||e.entity},bubbles:!0,composed:!0}))}_clearOutputIntent(e=""){clearTimeout(this._outputTimer),this._outputTimer=null,this._pendingOutput=null,this._inflightOutput=null,this._outputError=e,this.requestUpdate()}_adjustOutputLevel(e){const t=this._config.controls.output_level.entity,s=me(this.hass.states[t]);if(!s||![-1,1].includes(e))return;const i=ge(this._pendingOutput?.value??s.value,e,s);null!==i&&this._setOutputLevel(i)}_setOutputLevel(e){const t=this._config.controls.output_level.entity,s=me(this.hass.states[t]);if(e=_e(e),!s||null===e||e<s.min||e>s.max)return;const i=(e-s.min)/s.step;Math.abs(i-Math.round(i))>Number.EPSILON*Math.max(1,Math.abs(i))*16||e!==(this._pendingOutput?.value??s.value)&&(this._pendingOutput={...s,entity:t,value:e,sentValue:this._inflightOutput?.value},this._outputError="",clearTimeout(this._outputTimer),this._outputTimer=setTimeout(()=>{this._clearOutputIntent("Output request timed out; showing the reported value.")},15e3),this.requestUpdate(),this._sendOutputIntent())}async _sendOutputIntent(){if(this._inflightOutput||!this._pendingOutput)return;const{entity:e,value:t}=this._pendingOutput,s={entity:e,value:t};this._inflightOutput=s,this._pendingOutput.sentValue=t;try{await this.hass.callService("number","set_value",{entity_id:e,value:t})}catch{return void(this._inflightOutput===s&&this._clearOutputIntent("Output request failed; showing the reported value."))}this._inflightOutput===s&&(this._inflightOutput=null,this._pendingOutput&&this._pendingOutput.value!==t&&this._sendOutputIntent())}_clearBoostIntent(e=""){clearTimeout(this._boostTimer),this._boostTimer=null,this._pendingBoost=null,this._boostError=e,this.requestUpdate()}async _requestBoost(){const e=this._config?.controls.boost?.entity,t=this.hass?.states?.[e]?.state;if(!this.isConnected||this._pendingBoost||!["on","off"].includes(t))return;const s={entity:e,value:"on"===t?"off":"on"};this._pendingBoost=s,this._boostError="",this._boostTimer=setTimeout(()=>{this._clearBoostIntent("Boost request timed out; showing the reported state.")},15e3),this.requestUpdate();try{await this.hass.callService("switch",`turn_${s.value}`,{entity_id:e})}catch{this._pendingBoost===s&&this._clearBoostIntent("Boost request failed; showing the reported state.")}}}),window.customCards=window.customCards||[],window.customCards.push({type:"spa-monitor-card",name:"Spa Monitor Card",description:"Water quality monitoring for HotSpring/ESP-IQ2020 salt systems"});
