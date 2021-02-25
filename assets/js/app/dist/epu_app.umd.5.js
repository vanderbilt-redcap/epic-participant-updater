((typeof self !== 'undefined' ? self : this)["webpackJsonpepu_app"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpepu_app"] || []).push([[5],{

/***/ "e19e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"342ffc18-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Logs.vue?vue&type=template&id=00c6c1cb&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('Logs')}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/Logs.vue?vue&type=template&id=00c6c1cb&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"342ffc18-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Logs.vue?vue&type=template&id=50a3cbec&
var Logsvue_type_template_id_50a3cbec_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('b-pagination',{staticClass:"my-2",attrs:{"total-rows":_vm.total,"per-page":_vm.per_page,"size":"sm"},model:{value:(_vm.current_page),callback:function ($$v) {_vm.current_page=$$v},expression:"current_page"}}),_c('b-table',{attrs:{"striped":"","hover":"","bordered":"","items":_vm.logs,"small":"","busy":_vm.loading},scopedSlots:_vm._u([{key:"cell(description)",fn:function(data){return [(data.value.length>100)?_c('div',[_c('b-button',{staticClass:"mr-1",attrs:{"size":"sm"},on:{"click":function($event){return _vm.info(data.value, data.item.log_id, $event.target)}}},[_vm._v("Show details")])],1):_c('div',[_vm._v(" "+_vm._s(data.value)+" ")])]}}])}),_c('b-pagination',{staticClass:"my-2",attrs:{"total-rows":_vm.total,"per-page":_vm.per_page,"size":"sm"},model:{value:(_vm.current_page),callback:function ($$v) {_vm.current_page=$$v},expression:"current_page"}}),_c('b-modal',{attrs:{"id":_vm.infoModal.id,"title":_vm.infoModal.title,"ok-only":"","size":"xl"},on:{"hide":_vm.resetInfoModal}},[_c('pre',[_vm._v(_vm._s(_vm.infoModal.content))])])],1)}
var Logsvue_type_template_id_50a3cbec_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Logs.vue?vue&type=template&id=50a3cbec&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js + 1 modules
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./src/API/index.js + 1 modules
var API = __webpack_require__("36b2");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Logs.vue?vue&type=script&lang=js&


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
//
//
//

/* harmony default export */ var Logsvue_type_script_lang_js_ = ({
  data: function data() {
    return {
      loading: false,
      current_page: 1,
      per_page: 25,
      logs: [],
      total: 0,
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      }
    };
  },
  computed: {},
  watch: {
    current_page: {
      immediate: true,
      handler: function handler() {
        this.loadLogs();
      }
    }
  },
  methods: {
    loadLogs: function loadLogs() {
      var _this = this;

      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var start, limit, params, response, _response$data, data, metadata;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _this.loading = true;
                start = _this.per_page * (_this.current_page - 1);
                limit = _this.per_page;
                params = {
                  route: 'logs',
                  _start: start,
                  _limit: limit
                };
                _context.next = 7;
                return API["a" /* api_client */].get('', {
                  params: params
                });

              case 7:
                response = _context.sent;
                _response$data = response.data, data = _response$data.data, metadata = _response$data.metadata;
                _this.total = metadata.total || 0;
                _this.logs = data;
                _context.next = 16;
                break;

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0);

              case 16:
                _context.prev = 16;
                _this.loading = false;
                return _context.finish(16);

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 13, 16, 19]]);
      }))();
    },
    info: function info(content, index, button) {
      this.infoModal.title = "Description: ".concat(index);
      this.infoModal.content = content;
      this.$root.$emit('bv::show::modal', this.infoModal.id, button);
    },
    resetInfoModal: function resetInfoModal() {
      this.infoModal.title = '';
      this.infoModal.content = '';
    }
  }
});
// CONCATENATED MODULE: ./src/components/Logs.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Logsvue_type_script_lang_js_ = (Logsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/Logs.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_Logsvue_type_script_lang_js_,
  Logsvue_type_template_id_50a3cbec_render,
  Logsvue_type_template_id_50a3cbec_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Logs = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Logs.vue?vue&type=script&lang=js&
//
//
//
//

/* harmony default export */ var pages_Logsvue_type_script_lang_js_ = ({
  components: {
    Logs: Logs
  }
});
// CONCATENATED MODULE: ./src/pages/Logs.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_pages_Logsvue_type_script_lang_js_ = (pages_Logsvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/pages/Logs.vue





/* normalize component */

var Logs_component = Object(componentNormalizer["a" /* default */])(
  src_pages_Logsvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var pages_Logs = __webpack_exports__["default"] = (Logs_component.exports);

/***/ })

}]);
//# sourceMappingURL=epu_app.umd.5.js.map