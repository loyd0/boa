"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_createClass=function(){function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var Boa=function(){function e(){_classCallCheck(this,e),this.elements=[],this.regexes={attrRegex:new RegExp(/([\w\-]+)/.source+/(?:= ?)/.source+/([\w\-\/\.\;\: ]+)/.source+/(?= [\w\-]+=|$)/.source,"g")},this.treeLevel=0,this.levelChange=!1,this.logConstruction=!1,this.reports=[]}return _createClass(e,[{key:"down",get:function(){return this.treeLevel++,this.nextChild=!0,this.levelChange=!0,this}},{key:"up",get:function(){return this.treeLevel=this.treeLevel-1,this.levelChange=!0,this}},{key:"para",get:function(){return this.levelChange=!1,this}},{key:"showConstruction",get:function(){return this.logConstruction=!0,this}}]),e}();function cssSelector(e){return document.querySelector(e)}function appendAllElements(e,t){var n=cycle(t,t[0].html,0);console.log(n),e.append(n)}function cycle(e,t,n){if(n++,console.log(n,t),1<e.length)for(var r in e)console.log("FIRST ROUNDS",r),t&&0===e[r].children.length?(console.log(n,"Firing Append FOr Loop1",e[r]),t.append(e[r].html)):(console.log(n,"Firing Append FOr Loop2",e[r]),t.append(cycle(e[r].children,e[r].html,n)));else if(e.children){if(!(0<e.children.length))return console.log(n,"Bootm"),t.append(e.html);console.log(n,"Children 2",e.children),console.log(n,"Children 2html",e.html),console.log(n,"html 2",t);var l=cycle(e.children,e.html,100);console.log(n,"cycle",l),t.append(cycle(e.children,e.html,n))}else{if(0<e[0].children.length)return console.log(n,"Children 1",e[0].children),console.log(n,"html 1",t),console.log(n,"html element",e[0].html),cycle(e[0].children,e[0].html,n);console.log(n,"else: ",e[0],t),console.log(n,"returning",t,e[0].html),t.append(e[0].html)}return console.log(n,"Returning",t),t}function appendCycle(e,t,n){var r="-".repeat(t);console.log(r,"Iterarion",t),t++;var l=e;console.log(r,"Elements Length",l.length),console.log(r,"Elements",l),1<l.length?(console.log(r,"More than one element",l),console.log(r,"Going Deeper"),appendCycle(l[l.length-1],t)):l[0]?0<l[0].children.length?appendCycle(l[0].children,t):l[0].html&&console.log(l[0].html):l.children&&0<l.children.length?(console.log(r,"Found Children",l),appendCycle(l.children,t)):console.log(l.html)}Boa.prototype.construct=function(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:"";if(this.validate([e,"string"],[t,"string"],[n,"string"])){var r=this.createHTMLTag(e),l=this.identifyAttr(t),o=this.createContent(n);Object.keys(l).forEach(function(e){r.setAttribute(e,l[e])}),r.append(o);var s=this.createElementObject(e,l,n,r);if(this.report("--------------------NEW ELEMENT------------------------"),this.report("Element created:",s),this.report("Element depth level:",this.treeLevel),0<this.treeLevel&&this.nextChild){var i=this.elements[this.elements.length-1];this.report("Nesting as child:",s.tag),this.report("Elements branch starting element:",i);for(var h=0;h<this.treeLevel;h++)i=i.children[i.children.length-1]||i.children,this.report("Progressing down tree: (Level: "+h+") - target at level:",i),h===this.treeLevel-2?(this.report("Parent of element:",i),this.lastElementParent=i):h===this.treeLevel-1&&(this.report("Adding elements to parent:",{element:s,parent:i}),this.applyElements(i,s),this.nextChild=!1)}else if(0<this.treeLevel&&!this.nextChild&&this.levelChange){var c=this.elements[this.elements.length-1];this.report("Nesting as sibling of parent:",s.tag),this.report("Elements branch starting element:",c);for(h=0;h<this.treeLevel;h++)c=c.children,this.report("Progressing down tree: (Level: "+h+") - target at level:",c),h===this.treeLevel-2?(this.report("Parent of element:",c),this.lastElementParent=c):h===this.treeLevel-1&&(this.report("Adding elements to parent:",{element:s,parent:c}),this.applyElements(c,s),this.nextChild=!1)}else!this.levelChange&&!this.nextChild&&0<this.treeLevel?(this.report("Nesting as sibling of element:",s.tag),this.report("Using this parent to nest as sibling:",this.lastElementParent),console.log("last element parent",this.lastElementParent),this.applyElements(this.lastElementParent,s)):(this.report("Creating new branch",s.tag),this.report("TreeLevel should be 0. TreeLevel => ",this.treeLevel),this.elements.push(s));return this}},Boa.prototype.applyElements=function(e,t){return(this.lastElementParent=e).push(t),this},Boa.prototype.createElementObject=function(e,t,n,r){return{tag:e,attributes:t,content:n,html:r,children:[]}},Boa.prototype.createContent=function(e){return document.createTextNode(e)},Boa.prototype.validate=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];var r=t.filter(function(e){return _typeof(e[0])!=e[1]});if(0===r.length)return!0;this.report("Error: Arguments given to construct must be strings \n\n"+r[0][0]+" is not a "+r[0][1])},Boa.prototype.report=function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"";return this.logConstruction?(""!==t?this.reports.push([e,t]):this.reports.push([e]),console.log(e,t)):void 0},Boa.prototype.createHTMLTag=function(e){return document.createElement(e)},Boa.prototype.identifyAttr=function(e){var t={},n=this.regexes.attrRegex;if(n.test(e))for(var r=void(n.lastIndex=0);null!==(r=n.exec(e));)t[r[1]]=r[2];else t=!1;return t},Boa.prototype.build=function(t){var n=this.elements;return document.addEventListener("DOMContentLoaded",function(e){appendAllElements(t=cssSelector(t),n)}),this};