((typeof self !== 'undefined' ? self : this)["webpackJsonpepu_app"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpepu_app"] || []).push([[2],{

/***/ "2bfb":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "713b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"342ffc18-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/layouts/MainLayout.vue?vue&type=template&id=32bc1ea8&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"layout"},[_c('Menu'),_c('div',{staticClass:"page-wrapper mt-2"},[_c('router-view')],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/layouts/MainLayout.vue?vue&type=template&id=32bc1ea8&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"342ffc18-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Menu.vue?vue&type=template&id=6d649dfb&
var Menuvue_type_template_id_6d649dfb_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('b-navbar',{attrs:{"toggleable":"md","type":"dark","variant":"info"}},[_c('b-navbar-brand',{attrs:{"to":{name: _vm.link_home.name},"active":_vm.isLinkActive(_vm.link_home.name)}},[_c('span',[_vm._v("Epic Participant Updater")]),_c('sup',{staticClass:"small ml-1"},[_c('b-badge',{attrs:{"variant":"light","pill":""}},[_vm._v(_vm._s(_vm.module_version))])],1)]),_c('b-navbar-toggle',{attrs:{"target":"nav-collapse"}}),_c('b-collapse',{attrs:{"id":"nav-collapse","is-nav":""}},[_c('b-navbar-nav',[_vm._l((_vm.links),function(link,index){return [_c('b-nav-item',{key:index,attrs:{"to":{name: link.name},"active":_vm.isLinkActive(link.name)}},[_vm._v(_vm._s(link.label))])]})],2),_c('b-navbar-nav',{staticClass:"ml-auto"},[_c('b-nav-item-dropdown',{attrs:{"right":""},scopedSlots:_vm._u([{key:"button-content",fn:function(){return [_c('em',[_vm._v("Enabled Projects")])]},proxy:true}])},_vm._l((_vm.projects),function(project,index){return _c('b-dropdown-item',{key:index,attrs:{"href":project.url}},[_c('b-badge',{staticClass:"mr-2",attrs:{"size":"sm","variant":"info"}},[_vm._v("PID "+_vm._s(project.id))]),_vm._v(_vm._s(project.title))],1)}),1)],1)],1)],1)],1)}
var Menuvue_type_template_id_6d649dfb_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Menu.vue?vue&type=template&id=6d649dfb&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Menu.vue?vue&type=script&lang=js&



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var Menuvue_type_script_lang_js_ = ({
  data: function data() {
    return {
      links: [{
        name: 'project-templates',
        label: 'Project Templates'
      }, {
        name: 'api-token',
        label: 'API token'
      }, {
        name: 'logs',
        label: 'Logs'
      }],
      link_home: {
        name: 'home',
        label: 'Home'
      }
    };
  },
  computed: {
    module_version: function module_version() {
      return this.$store.state.app_settings.module_version;
    },
    projects: function projects() {
      var redcap_url = this.$store.state.app_settings.redcap_full_url;
      var projects = this.$store.state.projects.list;
      var projects_data = projects.map(function (project) {
        var data = {
          title: project.project.app_title,
          id: project.project_id,
          url: "".concat(redcap_url, "?pid=").concat(project.project_id)
        };
        return data;
      });
      return projects_data;
    }
  },
  methods: {
    isLinkActive: function isLinkActive(name) {
      return this.$route.name === name;
    }
  }
});
// CONCATENATED MODULE: ./src/components/Menu.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Menuvue_type_script_lang_js_ = (Menuvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/Menu.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_Menuvue_type_script_lang_js_,
  Menuvue_type_template_id_6d649dfb_render,
  Menuvue_type_template_id_6d649dfb_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Menu = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/layouts/MainLayout.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var MainLayoutvue_type_script_lang_js_ = ({
  name: 'MainLayout',
  components: {
    Menu: Menu
  }
});
// CONCATENATED MODULE: ./src/layouts/MainLayout.vue?vue&type=script&lang=js&
 /* harmony default export */ var layouts_MainLayoutvue_type_script_lang_js_ = (MainLayoutvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/layouts/MainLayout.vue?vue&type=style&index=0&id=32bc1ea8&scoped=true&lang=css&
var MainLayoutvue_type_style_index_0_id_32bc1ea8_scoped_true_lang_css_ = __webpack_require__("aeaf");

// CONCATENATED MODULE: ./src/layouts/MainLayout.vue






/* normalize component */

var MainLayout_component = Object(componentNormalizer["a" /* default */])(
  layouts_MainLayoutvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "32bc1ea8",
  null
  
)

/* harmony default export */ var MainLayout = __webpack_exports__["default"] = (MainLayout_component.exports);

/***/ }),

/***/ "99af":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var fails = __webpack_require__("d039");
var isArray = __webpack_require__("e8b5");
var isObject = __webpack_require__("861d");
var toObject = __webpack_require__("7b0b");
var toLength = __webpack_require__("50c4");
var createProperty = __webpack_require__("8418");
var arraySpeciesCreate = __webpack_require__("65f0");
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var wellKnownSymbol = __webpack_require__("b622");
var V8_VERSION = __webpack_require__("2d00");

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$({ target: 'Array', proto: true, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat(arg) {
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});


/***/ }),

/***/ "aeaf":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MainLayout_vue_vue_type_style_index_0_id_32bc1ea8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2bfb");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MainLayout_vue_vue_type_style_index_0_id_32bc1ea8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MainLayout_vue_vue_type_style_index_0_id_32bc1ea8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "d81d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $map = __webpack_require__("b727").map;
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');

// `Array.prototype.map` method
// https://tc39.es/ecma262/#sec-array.prototype.map
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ })

}]);
//# sourceMappingURL=epu_app.umd.2.js.map