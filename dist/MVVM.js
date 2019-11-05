/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/compile.js":
/*!************************!*\
  !*** ./src/compile.js ***!
  \************************/
/*! exports provided: CompilerUtils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CompilerUtils\", function() { return CompilerUtils; });\n/* harmony import */ var _watcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./watcher */ \"./src/watcher.js\");\n\n\n//通过指令解析\nvar CompilerUtils={\n    //解析text指令\n    text(node,vm,expr){\n        //找到更新方法\n        var updaterFn=this.updater['textUpdater'];\n        //执行更新方法\n        updaterFn && updaterFn(node,vm.$data[expr])\n        var date =expr\n        //发出订阅，按之前的更新方法更新\n        new _watcher__WEBPACK_IMPORTED_MODULE_0__[\"Watcher\"](vm,expr,(newValue)=>{\n            updaterFn && updaterFn(node,newValue)\n        })\n    },\n    model(node,vm,expr){\n        //找到更新方法\n        var updaterFn=this.updater['modelUpdater'];\n        //执行更新方法\n        updaterFn && updaterFn(node,vm.$data[expr])\n\n        //发出订阅，按之前的更新方法更新\n        new _watcher__WEBPACK_IMPORTED_MODULE_0__[\"Watcher\"](vm,expr,(newValue)=>{\n            updaterFn && updaterFn(node,newValue)\n        })\n\n        node.addEventListener('input',(e)=>{\n            var newValue=e.target.value;\n\n            vm.$data[expr]=newValue;\n        })\n    },\n    //更新规则\n    updater:{\n        //文本更新\n        textUpdater(node,value){\n            node.textContent=value\n        },\n        modelUpdater(node,value){\n            node.value=value\n        }\n    },\n}\n\n\n\n//# sourceURL=webpack:///./src/compile.js?");

/***/ }),

/***/ "./src/dep.js":
/*!********************!*\
  !*** ./src/dep.js ***!
  \********************/
/*! exports provided: Dep */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Dep\", function() { return Dep; });\n//创建发布者\n//管理订阅者\n//通知\nfunction Dep(){\n    this.subs=[];\n}\nDep.prototype={\n    //添加订阅\n    addSub(sub){\n        this.subs.push(sub)\n    },\n    //通知\n    notify(){\n        this.subs.forEach((sub)=>{\n            sub.update();\n        })\n    }\n}\n\n//# sourceURL=webpack:///./src/dep.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/utils/index.js\");\n/* harmony import */ var _watcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./watcher */ \"./src/watcher.js\");\n/* harmony import */ var _observer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./observer */ \"./src/observer.js\");\n/* harmony import */ var _compile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./compile */ \"./src/compile.js\");\n\n\n\n\n\n// MiniVue构造函数 参数是一个对象\nclass MVVM {\n    constructor(options){\n        this._init(options)\n    }\n\n    // 初始化数据和方法\n    _init(options) {\n        this.vm=this,\n        this.$el = options.el;\n        this.$data=options.data;\n\n        //获取元素node节点\n        var el=Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"query\"])(this.$el);\n        if(!el){\n            return ;\n        }\n        this.$el=el;\n\n        //添加属性观察对象\n        new _observer__WEBPACK_IMPORTED_MODULE_2__[\"Observer\"](this.$data)\n\n        //获取节点片段\n        var fragment=this.node2Fragment(el)\n\n        //解析\n        this.compiler(fragment)\n        this.$el.appendChild(fragment)\n\n    }\n\n    //解析虚拟dom\n    compiler(parent){\n        //获取子节点\n        let childNodes=parent.childNodes;\n        //遍历每一个节点\n        Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"toArray\"])(childNodes).forEach((node)=>{\n            //判断节点类型\n            //属性节点（解析指令）\n            if(Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"isElementNode\"])(node)){\n                this.compileElement(node)\n            }else if(Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"isTextNode\"])(node)){\n                //文本节点（解析指令）\n                this.compileText(node)\n            }\n            //如果还有子节点，继续解析\n            this.compiler(node)\n        })\n \n    }\n\n    //解析元素节点的指令\n    compileElement(node){\n        //获取当前元素的所有属性\n        var attributes=node.attributes;\n        //遍历当前元素的所有属性\n        Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"toArray\"])(attributes).forEach((item)=>{\n            var attrName=item.name;\n            //判断属性是否是指令\n            if(Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"isDirective\"])(attrName)){\n                //获取指令类型\n                var type=attrName.substr(2)\n                //指令的值就是表达式\n                var expr=item.value;\n                if(!!_compile__WEBPACK_IMPORTED_MODULE_3__[\"CompilerUtils\"][type]){\n                    _compile__WEBPACK_IMPORTED_MODULE_3__[\"CompilerUtils\"][type](node,this.vm,expr)\n                }\n                \n            }\n        })\n    }\n\n    \n    //解析文本节点的指令\n    compileText(node){\n        var textReg_g=/\\{\\{([^\\{]+)\\}\\}/mg\n        var textContent=node.textContent;\n        var match=textContent.match(textReg_g)\n        if(!!match){\n            var matchArr=match.map((item)=>{\n                //去掉{{}}\n                item=item.slice(2,item.length-2);\n                item.trim();\n                return item;\n            })\n            node.textContent=this.compileText_update(textContent,matchArr)\n\n            matchArr.forEach((item)=>{\n                if(!!this.$data[item]){\n                    new _watcher__WEBPACK_IMPORTED_MODULE_1__[\"Watcher\"](this,item,(newValue)=>{\n                        node.textContent=this.compileText_update(textContent,matchArr)\n                    })\n                }\n            })\n        }   \n    }\n    //解析文本节点，返回替换成的文本\n    compileText_update(textContent,matchArr){\n        var textReg=/\\{\\{([^\\{]+)\\}\\}/m\n        matchArr.forEach((item)=>{\n            console.log('this.$data[item',this.$data[item])\n            textContent=textContent.replace(textReg,this.$data[item])\n        })\n        return textContent;\n    }\n\n    //获取元素片段\n    node2Fragment(node){\n        let fragment=document.createDocumentFragment(),child;\n        while(child=node.firstChild){\n            //child在原来的那里就没了，由于指针已经变了\n            fragment.appendChild(child)\n        }\n        return fragment\n    }\n}\n\nwindow.MVVM=MVVM;\n\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/observer.js":
/*!*************************!*\
  !*** ./src/observer.js ***!
  \*************************/
/*! exports provided: Observer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Observer\", function() { return Observer; });\n/* harmony import */ var _dep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dep */ \"./src/dep.js\");\n\n//创建观察对象\nclass Observer{\n    constructor(data){\n        //提供一个方法解析，完成属性的分析，和劫持\n        this.observe(data)\n    }\n\n    //解析数据，完成对数据属性的“劫持”（控制对象属性的getter和setter方法）\n    observe(data){\n        //判断数据的有效性（必须是对象）\n        if(!data||typeof data!=='object')\n            return;\n        //针对当前对象的属性重新定义（劫持）\n        //获取对象键名\n        var keys=Object.keys(data);\n        keys.forEach((key)=>{\n            this.defineReactive(data,key,data[key])\n        })\n    }\n\n    //重新定义\n    defineReactive(obj,key,val){\n        var dep=new _dep__WEBPACK_IMPORTED_MODULE_0__[\"Dep\"]();\n        //目标对象，属性名，属性配置\n        Object.defineProperty(obj,key,{\n            //是否可遍历\n            enumerable:true,\n            //是否可以重新配置\n            configurable:false,\n            // 特权方法：getter\n            get(){\n                //针对watch创建时，直接完成发布订阅的添加\n                _dep__WEBPACK_IMPORTED_MODULE_0__[\"Dep\"].target&&dep.addSub(_dep__WEBPACK_IMPORTED_MODULE_0__[\"Dep\"].target)\n                return val;\n            },\n            //特权方法：setter\n            set(newValue){\n                val=newValue;\n                dep.notify();\n                //把新值覆盖到旧值\n            }\n        })\n    }\n}\n\n\n//# sourceURL=webpack:///./src/observer.js?");

/***/ }),

/***/ "./src/utils/index.js":
/*!****************************!*\
  !*** ./src/utils/index.js ***!
  \****************************/
/*! exports provided: query, isElementNode, isTextNode, toArray, isDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"query\", function() { return query; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isElementNode\", function() { return isElementNode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isTextNode\", function() { return isTextNode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toArray\", function() { return toArray; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isDirective\", function() { return isDirective; });\n//获取元素信息\nfunction query(el){\n    return typeof el =='string'?document.querySelector(el):el\n}\n\n//检验是不是元素类型\nfunction isElementNode(node){\n    return node.nodeType==1\n}\n\n//检查是不是文本节点\nfunction isTextNode(node){\n    return node.nodeType==3\n}\n\n//将类数组对象转为数组返回\nfunction toArray(bumArray){\n    return [].slice.call(bumArray)\n}  \n\n\n//判断是否是不是属性指令\nfunction isDirective(attrName){\n    return attrName.startsWith('v-')\n}\n\n\n\n\n//# sourceURL=webpack:///./src/utils/index.js?");

/***/ }),

/***/ "./src/watcher.js":
/*!************************!*\
  !*** ./src/watcher.js ***!
  \************************/
/*! exports provided: Watcher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Watcher\", function() { return Watcher; });\n/* harmony import */ var _dep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dep */ \"./src/dep.js\");\n\n//声明一个订阅者\n//需要订阅功能的节点；全局vm对象；发布时需要做的事\nclass Watcher{\n    constructor(vm,expr,callback){\n        //缓存重要属性\n        this.vm=vm;\n        this.expr=expr;\n        this.callback=callback;\n\n        //缓存当前值\n        this.value=this.get();\n    }\n    //获取当前值\n    get(){\n        //当前订阅者添加到全局\n        _dep__WEBPACK_IMPORTED_MODULE_0__[\"Dep\"].target=this;//watcher实例\n        var value=this.vm.$data[this.expr]\n        //清空全局\n        _dep__WEBPACK_IMPORTED_MODULE_0__[\"Dep\"].target=null;\n        //返回\n        return value;\n    }\n\n    //提供一个更新方法（应对发布后，要做的事情）\n    update(){\n        //  获取新值，老值，判断后执行回调\n        var newValue=this.vm.$data[this.expr]\n        var oldValue=this.value;\n        if(newValue!==oldValue){\n            this.callback(newValue);\n        }\n    }\n}\n\n\n//# sourceURL=webpack:///./src/watcher.js?");

/***/ })

/******/ });