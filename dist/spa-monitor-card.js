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
const t="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,e=(t,e,s=null)=>{for(;e!==s;){const s=e.nextSibling;t.removeChild(e),e=s}},s=`{{lit-${String(Math.random()).slice(2)}}}`,i=`\x3c!--${s}--\x3e`,n=new RegExp(`${s}|${i}`),r="$lit$";class o{constructor(t,e){this.parts=[],this.element=e;const i=[],o=[],l=document.createTreeWalker(e.content,133,null,!1);let c=0,p=-1,h=0;const{strings:_,values:{length:g}}=t;for(;h<g;){const t=l.nextNode();if(null!==t){if(p++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:s}=e;let i=0;for(let t=0;t<s;t++)a(e[t].name,r)&&i++;for(;i-- >0;){const e=_[h],s=d.exec(e)[2],i=s.toLowerCase()+r,o=t.getAttribute(i);t.removeAttribute(i);const a=o.split(n);this.parts.push({type:"attribute",index:p,name:s,strings:a}),h+=a.length-1}}"TEMPLATE"===t.tagName&&(o.push(t),l.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(s)>=0){const s=t.parentNode,o=e.split(n),l=o.length-1;for(let e=0;e<l;e++){let i,n=o[e];if(""===n)i=u();else{const t=d.exec(n);null!==t&&a(t[2],r)&&(n=n.slice(0,t.index)+t[1]+t[2].slice(0,-5)+t[3]),i=document.createTextNode(n)}s.insertBefore(i,t),this.parts.push({type:"node",index:++p})}""===o[l]?(s.insertBefore(u(),t),i.push(t)):t.data=o[l],h+=l}}else if(8===t.nodeType)if(t.data===s){const e=t.parentNode;null!==t.previousSibling&&p!==c||(p++,e.insertBefore(u(),t)),c=p,this.parts.push({type:"node",index:p}),null===t.nextSibling?t.data="":(i.push(t),p--),h++}else{let e=-1;for(;-1!==(e=t.data.indexOf(s,e+1));)this.parts.push({type:"node",index:-1}),h++}}else l.currentNode=o.pop()}for(const t of i)t.parentNode.removeChild(t)}}const a=(t,e)=>{const s=t.length-e.length;return s>=0&&t.slice(s)===e},l=t=>-1!==t.index,u=()=>document.createComment(""),d=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function c(t,e){const{element:{content:s},parts:i}=t,n=document.createTreeWalker(s,133,null,!1);let r=h(i),o=i[r],a=-1,l=0;const u=[];let d=null;for(;n.nextNode();){a++;const t=n.currentNode;for(t.previousSibling===d&&(d=null),e.has(t)&&(u.push(t),null===d&&(d=t)),null!==d&&l++;void 0!==o&&o.index===a;)o.index=null!==d?-1:o.index-l,r=h(i,r),o=i[r]}u.forEach(t=>t.parentNode.removeChild(t))}const p=t=>{let e=11===t.nodeType?0:1;const s=document.createTreeWalker(t,133,null,!1);for(;s.nextNode();)e++;return e},h=(t,e=-1)=>{for(let s=e+1;s<t.length;s++){const e=t[s];if(l(e))return s}return-1};
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
class b{constructor(t,e,s){this.__parts=[],this.template=t,this.processor=e,this.options=s}update(t){let e=0;for(const s of this.__parts)void 0!==s&&s.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const e=t?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),s=[],i=this.template.parts,n=document.createTreeWalker(e,133,null,!1);let r,o=0,a=0,u=n.nextNode();for(;o<i.length;)if(r=i[o],l(r)){for(;a<r.index;)a++,"TEMPLATE"===u.nodeName&&(s.push(u),n.currentNode=u.content),null===(u=n.nextNode())&&(n.currentNode=s.pop(),u=n.nextNode());if("node"===r.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(u.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(u,r.name,r.strings,this.options));o++}else this.__parts.push(void 0),o++;return t&&(document.adoptNode(e),customElements.upgrade(e)),e}}
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
 */const f=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),y=` ${s} `;class x{constructor(t,e,s,i){this.strings=t,this.values=e,this.type=s,this.processor=i}getHTML(){const t=this.strings.length-1;let e="",n=!1;for(let o=0;o<t;o++){const t=this.strings[o],a=t.lastIndexOf("\x3c!--");n=(a>-1||n)&&-1===t.indexOf("--\x3e",a+1);const l=d.exec(t);e+=null===l?t+(n?y:i):t.substr(0,l.index)+l[1]+l[2]+r+l[3]+s}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return void 0!==f&&(e=f.createHTML(e)),t.innerHTML=e,t}}
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
 */const w=t=>null===t||!("object"==typeof t||"function"==typeof t),S=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class ${constructor(t,e,s){this.dirty=!0,this.element=t,this.name=e,this.strings=s,this.parts=[];for(let t=0;t<s.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new C(this)}_getValue(){const t=this.strings,e=t.length-1,s=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=s[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!S(t))return t}let i="";for(let n=0;n<e;n++){i+=t[n];const e=s[n];if(void 0!==e){const t=e.value;if(w(t)||!S(t))i+="string"==typeof t?t:String(t);else for(const e of t)i+="string"==typeof e?e:String(e)}}return i+=t[e],i}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class C{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===m||w(t)&&t===this.value||(this.value=t,g(t)||(this.committer.dirty=!0))}commit(){for(;g(this.value);){const t=this.value;this.value=m,t(this)}this.value!==m&&this.committer.commit()}}class N{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(u()),this.endNode=t.appendChild(u())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=u()),t.__insert(this.endNode=u())}insertAfterPart(t){t.__insert(this.startNode=u()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;g(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=m,t(this)}const t=this.__pendingValue;t!==m&&(w(t)?t!==this.value&&this.__commitText(t):t instanceof x?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):S(t)?this.__commitIterable(t):t===v?(this.value=v,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,s="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=s:this.__commitNode(document.createTextNode(s)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof b&&this.value.template===e)this.value.update(t.values);else{const s=new b(e,t.processor,this.options),i=s._clone();s.update(t.values),this.__commitNode(i),this.value=s}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let s,i=0;for(const n of t)s=e[i],void 0===s&&(s=new N(this.options),e.push(s),0===i?s.appendIntoPart(this):s.insertAfterPart(e[i-1])),s.setValue(n),s.commit(),i++;i<e.length&&(e.length=i,this.clear(s&&s.endNode))}clear(t=this.startNode){e(this.startNode.parentNode,t.nextSibling,this.endNode)}}class O{constructor(t,e,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=s}setValue(t){this.__pendingValue=t}commit(){for(;g(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=m,t(this)}if(this.__pendingValue===m)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=m}}class k extends ${constructor(t,e,s){super(t,e,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new P(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class P extends C{}let T=!1;(()=>{try{const t={get capture(){return T=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class A{constructor(t,e,s){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=s,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;g(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=m,t(this)}if(this.__pendingValue===m)return;const t=this.__pendingValue,e=this.value,s=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),i=null!=t&&(null==e||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),i&&(this.__options=E(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=m}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const E=t=>t&&(T?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);
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
 */function z(t){let e=M.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},M.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const n=t.strings.join(s);return i=e.keyString.get(n),void 0===i&&(i=new o(t,t.getTemplateElement()),e.keyString.set(n,i)),e.stringsArray.set(t.strings,i),i}const M=new Map,V=new WeakMap;
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
class{handleAttributeExpressions(t,e,s,i){const n=e[0];if("."===n){return new k(t,e.slice(1),s).parts}if("@"===n)return[new A(t,e.slice(1),i.eventContext)];if("?"===n)return[new O(t,e.slice(1),s)];return new $(t,e,s).parts}handleTextExpression(t){return new N(t)}};
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
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.4.1");const U=(t,...e)=>new x(t,e,"html",I),B=(t,e)=>`${t}--${e}`;
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
 */let j=!0;void 0===window.ShadyCSS?j=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),j=!1);const q=t=>e=>{const i=B(e.type,t);let n=M.get(i);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},M.set(i,n));let r=n.stringsArray.get(e.strings);if(void 0!==r)return r;const a=e.strings.join(s);if(r=n.keyString.get(a),void 0===r){const s=e.getTemplateElement();j&&window.ShadyCSS.prepareTemplateDom(s,t),r=new o(e,s),n.keyString.set(a,r)}return n.stringsArray.set(e.strings,r),r},F=["html","svg"],R=new Set,L=(t,e,s)=>{R.add(t);const i=s?s.element:document.createElement("template"),n=e.querySelectorAll("style"),{length:r}=n;if(0===r)return void window.ShadyCSS.prepareTemplateStyles(i,t);const o=document.createElement("style");for(let t=0;t<r;t++){const e=n[t];e.parentNode.removeChild(e),o.textContent+=e.textContent}(t=>{F.forEach(e=>{const s=M.get(B(e,t));void 0!==s&&s.keyString.forEach(t=>{const{element:{content:e}}=t,s=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{s.add(t)}),c(t,s)})})})(t);const a=i.content;s?function(t,e,s=null){const{element:{content:i},parts:n}=t;if(null==s)return void i.appendChild(e);const r=document.createTreeWalker(i,133,null,!1);let o=h(n),a=0,l=-1;for(;r.nextNode();)for(l++,r.currentNode===s&&(a=p(e),s.parentNode.insertBefore(e,s));-1!==o&&n[o].index===l;){if(a>0){for(;-1!==o;)n[o].index+=a,o=h(n,o);return}o=h(n,o)}}(s,o,a.firstChild):a.insertBefore(o,a.firstChild),window.ShadyCSS.prepareTemplateStyles(i,t);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(s){a.insertBefore(o,a.firstChild);const t=new Set;t.add(o),c(s,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const D={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},H=(t,e)=>e!==t&&(e==e||t==t),W={attribute:!0,type:String,converter:D,reflect:!1,hasChanged:H},G="finalized";class J extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,s)=>{const i=this._attributeNameForProperty(s,e);void 0!==i&&(this._attributeToPropertyMap.set(i,s),t.push(i))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=W){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const s="symbol"==typeof t?Symbol():`__${t}`,i=this.getPropertyDescriptor(t,s,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const n=this[t];this[e]=i,this.requestUpdateInternal(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||W}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty(G)||t.finalize(),this[G]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const s of e)this.createProperty(s,t[s])}}static _attributeNameForProperty(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,s=H){return s(t,e)}static _propertyValueFromAttribute(t,e){const s=e.type,i=e.converter||D,n="function"==typeof i?i:i.fromAttribute;return n?n(t,s):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const s=e.type,i=e.converter;return(i&&i.toAttribute||D.toAttribute)(t,s)}initialize(){this._updateState=0,this._updatePromise=new Promise(t=>this._enableUpdatingResolver=t),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,s){e!==s&&this._attributeToProperty(t,s)}_propertyToAttribute(t,e,s=W){const i=this.constructor,n=i._attributeNameForProperty(t,s);if(void 0!==n){const t=i._propertyValueToAttribute(e,s);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(n):this.setAttribute(n,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const s=this.constructor,i=s._attributeToPropertyMap.get(t);if(void 0!==i){const t=s.getPropertyOptions(i);this._updateState=16|this._updateState,this[i]=s._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}requestUpdateInternal(t,e,s){let i=!0;if(void 0!==t){const n=this.constructor;s=s||n.getPropertyOptions(t),n._valueHasChanged(this[t],e,s.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==s.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,s))):i=!1}!this._hasRequestedUpdate&&i&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this.requestUpdateInternal(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}J[G]=!0;
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
const Q=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Y=Symbol();class Z{constructor(t,e){if(e!==Y)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(Q?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const K=(t,...e)=>{const s=e.reduce((e,s,i)=>e+(t=>{if(t instanceof Z)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+t[i+1],t[0]);return new Z(s,Y)};
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.5.1");const X={};class tt extends J{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(Array.isArray(t)){const e=(t,s)=>t.reduceRight((t,s)=>Array.isArray(s)?e(s,t):(t.add(s),t),s),s=e(t,new Set),i=[];s.forEach(t=>i.unshift(t)),this._styles=i}else this._styles=void 0===t?[]:[t];this._styles=this._styles.map(t=>{if(t instanceof CSSStyleSheet&&!Q){const e=Array.prototype.slice.call(t.cssRules).reduce((t,e)=>t+e.cssText,"");return new Z(String(e),Y)}return t})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow(this.constructor.shadowRootOptions)}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?Q?this.renderRoot.adoptedStyleSheets=t.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==X&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){return X}}tt.finalized=!0,tt.render=(t,s,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const n=i.scopeName,r=V.has(s),o=j&&11===s.nodeType&&!!s.host,a=o&&!R.has(n),l=a?document.createDocumentFragment():s;if(((t,s,i)=>{let n=V.get(s);void 0===n&&(e(s,s.firstChild),V.set(s,n=new N(Object.assign({templateFactory:z},i))),n.appendInto(s)),n.setValue(t),n.commit()})(t,l,Object.assign({templateFactory:q(n)},i)),a){const t=V.get(l);V.delete(l);const i=t.value instanceof b?t.value.template:void 0;L(n,l,i),e(s,s.firstChild),s.appendChild(l),V.set(s,t)}!r&&o&&window.ShadyCSS.styleElement(s.host)},tt.shadowRootOptions={mode:"open"};const et=K`
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
`,st={chlorine:{name:"Chlorine",unit:"ppm",min:0,max:10,setpoint:3,decimals:1,gradient:"standard",zones:[{value:10,position:0},{value:8,position:10},{value:5,position:20},{value:1,position:80},{value:.5,position:90},{value:0,position:100}]},ph:{name:"pH",unit:"",min:6,max:9,setpoint:7.5,decimals:1,gradient:"standard",zones:[{value:9,position:0},{value:8.2,position:10},{value:7.8,position:20},{value:7.2,position:80},{value:6.8,position:90},{value:6,position:100}]},salt:{name:"Salt",unit:"ppm",min:1e3,max:3e3,setpoint:1750,decimals:0,gradient:"standard",zones:[{value:3e3,position:0},{value:2500,position:10},{value:2e3,position:20},{value:1500,position:80},{value:1250,position:90},{value:1e3,position:100}]},iq_sensor:{name:"IQ Sensor",unit:"hours",min:508,max:1e4,setpoint:5e3,decimals:0,gradient:"depletion",display_format:"hours_to_months",hours_reserve:508,hours_per_month:730.5,zones:[{value:1e4,position:0},{value:1969,position:80},{value:654,position:90},{value:508,position:100}]}};function it(t,e){const s=e.zones;if(!s||s.length<2){return(Math.max(e.min,Math.min(e.max,t))-e.min)/(e.max-e.min)*100}const i=s[0].value,n=s[s.length-1].value,r=Math.max(n,Math.min(i,t));for(let t=0;t<s.length-1;t++){const e=s[t],i=s[t+1];if(r<=e.value&&r>=i.value){const t=e.value===i.value?0:(r-i.value)/(e.value-i.value);return 100-(i.position+t*(e.position-i.position))}}return 50}const nt=Object.keys(st);customElements.define("spa-monitor-card-editor",class extends tt{static get properties(){return{hass:{type:Object},_config:{type:Object}}}static get styles(){return K`
      .editor {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px 0;
      }
      .section {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .section-title {
        font-weight: 600;
        font-size: 14px;
        color: var(--primary-text-color);
        border-bottom: 1px solid var(--divider-color);
        padding-bottom: 4px;
      }
      .field {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .field label {
        font-size: 12px;
        font-weight: 500;
        color: var(--secondary-text-color);
      }
      input[type="text"], select {
        padding: 8px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color);
        font-size: 14px;
      }
      ha-entity-picker {
        display: block;
      }
    `}setConfig(t){this._config={...t},this._removedSensors??=new Map,this._removedControls??=new Map}render(){if(!this.hass||!this._config)return U``;const t=this._config.theme||"auto";return U`
      <div class="editor">
        <div class="section">
          <div class="section-title">General</div>
          <div class="field">
            <label for="card-title">Title</label>
            <input type="text" id="card-title"
              .value=${this._config.title||""}
              @input=${this._titleChanged}>
          </div>
          <div class="field">
            <label for="card-theme">Theme</label>
            <select id="card-theme" @change=${this._themeChanged}>
              <option value="auto" ?selected=${"auto"===t}>Auto</option>
              <option value="light" ?selected=${"light"===t}>Light</option>
              <option value="dark" ?selected=${"dark"===t}>Dark</option>
              <option value="glass" ?selected=${"glass"===t}>Glass</option>
            </select>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Sensors</div>
          ${nt.map(t=>this._renderSensorField(t))}
        </div>

        <div class="section">
          <div class="section-title">Controls</div>
          <div class="field">
            <label>Output Level Entity</label>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${this._config.controls?.output_level?.entity||""}
              .includeDomains=${["number"]}
              allow-custom-entity
              @value-changed=${t=>this._controlChanged("output_level",t)}>
            </ha-entity-picker>
          </div>
          <div class="field">
            <label>Boost Entity</label>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${this._config.controls?.boost?.entity||""}
              .includeDomains=${["switch"]}
              allow-custom-entity
              @value-changed=${t=>this._controlChanged("boost",t)}>
            </ha-entity-picker>
          </div>
        </div>
      </div>
    `}_renderSensorField(t){const e=st[t],s=this._config.sensors?.[t]?.entity||"";return U`
      <div class="field">
        <label>${e.name} Entity</label>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${s}
          .includeDomains=${["sensor"]}
          allow-custom-entity
          @value-changed=${e=>this._sensorChanged(t,e)}>
        </ha-entity-picker>
      </div>
    `}_titleChanged(t){this._updateConfig({title:t.target.value})}_themeChanged(t){this._updateConfig({theme:t.target.value})}_sensorChanged(t,e){const s=e.detail.value,i={...this._config.sensors};s?(i[t]={...i[t]||this._removedSensors.get(t)||{},entity:s},this._removedSensors.delete(t)):(i[t]&&this._removedSensors.set(t,i[t]),delete i[t]),this._updateConfig({sensors:i})}_controlChanged(t,e){const s=e.detail.value,i={...this._config.controls};s?(i[t]={...i[t]||this._removedControls.get(t)||{},entity:s},this._removedControls.delete(t)):(i[t]&&this._removedControls.set(t,i[t]),delete i[t]),this._updateConfig({controls:i})}_updateConfig(t){this._config={...this._config,...t},function(t,e,s){const i=new CustomEvent(e,{bubbles:!0,composed:!0,detail:s});t.dispatchEvent(i)}(this,"config-changed",{config:this._config})}});const rt=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),ot=(t,e)=>{throw new Error(`${t} ${e}`)},at=(t,e)=>{t&&"object"==typeof t&&!Array.isArray(t)&&[Object.prototype,null].includes(Object.getPrototypeOf(t))||ot(e,"must be an object.")},lt=(t,e)=>{"number"==typeof t&&Number.isFinite(t)||ot(e,"must be a finite number.")},ut=(t,e,s=!0)=>{"string"==typeof t&&(s||t.trim())||ot(e,s?"must be a string.":"must be a nonempty string.")},dt=(t,e,s)=>{"string"==typeof t&&t.trim()===t&&new RegExp(`^${s}\\.[a-z0-9_]+$`).test(t)||ot(e,s.startsWith("[")?"must be a Home Assistant entity ID (for example sensor.spa).":`must be a ${s} entity ID (for example ${s}.spa).`)};function ct(t,e){(!Array.isArray(t)||t.length<2)&&ot(e,"must contain at least two breakpoints.");const s=Array.from(t,(t,s)=>(at(t,`${e}[${s}]`),lt(t.value,`${e}[${s}].value`),lt(t.position,`${e}[${s}].position`),(t.position<0||t.position>100)&&ot(`${e}[${s}].position`,"must be between 0 and 100."),{...t}));0===s[0].position&&100===s.at(-1).position||ot(e,"must start at position 0 and end at 100 (top to bottom).");for(let t=1;t<s.length;t++)(s[t].value>=s[t-1].value||s[t].position<=s[t-1].position)&&ot(`${e}[${t}]`,"must have a lower value and a higher position than the previous breakpoint.");return s}function pt(t,e){const s=`sensors.${t}`;at(e,s);const i=rt(st,t)?st[t]:{},n={unit:"",decimals:1,gradient:"standard",display_format:null,...i,...e};if(rt(n,"attribute")&&ut(n.attribute,`${s}.attribute`,!1),dt(n.entity,`${s}.entity`,rt(n,"attribute")?"[a-z_][a-z0-9_]*":"sensor"),ut(n.name,`${s}.name`,!1),ut(n.unit,`${s}.unit`),(!Number.isInteger(n.decimals)||n.decimals<0||n.decimals>100)&&ot(`${s}.decimals`,"must be an integer from 0 to 100."),["standard","depletion"].includes(n.gradient)||ot(`${s}.gradient`,"must be standard or depletion."),[null,"numeric","hours_to_months"].includes(n.display_format)||ot(`${s}.display_format`,"must be null, numeric or hours_to_months."),rt(n,"setpoint")&&lt(n.setpoint,`${s}.setpoint`),rt(n,"availability")){at(n.availability,`${s}.availability`),dt(n.availability.entity,`${s}.availability.entity`,"[a-z_][a-z0-9_]*");const t=rt(n.availability,"state")?n.availability.state:"on";ut(t,`${s}.availability.state`,!1),["unknown","unavailable"].includes(t)&&ot(`${s}.availability.state`,"must identify a known available state."),n.availability={...n.availability,state:t}}if(rt(n,"freshness")){at(n.freshness,`${s}.freshness`);const t={...n.freshness};rt(t,"entity")&&dt(t.entity,`${s}.freshness.entity`,"[a-z_][a-z0-9_]*"),rt(t,"attribute")&&ut(t.attribute,`${s}.freshness.attribute`,!1),rt(t,"entity")||rt(t,"attribute")||ot(`${s}.freshness`,"requires an explicit sample-time entity or attribute."),lt(t.max_age,`${s}.freshness.max_age`),(t.max_age<=0||!Number.isFinite(1e3*t.max_age))&&ot(`${s}.freshness.max_age`,"must be a positive finite duration in seconds."),n.freshness=t}if(rt(n,"tap_action")&&(at(n.tap_action,`${s}.tap_action`),["none","more-info"].includes(n.tap_action.action)||ot(`${s}.tap_action.action`,"must be none or more-info."),rt(n.tap_action,"entity")&&dt(n.tap_action.entity,`${s}.tap_action.entity`,"[a-z_][a-z0-9_]*"),n.tap_action={...n.tap_action}),null===e.zones?n.zones=null:rt(e,"zones")?(n.zones=ct(e.zones,`${s}.zones`),rt(e,"min")||(n.min=n.zones.at(-1).value),rt(e,"max")||(n.max=n.zones[0].value)):i.zones&&(n.zones=i.zones.map(t=>({...t})),n.zones[0].value=n.max,n.zones.at(-1).value=n.min),lt(n.min,`${s}.min`),lt(n.max,`${s}.max`),(n.min>=n.max||!Number.isFinite(n.max-n.min))&&ot(s,"requires min < max with a finite span."),n.zones&&(n.zones=ct(n.zones,`${s}.zones`),n.zones[0].value===n.max&&n.zones.at(-1).value===n.min||ot(`${s}.zones`,"endpoints must equal max and min; supply matching bounds or omit them.")),"hours_to_months"===n.display_format||rt(n,"hours_per_month")){const t=void 0===n.hours_per_month?730.5:n.hours_per_month;("number"!=typeof t||!Number.isFinite(t)||t<=0)&&ot(`${s}.hours_per_month`,"must be a finite number greater than zero."),n.hours_per_month=t}if("hours_to_months"===n.display_format||rt(n,"hours_reserve")){const t=void 0===n.hours_reserve?0:n.hours_reserve;("number"!=typeof t||!Number.isFinite(t)||t<0)&&ot(`${s}.hours_reserve`,"must be a finite non-negative number."),n.hours_reserve=t}return n}function ht(t){if("string"==typeof t){const e=t.trim();if(!/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(e))return null;t=Number(e)}return"number"==typeof t&&Number.isFinite(t)?t:null}function _t(t){const e=ht(t?.state),s=t?.attributes||{},i=ht(void 0===s.min?0:s.min),n=ht(void 0===s.max?10:s.max),r=ht(void 0===s.step?1:s.step);return[e,i,n,r].includes(null)||i>=n||r<=0||e<i||e>n||!Number.isFinite((n-i)/r)?null:{value:e,min:i,max:n,step:r}}function gt(t,e,{min:s,max:i,step:n}){const r=(t-s)/n,o=Number.EPSILON*Math.max(1,Math.abs(r))*8,a=e>0?Math.floor(r+o)+1:Math.ceil(r-o)-1,l=Math.floor((i-s)/n+o),u=Number((s+Math.max(0,Math.min(l,a))*n).toPrecision(15));return!Number.isFinite(u)||u<s||u>i||(e>0?u<=t:u>=t)?null:u}const mt=t=>!t||["unknown","unavailable",void 0,null,""].includes(t.state),vt=(t,e)=>({value:null,reason:t,status:e});function bt(t,e,s=Date.now()){const i=e?.[t.entity];if(mt(i))return vt("unavailable","Source unavailable");if(t.availability){const s=e?.[t.availability.entity];if(mt(s))return vt("availability_unknown","Availability unknown");if(s.state!==t.availability.state)return vt("disabled","Unavailable: availability condition not met")}const n=ht(void 0===t.attribute?i.state:i.attributes?.[t.attribute]);if(null===n)return vt("invalid",void 0===t.attribute?"Reading unavailable":"Attribute reading unavailable");if(!t.freshness)return{value:n};const r=t.freshness.entity?e?.[t.freshness.entity]:i;if(mt(r))return vt("freshness_unknown","Sample time unavailable");const o=function(t){if("string"!=typeof t)return null;const e=/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d{1,9})?(Z|[+-]\d{2}:\d{2})$/.exec(t);if(!e)return null;const[,s,i,n,r,o,a]=e.map((t,e)=>e>0&&e<7?Number(t):t);if(i<1||i>12||n<1||n>[31,s%4!=0||s%100==0&&s%400!=0?28:29,31,30,31,30,31,31,30,31,30,31][i-1]||r>23||o>59||a>59)return null;const l=Date.parse(t);return Number.isFinite(l)?l:null}(void 0===t.freshness.attribute?r.state:r.attributes?.[t.freshness.attribute]);if(null===o||!Number.isFinite(s)||o>s)return vt("freshness_unknown","Sample time unknown or in the future");const a=o+1e3*t.freshness.max_age;return s>=a?vt("stale","Stale sample"):{value:n,sampledAt:o,expiresAt:a}}let ft=0;console.info("%c SPA-MONITOR-CARD %c v0.1.1 ","color: white; background: #16a34a; font-weight: bold;","color: #16a34a; background: white; font-weight: bold;");customElements.define("spa-monitor-card",class extends tt{constructor(){super(),this._instanceId=ft++,this._pendingOutput=null,this._inflightOutput=null,this._outputTimer=null,this._outputError="",this._pendingBoost=null,this._boostTimer=null,this._boostError="",this._freshnessTimer=null,this._nextFreshnessAt=null,this._refreshAge=()=>this.requestUpdate()}static get properties(){return{hass:{type:Object},_config:{type:Object}}}static get styles(){return et}get hass(){return this._hass}set hass(t){const e=this._hass;this._hass=t;const s=this._pendingOutput;if(s){const i=t?.states?.[s.entity],n=_t(i);(!n||["min","max","step"].some(t=>n[t]!==s[t])||i!==e?.states?.[s.entity]&&n.value===s.value&&s.sentValue===s.value)&&this._clearOutputIntent()}const i=this._pendingBoost;if(i){const s=t?.states?.[i.entity];(!["on","off"].includes(s?.state)||s!==e?.states?.[i.entity]&&s.state===i.value)&&this._clearBoostIntent()}this.requestUpdate("hass",e)}connectedCallback(){super.connectedCallback(),document.addEventListener("visibilitychange",this._refreshAge),this.requestUpdate()}disconnectedCallback(){this._clearOutputIntent(),this._clearBoostIntent(),clearTimeout(this._freshnessTimer),this._freshnessTimer=null,document.removeEventListener("visibilitychange",this._refreshAge),super.disconnectedCallback()}updated(){clearTimeout(this._freshnessTimer),this._freshnessTimer=null,this.isConnected&&this.hass&&this._config&&Number.isFinite(this._nextFreshnessAt)&&(this._freshnessTimer=setTimeout(this._refreshAge,Math.min(2147483647,Math.max(1,this._nextFreshnessAt-Date.now()))))}static getConfigElement(){return document.createElement("spa-monitor-card-editor")}static getStubConfig(){return{sensors:{ph:{entity:"sensor.replace_with_spa_ph"}}}}setConfig(t){const e=function(t){at(t,"config"),at(t.sensors,"sensors"),0===Object.keys(t.sensors).length&&ot("sensors","must define at least one sensor."),rt(t,"title")&&ut(t.title,"title"),rt(t,"theme")&&!["auto","light","dark","glass"].includes(t.theme)&&ot("theme","must be auto, light, dark or glass.");const e={};if(rt(t,"controls")){at(t.controls,"controls");for(const[s,i]of Object.entries(t.controls))["output_level","boost"].includes(s)||ot(`controls.${s}`,"is unsupported; use output_level or boost."),at(i,`controls.${s}`),dt(i.entity,`controls.${s}.entity`,"boost"===s?"switch":"number"),e[s]={...i}}return{...t,title:t.title??"",theme:t.theme??"auto",controls:e,sensors:Object.fromEntries(Object.entries(t.sensors).map(([t,e])=>[t,pt(t,e)]))}}(t);e.controls.output_level?.entity!==this._config?.controls?.output_level?.entity&&this._clearOutputIntent(),e.controls.boost?.entity!==this._config?.controls?.boost?.entity&&this._clearBoostIntent(),this._config=e}getConfig(){return this._config}getCardSize(){return 4}render(){if(this._nextFreshnessAt=null,this._renderTime=Date.now(),!this._config||!this.hass)return U``;const t=this._config.theme,e="dark"===t||"auto"===t&&this.hass.themes?.darkMode;return U`
      <div class="card ${e?"dark":""} ${"glass"===t?"glass":""}">
        ${this._config.title?this._renderHeader():""}
        ${this._renderGauges()}
        ${this._hasControls()?U`
          <div class="divider"></div>
          ${this._renderControls()}
        `:""}
      </div>
    `}_renderHeader(){return U`
      <div class="header">
        <span class="header-title">${this._config.title}</span>
      </div>
    `}_renderGauges(){return U`
      <div class="gauges-row">
        ${Object.entries(this._config.sensors).map(([t,e])=>this._renderSingleGauge(t,e))}
      </div>
    `}_renderSingleGauge(t,e){const s=bt(e,this.hass.states,this._renderTime);Number.isFinite(s.expiresAt)&&(this._nextFreshnessAt=null===this._nextFreshnessAt?s.expiresAt:Math.min(this._nextFreshnessAt,s.expiresAt));const i=s.value,n=null===i,r=`gradient-${e.gradient||"standard"}`,o=n?0:function(t,e){return Math.max(5,Math.min(95,it(t,e)))}(i,e);let a="stale"===s.reason?"Stale":"---";n||(a=this._formatValue(i,e));const l=n?s.status:function(t,e){if(t<e.min)return"Below displayed range";if(t>e.max)return"Above displayed range";const s=it(t,e);return"depletion"===e.gradient?s>=20?"Within configured green band":s>=10?"Low (configured yellow band)":"Low (configured red band)":s>=20&&s<=80?"Within configured target band":s<20?s>=10?"Low (configured yellow band)":"Low (configured red band)":s<=90?"High (configured yellow band)":"High (configured red band)"}(i,e),u=n||"hours_to_months"!==e.display_format?"":`; ${i} raw hours; displayed months are an estimate`,d="more-info"===e.tap_action?.action,c=`${e.name}: ${a}; ${l}${u}${d?"; Open history and details":""}`;return U`
      <div class="gauge ${n?"unavailable":""}" role=${d?"button":"img"}
        aria-label=${c} title=${c} tabindex="0"
        @click=${()=>this._openMoreInfo(e)}
        @keydown=${t=>{d&&["Enter"," "].includes(t.key)&&(t.preventDefault(),t.repeat||this._openMoreInfo(e))}}>
        <span class="gauge-label">${e.name}</span>
        <div class="gauge-bar-container">
          <div class="gauge-bar ${r}"></div>
          ${n?"":U`
            <div class="gauge-indicator" style="bottom: ${o}%;">
              ${this._renderTriangle(t)}
            </div>
          `}
        </div>
        <span class="gauge-value">${a}</span>
      </div>
    `}_renderTriangle(t){const e=`triGrad-${this._instanceId}-${t}`;return U`
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
    `}_renderControls(){return U`
      <div class="controls-row">
        ${this._config.controls.output_level?this._renderOutputLevel():""}
        ${this._config.controls.boost?this._renderBoost():""}
      </div>
    `}_renderOutputLevel(){const t=this._config.controls.output_level.entity,e=_t(this.hass.states[t]),s=null===e,i=this._pendingOutput,n=i?.value??e?.value,r=e&&gt(n,-1,e),o=e&&gt(n,1,e),a=i?`Requested ${i.value}; waiting for the device report.`:this._outputError;return U`
      <div class="output-level-wrapper ${s?"unavailable":""}">
        <span class="output-level-label">Output Level</span>
        <div class="output-level" aria-busy=${i?"true":"false"} title=${a}>
          <span class="sr-only" role="status">${a}</span>
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
            ?disabled=${null===o}
            @click=${()=>this._adjustOutputLevel(1)}>
            +
          </button>
        </div>
      </div>
    `}_renderBoost(){const t=this._config.controls.boost.entity,e=this.hass.states[t],s=!["on","off"].includes(e?.state),i="on"===e?.state,n=this._pendingBoost,r=n?`Requested Boost ${n.value}; waiting for the device report.`:this._boostError||(s?"Boost unavailable.":`Boost reported ${e.state}.`);return U`
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
