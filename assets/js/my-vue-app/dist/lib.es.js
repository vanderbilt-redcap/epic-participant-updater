var Bc = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
};
var po = (e, t, n) => (Bc(e, t, "read from private field"), n ? n.call(e) : t.get(e)), ci = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
};
var Sa = {};
/**
* @vue/shared v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function St(e, t) {
  const n = new Set(e.split(","));
  return t ? (o) => n.has(o.toLowerCase()) : (o) => n.has(o);
}
const pe = Sa.NODE_ENV !== "production" ? Object.freeze({}) : {}, vn = Sa.NODE_ENV !== "production" ? Object.freeze([]) : [], Re = () => {
}, xa = () => !1, to = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Fo = (e) => e.startsWith("onUpdate:"), Oe = Object.assign, vs = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, qc = Object.prototype.hasOwnProperty, ne = (e, t) => qc.call(e, t), W = Array.isArray, nn = (e) => tr(e) === "[object Map]", Ra = (e) => tr(e) === "[object Set]", z = (e) => typeof e == "function", Se = (e) => typeof e == "string", Pn = (e) => typeof e == "symbol", le = (e) => e !== null && typeof e == "object", Ns = (e) => (le(e) || z(e)) && z(e.then) && z(e.catch), Pa = Object.prototype.toString, tr = (e) => Pa.call(e), ws = (e) => tr(e).slice(8, -1), Ca = (e) => tr(e) === "[object Object]", Os = (e) => Se(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, So = /* @__PURE__ */ St(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Wc = /* @__PURE__ */ St(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
), nr = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Kc = /-(\w)/g, ht = nr((e) => e.replace(Kc, (t, n) => n ? n.toUpperCase() : "")), zc = /\B([A-Z])/g, Ut = nr(
  (e) => e.replace(zc, "-$1").toLowerCase()
), un = nr((e) => e.charAt(0).toUpperCase() + e.slice(1)), Xt = nr((e) => e ? `on${un(e)}` : ""), Ht = (e, t) => !Object.is(e, t), gn = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, Uo = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, Fr = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let ui;
const Ss = () => ui || (ui = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function xs(e) {
  if (W(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n], r = Se(o) ? Xc(o) : xs(o);
      if (r)
        for (const s in r)
          t[s] = r[s];
    }
    return t;
  } else if (Se(e) || le(e))
    return e;
}
const Gc = /;(?![^(]*\))/g, Jc = /:([^]+)/, Yc = /\/\*[^]*?\*\//g;
function Xc(e) {
  const t = {};
  return e.replace(Yc, "").split(Gc).forEach((n) => {
    if (n) {
      const o = n.split(Jc);
      o.length > 1 && (t[o[0].trim()] = o[1].trim());
    }
  }), t;
}
function it(e) {
  let t = "";
  if (Se(e))
    t = e;
  else if (W(e))
    for (let n = 0; n < e.length; n++) {
      const o = it(e[n]);
      o && (t += o + " ");
    }
  else if (le(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Qc = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot", Zc = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", eu = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics", tu = /* @__PURE__ */ St(Qc), nu = /* @__PURE__ */ St(Zc), ou = /* @__PURE__ */ St(eu), ru = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", su = /* @__PURE__ */ St(ru);
function Da(e) {
  return !!e || e === "";
}
const me = (e) => Se(e) ? e : e == null ? "" : W(e) || le(e) && (e.toString === Pa || !z(e.toString)) ? JSON.stringify(e, $a, 2) : String(e), $a = (e, t) => t && t.__v_isRef ? $a(e, t.value) : nn(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [o, r], s) => (n[Nr(o, s) + " =>"] = r, n),
    {}
  )
} : Ra(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Nr(n))
} : Pn(t) ? Nr(t) : le(t) && !W(t) && !Ca(t) ? String(t) : t, Nr = (e, t = "") => {
  var n;
  return Pn(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
};
var Ce = {};
function Ho(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let qe;
class Ta {
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
      Ce.NODE_ENV !== "production" && Ho("cannot run an inactive effect scope.");
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
function Va(e) {
  return new Ta(e);
}
function iu(e, t = qe) {
  t && t.active && t.effects.push(e);
}
function Aa() {
  return qe;
}
function au(e) {
  qe ? qe.cleanups.push(e) : Ce.NODE_ENV !== "production" && Ho(
    "onScopeDispose() is called when there is no active effect scope to be associated with."
  );
}
let on;
class Rs {
  constructor(t, n, o, r) {
    this.fn = t, this.trigger = n, this.scheduler = o, this.active = !0, this.deps = [], this._dirtyLevel = 2, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, iu(this, r);
  }
  get dirty() {
    if (this._dirtyLevel === 1) {
      Kt();
      for (let t = 0; t < this._depsLength; t++) {
        const n = this.deps[t];
        if (n.computed && (lu(n.computed), this._dirtyLevel >= 2))
          break;
      }
      this._dirtyLevel < 2 && (this._dirtyLevel = 0), zt();
    }
    return this._dirtyLevel >= 2;
  }
  set dirty(t) {
    this._dirtyLevel = t ? 2 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let t = Ft, n = on;
    try {
      return Ft = !0, on = this, this._runnings++, fi(this), this.fn();
    } finally {
      di(this), this._runnings--, on = n, Ft = t;
    }
  }
  stop() {
    var t;
    this.active && (fi(this), di(this), (t = this.onStop) == null || t.call(this), this.active = !1);
  }
}
function lu(e) {
  return e.value;
}
function fi(e) {
  e._trackId++, e._depsLength = 0;
}
function di(e) {
  if (e.deps && e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++)
      Ia(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function Ia(e, t) {
  const n = e.get(t);
  n !== void 0 && t._trackId !== n && (e.delete(t), e.size === 0 && e.cleanup());
}
let Ft = !0, Ur = 0;
const ka = [];
function Kt() {
  ka.push(Ft), Ft = !1;
}
function zt() {
  const e = ka.pop();
  Ft = e === void 0 ? !0 : e;
}
function Ps() {
  Ur++;
}
function Cs() {
  for (Ur--; !Ur && Hr.length; )
    Hr.shift()();
}
function ja(e, t, n) {
  var o;
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const r = e.deps[e._depsLength];
    r !== t ? (r && Ia(r, e), e.deps[e._depsLength++] = t) : e._depsLength++, Ce.NODE_ENV !== "production" && ((o = e.onTrack) == null || o.call(e, Oe({ effect: e }, n)));
  }
}
const Hr = [];
function La(e, t, n) {
  var o;
  Ps();
  for (const r of e.keys())
    if (r._dirtyLevel < t && e.get(r) === r._trackId) {
      const s = r._dirtyLevel;
      r._dirtyLevel = t, s === 0 && (r._shouldSchedule = !0, Ce.NODE_ENV !== "production" && ((o = r.onTrigger) == null || o.call(r, Oe({ effect: r }, n))), r.trigger());
    }
  Ma(e), Cs();
}
function Ma(e) {
  for (const t of e.keys())
    t.scheduler && t._shouldSchedule && (!t._runnings || t.allowRecurse) && e.get(t) === t._trackId && (t._shouldSchedule = !1, Hr.push(t.scheduler));
}
const Fa = (e, t) => {
  const n = /* @__PURE__ */ new Map();
  return n.cleanup = e, n.computed = t, n;
}, Bo = /* @__PURE__ */ new WeakMap(), rn = Symbol(Ce.NODE_ENV !== "production" ? "iterate" : ""), Br = Symbol(Ce.NODE_ENV !== "production" ? "Map key iterate" : "");
function Ie(e, t, n) {
  if (Ft && on) {
    let o = Bo.get(e);
    o || Bo.set(e, o = /* @__PURE__ */ new Map());
    let r = o.get(n);
    r || o.set(n, r = Fa(() => o.delete(n))), ja(
      on,
      r,
      Ce.NODE_ENV !== "production" ? {
        target: e,
        type: t,
        key: n
      } : void 0
    );
  }
}
function ut(e, t, n, o, r, s) {
  const i = Bo.get(e);
  if (!i)
    return;
  let a = [];
  if (t === "clear")
    a = [...i.values()];
  else if (n === "length" && W(e)) {
    const l = Number(o);
    i.forEach((u, f) => {
      (f === "length" || !Pn(f) && f >= l) && a.push(u);
    });
  } else
    switch (n !== void 0 && a.push(i.get(n)), t) {
      case "add":
        W(e) ? Os(n) && a.push(i.get("length")) : (a.push(i.get(rn)), nn(e) && a.push(i.get(Br)));
        break;
      case "delete":
        W(e) || (a.push(i.get(rn)), nn(e) && a.push(i.get(Br)));
        break;
      case "set":
        nn(e) && a.push(i.get(rn));
        break;
    }
  Ps();
  for (const l of a)
    l && La(
      l,
      2,
      Ce.NODE_ENV !== "production" ? {
        target: e,
        type: t,
        key: n,
        newValue: o,
        oldValue: r,
        oldTarget: s
      } : void 0
    );
  Cs();
}
function cu(e, t) {
  var n;
  return (n = Bo.get(e)) == null ? void 0 : n.get(t);
}
const uu = /* @__PURE__ */ St("__proto__,__v_isRef,__isVue"), Ua = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Pn)
), pi = /* @__PURE__ */ fu();
function fu() {
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
      Kt(), Ps();
      const o = G(this)[t].apply(this, n);
      return Cs(), zt(), o;
    };
  }), e;
}
function du(e) {
  const t = G(this);
  return Ie(t, "has", e), t.hasOwnProperty(e);
}
class Ha {
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
      return o === (r ? s ? Ja : Ga : s ? za : Ka).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(o) ? t : void 0;
    const i = W(t);
    if (!r) {
      if (i && ne(pi, n))
        return Reflect.get(pi, n, o);
      if (n === "hasOwnProperty")
        return du;
    }
    const a = Reflect.get(t, n, o);
    return (Pn(n) ? Ua.has(n) : uu(n)) || (r || Ie(t, "get", n), s) ? a : ve(a) ? i && Os(n) ? a : a.value : le(a) ? r ? Xa(a) : no(a) : a;
  }
}
class Ba extends Ha {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, o, r) {
    let s = t[n];
    if (!this._shallow) {
      const l = Bt(s);
      if (!qo(o) && !Bt(o) && (s = G(s), o = G(o)), !W(t) && ve(s) && !ve(o))
        return l ? !1 : (s.value = o, !0);
    }
    const i = W(t) && Os(n) ? Number(n) < t.length : ne(t, n), a = Reflect.set(t, n, o, r);
    return t === G(r) && (i ? Ht(o, s) && ut(t, "set", n, o, s) : ut(t, "add", n, o)), a;
  }
  deleteProperty(t, n) {
    const o = ne(t, n), r = t[n], s = Reflect.deleteProperty(t, n);
    return s && o && ut(t, "delete", n, void 0, r), s;
  }
  has(t, n) {
    const o = Reflect.has(t, n);
    return (!Pn(n) || !Ua.has(n)) && Ie(t, "has", n), o;
  }
  ownKeys(t) {
    return Ie(
      t,
      "iterate",
      W(t) ? "length" : rn
    ), Reflect.ownKeys(t);
  }
}
class qa extends Ha {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return Ce.NODE_ENV !== "production" && Ho(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return Ce.NODE_ENV !== "production" && Ho(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const pu = /* @__PURE__ */ new Ba(), hu = /* @__PURE__ */ new qa(), mu = /* @__PURE__ */ new Ba(
  !0
), gu = /* @__PURE__ */ new qa(!0), Ds = (e) => e, or = (e) => Reflect.getPrototypeOf(e);
function ho(e, t, n = !1, o = !1) {
  e = e.__v_raw;
  const r = G(e), s = G(t);
  n || (Ht(t, s) && Ie(r, "get", t), Ie(r, "get", s));
  const { has: i } = or(r), a = o ? Ds : n ? $s : Kn;
  if (i.call(r, t))
    return a(e.get(t));
  if (i.call(r, s))
    return a(e.get(s));
  e !== r && e.get(t);
}
function mo(e, t = !1) {
  const n = this.__v_raw, o = G(n), r = G(e);
  return t || (Ht(e, r) && Ie(o, "has", e), Ie(o, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r);
}
function go(e, t = !1) {
  return e = e.__v_raw, !t && Ie(G(e), "iterate", rn), Reflect.get(e, "size", e);
}
function hi(e) {
  e = G(e);
  const t = G(this);
  return or(t).has.call(t, e) || (t.add(e), ut(t, "add", e, e)), this;
}
function mi(e, t) {
  t = G(t);
  const n = G(this), { has: o, get: r } = or(n);
  let s = o.call(n, e);
  s ? Ce.NODE_ENV !== "production" && Wa(n, o, e) : (e = G(e), s = o.call(n, e));
  const i = r.call(n, e);
  return n.set(e, t), s ? Ht(t, i) && ut(n, "set", e, t, i) : ut(n, "add", e, t), this;
}
function gi(e) {
  const t = G(this), { has: n, get: o } = or(t);
  let r = n.call(t, e);
  r ? Ce.NODE_ENV !== "production" && Wa(t, n, e) : (e = G(e), r = n.call(t, e));
  const s = o ? o.call(t, e) : void 0, i = t.delete(e);
  return r && ut(t, "delete", e, void 0, s), i;
}
function _i() {
  const e = G(this), t = e.size !== 0, n = Ce.NODE_ENV !== "production" ? nn(e) ? new Map(e) : new Set(e) : void 0, o = e.clear();
  return t && ut(e, "clear", void 0, void 0, n), o;
}
function _o(e, t) {
  return function(o, r) {
    const s = this, i = s.__v_raw, a = G(i), l = t ? Ds : e ? $s : Kn;
    return !e && Ie(a, "iterate", rn), i.forEach((u, f) => o.call(r, l(u), l(f), s));
  };
}
function yo(e, t, n) {
  return function(...o) {
    const r = this.__v_raw, s = G(r), i = nn(s), a = e === "entries" || e === Symbol.iterator && i, l = e === "keys" && i, u = r[e](...o), f = n ? Ds : t ? $s : Kn;
    return !t && Ie(
      s,
      "iterate",
      l ? Br : rn
    ), {
      // iterator protocol
      next() {
        const { value: c, done: p } = u.next();
        return p ? { value: c, done: p } : {
          value: a ? [f(c[0]), f(c[1])] : f(c),
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
function Dt(e) {
  return function(...t) {
    if (Ce.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(
        `${un(e)} operation ${n}failed: target is readonly.`,
        G(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function _u() {
  const e = {
    get(s) {
      return ho(this, s);
    },
    get size() {
      return go(this);
    },
    has: mo,
    add: hi,
    set: mi,
    delete: gi,
    clear: _i,
    forEach: _o(!1, !1)
  }, t = {
    get(s) {
      return ho(this, s, !1, !0);
    },
    get size() {
      return go(this);
    },
    has: mo,
    add: hi,
    set: mi,
    delete: gi,
    clear: _i,
    forEach: _o(!1, !0)
  }, n = {
    get(s) {
      return ho(this, s, !0);
    },
    get size() {
      return go(this, !0);
    },
    has(s) {
      return mo.call(this, s, !0);
    },
    add: Dt("add"),
    set: Dt("set"),
    delete: Dt("delete"),
    clear: Dt("clear"),
    forEach: _o(!0, !1)
  }, o = {
    get(s) {
      return ho(this, s, !0, !0);
    },
    get size() {
      return go(this, !0);
    },
    has(s) {
      return mo.call(this, s, !0);
    },
    add: Dt("add"),
    set: Dt("set"),
    delete: Dt("delete"),
    clear: Dt("clear"),
    forEach: _o(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
    e[s] = yo(
      s,
      !1,
      !1
    ), n[s] = yo(
      s,
      !0,
      !1
    ), t[s] = yo(
      s,
      !1,
      !0
    ), o[s] = yo(
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
  yu,
  Eu,
  bu,
  vu
] = /* @__PURE__ */ _u();
function rr(e, t) {
  const n = t ? e ? vu : bu : e ? Eu : yu;
  return (o, r, s) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? o : Reflect.get(
    ne(n, r) && r in o ? n : o,
    r,
    s
  );
}
const Nu = {
  get: /* @__PURE__ */ rr(!1, !1)
}, wu = {
  get: /* @__PURE__ */ rr(!1, !0)
}, Ou = {
  get: /* @__PURE__ */ rr(!0, !1)
}, Su = {
  get: /* @__PURE__ */ rr(!0, !0)
};
function Wa(e, t, n) {
  const o = G(n);
  if (o !== n && t.call(e, o)) {
    const r = ws(e);
    console.warn(
      `Reactive ${r} contains both the raw and reactive versions of the same object${r === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Ka = /* @__PURE__ */ new WeakMap(), za = /* @__PURE__ */ new WeakMap(), Ga = /* @__PURE__ */ new WeakMap(), Ja = /* @__PURE__ */ new WeakMap();
function xu(e) {
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
  return e.__v_skip || !Object.isExtensible(e) ? 0 : xu(ws(e));
}
function no(e) {
  return Bt(e) ? e : sr(
    e,
    !1,
    pu,
    Nu,
    Ka
  );
}
function Ya(e) {
  return sr(
    e,
    !1,
    mu,
    wu,
    za
  );
}
function Xa(e) {
  return sr(
    e,
    !0,
    hu,
    Ou,
    Ga
  );
}
function En(e) {
  return sr(
    e,
    !0,
    gu,
    Su,
    Ja
  );
}
function sr(e, t, n, o, r) {
  if (!le(e))
    return Ce.NODE_ENV !== "production" && console.warn(`value cannot be made reactive: ${String(e)}`), e;
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
function ft(e) {
  return Bt(e) ? ft(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Bt(e) {
  return !!(e && e.__v_isReadonly);
}
function qo(e) {
  return !!(e && e.__v_isShallow);
}
function Wo(e) {
  return ft(e) || Bt(e);
}
function G(e) {
  const t = e && e.__v_raw;
  return t ? G(t) : e;
}
function Nt(e) {
  return Uo(e, "__v_skip", !0), e;
}
const Kn = (e) => le(e) ? no(e) : e, $s = (e) => le(e) ? Xa(e) : e;
class Qa {
  constructor(t, n, o, r) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new Rs(
      () => t(this._value),
      () => xo(this, 1),
      () => this.dep && Ma(this.dep)
    ), this.effect.computed = this, this.effect.active = this._cacheable = !r, this.__v_isReadonly = o;
  }
  get value() {
    const t = G(this);
    return (!t._cacheable || t.effect.dirty) && Ht(t._value, t._value = t.effect.run()) && xo(t, 2), Za(t), t.effect._dirtyLevel >= 1 && xo(t, 1), t._value;
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
  s ? (o = e, r = Ce.NODE_ENV !== "production" ? () => {
    console.warn("Write operation failed: computed value is readonly");
  } : Re) : (o = e.get, r = e.set);
  const i = new Qa(o, r, s || !r, n);
  return Ce.NODE_ENV !== "production" && t && !n && (i.effect.onTrack = t.onTrack, i.effect.onTrigger = t.onTrigger), i;
}
function Za(e) {
  Ft && on && (e = G(e), ja(
    on,
    e.dep || (e.dep = Fa(
      () => e.dep = void 0,
      e instanceof Qa ? e : void 0
    )),
    Ce.NODE_ENV !== "production" ? {
      target: e,
      type: "get",
      key: "value"
    } : void 0
  ));
}
function xo(e, t = 2, n) {
  e = G(e);
  const o = e.dep;
  o && La(
    o,
    t,
    Ce.NODE_ENV !== "production" ? {
      target: e,
      type: "set",
      key: "value",
      newValue: n
    } : void 0
  );
}
function ve(e) {
  return !!(e && e.__v_isRef === !0);
}
function xe(e) {
  return el(e, !1);
}
function Cu(e) {
  return el(e, !0);
}
function el(e, t) {
  return ve(e) ? e : new Du(e, t);
}
class Du {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : G(t), this._value = n ? t : Kn(t);
  }
  get value() {
    return Za(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || qo(t) || Bt(t);
    t = n ? t : G(t), Ht(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : Kn(t), xo(this, 2, t));
  }
}
function ue(e) {
  return ve(e) ? e.value : e;
}
const $u = {
  get: (e, t, n) => ue(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const r = e[t];
    return ve(r) && !ve(n) ? (r.value = n, !0) : Reflect.set(e, t, n, o);
  }
};
function tl(e) {
  return ft(e) ? e : new Proxy(e, $u);
}
function qr(e) {
  Ce.NODE_ENV !== "production" && !Wo(e) && console.warn("toRefs() expects a reactive object but received a plain one.");
  const t = W(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = nl(e, n);
  return t;
}
class Tu {
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
    return cu(G(this._object), this._key);
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
function wr(e, t, n) {
  return ve(e) ? e : z(e) ? new Vu(e) : le(e) && arguments.length > 1 ? nl(e, t, n) : xe(e);
}
function nl(e, t, n) {
  const o = e[t];
  return ve(o) ? o : new Tu(e, t, n);
}
var g = {};
const sn = [];
function Ro(e) {
  sn.push(e);
}
function Po() {
  sn.pop();
}
function T(e, ...t) {
  Kt();
  const n = sn.length ? sn[sn.length - 1].component : null, o = n && n.appContext.config.warnHandler, r = Au();
  if (o)
    wt(
      o,
      n,
      11,
      [
        e + t.join(""),
        n && n.proxy,
        r.map(
          ({ vnode: s }) => `at <${hr(n, s.type)}>`
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
  zt();
}
function Au() {
  let e = sn[sn.length - 1];
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
`], ...ku(n));
  }), t;
}
function ku({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", o = e.component ? e.component.parent == null : !1, r = ` at <${hr(
    e.component,
    e.type,
    o
  )}`, s = ">" + n;
  return e.props ? [r, ...ju(e.props), s] : [r + s];
}
function ju(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((o) => {
    t.push(...ol(o, e[o]));
  }), n.length > 3 && t.push(" ..."), t;
}
function ol(e, t, n) {
  return Se(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : ve(t) ? (t = ol(e, G(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : z(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = G(t), n ? t : [`${e}=`, t]);
}
const Ts = {
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
function wt(e, t, n, o) {
  let r;
  try {
    r = o ? e(...o) : e();
  } catch (s) {
    oo(s, t, n);
  }
  return r;
}
function et(e, t, n, o) {
  if (z(e)) {
    const s = wt(e, t, n, o);
    return s && Ns(s) && s.catch((i) => {
      oo(i, t, n);
    }), s;
  }
  const r = [];
  for (let s = 0; s < e.length; s++)
    r.push(et(e[s], t, n, o));
  return r;
}
function oo(e, t, n, o = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let s = t.parent;
    const i = t.proxy, a = g.NODE_ENV !== "production" ? Ts[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; s; ) {
      const u = s.ec;
      if (u) {
        for (let f = 0; f < u.length; f++)
          if (u[f](e, i, a) === !1)
            return;
      }
      s = s.parent;
    }
    const l = t.appContext.config.errorHandler;
    if (l) {
      wt(
        l,
        null,
        10,
        [e, i, a]
      );
      return;
    }
  }
  Lu(e, n, r, o);
}
function Lu(e, t, n, o = !0) {
  if (g.NODE_ENV !== "production") {
    const r = Ts[t];
    if (n && Ro(n), T(`Unhandled error${r ? ` during execution of ${r}` : ""}`), n && Po(), o)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let zn = !1, Wr = !1;
const Le = [];
let at = 0;
const Nn = [];
let bt = null, Vt = 0;
const rl = /* @__PURE__ */ Promise.resolve();
let Vs = null;
const Mu = 100;
function Ko(e) {
  const t = Vs || rl;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Fu(e) {
  let t = at + 1, n = Le.length;
  for (; t < n; ) {
    const o = t + n >>> 1, r = Le[o], s = Gn(r);
    s < e || s === e && r.pre ? t = o + 1 : n = o;
  }
  return t;
}
function ir(e) {
  (!Le.length || !Le.includes(
    e,
    zn && e.allowRecurse ? at + 1 : at
  )) && (e.id == null ? Le.push(e) : Le.splice(Fu(e.id), 0, e), sl());
}
function sl() {
  !zn && !Wr && (Wr = !0, Vs = rl.then(ll));
}
function Uu(e) {
  const t = Le.indexOf(e);
  t > at && Le.splice(t, 1);
}
function il(e) {
  W(e) ? Nn.push(...e) : (!bt || !bt.includes(
    e,
    e.allowRecurse ? Vt + 1 : Vt
  )) && Nn.push(e), sl();
}
function yi(e, t, n = zn ? at + 1 : 0) {
  for (g.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()); n < Le.length; n++) {
    const o = Le[n];
    if (o && o.pre) {
      if (e && o.id !== e.uid || g.NODE_ENV !== "production" && As(t, o))
        continue;
      Le.splice(n, 1), n--, o();
    }
  }
}
function al(e) {
  if (Nn.length) {
    const t = [...new Set(Nn)].sort(
      (n, o) => Gn(n) - Gn(o)
    );
    if (Nn.length = 0, bt) {
      bt.push(...t);
      return;
    }
    for (bt = t, g.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), Vt = 0; Vt < bt.length; Vt++)
      g.NODE_ENV !== "production" && As(e, bt[Vt]) || bt[Vt]();
    bt = null, Vt = 0;
  }
}
const Gn = (e) => e.id == null ? 1 / 0 : e.id, Hu = (e, t) => {
  const n = Gn(e) - Gn(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function ll(e) {
  Wr = !1, zn = !0, g.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), Le.sort(Hu);
  const t = g.NODE_ENV !== "production" ? (n) => As(e, n) : Re;
  try {
    for (at = 0; at < Le.length; at++) {
      const n = Le[at];
      if (n && n.active !== !1) {
        if (g.NODE_ENV !== "production" && t(n))
          continue;
        wt(n, null, 14);
      }
    }
  } finally {
    at = 0, Le.length = 0, al(e), zn = !1, Vs = null, (Le.length || Nn.length) && ll(e);
  }
}
function As(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > Mu) {
      const o = t.ownerInstance, r = o && Ks(o.type);
      return oo(
        `Maximum recursive updates exceeded${r ? ` in component <${r}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
        null,
        10
      ), !0;
    } else
      e.set(t, n + 1);
  }
}
let an = !1;
const _n = /* @__PURE__ */ new Set();
g.NODE_ENV !== "production" && (Ss().__VUE_HMR_RUNTIME__ = {
  createRecord: Or(cl),
  rerender: Or(Wu),
  reload: Or(Ku)
});
const fn = /* @__PURE__ */ new Map();
function Bu(e) {
  const t = e.type.__hmrId;
  let n = fn.get(t);
  n || (cl(t, e.type), n = fn.get(t)), n.instances.add(e);
}
function qu(e) {
  fn.get(e.type.__hmrId).instances.delete(e);
}
function cl(e, t) {
  return fn.has(e) ? !1 : (fn.set(e, {
    initialDef: Fn(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function Fn(e) {
  return Ul(e) ? e.__vccOpts : e;
}
function Wu(e, t) {
  const n = fn.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((o) => {
    t && (o.render = t, Fn(o.type).render = t), o.renderCache = [], an = !0, o.effect.dirty = !0, o.update(), an = !1;
  }));
}
function Ku(e, t) {
  const n = fn.get(e);
  if (!n)
    return;
  t = Fn(t), Ei(n.initialDef, t);
  const o = [...n.instances];
  for (const r of o) {
    const s = Fn(r.type);
    _n.has(s) || (s !== n.initialDef && Ei(s, t), _n.add(s)), r.appContext.propsCache.delete(r.type), r.appContext.emitsCache.delete(r.type), r.appContext.optionsCache.delete(r.type), r.ceReload ? (_n.add(s), r.ceReload(t.styles), _n.delete(s)) : r.parent ? (r.parent.effect.dirty = !0, ir(r.parent.update)) : r.appContext.reload ? r.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    );
  }
  il(() => {
    for (const r of o)
      _n.delete(
        Fn(r.type)
      );
  });
}
function Ei(e, t) {
  Oe(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Or(e) {
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
let lt, jn = [], Kr = !1;
function ro(e, ...t) {
  lt ? lt.emit(e, ...t) : Kr || jn.push({ event: e, args: t });
}
function ul(e, t) {
  var n, o;
  lt = e, lt ? (lt.enabled = !0, jn.forEach(({ event: r, args: s }) => lt.emit(r, ...s)), jn = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  !((o = (n = window.navigator) == null ? void 0 : n.userAgent) != null && o.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((s) => {
    ul(s, t);
  }), setTimeout(() => {
    lt || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, Kr = !0, jn = []);
  }, 3e3)) : (Kr = !0, jn = []);
}
function zu(e, t) {
  ro("app:init", e, t, {
    Fragment: je,
    Text: so,
    Comment: Be,
    Static: To
  });
}
function Gu(e) {
  ro("app:unmount", e);
}
const Ju = /* @__PURE__ */ Is(
  "component:added"
  /* COMPONENT_ADDED */
), fl = /* @__PURE__ */ Is(
  "component:updated"
  /* COMPONENT_UPDATED */
), Yu = /* @__PURE__ */ Is(
  "component:removed"
  /* COMPONENT_REMOVED */
), Xu = (e) => {
  lt && typeof lt.cleanupBuffer == "function" && // remove the component if it wasn't buffered
  !lt.cleanupBuffer(e) && Yu(e);
};
function Is(e) {
  return (t) => {
    ro(
      e,
      t.appContext.app,
      t.uid,
      t.parent ? t.parent.uid : void 0,
      t
    );
  };
}
const Qu = /* @__PURE__ */ dl(
  "perf:start"
  /* PERFORMANCE_START */
), Zu = /* @__PURE__ */ dl(
  "perf:end"
  /* PERFORMANCE_END */
);
function dl(e) {
  return (t, n, o) => {
    ro(e, t.appContext.app, t.uid, t, n, o);
  };
}
function ef(e, t, n) {
  ro(
    "component:emit",
    e.appContext.app,
    e,
    t,
    n
  );
}
function tf(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const o = e.vnode.props || pe;
  if (g.NODE_ENV !== "production") {
    const {
      emitsOptions: f,
      propsOptions: [c]
    } = e;
    if (f)
      if (!(t in f))
        (!c || !(Xt(t) in c)) && T(
          `Component emitted event "${t}" but it is neither declared in the emits option nor as an "${Xt(t)}" prop.`
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
    const f = `${i === "modelValue" ? "model" : i}Modifiers`, { number: c, trim: p } = o[f] || pe;
    p && (r = n.map((m) => Se(m) ? m.trim() : m)), c && (r = n.map(Fr));
  }
  if (g.NODE_ENV !== "production" && ef(e, t, r), g.NODE_ENV !== "production") {
    const f = t.toLowerCase();
    f !== t && o[Xt(f)] && T(
      `Event "${f}" is emitted in component ${hr(
        e,
        e.type
      )} but the handler is registered for "${t}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${Ut(
        t
      )}" instead of "${t}".`
    );
  }
  let a, l = o[a = Xt(t)] || // also try camelCase event handler (#2249)
  o[a = Xt(ht(t))];
  !l && s && (l = o[a = Xt(Ut(t))]), l && et(
    l,
    e,
    6,
    r
  );
  const u = o[a + "Once"];
  if (u) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[a])
      return;
    e.emitted[a] = !0, et(
      u,
      e,
      6,
      r
    );
  }
}
function pl(e, t, n = !1) {
  const o = t.emitsCache, r = o.get(e);
  if (r !== void 0)
    return r;
  const s = e.emits;
  let i = {}, a = !1;
  if (!z(e)) {
    const l = (u) => {
      const f = pl(u, t, !0);
      f && (a = !0, Oe(i, f));
    };
    !n && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l);
  }
  return !s && !a ? (le(e) && o.set(e, null), null) : (W(s) ? s.forEach((l) => i[l] = null) : Oe(i, s), le(e) && o.set(e, i), i);
}
function ar(e, t) {
  return !e || !to(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), ne(e, t[0].toLowerCase() + t.slice(1)) || ne(e, Ut(t)) || ne(e, t));
}
let we = null, lr = null;
function zo(e) {
  const t = we;
  return we = e, lr = e && e.type.__scopeId || null, t;
}
function hl(e) {
  lr = e;
}
function ml() {
  lr = null;
}
function jt(e, t = we, n) {
  if (!t || e._n)
    return e;
  const o = (...r) => {
    o._d && Ti(-1);
    const s = zo(t);
    let i;
    try {
      i = e(...r);
    } finally {
      zo(s), o._d && Ti(1);
    }
    return g.NODE_ENV !== "production" && fl(t), i;
  };
  return o._n = !0, o._c = !0, o._d = !0, o;
}
let zr = !1;
function Go() {
  zr = !0;
}
function Sr(e) {
  const {
    type: t,
    vnode: n,
    proxy: o,
    withProxy: r,
    props: s,
    propsOptions: [i],
    slots: a,
    attrs: l,
    emit: u,
    render: f,
    renderCache: c,
    data: p,
    setupState: m,
    ctx: _,
    inheritAttrs: N
  } = e;
  let R, O;
  const V = zo(e);
  g.NODE_ENV !== "production" && (zr = !1);
  try {
    if (n.shapeFlag & 4) {
      const ee = r || o, se = g.NODE_ENV !== "production" && m.__isScriptSetup ? new Proxy(ee, {
        get(D, Te, he) {
          return T(
            `Property '${String(
              Te
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          ), Reflect.get(D, Te, he);
        }
      }) : ee;
      R = Qe(
        f.call(
          se,
          ee,
          c,
          s,
          m,
          p,
          _
        )
      ), O = l;
    } else {
      const ee = t;
      g.NODE_ENV !== "production" && l === s && Go(), R = Qe(
        ee.length > 1 ? ee(
          s,
          g.NODE_ENV !== "production" ? {
            get attrs() {
              return Go(), l;
            },
            slots: a,
            emit: u
          } : { attrs: l, slots: a, emit: u }
        ) : ee(
          s,
          null
          /* we know it doesn't need it */
        )
      ), O = t.props ? l : nf(l);
    }
  } catch (ee) {
    Hn.length = 0, oo(ee, e, 1), R = Ne(Be);
  }
  let I = R, K;
  if (g.NODE_ENV !== "production" && R.patchFlag > 0 && R.patchFlag & 2048 && ([I, K] = gl(R)), O && N !== !1) {
    const ee = Object.keys(O), { shapeFlag: se } = I;
    if (ee.length) {
      if (se & 7)
        i && ee.some(Fo) && (O = of(
          O,
          i
        )), I = qt(I, O);
      else if (g.NODE_ENV !== "production" && !zr && I.type !== Be) {
        const D = Object.keys(l), Te = [], he = [];
        for (let F = 0, L = D.length; F < L; F++) {
          const te = D[F];
          to(te) ? Fo(te) || Te.push(te[2].toLowerCase() + te.slice(3)) : he.push(te);
        }
        he.length && T(
          `Extraneous non-props attributes (${he.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes.`
        ), Te.length && T(
          `Extraneous non-emits event listeners (${Te.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
        );
      }
    }
  }
  return n.dirs && (g.NODE_ENV !== "production" && !bi(I) && T(
    "Runtime directive used on component with non-element root node. The directives will not function as intended."
  ), I = qt(I), I.dirs = I.dirs ? I.dirs.concat(n.dirs) : n.dirs), n.transition && (g.NODE_ENV !== "production" && !bi(I) && T(
    "Component inside <Transition> renders non-element root node that cannot be animated."
  ), I.transition = n.transition), g.NODE_ENV !== "production" && K ? K(I) : R = I, zo(V), R;
}
const gl = (e) => {
  const t = e.children, n = e.dynamicChildren, o = ks(t, !1);
  if (o) {
    if (g.NODE_ENV !== "production" && o.patchFlag > 0 && o.patchFlag & 2048)
      return gl(o);
  } else
    return [e, void 0];
  const r = t.indexOf(o), s = n ? n.indexOf(o) : -1, i = (a) => {
    t[r] = a, n && (s > -1 ? n[s] = a : a.patchFlag > 0 && (e.dynamicChildren = [...n, a]));
  };
  return [Qe(o), i];
};
function ks(e, t = !0) {
  let n;
  for (let o = 0; o < e.length; o++) {
    const r = e[o];
    if (On(r)) {
      if (r.type !== Be || r.children === "v-if") {
        if (n)
          return;
        if (n = r, g.NODE_ENV !== "production" && t && n.patchFlag > 0 && n.patchFlag & 2048)
          return ks(n.children);
      }
    } else
      return;
  }
  return n;
}
const nf = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || to(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, of = (e, t) => {
  const n = {};
  for (const o in e)
    (!Fo(o) || !(o.slice(9) in t)) && (n[o] = e[o]);
  return n;
}, bi = (e) => e.shapeFlag & 7 || e.type === Be;
function rf(e, t, n) {
  const { props: o, children: r, component: s } = e, { props: i, children: a, patchFlag: l } = t, u = s.emitsOptions;
  if (g.NODE_ENV !== "production" && (r || a) && an || t.dirs || t.transition)
    return !0;
  if (n && l >= 0) {
    if (l & 1024)
      return !0;
    if (l & 16)
      return o ? vi(o, i, u) : !!i;
    if (l & 8) {
      const f = t.dynamicProps;
      for (let c = 0; c < f.length; c++) {
        const p = f[c];
        if (i[p] !== o[p] && !ar(u, p))
          return !0;
      }
    }
  } else
    return (r || a) && (!a || !a.$stable) ? !0 : o === i ? !1 : o ? i ? vi(o, i, u) : !0 : !!i;
  return !1;
}
function vi(e, t, n) {
  const o = Object.keys(t);
  if (o.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < o.length; r++) {
    const s = o[r];
    if (t[s] !== e[s] && !ar(n, s))
      return !0;
  }
  return !1;
}
function sf({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.el = e.el), o === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const Gr = "components";
function js(e, t) {
  return lf(Gr, e, !0, t) || e;
}
const af = Symbol.for("v-ndc");
function lf(e, t, n = !0, o = !1) {
  const r = we || Pe;
  if (r) {
    const s = r.type;
    if (e === Gr) {
      const a = Ks(
        s,
        !1
      );
      if (a && (a === t || a === ht(t) || a === un(ht(t))))
        return s;
    }
    const i = (
      // local registration
      // check instance[type] first which is resolved for options API
      Ni(r[e] || s[e], t) || // global registration
      Ni(r.appContext[e], t)
    );
    if (!i && o)
      return s;
    if (g.NODE_ENV !== "production" && n && !i) {
      const a = e === Gr ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : "";
      T(`Failed to resolve ${e.slice(0, -1)}: ${t}${a}`);
    }
    return i;
  } else
    g.NODE_ENV !== "production" && T(
      `resolve${un(e.slice(0, -1))} can only be used in render() or setup().`
    );
}
function Ni(e, t) {
  return e && (e[t] || e[ht(t)] || e[un(ht(t))]);
}
const cf = (e) => e.__isSuspense;
function uf(e, t) {
  t && t.pendingBranch ? W(e) ? t.effects.push(...e) : t.effects.push(e) : il(e);
}
const ff = Symbol.for("v-scx"), df = () => {
  {
    const e = dt(ff);
    return e || g.NODE_ENV !== "production" && T(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
};
function pf(e, t) {
  return Ls(e, null, t);
}
const Eo = {};
function tt(e, t, n) {
  return g.NODE_ENV !== "production" && !z(t) && T(
    "`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."
  ), Ls(e, t, n);
}
function Ls(e, t, {
  immediate: n,
  deep: o,
  flush: r,
  once: s,
  onTrack: i,
  onTrigger: a
} = pe) {
  if (t && s) {
    const D = t;
    t = (...Te) => {
      D(...Te), se();
    };
  }
  g.NODE_ENV !== "production" && o !== void 0 && typeof o == "number" && T(
    'watch() "deep" option with number value will be used as watch depth in future versions. Please use a boolean instead to avoid potential breakage.'
  ), g.NODE_ENV !== "production" && !t && (n !== void 0 && T(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), o !== void 0 && T(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), s !== void 0 && T(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const l = (D) => {
    T(
      "Invalid watch source: ",
      D,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, u = Pe, f = (D) => o === !0 ? D : (
    // for deep: false, only traverse root-level properties
    tn(D, o === !1 ? 1 : void 0)
  );
  let c, p = !1, m = !1;
  if (ve(e) ? (c = () => e.value, p = qo(e)) : ft(e) ? (c = () => f(e), p = !0) : W(e) ? (m = !0, p = e.some((D) => ft(D) || qo(D)), c = () => e.map((D) => {
    if (ve(D))
      return D.value;
    if (ft(D))
      return f(D);
    if (z(D))
      return wt(D, u, 2);
    g.NODE_ENV !== "production" && l(D);
  })) : z(e) ? t ? c = () => wt(e, u, 2) : c = () => (_ && _(), et(
    e,
    u,
    3,
    [N]
  )) : (c = Re, g.NODE_ENV !== "production" && l(e)), t && o) {
    const D = c;
    c = () => tn(D());
  }
  let _, N = (D) => {
    _ = K.onStop = () => {
      wt(D, u, 4), _ = K.onStop = void 0;
    };
  }, R;
  if (dr)
    if (N = Re, t ? n && et(t, u, 3, [
      c(),
      m ? [] : void 0,
      N
    ]) : c(), r === "sync") {
      const D = df();
      R = D.__watcherHandles || (D.__watcherHandles = []);
    } else
      return Re;
  let O = m ? new Array(e.length).fill(Eo) : Eo;
  const V = () => {
    if (!(!K.active || !K.dirty))
      if (t) {
        const D = K.run();
        (o || p || (m ? D.some((Te, he) => Ht(Te, O[he])) : Ht(D, O))) && (_ && _(), et(t, u, 3, [
          D,
          // pass undefined as the old value when it's changed for the first time
          O === Eo ? void 0 : m && O[0] === Eo ? [] : O,
          N
        ]), O = D);
      } else
        K.run();
  };
  V.allowRecurse = !!t;
  let I;
  r === "sync" ? I = V : r === "post" ? I = () => He(V, u && u.suspense) : (V.pre = !0, u && (V.id = u.uid), I = () => ir(V));
  const K = new Rs(c, Re, I), ee = Aa(), se = () => {
    K.stop(), ee && vs(ee.effects, K);
  };
  return g.NODE_ENV !== "production" && (K.onTrack = i, K.onTrigger = a), t ? n ? V() : O = K.run() : r === "post" ? He(
    K.run.bind(K),
    u && u.suspense
  ) : K.run(), R && R.push(se), se;
}
function hf(e, t, n) {
  const o = this.proxy, r = Se(e) ? e.includes(".") ? _l(o, e) : () => o[e] : e.bind(o, o);
  let s;
  z(t) ? s = t : (s = t.handler, n = t);
  const i = io(this), a = Ls(r, s.bind(o), n);
  return i(), a;
}
function _l(e, t) {
  const n = t.split(".");
  return () => {
    let o = e;
    for (let r = 0; r < n.length && o; r++)
      o = o[n[r]];
    return o;
  };
}
function tn(e, t, n = 0, o) {
  if (!le(e) || e.__v_skip)
    return e;
  if (t && t > 0) {
    if (n >= t)
      return e;
    n++;
  }
  if (o = o || /* @__PURE__ */ new Set(), o.has(e))
    return e;
  if (o.add(e), ve(e))
    tn(e.value, t, n, o);
  else if (W(e))
    for (let r = 0; r < e.length; r++)
      tn(e[r], t, n, o);
  else if (Ra(e) || nn(e))
    e.forEach((r) => {
      tn(r, t, n, o);
    });
  else if (Ca(e))
    for (const r in e)
      tn(e[r], t, n, o);
  return e;
}
function yl(e) {
  Wc(e) && T("Do not use built-in directive ids as custom directive id: " + e);
}
function mf(e, t) {
  if (we === null)
    return g.NODE_ENV !== "production" && T("withDirectives can only be used inside render functions."), e;
  const n = pr(we) || we.proxy, o = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [s, i, a, l = pe] = t[r];
    s && (z(s) && (s = {
      mounted: s,
      updated: s
    }), s.deep && tn(i), o.push({
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
function Jt(e, t, n, o) {
  const r = e.dirs, s = t && t.dirs;
  for (let i = 0; i < r.length; i++) {
    const a = r[i];
    s && (a.oldValue = s[i].value);
    let l = a.dir[o];
    l && (Kt(), et(l, n, 8, [
      e.el,
      a,
      e,
      t
    ]), zt());
  }
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function El(e, t) {
  return z(e) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Oe({ name: e.name }, t, { setup: e })
  ) : e;
}
const Un = (e) => !!e.type.__asyncLoader, Ms = (e) => e.type.__isKeepAlive;
function gf(e, t) {
  bl(e, "a", t);
}
function _f(e, t) {
  bl(e, "da", t);
}
function bl(e, t, n = Pe) {
  const o = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (cr(t, o, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      Ms(r.parent.vnode) && yf(o, t, n, r), r = r.parent;
  }
}
function yf(e, t, n, o) {
  const r = cr(
    t,
    e,
    o,
    !0
    /* prepend */
  );
  wl(() => {
    vs(o[t], r);
  }, n);
}
function cr(e, t, n = Pe, o = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...i) => {
      if (n.isUnmounted)
        return;
      Kt();
      const a = io(n), l = et(t, n, e, i);
      return a(), zt(), l;
    });
    return o ? r.unshift(s) : r.push(s), s;
  } else if (g.NODE_ENV !== "production") {
    const r = Xt(Ts[e].replace(/ hook$/, ""));
    T(
      `${r} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const xt = (e) => (t, n = Pe) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!dr || e === "sp") && cr(e, (...o) => t(...o), n)
), Ef = xt("bm"), vl = xt("m"), bf = xt("bu"), vf = xt("u"), Nl = xt("bum"), wl = xt("um"), Nf = xt("sp"), wf = xt(
  "rtg"
), Of = xt(
  "rtc"
);
function Sf(e, t = Pe) {
  cr("ec", e, t);
}
function Fs(e, t, n, o) {
  let r;
  const s = n && n[o];
  if (W(e) || Se(e)) {
    r = new Array(e.length);
    for (let i = 0, a = e.length; i < a; i++)
      r[i] = t(e[i], i, void 0, s && s[i]);
  } else if (typeof e == "number") {
    g.NODE_ENV !== "production" && !Number.isInteger(e) && T(`The v-for range expect an integer value but got ${e}.`), r = new Array(e);
    for (let i = 0; i < e; i++)
      r[i] = t(i + 1, i, void 0, s && s[i]);
  } else if (le(e))
    if (e[Symbol.iterator])
      r = Array.from(
        e,
        (i, a) => t(i, a, void 0, s && s[a])
      );
    else {
      const i = Object.keys(e);
      r = new Array(i.length);
      for (let a = 0, l = i.length; a < l; a++) {
        const u = i[a];
        r[a] = t(e[u], u, a, s && s[a]);
      }
    }
  else
    r = [];
  return n && (n[o] = r), r;
}
function Co(e, t, n = {}, o, r) {
  if (we.isCE || we.parent && Un(we.parent) && we.parent.isCE)
    return t !== "default" && (n.name = t), Ne("slot", n, o && o());
  let s = e[t];
  g.NODE_ENV !== "production" && s && s.length > 1 && (T(
    "SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template."
  ), s = () => []), s && s._c && (s._d = !1), fe();
  const i = s && Ol(s(n)), a = ur(
    je,
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
function Ol(e) {
  return e.some((t) => On(t) ? !(t.type === Be || t.type === je && !Ol(t.children)) : !0) ? e : null;
}
const Jr = (e) => e ? Ml(e) ? pr(e) || e.proxy : Jr(e.parent) : null, ln = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Oe(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => g.NODE_ENV !== "production" ? En(e.props) : e.props,
    $attrs: (e) => g.NODE_ENV !== "production" ? En(e.attrs) : e.attrs,
    $slots: (e) => g.NODE_ENV !== "production" ? En(e.slots) : e.slots,
    $refs: (e) => g.NODE_ENV !== "production" ? En(e.refs) : e.refs,
    $parent: (e) => Jr(e.parent),
    $root: (e) => Jr(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Hs(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      e.effect.dirty = !0, ir(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Ko.bind(e.proxy)),
    $watch: (e) => hf.bind(e)
  })
), Us = (e) => e === "_" || e === "$", xr = (e, t) => e !== pe && !e.__isScriptSetup && ne(e, t), Sl = {
  get({ _: e }, t) {
    const { ctx: n, setupState: o, data: r, props: s, accessCache: i, type: a, appContext: l } = e;
    if (g.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let u;
    if (t[0] !== "$") {
      const m = i[t];
      if (m !== void 0)
        switch (m) {
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
        if (xr(o, t))
          return i[t] = 1, o[t];
        if (r !== pe && ne(r, t))
          return i[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = e.propsOptions[0]) && ne(u, t)
        )
          return i[t] = 3, s[t];
        if (n !== pe && ne(n, t))
          return i[t] = 4, n[t];
        Yr && (i[t] = 0);
      }
    }
    const f = ln[t];
    let c, p;
    if (f)
      return t === "$attrs" ? (Ie(e, "get", t), g.NODE_ENV !== "production" && Go()) : g.NODE_ENV !== "production" && t === "$slots" && Ie(e, "get", t), f(e);
    if (
      // css module (injected by vue-loader)
      (c = a.__cssModules) && (c = c[t])
    )
      return c;
    if (n !== pe && ne(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      p = l.config.globalProperties, ne(p, t)
    )
      return p[t];
    g.NODE_ENV !== "production" && we && (!Se(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (r !== pe && Us(t[0]) && ne(r, t) ? T(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === we && T(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: o, setupState: r, ctx: s } = e;
    return xr(r, t) ? (r[t] = n, !0) : g.NODE_ENV !== "production" && r.__isScriptSetup && ne(r, t) ? (T(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : o !== pe && ne(o, t) ? (o[t] = n, !0) : ne(e.props, t) ? (g.NODE_ENV !== "production" && T(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (g.NODE_ENV !== "production" && T(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (g.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(s, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : s[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: o, appContext: r, propsOptions: s }
  }, i) {
    let a;
    return !!n[i] || e !== pe && ne(e, i) || xr(t, i) || (a = s[0]) && ne(a, i) || ne(o, i) || ne(ln, i) || ne(r.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : ne(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
g.NODE_ENV !== "production" && (Sl.ownKeys = (e) => (T(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function xf(e) {
  const t = {};
  return Object.defineProperty(t, "_", {
    configurable: !0,
    enumerable: !1,
    get: () => e
  }), Object.keys(ln).forEach((n) => {
    Object.defineProperty(t, n, {
      configurable: !0,
      enumerable: !1,
      get: () => ln[n](e),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: Re
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
      set: Re
    });
  });
}
function Pf(e) {
  const { ctx: t, setupState: n } = e;
  Object.keys(G(n)).forEach((o) => {
    if (!n.__isScriptSetup) {
      if (Us(o[0])) {
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
        set: Re
      });
    }
  });
}
function wi(e) {
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
let Yr = !0;
function Df(e) {
  const t = Hs(e), n = e.proxy, o = e.ctx;
  Yr = !1, t.beforeCreate && Oi(t.beforeCreate, e, "bc");
  const {
    // state
    data: r,
    computed: s,
    methods: i,
    watch: a,
    provide: l,
    inject: u,
    // lifecycle
    created: f,
    beforeMount: c,
    mounted: p,
    beforeUpdate: m,
    updated: _,
    activated: N,
    deactivated: R,
    beforeDestroy: O,
    beforeUnmount: V,
    destroyed: I,
    unmounted: K,
    render: ee,
    renderTracked: se,
    renderTriggered: D,
    errorCaptured: Te,
    serverPrefetch: he,
    // public API
    expose: F,
    inheritAttrs: L,
    // assets
    components: te,
    directives: ye,
    filters: nt
  } = t, Ue = g.NODE_ENV !== "production" ? Cf() : null;
  if (g.NODE_ENV !== "production") {
    const [J] = e.propsOptions;
    if (J)
      for (const q in J)
        Ue("Props", q);
  }
  if (u && $f(u, o, Ue), i)
    for (const J in i) {
      const q = i[J];
      z(q) ? (g.NODE_ENV !== "production" ? Object.defineProperty(o, J, {
        value: q.bind(n),
        configurable: !0,
        enumerable: !0,
        writable: !0
      }) : o[J] = q.bind(n), g.NODE_ENV !== "production" && Ue("Methods", J)) : g.NODE_ENV !== "production" && T(
        `Method "${J}" has type "${typeof q}" in the component definition. Did you reference the function correctly?`
      );
    }
  if (r) {
    g.NODE_ENV !== "production" && !z(r) && T(
      "The data option must be a function. Plain object usage is no longer supported."
    );
    const J = r.call(n, n);
    if (g.NODE_ENV !== "production" && Ns(J) && T(
      "data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>."
    ), !le(J))
      g.NODE_ENV !== "production" && T("data() should return an object.");
    else if (e.data = no(J), g.NODE_ENV !== "production")
      for (const q in J)
        Ue("Data", q), Us(q[0]) || Object.defineProperty(o, q, {
          configurable: !0,
          enumerable: !0,
          get: () => J[q],
          set: Re
        });
  }
  if (Yr = !0, s)
    for (const J in s) {
      const q = s[J], Ke = z(q) ? q.bind(n, n) : z(q.get) ? q.get.bind(n, n) : Re;
      g.NODE_ENV !== "production" && Ke === Re && T(`Computed property "${J}" has no getter.`);
      const Gt = !z(q) && z(q.set) ? q.set.bind(n) : g.NODE_ENV !== "production" ? () => {
        T(
          `Write operation failed: computed property "${J}" is readonly.`
        );
      } : Re, Rt = _e({
        get: Ke,
        set: Gt
      });
      Object.defineProperty(o, J, {
        enumerable: !0,
        configurable: !0,
        get: () => Rt.value,
        set: (ot) => Rt.value = ot
      }), g.NODE_ENV !== "production" && Ue("Computed", J);
    }
  if (a)
    for (const J in a)
      xl(a[J], o, n, J);
  if (l) {
    const J = z(l) ? l.call(n) : l;
    Reflect.ownKeys(J).forEach((q) => {
      Do(q, J[q]);
    });
  }
  f && Oi(f, e, "c");
  function $e(J, q) {
    W(q) ? q.forEach((Ke) => J(Ke.bind(n))) : q && J(q.bind(n));
  }
  if ($e(Ef, c), $e(vl, p), $e(bf, m), $e(vf, _), $e(gf, N), $e(_f, R), $e(Sf, Te), $e(Of, se), $e(wf, D), $e(Nl, V), $e(wl, K), $e(Nf, he), W(F))
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
  ee && e.render === Re && (e.render = ee), L != null && (e.inheritAttrs = L), te && (e.components = te), ye && (e.directives = ye);
}
function $f(e, t, n = Re) {
  W(e) && (e = Xr(e));
  for (const o in e) {
    const r = e[o];
    let s;
    le(r) ? "default" in r ? s = dt(
      r.from || o,
      r.default,
      !0
    ) : s = dt(r.from || o) : s = dt(r), ve(s) ? Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (i) => s.value = i
    }) : t[o] = s, g.NODE_ENV !== "production" && n("Inject", o);
  }
}
function Oi(e, t, n) {
  et(
    W(e) ? e.map((o) => o.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function xl(e, t, n, o) {
  const r = o.includes(".") ? _l(n, o) : () => n[o];
  if (Se(e)) {
    const s = t[e];
    z(s) ? tt(r, s) : g.NODE_ENV !== "production" && T(`Invalid watch handler specified by key "${e}"`, s);
  } else if (z(e))
    tt(r, e.bind(n));
  else if (le(e))
    if (W(e))
      e.forEach((s) => xl(s, t, n, o));
    else {
      const s = z(e.handler) ? e.handler.bind(n) : t[e.handler];
      z(s) ? tt(r, s, e) : g.NODE_ENV !== "production" && T(`Invalid watch handler specified by key "${e.handler}"`, s);
    }
  else
    g.NODE_ENV !== "production" && T(`Invalid watch option: "${o}"`, e);
}
function Hs(e) {
  const t = e.type, { mixins: n, extends: o } = t, {
    mixins: r,
    optionsCache: s,
    config: { optionMergeStrategies: i }
  } = e.appContext, a = s.get(t);
  let l;
  return a ? l = a : !r.length && !n && !o ? l = t : (l = {}, r.length && r.forEach(
    (u) => Jo(l, u, i, !0)
  ), Jo(l, t, i)), le(t) && s.set(t, l), l;
}
function Jo(e, t, n, o = !1) {
  const { mixins: r, extends: s } = t;
  s && Jo(e, s, n, !0), r && r.forEach(
    (i) => Jo(e, i, n, !0)
  );
  for (const i in t)
    if (o && i === "expose")
      g.NODE_ENV !== "production" && T(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const a = Tf[i] || n && n[i];
      e[i] = a ? a(e[i], t[i]) : t[i];
    }
  return e;
}
const Tf = {
  data: Si,
  props: xi,
  emits: xi,
  // objects
  methods: Ln,
  computed: Ln,
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
  components: Ln,
  directives: Ln,
  // watch
  watch: Af,
  // provide / inject
  provide: Si,
  inject: Vf
};
function Si(e, t) {
  return t ? e ? function() {
    return Oe(
      z(e) ? e.call(this, this) : e,
      z(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Vf(e, t) {
  return Ln(Xr(e), Xr(t));
}
function Xr(e) {
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
function Ln(e, t) {
  return e ? Oe(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function xi(e, t) {
  return e ? W(e) && W(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Oe(
    /* @__PURE__ */ Object.create(null),
    wi(e),
    wi(t ?? {})
  ) : t;
}
function Af(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = Oe(/* @__PURE__ */ Object.create(null), e);
  for (const o in t)
    n[o] = Fe(e[o], t[o]);
  return n;
}
function Rl() {
  return {
    app: null,
    config: {
      isNativeTag: xa,
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
function kf(e, t) {
  return function(o, r = null) {
    z(o) || (o = Oe({}, o)), r != null && !le(r) && (g.NODE_ENV !== "production" && T("root props passed to app.mount() must be an object."), r = null);
    const s = Rl(), i = /* @__PURE__ */ new WeakSet();
    let a = !1;
    const l = s.app = {
      _uid: If++,
      _component: o,
      _props: r,
      _container: null,
      _context: s,
      _instance: null,
      version: ki,
      get config() {
        return s.config;
      },
      set config(u) {
        g.NODE_ENV !== "production" && T(
          "app.config cannot be replaced. Modify individual options instead."
        );
      },
      use(u, ...f) {
        return i.has(u) ? g.NODE_ENV !== "production" && T("Plugin has already been applied to target app.") : u && z(u.install) ? (i.add(u), u.install(l, ...f)) : z(u) ? (i.add(u), u(l, ...f)) : g.NODE_ENV !== "production" && T(
          'A plugin must either be a function or an object with an "install" function.'
        ), l;
      },
      mixin(u) {
        return s.mixins.includes(u) ? g.NODE_ENV !== "production" && T(
          "Mixin has already been applied to target app" + (u.name ? `: ${u.name}` : "")
        ) : s.mixins.push(u), l;
      },
      component(u, f) {
        return g.NODE_ENV !== "production" && ns(u, s.config), f ? (g.NODE_ENV !== "production" && s.components[u] && T(`Component "${u}" has already been registered in target app.`), s.components[u] = f, l) : s.components[u];
      },
      directive(u, f) {
        return g.NODE_ENV !== "production" && yl(u), f ? (g.NODE_ENV !== "production" && s.directives[u] && T(`Directive "${u}" has already been registered in target app.`), s.directives[u] = f, l) : s.directives[u];
      },
      mount(u, f, c) {
        if (a)
          g.NODE_ENV !== "production" && T(
            "App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`"
          );
        else {
          g.NODE_ENV !== "production" && u.__vue_app__ && T(
            "There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first."
          );
          const p = Ne(o, r);
          return p.appContext = s, c === !0 ? c = "svg" : c === !1 && (c = void 0), g.NODE_ENV !== "production" && (s.reload = () => {
            e(
              qt(p),
              u,
              c
            );
          }), f && t ? t(p, u) : e(p, u, c), a = !0, l._container = u, u.__vue_app__ = l, g.NODE_ENV !== "production" && (l._instance = p.component, zu(l, ki)), pr(p.component) || p.component.proxy;
        }
      },
      unmount() {
        a ? (e(null, l._container), g.NODE_ENV !== "production" && (l._instance = null, Gu(l)), delete l._container.__vue_app__) : g.NODE_ENV !== "production" && T("Cannot unmount an app that is not mounted.");
      },
      provide(u, f) {
        return g.NODE_ENV !== "production" && u in s.provides && T(
          `App already provides property with key "${String(u)}". It will be overwritten with the new value.`
        ), s.provides[u] = f, l;
      },
      runWithContext(u) {
        Jn = l;
        try {
          return u();
        } finally {
          Jn = null;
        }
      }
    };
    return l;
  };
}
let Jn = null;
function Do(e, t) {
  if (!Pe)
    g.NODE_ENV !== "production" && T("provide() can only be used inside setup().");
  else {
    let n = Pe.provides;
    const o = Pe.parent && Pe.parent.provides;
    o === n && (n = Pe.provides = Object.create(o)), n[e] = t;
  }
}
function dt(e, t, n = !1) {
  const o = Pe || we;
  if (o || Jn) {
    const r = o ? o.parent == null ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides : Jn._context.provides;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && z(t) ? t.call(o && o.proxy) : t;
    g.NODE_ENV !== "production" && T(`injection "${String(e)}" not found.`);
  } else
    g.NODE_ENV !== "production" && T("inject() can only be used inside setup() or functional components.");
}
function jf() {
  return !!(Pe || we || Jn);
}
function Lf(e, t, n, o = !1) {
  const r = {}, s = {};
  Uo(s, fr, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), Pl(e, t, r, s);
  for (const i in e.propsOptions[0])
    i in r || (r[i] = void 0);
  g.NODE_ENV !== "production" && Dl(t || {}, r, e), n ? e.props = o ? r : Ya(r) : e.type.props ? e.props = r : e.props = s, e.attrs = s;
}
function Mf(e) {
  for (; e; ) {
    if (e.type.__hmrId)
      return !0;
    e = e.parent;
  }
}
function Ff(e, t, n, o) {
  const {
    props: r,
    attrs: s,
    vnode: { patchFlag: i }
  } = e, a = G(r), [l] = e.propsOptions;
  let u = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !(g.NODE_ENV !== "production" && Mf(e)) && (o || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const f = e.vnode.dynamicProps;
      for (let c = 0; c < f.length; c++) {
        let p = f[c];
        if (ar(e.emitsOptions, p))
          continue;
        const m = t[p];
        if (l)
          if (ne(s, p))
            m !== s[p] && (s[p] = m, u = !0);
          else {
            const _ = ht(p);
            r[_] = Qr(
              l,
              a,
              _,
              m,
              e,
              !1
            );
          }
        else
          m !== s[p] && (s[p] = m, u = !0);
      }
    }
  } else {
    Pl(e, t, r, s) && (u = !0);
    let f;
    for (const c in a)
      (!t || // for camelCase
      !ne(t, c) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((f = Ut(c)) === c || !ne(t, f))) && (l ? n && // for camelCase
      (n[c] !== void 0 || // for kebab-case
      n[f] !== void 0) && (r[c] = Qr(
        l,
        a,
        c,
        void 0,
        e,
        !0
      )) : delete r[c]);
    if (s !== a)
      for (const c in s)
        (!t || !ne(t, c)) && (delete s[c], u = !0);
  }
  u && ut(e, "set", "$attrs"), g.NODE_ENV !== "production" && Dl(t || {}, r, e);
}
function Pl(e, t, n, o) {
  const [r, s] = e.propsOptions;
  let i = !1, a;
  if (t)
    for (let l in t) {
      if (So(l))
        continue;
      const u = t[l];
      let f;
      r && ne(r, f = ht(l)) ? !s || !s.includes(f) ? n[f] = u : (a || (a = {}))[f] = u : ar(e.emitsOptions, l) || (!(l in o) || u !== o[l]) && (o[l] = u, i = !0);
    }
  if (s) {
    const l = G(n), u = a || pe;
    for (let f = 0; f < s.length; f++) {
      const c = s[f];
      n[c] = Qr(
        r,
        l,
        c,
        u[c],
        e,
        !ne(u, c)
      );
    }
  }
  return i;
}
function Qr(e, t, n, o, r, s) {
  const i = e[n];
  if (i != null) {
    const a = ne(i, "default");
    if (a && o === void 0) {
      const l = i.default;
      if (i.type !== Function && !i.skipFactory && z(l)) {
        const { propsDefaults: u } = r;
        if (n in u)
          o = u[n];
        else {
          const f = io(r);
          o = u[n] = l.call(
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
    ] && (o === "" || o === Ut(n)) && (o = !0));
  }
  return o;
}
function Cl(e, t, n = !1) {
  const o = t.propsCache, r = o.get(e);
  if (r)
    return r;
  const s = e.props, i = {}, a = [];
  let l = !1;
  if (!z(e)) {
    const f = (c) => {
      l = !0;
      const [p, m] = Cl(c, t, !0);
      Oe(i, p), m && a.push(...m);
    };
    !n && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  if (!s && !l)
    return le(e) && o.set(e, vn), vn;
  if (W(s))
    for (let f = 0; f < s.length; f++) {
      g.NODE_ENV !== "production" && !Se(s[f]) && T("props must be strings when using array syntax.", s[f]);
      const c = ht(s[f]);
      Ri(c) && (i[c] = pe);
    }
  else if (s) {
    g.NODE_ENV !== "production" && !le(s) && T("invalid props options", s);
    for (const f in s) {
      const c = ht(f);
      if (Ri(c)) {
        const p = s[f], m = i[c] = W(p) || z(p) ? { type: p } : Oe({}, p);
        if (m) {
          const _ = Ci(Boolean, m.type), N = Ci(String, m.type);
          m[
            0
            /* shouldCast */
          ] = _ > -1, m[
            1
            /* shouldCastTrue */
          ] = N < 0 || _ < N, (_ > -1 || ne(m, "default")) && a.push(c);
        }
      }
    }
  }
  const u = [i, a];
  return le(e) && o.set(e, u), u;
}
function Ri(e) {
  return e[0] !== "$" ? !0 : (g.NODE_ENV !== "production" && T(`Invalid prop name: "${e}" is a reserved property.`), !1);
}
function Zr(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function Pi(e, t) {
  return Zr(e) === Zr(t);
}
function Ci(e, t) {
  return W(t) ? t.findIndex((n) => Pi(n, e)) : z(t) && Pi(t, e) ? 0 : -1;
}
function Dl(e, t, n) {
  const o = G(t), r = n.propsOptions[0];
  for (const s in r) {
    let i = r[s];
    i != null && Uf(
      s,
      o[s],
      i,
      g.NODE_ENV !== "production" ? En(o) : o,
      !ne(e, s) && !ne(e, Ut(s))
    );
  }
}
function Uf(e, t, n, o, r) {
  const { type: s, required: i, validator: a, skipCheck: l } = n;
  if (i && r) {
    T('Missing required prop: "' + e + '"');
    return;
  }
  if (!(t == null && !i)) {
    if (s != null && s !== !0 && !l) {
      let u = !1;
      const f = W(s) ? s : [s], c = [];
      for (let p = 0; p < f.length && !u; p++) {
        const { valid: m, expectedType: _ } = Bf(t, f[p]);
        c.push(_ || ""), u = m;
      }
      if (!u) {
        T(qf(e, t, c));
        return;
      }
    }
    a && !a(t, o) && T('Invalid prop: custom validator check failed for prop "' + e + '".');
  }
}
const Hf = /* @__PURE__ */ St(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function Bf(e, t) {
  let n;
  const o = Zr(t);
  if (Hf(o)) {
    const r = typeof e;
    n = r === o.toLowerCase(), !n && r === "object" && (n = e instanceof t);
  } else
    o === "Object" ? n = le(e) : o === "Array" ? n = W(e) : o === "null" ? n = e === null : n = e instanceof t;
  return {
    valid: n,
    expectedType: o
  };
}
function qf(e, t, n) {
  if (n.length === 0)
    return `Prop type [] for prop "${e}" won't match anything. Did you mean to use type Array instead?`;
  let o = `Invalid prop: type check failed for prop "${e}". Expected ${n.map(un).join(" | ")}`;
  const r = n[0], s = ws(t), i = Di(t, r), a = Di(t, s);
  return n.length === 1 && $i(r) && !Wf(r, s) && (o += ` with value ${i}`), o += `, got ${s} `, $i(s) && (o += `with value ${a}.`), o;
}
function Di(e, t) {
  return t === "String" ? `"${e}"` : t === "Number" ? `${Number(e)}` : `${e}`;
}
function $i(e) {
  return ["string", "number", "boolean"].some((n) => e.toLowerCase() === n);
}
function Wf(...e) {
  return e.some((t) => t.toLowerCase() === "boolean");
}
const $l = (e) => e[0] === "_" || e === "$stable", Bs = (e) => W(e) ? e.map(Qe) : [Qe(e)], Kf = (e, t, n) => {
  if (t._n)
    return t;
  const o = jt((...r) => (g.NODE_ENV !== "production" && Pe && (!n || n.root === Pe.root) && T(
    `Slot "${e}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
  ), Bs(t(...r))), n);
  return o._c = !1, o;
}, Tl = (e, t, n) => {
  const o = e._ctx;
  for (const r in e) {
    if ($l(r))
      continue;
    const s = e[r];
    if (z(s))
      t[r] = Kf(r, s, o);
    else if (s != null) {
      g.NODE_ENV !== "production" && T(
        `Non-function value encountered for slot "${r}". Prefer function slots for better performance.`
      );
      const i = Bs(s);
      t[r] = () => i;
    }
  }
}, Vl = (e, t) => {
  g.NODE_ENV !== "production" && !Ms(e.vnode) && T(
    "Non-function value encountered for default slot. Prefer function slots for better performance."
  );
  const n = Bs(t);
  e.slots.default = () => n;
}, zf = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = G(t), Uo(t, "_", n)) : Tl(
      t,
      e.slots = {}
    );
  } else
    e.slots = {}, t && Vl(e, t);
  Uo(e.slots, fr, 1);
}, Gf = (e, t, n) => {
  const { vnode: o, slots: r } = e;
  let s = !0, i = pe;
  if (o.shapeFlag & 32) {
    const a = t._;
    a ? g.NODE_ENV !== "production" && an ? (Oe(r, t), ut(e, "set", "$slots")) : n && a === 1 ? s = !1 : (Oe(r, t), !n && a === 1 && delete r._) : (s = !t.$stable, Tl(t, r)), i = t;
  } else
    t && (Vl(e, t), i = { default: 1 });
  if (s)
    for (const a in r)
      !$l(a) && i[a] == null && delete r[a];
};
function es(e, t, n, o, r = !1) {
  if (W(e)) {
    e.forEach(
      (p, m) => es(
        p,
        t && (W(t) ? t[m] : t),
        n,
        o,
        r
      )
    );
    return;
  }
  if (Un(o) && !r)
    return;
  const s = o.shapeFlag & 4 ? pr(o.component) || o.component.proxy : o.el, i = r ? null : s, { i: a, r: l } = e;
  if (g.NODE_ENV !== "production" && !a) {
    T(
      "Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function."
    );
    return;
  }
  const u = t && t.r, f = a.refs === pe ? a.refs = {} : a.refs, c = a.setupState;
  if (u != null && u !== l && (Se(u) ? (f[u] = null, ne(c, u) && (c[u] = null)) : ve(u) && (u.value = null)), z(l))
    wt(l, a, 12, [i, f]);
  else {
    const p = Se(l), m = ve(l), _ = e.f;
    if (p || m) {
      const N = () => {
        if (_) {
          const R = p ? ne(c, l) ? c[l] : f[l] : l.value;
          r ? W(R) && vs(R, s) : W(R) ? R.includes(s) || R.push(s) : p ? (f[l] = [s], ne(c, l) && (c[l] = f[l])) : (l.value = [s], e.k && (f[e.k] = l.value));
        } else
          p ? (f[l] = i, ne(c, l) && (c[l] = i)) : m ? (l.value = i, e.k && (f[e.k] = i)) : g.NODE_ENV !== "production" && T("Invalid template ref type:", l, `(${typeof l})`);
      };
      r || _ ? N() : (N.id = -1, He(N, n));
    } else
      g.NODE_ENV !== "production" && T("Invalid template ref type:", l, `(${typeof l})`);
  }
}
let Tn, Lt;
function yt(e, t) {
  e.appContext.config.performance && Yo() && Lt.mark(`vue-${t}-${e.uid}`), g.NODE_ENV !== "production" && Qu(e, t, Yo() ? Lt.now() : Date.now());
}
function Et(e, t) {
  if (e.appContext.config.performance && Yo()) {
    const n = `vue-${t}-${e.uid}`, o = n + ":end";
    Lt.mark(o), Lt.measure(
      `<${hr(e, e.type)}> ${t}`,
      n,
      o
    ), Lt.clearMarks(n), Lt.clearMarks(o);
  }
  g.NODE_ENV !== "production" && Zu(e, t, Yo() ? Lt.now() : Date.now());
}
function Yo() {
  return Tn !== void 0 || (typeof window < "u" && window.performance ? (Tn = !0, Lt = window.performance) : Tn = !1), Tn;
}
function Jf() {
  const e = [];
  if (g.NODE_ENV !== "production" && e.length) {
    const t = e.length > 1;
    console.warn(
      `Feature flag${t ? "s" : ""} ${e.join(", ")} ${t ? "are" : "is"} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
    );
  }
}
const He = uf;
function Yf(e) {
  return Xf(e);
}
function Xf(e, t) {
  Jf();
  const n = Ss();
  n.__VUE__ = !0, g.NODE_ENV !== "production" && ul(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n);
  const {
    insert: o,
    remove: r,
    patchProp: s,
    createElement: i,
    createText: a,
    createComment: l,
    setText: u,
    setElementText: f,
    parentNode: c,
    nextSibling: p,
    setScopeId: m = Re,
    insertStaticContent: _
  } = e, N = (d, h, y, v = null, S = null, C = null, A = void 0, P = null, $ = g.NODE_ENV !== "production" && an ? !1 : !!h.dynamicChildren) => {
    if (d === h)
      return;
    d && !Vn(d, h) && (v = j(d), ze(d, S, C, !0), d = null), h.patchFlag === -2 && ($ = !1, h.dynamicChildren = null);
    const { type: x, ref: M, shapeFlag: B } = h;
    switch (x) {
      case so:
        R(d, h, y, v);
        break;
      case Be:
        O(d, h, y, v);
        break;
      case To:
        d == null ? V(h, y, v, A) : g.NODE_ENV !== "production" && I(d, h, y, A);
        break;
      case je:
        ye(
          d,
          h,
          y,
          v,
          S,
          C,
          A,
          P,
          $
        );
        break;
      default:
        B & 1 ? se(
          d,
          h,
          y,
          v,
          S,
          C,
          A,
          P,
          $
        ) : B & 6 ? nt(
          d,
          h,
          y,
          v,
          S,
          C,
          A,
          P,
          $
        ) : B & 64 || B & 128 ? x.process(
          d,
          h,
          y,
          v,
          S,
          C,
          A,
          P,
          $,
          Z
        ) : g.NODE_ENV !== "production" && T("Invalid VNode type:", x, `(${typeof x})`);
    }
    M != null && S && es(M, d && d.ref, C, h || d, !h);
  }, R = (d, h, y, v) => {
    if (d == null)
      o(
        h.el = a(h.children),
        y,
        v
      );
    else {
      const S = h.el = d.el;
      h.children !== d.children && u(S, h.children);
    }
  }, O = (d, h, y, v) => {
    d == null ? o(
      h.el = l(h.children || ""),
      y,
      v
    ) : h.el = d.el;
  }, V = (d, h, y, v) => {
    [d.el, d.anchor] = _(
      d.children,
      h,
      y,
      v,
      d.el,
      d.anchor
    );
  }, I = (d, h, y, v) => {
    if (h.children !== d.children) {
      const S = p(d.anchor);
      ee(d), [h.el, h.anchor] = _(
        h.children,
        y,
        S,
        v
      );
    } else
      h.el = d.el, h.anchor = d.anchor;
  }, K = ({ el: d, anchor: h }, y, v) => {
    let S;
    for (; d && d !== h; )
      S = p(d), o(d, y, v), d = S;
    o(h, y, v);
  }, ee = ({ el: d, anchor: h }) => {
    let y;
    for (; d && d !== h; )
      y = p(d), r(d), d = y;
    r(h);
  }, se = (d, h, y, v, S, C, A, P, $) => {
    h.type === "svg" ? A = "svg" : h.type === "math" && (A = "mathml"), d == null ? D(
      h,
      y,
      v,
      S,
      C,
      A,
      P,
      $
    ) : F(
      d,
      h,
      S,
      C,
      A,
      P,
      $
    );
  }, D = (d, h, y, v, S, C, A, P) => {
    let $, x;
    const { props: M, shapeFlag: B, transition: H, dirs: Y } = d;
    if ($ = d.el = i(
      d.type,
      C,
      M && M.is,
      M
    ), B & 8 ? f($, d.children) : B & 16 && he(
      d.children,
      $,
      null,
      v,
      S,
      Rr(d, C),
      A,
      P
    ), Y && Jt(d, null, v, "created"), Te($, d, d.scopeId, A, v), M) {
      for (const ce in M)
        ce !== "value" && !So(ce) && s(
          $,
          ce,
          null,
          M[ce],
          C,
          d.children,
          v,
          S,
          b
        );
      "value" in M && s($, "value", null, M.value, C), (x = M.onVnodeBeforeMount) && st(x, v, d);
    }
    g.NODE_ENV !== "production" && (Object.defineProperty($, "__vnode", {
      value: d,
      enumerable: !1
    }), Object.defineProperty($, "__vueParentComponent", {
      value: v,
      enumerable: !1
    })), Y && Jt(d, null, v, "beforeMount");
    const oe = Qf(S, H);
    oe && H.beforeEnter($), o($, h, y), ((x = M && M.onVnodeMounted) || oe || Y) && He(() => {
      x && st(x, v, d), oe && H.enter($), Y && Jt(d, null, v, "mounted");
    }, S);
  }, Te = (d, h, y, v, S) => {
    if (y && m(d, y), v)
      for (let C = 0; C < v.length; C++)
        m(d, v[C]);
    if (S) {
      let C = S.subTree;
      if (g.NODE_ENV !== "production" && C.patchFlag > 0 && C.patchFlag & 2048 && (C = ks(C.children) || C), h === C) {
        const A = S.vnode;
        Te(
          d,
          A,
          A.scopeId,
          A.slotScopeIds,
          S.parent
        );
      }
    }
  }, he = (d, h, y, v, S, C, A, P, $ = 0) => {
    for (let x = $; x < d.length; x++) {
      const M = d[x] = P ? At(d[x]) : Qe(d[x]);
      N(
        null,
        M,
        h,
        y,
        v,
        S,
        C,
        A,
        P
      );
    }
  }, F = (d, h, y, v, S, C, A) => {
    const P = h.el = d.el;
    let { patchFlag: $, dynamicChildren: x, dirs: M } = h;
    $ |= d.patchFlag & 16;
    const B = d.props || pe, H = h.props || pe;
    let Y;
    if (y && Yt(y, !1), (Y = H.onVnodeBeforeUpdate) && st(Y, y, h, d), M && Jt(h, d, y, "beforeUpdate"), y && Yt(y, !0), g.NODE_ENV !== "production" && an && ($ = 0, A = !1, x = null), x ? (L(
      d.dynamicChildren,
      x,
      P,
      y,
      v,
      Rr(h, S),
      C
    ), g.NODE_ENV !== "production" && $o(d, h)) : A || Ke(
      d,
      h,
      P,
      null,
      y,
      v,
      Rr(h, S),
      C,
      !1
    ), $ > 0) {
      if ($ & 16)
        te(
          P,
          h,
          B,
          H,
          y,
          v,
          S
        );
      else if ($ & 2 && B.class !== H.class && s(P, "class", null, H.class, S), $ & 4 && s(P, "style", B.style, H.style, S), $ & 8) {
        const oe = h.dynamicProps;
        for (let ce = 0; ce < oe.length; ce++) {
          const be = oe[ce], Ve = B[be], Ye = H[be];
          (Ye !== Ve || be === "value") && s(
            P,
            be,
            Ve,
            Ye,
            S,
            d.children,
            y,
            v,
            b
          );
        }
      }
      $ & 1 && d.children !== h.children && f(P, h.children);
    } else
      !A && x == null && te(
        P,
        h,
        B,
        H,
        y,
        v,
        S
      );
    ((Y = H.onVnodeUpdated) || M) && He(() => {
      Y && st(Y, y, h, d), M && Jt(h, d, y, "updated");
    }, v);
  }, L = (d, h, y, v, S, C, A) => {
    for (let P = 0; P < h.length; P++) {
      const $ = d[P], x = h[P], M = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        $.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        ($.type === je || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Vn($, x) || // - In the case of a component, it could contain anything.
        $.shapeFlag & 70) ? c($.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          y
        )
      );
      N(
        $,
        x,
        M,
        null,
        v,
        S,
        C,
        A,
        !0
      );
    }
  }, te = (d, h, y, v, S, C, A) => {
    if (y !== v) {
      if (y !== pe)
        for (const P in y)
          !So(P) && !(P in v) && s(
            d,
            P,
            y[P],
            null,
            A,
            h.children,
            S,
            C,
            b
          );
      for (const P in v) {
        if (So(P))
          continue;
        const $ = v[P], x = y[P];
        $ !== x && P !== "value" && s(
          d,
          P,
          x,
          $,
          A,
          h.children,
          S,
          C,
          b
        );
      }
      "value" in v && s(d, "value", y.value, v.value, A);
    }
  }, ye = (d, h, y, v, S, C, A, P, $) => {
    const x = h.el = d ? d.el : a(""), M = h.anchor = d ? d.anchor : a("");
    let { patchFlag: B, dynamicChildren: H, slotScopeIds: Y } = h;
    g.NODE_ENV !== "production" && // #5523 dev root fragment may inherit directives
    (an || B & 2048) && (B = 0, $ = !1, H = null), Y && (P = P ? P.concat(Y) : Y), d == null ? (o(x, y, v), o(M, y, v), he(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      h.children || [],
      y,
      M,
      S,
      C,
      A,
      P,
      $
    )) : B > 0 && B & 64 && H && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    d.dynamicChildren ? (L(
      d.dynamicChildren,
      H,
      y,
      S,
      C,
      A,
      P
    ), g.NODE_ENV !== "production" ? $o(d, h) : (
      // #2080 if the stable fragment has a key, it's a <template v-for> that may
      //  get moved around. Make sure all root level vnodes inherit el.
      // #2134 or if it's a component root, it may also get moved around
      // as the component is being moved.
      (h.key != null || S && h === S.subTree) && $o(
        d,
        h,
        !0
        /* shallow */
      )
    )) : Ke(
      d,
      h,
      y,
      M,
      S,
      C,
      A,
      P,
      $
    );
  }, nt = (d, h, y, v, S, C, A, P, $) => {
    h.slotScopeIds = P, d == null ? h.shapeFlag & 512 ? S.ctx.activate(
      h,
      y,
      v,
      A,
      $
    ) : Ue(
      h,
      y,
      v,
      S,
      C,
      A,
      $
    ) : $e(d, h, $);
  }, Ue = (d, h, y, v, S, C, A) => {
    const P = d.component = ad(
      d,
      v,
      S
    );
    if (g.NODE_ENV !== "production" && P.type.__hmrId && Bu(P), g.NODE_ENV !== "production" && (Ro(d), yt(P, "mount")), Ms(d) && (P.ctx.renderer = Z), g.NODE_ENV !== "production" && yt(P, "init"), cd(P), g.NODE_ENV !== "production" && Et(P, "init"), P.asyncDep) {
      if (S && S.registerDep(P, J), !d.el) {
        const $ = P.subTree = Ne(Be);
        O(null, $, h, y);
      }
    } else
      J(
        P,
        d,
        h,
        y,
        S,
        C,
        A
      );
    g.NODE_ENV !== "production" && (Po(), Et(P, "mount"));
  }, $e = (d, h, y) => {
    const v = h.component = d.component;
    if (rf(d, h, y))
      if (v.asyncDep && !v.asyncResolved) {
        g.NODE_ENV !== "production" && Ro(h), q(v, h, y), g.NODE_ENV !== "production" && Po();
        return;
      } else
        v.next = h, Uu(v.update), v.effect.dirty = !0, v.update();
    else
      h.el = d.el, v.vnode = h;
  }, J = (d, h, y, v, S, C, A) => {
    const P = () => {
      if (d.isMounted) {
        let { next: M, bu: B, u: H, parent: Y, vnode: oe } = d;
        {
          const pn = Al(d);
          if (pn) {
            M && (M.el = oe.el, q(d, M, A)), pn.asyncDep.then(() => {
              d.isUnmounted || P();
            });
            return;
          }
        }
        let ce = M, be;
        g.NODE_ENV !== "production" && Ro(M || d.vnode), Yt(d, !1), M ? (M.el = oe.el, q(d, M, A)) : M = oe, B && gn(B), (be = M.props && M.props.onVnodeBeforeUpdate) && st(be, Y, M, oe), Yt(d, !0), g.NODE_ENV !== "production" && yt(d, "render");
        const Ve = Sr(d);
        g.NODE_ENV !== "production" && Et(d, "render");
        const Ye = d.subTree;
        d.subTree = Ve, g.NODE_ENV !== "production" && yt(d, "patch"), N(
          Ye,
          Ve,
          // parent may have changed if it's in a teleport
          c(Ye.el),
          // anchor may have changed if it's in a fragment
          j(Ye),
          d,
          S,
          C
        ), g.NODE_ENV !== "production" && Et(d, "patch"), M.el = Ve.el, ce === null && sf(d, Ve.el), H && He(H, S), (be = M.props && M.props.onVnodeUpdated) && He(
          () => st(be, Y, M, oe),
          S
        ), g.NODE_ENV !== "production" && fl(d), g.NODE_ENV !== "production" && Po();
      } else {
        let M;
        const { el: B, props: H } = h, { bm: Y, m: oe, parent: ce } = d, be = Un(h);
        if (Yt(d, !1), Y && gn(Y), !be && (M = H && H.onVnodeBeforeMount) && st(M, ce, h), Yt(d, !0), B && Q) {
          const Ve = () => {
            g.NODE_ENV !== "production" && yt(d, "render"), d.subTree = Sr(d), g.NODE_ENV !== "production" && Et(d, "render"), g.NODE_ENV !== "production" && yt(d, "hydrate"), Q(
              B,
              d.subTree,
              d,
              S,
              null
            ), g.NODE_ENV !== "production" && Et(d, "hydrate");
          };
          be ? h.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !d.isUnmounted && Ve()
          ) : Ve();
        } else {
          g.NODE_ENV !== "production" && yt(d, "render");
          const Ve = d.subTree = Sr(d);
          g.NODE_ENV !== "production" && Et(d, "render"), g.NODE_ENV !== "production" && yt(d, "patch"), N(
            null,
            Ve,
            y,
            v,
            d,
            S,
            C
          ), g.NODE_ENV !== "production" && Et(d, "patch"), h.el = Ve.el;
        }
        if (oe && He(oe, S), !be && (M = H && H.onVnodeMounted)) {
          const Ve = h;
          He(
            () => st(M, ce, Ve),
            S
          );
        }
        (h.shapeFlag & 256 || ce && Un(ce.vnode) && ce.vnode.shapeFlag & 256) && d.a && He(d.a, S), d.isMounted = !0, g.NODE_ENV !== "production" && Ju(d), h = y = v = null;
      }
    }, $ = d.effect = new Rs(
      P,
      Re,
      () => ir(x),
      d.scope
      // track it in component's effect scope
    ), x = d.update = () => {
      $.dirty && $.run();
    };
    x.id = d.uid, Yt(d, !0), g.NODE_ENV !== "production" && ($.onTrack = d.rtc ? (M) => gn(d.rtc, M) : void 0, $.onTrigger = d.rtg ? (M) => gn(d.rtg, M) : void 0, x.ownerInstance = d), x();
  }, q = (d, h, y) => {
    h.component = d;
    const v = d.vnode.props;
    d.vnode = h, d.next = null, Ff(d, h.props, v, y), Gf(d, h.children, y), Kt(), yi(d), zt();
  }, Ke = (d, h, y, v, S, C, A, P, $ = !1) => {
    const x = d && d.children, M = d ? d.shapeFlag : 0, B = h.children, { patchFlag: H, shapeFlag: Y } = h;
    if (H > 0) {
      if (H & 128) {
        Rt(
          x,
          B,
          y,
          v,
          S,
          C,
          A,
          P,
          $
        );
        return;
      } else if (H & 256) {
        Gt(
          x,
          B,
          y,
          v,
          S,
          C,
          A,
          P,
          $
        );
        return;
      }
    }
    Y & 8 ? (M & 16 && b(x, S, C), B !== x && f(y, B)) : M & 16 ? Y & 16 ? Rt(
      x,
      B,
      y,
      v,
      S,
      C,
      A,
      P,
      $
    ) : b(x, S, C, !0) : (M & 8 && f(y, ""), Y & 16 && he(
      B,
      y,
      v,
      S,
      C,
      A,
      P,
      $
    ));
  }, Gt = (d, h, y, v, S, C, A, P, $) => {
    d = d || vn, h = h || vn;
    const x = d.length, M = h.length, B = Math.min(x, M);
    let H;
    for (H = 0; H < B; H++) {
      const Y = h[H] = $ ? At(h[H]) : Qe(h[H]);
      N(
        d[H],
        Y,
        y,
        null,
        S,
        C,
        A,
        P,
        $
      );
    }
    x > M ? b(
      d,
      S,
      C,
      !0,
      !1,
      B
    ) : he(
      h,
      y,
      v,
      S,
      C,
      A,
      P,
      $,
      B
    );
  }, Rt = (d, h, y, v, S, C, A, P, $) => {
    let x = 0;
    const M = h.length;
    let B = d.length - 1, H = M - 1;
    for (; x <= B && x <= H; ) {
      const Y = d[x], oe = h[x] = $ ? At(h[x]) : Qe(h[x]);
      if (Vn(Y, oe))
        N(
          Y,
          oe,
          y,
          null,
          S,
          C,
          A,
          P,
          $
        );
      else
        break;
      x++;
    }
    for (; x <= B && x <= H; ) {
      const Y = d[B], oe = h[H] = $ ? At(h[H]) : Qe(h[H]);
      if (Vn(Y, oe))
        N(
          Y,
          oe,
          y,
          null,
          S,
          C,
          A,
          P,
          $
        );
      else
        break;
      B--, H--;
    }
    if (x > B) {
      if (x <= H) {
        const Y = H + 1, oe = Y < M ? h[Y].el : v;
        for (; x <= H; )
          N(
            null,
            h[x] = $ ? At(h[x]) : Qe(h[x]),
            y,
            oe,
            S,
            C,
            A,
            P,
            $
          ), x++;
      }
    } else if (x > H)
      for (; x <= B; )
        ze(d[x], S, C, !0), x++;
    else {
      const Y = x, oe = x, ce = /* @__PURE__ */ new Map();
      for (x = oe; x <= H; x++) {
        const Me = h[x] = $ ? At(h[x]) : Qe(h[x]);
        Me.key != null && (g.NODE_ENV !== "production" && ce.has(Me.key) && T(
          "Duplicate keys found during update:",
          JSON.stringify(Me.key),
          "Make sure keys are unique."
        ), ce.set(Me.key, x));
      }
      let be, Ve = 0;
      const Ye = H - oe + 1;
      let pn = !1, ii = 0;
      const $n = new Array(Ye);
      for (x = 0; x < Ye; x++)
        $n[x] = 0;
      for (x = Y; x <= B; x++) {
        const Me = d[x];
        if (Ve >= Ye) {
          ze(Me, S, C, !0);
          continue;
        }
        let rt;
        if (Me.key != null)
          rt = ce.get(Me.key);
        else
          for (be = oe; be <= H; be++)
            if ($n[be - oe] === 0 && Vn(Me, h[be])) {
              rt = be;
              break;
            }
        rt === void 0 ? ze(Me, S, C, !0) : ($n[rt - oe] = x + 1, rt >= ii ? ii = rt : pn = !0, N(
          Me,
          h[rt],
          y,
          null,
          S,
          C,
          A,
          P,
          $
        ), Ve++);
      }
      const ai = pn ? Zf($n) : vn;
      for (be = ai.length - 1, x = Ye - 1; x >= 0; x--) {
        const Me = oe + x, rt = h[Me], li = Me + 1 < M ? h[Me + 1].el : v;
        $n[x] === 0 ? N(
          null,
          rt,
          y,
          li,
          S,
          C,
          A,
          P,
          $
        ) : pn && (be < 0 || x !== ai[be] ? ot(rt, y, li, 2) : be--);
      }
    }
  }, ot = (d, h, y, v, S = null) => {
    const { el: C, type: A, transition: P, children: $, shapeFlag: x } = d;
    if (x & 6) {
      ot(d.component.subTree, h, y, v);
      return;
    }
    if (x & 128) {
      d.suspense.move(h, y, v);
      return;
    }
    if (x & 64) {
      A.move(d, h, y, Z);
      return;
    }
    if (A === je) {
      o(C, h, y);
      for (let B = 0; B < $.length; B++)
        ot($[B], h, y, v);
      o(d.anchor, h, y);
      return;
    }
    if (A === To) {
      K(d, h, y);
      return;
    }
    if (v !== 2 && x & 1 && P)
      if (v === 0)
        P.beforeEnter(C), o(C, h, y), He(() => P.enter(C), S);
      else {
        const { leave: B, delayLeave: H, afterLeave: Y } = P, oe = () => o(C, h, y), ce = () => {
          B(C, () => {
            oe(), Y && Y();
          });
        };
        H ? H(C, oe, ce) : ce();
      }
    else
      o(C, h, y);
  }, ze = (d, h, y, v = !1, S = !1) => {
    const {
      type: C,
      props: A,
      ref: P,
      children: $,
      dynamicChildren: x,
      shapeFlag: M,
      patchFlag: B,
      dirs: H
    } = d;
    if (P != null && es(P, null, y, d, !0), M & 256) {
      h.ctx.deactivate(d);
      return;
    }
    const Y = M & 1 && H, oe = !Un(d);
    let ce;
    if (oe && (ce = A && A.onVnodeBeforeUnmount) && st(ce, h, d), M & 6)
      Ct(d.component, y, v);
    else {
      if (M & 128) {
        d.suspense.unmount(y, v);
        return;
      }
      Y && Jt(d, null, h, "beforeUnmount"), M & 64 ? d.type.remove(
        d,
        h,
        y,
        S,
        Z,
        v
      ) : x && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (C !== je || B > 0 && B & 64) ? b(
        x,
        h,
        y,
        !1,
        !0
      ) : (C === je && B & 384 || !S && M & 16) && b($, h, y), v && Pt(d);
    }
    (oe && (ce = A && A.onVnodeUnmounted) || Y) && He(() => {
      ce && st(ce, h, d), Y && Jt(d, null, h, "unmounted");
    }, y);
  }, Pt = (d) => {
    const { type: h, el: y, anchor: v, transition: S } = d;
    if (h === je) {
      g.NODE_ENV !== "production" && d.patchFlag > 0 && d.patchFlag & 2048 && S && !S.persisted ? d.children.forEach((A) => {
        A.type === Be ? r(A.el) : Pt(A);
      }) : fo(y, v);
      return;
    }
    if (h === To) {
      ee(d);
      return;
    }
    const C = () => {
      r(y), S && !S.persisted && S.afterLeave && S.afterLeave();
    };
    if (d.shapeFlag & 1 && S && !S.persisted) {
      const { leave: A, delayLeave: P } = S, $ = () => A(y, C);
      P ? P(d.el, C, $) : $();
    } else
      C();
  }, fo = (d, h) => {
    let y;
    for (; d !== h; )
      y = p(d), r(d), d = y;
    r(h);
  }, Ct = (d, h, y) => {
    g.NODE_ENV !== "production" && d.type.__hmrId && qu(d);
    const { bum: v, scope: S, update: C, subTree: A, um: P } = d;
    v && gn(v), S.stop(), C && (C.active = !1, ze(A, d, h, y)), P && He(P, h), He(() => {
      d.isUnmounted = !0;
    }, h), h && h.pendingBranch && !h.isUnmounted && d.asyncDep && !d.asyncResolved && d.suspenseId === h.pendingId && (h.deps--, h.deps === 0 && h.resolve()), g.NODE_ENV !== "production" && Xu(d);
  }, b = (d, h, y, v = !1, S = !1, C = 0) => {
    for (let A = C; A < d.length; A++)
      ze(d[A], h, y, v, S);
  }, j = (d) => d.shapeFlag & 6 ? j(d.component.subTree) : d.shapeFlag & 128 ? d.suspense.next() : p(d.anchor || d.el);
  let k = !1;
  const U = (d, h, y) => {
    d == null ? h._vnode && ze(h._vnode, null, null, !0) : N(
      h._vnode || null,
      d,
      h,
      null,
      null,
      null,
      y
    ), k || (k = !0, yi(), al(), k = !1), h._vnode = d;
  }, Z = {
    p: N,
    um: ze,
    m: ot,
    r: Pt,
    mt: Ue,
    mc: he,
    pc: Ke,
    pbc: L,
    n: j,
    o: e
  };
  let Ee, Q;
  return t && ([Ee, Q] = t(
    Z
  )), {
    render: U,
    hydrate: Ee,
    createApp: kf(U, Ee)
  };
}
function Rr({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Yt({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Qf(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function $o(e, t, n = !1) {
  const o = e.children, r = t.children;
  if (W(o) && W(r))
    for (let s = 0; s < o.length; s++) {
      const i = o[s];
      let a = r[s];
      a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = r[s] = At(r[s]), a.el = i.el), n || $o(i, a)), a.type === so && (a.el = i.el), g.NODE_ENV !== "production" && a.type === Be && !a.el && (a.el = i.el);
    }
}
function Zf(e) {
  const t = e.slice(), n = [0];
  let o, r, s, i, a;
  const l = e.length;
  for (o = 0; o < l; o++) {
    const u = e[o];
    if (u !== 0) {
      if (r = n[n.length - 1], e[r] < u) {
        t[o] = r, n.push(o);
        continue;
      }
      for (s = 0, i = n.length - 1; s < i; )
        a = s + i >> 1, e[n[a]] < u ? s = a + 1 : i = a;
      u < e[n[s]] && (s > 0 && (t[o] = n[s - 1]), n[s] = o);
    }
  }
  for (s = n.length, i = n[s - 1]; s-- > 0; )
    n[s] = i, i = t[i];
  return n;
}
function Al(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Al(t);
}
const ed = (e) => e.__isTeleport, je = Symbol.for("v-fgt"), so = Symbol.for("v-txt"), Be = Symbol.for("v-cmt"), To = Symbol.for("v-stc"), Hn = [];
let Ze = null;
function fe(e = !1) {
  Hn.push(Ze = e ? null : []);
}
function td() {
  Hn.pop(), Ze = Hn[Hn.length - 1] || null;
}
let Yn = 1;
function Ti(e) {
  Yn += e;
}
function Il(e) {
  return e.dynamicChildren = Yn > 0 ? Ze || vn : null, td(), Yn > 0 && Ze && Ze.push(e), e;
}
function ge(e, t, n, o, r, s) {
  return Il(
    E(
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
function ur(e, t, n, o, r) {
  return Il(
    Ne(
      e,
      t,
      n,
      o,
      r,
      !0
    )
  );
}
function On(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Vn(e, t) {
  return g.NODE_ENV !== "production" && t.shapeFlag & 6 && _n.has(t.type) ? (e.shapeFlag &= -257, t.shapeFlag &= -513, !1) : e.type === t.type && e.key === t.key;
}
const nd = (...e) => jl(
  ...e
), fr = "__vInternal", kl = ({ key: e }) => e ?? null, Vo = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? Se(e) || ve(e) || z(e) ? { i: we, r: e, k: t, f: !!n } : e : null);
function E(e, t = null, n = null, o = 0, r = null, s = e === je ? 0 : 1, i = !1, a = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && kl(t),
    ref: t && Vo(t),
    scopeId: lr,
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
    ctx: we
  };
  return a ? (qs(l, n), s & 128 && e.normalize(l)) : n && (l.shapeFlag |= Se(n) ? 8 : 16), g.NODE_ENV !== "production" && l.key !== l.key && T("VNode created with invalid key (NaN). VNode type:", l.type), Yn > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  Ze && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (l.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  l.patchFlag !== 32 && Ze.push(l), l;
}
const Ne = g.NODE_ENV !== "production" ? nd : jl;
function jl(e, t = null, n = null, o = 0, r = null, s = !1) {
  if ((!e || e === af) && (g.NODE_ENV !== "production" && !e && T(`Invalid vnode type when creating vnode: ${e}.`), e = Be), On(e)) {
    const a = qt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && qs(a, n), Yn > 0 && !s && Ze && (a.shapeFlag & 6 ? Ze[Ze.indexOf(e)] = a : Ze.push(a)), a.patchFlag |= -2, a;
  }
  if (Ul(e) && (e = e.__vccOpts), t) {
    t = od(t);
    let { class: a, style: l } = t;
    a && !Se(a) && (t.class = it(a)), le(l) && (Wo(l) && !W(l) && (l = Oe({}, l)), t.style = xs(l));
  }
  const i = Se(e) ? 1 : cf(e) ? 128 : ed(e) ? 64 : le(e) ? 4 : z(e) ? 2 : 0;
  return g.NODE_ENV !== "production" && i & 4 && Wo(e) && (e = G(e), T(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), E(
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
function od(e) {
  return e ? Wo(e) || fr in e ? Oe({}, e) : e : null;
}
function qt(e, t, n = !1) {
  const { props: o, ref: r, patchFlag: s, children: i } = e, a = t ? rd(o || {}, t) : o;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: a,
    key: a && kl(a),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? W(r) ? r.concat(Vo(t)) : [r, Vo(t)] : Vo(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: g.NODE_ENV !== "production" && s === -1 && W(i) ? i.map(Ll) : i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== je ? s === -1 ? 16 : s | 16 : s,
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
    ssContent: e.ssContent && qt(e.ssContent),
    ssFallback: e.ssFallback && qt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function Ll(e) {
  const t = qt(e);
  return W(e.children) && (t.children = e.children.map(Ll)), t;
}
function Zt(e = " ", t = 0) {
  return Ne(so, null, e, t);
}
function bo(e = "", t = !1) {
  return t ? (fe(), ur(Be, null, e)) : Ne(Be, null, e);
}
function Qe(e) {
  return e == null || typeof e == "boolean" ? Ne(Be) : W(e) ? Ne(
    je,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? At(e) : Ne(so, null, String(e));
}
function At(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : qt(e);
}
function qs(e, t) {
  let n = 0;
  const { shapeFlag: o } = e;
  if (t == null)
    t = null;
  else if (W(t))
    n = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), qs(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(fr in t) ? t._ctx = we : r === 3 && we && (we.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    z(t) ? (t = { default: t, _ctx: we }, n = 32) : (t = String(t), o & 64 ? (n = 16, t = [Zt(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function rd(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (const r in o)
      if (r === "class")
        t.class !== o.class && (t.class = it([t.class, o.class]));
      else if (r === "style")
        t.style = xs([t.style, o.style]);
      else if (to(r)) {
        const s = t[r], i = o[r];
        i && s !== i && !(W(s) && s.includes(i)) && (t[r] = s ? [].concat(s, i) : i);
      } else
        r !== "" && (t[r] = o[r]);
  }
  return t;
}
function st(e, t, n, o = null) {
  et(e, t, 7, [
    n,
    o
  ]);
}
const sd = Rl();
let id = 0;
function ad(e, t, n) {
  const o = e.type, r = (t ? t.appContext : e.appContext) || sd, s = {
    uid: id++,
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
    scope: new Ta(
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
    propsOptions: Cl(o, r),
    emitsOptions: pl(o, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: pe,
    // inheritAttrs
    inheritAttrs: o.inheritAttrs,
    // state
    ctx: pe,
    data: pe,
    props: pe,
    attrs: pe,
    slots: pe,
    refs: pe,
    setupState: pe,
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
  return g.NODE_ENV !== "production" ? s.ctx = xf(s) : s.ctx = { _: s }, s.root = t ? t.root : s, s.emit = tf.bind(null, s), e.ce && e.ce(s), s;
}
let Pe = null;
const Ws = () => Pe || we;
let Xo, ts;
{
  const e = Ss(), t = (n, o) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(o), (s) => {
      r.length > 1 ? r.forEach((i) => i(s)) : r[0](s);
    };
  };
  Xo = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Pe = n
  ), ts = t(
    "__VUE_SSR_SETTERS__",
    (n) => dr = n
  );
}
const io = (e) => {
  const t = Pe;
  return Xo(e), e.scope.on(), () => {
    e.scope.off(), Xo(t);
  };
}, Vi = () => {
  Pe && Pe.scope.off(), Xo(null);
}, ld = /* @__PURE__ */ St("slot,component");
function ns(e, t) {
  const n = t.isNativeTag || xa;
  (ld(e) || n(e)) && T(
    "Do not use built-in or reserved HTML elements as component id: " + e
  );
}
function Ml(e) {
  return e.vnode.shapeFlag & 4;
}
let dr = !1;
function cd(e, t = !1) {
  t && ts(t);
  const { props: n, children: o } = e.vnode, r = Ml(e);
  Lf(e, n, r, t), zf(e, o);
  const s = r ? ud(e, t) : void 0;
  return t && ts(!1), s;
}
function ud(e, t) {
  var n;
  const o = e.type;
  if (g.NODE_ENV !== "production") {
    if (o.name && ns(o.name, e.appContext.config), o.components) {
      const s = Object.keys(o.components);
      for (let i = 0; i < s.length; i++)
        ns(s[i], e.appContext.config);
    }
    if (o.directives) {
      const s = Object.keys(o.directives);
      for (let i = 0; i < s.length; i++)
        yl(s[i]);
    }
    o.compilerOptions && fd() && T(
      '"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.'
    );
  }
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = Nt(new Proxy(e.ctx, Sl)), g.NODE_ENV !== "production" && Rf(e);
  const { setup: r } = o;
  if (r) {
    const s = e.setupContext = r.length > 1 ? pd(e) : null, i = io(e);
    Kt();
    const a = wt(
      r,
      e,
      0,
      [
        g.NODE_ENV !== "production" ? En(e.props) : e.props,
        s
      ]
    );
    if (zt(), i(), Ns(a)) {
      if (a.then(Vi, Vi), t)
        return a.then((l) => {
          Ai(e, l, t);
        }).catch((l) => {
          oo(l, e, 0);
        });
      if (e.asyncDep = a, g.NODE_ENV !== "production" && !e.suspense) {
        const l = (n = o.name) != null ? n : "Anonymous";
        T(
          `Component <${l}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`
        );
      }
    } else
      Ai(e, a, t);
  } else
    Fl(e, t);
}
function Ai(e, t, n) {
  z(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : le(t) ? (g.NODE_ENV !== "production" && On(t) && T(
    "setup() should not return VNodes directly - return a render function instead."
  ), g.NODE_ENV !== "production" && (e.devtoolsRawSetupState = t), e.setupState = tl(t), g.NODE_ENV !== "production" && Pf(e)) : g.NODE_ENV !== "production" && t !== void 0 && T(
    `setup() should return an object. Received: ${t === null ? "null" : typeof t}`
  ), Fl(e, n);
}
let os;
const fd = () => !os;
function Fl(e, t, n) {
  const o = e.type;
  if (!e.render) {
    if (!t && os && !o.render) {
      const r = o.template || Hs(e).template;
      if (r) {
        g.NODE_ENV !== "production" && yt(e, "compile");
        const { isCustomElement: s, compilerOptions: i } = e.appContext.config, { delimiters: a, compilerOptions: l } = o, u = Oe(
          Oe(
            {
              isCustomElement: s,
              delimiters: a
            },
            i
          ),
          l
        );
        o.render = os(r, u), g.NODE_ENV !== "production" && Et(e, "compile");
      }
    }
    e.render = o.render || Re;
  }
  {
    const r = io(e);
    Kt();
    try {
      Df(e);
    } finally {
      zt(), r();
    }
  }
  g.NODE_ENV !== "production" && !o.render && e.render === Re && !t && (o.template ? T(
    'Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".'
  ) : T("Component is missing template or render function."));
}
function Ii(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(
    e.attrs,
    g.NODE_ENV !== "production" ? {
      get(t, n) {
        return Go(), Ie(e, "get", "$attrs"), t[n];
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
function dd(e) {
  return e.slotsProxy || (e.slotsProxy = new Proxy(e.slots, {
    get(t, n) {
      return Ie(e, "get", "$slots"), t[n];
    }
  }));
}
function pd(e) {
  const t = (n) => {
    if (g.NODE_ENV !== "production" && (e.exposed && T("expose() should be called only once per setup()."), n != null)) {
      let o = typeof n;
      o === "object" && (W(n) ? o = "array" : ve(n) && (o = "ref")), o !== "object" && T(
        `expose() should be passed a plain object, received ${o}.`
      );
    }
    e.exposed = n || {};
  };
  return g.NODE_ENV !== "production" ? Object.freeze({
    get attrs() {
      return Ii(e);
    },
    get slots() {
      return dd(e);
    },
    get emit() {
      return (n, ...o) => e.emit(n, ...o);
    },
    expose: t
  }) : {
    get attrs() {
      return Ii(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function pr(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(tl(Nt(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in ln)
          return ln[n](e);
      },
      has(t, n) {
        return n in t || n in ln;
      }
    }));
}
const hd = /(?:^|[-_])(\w)/g, md = (e) => e.replace(hd, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Ks(e, t = !0) {
  return z(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function hr(e, t, n = !1) {
  let o = Ks(t);
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
  return o ? md(o) : n ? "App" : "Anonymous";
}
function Ul(e) {
  return z(e) && "__vccOpts" in e;
}
const _e = (e, t) => Pu(e, t, dr);
function Hl(e, t, n) {
  const o = arguments.length;
  return o === 2 ? le(t) && !W(t) ? On(t) ? Ne(e, null, [t]) : Ne(e, t) : Ne(e, null, t) : (o > 3 ? n = Array.prototype.slice.call(arguments, 2) : o === 3 && On(n) && (n = [n]), Ne(e, t, n));
}
function Pr(e) {
  return !!(e && e.__v_isShallow);
}
function gd() {
  if (g.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, o = { style: "color:#eb2f96" }, r = {
    header(c) {
      return le(c) ? c.__isVue ? ["div", e, "VueInstance"] : ve(c) ? [
        "div",
        {},
        ["span", e, f(c)],
        "<",
        a(c.value),
        ">"
      ] : ft(c) ? [
        "div",
        {},
        ["span", e, Pr(c) ? "ShallowReactive" : "Reactive"],
        "<",
        a(c),
        `>${Bt(c) ? " (readonly)" : ""}`
      ] : Bt(c) ? [
        "div",
        {},
        ["span", e, Pr(c) ? "ShallowReadonly" : "Readonly"],
        "<",
        a(c),
        ">"
      ] : null : null;
    },
    hasBody(c) {
      return c && c.__isVue;
    },
    body(c) {
      if (c && c.__isVue)
        return [
          "div",
          {},
          ...s(c.$)
        ];
    }
  };
  function s(c) {
    const p = [];
    c.type.props && c.props && p.push(i("props", G(c.props))), c.setupState !== pe && p.push(i("setup", c.setupState)), c.data !== pe && p.push(i("data", G(c.data)));
    const m = l(c, "computed");
    m && p.push(i("computed", m));
    const _ = l(c, "inject");
    return _ && p.push(i("injected", _)), p.push([
      "div",
      {},
      [
        "span",
        {
          style: o.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: c }]
    ]), p;
  }
  function i(c, p) {
    return p = Oe({}, p), Object.keys(p).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        c
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(p).map((m) => [
          "div",
          {},
          ["span", o, m + ": "],
          a(p[m], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function a(c, p = !0) {
    return typeof c == "number" ? ["span", t, c] : typeof c == "string" ? ["span", n, JSON.stringify(c)] : typeof c == "boolean" ? ["span", o, c] : le(c) ? ["object", { object: p ? G(c) : c }] : ["span", n, String(c)];
  }
  function l(c, p) {
    const m = c.type;
    if (z(m))
      return;
    const _ = {};
    for (const N in c.ctx)
      u(m, N, p) && (_[N] = c.ctx[N]);
    return _;
  }
  function u(c, p, m) {
    const _ = c[m];
    if (W(_) && _.includes(p) || le(_) && p in _ || c.extends && u(c.extends, p, m) || c.mixins && c.mixins.some((N) => u(N, p, m)))
      return !0;
  }
  function f(c) {
    return Pr(c) ? "ShallowRef" : c.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(r) : window.devtoolsFormatters = [r];
}
const ki = "3.4.15", cn = g.NODE_ENV !== "production" ? T : Re;
var Sn = {};
const _d = "http://www.w3.org/2000/svg", yd = "http://www.w3.org/1998/Math/MathML", It = typeof document < "u" ? document : null, ji = It && /* @__PURE__ */ It.createElement("template"), Ed = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, o) => {
    const r = t === "svg" ? It.createElementNS(_d, e) : t === "mathml" ? It.createElementNS(yd, e) : It.createElement(e, n ? { is: n } : void 0);
    return e === "select" && o && o.multiple != null && r.setAttribute("multiple", o.multiple), r;
  },
  createText: (e) => It.createTextNode(e),
  createComment: (e) => It.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => It.querySelector(e),
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
      ji.innerHTML = o === "svg" ? `<svg>${e}</svg>` : o === "mathml" ? `<math>${e}</math>` : e;
      const a = ji.content;
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
}, bd = Symbol("_vtc");
function vd(e, t, n) {
  const o = e[bd];
  o && (t = (t ? [t, ...o] : [...o]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Nd = Symbol("_vod"), wd = Symbol(Sn.NODE_ENV !== "production" ? "CSS_VAR_TEXT" : "");
function Od(e, t, n) {
  const o = e.style, r = o.display, s = Se(n);
  if (n && !s) {
    if (t && !Se(t))
      for (const i in t)
        n[i] == null && rs(o, i, "");
    for (const i in n)
      rs(o, i, n[i]);
  } else if (s) {
    if (t !== n) {
      const i = o[wd];
      i && (n += ";" + i), o.cssText = n;
    }
  } else
    t && e.removeAttribute("style");
  Nd in e && (o.display = r);
}
const Sd = /[^\\];\s*$/, Li = /\s*!important$/;
function rs(e, t, n) {
  if (W(n))
    n.forEach((o) => rs(e, t, o));
  else if (n == null && (n = ""), Sn.NODE_ENV !== "production" && Sd.test(n) && cn(
    `Unexpected semicolon at the end of '${t}' style value: '${n}'`
  ), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const o = xd(e, t);
    Li.test(n) ? e.setProperty(
      Ut(o),
      n.replace(Li, ""),
      "important"
    ) : e[o] = n;
  }
}
const Mi = ["Webkit", "Moz", "ms"], Cr = {};
function xd(e, t) {
  const n = Cr[t];
  if (n)
    return n;
  let o = ht(t);
  if (o !== "filter" && o in e)
    return Cr[t] = o;
  o = un(o);
  for (let r = 0; r < Mi.length; r++) {
    const s = Mi[r] + o;
    if (s in e)
      return Cr[t] = s;
  }
  return t;
}
const Fi = "http://www.w3.org/1999/xlink";
function Rd(e, t, n, o, r) {
  if (o && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(Fi, t.slice(6, t.length)) : e.setAttributeNS(Fi, t, n);
  else {
    const s = su(t);
    n == null || s && !Da(n) ? e.removeAttribute(t) : e.setAttribute(t, s ? "" : n);
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
    const u = a === "OPTION" ? e.getAttribute("value") : e.value, f = n ?? "";
    u !== f && (e.value = f), n == null && e.removeAttribute(t);
    return;
  }
  let l = !1;
  if (n === "" || n == null) {
    const u = typeof e[t];
    u === "boolean" ? n = Da(n) : n == null && u === "string" ? (n = "", l = !0) : u === "number" && (n = 0, l = !0);
  }
  try {
    e[t] = n;
  } catch (u) {
    Sn.NODE_ENV !== "production" && !l && cn(
      `Failed setting prop "${t}" on <${a.toLowerCase()}>: value ${n} is invalid.`,
      u
    );
  }
  l && e.removeAttribute(t);
}
function yn(e, t, n, o) {
  e.addEventListener(t, n, o);
}
function Cd(e, t, n, o) {
  e.removeEventListener(t, n, o);
}
const Ui = Symbol("_vei");
function Dd(e, t, n, o, r = null) {
  const s = e[Ui] || (e[Ui] = {}), i = s[t];
  if (o && i)
    i.value = o;
  else {
    const [a, l] = $d(t);
    if (o) {
      const u = s[t] = Ad(o, r);
      yn(e, a, u, l);
    } else
      i && (Cd(e, a, i, l), s[t] = void 0);
  }
}
const Hi = /(?:Once|Passive|Capture)$/;
function $d(e) {
  let t;
  if (Hi.test(e)) {
    t = {};
    let o;
    for (; o = e.match(Hi); )
      e = e.slice(0, e.length - o[0].length), t[o[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Ut(e.slice(2)), t];
}
let Dr = 0;
const Td = /* @__PURE__ */ Promise.resolve(), Vd = () => Dr || (Td.then(() => Dr = 0), Dr = Date.now());
function Ad(e, t) {
  const n = (o) => {
    if (!o._vts)
      o._vts = Date.now();
    else if (o._vts <= n.attached)
      return;
    et(
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
const Bi = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, kd = (e, t, n, o, r, s, i, a, l) => {
  const u = r === "svg";
  t === "class" ? vd(e, o, u) : t === "style" ? Od(e, n, o) : to(t) ? Fo(t) || Dd(e, t, n, o, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : jd(e, t, o, u)) ? Pd(
    e,
    t,
    o,
    s,
    i,
    a,
    l
  ) : (t === "true-value" ? e._trueValue = o : t === "false-value" && (e._falseValue = o), Rd(e, t, o, u));
};
function jd(e, t, n, o) {
  if (o)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Bi(t) && z(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return Bi(t) && Se(n) ? !1 : t in e;
}
const qi = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return W(t) ? (n) => gn(t, n) : t;
};
function Ld(e) {
  e.target.composing = !0;
}
function Wi(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const $r = Symbol("_assign"), Md = {
  created(e, { modifiers: { lazy: t, trim: n, number: o } }, r) {
    e[$r] = qi(r);
    const s = o || r.props && r.props.type === "number";
    yn(e, t ? "change" : "input", (i) => {
      if (i.target.composing)
        return;
      let a = e.value;
      n && (a = a.trim()), s && (a = Fr(a)), e[$r](a);
    }), n && yn(e, "change", () => {
      e.value = e.value.trim();
    }), t || (yn(e, "compositionstart", Ld), yn(e, "compositionend", Wi), yn(e, "change", Wi));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, modifiers: { lazy: n, trim: o, number: r } }, s) {
    if (e[$r] = qi(s), e.composing)
      return;
    const i = r || e.type === "number" ? Fr(e.value) : e.value, a = t ?? "";
    i !== a && (document.activeElement === e && e.type !== "range" && (n || o && e.value.trim() === a) || (e.value = a));
  }
}, Fd = /* @__PURE__ */ Oe({ patchProp: kd }, Ed);
let Ki;
function Ud() {
  return Ki || (Ki = Yf(Fd));
}
const Hd = (...e) => {
  const t = Ud().createApp(...e);
  Sn.NODE_ENV !== "production" && (qd(t), Wd(t));
  const { mount: n } = t;
  return t.mount = (o) => {
    const r = Kd(o);
    if (!r)
      return;
    const s = t._component;
    !z(s) && !s.render && !s.template && (s.template = r.innerHTML), r.innerHTML = "";
    const i = n(r, !1, Bd(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), i;
  }, t;
};
function Bd(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function qd(e) {
  Object.defineProperty(e.config, "isNativeTag", {
    value: (t) => tu(t) || nu(t) || ou(t),
    writable: !1
  });
}
function Wd(e) {
  {
    const t = e.config.isCustomElement;
    Object.defineProperty(e.config, "isCustomElement", {
      get() {
        return t;
      },
      set() {
        cn(
          "The `isCustomElement` config option is deprecated. Use `compilerOptions.isCustomElement` instead."
        );
      }
    });
    const n = e.config.compilerOptions, o = 'The `compilerOptions` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, `compilerOptions` must be passed to `@vue/compiler-dom` in the build setup instead.\n- For vue-loader: pass it via vue-loader\'s `compilerOptions` loader option.\n- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader\n- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc';
    Object.defineProperty(e.config, "compilerOptions", {
      get() {
        return cn(o), n;
      },
      set() {
        cn(o);
      }
    });
  }
}
function Kd(e) {
  if (Se(e)) {
    const t = document.querySelector(e);
    return Sn.NODE_ENV !== "production" && !t && cn(
      `Failed to mount app: mount target selector "${e}" returned null.`
    ), t;
  }
  return Sn.NODE_ENV !== "production" && window.ShadowRoot && e instanceof window.ShadowRoot && e.mode === "closed" && cn(
    'mounting on a ShadowRoot with `{mode: "closed"}` may lead to unpredictable bugs'
  ), e;
}
var zd = {};
function Gd() {
  gd();
}
zd.NODE_ENV !== "production" && Gd();
var Bl = !1;
function vo(e, t, n) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, t), e.splice(t, 1, n), n) : (e[t] = n, n);
}
function Tr(e, t) {
  if (Array.isArray(e)) {
    e.splice(t, 1);
    return;
  }
  delete e[t];
}
function Jd() {
  return ql().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function ql() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof global < "u" ? global : {};
}
const Yd = typeof Proxy == "function", Xd = "devtools-plugin:setup", Qd = "plugin:settings:set";
let hn, ss;
function Zd() {
  var e;
  return hn !== void 0 || (typeof window < "u" && window.performance ? (hn = !0, ss = window.performance) : typeof global < "u" && (!((e = global.perf_hooks) === null || e === void 0) && e.performance) ? (hn = !0, ss = global.perf_hooks.performance) : hn = !1), hn;
}
function ep() {
  return Zd() ? ss.now() : Date.now();
}
class tp {
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
        return ep();
      }
    }, n && n.on(Qd, (i, a) => {
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
      }), this.fallbacks[a](...l)) : (...l) => new Promise((u) => {
        this.targetQueue.push({
          method: a,
          args: l,
          resolve: u
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
function zs(e, t) {
  const n = e, o = ql(), r = Jd(), s = Yd && n.enableEarlyProxy;
  if (r && (o.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !s))
    r.emit(Xd, e, t);
  else {
    const i = s ? new tp(n, r) : null;
    (o.__VUE_DEVTOOLS_PLUGINS__ = o.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: t,
      proxy: i
    }), i && t(i.proxiedTarget);
  }
}
var de = {};
let Mn;
const Xn = (e) => Mn = e, Wl = de.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function dn(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var pt;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(pt || (pt = {}));
const mr = typeof window < "u", Bn = (de.NODE_ENV !== "production" || !1) && de.NODE_ENV !== "test" && mr, zi = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function np(e, { autoBom: t = !1 } = {}) {
  return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function Gs(e, t, n) {
  const o = new XMLHttpRequest();
  o.open("GET", e), o.responseType = "blob", o.onload = function() {
    Gl(o.response, t, n);
  }, o.onerror = function() {
    console.error("could not download file");
  }, o.send();
}
function Kl(e) {
  const t = new XMLHttpRequest();
  t.open("HEAD", e, !1);
  try {
    t.send();
  } catch {
  }
  return t.status >= 200 && t.status <= 299;
}
function Ao(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const n = document.createEvent("MouseEvents");
    n.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(n);
  }
}
const Io = typeof navigator == "object" ? navigator : { userAgent: "" }, zl = /Macintosh/.test(Io.userAgent) && /AppleWebKit/.test(Io.userAgent) && !/Safari/.test(Io.userAgent), Gl = mr ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !zl ? op : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in Io ? rp : (
      // Fallback to using FileReader and a popup
      sp
    )
  )
) : () => {
};
function op(e, t = "download", n) {
  const o = document.createElement("a");
  o.download = t, o.rel = "noopener", typeof e == "string" ? (o.href = e, o.origin !== location.origin ? Kl(o.href) ? Gs(e, t, n) : (o.target = "_blank", Ao(o)) : Ao(o)) : (o.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(o.href);
  }, 4e4), setTimeout(function() {
    Ao(o);
  }, 0));
}
function rp(e, t = "download", n) {
  if (typeof e == "string")
    if (Kl(e))
      Gs(e, t, n);
    else {
      const o = document.createElement("a");
      o.href = e, o.target = "_blank", setTimeout(function() {
        Ao(o);
      });
    }
  else
    navigator.msSaveOrOpenBlob(np(e, n), t);
}
function sp(e, t, n, o) {
  if (o = o || open("", "_blank"), o && (o.document.title = o.document.body.innerText = "downloading..."), typeof e == "string")
    return Gs(e, t, n);
  const r = e.type === "application/octet-stream", s = /constructor/i.test(String(zi.HTMLElement)) || "safari" in zi, i = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((i || r && s || zl) && typeof FileReader < "u") {
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
function Ae(e, t) {
  const n = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(n, t) : t === "error" ? console.error(n) : t === "warn" ? console.warn(n) : console.log(n);
}
function Js(e) {
  return "_a" in e && "install" in e;
}
function Jl() {
  if (!("clipboard" in navigator))
    return Ae("Your browser doesn't support the Clipboard API", "error"), !0;
}
function Yl(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (Ae('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function ip(e) {
  if (!Jl())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), Ae("Global state copied to clipboard.");
    } catch (t) {
      if (Yl(t))
        return;
      Ae("Failed to serialize the state. Check the console for more details.", "error"), console.error(t);
    }
}
async function ap(e) {
  if (!Jl())
    try {
      Xl(e, JSON.parse(await navigator.clipboard.readText())), Ae("Global state pasted from clipboard.");
    } catch (t) {
      if (Yl(t))
        return;
      Ae("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(t);
    }
}
async function lp(e) {
  try {
    Gl(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (t) {
    Ae("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(t);
  }
}
let gt;
function cp() {
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
async function up(e) {
  try {
    const n = await cp()();
    if (!n)
      return;
    const { text: o, file: r } = n;
    Xl(e, JSON.parse(o)), Ae(`Global state imported from "${r.name}".`);
  } catch (t) {
    Ae("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(t);
  }
}
function Xl(e, t) {
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
const Ql = "🍍 Pinia (root)", is = "_root";
function fp(e) {
  return Js(e) ? {
    id: is,
    label: Ql
  } : {
    id: e.$id,
    label: e.$id
  };
}
function dp(e) {
  if (Js(e)) {
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
function pp(e) {
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
function hp(e) {
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
let bn = !0;
const ko = [], Qt = "pinia:mutations", ke = "pinia", { assign: mp } = Object, Qo = (e) => "🍍 " + e;
function gp(e, t) {
  zs({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: ko,
    app: e
  }, (n) => {
    typeof n.now != "function" && Ae("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), n.addTimelineLayer({
      id: Qt,
      label: "Pinia 🍍",
      color: 15064968
    }), n.addInspector({
      id: ke,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            ip(t);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await ap(t), n.sendInspectorTree(ke), n.sendInspectorState(ke);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            lp(t);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await up(t), n.sendInspectorTree(ke), n.sendInspectorState(ke);
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
            r ? typeof r.$reset != "function" ? Ae(`Cannot reset "${o}" store because it doesn't have a "$reset" method implemented.`, "warn") : (r.$reset(), Ae(`Store "${o}" reset.`)) : Ae(`Cannot reset "${o}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), n.on.inspectComponent((o, r) => {
      const s = o.componentInstance && o.componentInstance.proxy;
      if (s && s._pStores) {
        const i = o.componentInstance.proxy._pStores;
        Object.values(i).forEach((a) => {
          o.instanceData.state.push({
            type: Qo(a.$id),
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
              Object.keys(a.$state).reduce((l, u) => (l[u] = a.$state[u], l), {})
            )
          }), a._getters && a._getters.length && o.instanceData.state.push({
            type: Qo(a.$id),
            key: "getters",
            editable: !1,
            value: a._getters.reduce((l, u) => {
              try {
                l[u] = a[u];
              } catch (f) {
                l[u] = f;
              }
              return l;
            }, {})
          });
        });
      }
    }), n.on.getInspectorTree((o) => {
      if (o.app === e && o.inspectorId === ke) {
        let r = [t];
        r = r.concat(Array.from(t._s.values())), o.rootNodes = (o.filter ? r.filter((s) => "$id" in s ? s.$id.toLowerCase().includes(o.filter.toLowerCase()) : Ql.toLowerCase().includes(o.filter.toLowerCase())) : r).map(fp);
      }
    }), n.on.getInspectorState((o) => {
      if (o.app === e && o.inspectorId === ke) {
        const r = o.nodeId === is ? t : t._s.get(o.nodeId);
        if (!r)
          return;
        r && (o.state = dp(r));
      }
    }), n.on.editInspectorState((o, r) => {
      if (o.app === e && o.inspectorId === ke) {
        const s = o.nodeId === is ? t : t._s.get(o.nodeId);
        if (!s)
          return Ae(`store "${o.nodeId}" not found`, "error");
        const { path: i } = o;
        Js(s) ? i.unshift("state") : (i.length !== 1 || !s._customProperties.has(i[0]) || i[0] in s.$state) && i.unshift("$state"), bn = !1, o.set(s, i, o.state.value), bn = !0;
      }
    }), n.on.editComponentState((o) => {
      if (o.type.startsWith("🍍")) {
        const r = o.type.replace(/^🍍\s*/, ""), s = t._s.get(r);
        if (!s)
          return Ae(`store "${r}" not found`, "error");
        const { path: i } = o;
        if (i[0] !== "state")
          return Ae(`Invalid path for store "${r}":
${i}
Only state can be modified.`);
        i[0] = "$state", bn = !1, o.set(s, i, o.state.value), bn = !0;
      }
    });
  });
}
function _p(e, t) {
  ko.includes(Qo(t.$id)) || ko.push(Qo(t.$id)), zs({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: ko,
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
    t.$onAction(({ after: i, onError: a, name: l, args: u }) => {
      const f = Zl++;
      n.addTimelineEvent({
        layerId: Qt,
        event: {
          time: o(),
          title: "🛫 " + l,
          subtitle: "start",
          data: {
            store: Xe(t.$id),
            action: Xe(l),
            args: u
          },
          groupId: f
        }
      }), i((c) => {
        Mt = void 0, n.addTimelineEvent({
          layerId: Qt,
          event: {
            time: o(),
            title: "🛬 " + l,
            subtitle: "end",
            data: {
              store: Xe(t.$id),
              action: Xe(l),
              args: u,
              result: c
            },
            groupId: f
          }
        });
      }), a((c) => {
        Mt = void 0, n.addTimelineEvent({
          layerId: Qt,
          event: {
            time: o(),
            logType: "error",
            title: "💥 " + l,
            subtitle: "end",
            data: {
              store: Xe(t.$id),
              action: Xe(l),
              args: u,
              error: c
            },
            groupId: f
          }
        });
      });
    }, !0), t._customProperties.forEach((i) => {
      tt(() => ue(t[i]), (a, l) => {
        n.notifyComponentUpdate(), n.sendInspectorState(ke), bn && n.addTimelineEvent({
          layerId: Qt,
          event: {
            time: o(),
            title: "Change",
            subtitle: i,
            data: {
              newValue: a,
              oldValue: l
            },
            groupId: Mt
          }
        });
      }, { deep: !0 });
    }), t.$subscribe(({ events: i, type: a }, l) => {
      if (n.notifyComponentUpdate(), n.sendInspectorState(ke), !bn)
        return;
      const u = {
        time: o(),
        title: hp(a),
        data: mp({ store: Xe(t.$id) }, pp(i)),
        groupId: Mt
      };
      a === pt.patchFunction ? u.subtitle = "⤵️" : a === pt.patchObject ? u.subtitle = "🧩" : i && !Array.isArray(i) && (u.subtitle = i.type), i && (u.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: i
        }
      }), n.addTimelineEvent({
        layerId: Qt,
        event: u
      });
    }, { detached: !0, flush: "sync" });
    const r = t._hotUpdate;
    t._hotUpdate = Nt((i) => {
      r(i), n.addTimelineEvent({
        layerId: Qt,
        event: {
          time: o(),
          title: "🔥 " + t.$id,
          subtitle: "HMR update",
          data: {
            store: Xe(t.$id),
            info: Xe("HMR update")
          }
        }
      }), n.notifyComponentUpdate(), n.sendInspectorTree(ke), n.sendInspectorState(ke);
    });
    const { $dispose: s } = t;
    t.$dispose = () => {
      s(), n.notifyComponentUpdate(), n.sendInspectorTree(ke), n.sendInspectorState(ke), n.getSettings().logStoreChanges && Ae(`Disposed "${t.$id}" store 🗑`);
    }, n.notifyComponentUpdate(), n.sendInspectorTree(ke), n.sendInspectorState(ke), n.getSettings().logStoreChanges && Ae(`"${t.$id}" store installed 🆕`);
  });
}
let Zl = 0, Mt;
function Gi(e, t, n) {
  const o = t.reduce((r, s) => (r[s] = G(e)[s], r), {});
  for (const r in o)
    e[r] = function() {
      const s = Zl, i = n ? new Proxy(e, {
        get(...l) {
          return Mt = s, Reflect.get(...l);
        },
        set(...l) {
          return Mt = s, Reflect.set(...l);
        }
      }) : e;
      Mt = s;
      const a = o[r].apply(i, arguments);
      return Mt = void 0, a;
    };
}
function yp({ app: e, store: t, options: n }) {
  if (t.$id.startsWith("__hot:"))
    return;
  t._isOptionsAPI = !!n.state, Gi(t, Object.keys(n.actions), t._isOptionsAPI);
  const o = t._hotUpdate;
  G(t)._hotUpdate = function(r) {
    o.apply(this, arguments), Gi(t, Object.keys(r._hmrPayload.actions), !!t._isOptionsAPI);
  }, _p(
    e,
    // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
    t
  );
}
function Ep() {
  const e = Va(!0), t = e.run(() => xe({}));
  let n = [], o = [];
  const r = Nt({
    install(s) {
      Xn(r), r._a = s, s.provide(Wl, r), s.config.globalProperties.$pinia = r, Bn && gp(s, r), o.forEach((i) => n.push(i)), o = [];
    },
    use(s) {
      return !this._a && !Bl ? o.push(s) : n.push(s), this;
    },
    _p: n,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return Bn && typeof Proxy < "u" && r.use(yp), r;
}
function ec(e, t) {
  for (const n in t) {
    const o = t[n];
    if (!(n in e))
      continue;
    const r = e[n];
    dn(r) && dn(o) && !ve(o) && !ft(o) ? e[n] = ec(r, o) : e[n] = o;
  }
  return e;
}
const tc = () => {
};
function Ji(e, t, n, o = tc) {
  e.push(t);
  const r = () => {
    const s = e.indexOf(t);
    s > -1 && (e.splice(s, 1), o());
  };
  return !n && Aa() && au(r), r;
}
function mn(e, ...t) {
  e.slice().forEach((n) => {
    n(...t);
  });
}
const bp = (e) => e();
function as(e, t) {
  e instanceof Map && t instanceof Map && t.forEach((n, o) => e.set(o, n)), e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const o = t[n], r = e[n];
    dn(r) && dn(o) && e.hasOwnProperty(n) && !ve(o) && !ft(o) ? e[n] = as(r, o) : e[n] = o;
  }
  return e;
}
const vp = de.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function Np(e) {
  return !dn(e) || !e.hasOwnProperty(vp);
}
const { assign: Ge } = Object;
function Yi(e) {
  return !!(ve(e) && e.effect);
}
function Xi(e, t, n, o) {
  const { state: r, actions: s, getters: i } = t, a = n.state.value[e];
  let l;
  function u() {
    !a && (de.NODE_ENV === "production" || !o) && (n.state.value[e] = r ? r() : {});
    const f = de.NODE_ENV !== "production" && o ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      qr(xe(r ? r() : {}).value)
    ) : qr(n.state.value[e]);
    return Ge(f, s, Object.keys(i || {}).reduce((c, p) => (de.NODE_ENV !== "production" && p in f && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${p}" in store "${e}".`), c[p] = Nt(_e(() => {
      Xn(n);
      const m = n._s.get(e);
      return i[p].call(m, m);
    })), c), {}));
  }
  return l = ls(e, u, t, n, o, !0), l;
}
function ls(e, t, n = {}, o, r, s) {
  let i;
  const a = Ge({ actions: {} }, n);
  if (de.NODE_ENV !== "production" && !o._e.active)
    throw new Error("Pinia destroyed");
  const l = {
    deep: !0
    // flush: 'post',
  };
  de.NODE_ENV !== "production" && !Bl && (l.onTrigger = (F) => {
    u ? m = F : u == !1 && !D._hotUpdating && (Array.isArray(m) ? m.push(F) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let u, f, c = [], p = [], m;
  const _ = o.state.value[e];
  !s && !_ && (de.NODE_ENV === "production" || !r) && (o.state.value[e] = {});
  const N = xe({});
  let R;
  function O(F) {
    let L;
    u = f = !1, de.NODE_ENV !== "production" && (m = []), typeof F == "function" ? (F(o.state.value[e]), L = {
      type: pt.patchFunction,
      storeId: e,
      events: m
    }) : (as(o.state.value[e], F), L = {
      type: pt.patchObject,
      payload: F,
      storeId: e,
      events: m
    });
    const te = R = Symbol();
    Ko().then(() => {
      R === te && (u = !0);
    }), f = !0, mn(c, L, o.state.value[e]);
  }
  const V = s ? function() {
    const { state: L } = n, te = L ? L() : {};
    this.$patch((ye) => {
      Ge(ye, te);
    });
  } : (
    /* istanbul ignore next */
    de.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : tc
  );
  function I() {
    i.stop(), c = [], p = [], o._s.delete(e);
  }
  function K(F, L) {
    return function() {
      Xn(o);
      const te = Array.from(arguments), ye = [], nt = [];
      function Ue(q) {
        ye.push(q);
      }
      function $e(q) {
        nt.push(q);
      }
      mn(p, {
        args: te,
        name: F,
        store: D,
        after: Ue,
        onError: $e
      });
      let J;
      try {
        J = L.apply(this && this.$id === e ? this : D, te);
      } catch (q) {
        throw mn(nt, q), q;
      }
      return J instanceof Promise ? J.then((q) => (mn(ye, q), q)).catch((q) => (mn(nt, q), Promise.reject(q))) : (mn(ye, J), J);
    };
  }
  const ee = /* @__PURE__ */ Nt({
    actions: {},
    getters: {},
    state: [],
    hotState: N
  }), se = {
    _p: o,
    // _s: scope,
    $id: e,
    $onAction: Ji.bind(null, p),
    $patch: O,
    $reset: V,
    $subscribe(F, L = {}) {
      const te = Ji(c, F, L.detached, () => ye()), ye = i.run(() => tt(() => o.state.value[e], (nt) => {
        (L.flush === "sync" ? f : u) && F({
          storeId: e,
          type: pt.direct,
          events: m
        }, nt);
      }, Ge({}, l, L)));
      return te;
    },
    $dispose: I
  }, D = no(de.NODE_ENV !== "production" || Bn ? Ge(
    {
      _hmrPayload: ee,
      _customProperties: Nt(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    se
    // must be added later
    // setupStore
  ) : se);
  o._s.set(e, D);
  const he = (o._a && o._a.runWithContext || bp)(() => o._e.run(() => (i = Va()).run(t)));
  for (const F in he) {
    const L = he[F];
    if (ve(L) && !Yi(L) || ft(L))
      de.NODE_ENV !== "production" && r ? vo(N.value, F, wr(he, F)) : s || (_ && Np(L) && (ve(L) ? L.value = _[F] : as(L, _[F])), o.state.value[e][F] = L), de.NODE_ENV !== "production" && ee.state.push(F);
    else if (typeof L == "function") {
      const te = de.NODE_ENV !== "production" && r ? L : K(F, L);
      he[F] = te, de.NODE_ENV !== "production" && (ee.actions[F] = L), a.actions[F] = L;
    } else
      de.NODE_ENV !== "production" && Yi(L) && (ee.getters[F] = s ? (
        // @ts-expect-error
        n.getters[F]
      ) : L, mr && (he._getters || // @ts-expect-error: same
      (he._getters = Nt([]))).push(F));
  }
  if (Ge(D, he), Ge(G(D), he), Object.defineProperty(D, "$state", {
    get: () => de.NODE_ENV !== "production" && r ? N.value : o.state.value[e],
    set: (F) => {
      if (de.NODE_ENV !== "production" && r)
        throw new Error("cannot set hotState");
      O((L) => {
        Ge(L, F);
      });
    }
  }), de.NODE_ENV !== "production" && (D._hotUpdate = Nt((F) => {
    D._hotUpdating = !0, F._hmrPayload.state.forEach((L) => {
      if (L in D.$state) {
        const te = F.$state[L], ye = D.$state[L];
        typeof te == "object" && dn(te) && dn(ye) ? ec(te, ye) : F.$state[L] = ye;
      }
      vo(D, L, wr(F.$state, L));
    }), Object.keys(D.$state).forEach((L) => {
      L in F.$state || Tr(D, L);
    }), u = !1, f = !1, o.state.value[e] = wr(F._hmrPayload, "hotState"), f = !0, Ko().then(() => {
      u = !0;
    });
    for (const L in F._hmrPayload.actions) {
      const te = F[L];
      vo(D, L, K(L, te));
    }
    for (const L in F._hmrPayload.getters) {
      const te = F._hmrPayload.getters[L], ye = s ? (
        // special handling of options api
        _e(() => (Xn(o), te.call(D, D)))
      ) : te;
      vo(D, L, ye);
    }
    Object.keys(D._hmrPayload.getters).forEach((L) => {
      L in F._hmrPayload.getters || Tr(D, L);
    }), Object.keys(D._hmrPayload.actions).forEach((L) => {
      L in F._hmrPayload.actions || Tr(D, L);
    }), D._hmrPayload = F._hmrPayload, D._getters = F._getters, D._hotUpdating = !1;
  })), Bn) {
    const F = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((L) => {
      Object.defineProperty(D, L, Ge({ value: D[L] }, F));
    });
  }
  return o._p.forEach((F) => {
    if (Bn) {
      const L = i.run(() => F({
        store: D,
        app: o._a,
        pinia: o,
        options: a
      }));
      Object.keys(L || {}).forEach((te) => D._customProperties.add(te)), Ge(D, L);
    } else
      Ge(D, i.run(() => F({
        store: D,
        app: o._a,
        pinia: o,
        options: a
      })));
  }), de.NODE_ENV !== "production" && D.$state && typeof D.$state == "object" && typeof D.$state.constructor == "function" && !D.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${D.$id}".`), _ && s && n.hydrate && n.hydrate(D.$state, _), u = !0, f = !0, D;
}
function nc(e, t, n) {
  let o, r;
  const s = typeof t == "function";
  if (typeof e == "string")
    o = e, r = s ? n : t;
  else if (r = e, o = e.id, de.NODE_ENV !== "production" && typeof o != "string")
    throw new Error('[🍍]: "defineStore()" must be passed a store id as its first argument.');
  function i(a, l) {
    const u = jf();
    if (a = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (de.NODE_ENV === "test" && Mn && Mn._testing ? null : a) || (u ? dt(Wl, null) : null), a && Xn(a), de.NODE_ENV !== "production" && !Mn)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    a = Mn, a._s.has(o) || (s ? ls(o, t, r, a) : Xi(o, r, a), de.NODE_ENV !== "production" && (i._pinia = a));
    const f = a._s.get(o);
    if (de.NODE_ENV !== "production" && l) {
      const c = "__hot:" + o, p = s ? ls(c, t, r, a, !0) : Xi(c, Ge({}, r), a, !0);
      l._hotUpdate(p), delete a.state.value[c], a._s.delete(c);
    }
    if (de.NODE_ENV !== "production" && mr) {
      const c = Ws();
      if (c && c.proxy && // avoid adding stores that are just built for hot module replacement
      !l) {
        const p = c.proxy, m = "_pStores" in p ? p._pStores : p._pStores = {};
        m[o] = f;
      }
    }
    return f;
  }
  return i.$id = o, i;
}
function oc(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: wp } = Object.prototype, { getPrototypeOf: Ys } = Object, gr = /* @__PURE__ */ ((e) => (t) => {
  const n = wp.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), mt = (e) => (e = e.toLowerCase(), (t) => gr(t) === e), _r = (e) => (t) => typeof t === e, { isArray: Cn } = Array, Qn = _r("undefined");
function Op(e) {
  return e !== null && !Qn(e) && e.constructor !== null && !Qn(e.constructor) && Je(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const rc = mt("ArrayBuffer");
function Sp(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && rc(e.buffer), t;
}
const xp = _r("string"), Je = _r("function"), sc = _r("number"), yr = (e) => e !== null && typeof e == "object", Rp = (e) => e === !0 || e === !1, jo = (e) => {
  if (gr(e) !== "object")
    return !1;
  const t = Ys(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, Pp = mt("Date"), Cp = mt("File"), Dp = mt("Blob"), $p = mt("FileList"), Tp = (e) => yr(e) && Je(e.pipe), Vp = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || Je(e.append) && ((t = gr(e)) === "formdata" || // detect form-data instance
  t === "object" && Je(e.toString) && e.toString() === "[object FormData]"));
}, Ap = mt("URLSearchParams"), Ip = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function ao(e, t, { allOwnKeys: n = !1 } = {}) {
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
function ic(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let o = n.length, r;
  for (; o-- > 0; )
    if (r = n[o], t === r.toLowerCase())
      return r;
  return null;
}
const ac = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, lc = (e) => !Qn(e) && e !== ac;
function cs() {
  const { caseless: e } = lc(this) && this || {}, t = {}, n = (o, r) => {
    const s = e && ic(t, r) || r;
    jo(t[s]) && jo(o) ? t[s] = cs(t[s], o) : jo(o) ? t[s] = cs({}, o) : Cn(o) ? t[s] = o.slice() : t[s] = o;
  };
  for (let o = 0, r = arguments.length; o < r; o++)
    arguments[o] && ao(arguments[o], n);
  return t;
}
const kp = (e, t, n, { allOwnKeys: o } = {}) => (ao(t, (r, s) => {
  n && Je(r) ? e[s] = oc(r, n) : e[s] = r;
}, { allOwnKeys: o }), e), jp = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Lp = (e, t, n, o) => {
  e.prototype = Object.create(t.prototype, o), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, Mp = (e, t, n, o) => {
  let r, s, i;
  const a = {};
  if (t = t || {}, e == null)
    return t;
  do {
    for (r = Object.getOwnPropertyNames(e), s = r.length; s-- > 0; )
      i = r[s], (!o || o(i, e, t)) && !a[i] && (t[i] = e[i], a[i] = !0);
    e = n !== !1 && Ys(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, Fp = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const o = e.indexOf(t, n);
  return o !== -1 && o === n;
}, Up = (e) => {
  if (!e)
    return null;
  if (Cn(e))
    return e;
  let t = e.length;
  if (!sc(t))
    return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, Hp = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && Ys(Uint8Array)), Bp = (e, t) => {
  const o = (e && e[Symbol.iterator]).call(e);
  let r;
  for (; (r = o.next()) && !r.done; ) {
    const s = r.value;
    t.call(e, s[0], s[1]);
  }
}, qp = (e, t) => {
  let n;
  const o = [];
  for (; (n = e.exec(t)) !== null; )
    o.push(n);
  return o;
}, Wp = mt("HTMLFormElement"), Kp = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, o, r) {
    return o.toUpperCase() + r;
  }
), Qi = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), zp = mt("RegExp"), cc = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), o = {};
  ao(n, (r, s) => {
    let i;
    (i = t(r, s, e)) !== !1 && (o[s] = i || r);
  }), Object.defineProperties(e, o);
}, Gp = (e) => {
  cc(e, (t, n) => {
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
}, Jp = (e, t) => {
  const n = {}, o = (r) => {
    r.forEach((s) => {
      n[s] = !0;
    });
  };
  return Cn(e) ? o(e) : o(String(e).split(t)), n;
}, Yp = () => {
}, Xp = (e, t) => (e = +e, Number.isFinite(e) ? e : t), Vr = "abcdefghijklmnopqrstuvwxyz", Zi = "0123456789", uc = {
  DIGIT: Zi,
  ALPHA: Vr,
  ALPHA_DIGIT: Vr + Vr.toUpperCase() + Zi
}, Qp = (e = 16, t = uc.ALPHA_DIGIT) => {
  let n = "";
  const { length: o } = t;
  for (; e--; )
    n += t[Math.random() * o | 0];
  return n;
};
function Zp(e) {
  return !!(e && Je(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const eh = (e) => {
  const t = new Array(10), n = (o, r) => {
    if (yr(o)) {
      if (t.indexOf(o) >= 0)
        return;
      if (!("toJSON" in o)) {
        t[r] = o;
        const s = Cn(o) ? [] : {};
        return ao(o, (i, a) => {
          const l = n(i, r + 1);
          !Qn(l) && (s[a] = l);
        }), t[r] = void 0, s;
      }
    }
    return o;
  };
  return n(e, 0);
}, th = mt("AsyncFunction"), nh = (e) => e && (yr(e) || Je(e)) && Je(e.then) && Je(e.catch), w = {
  isArray: Cn,
  isArrayBuffer: rc,
  isBuffer: Op,
  isFormData: Vp,
  isArrayBufferView: Sp,
  isString: xp,
  isNumber: sc,
  isBoolean: Rp,
  isObject: yr,
  isPlainObject: jo,
  isUndefined: Qn,
  isDate: Pp,
  isFile: Cp,
  isBlob: Dp,
  isRegExp: zp,
  isFunction: Je,
  isStream: Tp,
  isURLSearchParams: Ap,
  isTypedArray: Hp,
  isFileList: $p,
  forEach: ao,
  merge: cs,
  extend: kp,
  trim: Ip,
  stripBOM: jp,
  inherits: Lp,
  toFlatObject: Mp,
  kindOf: gr,
  kindOfTest: mt,
  endsWith: Fp,
  toArray: Up,
  forEachEntry: Bp,
  matchAll: qp,
  isHTMLForm: Wp,
  hasOwnProperty: Qi,
  hasOwnProp: Qi,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: cc,
  freezeMethods: Gp,
  toObjectSet: Jp,
  toCamelCase: Kp,
  noop: Yp,
  toFiniteNumber: Xp,
  findKey: ic,
  global: ac,
  isContextDefined: lc,
  ALPHABET: uc,
  generateString: Qp,
  isSpecCompliantForm: Zp,
  toJSONObject: eh,
  isAsyncFn: th,
  isThenable: nh
};
function ie(e, t, n, o, r) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), o && (this.request = o), r && (this.response = r);
}
w.inherits(ie, Error, {
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
const fc = ie.prototype, dc = {};
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
  dc[e] = { value: e };
});
Object.defineProperties(ie, dc);
Object.defineProperty(fc, "isAxiosError", { value: !0 });
ie.from = (e, t, n, o, r, s) => {
  const i = Object.create(fc);
  return w.toFlatObject(e, i, function(l) {
    return l !== Error.prototype;
  }, (a) => a !== "isAxiosError"), ie.call(i, e.message, t, n, o, r), i.cause = e, i.name = e.name, s && Object.assign(i, s), i;
};
const oh = null;
function us(e) {
  return w.isPlainObject(e) || w.isArray(e);
}
function pc(e) {
  return w.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function ea(e, t, n) {
  return e ? e.concat(t).map(function(r, s) {
    return r = pc(r), !n && s ? "[" + r + "]" : r;
  }).join(n ? "." : "") : t;
}
function rh(e) {
  return w.isArray(e) && !e.some(us);
}
const sh = w.toFlatObject(w, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function Er(e, t, n) {
  if (!w.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = w.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(N, R) {
    return !w.isUndefined(R[N]);
  });
  const o = n.metaTokens, r = n.visitor || f, s = n.dots, i = n.indexes, l = (n.Blob || typeof Blob < "u" && Blob) && w.isSpecCompliantForm(t);
  if (!w.isFunction(r))
    throw new TypeError("visitor must be a function");
  function u(_) {
    if (_ === null)
      return "";
    if (w.isDate(_))
      return _.toISOString();
    if (!l && w.isBlob(_))
      throw new ie("Blob is not supported. Use a Buffer instead.");
    return w.isArrayBuffer(_) || w.isTypedArray(_) ? l && typeof Blob == "function" ? new Blob([_]) : Buffer.from(_) : _;
  }
  function f(_, N, R) {
    let O = _;
    if (_ && !R && typeof _ == "object") {
      if (w.endsWith(N, "{}"))
        N = o ? N : N.slice(0, -2), _ = JSON.stringify(_);
      else if (w.isArray(_) && rh(_) || (w.isFileList(_) || w.endsWith(N, "[]")) && (O = w.toArray(_)))
        return N = pc(N), O.forEach(function(I, K) {
          !(w.isUndefined(I) || I === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            i === !0 ? ea([N], K, s) : i === null ? N : N + "[]",
            u(I)
          );
        }), !1;
    }
    return us(_) ? !0 : (t.append(ea(R, N, s), u(_)), !1);
  }
  const c = [], p = Object.assign(sh, {
    defaultVisitor: f,
    convertValue: u,
    isVisitable: us
  });
  function m(_, N) {
    if (!w.isUndefined(_)) {
      if (c.indexOf(_) !== -1)
        throw Error("Circular reference detected in " + N.join("."));
      c.push(_), w.forEach(_, function(O, V) {
        (!(w.isUndefined(O) || O === null) && r.call(
          t,
          O,
          w.isString(V) ? V.trim() : V,
          N,
          p
        )) === !0 && m(O, N ? N.concat(V) : [V]);
      }), c.pop();
    }
  }
  if (!w.isObject(e))
    throw new TypeError("data must be an object");
  return m(e), t;
}
function ta(e) {
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
function Xs(e, t) {
  this._pairs = [], e && Er(e, this, t);
}
const hc = Xs.prototype;
hc.append = function(t, n) {
  this._pairs.push([t, n]);
};
hc.toString = function(t) {
  const n = t ? function(o) {
    return t.call(this, o, ta);
  } : ta;
  return this._pairs.map(function(r) {
    return n(r[0]) + "=" + n(r[1]);
  }, "").join("&");
};
function ih(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function mc(e, t, n) {
  if (!t)
    return e;
  const o = n && n.encode || ih, r = n && n.serialize;
  let s;
  if (r ? s = r(t, n) : s = w.isURLSearchParams(t) ? t.toString() : new Xs(t, n).toString(o), s) {
    const i = e.indexOf("#");
    i !== -1 && (e = e.slice(0, i)), e += (e.indexOf("?") === -1 ? "?" : "&") + s;
  }
  return e;
}
class na {
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
const gc = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, ah = typeof URLSearchParams < "u" ? URLSearchParams : Xs, lh = typeof FormData < "u" ? FormData : null, ch = typeof Blob < "u" ? Blob : null, uh = {
  isBrowser: !0,
  classes: {
    URLSearchParams: ah,
    FormData: lh,
    Blob: ch
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, _c = typeof window < "u" && typeof document < "u", fh = ((e) => _c && ["ReactNative", "NativeScript", "NS"].indexOf(e) < 0)(typeof navigator < "u" && navigator.product), dh = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", ph = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: _c,
  hasStandardBrowserEnv: fh,
  hasStandardBrowserWebWorkerEnv: dh
}, Symbol.toStringTag, { value: "Module" })), ct = {
  ...ph,
  ...uh
};
function hh(e, t) {
  return Er(e, new ct.classes.URLSearchParams(), Object.assign({
    visitor: function(n, o, r, s) {
      return ct.isNode && w.isBuffer(n) ? (this.append(o, n.toString("base64")), !1) : s.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function mh(e) {
  return w.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function gh(e) {
  const t = {}, n = Object.keys(e);
  let o;
  const r = n.length;
  let s;
  for (o = 0; o < r; o++)
    s = n[o], t[s] = e[s];
  return t;
}
function yc(e) {
  function t(n, o, r, s) {
    let i = n[s++];
    if (i === "__proto__")
      return !0;
    const a = Number.isFinite(+i), l = s >= n.length;
    return i = !i && w.isArray(r) ? r.length : i, l ? (w.hasOwnProp(r, i) ? r[i] = [r[i], o] : r[i] = o, !a) : ((!r[i] || !w.isObject(r[i])) && (r[i] = []), t(n, o, r[i], s) && w.isArray(r[i]) && (r[i] = gh(r[i])), !a);
  }
  if (w.isFormData(e) && w.isFunction(e.entries)) {
    const n = {};
    return w.forEachEntry(e, (o, r) => {
      t(mh(o), r, n, 0);
    }), n;
  }
  return null;
}
function _h(e, t, n) {
  if (w.isString(e))
    try {
      return (t || JSON.parse)(e), w.trim(e);
    } catch (o) {
      if (o.name !== "SyntaxError")
        throw o;
    }
  return (n || JSON.stringify)(e);
}
const Qs = {
  transitional: gc,
  adapter: ["xhr", "http"],
  transformRequest: [function(t, n) {
    const o = n.getContentType() || "", r = o.indexOf("application/json") > -1, s = w.isObject(t);
    if (s && w.isHTMLForm(t) && (t = new FormData(t)), w.isFormData(t))
      return r ? JSON.stringify(yc(t)) : t;
    if (w.isArrayBuffer(t) || w.isBuffer(t) || w.isStream(t) || w.isFile(t) || w.isBlob(t))
      return t;
    if (w.isArrayBufferView(t))
      return t.buffer;
    if (w.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let a;
    if (s) {
      if (o.indexOf("application/x-www-form-urlencoded") > -1)
        return hh(t, this.formSerializer).toString();
      if ((a = w.isFileList(t)) || o.indexOf("multipart/form-data") > -1) {
        const l = this.env && this.env.FormData;
        return Er(
          a ? { "files[]": t } : t,
          l && new l(),
          this.formSerializer
        );
      }
    }
    return s || r ? (n.setContentType("application/json", !1), _h(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || Qs.transitional, o = n && n.forcedJSONParsing, r = this.responseType === "json";
    if (t && w.isString(t) && (o && !this.responseType || r)) {
      const i = !(n && n.silentJSONParsing) && r;
      try {
        return JSON.parse(t);
      } catch (a) {
        if (i)
          throw a.name === "SyntaxError" ? ie.from(a, ie.ERR_BAD_RESPONSE, this, null, this.response) : a;
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
    FormData: ct.classes.FormData,
    Blob: ct.classes.Blob
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
  Qs.headers[e] = {};
});
const Zs = Qs, yh = w.toObjectSet([
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
]), Eh = (e) => {
  const t = {};
  let n, o, r;
  return e && e.split(`
`).forEach(function(i) {
    r = i.indexOf(":"), n = i.substring(0, r).trim().toLowerCase(), o = i.substring(r + 1).trim(), !(!n || t[n] && yh[n]) && (n === "set-cookie" ? t[n] ? t[n].push(o) : t[n] = [o] : t[n] = t[n] ? t[n] + ", " + o : o);
  }), t;
}, oa = Symbol("internals");
function An(e) {
  return e && String(e).trim().toLowerCase();
}
function Lo(e) {
  return e === !1 || e == null ? e : w.isArray(e) ? e.map(Lo) : String(e);
}
function bh(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let o;
  for (; o = n.exec(e); )
    t[o[1]] = o[2];
  return t;
}
const vh = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Ar(e, t, n, o, r) {
  if (w.isFunction(o))
    return o.call(this, t, n);
  if (r && (t = n), !!w.isString(t)) {
    if (w.isString(o))
      return t.indexOf(o) !== -1;
    if (w.isRegExp(o))
      return o.test(t);
  }
}
function Nh(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, o) => n.toUpperCase() + o);
}
function wh(e, t) {
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
class br {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, o) {
    const r = this;
    function s(a, l, u) {
      const f = An(l);
      if (!f)
        throw new Error("header name must be a non-empty string");
      const c = w.findKey(r, f);
      (!c || r[c] === void 0 || u === !0 || u === void 0 && r[c] !== !1) && (r[c || l] = Lo(a));
    }
    const i = (a, l) => w.forEach(a, (u, f) => s(u, f, l));
    return w.isPlainObject(t) || t instanceof this.constructor ? i(t, n) : w.isString(t) && (t = t.trim()) && !vh(t) ? i(Eh(t), n) : t != null && s(n, t, o), this;
  }
  get(t, n) {
    if (t = An(t), t) {
      const o = w.findKey(this, t);
      if (o) {
        const r = this[o];
        if (!n)
          return r;
        if (n === !0)
          return bh(r);
        if (w.isFunction(n))
          return n.call(this, r, o);
        if (w.isRegExp(n))
          return n.exec(r);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = An(t), t) {
      const o = w.findKey(this, t);
      return !!(o && this[o] !== void 0 && (!n || Ar(this, this[o], o, n)));
    }
    return !1;
  }
  delete(t, n) {
    const o = this;
    let r = !1;
    function s(i) {
      if (i = An(i), i) {
        const a = w.findKey(o, i);
        a && (!n || Ar(o, o[a], a, n)) && (delete o[a], r = !0);
      }
    }
    return w.isArray(t) ? t.forEach(s) : s(t), r;
  }
  clear(t) {
    const n = Object.keys(this);
    let o = n.length, r = !1;
    for (; o--; ) {
      const s = n[o];
      (!t || Ar(this, this[s], s, t, !0)) && (delete this[s], r = !0);
    }
    return r;
  }
  normalize(t) {
    const n = this, o = {};
    return w.forEach(this, (r, s) => {
      const i = w.findKey(o, s);
      if (i) {
        n[i] = Lo(r), delete n[s];
        return;
      }
      const a = t ? Nh(s) : String(s).trim();
      a !== s && delete n[s], n[a] = Lo(r), o[a] = !0;
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
    const o = (this[oa] = this[oa] = {
      accessors: {}
    }).accessors, r = this.prototype;
    function s(i) {
      const a = An(i);
      o[a] || (wh(r, i), o[a] = !0);
    }
    return w.isArray(t) ? t.forEach(s) : s(t), this;
  }
}
br.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
w.reduceDescriptors(br.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(o) {
      this[n] = o;
    }
  };
});
w.freezeMethods(br);
const Ot = br;
function Ir(e, t) {
  const n = this || Zs, o = t || n, r = Ot.from(o.headers);
  let s = o.data;
  return w.forEach(e, function(a) {
    s = a.call(n, s, r.normalize(), t ? t.status : void 0);
  }), r.normalize(), s;
}
function Ec(e) {
  return !!(e && e.__CANCEL__);
}
function lo(e, t, n) {
  ie.call(this, e ?? "canceled", ie.ERR_CANCELED, t, n), this.name = "CanceledError";
}
w.inherits(lo, ie, {
  __CANCEL__: !0
});
function Oh(e, t, n) {
  const o = n.config.validateStatus;
  !n.status || !o || o(n.status) ? e(n) : t(new ie(
    "Request failed with status code " + n.status,
    [ie.ERR_BAD_REQUEST, ie.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
const Sh = ct.hasStandardBrowserEnv ? (
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
function xh(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Rh(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function bc(e, t) {
  return e && !xh(t) ? Rh(e, t) : t;
}
const Ph = ct.hasStandardBrowserEnv ? (
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
function Ch(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function Dh(e, t) {
  e = e || 10;
  const n = new Array(e), o = new Array(e);
  let r = 0, s = 0, i;
  return t = t !== void 0 ? t : 1e3, function(l) {
    const u = Date.now(), f = o[s];
    i || (i = u), n[r] = l, o[r] = u;
    let c = s, p = 0;
    for (; c !== r; )
      p += n[c++], c = c % e;
    if (r = (r + 1) % e, r === s && (s = (s + 1) % e), u - i < t)
      return;
    const m = f && u - f;
    return m ? Math.round(p * 1e3 / m) : void 0;
  };
}
function ra(e, t) {
  let n = 0;
  const o = Dh(50, 250);
  return (r) => {
    const s = r.loaded, i = r.lengthComputable ? r.total : void 0, a = s - n, l = o(a), u = s <= i;
    n = s;
    const f = {
      loaded: s,
      total: i,
      progress: i ? s / i : void 0,
      bytes: a,
      rate: l || void 0,
      estimated: l && i && u ? (i - s) / l : void 0,
      event: r
    };
    f[t ? "download" : "upload"] = !0, e(f);
  };
}
const $h = typeof XMLHttpRequest < "u", Th = $h && function(e) {
  return new Promise(function(n, o) {
    let r = e.data;
    const s = Ot.from(e.headers).normalize();
    let { responseType: i, withXSRFToken: a } = e, l;
    function u() {
      e.cancelToken && e.cancelToken.unsubscribe(l), e.signal && e.signal.removeEventListener("abort", l);
    }
    let f;
    if (w.isFormData(r)) {
      if (ct.hasStandardBrowserEnv || ct.hasStandardBrowserWebWorkerEnv)
        s.setContentType(!1);
      else if ((f = s.getContentType()) !== !1) {
        const [N, ...R] = f ? f.split(";").map((O) => O.trim()).filter(Boolean) : [];
        s.setContentType([N || "multipart/form-data", ...R].join("; "));
      }
    }
    let c = new XMLHttpRequest();
    if (e.auth) {
      const N = e.auth.username || "", R = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
      s.set("Authorization", "Basic " + btoa(N + ":" + R));
    }
    const p = bc(e.baseURL, e.url);
    c.open(e.method.toUpperCase(), mc(p, e.params, e.paramsSerializer), !0), c.timeout = e.timeout;
    function m() {
      if (!c)
        return;
      const N = Ot.from(
        "getAllResponseHeaders" in c && c.getAllResponseHeaders()
      ), O = {
        data: !i || i === "text" || i === "json" ? c.responseText : c.response,
        status: c.status,
        statusText: c.statusText,
        headers: N,
        config: e,
        request: c
      };
      Oh(function(I) {
        n(I), u();
      }, function(I) {
        o(I), u();
      }, O), c = null;
    }
    if ("onloadend" in c ? c.onloadend = m : c.onreadystatechange = function() {
      !c || c.readyState !== 4 || c.status === 0 && !(c.responseURL && c.responseURL.indexOf("file:") === 0) || setTimeout(m);
    }, c.onabort = function() {
      c && (o(new ie("Request aborted", ie.ECONNABORTED, e, c)), c = null);
    }, c.onerror = function() {
      o(new ie("Network Error", ie.ERR_NETWORK, e, c)), c = null;
    }, c.ontimeout = function() {
      let R = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded";
      const O = e.transitional || gc;
      e.timeoutErrorMessage && (R = e.timeoutErrorMessage), o(new ie(
        R,
        O.clarifyTimeoutError ? ie.ETIMEDOUT : ie.ECONNABORTED,
        e,
        c
      )), c = null;
    }, ct.hasStandardBrowserEnv && (a && w.isFunction(a) && (a = a(e)), a || a !== !1 && Ph(p))) {
      const N = e.xsrfHeaderName && e.xsrfCookieName && Sh.read(e.xsrfCookieName);
      N && s.set(e.xsrfHeaderName, N);
    }
    r === void 0 && s.setContentType(null), "setRequestHeader" in c && w.forEach(s.toJSON(), function(R, O) {
      c.setRequestHeader(O, R);
    }), w.isUndefined(e.withCredentials) || (c.withCredentials = !!e.withCredentials), i && i !== "json" && (c.responseType = e.responseType), typeof e.onDownloadProgress == "function" && c.addEventListener("progress", ra(e.onDownloadProgress, !0)), typeof e.onUploadProgress == "function" && c.upload && c.upload.addEventListener("progress", ra(e.onUploadProgress)), (e.cancelToken || e.signal) && (l = (N) => {
      c && (o(!N || N.type ? new lo(null, e, c) : N), c.abort(), c = null);
    }, e.cancelToken && e.cancelToken.subscribe(l), e.signal && (e.signal.aborted ? l() : e.signal.addEventListener("abort", l)));
    const _ = Ch(p);
    if (_ && ct.protocols.indexOf(_) === -1) {
      o(new ie("Unsupported protocol " + _ + ":", ie.ERR_BAD_REQUEST, e));
      return;
    }
    c.send(r || null);
  });
}, fs = {
  http: oh,
  xhr: Th
};
w.forEach(fs, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const sa = (e) => `- ${e}`, Vh = (e) => w.isFunction(e) || e === null || e === !1, vc = {
  getAdapter: (e) => {
    e = w.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, o;
    const r = {};
    for (let s = 0; s < t; s++) {
      n = e[s];
      let i;
      if (o = n, !Vh(n) && (o = fs[(i = String(n)).toLowerCase()], o === void 0))
        throw new ie(`Unknown adapter '${i}'`);
      if (o)
        break;
      r[i || "#" + s] = o;
    }
    if (!o) {
      const s = Object.entries(r).map(
        ([a, l]) => `adapter ${a} ` + (l === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let i = t ? s.length > 1 ? `since :
` + s.map(sa).join(`
`) : " " + sa(s[0]) : "as no adapter specified";
      throw new ie(
        "There is no suitable adapter to dispatch the request " + i,
        "ERR_NOT_SUPPORT"
      );
    }
    return o;
  },
  adapters: fs
};
function kr(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new lo(null, e);
}
function ia(e) {
  return kr(e), e.headers = Ot.from(e.headers), e.data = Ir.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), vc.getAdapter(e.adapter || Zs.adapter)(e).then(function(o) {
    return kr(e), o.data = Ir.call(
      e,
      e.transformResponse,
      o
    ), o.headers = Ot.from(o.headers), o;
  }, function(o) {
    return Ec(o) || (kr(e), o && o.response && (o.response.data = Ir.call(
      e,
      e.transformResponse,
      o.response
    ), o.response.headers = Ot.from(o.response.headers))), Promise.reject(o);
  });
}
const aa = (e) => e instanceof Ot ? e.toJSON() : e;
function xn(e, t) {
  t = t || {};
  const n = {};
  function o(u, f, c) {
    return w.isPlainObject(u) && w.isPlainObject(f) ? w.merge.call({ caseless: c }, u, f) : w.isPlainObject(f) ? w.merge({}, f) : w.isArray(f) ? f.slice() : f;
  }
  function r(u, f, c) {
    if (w.isUndefined(f)) {
      if (!w.isUndefined(u))
        return o(void 0, u, c);
    } else
      return o(u, f, c);
  }
  function s(u, f) {
    if (!w.isUndefined(f))
      return o(void 0, f);
  }
  function i(u, f) {
    if (w.isUndefined(f)) {
      if (!w.isUndefined(u))
        return o(void 0, u);
    } else
      return o(void 0, f);
  }
  function a(u, f, c) {
    if (c in t)
      return o(u, f);
    if (c in e)
      return o(void 0, u);
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
    headers: (u, f) => r(aa(u), aa(f), !0)
  };
  return w.forEach(Object.keys(Object.assign({}, e, t)), function(f) {
    const c = l[f] || r, p = c(e[f], t[f], f);
    w.isUndefined(p) && c !== a || (n[f] = p);
  }), n;
}
const Nc = "1.6.7", ei = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  ei[e] = function(o) {
    return typeof o === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const la = {};
ei.transitional = function(t, n, o) {
  function r(s, i) {
    return "[Axios v" + Nc + "] Transitional option '" + s + "'" + i + (o ? ". " + o : "");
  }
  return (s, i, a) => {
    if (t === !1)
      throw new ie(
        r(i, " has been removed" + (n ? " in " + n : "")),
        ie.ERR_DEPRECATED
      );
    return n && !la[i] && (la[i] = !0, console.warn(
      r(
        i,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(s, i, a) : !0;
  };
};
function Ah(e, t, n) {
  if (typeof e != "object")
    throw new ie("options must be an object", ie.ERR_BAD_OPTION_VALUE);
  const o = Object.keys(e);
  let r = o.length;
  for (; r-- > 0; ) {
    const s = o[r], i = t[s];
    if (i) {
      const a = e[s], l = a === void 0 || i(a, s, e);
      if (l !== !0)
        throw new ie("option " + s + " must be " + l, ie.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new ie("Unknown option " + s, ie.ERR_BAD_OPTION);
  }
}
const ds = {
  assertOptions: Ah,
  validators: ei
}, $t = ds.validators;
class Zo {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new na(),
      response: new na()
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
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = xn(this.defaults, n);
    const { transitional: o, paramsSerializer: r, headers: s } = n;
    o !== void 0 && ds.assertOptions(o, {
      silentJSONParsing: $t.transitional($t.boolean),
      forcedJSONParsing: $t.transitional($t.boolean),
      clarifyTimeoutError: $t.transitional($t.boolean)
    }, !1), r != null && (w.isFunction(r) ? n.paramsSerializer = {
      serialize: r
    } : ds.assertOptions(r, {
      encode: $t.function,
      serialize: $t.function
    }, !0)), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let i = s && w.merge(
      s.common,
      s[n.method]
    );
    s && w.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (_) => {
        delete s[_];
      }
    ), n.headers = Ot.concat(i, s);
    const a = [];
    let l = !0;
    this.interceptors.request.forEach(function(N) {
      typeof N.runWhen == "function" && N.runWhen(n) === !1 || (l = l && N.synchronous, a.unshift(N.fulfilled, N.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function(N) {
      u.push(N.fulfilled, N.rejected);
    });
    let f, c = 0, p;
    if (!l) {
      const _ = [ia.bind(this), void 0];
      for (_.unshift.apply(_, a), _.push.apply(_, u), p = _.length, f = Promise.resolve(n); c < p; )
        f = f.then(_[c++], _[c++]);
      return f;
    }
    p = a.length;
    let m = n;
    for (c = 0; c < p; ) {
      const _ = a[c++], N = a[c++];
      try {
        m = _(m);
      } catch (R) {
        N.call(this, R);
        break;
      }
    }
    try {
      f = ia.call(this, m);
    } catch (_) {
      return Promise.reject(_);
    }
    for (c = 0, p = u.length; c < p; )
      f = f.then(u[c++], u[c++]);
    return f;
  }
  getUri(t) {
    t = xn(this.defaults, t);
    const n = bc(t.baseURL, t.url);
    return mc(n, t.params, t.paramsSerializer);
  }
}
w.forEach(["delete", "get", "head", "options"], function(t) {
  Zo.prototype[t] = function(n, o) {
    return this.request(xn(o || {}, {
      method: t,
      url: n,
      data: (o || {}).data
    }));
  };
});
w.forEach(["post", "put", "patch"], function(t) {
  function n(o) {
    return function(s, i, a) {
      return this.request(xn(a || {}, {
        method: t,
        headers: o ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: s,
        data: i
      }));
    };
  }
  Zo.prototype[t] = n(), Zo.prototype[t + "Form"] = n(!0);
});
const Mo = Zo;
class ti {
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
      o.reason || (o.reason = new lo(s, i, a), n(o.reason));
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
      token: new ti(function(r) {
        t = r;
      }),
      cancel: t
    };
  }
}
const Ih = ti;
function kh(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function jh(e) {
  return w.isObject(e) && e.isAxiosError === !0;
}
const ps = {
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
Object.entries(ps).forEach(([e, t]) => {
  ps[t] = e;
});
const Lh = ps;
function wc(e) {
  const t = new Mo(e), n = oc(Mo.prototype.request, t);
  return w.extend(n, Mo.prototype, t, { allOwnKeys: !0 }), w.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(r) {
    return wc(xn(e, r));
  }, n;
}
const De = wc(Zs);
De.Axios = Mo;
De.CanceledError = lo;
De.CancelToken = Ih;
De.isCancel = Ec;
De.VERSION = Nc;
De.toFormData = Er;
De.AxiosError = ie;
De.Cancel = De.CanceledError;
De.all = function(t) {
  return Promise.all(t);
};
De.spread = kh;
De.isAxiosError = jh;
De.mergeConfig = xn;
De.AxiosHeaders = Ot;
De.formToJSON = (e) => yc(w.isHTMLForm(e) ? new FormData(e) : e);
De.getAdapter = vc.getAdapter;
De.HttpStatusCode = Lh;
De.default = De;
var wn;
const en = class en {
  constructor(t, n, o = "api") {
    ci(this, wn, {
      page: "api",
      type: "module",
      prefix: "REPLACE_WITH_MODULE_NAME",
      route: ""
    });
    po(this, wn).prefix = n, po(this, wn).page = o, this.client = De.create({
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
    const n = new URL(location.href).searchParams, o = { ...po(this, wn) }, r = ["type", "page"];
    for (const [s, i] of n)
      r.includes(s) || (o[s] = i);
    return window.redcap_csrf_token && (o.redcap_csrf_token = window.redcap_csrf_token), o;
  }
  static makeRoute(t, n = {}) {
    return n.params = n.params || {}, n.params.route = encodeURIComponent(t), n;
  }
  read(t, n = {}) {
    return n = en.makeRoute(t, n), this.client.get("", n);
  }
  readOne(t, n, o = {}) {
    return o = en.makeRoute(`${t}/${n}`, o), this.client.get("", o);
  }
  create(t, n, o = {}) {
    return o = en.makeRoute(`${t}`, o), this.client.post("", n, o);
  }
  update(t, n, o, r = {}) {
    return r = en.makeRoute(`${t}/${n}`, r), this.client.put("", o, r);
  }
  delete(t, n, o = {}) {
    return o = en.makeRoute(`${t}/${n}`, o), this.client.delete(t, o);
  }
};
wn = new WeakMap();
let er = en;
const Oc = "/api/", Sc = "epic_participant_updater", ni = nc("settings", () => {
  const e = new er(Oc, Sc), t = async () => (await e.read("settings")).data, n = async () => await e.create("regenerate_token"), o = xe({}), r = xe({}), s = xe([]), i = xe("");
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
}), Mh = nc("logs", () => {
  const e = new er(Oc, Sc), t = (O, V = 1) => {
    const I = parseInt(O, 10);
    return Number.isNaN(I) || I < 1 ? V : I;
  }, n = xe([]), o = xe({}), r = xe(!1), s = xe(), i = xe(1), a = xe(25), l = xe(""), u = xe(0), f = _e(() => {
    var V;
    const O = parseInt(((V = o.value) == null ? void 0 : V.total) ?? 0, 10);
    return Number.isNaN(O) || O < 0 ? 0 : O;
  }), c = _e(() => {
    const O = t(a.value, 25);
    return Math.max(1, Math.ceil(f.value / O));
  }), p = async (O = 1, V = a.value, I = l.value) => {
    const K = {
      _page: O,
      _per_page: V
    };
    return I && (K.q = I), (await e.read("logs", { params: K })).data;
  }, m = async (O = 1, V) => {
    const I = u.value + 1;
    u.value = I, r.value = !0;
    const K = t(O, 1), ee = t(V ?? a.value, 25);
    try {
      const se = await p(K, ee, l.value);
      if (I !== u.value)
        return;
      n.value = [...(se == null ? void 0 : se.data) ?? []], o.value = (se == null ? void 0 : se.metadata) ?? {}, s.value = void 0;
    } catch (se) {
      if (I !== u.value)
        return;
      s.value = se;
    } finally {
      I === u.value && (r.value = !1);
    }
  }, _ = () => m(i.value, a.value), N = () => {
    r.value !== !0 && i.value !== c.value && (i.value = i.value + 1);
  }, R = () => {
    r.value !== !0 && (i.value <= 1 || (i.value = i.value - 1));
  };
  return tt([i, a], () => {
    m(i.value, a.value);
  }, { immediate: !0 }), tt(l, () => {
    if (i.value === 1) {
      m(i.value, a.value);
      return;
    }
    i.value = 1;
  }), {
    getList: p,
    goToNextPage: N,
    goToPrevPage: R,
    refresh: _,
    error: s,
    loading: r,
    page: i,
    perPage: a,
    query: l,
    total: f,
    totalPages: c,
    logs: n,
    metadata: o
  };
}), Fh = {
  key: 0,
  class: "d-flex gap-2 align-items-center p-2"
}, Uh = /* @__PURE__ */ E("i", { class: "fas fa-spinner fa-spin fa-fw" }, null, -1), Hh = /* @__PURE__ */ E("span", null, "Loading...", -1), Bh = [
  Uh,
  Hh
], qh = {
  __name: "App",
  setup(e) {
    const t = ni(), n = xe(!1);
    return xe(), vl(async () => {
      n.value = !0, await t.init(), n.value = !1;
    }), (o, r) => {
      const s = js("router-view");
      return n.value ? (fe(), ge("div", Fh, Bh)) : (fe(), ur(s, { key: 1 }));
    };
  }
};
var X = {};
const vt = typeof window < "u";
function Wh(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const ae = Object.assign;
function jr(e, t) {
  const n = {};
  for (const o in t) {
    const r = t[o];
    n[o] = We(r) ? r.map(e) : e(r);
  }
  return n;
}
const qn = () => {
}, We = Array.isArray;
function re(e) {
  const t = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + e].concat(t));
}
const Kh = /\/$/, zh = (e) => e.replace(Kh, "");
function Lr(e, t, n = "/") {
  let o, r = {}, s = "", i = "";
  const a = t.indexOf("#");
  let l = t.indexOf("?");
  return a < l && a >= 0 && (l = -1), l > -1 && (o = t.slice(0, l), s = t.slice(l + 1, a > -1 ? a : t.length), r = e(s)), a > -1 && (o = o || t.slice(0, a), i = t.slice(a, t.length)), o = Yh(o ?? t, n), {
    fullPath: o + (s && "?") + s + i,
    path: o,
    query: r,
    hash: i
  };
}
function Gh(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function ca(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function ua(e, t, n) {
  const o = t.matched.length - 1, r = n.matched.length - 1;
  return o > -1 && o === r && Wt(t.matched[o], n.matched[r]) && xc(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function Wt(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function xc(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (!Jh(e[n], t[n]))
      return !1;
  return !0;
}
function Jh(e, t) {
  return We(e) ? fa(e, t) : We(t) ? fa(t, e) : e === t;
}
function fa(e, t) {
  return We(t) ? e.length === t.length && e.every((n, o) => n === t[o]) : e.length === 1 && e[0] === t;
}
function Yh(e, t) {
  if (e.startsWith("/"))
    return e;
  if (X.NODE_ENV !== "production" && !t.startsWith("/"))
    return re(`Cannot resolve a relative location without an absolute path. Trying to resolve "${e}" from "${t}". It should look like "/${t}".`), e;
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
var Zn;
(function(e) {
  e.pop = "pop", e.push = "push";
})(Zn || (Zn = {}));
var Wn;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(Wn || (Wn = {}));
function Xh(e) {
  if (!e)
    if (vt) {
      const t = document.querySelector("base");
      e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
    } else
      e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), zh(e);
}
const Qh = /^[^#]+#/;
function Zh(e, t) {
  return e.replace(Qh, "#") + t;
}
function em(e, t) {
  const n = document.documentElement.getBoundingClientRect(), o = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: o.left - n.left - (t.left || 0),
    top: o.top - n.top - (t.top || 0)
  };
}
const vr = () => ({
  left: window.pageXOffset,
  top: window.pageYOffset
});
function tm(e) {
  let t;
  if ("el" in e) {
    const n = e.el, o = typeof n == "string" && n.startsWith("#");
    if (X.NODE_ENV !== "production" && typeof e.el == "string" && (!o || !document.getElementById(e.el.slice(1))))
      try {
        const s = document.querySelector(e.el);
        if (o && s) {
          re(`The selector "${e.el}" should be passed as "el: document.querySelector('${e.el}')" because it starts with "#".`);
          return;
        }
      } catch {
        re(`The selector "${e.el}" is invalid. If you are using an id selector, make sure to escape it. You can find more information about escaping characters in selectors at https://mathiasbynens.be/notes/css-escapes or use CSS.escape (https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape).`);
        return;
      }
    const r = typeof n == "string" ? o ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
    if (!r) {
      X.NODE_ENV !== "production" && re(`Couldn't find element using selector "${e.el}" returned by scrollBehavior.`);
      return;
    }
    t = em(r, e);
  } else
    t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.pageXOffset, t.top != null ? t.top : window.pageYOffset);
}
function da(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const hs = /* @__PURE__ */ new Map();
function nm(e, t) {
  hs.set(e, t);
}
function om(e) {
  const t = hs.get(e);
  return hs.delete(e), t;
}
let rm = () => location.protocol + "//" + location.host;
function Rc(e, t) {
  const { pathname: n, search: o, hash: r } = t, s = e.indexOf("#");
  if (s > -1) {
    let a = r.includes(e.slice(s)) ? e.slice(s).length : 1, l = r.slice(a);
    return l[0] !== "/" && (l = "/" + l), ca(l, "");
  }
  return ca(n, e) + o + r;
}
function sm(e, t, n, o) {
  let r = [], s = [], i = null;
  const a = ({ state: p }) => {
    const m = Rc(e, location), _ = n.value, N = t.value;
    let R = 0;
    if (p) {
      if (n.value = m, t.value = p, i && i === _) {
        i = null;
        return;
      }
      R = N ? p.position - N.position : 0;
    } else
      o(m);
    r.forEach((O) => {
      O(n.value, _, {
        delta: R,
        type: Zn.pop,
        direction: R ? R > 0 ? Wn.forward : Wn.back : Wn.unknown
      });
    });
  };
  function l() {
    i = n.value;
  }
  function u(p) {
    r.push(p);
    const m = () => {
      const _ = r.indexOf(p);
      _ > -1 && r.splice(_, 1);
    };
    return s.push(m), m;
  }
  function f() {
    const { history: p } = window;
    p.state && p.replaceState(ae({}, p.state, { scroll: vr() }), "");
  }
  function c() {
    for (const p of s)
      p();
    s = [], window.removeEventListener("popstate", a), window.removeEventListener("beforeunload", f);
  }
  return window.addEventListener("popstate", a), window.addEventListener("beforeunload", f, {
    passive: !0
  }), {
    pauseListeners: l,
    listen: u,
    destroy: c
  };
}
function pa(e, t, n, o = !1, r = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: o,
    position: window.history.length,
    scroll: r ? vr() : null
  };
}
function im(e) {
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
  function s(l, u, f) {
    const c = e.indexOf("#"), p = c > -1 ? (n.host && document.querySelector("base") ? e : e.slice(c)) + l : rm() + e + l;
    try {
      t[f ? "replaceState" : "pushState"](u, "", p), r.value = u;
    } catch (m) {
      X.NODE_ENV !== "production" ? re("Error with push/replace State", m) : console.error(m), n[f ? "replace" : "assign"](p);
    }
  }
  function i(l, u) {
    const f = ae({}, t.state, pa(
      r.value.back,
      // keep back and forward entries but override current position
      l,
      r.value.forward,
      !0
    ), u, { position: r.value.position });
    s(l, f, !0), o.value = l;
  }
  function a(l, u) {
    const f = ae(
      {},
      // use current history state to gracefully handle a wrong call to
      // history.replaceState
      // https://github.com/vuejs/router/issues/366
      r.value,
      t.state,
      {
        forward: l,
        scroll: vr()
      }
    );
    X.NODE_ENV !== "production" && !t.state && re(`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:

history.replaceState(history.state, '', url)

You can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state.`), s(f.current, f, !0);
    const c = ae({}, pa(o.value, l, null), { position: f.position + 1 }, u);
    s(l, c, !1), o.value = l;
  }
  return {
    location: o,
    state: r,
    push: a,
    replace: i
  };
}
function am(e) {
  e = Xh(e);
  const t = im(e), n = sm(e, t.state, t.location, t.replace);
  function o(s, i = !0) {
    i || n.pauseListeners(), history.go(s);
  }
  const r = ae({
    // it's overridden right after
    location: "",
    base: e,
    go: o,
    createHref: Zh.bind(null, e)
  }, t, n);
  return Object.defineProperty(r, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(r, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), r;
}
function lm(e) {
  return e = location.host ? e || location.pathname + location.search : "", e.includes("#") || (e += "#"), X.NODE_ENV !== "production" && !e.endsWith("#/") && !e.endsWith("#") && re(`A hash base must end with a "#":
"${e}" should be "${e.replace(/#.*$/, "#")}".`), am(e);
}
function cm(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function Pc(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const Tt = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
}, ms = Symbol(X.NODE_ENV !== "production" ? "navigation failure" : "");
var ha;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})(ha || (ha = {}));
const um = {
  1({ location: e, currentLocation: t }) {
    return `No match for
 ${JSON.stringify(e)}${t ? `
while being at
` + JSON.stringify(t) : ""}`;
  },
  2({ from: e, to: t }) {
    return `Redirected from "${e.fullPath}" to "${dm(t)}" via a navigation guard.`;
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
  return X.NODE_ENV !== "production" ? ae(new Error(um[e](t)), {
    type: e,
    [ms]: !0
  }, t) : ae(new Error(), {
    type: e,
    [ms]: !0
  }, t);
}
function _t(e, t) {
  return e instanceof Error && ms in e && (t == null || !!(e.type & t));
}
const fm = ["params", "query", "hash"];
function dm(e) {
  if (typeof e == "string")
    return e;
  if ("path" in e)
    return e.path;
  const t = {};
  for (const n of fm)
    n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
const ma = "[^/]+?", pm = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
}, hm = /[.+*?^${}()[\]/\\]/g;
function mm(e, t) {
  const n = ae({}, pm, t), o = [];
  let r = n.start ? "^" : "";
  const s = [];
  for (const u of e) {
    const f = u.length ? [] : [
      90
      /* PathScore.Root */
    ];
    n.strict && !u.length && (r += "/");
    for (let c = 0; c < u.length; c++) {
      const p = u[c];
      let m = 40 + (n.sensitive ? 0.25 : 0);
      if (p.type === 0)
        c || (r += "/"), r += p.value.replace(hm, "\\$&"), m += 40;
      else if (p.type === 1) {
        const { value: _, repeatable: N, optional: R, regexp: O } = p;
        s.push({
          name: _,
          repeatable: N,
          optional: R
        });
        const V = O || ma;
        if (V !== ma) {
          m += 10;
          try {
            new RegExp(`(${V})`);
          } catch (K) {
            throw new Error(`Invalid custom RegExp for param "${_}" (${V}): ` + K.message);
          }
        }
        let I = N ? `((?:${V})(?:/(?:${V}))*)` : `(${V})`;
        c || (I = // avoid an optional / if there are more segments e.g. /:p?-static
        // or /:p?-:p2
        R && u.length < 2 ? `(?:/${I})` : "/" + I), R && (I += "?"), r += I, m += 20, R && (m += -8), N && (m += -20), V === ".*" && (m += -50);
      }
      f.push(m);
    }
    o.push(f);
  }
  if (n.strict && n.end) {
    const u = o.length - 1;
    o[u][o[u].length - 1] += 0.7000000000000001;
  }
  n.strict || (r += "/?"), n.end ? r += "$" : n.strict && (r += "(?:/|$)");
  const i = new RegExp(r, n.sensitive ? "" : "i");
  function a(u) {
    const f = u.match(i), c = {};
    if (!f)
      return null;
    for (let p = 1; p < f.length; p++) {
      const m = f[p] || "", _ = s[p - 1];
      c[_.name] = m && _.repeatable ? m.split("/") : m;
    }
    return c;
  }
  function l(u) {
    let f = "", c = !1;
    for (const p of e) {
      (!c || !f.endsWith("/")) && (f += "/"), c = !1;
      for (const m of p)
        if (m.type === 0)
          f += m.value;
        else if (m.type === 1) {
          const { value: _, repeatable: N, optional: R } = m, O = _ in u ? u[_] : "";
          if (We(O) && !N)
            throw new Error(`Provided param "${_}" is an array but it is not repeatable (* or + modifiers)`);
          const V = We(O) ? O.join("/") : O;
          if (!V)
            if (R)
              p.length < 2 && (f.endsWith("/") ? f = f.slice(0, -1) : c = !0);
            else
              throw new Error(`Missing required param "${_}"`);
          f += V;
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
function gm(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const o = t[n] - e[n];
    if (o)
      return o;
    n++;
  }
  return e.length < t.length ? e.length === 1 && e[0] === 80 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 80 ? 1 : -1 : 0;
}
function _m(e, t) {
  let n = 0;
  const o = e.score, r = t.score;
  for (; n < o.length && n < r.length; ) {
    const s = gm(o[n], r[n]);
    if (s)
      return s;
    n++;
  }
  if (Math.abs(r.length - o.length) === 1) {
    if (ga(o))
      return 1;
    if (ga(r))
      return -1;
  }
  return r.length - o.length;
}
function ga(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const ym = {
  type: 0,
  value: ""
}, Em = /[a-zA-Z0-9_]/;
function bm(e) {
  if (!e)
    return [[]];
  if (e === "/")
    return [[ym]];
  if (!e.startsWith("/"))
    throw new Error(X.NODE_ENV !== "production" ? `Route paths should start with a "/": "${e}" should be "/${e}".` : `Invalid path "${e}"`);
  function t(m) {
    throw new Error(`ERR (${n})/"${u}": ${m}`);
  }
  let n = 0, o = n;
  const r = [];
  let s;
  function i() {
    s && r.push(s), s = [];
  }
  let a = 0, l, u = "", f = "";
  function c() {
    u && (n === 0 ? s.push({
      type: 0,
      value: u
    }) : n === 1 || n === 2 || n === 3 ? (s.length > 1 && (l === "*" || l === "+") && t(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`), s.push({
      type: 1,
      value: u,
      regexp: f,
      repeatable: l === "*" || l === "+",
      optional: l === "*" || l === "?"
    })) : t("Invalid state to consume buffer"), u = "");
  }
  function p() {
    u += l;
  }
  for (; a < e.length; ) {
    if (l = e[a++], l === "\\" && n !== 2) {
      o = n, n = 4;
      continue;
    }
    switch (n) {
      case 0:
        l === "/" ? (u && c(), i()) : l === ":" ? (c(), n = 1) : p();
        break;
      case 4:
        p(), n = o;
        break;
      case 1:
        l === "(" ? n = 2 : Em.test(l) ? p() : (c(), n = 0, l !== "*" && l !== "?" && l !== "+" && a--);
        break;
      case 2:
        l === ")" ? f[f.length - 1] == "\\" ? f = f.slice(0, -1) + l : n = 3 : f += l;
        break;
      case 3:
        c(), n = 0, l !== "*" && l !== "?" && l !== "+" && a--, f = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${u}"`), c(), i(), r;
}
function vm(e, t, n) {
  const o = mm(bm(e.path), n);
  if (X.NODE_ENV !== "production") {
    const s = /* @__PURE__ */ new Set();
    for (const i of o.keys)
      s.has(i.name) && re(`Found duplicated params with name "${i.name}" for path "${e.path}". Only the last one will be available on "$route.params".`), s.add(i.name);
  }
  const r = ae(o, {
    record: e,
    parent: t,
    // these needs to be populated by the parent
    children: [],
    alias: []
  });
  return t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r;
}
function Nm(e, t) {
  const n = [], o = /* @__PURE__ */ new Map();
  t = Ea({ strict: !1, end: !0, sensitive: !1 }, t);
  function r(f) {
    return o.get(f);
  }
  function s(f, c, p) {
    const m = !p, _ = wm(f);
    X.NODE_ENV !== "production" && Rm(_, c), _.aliasOf = p && p.record;
    const N = Ea(t, f), R = [
      _
    ];
    if ("alias" in f) {
      const I = typeof f.alias == "string" ? [f.alias] : f.alias;
      for (const K of I)
        R.push(ae({}, _, {
          // this allows us to hold a copy of the `components` option
          // so that async components cache is hold on the original record
          components: p ? p.record.components : _.components,
          path: K,
          // we might be the child of an alias
          aliasOf: p ? p.record : _
          // the aliases are always of the same kind as the original since they
          // are defined on the same record
        }));
    }
    let O, V;
    for (const I of R) {
      const { path: K } = I;
      if (c && K[0] !== "/") {
        const ee = c.record.path, se = ee[ee.length - 1] === "/" ? "" : "/";
        I.path = c.record.path + (K && se + K);
      }
      if (X.NODE_ENV !== "production" && I.path === "*")
        throw new Error(`Catch all routes ("*") must now be defined using a param with a custom regexp.
See more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.`);
      if (O = vm(I, c, N), X.NODE_ENV !== "production" && c && K[0] === "/" && Pm(O, c), p ? (p.alias.push(O), X.NODE_ENV !== "production" && xm(p, O)) : (V = V || O, V !== O && V.alias.push(O), m && f.name && !ya(O) && i(f.name)), _.children) {
        const ee = _.children;
        for (let se = 0; se < ee.length; se++)
          s(ee[se], O, p && p.children[se]);
      }
      p = p || O, (O.record.components && Object.keys(O.record.components).length || O.record.name || O.record.redirect) && l(O);
    }
    return V ? () => {
      i(V);
    } : qn;
  }
  function i(f) {
    if (Pc(f)) {
      const c = o.get(f);
      c && (o.delete(f), n.splice(n.indexOf(c), 1), c.children.forEach(i), c.alias.forEach(i));
    } else {
      const c = n.indexOf(f);
      c > -1 && (n.splice(c, 1), f.record.name && o.delete(f.record.name), f.children.forEach(i), f.alias.forEach(i));
    }
  }
  function a() {
    return n;
  }
  function l(f) {
    let c = 0;
    for (; c < n.length && _m(f, n[c]) >= 0 && // Adding children with empty path should still appear before the parent
    // https://github.com/vuejs/router/issues/1124
    (f.record.path !== n[c].record.path || !Cc(f, n[c])); )
      c++;
    n.splice(c, 0, f), f.record.name && !ya(f) && o.set(f.record.name, f);
  }
  function u(f, c) {
    let p, m = {}, _, N;
    if ("name" in f && f.name) {
      if (p = o.get(f.name), !p)
        throw Rn(1, {
          location: f
        });
      if (X.NODE_ENV !== "production") {
        const V = Object.keys(f.params || {}).filter((I) => !p.keys.find((K) => K.name === I));
        V.length && re(`Discarded invalid param(s) "${V.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
      }
      N = p.record.name, m = ae(
        // paramsFromLocation is a new object
        _a(
          c.params,
          // only keep params that exist in the resolved location
          // TODO: only keep optional params coming from a parent record
          p.keys.filter((V) => !V.optional).map((V) => V.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        f.params && _a(f.params, p.keys.map((V) => V.name))
      ), _ = p.stringify(m);
    } else if ("path" in f)
      _ = f.path, X.NODE_ENV !== "production" && !_.startsWith("/") && re(`The Matcher cannot resolve relative paths but received "${_}". Unless you directly called \`matcher.resolve("${_}")\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.`), p = n.find((V) => V.re.test(_)), p && (m = p.parse(_), N = p.record.name);
    else {
      if (p = c.name ? o.get(c.name) : n.find((V) => V.re.test(c.path)), !p)
        throw Rn(1, {
          location: f,
          currentLocation: c
        });
      N = p.record.name, m = ae({}, c.params, f.params), _ = p.stringify(m);
    }
    const R = [];
    let O = p;
    for (; O; )
      R.unshift(O.record), O = O.parent;
    return {
      name: N,
      path: _,
      params: m,
      matched: R,
      meta: Sm(R)
    };
  }
  return e.forEach((f) => s(f)), { addRoute: s, resolve: u, removeRoute: i, getRoutes: a, getRecordMatcher: r };
}
function _a(e, t) {
  const n = {};
  for (const o of t)
    o in e && (n[o] = e[o]);
  return n;
}
function wm(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: Om(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
}
function Om(e) {
  const t = {}, n = e.props || !1;
  if ("component" in e)
    t.default = n;
  else
    for (const o in e.components)
      t[o] = typeof n == "object" ? n[o] : n;
  return t;
}
function ya(e) {
  for (; e; ) {
    if (e.record.aliasOf)
      return !0;
    e = e.parent;
  }
  return !1;
}
function Sm(e) {
  return e.reduce((t, n) => ae(t, n.meta), {});
}
function Ea(e, t) {
  const n = {};
  for (const o in e)
    n[o] = o in t ? t[o] : e[o];
  return n;
}
function gs(e, t) {
  return e.name === t.name && e.optional === t.optional && e.repeatable === t.repeatable;
}
function xm(e, t) {
  for (const n of e.keys)
    if (!n.optional && !t.keys.find(gs.bind(null, n)))
      return re(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
  for (const n of t.keys)
    if (!n.optional && !e.keys.find(gs.bind(null, n)))
      return re(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
}
function Rm(e, t) {
  t && t.record.name && !e.name && !e.path && re(`The route named "${String(t.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
}
function Pm(e, t) {
  for (const n of t.keys)
    if (!e.keys.find(gs.bind(null, n)))
      return re(`Absolute path "${e.record.path}" must have the exact same param named "${n.name}" as its parent "${t.record.path}".`);
}
function Cc(e, t) {
  return t.children.some((n) => n === e || Cc(e, n));
}
const Dc = /#/g, Cm = /&/g, Dm = /\//g, $m = /=/g, Tm = /\?/g, $c = /\+/g, Vm = /%5B/g, Am = /%5D/g, Tc = /%5E/g, Im = /%60/g, Vc = /%7B/g, km = /%7C/g, Ac = /%7D/g, jm = /%20/g;
function oi(e) {
  return encodeURI("" + e).replace(km, "|").replace(Vm, "[").replace(Am, "]");
}
function Lm(e) {
  return oi(e).replace(Vc, "{").replace(Ac, "}").replace(Tc, "^");
}
function _s(e) {
  return oi(e).replace($c, "%2B").replace(jm, "+").replace(Dc, "%23").replace(Cm, "%26").replace(Im, "`").replace(Vc, "{").replace(Ac, "}").replace(Tc, "^");
}
function Mm(e) {
  return _s(e).replace($m, "%3D");
}
function Fm(e) {
  return oi(e).replace(Dc, "%23").replace(Tm, "%3F");
}
function Um(e) {
  return e == null ? "" : Fm(e).replace(Dm, "%2F");
}
function eo(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {
    X.NODE_ENV !== "production" && re(`Error decoding "${e}". Using original value`);
  }
  return "" + e;
}
function Hm(e) {
  const t = {};
  if (e === "" || e === "?")
    return t;
  const o = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let r = 0; r < o.length; ++r) {
    const s = o[r].replace($c, " "), i = s.indexOf("="), a = eo(i < 0 ? s : s.slice(0, i)), l = i < 0 ? null : eo(s.slice(i + 1));
    if (a in t) {
      let u = t[a];
      We(u) || (u = t[a] = [u]), u.push(l);
    } else
      t[a] = l;
  }
  return t;
}
function ba(e) {
  let t = "";
  for (let n in e) {
    const o = e[n];
    if (n = Mm(n), o == null) {
      o !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (We(o) ? o.map((s) => s && _s(s)) : [o && _s(o)]).forEach((s) => {
      s !== void 0 && (t += (t.length ? "&" : "") + n, s != null && (t += "=" + s));
    });
  }
  return t;
}
function Bm(e) {
  const t = {};
  for (const n in e) {
    const o = e[n];
    o !== void 0 && (t[n] = We(o) ? o.map((r) => r == null ? null : "" + r) : o == null ? o : "" + o);
  }
  return t;
}
const qm = Symbol(X.NODE_ENV !== "production" ? "router view location matched" : ""), va = Symbol(X.NODE_ENV !== "production" ? "router view depth" : ""), ri = Symbol(X.NODE_ENV !== "production" ? "router" : ""), Ic = Symbol(X.NODE_ENV !== "production" ? "route location" : ""), ys = Symbol(X.NODE_ENV !== "production" ? "router view location" : "");
function In() {
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
function kt(e, t, n, o, r) {
  const s = o && // name is defined if record is because of the function overload
  (o.enterCallbacks[r] = o.enterCallbacks[r] || []);
  return () => new Promise((i, a) => {
    const l = (c) => {
      c === !1 ? a(Rn(4, {
        from: n,
        to: t
      })) : c instanceof Error ? a(c) : cm(c) ? a(Rn(2, {
        from: t,
        to: c
      })) : (s && // since enterCallbackArray is truthy, both record and name also are
      o.enterCallbacks[r] === s && typeof c == "function" && s.push(c), i());
    }, u = e.call(o && o.instances[r], t, n, X.NODE_ENV !== "production" ? Wm(l, t, n) : l);
    let f = Promise.resolve(u);
    if (e.length < 3 && (f = f.then(l)), X.NODE_ENV !== "production" && e.length > 2) {
      const c = `The "next" callback was never called inside of ${e.name ? '"' + e.name + '"' : ""}:
${e.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof u == "object" && "then" in u)
        f = f.then((p) => l._called ? p : (re(c), Promise.reject(new Error("Invalid navigation guard"))));
      else if (u !== void 0 && !l._called) {
        re(c), a(new Error("Invalid navigation guard"));
        return;
      }
    }
    f.catch((c) => a(c));
  });
}
function Wm(e, t, n) {
  let o = 0;
  return function() {
    o++ === 1 && re(`The "next" callback was called more than once in one navigation guard when going from "${n.fullPath}" to "${t.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`), e._called = !0, o === 1 && e.apply(null, arguments);
  };
}
function Mr(e, t, n, o) {
  const r = [];
  for (const s of e) {
    X.NODE_ENV !== "production" && !s.components && !s.children.length && re(`Record with path "${s.path}" is either missing a "component(s)" or "children" property.`);
    for (const i in s.components) {
      let a = s.components[i];
      if (X.NODE_ENV !== "production") {
        if (!a || typeof a != "object" && typeof a != "function")
          throw re(`Component "${i}" in record with path "${s.path}" is not a valid component. Received "${String(a)}".`), new Error("Invalid route component");
        if ("then" in a) {
          re(`Component "${i}" in record with path "${s.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
          const l = a;
          a = () => l;
        } else
          a.__asyncLoader && // warn only once per component
          !a.__warnedDefineAsync && (a.__warnedDefineAsync = !0, re(`Component "${i}" in record with path "${s.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`));
      }
      if (!(t !== "beforeRouteEnter" && !s.instances[i]))
        if (Km(a)) {
          const u = (a.__vccOpts || a)[t];
          u && r.push(kt(u, n, o, s, i));
        } else {
          let l = a();
          X.NODE_ENV !== "production" && !("catch" in l) && (re(`Component "${i}" in record with path "${s.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`), l = Promise.resolve(l)), r.push(() => l.then((u) => {
            if (!u)
              return Promise.reject(new Error(`Couldn't resolve component "${i}" at "${s.path}"`));
            const f = Wh(u) ? u.default : u;
            s.components[i] = f;
            const p = (f.__vccOpts || f)[t];
            return p && kt(p, n, o, s, i)();
          }));
        }
    }
  }
  return r;
}
function Km(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function Es(e) {
  const t = dt(ri), n = dt(Ic), o = _e(() => t.resolve(ue(e.to))), r = _e(() => {
    const { matched: l } = o.value, { length: u } = l, f = l[u - 1], c = n.matched;
    if (!f || !c.length)
      return -1;
    const p = c.findIndex(Wt.bind(null, f));
    if (p > -1)
      return p;
    const m = Na(l[u - 2]);
    return (
      // we are dealing with nested routes
      u > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      Na(f) === m && // avoid comparing the child with its parent
      c[c.length - 1].path !== m ? c.findIndex(Wt.bind(null, l[u - 2])) : p
    );
  }), s = _e(() => r.value > -1 && Jm(n.params, o.value.params)), i = _e(() => r.value > -1 && r.value === n.matched.length - 1 && xc(n.params, o.value.params));
  function a(l = {}) {
    return Gm(l) ? t[ue(e.replace) ? "replace" : "push"](
      ue(e.to)
      // avoid uncaught errors are they are logged anyway
    ).catch(qn) : Promise.resolve();
  }
  if (X.NODE_ENV !== "production" && vt) {
    const l = Ws();
    if (l) {
      const u = {
        route: o.value,
        isActive: s.value,
        isExactActive: i.value
      };
      l.__vrl_devtools = l.__vrl_devtools || [], l.__vrl_devtools.push(u), pf(() => {
        u.route = o.value, u.isActive = s.value, u.isExactActive = i.value;
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
const zm = /* @__PURE__ */ El({
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
  useLink: Es,
  setup(e, { slots: t }) {
    const n = no(Es(e)), { options: o } = dt(ri), r = _e(() => ({
      [wa(e.activeClass, o.linkActiveClass, "router-link-active")]: n.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [wa(e.exactActiveClass, o.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
    }));
    return () => {
      const s = t.default && t.default(n);
      return e.custom ? s : Hl("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: n.navigate,
        class: r.value
      }, s);
    };
  }
}), si = zm;
function Gm(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t))
        return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function Jm(e, t) {
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
function Na(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const wa = (e, t, n) => e ?? t ?? n, Ym = /* @__PURE__ */ El({
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
    X.NODE_ENV !== "production" && Qm();
    const o = dt(ys), r = _e(() => e.route || o.value), s = dt(va, 0), i = _e(() => {
      let u = ue(s);
      const { matched: f } = r.value;
      let c;
      for (; (c = f[u]) && !c.components; )
        u++;
      return u;
    }), a = _e(() => r.value.matched[i.value]);
    Do(va, _e(() => i.value + 1)), Do(qm, a), Do(ys, r);
    const l = xe();
    return tt(() => [l.value, a.value, e.name], ([u, f, c], [p, m, _]) => {
      f && (f.instances[c] = u, m && m !== f && u && u === p && (f.leaveGuards.size || (f.leaveGuards = m.leaveGuards), f.updateGuards.size || (f.updateGuards = m.updateGuards))), u && f && // if there is no instance but to and from are the same this might be
      // the first visit
      (!m || !Wt(f, m) || !p) && (f.enterCallbacks[c] || []).forEach((N) => N(u));
    }, { flush: "post" }), () => {
      const u = r.value, f = e.name, c = a.value, p = c && c.components[f];
      if (!p)
        return Oa(n.default, { Component: p, route: u });
      const m = c.props[f], _ = m ? m === !0 ? u.params : typeof m == "function" ? m(u) : m : null, R = Hl(p, ae({}, _, t, {
        onVnodeUnmounted: (O) => {
          O.component.isUnmounted && (c.instances[f] = null);
        },
        ref: l
      }));
      if (X.NODE_ENV !== "production" && vt && R.ref) {
        const O = {
          depth: i.value,
          name: c.name,
          path: c.path,
          meta: c.meta
        };
        (We(R.ref) ? R.ref.map((I) => I.i) : [R.ref.i]).forEach((I) => {
          I.__vrv_devtools = O;
        });
      }
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        Oa(n.default, { Component: R, route: u }) || R
      );
    };
  }
});
function Oa(e, t) {
  if (!e)
    return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const Xm = Ym;
function Qm() {
  const e = Ws(), t = e.parent && e.parent.type.name, n = e.parent && e.parent.subTree && e.parent.subTree.type;
  if (t && (t === "KeepAlive" || t.includes("Transition")) && typeof n == "object" && n.name === "RouterView") {
    const o = t === "KeepAlive" ? "keep-alive" : "transition";
    re(`<router-view> can no longer be used directly inside <transition> or <keep-alive>.
Use slot props instead:

<router-view v-slot="{ Component }">
  <${o}>
    <component :is="Component" />
  </${o}>
</router-view>`);
  }
}
function kn(e, t) {
  const n = ae({}, e, {
    // remove variables that can contain vue instances
    matched: e.matched.map((o) => ag(o, ["instances", "children", "aliasOf"]))
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
function No(e) {
  return {
    _custom: {
      display: e
    }
  };
}
let Zm = 0;
function eg(e, t, n) {
  if (t.__hasDevtools)
    return;
  t.__hasDevtools = !0;
  const o = Zm++;
  zs({
    id: "org.vuejs.router" + (o ? "." + o : ""),
    label: "Vue Router",
    packageName: "vue-router",
    homepage: "https://router.vuejs.org",
    logo: "https://router.vuejs.org/logo.png",
    componentStateTypes: ["Routing"],
    app: e
  }, (r) => {
    typeof r.now != "function" && console.warn("[Vue Router]: You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), r.on.inspectComponent((f, c) => {
      f.instanceData && f.instanceData.state.push({
        type: "Routing",
        key: "$route",
        editable: !1,
        value: kn(t.currentRoute.value, "Current Route")
      });
    }), r.on.visitComponentTree(({ treeNode: f, componentInstance: c }) => {
      if (c.__vrv_devtools) {
        const p = c.__vrv_devtools;
        f.tags.push({
          label: (p.name ? `${p.name.toString()}: ` : "") + p.path,
          textColor: 0,
          tooltip: "This component is rendered by &lt;router-view&gt;",
          backgroundColor: kc
        });
      }
      We(c.__vrl_devtools) && (c.__devtoolsApi = r, c.__vrl_devtools.forEach((p) => {
        let m = Mc, _ = "";
        p.isExactActive ? (m = Lc, _ = "This is exactly active") : p.isActive && (m = jc, _ = "This link is active"), f.tags.push({
          label: p.route.path,
          textColor: 0,
          tooltip: _,
          backgroundColor: m
        });
      }));
    }), tt(t.currentRoute, () => {
      l(), r.notifyComponentUpdate(), r.sendInspectorTree(a), r.sendInspectorState(a);
    });
    const s = "router:navigations:" + o;
    r.addTimelineLayer({
      id: s,
      label: `Router${o ? " " + o : ""} Navigations`,
      color: 4237508
    }), t.onError((f, c) => {
      r.addTimelineEvent({
        layerId: s,
        event: {
          title: "Error during Navigation",
          subtitle: c.fullPath,
          logType: "error",
          time: r.now(),
          data: { error: f },
          groupId: c.meta.__navigationId
        }
      });
    });
    let i = 0;
    t.beforeEach((f, c) => {
      const p = {
        guard: No("beforeEach"),
        from: kn(c, "Current Location during this navigation"),
        to: kn(f, "Target location")
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
    }), t.afterEach((f, c, p) => {
      const m = {
        guard: No("afterEach")
      };
      p ? (m.failure = {
        _custom: {
          type: Error,
          readOnly: !0,
          display: p ? p.message : "",
          tooltip: "Navigation Failure",
          value: p
        }
      }, m.status = No("❌")) : m.status = No("✅"), m.from = kn(c, "Current Location during this navigation"), m.to = kn(f, "Target location"), r.addTimelineEvent({
        layerId: s,
        event: {
          title: "End of navigation",
          subtitle: f.fullPath,
          time: r.now(),
          data: m,
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
      if (!u)
        return;
      const f = u;
      let c = n.getRoutes().filter((p) => !p.parent || // these routes have a parent with no component which will not appear in the view
      // therefore we still need to include them
      !p.parent.record.components);
      c.forEach(Hc), f.filter && (c = c.filter((p) => (
        // save matches state based on the payload
        bs(p, f.filter.toLowerCase())
      ))), c.forEach((p) => Uc(p, t.currentRoute.value)), f.rootNodes = c.map(Fc);
    }
    let u;
    r.on.getInspectorTree((f) => {
      u = f, f.app === e && f.inspectorId === a && l();
    }), r.on.getInspectorState((f) => {
      if (f.app === e && f.inspectorId === a) {
        const p = n.getRoutes().find((m) => m.record.__vd_id === f.nodeId);
        p && (f.state = {
          options: ng(p)
        });
      }
    }), r.sendInspectorTree(a), r.sendInspectorState(a);
  });
}
function tg(e) {
  return e.optional ? e.repeatable ? "*" : "?" : e.repeatable ? "+" : "";
}
function ng(e) {
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
        display: e.keys.map((o) => `${o.name}${tg(o)}`).join(" "),
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
const kc = 15485081, jc = 2450411, Lc = 8702998, og = 2282478, Mc = 16486972, rg = 6710886;
function Fc(e) {
  const t = [], { record: n } = e;
  n.name != null && t.push({
    label: String(n.name),
    textColor: 0,
    backgroundColor: og
  }), n.aliasOf && t.push({
    label: "alias",
    textColor: 0,
    backgroundColor: Mc
  }), e.__vd_match && t.push({
    label: "matches",
    textColor: 0,
    backgroundColor: kc
  }), e.__vd_exactActive && t.push({
    label: "exact",
    textColor: 0,
    backgroundColor: Lc
  }), e.__vd_active && t.push({
    label: "active",
    textColor: 0,
    backgroundColor: jc
  }), n.redirect && t.push({
    label: typeof n.redirect == "string" ? `redirect: ${n.redirect}` : "redirects",
    textColor: 16777215,
    backgroundColor: rg
  });
  let o = n.__vd_id;
  return o == null && (o = String(sg++), n.__vd_id = o), {
    id: o,
    label: n.path,
    tags: t,
    children: e.children.map(Fc)
  };
}
let sg = 0;
const ig = /^\/(.*)\/([a-z]*)$/;
function Uc(e, t) {
  const n = t.matched.length && Wt(t.matched[t.matched.length - 1], e.record);
  e.__vd_exactActive = e.__vd_active = n, n || (e.__vd_active = t.matched.some((o) => Wt(o, e.record))), e.children.forEach((o) => Uc(o, t));
}
function Hc(e) {
  e.__vd_match = !1, e.children.forEach(Hc);
}
function bs(e, t) {
  const n = String(e.re).match(ig);
  if (e.__vd_match = !1, !n || n.length < 3)
    return !1;
  if (new RegExp(n[1].replace(/\$$/, ""), n[2]).test(t))
    return e.children.forEach((i) => bs(i, t)), e.record.path !== "/" || t === "/" ? (e.__vd_match = e.re.test(t), !0) : !1;
  const r = e.record.path.toLowerCase(), s = eo(r);
  return !t.startsWith("/") && (s.includes(t) || r.includes(t)) || s.startsWith(t) || r.startsWith(t) || e.record.name && String(e.record.name).includes(t) ? !0 : e.children.some((i) => bs(i, t));
}
function ag(e, t) {
  const n = {};
  for (const o in e)
    t.includes(o) || (n[o] = e[o]);
  return n;
}
function lg(e) {
  const t = Nm(e.routes, e), n = e.parseQuery || Hm, o = e.stringifyQuery || ba, r = e.history;
  if (X.NODE_ENV !== "production" && !r)
    throw new Error('Provide the "history" option when calling "createRouter()": https://next.router.vuejs.org/api/#history.');
  const s = In(), i = In(), a = In(), l = Cu(Tt);
  let u = Tt;
  vt && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const f = jr.bind(null, (b) => "" + b), c = jr.bind(null, Um), p = (
    // @ts-expect-error: intentionally avoid the type check
    jr.bind(null, eo)
  );
  function m(b, j) {
    let k, U;
    return Pc(b) ? (k = t.getRecordMatcher(b), U = j) : U = b, t.addRoute(U, k);
  }
  function _(b) {
    const j = t.getRecordMatcher(b);
    j ? t.removeRoute(j) : X.NODE_ENV !== "production" && re(`Cannot remove non-existent route "${String(b)}"`);
  }
  function N() {
    return t.getRoutes().map((b) => b.record);
  }
  function R(b) {
    return !!t.getRecordMatcher(b);
  }
  function O(b, j) {
    if (j = ae({}, j || l.value), typeof b == "string") {
      const d = Lr(n, b, j.path), h = t.resolve({ path: d.path }, j), y = r.createHref(d.fullPath);
      return X.NODE_ENV !== "production" && (y.startsWith("//") ? re(`Location "${b}" resolved to "${y}". A resolved location cannot start with multiple slashes.`) : h.matched.length || re(`No match found for location with path "${b}"`)), ae(d, h, {
        params: p(h.params),
        hash: eo(d.hash),
        redirectedFrom: void 0,
        href: y
      });
    }
    let k;
    if ("path" in b)
      X.NODE_ENV !== "production" && "params" in b && !("name" in b) && // @ts-expect-error: the type is never
      Object.keys(b.params).length && re(`Path "${b.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`), k = ae({}, b, {
        path: Lr(n, b.path, j.path).path
      });
    else {
      const d = ae({}, b.params);
      for (const h in d)
        d[h] == null && delete d[h];
      k = ae({}, b, {
        params: c(d)
      }), j.params = c(j.params);
    }
    const U = t.resolve(k, j), Z = b.hash || "";
    X.NODE_ENV !== "production" && Z && !Z.startsWith("#") && re(`A \`hash\` should always start with the character "#". Replace "${Z}" with "#${Z}".`), U.params = f(p(U.params));
    const Ee = Gh(o, ae({}, b, {
      hash: Lm(Z),
      path: U.path
    })), Q = r.createHref(Ee);
    return X.NODE_ENV !== "production" && (Q.startsWith("//") ? re(`Location "${b}" resolved to "${Q}". A resolved location cannot start with multiple slashes.`) : U.matched.length || re(`No match found for location with path "${"path" in b ? b.path : b}"`)), ae({
      fullPath: Ee,
      // keep the hash encoded so fullPath is effectively path + encodedQuery +
      // hash
      hash: Z,
      query: (
        // if the user is using a custom query lib like qs, we might have
        // nested objects, so we keep the query as is, meaning it can contain
        // numbers at `$route.query`, but at the point, the user will have to
        // use their own type anyway.
        // https://github.com/vuejs/router/issues/328#issuecomment-649481567
        o === ba ? Bm(b.query) : b.query || {}
      )
    }, U, {
      redirectedFrom: void 0,
      href: Q
    });
  }
  function V(b) {
    return typeof b == "string" ? Lr(n, b, l.value.path) : ae({}, b);
  }
  function I(b, j) {
    if (u !== b)
      return Rn(8, {
        from: j,
        to: b
      });
  }
  function K(b) {
    return D(b);
  }
  function ee(b) {
    return K(ae(V(b), { replace: !0 }));
  }
  function se(b) {
    const j = b.matched[b.matched.length - 1];
    if (j && j.redirect) {
      const { redirect: k } = j;
      let U = typeof k == "function" ? k(b) : k;
      if (typeof U == "string" && (U = U.includes("?") || U.includes("#") ? U = V(U) : (
        // force empty params
        { path: U }
      ), U.params = {}), X.NODE_ENV !== "production" && !("path" in U) && !("name" in U))
        throw re(`Invalid redirect found:
${JSON.stringify(U, null, 2)}
 when navigating to "${b.fullPath}". A redirect must contain a name or path. This will break in production.`), new Error("Invalid redirect");
      return ae({
        query: b.query,
        hash: b.hash,
        // avoid transferring params if the redirect has a path
        params: "path" in U ? {} : b.params
      }, U);
    }
  }
  function D(b, j) {
    const k = u = O(b), U = l.value, Z = b.state, Ee = b.force, Q = b.replace === !0, d = se(k);
    if (d)
      return D(
        ae(V(d), {
          state: typeof d == "object" ? ae({}, Z, d.state) : Z,
          force: Ee,
          replace: Q
        }),
        // keep original redirectedFrom if it exists
        j || k
      );
    const h = k;
    h.redirectedFrom = j;
    let y;
    return !Ee && ua(o, U, k) && (y = Rn(16, { to: h, from: U }), Rt(
      U,
      U,
      // this is a push, the only way for it to be triggered from a
      // history.listen is with a redirect, which makes it become a push
      !0,
      // This cannot be the first navigation because the initial location
      // cannot be manually navigated to
      !1
    )), (y ? Promise.resolve(y) : F(h, U)).catch((v) => _t(v) ? (
      // navigation redirects still mark the router as ready
      _t(
        v,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? v : Gt(v)
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
          ua(o, O(v.to), h) && // and we have done it a couple of times
          j && // @ts-expect-error: added only in dev
          (j._count = j._count ? (
            // @ts-expect-error
            j._count + 1
          ) : 1) > 30 ? (re(`Detected a possibly infinite redirection in a navigation guard when going from "${U.fullPath}" to "${h.fullPath}". Aborting to avoid a Stack Overflow.
 Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`), Promise.reject(new Error("Infinite redirect in navigation guard"))) : D(
            // keep options
            ae({
              // preserve an existing replacement but allow the redirect to override it
              replace: Q
            }, V(v.to), {
              state: typeof v.to == "object" ? ae({}, Z, v.to.state) : Z,
              force: Ee
            }),
            // preserve the original redirectedFrom if any
            j || h
          );
      } else
        v = te(h, U, !0, Q, Z);
      return L(h, U, v), v;
    });
  }
  function Te(b, j) {
    const k = I(b, j);
    return k ? Promise.reject(k) : Promise.resolve();
  }
  function he(b) {
    const j = Pt.values().next().value;
    return j && typeof j.runWithContext == "function" ? j.runWithContext(b) : b();
  }
  function F(b, j) {
    let k;
    const [U, Z, Ee] = cg(b, j);
    k = Mr(U.reverse(), "beforeRouteLeave", b, j);
    for (const d of U)
      d.leaveGuards.forEach((h) => {
        k.push(kt(h, b, j));
      });
    const Q = Te.bind(null, b, j);
    return k.push(Q), Ct(k).then(() => {
      k = [];
      for (const d of s.list())
        k.push(kt(d, b, j));
      return k.push(Q), Ct(k);
    }).then(() => {
      k = Mr(Z, "beforeRouteUpdate", b, j);
      for (const d of Z)
        d.updateGuards.forEach((h) => {
          k.push(kt(h, b, j));
        });
      return k.push(Q), Ct(k);
    }).then(() => {
      k = [];
      for (const d of Ee)
        if (d.beforeEnter)
          if (We(d.beforeEnter))
            for (const h of d.beforeEnter)
              k.push(kt(h, b, j));
          else
            k.push(kt(d.beforeEnter, b, j));
      return k.push(Q), Ct(k);
    }).then(() => (b.matched.forEach((d) => d.enterCallbacks = {}), k = Mr(Ee, "beforeRouteEnter", b, j), k.push(Q), Ct(k))).then(() => {
      k = [];
      for (const d of i.list())
        k.push(kt(d, b, j));
      return k.push(Q), Ct(k);
    }).catch((d) => _t(
      d,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? d : Promise.reject(d));
  }
  function L(b, j, k) {
    a.list().forEach((U) => he(() => U(b, j, k)));
  }
  function te(b, j, k, U, Z) {
    const Ee = I(b, j);
    if (Ee)
      return Ee;
    const Q = j === Tt, d = vt ? history.state : {};
    k && (U || Q ? r.replace(b.fullPath, ae({
      scroll: Q && d && d.scroll
    }, Z)) : r.push(b.fullPath, Z)), l.value = b, Rt(b, j, k, Q), Gt();
  }
  let ye;
  function nt() {
    ye || (ye = r.listen((b, j, k) => {
      if (!fo.listening)
        return;
      const U = O(b), Z = se(U);
      if (Z) {
        D(ae(Z, { replace: !0 }), U).catch(qn);
        return;
      }
      u = U;
      const Ee = l.value;
      vt && nm(da(Ee.fullPath, k.delta), vr()), F(U, Ee).catch((Q) => _t(
        Q,
        12
        /* ErrorTypes.NAVIGATION_CANCELLED */
      ) ? Q : _t(
        Q,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? (D(
        Q.to,
        U
        // avoid an uncaught rejection, let push call triggerError
      ).then((d) => {
        _t(
          d,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && !k.delta && k.type === Zn.pop && r.go(-1, !1);
      }).catch(qn), Promise.reject()) : (k.delta && r.go(-k.delta, !1), q(Q, U, Ee))).then((Q) => {
        Q = Q || te(
          // after navigation, all matched components are resolved
          U,
          Ee,
          !1
        ), Q && (k.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
        // entry while a different route is displayed
        !_t(
          Q,
          8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        ) ? r.go(-k.delta, !1) : k.type === Zn.pop && _t(
          Q,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && r.go(-1, !1)), L(U, Ee, Q);
      }).catch(qn);
    }));
  }
  let Ue = In(), $e = In(), J;
  function q(b, j, k) {
    Gt(b);
    const U = $e.list();
    return U.length ? U.forEach((Z) => Z(b, j, k)) : (X.NODE_ENV !== "production" && re("uncaught error during route navigation:"), console.error(b)), Promise.reject(b);
  }
  function Ke() {
    return J && l.value !== Tt ? Promise.resolve() : new Promise((b, j) => {
      Ue.add([b, j]);
    });
  }
  function Gt(b) {
    return J || (J = !b, nt(), Ue.list().forEach(([j, k]) => b ? k(b) : j()), Ue.reset()), b;
  }
  function Rt(b, j, k, U) {
    const { scrollBehavior: Z } = e;
    if (!vt || !Z)
      return Promise.resolve();
    const Ee = !k && om(da(b.fullPath, 0)) || (U || !k) && history.state && history.state.scroll || null;
    return Ko().then(() => Z(b, j, Ee)).then((Q) => Q && tm(Q)).catch((Q) => q(Q, b, j));
  }
  const ot = (b) => r.go(b);
  let ze;
  const Pt = /* @__PURE__ */ new Set(), fo = {
    currentRoute: l,
    listening: !0,
    addRoute: m,
    removeRoute: _,
    hasRoute: R,
    getRoutes: N,
    resolve: O,
    options: e,
    push: K,
    replace: ee,
    go: ot,
    back: () => ot(-1),
    forward: () => ot(1),
    beforeEach: s.add,
    beforeResolve: i.add,
    afterEach: a.add,
    onError: $e.add,
    isReady: Ke,
    install(b) {
      const j = this;
      b.component("RouterLink", si), b.component("RouterView", Xm), b.config.globalProperties.$router = j, Object.defineProperty(b.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => ue(l)
      }), vt && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !ze && l.value === Tt && (ze = !0, K(r.location).catch((Z) => {
        X.NODE_ENV !== "production" && re("Unexpected error when starting the router:", Z);
      }));
      const k = {};
      for (const Z in Tt)
        Object.defineProperty(k, Z, {
          get: () => l.value[Z],
          enumerable: !0
        });
      b.provide(ri, j), b.provide(Ic, Ya(k)), b.provide(ys, l);
      const U = b.unmount;
      Pt.add(b), b.unmount = function() {
        Pt.delete(b), Pt.size < 1 && (u = Tt, ye && ye(), ye = null, l.value = Tt, ze = !1, J = !1), U();
      }, X.NODE_ENV !== "production" && vt && eg(b, j, t);
    }
  };
  function Ct(b) {
    return b.reduce((j, k) => j.then(() => he(k)), Promise.resolve());
  }
  return fo;
}
function cg(e, t) {
  const n = [], o = [], r = [], s = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < s; i++) {
    const a = t.matched[i];
    a && (e.matched.find((u) => Wt(u, a)) ? o.push(a) : n.push(a));
    const l = e.matched[i];
    l && (t.matched.find((u) => Wt(u, l)) || r.push(l));
  }
  return [n, o, r];
}
const co = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
}, ug = {}, uo = (e) => (hl("data-v-7ddf73dc"), e = e(), ml(), e), fg = { class: "error-wrapper" }, dg = /* @__PURE__ */ uo(() => /* @__PURE__ */ E("span", { class: "error-title" }, "Error 404", -1)), pg = /* @__PURE__ */ uo(() => /* @__PURE__ */ E("span", { class: "error-description" }, "Sorry, we couldn't find this page.", -1)), hg = /* @__PURE__ */ uo(() => /* @__PURE__ */ E("span", { class: "error-sub-description" }, "But dont worry, you can find plenty of other things on the homepage..", -1)), mg = { class: "mt-5" }, gg = /* @__PURE__ */ uo(() => /* @__PURE__ */ E("i", { class: "fas fa-arrow-left fa-fw me-1" }, null, -1)), _g = /* @__PURE__ */ uo(() => /* @__PURE__ */ E("span", null, "Back to Home", -1));
function yg(e, t) {
  const n = js("router-link");
  return fe(), ge("div", fg, [
    Co(e.$slots, "title", {}, () => [
      dg
    ], !0),
    Co(e.$slots, "description", {}, () => [
      pg
    ], !0),
    Co(e.$slots, "subdescription", {}, () => [
      hg
    ], !0),
    E("div", mg, [
      Ne(n, {
        to: "/",
        class: "btn btn-sm btn-primary"
      }, {
        default: jt(() => [
          gg,
          _g
        ]),
        _: 1
      })
    ])
  ]);
}
const Eg = /* @__PURE__ */ co(ug, [["render", yg], ["__scopeId", "data-v-7ddf73dc"]]), bg = { class: "nav-item" }, vg = ["href"], Ng = {
  __name: "NavLinkItem",
  props: {
    to: { type: [String, Object], required: !0 },
    // Accepts both string or location object
    active: Boolean
    // This prop is optional and can be used to override the active state if needed
  },
  setup(e) {
    const t = e, { to: n } = qr(t);
    return Es({ to: n }), (o, r) => (fe(), ur(ue(si), {
      to: ue(n),
      custom: ""
    }, {
      default: jt(({ href: s, isExactActive: i }) => [
        E("li", bg, [
          E("a", {
            class: it(["nav-link", { active: i }]),
            href: s
          }, [
            Co(o.$slots, "default", {}, void 0, !0)
          ], 10, vg)
        ])
      ]),
      _: 3
    }, 8, ["to"]));
  }
}, wo = /* @__PURE__ */ co(Ng, [["__scopeId", "data-v-0d411b52"]]), wg = { class: "navbar navbar-expand-lg bg-light" }, Og = { class: "container-fluid" }, Sg = /* @__PURE__ */ E("button", {
  class: "navbar-toggler",
  type: "button",
  "data-bs-toggle": "collapse",
  "data-bs-target": "#navbarNav",
  "aria-controls": "navbarNav",
  "aria-expanded": "false",
  "aria-label": "Toggle navigation"
}, [
  /* @__PURE__ */ E("span", { class: "navbar-toggler-icon" })
], -1), xg = {
  class: "collapse navbar-collapse",
  id: "navbarNav"
}, Rg = { class: "navbar-nav" }, Pg = { class: "nav-item" }, Cg = { class: "nav-item" }, Dg = { class: "nav-item" }, $g = { class: "nav-item" }, Tg = {
  __name: "MainMenu",
  setup(e) {
    return (t, n) => (fe(), ge("nav", wg, [
      E("div", Og, [
        Ne(ue(si), {
          class: "navbar-brand",
          to: "/"
        }, {
          default: jt(() => [
            Zt("Epic Participant Updater")
          ]),
          _: 1
        }),
        Sg,
        E("div", xg, [
          E("ul", Rg, [
            E("li", Pg, [
              Ne(wo, { to: "/" }, {
                default: jt(() => [
                  Zt("Home")
                ]),
                _: 1
              })
            ]),
            E("li", Cg, [
              Ne(wo, { to: "/project-templates" }, {
                default: jt(() => [
                  Zt("Project Templates")
                ]),
                _: 1
              })
            ]),
            E("li", Dg, [
              Ne(wo, { to: "/api-token" }, {
                default: jt(() => [
                  Zt("API token")
                ]),
                _: 1
              })
            ]),
            E("li", $g, [
              Ne(wo, { to: "/logs" }, {
                default: jt(() => [
                  Zt("Logs")
                ]),
                _: 1
              })
            ])
          ])
        ])
      ])
    ]));
  }
}, Vg = {
  __name: "MainLayout",
  setup(e) {
    return (t, n) => {
      const o = js("router-view");
      return fe(), ge("div", null, [
        Ne(Tg),
        Ne(o)
      ]);
    };
  }
}, Ag = {}, Ig = { class: "border rounded p-2 mt-2" }, kg = /* @__PURE__ */ E("p", null, "This module exposes an endpoint that listens for study related data coming from Hyperspace.", -1), jg = /* @__PURE__ */ E("p", null, "Whenever a patient is added to a study in Hyperspace, an XML payload is sent to an exposed URL in REDCap.", -1), Lg = /* @__PURE__ */ E("span", null, "The XML payload is parsed to update/create a record in REDCap using this information:", -1), Mg = /* @__PURE__ */ E("ul", null, [
  /* @__PURE__ */ E("li", null, "study ID"),
  /* @__PURE__ */ E("li", null, "patient MRN"),
  /* @__PURE__ */ E("li", null, "enrollment status"),
  /* @__PURE__ */ E("li", null, "starting date of the study"),
  /* @__PURE__ */ E("li", null, "ending date of the study")
], -1), Fg = [
  kg,
  jg,
  Lg,
  Mg
];
function Ug(e, t) {
  return fe(), ge("div", Ig, Fg);
}
const Hg = /* @__PURE__ */ co(Ag, [["render", Ug]]), Bg = { class: "border rounded p-2 mt-2" }, qg = /* @__PURE__ */ E("p", null, "Download a project template and use it as a starting point or as a reference for how to use the module.", -1), Wg = ["href", "download"], Kg = {
  __name: "ProjectTemplatesPage",
  setup(e) {
    const t = ni(), n = _e(() => {
      var o;
      return ((o = t == null ? void 0 : t.app_settings) == null ? void 0 : o.project_templates) ?? {};
    });
    return (o, r) => (fe(), ge("div", Bg, [
      qg,
      E("ul", null, [
        (fe(!0), ge(je, null, Fs(n.value, (s, i, a) => (fe(), ge("li", { key: a }, [
          E("a", {
            href: s,
            target: "_blank",
            download: `${i}.xml`
          }, me(i), 9, Wg)
        ]))), 128))
      ])
    ]));
  }
}, zg = () => {
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
        }).catch((u) => {
          console.error("Failed to copy text:", u), a(u);
        }) : l === !0 && (console.log("Text copied to clipboard ✌🏼:", r), i(r));
      } catch (l) {
        console.error("Failed to copy text:", l), a(l);
      }
    })
  };
}, Gg = { class: "d-flex flex-column gap-2 mt-2" }, Jg = { class: "d-flex flex-column gap-2 border rounded p-2" }, Yg = /* @__PURE__ */ E("span", { class: "fs-3" }, "Upload URL", -1), Xg = /* @__PURE__ */ E("span", { class: "d-block" }, "This URL is used to send updates to Epic.", -1), Qg = { class: "input-group" }, Zg = ["value"], e_ = /* @__PURE__ */ E("i", { class: "fas fa-copy" }, null, -1), t_ = [
  e_
], n_ = { class: "d-flex flex-column gap-2 border rounded p-2" }, o_ = /* @__PURE__ */ E("span", { class: "fs-3" }, "Listening URL", -1), r_ = /* @__PURE__ */ E("span", { class: "d-block" }, "Provide this URL to your Epic staff for the configuration of the EOA service.", -1), s_ = /* @__PURE__ */ E("span", { class: "d-block" }, "This URL will allow Hyperspace to send study enrollment data to REDCap.", -1), i_ = { class: "input-group" }, a_ = ["value"], l_ = /* @__PURE__ */ E("i", { class: "fas fa-copy" }, null, -1), c_ = [
  l_
], u_ = /* @__PURE__ */ E("i", { class: "fas fa-eye" }, null, -1), f_ = [
  u_
], d_ = { class: "d-flex flex-column gap-2 border rounded p-2" }, p_ = /* @__PURE__ */ E("span", { class: "fs-3" }, "API Token", -1), h_ = /* @__PURE__ */ E("span", null, "Inspect or change the API token", -1), m_ = { class: "input-group" }, g_ = ["value"], __ = /* @__PURE__ */ E("i", { class: "fas fa-copy" }, null, -1), y_ = [
  __
], E_ = /* @__PURE__ */ E("i", { class: "fas fa-eye" }, null, -1), b_ = [
  E_
], v_ = /* @__PURE__ */ E("div", { class: "alert alert-warning mb-0" }, [
  /* @__PURE__ */ E("span", null, "Please note that, if the API token is changed, the updated listening URL must also be changed in Hyperspace")
], -1), N_ = /* @__PURE__ */ E("span", { class: "d-flex gap-2 align-items-center" }, [
  /* @__PURE__ */ E("i", { class: "fas fa-refresh" }),
  /* @__PURE__ */ E("span", null, "Regenerate token")
], -1), w_ = [
  N_
], O_ = {
  __name: "ApiTokenPage",
  setup(e) {
    const t = ni(), n = zg(), o = (m) => {
      const _ = xe(!1), N = () => {
        _.value = !_.value;
      }, R = _e(() => _.value ? m.value : "*******");
      return {
        toggle: N,
        value: R
      };
    }, r = _e(() => {
      var m;
      return (m = t == null ? void 0 : t.api_token_data) == null ? void 0 : m.api_token;
    }), s = o(r), i = _e(() => {
      var m;
      return (m = t == null ? void 0 : t.api_token_data) == null ? void 0 : m.listening_url;
    }), a = o(i), l = _e(() => t == null ? void 0 : t.epic_upload_url);
    async function u() {
      var m;
      await n.copy((m = t == null ? void 0 : t.api_token_data) == null ? void 0 : m.api_token), alert("text copied");
    }
    async function f() {
      var m;
      await n.copy((m = t == null ? void 0 : t.api_token_data) == null ? void 0 : m.listening_url), alert("text copied");
    }
    async function c() {
      await n.copy(t == null ? void 0 : t.epic_upload_url), alert("text copied");
    }
    async function p() {
      confirm("Are you sure you want to generate a new API token?") && (await t.regenerateToken(), t.init());
    }
    return (m, _) => (fe(), ge("div", Gg, [
      E("div", Jg, [
        Yg,
        Xg,
        E("div", Qg, [
          E("input", {
            type: "text",
            class: "form-control",
            disabled: "",
            readonly: "",
            value: l.value
          }, null, 8, Zg),
          E("button", {
            class: "btn btn-outline-secondary",
            type: "button",
            onClick: c
          }, t_)
        ])
      ]),
      E("div", n_, [
        o_,
        r_,
        s_,
        E("div", i_, [
          E("input", {
            type: "text",
            class: "form-control",
            disabled: "",
            readonly: "",
            value: ue(a).value.value
          }, null, 8, a_),
          E("button", {
            class: "btn btn-outline-secondary",
            type: "button",
            onClick: f
          }, c_),
          E("button", {
            class: "btn btn-outline-secondary",
            type: "button",
            onClick: _[0] || (_[0] = (...N) => ue(a).toggle && ue(a).toggle(...N))
          }, f_)
        ])
      ]),
      E("div", d_, [
        p_,
        h_,
        E("div", m_, [
          E("input", {
            type: "text",
            class: "form-control",
            disabled: "",
            readonly: "",
            value: ue(s).value.value
          }, null, 8, g_),
          E("button", {
            class: "btn btn-outline-secondary",
            type: "button",
            onClick: u
          }, y_),
          E("button", {
            class: "btn btn-outline-secondary",
            type: "button",
            onClick: _[1] || (_[1] = (...N) => ue(s).toggle && ue(s).toggle(...N))
          }, b_)
        ]),
        v_,
        E("div", null, [
          E("button", {
            class: "btn btn-sm btn-danger",
            onClick: p
          }, w_)
        ])
      ])
    ]));
  }
}, S_ = { "aria-label": "Log pages" }, x_ = { class: "pagination pagination-sm mb-0" }, R_ = ["disabled"], P_ = ["disabled"], C_ = {
  key: 0,
  class: "page-item disabled"
}, D_ = {
  type: "button",
  class: "page-link",
  disabled: ""
}, $_ = ["onClick"], T_ = ["disabled"], V_ = ["disabled"], A_ = {
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
    const n = e, o = t, r = (R) => {
      const O = parseInt(R, 10);
      return Number.isNaN(O) || O < 1 ? 1 : O > i.value ? i.value : O;
    }, s = _e(() => r(n.modelValue)), i = _e(() => {
      const R = parseInt(n.totalItems, 10), O = parseInt(n.perPage, 10), V = Number.isNaN(R) || R < 0 ? 0 : R, I = Number.isNaN(O) || O < 1 ? 25 : O;
      return Math.max(1, Math.ceil(V / I));
    }), a = _e(() => s.value <= 1), l = _e(() => s.value >= i.value), u = _e(() => {
      const R = Math.min(n.maxVisibleButtons, i.value), O = Math.floor(R / 2);
      let V = s.value - O;
      return s.value <= O && (V = 1), s.value >= i.value - O && (V = i.value - R + 1), V < 1 && (V = 1), Array.from({ length: R }, (I, K) => V + K);
    });
    function f(R) {
      const O = u.value.length - 1;
      return u.value.length < n.maxVisibleButtons ? !1 : R === 0 && u.value[R] > 1 || R === O && u.value[R] < i.value;
    }
    function c(R) {
      o("update:modelValue", r(R));
    }
    function p() {
      c(1);
    }
    function m() {
      c(s.value - 1);
    }
    function _() {
      c(s.value + 1);
    }
    function N() {
      c(i.value);
    }
    return (R, O) => (fe(), ge("nav", S_, [
      E("ul", x_, [
        E("li", {
          class: it(["page-item", { disabled: a.value }])
        }, [
          E("button", {
            type: "button",
            class: "page-link",
            disabled: a.value,
            onClick: p
          }, me(e.firstText), 9, R_)
        ], 2),
        E("li", {
          class: it(["page-item", { disabled: a.value }])
        }, [
          E("button", {
            type: "button",
            class: "page-link",
            disabled: a.value,
            onClick: m
          }, me(e.previousText), 9, P_)
        ], 2),
        (fe(!0), ge(je, null, Fs(u.value, (V, I) => (fe(), ge(je, {
          key: `${V}-${I}`
        }, [
          f(I) ? (fe(), ge("li", C_, [
            E("button", D_, me(e.ellipsisText), 1)
          ])) : (fe(), ge("li", {
            key: 1,
            class: it(["page-item", { active: V === s.value }])
          }, [
            E("button", {
              type: "button",
              class: "page-link",
              onClick: (K) => c(V)
            }, me(V), 9, $_)
          ], 2))
        ], 64))), 128)),
        E("li", {
          class: it(["page-item", { disabled: l.value }])
        }, [
          E("button", {
            type: "button",
            class: "page-link",
            disabled: l.value,
            onClick: _
          }, me(e.nextText), 9, T_)
        ], 2),
        E("li", {
          class: it(["page-item", { disabled: l.value }])
        }, [
          E("button", {
            type: "button",
            class: "page-link",
            disabled: l.value,
            onClick: N
          }, me(e.lastText), 9, V_)
        ], 2)
      ])
    ]));
  }
}, I_ = /* @__PURE__ */ co(A_, [["__scopeId", "data-v-096f7706"]]), Dn = (e) => (hl("data-v-f85f19cd"), e = e(), ml(), e), k_ = { class: "d-flex flex-column gap-2 mt-2" }, j_ = { class: "d-flex align-items-center gap-2 flex-wrap" }, L_ = { class: "input-group input-group-sm logs-search" }, M_ = /* @__PURE__ */ Dn(() => /* @__PURE__ */ E("span", { class: "input-group-text" }, [
  /* @__PURE__ */ E("i", { class: "fas fa-search fa-fw" })
], -1)), F_ = /* @__PURE__ */ Dn(() => /* @__PURE__ */ E("i", { class: "fas fa-times fa-fw" }, null, -1)), U_ = [
  F_
], H_ = ["disabled"], B_ = {
  key: 0,
  class: "fas fa-spinner fa-spin fa-fw"
}, q_ = {
  key: 1,
  class: "fas fa-refresh fa-fw"
}, W_ = { style: { "font-variant-numeric": "tabular-nums" } }, K_ = { class: "number" }, z_ = /* @__PURE__ */ Dn(() => /* @__PURE__ */ E("span", null, "/", -1)), G_ = { class: "number" }, J_ = {
  key: 0,
  class: "alert alert-danger py-2 mb-0"
}, Y_ = { class: "table-responsive" }, X_ = { class: "table table-striped table-bordered table-hover" }, Q_ = /* @__PURE__ */ Dn(() => /* @__PURE__ */ E("thead", null, [
  /* @__PURE__ */ E("tr", null, [
    /* @__PURE__ */ E("th", null, "log ID"),
    /* @__PURE__ */ E("th", null, "timestamp"),
    /* @__PURE__ */ E("th", null, "user"),
    /* @__PURE__ */ E("th", null, "IP"),
    /* @__PURE__ */ E("th", null, "project ID"),
    /* @__PURE__ */ E("th", null, "event ID"),
    /* @__PURE__ */ E("th", null, "record"),
    /* @__PURE__ */ E("th", null, "message"),
    /* @__PURE__ */ E("th", null, "status"),
    /* @__PURE__ */ E("th", null, "save action"),
    /* @__PURE__ */ E("th", null, "Epic status"),
    /* @__PURE__ */ E("th", null, "items"),
    /* @__PURE__ */ E("th", null, "description"),
    /* @__PURE__ */ E("th", null, "save errors"),
    /* @__PURE__ */ E("th", null, "MRN"),
    /* @__PURE__ */ E("th", null, "study ID")
  ])
], -1)), Z_ = { key: 0 }, ey = /* @__PURE__ */ Dn(() => /* @__PURE__ */ E("td", {
  colspan: "16",
  class: "text-center text-muted py-3"
}, "No logs found", -1)), ty = [
  ey
], ny = { class: "number" }, oy = { key: 0 }, ry = /* @__PURE__ */ Dn(() => /* @__PURE__ */ E("summary", null, "More...", -1)), sy = { key: 0 }, iy = {
  key: 1,
  class: "number"
}, ay = {
  __name: "LogsPage",
  setup(e) {
    const t = Mh(), n = xe(t.query);
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
    return tt(n, (a) => {
      o && clearTimeout(o), o = setTimeout(() => {
        t.query = a.trim();
      }, 250);
    }), tt(() => t.query, (a) => {
      a !== n.value.trim() && (n.value = a);
    }), Nl(() => {
      o && clearTimeout(o);
    }), (a, l) => (fe(), ge("div", k_, [
      E("div", j_, [
        E("div", L_, [
          M_,
          mf(E("input", {
            "onUpdate:modelValue": l[0] || (l[0] = (u) => n.value = u),
            type: "search",
            class: "form-control",
            placeholder: "Search logs",
            "aria-label": "Search logs"
          }, null, 512), [
            [Md, n.value]
          ]),
          n.value ? (fe(), ge("button", {
            key: 0,
            type: "button",
            class: "btn btn-outline-secondary",
            "aria-label": "Clear search",
            onClick: r
          }, U_)) : bo("", !0)
        ]),
        Ne(I_, {
          modelValue: ue(t).page,
          "onUpdate:modelValue": l[1] || (l[1] = (u) => ue(t).page = u),
          "per-page": ue(t).perPage,
          "total-items": ue(t).total
        }, null, 8, ["modelValue", "per-page", "total-items"]),
        E("button", {
          type: "button",
          class: "btn btn-sm btn-primary",
          onClick: l[2] || (l[2] = (...u) => ue(t).refresh && ue(t).refresh(...u)),
          disabled: ue(t).loading
        }, [
          ue(t).loading ? (fe(), ge("i", B_)) : (fe(), ge("i", q_))
        ], 8, H_),
        E("span", W_, [
          Zt(" Page "),
          E("span", K_, me(ue(t).page), 1),
          z_,
          E("span", G_, me(ue(t).totalPages), 1)
        ])
      ]),
      ue(t).error ? (fe(), ge("div", J_, " Unable to load logs. ")) : bo("", !0),
      E("div", Y_, [
        E("table", X_, [
          Q_,
          E("tbody", null, [
            ue(t).logs.length === 0 ? (fe(), ge("tr", Z_, ty)) : bo("", !0),
            (fe(!0), ge(je, null, Fs(ue(t).logs, (u, f) => (fe(), ge("tr", {
              key: (u == null ? void 0 : u.log_id) ?? f
            }, [
              E("td", null, me(u.log_id), 1),
              E("td", null, me(u.timestamp), 1),
              E("td", null, me(u.user), 1),
              E("td", null, me(u.ip), 1),
              E("td", null, me(u.project_id), 1),
              E("td", null, me(u.event_id), 1),
              E("td", null, me(u.record), 1),
              E("td", null, me(u.message), 1),
              E("td", null, [
                E("span", {
                  class: it(["badge", i(u.status)])
                }, me(u.status), 3)
              ]),
              E("td", null, me(u.save_action), 1),
              E("td", null, me(u.epic_status), 1),
              E("td", ny, me(u.save_item_count), 1),
              E("td", null, [
                u.description ? (fe(), ge("details", oy, [
                  ry,
                  E("pre", null, me(u.description), 1)
                ])) : bo("", !0)
              ]),
              E("td", null, [
                u.save_errors ? (fe(), ge("details", sy, [
                  E("summary", null, me(s(u)), 1),
                  E("pre", null, me(u.save_errors), 1)
                ])) : (fe(), ge("span", iy, me(u.save_error_count), 1))
              ]),
              E("td", null, me(u.MRN), 1),
              E("td", null, me(u.study_id), 1)
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}, ly = /* @__PURE__ */ co(ay, [["__scopeId", "data-v-f85f19cd"]]), cy = [
  {
    path: "/",
    component: Vg,
    // redirect: '/inbox',
    children: [
      { path: "", name: "home", component: Hg },
      { path: "project-templates", name: "project-templates", component: Kg },
      { path: "api-token", name: "api-token", component: O_ },
      { path: "logs", name: "logs", component: ly },
      { path: "/:pathMatch(.*)*", component: Eg }
    ]
  }
];
let Oo;
const uy = () => Oo || (Oo = lg({
  // Provide the history implementation to use. We are using the hash history for simplicity here.
  history: lm(),
  routes: cy
}), Oo), dy = (e) => {
  const t = Hd(qh), n = Ep();
  t.use(n);
  const o = uy();
  return t.use(o), t.mount(e), t;
};
export {
  dy as default
};
