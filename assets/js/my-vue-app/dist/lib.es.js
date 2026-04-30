var qc = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
};
var _o = (e, t, n) => (qc(e, t, "read from private field"), n ? n.call(e) : t.get(e)), gi = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
};
var Ta = {};
/**
* @vue/shared v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function $t(e, t) {
  const n = new Set(e.split(","));
  return t ? (o) => n.has(o.toLowerCase()) : (o) => n.has(o);
}
const me = Ta.NODE_ENV !== "production" ? Object.freeze({}) : {}, Nn = Ta.NODE_ENV !== "production" ? Object.freeze([]) : [], $e = () => {
}, Aa = () => !1, io = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Bo = (e) => e.startsWith("onUpdate:"), Se = Object.assign, ws = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Wc = Object.prototype.hasOwnProperty, re = (e, t) => Wc.call(e, t), W = Array.isArray, on = (e) => or(e) === "[object Map]", Va = (e) => or(e) === "[object Set]", z = (e) => typeof e == "function", xe = (e) => typeof e == "string", Pn = (e) => typeof e == "symbol", de = (e) => e !== null && typeof e == "object", Os = (e) => (de(e) || z(e)) && z(e.then) && z(e.catch), ka = Object.prototype.toString, or = (e) => ka.call(e), Ss = (e) => or(e).slice(8, -1), Ia = (e) => or(e) === "[object Object]", xs = (e) => xe(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, $o = /* @__PURE__ */ $t(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Kc = /* @__PURE__ */ $t(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
), rr = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, zc = /-(\w)/g, ht = rr((e) => e.replace(zc, (t, n) => n ? n.toUpperCase() : "")), Gc = /\B([A-Z])/g, Bt = rr(
  (e) => e.replace(Gc, "-$1").toLowerCase()
), fn = rr((e) => e.charAt(0).toUpperCase() + e.slice(1)), Zt = rr((e) => e ? `on${fn(e)}` : ""), qt = (e, t) => !Object.is(e, t), _n = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, qo = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, Hr = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let _i;
const $s = () => _i || (_i = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Rs(e) {
  if (W(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n], r = xe(o) ? Qc(o) : Rs(o);
      if (r)
        for (const s in r)
          t[s] = r[s];
    }
    return t;
  } else if (xe(e) || de(e))
    return e;
}
const Jc = /;(?![^(]*\))/g, Yc = /:([^]+)/, Xc = /\/\*[^]*?\*\//g;
function Qc(e) {
  const t = {};
  return e.replace(Xc, "").split(Jc).forEach((n) => {
    if (n) {
      const o = n.split(Yc);
      o.length > 1 && (t[o[0].trim()] = o[1].trim());
    }
  }), t;
}
function Ze(e) {
  let t = "";
  if (xe(e))
    t = e;
  else if (W(e))
    for (let n = 0; n < e.length; n++) {
      const o = Ze(e[n]);
      o && (t += o + " ");
    }
  else if (de(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Zc = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot", eu = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", tu = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics", nu = /* @__PURE__ */ $t(Zc), ou = /* @__PURE__ */ $t(eu), ru = /* @__PURE__ */ $t(tu), su = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", iu = /* @__PURE__ */ $t(su);
function ja(e) {
  return !!e || e === "";
}
const Z = (e) => xe(e) ? e : e == null ? "" : W(e) || de(e) && (e.toString === ka || !z(e.toString)) ? JSON.stringify(e, La, 2) : String(e), La = (e, t) => t && t.__v_isRef ? La(e, t.value) : on(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [o, r], s) => (n[Sr(o, s) + " =>"] = r, n),
    {}
  )
} : Va(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Sr(n))
} : Pn(t) ? Sr(t) : de(t) && !W(t) && !Ia(t) ? String(t) : t, Sr = (e, t = "") => {
  var n;
  return Pn(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
};
var Pe = {};
function Wo(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let qe;
class Ma {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = qe, !t && qe && (this.index = (qe.scopes || (qe.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = qe;
      try {
        return qe = this, t();
      } finally {
        qe = n;
      }
    } else
      Pe.NODE_ENV !== "production" && Wo("cannot run an inactive effect scope.");
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    qe = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    qe = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, o;
      for (n = 0, o = this.effects.length; n < o; n++)
        this.effects[n].stop();
      for (n = 0, o = this.cleanups.length; n < o; n++)
        this.cleanups[n]();
      if (this.scopes)
        for (n = 0, o = this.scopes.length; n < o; n++)
          this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function Fa(e) {
  return new Ma(e);
}
function au(e, t = qe) {
  t && t.active && t.effects.push(e);
}
function Ua() {
  return qe;
}
function lu(e) {
  qe ? qe.cleanups.push(e) : Pe.NODE_ENV !== "production" && Wo(
    "onScopeDispose() is called when there is no active effect scope to be associated with."
  );
}
let rn;
class Ps {
  constructor(t, n, o, r) {
    this.fn = t, this.trigger = n, this.scheduler = o, this.active = !0, this.deps = [], this._dirtyLevel = 2, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, au(this, r);
  }
  get dirty() {
    if (this._dirtyLevel === 1) {
      Gt();
      for (let t = 0; t < this._depsLength; t++) {
        const n = this.deps[t];
        if (n.computed && (cu(n.computed), this._dirtyLevel >= 2))
          break;
      }
      this._dirtyLevel < 2 && (this._dirtyLevel = 0), Jt();
    }
    return this._dirtyLevel >= 2;
  }
  set dirty(t) {
    this._dirtyLevel = t ? 2 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let t = Ht, n = rn;
    try {
      return Ht = !0, rn = this, this._runnings++, yi(this), this.fn();
    } finally {
      Ei(this), this._runnings--, rn = n, Ht = t;
    }
  }
  stop() {
    var t;
    this.active && (yi(this), Ei(this), (t = this.onStop) == null || t.call(this), this.active = !1);
  }
}
function cu(e) {
  return e.value;
}
function yi(e) {
  e._trackId++, e._depsLength = 0;
}
function Ei(e) {
  if (e.deps && e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++)
      Ha(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function Ha(e, t) {
  const n = e.get(t);
  n !== void 0 && t._trackId !== n && (e.delete(t), e.size === 0 && e.cleanup());
}
let Ht = !0, Br = 0;
const Ba = [];
function Gt() {
  Ba.push(Ht), Ht = !1;
}
function Jt() {
  const e = Ba.pop();
  Ht = e === void 0 ? !0 : e;
}
function Cs() {
  Br++;
}
function Ds() {
  for (Br--; !Br && qr.length; )
    qr.shift()();
}
function qa(e, t, n) {
  var o;
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const r = e.deps[e._depsLength];
    r !== t ? (r && Ha(r, e), e.deps[e._depsLength++] = t) : e._depsLength++, Pe.NODE_ENV !== "production" && ((o = e.onTrack) == null || o.call(e, Se({ effect: e }, n)));
  }
}
const qr = [];
function Wa(e, t, n) {
  var o;
  Cs();
  for (const r of e.keys())
    if (r._dirtyLevel < t && e.get(r) === r._trackId) {
      const s = r._dirtyLevel;
      r._dirtyLevel = t, s === 0 && (r._shouldSchedule = !0, Pe.NODE_ENV !== "production" && ((o = r.onTrigger) == null || o.call(r, Se({ effect: r }, n))), r.trigger());
    }
  Ka(e), Ds();
}
function Ka(e) {
  for (const t of e.keys())
    t.scheduler && t._shouldSchedule && (!t._runnings || t.allowRecurse) && e.get(t) === t._trackId && (t._shouldSchedule = !1, qr.push(t.scheduler));
}
const za = (e, t) => {
  const n = /* @__PURE__ */ new Map();
  return n.cleanup = e, n.computed = t, n;
}, Ko = /* @__PURE__ */ new WeakMap(), sn = Symbol(Pe.NODE_ENV !== "production" ? "iterate" : ""), Wr = Symbol(Pe.NODE_ENV !== "production" ? "Map key iterate" : "");
function Ie(e, t, n) {
  if (Ht && rn) {
    let o = Ko.get(e);
    o || Ko.set(e, o = /* @__PURE__ */ new Map());
    let r = o.get(n);
    r || o.set(n, r = za(() => o.delete(n))), qa(
      rn,
      r,
      Pe.NODE_ENV !== "production" ? {
        target: e,
        type: t,
        key: n
      } : void 0
    );
  }
}
function ft(e, t, n, o, r, s) {
  const i = Ko.get(e);
  if (!i)
    return;
  let a = [];
  if (t === "clear")
    a = [...i.values()];
  else if (n === "length" && W(e)) {
    const l = Number(o);
    i.forEach((c, f) => {
      (f === "length" || !Pn(f) && f >= l) && a.push(c);
    });
  } else
    switch (n !== void 0 && a.push(i.get(n)), t) {
      case "add":
        W(e) ? xs(n) && a.push(i.get("length")) : (a.push(i.get(sn)), on(e) && a.push(i.get(Wr)));
        break;
      case "delete":
        W(e) || (a.push(i.get(sn)), on(e) && a.push(i.get(Wr)));
        break;
      case "set":
        on(e) && a.push(i.get(sn));
        break;
    }
  Cs();
  for (const l of a)
    l && Wa(
      l,
      2,
      Pe.NODE_ENV !== "production" ? {
        target: e,
        type: t,
        key: n,
        newValue: o,
        oldValue: r,
        oldTarget: s
      } : void 0
    );
  Ds();
}
function uu(e, t) {
  var n;
  return (n = Ko.get(e)) == null ? void 0 : n.get(t);
}
const fu = /* @__PURE__ */ $t("__proto__,__v_isRef,__isVue"), Ga = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Pn)
), bi = /* @__PURE__ */ du();
function du() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const o = G(this);
      for (let s = 0, i = this.length; s < i; s++)
        Ie(o, "get", s + "");
      const r = o[t](...n);
      return r === -1 || r === !1 ? o[t](...n.map(G)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      Gt(), Cs();
      const o = G(this)[t].apply(this, n);
      return Ds(), Jt(), o;
    };
  }), e;
}
function pu(e) {
  const t = G(this);
  return Ie(t, "has", e), t.hasOwnProperty(e);
}
class Ja {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._shallow = n;
  }
  get(t, n, o) {
    const r = this._isReadonly, s = this._shallow;
    if (n === "__v_isReactive")
      return !r;
    if (n === "__v_isReadonly")
      return r;
    if (n === "__v_isShallow")
      return s;
    if (n === "__v_raw")
      return o === (r ? s ? nl : tl : s ? el : Za).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(o) ? t : void 0;
    const i = W(t);
    if (!r) {
      if (i && re(bi, n))
        return Reflect.get(bi, n, o);
      if (n === "hasOwnProperty")
        return pu;
    }
    const a = Reflect.get(t, n, o);
    return (Pn(n) ? Ga.has(n) : fu(n)) || (r || Ie(t, "get", n), s) ? a : Ee(a) ? i && xs(n) ? a : a.value : de(a) ? r ? rl(a) : ao(a) : a;
  }
}
class Ya extends Ja {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, o, r) {
    let s = t[n];
    if (!this._shallow) {
      const l = Wt(s);
      if (!zo(o) && !Wt(o) && (s = G(s), o = G(o)), !W(t) && Ee(s) && !Ee(o))
        return l ? !1 : (s.value = o, !0);
    }
    const i = W(t) && xs(n) ? Number(n) < t.length : re(t, n), a = Reflect.set(t, n, o, r);
    return t === G(r) && (i ? qt(o, s) && ft(t, "set", n, o, s) : ft(t, "add", n, o)), a;
  }
  deleteProperty(t, n) {
    const o = re(t, n), r = t[n], s = Reflect.deleteProperty(t, n);
    return s && o && ft(t, "delete", n, void 0, r), s;
  }
  has(t, n) {
    const o = Reflect.has(t, n);
    return (!Pn(n) || !Ga.has(n)) && Ie(t, "has", n), o;
  }
  ownKeys(t) {
    return Ie(
      t,
      "iterate",
      W(t) ? "length" : sn
    ), Reflect.ownKeys(t);
  }
}
class Xa extends Ja {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return Pe.NODE_ENV !== "production" && Wo(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return Pe.NODE_ENV !== "production" && Wo(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const hu = /* @__PURE__ */ new Ya(), mu = /* @__PURE__ */ new Xa(), gu = /* @__PURE__ */ new Ya(
  !0
), _u = /* @__PURE__ */ new Xa(!0), Ts = (e) => e, sr = (e) => Reflect.getPrototypeOf(e);
function yo(e, t, n = !1, o = !1) {
  e = e.__v_raw;
  const r = G(e), s = G(t);
  n || (qt(t, s) && Ie(r, "get", t), Ie(r, "get", s));
  const { has: i } = sr(r), a = o ? Ts : n ? As : Yn;
  if (i.call(r, t))
    return a(e.get(t));
  if (i.call(r, s))
    return a(e.get(s));
  e !== r && e.get(t);
}
function Eo(e, t = !1) {
  const n = this.__v_raw, o = G(n), r = G(e);
  return t || (qt(e, r) && Ie(o, "has", e), Ie(o, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r);
}
function bo(e, t = !1) {
  return e = e.__v_raw, !t && Ie(G(e), "iterate", sn), Reflect.get(e, "size", e);
}
function vi(e) {
  e = G(e);
  const t = G(this);
  return sr(t).has.call(t, e) || (t.add(e), ft(t, "add", e, e)), this;
}
function Ni(e, t) {
  t = G(t);
  const n = G(this), { has: o, get: r } = sr(n);
  let s = o.call(n, e);
  s ? Pe.NODE_ENV !== "production" && Qa(n, o, e) : (e = G(e), s = o.call(n, e));
  const i = r.call(n, e);
  return n.set(e, t), s ? qt(t, i) && ft(n, "set", e, t, i) : ft(n, "add", e, t), this;
}
function wi(e) {
  const t = G(this), { has: n, get: o } = sr(t);
  let r = n.call(t, e);
  r ? Pe.NODE_ENV !== "production" && Qa(t, n, e) : (e = G(e), r = n.call(t, e));
  const s = o ? o.call(t, e) : void 0, i = t.delete(e);
  return r && ft(t, "delete", e, void 0, s), i;
}
function Oi() {
  const e = G(this), t = e.size !== 0, n = Pe.NODE_ENV !== "production" ? on(e) ? new Map(e) : new Set(e) : void 0, o = e.clear();
  return t && ft(e, "clear", void 0, void 0, n), o;
}
function vo(e, t) {
  return function(o, r) {
    const s = this, i = s.__v_raw, a = G(i), l = t ? Ts : e ? As : Yn;
    return !e && Ie(a, "iterate", sn), i.forEach((c, f) => o.call(r, l(c), l(f), s));
  };
}
function No(e, t, n) {
  return function(...o) {
    const r = this.__v_raw, s = G(r), i = on(s), a = e === "entries" || e === Symbol.iterator && i, l = e === "keys" && i, c = r[e](...o), f = n ? Ts : t ? As : Yn;
    return !t && Ie(
      s,
      "iterate",
      l ? Wr : sn
    ), {
      // iterator protocol
      next() {
        const { value: u, done: p } = c.next();
        return p ? { value: u, done: p } : {
          value: a ? [f(u[0]), f(u[1])] : f(u),
          done: p
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Tt(e) {
  return function(...t) {
    if (Pe.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(
        `${fn(e)} operation ${n}failed: target is readonly.`,
        G(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function yu() {
  const e = {
    get(s) {
      return yo(this, s);
    },
    get size() {
      return bo(this);
    },
    has: Eo,
    add: vi,
    set: Ni,
    delete: wi,
    clear: Oi,
    forEach: vo(!1, !1)
  }, t = {
    get(s) {
      return yo(this, s, !1, !0);
    },
    get size() {
      return bo(this);
    },
    has: Eo,
    add: vi,
    set: Ni,
    delete: wi,
    clear: Oi,
    forEach: vo(!1, !0)
  }, n = {
    get(s) {
      return yo(this, s, !0);
    },
    get size() {
      return bo(this, !0);
    },
    has(s) {
      return Eo.call(this, s, !0);
    },
    add: Tt("add"),
    set: Tt("set"),
    delete: Tt("delete"),
    clear: Tt("clear"),
    forEach: vo(!0, !1)
  }, o = {
    get(s) {
      return yo(this, s, !0, !0);
    },
    get size() {
      return bo(this, !0);
    },
    has(s) {
      return Eo.call(this, s, !0);
    },
    add: Tt("add"),
    set: Tt("set"),
    delete: Tt("delete"),
    clear: Tt("clear"),
    forEach: vo(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
    e[s] = No(
      s,
      !1,
      !1
    ), n[s] = No(
      s,
      !0,
      !1
    ), t[s] = No(
      s,
      !1,
      !0
    ), o[s] = No(
      s,
      !0,
      !0
    );
  }), [
    e,
    n,
    t,
    o
  ];
}
const [
  Eu,
  bu,
  vu,
  Nu
] = /* @__PURE__ */ yu();
function ir(e, t) {
  const n = t ? e ? Nu : vu : e ? bu : Eu;
  return (o, r, s) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? o : Reflect.get(
    re(n, r) && r in o ? n : o,
    r,
    s
  );
}
const wu = {
  get: /* @__PURE__ */ ir(!1, !1)
}, Ou = {
  get: /* @__PURE__ */ ir(!1, !0)
}, Su = {
  get: /* @__PURE__ */ ir(!0, !1)
}, xu = {
  get: /* @__PURE__ */ ir(!0, !0)
};
function Qa(e, t, n) {
  const o = G(n);
  if (o !== n && t.call(e, o)) {
    const r = Ss(e);
    console.warn(
      `Reactive ${r} contains both the raw and reactive versions of the same object${r === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Za = /* @__PURE__ */ new WeakMap(), el = /* @__PURE__ */ new WeakMap(), tl = /* @__PURE__ */ new WeakMap(), nl = /* @__PURE__ */ new WeakMap();
function $u(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Ru(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : $u(Ss(e));
}
function ao(e) {
  return Wt(e) ? e : ar(
    e,
    !1,
    hu,
    wu,
    Za
  );
}
function ol(e) {
  return ar(
    e,
    !1,
    gu,
    Ou,
    el
  );
}
function rl(e) {
  return ar(
    e,
    !0,
    mu,
    Su,
    tl
  );
}
function bn(e) {
  return ar(
    e,
    !0,
    _u,
    xu,
    nl
  );
}
function ar(e, t, n, o, r) {
  if (!de(e))
    return Pe.NODE_ENV !== "production" && console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const s = r.get(e);
  if (s)
    return s;
  const i = Ru(e);
  if (i === 0)
    return e;
  const a = new Proxy(
    e,
    i === 2 ? o : n
  );
  return r.set(e, a), a;
}
function tt(e) {
  return Wt(e) ? tt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Wt(e) {
  return !!(e && e.__v_isReadonly);
}
function zo(e) {
  return !!(e && e.__v_isShallow);
}
function Go(e) {
  return tt(e) || Wt(e);
}
function G(e) {
  const t = e && e.__v_raw;
  return t ? G(t) : e;
}
function Ot(e) {
  return qo(e, "__v_skip", !0), e;
}
const Yn = (e) => de(e) ? ao(e) : e, As = (e) => de(e) ? rl(e) : e;
class sl {
  constructor(t, n, o, r) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new Ps(
      () => t(this._value),
      () => Ro(this, 1),
      () => this.dep && Ka(this.dep)
    ), this.effect.computed = this, this.effect.active = this._cacheable = !r, this.__v_isReadonly = o;
  }
  get value() {
    const t = G(this);
    return (!t._cacheable || t.effect.dirty) && qt(t._value, t._value = t.effect.run()) && Ro(t, 2), il(t), t.effect._dirtyLevel >= 1 && Ro(t, 1), t._value;
  }
  set value(t) {
    this._setter(t);
  }
  // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(t) {
    this.effect.dirty = t;
  }
  // #endregion
}
function Pu(e, t, n = !1) {
  let o, r;
  const s = z(e);
  s ? (o = e, r = Pe.NODE_ENV !== "production" ? () => {
    console.warn("Write operation failed: computed value is readonly");
  } : $e) : (o = e.get, r = e.set);
  const i = new sl(o, r, s || !r, n);
  return Pe.NODE_ENV !== "production" && t && !n && (i.effect.onTrack = t.onTrack, i.effect.onTrigger = t.onTrigger), i;
}
function il(e) {
  Ht && rn && (e = G(e), qa(
    rn,
    e.dep || (e.dep = za(
      () => e.dep = void 0,
      e instanceof sl ? e : void 0
    )),
    Pe.NODE_ENV !== "production" ? {
      target: e,
      type: "get",
      key: "value"
    } : void 0
  ));
}
function Ro(e, t = 2, n) {
  e = G(e);
  const o = e.dep;
  o && Wa(
    o,
    t,
    Pe.NODE_ENV !== "production" ? {
      target: e,
      type: "set",
      key: "value",
      newValue: n
    } : void 0
  );
}
function Ee(e) {
  return !!(e && e.__v_isRef === !0);
}
function ye(e) {
  return al(e, !1);
}
function Cu(e) {
  return al(e, !0);
}
function al(e, t) {
  return Ee(e) ? e : new Du(e, t);
}
class Du {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : G(t), this._value = n ? t : Yn(t);
  }
  get value() {
    return il(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || zo(t) || Wt(t);
    t = n ? t : G(t), qt(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : Yn(t), Ro(this, 2, t));
  }
}
function se(e) {
  return Ee(e) ? e.value : e;
}
const Tu = {
  get: (e, t, n) => se(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const r = e[t];
    return Ee(r) && !Ee(n) ? (r.value = n, !0) : Reflect.set(e, t, n, o);
  }
};
function ll(e) {
  return tt(e) ? e : new Proxy(e, Tu);
}
function Kr(e) {
  Pe.NODE_ENV !== "production" && !Go(e) && console.warn("toRefs() expects a reactive object but received a plain one.");
  const t = W(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = cl(e, n);
  return t;
}
class Au {
  constructor(t, n, o) {
    this._object = t, this._key = n, this._defaultValue = o, this.__v_isRef = !0;
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return uu(G(this._object), this._key);
  }
}
class Vu {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0;
  }
  get value() {
    return this._getter();
  }
}
function Po(e, t, n) {
  return Ee(e) ? e : z(e) ? new Vu(e) : de(e) && arguments.length > 1 ? cl(e, t, n) : ye(e);
}
function cl(e, t, n) {
  const o = e[t];
  return Ee(o) ? o : new Au(e, t, n);
}
var _ = {};
const an = [];
function Co(e) {
  an.push(e);
}
function Do() {
  an.pop();
}
function T(e, ...t) {
  Gt();
  const n = an.length ? an[an.length - 1].component : null, o = n && n.appContext.config.warnHandler, r = ku();
  if (o)
    St(
      o,
      n,
      11,
      [
        e + t.join(""),
        n && n.proxy,
        r.map(
          ({ vnode: s }) => `at <${_r(n, s.type)}>`
        ).join(`
`),
        r
      ]
    );
  else {
    const s = [`[Vue warn]: ${e}`, ...t];
    r.length && s.push(`
`, ...Iu(r)), console.warn(...s);
  }
  Jt();
}
function ku() {
  let e = an[an.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const o = e.component && e.component.parent;
    e = o && o.vnode;
  }
  return t;
}
function Iu(e) {
  const t = [];
  return e.forEach((n, o) => {
    t.push(...o === 0 ? [] : [`
`], ...ju(n));
  }), t;
}
function ju({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", o = e.component ? e.component.parent == null : !1, r = ` at <${_r(
    e.component,
    e.type,
    o
  )}`, s = ">" + n;
  return e.props ? [r, ...Lu(e.props), s] : [r + s];
}
function Lu(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((o) => {
    t.push(...ul(o, e[o]));
  }), n.length > 3 && t.push(" ..."), t;
}
function ul(e, t, n) {
  return xe(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : Ee(t) ? (t = ul(e, G(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : z(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = G(t), n ? t : [`${e}=`, t]);
}
const Vs = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  0: "setup function",
  1: "render function",
  2: "watcher getter",
  3: "watcher callback",
  4: "watcher cleanup function",
  5: "native event handler",
  6: "component event handler",
  7: "vnode hook",
  8: "directive hook",
  9: "transition hook",
  10: "app errorHandler",
  11: "app warnHandler",
  12: "ref function",
  13: "async component loader",
  14: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://github.com/vuejs/core ."
};
function St(e, t, n, o) {
  let r;
  try {
    r = o ? e(...o) : e();
  } catch (s) {
    lo(s, t, n);
  }
  return r;
}
function nt(e, t, n, o) {
  if (z(e)) {
    const s = St(e, t, n, o);
    return s && Os(s) && s.catch((i) => {
      lo(i, t, n);
    }), s;
  }
  const r = [];
  for (let s = 0; s < e.length; s++)
    r.push(nt(e[s], t, n, o));
  return r;
}
function lo(e, t, n, o = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let s = t.parent;
    const i = t.proxy, a = _.NODE_ENV !== "production" ? Vs[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; s; ) {
      const c = s.ec;
      if (c) {
        for (let f = 0; f < c.length; f++)
          if (c[f](e, i, a) === !1)
            return;
      }
      s = s.parent;
    }
    const l = t.appContext.config.errorHandler;
    if (l) {
      St(
        l,
        null,
        10,
        [e, i, a]
      );
      return;
    }
  }
  Mu(e, n, r, o);
}
function Mu(e, t, n, o = !0) {
  if (_.NODE_ENV !== "production") {
    const r = Vs[t];
    if (n && Co(n), T(`Unhandled error${r ? ` during execution of ${r}` : ""}`), n && Do(), o)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let Xn = !1, zr = !1;
const Le = [];
let lt = 0;
const wn = [];
let bt = null, kt = 0;
const fl = /* @__PURE__ */ Promise.resolve();
let ks = null;
const Fu = 100;
function Jo(e) {
  const t = ks || fl;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Uu(e) {
  let t = lt + 1, n = Le.length;
  for (; t < n; ) {
    const o = t + n >>> 1, r = Le[o], s = Qn(r);
    s < e || s === e && r.pre ? t = o + 1 : n = o;
  }
  return t;
}
function lr(e) {
  (!Le.length || !Le.includes(
    e,
    Xn && e.allowRecurse ? lt + 1 : lt
  )) && (e.id == null ? Le.push(e) : Le.splice(Uu(e.id), 0, e), dl());
}
function dl() {
  !Xn && !zr && (zr = !0, ks = fl.then(ml));
}
function Hu(e) {
  const t = Le.indexOf(e);
  t > lt && Le.splice(t, 1);
}
function pl(e) {
  W(e) ? wn.push(...e) : (!bt || !bt.includes(
    e,
    e.allowRecurse ? kt + 1 : kt
  )) && wn.push(e), dl();
}
function Si(e, t, n = Xn ? lt + 1 : 0) {
  for (_.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()); n < Le.length; n++) {
    const o = Le[n];
    if (o && o.pre) {
      if (e && o.id !== e.uid || _.NODE_ENV !== "production" && Is(t, o))
        continue;
      Le.splice(n, 1), n--, o();
    }
  }
}
function hl(e) {
  if (wn.length) {
    const t = [...new Set(wn)].sort(
      (n, o) => Qn(n) - Qn(o)
    );
    if (wn.length = 0, bt) {
      bt.push(...t);
      return;
    }
    for (bt = t, _.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), kt = 0; kt < bt.length; kt++)
      _.NODE_ENV !== "production" && Is(e, bt[kt]) || bt[kt]();
    bt = null, kt = 0;
  }
}
const Qn = (e) => e.id == null ? 1 / 0 : e.id, Bu = (e, t) => {
  const n = Qn(e) - Qn(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function ml(e) {
  zr = !1, Xn = !0, _.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), Le.sort(Bu);
  const t = _.NODE_ENV !== "production" ? (n) => Is(e, n) : $e;
  try {
    for (lt = 0; lt < Le.length; lt++) {
      const n = Le[lt];
      if (n && n.active !== !1) {
        if (_.NODE_ENV !== "production" && t(n))
          continue;
        St(n, null, 14);
      }
    }
  } finally {
    lt = 0, Le.length = 0, hl(e), Xn = !1, ks = null, (Le.length || wn.length) && ml(e);
  }
}
function Is(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > Fu) {
      const o = t.ownerInstance, r = o && Ys(o.type);
      return lo(
        `Maximum recursive updates exceeded${r ? ` in component <${r}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
        null,
        10
      ), !0;
    } else
      e.set(t, n + 1);
  }
}
let ln = !1;
const yn = /* @__PURE__ */ new Set();
_.NODE_ENV !== "production" && ($s().__VUE_HMR_RUNTIME__ = {
  createRecord: xr(gl),
  rerender: xr(Ku),
  reload: xr(zu)
});
const dn = /* @__PURE__ */ new Map();
function qu(e) {
  const t = e.type.__hmrId;
  let n = dn.get(t);
  n || (gl(t, e.type), n = dn.get(t)), n.instances.add(e);
}
function Wu(e) {
  dn.get(e.type.__hmrId).instances.delete(e);
}
function gl(e, t) {
  return dn.has(e) ? !1 : (dn.set(e, {
    initialDef: qn(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function qn(e) {
  return Wl(e) ? e.__vccOpts : e;
}
function Ku(e, t) {
  const n = dn.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((o) => {
    t && (o.render = t, qn(o.type).render = t), o.renderCache = [], ln = !0, o.effect.dirty = !0, o.update(), ln = !1;
  }));
}
function zu(e, t) {
  const n = dn.get(e);
  if (!n)
    return;
  t = qn(t), xi(n.initialDef, t);
  const o = [...n.instances];
  for (const r of o) {
    const s = qn(r.type);
    yn.has(s) || (s !== n.initialDef && xi(s, t), yn.add(s)), r.appContext.propsCache.delete(r.type), r.appContext.emitsCache.delete(r.type), r.appContext.optionsCache.delete(r.type), r.ceReload ? (yn.add(s), r.ceReload(t.styles), yn.delete(s)) : r.parent ? (r.parent.effect.dirty = !0, lr(r.parent.update)) : r.appContext.reload ? r.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    );
  }
  pl(() => {
    for (const r of o)
      yn.delete(
        qn(r.type)
      );
  });
}
function xi(e, t) {
  Se(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function xr(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (o) {
      console.error(o), console.warn(
        "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
      );
    }
  };
}
let ct, Un = [], Gr = !1;
function co(e, ...t) {
  ct ? ct.emit(e, ...t) : Gr || Un.push({ event: e, args: t });
}
function _l(e, t) {
  var n, o;
  ct = e, ct ? (ct.enabled = !0, Un.forEach(({ event: r, args: s }) => ct.emit(r, ...s)), Un = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  !((o = (n = window.navigator) == null ? void 0 : n.userAgent) != null && o.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((s) => {
    _l(s, t);
  }), setTimeout(() => {
    ct || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, Gr = !0, Un = []);
  }, 3e3)) : (Gr = !0, Un = []);
}
function Gu(e, t) {
  co("app:init", e, t, {
    Fragment: ke,
    Text: uo,
    Comment: Be,
    Static: ko
  });
}
function Ju(e) {
  co("app:unmount", e);
}
const Yu = /* @__PURE__ */ js(
  "component:added"
  /* COMPONENT_ADDED */
), yl = /* @__PURE__ */ js(
  "component:updated"
  /* COMPONENT_UPDATED */
), Xu = /* @__PURE__ */ js(
  "component:removed"
  /* COMPONENT_REMOVED */
), Qu = (e) => {
  ct && typeof ct.cleanupBuffer == "function" && // remove the component if it wasn't buffered
  !ct.cleanupBuffer(e) && Xu(e);
};
function js(e) {
  return (t) => {
    co(
      e,
      t.appContext.app,
      t.uid,
      t.parent ? t.parent.uid : void 0,
      t
    );
  };
}
const Zu = /* @__PURE__ */ El(
  "perf:start"
  /* PERFORMANCE_START */
), ef = /* @__PURE__ */ El(
  "perf:end"
  /* PERFORMANCE_END */
);
function El(e) {
  return (t, n, o) => {
    co(e, t.appContext.app, t.uid, t, n, o);
  };
}
function tf(e, t, n) {
  co(
    "component:emit",
    e.appContext.app,
    e,
    t,
    n
  );
}
function nf(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const o = e.vnode.props || me;
  if (_.NODE_ENV !== "production") {
    const {
      emitsOptions: f,
      propsOptions: [u]
    } = e;
    if (f)
      if (!(t in f))
        (!u || !(Zt(t) in u)) && T(
          `Component emitted event "${t}" but it is neither declared in the emits option nor as an "${Zt(t)}" prop.`
        );
      else {
        const p = f[t];
        z(p) && (p(...n) || T(
          `Invalid event arguments: event validation failed for event "${t}".`
        ));
      }
  }
  let r = n;
  const s = t.startsWith("update:"), i = s && t.slice(7);
  if (i && i in o) {
    const f = `${i === "modelValue" ? "model" : i}Modifiers`, { number: u, trim: p } = o[f] || me;
    p && (r = n.map((g) => xe(g) ? g.trim() : g)), u && (r = n.map(Hr));
  }
  if (_.NODE_ENV !== "production" && tf(e, t, r), _.NODE_ENV !== "production") {
    const f = t.toLowerCase();
    f !== t && o[Zt(f)] && T(
      `Event "${f}" is emitted in component ${_r(
        e,
        e.type
      )} but the handler is registered for "${t}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${Bt(
        t
      )}" instead of "${t}".`
    );
  }
  let a, l = o[a = Zt(t)] || // also try camelCase event handler (#2249)
  o[a = Zt(ht(t))];
  !l && s && (l = o[a = Zt(Bt(t))]), l && nt(
    l,
    e,
    6,
    r
  );
  const c = o[a + "Once"];
  if (c) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[a])
      return;
    e.emitted[a] = !0, nt(
      c,
      e,
      6,
      r
    );
  }
}
function bl(e, t, n = !1) {
  const o = t.emitsCache, r = o.get(e);
  if (r !== void 0)
    return r;
  const s = e.emits;
  let i = {}, a = !1;
  if (!z(e)) {
    const l = (c) => {
      const f = bl(c, t, !0);
      f && (a = !0, Se(i, f));
    };
    !n && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l);
  }
  return !s && !a ? (de(e) && o.set(e, null), null) : (W(s) ? s.forEach((l) => i[l] = null) : Se(i, s), de(e) && o.set(e, i), i);
}
function cr(e, t) {
  return !e || !io(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), re(e, t[0].toLowerCase() + t.slice(1)) || re(e, Bt(t)) || re(e, t));
}
let Oe = null, ur = null;
function Yo(e) {
  const t = Oe;
  return Oe = e, ur = e && e.type.__scopeId || null, t;
}
function Ls(e) {
  ur = e;
}
function Ms() {
  ur = null;
}
function vt(e, t = Oe, n) {
  if (!t || e._n)
    return e;
  const o = (...r) => {
    o._d && Mi(-1);
    const s = Yo(t);
    let i;
    try {
      i = e(...r);
    } finally {
      Yo(s), o._d && Mi(1);
    }
    return _.NODE_ENV !== "production" && yl(t), i;
  };
  return o._n = !0, o._c = !0, o._d = !0, o;
}
let Jr = !1;
function Xo() {
  Jr = !0;
}
function $r(e) {
  const {
    type: t,
    vnode: n,
    proxy: o,
    withProxy: r,
    props: s,
    propsOptions: [i],
    slots: a,
    attrs: l,
    emit: c,
    render: f,
    renderCache: u,
    data: p,
    setupState: g,
    ctx: y,
    inheritAttrs: N
  } = e;
  let $, O;
  const A = Yo(e);
  _.NODE_ENV !== "production" && (Jr = !1);
  try {
    if (n.shapeFlag & 4) {
      const ne = r || o, le = _.NODE_ENV !== "production" && g.__isScriptSetup ? new Proxy(ne, {
        get(C, Te, ge) {
          return T(
            `Property '${String(
              Te
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          ), Reflect.get(C, Te, ge);
        }
      }) : ne;
      $ = Qe(
        f.call(
          le,
          ne,
          u,
          s,
          g,
          p,
          y
        )
      ), O = l;
    } else {
      const ne = t;
      _.NODE_ENV !== "production" && l === s && Xo(), $ = Qe(
        ne.length > 1 ? ne(
          s,
          _.NODE_ENV !== "production" ? {
            get attrs() {
              return Xo(), l;
            },
            slots: a,
            emit: c
          } : { attrs: l, slots: a, emit: c }
        ) : ne(
          s,
          null
          /* we know it doesn't need it */
        )
      ), O = t.props ? l : of(l);
    }
  } catch (ne) {
    Kn.length = 0, lo(ne, e, 1), $ = we(Be);
  }
  let k = $, K;
  if (_.NODE_ENV !== "production" && $.patchFlag > 0 && $.patchFlag & 2048 && ([k, K] = vl($)), O && N !== !1) {
    const ne = Object.keys(O), { shapeFlag: le } = k;
    if (ne.length) {
      if (le & 7)
        i && ne.some(Bo) && (O = rf(
          O,
          i
        )), k = Kt(k, O);
      else if (_.NODE_ENV !== "production" && !Jr && k.type !== Be) {
        const C = Object.keys(l), Te = [], ge = [];
        for (let F = 0, L = C.length; F < L; F++) {
          const oe = C[F];
          io(oe) ? Bo(oe) || Te.push(oe[2].toLowerCase() + oe.slice(3)) : ge.push(oe);
        }
        ge.length && T(
          `Extraneous non-props attributes (${ge.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes.`
        ), Te.length && T(
          `Extraneous non-emits event listeners (${Te.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
        );
      }
    }
  }
  return n.dirs && (_.NODE_ENV !== "production" && !$i(k) && T(
    "Runtime directive used on component with non-element root node. The directives will not function as intended."
  ), k = Kt(k), k.dirs = k.dirs ? k.dirs.concat(n.dirs) : n.dirs), n.transition && (_.NODE_ENV !== "production" && !$i(k) && T(
    "Component inside <Transition> renders non-element root node that cannot be animated."
  ), k.transition = n.transition), _.NODE_ENV !== "production" && K ? K(k) : $ = k, Yo(A), $;
}
const vl = (e) => {
  const t = e.children, n = e.dynamicChildren, o = Fs(t, !1);
  if (o) {
    if (_.NODE_ENV !== "production" && o.patchFlag > 0 && o.patchFlag & 2048)
      return vl(o);
  } else
    return [e, void 0];
  const r = t.indexOf(o), s = n ? n.indexOf(o) : -1, i = (a) => {
    t[r] = a, n && (s > -1 ? n[s] = a : a.patchFlag > 0 && (e.dynamicChildren = [...n, a]));
  };
  return [Qe(o), i];
};
function Fs(e, t = !0) {
  let n;
  for (let o = 0; o < e.length; o++) {
    const r = e[o];
    if (Sn(r)) {
      if (r.type !== Be || r.children === "v-if") {
        if (n)
          return;
        if (n = r, _.NODE_ENV !== "production" && t && n.patchFlag > 0 && n.patchFlag & 2048)
          return Fs(n.children);
      }
    } else
      return;
  }
  return n;
}
const of = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || io(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, rf = (e, t) => {
  const n = {};
  for (const o in e)
    (!Bo(o) || !(o.slice(9) in t)) && (n[o] = e[o]);
  return n;
}, $i = (e) => e.shapeFlag & 7 || e.type === Be;
function sf(e, t, n) {
  const { props: o, children: r, component: s } = e, { props: i, children: a, patchFlag: l } = t, c = s.emitsOptions;
  if (_.NODE_ENV !== "production" && (r || a) && ln || t.dirs || t.transition)
    return !0;
  if (n && l >= 0) {
    if (l & 1024)
      return !0;
    if (l & 16)
      return o ? Ri(o, i, c) : !!i;
    if (l & 8) {
      const f = t.dynamicProps;
      for (let u = 0; u < f.length; u++) {
        const p = f[u];
        if (i[p] !== o[p] && !cr(c, p))
          return !0;
      }
    }
  } else
    return (r || a) && (!a || !a.$stable) ? !0 : o === i ? !1 : o ? i ? Ri(o, i, c) : !0 : !!i;
  return !1;
}
function Ri(e, t, n) {
  const o = Object.keys(t);
  if (o.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < o.length; r++) {
    const s = o[r];
    if (t[s] !== e[s] && !cr(n, s))
      return !0;
  }
  return !1;
}
function af({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.el = e.el), o === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const Yr = "components";
function Us(e, t) {
  return cf(Yr, e, !0, t) || e;
}
const lf = Symbol.for("v-ndc");
function cf(e, t, n = !0, o = !1) {
  const r = Oe || Re;
  if (r) {
    const s = r.type;
    if (e === Yr) {
      const a = Ys(
        s,
        !1
      );
      if (a && (a === t || a === ht(t) || a === fn(ht(t))))
        return s;
    }
    const i = (
      // local registration
      // check instance[type] first which is resolved for options API
      Pi(r[e] || s[e], t) || // global registration
      Pi(r.appContext[e], t)
    );
    if (!i && o)
      return s;
    if (_.NODE_ENV !== "production" && n && !i) {
      const a = e === Yr ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : "";
      T(`Failed to resolve ${e.slice(0, -1)}: ${t}${a}`);
    }
    return i;
  } else
    _.NODE_ENV !== "production" && T(
      `resolve${fn(e.slice(0, -1))} can only be used in render() or setup().`
    );
}
function Pi(e, t) {
  return e && (e[t] || e[ht(t)] || e[fn(ht(t))]);
}
const uf = (e) => e.__isSuspense;
function ff(e, t) {
  t && t.pendingBranch ? W(e) ? t.effects.push(...e) : t.effects.push(e) : pl(e);
}
const df = Symbol.for("v-scx"), pf = () => {
  {
    const e = dt(df);
    return e || _.NODE_ENV !== "production" && T(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
};
function hf(e, t) {
  return Hs(e, null, t);
}
const wo = {};
function ot(e, t, n) {
  return _.NODE_ENV !== "production" && !z(t) && T(
    "`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."
  ), Hs(e, t, n);
}
function Hs(e, t, {
  immediate: n,
  deep: o,
  flush: r,
  once: s,
  onTrack: i,
  onTrigger: a
} = me) {
  if (t && s) {
    const C = t;
    t = (...Te) => {
      C(...Te), le();
    };
  }
  _.NODE_ENV !== "production" && o !== void 0 && typeof o == "number" && T(
    'watch() "deep" option with number value will be used as watch depth in future versions. Please use a boolean instead to avoid potential breakage.'
  ), _.NODE_ENV !== "production" && !t && (n !== void 0 && T(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), o !== void 0 && T(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), s !== void 0 && T(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const l = (C) => {
    T(
      "Invalid watch source: ",
      C,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, c = Re, f = (C) => o === !0 ? C : (
    // for deep: false, only traverse root-level properties
    nn(C, o === !1 ? 1 : void 0)
  );
  let u, p = !1, g = !1;
  if (Ee(e) ? (u = () => e.value, p = zo(e)) : tt(e) ? (u = () => f(e), p = !0) : W(e) ? (g = !0, p = e.some((C) => tt(C) || zo(C)), u = () => e.map((C) => {
    if (Ee(C))
      return C.value;
    if (tt(C))
      return f(C);
    if (z(C))
      return St(C, c, 2);
    _.NODE_ENV !== "production" && l(C);
  })) : z(e) ? t ? u = () => St(e, c, 2) : u = () => (y && y(), nt(
    e,
    c,
    3,
    [N]
  )) : (u = $e, _.NODE_ENV !== "production" && l(e)), t && o) {
    const C = u;
    u = () => nn(C());
  }
  let y, N = (C) => {
    y = K.onStop = () => {
      St(C, c, 4), y = K.onStop = void 0;
    };
  }, $;
  if (mr)
    if (N = $e, t ? n && nt(t, c, 3, [
      u(),
      g ? [] : void 0,
      N
    ]) : u(), r === "sync") {
      const C = pf();
      $ = C.__watcherHandles || (C.__watcherHandles = []);
    } else
      return $e;
  let O = g ? new Array(e.length).fill(wo) : wo;
  const A = () => {
    if (!(!K.active || !K.dirty))
      if (t) {
        const C = K.run();
        (o || p || (g ? C.some((Te, ge) => qt(Te, O[ge])) : qt(C, O))) && (y && y(), nt(t, c, 3, [
          C,
          // pass undefined as the old value when it's changed for the first time
          O === wo ? void 0 : g && O[0] === wo ? [] : O,
          N
        ]), O = C);
      } else
        K.run();
  };
  A.allowRecurse = !!t;
  let k;
  r === "sync" ? k = A : r === "post" ? k = () => He(A, c && c.suspense) : (A.pre = !0, c && (A.id = c.uid), k = () => lr(A));
  const K = new Ps(u, $e, k), ne = Ua(), le = () => {
    K.stop(), ne && ws(ne.effects, K);
  };
  return _.NODE_ENV !== "production" && (K.onTrack = i, K.onTrigger = a), t ? n ? A() : O = K.run() : r === "post" ? He(
    K.run.bind(K),
    c && c.suspense
  ) : K.run(), $ && $.push(le), le;
}
function mf(e, t, n) {
  const o = this.proxy, r = xe(e) ? e.includes(".") ? Nl(o, e) : () => o[e] : e.bind(o, o);
  let s;
  z(t) ? s = t : (s = t.handler, n = t);
  const i = fo(this), a = Hs(r, s.bind(o), n);
  return i(), a;
}
function Nl(e, t) {
  const n = t.split(".");
  return () => {
    let o = e;
    for (let r = 0; r < n.length && o; r++)
      o = o[n[r]];
    return o;
  };
}
function nn(e, t, n = 0, o) {
  if (!de(e) || e.__v_skip)
    return e;
  if (t && t > 0) {
    if (n >= t)
      return e;
    n++;
  }
  if (o = o || /* @__PURE__ */ new Set(), o.has(e))
    return e;
  if (o.add(e), Ee(e))
    nn(e.value, t, n, o);
  else if (W(e))
    for (let r = 0; r < e.length; r++)
      nn(e[r], t, n, o);
  else if (Va(e) || on(e))
    e.forEach((r) => {
      nn(r, t, n, o);
    });
  else if (Ia(e))
    for (const r in e)
      nn(e[r], t, n, o);
  return e;
}
function wl(e) {
  Kc(e) && T("Do not use built-in directive ids as custom directive id: " + e);
}
function gf(e, t) {
  if (Oe === null)
    return _.NODE_ENV !== "production" && T("withDirectives can only be used inside render functions."), e;
  const n = gr(Oe) || Oe.proxy, o = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [s, i, a, l = me] = t[r];
    s && (z(s) && (s = {
      mounted: s,
      updated: s
    }), s.deep && nn(i), o.push({
      dir: s,
      instance: n,
      value: i,
      oldValue: void 0,
      arg: a,
      modifiers: l
    }));
  }
  return e;
}
function Xt(e, t, n, o) {
  const r = e.dirs, s = t && t.dirs;
  for (let i = 0; i < r.length; i++) {
    const a = r[i];
    s && (a.oldValue = s[i].value);
    let l = a.dir[o];
    l && (Gt(), nt(l, n, 8, [
      e.el,
      a,
      e,
      t
    ]), Jt());
  }
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Ol(e, t) {
  return z(e) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Se({ name: e.name }, t, { setup: e })
  ) : e;
}
const Wn = (e) => !!e.type.__asyncLoader, Bs = (e) => e.type.__isKeepAlive;
function _f(e, t) {
  Sl(e, "a", t);
}
function yf(e, t) {
  Sl(e, "da", t);
}
function Sl(e, t, n = Re) {
  const o = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (fr(t, o, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      Bs(r.parent.vnode) && Ef(o, t, n, r), r = r.parent;
  }
}
function Ef(e, t, n, o) {
  const r = fr(
    t,
    e,
    o,
    !0
    /* prepend */
  );
  $l(() => {
    ws(o[t], r);
  }, n);
}
function fr(e, t, n = Re, o = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...i) => {
      if (n.isUnmounted)
        return;
      Gt();
      const a = fo(n), l = nt(t, n, e, i);
      return a(), Jt(), l;
    });
    return o ? r.unshift(s) : r.push(s), s;
  } else if (_.NODE_ENV !== "production") {
    const r = Zt(Vs[e].replace(/ hook$/, ""));
    T(
      `${r} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const Rt = (e) => (t, n = Re) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!mr || e === "sp") && fr(e, (...o) => t(...o), n)
), bf = Rt("bm"), qs = Rt("m"), vf = Rt("bu"), Nf = Rt("u"), xl = Rt("bum"), $l = Rt("um"), wf = Rt("sp"), Of = Rt(
  "rtg"
), Sf = Rt(
  "rtc"
);
function xf(e, t = Re) {
  fr("ec", e, t);
}
function dr(e, t, n, o) {
  let r;
  const s = n && n[o];
  if (W(e) || xe(e)) {
    r = new Array(e.length);
    for (let i = 0, a = e.length; i < a; i++)
      r[i] = t(e[i], i, void 0, s && s[i]);
  } else if (typeof e == "number") {
    _.NODE_ENV !== "production" && !Number.isInteger(e) && T(`The v-for range expect an integer value but got ${e}.`), r = new Array(e);
    for (let i = 0; i < e; i++)
      r[i] = t(i + 1, i, void 0, s && s[i]);
  } else if (de(e))
    if (e[Symbol.iterator])
      r = Array.from(
        e,
        (i, a) => t(i, a, void 0, s && s[a])
      );
    else {
      const i = Object.keys(e);
      r = new Array(i.length);
      for (let a = 0, l = i.length; a < l; a++) {
        const c = i[a];
        r[a] = t(e[c], c, a, s && s[a]);
      }
    }
  else
    r = [];
  return n && (n[o] = r), r;
}
function To(e, t, n = {}, o, r) {
  if (Oe.isCE || Oe.parent && Wn(Oe.parent) && Oe.parent.isCE)
    return t !== "default" && (n.name = t), we("slot", n, o && o());
  let s = e[t];
  _.NODE_ENV !== "production" && s && s.length > 1 && (T(
    "SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template."
  ), s = () => []), s && s._c && (s._d = !1), te();
  const i = s && Rl(s(n)), a = pr(
    ke,
    {
      key: n.key || // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      i && i.key || `_${t}`
    },
    i || (o ? o() : []),
    i && e._ === 1 ? 64 : -2
  );
  return !r && a.scopeId && (a.slotScopeIds = [a.scopeId + "-s"]), s && s._c && (s._d = !0), a;
}
function Rl(e) {
  return e.some((t) => Sn(t) ? !(t.type === Be || t.type === ke && !Rl(t.children)) : !0) ? e : null;
}
const Xr = (e) => e ? Bl(e) ? gr(e) || e.proxy : Xr(e.parent) : null, cn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Se(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => _.NODE_ENV !== "production" ? bn(e.props) : e.props,
    $attrs: (e) => _.NODE_ENV !== "production" ? bn(e.attrs) : e.attrs,
    $slots: (e) => _.NODE_ENV !== "production" ? bn(e.slots) : e.slots,
    $refs: (e) => _.NODE_ENV !== "production" ? bn(e.refs) : e.refs,
    $parent: (e) => Xr(e.parent),
    $root: (e) => Xr(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Ks(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      e.effect.dirty = !0, lr(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Jo.bind(e.proxy)),
    $watch: (e) => mf.bind(e)
  })
), Ws = (e) => e === "_" || e === "$", Rr = (e, t) => e !== me && !e.__isScriptSetup && re(e, t), Pl = {
  get({ _: e }, t) {
    const { ctx: n, setupState: o, data: r, props: s, accessCache: i, type: a, appContext: l } = e;
    if (_.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let c;
    if (t[0] !== "$") {
      const g = i[t];
      if (g !== void 0)
        switch (g) {
          case 1:
            return o[t];
          case 2:
            return r[t];
          case 4:
            return n[t];
          case 3:
            return s[t];
        }
      else {
        if (Rr(o, t))
          return i[t] = 1, o[t];
        if (r !== me && re(r, t))
          return i[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (c = e.propsOptions[0]) && re(c, t)
        )
          return i[t] = 3, s[t];
        if (n !== me && re(n, t))
          return i[t] = 4, n[t];
        Qr && (i[t] = 0);
      }
    }
    const f = cn[t];
    let u, p;
    if (f)
      return t === "$attrs" ? (Ie(e, "get", t), _.NODE_ENV !== "production" && Xo()) : _.NODE_ENV !== "production" && t === "$slots" && Ie(e, "get", t), f(e);
    if (
      // css module (injected by vue-loader)
      (u = a.__cssModules) && (u = u[t])
    )
      return u;
    if (n !== me && re(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      p = l.config.globalProperties, re(p, t)
    )
      return p[t];
    _.NODE_ENV !== "production" && Oe && (!xe(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (r !== me && Ws(t[0]) && re(r, t) ? T(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === Oe && T(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: o, setupState: r, ctx: s } = e;
    return Rr(r, t) ? (r[t] = n, !0) : _.NODE_ENV !== "production" && r.__isScriptSetup && re(r, t) ? (T(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : o !== me && re(o, t) ? (o[t] = n, !0) : re(e.props, t) ? (_.NODE_ENV !== "production" && T(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (_.NODE_ENV !== "production" && T(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (_.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(s, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : s[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: o, appContext: r, propsOptions: s }
  }, i) {
    let a;
    return !!n[i] || e !== me && re(e, i) || Rr(t, i) || (a = s[0]) && re(a, i) || re(o, i) || re(cn, i) || re(r.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : re(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
_.NODE_ENV !== "production" && (Pl.ownKeys = (e) => (T(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function $f(e) {
  const t = {};
  return Object.defineProperty(t, "_", {
    configurable: !0,
    enumerable: !1,
    get: () => e
  }), Object.keys(cn).forEach((n) => {
    Object.defineProperty(t, n, {
      configurable: !0,
      enumerable: !1,
      get: () => cn[n](e),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: $e
    });
  }), t;
}
function Rf(e) {
  const {
    ctx: t,
    propsOptions: [n]
  } = e;
  n && Object.keys(n).forEach((o) => {
    Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => e.props[o],
      set: $e
    });
  });
}
function Pf(e) {
  const { ctx: t, setupState: n } = e;
  Object.keys(G(n)).forEach((o) => {
    if (!n.__isScriptSetup) {
      if (Ws(o[0])) {
        T(
          `setup() return property ${JSON.stringify(
            o
          )} should not start with "$" or "_" which are reserved prefixes for Vue internals.`
        );
        return;
      }
      Object.defineProperty(t, o, {
        enumerable: !0,
        configurable: !0,
        get: () => n[o],
        set: $e
      });
    }
  });
}
function Ci(e) {
  return W(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function Cf() {
  const e = /* @__PURE__ */ Object.create(null);
  return (t, n) => {
    e[n] ? T(`${t} property "${n}" is already defined in ${e[n]}.`) : e[n] = t;
  };
}
let Qr = !0;
function Df(e) {
  const t = Ks(e), n = e.proxy, o = e.ctx;
  Qr = !1, t.beforeCreate && Di(t.beforeCreate, e, "bc");
  const {
    // state
    data: r,
    computed: s,
    methods: i,
    watch: a,
    provide: l,
    inject: c,
    // lifecycle
    created: f,
    beforeMount: u,
    mounted: p,
    beforeUpdate: g,
    updated: y,
    activated: N,
    deactivated: $,
    beforeDestroy: O,
    beforeUnmount: A,
    destroyed: k,
    unmounted: K,
    render: ne,
    renderTracked: le,
    renderTriggered: C,
    errorCaptured: Te,
    serverPrefetch: ge,
    // public API
    expose: F,
    inheritAttrs: L,
    // assets
    components: oe,
    directives: be,
    filters: rt
  } = t, Ue = _.NODE_ENV !== "production" ? Cf() : null;
  if (_.NODE_ENV !== "production") {
    const [J] = e.propsOptions;
    if (J)
      for (const q in J)
        Ue("Props", q);
  }
  if (c && Tf(c, o, Ue), i)
    for (const J in i) {
      const q = i[J];
      z(q) ? (_.NODE_ENV !== "production" ? Object.defineProperty(o, J, {
        value: q.bind(n),
        configurable: !0,
        enumerable: !0,
        writable: !0
      }) : o[J] = q.bind(n), _.NODE_ENV !== "production" && Ue("Methods", J)) : _.NODE_ENV !== "production" && T(
        `Method "${J}" has type "${typeof q}" in the component definition. Did you reference the function correctly?`
      );
    }
  if (r) {
    _.NODE_ENV !== "production" && !z(r) && T(
      "The data option must be a function. Plain object usage is no longer supported."
    );
    const J = r.call(n, n);
    if (_.NODE_ENV !== "production" && Os(J) && T(
      "data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>."
    ), !de(J))
      _.NODE_ENV !== "production" && T("data() should return an object.");
    else if (e.data = ao(J), _.NODE_ENV !== "production")
      for (const q in J)
        Ue("Data", q), Ws(q[0]) || Object.defineProperty(o, q, {
          configurable: !0,
          enumerable: !0,
          get: () => J[q],
          set: $e
        });
  }
  if (Qr = !0, s)
    for (const J in s) {
      const q = s[J], Ke = z(q) ? q.bind(n, n) : z(q.get) ? q.get.bind(n, n) : $e;
      _.NODE_ENV !== "production" && Ke === $e && T(`Computed property "${J}" has no getter.`);
      const Yt = !z(q) && z(q.set) ? q.set.bind(n) : _.NODE_ENV !== "production" ? () => {
        T(
          `Write operation failed: computed property "${J}" is readonly.`
        );
      } : $e, Pt = _e({
        get: Ke,
        set: Yt
      });
      Object.defineProperty(o, J, {
        enumerable: !0,
        configurable: !0,
        get: () => Pt.value,
        set: (st) => Pt.value = st
      }), _.NODE_ENV !== "production" && Ue("Computed", J);
    }
  if (a)
    for (const J in a)
      Cl(a[J], o, n, J);
  if (l) {
    const J = z(l) ? l.call(n) : l;
    Reflect.ownKeys(J).forEach((q) => {
      Ao(q, J[q]);
    });
  }
  f && Di(f, e, "c");
  function De(J, q) {
    W(q) ? q.forEach((Ke) => J(Ke.bind(n))) : q && J(q.bind(n));
  }
  if (De(bf, u), De(qs, p), De(vf, g), De(Nf, y), De(_f, N), De(yf, $), De(xf, Te), De(Sf, le), De(Of, C), De(xl, A), De($l, K), De(wf, ge), W(F))
    if (F.length) {
      const J = e.exposed || (e.exposed = {});
      F.forEach((q) => {
        Object.defineProperty(J, q, {
          get: () => n[q],
          set: (Ke) => n[q] = Ke
        });
      });
    } else
      e.exposed || (e.exposed = {});
  ne && e.render === $e && (e.render = ne), L != null && (e.inheritAttrs = L), oe && (e.components = oe), be && (e.directives = be);
}
function Tf(e, t, n = $e) {
  W(e) && (e = Zr(e));
  for (const o in e) {
    const r = e[o];
    let s;
    de(r) ? "default" in r ? s = dt(
      r.from || o,
      r.default,
      !0
    ) : s = dt(r.from || o) : s = dt(r), Ee(s) ? Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (i) => s.value = i
    }) : t[o] = s, _.NODE_ENV !== "production" && n("Inject", o);
  }
}
function Di(e, t, n) {
  nt(
    W(e) ? e.map((o) => o.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Cl(e, t, n, o) {
  const r = o.includes(".") ? Nl(n, o) : () => n[o];
  if (xe(e)) {
    const s = t[e];
    z(s) ? ot(r, s) : _.NODE_ENV !== "production" && T(`Invalid watch handler specified by key "${e}"`, s);
  } else if (z(e))
    ot(r, e.bind(n));
  else if (de(e))
    if (W(e))
      e.forEach((s) => Cl(s, t, n, o));
    else {
      const s = z(e.handler) ? e.handler.bind(n) : t[e.handler];
      z(s) ? ot(r, s, e) : _.NODE_ENV !== "production" && T(`Invalid watch handler specified by key "${e.handler}"`, s);
    }
  else
    _.NODE_ENV !== "production" && T(`Invalid watch option: "${o}"`, e);
}
function Ks(e) {
  const t = e.type, { mixins: n, extends: o } = t, {
    mixins: r,
    optionsCache: s,
    config: { optionMergeStrategies: i }
  } = e.appContext, a = s.get(t);
  let l;
  return a ? l = a : !r.length && !n && !o ? l = t : (l = {}, r.length && r.forEach(
    (c) => Qo(l, c, i, !0)
  ), Qo(l, t, i)), de(t) && s.set(t, l), l;
}
function Qo(e, t, n, o = !1) {
  const { mixins: r, extends: s } = t;
  s && Qo(e, s, n, !0), r && r.forEach(
    (i) => Qo(e, i, n, !0)
  );
  for (const i in t)
    if (o && i === "expose")
      _.NODE_ENV !== "production" && T(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const a = Af[i] || n && n[i];
      e[i] = a ? a(e[i], t[i]) : t[i];
    }
  return e;
}
const Af = {
  data: Ti,
  props: Ai,
  emits: Ai,
  // objects
  methods: Hn,
  computed: Hn,
  // lifecycle
  beforeCreate: Fe,
  created: Fe,
  beforeMount: Fe,
  mounted: Fe,
  beforeUpdate: Fe,
  updated: Fe,
  beforeDestroy: Fe,
  beforeUnmount: Fe,
  destroyed: Fe,
  unmounted: Fe,
  activated: Fe,
  deactivated: Fe,
  errorCaptured: Fe,
  serverPrefetch: Fe,
  // assets
  components: Hn,
  directives: Hn,
  // watch
  watch: kf,
  // provide / inject
  provide: Ti,
  inject: Vf
};
function Ti(e, t) {
  return t ? e ? function() {
    return Se(
      z(e) ? e.call(this, this) : e,
      z(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Vf(e, t) {
  return Hn(Zr(e), Zr(t));
}
function Zr(e) {
  if (W(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Fe(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Hn(e, t) {
  return e ? Se(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Ai(e, t) {
  return e ? W(e) && W(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Se(
    /* @__PURE__ */ Object.create(null),
    Ci(e),
    Ci(t ?? {})
  ) : t;
}
function kf(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = Se(/* @__PURE__ */ Object.create(null), e);
  for (const o in t)
    n[o] = Fe(e[o], t[o]);
  return n;
}
function Dl() {
  return {
    app: null,
    config: {
      isNativeTag: Aa,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let If = 0;
function jf(e, t) {
  return function(o, r = null) {
    z(o) || (o = Se({}, o)), r != null && !de(r) && (_.NODE_ENV !== "production" && T("root props passed to app.mount() must be an object."), r = null);
    const s = Dl(), i = /* @__PURE__ */ new WeakSet();
    let a = !1;
    const l = s.app = {
      _uid: If++,
      _component: o,
      _props: r,
      _container: null,
      _context: s,
      _instance: null,
      version: Bi,
      get config() {
        return s.config;
      },
      set config(c) {
        _.NODE_ENV !== "production" && T(
          "app.config cannot be replaced. Modify individual options instead."
        );
      },
      use(c, ...f) {
        return i.has(c) ? _.NODE_ENV !== "production" && T("Plugin has already been applied to target app.") : c && z(c.install) ? (i.add(c), c.install(l, ...f)) : z(c) ? (i.add(c), c(l, ...f)) : _.NODE_ENV !== "production" && T(
          'A plugin must either be a function or an object with an "install" function.'
        ), l;
      },
      mixin(c) {
        return s.mixins.includes(c) ? _.NODE_ENV !== "production" && T(
          "Mixin has already been applied to target app" + (c.name ? `: ${c.name}` : "")
        ) : s.mixins.push(c), l;
      },
      component(c, f) {
        return _.NODE_ENV !== "production" && rs(c, s.config), f ? (_.NODE_ENV !== "production" && s.components[c] && T(`Component "${c}" has already been registered in target app.`), s.components[c] = f, l) : s.components[c];
      },
      directive(c, f) {
        return _.NODE_ENV !== "production" && wl(c), f ? (_.NODE_ENV !== "production" && s.directives[c] && T(`Directive "${c}" has already been registered in target app.`), s.directives[c] = f, l) : s.directives[c];
      },
      mount(c, f, u) {
        if (a)
          _.NODE_ENV !== "production" && T(
            "App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`"
          );
        else {
          _.NODE_ENV !== "production" && c.__vue_app__ && T(
            "There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first."
          );
          const p = we(o, r);
          return p.appContext = s, u === !0 ? u = "svg" : u === !1 && (u = void 0), _.NODE_ENV !== "production" && (s.reload = () => {
            e(
              Kt(p),
              c,
              u
            );
          }), f && t ? t(p, c) : e(p, c, u), a = !0, l._container = c, c.__vue_app__ = l, _.NODE_ENV !== "production" && (l._instance = p.component, Gu(l, Bi)), gr(p.component) || p.component.proxy;
        }
      },
      unmount() {
        a ? (e(null, l._container), _.NODE_ENV !== "production" && (l._instance = null, Ju(l)), delete l._container.__vue_app__) : _.NODE_ENV !== "production" && T("Cannot unmount an app that is not mounted.");
      },
      provide(c, f) {
        return _.NODE_ENV !== "production" && c in s.provides && T(
          `App already provides property with key "${String(c)}". It will be overwritten with the new value.`
        ), s.provides[c] = f, l;
      },
      runWithContext(c) {
        Zn = l;
        try {
          return c();
        } finally {
          Zn = null;
        }
      }
    };
    return l;
  };
}
let Zn = null;
function Ao(e, t) {
  if (!Re)
    _.NODE_ENV !== "production" && T("provide() can only be used inside setup().");
  else {
    let n = Re.provides;
    const o = Re.parent && Re.parent.provides;
    o === n && (n = Re.provides = Object.create(o)), n[e] = t;
  }
}
function dt(e, t, n = !1) {
  const o = Re || Oe;
  if (o || Zn) {
    const r = o ? o.parent == null ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides : Zn._context.provides;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && z(t) ? t.call(o && o.proxy) : t;
    _.NODE_ENV !== "production" && T(`injection "${String(e)}" not found.`);
  } else
    _.NODE_ENV !== "production" && T("inject() can only be used inside setup() or functional components.");
}
function Lf() {
  return !!(Re || Oe || Zn);
}
function Mf(e, t, n, o = !1) {
  const r = {}, s = {};
  qo(s, hr, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), Tl(e, t, r, s);
  for (const i in e.propsOptions[0])
    i in r || (r[i] = void 0);
  _.NODE_ENV !== "production" && Vl(t || {}, r, e), n ? e.props = o ? r : ol(r) : e.type.props ? e.props = r : e.props = s, e.attrs = s;
}
function Ff(e) {
  for (; e; ) {
    if (e.type.__hmrId)
      return !0;
    e = e.parent;
  }
}
function Uf(e, t, n, o) {
  const {
    props: r,
    attrs: s,
    vnode: { patchFlag: i }
  } = e, a = G(r), [l] = e.propsOptions;
  let c = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !(_.NODE_ENV !== "production" && Ff(e)) && (o || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const f = e.vnode.dynamicProps;
      for (let u = 0; u < f.length; u++) {
        let p = f[u];
        if (cr(e.emitsOptions, p))
          continue;
        const g = t[p];
        if (l)
          if (re(s, p))
            g !== s[p] && (s[p] = g, c = !0);
          else {
            const y = ht(p);
            r[y] = es(
              l,
              a,
              y,
              g,
              e,
              !1
            );
          }
        else
          g !== s[p] && (s[p] = g, c = !0);
      }
    }
  } else {
    Tl(e, t, r, s) && (c = !0);
    let f;
    for (const u in a)
      (!t || // for camelCase
      !re(t, u) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((f = Bt(u)) === u || !re(t, f))) && (l ? n && // for camelCase
      (n[u] !== void 0 || // for kebab-case
      n[f] !== void 0) && (r[u] = es(
        l,
        a,
        u,
        void 0,
        e,
        !0
      )) : delete r[u]);
    if (s !== a)
      for (const u in s)
        (!t || !re(t, u)) && (delete s[u], c = !0);
  }
  c && ft(e, "set", "$attrs"), _.NODE_ENV !== "production" && Vl(t || {}, r, e);
}
function Tl(e, t, n, o) {
  const [r, s] = e.propsOptions;
  let i = !1, a;
  if (t)
    for (let l in t) {
      if ($o(l))
        continue;
      const c = t[l];
      let f;
      r && re(r, f = ht(l)) ? !s || !s.includes(f) ? n[f] = c : (a || (a = {}))[f] = c : cr(e.emitsOptions, l) || (!(l in o) || c !== o[l]) && (o[l] = c, i = !0);
    }
  if (s) {
    const l = G(n), c = a || me;
    for (let f = 0; f < s.length; f++) {
      const u = s[f];
      n[u] = es(
        r,
        l,
        u,
        c[u],
        e,
        !re(c, u)
      );
    }
  }
  return i;
}
function es(e, t, n, o, r, s) {
  const i = e[n];
  if (i != null) {
    const a = re(i, "default");
    if (a && o === void 0) {
      const l = i.default;
      if (i.type !== Function && !i.skipFactory && z(l)) {
        const { propsDefaults: c } = r;
        if (n in c)
          o = c[n];
        else {
          const f = fo(r);
          o = c[n] = l.call(
            null,
            t
          ), f();
        }
      } else
        o = l;
    }
    i[
      0
      /* shouldCast */
    ] && (s && !a ? o = !1 : i[
      1
      /* shouldCastTrue */
    ] && (o === "" || o === Bt(n)) && (o = !0));
  }
  return o;
}
function Al(e, t, n = !1) {
  const o = t.propsCache, r = o.get(e);
  if (r)
    return r;
  const s = e.props, i = {}, a = [];
  let l = !1;
  if (!z(e)) {
    const f = (u) => {
      l = !0;
      const [p, g] = Al(u, t, !0);
      Se(i, p), g && a.push(...g);
    };
    !n && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  if (!s && !l)
    return de(e) && o.set(e, Nn), Nn;
  if (W(s))
    for (let f = 0; f < s.length; f++) {
      _.NODE_ENV !== "production" && !xe(s[f]) && T("props must be strings when using array syntax.", s[f]);
      const u = ht(s[f]);
      Vi(u) && (i[u] = me);
    }
  else if (s) {
    _.NODE_ENV !== "production" && !de(s) && T("invalid props options", s);
    for (const f in s) {
      const u = ht(f);
      if (Vi(u)) {
        const p = s[f], g = i[u] = W(p) || z(p) ? { type: p } : Se({}, p);
        if (g) {
          const y = Ii(Boolean, g.type), N = Ii(String, g.type);
          g[
            0
            /* shouldCast */
          ] = y > -1, g[
            1
            /* shouldCastTrue */
          ] = N < 0 || y < N, (y > -1 || re(g, "default")) && a.push(u);
        }
      }
    }
  }
  const c = [i, a];
  return de(e) && o.set(e, c), c;
}
function Vi(e) {
  return e[0] !== "$" ? !0 : (_.NODE_ENV !== "production" && T(`Invalid prop name: "${e}" is a reserved property.`), !1);
}
function ts(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function ki(e, t) {
  return ts(e) === ts(t);
}
function Ii(e, t) {
  return W(t) ? t.findIndex((n) => ki(n, e)) : z(t) && ki(t, e) ? 0 : -1;
}
function Vl(e, t, n) {
  const o = G(t), r = n.propsOptions[0];
  for (const s in r) {
    let i = r[s];
    i != null && Hf(
      s,
      o[s],
      i,
      _.NODE_ENV !== "production" ? bn(o) : o,
      !re(e, s) && !re(e, Bt(s))
    );
  }
}
function Hf(e, t, n, o, r) {
  const { type: s, required: i, validator: a, skipCheck: l } = n;
  if (i && r) {
    T('Missing required prop: "' + e + '"');
    return;
  }
  if (!(t == null && !i)) {
    if (s != null && s !== !0 && !l) {
      let c = !1;
      const f = W(s) ? s : [s], u = [];
      for (let p = 0; p < f.length && !c; p++) {
        const { valid: g, expectedType: y } = qf(t, f[p]);
        u.push(y || ""), c = g;
      }
      if (!c) {
        T(Wf(e, t, u));
        return;
      }
    }
    a && !a(t, o) && T('Invalid prop: custom validator check failed for prop "' + e + '".');
  }
}
const Bf = /* @__PURE__ */ $t(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function qf(e, t) {
  let n;
  const o = ts(t);
  if (Bf(o)) {
    const r = typeof e;
    n = r === o.toLowerCase(), !n && r === "object" && (n = e instanceof t);
  } else
    o === "Object" ? n = de(e) : o === "Array" ? n = W(e) : o === "null" ? n = e === null : n = e instanceof t;
  return {
    valid: n,
    expectedType: o
  };
}
function Wf(e, t, n) {
  if (n.length === 0)
    return `Prop type [] for prop "${e}" won't match anything. Did you mean to use type Array instead?`;
  let o = `Invalid prop: type check failed for prop "${e}". Expected ${n.map(fn).join(" | ")}`;
  const r = n[0], s = Ss(t), i = ji(t, r), a = ji(t, s);
  return n.length === 1 && Li(r) && !Kf(r, s) && (o += ` with value ${i}`), o += `, got ${s} `, Li(s) && (o += `with value ${a}.`), o;
}
function ji(e, t) {
  return t === "String" ? `"${e}"` : t === "Number" ? `${Number(e)}` : `${e}`;
}
function Li(e) {
  return ["string", "number", "boolean"].some((n) => e.toLowerCase() === n);
}
function Kf(...e) {
  return e.some((t) => t.toLowerCase() === "boolean");
}
const kl = (e) => e[0] === "_" || e === "$stable", zs = (e) => W(e) ? e.map(Qe) : [Qe(e)], zf = (e, t, n) => {
  if (t._n)
    return t;
  const o = vt((...r) => (_.NODE_ENV !== "production" && Re && (!n || n.root === Re.root) && T(
    `Slot "${e}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
  ), zs(t(...r))), n);
  return o._c = !1, o;
}, Il = (e, t, n) => {
  const o = e._ctx;
  for (const r in e) {
    if (kl(r))
      continue;
    const s = e[r];
    if (z(s))
      t[r] = zf(r, s, o);
    else if (s != null) {
      _.NODE_ENV !== "production" && T(
        `Non-function value encountered for slot "${r}". Prefer function slots for better performance.`
      );
      const i = zs(s);
      t[r] = () => i;
    }
  }
}, jl = (e, t) => {
  _.NODE_ENV !== "production" && !Bs(e.vnode) && T(
    "Non-function value encountered for default slot. Prefer function slots for better performance."
  );
  const n = zs(t);
  e.slots.default = () => n;
}, Gf = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = G(t), qo(t, "_", n)) : Il(
      t,
      e.slots = {}
    );
  } else
    e.slots = {}, t && jl(e, t);
  qo(e.slots, hr, 1);
}, Jf = (e, t, n) => {
  const { vnode: o, slots: r } = e;
  let s = !0, i = me;
  if (o.shapeFlag & 32) {
    const a = t._;
    a ? _.NODE_ENV !== "production" && ln ? (Se(r, t), ft(e, "set", "$slots")) : n && a === 1 ? s = !1 : (Se(r, t), !n && a === 1 && delete r._) : (s = !t.$stable, Il(t, r)), i = t;
  } else
    t && (jl(e, t), i = { default: 1 });
  if (s)
    for (const a in r)
      !kl(a) && i[a] == null && delete r[a];
};
function ns(e, t, n, o, r = !1) {
  if (W(e)) {
    e.forEach(
      (p, g) => ns(
        p,
        t && (W(t) ? t[g] : t),
        n,
        o,
        r
      )
    );
    return;
  }
  if (Wn(o) && !r)
    return;
  const s = o.shapeFlag & 4 ? gr(o.component) || o.component.proxy : o.el, i = r ? null : s, { i: a, r: l } = e;
  if (_.NODE_ENV !== "production" && !a) {
    T(
      "Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function."
    );
    return;
  }
  const c = t && t.r, f = a.refs === me ? a.refs = {} : a.refs, u = a.setupState;
  if (c != null && c !== l && (xe(c) ? (f[c] = null, re(u, c) && (u[c] = null)) : Ee(c) && (c.value = null)), z(l))
    St(l, a, 12, [i, f]);
  else {
    const p = xe(l), g = Ee(l), y = e.f;
    if (p || g) {
      const N = () => {
        if (y) {
          const $ = p ? re(u, l) ? u[l] : f[l] : l.value;
          r ? W($) && ws($, s) : W($) ? $.includes(s) || $.push(s) : p ? (f[l] = [s], re(u, l) && (u[l] = f[l])) : (l.value = [s], e.k && (f[e.k] = l.value));
        } else
          p ? (f[l] = i, re(u, l) && (u[l] = i)) : g ? (l.value = i, e.k && (f[e.k] = i)) : _.NODE_ENV !== "production" && T("Invalid template ref type:", l, `(${typeof l})`);
      };
      r || y ? N() : (N.id = -1, He(N, n));
    } else
      _.NODE_ENV !== "production" && T("Invalid template ref type:", l, `(${typeof l})`);
  }
}
let kn, Mt;
function yt(e, t) {
  e.appContext.config.performance && Zo() && Mt.mark(`vue-${t}-${e.uid}`), _.NODE_ENV !== "production" && Zu(e, t, Zo() ? Mt.now() : Date.now());
}
function Et(e, t) {
  if (e.appContext.config.performance && Zo()) {
    const n = `vue-${t}-${e.uid}`, o = n + ":end";
    Mt.mark(o), Mt.measure(
      `<${_r(e, e.type)}> ${t}`,
      n,
      o
    ), Mt.clearMarks(n), Mt.clearMarks(o);
  }
  _.NODE_ENV !== "production" && ef(e, t, Zo() ? Mt.now() : Date.now());
}
function Zo() {
  return kn !== void 0 || (typeof window < "u" && window.performance ? (kn = !0, Mt = window.performance) : kn = !1), kn;
}
function Yf() {
  const e = [];
  if (_.NODE_ENV !== "production" && e.length) {
    const t = e.length > 1;
    console.warn(
      `Feature flag${t ? "s" : ""} ${e.join(", ")} ${t ? "are" : "is"} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
    );
  }
}
const He = ff;
function Xf(e) {
  return Qf(e);
}
function Qf(e, t) {
  Yf();
  const n = $s();
  n.__VUE__ = !0, _.NODE_ENV !== "production" && _l(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n);
  const {
    insert: o,
    remove: r,
    patchProp: s,
    createElement: i,
    createText: a,
    createComment: l,
    setText: c,
    setElementText: f,
    parentNode: u,
    nextSibling: p,
    setScopeId: g = $e,
    insertStaticContent: y
  } = e, N = (d, h, E, v = null, S = null, P = null, V = void 0, R = null, D = _.NODE_ENV !== "production" && ln ? !1 : !!h.dynamicChildren) => {
    if (d === h)
      return;
    d && !In(d, h) && (v = j(d), ze(d, S, P, !0), d = null), h.patchFlag === -2 && (D = !1, h.dynamicChildren = null);
    const { type: x, ref: M, shapeFlag: B } = h;
    switch (x) {
      case uo:
        $(d, h, E, v);
        break;
      case Be:
        O(d, h, E, v);
        break;
      case ko:
        d == null ? A(h, E, v, V) : _.NODE_ENV !== "production" && k(d, h, E, V);
        break;
      case ke:
        be(
          d,
          h,
          E,
          v,
          S,
          P,
          V,
          R,
          D
        );
        break;
      default:
        B & 1 ? le(
          d,
          h,
          E,
          v,
          S,
          P,
          V,
          R,
          D
        ) : B & 6 ? rt(
          d,
          h,
          E,
          v,
          S,
          P,
          V,
          R,
          D
        ) : B & 64 || B & 128 ? x.process(
          d,
          h,
          E,
          v,
          S,
          P,
          V,
          R,
          D,
          ee
        ) : _.NODE_ENV !== "production" && T("Invalid VNode type:", x, `(${typeof x})`);
    }
    M != null && S && ns(M, d && d.ref, P, h || d, !h);
  }, $ = (d, h, E, v) => {
    if (d == null)
      o(
        h.el = a(h.children),
        E,
        v
      );
    else {
      const S = h.el = d.el;
      h.children !== d.children && c(S, h.children);
    }
  }, O = (d, h, E, v) => {
    d == null ? o(
      h.el = l(h.children || ""),
      E,
      v
    ) : h.el = d.el;
  }, A = (d, h, E, v) => {
    [d.el, d.anchor] = y(
      d.children,
      h,
      E,
      v,
      d.el,
      d.anchor
    );
  }, k = (d, h, E, v) => {
    if (h.children !== d.children) {
      const S = p(d.anchor);
      ne(d), [h.el, h.anchor] = y(
        h.children,
        E,
        S,
        v
      );
    } else
      h.el = d.el, h.anchor = d.anchor;
  }, K = ({ el: d, anchor: h }, E, v) => {
    let S;
    for (; d && d !== h; )
      S = p(d), o(d, E, v), d = S;
    o(h, E, v);
  }, ne = ({ el: d, anchor: h }) => {
    let E;
    for (; d && d !== h; )
      E = p(d), r(d), d = E;
    r(h);
  }, le = (d, h, E, v, S, P, V, R, D) => {
    h.type === "svg" ? V = "svg" : h.type === "math" && (V = "mathml"), d == null ? C(
      h,
      E,
      v,
      S,
      P,
      V,
      R,
      D
    ) : F(
      d,
      h,
      S,
      P,
      V,
      R,
      D
    );
  }, C = (d, h, E, v, S, P, V, R) => {
    let D, x;
    const { props: M, shapeFlag: B, transition: H, dirs: Y } = d;
    if (D = d.el = i(
      d.type,
      P,
      M && M.is,
      M
    ), B & 8 ? f(D, d.children) : B & 16 && ge(
      d.children,
      D,
      null,
      v,
      S,
      Pr(d, P),
      V,
      R
    ), Y && Xt(d, null, v, "created"), Te(D, d, d.scopeId, V, v), M) {
      for (const pe in M)
        pe !== "value" && !$o(pe) && s(
          D,
          pe,
          null,
          M[pe],
          P,
          d.children,
          v,
          S,
          b
        );
      "value" in M && s(D, "value", null, M.value, P), (x = M.onVnodeBeforeMount) && at(x, v, d);
    }
    _.NODE_ENV !== "production" && (Object.defineProperty(D, "__vnode", {
      value: d,
      enumerable: !1
    }), Object.defineProperty(D, "__vueParentComponent", {
      value: v,
      enumerable: !1
    })), Y && Xt(d, null, v, "beforeMount");
    const ie = Zf(S, H);
    ie && H.beforeEnter(D), o(D, h, E), ((x = M && M.onVnodeMounted) || ie || Y) && He(() => {
      x && at(x, v, d), ie && H.enter(D), Y && Xt(d, null, v, "mounted");
    }, S);
  }, Te = (d, h, E, v, S) => {
    if (E && g(d, E), v)
      for (let P = 0; P < v.length; P++)
        g(d, v[P]);
    if (S) {
      let P = S.subTree;
      if (_.NODE_ENV !== "production" && P.patchFlag > 0 && P.patchFlag & 2048 && (P = Fs(P.children) || P), h === P) {
        const V = S.vnode;
        Te(
          d,
          V,
          V.scopeId,
          V.slotScopeIds,
          S.parent
        );
      }
    }
  }, ge = (d, h, E, v, S, P, V, R, D = 0) => {
    for (let x = D; x < d.length; x++) {
      const M = d[x] = R ? It(d[x]) : Qe(d[x]);
      N(
        null,
        M,
        h,
        E,
        v,
        S,
        P,
        V,
        R
      );
    }
  }, F = (d, h, E, v, S, P, V) => {
    const R = h.el = d.el;
    let { patchFlag: D, dynamicChildren: x, dirs: M } = h;
    D |= d.patchFlag & 16;
    const B = d.props || me, H = h.props || me;
    let Y;
    if (E && Qt(E, !1), (Y = H.onVnodeBeforeUpdate) && at(Y, E, h, d), M && Xt(h, d, E, "beforeUpdate"), E && Qt(E, !0), _.NODE_ENV !== "production" && ln && (D = 0, V = !1, x = null), x ? (L(
      d.dynamicChildren,
      x,
      R,
      E,
      v,
      Pr(h, S),
      P
    ), _.NODE_ENV !== "production" && Vo(d, h)) : V || Ke(
      d,
      h,
      R,
      null,
      E,
      v,
      Pr(h, S),
      P,
      !1
    ), D > 0) {
      if (D & 16)
        oe(
          R,
          h,
          B,
          H,
          E,
          v,
          S
        );
      else if (D & 2 && B.class !== H.class && s(R, "class", null, H.class, S), D & 4 && s(R, "style", B.style, H.style, S), D & 8) {
        const ie = h.dynamicProps;
        for (let pe = 0; pe < ie.length; pe++) {
          const Ne = ie[pe], Ae = B[Ne], Ye = H[Ne];
          (Ye !== Ae || Ne === "value") && s(
            R,
            Ne,
            Ae,
            Ye,
            S,
            d.children,
            E,
            v,
            b
          );
        }
      }
      D & 1 && d.children !== h.children && f(R, h.children);
    } else
      !V && x == null && oe(
        R,
        h,
        B,
        H,
        E,
        v,
        S
      );
    ((Y = H.onVnodeUpdated) || M) && He(() => {
      Y && at(Y, E, h, d), M && Xt(h, d, E, "updated");
    }, v);
  }, L = (d, h, E, v, S, P, V) => {
    for (let R = 0; R < h.length; R++) {
      const D = d[R], x = h[R], M = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        D.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (D.type === ke || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !In(D, x) || // - In the case of a component, it could contain anything.
        D.shapeFlag & 70) ? u(D.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          E
        )
      );
      N(
        D,
        x,
        M,
        null,
        v,
        S,
        P,
        V,
        !0
      );
    }
  }, oe = (d, h, E, v, S, P, V) => {
    if (E !== v) {
      if (E !== me)
        for (const R in E)
          !$o(R) && !(R in v) && s(
            d,
            R,
            E[R],
            null,
            V,
            h.children,
            S,
            P,
            b
          );
      for (const R in v) {
        if ($o(R))
          continue;
        const D = v[R], x = E[R];
        D !== x && R !== "value" && s(
          d,
          R,
          x,
          D,
          V,
          h.children,
          S,
          P,
          b
        );
      }
      "value" in v && s(d, "value", E.value, v.value, V);
    }
  }, be = (d, h, E, v, S, P, V, R, D) => {
    const x = h.el = d ? d.el : a(""), M = h.anchor = d ? d.anchor : a("");
    let { patchFlag: B, dynamicChildren: H, slotScopeIds: Y } = h;
    _.NODE_ENV !== "production" && // #5523 dev root fragment may inherit directives
    (ln || B & 2048) && (B = 0, D = !1, H = null), Y && (R = R ? R.concat(Y) : Y), d == null ? (o(x, E, v), o(M, E, v), ge(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      h.children || [],
      E,
      M,
      S,
      P,
      V,
      R,
      D
    )) : B > 0 && B & 64 && H && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    d.dynamicChildren ? (L(
      d.dynamicChildren,
      H,
      E,
      S,
      P,
      V,
      R
    ), _.NODE_ENV !== "production" ? Vo(d, h) : (
      // #2080 if the stable fragment has a key, it's a <template v-for> that may
      //  get moved around. Make sure all root level vnodes inherit el.
      // #2134 or if it's a component root, it may also get moved around
      // as the component is being moved.
      (h.key != null || S && h === S.subTree) && Vo(
        d,
        h,
        !0
        /* shallow */
      )
    )) : Ke(
      d,
      h,
      E,
      M,
      S,
      P,
      V,
      R,
      D
    );
  }, rt = (d, h, E, v, S, P, V, R, D) => {
    h.slotScopeIds = R, d == null ? h.shapeFlag & 512 ? S.ctx.activate(
      h,
      E,
      v,
      V,
      D
    ) : Ue(
      h,
      E,
      v,
      S,
      P,
      V,
      D
    ) : De(d, h, D);
  }, Ue = (d, h, E, v, S, P, V) => {
    const R = d.component = ld(
      d,
      v,
      S
    );
    if (_.NODE_ENV !== "production" && R.type.__hmrId && qu(R), _.NODE_ENV !== "production" && (Co(d), yt(R, "mount")), Bs(d) && (R.ctx.renderer = ee), _.NODE_ENV !== "production" && yt(R, "init"), ud(R), _.NODE_ENV !== "production" && Et(R, "init"), R.asyncDep) {
      if (S && S.registerDep(R, J), !d.el) {
        const D = R.subTree = we(Be);
        O(null, D, h, E);
      }
    } else
      J(
        R,
        d,
        h,
        E,
        S,
        P,
        V
      );
    _.NODE_ENV !== "production" && (Do(), Et(R, "mount"));
  }, De = (d, h, E) => {
    const v = h.component = d.component;
    if (sf(d, h, E))
      if (v.asyncDep && !v.asyncResolved) {
        _.NODE_ENV !== "production" && Co(h), q(v, h, E), _.NODE_ENV !== "production" && Do();
        return;
      } else
        v.next = h, Hu(v.update), v.effect.dirty = !0, v.update();
    else
      h.el = d.el, v.vnode = h;
  }, J = (d, h, E, v, S, P, V) => {
    const R = () => {
      if (d.isMounted) {
        let { next: M, bu: B, u: H, parent: Y, vnode: ie } = d;
        {
          const hn = Ll(d);
          if (hn) {
            M && (M.el = ie.el, q(d, M, V)), hn.asyncDep.then(() => {
              d.isUnmounted || R();
            });
            return;
          }
        }
        let pe = M, Ne;
        _.NODE_ENV !== "production" && Co(M || d.vnode), Qt(d, !1), M ? (M.el = ie.el, q(d, M, V)) : M = ie, B && _n(B), (Ne = M.props && M.props.onVnodeBeforeUpdate) && at(Ne, Y, M, ie), Qt(d, !0), _.NODE_ENV !== "production" && yt(d, "render");
        const Ae = $r(d);
        _.NODE_ENV !== "production" && Et(d, "render");
        const Ye = d.subTree;
        d.subTree = Ae, _.NODE_ENV !== "production" && yt(d, "patch"), N(
          Ye,
          Ae,
          // parent may have changed if it's in a teleport
          u(Ye.el),
          // anchor may have changed if it's in a fragment
          j(Ye),
          d,
          S,
          P
        ), _.NODE_ENV !== "production" && Et(d, "patch"), M.el = Ae.el, pe === null && af(d, Ae.el), H && He(H, S), (Ne = M.props && M.props.onVnodeUpdated) && He(
          () => at(Ne, Y, M, ie),
          S
        ), _.NODE_ENV !== "production" && yl(d), _.NODE_ENV !== "production" && Do();
      } else {
        let M;
        const { el: B, props: H } = h, { bm: Y, m: ie, parent: pe } = d, Ne = Wn(h);
        if (Qt(d, !1), Y && _n(Y), !Ne && (M = H && H.onVnodeBeforeMount) && at(M, pe, h), Qt(d, !0), B && Q) {
          const Ae = () => {
            _.NODE_ENV !== "production" && yt(d, "render"), d.subTree = $r(d), _.NODE_ENV !== "production" && Et(d, "render"), _.NODE_ENV !== "production" && yt(d, "hydrate"), Q(
              B,
              d.subTree,
              d,
              S,
              null
            ), _.NODE_ENV !== "production" && Et(d, "hydrate");
          };
          Ne ? h.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !d.isUnmounted && Ae()
          ) : Ae();
        } else {
          _.NODE_ENV !== "production" && yt(d, "render");
          const Ae = d.subTree = $r(d);
          _.NODE_ENV !== "production" && Et(d, "render"), _.NODE_ENV !== "production" && yt(d, "patch"), N(
            null,
            Ae,
            E,
            v,
            d,
            S,
            P
          ), _.NODE_ENV !== "production" && Et(d, "patch"), h.el = Ae.el;
        }
        if (ie && He(ie, S), !Ne && (M = H && H.onVnodeMounted)) {
          const Ae = h;
          He(
            () => at(M, pe, Ae),
            S
          );
        }
        (h.shapeFlag & 256 || pe && Wn(pe.vnode) && pe.vnode.shapeFlag & 256) && d.a && He(d.a, S), d.isMounted = !0, _.NODE_ENV !== "production" && Yu(d), h = E = v = null;
      }
    }, D = d.effect = new Ps(
      R,
      $e,
      () => lr(x),
      d.scope
      // track it in component's effect scope
    ), x = d.update = () => {
      D.dirty && D.run();
    };
    x.id = d.uid, Qt(d, !0), _.NODE_ENV !== "production" && (D.onTrack = d.rtc ? (M) => _n(d.rtc, M) : void 0, D.onTrigger = d.rtg ? (M) => _n(d.rtg, M) : void 0, x.ownerInstance = d), x();
  }, q = (d, h, E) => {
    h.component = d;
    const v = d.vnode.props;
    d.vnode = h, d.next = null, Uf(d, h.props, v, E), Jf(d, h.children, E), Gt(), Si(d), Jt();
  }, Ke = (d, h, E, v, S, P, V, R, D = !1) => {
    const x = d && d.children, M = d ? d.shapeFlag : 0, B = h.children, { patchFlag: H, shapeFlag: Y } = h;
    if (H > 0) {
      if (H & 128) {
        Pt(
          x,
          B,
          E,
          v,
          S,
          P,
          V,
          R,
          D
        );
        return;
      } else if (H & 256) {
        Yt(
          x,
          B,
          E,
          v,
          S,
          P,
          V,
          R,
          D
        );
        return;
      }
    }
    Y & 8 ? (M & 16 && b(x, S, P), B !== x && f(E, B)) : M & 16 ? Y & 16 ? Pt(
      x,
      B,
      E,
      v,
      S,
      P,
      V,
      R,
      D
    ) : b(x, S, P, !0) : (M & 8 && f(E, ""), Y & 16 && ge(
      B,
      E,
      v,
      S,
      P,
      V,
      R,
      D
    ));
  }, Yt = (d, h, E, v, S, P, V, R, D) => {
    d = d || Nn, h = h || Nn;
    const x = d.length, M = h.length, B = Math.min(x, M);
    let H;
    for (H = 0; H < B; H++) {
      const Y = h[H] = D ? It(h[H]) : Qe(h[H]);
      N(
        d[H],
        Y,
        E,
        null,
        S,
        P,
        V,
        R,
        D
      );
    }
    x > M ? b(
      d,
      S,
      P,
      !0,
      !1,
      B
    ) : ge(
      h,
      E,
      v,
      S,
      P,
      V,
      R,
      D,
      B
    );
  }, Pt = (d, h, E, v, S, P, V, R, D) => {
    let x = 0;
    const M = h.length;
    let B = d.length - 1, H = M - 1;
    for (; x <= B && x <= H; ) {
      const Y = d[x], ie = h[x] = D ? It(h[x]) : Qe(h[x]);
      if (In(Y, ie))
        N(
          Y,
          ie,
          E,
          null,
          S,
          P,
          V,
          R,
          D
        );
      else
        break;
      x++;
    }
    for (; x <= B && x <= H; ) {
      const Y = d[B], ie = h[H] = D ? It(h[H]) : Qe(h[H]);
      if (In(Y, ie))
        N(
          Y,
          ie,
          E,
          null,
          S,
          P,
          V,
          R,
          D
        );
      else
        break;
      B--, H--;
    }
    if (x > B) {
      if (x <= H) {
        const Y = H + 1, ie = Y < M ? h[Y].el : v;
        for (; x <= H; )
          N(
            null,
            h[x] = D ? It(h[x]) : Qe(h[x]),
            E,
            ie,
            S,
            P,
            V,
            R,
            D
          ), x++;
      }
    } else if (x > H)
      for (; x <= B; )
        ze(d[x], S, P, !0), x++;
    else {
      const Y = x, ie = x, pe = /* @__PURE__ */ new Map();
      for (x = ie; x <= H; x++) {
        const Me = h[x] = D ? It(h[x]) : Qe(h[x]);
        Me.key != null && (_.NODE_ENV !== "production" && pe.has(Me.key) && T(
          "Duplicate keys found during update:",
          JSON.stringify(Me.key),
          "Make sure keys are unique."
        ), pe.set(Me.key, x));
      }
      let Ne, Ae = 0;
      const Ye = H - ie + 1;
      let hn = !1, pi = 0;
      const Vn = new Array(Ye);
      for (x = 0; x < Ye; x++)
        Vn[x] = 0;
      for (x = Y; x <= B; x++) {
        const Me = d[x];
        if (Ae >= Ye) {
          ze(Me, S, P, !0);
          continue;
        }
        let it;
        if (Me.key != null)
          it = pe.get(Me.key);
        else
          for (Ne = ie; Ne <= H; Ne++)
            if (Vn[Ne - ie] === 0 && In(Me, h[Ne])) {
              it = Ne;
              break;
            }
        it === void 0 ? ze(Me, S, P, !0) : (Vn[it - ie] = x + 1, it >= pi ? pi = it : hn = !0, N(
          Me,
          h[it],
          E,
          null,
          S,
          P,
          V,
          R,
          D
        ), Ae++);
      }
      const hi = hn ? ed(Vn) : Nn;
      for (Ne = hi.length - 1, x = Ye - 1; x >= 0; x--) {
        const Me = ie + x, it = h[Me], mi = Me + 1 < M ? h[Me + 1].el : v;
        Vn[x] === 0 ? N(
          null,
          it,
          E,
          mi,
          S,
          P,
          V,
          R,
          D
        ) : hn && (Ne < 0 || x !== hi[Ne] ? st(it, E, mi, 2) : Ne--);
      }
    }
  }, st = (d, h, E, v, S = null) => {
    const { el: P, type: V, transition: R, children: D, shapeFlag: x } = d;
    if (x & 6) {
      st(d.component.subTree, h, E, v);
      return;
    }
    if (x & 128) {
      d.suspense.move(h, E, v);
      return;
    }
    if (x & 64) {
      V.move(d, h, E, ee);
      return;
    }
    if (V === ke) {
      o(P, h, E);
      for (let B = 0; B < D.length; B++)
        st(D[B], h, E, v);
      o(d.anchor, h, E);
      return;
    }
    if (V === ko) {
      K(d, h, E);
      return;
    }
    if (v !== 2 && x & 1 && R)
      if (v === 0)
        R.beforeEnter(P), o(P, h, E), He(() => R.enter(P), S);
      else {
        const { leave: B, delayLeave: H, afterLeave: Y } = R, ie = () => o(P, h, E), pe = () => {
          B(P, () => {
            ie(), Y && Y();
          });
        };
        H ? H(P, ie, pe) : pe();
      }
    else
      o(P, h, E);
  }, ze = (d, h, E, v = !1, S = !1) => {
    const {
      type: P,
      props: V,
      ref: R,
      children: D,
      dynamicChildren: x,
      shapeFlag: M,
      patchFlag: B,
      dirs: H
    } = d;
    if (R != null && ns(R, null, E, d, !0), M & 256) {
      h.ctx.deactivate(d);
      return;
    }
    const Y = M & 1 && H, ie = !Wn(d);
    let pe;
    if (ie && (pe = V && V.onVnodeBeforeUnmount) && at(pe, h, d), M & 6)
      Dt(d.component, E, v);
    else {
      if (M & 128) {
        d.suspense.unmount(E, v);
        return;
      }
      Y && Xt(d, null, h, "beforeUnmount"), M & 64 ? d.type.remove(
        d,
        h,
        E,
        S,
        ee,
        v
      ) : x && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (P !== ke || B > 0 && B & 64) ? b(
        x,
        h,
        E,
        !1,
        !0
      ) : (P === ke && B & 384 || !S && M & 16) && b(D, h, E), v && Ct(d);
    }
    (ie && (pe = V && V.onVnodeUnmounted) || Y) && He(() => {
      pe && at(pe, h, d), Y && Xt(d, null, h, "unmounted");
    }, E);
  }, Ct = (d) => {
    const { type: h, el: E, anchor: v, transition: S } = d;
    if (h === ke) {
      _.NODE_ENV !== "production" && d.patchFlag > 0 && d.patchFlag & 2048 && S && !S.persisted ? d.children.forEach((V) => {
        V.type === Be ? r(V.el) : Ct(V);
      }) : go(E, v);
      return;
    }
    if (h === ko) {
      ne(d);
      return;
    }
    const P = () => {
      r(E), S && !S.persisted && S.afterLeave && S.afterLeave();
    };
    if (d.shapeFlag & 1 && S && !S.persisted) {
      const { leave: V, delayLeave: R } = S, D = () => V(E, P);
      R ? R(d.el, P, D) : D();
    } else
      P();
  }, go = (d, h) => {
    let E;
    for (; d !== h; )
      E = p(d), r(d), d = E;
    r(h);
  }, Dt = (d, h, E) => {
    _.NODE_ENV !== "production" && d.type.__hmrId && Wu(d);
    const { bum: v, scope: S, update: P, subTree: V, um: R } = d;
    v && _n(v), S.stop(), P && (P.active = !1, ze(V, d, h, E)), R && He(R, h), He(() => {
      d.isUnmounted = !0;
    }, h), h && h.pendingBranch && !h.isUnmounted && d.asyncDep && !d.asyncResolved && d.suspenseId === h.pendingId && (h.deps--, h.deps === 0 && h.resolve()), _.NODE_ENV !== "production" && Qu(d);
  }, b = (d, h, E, v = !1, S = !1, P = 0) => {
    for (let V = P; V < d.length; V++)
      ze(d[V], h, E, v, S);
  }, j = (d) => d.shapeFlag & 6 ? j(d.component.subTree) : d.shapeFlag & 128 ? d.suspense.next() : p(d.anchor || d.el);
  let I = !1;
  const U = (d, h, E) => {
    d == null ? h._vnode && ze(h._vnode, null, null, !0) : N(
      h._vnode || null,
      d,
      h,
      null,
      null,
      null,
      E
    ), I || (I = !0, Si(), hl(), I = !1), h._vnode = d;
  }, ee = {
    p: N,
    um: ze,
    m: st,
    r: Ct,
    mt: Ue,
    mc: ge,
    pc: Ke,
    pbc: L,
    n: j,
    o: e
  };
  let ve, Q;
  return t && ([ve, Q] = t(
    ee
  )), {
    render: U,
    hydrate: ve,
    createApp: jf(U, ve)
  };
}
function Pr({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Qt({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Zf(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Vo(e, t, n = !1) {
  const o = e.children, r = t.children;
  if (W(o) && W(r))
    for (let s = 0; s < o.length; s++) {
      const i = o[s];
      let a = r[s];
      a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = r[s] = It(r[s]), a.el = i.el), n || Vo(i, a)), a.type === uo && (a.el = i.el), _.NODE_ENV !== "production" && a.type === Be && !a.el && (a.el = i.el);
    }
}
function ed(e) {
  const t = e.slice(), n = [0];
  let o, r, s, i, a;
  const l = e.length;
  for (o = 0; o < l; o++) {
    const c = e[o];
    if (c !== 0) {
      if (r = n[n.length - 1], e[r] < c) {
        t[o] = r, n.push(o);
        continue;
      }
      for (s = 0, i = n.length - 1; s < i; )
        a = s + i >> 1, e[n[a]] < c ? s = a + 1 : i = a;
      c < e[n[s]] && (s > 0 && (t[o] = n[s - 1]), n[s] = o);
    }
  }
  for (s = n.length, i = n[s - 1]; s-- > 0; )
    n[s] = i, i = t[i];
  return n;
}
function Ll(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Ll(t);
}
const td = (e) => e.__isTeleport, ke = Symbol.for("v-fgt"), uo = Symbol.for("v-txt"), Be = Symbol.for("v-cmt"), ko = Symbol.for("v-stc"), Kn = [];
let et = null;
function te(e = !1) {
  Kn.push(et = e ? null : []);
}
function nd() {
  Kn.pop(), et = Kn[Kn.length - 1] || null;
}
let eo = 1;
function Mi(e) {
  eo += e;
}
function Ml(e) {
  return e.dynamicChildren = eo > 0 ? et || Nn : null, nd(), eo > 0 && et && et.push(e), e;
}
function ce(e, t, n, o, r, s) {
  return Ml(
    m(
      e,
      t,
      n,
      o,
      r,
      s,
      !0
    )
  );
}
function pr(e, t, n, o, r) {
  return Ml(
    we(
      e,
      t,
      n,
      o,
      r,
      !0
    )
  );
}
function Sn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function In(e, t) {
  return _.NODE_ENV !== "production" && t.shapeFlag & 6 && yn.has(t.type) ? (e.shapeFlag &= -257, t.shapeFlag &= -513, !1) : e.type === t.type && e.key === t.key;
}
const od = (...e) => Ul(
  ...e
), hr = "__vInternal", Fl = ({ key: e }) => e ?? null, Io = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? xe(e) || Ee(e) || z(e) ? { i: Oe, r: e, k: t, f: !!n } : e : null);
function m(e, t = null, n = null, o = 0, r = null, s = e === ke ? 0 : 1, i = !1, a = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Fl(t),
    ref: t && Io(t),
    scopeId: ur,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: o,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: Oe
  };
  return a ? (Gs(l, n), s & 128 && e.normalize(l)) : n && (l.shapeFlag |= xe(n) ? 8 : 16), _.NODE_ENV !== "production" && l.key !== l.key && T("VNode created with invalid key (NaN). VNode type:", l.type), eo > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  et && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (l.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  l.patchFlag !== 32 && et.push(l), l;
}
const we = _.NODE_ENV !== "production" ? od : Ul;
function Ul(e, t = null, n = null, o = 0, r = null, s = !1) {
  if ((!e || e === lf) && (_.NODE_ENV !== "production" && !e && T(`Invalid vnode type when creating vnode: ${e}.`), e = Be), Sn(e)) {
    const a = Kt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Gs(a, n), eo > 0 && !s && et && (a.shapeFlag & 6 ? et[et.indexOf(e)] = a : et.push(a)), a.patchFlag |= -2, a;
  }
  if (Wl(e) && (e = e.__vccOpts), t) {
    t = rd(t);
    let { class: a, style: l } = t;
    a && !xe(a) && (t.class = Ze(a)), de(l) && (Go(l) && !W(l) && (l = Se({}, l)), t.style = Rs(l));
  }
  const i = xe(e) ? 1 : uf(e) ? 128 : td(e) ? 64 : de(e) ? 4 : z(e) ? 2 : 0;
  return _.NODE_ENV !== "production" && i & 4 && Go(e) && (e = G(e), T(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), m(
    e,
    t,
    n,
    o,
    r,
    i,
    s,
    !0
  );
}
function rd(e) {
  return e ? Go(e) || hr in e ? Se({}, e) : e : null;
}
function Kt(e, t, n = !1) {
  const { props: o, ref: r, patchFlag: s, children: i } = e, a = t ? sd(o || {}, t) : o;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: a,
    key: a && Fl(a),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? W(r) ? r.concat(Io(t)) : [r, Io(t)] : Io(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: _.NODE_ENV !== "production" && s === -1 && W(i) ? i.map(Hl) : i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== ke ? s === -1 ? 16 : s | 16 : s,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Kt(e.ssContent),
    ssFallback: e.ssFallback && Kt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function Hl(e) {
  const t = Kt(e);
  return W(e.children) && (t.children = e.children.map(Hl)), t;
}
function Nt(e = " ", t = 0) {
  return we(uo, null, e, t);
}
function Ft(e = "", t = !1) {
  return t ? (te(), pr(Be, null, e)) : we(Be, null, e);
}
function Qe(e) {
  return e == null || typeof e == "boolean" ? we(Be) : W(e) ? we(
    ke,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? It(e) : we(uo, null, String(e));
}
function It(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Kt(e);
}
function Gs(e, t) {
  let n = 0;
  const { shapeFlag: o } = e;
  if (t == null)
    t = null;
  else if (W(t))
    n = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Gs(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(hr in t) ? t._ctx = Oe : r === 3 && Oe && (Oe.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    z(t) ? (t = { default: t, _ctx: Oe }, n = 32) : (t = String(t), o & 64 ? (n = 16, t = [Nt(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function sd(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (const r in o)
      if (r === "class")
        t.class !== o.class && (t.class = Ze([t.class, o.class]));
      else if (r === "style")
        t.style = Rs([t.style, o.style]);
      else if (io(r)) {
        const s = t[r], i = o[r];
        i && s !== i && !(W(s) && s.includes(i)) && (t[r] = s ? [].concat(s, i) : i);
      } else
        r !== "" && (t[r] = o[r]);
  }
  return t;
}
function at(e, t, n, o = null) {
  nt(e, t, 7, [
    n,
    o
  ]);
}
const id = Dl();
let ad = 0;
function ld(e, t, n) {
  const o = e.type, r = (t ? t.appContext : e.appContext) || id, s = {
    uid: ad++,
    vnode: e,
    type: o,
    parent: t,
    appContext: r,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new Ma(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(r.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Al(o, r),
    emitsOptions: bl(o, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: me,
    // inheritAttrs
    inheritAttrs: o.inheritAttrs,
    // state
    ctx: me,
    data: me,
    props: me,
    attrs: me,
    slots: me,
    refs: me,
    setupState: me,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return _.NODE_ENV !== "production" ? s.ctx = $f(s) : s.ctx = { _: s }, s.root = t ? t.root : s, s.emit = nf.bind(null, s), e.ce && e.ce(s), s;
}
let Re = null;
const Js = () => Re || Oe;
let er, os;
{
  const e = $s(), t = (n, o) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(o), (s) => {
      r.length > 1 ? r.forEach((i) => i(s)) : r[0](s);
    };
  };
  er = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Re = n
  ), os = t(
    "__VUE_SSR_SETTERS__",
    (n) => mr = n
  );
}
const fo = (e) => {
  const t = Re;
  return er(e), e.scope.on(), () => {
    e.scope.off(), er(t);
  };
}, Fi = () => {
  Re && Re.scope.off(), er(null);
}, cd = /* @__PURE__ */ $t("slot,component");
function rs(e, t) {
  const n = t.isNativeTag || Aa;
  (cd(e) || n(e)) && T(
    "Do not use built-in or reserved HTML elements as component id: " + e
  );
}
function Bl(e) {
  return e.vnode.shapeFlag & 4;
}
let mr = !1;
function ud(e, t = !1) {
  t && os(t);
  const { props: n, children: o } = e.vnode, r = Bl(e);
  Mf(e, n, r, t), Gf(e, o);
  const s = r ? fd(e, t) : void 0;
  return t && os(!1), s;
}
function fd(e, t) {
  var n;
  const o = e.type;
  if (_.NODE_ENV !== "production") {
    if (o.name && rs(o.name, e.appContext.config), o.components) {
      const s = Object.keys(o.components);
      for (let i = 0; i < s.length; i++)
        rs(s[i], e.appContext.config);
    }
    if (o.directives) {
      const s = Object.keys(o.directives);
      for (let i = 0; i < s.length; i++)
        wl(s[i]);
    }
    o.compilerOptions && dd() && T(
      '"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.'
    );
  }
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = Ot(new Proxy(e.ctx, Pl)), _.NODE_ENV !== "production" && Rf(e);
  const { setup: r } = o;
  if (r) {
    const s = e.setupContext = r.length > 1 ? hd(e) : null, i = fo(e);
    Gt();
    const a = St(
      r,
      e,
      0,
      [
        _.NODE_ENV !== "production" ? bn(e.props) : e.props,
        s
      ]
    );
    if (Jt(), i(), Os(a)) {
      if (a.then(Fi, Fi), t)
        return a.then((l) => {
          Ui(e, l, t);
        }).catch((l) => {
          lo(l, e, 0);
        });
      if (e.asyncDep = a, _.NODE_ENV !== "production" && !e.suspense) {
        const l = (n = o.name) != null ? n : "Anonymous";
        T(
          `Component <${l}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`
        );
      }
    } else
      Ui(e, a, t);
  } else
    ql(e, t);
}
function Ui(e, t, n) {
  z(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : de(t) ? (_.NODE_ENV !== "production" && Sn(t) && T(
    "setup() should not return VNodes directly - return a render function instead."
  ), _.NODE_ENV !== "production" && (e.devtoolsRawSetupState = t), e.setupState = ll(t), _.NODE_ENV !== "production" && Pf(e)) : _.NODE_ENV !== "production" && t !== void 0 && T(
    `setup() should return an object. Received: ${t === null ? "null" : typeof t}`
  ), ql(e, n);
}
let ss;
const dd = () => !ss;
function ql(e, t, n) {
  const o = e.type;
  if (!e.render) {
    if (!t && ss && !o.render) {
      const r = o.template || Ks(e).template;
      if (r) {
        _.NODE_ENV !== "production" && yt(e, "compile");
        const { isCustomElement: s, compilerOptions: i } = e.appContext.config, { delimiters: a, compilerOptions: l } = o, c = Se(
          Se(
            {
              isCustomElement: s,
              delimiters: a
            },
            i
          ),
          l
        );
        o.render = ss(r, c), _.NODE_ENV !== "production" && Et(e, "compile");
      }
    }
    e.render = o.render || $e;
  }
  {
    const r = fo(e);
    Gt();
    try {
      Df(e);
    } finally {
      Jt(), r();
    }
  }
  _.NODE_ENV !== "production" && !o.render && e.render === $e && !t && (o.template ? T(
    'Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".'
  ) : T("Component is missing template or render function."));
}
function Hi(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(
    e.attrs,
    _.NODE_ENV !== "production" ? {
      get(t, n) {
        return Xo(), Ie(e, "get", "$attrs"), t[n];
      },
      set() {
        return T("setupContext.attrs is readonly."), !1;
      },
      deleteProperty() {
        return T("setupContext.attrs is readonly."), !1;
      }
    } : {
      get(t, n) {
        return Ie(e, "get", "$attrs"), t[n];
      }
    }
  ));
}
function pd(e) {
  return e.slotsProxy || (e.slotsProxy = new Proxy(e.slots, {
    get(t, n) {
      return Ie(e, "get", "$slots"), t[n];
    }
  }));
}
function hd(e) {
  const t = (n) => {
    if (_.NODE_ENV !== "production" && (e.exposed && T("expose() should be called only once per setup()."), n != null)) {
      let o = typeof n;
      o === "object" && (W(n) ? o = "array" : Ee(n) && (o = "ref")), o !== "object" && T(
        `expose() should be passed a plain object, received ${o}.`
      );
    }
    e.exposed = n || {};
  };
  return _.NODE_ENV !== "production" ? Object.freeze({
    get attrs() {
      return Hi(e);
    },
    get slots() {
      return pd(e);
    },
    get emit() {
      return (n, ...o) => e.emit(n, ...o);
    },
    expose: t
  }) : {
    get attrs() {
      return Hi(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function gr(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(ll(Ot(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in cn)
          return cn[n](e);
      },
      has(t, n) {
        return n in t || n in cn;
      }
    }));
}
const md = /(?:^|[-_])(\w)/g, gd = (e) => e.replace(md, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Ys(e, t = !0) {
  return z(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function _r(e, t, n = !1) {
  let o = Ys(t);
  if (!o && t.__file) {
    const r = t.__file.match(/([^/\\]+)\.\w+$/);
    r && (o = r[1]);
  }
  if (!o && e && e.parent) {
    const r = (s) => {
      for (const i in s)
        if (s[i] === t)
          return i;
    };
    o = r(
      e.components || e.parent.type.components
    ) || r(e.appContext.components);
  }
  return o ? gd(o) : n ? "App" : "Anonymous";
}
function Wl(e) {
  return z(e) && "__vccOpts" in e;
}
const _e = (e, t) => Pu(e, t, mr);
function Kl(e, t, n) {
  const o = arguments.length;
  return o === 2 ? de(t) && !W(t) ? Sn(t) ? we(e, null, [t]) : we(e, t) : we(e, null, t) : (o > 3 ? n = Array.prototype.slice.call(arguments, 2) : o === 3 && Sn(n) && (n = [n]), we(e, t, n));
}
function Cr(e) {
  return !!(e && e.__v_isShallow);
}
function _d() {
  if (_.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, o = { style: "color:#eb2f96" }, r = {
    header(u) {
      return de(u) ? u.__isVue ? ["div", e, "VueInstance"] : Ee(u) ? [
        "div",
        {},
        ["span", e, f(u)],
        "<",
        a(u.value),
        ">"
      ] : tt(u) ? [
        "div",
        {},
        ["span", e, Cr(u) ? "ShallowReactive" : "Reactive"],
        "<",
        a(u),
        `>${Wt(u) ? " (readonly)" : ""}`
      ] : Wt(u) ? [
        "div",
        {},
        ["span", e, Cr(u) ? "ShallowReadonly" : "Readonly"],
        "<",
        a(u),
        ">"
      ] : null : null;
    },
    hasBody(u) {
      return u && u.__isVue;
    },
    body(u) {
      if (u && u.__isVue)
        return [
          "div",
          {},
          ...s(u.$)
        ];
    }
  };
  function s(u) {
    const p = [];
    u.type.props && u.props && p.push(i("props", G(u.props))), u.setupState !== me && p.push(i("setup", u.setupState)), u.data !== me && p.push(i("data", G(u.data)));
    const g = l(u, "computed");
    g && p.push(i("computed", g));
    const y = l(u, "inject");
    return y && p.push(i("injected", y)), p.push([
      "div",
      {},
      [
        "span",
        {
          style: o.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: u }]
    ]), p;
  }
  function i(u, p) {
    return p = Se({}, p), Object.keys(p).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        u
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(p).map((g) => [
          "div",
          {},
          ["span", o, g + ": "],
          a(p[g], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function a(u, p = !0) {
    return typeof u == "number" ? ["span", t, u] : typeof u == "string" ? ["span", n, JSON.stringify(u)] : typeof u == "boolean" ? ["span", o, u] : de(u) ? ["object", { object: p ? G(u) : u }] : ["span", n, String(u)];
  }
  function l(u, p) {
    const g = u.type;
    if (z(g))
      return;
    const y = {};
    for (const N in u.ctx)
      c(g, N, p) && (y[N] = u.ctx[N]);
    return y;
  }
  function c(u, p, g) {
    const y = u[g];
    if (W(y) && y.includes(p) || de(y) && p in y || u.extends && c(u.extends, p, g) || u.mixins && u.mixins.some((N) => c(N, p, g)))
      return !0;
  }
  function f(u) {
    return Cr(u) ? "ShallowRef" : u.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(r) : window.devtoolsFormatters = [r];
}
const Bi = "3.4.15", un = _.NODE_ENV !== "production" ? T : $e;
var xn = {};
const yd = "http://www.w3.org/2000/svg", Ed = "http://www.w3.org/1998/Math/MathML", jt = typeof document < "u" ? document : null, qi = jt && /* @__PURE__ */ jt.createElement("template"), bd = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, o) => {
    const r = t === "svg" ? jt.createElementNS(yd, e) : t === "mathml" ? jt.createElementNS(Ed, e) : jt.createElement(e, n ? { is: n } : void 0);
    return e === "select" && o && o.multiple != null && r.setAttribute("multiple", o.multiple), r;
  },
  createText: (e) => jt.createTextNode(e),
  createComment: (e) => jt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => jt.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, o, r, s) {
    const i = n ? n.previousSibling : t.lastChild;
    if (r && (r === s || r.nextSibling))
      for (; t.insertBefore(r.cloneNode(!0), n), !(r === s || !(r = r.nextSibling)); )
        ;
    else {
      qi.innerHTML = o === "svg" ? `<svg>${e}</svg>` : o === "mathml" ? `<math>${e}</math>` : e;
      const a = qi.content;
      if (o === "svg" || o === "mathml") {
        const l = a.firstChild;
        for (; l.firstChild; )
          a.appendChild(l.firstChild);
        a.removeChild(l);
      }
      t.insertBefore(a, n);
    }
    return [
      // first
      i ? i.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, vd = Symbol("_vtc");
function Nd(e, t, n) {
  const o = e[vd];
  o && (t = (t ? [t, ...o] : [...o]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const wd = Symbol("_vod"), Od = Symbol(xn.NODE_ENV !== "production" ? "CSS_VAR_TEXT" : "");
function Sd(e, t, n) {
  const o = e.style, r = o.display, s = xe(n);
  if (n && !s) {
    if (t && !xe(t))
      for (const i in t)
        n[i] == null && is(o, i, "");
    for (const i in n)
      is(o, i, n[i]);
  } else if (s) {
    if (t !== n) {
      const i = o[Od];
      i && (n += ";" + i), o.cssText = n;
    }
  } else
    t && e.removeAttribute("style");
  wd in e && (o.display = r);
}
const xd = /[^\\];\s*$/, Wi = /\s*!important$/;
function is(e, t, n) {
  if (W(n))
    n.forEach((o) => is(e, t, o));
  else if (n == null && (n = ""), xn.NODE_ENV !== "production" && xd.test(n) && un(
    `Unexpected semicolon at the end of '${t}' style value: '${n}'`
  ), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const o = $d(e, t);
    Wi.test(n) ? e.setProperty(
      Bt(o),
      n.replace(Wi, ""),
      "important"
    ) : e[o] = n;
  }
}
const Ki = ["Webkit", "Moz", "ms"], Dr = {};
function $d(e, t) {
  const n = Dr[t];
  if (n)
    return n;
  let o = ht(t);
  if (o !== "filter" && o in e)
    return Dr[t] = o;
  o = fn(o);
  for (let r = 0; r < Ki.length; r++) {
    const s = Ki[r] + o;
    if (s in e)
      return Dr[t] = s;
  }
  return t;
}
const zi = "http://www.w3.org/1999/xlink";
function Rd(e, t, n, o, r) {
  if (o && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(zi, t.slice(6, t.length)) : e.setAttributeNS(zi, t, n);
  else {
    const s = iu(t);
    n == null || s && !ja(n) ? e.removeAttribute(t) : e.setAttribute(t, s ? "" : n);
  }
}
function Pd(e, t, n, o, r, s, i) {
  if (t === "innerHTML" || t === "textContent") {
    o && i(o, r, s), e[t] = n ?? "";
    return;
  }
  const a = e.tagName;
  if (t === "value" && a !== "PROGRESS" && // custom elements may use _value internally
  !a.includes("-")) {
    e._value = n;
    const c = a === "OPTION" ? e.getAttribute("value") : e.value, f = n ?? "";
    c !== f && (e.value = f), n == null && e.removeAttribute(t);
    return;
  }
  let l = !1;
  if (n === "" || n == null) {
    const c = typeof e[t];
    c === "boolean" ? n = ja(n) : n == null && c === "string" ? (n = "", l = !0) : c === "number" && (n = 0, l = !0);
  }
  try {
    e[t] = n;
  } catch (c) {
    xn.NODE_ENV !== "production" && !l && un(
      `Failed setting prop "${t}" on <${a.toLowerCase()}>: value ${n} is invalid.`,
      c
    );
  }
  l && e.removeAttribute(t);
}
function En(e, t, n, o) {
  e.addEventListener(t, n, o);
}
function Cd(e, t, n, o) {
  e.removeEventListener(t, n, o);
}
const Gi = Symbol("_vei");
function Dd(e, t, n, o, r = null) {
  const s = e[Gi] || (e[Gi] = {}), i = s[t];
  if (o && i)
    i.value = o;
  else {
    const [a, l] = Td(t);
    if (o) {
      const c = s[t] = kd(o, r);
      En(e, a, c, l);
    } else
      i && (Cd(e, a, i, l), s[t] = void 0);
  }
}
const Ji = /(?:Once|Passive|Capture)$/;
function Td(e) {
  let t;
  if (Ji.test(e)) {
    t = {};
    let o;
    for (; o = e.match(Ji); )
      e = e.slice(0, e.length - o[0].length), t[o[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Bt(e.slice(2)), t];
}
let Tr = 0;
const Ad = /* @__PURE__ */ Promise.resolve(), Vd = () => Tr || (Ad.then(() => Tr = 0), Tr = Date.now());
function kd(e, t) {
  const n = (o) => {
    if (!o._vts)
      o._vts = Date.now();
    else if (o._vts <= n.attached)
      return;
    nt(
      Id(o, n.value),
      t,
      5,
      [o]
    );
  };
  return n.value = e, n.attached = Vd(), n;
}
function Id(e, t) {
  if (W(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((o) => (r) => !r._stopped && o && o(r));
  } else
    return t;
}
const Yi = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, jd = (e, t, n, o, r, s, i, a, l) => {
  const c = r === "svg";
  t === "class" ? Nd(e, o, c) : t === "style" ? Sd(e, n, o) : io(t) ? Bo(t) || Dd(e, t, n, o, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Ld(e, t, o, c)) ? Pd(
    e,
    t,
    o,
    s,
    i,
    a,
    l
  ) : (t === "true-value" ? e._trueValue = o : t === "false-value" && (e._falseValue = o), Rd(e, t, o, c));
};
function Ld(e, t, n, o) {
  if (o)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Yi(t) && z(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return Yi(t) && xe(n) ? !1 : t in e;
}
const Xi = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return W(t) ? (n) => _n(t, n) : t;
};
function Md(e) {
  e.target.composing = !0;
}
function Qi(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const Ar = Symbol("_assign"), Fd = {
  created(e, { modifiers: { lazy: t, trim: n, number: o } }, r) {
    e[Ar] = Xi(r);
    const s = o || r.props && r.props.type === "number";
    En(e, t ? "change" : "input", (i) => {
      if (i.target.composing)
        return;
      let a = e.value;
      n && (a = a.trim()), s && (a = Hr(a)), e[Ar](a);
    }), n && En(e, "change", () => {
      e.value = e.value.trim();
    }), t || (En(e, "compositionstart", Md), En(e, "compositionend", Qi), En(e, "change", Qi));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, modifiers: { lazy: n, trim: o, number: r } }, s) {
    if (e[Ar] = Xi(s), e.composing)
      return;
    const i = r || e.type === "number" ? Hr(e.value) : e.value, a = t ?? "";
    i !== a && (document.activeElement === e && e.type !== "range" && (n || o && e.value.trim() === a) || (e.value = a));
  }
}, Ud = /* @__PURE__ */ Se({ patchProp: jd }, bd);
let Zi;
function Hd() {
  return Zi || (Zi = Xf(Ud));
}
const Bd = (...e) => {
  const t = Hd().createApp(...e);
  xn.NODE_ENV !== "production" && (Wd(t), Kd(t));
  const { mount: n } = t;
  return t.mount = (o) => {
    const r = zd(o);
    if (!r)
      return;
    const s = t._component;
    !z(s) && !s.render && !s.template && (s.template = r.innerHTML), r.innerHTML = "";
    const i = n(r, !1, qd(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), i;
  }, t;
};
function qd(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Wd(e) {
  Object.defineProperty(e.config, "isNativeTag", {
    value: (t) => nu(t) || ou(t) || ru(t),
    writable: !1
  });
}
function Kd(e) {
  {
    const t = e.config.isCustomElement;
    Object.defineProperty(e.config, "isCustomElement", {
      get() {
        return t;
      },
      set() {
        un(
          "The `isCustomElement` config option is deprecated. Use `compilerOptions.isCustomElement` instead."
        );
      }
    });
    const n = e.config.compilerOptions, o = 'The `compilerOptions` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, `compilerOptions` must be passed to `@vue/compiler-dom` in the build setup instead.\n- For vue-loader: pass it via vue-loader\'s `compilerOptions` loader option.\n- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader\n- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc';
    Object.defineProperty(e.config, "compilerOptions", {
      get() {
        return un(o), n;
      },
      set() {
        un(o);
      }
    });
  }
}
function zd(e) {
  if (xe(e)) {
    const t = document.querySelector(e);
    return xn.NODE_ENV !== "production" && !t && un(
      `Failed to mount app: mount target selector "${e}" returned null.`
    ), t;
  }
  return xn.NODE_ENV !== "production" && window.ShadowRoot && e instanceof window.ShadowRoot && e.mode === "closed" && un(
    'mounting on a ShadowRoot with `{mode: "closed"}` may lead to unpredictable bugs'
  ), e;
}
var Gd = {};
function Jd() {
  _d();
}
Gd.NODE_ENV !== "production" && Jd();
var zl = !1;
function Oo(e, t, n) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, t), e.splice(t, 1, n), n) : (e[t] = n, n);
}
function Vr(e, t) {
  if (Array.isArray(e)) {
    e.splice(t, 1);
    return;
  }
  delete e[t];
}
function Yd() {
  return Gl().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function Gl() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof global < "u" ? global : {};
}
const Xd = typeof Proxy == "function", Qd = "devtools-plugin:setup", Zd = "plugin:settings:set";
let mn, as;
function ep() {
  var e;
  return mn !== void 0 || (typeof window < "u" && window.performance ? (mn = !0, as = window.performance) : typeof global < "u" && (!((e = global.perf_hooks) === null || e === void 0) && e.performance) ? (mn = !0, as = global.perf_hooks.performance) : mn = !1), mn;
}
function tp() {
  return ep() ? as.now() : Date.now();
}
class np {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const o = {};
    if (t.settings)
      for (const i in t.settings) {
        const a = t.settings[i];
        o[i] = a.defaultValue;
      }
    const r = `__vue-devtools-plugin-settings__${t.id}`;
    let s = Object.assign({}, o);
    try {
      const i = localStorage.getItem(r), a = JSON.parse(i);
      Object.assign(s, a);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return s;
      },
      setSettings(i) {
        try {
          localStorage.setItem(r, JSON.stringify(i));
        } catch {
        }
        s = i;
      },
      now() {
        return tp();
      }
    }, n && n.on(Zd, (i, a) => {
      i === this.plugin.id && this.fallbacks.setSettings(a);
    }), this.proxiedOn = new Proxy({}, {
      get: (i, a) => this.target ? this.target.on[a] : (...l) => {
        this.onQueue.push({
          method: a,
          args: l
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (i, a) => this.target ? this.target[a] : a === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(a) ? (...l) => (this.targetQueue.push({
        method: a,
        args: l,
        resolve: () => {
        }
      }), this.fallbacks[a](...l)) : (...l) => new Promise((c) => {
        this.targetQueue.push({
          method: a,
          args: l,
          resolve: c
        });
      })
    });
  }
  async setRealTarget(t) {
    this.target = t;
    for (const n of this.onQueue)
      this.target.on[n.method](...n.args);
    for (const n of this.targetQueue)
      n.resolve(await this.target[n.method](...n.args));
  }
}
function Xs(e, t) {
  const n = e, o = Gl(), r = Yd(), s = Xd && n.enableEarlyProxy;
  if (r && (o.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !s))
    r.emit(Qd, e, t);
  else {
    const i = s ? new np(n, r) : null;
    (o.__VUE_DEVTOOLS_PLUGINS__ = o.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: t,
      proxy: i
    }), i && t(i.proxiedTarget);
  }
}
var he = {};
let Bn;
const to = (e) => Bn = e, Jl = he.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function pn(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var pt;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(pt || (pt = {}));
const yr = typeof window < "u", zn = (he.NODE_ENV !== "production" || !1) && he.NODE_ENV !== "test" && yr, ea = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function op(e, { autoBom: t = !1 } = {}) {
  return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function Qs(e, t, n) {
  const o = new XMLHttpRequest();
  o.open("GET", e), o.responseType = "blob", o.onload = function() {
    Ql(o.response, t, n);
  }, o.onerror = function() {
    console.error("could not download file");
  }, o.send();
}
function Yl(e) {
  const t = new XMLHttpRequest();
  t.open("HEAD", e, !1);
  try {
    t.send();
  } catch {
  }
  return t.status >= 200 && t.status <= 299;
}
function jo(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const n = document.createEvent("MouseEvents");
    n.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(n);
  }
}
const Lo = typeof navigator == "object" ? navigator : { userAgent: "" }, Xl = /Macintosh/.test(Lo.userAgent) && /AppleWebKit/.test(Lo.userAgent) && !/Safari/.test(Lo.userAgent), Ql = yr ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !Xl ? rp : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in Lo ? sp : (
      // Fallback to using FileReader and a popup
      ip
    )
  )
) : () => {
};
function rp(e, t = "download", n) {
  const o = document.createElement("a");
  o.download = t, o.rel = "noopener", typeof e == "string" ? (o.href = e, o.origin !== location.origin ? Yl(o.href) ? Qs(e, t, n) : (o.target = "_blank", jo(o)) : jo(o)) : (o.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(o.href);
  }, 4e4), setTimeout(function() {
    jo(o);
  }, 0));
}
function sp(e, t = "download", n) {
  if (typeof e == "string")
    if (Yl(e))
      Qs(e, t, n);
    else {
      const o = document.createElement("a");
      o.href = e, o.target = "_blank", setTimeout(function() {
        jo(o);
      });
    }
  else
    navigator.msSaveOrOpenBlob(op(e, n), t);
}
function ip(e, t, n, o) {
  if (o = o || open("", "_blank"), o && (o.document.title = o.document.body.innerText = "downloading..."), typeof e == "string")
    return Qs(e, t, n);
  const r = e.type === "application/octet-stream", s = /constructor/i.test(String(ea.HTMLElement)) || "safari" in ea, i = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((i || r && s || Xl) && typeof FileReader < "u") {
    const a = new FileReader();
    a.onloadend = function() {
      let l = a.result;
      if (typeof l != "string")
        throw o = null, new Error("Wrong reader.result type");
      l = i ? l : l.replace(/^data:[^;]*;/, "data:attachment/file;"), o ? o.location.href = l : location.assign(l), o = null;
    }, a.readAsDataURL(e);
  } else {
    const a = URL.createObjectURL(e);
    o ? o.location.assign(a) : location.href = a, o = null, setTimeout(function() {
      URL.revokeObjectURL(a);
    }, 4e4);
  }
}
function Ve(e, t) {
  const n = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(n, t) : t === "error" ? console.error(n) : t === "warn" ? console.warn(n) : console.log(n);
}
function Zs(e) {
  return "_a" in e && "install" in e;
}
function Zl() {
  if (!("clipboard" in navigator))
    return Ve("Your browser doesn't support the Clipboard API", "error"), !0;
}
function ec(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (Ve('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function ap(e) {
  if (!Zl())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), Ve("Global state copied to clipboard.");
    } catch (t) {
      if (ec(t))
        return;
      Ve("Failed to serialize the state. Check the console for more details.", "error"), console.error(t);
    }
}
async function lp(e) {
  if (!Zl())
    try {
      tc(e, JSON.parse(await navigator.clipboard.readText())), Ve("Global state pasted from clipboard.");
    } catch (t) {
      if (ec(t))
        return;
      Ve("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(t);
    }
}
async function cp(e) {
  try {
    Ql(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (t) {
    Ve("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(t);
  }
}
let gt;
function up() {
  gt || (gt = document.createElement("input"), gt.type = "file", gt.accept = ".json");
  function e() {
    return new Promise((t, n) => {
      gt.onchange = async () => {
        const o = gt.files;
        if (!o)
          return t(null);
        const r = o.item(0);
        return t(r ? { text: await r.text(), file: r } : null);
      }, gt.oncancel = () => t(null), gt.onerror = n, gt.click();
    });
  }
  return e;
}
async function fp(e) {
  try {
    const n = await up()();
    if (!n)
      return;
    const { text: o, file: r } = n;
    tc(e, JSON.parse(o)), Ve(`Global state imported from "${r.name}".`);
  } catch (t) {
    Ve("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(t);
  }
}
function tc(e, t) {
  for (const n in t) {
    const o = e.state.value[n];
    o ? Object.assign(o, t[n]) : e.state.value[n] = t[n];
  }
}
function Xe(e) {
  return {
    _custom: {
      display: e
    }
  };
}
const nc = "🍍 Pinia (root)", ls = "_root";
function dp(e) {
  return Zs(e) ? {
    id: ls,
    label: nc
  } : {
    id: e.$id,
    label: e.$id
  };
}
function pp(e) {
  if (Zs(e)) {
    const n = Array.from(e._s.keys()), o = e._s;
    return {
      state: n.map((s) => ({
        editable: !0,
        key: s,
        value: e.state.value[s]
      })),
      getters: n.filter((s) => o.get(s)._getters).map((s) => {
        const i = o.get(s);
        return {
          editable: !1,
          key: s,
          value: i._getters.reduce((a, l) => (a[l] = i[l], a), {})
        };
      })
    };
  }
  const t = {
    state: Object.keys(e.$state).map((n) => ({
      editable: !0,
      key: n,
      value: e.$state[n]
    }))
  };
  return e._getters && e._getters.length && (t.getters = e._getters.map((n) => ({
    editable: !1,
    key: n,
    value: e[n]
  }))), e._customProperties.size && (t.customProperties = Array.from(e._customProperties).map((n) => ({
    editable: !0,
    key: n,
    value: e[n]
  }))), t;
}
function hp(e) {
  return e ? Array.isArray(e) ? e.reduce((t, n) => (t.keys.push(n.key), t.operations.push(n.type), t.oldValue[n.key] = n.oldValue, t.newValue[n.key] = n.newValue, t), {
    oldValue: {},
    keys: [],
    operations: [],
    newValue: {}
  }) : {
    operation: Xe(e.type),
    key: Xe(e.key),
    oldValue: e.oldValue,
    newValue: e.newValue
  } : {};
}
function mp(e) {
  switch (e) {
    case pt.direct:
      return "mutation";
    case pt.patchFunction:
      return "$patch";
    case pt.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let vn = !0;
const Mo = [], en = "pinia:mutations", je = "pinia", { assign: gp } = Object, tr = (e) => "🍍 " + e;
function _p(e, t) {
  Xs({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: Mo,
    app: e
  }, (n) => {
    typeof n.now != "function" && Ve("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), n.addTimelineLayer({
      id: en,
      label: "Pinia 🍍",
      color: 15064968
    }), n.addInspector({
      id: je,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            ap(t);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await lp(t), n.sendInspectorTree(je), n.sendInspectorState(je);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            cp(t);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await fp(t), n.sendInspectorTree(je), n.sendInspectorState(je);
          },
          tooltip: "Import the state from a JSON file"
        }
      ],
      nodeActions: [
        {
          icon: "restore",
          tooltip: 'Reset the state (with "$reset")',
          action: (o) => {
            const r = t._s.get(o);
            r ? typeof r.$reset != "function" ? Ve(`Cannot reset "${o}" store because it doesn't have a "$reset" method implemented.`, "warn") : (r.$reset(), Ve(`Store "${o}" reset.`)) : Ve(`Cannot reset "${o}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), n.on.inspectComponent((o, r) => {
      const s = o.componentInstance && o.componentInstance.proxy;
      if (s && s._pStores) {
        const i = o.componentInstance.proxy._pStores;
        Object.values(i).forEach((a) => {
          o.instanceData.state.push({
            type: tr(a.$id),
            key: "state",
            editable: !0,
            value: a._isOptionsAPI ? {
              _custom: {
                value: G(a.$state),
                actions: [
                  {
                    icon: "restore",
                    tooltip: "Reset the state of this store",
                    action: () => a.$reset()
                  }
                ]
              }
            } : (
              // NOTE: workaround to unwrap transferred refs
              Object.keys(a.$state).reduce((l, c) => (l[c] = a.$state[c], l), {})
            )
          }), a._getters && a._getters.length && o.instanceData.state.push({
            type: tr(a.$id),
            key: "getters",
            editable: !1,
            value: a._getters.reduce((l, c) => {
              try {
                l[c] = a[c];
              } catch (f) {
                l[c] = f;
              }
              return l;
            }, {})
          });
        });
      }
    }), n.on.getInspectorTree((o) => {
      if (o.app === e && o.inspectorId === je) {
        let r = [t];
        r = r.concat(Array.from(t._s.values())), o.rootNodes = (o.filter ? r.filter((s) => "$id" in s ? s.$id.toLowerCase().includes(o.filter.toLowerCase()) : nc.toLowerCase().includes(o.filter.toLowerCase())) : r).map(dp);
      }
    }), n.on.getInspectorState((o) => {
      if (o.app === e && o.inspectorId === je) {
        const r = o.nodeId === ls ? t : t._s.get(o.nodeId);
        if (!r)
          return;
        r && (o.state = pp(r));
      }
    }), n.on.editInspectorState((o, r) => {
      if (o.app === e && o.inspectorId === je) {
        const s = o.nodeId === ls ? t : t._s.get(o.nodeId);
        if (!s)
          return Ve(`store "${o.nodeId}" not found`, "error");
        const { path: i } = o;
        Zs(s) ? i.unshift("state") : (i.length !== 1 || !s._customProperties.has(i[0]) || i[0] in s.$state) && i.unshift("$state"), vn = !1, o.set(s, i, o.state.value), vn = !0;
      }
    }), n.on.editComponentState((o) => {
      if (o.type.startsWith("🍍")) {
        const r = o.type.replace(/^🍍\s*/, ""), s = t._s.get(r);
        if (!s)
          return Ve(`store "${r}" not found`, "error");
        const { path: i } = o;
        if (i[0] !== "state")
          return Ve(`Invalid path for store "${r}":
${i}
Only state can be modified.`);
        i[0] = "$state", vn = !1, o.set(s, i, o.state.value), vn = !0;
      }
    });
  });
}
function yp(e, t) {
  Mo.includes(tr(t.$id)) || Mo.push(tr(t.$id)), Xs({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: Mo,
    app: e,
    settings: {
      logStoreChanges: {
        label: "Notify about new/deleted stores",
        type: "boolean",
        defaultValue: !0
      }
      // useEmojis: {
      //   label: 'Use emojis in messages ⚡️',
      //   type: 'boolean',
      //   defaultValue: true,
      // },
    }
  }, (n) => {
    const o = typeof n.now == "function" ? n.now.bind(n) : Date.now;
    t.$onAction(({ after: i, onError: a, name: l, args: c }) => {
      const f = oc++;
      n.addTimelineEvent({
        layerId: en,
        event: {
          time: o(),
          title: "🛫 " + l,
          subtitle: "start",
          data: {
            store: Xe(t.$id),
            action: Xe(l),
            args: c
          },
          groupId: f
        }
      }), i((u) => {
        Ut = void 0, n.addTimelineEvent({
          layerId: en,
          event: {
            time: o(),
            title: "🛬 " + l,
            subtitle: "end",
            data: {
              store: Xe(t.$id),
              action: Xe(l),
              args: c,
              result: u
            },
            groupId: f
          }
        });
      }), a((u) => {
        Ut = void 0, n.addTimelineEvent({
          layerId: en,
          event: {
            time: o(),
            logType: "error",
            title: "💥 " + l,
            subtitle: "end",
            data: {
              store: Xe(t.$id),
              action: Xe(l),
              args: c,
              error: u
            },
            groupId: f
          }
        });
      });
    }, !0), t._customProperties.forEach((i) => {
      ot(() => se(t[i]), (a, l) => {
        n.notifyComponentUpdate(), n.sendInspectorState(je), vn && n.addTimelineEvent({
          layerId: en,
          event: {
            time: o(),
            title: "Change",
            subtitle: i,
            data: {
              newValue: a,
              oldValue: l
            },
            groupId: Ut
          }
        });
      }, { deep: !0 });
    }), t.$subscribe(({ events: i, type: a }, l) => {
      if (n.notifyComponentUpdate(), n.sendInspectorState(je), !vn)
        return;
      const c = {
        time: o(),
        title: mp(a),
        data: gp({ store: Xe(t.$id) }, hp(i)),
        groupId: Ut
      };
      a === pt.patchFunction ? c.subtitle = "⤵️" : a === pt.patchObject ? c.subtitle = "🧩" : i && !Array.isArray(i) && (c.subtitle = i.type), i && (c.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: i
        }
      }), n.addTimelineEvent({
        layerId: en,
        event: c
      });
    }, { detached: !0, flush: "sync" });
    const r = t._hotUpdate;
    t._hotUpdate = Ot((i) => {
      r(i), n.addTimelineEvent({
        layerId: en,
        event: {
          time: o(),
          title: "🔥 " + t.$id,
          subtitle: "HMR update",
          data: {
            store: Xe(t.$id),
            info: Xe("HMR update")
          }
        }
      }), n.notifyComponentUpdate(), n.sendInspectorTree(je), n.sendInspectorState(je);
    });
    const { $dispose: s } = t;
    t.$dispose = () => {
      s(), n.notifyComponentUpdate(), n.sendInspectorTree(je), n.sendInspectorState(je), n.getSettings().logStoreChanges && Ve(`Disposed "${t.$id}" store 🗑`);
    }, n.notifyComponentUpdate(), n.sendInspectorTree(je), n.sendInspectorState(je), n.getSettings().logStoreChanges && Ve(`"${t.$id}" store installed 🆕`);
  });
}
let oc = 0, Ut;
function ta(e, t, n) {
  const o = t.reduce((r, s) => (r[s] = G(e)[s], r), {});
  for (const r in o)
    e[r] = function() {
      const s = oc, i = n ? new Proxy(e, {
        get(...l) {
          return Ut = s, Reflect.get(...l);
        },
        set(...l) {
          return Ut = s, Reflect.set(...l);
        }
      }) : e;
      Ut = s;
      const a = o[r].apply(i, arguments);
      return Ut = void 0, a;
    };
}
function Ep({ app: e, store: t, options: n }) {
  if (t.$id.startsWith("__hot:"))
    return;
  t._isOptionsAPI = !!n.state, ta(t, Object.keys(n.actions), t._isOptionsAPI);
  const o = t._hotUpdate;
  G(t)._hotUpdate = function(r) {
    o.apply(this, arguments), ta(t, Object.keys(r._hmrPayload.actions), !!t._isOptionsAPI);
  }, yp(
    e,
    // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
    t
  );
}
function bp() {
  const e = Fa(!0), t = e.run(() => ye({}));
  let n = [], o = [];
  const r = Ot({
    install(s) {
      to(r), r._a = s, s.provide(Jl, r), s.config.globalProperties.$pinia = r, zn && _p(s, r), o.forEach((i) => n.push(i)), o = [];
    },
    use(s) {
      return !this._a && !zl ? o.push(s) : n.push(s), this;
    },
    _p: n,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return zn && typeof Proxy < "u" && r.use(Ep), r;
}
function rc(e, t) {
  for (const n in t) {
    const o = t[n];
    if (!(n in e))
      continue;
    const r = e[n];
    pn(r) && pn(o) && !Ee(o) && !tt(o) ? e[n] = rc(r, o) : e[n] = o;
  }
  return e;
}
const sc = () => {
};
function na(e, t, n, o = sc) {
  e.push(t);
  const r = () => {
    const s = e.indexOf(t);
    s > -1 && (e.splice(s, 1), o());
  };
  return !n && Ua() && lu(r), r;
}
function gn(e, ...t) {
  e.slice().forEach((n) => {
    n(...t);
  });
}
const vp = (e) => e();
function cs(e, t) {
  e instanceof Map && t instanceof Map && t.forEach((n, o) => e.set(o, n)), e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const o = t[n], r = e[n];
    pn(r) && pn(o) && e.hasOwnProperty(n) && !Ee(o) && !tt(o) ? e[n] = cs(r, o) : e[n] = o;
  }
  return e;
}
const Np = he.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function wp(e) {
  return !pn(e) || !e.hasOwnProperty(Np);
}
const { assign: Ge } = Object;
function oa(e) {
  return !!(Ee(e) && e.effect);
}
function ra(e, t, n, o) {
  const { state: r, actions: s, getters: i } = t, a = n.state.value[e];
  let l;
  function c() {
    !a && (he.NODE_ENV === "production" || !o) && (n.state.value[e] = r ? r() : {});
    const f = he.NODE_ENV !== "production" && o ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      Kr(ye(r ? r() : {}).value)
    ) : Kr(n.state.value[e]);
    return Ge(f, s, Object.keys(i || {}).reduce((u, p) => (he.NODE_ENV !== "production" && p in f && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${p}" in store "${e}".`), u[p] = Ot(_e(() => {
      to(n);
      const g = n._s.get(e);
      return i[p].call(g, g);
    })), u), {}));
  }
  return l = us(e, c, t, n, o, !0), l;
}
function us(e, t, n = {}, o, r, s) {
  let i;
  const a = Ge({ actions: {} }, n);
  if (he.NODE_ENV !== "production" && !o._e.active)
    throw new Error("Pinia destroyed");
  const l = {
    deep: !0
    // flush: 'post',
  };
  he.NODE_ENV !== "production" && !zl && (l.onTrigger = (F) => {
    c ? g = F : c == !1 && !C._hotUpdating && (Array.isArray(g) ? g.push(F) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let c, f, u = [], p = [], g;
  const y = o.state.value[e];
  !s && !y && (he.NODE_ENV === "production" || !r) && (o.state.value[e] = {});
  const N = ye({});
  let $;
  function O(F) {
    let L;
    c = f = !1, he.NODE_ENV !== "production" && (g = []), typeof F == "function" ? (F(o.state.value[e]), L = {
      type: pt.patchFunction,
      storeId: e,
      events: g
    }) : (cs(o.state.value[e], F), L = {
      type: pt.patchObject,
      payload: F,
      storeId: e,
      events: g
    });
    const oe = $ = Symbol();
    Jo().then(() => {
      $ === oe && (c = !0);
    }), f = !0, gn(u, L, o.state.value[e]);
  }
  const A = s ? function() {
    const { state: L } = n, oe = L ? L() : {};
    this.$patch((be) => {
      Ge(be, oe);
    });
  } : (
    /* istanbul ignore next */
    he.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : sc
  );
  function k() {
    i.stop(), u = [], p = [], o._s.delete(e);
  }
  function K(F, L) {
    return function() {
      to(o);
      const oe = Array.from(arguments), be = [], rt = [];
      function Ue(q) {
        be.push(q);
      }
      function De(q) {
        rt.push(q);
      }
      gn(p, {
        args: oe,
        name: F,
        store: C,
        after: Ue,
        onError: De
      });
      let J;
      try {
        J = L.apply(this && this.$id === e ? this : C, oe);
      } catch (q) {
        throw gn(rt, q), q;
      }
      return J instanceof Promise ? J.then((q) => (gn(be, q), q)).catch((q) => (gn(rt, q), Promise.reject(q))) : (gn(be, J), J);
    };
  }
  const ne = /* @__PURE__ */ Ot({
    actions: {},
    getters: {},
    state: [],
    hotState: N
  }), le = {
    _p: o,
    // _s: scope,
    $id: e,
    $onAction: na.bind(null, p),
    $patch: O,
    $reset: A,
    $subscribe(F, L = {}) {
      const oe = na(u, F, L.detached, () => be()), be = i.run(() => ot(() => o.state.value[e], (rt) => {
        (L.flush === "sync" ? f : c) && F({
          storeId: e,
          type: pt.direct,
          events: g
        }, rt);
      }, Ge({}, l, L)));
      return oe;
    },
    $dispose: k
  }, C = ao(he.NODE_ENV !== "production" || zn ? Ge(
    {
      _hmrPayload: ne,
      _customProperties: Ot(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    le
    // must be added later
    // setupStore
  ) : le);
  o._s.set(e, C);
  const ge = (o._a && o._a.runWithContext || vp)(() => o._e.run(() => (i = Fa()).run(t)));
  for (const F in ge) {
    const L = ge[F];
    if (Ee(L) && !oa(L) || tt(L))
      he.NODE_ENV !== "production" && r ? Oo(N.value, F, Po(ge, F)) : s || (y && wp(L) && (Ee(L) ? L.value = y[F] : cs(L, y[F])), o.state.value[e][F] = L), he.NODE_ENV !== "production" && ne.state.push(F);
    else if (typeof L == "function") {
      const oe = he.NODE_ENV !== "production" && r ? L : K(F, L);
      ge[F] = oe, he.NODE_ENV !== "production" && (ne.actions[F] = L), a.actions[F] = L;
    } else
      he.NODE_ENV !== "production" && oa(L) && (ne.getters[F] = s ? (
        // @ts-expect-error
        n.getters[F]
      ) : L, yr && (ge._getters || // @ts-expect-error: same
      (ge._getters = Ot([]))).push(F));
  }
  if (Ge(C, ge), Ge(G(C), ge), Object.defineProperty(C, "$state", {
    get: () => he.NODE_ENV !== "production" && r ? N.value : o.state.value[e],
    set: (F) => {
      if (he.NODE_ENV !== "production" && r)
        throw new Error("cannot set hotState");
      O((L) => {
        Ge(L, F);
      });
    }
  }), he.NODE_ENV !== "production" && (C._hotUpdate = Ot((F) => {
    C._hotUpdating = !0, F._hmrPayload.state.forEach((L) => {
      if (L in C.$state) {
        const oe = F.$state[L], be = C.$state[L];
        typeof oe == "object" && pn(oe) && pn(be) ? rc(oe, be) : F.$state[L] = be;
      }
      Oo(C, L, Po(F.$state, L));
    }), Object.keys(C.$state).forEach((L) => {
      L in F.$state || Vr(C, L);
    }), c = !1, f = !1, o.state.value[e] = Po(F._hmrPayload, "hotState"), f = !0, Jo().then(() => {
      c = !0;
    });
    for (const L in F._hmrPayload.actions) {
      const oe = F[L];
      Oo(C, L, K(L, oe));
    }
    for (const L in F._hmrPayload.getters) {
      const oe = F._hmrPayload.getters[L], be = s ? (
        // special handling of options api
        _e(() => (to(o), oe.call(C, C)))
      ) : oe;
      Oo(C, L, be);
    }
    Object.keys(C._hmrPayload.getters).forEach((L) => {
      L in F._hmrPayload.getters || Vr(C, L);
    }), Object.keys(C._hmrPayload.actions).forEach((L) => {
      L in F._hmrPayload.actions || Vr(C, L);
    }), C._hmrPayload = F._hmrPayload, C._getters = F._getters, C._hotUpdating = !1;
  })), zn) {
    const F = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((L) => {
      Object.defineProperty(C, L, Ge({ value: C[L] }, F));
    });
  }
  return o._p.forEach((F) => {
    if (zn) {
      const L = i.run(() => F({
        store: C,
        app: o._a,
        pinia: o,
        options: a
      }));
      Object.keys(L || {}).forEach((oe) => C._customProperties.add(oe)), Ge(C, L);
    } else
      Ge(C, i.run(() => F({
        store: C,
        app: o._a,
        pinia: o,
        options: a
      })));
  }), he.NODE_ENV !== "production" && C.$state && typeof C.$state == "object" && typeof C.$state.constructor == "function" && !C.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${C.$id}".`), y && s && n.hydrate && n.hydrate(C.$state, y), c = !0, f = !0, C;
}
function ei(e, t, n) {
  let o, r;
  const s = typeof t == "function";
  if (typeof e == "string")
    o = e, r = s ? n : t;
  else if (r = e, o = e.id, he.NODE_ENV !== "production" && typeof o != "string")
    throw new Error('[🍍]: "defineStore()" must be passed a store id as its first argument.');
  function i(a, l) {
    const c = Lf();
    if (a = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (he.NODE_ENV === "test" && Bn && Bn._testing ? null : a) || (c ? dt(Jl, null) : null), a && to(a), he.NODE_ENV !== "production" && !Bn)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    a = Bn, a._s.has(o) || (s ? us(o, t, r, a) : ra(o, r, a), he.NODE_ENV !== "production" && (i._pinia = a));
    const f = a._s.get(o);
    if (he.NODE_ENV !== "production" && l) {
      const u = "__hot:" + o, p = s ? us(u, t, r, a, !0) : ra(u, Ge({}, r), a, !0);
      l._hotUpdate(p), delete a.state.value[u], a._s.delete(u);
    }
    if (he.NODE_ENV !== "production" && yr) {
      const u = Js();
      if (u && u.proxy && // avoid adding stores that are just built for hot module replacement
      !l) {
        const p = u.proxy, g = "_pStores" in p ? p._pStores : p._pStores = {};
        g[o] = f;
      }
    }
    return f;
  }
  return i.$id = o, i;
}
function Op(e) {
  {
    e = G(e);
    const t = {};
    for (const n in e) {
      const o = e[n];
      (Ee(o) || tt(o)) && (t[n] = // ---
      Po(e, n));
    }
    return t;
  }
}
function ic(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: Sp } = Object.prototype, { getPrototypeOf: ti } = Object, Er = /* @__PURE__ */ ((e) => (t) => {
  const n = Sp.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), mt = (e) => (e = e.toLowerCase(), (t) => Er(t) === e), br = (e) => (t) => typeof t === e, { isArray: Cn } = Array, no = br("undefined");
function xp(e) {
  return e !== null && !no(e) && e.constructor !== null && !no(e.constructor) && Je(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const ac = mt("ArrayBuffer");
function $p(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && ac(e.buffer), t;
}
const Rp = br("string"), Je = br("function"), lc = br("number"), vr = (e) => e !== null && typeof e == "object", Pp = (e) => e === !0 || e === !1, Fo = (e) => {
  if (Er(e) !== "object")
    return !1;
  const t = ti(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, Cp = mt("Date"), Dp = mt("File"), Tp = mt("Blob"), Ap = mt("FileList"), Vp = (e) => vr(e) && Je(e.pipe), kp = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || Je(e.append) && ((t = Er(e)) === "formdata" || // detect form-data instance
  t === "object" && Je(e.toString) && e.toString() === "[object FormData]"));
}, Ip = mt("URLSearchParams"), jp = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function po(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let o, r;
  if (typeof e != "object" && (e = [e]), Cn(e))
    for (o = 0, r = e.length; o < r; o++)
      t.call(null, e[o], o, e);
  else {
    const s = n ? Object.getOwnPropertyNames(e) : Object.keys(e), i = s.length;
    let a;
    for (o = 0; o < i; o++)
      a = s[o], t.call(null, e[a], a, e);
  }
}
function cc(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let o = n.length, r;
  for (; o-- > 0; )
    if (r = n[o], t === r.toLowerCase())
      return r;
  return null;
}
const uc = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, fc = (e) => !no(e) && e !== uc;
function fs() {
  const { caseless: e } = fc(this) && this || {}, t = {}, n = (o, r) => {
    const s = e && cc(t, r) || r;
    Fo(t[s]) && Fo(o) ? t[s] = fs(t[s], o) : Fo(o) ? t[s] = fs({}, o) : Cn(o) ? t[s] = o.slice() : t[s] = o;
  };
  for (let o = 0, r = arguments.length; o < r; o++)
    arguments[o] && po(arguments[o], n);
  return t;
}
const Lp = (e, t, n, { allOwnKeys: o } = {}) => (po(t, (r, s) => {
  n && Je(r) ? e[s] = ic(r, n) : e[s] = r;
}, { allOwnKeys: o }), e), Mp = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Fp = (e, t, n, o) => {
  e.prototype = Object.create(t.prototype, o), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, Up = (e, t, n, o) => {
  let r, s, i;
  const a = {};
  if (t = t || {}, e == null)
    return t;
  do {
    for (r = Object.getOwnPropertyNames(e), s = r.length; s-- > 0; )
      i = r[s], (!o || o(i, e, t)) && !a[i] && (t[i] = e[i], a[i] = !0);
    e = n !== !1 && ti(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, Hp = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const o = e.indexOf(t, n);
  return o !== -1 && o === n;
}, Bp = (e) => {
  if (!e)
    return null;
  if (Cn(e))
    return e;
  let t = e.length;
  if (!lc(t))
    return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, qp = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && ti(Uint8Array)), Wp = (e, t) => {
  const o = (e && e[Symbol.iterator]).call(e);
  let r;
  for (; (r = o.next()) && !r.done; ) {
    const s = r.value;
    t.call(e, s[0], s[1]);
  }
}, Kp = (e, t) => {
  let n;
  const o = [];
  for (; (n = e.exec(t)) !== null; )
    o.push(n);
  return o;
}, zp = mt("HTMLFormElement"), Gp = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, o, r) {
    return o.toUpperCase() + r;
  }
), sa = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), Jp = mt("RegExp"), dc = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), o = {};
  po(n, (r, s) => {
    let i;
    (i = t(r, s, e)) !== !1 && (o[s] = i || r);
  }), Object.defineProperties(e, o);
}, Yp = (e) => {
  dc(e, (t, n) => {
    if (Je(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const o = e[n];
    if (Je(o)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, Xp = (e, t) => {
  const n = {}, o = (r) => {
    r.forEach((s) => {
      n[s] = !0;
    });
  };
  return Cn(e) ? o(e) : o(String(e).split(t)), n;
}, Qp = () => {
}, Zp = (e, t) => (e = +e, Number.isFinite(e) ? e : t), kr = "abcdefghijklmnopqrstuvwxyz", ia = "0123456789", pc = {
  DIGIT: ia,
  ALPHA: kr,
  ALPHA_DIGIT: kr + kr.toUpperCase() + ia
}, eh = (e = 16, t = pc.ALPHA_DIGIT) => {
  let n = "";
  const { length: o } = t;
  for (; e--; )
    n += t[Math.random() * o | 0];
  return n;
};
function th(e) {
  return !!(e && Je(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const nh = (e) => {
  const t = new Array(10), n = (o, r) => {
    if (vr(o)) {
      if (t.indexOf(o) >= 0)
        return;
      if (!("toJSON" in o)) {
        t[r] = o;
        const s = Cn(o) ? [] : {};
        return po(o, (i, a) => {
          const l = n(i, r + 1);
          !no(l) && (s[a] = l);
        }), t[r] = void 0, s;
      }
    }
    return o;
  };
  return n(e, 0);
}, oh = mt("AsyncFunction"), rh = (e) => e && (vr(e) || Je(e)) && Je(e.then) && Je(e.catch), w = {
  isArray: Cn,
  isArrayBuffer: ac,
  isBuffer: xp,
  isFormData: kp,
  isArrayBufferView: $p,
  isString: Rp,
  isNumber: lc,
  isBoolean: Pp,
  isObject: vr,
  isPlainObject: Fo,
  isUndefined: no,
  isDate: Cp,
  isFile: Dp,
  isBlob: Tp,
  isRegExp: Jp,
  isFunction: Je,
  isStream: Vp,
  isURLSearchParams: Ip,
  isTypedArray: qp,
  isFileList: Ap,
  forEach: po,
  merge: fs,
  extend: Lp,
  trim: jp,
  stripBOM: Mp,
  inherits: Fp,
  toFlatObject: Up,
  kindOf: Er,
  kindOfTest: mt,
  endsWith: Hp,
  toArray: Bp,
  forEachEntry: Wp,
  matchAll: Kp,
  isHTMLForm: zp,
  hasOwnProperty: sa,
  hasOwnProp: sa,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: dc,
  freezeMethods: Yp,
  toObjectSet: Xp,
  toCamelCase: Gp,
  noop: Qp,
  toFiniteNumber: Zp,
  findKey: cc,
  global: uc,
  isContextDefined: fc,
  ALPHABET: pc,
  generateString: eh,
  isSpecCompliantForm: th,
  toJSONObject: nh,
  isAsyncFn: oh,
  isThenable: rh
};
function ue(e, t, n, o, r) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), o && (this.request = o), r && (this.response = r);
}
w.inherits(ue, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: w.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const hc = ue.prototype, mc = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((e) => {
  mc[e] = { value: e };
});
Object.defineProperties(ue, mc);
Object.defineProperty(hc, "isAxiosError", { value: !0 });
ue.from = (e, t, n, o, r, s) => {
  const i = Object.create(hc);
  return w.toFlatObject(e, i, function(l) {
    return l !== Error.prototype;
  }, (a) => a !== "isAxiosError"), ue.call(i, e.message, t, n, o, r), i.cause = e, i.name = e.name, s && Object.assign(i, s), i;
};
const sh = null;
function ds(e) {
  return w.isPlainObject(e) || w.isArray(e);
}
function gc(e) {
  return w.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function aa(e, t, n) {
  return e ? e.concat(t).map(function(r, s) {
    return r = gc(r), !n && s ? "[" + r + "]" : r;
  }).join(n ? "." : "") : t;
}
function ih(e) {
  return w.isArray(e) && !e.some(ds);
}
const ah = w.toFlatObject(w, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function Nr(e, t, n) {
  if (!w.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = w.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(N, $) {
    return !w.isUndefined($[N]);
  });
  const o = n.metaTokens, r = n.visitor || f, s = n.dots, i = n.indexes, l = (n.Blob || typeof Blob < "u" && Blob) && w.isSpecCompliantForm(t);
  if (!w.isFunction(r))
    throw new TypeError("visitor must be a function");
  function c(y) {
    if (y === null)
      return "";
    if (w.isDate(y))
      return y.toISOString();
    if (!l && w.isBlob(y))
      throw new ue("Blob is not supported. Use a Buffer instead.");
    return w.isArrayBuffer(y) || w.isTypedArray(y) ? l && typeof Blob == "function" ? new Blob([y]) : Buffer.from(y) : y;
  }
  function f(y, N, $) {
    let O = y;
    if (y && !$ && typeof y == "object") {
      if (w.endsWith(N, "{}"))
        N = o ? N : N.slice(0, -2), y = JSON.stringify(y);
      else if (w.isArray(y) && ih(y) || (w.isFileList(y) || w.endsWith(N, "[]")) && (O = w.toArray(y)))
        return N = gc(N), O.forEach(function(k, K) {
          !(w.isUndefined(k) || k === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            i === !0 ? aa([N], K, s) : i === null ? N : N + "[]",
            c(k)
          );
        }), !1;
    }
    return ds(y) ? !0 : (t.append(aa($, N, s), c(y)), !1);
  }
  const u = [], p = Object.assign(ah, {
    defaultVisitor: f,
    convertValue: c,
    isVisitable: ds
  });
  function g(y, N) {
    if (!w.isUndefined(y)) {
      if (u.indexOf(y) !== -1)
        throw Error("Circular reference detected in " + N.join("."));
      u.push(y), w.forEach(y, function(O, A) {
        (!(w.isUndefined(O) || O === null) && r.call(
          t,
          O,
          w.isString(A) ? A.trim() : A,
          N,
          p
        )) === !0 && g(O, N ? N.concat(A) : [A]);
      }), u.pop();
    }
  }
  if (!w.isObject(e))
    throw new TypeError("data must be an object");
  return g(e), t;
}
function la(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(o) {
    return t[o];
  });
}
function ni(e, t) {
  this._pairs = [], e && Nr(e, this, t);
}
const _c = ni.prototype;
_c.append = function(t, n) {
  this._pairs.push([t, n]);
};
_c.toString = function(t) {
  const n = t ? function(o) {
    return t.call(this, o, la);
  } : la;
  return this._pairs.map(function(r) {
    return n(r[0]) + "=" + n(r[1]);
  }, "").join("&");
};
function lh(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function yc(e, t, n) {
  if (!t)
    return e;
  const o = n && n.encode || lh, r = n && n.serialize;
  let s;
  if (r ? s = r(t, n) : s = w.isURLSearchParams(t) ? t.toString() : new ni(t, n).toString(o), s) {
    const i = e.indexOf("#");
    i !== -1 && (e = e.slice(0, i)), e += (e.indexOf("?") === -1 ? "?" : "&") + s;
  }
  return e;
}
class ca {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, n, o) {
    return this.handlers.push({
      fulfilled: t,
      rejected: n,
      synchronous: o ? o.synchronous : !1,
      runWhen: o ? o.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    w.forEach(this.handlers, function(o) {
      o !== null && t(o);
    });
  }
}
const Ec = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, ch = typeof URLSearchParams < "u" ? URLSearchParams : ni, uh = typeof FormData < "u" ? FormData : null, fh = typeof Blob < "u" ? Blob : null, dh = {
  isBrowser: !0,
  classes: {
    URLSearchParams: ch,
    FormData: uh,
    Blob: fh
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, bc = typeof window < "u" && typeof document < "u", ph = ((e) => bc && ["ReactNative", "NativeScript", "NS"].indexOf(e) < 0)(typeof navigator < "u" && navigator.product), hh = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", mh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: bc,
  hasStandardBrowserEnv: ph,
  hasStandardBrowserWebWorkerEnv: hh
}, Symbol.toStringTag, { value: "Module" })), ut = {
  ...mh,
  ...dh
};
function gh(e, t) {
  return Nr(e, new ut.classes.URLSearchParams(), Object.assign({
    visitor: function(n, o, r, s) {
      return ut.isNode && w.isBuffer(n) ? (this.append(o, n.toString("base64")), !1) : s.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function _h(e) {
  return w.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function yh(e) {
  const t = {}, n = Object.keys(e);
  let o;
  const r = n.length;
  let s;
  for (o = 0; o < r; o++)
    s = n[o], t[s] = e[s];
  return t;
}
function vc(e) {
  function t(n, o, r, s) {
    let i = n[s++];
    if (i === "__proto__")
      return !0;
    const a = Number.isFinite(+i), l = s >= n.length;
    return i = !i && w.isArray(r) ? r.length : i, l ? (w.hasOwnProp(r, i) ? r[i] = [r[i], o] : r[i] = o, !a) : ((!r[i] || !w.isObject(r[i])) && (r[i] = []), t(n, o, r[i], s) && w.isArray(r[i]) && (r[i] = yh(r[i])), !a);
  }
  if (w.isFormData(e) && w.isFunction(e.entries)) {
    const n = {};
    return w.forEachEntry(e, (o, r) => {
      t(_h(o), r, n, 0);
    }), n;
  }
  return null;
}
function Eh(e, t, n) {
  if (w.isString(e))
    try {
      return (t || JSON.parse)(e), w.trim(e);
    } catch (o) {
      if (o.name !== "SyntaxError")
        throw o;
    }
  return (n || JSON.stringify)(e);
}
const oi = {
  transitional: Ec,
  adapter: ["xhr", "http"],
  transformRequest: [function(t, n) {
    const o = n.getContentType() || "", r = o.indexOf("application/json") > -1, s = w.isObject(t);
    if (s && w.isHTMLForm(t) && (t = new FormData(t)), w.isFormData(t))
      return r ? JSON.stringify(vc(t)) : t;
    if (w.isArrayBuffer(t) || w.isBuffer(t) || w.isStream(t) || w.isFile(t) || w.isBlob(t))
      return t;
    if (w.isArrayBufferView(t))
      return t.buffer;
    if (w.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let a;
    if (s) {
      if (o.indexOf("application/x-www-form-urlencoded") > -1)
        return gh(t, this.formSerializer).toString();
      if ((a = w.isFileList(t)) || o.indexOf("multipart/form-data") > -1) {
        const l = this.env && this.env.FormData;
        return Nr(
          a ? { "files[]": t } : t,
          l && new l(),
          this.formSerializer
        );
      }
    }
    return s || r ? (n.setContentType("application/json", !1), Eh(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || oi.transitional, o = n && n.forcedJSONParsing, r = this.responseType === "json";
    if (t && w.isString(t) && (o && !this.responseType || r)) {
      const i = !(n && n.silentJSONParsing) && r;
      try {
        return JSON.parse(t);
      } catch (a) {
        if (i)
          throw a.name === "SyntaxError" ? ue.from(a, ue.ERR_BAD_RESPONSE, this, null, this.response) : a;
      }
    }
    return t;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: ut.classes.FormData,
    Blob: ut.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
w.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  oi.headers[e] = {};
});
const ri = oi, bh = w.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), vh = (e) => {
  const t = {};
  let n, o, r;
  return e && e.split(`
`).forEach(function(i) {
    r = i.indexOf(":"), n = i.substring(0, r).trim().toLowerCase(), o = i.substring(r + 1).trim(), !(!n || t[n] && bh[n]) && (n === "set-cookie" ? t[n] ? t[n].push(o) : t[n] = [o] : t[n] = t[n] ? t[n] + ", " + o : o);
  }), t;
}, ua = Symbol("internals");
function jn(e) {
  return e && String(e).trim().toLowerCase();
}
function Uo(e) {
  return e === !1 || e == null ? e : w.isArray(e) ? e.map(Uo) : String(e);
}
function Nh(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let o;
  for (; o = n.exec(e); )
    t[o[1]] = o[2];
  return t;
}
const wh = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Ir(e, t, n, o, r) {
  if (w.isFunction(o))
    return o.call(this, t, n);
  if (r && (t = n), !!w.isString(t)) {
    if (w.isString(o))
      return t.indexOf(o) !== -1;
    if (w.isRegExp(o))
      return o.test(t);
  }
}
function Oh(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, o) => n.toUpperCase() + o);
}
function Sh(e, t) {
  const n = w.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((o) => {
    Object.defineProperty(e, o + n, {
      value: function(r, s, i) {
        return this[o].call(this, t, r, s, i);
      },
      configurable: !0
    });
  });
}
class wr {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, o) {
    const r = this;
    function s(a, l, c) {
      const f = jn(l);
      if (!f)
        throw new Error("header name must be a non-empty string");
      const u = w.findKey(r, f);
      (!u || r[u] === void 0 || c === !0 || c === void 0 && r[u] !== !1) && (r[u || l] = Uo(a));
    }
    const i = (a, l) => w.forEach(a, (c, f) => s(c, f, l));
    return w.isPlainObject(t) || t instanceof this.constructor ? i(t, n) : w.isString(t) && (t = t.trim()) && !wh(t) ? i(vh(t), n) : t != null && s(n, t, o), this;
  }
  get(t, n) {
    if (t = jn(t), t) {
      const o = w.findKey(this, t);
      if (o) {
        const r = this[o];
        if (!n)
          return r;
        if (n === !0)
          return Nh(r);
        if (w.isFunction(n))
          return n.call(this, r, o);
        if (w.isRegExp(n))
          return n.exec(r);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = jn(t), t) {
      const o = w.findKey(this, t);
      return !!(o && this[o] !== void 0 && (!n || Ir(this, this[o], o, n)));
    }
    return !1;
  }
  delete(t, n) {
    const o = this;
    let r = !1;
    function s(i) {
      if (i = jn(i), i) {
        const a = w.findKey(o, i);
        a && (!n || Ir(o, o[a], a, n)) && (delete o[a], r = !0);
      }
    }
    return w.isArray(t) ? t.forEach(s) : s(t), r;
  }
  clear(t) {
    const n = Object.keys(this);
    let o = n.length, r = !1;
    for (; o--; ) {
      const s = n[o];
      (!t || Ir(this, this[s], s, t, !0)) && (delete this[s], r = !0);
    }
    return r;
  }
  normalize(t) {
    const n = this, o = {};
    return w.forEach(this, (r, s) => {
      const i = w.findKey(o, s);
      if (i) {
        n[i] = Uo(r), delete n[s];
        return;
      }
      const a = t ? Oh(s) : String(s).trim();
      a !== s && delete n[s], n[a] = Uo(r), o[a] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return w.forEach(this, (o, r) => {
      o != null && o !== !1 && (n[r] = t && w.isArray(o) ? o.join(", ") : o);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const o = new this(t);
    return n.forEach((r) => o.set(r)), o;
  }
  static accessor(t) {
    const o = (this[ua] = this[ua] = {
      accessors: {}
    }).accessors, r = this.prototype;
    function s(i) {
      const a = jn(i);
      o[a] || (Sh(r, i), o[a] = !0);
    }
    return w.isArray(t) ? t.forEach(s) : s(t), this;
  }
}
wr.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
w.reduceDescriptors(wr.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(o) {
      this[n] = o;
    }
  };
});
w.freezeMethods(wr);
const xt = wr;
function jr(e, t) {
  const n = this || ri, o = t || n, r = xt.from(o.headers);
  let s = o.data;
  return w.forEach(e, function(a) {
    s = a.call(n, s, r.normalize(), t ? t.status : void 0);
  }), r.normalize(), s;
}
function Nc(e) {
  return !!(e && e.__CANCEL__);
}
function ho(e, t, n) {
  ue.call(this, e ?? "canceled", ue.ERR_CANCELED, t, n), this.name = "CanceledError";
}
w.inherits(ho, ue, {
  __CANCEL__: !0
});
function xh(e, t, n) {
  const o = n.config.validateStatus;
  !n.status || !o || o(n.status) ? e(n) : t(new ue(
    "Request failed with status code " + n.status,
    [ue.ERR_BAD_REQUEST, ue.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
const $h = ut.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, n, o, r, s) {
      const i = [e + "=" + encodeURIComponent(t)];
      w.isNumber(n) && i.push("expires=" + new Date(n).toGMTString()), w.isString(o) && i.push("path=" + o), w.isString(r) && i.push("domain=" + r), s === !0 && i.push("secure"), document.cookie = i.join("; ");
    },
    read(e) {
      const t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
      return t ? decodeURIComponent(t[3]) : null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function Rh(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Ph(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function wc(e, t) {
  return e && !Rh(t) ? Ph(e, t) : t;
}
const Ch = ut.hasStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function() {
    const t = /(msie|trident)/i.test(navigator.userAgent), n = document.createElement("a");
    let o;
    function r(s) {
      let i = s;
      return t && (n.setAttribute("href", i), i = n.href), n.setAttribute("href", i), {
        href: n.href,
        protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
        host: n.host,
        search: n.search ? n.search.replace(/^\?/, "") : "",
        hash: n.hash ? n.hash.replace(/^#/, "") : "",
        hostname: n.hostname,
        port: n.port,
        pathname: n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname
      };
    }
    return o = r(window.location.href), function(i) {
      const a = w.isString(i) ? r(i) : i;
      return a.protocol === o.protocol && a.host === o.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  /* @__PURE__ */ function() {
    return function() {
      return !0;
    };
  }()
);
function Dh(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function Th(e, t) {
  e = e || 10;
  const n = new Array(e), o = new Array(e);
  let r = 0, s = 0, i;
  return t = t !== void 0 ? t : 1e3, function(l) {
    const c = Date.now(), f = o[s];
    i || (i = c), n[r] = l, o[r] = c;
    let u = s, p = 0;
    for (; u !== r; )
      p += n[u++], u = u % e;
    if (r = (r + 1) % e, r === s && (s = (s + 1) % e), c - i < t)
      return;
    const g = f && c - f;
    return g ? Math.round(p * 1e3 / g) : void 0;
  };
}
function fa(e, t) {
  let n = 0;
  const o = Th(50, 250);
  return (r) => {
    const s = r.loaded, i = r.lengthComputable ? r.total : void 0, a = s - n, l = o(a), c = s <= i;
    n = s;
    const f = {
      loaded: s,
      total: i,
      progress: i ? s / i : void 0,
      bytes: a,
      rate: l || void 0,
      estimated: l && i && c ? (i - s) / l : void 0,
      event: r
    };
    f[t ? "download" : "upload"] = !0, e(f);
  };
}
const Ah = typeof XMLHttpRequest < "u", Vh = Ah && function(e) {
  return new Promise(function(n, o) {
    let r = e.data;
    const s = xt.from(e.headers).normalize();
    let { responseType: i, withXSRFToken: a } = e, l;
    function c() {
      e.cancelToken && e.cancelToken.unsubscribe(l), e.signal && e.signal.removeEventListener("abort", l);
    }
    let f;
    if (w.isFormData(r)) {
      if (ut.hasStandardBrowserEnv || ut.hasStandardBrowserWebWorkerEnv)
        s.setContentType(!1);
      else if ((f = s.getContentType()) !== !1) {
        const [N, ...$] = f ? f.split(";").map((O) => O.trim()).filter(Boolean) : [];
        s.setContentType([N || "multipart/form-data", ...$].join("; "));
      }
    }
    let u = new XMLHttpRequest();
    if (e.auth) {
      const N = e.auth.username || "", $ = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
      s.set("Authorization", "Basic " + btoa(N + ":" + $));
    }
    const p = wc(e.baseURL, e.url);
    u.open(e.method.toUpperCase(), yc(p, e.params, e.paramsSerializer), !0), u.timeout = e.timeout;
    function g() {
      if (!u)
        return;
      const N = xt.from(
        "getAllResponseHeaders" in u && u.getAllResponseHeaders()
      ), O = {
        data: !i || i === "text" || i === "json" ? u.responseText : u.response,
        status: u.status,
        statusText: u.statusText,
        headers: N,
        config: e,
        request: u
      };
      xh(function(k) {
        n(k), c();
      }, function(k) {
        o(k), c();
      }, O), u = null;
    }
    if ("onloadend" in u ? u.onloadend = g : u.onreadystatechange = function() {
      !u || u.readyState !== 4 || u.status === 0 && !(u.responseURL && u.responseURL.indexOf("file:") === 0) || setTimeout(g);
    }, u.onabort = function() {
      u && (o(new ue("Request aborted", ue.ECONNABORTED, e, u)), u = null);
    }, u.onerror = function() {
      o(new ue("Network Error", ue.ERR_NETWORK, e, u)), u = null;
    }, u.ontimeout = function() {
      let $ = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded";
      const O = e.transitional || Ec;
      e.timeoutErrorMessage && ($ = e.timeoutErrorMessage), o(new ue(
        $,
        O.clarifyTimeoutError ? ue.ETIMEDOUT : ue.ECONNABORTED,
        e,
        u
      )), u = null;
    }, ut.hasStandardBrowserEnv && (a && w.isFunction(a) && (a = a(e)), a || a !== !1 && Ch(p))) {
      const N = e.xsrfHeaderName && e.xsrfCookieName && $h.read(e.xsrfCookieName);
      N && s.set(e.xsrfHeaderName, N);
    }
    r === void 0 && s.setContentType(null), "setRequestHeader" in u && w.forEach(s.toJSON(), function($, O) {
      u.setRequestHeader(O, $);
    }), w.isUndefined(e.withCredentials) || (u.withCredentials = !!e.withCredentials), i && i !== "json" && (u.responseType = e.responseType), typeof e.onDownloadProgress == "function" && u.addEventListener("progress", fa(e.onDownloadProgress, !0)), typeof e.onUploadProgress == "function" && u.upload && u.upload.addEventListener("progress", fa(e.onUploadProgress)), (e.cancelToken || e.signal) && (l = (N) => {
      u && (o(!N || N.type ? new ho(null, e, u) : N), u.abort(), u = null);
    }, e.cancelToken && e.cancelToken.subscribe(l), e.signal && (e.signal.aborted ? l() : e.signal.addEventListener("abort", l)));
    const y = Dh(p);
    if (y && ut.protocols.indexOf(y) === -1) {
      o(new ue("Unsupported protocol " + y + ":", ue.ERR_BAD_REQUEST, e));
      return;
    }
    u.send(r || null);
  });
}, ps = {
  http: sh,
  xhr: Vh
};
w.forEach(ps, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const da = (e) => `- ${e}`, kh = (e) => w.isFunction(e) || e === null || e === !1, Oc = {
  getAdapter: (e) => {
    e = w.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, o;
    const r = {};
    for (let s = 0; s < t; s++) {
      n = e[s];
      let i;
      if (o = n, !kh(n) && (o = ps[(i = String(n)).toLowerCase()], o === void 0))
        throw new ue(`Unknown adapter '${i}'`);
      if (o)
        break;
      r[i || "#" + s] = o;
    }
    if (!o) {
      const s = Object.entries(r).map(
        ([a, l]) => `adapter ${a} ` + (l === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let i = t ? s.length > 1 ? `since :
` + s.map(da).join(`
`) : " " + da(s[0]) : "as no adapter specified";
      throw new ue(
        "There is no suitable adapter to dispatch the request " + i,
        "ERR_NOT_SUPPORT"
      );
    }
    return o;
  },
  adapters: ps
};
function Lr(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new ho(null, e);
}
function pa(e) {
  return Lr(e), e.headers = xt.from(e.headers), e.data = jr.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), Oc.getAdapter(e.adapter || ri.adapter)(e).then(function(o) {
    return Lr(e), o.data = jr.call(
      e,
      e.transformResponse,
      o
    ), o.headers = xt.from(o.headers), o;
  }, function(o) {
    return Nc(o) || (Lr(e), o && o.response && (o.response.data = jr.call(
      e,
      e.transformResponse,
      o.response
    ), o.response.headers = xt.from(o.response.headers))), Promise.reject(o);
  });
}
const ha = (e) => e instanceof xt ? e.toJSON() : e;
function $n(e, t) {
  t = t || {};
  const n = {};
  function o(c, f, u) {
    return w.isPlainObject(c) && w.isPlainObject(f) ? w.merge.call({ caseless: u }, c, f) : w.isPlainObject(f) ? w.merge({}, f) : w.isArray(f) ? f.slice() : f;
  }
  function r(c, f, u) {
    if (w.isUndefined(f)) {
      if (!w.isUndefined(c))
        return o(void 0, c, u);
    } else
      return o(c, f, u);
  }
  function s(c, f) {
    if (!w.isUndefined(f))
      return o(void 0, f);
  }
  function i(c, f) {
    if (w.isUndefined(f)) {
      if (!w.isUndefined(c))
        return o(void 0, c);
    } else
      return o(void 0, f);
  }
  function a(c, f, u) {
    if (u in t)
      return o(c, f);
    if (u in e)
      return o(void 0, c);
  }
  const l = {
    url: s,
    method: s,
    data: s,
    baseURL: i,
    transformRequest: i,
    transformResponse: i,
    paramsSerializer: i,
    timeout: i,
    timeoutMessage: i,
    withCredentials: i,
    withXSRFToken: i,
    adapter: i,
    responseType: i,
    xsrfCookieName: i,
    xsrfHeaderName: i,
    onUploadProgress: i,
    onDownloadProgress: i,
    decompress: i,
    maxContentLength: i,
    maxBodyLength: i,
    beforeRedirect: i,
    transport: i,
    httpAgent: i,
    httpsAgent: i,
    cancelToken: i,
    socketPath: i,
    responseEncoding: i,
    validateStatus: a,
    headers: (c, f) => r(ha(c), ha(f), !0)
  };
  return w.forEach(Object.keys(Object.assign({}, e, t)), function(f) {
    const u = l[f] || r, p = u(e[f], t[f], f);
    w.isUndefined(p) && u !== a || (n[f] = p);
  }), n;
}
const Sc = "1.6.7", si = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  si[e] = function(o) {
    return typeof o === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const ma = {};
si.transitional = function(t, n, o) {
  function r(s, i) {
    return "[Axios v" + Sc + "] Transitional option '" + s + "'" + i + (o ? ". " + o : "");
  }
  return (s, i, a) => {
    if (t === !1)
      throw new ue(
        r(i, " has been removed" + (n ? " in " + n : "")),
        ue.ERR_DEPRECATED
      );
    return n && !ma[i] && (ma[i] = !0, console.warn(
      r(
        i,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(s, i, a) : !0;
  };
};
function Ih(e, t, n) {
  if (typeof e != "object")
    throw new ue("options must be an object", ue.ERR_BAD_OPTION_VALUE);
  const o = Object.keys(e);
  let r = o.length;
  for (; r-- > 0; ) {
    const s = o[r], i = t[s];
    if (i) {
      const a = e[s], l = a === void 0 || i(a, s, e);
      if (l !== !0)
        throw new ue("option " + s + " must be " + l, ue.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new ue("Unknown option " + s, ue.ERR_BAD_OPTION);
  }
}
const hs = {
  assertOptions: Ih,
  validators: si
}, At = hs.validators;
class nr {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new ca(),
      response: new ca()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (o) {
      if (o instanceof Error) {
        let r;
        Error.captureStackTrace ? Error.captureStackTrace(r = {}) : r = new Error();
        const s = r.stack ? r.stack.replace(/^.+\n/, "") : "";
        o.stack ? s && !String(o.stack).endsWith(s.replace(/^.+\n.+\n/, "")) && (o.stack += `
` + s) : o.stack = s;
      }
      throw o;
    }
  }
  _request(t, n) {
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = $n(this.defaults, n);
    const { transitional: o, paramsSerializer: r, headers: s } = n;
    o !== void 0 && hs.assertOptions(o, {
      silentJSONParsing: At.transitional(At.boolean),
      forcedJSONParsing: At.transitional(At.boolean),
      clarifyTimeoutError: At.transitional(At.boolean)
    }, !1), r != null && (w.isFunction(r) ? n.paramsSerializer = {
      serialize: r
    } : hs.assertOptions(r, {
      encode: At.function,
      serialize: At.function
    }, !0)), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let i = s && w.merge(
      s.common,
      s[n.method]
    );
    s && w.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (y) => {
        delete s[y];
      }
    ), n.headers = xt.concat(i, s);
    const a = [];
    let l = !0;
    this.interceptors.request.forEach(function(N) {
      typeof N.runWhen == "function" && N.runWhen(n) === !1 || (l = l && N.synchronous, a.unshift(N.fulfilled, N.rejected));
    });
    const c = [];
    this.interceptors.response.forEach(function(N) {
      c.push(N.fulfilled, N.rejected);
    });
    let f, u = 0, p;
    if (!l) {
      const y = [pa.bind(this), void 0];
      for (y.unshift.apply(y, a), y.push.apply(y, c), p = y.length, f = Promise.resolve(n); u < p; )
        f = f.then(y[u++], y[u++]);
      return f;
    }
    p = a.length;
    let g = n;
    for (u = 0; u < p; ) {
      const y = a[u++], N = a[u++];
      try {
        g = y(g);
      } catch ($) {
        N.call(this, $);
        break;
      }
    }
    try {
      f = pa.call(this, g);
    } catch (y) {
      return Promise.reject(y);
    }
    for (u = 0, p = c.length; u < p; )
      f = f.then(c[u++], c[u++]);
    return f;
  }
  getUri(t) {
    t = $n(this.defaults, t);
    const n = wc(t.baseURL, t.url);
    return yc(n, t.params, t.paramsSerializer);
  }
}
w.forEach(["delete", "get", "head", "options"], function(t) {
  nr.prototype[t] = function(n, o) {
    return this.request($n(o || {}, {
      method: t,
      url: n,
      data: (o || {}).data
    }));
  };
});
w.forEach(["post", "put", "patch"], function(t) {
  function n(o) {
    return function(s, i, a) {
      return this.request($n(a || {}, {
        method: t,
        headers: o ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: s,
        data: i
      }));
    };
  }
  nr.prototype[t] = n(), nr.prototype[t + "Form"] = n(!0);
});
const Ho = nr;
class ii {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(s) {
      n = s;
    });
    const o = this;
    this.promise.then((r) => {
      if (!o._listeners)
        return;
      let s = o._listeners.length;
      for (; s-- > 0; )
        o._listeners[s](r);
      o._listeners = null;
    }), this.promise.then = (r) => {
      let s;
      const i = new Promise((a) => {
        o.subscribe(a), s = a;
      }).then(r);
      return i.cancel = function() {
        o.unsubscribe(s);
      }, i;
    }, t(function(s, i, a) {
      o.reason || (o.reason = new ho(s, i, a), n(o.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new ii(function(r) {
        t = r;
      }),
      cancel: t
    };
  }
}
const jh = ii;
function Lh(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function Mh(e) {
  return w.isObject(e) && e.isAxiosError === !0;
}
const ms = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(ms).forEach(([e, t]) => {
  ms[t] = e;
});
const Fh = ms;
function xc(e) {
  const t = new Ho(e), n = ic(Ho.prototype.request, t);
  return w.extend(n, Ho.prototype, t, { allOwnKeys: !0 }), w.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(r) {
    return xc($n(e, r));
  }, n;
}
const Ce = xc(ri);
Ce.Axios = Ho;
Ce.CanceledError = ho;
Ce.CancelToken = jh;
Ce.isCancel = Nc;
Ce.VERSION = Sc;
Ce.toFormData = Nr;
Ce.AxiosError = ue;
Ce.Cancel = Ce.CanceledError;
Ce.all = function(t) {
  return Promise.all(t);
};
Ce.spread = Lh;
Ce.isAxiosError = Mh;
Ce.mergeConfig = $n;
Ce.AxiosHeaders = xt;
Ce.formToJSON = (e) => vc(w.isHTMLForm(e) ? new FormData(e) : e);
Ce.getAdapter = Oc.getAdapter;
Ce.HttpStatusCode = Fh;
Ce.default = Ce;
var On;
const tn = class tn {
  constructor(t, n, o = "api") {
    gi(this, On, {
      page: "api",
      type: "module",
      prefix: "REPLACE_WITH_MODULE_NAME",
      route: ""
    });
    _o(this, On).prefix = n, _o(this, On).page = o, this.client = Ce.create({
      baseURL: t,
      timeout: 6e4,
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      },
      params: this.getDefaultParams()
    });
  }
  getDefaultParams() {
    const n = new URL(location.href).searchParams, o = { ..._o(this, On) }, r = ["type", "page"];
    for (const [s, i] of n)
      r.includes(s) || (o[s] = i);
    return window.redcap_csrf_token && (o.redcap_csrf_token = window.redcap_csrf_token), o;
  }
  static makeRoute(t, n = {}) {
    return n.params = n.params || {}, n.params.route = encodeURIComponent(t), n;
  }
  read(t, n = {}) {
    return n = tn.makeRoute(t, n), this.client.get("", n);
  }
  readOne(t, n, o = {}) {
    return o = tn.makeRoute(`${t}/${n}`, o), this.client.get("", o);
  }
  create(t, n, o = {}) {
    return o = tn.makeRoute(`${t}`, o), this.client.post("", n, o);
  }
  update(t, n, o, r = {}) {
    return r = tn.makeRoute(`${t}/${n}`, r), this.client.put("", o, r);
  }
  delete(t, n, o = {}) {
    return o = tn.makeRoute(`${t}/${n}`, o), this.client.delete(t, o);
  }
};
On = new WeakMap();
let oo = tn;
const ai = "/api/", li = "epic_participant_updater", ci = ei("settings", () => {
  const e = new oo(ai, li), t = async () => (await e.read("settings")).data, n = async () => await e.create("regenerate_token"), o = ye({}), r = ye({}), s = ye([]), i = ye("");
  async function a() {
    const l = await t();
    o.value = (l == null ? void 0 : l.api_token_data) ?? {}, r.value = (l == null ? void 0 : l.app_settings) ?? {}, s.value = (l == null ? void 0 : l.projects) ?? [], i.value = (l == null ? void 0 : l.epic_upload_url) ?? "";
  }
  return {
    init: a,
    regenerateToken: n,
    api_token_data: o,
    app_settings: r,
    projects: s,
    epic_upload_url: i
  };
}), Uh = ei("logs", () => {
  const e = new oo(ai, li), t = (O, A = 1) => {
    const k = parseInt(O, 10);
    return Number.isNaN(k) || k < 1 ? A : k;
  }, n = ye([]), o = ye({}), r = ye(!1), s = ye(), i = ye(1), a = ye(25), l = ye(""), c = ye(0), f = _e(() => {
    var A;
    const O = parseInt(((A = o.value) == null ? void 0 : A.total) ?? 0, 10);
    return Number.isNaN(O) || O < 0 ? 0 : O;
  }), u = _e(() => {
    const O = t(a.value, 25);
    return Math.max(1, Math.ceil(f.value / O));
  }), p = async (O = 1, A = a.value, k = l.value) => {
    const K = {
      _page: O,
      _per_page: A
    };
    return k && (K.q = k), (await e.read("logs", { params: K })).data;
  }, g = async (O = 1, A) => {
    const k = c.value + 1;
    c.value = k, r.value = !0;
    const K = t(O, 1), ne = t(A ?? a.value, 25);
    try {
      const le = await p(K, ne, l.value);
      if (k !== c.value)
        return;
      n.value = [...(le == null ? void 0 : le.data) ?? []], o.value = (le == null ? void 0 : le.metadata) ?? {}, s.value = void 0;
    } catch (le) {
      if (k !== c.value)
        return;
      s.value = le;
    } finally {
      k === c.value && (r.value = !1);
    }
  }, y = () => g(i.value, a.value), N = () => {
    r.value !== !0 && i.value !== u.value && (i.value = i.value + 1);
  }, $ = () => {
    r.value !== !0 && (i.value <= 1 || (i.value = i.value - 1));
  };
  return ot([i, a], () => {
    g(i.value, a.value);
  }, { immediate: !0 }), ot(l, () => {
    if (i.value === 1) {
      g(i.value, a.value);
      return;
    }
    i.value = 1;
  }), {
    getList: p,
    goToNextPage: N,
    goToPrevPage: $,
    refresh: y,
    error: s,
    loading: r,
    page: i,
    perPage: a,
    query: l,
    total: f,
    totalPages: u,
    logs: n,
    metadata: o
  };
}), Hh = ei("logArchives", () => {
  const e = new oo(ai, li), t = ye([]), n = ye({}), o = ye(!1), r = ye(), s = _e(() => {
    var l;
    const a = parseInt(((l = n.value) == null ? void 0 : l.total) ?? t.value.length, 10);
    return Number.isNaN(a) || a < 0 ? 0 : a;
  });
  return {
    archives: t,
    metadata: n,
    loading: o,
    error: r,
    total: s,
    loadList: async () => {
      var a, l;
      o.value = !0;
      try {
        const c = await e.read("archives");
        t.value = [...((a = c.data) == null ? void 0 : a.data) ?? []], n.value = ((l = c.data) == null ? void 0 : l.metadata) ?? {}, r.value = void 0;
      } catch (c) {
        r.value = c;
      } finally {
        o.value = !1;
      }
    }
  };
}), Bh = {
  key: 0,
  class: "d-flex gap-2 align-items-center p-2"
}, qh = /* @__PURE__ */ m("i", { class: "fas fa-spinner fa-spin fa-fw" }, null, -1), Wh = /* @__PURE__ */ m("span", null, "Loading...", -1), Kh = [
  qh,
  Wh
], zh = {
  __name: "App",
  setup(e) {
    const t = ci(), n = ye(!1);
    return ye(), qs(async () => {
      n.value = !0, await t.init(), n.value = !1;
    }), (o, r) => {
      const s = Us("router-view");
      return n.value ? (te(), ce("div", Bh, Kh)) : (te(), pr(s, { key: 1 }));
    };
  }
};
var X = {};
const wt = typeof window < "u";
function Gh(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const fe = Object.assign;
function Mr(e, t) {
  const n = {};
  for (const o in t) {
    const r = t[o];
    n[o] = We(r) ? r.map(e) : e(r);
  }
  return n;
}
const Gn = () => {
}, We = Array.isArray;
function ae(e) {
  const t = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + e].concat(t));
}
const Jh = /\/$/, Yh = (e) => e.replace(Jh, "");
function Fr(e, t, n = "/") {
  let o, r = {}, s = "", i = "";
  const a = t.indexOf("#");
  let l = t.indexOf("?");
  return a < l && a >= 0 && (l = -1), l > -1 && (o = t.slice(0, l), s = t.slice(l + 1, a > -1 ? a : t.length), r = e(s)), a > -1 && (o = o || t.slice(0, a), i = t.slice(a, t.length)), o = Zh(o ?? t, n), {
    fullPath: o + (s && "?") + s + i,
    path: o,
    query: r,
    hash: i
  };
}
function Xh(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function ga(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function _a(e, t, n) {
  const o = t.matched.length - 1, r = n.matched.length - 1;
  return o > -1 && o === r && zt(t.matched[o], n.matched[r]) && $c(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function zt(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function $c(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (!Qh(e[n], t[n]))
      return !1;
  return !0;
}
function Qh(e, t) {
  return We(e) ? ya(e, t) : We(t) ? ya(t, e) : e === t;
}
function ya(e, t) {
  return We(t) ? e.length === t.length && e.every((n, o) => n === t[o]) : e.length === 1 && e[0] === t;
}
function Zh(e, t) {
  if (e.startsWith("/"))
    return e;
  if (X.NODE_ENV !== "production" && !t.startsWith("/"))
    return ae(`Cannot resolve a relative location without an absolute path. Trying to resolve "${e}" from "${t}". It should look like "/${t}".`), e;
  if (!e)
    return t;
  const n = t.split("/"), o = e.split("/"), r = o[o.length - 1];
  (r === ".." || r === ".") && o.push("");
  let s = n.length - 1, i, a;
  for (i = 0; i < o.length; i++)
    if (a = o[i], a !== ".")
      if (a === "..")
        s > 1 && s--;
      else
        break;
  return n.slice(0, s).join("/") + "/" + o.slice(i - (i === o.length ? 1 : 0)).join("/");
}
var ro;
(function(e) {
  e.pop = "pop", e.push = "push";
})(ro || (ro = {}));
var Jn;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(Jn || (Jn = {}));
function em(e) {
  if (!e)
    if (wt) {
      const t = document.querySelector("base");
      e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
    } else
      e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Yh(e);
}
const tm = /^[^#]+#/;
function nm(e, t) {
  return e.replace(tm, "#") + t;
}
function om(e, t) {
  const n = document.documentElement.getBoundingClientRect(), o = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: o.left - n.left - (t.left || 0),
    top: o.top - n.top - (t.top || 0)
  };
}
const Or = () => ({
  left: window.pageXOffset,
  top: window.pageYOffset
});
function rm(e) {
  let t;
  if ("el" in e) {
    const n = e.el, o = typeof n == "string" && n.startsWith("#");
    if (X.NODE_ENV !== "production" && typeof e.el == "string" && (!o || !document.getElementById(e.el.slice(1))))
      try {
        const s = document.querySelector(e.el);
        if (o && s) {
          ae(`The selector "${e.el}" should be passed as "el: document.querySelector('${e.el}')" because it starts with "#".`);
          return;
        }
      } catch {
        ae(`The selector "${e.el}" is invalid. If you are using an id selector, make sure to escape it. You can find more information about escaping characters in selectors at https://mathiasbynens.be/notes/css-escapes or use CSS.escape (https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape).`);
        return;
      }
    const r = typeof n == "string" ? o ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
    if (!r) {
      X.NODE_ENV !== "production" && ae(`Couldn't find element using selector "${e.el}" returned by scrollBehavior.`);
      return;
    }
    t = om(r, e);
  } else
    t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.pageXOffset, t.top != null ? t.top : window.pageYOffset);
}
function Ea(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const gs = /* @__PURE__ */ new Map();
function sm(e, t) {
  gs.set(e, t);
}
function im(e) {
  const t = gs.get(e);
  return gs.delete(e), t;
}
let am = () => location.protocol + "//" + location.host;
function Rc(e, t) {
  const { pathname: n, search: o, hash: r } = t, s = e.indexOf("#");
  if (s > -1) {
    let a = r.includes(e.slice(s)) ? e.slice(s).length : 1, l = r.slice(a);
    return l[0] !== "/" && (l = "/" + l), ga(l, "");
  }
  return ga(n, e) + o + r;
}
function lm(e, t, n, o) {
  let r = [], s = [], i = null;
  const a = ({ state: p }) => {
    const g = Rc(e, location), y = n.value, N = t.value;
    let $ = 0;
    if (p) {
      if (n.value = g, t.value = p, i && i === y) {
        i = null;
        return;
      }
      $ = N ? p.position - N.position : 0;
    } else
      o(g);
    r.forEach((O) => {
      O(n.value, y, {
        delta: $,
        type: ro.pop,
        direction: $ ? $ > 0 ? Jn.forward : Jn.back : Jn.unknown
      });
    });
  };
  function l() {
    i = n.value;
  }
  function c(p) {
    r.push(p);
    const g = () => {
      const y = r.indexOf(p);
      y > -1 && r.splice(y, 1);
    };
    return s.push(g), g;
  }
  function f() {
    const { history: p } = window;
    p.state && p.replaceState(fe({}, p.state, { scroll: Or() }), "");
  }
  function u() {
    for (const p of s)
      p();
    s = [], window.removeEventListener("popstate", a), window.removeEventListener("beforeunload", f);
  }
  return window.addEventListener("popstate", a), window.addEventListener("beforeunload", f, {
    passive: !0
  }), {
    pauseListeners: l,
    listen: c,
    destroy: u
  };
}
function ba(e, t, n, o = !1, r = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: o,
    position: window.history.length,
    scroll: r ? Or() : null
  };
}
function cm(e) {
  const { history: t, location: n } = window, o = {
    value: Rc(e, n)
  }, r = { value: t.state };
  r.value || s(o.value, {
    back: null,
    current: o.value,
    forward: null,
    // the length is off by one, we need to decrease it
    position: t.length - 1,
    replaced: !0,
    // don't add a scroll as the user may have an anchor, and we want
    // scrollBehavior to be triggered without a saved position
    scroll: null
  }, !0);
  function s(l, c, f) {
    const u = e.indexOf("#"), p = u > -1 ? (n.host && document.querySelector("base") ? e : e.slice(u)) + l : am() + e + l;
    try {
      t[f ? "replaceState" : "pushState"](c, "", p), r.value = c;
    } catch (g) {
      X.NODE_ENV !== "production" ? ae("Error with push/replace State", g) : console.error(g), n[f ? "replace" : "assign"](p);
    }
  }
  function i(l, c) {
    const f = fe({}, t.state, ba(
      r.value.back,
      // keep back and forward entries but override current position
      l,
      r.value.forward,
      !0
    ), c, { position: r.value.position });
    s(l, f, !0), o.value = l;
  }
  function a(l, c) {
    const f = fe(
      {},
      // use current history state to gracefully handle a wrong call to
      // history.replaceState
      // https://github.com/vuejs/router/issues/366
      r.value,
      t.state,
      {
        forward: l,
        scroll: Or()
      }
    );
    X.NODE_ENV !== "production" && !t.state && ae(`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:

history.replaceState(history.state, '', url)

You can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state.`), s(f.current, f, !0);
    const u = fe({}, ba(o.value, l, null), { position: f.position + 1 }, c);
    s(l, u, !1), o.value = l;
  }
  return {
    location: o,
    state: r,
    push: a,
    replace: i
  };
}
function um(e) {
  e = em(e);
  const t = cm(e), n = lm(e, t.state, t.location, t.replace);
  function o(s, i = !0) {
    i || n.pauseListeners(), history.go(s);
  }
  const r = fe({
    // it's overridden right after
    location: "",
    base: e,
    go: o,
    createHref: nm.bind(null, e)
  }, t, n);
  return Object.defineProperty(r, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(r, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), r;
}
function fm(e) {
  return e = location.host ? e || location.pathname + location.search : "", e.includes("#") || (e += "#"), X.NODE_ENV !== "production" && !e.endsWith("#/") && !e.endsWith("#") && ae(`A hash base must end with a "#":
"${e}" should be "${e.replace(/#.*$/, "#")}".`), um(e);
}
function dm(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function Pc(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const Vt = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
}, _s = Symbol(X.NODE_ENV !== "production" ? "navigation failure" : "");
var va;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})(va || (va = {}));
const pm = {
  1({ location: e, currentLocation: t }) {
    return `No match for
 ${JSON.stringify(e)}${t ? `
while being at
` + JSON.stringify(t) : ""}`;
  },
  2({ from: e, to: t }) {
    return `Redirected from "${e.fullPath}" to "${mm(t)}" via a navigation guard.`;
  },
  4({ from: e, to: t }) {
    return `Navigation aborted from "${e.fullPath}" to "${t.fullPath}" via a navigation guard.`;
  },
  8({ from: e, to: t }) {
    return `Navigation cancelled from "${e.fullPath}" to "${t.fullPath}" with a new navigation.`;
  },
  16({ from: e, to: t }) {
    return `Avoided redundant navigation to current location: "${e.fullPath}".`;
  }
};
function Rn(e, t) {
  return X.NODE_ENV !== "production" ? fe(new Error(pm[e](t)), {
    type: e,
    [_s]: !0
  }, t) : fe(new Error(), {
    type: e,
    [_s]: !0
  }, t);
}
function _t(e, t) {
  return e instanceof Error && _s in e && (t == null || !!(e.type & t));
}
const hm = ["params", "query", "hash"];
function mm(e) {
  if (typeof e == "string")
    return e;
  if ("path" in e)
    return e.path;
  const t = {};
  for (const n of hm)
    n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
const Na = "[^/]+?", gm = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
}, _m = /[.+*?^${}()[\]/\\]/g;
function ym(e, t) {
  const n = fe({}, gm, t), o = [];
  let r = n.start ? "^" : "";
  const s = [];
  for (const c of e) {
    const f = c.length ? [] : [
      90
      /* PathScore.Root */
    ];
    n.strict && !c.length && (r += "/");
    for (let u = 0; u < c.length; u++) {
      const p = c[u];
      let g = 40 + (n.sensitive ? 0.25 : 0);
      if (p.type === 0)
        u || (r += "/"), r += p.value.replace(_m, "\\$&"), g += 40;
      else if (p.type === 1) {
        const { value: y, repeatable: N, optional: $, regexp: O } = p;
        s.push({
          name: y,
          repeatable: N,
          optional: $
        });
        const A = O || Na;
        if (A !== Na) {
          g += 10;
          try {
            new RegExp(`(${A})`);
          } catch (K) {
            throw new Error(`Invalid custom RegExp for param "${y}" (${A}): ` + K.message);
          }
        }
        let k = N ? `((?:${A})(?:/(?:${A}))*)` : `(${A})`;
        u || (k = // avoid an optional / if there are more segments e.g. /:p?-static
        // or /:p?-:p2
        $ && c.length < 2 ? `(?:/${k})` : "/" + k), $ && (k += "?"), r += k, g += 20, $ && (g += -8), N && (g += -20), A === ".*" && (g += -50);
      }
      f.push(g);
    }
    o.push(f);
  }
  if (n.strict && n.end) {
    const c = o.length - 1;
    o[c][o[c].length - 1] += 0.7000000000000001;
  }
  n.strict || (r += "/?"), n.end ? r += "$" : n.strict && (r += "(?:/|$)");
  const i = new RegExp(r, n.sensitive ? "" : "i");
  function a(c) {
    const f = c.match(i), u = {};
    if (!f)
      return null;
    for (let p = 1; p < f.length; p++) {
      const g = f[p] || "", y = s[p - 1];
      u[y.name] = g && y.repeatable ? g.split("/") : g;
    }
    return u;
  }
  function l(c) {
    let f = "", u = !1;
    for (const p of e) {
      (!u || !f.endsWith("/")) && (f += "/"), u = !1;
      for (const g of p)
        if (g.type === 0)
          f += g.value;
        else if (g.type === 1) {
          const { value: y, repeatable: N, optional: $ } = g, O = y in c ? c[y] : "";
          if (We(O) && !N)
            throw new Error(`Provided param "${y}" is an array but it is not repeatable (* or + modifiers)`);
          const A = We(O) ? O.join("/") : O;
          if (!A)
            if ($)
              p.length < 2 && (f.endsWith("/") ? f = f.slice(0, -1) : u = !0);
            else
              throw new Error(`Missing required param "${y}"`);
          f += A;
        }
    }
    return f || "/";
  }
  return {
    re: i,
    score: o,
    keys: s,
    parse: a,
    stringify: l
  };
}
function Em(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const o = t[n] - e[n];
    if (o)
      return o;
    n++;
  }
  return e.length < t.length ? e.length === 1 && e[0] === 80 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 80 ? 1 : -1 : 0;
}
function bm(e, t) {
  let n = 0;
  const o = e.score, r = t.score;
  for (; n < o.length && n < r.length; ) {
    const s = Em(o[n], r[n]);
    if (s)
      return s;
    n++;
  }
  if (Math.abs(r.length - o.length) === 1) {
    if (wa(o))
      return 1;
    if (wa(r))
      return -1;
  }
  return r.length - o.length;
}
function wa(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const vm = {
  type: 0,
  value: ""
}, Nm = /[a-zA-Z0-9_]/;
function wm(e) {
  if (!e)
    return [[]];
  if (e === "/")
    return [[vm]];
  if (!e.startsWith("/"))
    throw new Error(X.NODE_ENV !== "production" ? `Route paths should start with a "/": "${e}" should be "/${e}".` : `Invalid path "${e}"`);
  function t(g) {
    throw new Error(`ERR (${n})/"${c}": ${g}`);
  }
  let n = 0, o = n;
  const r = [];
  let s;
  function i() {
    s && r.push(s), s = [];
  }
  let a = 0, l, c = "", f = "";
  function u() {
    c && (n === 0 ? s.push({
      type: 0,
      value: c
    }) : n === 1 || n === 2 || n === 3 ? (s.length > 1 && (l === "*" || l === "+") && t(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`), s.push({
      type: 1,
      value: c,
      regexp: f,
      repeatable: l === "*" || l === "+",
      optional: l === "*" || l === "?"
    })) : t("Invalid state to consume buffer"), c = "");
  }
  function p() {
    c += l;
  }
  for (; a < e.length; ) {
    if (l = e[a++], l === "\\" && n !== 2) {
      o = n, n = 4;
      continue;
    }
    switch (n) {
      case 0:
        l === "/" ? (c && u(), i()) : l === ":" ? (u(), n = 1) : p();
        break;
      case 4:
        p(), n = o;
        break;
      case 1:
        l === "(" ? n = 2 : Nm.test(l) ? p() : (u(), n = 0, l !== "*" && l !== "?" && l !== "+" && a--);
        break;
      case 2:
        l === ")" ? f[f.length - 1] == "\\" ? f = f.slice(0, -1) + l : n = 3 : f += l;
        break;
      case 3:
        u(), n = 0, l !== "*" && l !== "?" && l !== "+" && a--, f = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${c}"`), u(), i(), r;
}
function Om(e, t, n) {
  const o = ym(wm(e.path), n);
  if (X.NODE_ENV !== "production") {
    const s = /* @__PURE__ */ new Set();
    for (const i of o.keys)
      s.has(i.name) && ae(`Found duplicated params with name "${i.name}" for path "${e.path}". Only the last one will be available on "$route.params".`), s.add(i.name);
  }
  const r = fe(o, {
    record: e,
    parent: t,
    // these needs to be populated by the parent
    children: [],
    alias: []
  });
  return t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r;
}
function Sm(e, t) {
  const n = [], o = /* @__PURE__ */ new Map();
  t = xa({ strict: !1, end: !0, sensitive: !1 }, t);
  function r(f) {
    return o.get(f);
  }
  function s(f, u, p) {
    const g = !p, y = xm(f);
    X.NODE_ENV !== "production" && Cm(y, u), y.aliasOf = p && p.record;
    const N = xa(t, f), $ = [
      y
    ];
    if ("alias" in f) {
      const k = typeof f.alias == "string" ? [f.alias] : f.alias;
      for (const K of k)
        $.push(fe({}, y, {
          // this allows us to hold a copy of the `components` option
          // so that async components cache is hold on the original record
          components: p ? p.record.components : y.components,
          path: K,
          // we might be the child of an alias
          aliasOf: p ? p.record : y
          // the aliases are always of the same kind as the original since they
          // are defined on the same record
        }));
    }
    let O, A;
    for (const k of $) {
      const { path: K } = k;
      if (u && K[0] !== "/") {
        const ne = u.record.path, le = ne[ne.length - 1] === "/" ? "" : "/";
        k.path = u.record.path + (K && le + K);
      }
      if (X.NODE_ENV !== "production" && k.path === "*")
        throw new Error(`Catch all routes ("*") must now be defined using a param with a custom regexp.
See more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.`);
      if (O = Om(k, u, N), X.NODE_ENV !== "production" && u && K[0] === "/" && Dm(O, u), p ? (p.alias.push(O), X.NODE_ENV !== "production" && Pm(p, O)) : (A = A || O, A !== O && A.alias.push(O), g && f.name && !Sa(O) && i(f.name)), y.children) {
        const ne = y.children;
        for (let le = 0; le < ne.length; le++)
          s(ne[le], O, p && p.children[le]);
      }
      p = p || O, (O.record.components && Object.keys(O.record.components).length || O.record.name || O.record.redirect) && l(O);
    }
    return A ? () => {
      i(A);
    } : Gn;
  }
  function i(f) {
    if (Pc(f)) {
      const u = o.get(f);
      u && (o.delete(f), n.splice(n.indexOf(u), 1), u.children.forEach(i), u.alias.forEach(i));
    } else {
      const u = n.indexOf(f);
      u > -1 && (n.splice(u, 1), f.record.name && o.delete(f.record.name), f.children.forEach(i), f.alias.forEach(i));
    }
  }
  function a() {
    return n;
  }
  function l(f) {
    let u = 0;
    for (; u < n.length && bm(f, n[u]) >= 0 && // Adding children with empty path should still appear before the parent
    // https://github.com/vuejs/router/issues/1124
    (f.record.path !== n[u].record.path || !Cc(f, n[u])); )
      u++;
    n.splice(u, 0, f), f.record.name && !Sa(f) && o.set(f.record.name, f);
  }
  function c(f, u) {
    let p, g = {}, y, N;
    if ("name" in f && f.name) {
      if (p = o.get(f.name), !p)
        throw Rn(1, {
          location: f
        });
      if (X.NODE_ENV !== "production") {
        const A = Object.keys(f.params || {}).filter((k) => !p.keys.find((K) => K.name === k));
        A.length && ae(`Discarded invalid param(s) "${A.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
      }
      N = p.record.name, g = fe(
        // paramsFromLocation is a new object
        Oa(
          u.params,
          // only keep params that exist in the resolved location
          // TODO: only keep optional params coming from a parent record
          p.keys.filter((A) => !A.optional).map((A) => A.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        f.params && Oa(f.params, p.keys.map((A) => A.name))
      ), y = p.stringify(g);
    } else if ("path" in f)
      y = f.path, X.NODE_ENV !== "production" && !y.startsWith("/") && ae(`The Matcher cannot resolve relative paths but received "${y}". Unless you directly called \`matcher.resolve("${y}")\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.`), p = n.find((A) => A.re.test(y)), p && (g = p.parse(y), N = p.record.name);
    else {
      if (p = u.name ? o.get(u.name) : n.find((A) => A.re.test(u.path)), !p)
        throw Rn(1, {
          location: f,
          currentLocation: u
        });
      N = p.record.name, g = fe({}, u.params, f.params), y = p.stringify(g);
    }
    const $ = [];
    let O = p;
    for (; O; )
      $.unshift(O.record), O = O.parent;
    return {
      name: N,
      path: y,
      params: g,
      matched: $,
      meta: Rm($)
    };
  }
  return e.forEach((f) => s(f)), { addRoute: s, resolve: c, removeRoute: i, getRoutes: a, getRecordMatcher: r };
}
function Oa(e, t) {
  const n = {};
  for (const o of t)
    o in e && (n[o] = e[o]);
  return n;
}
function xm(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: $m(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
}
function $m(e) {
  const t = {}, n = e.props || !1;
  if ("component" in e)
    t.default = n;
  else
    for (const o in e.components)
      t[o] = typeof n == "object" ? n[o] : n;
  return t;
}
function Sa(e) {
  for (; e; ) {
    if (e.record.aliasOf)
      return !0;
    e = e.parent;
  }
  return !1;
}
function Rm(e) {
  return e.reduce((t, n) => fe(t, n.meta), {});
}
function xa(e, t) {
  const n = {};
  for (const o in e)
    n[o] = o in t ? t[o] : e[o];
  return n;
}
function ys(e, t) {
  return e.name === t.name && e.optional === t.optional && e.repeatable === t.repeatable;
}
function Pm(e, t) {
  for (const n of e.keys)
    if (!n.optional && !t.keys.find(ys.bind(null, n)))
      return ae(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
  for (const n of t.keys)
    if (!n.optional && !e.keys.find(ys.bind(null, n)))
      return ae(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
}
function Cm(e, t) {
  t && t.record.name && !e.name && !e.path && ae(`The route named "${String(t.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
}
function Dm(e, t) {
  for (const n of t.keys)
    if (!e.keys.find(ys.bind(null, n)))
      return ae(`Absolute path "${e.record.path}" must have the exact same param named "${n.name}" as its parent "${t.record.path}".`);
}
function Cc(e, t) {
  return t.children.some((n) => n === e || Cc(e, n));
}
const Dc = /#/g, Tm = /&/g, Am = /\//g, Vm = /=/g, km = /\?/g, Tc = /\+/g, Im = /%5B/g, jm = /%5D/g, Ac = /%5E/g, Lm = /%60/g, Vc = /%7B/g, Mm = /%7C/g, kc = /%7D/g, Fm = /%20/g;
function ui(e) {
  return encodeURI("" + e).replace(Mm, "|").replace(Im, "[").replace(jm, "]");
}
function Um(e) {
  return ui(e).replace(Vc, "{").replace(kc, "}").replace(Ac, "^");
}
function Es(e) {
  return ui(e).replace(Tc, "%2B").replace(Fm, "+").replace(Dc, "%23").replace(Tm, "%26").replace(Lm, "`").replace(Vc, "{").replace(kc, "}").replace(Ac, "^");
}
function Hm(e) {
  return Es(e).replace(Vm, "%3D");
}
function Bm(e) {
  return ui(e).replace(Dc, "%23").replace(km, "%3F");
}
function qm(e) {
  return e == null ? "" : Bm(e).replace(Am, "%2F");
}
function so(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {
    X.NODE_ENV !== "production" && ae(`Error decoding "${e}". Using original value`);
  }
  return "" + e;
}
function Wm(e) {
  const t = {};
  if (e === "" || e === "?")
    return t;
  const o = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let r = 0; r < o.length; ++r) {
    const s = o[r].replace(Tc, " "), i = s.indexOf("="), a = so(i < 0 ? s : s.slice(0, i)), l = i < 0 ? null : so(s.slice(i + 1));
    if (a in t) {
      let c = t[a];
      We(c) || (c = t[a] = [c]), c.push(l);
    } else
      t[a] = l;
  }
  return t;
}
function $a(e) {
  let t = "";
  for (let n in e) {
    const o = e[n];
    if (n = Hm(n), o == null) {
      o !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (We(o) ? o.map((s) => s && Es(s)) : [o && Es(o)]).forEach((s) => {
      s !== void 0 && (t += (t.length ? "&" : "") + n, s != null && (t += "=" + s));
    });
  }
  return t;
}
function Km(e) {
  const t = {};
  for (const n in e) {
    const o = e[n];
    o !== void 0 && (t[n] = We(o) ? o.map((r) => r == null ? null : "" + r) : o == null ? o : "" + o);
  }
  return t;
}
const zm = Symbol(X.NODE_ENV !== "production" ? "router view location matched" : ""), Ra = Symbol(X.NODE_ENV !== "production" ? "router view depth" : ""), fi = Symbol(X.NODE_ENV !== "production" ? "router" : ""), Ic = Symbol(X.NODE_ENV !== "production" ? "route location" : ""), bs = Symbol(X.NODE_ENV !== "production" ? "router view location" : "");
function Ln() {
  let e = [];
  function t(o) {
    return e.push(o), () => {
      const r = e.indexOf(o);
      r > -1 && e.splice(r, 1);
    };
  }
  function n() {
    e = [];
  }
  return {
    add: t,
    list: () => e.slice(),
    reset: n
  };
}
function Lt(e, t, n, o, r) {
  const s = o && // name is defined if record is because of the function overload
  (o.enterCallbacks[r] = o.enterCallbacks[r] || []);
  return () => new Promise((i, a) => {
    const l = (u) => {
      u === !1 ? a(Rn(4, {
        from: n,
        to: t
      })) : u instanceof Error ? a(u) : dm(u) ? a(Rn(2, {
        from: t,
        to: u
      })) : (s && // since enterCallbackArray is truthy, both record and name also are
      o.enterCallbacks[r] === s && typeof u == "function" && s.push(u), i());
    }, c = e.call(o && o.instances[r], t, n, X.NODE_ENV !== "production" ? Gm(l, t, n) : l);
    let f = Promise.resolve(c);
    if (e.length < 3 && (f = f.then(l)), X.NODE_ENV !== "production" && e.length > 2) {
      const u = `The "next" callback was never called inside of ${e.name ? '"' + e.name + '"' : ""}:
${e.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof c == "object" && "then" in c)
        f = f.then((p) => l._called ? p : (ae(u), Promise.reject(new Error("Invalid navigation guard"))));
      else if (c !== void 0 && !l._called) {
        ae(u), a(new Error("Invalid navigation guard"));
        return;
      }
    }
    f.catch((u) => a(u));
  });
}
function Gm(e, t, n) {
  let o = 0;
  return function() {
    o++ === 1 && ae(`The "next" callback was called more than once in one navigation guard when going from "${n.fullPath}" to "${t.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`), e._called = !0, o === 1 && e.apply(null, arguments);
  };
}
function Ur(e, t, n, o) {
  const r = [];
  for (const s of e) {
    X.NODE_ENV !== "production" && !s.components && !s.children.length && ae(`Record with path "${s.path}" is either missing a "component(s)" or "children" property.`);
    for (const i in s.components) {
      let a = s.components[i];
      if (X.NODE_ENV !== "production") {
        if (!a || typeof a != "object" && typeof a != "function")
          throw ae(`Component "${i}" in record with path "${s.path}" is not a valid component. Received "${String(a)}".`), new Error("Invalid route component");
        if ("then" in a) {
          ae(`Component "${i}" in record with path "${s.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
          const l = a;
          a = () => l;
        } else
          a.__asyncLoader && // warn only once per component
          !a.__warnedDefineAsync && (a.__warnedDefineAsync = !0, ae(`Component "${i}" in record with path "${s.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`));
      }
      if (!(t !== "beforeRouteEnter" && !s.instances[i]))
        if (Jm(a)) {
          const c = (a.__vccOpts || a)[t];
          c && r.push(Lt(c, n, o, s, i));
        } else {
          let l = a();
          X.NODE_ENV !== "production" && !("catch" in l) && (ae(`Component "${i}" in record with path "${s.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`), l = Promise.resolve(l)), r.push(() => l.then((c) => {
            if (!c)
              return Promise.reject(new Error(`Couldn't resolve component "${i}" at "${s.path}"`));
            const f = Gh(c) ? c.default : c;
            s.components[i] = f;
            const p = (f.__vccOpts || f)[t];
            return p && Lt(p, n, o, s, i)();
          }));
        }
    }
  }
  return r;
}
function Jm(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function vs(e) {
  const t = dt(fi), n = dt(Ic), o = _e(() => t.resolve(se(e.to))), r = _e(() => {
    const { matched: l } = o.value, { length: c } = l, f = l[c - 1], u = n.matched;
    if (!f || !u.length)
      return -1;
    const p = u.findIndex(zt.bind(null, f));
    if (p > -1)
      return p;
    const g = Pa(l[c - 2]);
    return (
      // we are dealing with nested routes
      c > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      Pa(f) === g && // avoid comparing the child with its parent
      u[u.length - 1].path !== g ? u.findIndex(zt.bind(null, l[c - 2])) : p
    );
  }), s = _e(() => r.value > -1 && Qm(n.params, o.value.params)), i = _e(() => r.value > -1 && r.value === n.matched.length - 1 && $c(n.params, o.value.params));
  function a(l = {}) {
    return Xm(l) ? t[se(e.replace) ? "replace" : "push"](
      se(e.to)
      // avoid uncaught errors are they are logged anyway
    ).catch(Gn) : Promise.resolve();
  }
  if (X.NODE_ENV !== "production" && wt) {
    const l = Js();
    if (l) {
      const c = {
        route: o.value,
        isActive: s.value,
        isExactActive: i.value
      };
      l.__vrl_devtools = l.__vrl_devtools || [], l.__vrl_devtools.push(c), hf(() => {
        c.route = o.value, c.isActive = s.value, c.isExactActive = i.value;
      }, { flush: "post" });
    }
  }
  return {
    route: o,
    href: _e(() => o.value.href),
    isActive: s,
    isExactActive: i,
    navigate: a
  };
}
const Ym = /* @__PURE__ */ Ol({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: !0
    },
    replace: Boolean,
    activeClass: String,
    // inactiveClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    }
  },
  useLink: vs,
  setup(e, { slots: t }) {
    const n = ao(vs(e)), { options: o } = dt(fi), r = _e(() => ({
      [Ca(e.activeClass, o.linkActiveClass, "router-link-active")]: n.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [Ca(e.exactActiveClass, o.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
    }));
    return () => {
      const s = t.default && t.default(n);
      return e.custom ? s : Kl("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: n.navigate,
        class: r.value
      }, s);
    };
  }
}), di = Ym;
function Xm(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t))
        return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function Qm(e, t) {
  for (const n in t) {
    const o = t[n], r = e[n];
    if (typeof o == "string") {
      if (o !== r)
        return !1;
    } else if (!We(r) || r.length !== o.length || o.some((s, i) => s !== r[i]))
      return !1;
  }
  return !0;
}
function Pa(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const Ca = (e, t, n) => e ?? t ?? n, Zm = /* @__PURE__ */ Ol({
  name: "RouterView",
  // #674 we manually inherit them
  inheritAttrs: !1,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  // Better compat for @vue/compat users
  // https://github.com/vuejs/router/issues/1315
  compatConfig: { MODE: 3 },
  setup(e, { attrs: t, slots: n }) {
    X.NODE_ENV !== "production" && tg();
    const o = dt(bs), r = _e(() => e.route || o.value), s = dt(Ra, 0), i = _e(() => {
      let c = se(s);
      const { matched: f } = r.value;
      let u;
      for (; (u = f[c]) && !u.components; )
        c++;
      return c;
    }), a = _e(() => r.value.matched[i.value]);
    Ao(Ra, _e(() => i.value + 1)), Ao(zm, a), Ao(bs, r);
    const l = ye();
    return ot(() => [l.value, a.value, e.name], ([c, f, u], [p, g, y]) => {
      f && (f.instances[u] = c, g && g !== f && c && c === p && (f.leaveGuards.size || (f.leaveGuards = g.leaveGuards), f.updateGuards.size || (f.updateGuards = g.updateGuards))), c && f && // if there is no instance but to and from are the same this might be
      // the first visit
      (!g || !zt(f, g) || !p) && (f.enterCallbacks[u] || []).forEach((N) => N(c));
    }, { flush: "post" }), () => {
      const c = r.value, f = e.name, u = a.value, p = u && u.components[f];
      if (!p)
        return Da(n.default, { Component: p, route: c });
      const g = u.props[f], y = g ? g === !0 ? c.params : typeof g == "function" ? g(c) : g : null, $ = Kl(p, fe({}, y, t, {
        onVnodeUnmounted: (O) => {
          O.component.isUnmounted && (u.instances[f] = null);
        },
        ref: l
      }));
      if (X.NODE_ENV !== "production" && wt && $.ref) {
        const O = {
          depth: i.value,
          name: u.name,
          path: u.path,
          meta: u.meta
        };
        (We($.ref) ? $.ref.map((k) => k.i) : [$.ref.i]).forEach((k) => {
          k.__vrv_devtools = O;
        });
      }
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        Da(n.default, { Component: $, route: c }) || $
      );
    };
  }
});
function Da(e, t) {
  if (!e)
    return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const eg = Zm;
function tg() {
  const e = Js(), t = e.parent && e.parent.type.name, n = e.parent && e.parent.subTree && e.parent.subTree.type;
  if (t && (t === "KeepAlive" || t.includes("Transition")) && typeof n == "object" && n.name === "RouterView") {
    const o = t === "KeepAlive" ? "keep-alive" : "transition";
    ae(`<router-view> can no longer be used directly inside <transition> or <keep-alive>.
Use slot props instead:

<router-view v-slot="{ Component }">
  <${o}>
    <component :is="Component" />
  </${o}>
</router-view>`);
  }
}
function Mn(e, t) {
  const n = fe({}, e, {
    // remove variables that can contain vue instances
    matched: e.matched.map((o) => ug(o, ["instances", "children", "aliasOf"]))
  });
  return {
    _custom: {
      type: null,
      readOnly: !0,
      display: e.fullPath,
      tooltip: t,
      value: n
    }
  };
}
function So(e) {
  return {
    _custom: {
      display: e
    }
  };
}
let ng = 0;
function og(e, t, n) {
  if (t.__hasDevtools)
    return;
  t.__hasDevtools = !0;
  const o = ng++;
  Xs({
    id: "org.vuejs.router" + (o ? "." + o : ""),
    label: "Vue Router",
    packageName: "vue-router",
    homepage: "https://router.vuejs.org",
    logo: "https://router.vuejs.org/logo.png",
    componentStateTypes: ["Routing"],
    app: e
  }, (r) => {
    typeof r.now != "function" && console.warn("[Vue Router]: You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), r.on.inspectComponent((f, u) => {
      f.instanceData && f.instanceData.state.push({
        type: "Routing",
        key: "$route",
        editable: !1,
        value: Mn(t.currentRoute.value, "Current Route")
      });
    }), r.on.visitComponentTree(({ treeNode: f, componentInstance: u }) => {
      if (u.__vrv_devtools) {
        const p = u.__vrv_devtools;
        f.tags.push({
          label: (p.name ? `${p.name.toString()}: ` : "") + p.path,
          textColor: 0,
          tooltip: "This component is rendered by &lt;router-view&gt;",
          backgroundColor: jc
        });
      }
      We(u.__vrl_devtools) && (u.__devtoolsApi = r, u.__vrl_devtools.forEach((p) => {
        let g = Fc, y = "";
        p.isExactActive ? (g = Mc, y = "This is exactly active") : p.isActive && (g = Lc, y = "This link is active"), f.tags.push({
          label: p.route.path,
          textColor: 0,
          tooltip: y,
          backgroundColor: g
        });
      }));
    }), ot(t.currentRoute, () => {
      l(), r.notifyComponentUpdate(), r.sendInspectorTree(a), r.sendInspectorState(a);
    });
    const s = "router:navigations:" + o;
    r.addTimelineLayer({
      id: s,
      label: `Router${o ? " " + o : ""} Navigations`,
      color: 4237508
    }), t.onError((f, u) => {
      r.addTimelineEvent({
        layerId: s,
        event: {
          title: "Error during Navigation",
          subtitle: u.fullPath,
          logType: "error",
          time: r.now(),
          data: { error: f },
          groupId: u.meta.__navigationId
        }
      });
    });
    let i = 0;
    t.beforeEach((f, u) => {
      const p = {
        guard: So("beforeEach"),
        from: Mn(u, "Current Location during this navigation"),
        to: Mn(f, "Target location")
      };
      Object.defineProperty(f.meta, "__navigationId", {
        value: i++
      }), r.addTimelineEvent({
        layerId: s,
        event: {
          time: r.now(),
          title: "Start of navigation",
          subtitle: f.fullPath,
          data: p,
          groupId: f.meta.__navigationId
        }
      });
    }), t.afterEach((f, u, p) => {
      const g = {
        guard: So("afterEach")
      };
      p ? (g.failure = {
        _custom: {
          type: Error,
          readOnly: !0,
          display: p ? p.message : "",
          tooltip: "Navigation Failure",
          value: p
        }
      }, g.status = So("❌")) : g.status = So("✅"), g.from = Mn(u, "Current Location during this navigation"), g.to = Mn(f, "Target location"), r.addTimelineEvent({
        layerId: s,
        event: {
          title: "End of navigation",
          subtitle: f.fullPath,
          time: r.now(),
          data: g,
          logType: p ? "warning" : "default",
          groupId: f.meta.__navigationId
        }
      });
    });
    const a = "router-inspector:" + o;
    r.addInspector({
      id: a,
      label: "Routes" + (o ? " " + o : ""),
      icon: "book",
      treeFilterPlaceholder: "Search routes"
    });
    function l() {
      if (!c)
        return;
      const f = c;
      let u = n.getRoutes().filter((p) => !p.parent || // these routes have a parent with no component which will not appear in the view
      // therefore we still need to include them
      !p.parent.record.components);
      u.forEach(Bc), f.filter && (u = u.filter((p) => (
        // save matches state based on the payload
        Ns(p, f.filter.toLowerCase())
      ))), u.forEach((p) => Hc(p, t.currentRoute.value)), f.rootNodes = u.map(Uc);
    }
    let c;
    r.on.getInspectorTree((f) => {
      c = f, f.app === e && f.inspectorId === a && l();
    }), r.on.getInspectorState((f) => {
      if (f.app === e && f.inspectorId === a) {
        const p = n.getRoutes().find((g) => g.record.__vd_id === f.nodeId);
        p && (f.state = {
          options: sg(p)
        });
      }
    }), r.sendInspectorTree(a), r.sendInspectorState(a);
  });
}
function rg(e) {
  return e.optional ? e.repeatable ? "*" : "?" : e.repeatable ? "+" : "";
}
function sg(e) {
  const { record: t } = e, n = [
    { editable: !1, key: "path", value: t.path }
  ];
  return t.name != null && n.push({
    editable: !1,
    key: "name",
    value: t.name
  }), n.push({ editable: !1, key: "regexp", value: e.re }), e.keys.length && n.push({
    editable: !1,
    key: "keys",
    value: {
      _custom: {
        type: null,
        readOnly: !0,
        display: e.keys.map((o) => `${o.name}${rg(o)}`).join(" "),
        tooltip: "Param keys",
        value: e.keys
      }
    }
  }), t.redirect != null && n.push({
    editable: !1,
    key: "redirect",
    value: t.redirect
  }), e.alias.length && n.push({
    editable: !1,
    key: "aliases",
    value: e.alias.map((o) => o.record.path)
  }), Object.keys(e.record.meta).length && n.push({
    editable: !1,
    key: "meta",
    value: e.record.meta
  }), n.push({
    key: "score",
    editable: !1,
    value: {
      _custom: {
        type: null,
        readOnly: !0,
        display: e.score.map((o) => o.join(", ")).join(" | "),
        tooltip: "Score used to sort routes",
        value: e.score
      }
    }
  }), n;
}
const jc = 15485081, Lc = 2450411, Mc = 8702998, ig = 2282478, Fc = 16486972, ag = 6710886;
function Uc(e) {
  const t = [], { record: n } = e;
  n.name != null && t.push({
    label: String(n.name),
    textColor: 0,
    backgroundColor: ig
  }), n.aliasOf && t.push({
    label: "alias",
    textColor: 0,
    backgroundColor: Fc
  }), e.__vd_match && t.push({
    label: "matches",
    textColor: 0,
    backgroundColor: jc
  }), e.__vd_exactActive && t.push({
    label: "exact",
    textColor: 0,
    backgroundColor: Mc
  }), e.__vd_active && t.push({
    label: "active",
    textColor: 0,
    backgroundColor: Lc
  }), n.redirect && t.push({
    label: typeof n.redirect == "string" ? `redirect: ${n.redirect}` : "redirects",
    textColor: 16777215,
    backgroundColor: ag
  });
  let o = n.__vd_id;
  return o == null && (o = String(lg++), n.__vd_id = o), {
    id: o,
    label: n.path,
    tags: t,
    children: e.children.map(Uc)
  };
}
let lg = 0;
const cg = /^\/(.*)\/([a-z]*)$/;
function Hc(e, t) {
  const n = t.matched.length && zt(t.matched[t.matched.length - 1], e.record);
  e.__vd_exactActive = e.__vd_active = n, n || (e.__vd_active = t.matched.some((o) => zt(o, e.record))), e.children.forEach((o) => Hc(o, t));
}
function Bc(e) {
  e.__vd_match = !1, e.children.forEach(Bc);
}
function Ns(e, t) {
  const n = String(e.re).match(cg);
  if (e.__vd_match = !1, !n || n.length < 3)
    return !1;
  if (new RegExp(n[1].replace(/\$$/, ""), n[2]).test(t))
    return e.children.forEach((i) => Ns(i, t)), e.record.path !== "/" || t === "/" ? (e.__vd_match = e.re.test(t), !0) : !1;
  const r = e.record.path.toLowerCase(), s = so(r);
  return !t.startsWith("/") && (s.includes(t) || r.includes(t)) || s.startsWith(t) || r.startsWith(t) || e.record.name && String(e.record.name).includes(t) ? !0 : e.children.some((i) => Ns(i, t));
}
function ug(e, t) {
  const n = {};
  for (const o in e)
    t.includes(o) || (n[o] = e[o]);
  return n;
}
function fg(e) {
  const t = Sm(e.routes, e), n = e.parseQuery || Wm, o = e.stringifyQuery || $a, r = e.history;
  if (X.NODE_ENV !== "production" && !r)
    throw new Error('Provide the "history" option when calling "createRouter()": https://next.router.vuejs.org/api/#history.');
  const s = Ln(), i = Ln(), a = Ln(), l = Cu(Vt);
  let c = Vt;
  wt && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const f = Mr.bind(null, (b) => "" + b), u = Mr.bind(null, qm), p = (
    // @ts-expect-error: intentionally avoid the type check
    Mr.bind(null, so)
  );
  function g(b, j) {
    let I, U;
    return Pc(b) ? (I = t.getRecordMatcher(b), U = j) : U = b, t.addRoute(U, I);
  }
  function y(b) {
    const j = t.getRecordMatcher(b);
    j ? t.removeRoute(j) : X.NODE_ENV !== "production" && ae(`Cannot remove non-existent route "${String(b)}"`);
  }
  function N() {
    return t.getRoutes().map((b) => b.record);
  }
  function $(b) {
    return !!t.getRecordMatcher(b);
  }
  function O(b, j) {
    if (j = fe({}, j || l.value), typeof b == "string") {
      const d = Fr(n, b, j.path), h = t.resolve({ path: d.path }, j), E = r.createHref(d.fullPath);
      return X.NODE_ENV !== "production" && (E.startsWith("//") ? ae(`Location "${b}" resolved to "${E}". A resolved location cannot start with multiple slashes.`) : h.matched.length || ae(`No match found for location with path "${b}"`)), fe(d, h, {
        params: p(h.params),
        hash: so(d.hash),
        redirectedFrom: void 0,
        href: E
      });
    }
    let I;
    if ("path" in b)
      X.NODE_ENV !== "production" && "params" in b && !("name" in b) && // @ts-expect-error: the type is never
      Object.keys(b.params).length && ae(`Path "${b.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`), I = fe({}, b, {
        path: Fr(n, b.path, j.path).path
      });
    else {
      const d = fe({}, b.params);
      for (const h in d)
        d[h] == null && delete d[h];
      I = fe({}, b, {
        params: u(d)
      }), j.params = u(j.params);
    }
    const U = t.resolve(I, j), ee = b.hash || "";
    X.NODE_ENV !== "production" && ee && !ee.startsWith("#") && ae(`A \`hash\` should always start with the character "#". Replace "${ee}" with "#${ee}".`), U.params = f(p(U.params));
    const ve = Xh(o, fe({}, b, {
      hash: Um(ee),
      path: U.path
    })), Q = r.createHref(ve);
    return X.NODE_ENV !== "production" && (Q.startsWith("//") ? ae(`Location "${b}" resolved to "${Q}". A resolved location cannot start with multiple slashes.`) : U.matched.length || ae(`No match found for location with path "${"path" in b ? b.path : b}"`)), fe({
      fullPath: ve,
      // keep the hash encoded so fullPath is effectively path + encodedQuery +
      // hash
      hash: ee,
      query: (
        // if the user is using a custom query lib like qs, we might have
        // nested objects, so we keep the query as is, meaning it can contain
        // numbers at `$route.query`, but at the point, the user will have to
        // use their own type anyway.
        // https://github.com/vuejs/router/issues/328#issuecomment-649481567
        o === $a ? Km(b.query) : b.query || {}
      )
    }, U, {
      redirectedFrom: void 0,
      href: Q
    });
  }
  function A(b) {
    return typeof b == "string" ? Fr(n, b, l.value.path) : fe({}, b);
  }
  function k(b, j) {
    if (c !== b)
      return Rn(8, {
        from: j,
        to: b
      });
  }
  function K(b) {
    return C(b);
  }
  function ne(b) {
    return K(fe(A(b), { replace: !0 }));
  }
  function le(b) {
    const j = b.matched[b.matched.length - 1];
    if (j && j.redirect) {
      const { redirect: I } = j;
      let U = typeof I == "function" ? I(b) : I;
      if (typeof U == "string" && (U = U.includes("?") || U.includes("#") ? U = A(U) : (
        // force empty params
        { path: U }
      ), U.params = {}), X.NODE_ENV !== "production" && !("path" in U) && !("name" in U))
        throw ae(`Invalid redirect found:
${JSON.stringify(U, null, 2)}
 when navigating to "${b.fullPath}". A redirect must contain a name or path. This will break in production.`), new Error("Invalid redirect");
      return fe({
        query: b.query,
        hash: b.hash,
        // avoid transferring params if the redirect has a path
        params: "path" in U ? {} : b.params
      }, U);
    }
  }
  function C(b, j) {
    const I = c = O(b), U = l.value, ee = b.state, ve = b.force, Q = b.replace === !0, d = le(I);
    if (d)
      return C(
        fe(A(d), {
          state: typeof d == "object" ? fe({}, ee, d.state) : ee,
          force: ve,
          replace: Q
        }),
        // keep original redirectedFrom if it exists
        j || I
      );
    const h = I;
    h.redirectedFrom = j;
    let E;
    return !ve && _a(o, U, I) && (E = Rn(16, { to: h, from: U }), Pt(
      U,
      U,
      // this is a push, the only way for it to be triggered from a
      // history.listen is with a redirect, which makes it become a push
      !0,
      // This cannot be the first navigation because the initial location
      // cannot be manually navigated to
      !1
    )), (E ? Promise.resolve(E) : F(h, U)).catch((v) => _t(v) ? (
      // navigation redirects still mark the router as ready
      _t(
        v,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? v : Yt(v)
    ) : (
      // reject any unknown error
      q(v, h, U)
    )).then((v) => {
      if (v) {
        if (_t(
          v,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        ))
          return X.NODE_ENV !== "production" && // we are redirecting to the same location we were already at
          _a(o, O(v.to), h) && // and we have done it a couple of times
          j && // @ts-expect-error: added only in dev
          (j._count = j._count ? (
            // @ts-expect-error
            j._count + 1
          ) : 1) > 30 ? (ae(`Detected a possibly infinite redirection in a navigation guard when going from "${U.fullPath}" to "${h.fullPath}". Aborting to avoid a Stack Overflow.
 Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`), Promise.reject(new Error("Infinite redirect in navigation guard"))) : C(
            // keep options
            fe({
              // preserve an existing replacement but allow the redirect to override it
              replace: Q
            }, A(v.to), {
              state: typeof v.to == "object" ? fe({}, ee, v.to.state) : ee,
              force: ve
            }),
            // preserve the original redirectedFrom if any
            j || h
          );
      } else
        v = oe(h, U, !0, Q, ee);
      return L(h, U, v), v;
    });
  }
  function Te(b, j) {
    const I = k(b, j);
    return I ? Promise.reject(I) : Promise.resolve();
  }
  function ge(b) {
    const j = Ct.values().next().value;
    return j && typeof j.runWithContext == "function" ? j.runWithContext(b) : b();
  }
  function F(b, j) {
    let I;
    const [U, ee, ve] = dg(b, j);
    I = Ur(U.reverse(), "beforeRouteLeave", b, j);
    for (const d of U)
      d.leaveGuards.forEach((h) => {
        I.push(Lt(h, b, j));
      });
    const Q = Te.bind(null, b, j);
    return I.push(Q), Dt(I).then(() => {
      I = [];
      for (const d of s.list())
        I.push(Lt(d, b, j));
      return I.push(Q), Dt(I);
    }).then(() => {
      I = Ur(ee, "beforeRouteUpdate", b, j);
      for (const d of ee)
        d.updateGuards.forEach((h) => {
          I.push(Lt(h, b, j));
        });
      return I.push(Q), Dt(I);
    }).then(() => {
      I = [];
      for (const d of ve)
        if (d.beforeEnter)
          if (We(d.beforeEnter))
            for (const h of d.beforeEnter)
              I.push(Lt(h, b, j));
          else
            I.push(Lt(d.beforeEnter, b, j));
      return I.push(Q), Dt(I);
    }).then(() => (b.matched.forEach((d) => d.enterCallbacks = {}), I = Ur(ve, "beforeRouteEnter", b, j), I.push(Q), Dt(I))).then(() => {
      I = [];
      for (const d of i.list())
        I.push(Lt(d, b, j));
      return I.push(Q), Dt(I);
    }).catch((d) => _t(
      d,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? d : Promise.reject(d));
  }
  function L(b, j, I) {
    a.list().forEach((U) => ge(() => U(b, j, I)));
  }
  function oe(b, j, I, U, ee) {
    const ve = k(b, j);
    if (ve)
      return ve;
    const Q = j === Vt, d = wt ? history.state : {};
    I && (U || Q ? r.replace(b.fullPath, fe({
      scroll: Q && d && d.scroll
    }, ee)) : r.push(b.fullPath, ee)), l.value = b, Pt(b, j, I, Q), Yt();
  }
  let be;
  function rt() {
    be || (be = r.listen((b, j, I) => {
      if (!go.listening)
        return;
      const U = O(b), ee = le(U);
      if (ee) {
        C(fe(ee, { replace: !0 }), U).catch(Gn);
        return;
      }
      c = U;
      const ve = l.value;
      wt && sm(Ea(ve.fullPath, I.delta), Or()), F(U, ve).catch((Q) => _t(
        Q,
        12
        /* ErrorTypes.NAVIGATION_CANCELLED */
      ) ? Q : _t(
        Q,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? (C(
        Q.to,
        U
        // avoid an uncaught rejection, let push call triggerError
      ).then((d) => {
        _t(
          d,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && !I.delta && I.type === ro.pop && r.go(-1, !1);
      }).catch(Gn), Promise.reject()) : (I.delta && r.go(-I.delta, !1), q(Q, U, ve))).then((Q) => {
        Q = Q || oe(
          // after navigation, all matched components are resolved
          U,
          ve,
          !1
        ), Q && (I.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
        // entry while a different route is displayed
        !_t(
          Q,
          8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        ) ? r.go(-I.delta, !1) : I.type === ro.pop && _t(
          Q,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && r.go(-1, !1)), L(U, ve, Q);
      }).catch(Gn);
    }));
  }
  let Ue = Ln(), De = Ln(), J;
  function q(b, j, I) {
    Yt(b);
    const U = De.list();
    return U.length ? U.forEach((ee) => ee(b, j, I)) : (X.NODE_ENV !== "production" && ae("uncaught error during route navigation:"), console.error(b)), Promise.reject(b);
  }
  function Ke() {
    return J && l.value !== Vt ? Promise.resolve() : new Promise((b, j) => {
      Ue.add([b, j]);
    });
  }
  function Yt(b) {
    return J || (J = !b, rt(), Ue.list().forEach(([j, I]) => b ? I(b) : j()), Ue.reset()), b;
  }
  function Pt(b, j, I, U) {
    const { scrollBehavior: ee } = e;
    if (!wt || !ee)
      return Promise.resolve();
    const ve = !I && im(Ea(b.fullPath, 0)) || (U || !I) && history.state && history.state.scroll || null;
    return Jo().then(() => ee(b, j, ve)).then((Q) => Q && rm(Q)).catch((Q) => q(Q, b, j));
  }
  const st = (b) => r.go(b);
  let ze;
  const Ct = /* @__PURE__ */ new Set(), go = {
    currentRoute: l,
    listening: !0,
    addRoute: g,
    removeRoute: y,
    hasRoute: $,
    getRoutes: N,
    resolve: O,
    options: e,
    push: K,
    replace: ne,
    go: st,
    back: () => st(-1),
    forward: () => st(1),
    beforeEach: s.add,
    beforeResolve: i.add,
    afterEach: a.add,
    onError: De.add,
    isReady: Ke,
    install(b) {
      const j = this;
      b.component("RouterLink", di), b.component("RouterView", eg), b.config.globalProperties.$router = j, Object.defineProperty(b.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => se(l)
      }), wt && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !ze && l.value === Vt && (ze = !0, K(r.location).catch((ee) => {
        X.NODE_ENV !== "production" && ae("Unexpected error when starting the router:", ee);
      }));
      const I = {};
      for (const ee in Vt)
        Object.defineProperty(I, ee, {
          get: () => l.value[ee],
          enumerable: !0
        });
      b.provide(fi, j), b.provide(Ic, ol(I)), b.provide(bs, l);
      const U = b.unmount;
      Ct.add(b), b.unmount = function() {
        Ct.delete(b), Ct.size < 1 && (c = Vt, be && be(), be = null, l.value = Vt, ze = !1, J = !1), U();
      }, X.NODE_ENV !== "production" && wt && og(b, j, t);
    }
  };
  function Dt(b) {
    return b.reduce((j, I) => j.then(() => ge(I)), Promise.resolve());
  }
  return go;
}
function dg(e, t) {
  const n = [], o = [], r = [], s = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < s; i++) {
    const a = t.matched[i];
    a && (e.matched.find((c) => zt(c, a)) ? o.push(a) : n.push(a));
    const l = e.matched[i];
    l && (t.matched.find((c) => zt(c, l)) || r.push(l));
  }
  return [n, o, r];
}
const Dn = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
}, pg = {}, mo = (e) => (Ls("data-v-7ddf73dc"), e = e(), Ms(), e), hg = { class: "error-wrapper" }, mg = /* @__PURE__ */ mo(() => /* @__PURE__ */ m("span", { class: "error-title" }, "Error 404", -1)), gg = /* @__PURE__ */ mo(() => /* @__PURE__ */ m("span", { class: "error-description" }, "Sorry, we couldn't find this page.", -1)), _g = /* @__PURE__ */ mo(() => /* @__PURE__ */ m("span", { class: "error-sub-description" }, "But dont worry, you can find plenty of other things on the homepage..", -1)), yg = { class: "mt-5" }, Eg = /* @__PURE__ */ mo(() => /* @__PURE__ */ m("i", { class: "fas fa-arrow-left fa-fw me-1" }, null, -1)), bg = /* @__PURE__ */ mo(() => /* @__PURE__ */ m("span", null, "Back to Home", -1));
function vg(e, t) {
  const n = Us("router-link");
  return te(), ce("div", hg, [
    To(e.$slots, "title", {}, () => [
      mg
    ], !0),
    To(e.$slots, "description", {}, () => [
      gg
    ], !0),
    To(e.$slots, "subdescription", {}, () => [
      _g
    ], !0),
    m("div", yg, [
      we(n, {
        to: "/",
        class: "btn btn-sm btn-primary"
      }, {
        default: vt(() => [
          Eg,
          bg
        ]),
        _: 1
      })
    ])
  ]);
}
const Ng = /* @__PURE__ */ Dn(pg, [["render", vg], ["__scopeId", "data-v-7ddf73dc"]]), wg = { class: "nav-item" }, Og = ["href"], Sg = {
  __name: "NavLinkItem",
  props: {
    to: { type: [String, Object], required: !0 },
    // Accepts both string or location object
    active: Boolean
    // This prop is optional and can be used to override the active state if needed
  },
  setup(e) {
    const t = e, { to: n } = Kr(t);
    return vs({ to: n }), (o, r) => (te(), pr(se(di), {
      to: se(n),
      custom: ""
    }, {
      default: vt(({ href: s, isExactActive: i }) => [
        m("li", wg, [
          m("a", {
            class: Ze(["nav-link", { active: i }]),
            href: s
          }, [
            To(o.$slots, "default", {}, void 0, !0)
          ], 10, Og)
        ])
      ]),
      _: 3
    }, 8, ["to"]));
  }
}, Fn = /* @__PURE__ */ Dn(Sg, [["__scopeId", "data-v-0d411b52"]]), xg = { class: "navbar navbar-expand-lg bg-light" }, $g = { class: "container-fluid" }, Rg = /* @__PURE__ */ m("button", {
  class: "navbar-toggler",
  type: "button",
  "data-bs-toggle": "collapse",
  "data-bs-target": "#navbarNav",
  "aria-controls": "navbarNav",
  "aria-expanded": "false",
  "aria-label": "Toggle navigation"
}, [
  /* @__PURE__ */ m("span", { class: "navbar-toggler-icon" })
], -1), Pg = {
  class: "collapse navbar-collapse",
  id: "navbarNav"
}, Cg = { class: "navbar-nav" }, Dg = { class: "nav-item" }, Tg = { class: "nav-item" }, Ag = { class: "nav-item" }, Vg = { class: "nav-item" }, kg = { class: "nav-item" }, Ig = {
  __name: "MainMenu",
  setup(e) {
    return (t, n) => (te(), ce("nav", xg, [
      m("div", $g, [
        we(se(di), {
          class: "navbar-brand",
          to: "/"
        }, {
          default: vt(() => [
            Nt("Epic Participant Updater")
          ]),
          _: 1
        }),
        Rg,
        m("div", Pg, [
          m("ul", Cg, [
            m("li", Dg, [
              we(Fn, { to: "/" }, {
                default: vt(() => [
                  Nt("Home")
                ]),
                _: 1
              })
            ]),
            m("li", Tg, [
              we(Fn, { to: "/project-templates" }, {
                default: vt(() => [
                  Nt("Project Templates")
                ]),
                _: 1
              })
            ]),
            m("li", Ag, [
              we(Fn, { to: "/api-token" }, {
                default: vt(() => [
                  Nt("API token")
                ]),
                _: 1
              })
            ]),
            m("li", Vg, [
              we(Fn, { to: "/logs" }, {
                default: vt(() => [
                  Nt("Logs")
                ]),
                _: 1
              })
            ]),
            m("li", kg, [
              we(Fn, { to: "/log-archives" }, {
                default: vt(() => [
                  Nt("Log Archives")
                ]),
                _: 1
              })
            ])
          ])
        ])
      ])
    ]));
  }
}, jg = {
  __name: "MainLayout",
  setup(e) {
    return (t, n) => {
      const o = Us("router-view");
      return te(), ce("div", null, [
        we(Ig),
        we(o)
      ]);
    };
  }
}, Lg = {}, Mg = { class: "border rounded p-2 mt-2" }, Fg = /* @__PURE__ */ m("p", null, "This module exposes an endpoint that listens for study related data coming from Hyperspace.", -1), Ug = /* @__PURE__ */ m("p", null, "Whenever a patient is added to a study in Hyperspace, an XML payload is sent to an exposed URL in REDCap.", -1), Hg = /* @__PURE__ */ m("span", null, "The XML payload is parsed to update/create a record in REDCap using this information:", -1), Bg = /* @__PURE__ */ m("ul", null, [
  /* @__PURE__ */ m("li", null, "study ID"),
  /* @__PURE__ */ m("li", null, "patient MRN"),
  /* @__PURE__ */ m("li", null, "enrollment status"),
  /* @__PURE__ */ m("li", null, "starting date of the study"),
  /* @__PURE__ */ m("li", null, "ending date of the study")
], -1), qg = [
  Fg,
  Ug,
  Hg,
  Bg
];
function Wg(e, t) {
  return te(), ce("div", Mg, qg);
}
const Kg = /* @__PURE__ */ Dn(Lg, [["render", Wg]]), zg = { class: "border rounded p-2 mt-2" }, Gg = /* @__PURE__ */ m("p", null, "Download a project template and use it as a starting point or as a reference for how to use the module.", -1), Jg = ["href", "download"], Yg = {
  __name: "ProjectTemplatesPage",
  setup(e) {
    const t = ci(), n = _e(() => {
      var o;
      return ((o = t == null ? void 0 : t.app_settings) == null ? void 0 : o.project_templates) ?? {};
    });
    return (o, r) => (te(), ce("div", zg, [
      Gg,
      m("ul", null, [
        (te(!0), ce(ke, null, dr(n.value, (s, i, a) => (te(), ce("li", { key: a }, [
          m("a", {
            href: s,
            target: "_blank",
            download: `${i}.xml`
          }, Z(i), 9, Jg)
        ]))), 128))
      ])
    ]));
  }
}, Xg = () => {
  var o;
  const e = (r) => {
    const s = document.createElement("textarea");
    s.value = r, document.body.appendChild(s), s.select();
    try {
      return document.execCommand("copy"), !0;
    } finally {
      document.body.removeChild(s);
    }
  }, t = (r) => navigator.clipboard.writeText(r);
  let n = (o = navigator == null ? void 0 : navigator.clipboard) != null && o.writeText ? t : e;
  return {
    copy: (r) => new Promise((i, a) => {
      try {
        const l = n(r);
        l instanceof Promise ? l.then(() => {
          console.log(
            "Text copied to clipboard ✌🏼:",
            r
          ), i(r);
        }).catch((c) => {
          console.error("Failed to copy text:", c), a(c);
        }) : l === !0 && (console.log("Text copied to clipboard ✌🏼:", r), i(r));
      } catch (l) {
        console.error("Failed to copy text:", l), a(l);
      }
    })
  };
}, Qg = { class: "d-flex flex-column gap-2 mt-2" }, Zg = { class: "d-flex flex-column gap-2 border rounded p-2" }, e_ = /* @__PURE__ */ m("span", { class: "fs-3" }, "Upload URL", -1), t_ = /* @__PURE__ */ m("span", { class: "d-block" }, "This URL is used to send updates to Epic.", -1), n_ = { class: "input-group" }, o_ = ["value"], r_ = /* @__PURE__ */ m("i", { class: "fas fa-copy" }, null, -1), s_ = [
  r_
], i_ = { class: "d-flex flex-column gap-2 border rounded p-2" }, a_ = /* @__PURE__ */ m("span", { class: "fs-3" }, "Listening URL", -1), l_ = /* @__PURE__ */ m("span", { class: "d-block" }, "Provide this URL to your Epic staff for the configuration of the EOA service.", -1), c_ = /* @__PURE__ */ m("span", { class: "d-block" }, "This URL will allow Hyperspace to send study enrollment data to REDCap.", -1), u_ = { class: "input-group" }, f_ = ["value"], d_ = /* @__PURE__ */ m("i", { class: "fas fa-copy" }, null, -1), p_ = [
  d_
], h_ = /* @__PURE__ */ m("i", { class: "fas fa-eye" }, null, -1), m_ = [
  h_
], g_ = { class: "d-flex flex-column gap-2 border rounded p-2" }, __ = /* @__PURE__ */ m("span", { class: "fs-3" }, "API Token", -1), y_ = /* @__PURE__ */ m("span", null, "Inspect or change the API token", -1), E_ = { class: "input-group" }, b_ = ["value"], v_ = /* @__PURE__ */ m("i", { class: "fas fa-copy" }, null, -1), N_ = [
  v_
], w_ = /* @__PURE__ */ m("i", { class: "fas fa-eye" }, null, -1), O_ = [
  w_
], S_ = /* @__PURE__ */ m("div", { class: "alert alert-warning mb-0" }, [
  /* @__PURE__ */ m("span", null, "Please note that, if the API token is changed, the updated listening URL must also be changed in Hyperspace")
], -1), x_ = /* @__PURE__ */ m("span", { class: "d-flex gap-2 align-items-center" }, [
  /* @__PURE__ */ m("i", { class: "fas fa-refresh" }),
  /* @__PURE__ */ m("span", null, "Regenerate token")
], -1), $_ = [
  x_
], R_ = {
  __name: "ApiTokenPage",
  setup(e) {
    const t = ci(), n = Xg(), o = (g) => {
      const y = ye(!1), N = () => {
        y.value = !y.value;
      }, $ = _e(() => y.value ? g.value : "*******");
      return {
        toggle: N,
        value: $
      };
    }, r = _e(() => {
      var g;
      return (g = t == null ? void 0 : t.api_token_data) == null ? void 0 : g.api_token;
    }), s = o(r), i = _e(() => {
      var g;
      return (g = t == null ? void 0 : t.api_token_data) == null ? void 0 : g.listening_url;
    }), a = o(i), l = _e(() => t == null ? void 0 : t.epic_upload_url);
    async function c() {
      var g;
      await n.copy((g = t == null ? void 0 : t.api_token_data) == null ? void 0 : g.api_token), alert("text copied");
    }
    async function f() {
      var g;
      await n.copy((g = t == null ? void 0 : t.api_token_data) == null ? void 0 : g.listening_url), alert("text copied");
    }
    async function u() {
      await n.copy(t == null ? void 0 : t.epic_upload_url), alert("text copied");
    }
    async function p() {
      confirm("Are you sure you want to generate a new API token?") && (await t.regenerateToken(), t.init());
    }
    return (g, y) => (te(), ce("div", Qg, [
      m("div", Zg, [
        e_,
        t_,
        m("div", n_, [
          m("input", {
            type: "text",
            class: "form-control",
            disabled: "",
            readonly: "",
            value: l.value
          }, null, 8, o_),
          m("button", {
            class: "btn btn-outline-secondary",
            type: "button",
            onClick: u
          }, s_)
        ])
      ]),
      m("div", i_, [
        a_,
        l_,
        c_,
        m("div", u_, [
          m("input", {
            type: "text",
            class: "form-control",
            disabled: "",
            readonly: "",
            value: se(a).value.value
          }, null, 8, f_),
          m("button", {
            class: "btn btn-outline-secondary",
            type: "button",
            onClick: f
          }, p_),
          m("button", {
            class: "btn btn-outline-secondary",
            type: "button",
            onClick: y[0] || (y[0] = (...N) => se(a).toggle && se(a).toggle(...N))
          }, m_)
        ])
      ]),
      m("div", g_, [
        __,
        y_,
        m("div", E_, [
          m("input", {
            type: "text",
            class: "form-control",
            disabled: "",
            readonly: "",
            value: se(s).value.value
          }, null, 8, b_),
          m("button", {
            class: "btn btn-outline-secondary",
            type: "button",
            onClick: c
          }, N_),
          m("button", {
            class: "btn btn-outline-secondary",
            type: "button",
            onClick: y[1] || (y[1] = (...N) => se(s).toggle && se(s).toggle(...N))
          }, O_)
        ]),
        S_,
        m("div", null, [
          m("button", {
            class: "btn btn-sm btn-danger",
            onClick: p
          }, $_)
        ])
      ])
    ]));
  }
}, P_ = { "aria-label": "Log pages" }, C_ = { class: "pagination pagination-sm mb-0" }, D_ = ["disabled"], T_ = ["disabled"], A_ = {
  key: 0,
  class: "page-item disabled"
}, V_ = {
  type: "button",
  class: "page-link",
  disabled: ""
}, k_ = ["onClick"], I_ = ["disabled"], j_ = ["disabled"], L_ = {
  __name: "LogsPagination",
  props: {
    modelValue: { type: Number, default: 1 },
    perPage: { type: Number, default: 25 },
    totalItems: { type: Number, default: 0 },
    maxVisibleButtons: { type: Number, default: 5 },
    firstText: { type: String, default: "<<" },
    previousText: { type: String, default: "<" },
    nextText: { type: String, default: ">" },
    lastText: { type: String, default: ">>" },
    ellipsisText: { type: String, default: "..." }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, o = t, r = ($) => {
      const O = parseInt($, 10);
      return Number.isNaN(O) || O < 1 ? 1 : O > i.value ? i.value : O;
    }, s = _e(() => r(n.modelValue)), i = _e(() => {
      const $ = parseInt(n.totalItems, 10), O = parseInt(n.perPage, 10), A = Number.isNaN($) || $ < 0 ? 0 : $, k = Number.isNaN(O) || O < 1 ? 25 : O;
      return Math.max(1, Math.ceil(A / k));
    }), a = _e(() => s.value <= 1), l = _e(() => s.value >= i.value), c = _e(() => {
      const $ = Math.min(n.maxVisibleButtons, i.value), O = Math.floor($ / 2);
      let A = s.value - O;
      return s.value <= O && (A = 1), s.value >= i.value - O && (A = i.value - $ + 1), A < 1 && (A = 1), Array.from({ length: $ }, (k, K) => A + K);
    });
    function f($) {
      const O = c.value.length - 1;
      return c.value.length < n.maxVisibleButtons ? !1 : $ === 0 && c.value[$] > 1 || $ === O && c.value[$] < i.value;
    }
    function u($) {
      o("update:modelValue", r($));
    }
    function p() {
      u(1);
    }
    function g() {
      u(s.value - 1);
    }
    function y() {
      u(s.value + 1);
    }
    function N() {
      u(i.value);
    }
    return ($, O) => (te(), ce("nav", P_, [
      m("ul", C_, [
        m("li", {
          class: Ze(["page-item", { disabled: a.value }])
        }, [
          m("button", {
            type: "button",
            class: "page-link",
            disabled: a.value,
            onClick: p
          }, Z(e.firstText), 9, D_)
        ], 2),
        m("li", {
          class: Ze(["page-item", { disabled: a.value }])
        }, [
          m("button", {
            type: "button",
            class: "page-link",
            disabled: a.value,
            onClick: g
          }, Z(e.previousText), 9, T_)
        ], 2),
        (te(!0), ce(ke, null, dr(c.value, (A, k) => (te(), ce(ke, {
          key: `${A}-${k}`
        }, [
          f(k) ? (te(), ce("li", A_, [
            m("button", V_, Z(e.ellipsisText), 1)
          ])) : (te(), ce("li", {
            key: 1,
            class: Ze(["page-item", { active: A === s.value }])
          }, [
            m("button", {
              type: "button",
              class: "page-link",
              onClick: (K) => u(A)
            }, Z(A), 9, k_)
          ], 2))
        ], 64))), 128)),
        m("li", {
          class: Ze(["page-item", { disabled: l.value }])
        }, [
          m("button", {
            type: "button",
            class: "page-link",
            disabled: l.value,
            onClick: y
          }, Z(e.nextText), 9, I_)
        ], 2),
        m("li", {
          class: Ze(["page-item", { disabled: l.value }])
        }, [
          m("button", {
            type: "button",
            class: "page-link",
            disabled: l.value,
            onClick: N
          }, Z(e.lastText), 9, j_)
        ], 2)
      ])
    ]));
  }
}, M_ = /* @__PURE__ */ Dn(L_, [["__scopeId", "data-v-096f7706"]]), Tn = (e) => (Ls("data-v-f85f19cd"), e = e(), Ms(), e), F_ = { class: "d-flex flex-column gap-2 mt-2" }, U_ = { class: "d-flex align-items-center gap-2 flex-wrap" }, H_ = { class: "input-group input-group-sm logs-search" }, B_ = /* @__PURE__ */ Tn(() => /* @__PURE__ */ m("span", { class: "input-group-text" }, [
  /* @__PURE__ */ m("i", { class: "fas fa-search fa-fw" })
], -1)), q_ = /* @__PURE__ */ Tn(() => /* @__PURE__ */ m("i", { class: "fas fa-times fa-fw" }, null, -1)), W_ = [
  q_
], K_ = ["disabled"], z_ = {
  key: 0,
  class: "fas fa-spinner fa-spin fa-fw"
}, G_ = {
  key: 1,
  class: "fas fa-refresh fa-fw"
}, J_ = { style: { "font-variant-numeric": "tabular-nums" } }, Y_ = { class: "number" }, X_ = /* @__PURE__ */ Tn(() => /* @__PURE__ */ m("span", null, "/", -1)), Q_ = { class: "number" }, Z_ = {
  key: 0,
  class: "alert alert-danger py-2 mb-0"
}, ey = { class: "table-responsive" }, ty = { class: "table table-striped table-bordered table-hover" }, ny = /* @__PURE__ */ Tn(() => /* @__PURE__ */ m("thead", null, [
  /* @__PURE__ */ m("tr", null, [
    /* @__PURE__ */ m("th", null, "log ID"),
    /* @__PURE__ */ m("th", null, "timestamp"),
    /* @__PURE__ */ m("th", null, "user"),
    /* @__PURE__ */ m("th", null, "IP"),
    /* @__PURE__ */ m("th", null, "project ID"),
    /* @__PURE__ */ m("th", null, "event ID"),
    /* @__PURE__ */ m("th", null, "record"),
    /* @__PURE__ */ m("th", null, "message"),
    /* @__PURE__ */ m("th", null, "status"),
    /* @__PURE__ */ m("th", null, "save action"),
    /* @__PURE__ */ m("th", null, "Epic status"),
    /* @__PURE__ */ m("th", null, "items"),
    /* @__PURE__ */ m("th", null, "description"),
    /* @__PURE__ */ m("th", null, "save errors"),
    /* @__PURE__ */ m("th", null, "MRN"),
    /* @__PURE__ */ m("th", null, "study ID")
  ])
], -1)), oy = { key: 0 }, ry = /* @__PURE__ */ Tn(() => /* @__PURE__ */ m("td", {
  colspan: "16",
  class: "text-center text-muted py-3"
}, "No logs found", -1)), sy = [
  ry
], iy = { class: "number" }, ay = { key: 0 }, ly = /* @__PURE__ */ Tn(() => /* @__PURE__ */ m("summary", null, "More...", -1)), cy = { key: 0 }, uy = {
  key: 1,
  class: "number"
}, fy = {
  __name: "LogsPage",
  setup(e) {
    const t = Uh(), n = ye(t.query);
    let o = null;
    const r = () => {
      n.value = "";
    }, s = (a) => {
      const l = parseInt((a == null ? void 0 : a.save_error_count) ?? 0, 10);
      return Number.isNaN(l) || l < 1 ? "More..." : l === 1 ? "1 error" : `${l} errors`;
    }, i = (a) => {
      const l = `${a ?? ""}`.toLowerCase();
      return l === "success" ? "text-bg-success" : l === "warning" ? "text-bg-warning" : l === "error" ? "text-bg-danger" : "text-bg-secondary";
    };
    return ot(n, (a) => {
      o && clearTimeout(o), o = setTimeout(() => {
        t.query = a.trim();
      }, 250);
    }), ot(() => t.query, (a) => {
      a !== n.value.trim() && (n.value = a);
    }), xl(() => {
      o && clearTimeout(o);
    }), (a, l) => (te(), ce("div", F_, [
      m("div", U_, [
        m("div", H_, [
          B_,
          gf(m("input", {
            "onUpdate:modelValue": l[0] || (l[0] = (c) => n.value = c),
            type: "search",
            class: "form-control",
            placeholder: "Search logs",
            "aria-label": "Search logs"
          }, null, 512), [
            [Fd, n.value]
          ]),
          n.value ? (te(), ce("button", {
            key: 0,
            type: "button",
            class: "btn btn-outline-secondary",
            "aria-label": "Clear search",
            onClick: r
          }, W_)) : Ft("", !0)
        ]),
        we(M_, {
          modelValue: se(t).page,
          "onUpdate:modelValue": l[1] || (l[1] = (c) => se(t).page = c),
          "per-page": se(t).perPage,
          "total-items": se(t).total
        }, null, 8, ["modelValue", "per-page", "total-items"]),
        m("button", {
          type: "button",
          class: "btn btn-sm btn-primary",
          onClick: l[2] || (l[2] = (...c) => se(t).refresh && se(t).refresh(...c)),
          disabled: se(t).loading
        }, [
          se(t).loading ? (te(), ce("i", z_)) : (te(), ce("i", G_))
        ], 8, K_),
        m("span", J_, [
          Nt(" Page "),
          m("span", Y_, Z(se(t).page), 1),
          X_,
          m("span", Q_, Z(se(t).totalPages), 1)
        ])
      ]),
      se(t).error ? (te(), ce("div", Z_, " Unable to load logs. ")) : Ft("", !0),
      m("div", ey, [
        m("table", ty, [
          ny,
          m("tbody", null, [
            se(t).logs.length === 0 ? (te(), ce("tr", oy, sy)) : Ft("", !0),
            (te(!0), ce(ke, null, dr(se(t).logs, (c, f) => (te(), ce("tr", {
              key: (c == null ? void 0 : c.log_id) ?? f
            }, [
              m("td", null, Z(c.log_id), 1),
              m("td", null, Z(c.timestamp), 1),
              m("td", null, Z(c.user), 1),
              m("td", null, Z(c.ip), 1),
              m("td", null, Z(c.project_id), 1),
              m("td", null, Z(c.event_id), 1),
              m("td", null, Z(c.record), 1),
              m("td", null, Z(c.message), 1),
              m("td", null, [
                m("span", {
                  class: Ze(["badge", i(c.status)])
                }, Z(c.status), 3)
              ]),
              m("td", null, Z(c.save_action), 1),
              m("td", null, Z(c.epic_status), 1),
              m("td", iy, Z(c.save_item_count), 1),
              m("td", null, [
                c.description ? (te(), ce("details", ay, [
                  ly,
                  m("pre", null, Z(c.description), 1)
                ])) : Ft("", !0)
              ]),
              m("td", null, [
                c.save_errors ? (te(), ce("details", cy, [
                  m("summary", null, Z(s(c)), 1),
                  m("pre", null, Z(c.save_errors), 1)
                ])) : (te(), ce("span", uy, Z(c.save_error_count), 1))
              ]),
              m("td", null, Z(c.MRN), 1),
              m("td", null, Z(c.study_id), 1)
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}, dy = /* @__PURE__ */ Dn(fy, [["__scopeId", "data-v-f85f19cd"]]), An = (e) => (Ls("data-v-0bdc2831"), e = e(), Ms(), e), py = { class: "d-flex flex-column gap-2 mt-2" }, hy = { class: "d-flex align-items-center gap-2 flex-wrap" }, my = ["disabled"], gy = {
  key: 0,
  class: "fas fa-spinner fa-spin fa-fw"
}, _y = {
  key: 1,
  class: "fas fa-refresh fa-fw"
}, yy = { style: { "font-variant-numeric": "tabular-nums" } }, Ey = { class: "number" }, by = {
  key: 0,
  class: "alert alert-danger py-2 mb-0"
}, vy = { class: "table-responsive" }, Ny = { class: "table table-striped table-bordered table-hover" }, wy = /* @__PURE__ */ An(() => /* @__PURE__ */ m("thead", null, [
  /* @__PURE__ */ m("tr", null, [
    /* @__PURE__ */ m("th", null, "month"),
    /* @__PURE__ */ m("th", null, "range"),
    /* @__PURE__ */ m("th", null, "rows"),
    /* @__PURE__ */ m("th", null, "created"),
    /* @__PURE__ */ m("th", null, "cleanup"),
    /* @__PURE__ */ m("th", null, "archive file"),
    /* @__PURE__ */ m("th", null, "manifest file"),
    /* @__PURE__ */ m("th", null, "downloads")
  ])
], -1)), Oy = { key: 0 }, Sy = /* @__PURE__ */ An(() => /* @__PURE__ */ m("td", {
  colspan: "8",
  class: "text-center text-muted py-3"
}, "No log archives found", -1)), xy = [
  Sy
], $y = { class: "number" }, Ry = {
  key: 0,
  class: "badge text-bg-secondary ms-1"
}, Py = { class: "archive-range" }, Cy = { class: "number" }, Dy = {
  key: 0,
  class: "text-muted small"
}, Ty = { class: "text-muted small" }, Ay = { class: "text-muted small" }, Vy = ["aria-label"], ky = ["href"], Iy = /* @__PURE__ */ An(() => /* @__PURE__ */ m("i", { class: "fas fa-file-archive fa-fw" }, null, -1)), jy = /* @__PURE__ */ An(() => /* @__PURE__ */ m("span", null, "Archive", -1)), Ly = [
  Iy,
  jy
], My = ["href"], Fy = /* @__PURE__ */ An(() => /* @__PURE__ */ m("i", { class: "fas fa-file-alt fa-fw" }, null, -1)), Uy = /* @__PURE__ */ An(() => /* @__PURE__ */ m("span", null, "Manifest", -1)), Hy = [
  Fy,
  Uy
], By = {
  __name: "LogArchivesPage",
  setup(e) {
    const t = Hh(), { archives: n, loading: o, error: r, total: s } = Op(t), i = (l) => l === "deleted" || l === "already_deleted" ? "text-bg-success" : l === "error" ? "text-bg-danger" : "text-bg-secondary", a = (l) => {
      const c = parseInt(l ?? 0, 10);
      return Number.isNaN(c) || c < 1 ? "0 B" : c < 1024 ? `${c} B` : c < 1024 * 1024 ? `${(c / 1024).toFixed(1)} KB` : `${(c / 1024 / 1024).toFixed(1)} MB`;
    };
    return qs(() => {
      t.loadList();
    }), (l, c) => (te(), ce("div", py, [
      m("div", hy, [
        m("button", {
          type: "button",
          class: "btn btn-sm btn-primary",
          onClick: c[0] || (c[0] = (...f) => se(t).loadList && se(t).loadList(...f)),
          disabled: se(o)
        }, [
          se(o) ? (te(), ce("i", gy)) : (te(), ce("i", _y))
        ], 8, my),
        m("span", yy, [
          Nt(" Archives "),
          m("span", Ey, Z(se(s)), 1)
        ])
      ]),
      se(r) ? (te(), ce("div", by, " Unable to load log archives. ")) : Ft("", !0),
      m("div", vy, [
        m("table", Ny, [
          wy,
          m("tbody", null, [
            se(n).length === 0 ? (te(), ce("tr", Oy, xy)) : Ft("", !0),
            (te(!0), ce(ke, null, dr(se(n), (f) => (te(), ce("tr", {
              key: f.month
            }, [
              m("td", null, [
                m("span", $y, Z(f.month), 1),
                f.is_partial_oldest_month ? (te(), ce("span", Ry, "partial")) : Ft("", !0)
              ]),
              m("td", null, [
                m("div", Py, [
                  m("span", null, Z(f.start), 1),
                  m("span", null, Z(f.end), 1)
                ])
              ]),
              m("td", Cy, Z(f.row_count), 1),
              m("td", null, Z(f.created_at), 1),
              m("td", null, [
                m("span", {
                  class: Ze(["badge", i(f.cleanup_status)])
                }, Z(f.cleanup_status || "archived"), 3),
                f.deleted_at ? (te(), ce("div", Dy, Z(f.deleted_at), 1)) : Ft("", !0)
              ]),
              m("td", null, [
                m("div", null, Z(f.archive_filename), 1),
                m("div", Ty, Z(a(f.archive_size)), 1)
              ]),
              m("td", null, [
                m("div", null, Z(f.manifest_filename), 1),
                m("div", Ay, Z(a(f.manifest_size)), 1)
              ]),
              m("td", null, [
                m("div", {
                  class: "btn-group btn-group-sm",
                  role: "group",
                  "aria-label": `Downloads for ${f.month}`
                }, [
                  m("a", {
                    class: "btn btn-outline-primary",
                    href: f.archive_download_url
                  }, Ly, 8, ky),
                  m("a", {
                    class: "btn btn-outline-secondary",
                    href: f.manifest_download_url
                  }, Hy, 8, My)
                ], 8, Vy)
              ])
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}, qy = /* @__PURE__ */ Dn(By, [["__scopeId", "data-v-0bdc2831"]]), Wy = [
  {
    path: "/",
    component: jg,
    // redirect: '/inbox',
    children: [
      { path: "", name: "home", component: Kg },
      { path: "project-templates", name: "project-templates", component: Yg },
      { path: "api-token", name: "api-token", component: R_ },
      { path: "logs", name: "logs", component: dy },
      { path: "log-archives", name: "log-archives", component: qy },
      { path: "/:pathMatch(.*)*", component: Ng }
    ]
  }
];
let xo;
const Ky = () => xo || (xo = fg({
  // Provide the history implementation to use. We are using the hash history for simplicity here.
  history: fm(),
  routes: Wy
}), xo), Gy = (e) => {
  const t = Bd(zh), n = bp();
  t.use(n);
  const o = Ky();
  return t.use(o), t.mount(e), t;
};
export {
  Gy as default
};
