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
const t="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,e=(t,e,s=null)=>{for(;e!==s;){const s=e.nextSibling;t.removeChild(e),e=s}},s=`{{lit-${String(Math.random()).slice(2)}}}`,r=`\x3c!--${s}--\x3e`,i=new RegExp(`${s}|${r}`),o="$lit$";class n{constructor(t,e){this.parts=[],this.element=e;const r=[],n=[],l=document.createTreeWalker(e.content,133,null,!1);let p=0,h=-1,u=0;const{strings:g,values:{length:f}}=t;for(;u<f;){const t=l.nextNode();if(null!==t){if(h++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:s}=e;let r=0;for(let t=0;t<s;t++)a(e[t].name,o)&&r++;for(;r-- >0;){const e=g[u],s=c.exec(e)[2],r=s.toLowerCase()+o,n=t.getAttribute(r);t.removeAttribute(r);const a=n.split(i);this.parts.push({type:"attribute",index:h,name:s,strings:a}),u+=a.length-1}}"TEMPLATE"===t.tagName&&(n.push(t),l.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(s)>=0){const s=t.parentNode,n=e.split(i),l=n.length-1;for(let e=0;e<l;e++){let r,i=n[e];if(""===i)r=d();else{const t=c.exec(i);null!==t&&a(t[2],o)&&(i=i.slice(0,t.index)+t[1]+t[2].slice(0,-5)+t[3]),r=document.createTextNode(i)}s.insertBefore(r,t),this.parts.push({type:"node",index:++h})}""===n[l]?(s.insertBefore(d(),t),r.push(t)):t.data=n[l],u+=l}}else if(8===t.nodeType)if(t.data===s){const e=t.parentNode;null!==t.previousSibling&&h!==p||(h++,e.insertBefore(d(),t)),p=h,this.parts.push({type:"node",index:h}),null===t.nextSibling?t.data="":(r.push(t),h--),u++}else{let e=-1;for(;-1!==(e=t.data.indexOf(s,e+1));)this.parts.push({type:"node",index:-1}),u++}}else l.currentNode=n.pop()}for(const t of r)t.parentNode.removeChild(t)}}const a=(t,e)=>{const s=t.length-e.length;return s>=0&&t.slice(s)===e},l=t=>-1!==t.index,d=()=>document.createComment(""),c=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function p(t,e){const{element:{content:s},parts:r}=t,i=document.createTreeWalker(s,133,null,!1);let o=u(r),n=r[o],a=-1,l=0;const d=[];let c=null;for(;i.nextNode();){a++;const t=i.currentNode;for(t.previousSibling===c&&(c=null),e.has(t)&&(d.push(t),null===c&&(c=t)),null!==c&&l++;void 0!==n&&n.index===a;)n.index=null!==c?-1:n.index-l,o=u(r,o),n=r[o]}d.forEach((t=>t.parentNode.removeChild(t)))}const h=t=>{let e=11===t.nodeType?0:1;const s=document.createTreeWalker(t,133,null,!1);for(;s.nextNode();)e++;return e},u=(t,e=-1)=>{for(let s=e+1;s<t.length;s++){const e=t[s];if(l(e))return s}return-1};
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
const g=new WeakMap,f=t=>"function"==typeof t&&g.has(t),m={},v={};
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
class _{constructor(t,e,s){this.__parts=[],this.template=t,this.processor=e,this.options=s}update(t){let e=0;for(const s of this.__parts)void 0!==s&&s.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const e=t?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),s=[],r=this.template.parts,i=document.createTreeWalker(e,133,null,!1);let o,n=0,a=0,d=i.nextNode();for(;n<r.length;)if(o=r[n],l(o)){for(;a<o.index;)a++,"TEMPLATE"===d.nodeName&&(s.push(d),i.currentNode=d.content),null===(d=i.nextNode())&&(i.currentNode=s.pop(),d=i.nextNode());if("node"===o.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(d.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(d,o.name,o.strings,this.options));n++}else this.__parts.push(void 0),n++;return t&&(document.adoptNode(e),customElements.upgrade(e)),e}}
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
 */const b=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),y=` ${s} `;class x{constructor(t,e,s,r){this.strings=t,this.values=e,this.type=s,this.processor=r}getHTML(){const t=this.strings.length-1;let e="",i=!1;for(let n=0;n<t;n++){const t=this.strings[n],a=t.lastIndexOf("\x3c!--");i=(a>-1||i)&&-1===t.indexOf("--\x3e",a+1);const l=c.exec(t);e+=null===l?t+(i?y:r):t.substr(0,l.index)+l[1]+l[2]+o+l[3]+s}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return void 0!==b&&(e=b.createHTML(e)),t.innerHTML=e,t}}
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
 */const w=t=>null===t||!("object"==typeof t||"function"==typeof t),S=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class C{constructor(t,e,s){this.dirty=!0,this.element=t,this.name=e,this.strings=s,this.parts=[];for(let t=0;t<s.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new P(this)}_getValue(){const t=this.strings,e=t.length-1,s=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=s[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!S(t))return t}let r="";for(let i=0;i<e;i++){r+=t[i];const e=s[i];if(void 0!==e){const t=e.value;if(w(t)||!S(t))r+="string"==typeof t?t:String(t);else for(const e of t)r+="string"==typeof e?e:String(e)}}return r+=t[e],r}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class P{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===m||w(t)&&t===this.value||(this.value=t,f(t)||(this.committer.dirty=!0))}commit(){for(;f(this.value);){const t=this.value;this.value=m,t(this)}this.value!==m&&this.committer.commit()}}class N{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(d()),this.endNode=t.appendChild(d())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=d()),t.__insert(this.endNode=d())}insertAfterPart(t){t.__insert(this.startNode=d()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;f(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=m,t(this)}const t=this.__pendingValue;t!==m&&(w(t)?t!==this.value&&this.__commitText(t):t instanceof x?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):S(t)?this.__commitIterable(t):t===v?(this.value=v,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,s="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=s:this.__commitNode(document.createTextNode(s)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof _&&this.value.template===e)this.value.update(t.values);else{const s=new _(e,t.processor,this.options),r=s._clone();s.update(t.values),this.__commitNode(r),this.value=s}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let s,r=0;for(const i of t)s=e[r],void 0===s&&(s=new N(this.options),e.push(s),0===r?s.appendIntoPart(this):s.insertAfterPart(e[r-1])),s.setValue(i),s.commit(),r++;r<e.length&&(e.length=r,this.clear(s&&s.endNode))}clear(t=this.startNode){e(this.startNode.parentNode,t.nextSibling,this.endNode)}}class k{constructor(t,e,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=s}setValue(t){this.__pendingValue=t}commit(){for(;f(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=m,t(this)}if(this.__pendingValue===m)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=m}}class $ extends C{constructor(t,e,s){super(t,e,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new E(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class E extends P{}let T=!1;(()=>{try{const t={get capture(){return T=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class A{constructor(t,e,s){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=s,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;f(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=m,t(this)}if(this.__pendingValue===m)return;const t=this.__pendingValue,e=this.value,s=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),r=null!=t&&(null==e||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),r&&(this.__options=O(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=m}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const O=t=>t&&(T?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)
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
 */;function V(t){let e=U.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},U.set(t.type,e));let r=e.stringsArray.get(t.strings);if(void 0!==r)return r;const i=t.strings.join(s);return r=e.keyString.get(i),void 0===r&&(r=new n(t,t.getTemplateElement()),e.keyString.set(i,r)),e.stringsArray.set(t.strings,r),r}const U=new Map,M=new WeakMap;
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
 */const R=new
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
class{handleAttributeExpressions(t,e,s,r){const i=e[0];if("."===i){return new $(t,e.slice(1),s).parts}if("@"===i)return[new A(t,e.slice(1),r.eventContext)];if("?"===i)return[new k(t,e.slice(1),s)];return new C(t,e,s).parts}handleTextExpression(t){return new N(t)}};
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
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.4.1");const j=(t,...e)=>new x(t,e,"html",R)
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
 */,z=(t,e)=>`${t}--${e}`;let L=!0;void 0===window.ShadyCSS?L=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),L=!1);const I=t=>e=>{const r=z(e.type,t);let i=U.get(r);void 0===i&&(i={stringsArray:new WeakMap,keyString:new Map},U.set(r,i));let o=i.stringsArray.get(e.strings);if(void 0!==o)return o;const a=e.strings.join(s);if(o=i.keyString.get(a),void 0===o){const s=e.getTemplateElement();L&&window.ShadyCSS.prepareTemplateDom(s,t),o=new n(e,s),i.keyString.set(a,o)}return i.stringsArray.set(e.strings,o),o},q=["html","svg"],B=new Set,F=(t,e,s)=>{B.add(t);const r=s?s.element:document.createElement("template"),i=e.querySelectorAll("style"),{length:o}=i;if(0===o)return void window.ShadyCSS.prepareTemplateStyles(r,t);const n=document.createElement("style");for(let t=0;t<o;t++){const e=i[t];e.parentNode.removeChild(e),n.textContent+=e.textContent}(t=>{q.forEach((e=>{const s=U.get(z(e,t));void 0!==s&&s.keyString.forEach((t=>{const{element:{content:e}}=t,s=new Set;Array.from(e.querySelectorAll("style")).forEach((t=>{s.add(t)})),p(t,s)}))}))})(t);const a=r.content;s?function(t,e,s=null){const{element:{content:r},parts:i}=t;if(null==s)return void r.appendChild(e);const o=document.createTreeWalker(r,133,null,!1);let n=u(i),a=0,l=-1;for(;o.nextNode();)for(l++,o.currentNode===s&&(a=h(e),s.parentNode.insertBefore(e,s));-1!==n&&i[n].index===l;){if(a>0){for(;-1!==n;)i[n].index+=a,n=u(i,n);return}n=u(i,n)}}(s,n,a.firstChild):a.insertBefore(n,a.firstChild),window.ShadyCSS.prepareTemplateStyles(r,t);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(s){a.insertBefore(n,a.firstChild);const t=new Set;t.add(n),p(s,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const H={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},D=(t,e)=>e!==t&&(e==e||t==t),W={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:D},G="finalized";class J extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach(((e,s)=>{const r=this._attributeNameForProperty(s,e);void 0!==r&&(this._attributeToPropertyMap.set(r,s),t.push(r))})),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach(((t,e)=>this._classProperties.set(e,t)))}}static createProperty(t,e=W){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const s="symbol"==typeof t?Symbol():`__${t}`,r=this.getPropertyDescriptor(t,s,e);void 0!==r&&Object.defineProperty(this.prototype,t,r)}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(r){const i=this[t];this[e]=r,this.requestUpdateInternal(t,i,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||W}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty(G)||t.finalize(),this[G]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const s of e)this.createProperty(s,t[s])}}static _attributeNameForProperty(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,s=D){return s(t,e)}static _propertyValueFromAttribute(t,e){const s=e.type,r=e.converter||H,i="function"==typeof r?r:r.fromAttribute;return i?i(t,s):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const s=e.type,r=e.converter;return(r&&r.toAttribute||H.toAttribute)(t,s)}initialize(){this._updateState=0,this._updatePromise=new Promise((t=>this._enableUpdatingResolver=t)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((t,e)=>this[e]=t)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,s){e!==s&&this._attributeToProperty(t,s)}_propertyToAttribute(t,e,s=W){const r=this.constructor,i=r._attributeNameForProperty(t,s);if(void 0!==i){const t=r._propertyValueToAttribute(e,s);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(i):this.setAttribute(i,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const s=this.constructor,r=s._attributeToPropertyMap.get(t);if(void 0!==r){const t=s.getPropertyOptions(r);this._updateState=16|this._updateState,this[r]=s._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}requestUpdateInternal(t,e,s){let r=!0;if(void 0!==t){const i=this.constructor;s=s||i.getPropertyOptions(t),i._valueHasChanged(this[t],e,s.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==s.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,s))):r=!1}!this._hasRequestedUpdate&&r&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this.requestUpdateInternal(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((t,e)=>this._propertyToAttribute(e,this[e],t))),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}J[G]=!0;
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
const Q=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Y=Symbol();class K{constructor(t,e){if(e!==Y)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(Q?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const X=(t,...e)=>{const s=e.reduce(((e,s,r)=>e+(t=>{if(t instanceof K)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+t[r+1]),t[0]);return new K(s,Y)};
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.5.1");const Z={};class tt extends J{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(Array.isArray(t)){const e=(t,s)=>t.reduceRight(((t,s)=>Array.isArray(s)?e(s,t):(t.add(s),t)),s),s=e(t,new Set),r=[];s.forEach((t=>r.unshift(t))),this._styles=r}else this._styles=void 0===t?[]:[t];this._styles=this._styles.map((t=>{if(t instanceof CSSStyleSheet&&!Q){const e=Array.prototype.slice.call(t.cssRules).reduce(((t,e)=>t+e.cssText),"");return new K(String(e),Y)}return t}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow(this.constructor.shadowRootOptions)}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?Q?this.renderRoot.adoptedStyleSheets=t.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map((t=>t.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==Z&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)})))}render(){return Z}}tt.finalized=!0,tt.render=(t,s,r)=>{if(!r||"object"!=typeof r||!r.scopeName)throw new Error("The `scopeName` option is required.");const i=r.scopeName,o=M.has(s),n=L&&11===s.nodeType&&!!s.host,a=n&&!B.has(i),l=a?document.createDocumentFragment():s;if(((t,s,r)=>{let i=M.get(s);void 0===i&&(e(s,s.firstChild),M.set(s,i=new N(Object.assign({templateFactory:V},r))),i.appendInto(s)),i.setValue(t),i.commit()})(t,l,Object.assign({templateFactory:I(i)},r)),a){const t=M.get(l);M.delete(l);const r=t.value instanceof _?t.value.template:void 0;F(i,l,r),e(s,s.firstChild),s.appendChild(l),M.set(s,t)}!o&&n&&window.ShadyCSS.styleElement(s.host)},tt.shadowRootOptions={mode:"open"};const et=X`
  /* ===== Card Container (glassmorphism) ===== */
  :host {
    --spa-card-bg: rgba(255, 255, 255, 0.72);
    --spa-card-border: rgba(0, 0, 0, 0.06);
    --spa-card-shadow: 0 2px 16px rgba(0, 0, 0, 0.04), 0 0 0 0.5px rgba(0, 0, 0, 0.03);
    --spa-card-radius: 16px;
    --spa-card-blur: 40px;
    --spa-card-padding: 16px;

    --spa-header-color: rgba(0, 0, 0, 0.75);
    --spa-label-color: rgba(0, 0, 0, 0.6);
    --spa-value-color: rgba(0, 0, 0, 0.45);

    --spa-bar-width: 44px;
    --spa-bar-height: 130px;
    --spa-bar-radius: 3px;
    --spa-bar-border: rgba(0, 0, 0, 0.1);

    --spa-color-danger: #dc2626;
    --spa-color-caution: #ca8a04;
    --spa-color-ideal: #16a34a;

    --spa-control-bg: rgba(0, 0, 0, 0.035);
    --spa-control-border: rgba(0, 0, 0, 0.08);
    --spa-control-active-bg: rgba(0, 0, 0, 0.14);
    --spa-control-active-border: rgba(0, 0, 0, 0.25);
    --spa-text-primary: rgba(0, 0, 0, 0.8);
    --spa-text-secondary: rgba(0, 0, 0, 0.5);
    --spa-text-tertiary: rgba(0, 0, 0, 0.3);

    --spa-divider-color: rgba(0, 0, 0, 0.06);
  }

  .card {
    background: var(--spa-card-bg);
    backdrop-filter: blur(var(--spa-card-blur));
    -webkit-backdrop-filter: blur(var(--spa-card-blur));
    border-radius: var(--spa-card-radius);
    border: 1px solid var(--spa-card-border);
    padding: var(--spa-card-padding);
    box-shadow: var(--spa-card-shadow);
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
    color: var(--spa-header-color);
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
    color: var(--spa-label-color);
    letter-spacing: 0.01em;
  }
  .gauge-bar-container {
    position: relative;
    width: var(--spa-bar-width);
    height: var(--spa-bar-height);
  }
  .gauge-bar {
    width: 100%;
    height: 100%;
    border-radius: var(--spa-bar-radius);
    box-shadow: inset 0 0 0 1.5px var(--spa-bar-border), inset 0 1px 2px rgba(0, 0, 0, 0.08);
  }
  .gauge-bar.gradient-standard {
    background: linear-gradient(to top,
      var(--spa-color-danger) 0%,
      var(--spa-color-danger) 8%,
      var(--spa-color-caution) 10%,
      var(--spa-color-caution) 18%,
      var(--spa-color-ideal) 20%,
      var(--spa-color-ideal) 80%,
      var(--spa-color-caution) 82%,
      var(--spa-color-caution) 90%,
      var(--spa-color-danger) 92%,
      var(--spa-color-danger) 100%
    );
  }
  .gauge-bar.gradient-depletion {
    background: linear-gradient(to top,
      var(--spa-color-danger) 0%,
      var(--spa-color-danger) 8%,
      var(--spa-color-caution) 10%,
      var(--spa-color-caution) 18%,
      var(--spa-color-ideal) 20%,
      var(--spa-color-ideal) 100%
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
    color: var(--spa-value-color);
  }

  /* ===== Divider ===== */
  .divider {
    height: 1px;
    background: var(--spa-divider-color);
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
    color: var(--spa-label-color);
    margin: 4px 0 8px 10px;
  }
  .output-level {
    background: var(--spa-control-bg);
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
    border: 1px solid var(--spa-control-border);
    background: var(--spa-control-bg);
    color: var(--spa-text-secondary);
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
    color: var(--spa-text-primary);
    min-width: 30px;
    text-align: center;
  }

  .boost-btn {
    width: 100px;
    background: var(--spa-control-bg);
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
    background: var(--spa-control-active-bg);
    border-color: var(--spa-control-active-border);
  }
  .boost-icon {
    stroke: var(--spa-text-secondary);
  }
  .boost-btn.active .boost-icon {
    stroke: var(--spa-text-primary);
  }
  .boost-label {
    font-size: 12px;
    font-weight: 600;
    color: var(--spa-text-secondary);
  }
  .boost-btn.active .boost-label {
    color: var(--spa-text-primary);
  }
  .boost-state {
    font-size: 11px;
    font-weight: 500;
    color: var(--spa-text-tertiary);
    opacity: 0.8;
  }
  .boost-btn.active .boost-state {
    color: var(--spa-text-secondary);
  }

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
    --spa-card-bg: rgba(30, 30, 30, 0.72);
    --spa-card-border: rgba(255, 255, 255, 0.08);
    --spa-card-shadow: 0 2px 16px rgba(0, 0, 0, 0.3);
    --spa-header-color: rgba(255, 255, 255, 0.75);
    --spa-label-color: rgba(255, 255, 255, 0.6);
    --spa-value-color: rgba(255, 255, 255, 0.45);
    --spa-bar-border: rgba(255, 255, 255, 0.15);
    --spa-control-bg: rgba(255, 255, 255, 0.06);
    --spa-control-border: rgba(255, 255, 255, 0.1);
    --spa-control-active-bg: rgba(255, 255, 255, 0.18);
    --spa-control-active-border: rgba(255, 255, 255, 0.3);
    --spa-text-primary: rgba(255, 255, 255, 0.9);
    --spa-text-secondary: rgba(255, 255, 255, 0.6);
    --spa-text-tertiary: rgba(255, 255, 255, 0.35);
    --spa-divider-color: rgba(255, 255, 255, 0.08);
  }
`,st={chlorine:{name:"Chlorine",unit:"ppm",min:0,max:6,setpoint:3,decimals:1,gradient:"standard"},ph:{name:"pH",unit:"",min:7,max:8,setpoint:7.5,decimals:1,gradient:"standard"},salt:{name:"Salt",unit:"ppm",min:1200,max:2400,setpoint:1800,decimals:0,gradient:"standard"},iq_sensor:{name:"IQ Sensor",unit:"",min:0,max:1e4,setpoint:5e3,decimals:0,gradient:"depletion",display_format:"hours_to_months"}};const rt=Object.keys(st);customElements.define("spa-monitor-card-editor",class extends tt{static get properties(){return{hass:{type:Object},_config:{type:Object}}}static get styles(){return X`
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
    `}setConfig(t){this._config={...t}}render(){if(!this.hass||!this._config)return j``;const t=this._config.theme||"auto";return j`
      <div class="editor">
        <div class="section">
          <div class="section-title">General</div>
          <div class="field">
            <label>Title</label>
            <input type="text"
              .value=${this._config.title||""}
              @input=${this._titleChanged}>
          </div>
          <div class="field">
            <label>Theme</label>
            <select @change=${this._themeChanged}>
              <option value="auto" ?selected=${"auto"===t}>Auto</option>
              <option value="light" ?selected=${"light"===t}>Light</option>
              <option value="dark" ?selected=${"dark"===t}>Dark</option>
            </select>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Sensors</div>
          ${rt.map((t=>this._renderSensorField(t)))}
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
    `}_renderSensorField(t){const e=st[t],s=this._config.sensors?.[t]?.entity||"";return j`
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
    `}_titleChanged(t){this._updateConfig({title:t.target.value})}_themeChanged(t){this._updateConfig({theme:t.target.value})}_sensorChanged(t,e){const s=e.detail.value,r={...this._config.sensors};s?r[t]={...r[t]||{},entity:s}:delete r[t],this._updateConfig({sensors:r})}_controlChanged(t,e){const s=e.detail.value,r={...this._config.controls};s?r[t]={...r[t]||{},entity:s}:delete r[t],this._updateConfig({controls:r})}_updateConfig(t){this._config={...this._config,...t},function(t,e,s){const r=new CustomEvent(e,{bubbles:!0,composed:!0,detail:s});t.dispatchEvent(r)}(this,"config-changed",{config:this._config})}});const it=["auto","light","dark"];let ot=0;console.info("%c SPA-MONITOR-CARD %c v0.1.0 ","color: white; background: #16a34a; font-weight: bold;","color: #16a34a; background: white; font-weight: bold;");customElements.define("spa-monitor-card",class extends tt{constructor(){super(),this._instanceId=ot++}static get properties(){return{hass:{type:Object},_config:{type:Object}}}static get styles(){return et}static getConfigElement(){return document.createElement("spa-monitor-card-editor")}setConfig(t){if(!t.sensors||0===Object.keys(t.sensors).length)throw new Error("Please define at least one sensor.");if(t.theme&&!it.includes(t.theme))throw new Error(`Invalid theme "${t.theme}". Must be: ${it.join(", ")}`);const e={};for(const[s,r]of Object.entries(t.sensors)){const t=st[s]||{};if(e[s]={...t,...r,gradient:r.gradient||t.gradient||"standard"},!e[s].entity)throw new Error(`Sensor "${s}" requires an entity.`)}this._config={...t,title:t.title||"",theme:t.theme||"auto",sensors:e,controls:t.controls||{}}}getConfig(){return this._config}getCardSize(){return 4}render(){if(!this._config||!this.hass)return j``;const t="dark"===this._config.theme||"auto"===this._config.theme&&this.hass.themes?.darkMode;return j`
      <div class="card ${t?"dark":""}">
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
        ${Object.entries(this._config.sensors).map((([t,e])=>this._renderSingleGauge(t,e)))}
      </div>
    `}_renderSingleGauge(t,e){const s=this.hass.states[e.entity],r=this._isUnavailable(s),i=r?null:parseFloat(s.state),o=`gradient-${e.gradient||"standard"}`,n=r?0:function(t,e,s){return(Math.max(e,Math.min(s,t))-e)/(s-e)*100}(i,e.min,e.max);let a="---";return r||(a=this._formatValue(i,e)),j`
      <div class="gauge ${r?"unavailable":""}">
        <span class="gauge-label">${e.name}</span>
        <div class="gauge-bar-container">
          <div class="gauge-bar ${o}"></div>
          ${r?"":j`
            <div class="gauge-indicator" style="bottom: ${n}%;">
              ${this._renderTriangle(t)}
            </div>
          `}
        </div>
        <span class="gauge-value">${a}</span>
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
    `}_renderOutputLevel(){const t=this._config.controls.output_level.entity,e=this.hass.states[t],s=this._isUnavailable(e),r=s?0:parseFloat(e.state),i=e?.attributes?.min??0,o=e?.attributes?.max??10;return j`
      <div class="output-level-wrapper ${s?"unavailable":""}">
        <span class="output-level-label">Output Level</span>
        <div class="output-level">
          <button class="stepper-btn"
            ?disabled=${s}
            @click=${()=>this._setOutputLevel(Math.max(i,r-1))}>
            −
          </button>
          <span class="output-level-value">${s?"---":r}</span>
          <button class="stepper-btn"
            ?disabled=${s}
            @click=${()=>this._setOutputLevel(Math.min(o,r+1))}>
            +
          </button>
        </div>
      </div>
    `}_renderBoost(){const t=this._config.controls.boost.entity,e=this.hass.states[t],s=this._isUnavailable(e),r="on"===e?.state;return j`
      <div class="boost-btn ${r?"active":""} ${s?"unavailable":""}"
        @click=${()=>!s&&this._toggleBoost()}>
        <svg class="boost-icon" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
        <span class="boost-label">Boost</span>
        <span class="boost-state">${s?"---":r?"On":"Off"}</span>
      </div>
    `}_isUnavailable(t){if(!t)return!0;const e=t.state;return"unavailable"===e||"unknown"===e||void 0===e}_formatValue(t,e){if(isNaN(t))return"---";if("hours_to_months"===e.display_format)return`${Math.round(t/720)} mo`;const s=e.decimals??1,r=0===s?Math.round(t).toString():t.toFixed(s);return e.unit?`${r} ${e.unit}`:r}_hasControls(){return this._config.controls.output_level||this._config.controls.boost}_setOutputLevel(t){const e=this._config.controls.output_level.entity;this.hass.callService("number","set_value",{entity_id:e,value:t})}_toggleBoost(){const t=this._config.controls.boost.entity;this.hass.callService("switch","toggle",{entity_id:t})}}),window.customCards=window.customCards||[],window.customCards.push({type:"spa-monitor-card",name:"Spa Monitor Card",description:"Water quality monitoring for HotSpring/ESP-IQ2020 salt systems"});
