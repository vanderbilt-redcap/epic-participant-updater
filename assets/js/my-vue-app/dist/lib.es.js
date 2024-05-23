var ka = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
};
var ao = (e, t, n) => (ka(e, t, "read from private field"), n ? n.call(e) : t.get(e)), ri = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
};
var El = {};
/**
* @vue/shared v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function wt(e, t) {
  const n = new Set(e.split(","));
  return t ? (o) => n.has(o.toLowerCase()) : (o) => n.has(o);
}
const de = El.NODE_ENV !== "production" ? Object.freeze({}) : {}, En = El.NODE_ENV !== "production" ? Object.freeze([]) : [], ve = () => {
}, yl = () => !1, Qn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), ko = (e) => e.startsWith("onUpdate:"), Ee = Object.assign, ms = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, ja = Object.prototype.hasOwnProperty, te = (e, t) => ja.call(e, t), q = Array.isArray, en = (e) => Xo(e) === "[object Map]", bl = (e) => Xo(e) === "[object Set]", K = (e) => typeof e == "function", ye = (e) => typeof e == "string", Sn = (e) => typeof e == "symbol", ce = (e) => e !== null && typeof e == "object", gs = (e) => (ce(e) || K(e)) && K(e.then) && K(e.catch), vl = Object.prototype.toString, Xo = (e) => vl.call(e), _s = (e) => Xo(e).slice(8, -1), Nl = (e) => Xo(e) === "[object Object]", Es = (e) => ye(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, vo = /* @__PURE__ */ wt(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), La = /* @__PURE__ */ wt(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
), Qo = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Ma = /-(\w)/g, dt = Qo((e) => e.replace(Ma, (t, n) => n ? n.toUpperCase() : "")), Fa = /\B([A-Z])/g, Ft = Qo(
  (e) => e.replace(Fa, "-$1").toLowerCase()
), cn = Qo((e) => e.charAt(0).toUpperCase() + e.slice(1)), Yt = Qo((e) => e ? `on${cn(e)}` : ""), Ut = (e, t) => !Object.is(e, t), Pn = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, jo = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, Ua = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let si;
const ys = () => si || (si = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function bs(e) {
  if (q(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n], r = ye(o) ? qa(o) : bs(o);
      if (r)
        for (const s in r)
          t[s] = r[s];
    }
    return t;
  } else if (ye(e) || ce(e))
    return e;
}
const Ha = /;(?![^(]*\))/g, Ba = /:([^]+)/, Wa = /\/\*[^]*?\*\//g;
function qa(e) {
  const t = {};
  return e.replace(Wa, "").split(Ha).forEach((n) => {
    if (n) {
      const o = n.split(Ba);
      o.length > 1 && (t[o[0].trim()] = o[1].trim());
    }
  }), t;
}
function Zo(e) {
  let t = "";
  if (ye(e))
    t = e;
  else if (q(e))
    for (let n = 0; n < e.length; n++) {
      const o = Zo(e[n]);
      o && (t += o + " ");
    }
  else if (ce(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Ka = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot", za = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", Ga = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics", Ja = /* @__PURE__ */ wt(Ka), Ya = /* @__PURE__ */ wt(za), Xa = /* @__PURE__ */ wt(Ga), Qa = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Za = /* @__PURE__ */ wt(Qa);
function wl(e) {
  return !!e || e === "";
}
const Me = (e) => ye(e) ? e : e == null ? "" : q(e) || ce(e) && (e.toString === vl || !K(e.toString)) ? JSON.stringify(e, Ol, 2) : String(e), Ol = (e, t) => t && t.__v_isRef ? Ol(e, t.value) : en(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [o, r], s) => (n[Er(o, s) + " =>"] = r, n),
    {}
  )
} : bl(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Er(n))
} : Sn(t) ? Er(t) : ce(t) && !q(t) && !Nl(t) ? String(t) : t, Er = (e, t = "") => {
  var n;
  return Sn(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
};
var we = {};
function Lo(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let Be;
class Sl {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = Be, !t && Be && (this.index = (Be.scopes || (Be.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = Be;
      try {
        return Be = this, t();
      } finally {
        Be = n;
      }
    } else
      we.NODE_ENV !== "production" && Lo("cannot run an inactive effect scope.");
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    Be = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    Be = this.parent;
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
function xl(e) {
  return new Sl(e);
}
function eu(e, t = Be) {
  t && t.active && t.effects.push(e);
}
function Rl() {
  return Be;
}
function tu(e) {
  Be ? Be.cleanups.push(e) : we.NODE_ENV !== "production" && Lo(
    "onScopeDispose() is called when there is no active effect scope to be associated with."
  );
}
let tn;
class vs {
  constructor(t, n, o, r) {
    this.fn = t, this.trigger = n, this.scheduler = o, this.active = !0, this.deps = [], this._dirtyLevel = 2, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, eu(this, r);
  }
  get dirty() {
    if (this._dirtyLevel === 1) {
      qt();
      for (let t = 0; t < this._depsLength; t++) {
        const n = this.deps[t];
        if (n.computed && (nu(n.computed), this._dirtyLevel >= 2))
          break;
      }
      this._dirtyLevel < 2 && (this._dirtyLevel = 0), Kt();
    }
    return this._dirtyLevel >= 2;
  }
  set dirty(t) {
    this._dirtyLevel = t ? 2 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let t = Lt, n = tn;
    try {
      return Lt = !0, tn = this, this._runnings++, ii(this), this.fn();
    } finally {
      li(this), this._runnings--, tn = n, Lt = t;
    }
  }
  stop() {
    var t;
    this.active && (ii(this), li(this), (t = this.onStop) == null || t.call(this), this.active = !1);
  }
}
function nu(e) {
  return e.value;
}
function ii(e) {
  e._trackId++, e._depsLength = 0;
}
function li(e) {
  if (e.deps && e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++)
      Pl(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function Pl(e, t) {
  const n = e.get(t);
  n !== void 0 && t._trackId !== n && (e.delete(t), e.size === 0 && e.cleanup());
}
let Lt = !0, Ir = 0;
const Dl = [];
function qt() {
  Dl.push(Lt), Lt = !1;
}
function Kt() {
  const e = Dl.pop();
  Lt = e === void 0 ? !0 : e;
}
function Ns() {
  Ir++;
}
function ws() {
  for (Ir--; !Ir && kr.length; )
    kr.shift()();
}
function Cl(e, t, n) {
  var o;
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const r = e.deps[e._depsLength];
    r !== t ? (r && Pl(r, e), e.deps[e._depsLength++] = t) : e._depsLength++, we.NODE_ENV !== "production" && ((o = e.onTrack) == null || o.call(e, Ee({ effect: e }, n)));
  }
}
const kr = [];
function $l(e, t, n) {
  var o;
  Ns();
  for (const r of e.keys())
    if (r._dirtyLevel < t && e.get(r) === r._trackId) {
      const s = r._dirtyLevel;
      r._dirtyLevel = t, s === 0 && (r._shouldSchedule = !0, we.NODE_ENV !== "production" && ((o = r.onTrigger) == null || o.call(r, Ee({ effect: r }, n))), r.trigger());
    }
  Tl(e), ws();
}
function Tl(e) {
  for (const t of e.keys())
    t.scheduler && t._shouldSchedule && (!t._runnings || t.allowRecurse) && e.get(t) === t._trackId && (t._shouldSchedule = !1, kr.push(t.scheduler));
}
const Al = (e, t) => {
  const n = /* @__PURE__ */ new Map();
  return n.cleanup = e, n.computed = t, n;
}, Mo = /* @__PURE__ */ new WeakMap(), nn = Symbol(we.NODE_ENV !== "production" ? "iterate" : ""), jr = Symbol(we.NODE_ENV !== "production" ? "Map key iterate" : "");
function Ae(e, t, n) {
  if (Lt && tn) {
    let o = Mo.get(e);
    o || Mo.set(e, o = /* @__PURE__ */ new Map());
    let r = o.get(n);
    r || o.set(n, r = Al(() => o.delete(n))), Cl(
      tn,
      r,
      we.NODE_ENV !== "production" ? {
        target: e,
        type: t,
        key: n
      } : void 0
    );
  }
}
function ct(e, t, n, o, r, s) {
  const i = Mo.get(e);
  if (!i)
    return;
  let l = [];
  if (t === "clear")
    l = [...i.values()];
  else if (n === "length" && q(e)) {
    const c = Number(o);
    i.forEach((f, u) => {
      (u === "length" || !Sn(u) && u >= c) && l.push(f);
    });
  } else
    switch (n !== void 0 && l.push(i.get(n)), t) {
      case "add":
        q(e) ? Es(n) && l.push(i.get("length")) : (l.push(i.get(nn)), en(e) && l.push(i.get(jr)));
        break;
      case "delete":
        q(e) || (l.push(i.get(nn)), en(e) && l.push(i.get(jr)));
        break;
      case "set":
        en(e) && l.push(i.get(nn));
        break;
    }
  Ns();
  for (const c of l)
    c && $l(
      c,
      2,
      we.NODE_ENV !== "production" ? {
        target: e,
        type: t,
        key: n,
        newValue: o,
        oldValue: r,
        oldTarget: s
      } : void 0
    );
  ws();
}
function ou(e, t) {
  var n;
  return (n = Mo.get(e)) == null ? void 0 : n.get(t);
}
const ru = /* @__PURE__ */ wt("__proto__,__v_isRef,__isVue"), Vl = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Sn)
), ci = /* @__PURE__ */ su();
function su() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const o = z(this);
      for (let s = 0, i = this.length; s < i; s++)
        Ae(o, "get", s + "");
      const r = o[t](...n);
      return r === -1 || r === !1 ? o[t](...n.map(z)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      qt(), Ns();
      const o = z(this)[t].apply(this, n);
      return ws(), Kt(), o;
    };
  }), e;
}
function iu(e) {
  const t = z(this);
  return Ae(t, "has", e), t.hasOwnProperty(e);
}
class Il {
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
      return o === (r ? s ? Hl : Ul : s ? Fl : Ml).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(o) ? t : void 0;
    const i = q(t);
    if (!r) {
      if (i && te(ci, n))
        return Reflect.get(ci, n, o);
      if (n === "hasOwnProperty")
        return iu;
    }
    const l = Reflect.get(t, n, o);
    return (Sn(n) ? Vl.has(n) : ru(n)) || (r || Ae(t, "get", n), s) ? l : _e(l) ? i && Es(n) ? l : l.value : ce(l) ? r ? Wl(l) : Zn(l) : l;
  }
}
class kl extends Il {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, o, r) {
    let s = t[n];
    if (!this._shallow) {
      const c = Ht(s);
      if (!Fo(o) && !Ht(o) && (s = z(s), o = z(o)), !q(t) && _e(s) && !_e(o))
        return c ? !1 : (s.value = o, !0);
    }
    const i = q(t) && Es(n) ? Number(n) < t.length : te(t, n), l = Reflect.set(t, n, o, r);
    return t === z(r) && (i ? Ut(o, s) && ct(t, "set", n, o, s) : ct(t, "add", n, o)), l;
  }
  deleteProperty(t, n) {
    const o = te(t, n), r = t[n], s = Reflect.deleteProperty(t, n);
    return s && o && ct(t, "delete", n, void 0, r), s;
  }
  has(t, n) {
    const o = Reflect.has(t, n);
    return (!Sn(n) || !Vl.has(n)) && Ae(t, "has", n), o;
  }
  ownKeys(t) {
    return Ae(
      t,
      "iterate",
      q(t) ? "length" : nn
    ), Reflect.ownKeys(t);
  }
}
class jl extends Il {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return we.NODE_ENV !== "production" && Lo(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return we.NODE_ENV !== "production" && Lo(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const lu = /* @__PURE__ */ new kl(), cu = /* @__PURE__ */ new jl(), au = /* @__PURE__ */ new kl(
  !0
), uu = /* @__PURE__ */ new jl(!0), Os = (e) => e, er = (e) => Reflect.getPrototypeOf(e);
function uo(e, t, n = !1, o = !1) {
  e = e.__v_raw;
  const r = z(e), s = z(t);
  n || (Ut(t, s) && Ae(r, "get", t), Ae(r, "get", s));
  const { has: i } = er(r), l = o ? Os : n ? Ss : Bn;
  if (i.call(r, t))
    return l(e.get(t));
  if (i.call(r, s))
    return l(e.get(s));
  e !== r && e.get(t);
}
function fo(e, t = !1) {
  const n = this.__v_raw, o = z(n), r = z(e);
  return t || (Ut(e, r) && Ae(o, "has", e), Ae(o, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r);
}
function po(e, t = !1) {
  return e = e.__v_raw, !t && Ae(z(e), "iterate", nn), Reflect.get(e, "size", e);
}
function ai(e) {
  e = z(e);
  const t = z(this);
  return er(t).has.call(t, e) || (t.add(e), ct(t, "add", e, e)), this;
}
function ui(e, t) {
  t = z(t);
  const n = z(this), { has: o, get: r } = er(n);
  let s = o.call(n, e);
  s ? we.NODE_ENV !== "production" && Ll(n, o, e) : (e = z(e), s = o.call(n, e));
  const i = r.call(n, e);
  return n.set(e, t), s ? Ut(t, i) && ct(n, "set", e, t, i) : ct(n, "add", e, t), this;
}
function fi(e) {
  const t = z(this), { has: n, get: o } = er(t);
  let r = n.call(t, e);
  r ? we.NODE_ENV !== "production" && Ll(t, n, e) : (e = z(e), r = n.call(t, e));
  const s = o ? o.call(t, e) : void 0, i = t.delete(e);
  return r && ct(t, "delete", e, void 0, s), i;
}
function di() {
  const e = z(this), t = e.size !== 0, n = we.NODE_ENV !== "production" ? en(e) ? new Map(e) : new Set(e) : void 0, o = e.clear();
  return t && ct(e, "clear", void 0, void 0, n), o;
}
function ho(e, t) {
  return function(o, r) {
    const s = this, i = s.__v_raw, l = z(i), c = t ? Os : e ? Ss : Bn;
    return !e && Ae(l, "iterate", nn), i.forEach((f, u) => o.call(r, c(f), c(u), s));
  };
}
function mo(e, t, n) {
  return function(...o) {
    const r = this.__v_raw, s = z(r), i = en(s), l = e === "entries" || e === Symbol.iterator && i, c = e === "keys" && i, f = r[e](...o), u = n ? Os : t ? Ss : Bn;
    return !t && Ae(
      s,
      "iterate",
      c ? jr : nn
    ), {
      // iterator protocol
      next() {
        const { value: a, done: p } = f.next();
        return p ? { value: a, done: p } : {
          value: l ? [u(a[0]), u(a[1])] : u(a),
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
function Pt(e) {
  return function(...t) {
    if (we.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(
        `${cn(e)} operation ${n}failed: target is readonly.`,
        z(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function fu() {
  const e = {
    get(s) {
      return uo(this, s);
    },
    get size() {
      return po(this);
    },
    has: fo,
    add: ai,
    set: ui,
    delete: fi,
    clear: di,
    forEach: ho(!1, !1)
  }, t = {
    get(s) {
      return uo(this, s, !1, !0);
    },
    get size() {
      return po(this);
    },
    has: fo,
    add: ai,
    set: ui,
    delete: fi,
    clear: di,
    forEach: ho(!1, !0)
  }, n = {
    get(s) {
      return uo(this, s, !0);
    },
    get size() {
      return po(this, !0);
    },
    has(s) {
      return fo.call(this, s, !0);
    },
    add: Pt("add"),
    set: Pt("set"),
    delete: Pt("delete"),
    clear: Pt("clear"),
    forEach: ho(!0, !1)
  }, o = {
    get(s) {
      return uo(this, s, !0, !0);
    },
    get size() {
      return po(this, !0);
    },
    has(s) {
      return fo.call(this, s, !0);
    },
    add: Pt("add"),
    set: Pt("set"),
    delete: Pt("delete"),
    clear: Pt("clear"),
    forEach: ho(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
    e[s] = mo(
      s,
      !1,
      !1
    ), n[s] = mo(
      s,
      !0,
      !1
    ), t[s] = mo(
      s,
      !1,
      !0
    ), o[s] = mo(
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
  du,
  pu,
  hu,
  mu
] = /* @__PURE__ */ fu();
function tr(e, t) {
  const n = t ? e ? mu : hu : e ? pu : du;
  return (o, r, s) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? o : Reflect.get(
    te(n, r) && r in o ? n : o,
    r,
    s
  );
}
const gu = {
  get: /* @__PURE__ */ tr(!1, !1)
}, _u = {
  get: /* @__PURE__ */ tr(!1, !0)
}, Eu = {
  get: /* @__PURE__ */ tr(!0, !1)
}, yu = {
  get: /* @__PURE__ */ tr(!0, !0)
};
function Ll(e, t, n) {
  const o = z(n);
  if (o !== n && t.call(e, o)) {
    const r = _s(e);
    console.warn(
      `Reactive ${r} contains both the raw and reactive versions of the same object${r === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Ml = /* @__PURE__ */ new WeakMap(), Fl = /* @__PURE__ */ new WeakMap(), Ul = /* @__PURE__ */ new WeakMap(), Hl = /* @__PURE__ */ new WeakMap();
function bu(e) {
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
function vu(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : bu(_s(e));
}
function Zn(e) {
  return Ht(e) ? e : nr(
    e,
    !1,
    lu,
    gu,
    Ml
  );
}
function Bl(e) {
  return nr(
    e,
    !1,
    au,
    _u,
    Fl
  );
}
function Wl(e) {
  return nr(
    e,
    !0,
    cu,
    Eu,
    Ul
  );
}
function mn(e) {
  return nr(
    e,
    !0,
    uu,
    yu,
    Hl
  );
}
function nr(e, t, n, o, r) {
  if (!ce(e))
    return we.NODE_ENV !== "production" && console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const s = r.get(e);
  if (s)
    return s;
  const i = vu(e);
  if (i === 0)
    return e;
  const l = new Proxy(
    e,
    i === 2 ? o : n
  );
  return r.set(e, l), l;
}
function at(e) {
  return Ht(e) ? at(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Ht(e) {
  return !!(e && e.__v_isReadonly);
}
function Fo(e) {
  return !!(e && e.__v_isShallow);
}
function Uo(e) {
  return at(e) || Ht(e);
}
function z(e) {
  const t = e && e.__v_raw;
  return t ? z(t) : e;
}
function bt(e) {
  return jo(e, "__v_skip", !0), e;
}
const Bn = (e) => ce(e) ? Zn(e) : e, Ss = (e) => ce(e) ? Wl(e) : e;
class ql {
  constructor(t, n, o, r) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new vs(
      () => t(this._value),
      () => No(this, 1),
      () => this.dep && Tl(this.dep)
    ), this.effect.computed = this, this.effect.active = this._cacheable = !r, this.__v_isReadonly = o;
  }
  get value() {
    const t = z(this);
    return (!t._cacheable || t.effect.dirty) && Ut(t._value, t._value = t.effect.run()) && No(t, 2), Kl(t), t.effect._dirtyLevel >= 1 && No(t, 1), t._value;
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
function Nu(e, t, n = !1) {
  let o, r;
  const s = K(e);
  s ? (o = e, r = we.NODE_ENV !== "production" ? () => {
    console.warn("Write operation failed: computed value is readonly");
  } : ve) : (o = e.get, r = e.set);
  const i = new ql(o, r, s || !r, n);
  return we.NODE_ENV !== "production" && t && !n && (i.effect.onTrack = t.onTrack, i.effect.onTrigger = t.onTrigger), i;
}
function Kl(e) {
  Lt && tn && (e = z(e), Cl(
    tn,
    e.dep || (e.dep = Al(
      () => e.dep = void 0,
      e instanceof ql ? e : void 0
    )),
    we.NODE_ENV !== "production" ? {
      target: e,
      type: "get",
      key: "value"
    } : void 0
  ));
}
function No(e, t = 2, n) {
  e = z(e);
  const o = e.dep;
  o && $l(
    o,
    t,
    we.NODE_ENV !== "production" ? {
      target: e,
      type: "set",
      key: "value",
      newValue: n
    } : void 0
  );
}
function _e(e) {
  return !!(e && e.__v_isRef === !0);
}
function $e(e) {
  return zl(e, !1);
}
function wu(e) {
  return zl(e, !0);
}
function zl(e, t) {
  return _e(e) ? e : new Ou(e, t);
}
class Ou {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : z(t), this._value = n ? t : Bn(t);
  }
  get value() {
    return Kl(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Fo(t) || Ht(t);
    t = n ? t : z(t), Ut(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : Bn(t), No(this, 2, t));
  }
}
function le(e) {
  return _e(e) ? e.value : e;
}
const Su = {
  get: (e, t, n) => le(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const r = e[t];
    return _e(r) && !_e(n) ? (r.value = n, !0) : Reflect.set(e, t, n, o);
  }
};
function Gl(e) {
  return at(e) ? e : new Proxy(e, Su);
}
function Lr(e) {
  we.NODE_ENV !== "production" && !Uo(e) && console.warn("toRefs() expects a reactive object but received a plain one.");
  const t = q(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = Jl(e, n);
  return t;
}
class xu {
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
    return ou(z(this._object), this._key);
  }
}
class Ru {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0;
  }
  get value() {
    return this._getter();
  }
}
function yr(e, t, n) {
  return _e(e) ? e : K(e) ? new Ru(e) : ce(e) && arguments.length > 1 ? Jl(e, t, n) : $e(e);
}
function Jl(e, t, n) {
  const o = e[t];
  return _e(o) ? o : new xu(e, t, n);
}
var g = {};
const on = [];
function wo(e) {
  on.push(e);
}
function Oo() {
  on.pop();
}
function $(e, ...t) {
  qt();
  const n = on.length ? on[on.length - 1].component : null, o = n && n.appContext.config.warnHandler, r = Pu();
  if (o)
    vt(
      o,
      n,
      11,
      [
        e + t.join(""),
        n && n.proxy,
        r.map(
          ({ vnode: s }) => `at <${ar(n, s.type)}>`
        ).join(`
`),
        r
      ]
    );
  else {
    const s = [`[Vue warn]: ${e}`, ...t];
    r.length && s.push(`
`, ...Du(r)), console.warn(...s);
  }
  Kt();
}
function Pu() {
  let e = on[on.length - 1];
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
function Du(e) {
  const t = [];
  return e.forEach((n, o) => {
    t.push(...o === 0 ? [] : [`
`], ...Cu(n));
  }), t;
}
function Cu({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", o = e.component ? e.component.parent == null : !1, r = ` at <${ar(
    e.component,
    e.type,
    o
  )}`, s = ">" + n;
  return e.props ? [r, ...$u(e.props), s] : [r + s];
}
function $u(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((o) => {
    t.push(...Yl(o, e[o]));
  }), n.length > 3 && t.push(" ..."), t;
}
function Yl(e, t, n) {
  return ye(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : _e(t) ? (t = Yl(e, z(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : K(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = z(t), n ? t : [`${e}=`, t]);
}
const xs = {
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
function vt(e, t, n, o) {
  let r;
  try {
    r = o ? e(...o) : e();
  } catch (s) {
    eo(s, t, n);
  }
  return r;
}
function et(e, t, n, o) {
  if (K(e)) {
    const s = vt(e, t, n, o);
    return s && gs(s) && s.catch((i) => {
      eo(i, t, n);
    }), s;
  }
  const r = [];
  for (let s = 0; s < e.length; s++)
    r.push(et(e[s], t, n, o));
  return r;
}
function eo(e, t, n, o = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let s = t.parent;
    const i = t.proxy, l = g.NODE_ENV !== "production" ? xs[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; s; ) {
      const f = s.ec;
      if (f) {
        for (let u = 0; u < f.length; u++)
          if (f[u](e, i, l) === !1)
            return;
      }
      s = s.parent;
    }
    const c = t.appContext.config.errorHandler;
    if (c) {
      vt(
        c,
        null,
        10,
        [e, i, l]
      );
      return;
    }
  }
  Tu(e, n, r, o);
}
function Tu(e, t, n, o = !0) {
  if (g.NODE_ENV !== "production") {
    const r = xs[t];
    if (n && wo(n), $(`Unhandled error${r ? ` during execution of ${r}` : ""}`), n && Oo(), o)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let Wn = !1, Mr = !1;
const Ie = [];
let st = 0;
const yn = [];
let Et = null, $t = 0;
const Xl = /* @__PURE__ */ Promise.resolve();
let Rs = null;
const Au = 100;
function Ho(e) {
  const t = Rs || Xl;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Vu(e) {
  let t = st + 1, n = Ie.length;
  for (; t < n; ) {
    const o = t + n >>> 1, r = Ie[o], s = qn(r);
    s < e || s === e && r.pre ? t = o + 1 : n = o;
  }
  return t;
}
function or(e) {
  (!Ie.length || !Ie.includes(
    e,
    Wn && e.allowRecurse ? st + 1 : st
  )) && (e.id == null ? Ie.push(e) : Ie.splice(Vu(e.id), 0, e), Ql());
}
function Ql() {
  !Wn && !Mr && (Mr = !0, Rs = Xl.then(tc));
}
function Iu(e) {
  const t = Ie.indexOf(e);
  t > st && Ie.splice(t, 1);
}
function Zl(e) {
  q(e) ? yn.push(...e) : (!Et || !Et.includes(
    e,
    e.allowRecurse ? $t + 1 : $t
  )) && yn.push(e), Ql();
}
function pi(e, t, n = Wn ? st + 1 : 0) {
  for (g.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()); n < Ie.length; n++) {
    const o = Ie[n];
    if (o && o.pre) {
      if (e && o.id !== e.uid || g.NODE_ENV !== "production" && Ps(t, o))
        continue;
      Ie.splice(n, 1), n--, o();
    }
  }
}
function ec(e) {
  if (yn.length) {
    const t = [...new Set(yn)].sort(
      (n, o) => qn(n) - qn(o)
    );
    if (yn.length = 0, Et) {
      Et.push(...t);
      return;
    }
    for (Et = t, g.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), $t = 0; $t < Et.length; $t++)
      g.NODE_ENV !== "production" && Ps(e, Et[$t]) || Et[$t]();
    Et = null, $t = 0;
  }
}
const qn = (e) => e.id == null ? 1 / 0 : e.id, ku = (e, t) => {
  const n = qn(e) - qn(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function tc(e) {
  Mr = !1, Wn = !0, g.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), Ie.sort(ku);
  const t = g.NODE_ENV !== "production" ? (n) => Ps(e, n) : ve;
  try {
    for (st = 0; st < Ie.length; st++) {
      const n = Ie[st];
      if (n && n.active !== !1) {
        if (g.NODE_ENV !== "production" && t(n))
          continue;
        vt(n, null, 14);
      }
    }
  } finally {
    st = 0, Ie.length = 0, ec(e), Wn = !1, Rs = null, (Ie.length || yn.length) && tc(e);
  }
}
function Ps(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > Au) {
      const o = t.ownerInstance, r = o && Us(o.type);
      return eo(
        `Maximum recursive updates exceeded${r ? ` in component <${r}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
        null,
        10
      ), !0;
    } else
      e.set(t, n + 1);
  }
}
let rn = !1;
const hn = /* @__PURE__ */ new Set();
g.NODE_ENV !== "production" && (ys().__VUE_HMR_RUNTIME__ = {
  createRecord: br(nc),
  rerender: br(Mu),
  reload: br(Fu)
});
const an = /* @__PURE__ */ new Map();
function ju(e) {
  const t = e.type.__hmrId;
  let n = an.get(t);
  n || (nc(t, e.type), n = an.get(t)), n.instances.add(e);
}
function Lu(e) {
  an.get(e.type.__hmrId).instances.delete(e);
}
function nc(e, t) {
  return an.has(e) ? !1 : (an.set(e, {
    initialDef: jn(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function jn(e) {
  return Vc(e) ? e.__vccOpts : e;
}
function Mu(e, t) {
  const n = an.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((o) => {
    t && (o.render = t, jn(o.type).render = t), o.renderCache = [], rn = !0, o.effect.dirty = !0, o.update(), rn = !1;
  }));
}
function Fu(e, t) {
  const n = an.get(e);
  if (!n)
    return;
  t = jn(t), hi(n.initialDef, t);
  const o = [...n.instances];
  for (const r of o) {
    const s = jn(r.type);
    hn.has(s) || (s !== n.initialDef && hi(s, t), hn.add(s)), r.appContext.propsCache.delete(r.type), r.appContext.emitsCache.delete(r.type), r.appContext.optionsCache.delete(r.type), r.ceReload ? (hn.add(s), r.ceReload(t.styles), hn.delete(s)) : r.parent ? (r.parent.effect.dirty = !0, or(r.parent.update)) : r.appContext.reload ? r.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    );
  }
  Zl(() => {
    for (const r of o)
      hn.delete(
        jn(r.type)
      );
  });
}
function hi(e, t) {
  Ee(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function br(e) {
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
let it, Vn = [], Fr = !1;
function to(e, ...t) {
  it ? it.emit(e, ...t) : Fr || Vn.push({ event: e, args: t });
}
function oc(e, t) {
  var n, o;
  it = e, it ? (it.enabled = !0, Vn.forEach(({ event: r, args: s }) => it.emit(r, ...s)), Vn = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  !((o = (n = window.navigator) == null ? void 0 : n.userAgent) != null && o.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((s) => {
    oc(s, t);
  }), setTimeout(() => {
    it || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, Fr = !0, Vn = []);
  }, 3e3)) : (Fr = !0, Vn = []);
}
function Uu(e, t) {
  to("app:init", e, t, {
    Fragment: Ue,
    Text: no,
    Comment: Ge,
    Static: Po
  });
}
function Hu(e) {
  to("app:unmount", e);
}
const Bu = /* @__PURE__ */ Ds(
  "component:added"
  /* COMPONENT_ADDED */
), rc = /* @__PURE__ */ Ds(
  "component:updated"
  /* COMPONENT_UPDATED */
), Wu = /* @__PURE__ */ Ds(
  "component:removed"
  /* COMPONENT_REMOVED */
), qu = (e) => {
  it && typeof it.cleanupBuffer == "function" && // remove the component if it wasn't buffered
  !it.cleanupBuffer(e) && Wu(e);
};
function Ds(e) {
  return (t) => {
    to(
      e,
      t.appContext.app,
      t.uid,
      t.parent ? t.parent.uid : void 0,
      t
    );
  };
}
const Ku = /* @__PURE__ */ sc(
  "perf:start"
  /* PERFORMANCE_START */
), zu = /* @__PURE__ */ sc(
  "perf:end"
  /* PERFORMANCE_END */
);
function sc(e) {
  return (t, n, o) => {
    to(e, t.appContext.app, t.uid, t, n, o);
  };
}
function Gu(e, t, n) {
  to(
    "component:emit",
    e.appContext.app,
    e,
    t,
    n
  );
}
function Ju(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const o = e.vnode.props || de;
  if (g.NODE_ENV !== "production") {
    const {
      emitsOptions: u,
      propsOptions: [a]
    } = e;
    if (u)
      if (!(t in u))
        (!a || !(Yt(t) in a)) && $(
          `Component emitted event "${t}" but it is neither declared in the emits option nor as an "${Yt(t)}" prop.`
        );
      else {
        const p = u[t];
        K(p) && (p(...n) || $(
          `Invalid event arguments: event validation failed for event "${t}".`
        ));
      }
  }
  let r = n;
  const s = t.startsWith("update:"), i = s && t.slice(7);
  if (i && i in o) {
    const u = `${i === "modelValue" ? "model" : i}Modifiers`, { number: a, trim: p } = o[u] || de;
    p && (r = n.map((m) => ye(m) ? m.trim() : m)), a && (r = n.map(Ua));
  }
  if (g.NODE_ENV !== "production" && Gu(e, t, r), g.NODE_ENV !== "production") {
    const u = t.toLowerCase();
    u !== t && o[Yt(u)] && $(
      `Event "${u}" is emitted in component ${ar(
        e,
        e.type
      )} but the handler is registered for "${t}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${Ft(
        t
      )}" instead of "${t}".`
    );
  }
  let l, c = o[l = Yt(t)] || // also try camelCase event handler (#2249)
  o[l = Yt(dt(t))];
  !c && s && (c = o[l = Yt(Ft(t))]), c && et(
    c,
    e,
    6,
    r
  );
  const f = o[l + "Once"];
  if (f) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, et(
      f,
      e,
      6,
      r
    );
  }
}
function ic(e, t, n = !1) {
  const o = t.emitsCache, r = o.get(e);
  if (r !== void 0)
    return r;
  const s = e.emits;
  let i = {}, l = !1;
  if (!K(e)) {
    const c = (f) => {
      const u = ic(f, t, !0);
      u && (l = !0, Ee(i, u));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !s && !l ? (ce(e) && o.set(e, null), null) : (q(s) ? s.forEach((c) => i[c] = null) : Ee(i, s), ce(e) && o.set(e, i), i);
}
function rr(e, t) {
  return !e || !Qn(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), te(e, t[0].toLowerCase() + t.slice(1)) || te(e, Ft(t)) || te(e, t));
}
let Re = null, sr = null;
function Bo(e) {
  const t = Re;
  return Re = e, sr = e && e.type.__scopeId || null, t;
}
function lc(e) {
  sr = e;
}
function cc() {
  sr = null;
}
function It(e, t = Re, n) {
  if (!t || e._n)
    return e;
  const o = (...r) => {
    o._d && Ri(-1);
    const s = Bo(t);
    let i;
    try {
      i = e(...r);
    } finally {
      Bo(s), o._d && Ri(1);
    }
    return g.NODE_ENV !== "production" && rc(t), i;
  };
  return o._n = !0, o._c = !0, o._d = !0, o;
}
let Ur = !1;
function Wo() {
  Ur = !0;
}
function vr(e) {
  const {
    type: t,
    vnode: n,
    proxy: o,
    withProxy: r,
    props: s,
    propsOptions: [i],
    slots: l,
    attrs: c,
    emit: f,
    render: u,
    renderCache: a,
    data: p,
    setupState: m,
    ctx: _,
    inheritAttrs: v
  } = e;
  let A, P;
  const M = Bo(e);
  g.NODE_ENV !== "production" && (Ur = !1);
  try {
    if (n.shapeFlag & 4) {
      const re = r || o, pe = g.NODE_ENV !== "production" && m.__isScriptSetup ? new Proxy(re, {
        get(D, Pe, fe) {
          return $(
            `Property '${String(
              Pe
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          ), Reflect.get(D, Pe, fe);
        }
      }) : re;
      A = Qe(
        u.call(
          pe,
          re,
          a,
          s,
          m,
          p,
          _
        )
      ), P = c;
    } else {
      const re = t;
      g.NODE_ENV !== "production" && c === s && Wo(), A = Qe(
        re.length > 1 ? re(
          s,
          g.NODE_ENV !== "production" ? {
            get attrs() {
              return Wo(), c;
            },
            slots: l,
            emit: f
          } : { attrs: c, slots: l, emit: f }
        ) : re(
          s,
          null
          /* we know it doesn't need it */
        )
      ), P = t.props ? c : Yu(c);
    }
  } catch (re) {
    Mn.length = 0, eo(re, e, 1), A = be(Ge);
  }
  let U = A, Y;
  if (g.NODE_ENV !== "production" && A.patchFlag > 0 && A.patchFlag & 2048 && ([U, Y] = ac(A)), P && v !== !1) {
    const re = Object.keys(P), { shapeFlag: pe } = U;
    if (re.length) {
      if (pe & 7)
        i && re.some(ko) && (P = Xu(
          P,
          i
        )), U = Bt(U, P);
      else if (g.NODE_ENV !== "production" && !Ur && U.type !== Ge) {
        const D = Object.keys(c), Pe = [], fe = [];
        for (let L = 0, k = D.length; L < k; L++) {
          const ee = D[L];
          Qn(ee) ? ko(ee) || Pe.push(ee[2].toLowerCase() + ee.slice(3)) : fe.push(ee);
        }
        fe.length && $(
          `Extraneous non-props attributes (${fe.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes.`
        ), Pe.length && $(
          `Extraneous non-emits event listeners (${Pe.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
        );
      }
    }
  }
  return n.dirs && (g.NODE_ENV !== "production" && !mi(U) && $(
    "Runtime directive used on component with non-element root node. The directives will not function as intended."
  ), U = Bt(U), U.dirs = U.dirs ? U.dirs.concat(n.dirs) : n.dirs), n.transition && (g.NODE_ENV !== "production" && !mi(U) && $(
    "Component inside <Transition> renders non-element root node that cannot be animated."
  ), U.transition = n.transition), g.NODE_ENV !== "production" && Y ? Y(U) : A = U, Bo(M), A;
}
const ac = (e) => {
  const t = e.children, n = e.dynamicChildren, o = Cs(t, !1);
  if (o) {
    if (g.NODE_ENV !== "production" && o.patchFlag > 0 && o.patchFlag & 2048)
      return ac(o);
  } else
    return [e, void 0];
  const r = t.indexOf(o), s = n ? n.indexOf(o) : -1, i = (l) => {
    t[r] = l, n && (s > -1 ? n[s] = l : l.patchFlag > 0 && (e.dynamicChildren = [...n, l]));
  };
  return [Qe(o), i];
};
function Cs(e, t = !0) {
  let n;
  for (let o = 0; o < e.length; o++) {
    const r = e[o];
    if (vn(r)) {
      if (r.type !== Ge || r.children === "v-if") {
        if (n)
          return;
        if (n = r, g.NODE_ENV !== "production" && t && n.patchFlag > 0 && n.patchFlag & 2048)
          return Cs(n.children);
      }
    } else
      return;
  }
  return n;
}
const Yu = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Qn(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Xu = (e, t) => {
  const n = {};
  for (const o in e)
    (!ko(o) || !(o.slice(9) in t)) && (n[o] = e[o]);
  return n;
}, mi = (e) => e.shapeFlag & 7 || e.type === Ge;
function Qu(e, t, n) {
  const { props: o, children: r, component: s } = e, { props: i, children: l, patchFlag: c } = t, f = s.emitsOptions;
  if (g.NODE_ENV !== "production" && (r || l) && rn || t.dirs || t.transition)
    return !0;
  if (n && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return o ? gi(o, i, f) : !!i;
    if (c & 8) {
      const u = t.dynamicProps;
      for (let a = 0; a < u.length; a++) {
        const p = u[a];
        if (i[p] !== o[p] && !rr(f, p))
          return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable) ? !0 : o === i ? !1 : o ? i ? gi(o, i, f) : !0 : !!i;
  return !1;
}
function gi(e, t, n) {
  const o = Object.keys(t);
  if (o.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < o.length; r++) {
    const s = o[r];
    if (t[s] !== e[s] && !rr(n, s))
      return !0;
  }
  return !1;
}
function Zu({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.el = e.el), o === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const Hr = "components";
function $s(e, t) {
  return tf(Hr, e, !0, t) || e;
}
const ef = Symbol.for("v-ndc");
function tf(e, t, n = !0, o = !1) {
  const r = Re || Ne;
  if (r) {
    const s = r.type;
    if (e === Hr) {
      const l = Us(
        s,
        !1
      );
      if (l && (l === t || l === dt(t) || l === cn(dt(t))))
        return s;
    }
    const i = (
      // local registration
      // check instance[type] first which is resolved for options API
      _i(r[e] || s[e], t) || // global registration
      _i(r.appContext[e], t)
    );
    if (!i && o)
      return s;
    if (g.NODE_ENV !== "production" && n && !i) {
      const l = e === Hr ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : "";
      $(`Failed to resolve ${e.slice(0, -1)}: ${t}${l}`);
    }
    return i;
  } else
    g.NODE_ENV !== "production" && $(
      `resolve${cn(e.slice(0, -1))} can only be used in render() or setup().`
    );
}
function _i(e, t) {
  return e && (e[t] || e[dt(t)] || e[cn(dt(t))]);
}
const nf = (e) => e.__isSuspense;
function of(e, t) {
  t && t.pendingBranch ? q(e) ? t.effects.push(...e) : t.effects.push(e) : Zl(e);
}
const rf = Symbol.for("v-scx"), sf = () => {
  {
    const e = ut(rf);
    return e || g.NODE_ENV !== "production" && $(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
};
function lf(e, t) {
  return Ts(e, null, t);
}
const go = {};
function Mt(e, t, n) {
  return g.NODE_ENV !== "production" && !K(t) && $(
    "`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."
  ), Ts(e, t, n);
}
function Ts(e, t, {
  immediate: n,
  deep: o,
  flush: r,
  once: s,
  onTrack: i,
  onTrigger: l
} = de) {
  if (t && s) {
    const D = t;
    t = (...Pe) => {
      D(...Pe), pe();
    };
  }
  g.NODE_ENV !== "production" && o !== void 0 && typeof o == "number" && $(
    'watch() "deep" option with number value will be used as watch depth in future versions. Please use a boolean instead to avoid potential breakage.'
  ), g.NODE_ENV !== "production" && !t && (n !== void 0 && $(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), o !== void 0 && $(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), s !== void 0 && $(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const c = (D) => {
    $(
      "Invalid watch source: ",
      D,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, f = Ne, u = (D) => o === !0 ? D : (
    // for deep: false, only traverse root-level properties
    gn(D, o === !1 ? 1 : void 0)
  );
  let a, p = !1, m = !1;
  if (_e(e) ? (a = () => e.value, p = Fo(e)) : at(e) ? (a = () => u(e), p = !0) : q(e) ? (m = !0, p = e.some((D) => at(D) || Fo(D)), a = () => e.map((D) => {
    if (_e(D))
      return D.value;
    if (at(D))
      return u(D);
    if (K(D))
      return vt(D, f, 2);
    g.NODE_ENV !== "production" && c(D);
  })) : K(e) ? t ? a = () => vt(e, f, 2) : a = () => (_ && _(), et(
    e,
    f,
    3,
    [v]
  )) : (a = ve, g.NODE_ENV !== "production" && c(e)), t && o) {
    const D = a;
    a = () => gn(D());
  }
  let _, v = (D) => {
    _ = Y.onStop = () => {
      vt(D, f, 4), _ = Y.onStop = void 0;
    };
  }, A;
  if (cr)
    if (v = ve, t ? n && et(t, f, 3, [
      a(),
      m ? [] : void 0,
      v
    ]) : a(), r === "sync") {
      const D = sf();
      A = D.__watcherHandles || (D.__watcherHandles = []);
    } else
      return ve;
  let P = m ? new Array(e.length).fill(go) : go;
  const M = () => {
    if (!(!Y.active || !Y.dirty))
      if (t) {
        const D = Y.run();
        (o || p || (m ? D.some((Pe, fe) => Ut(Pe, P[fe])) : Ut(D, P))) && (_ && _(), et(t, f, 3, [
          D,
          // pass undefined as the old value when it's changed for the first time
          P === go ? void 0 : m && P[0] === go ? [] : P,
          v
        ]), P = D);
      } else
        Y.run();
  };
  M.allowRecurse = !!t;
  let U;
  r === "sync" ? U = M : r === "post" ? U = () => Fe(M, f && f.suspense) : (M.pre = !0, f && (M.id = f.uid), U = () => or(M));
  const Y = new vs(a, ve, U), re = Rl(), pe = () => {
    Y.stop(), re && ms(re.effects, Y);
  };
  return g.NODE_ENV !== "production" && (Y.onTrack = i, Y.onTrigger = l), t ? n ? M() : P = Y.run() : r === "post" ? Fe(
    Y.run.bind(Y),
    f && f.suspense
  ) : Y.run(), A && A.push(pe), pe;
}
function cf(e, t, n) {
  const o = this.proxy, r = ye(e) ? e.includes(".") ? uc(o, e) : () => o[e] : e.bind(o, o);
  let s;
  K(t) ? s = t : (s = t.handler, n = t);
  const i = oo(this), l = Ts(r, s.bind(o), n);
  return i(), l;
}
function uc(e, t) {
  const n = t.split(".");
  return () => {
    let o = e;
    for (let r = 0; r < n.length && o; r++)
      o = o[n[r]];
    return o;
  };
}
function gn(e, t, n = 0, o) {
  if (!ce(e) || e.__v_skip)
    return e;
  if (t && t > 0) {
    if (n >= t)
      return e;
    n++;
  }
  if (o = o || /* @__PURE__ */ new Set(), o.has(e))
    return e;
  if (o.add(e), _e(e))
    gn(e.value, t, n, o);
  else if (q(e))
    for (let r = 0; r < e.length; r++)
      gn(e[r], t, n, o);
  else if (bl(e) || en(e))
    e.forEach((r) => {
      gn(r, t, n, o);
    });
  else if (Nl(e))
    for (const r in e)
      gn(e[r], t, n, o);
  return e;
}
function fc(e) {
  La(e) && $("Do not use built-in directive ids as custom directive id: " + e);
}
function Gt(e, t, n, o) {
  const r = e.dirs, s = t && t.dirs;
  for (let i = 0; i < r.length; i++) {
    const l = r[i];
    s && (l.oldValue = s[i].value);
    let c = l.dir[o];
    c && (qt(), et(c, n, 8, [
      e.el,
      l,
      e,
      t
    ]), Kt());
  }
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function dc(e, t) {
  return K(e) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Ee({ name: e.name }, t, { setup: e })
  ) : e;
}
const Ln = (e) => !!e.type.__asyncLoader, As = (e) => e.type.__isKeepAlive;
function af(e, t) {
  pc(e, "a", t);
}
function uf(e, t) {
  pc(e, "da", t);
}
function pc(e, t, n = Ne) {
  const o = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (ir(t, o, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      As(r.parent.vnode) && ff(o, t, n, r), r = r.parent;
  }
}
function ff(e, t, n, o) {
  const r = ir(
    t,
    e,
    o,
    !0
    /* prepend */
  );
  mc(() => {
    ms(o[t], r);
  }, n);
}
function ir(e, t, n = Ne, o = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...i) => {
      if (n.isUnmounted)
        return;
      qt();
      const l = oo(n), c = et(t, n, e, i);
      return l(), Kt(), c;
    });
    return o ? r.unshift(s) : r.push(s), s;
  } else if (g.NODE_ENV !== "production") {
    const r = Yt(xs[e].replace(/ hook$/, ""));
    $(
      `${r} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const Ot = (e) => (t, n = Ne) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!cr || e === "sp") && ir(e, (...o) => t(...o), n)
), df = Ot("bm"), hc = Ot("m"), pf = Ot("bu"), hf = Ot("u"), mf = Ot("bum"), mc = Ot("um"), gf = Ot("sp"), _f = Ot(
  "rtg"
), Ef = Ot(
  "rtc"
);
function yf(e, t = Ne) {
  ir("ec", e, t);
}
function gc(e, t, n, o) {
  let r;
  const s = n && n[o];
  if (q(e) || ye(e)) {
    r = new Array(e.length);
    for (let i = 0, l = e.length; i < l; i++)
      r[i] = t(e[i], i, void 0, s && s[i]);
  } else if (typeof e == "number") {
    g.NODE_ENV !== "production" && !Number.isInteger(e) && $(`The v-for range expect an integer value but got ${e}.`), r = new Array(e);
    for (let i = 0; i < e; i++)
      r[i] = t(i + 1, i, void 0, s && s[i]);
  } else if (ce(e))
    if (e[Symbol.iterator])
      r = Array.from(
        e,
        (i, l) => t(i, l, void 0, s && s[l])
      );
    else {
      const i = Object.keys(e);
      r = new Array(i.length);
      for (let l = 0, c = i.length; l < c; l++) {
        const f = i[l];
        r[l] = t(e[f], f, l, s && s[l]);
      }
    }
  else
    r = [];
  return n && (n[o] = r), r;
}
function So(e, t, n = {}, o, r) {
  if (Re.isCE || Re.parent && Ln(Re.parent) && Re.parent.isCE)
    return t !== "default" && (n.name = t), be("slot", n, o && o());
  let s = e[t];
  g.NODE_ENV !== "production" && s && s.length > 1 && ($(
    "SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template."
  ), s = () => []), s && s._c && (s._d = !1), Te();
  const i = s && _c(s(n)), l = js(
    Ue,
    {
      key: n.key || // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      i && i.key || `_${t}`
    },
    i || (o ? o() : []),
    i && e._ === 1 ? 64 : -2
  );
  return !r && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]), s && s._c && (s._d = !0), l;
}
function _c(e) {
  return e.some((t) => vn(t) ? !(t.type === Ge || t.type === Ue && !_c(t.children)) : !0) ? e : null;
}
const Br = (e) => e ? Tc(e) ? Fs(e) || e.proxy : Br(e.parent) : null, sn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Ee(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => g.NODE_ENV !== "production" ? mn(e.props) : e.props,
    $attrs: (e) => g.NODE_ENV !== "production" ? mn(e.attrs) : e.attrs,
    $slots: (e) => g.NODE_ENV !== "production" ? mn(e.slots) : e.slots,
    $refs: (e) => g.NODE_ENV !== "production" ? mn(e.refs) : e.refs,
    $parent: (e) => Br(e.parent),
    $root: (e) => Br(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Is(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      e.effect.dirty = !0, or(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Ho.bind(e.proxy)),
    $watch: (e) => cf.bind(e)
  })
), Vs = (e) => e === "_" || e === "$", Nr = (e, t) => e !== de && !e.__isScriptSetup && te(e, t), Ec = {
  get({ _: e }, t) {
    const { ctx: n, setupState: o, data: r, props: s, accessCache: i, type: l, appContext: c } = e;
    if (g.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let f;
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
        if (Nr(o, t))
          return i[t] = 1, o[t];
        if (r !== de && te(r, t))
          return i[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (f = e.propsOptions[0]) && te(f, t)
        )
          return i[t] = 3, s[t];
        if (n !== de && te(n, t))
          return i[t] = 4, n[t];
        Wr && (i[t] = 0);
      }
    }
    const u = sn[t];
    let a, p;
    if (u)
      return t === "$attrs" ? (Ae(e, "get", t), g.NODE_ENV !== "production" && Wo()) : g.NODE_ENV !== "production" && t === "$slots" && Ae(e, "get", t), u(e);
    if (
      // css module (injected by vue-loader)
      (a = l.__cssModules) && (a = a[t])
    )
      return a;
    if (n !== de && te(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      p = c.config.globalProperties, te(p, t)
    )
      return p[t];
    g.NODE_ENV !== "production" && Re && (!ye(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (r !== de && Vs(t[0]) && te(r, t) ? $(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === Re && $(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: o, setupState: r, ctx: s } = e;
    return Nr(r, t) ? (r[t] = n, !0) : g.NODE_ENV !== "production" && r.__isScriptSetup && te(r, t) ? ($(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : o !== de && te(o, t) ? (o[t] = n, !0) : te(e.props, t) ? (g.NODE_ENV !== "production" && $(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (g.NODE_ENV !== "production" && $(
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
    let l;
    return !!n[i] || e !== de && te(e, i) || Nr(t, i) || (l = s[0]) && te(l, i) || te(o, i) || te(sn, i) || te(r.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : te(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
g.NODE_ENV !== "production" && (Ec.ownKeys = (e) => ($(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function bf(e) {
  const t = {};
  return Object.defineProperty(t, "_", {
    configurable: !0,
    enumerable: !1,
    get: () => e
  }), Object.keys(sn).forEach((n) => {
    Object.defineProperty(t, n, {
      configurable: !0,
      enumerable: !1,
      get: () => sn[n](e),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: ve
    });
  }), t;
}
function vf(e) {
  const {
    ctx: t,
    propsOptions: [n]
  } = e;
  n && Object.keys(n).forEach((o) => {
    Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => e.props[o],
      set: ve
    });
  });
}
function Nf(e) {
  const { ctx: t, setupState: n } = e;
  Object.keys(z(n)).forEach((o) => {
    if (!n.__isScriptSetup) {
      if (Vs(o[0])) {
        $(
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
        set: ve
      });
    }
  });
}
function Ei(e) {
  return q(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function wf() {
  const e = /* @__PURE__ */ Object.create(null);
  return (t, n) => {
    e[n] ? $(`${t} property "${n}" is already defined in ${e[n]}.`) : e[n] = t;
  };
}
let Wr = !0;
function Of(e) {
  const t = Is(e), n = e.proxy, o = e.ctx;
  Wr = !1, t.beforeCreate && yi(t.beforeCreate, e, "bc");
  const {
    // state
    data: r,
    computed: s,
    methods: i,
    watch: l,
    provide: c,
    inject: f,
    // lifecycle
    created: u,
    beforeMount: a,
    mounted: p,
    beforeUpdate: m,
    updated: _,
    activated: v,
    deactivated: A,
    beforeDestroy: P,
    beforeUnmount: M,
    destroyed: U,
    unmounted: Y,
    render: re,
    renderTracked: pe,
    renderTriggered: D,
    errorCaptured: Pe,
    serverPrefetch: fe,
    // public API
    expose: L,
    inheritAttrs: k,
    // assets
    components: ee,
    directives: he,
    filters: tt
  } = t, Le = g.NODE_ENV !== "production" ? wf() : null;
  if (g.NODE_ENV !== "production") {
    const [G] = e.propsOptions;
    if (G)
      for (const W in G)
        Le("Props", W);
  }
  if (f && Sf(f, o, Le), i)
    for (const G in i) {
      const W = i[G];
      K(W) ? (g.NODE_ENV !== "production" ? Object.defineProperty(o, G, {
        value: W.bind(n),
        configurable: !0,
        enumerable: !0,
        writable: !0
      }) : o[G] = W.bind(n), g.NODE_ENV !== "production" && Le("Methods", G)) : g.NODE_ENV !== "production" && $(
        `Method "${G}" has type "${typeof W}" in the component definition. Did you reference the function correctly?`
      );
    }
  if (r) {
    g.NODE_ENV !== "production" && !K(r) && $(
      "The data option must be a function. Plain object usage is no longer supported."
    );
    const G = r.call(n, n);
    if (g.NODE_ENV !== "production" && gs(G) && $(
      "data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>."
    ), !ce(G))
      g.NODE_ENV !== "production" && $("data() should return an object.");
    else if (e.data = Zn(G), g.NODE_ENV !== "production")
      for (const W in G)
        Le("Data", W), Vs(W[0]) || Object.defineProperty(o, W, {
          configurable: !0,
          enumerable: !0,
          get: () => G[W],
          set: ve
        });
  }
  if (Wr = !0, s)
    for (const G in s) {
      const W = s[G], qe = K(W) ? W.bind(n, n) : K(W.get) ? W.get.bind(n, n) : ve;
      g.NODE_ENV !== "production" && qe === ve && $(`Computed property "${G}" has no getter.`);
      const zt = !K(W) && K(W.set) ? W.set.bind(n) : g.NODE_ENV !== "production" ? () => {
        $(
          `Write operation failed: computed property "${G}" is readonly.`
        );
      } : ve, St = xe({
        get: qe,
        set: zt
      });
      Object.defineProperty(o, G, {
        enumerable: !0,
        configurable: !0,
        get: () => St.value,
        set: (nt) => St.value = nt
      }), g.NODE_ENV !== "production" && Le("Computed", G);
    }
  if (l)
    for (const G in l)
      yc(l[G], o, n, G);
  if (c) {
    const G = K(c) ? c.call(n) : c;
    Reflect.ownKeys(G).forEach((W) => {
      xo(W, G[W]);
    });
  }
  u && yi(u, e, "c");
  function Se(G, W) {
    q(W) ? W.forEach((qe) => G(qe.bind(n))) : W && G(W.bind(n));
  }
  if (Se(df, a), Se(hc, p), Se(pf, m), Se(hf, _), Se(af, v), Se(uf, A), Se(yf, Pe), Se(Ef, pe), Se(_f, D), Se(mf, M), Se(mc, Y), Se(gf, fe), q(L))
    if (L.length) {
      const G = e.exposed || (e.exposed = {});
      L.forEach((W) => {
        Object.defineProperty(G, W, {
          get: () => n[W],
          set: (qe) => n[W] = qe
        });
      });
    } else
      e.exposed || (e.exposed = {});
  re && e.render === ve && (e.render = re), k != null && (e.inheritAttrs = k), ee && (e.components = ee), he && (e.directives = he);
}
function Sf(e, t, n = ve) {
  q(e) && (e = qr(e));
  for (const o in e) {
    const r = e[o];
    let s;
    ce(r) ? "default" in r ? s = ut(
      r.from || o,
      r.default,
      !0
    ) : s = ut(r.from || o) : s = ut(r), _e(s) ? Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (i) => s.value = i
    }) : t[o] = s, g.NODE_ENV !== "production" && n("Inject", o);
  }
}
function yi(e, t, n) {
  et(
    q(e) ? e.map((o) => o.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function yc(e, t, n, o) {
  const r = o.includes(".") ? uc(n, o) : () => n[o];
  if (ye(e)) {
    const s = t[e];
    K(s) ? Mt(r, s) : g.NODE_ENV !== "production" && $(`Invalid watch handler specified by key "${e}"`, s);
  } else if (K(e))
    Mt(r, e.bind(n));
  else if (ce(e))
    if (q(e))
      e.forEach((s) => yc(s, t, n, o));
    else {
      const s = K(e.handler) ? e.handler.bind(n) : t[e.handler];
      K(s) ? Mt(r, s, e) : g.NODE_ENV !== "production" && $(`Invalid watch handler specified by key "${e.handler}"`, s);
    }
  else
    g.NODE_ENV !== "production" && $(`Invalid watch option: "${o}"`, e);
}
function Is(e) {
  const t = e.type, { mixins: n, extends: o } = t, {
    mixins: r,
    optionsCache: s,
    config: { optionMergeStrategies: i }
  } = e.appContext, l = s.get(t);
  let c;
  return l ? c = l : !r.length && !n && !o ? c = t : (c = {}, r.length && r.forEach(
    (f) => qo(c, f, i, !0)
  ), qo(c, t, i)), ce(t) && s.set(t, c), c;
}
function qo(e, t, n, o = !1) {
  const { mixins: r, extends: s } = t;
  s && qo(e, s, n, !0), r && r.forEach(
    (i) => qo(e, i, n, !0)
  );
  for (const i in t)
    if (o && i === "expose")
      g.NODE_ENV !== "production" && $(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const l = xf[i] || n && n[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const xf = {
  data: bi,
  props: vi,
  emits: vi,
  // objects
  methods: In,
  computed: In,
  // lifecycle
  beforeCreate: je,
  created: je,
  beforeMount: je,
  mounted: je,
  beforeUpdate: je,
  updated: je,
  beforeDestroy: je,
  beforeUnmount: je,
  destroyed: je,
  unmounted: je,
  activated: je,
  deactivated: je,
  errorCaptured: je,
  serverPrefetch: je,
  // assets
  components: In,
  directives: In,
  // watch
  watch: Pf,
  // provide / inject
  provide: bi,
  inject: Rf
};
function bi(e, t) {
  return t ? e ? function() {
    return Ee(
      K(e) ? e.call(this, this) : e,
      K(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Rf(e, t) {
  return In(qr(e), qr(t));
}
function qr(e) {
  if (q(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function je(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function In(e, t) {
  return e ? Ee(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function vi(e, t) {
  return e ? q(e) && q(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Ee(
    /* @__PURE__ */ Object.create(null),
    Ei(e),
    Ei(t ?? {})
  ) : t;
}
function Pf(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = Ee(/* @__PURE__ */ Object.create(null), e);
  for (const o in t)
    n[o] = je(e[o], t[o]);
  return n;
}
function bc() {
  return {
    app: null,
    config: {
      isNativeTag: yl,
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
let Df = 0;
function Cf(e, t) {
  return function(o, r = null) {
    K(o) || (o = Ee({}, o)), r != null && !ce(r) && (g.NODE_ENV !== "production" && $("root props passed to app.mount() must be an object."), r = null);
    const s = bc(), i = /* @__PURE__ */ new WeakSet();
    let l = !1;
    const c = s.app = {
      _uid: Df++,
      _component: o,
      _props: r,
      _container: null,
      _context: s,
      _instance: null,
      version: $i,
      get config() {
        return s.config;
      },
      set config(f) {
        g.NODE_ENV !== "production" && $(
          "app.config cannot be replaced. Modify individual options instead."
        );
      },
      use(f, ...u) {
        return i.has(f) ? g.NODE_ENV !== "production" && $("Plugin has already been applied to target app.") : f && K(f.install) ? (i.add(f), f.install(c, ...u)) : K(f) ? (i.add(f), f(c, ...u)) : g.NODE_ENV !== "production" && $(
          'A plugin must either be a function or an object with an "install" function.'
        ), c;
      },
      mixin(f) {
        return s.mixins.includes(f) ? g.NODE_ENV !== "production" && $(
          "Mixin has already been applied to target app" + (f.name ? `: ${f.name}` : "")
        ) : s.mixins.push(f), c;
      },
      component(f, u) {
        return g.NODE_ENV !== "production" && Yr(f, s.config), u ? (g.NODE_ENV !== "production" && s.components[f] && $(`Component "${f}" has already been registered in target app.`), s.components[f] = u, c) : s.components[f];
      },
      directive(f, u) {
        return g.NODE_ENV !== "production" && fc(f), u ? (g.NODE_ENV !== "production" && s.directives[f] && $(`Directive "${f}" has already been registered in target app.`), s.directives[f] = u, c) : s.directives[f];
      },
      mount(f, u, a) {
        if (l)
          g.NODE_ENV !== "production" && $(
            "App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`"
          );
        else {
          g.NODE_ENV !== "production" && f.__vue_app__ && $(
            "There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first."
          );
          const p = be(o, r);
          return p.appContext = s, a === !0 ? a = "svg" : a === !1 && (a = void 0), g.NODE_ENV !== "production" && (s.reload = () => {
            e(
              Bt(p),
              f,
              a
            );
          }), u && t ? t(p, f) : e(p, f, a), l = !0, c._container = f, f.__vue_app__ = c, g.NODE_ENV !== "production" && (c._instance = p.component, Uu(c, $i)), Fs(p.component) || p.component.proxy;
        }
      },
      unmount() {
        l ? (e(null, c._container), g.NODE_ENV !== "production" && (c._instance = null, Hu(c)), delete c._container.__vue_app__) : g.NODE_ENV !== "production" && $("Cannot unmount an app that is not mounted.");
      },
      provide(f, u) {
        return g.NODE_ENV !== "production" && f in s.provides && $(
          `App already provides property with key "${String(f)}". It will be overwritten with the new value.`
        ), s.provides[f] = u, c;
      },
      runWithContext(f) {
        Kn = c;
        try {
          return f();
        } finally {
          Kn = null;
        }
      }
    };
    return c;
  };
}
let Kn = null;
function xo(e, t) {
  if (!Ne)
    g.NODE_ENV !== "production" && $("provide() can only be used inside setup().");
  else {
    let n = Ne.provides;
    const o = Ne.parent && Ne.parent.provides;
    o === n && (n = Ne.provides = Object.create(o)), n[e] = t;
  }
}
function ut(e, t, n = !1) {
  const o = Ne || Re;
  if (o || Kn) {
    const r = o ? o.parent == null ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides : Kn._context.provides;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && K(t) ? t.call(o && o.proxy) : t;
    g.NODE_ENV !== "production" && $(`injection "${String(e)}" not found.`);
  } else
    g.NODE_ENV !== "production" && $("inject() can only be used inside setup() or functional components.");
}
function $f() {
  return !!(Ne || Re || Kn);
}
function Tf(e, t, n, o = !1) {
  const r = {}, s = {};
  jo(s, lr, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), vc(e, t, r, s);
  for (const i in e.propsOptions[0])
    i in r || (r[i] = void 0);
  g.NODE_ENV !== "production" && wc(t || {}, r, e), n ? e.props = o ? r : Bl(r) : e.type.props ? e.props = r : e.props = s, e.attrs = s;
}
function Af(e) {
  for (; e; ) {
    if (e.type.__hmrId)
      return !0;
    e = e.parent;
  }
}
function Vf(e, t, n, o) {
  const {
    props: r,
    attrs: s,
    vnode: { patchFlag: i }
  } = e, l = z(r), [c] = e.propsOptions;
  let f = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !(g.NODE_ENV !== "production" && Af(e)) && (o || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const u = e.vnode.dynamicProps;
      for (let a = 0; a < u.length; a++) {
        let p = u[a];
        if (rr(e.emitsOptions, p))
          continue;
        const m = t[p];
        if (c)
          if (te(s, p))
            m !== s[p] && (s[p] = m, f = !0);
          else {
            const _ = dt(p);
            r[_] = Kr(
              c,
              l,
              _,
              m,
              e,
              !1
            );
          }
        else
          m !== s[p] && (s[p] = m, f = !0);
      }
    }
  } else {
    vc(e, t, r, s) && (f = !0);
    let u;
    for (const a in l)
      (!t || // for camelCase
      !te(t, a) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((u = Ft(a)) === a || !te(t, u))) && (c ? n && // for camelCase
      (n[a] !== void 0 || // for kebab-case
      n[u] !== void 0) && (r[a] = Kr(
        c,
        l,
        a,
        void 0,
        e,
        !0
      )) : delete r[a]);
    if (s !== l)
      for (const a in s)
        (!t || !te(t, a)) && (delete s[a], f = !0);
  }
  f && ct(e, "set", "$attrs"), g.NODE_ENV !== "production" && wc(t || {}, r, e);
}
function vc(e, t, n, o) {
  const [r, s] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let c in t) {
      if (vo(c))
        continue;
      const f = t[c];
      let u;
      r && te(r, u = dt(c)) ? !s || !s.includes(u) ? n[u] = f : (l || (l = {}))[u] = f : rr(e.emitsOptions, c) || (!(c in o) || f !== o[c]) && (o[c] = f, i = !0);
    }
  if (s) {
    const c = z(n), f = l || de;
    for (let u = 0; u < s.length; u++) {
      const a = s[u];
      n[a] = Kr(
        r,
        c,
        a,
        f[a],
        e,
        !te(f, a)
      );
    }
  }
  return i;
}
function Kr(e, t, n, o, r, s) {
  const i = e[n];
  if (i != null) {
    const l = te(i, "default");
    if (l && o === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && K(c)) {
        const { propsDefaults: f } = r;
        if (n in f)
          o = f[n];
        else {
          const u = oo(r);
          o = f[n] = c.call(
            null,
            t
          ), u();
        }
      } else
        o = c;
    }
    i[
      0
      /* shouldCast */
    ] && (s && !l ? o = !1 : i[
      1
      /* shouldCastTrue */
    ] && (o === "" || o === Ft(n)) && (o = !0));
  }
  return o;
}
function Nc(e, t, n = !1) {
  const o = t.propsCache, r = o.get(e);
  if (r)
    return r;
  const s = e.props, i = {}, l = [];
  let c = !1;
  if (!K(e)) {
    const u = (a) => {
      c = !0;
      const [p, m] = Nc(a, t, !0);
      Ee(i, p), m && l.push(...m);
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!s && !c)
    return ce(e) && o.set(e, En), En;
  if (q(s))
    for (let u = 0; u < s.length; u++) {
      g.NODE_ENV !== "production" && !ye(s[u]) && $("props must be strings when using array syntax.", s[u]);
      const a = dt(s[u]);
      Ni(a) && (i[a] = de);
    }
  else if (s) {
    g.NODE_ENV !== "production" && !ce(s) && $("invalid props options", s);
    for (const u in s) {
      const a = dt(u);
      if (Ni(a)) {
        const p = s[u], m = i[a] = q(p) || K(p) ? { type: p } : Ee({}, p);
        if (m) {
          const _ = Oi(Boolean, m.type), v = Oi(String, m.type);
          m[
            0
            /* shouldCast */
          ] = _ > -1, m[
            1
            /* shouldCastTrue */
          ] = v < 0 || _ < v, (_ > -1 || te(m, "default")) && l.push(a);
        }
      }
    }
  }
  const f = [i, l];
  return ce(e) && o.set(e, f), f;
}
function Ni(e) {
  return e[0] !== "$" ? !0 : (g.NODE_ENV !== "production" && $(`Invalid prop name: "${e}" is a reserved property.`), !1);
}
function zr(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function wi(e, t) {
  return zr(e) === zr(t);
}
function Oi(e, t) {
  return q(t) ? t.findIndex((n) => wi(n, e)) : K(t) && wi(t, e) ? 0 : -1;
}
function wc(e, t, n) {
  const o = z(t), r = n.propsOptions[0];
  for (const s in r) {
    let i = r[s];
    i != null && If(
      s,
      o[s],
      i,
      g.NODE_ENV !== "production" ? mn(o) : o,
      !te(e, s) && !te(e, Ft(s))
    );
  }
}
function If(e, t, n, o, r) {
  const { type: s, required: i, validator: l, skipCheck: c } = n;
  if (i && r) {
    $('Missing required prop: "' + e + '"');
    return;
  }
  if (!(t == null && !i)) {
    if (s != null && s !== !0 && !c) {
      let f = !1;
      const u = q(s) ? s : [s], a = [];
      for (let p = 0; p < u.length && !f; p++) {
        const { valid: m, expectedType: _ } = jf(t, u[p]);
        a.push(_ || ""), f = m;
      }
      if (!f) {
        $(Lf(e, t, a));
        return;
      }
    }
    l && !l(t, o) && $('Invalid prop: custom validator check failed for prop "' + e + '".');
  }
}
const kf = /* @__PURE__ */ wt(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function jf(e, t) {
  let n;
  const o = zr(t);
  if (kf(o)) {
    const r = typeof e;
    n = r === o.toLowerCase(), !n && r === "object" && (n = e instanceof t);
  } else
    o === "Object" ? n = ce(e) : o === "Array" ? n = q(e) : o === "null" ? n = e === null : n = e instanceof t;
  return {
    valid: n,
    expectedType: o
  };
}
function Lf(e, t, n) {
  if (n.length === 0)
    return `Prop type [] for prop "${e}" won't match anything. Did you mean to use type Array instead?`;
  let o = `Invalid prop: type check failed for prop "${e}". Expected ${n.map(cn).join(" | ")}`;
  const r = n[0], s = _s(t), i = Si(t, r), l = Si(t, s);
  return n.length === 1 && xi(r) && !Mf(r, s) && (o += ` with value ${i}`), o += `, got ${s} `, xi(s) && (o += `with value ${l}.`), o;
}
function Si(e, t) {
  return t === "String" ? `"${e}"` : t === "Number" ? `${Number(e)}` : `${e}`;
}
function xi(e) {
  return ["string", "number", "boolean"].some((n) => e.toLowerCase() === n);
}
function Mf(...e) {
  return e.some((t) => t.toLowerCase() === "boolean");
}
const Oc = (e) => e[0] === "_" || e === "$stable", ks = (e) => q(e) ? e.map(Qe) : [Qe(e)], Ff = (e, t, n) => {
  if (t._n)
    return t;
  const o = It((...r) => (g.NODE_ENV !== "production" && Ne && (!n || n.root === Ne.root) && $(
    `Slot "${e}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
  ), ks(t(...r))), n);
  return o._c = !1, o;
}, Sc = (e, t, n) => {
  const o = e._ctx;
  for (const r in e) {
    if (Oc(r))
      continue;
    const s = e[r];
    if (K(s))
      t[r] = Ff(r, s, o);
    else if (s != null) {
      g.NODE_ENV !== "production" && $(
        `Non-function value encountered for slot "${r}". Prefer function slots for better performance.`
      );
      const i = ks(s);
      t[r] = () => i;
    }
  }
}, xc = (e, t) => {
  g.NODE_ENV !== "production" && !As(e.vnode) && $(
    "Non-function value encountered for default slot. Prefer function slots for better performance."
  );
  const n = ks(t);
  e.slots.default = () => n;
}, Uf = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = z(t), jo(t, "_", n)) : Sc(
      t,
      e.slots = {}
    );
  } else
    e.slots = {}, t && xc(e, t);
  jo(e.slots, lr, 1);
}, Hf = (e, t, n) => {
  const { vnode: o, slots: r } = e;
  let s = !0, i = de;
  if (o.shapeFlag & 32) {
    const l = t._;
    l ? g.NODE_ENV !== "production" && rn ? (Ee(r, t), ct(e, "set", "$slots")) : n && l === 1 ? s = !1 : (Ee(r, t), !n && l === 1 && delete r._) : (s = !t.$stable, Sc(t, r)), i = t;
  } else
    t && (xc(e, t), i = { default: 1 });
  if (s)
    for (const l in r)
      !Oc(l) && i[l] == null && delete r[l];
};
function Gr(e, t, n, o, r = !1) {
  if (q(e)) {
    e.forEach(
      (p, m) => Gr(
        p,
        t && (q(t) ? t[m] : t),
        n,
        o,
        r
      )
    );
    return;
  }
  if (Ln(o) && !r)
    return;
  const s = o.shapeFlag & 4 ? Fs(o.component) || o.component.proxy : o.el, i = r ? null : s, { i: l, r: c } = e;
  if (g.NODE_ENV !== "production" && !l) {
    $(
      "Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function."
    );
    return;
  }
  const f = t && t.r, u = l.refs === de ? l.refs = {} : l.refs, a = l.setupState;
  if (f != null && f !== c && (ye(f) ? (u[f] = null, te(a, f) && (a[f] = null)) : _e(f) && (f.value = null)), K(c))
    vt(c, l, 12, [i, u]);
  else {
    const p = ye(c), m = _e(c), _ = e.f;
    if (p || m) {
      const v = () => {
        if (_) {
          const A = p ? te(a, c) ? a[c] : u[c] : c.value;
          r ? q(A) && ms(A, s) : q(A) ? A.includes(s) || A.push(s) : p ? (u[c] = [s], te(a, c) && (a[c] = u[c])) : (c.value = [s], e.k && (u[e.k] = c.value));
        } else
          p ? (u[c] = i, te(a, c) && (a[c] = i)) : m ? (c.value = i, e.k && (u[e.k] = i)) : g.NODE_ENV !== "production" && $("Invalid template ref type:", c, `(${typeof c})`);
      };
      r || _ ? v() : (v.id = -1, Fe(v, n));
    } else
      g.NODE_ENV !== "production" && $("Invalid template ref type:", c, `(${typeof c})`);
  }
}
let Dn, kt;
function gt(e, t) {
  e.appContext.config.performance && Ko() && kt.mark(`vue-${t}-${e.uid}`), g.NODE_ENV !== "production" && Ku(e, t, Ko() ? kt.now() : Date.now());
}
function _t(e, t) {
  if (e.appContext.config.performance && Ko()) {
    const n = `vue-${t}-${e.uid}`, o = n + ":end";
    kt.mark(o), kt.measure(
      `<${ar(e, e.type)}> ${t}`,
      n,
      o
    ), kt.clearMarks(n), kt.clearMarks(o);
  }
  g.NODE_ENV !== "production" && zu(e, t, Ko() ? kt.now() : Date.now());
}
function Ko() {
  return Dn !== void 0 || (typeof window < "u" && window.performance ? (Dn = !0, kt = window.performance) : Dn = !1), Dn;
}
function Bf() {
  const e = [];
  if (g.NODE_ENV !== "production" && e.length) {
    const t = e.length > 1;
    console.warn(
      `Feature flag${t ? "s" : ""} ${e.join(", ")} ${t ? "are" : "is"} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
    );
  }
}
const Fe = of;
function Wf(e) {
  return qf(e);
}
function qf(e, t) {
  Bf();
  const n = ys();
  n.__VUE__ = !0, g.NODE_ENV !== "production" && oc(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n);
  const {
    insert: o,
    remove: r,
    patchProp: s,
    createElement: i,
    createText: l,
    createComment: c,
    setText: f,
    setElementText: u,
    parentNode: a,
    nextSibling: p,
    setScopeId: m = ve,
    insertStaticContent: _
  } = e, v = (d, h, E, b = null, O = null, R = null, T = void 0, x = null, C = g.NODE_ENV !== "production" && rn ? !1 : !!h.dynamicChildren) => {
    if (d === h)
      return;
    d && !Cn(d, h) && (b = I(d), Ke(d, O, R, !0), d = null), h.patchFlag === -2 && (C = !1, h.dynamicChildren = null);
    const { type: S, ref: j, shapeFlag: B } = h;
    switch (S) {
      case no:
        A(d, h, E, b);
        break;
      case Ge:
        P(d, h, E, b);
        break;
      case Po:
        d == null ? M(h, E, b, T) : g.NODE_ENV !== "production" && U(d, h, E, T);
        break;
      case Ue:
        he(
          d,
          h,
          E,
          b,
          O,
          R,
          T,
          x,
          C
        );
        break;
      default:
        B & 1 ? pe(
          d,
          h,
          E,
          b,
          O,
          R,
          T,
          x,
          C
        ) : B & 6 ? tt(
          d,
          h,
          E,
          b,
          O,
          R,
          T,
          x,
          C
        ) : B & 64 || B & 128 ? S.process(
          d,
          h,
          E,
          b,
          O,
          R,
          T,
          x,
          C,
          Z
        ) : g.NODE_ENV !== "production" && $("Invalid VNode type:", S, `(${typeof S})`);
    }
    j != null && O && Gr(j, d && d.ref, R, h || d, !h);
  }, A = (d, h, E, b) => {
    if (d == null)
      o(
        h.el = l(h.children),
        E,
        b
      );
    else {
      const O = h.el = d.el;
      h.children !== d.children && f(O, h.children);
    }
  }, P = (d, h, E, b) => {
    d == null ? o(
      h.el = c(h.children || ""),
      E,
      b
    ) : h.el = d.el;
  }, M = (d, h, E, b) => {
    [d.el, d.anchor] = _(
      d.children,
      h,
      E,
      b,
      d.el,
      d.anchor
    );
  }, U = (d, h, E, b) => {
    if (h.children !== d.children) {
      const O = p(d.anchor);
      re(d), [h.el, h.anchor] = _(
        h.children,
        E,
        O,
        b
      );
    } else
      h.el = d.el, h.anchor = d.anchor;
  }, Y = ({ el: d, anchor: h }, E, b) => {
    let O;
    for (; d && d !== h; )
      O = p(d), o(d, E, b), d = O;
    o(h, E, b);
  }, re = ({ el: d, anchor: h }) => {
    let E;
    for (; d && d !== h; )
      E = p(d), r(d), d = E;
    r(h);
  }, pe = (d, h, E, b, O, R, T, x, C) => {
    h.type === "svg" ? T = "svg" : h.type === "math" && (T = "mathml"), d == null ? D(
      h,
      E,
      b,
      O,
      R,
      T,
      x,
      C
    ) : L(
      d,
      h,
      O,
      R,
      T,
      x,
      C
    );
  }, D = (d, h, E, b, O, R, T, x) => {
    let C, S;
    const { props: j, shapeFlag: B, transition: H, dirs: J } = d;
    if (C = d.el = i(
      d.type,
      R,
      j && j.is,
      j
    ), B & 8 ? u(C, d.children) : B & 16 && fe(
      d.children,
      C,
      null,
      b,
      O,
      wr(d, R),
      T,
      x
    ), J && Gt(d, null, b, "created"), Pe(C, d, d.scopeId, T, b), j) {
      for (const ae in j)
        ae !== "value" && !vo(ae) && s(
          C,
          ae,
          null,
          j[ae],
          R,
          d.children,
          b,
          O,
          y
        );
      "value" in j && s(C, "value", null, j.value, R), (S = j.onVnodeBeforeMount) && rt(S, b, d);
    }
    g.NODE_ENV !== "production" && (Object.defineProperty(C, "__vnode", {
      value: d,
      enumerable: !1
    }), Object.defineProperty(C, "__vueParentComponent", {
      value: b,
      enumerable: !1
    })), J && Gt(d, null, b, "beforeMount");
    const ne = Kf(O, H);
    ne && H.beforeEnter(C), o(C, h, E), ((S = j && j.onVnodeMounted) || ne || J) && Fe(() => {
      S && rt(S, b, d), ne && H.enter(C), J && Gt(d, null, b, "mounted");
    }, O);
  }, Pe = (d, h, E, b, O) => {
    if (E && m(d, E), b)
      for (let R = 0; R < b.length; R++)
        m(d, b[R]);
    if (O) {
      let R = O.subTree;
      if (g.NODE_ENV !== "production" && R.patchFlag > 0 && R.patchFlag & 2048 && (R = Cs(R.children) || R), h === R) {
        const T = O.vnode;
        Pe(
          d,
          T,
          T.scopeId,
          T.slotScopeIds,
          O.parent
        );
      }
    }
  }, fe = (d, h, E, b, O, R, T, x, C = 0) => {
    for (let S = C; S < d.length; S++) {
      const j = d[S] = x ? Tt(d[S]) : Qe(d[S]);
      v(
        null,
        j,
        h,
        E,
        b,
        O,
        R,
        T,
        x
      );
    }
  }, L = (d, h, E, b, O, R, T) => {
    const x = h.el = d.el;
    let { patchFlag: C, dynamicChildren: S, dirs: j } = h;
    C |= d.patchFlag & 16;
    const B = d.props || de, H = h.props || de;
    let J;
    if (E && Jt(E, !1), (J = H.onVnodeBeforeUpdate) && rt(J, E, h, d), j && Gt(h, d, E, "beforeUpdate"), E && Jt(E, !0), g.NODE_ENV !== "production" && rn && (C = 0, T = !1, S = null), S ? (k(
      d.dynamicChildren,
      S,
      x,
      E,
      b,
      wr(h, O),
      R
    ), g.NODE_ENV !== "production" && Ro(d, h)) : T || qe(
      d,
      h,
      x,
      null,
      E,
      b,
      wr(h, O),
      R,
      !1
    ), C > 0) {
      if (C & 16)
        ee(
          x,
          h,
          B,
          H,
          E,
          b,
          O
        );
      else if (C & 2 && B.class !== H.class && s(x, "class", null, H.class, O), C & 4 && s(x, "style", B.style, H.style, O), C & 8) {
        const ne = h.dynamicProps;
        for (let ae = 0; ae < ne.length; ae++) {
          const ge = ne[ae], De = B[ge], Ye = H[ge];
          (Ye !== De || ge === "value") && s(
            x,
            ge,
            De,
            Ye,
            O,
            d.children,
            E,
            b,
            y
          );
        }
      }
      C & 1 && d.children !== h.children && u(x, h.children);
    } else
      !T && S == null && ee(
        x,
        h,
        B,
        H,
        E,
        b,
        O
      );
    ((J = H.onVnodeUpdated) || j) && Fe(() => {
      J && rt(J, E, h, d), j && Gt(h, d, E, "updated");
    }, b);
  }, k = (d, h, E, b, O, R, T) => {
    for (let x = 0; x < h.length; x++) {
      const C = d[x], S = h[x], j = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        C.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (C.type === Ue || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Cn(C, S) || // - In the case of a component, it could contain anything.
        C.shapeFlag & 70) ? a(C.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          E
        )
      );
      v(
        C,
        S,
        j,
        null,
        b,
        O,
        R,
        T,
        !0
      );
    }
  }, ee = (d, h, E, b, O, R, T) => {
    if (E !== b) {
      if (E !== de)
        for (const x in E)
          !vo(x) && !(x in b) && s(
            d,
            x,
            E[x],
            null,
            T,
            h.children,
            O,
            R,
            y
          );
      for (const x in b) {
        if (vo(x))
          continue;
        const C = b[x], S = E[x];
        C !== S && x !== "value" && s(
          d,
          x,
          S,
          C,
          T,
          h.children,
          O,
          R,
          y
        );
      }
      "value" in b && s(d, "value", E.value, b.value, T);
    }
  }, he = (d, h, E, b, O, R, T, x, C) => {
    const S = h.el = d ? d.el : l(""), j = h.anchor = d ? d.anchor : l("");
    let { patchFlag: B, dynamicChildren: H, slotScopeIds: J } = h;
    g.NODE_ENV !== "production" && // #5523 dev root fragment may inherit directives
    (rn || B & 2048) && (B = 0, C = !1, H = null), J && (x = x ? x.concat(J) : J), d == null ? (o(S, E, b), o(j, E, b), fe(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      h.children || [],
      E,
      j,
      O,
      R,
      T,
      x,
      C
    )) : B > 0 && B & 64 && H && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    d.dynamicChildren ? (k(
      d.dynamicChildren,
      H,
      E,
      O,
      R,
      T,
      x
    ), g.NODE_ENV !== "production" ? Ro(d, h) : (
      // #2080 if the stable fragment has a key, it's a <template v-for> that may
      //  get moved around. Make sure all root level vnodes inherit el.
      // #2134 or if it's a component root, it may also get moved around
      // as the component is being moved.
      (h.key != null || O && h === O.subTree) && Ro(
        d,
        h,
        !0
        /* shallow */
      )
    )) : qe(
      d,
      h,
      E,
      j,
      O,
      R,
      T,
      x,
      C
    );
  }, tt = (d, h, E, b, O, R, T, x, C) => {
    h.slotScopeIds = x, d == null ? h.shapeFlag & 512 ? O.ctx.activate(
      h,
      E,
      b,
      T,
      C
    ) : Le(
      h,
      E,
      b,
      O,
      R,
      T,
      C
    ) : Se(d, h, C);
  }, Le = (d, h, E, b, O, R, T) => {
    const x = d.component = td(
      d,
      b,
      O
    );
    if (g.NODE_ENV !== "production" && x.type.__hmrId && ju(x), g.NODE_ENV !== "production" && (wo(d), gt(x, "mount")), As(d) && (x.ctx.renderer = Z), g.NODE_ENV !== "production" && gt(x, "init"), od(x), g.NODE_ENV !== "production" && _t(x, "init"), x.asyncDep) {
      if (O && O.registerDep(x, G), !d.el) {
        const C = x.subTree = be(Ge);
        P(null, C, h, E);
      }
    } else
      G(
        x,
        d,
        h,
        E,
        O,
        R,
        T
      );
    g.NODE_ENV !== "production" && (Oo(), _t(x, "mount"));
  }, Se = (d, h, E) => {
    const b = h.component = d.component;
    if (Qu(d, h, E))
      if (b.asyncDep && !b.asyncResolved) {
        g.NODE_ENV !== "production" && wo(h), W(b, h, E), g.NODE_ENV !== "production" && Oo();
        return;
      } else
        b.next = h, Iu(b.update), b.effect.dirty = !0, b.update();
    else
      h.el = d.el, b.vnode = h;
  }, G = (d, h, E, b, O, R, T) => {
    const x = () => {
      if (d.isMounted) {
        let { next: j, bu: B, u: H, parent: J, vnode: ne } = d;
        {
          const fn = Rc(d);
          if (fn) {
            j && (j.el = ne.el, W(d, j, T)), fn.asyncDep.then(() => {
              d.isUnmounted || x();
            });
            return;
          }
        }
        let ae = j, ge;
        g.NODE_ENV !== "production" && wo(j || d.vnode), Jt(d, !1), j ? (j.el = ne.el, W(d, j, T)) : j = ne, B && Pn(B), (ge = j.props && j.props.onVnodeBeforeUpdate) && rt(ge, J, j, ne), Jt(d, !0), g.NODE_ENV !== "production" && gt(d, "render");
        const De = vr(d);
        g.NODE_ENV !== "production" && _t(d, "render");
        const Ye = d.subTree;
        d.subTree = De, g.NODE_ENV !== "production" && gt(d, "patch"), v(
          Ye,
          De,
          // parent may have changed if it's in a teleport
          a(Ye.el),
          // anchor may have changed if it's in a fragment
          I(Ye),
          d,
          O,
          R
        ), g.NODE_ENV !== "production" && _t(d, "patch"), j.el = De.el, ae === null && Zu(d, De.el), H && Fe(H, O), (ge = j.props && j.props.onVnodeUpdated) && Fe(
          () => rt(ge, J, j, ne),
          O
        ), g.NODE_ENV !== "production" && rc(d), g.NODE_ENV !== "production" && Oo();
      } else {
        let j;
        const { el: B, props: H } = h, { bm: J, m: ne, parent: ae } = d, ge = Ln(h);
        if (Jt(d, !1), J && Pn(J), !ge && (j = H && H.onVnodeBeforeMount) && rt(j, ae, h), Jt(d, !0), B && Q) {
          const De = () => {
            g.NODE_ENV !== "production" && gt(d, "render"), d.subTree = vr(d), g.NODE_ENV !== "production" && _t(d, "render"), g.NODE_ENV !== "production" && gt(d, "hydrate"), Q(
              B,
              d.subTree,
              d,
              O,
              null
            ), g.NODE_ENV !== "production" && _t(d, "hydrate");
          };
          ge ? h.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !d.isUnmounted && De()
          ) : De();
        } else {
          g.NODE_ENV !== "production" && gt(d, "render");
          const De = d.subTree = vr(d);
          g.NODE_ENV !== "production" && _t(d, "render"), g.NODE_ENV !== "production" && gt(d, "patch"), v(
            null,
            De,
            E,
            b,
            d,
            O,
            R
          ), g.NODE_ENV !== "production" && _t(d, "patch"), h.el = De.el;
        }
        if (ne && Fe(ne, O), !ge && (j = H && H.onVnodeMounted)) {
          const De = h;
          Fe(
            () => rt(j, ae, De),
            O
          );
        }
        (h.shapeFlag & 256 || ae && Ln(ae.vnode) && ae.vnode.shapeFlag & 256) && d.a && Fe(d.a, O), d.isMounted = !0, g.NODE_ENV !== "production" && Bu(d), h = E = b = null;
      }
    }, C = d.effect = new vs(
      x,
      ve,
      () => or(S),
      d.scope
      // track it in component's effect scope
    ), S = d.update = () => {
      C.dirty && C.run();
    };
    S.id = d.uid, Jt(d, !0), g.NODE_ENV !== "production" && (C.onTrack = d.rtc ? (j) => Pn(d.rtc, j) : void 0, C.onTrigger = d.rtg ? (j) => Pn(d.rtg, j) : void 0, S.ownerInstance = d), S();
  }, W = (d, h, E) => {
    h.component = d;
    const b = d.vnode.props;
    d.vnode = h, d.next = null, Vf(d, h.props, b, E), Hf(d, h.children, E), qt(), pi(d), Kt();
  }, qe = (d, h, E, b, O, R, T, x, C = !1) => {
    const S = d && d.children, j = d ? d.shapeFlag : 0, B = h.children, { patchFlag: H, shapeFlag: J } = h;
    if (H > 0) {
      if (H & 128) {
        St(
          S,
          B,
          E,
          b,
          O,
          R,
          T,
          x,
          C
        );
        return;
      } else if (H & 256) {
        zt(
          S,
          B,
          E,
          b,
          O,
          R,
          T,
          x,
          C
        );
        return;
      }
    }
    J & 8 ? (j & 16 && y(S, O, R), B !== S && u(E, B)) : j & 16 ? J & 16 ? St(
      S,
      B,
      E,
      b,
      O,
      R,
      T,
      x,
      C
    ) : y(S, O, R, !0) : (j & 8 && u(E, ""), J & 16 && fe(
      B,
      E,
      b,
      O,
      R,
      T,
      x,
      C
    ));
  }, zt = (d, h, E, b, O, R, T, x, C) => {
    d = d || En, h = h || En;
    const S = d.length, j = h.length, B = Math.min(S, j);
    let H;
    for (H = 0; H < B; H++) {
      const J = h[H] = C ? Tt(h[H]) : Qe(h[H]);
      v(
        d[H],
        J,
        E,
        null,
        O,
        R,
        T,
        x,
        C
      );
    }
    S > j ? y(
      d,
      O,
      R,
      !0,
      !1,
      B
    ) : fe(
      h,
      E,
      b,
      O,
      R,
      T,
      x,
      C,
      B
    );
  }, St = (d, h, E, b, O, R, T, x, C) => {
    let S = 0;
    const j = h.length;
    let B = d.length - 1, H = j - 1;
    for (; S <= B && S <= H; ) {
      const J = d[S], ne = h[S] = C ? Tt(h[S]) : Qe(h[S]);
      if (Cn(J, ne))
        v(
          J,
          ne,
          E,
          null,
          O,
          R,
          T,
          x,
          C
        );
      else
        break;
      S++;
    }
    for (; S <= B && S <= H; ) {
      const J = d[B], ne = h[H] = C ? Tt(h[H]) : Qe(h[H]);
      if (Cn(J, ne))
        v(
          J,
          ne,
          E,
          null,
          O,
          R,
          T,
          x,
          C
        );
      else
        break;
      B--, H--;
    }
    if (S > B) {
      if (S <= H) {
        const J = H + 1, ne = J < j ? h[J].el : b;
        for (; S <= H; )
          v(
            null,
            h[S] = C ? Tt(h[S]) : Qe(h[S]),
            E,
            ne,
            O,
            R,
            T,
            x,
            C
          ), S++;
      }
    } else if (S > H)
      for (; S <= B; )
        Ke(d[S], O, R, !0), S++;
    else {
      const J = S, ne = S, ae = /* @__PURE__ */ new Map();
      for (S = ne; S <= H; S++) {
        const ke = h[S] = C ? Tt(h[S]) : Qe(h[S]);
        ke.key != null && (g.NODE_ENV !== "production" && ae.has(ke.key) && $(
          "Duplicate keys found during update:",
          JSON.stringify(ke.key),
          "Make sure keys are unique."
        ), ae.set(ke.key, S));
      }
      let ge, De = 0;
      const Ye = H - ne + 1;
      let fn = !1, ti = 0;
      const Rn = new Array(Ye);
      for (S = 0; S < Ye; S++)
        Rn[S] = 0;
      for (S = J; S <= B; S++) {
        const ke = d[S];
        if (De >= Ye) {
          Ke(ke, O, R, !0);
          continue;
        }
        let ot;
        if (ke.key != null)
          ot = ae.get(ke.key);
        else
          for (ge = ne; ge <= H; ge++)
            if (Rn[ge - ne] === 0 && Cn(ke, h[ge])) {
              ot = ge;
              break;
            }
        ot === void 0 ? Ke(ke, O, R, !0) : (Rn[ot - ne] = S + 1, ot >= ti ? ti = ot : fn = !0, v(
          ke,
          h[ot],
          E,
          null,
          O,
          R,
          T,
          x,
          C
        ), De++);
      }
      const ni = fn ? zf(Rn) : En;
      for (ge = ni.length - 1, S = Ye - 1; S >= 0; S--) {
        const ke = ne + S, ot = h[ke], oi = ke + 1 < j ? h[ke + 1].el : b;
        Rn[S] === 0 ? v(
          null,
          ot,
          E,
          oi,
          O,
          R,
          T,
          x,
          C
        ) : fn && (ge < 0 || S !== ni[ge] ? nt(ot, E, oi, 2) : ge--);
      }
    }
  }, nt = (d, h, E, b, O = null) => {
    const { el: R, type: T, transition: x, children: C, shapeFlag: S } = d;
    if (S & 6) {
      nt(d.component.subTree, h, E, b);
      return;
    }
    if (S & 128) {
      d.suspense.move(h, E, b);
      return;
    }
    if (S & 64) {
      T.move(d, h, E, Z);
      return;
    }
    if (T === Ue) {
      o(R, h, E);
      for (let B = 0; B < C.length; B++)
        nt(C[B], h, E, b);
      o(d.anchor, h, E);
      return;
    }
    if (T === Po) {
      Y(d, h, E);
      return;
    }
    if (b !== 2 && S & 1 && x)
      if (b === 0)
        x.beforeEnter(R), o(R, h, E), Fe(() => x.enter(R), O);
      else {
        const { leave: B, delayLeave: H, afterLeave: J } = x, ne = () => o(R, h, E), ae = () => {
          B(R, () => {
            ne(), J && J();
          });
        };
        H ? H(R, ne, ae) : ae();
      }
    else
      o(R, h, E);
  }, Ke = (d, h, E, b = !1, O = !1) => {
    const {
      type: R,
      props: T,
      ref: x,
      children: C,
      dynamicChildren: S,
      shapeFlag: j,
      patchFlag: B,
      dirs: H
    } = d;
    if (x != null && Gr(x, null, E, d, !0), j & 256) {
      h.ctx.deactivate(d);
      return;
    }
    const J = j & 1 && H, ne = !Ln(d);
    let ae;
    if (ne && (ae = T && T.onVnodeBeforeUnmount) && rt(ae, h, d), j & 6)
      Rt(d.component, E, b);
    else {
      if (j & 128) {
        d.suspense.unmount(E, b);
        return;
      }
      J && Gt(d, null, h, "beforeUnmount"), j & 64 ? d.type.remove(
        d,
        h,
        E,
        O,
        Z,
        b
      ) : S && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (R !== Ue || B > 0 && B & 64) ? y(
        S,
        h,
        E,
        !1,
        !0
      ) : (R === Ue && B & 384 || !O && j & 16) && y(C, h, E), b && xt(d);
    }
    (ne && (ae = T && T.onVnodeUnmounted) || J) && Fe(() => {
      ae && rt(ae, h, d), J && Gt(d, null, h, "unmounted");
    }, E);
  }, xt = (d) => {
    const { type: h, el: E, anchor: b, transition: O } = d;
    if (h === Ue) {
      g.NODE_ENV !== "production" && d.patchFlag > 0 && d.patchFlag & 2048 && O && !O.persisted ? d.children.forEach((T) => {
        T.type === Ge ? r(T.el) : xt(T);
      }) : co(E, b);
      return;
    }
    if (h === Po) {
      re(d);
      return;
    }
    const R = () => {
      r(E), O && !O.persisted && O.afterLeave && O.afterLeave();
    };
    if (d.shapeFlag & 1 && O && !O.persisted) {
      const { leave: T, delayLeave: x } = O, C = () => T(E, R);
      x ? x(d.el, R, C) : C();
    } else
      R();
  }, co = (d, h) => {
    let E;
    for (; d !== h; )
      E = p(d), r(d), d = E;
    r(h);
  }, Rt = (d, h, E) => {
    g.NODE_ENV !== "production" && d.type.__hmrId && Lu(d);
    const { bum: b, scope: O, update: R, subTree: T, um: x } = d;
    b && Pn(b), O.stop(), R && (R.active = !1, Ke(T, d, h, E)), x && Fe(x, h), Fe(() => {
      d.isUnmounted = !0;
    }, h), h && h.pendingBranch && !h.isUnmounted && d.asyncDep && !d.asyncResolved && d.suspenseId === h.pendingId && (h.deps--, h.deps === 0 && h.resolve()), g.NODE_ENV !== "production" && qu(d);
  }, y = (d, h, E, b = !1, O = !1, R = 0) => {
    for (let T = R; T < d.length; T++)
      Ke(d[T], h, E, b, O);
  }, I = (d) => d.shapeFlag & 6 ? I(d.component.subTree) : d.shapeFlag & 128 ? d.suspense.next() : p(d.anchor || d.el);
  let V = !1;
  const F = (d, h, E) => {
    d == null ? h._vnode && Ke(h._vnode, null, null, !0) : v(
      h._vnode || null,
      d,
      h,
      null,
      null,
      null,
      E
    ), V || (V = !0, pi(), ec(), V = !1), h._vnode = d;
  }, Z = {
    p: v,
    um: Ke,
    m: nt,
    r: xt,
    mt: Le,
    mc: fe,
    pc: qe,
    pbc: k,
    n: I,
    o: e
  };
  let me, Q;
  return t && ([me, Q] = t(
    Z
  )), {
    render: F,
    hydrate: me,
    createApp: Cf(F, me)
  };
}
function wr({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Jt({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Kf(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Ro(e, t, n = !1) {
  const o = e.children, r = t.children;
  if (q(o) && q(r))
    for (let s = 0; s < o.length; s++) {
      const i = o[s];
      let l = r[s];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = r[s] = Tt(r[s]), l.el = i.el), n || Ro(i, l)), l.type === no && (l.el = i.el), g.NODE_ENV !== "production" && l.type === Ge && !l.el && (l.el = i.el);
    }
}
function zf(e) {
  const t = e.slice(), n = [0];
  let o, r, s, i, l;
  const c = e.length;
  for (o = 0; o < c; o++) {
    const f = e[o];
    if (f !== 0) {
      if (r = n[n.length - 1], e[r] < f) {
        t[o] = r, n.push(o);
        continue;
      }
      for (s = 0, i = n.length - 1; s < i; )
        l = s + i >> 1, e[n[l]] < f ? s = l + 1 : i = l;
      f < e[n[s]] && (s > 0 && (t[o] = n[s - 1]), n[s] = o);
    }
  }
  for (s = n.length, i = n[s - 1]; s-- > 0; )
    n[s] = i, i = t[i];
  return n;
}
function Rc(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Rc(t);
}
const Gf = (e) => e.__isTeleport, Ue = Symbol.for("v-fgt"), no = Symbol.for("v-txt"), Ge = Symbol.for("v-cmt"), Po = Symbol.for("v-stc"), Mn = [];
let Ze = null;
function Te(e = !1) {
  Mn.push(Ze = e ? null : []);
}
function Jf() {
  Mn.pop(), Ze = Mn[Mn.length - 1] || null;
}
let zn = 1;
function Ri(e) {
  zn += e;
}
function Pc(e) {
  return e.dynamicChildren = zn > 0 ? Ze || En : null, Jf(), zn > 0 && Ze && Ze.push(e), e;
}
function He(e, t, n, o, r, s) {
  return Pc(
    w(
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
function js(e, t, n, o, r) {
  return Pc(
    be(
      e,
      t,
      n,
      o,
      r,
      !0
    )
  );
}
function vn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Cn(e, t) {
  return g.NODE_ENV !== "production" && t.shapeFlag & 6 && hn.has(t.type) ? (e.shapeFlag &= -257, t.shapeFlag &= -513, !1) : e.type === t.type && e.key === t.key;
}
const Yf = (...e) => Cc(
  ...e
), lr = "__vInternal", Dc = ({ key: e }) => e ?? null, Do = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? ye(e) || _e(e) || K(e) ? { i: Re, r: e, k: t, f: !!n } : e : null);
function w(e, t = null, n = null, o = 0, r = null, s = e === Ue ? 0 : 1, i = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Dc(t),
    ref: t && Do(t),
    scopeId: sr,
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
    ctx: Re
  };
  return l ? (Ls(c, n), s & 128 && e.normalize(c)) : n && (c.shapeFlag |= ye(n) ? 8 : 16), g.NODE_ENV !== "production" && c.key !== c.key && $("VNode created with invalid key (NaN). VNode type:", c.type), zn > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  Ze && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && Ze.push(c), c;
}
const be = g.NODE_ENV !== "production" ? Yf : Cc;
function Cc(e, t = null, n = null, o = 0, r = null, s = !1) {
  if ((!e || e === ef) && (g.NODE_ENV !== "production" && !e && $(`Invalid vnode type when creating vnode: ${e}.`), e = Ge), vn(e)) {
    const l = Bt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Ls(l, n), zn > 0 && !s && Ze && (l.shapeFlag & 6 ? Ze[Ze.indexOf(e)] = l : Ze.push(l)), l.patchFlag |= -2, l;
  }
  if (Vc(e) && (e = e.__vccOpts), t) {
    t = Xf(t);
    let { class: l, style: c } = t;
    l && !ye(l) && (t.class = Zo(l)), ce(c) && (Uo(c) && !q(c) && (c = Ee({}, c)), t.style = bs(c));
  }
  const i = ye(e) ? 1 : nf(e) ? 128 : Gf(e) ? 64 : ce(e) ? 4 : K(e) ? 2 : 0;
  return g.NODE_ENV !== "production" && i & 4 && Uo(e) && (e = z(e), $(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), w(
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
function Xf(e) {
  return e ? Uo(e) || lr in e ? Ee({}, e) : e : null;
}
function Bt(e, t, n = !1) {
  const { props: o, ref: r, patchFlag: s, children: i } = e, l = t ? Qf(o || {}, t) : o;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && Dc(l),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? q(r) ? r.concat(Do(t)) : [r, Do(t)] : Do(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: g.NODE_ENV !== "production" && s === -1 && q(i) ? i.map($c) : i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Ue ? s === -1 ? 16 : s | 16 : s,
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
    ssContent: e.ssContent && Bt(e.ssContent),
    ssFallback: e.ssFallback && Bt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function $c(e) {
  const t = Bt(e);
  return q(e.children) && (t.children = e.children.map($c)), t;
}
function Qt(e = " ", t = 0) {
  return be(no, null, e, t);
}
function Qe(e) {
  return e == null || typeof e == "boolean" ? be(Ge) : q(e) ? be(
    Ue,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? Tt(e) : be(no, null, String(e));
}
function Tt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Bt(e);
}
function Ls(e, t) {
  let n = 0;
  const { shapeFlag: o } = e;
  if (t == null)
    t = null;
  else if (q(t))
    n = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Ls(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(lr in t) ? t._ctx = Re : r === 3 && Re && (Re.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    K(t) ? (t = { default: t, _ctx: Re }, n = 32) : (t = String(t), o & 64 ? (n = 16, t = [Qt(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Qf(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (const r in o)
      if (r === "class")
        t.class !== o.class && (t.class = Zo([t.class, o.class]));
      else if (r === "style")
        t.style = bs([t.style, o.style]);
      else if (Qn(r)) {
        const s = t[r], i = o[r];
        i && s !== i && !(q(s) && s.includes(i)) && (t[r] = s ? [].concat(s, i) : i);
      } else
        r !== "" && (t[r] = o[r]);
  }
  return t;
}
function rt(e, t, n, o = null) {
  et(e, t, 7, [
    n,
    o
  ]);
}
const Zf = bc();
let ed = 0;
function td(e, t, n) {
  const o = e.type, r = (t ? t.appContext : e.appContext) || Zf, s = {
    uid: ed++,
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
    scope: new Sl(
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
    propsOptions: Nc(o, r),
    emitsOptions: ic(o, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: de,
    // inheritAttrs
    inheritAttrs: o.inheritAttrs,
    // state
    ctx: de,
    data: de,
    props: de,
    attrs: de,
    slots: de,
    refs: de,
    setupState: de,
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
  return g.NODE_ENV !== "production" ? s.ctx = bf(s) : s.ctx = { _: s }, s.root = t ? t.root : s, s.emit = Ju.bind(null, s), e.ce && e.ce(s), s;
}
let Ne = null;
const Ms = () => Ne || Re;
let zo, Jr;
{
  const e = ys(), t = (n, o) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(o), (s) => {
      r.length > 1 ? r.forEach((i) => i(s)) : r[0](s);
    };
  };
  zo = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Ne = n
  ), Jr = t(
    "__VUE_SSR_SETTERS__",
    (n) => cr = n
  );
}
const oo = (e) => {
  const t = Ne;
  return zo(e), e.scope.on(), () => {
    e.scope.off(), zo(t);
  };
}, Pi = () => {
  Ne && Ne.scope.off(), zo(null);
}, nd = /* @__PURE__ */ wt("slot,component");
function Yr(e, t) {
  const n = t.isNativeTag || yl;
  (nd(e) || n(e)) && $(
    "Do not use built-in or reserved HTML elements as component id: " + e
  );
}
function Tc(e) {
  return e.vnode.shapeFlag & 4;
}
let cr = !1;
function od(e, t = !1) {
  t && Jr(t);
  const { props: n, children: o } = e.vnode, r = Tc(e);
  Tf(e, n, r, t), Uf(e, o);
  const s = r ? rd(e, t) : void 0;
  return t && Jr(!1), s;
}
function rd(e, t) {
  var n;
  const o = e.type;
  if (g.NODE_ENV !== "production") {
    if (o.name && Yr(o.name, e.appContext.config), o.components) {
      const s = Object.keys(o.components);
      for (let i = 0; i < s.length; i++)
        Yr(s[i], e.appContext.config);
    }
    if (o.directives) {
      const s = Object.keys(o.directives);
      for (let i = 0; i < s.length; i++)
        fc(s[i]);
    }
    o.compilerOptions && sd() && $(
      '"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.'
    );
  }
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = bt(new Proxy(e.ctx, Ec)), g.NODE_ENV !== "production" && vf(e);
  const { setup: r } = o;
  if (r) {
    const s = e.setupContext = r.length > 1 ? ld(e) : null, i = oo(e);
    qt();
    const l = vt(
      r,
      e,
      0,
      [
        g.NODE_ENV !== "production" ? mn(e.props) : e.props,
        s
      ]
    );
    if (Kt(), i(), gs(l)) {
      if (l.then(Pi, Pi), t)
        return l.then((c) => {
          Di(e, c, t);
        }).catch((c) => {
          eo(c, e, 0);
        });
      if (e.asyncDep = l, g.NODE_ENV !== "production" && !e.suspense) {
        const c = (n = o.name) != null ? n : "Anonymous";
        $(
          `Component <${c}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`
        );
      }
    } else
      Di(e, l, t);
  } else
    Ac(e, t);
}
function Di(e, t, n) {
  K(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ce(t) ? (g.NODE_ENV !== "production" && vn(t) && $(
    "setup() should not return VNodes directly - return a render function instead."
  ), g.NODE_ENV !== "production" && (e.devtoolsRawSetupState = t), e.setupState = Gl(t), g.NODE_ENV !== "production" && Nf(e)) : g.NODE_ENV !== "production" && t !== void 0 && $(
    `setup() should return an object. Received: ${t === null ? "null" : typeof t}`
  ), Ac(e, n);
}
let Xr;
const sd = () => !Xr;
function Ac(e, t, n) {
  const o = e.type;
  if (!e.render) {
    if (!t && Xr && !o.render) {
      const r = o.template || Is(e).template;
      if (r) {
        g.NODE_ENV !== "production" && gt(e, "compile");
        const { isCustomElement: s, compilerOptions: i } = e.appContext.config, { delimiters: l, compilerOptions: c } = o, f = Ee(
          Ee(
            {
              isCustomElement: s,
              delimiters: l
            },
            i
          ),
          c
        );
        o.render = Xr(r, f), g.NODE_ENV !== "production" && _t(e, "compile");
      }
    }
    e.render = o.render || ve;
  }
  {
    const r = oo(e);
    qt();
    try {
      Of(e);
    } finally {
      Kt(), r();
    }
  }
  g.NODE_ENV !== "production" && !o.render && e.render === ve && !t && (o.template ? $(
    'Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".'
  ) : $("Component is missing template or render function."));
}
function Ci(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(
    e.attrs,
    g.NODE_ENV !== "production" ? {
      get(t, n) {
        return Wo(), Ae(e, "get", "$attrs"), t[n];
      },
      set() {
        return $("setupContext.attrs is readonly."), !1;
      },
      deleteProperty() {
        return $("setupContext.attrs is readonly."), !1;
      }
    } : {
      get(t, n) {
        return Ae(e, "get", "$attrs"), t[n];
      }
    }
  ));
}
function id(e) {
  return e.slotsProxy || (e.slotsProxy = new Proxy(e.slots, {
    get(t, n) {
      return Ae(e, "get", "$slots"), t[n];
    }
  }));
}
function ld(e) {
  const t = (n) => {
    if (g.NODE_ENV !== "production" && (e.exposed && $("expose() should be called only once per setup()."), n != null)) {
      let o = typeof n;
      o === "object" && (q(n) ? o = "array" : _e(n) && (o = "ref")), o !== "object" && $(
        `expose() should be passed a plain object, received ${o}.`
      );
    }
    e.exposed = n || {};
  };
  return g.NODE_ENV !== "production" ? Object.freeze({
    get attrs() {
      return Ci(e);
    },
    get slots() {
      return id(e);
    },
    get emit() {
      return (n, ...o) => e.emit(n, ...o);
    },
    expose: t
  }) : {
    get attrs() {
      return Ci(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Fs(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(Gl(bt(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in sn)
          return sn[n](e);
      },
      has(t, n) {
        return n in t || n in sn;
      }
    }));
}
const cd = /(?:^|[-_])(\w)/g, ad = (e) => e.replace(cd, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Us(e, t = !0) {
  return K(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function ar(e, t, n = !1) {
  let o = Us(t);
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
  return o ? ad(o) : n ? "App" : "Anonymous";
}
function Vc(e) {
  return K(e) && "__vccOpts" in e;
}
const xe = (e, t) => Nu(e, t, cr);
function Ic(e, t, n) {
  const o = arguments.length;
  return o === 2 ? ce(t) && !q(t) ? vn(t) ? be(e, null, [t]) : be(e, t) : be(e, null, t) : (o > 3 ? n = Array.prototype.slice.call(arguments, 2) : o === 3 && vn(n) && (n = [n]), be(e, t, n));
}
function Or(e) {
  return !!(e && e.__v_isShallow);
}
function ud() {
  if (g.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, o = { style: "color:#eb2f96" }, r = {
    header(a) {
      return ce(a) ? a.__isVue ? ["div", e, "VueInstance"] : _e(a) ? [
        "div",
        {},
        ["span", e, u(a)],
        "<",
        l(a.value),
        ">"
      ] : at(a) ? [
        "div",
        {},
        ["span", e, Or(a) ? "ShallowReactive" : "Reactive"],
        "<",
        l(a),
        `>${Ht(a) ? " (readonly)" : ""}`
      ] : Ht(a) ? [
        "div",
        {},
        ["span", e, Or(a) ? "ShallowReadonly" : "Readonly"],
        "<",
        l(a),
        ">"
      ] : null : null;
    },
    hasBody(a) {
      return a && a.__isVue;
    },
    body(a) {
      if (a && a.__isVue)
        return [
          "div",
          {},
          ...s(a.$)
        ];
    }
  };
  function s(a) {
    const p = [];
    a.type.props && a.props && p.push(i("props", z(a.props))), a.setupState !== de && p.push(i("setup", a.setupState)), a.data !== de && p.push(i("data", z(a.data)));
    const m = c(a, "computed");
    m && p.push(i("computed", m));
    const _ = c(a, "inject");
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
      ["object", { object: a }]
    ]), p;
  }
  function i(a, p) {
    return p = Ee({}, p), Object.keys(p).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        a
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
          l(p[m], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function l(a, p = !0) {
    return typeof a == "number" ? ["span", t, a] : typeof a == "string" ? ["span", n, JSON.stringify(a)] : typeof a == "boolean" ? ["span", o, a] : ce(a) ? ["object", { object: p ? z(a) : a }] : ["span", n, String(a)];
  }
  function c(a, p) {
    const m = a.type;
    if (K(m))
      return;
    const _ = {};
    for (const v in a.ctx)
      f(m, v, p) && (_[v] = a.ctx[v]);
    return _;
  }
  function f(a, p, m) {
    const _ = a[m];
    if (q(_) && _.includes(p) || ce(_) && p in _ || a.extends && f(a.extends, p, m) || a.mixins && a.mixins.some((v) => f(v, p, m)))
      return !0;
  }
  function u(a) {
    return Or(a) ? "ShallowRef" : a.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(r) : window.devtoolsFormatters = [r];
}
const $i = "3.4.15", ln = g.NODE_ENV !== "production" ? $ : ve;
var Nn = {};
const fd = "http://www.w3.org/2000/svg", dd = "http://www.w3.org/1998/Math/MathML", At = typeof document < "u" ? document : null, Ti = At && /* @__PURE__ */ At.createElement("template"), pd = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, o) => {
    const r = t === "svg" ? At.createElementNS(fd, e) : t === "mathml" ? At.createElementNS(dd, e) : At.createElement(e, n ? { is: n } : void 0);
    return e === "select" && o && o.multiple != null && r.setAttribute("multiple", o.multiple), r;
  },
  createText: (e) => At.createTextNode(e),
  createComment: (e) => At.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => At.querySelector(e),
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
      Ti.innerHTML = o === "svg" ? `<svg>${e}</svg>` : o === "mathml" ? `<math>${e}</math>` : e;
      const l = Ti.content;
      if (o === "svg" || o === "mathml") {
        const c = l.firstChild;
        for (; c.firstChild; )
          l.appendChild(c.firstChild);
        l.removeChild(c);
      }
      t.insertBefore(l, n);
    }
    return [
      // first
      i ? i.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, hd = Symbol("_vtc");
function md(e, t, n) {
  const o = e[hd];
  o && (t = (t ? [t, ...o] : [...o]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const gd = Symbol("_vod"), _d = Symbol(Nn.NODE_ENV !== "production" ? "CSS_VAR_TEXT" : "");
function Ed(e, t, n) {
  const o = e.style, r = o.display, s = ye(n);
  if (n && !s) {
    if (t && !ye(t))
      for (const i in t)
        n[i] == null && Qr(o, i, "");
    for (const i in n)
      Qr(o, i, n[i]);
  } else if (s) {
    if (t !== n) {
      const i = o[_d];
      i && (n += ";" + i), o.cssText = n;
    }
  } else
    t && e.removeAttribute("style");
  gd in e && (o.display = r);
}
const yd = /[^\\];\s*$/, Ai = /\s*!important$/;
function Qr(e, t, n) {
  if (q(n))
    n.forEach((o) => Qr(e, t, o));
  else if (n == null && (n = ""), Nn.NODE_ENV !== "production" && yd.test(n) && ln(
    `Unexpected semicolon at the end of '${t}' style value: '${n}'`
  ), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const o = bd(e, t);
    Ai.test(n) ? e.setProperty(
      Ft(o),
      n.replace(Ai, ""),
      "important"
    ) : e[o] = n;
  }
}
const Vi = ["Webkit", "Moz", "ms"], Sr = {};
function bd(e, t) {
  const n = Sr[t];
  if (n)
    return n;
  let o = dt(t);
  if (o !== "filter" && o in e)
    return Sr[t] = o;
  o = cn(o);
  for (let r = 0; r < Vi.length; r++) {
    const s = Vi[r] + o;
    if (s in e)
      return Sr[t] = s;
  }
  return t;
}
const Ii = "http://www.w3.org/1999/xlink";
function vd(e, t, n, o, r) {
  if (o && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(Ii, t.slice(6, t.length)) : e.setAttributeNS(Ii, t, n);
  else {
    const s = Za(t);
    n == null || s && !wl(n) ? e.removeAttribute(t) : e.setAttribute(t, s ? "" : n);
  }
}
function Nd(e, t, n, o, r, s, i) {
  if (t === "innerHTML" || t === "textContent") {
    o && i(o, r, s), e[t] = n ?? "";
    return;
  }
  const l = e.tagName;
  if (t === "value" && l !== "PROGRESS" && // custom elements may use _value internally
  !l.includes("-")) {
    e._value = n;
    const f = l === "OPTION" ? e.getAttribute("value") : e.value, u = n ?? "";
    f !== u && (e.value = u), n == null && e.removeAttribute(t);
    return;
  }
  let c = !1;
  if (n === "" || n == null) {
    const f = typeof e[t];
    f === "boolean" ? n = wl(n) : n == null && f === "string" ? (n = "", c = !0) : f === "number" && (n = 0, c = !0);
  }
  try {
    e[t] = n;
  } catch (f) {
    Nn.NODE_ENV !== "production" && !c && ln(
      `Failed setting prop "${t}" on <${l.toLowerCase()}>: value ${n} is invalid.`,
      f
    );
  }
  c && e.removeAttribute(t);
}
function wd(e, t, n, o) {
  e.addEventListener(t, n, o);
}
function Od(e, t, n, o) {
  e.removeEventListener(t, n, o);
}
const ki = Symbol("_vei");
function Sd(e, t, n, o, r = null) {
  const s = e[ki] || (e[ki] = {}), i = s[t];
  if (o && i)
    i.value = o;
  else {
    const [l, c] = xd(t);
    if (o) {
      const f = s[t] = Dd(o, r);
      wd(e, l, f, c);
    } else
      i && (Od(e, l, i, c), s[t] = void 0);
  }
}
const ji = /(?:Once|Passive|Capture)$/;
function xd(e) {
  let t;
  if (ji.test(e)) {
    t = {};
    let o;
    for (; o = e.match(ji); )
      e = e.slice(0, e.length - o[0].length), t[o[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Ft(e.slice(2)), t];
}
let xr = 0;
const Rd = /* @__PURE__ */ Promise.resolve(), Pd = () => xr || (Rd.then(() => xr = 0), xr = Date.now());
function Dd(e, t) {
  const n = (o) => {
    if (!o._vts)
      o._vts = Date.now();
    else if (o._vts <= n.attached)
      return;
    et(
      Cd(o, n.value),
      t,
      5,
      [o]
    );
  };
  return n.value = e, n.attached = Pd(), n;
}
function Cd(e, t) {
  if (q(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((o) => (r) => !r._stopped && o && o(r));
  } else
    return t;
}
const Li = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, $d = (e, t, n, o, r, s, i, l, c) => {
  const f = r === "svg";
  t === "class" ? md(e, o, f) : t === "style" ? Ed(e, n, o) : Qn(t) ? ko(t) || Sd(e, t, n, o, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Td(e, t, o, f)) ? Nd(
    e,
    t,
    o,
    s,
    i,
    l,
    c
  ) : (t === "true-value" ? e._trueValue = o : t === "false-value" && (e._falseValue = o), vd(e, t, o, f));
};
function Td(e, t, n, o) {
  if (o)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Li(t) && K(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return Li(t) && ye(n) ? !1 : t in e;
}
const Ad = /* @__PURE__ */ Ee({ patchProp: $d }, pd);
let Mi;
function Vd() {
  return Mi || (Mi = Wf(Ad));
}
const Id = (...e) => {
  const t = Vd().createApp(...e);
  Nn.NODE_ENV !== "production" && (jd(t), Ld(t));
  const { mount: n } = t;
  return t.mount = (o) => {
    const r = Md(o);
    if (!r)
      return;
    const s = t._component;
    !K(s) && !s.render && !s.template && (s.template = r.innerHTML), r.innerHTML = "";
    const i = n(r, !1, kd(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), i;
  }, t;
};
function kd(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function jd(e) {
  Object.defineProperty(e.config, "isNativeTag", {
    value: (t) => Ja(t) || Ya(t) || Xa(t),
    writable: !1
  });
}
function Ld(e) {
  {
    const t = e.config.isCustomElement;
    Object.defineProperty(e.config, "isCustomElement", {
      get() {
        return t;
      },
      set() {
        ln(
          "The `isCustomElement` config option is deprecated. Use `compilerOptions.isCustomElement` instead."
        );
      }
    });
    const n = e.config.compilerOptions, o = 'The `compilerOptions` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, `compilerOptions` must be passed to `@vue/compiler-dom` in the build setup instead.\n- For vue-loader: pass it via vue-loader\'s `compilerOptions` loader option.\n- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader\n- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc';
    Object.defineProperty(e.config, "compilerOptions", {
      get() {
        return ln(o), n;
      },
      set() {
        ln(o);
      }
    });
  }
}
function Md(e) {
  if (ye(e)) {
    const t = document.querySelector(e);
    return Nn.NODE_ENV !== "production" && !t && ln(
      `Failed to mount app: mount target selector "${e}" returned null.`
    ), t;
  }
  return Nn.NODE_ENV !== "production" && window.ShadowRoot && e instanceof window.ShadowRoot && e.mode === "closed" && ln(
    'mounting on a ShadowRoot with `{mode: "closed"}` may lead to unpredictable bugs'
  ), e;
}
var Fd = {};
function Ud() {
  ud();
}
Fd.NODE_ENV !== "production" && Ud();
var kc = !1;
function _o(e, t, n) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, t), e.splice(t, 1, n), n) : (e[t] = n, n);
}
function Rr(e, t) {
  if (Array.isArray(e)) {
    e.splice(t, 1);
    return;
  }
  delete e[t];
}
function Hd() {
  return jc().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function jc() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof global < "u" ? global : {};
}
const Bd = typeof Proxy == "function", Wd = "devtools-plugin:setup", qd = "plugin:settings:set";
let dn, Zr;
function Kd() {
  var e;
  return dn !== void 0 || (typeof window < "u" && window.performance ? (dn = !0, Zr = window.performance) : typeof global < "u" && (!((e = global.perf_hooks) === null || e === void 0) && e.performance) ? (dn = !0, Zr = global.perf_hooks.performance) : dn = !1), dn;
}
function zd() {
  return Kd() ? Zr.now() : Date.now();
}
class Gd {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const o = {};
    if (t.settings)
      for (const i in t.settings) {
        const l = t.settings[i];
        o[i] = l.defaultValue;
      }
    const r = `__vue-devtools-plugin-settings__${t.id}`;
    let s = Object.assign({}, o);
    try {
      const i = localStorage.getItem(r), l = JSON.parse(i);
      Object.assign(s, l);
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
        return zd();
      }
    }, n && n.on(qd, (i, l) => {
      i === this.plugin.id && this.fallbacks.setSettings(l);
    }), this.proxiedOn = new Proxy({}, {
      get: (i, l) => this.target ? this.target.on[l] : (...c) => {
        this.onQueue.push({
          method: l,
          args: c
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (i, l) => this.target ? this.target[l] : l === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(l) ? (...c) => (this.targetQueue.push({
        method: l,
        args: c,
        resolve: () => {
        }
      }), this.fallbacks[l](...c)) : (...c) => new Promise((f) => {
        this.targetQueue.push({
          method: l,
          args: c,
          resolve: f
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
function Hs(e, t) {
  const n = e, o = jc(), r = Hd(), s = Bd && n.enableEarlyProxy;
  if (r && (o.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !s))
    r.emit(Wd, e, t);
  else {
    const i = s ? new Gd(n, r) : null;
    (o.__VUE_DEVTOOLS_PLUGINS__ = o.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: t,
      proxy: i
    }), i && t(i.proxiedTarget);
  }
}
var ue = {};
let kn;
const Gn = (e) => kn = e, Lc = ue.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function un(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var ft;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(ft || (ft = {}));
const ur = typeof window < "u", Fn = (ue.NODE_ENV !== "production" || !1) && ue.NODE_ENV !== "test" && ur, Fi = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function Jd(e, { autoBom: t = !1 } = {}) {
  return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function Bs(e, t, n) {
  const o = new XMLHttpRequest();
  o.open("GET", e), o.responseType = "blob", o.onload = function() {
    Uc(o.response, t, n);
  }, o.onerror = function() {
    console.error("could not download file");
  }, o.send();
}
function Mc(e) {
  const t = new XMLHttpRequest();
  t.open("HEAD", e, !1);
  try {
    t.send();
  } catch {
  }
  return t.status >= 200 && t.status <= 299;
}
function Co(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const n = document.createEvent("MouseEvents");
    n.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(n);
  }
}
const $o = typeof navigator == "object" ? navigator : { userAgent: "" }, Fc = /Macintosh/.test($o.userAgent) && /AppleWebKit/.test($o.userAgent) && !/Safari/.test($o.userAgent), Uc = ur ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !Fc ? Yd : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in $o ? Xd : (
      // Fallback to using FileReader and a popup
      Qd
    )
  )
) : () => {
};
function Yd(e, t = "download", n) {
  const o = document.createElement("a");
  o.download = t, o.rel = "noopener", typeof e == "string" ? (o.href = e, o.origin !== location.origin ? Mc(o.href) ? Bs(e, t, n) : (o.target = "_blank", Co(o)) : Co(o)) : (o.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(o.href);
  }, 4e4), setTimeout(function() {
    Co(o);
  }, 0));
}
function Xd(e, t = "download", n) {
  if (typeof e == "string")
    if (Mc(e))
      Bs(e, t, n);
    else {
      const o = document.createElement("a");
      o.href = e, o.target = "_blank", setTimeout(function() {
        Co(o);
      });
    }
  else
    navigator.msSaveOrOpenBlob(Jd(e, n), t);
}
function Qd(e, t, n, o) {
  if (o = o || open("", "_blank"), o && (o.document.title = o.document.body.innerText = "downloading..."), typeof e == "string")
    return Bs(e, t, n);
  const r = e.type === "application/octet-stream", s = /constructor/i.test(String(Fi.HTMLElement)) || "safari" in Fi, i = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((i || r && s || Fc) && typeof FileReader < "u") {
    const l = new FileReader();
    l.onloadend = function() {
      let c = l.result;
      if (typeof c != "string")
        throw o = null, new Error("Wrong reader.result type");
      c = i ? c : c.replace(/^data:[^;]*;/, "data:attachment/file;"), o ? o.location.href = c : location.assign(c), o = null;
    }, l.readAsDataURL(e);
  } else {
    const l = URL.createObjectURL(e);
    o ? o.location.assign(l) : location.href = l, o = null, setTimeout(function() {
      URL.revokeObjectURL(l);
    }, 4e4);
  }
}
function Ce(e, t) {
  const n = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(n, t) : t === "error" ? console.error(n) : t === "warn" ? console.warn(n) : console.log(n);
}
function Ws(e) {
  return "_a" in e && "install" in e;
}
function Hc() {
  if (!("clipboard" in navigator))
    return Ce("Your browser doesn't support the Clipboard API", "error"), !0;
}
function Bc(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (Ce('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function Zd(e) {
  if (!Hc())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), Ce("Global state copied to clipboard.");
    } catch (t) {
      if (Bc(t))
        return;
      Ce("Failed to serialize the state. Check the console for more details.", "error"), console.error(t);
    }
}
async function ep(e) {
  if (!Hc())
    try {
      Wc(e, JSON.parse(await navigator.clipboard.readText())), Ce("Global state pasted from clipboard.");
    } catch (t) {
      if (Bc(t))
        return;
      Ce("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(t);
    }
}
async function tp(e) {
  try {
    Uc(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (t) {
    Ce("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(t);
  }
}
let ht;
function np() {
  ht || (ht = document.createElement("input"), ht.type = "file", ht.accept = ".json");
  function e() {
    return new Promise((t, n) => {
      ht.onchange = async () => {
        const o = ht.files;
        if (!o)
          return t(null);
        const r = o.item(0);
        return t(r ? { text: await r.text(), file: r } : null);
      }, ht.oncancel = () => t(null), ht.onerror = n, ht.click();
    });
  }
  return e;
}
async function op(e) {
  try {
    const n = await np()();
    if (!n)
      return;
    const { text: o, file: r } = n;
    Wc(e, JSON.parse(o)), Ce(`Global state imported from "${r.name}".`);
  } catch (t) {
    Ce("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(t);
  }
}
function Wc(e, t) {
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
const qc = "🍍 Pinia (root)", es = "_root";
function rp(e) {
  return Ws(e) ? {
    id: es,
    label: qc
  } : {
    id: e.$id,
    label: e.$id
  };
}
function sp(e) {
  if (Ws(e)) {
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
          value: i._getters.reduce((l, c) => (l[c] = i[c], l), {})
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
function ip(e) {
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
function lp(e) {
  switch (e) {
    case ft.direct:
      return "mutation";
    case ft.patchFunction:
      return "$patch";
    case ft.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let _n = !0;
const To = [], Xt = "pinia:mutations", Ve = "pinia", { assign: cp } = Object, Go = (e) => "🍍 " + e;
function ap(e, t) {
  Hs({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: To,
    app: e
  }, (n) => {
    typeof n.now != "function" && Ce("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), n.addTimelineLayer({
      id: Xt,
      label: "Pinia 🍍",
      color: 15064968
    }), n.addInspector({
      id: Ve,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            Zd(t);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await ep(t), n.sendInspectorTree(Ve), n.sendInspectorState(Ve);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            tp(t);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await op(t), n.sendInspectorTree(Ve), n.sendInspectorState(Ve);
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
            r ? typeof r.$reset != "function" ? Ce(`Cannot reset "${o}" store because it doesn't have a "$reset" method implemented.`, "warn") : (r.$reset(), Ce(`Store "${o}" reset.`)) : Ce(`Cannot reset "${o}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), n.on.inspectComponent((o, r) => {
      const s = o.componentInstance && o.componentInstance.proxy;
      if (s && s._pStores) {
        const i = o.componentInstance.proxy._pStores;
        Object.values(i).forEach((l) => {
          o.instanceData.state.push({
            type: Go(l.$id),
            key: "state",
            editable: !0,
            value: l._isOptionsAPI ? {
              _custom: {
                value: z(l.$state),
                actions: [
                  {
                    icon: "restore",
                    tooltip: "Reset the state of this store",
                    action: () => l.$reset()
                  }
                ]
              }
            } : (
              // NOTE: workaround to unwrap transferred refs
              Object.keys(l.$state).reduce((c, f) => (c[f] = l.$state[f], c), {})
            )
          }), l._getters && l._getters.length && o.instanceData.state.push({
            type: Go(l.$id),
            key: "getters",
            editable: !1,
            value: l._getters.reduce((c, f) => {
              try {
                c[f] = l[f];
              } catch (u) {
                c[f] = u;
              }
              return c;
            }, {})
          });
        });
      }
    }), n.on.getInspectorTree((o) => {
      if (o.app === e && o.inspectorId === Ve) {
        let r = [t];
        r = r.concat(Array.from(t._s.values())), o.rootNodes = (o.filter ? r.filter((s) => "$id" in s ? s.$id.toLowerCase().includes(o.filter.toLowerCase()) : qc.toLowerCase().includes(o.filter.toLowerCase())) : r).map(rp);
      }
    }), n.on.getInspectorState((o) => {
      if (o.app === e && o.inspectorId === Ve) {
        const r = o.nodeId === es ? t : t._s.get(o.nodeId);
        if (!r)
          return;
        r && (o.state = sp(r));
      }
    }), n.on.editInspectorState((o, r) => {
      if (o.app === e && o.inspectorId === Ve) {
        const s = o.nodeId === es ? t : t._s.get(o.nodeId);
        if (!s)
          return Ce(`store "${o.nodeId}" not found`, "error");
        const { path: i } = o;
        Ws(s) ? i.unshift("state") : (i.length !== 1 || !s._customProperties.has(i[0]) || i[0] in s.$state) && i.unshift("$state"), _n = !1, o.set(s, i, o.state.value), _n = !0;
      }
    }), n.on.editComponentState((o) => {
      if (o.type.startsWith("🍍")) {
        const r = o.type.replace(/^🍍\s*/, ""), s = t._s.get(r);
        if (!s)
          return Ce(`store "${r}" not found`, "error");
        const { path: i } = o;
        if (i[0] !== "state")
          return Ce(`Invalid path for store "${r}":
${i}
Only state can be modified.`);
        i[0] = "$state", _n = !1, o.set(s, i, o.state.value), _n = !0;
      }
    });
  });
}
function up(e, t) {
  To.includes(Go(t.$id)) || To.push(Go(t.$id)), Hs({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: To,
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
    t.$onAction(({ after: i, onError: l, name: c, args: f }) => {
      const u = Kc++;
      n.addTimelineEvent({
        layerId: Xt,
        event: {
          time: o(),
          title: "🛫 " + c,
          subtitle: "start",
          data: {
            store: Xe(t.$id),
            action: Xe(c),
            args: f
          },
          groupId: u
        }
      }), i((a) => {
        jt = void 0, n.addTimelineEvent({
          layerId: Xt,
          event: {
            time: o(),
            title: "🛬 " + c,
            subtitle: "end",
            data: {
              store: Xe(t.$id),
              action: Xe(c),
              args: f,
              result: a
            },
            groupId: u
          }
        });
      }), l((a) => {
        jt = void 0, n.addTimelineEvent({
          layerId: Xt,
          event: {
            time: o(),
            logType: "error",
            title: "💥 " + c,
            subtitle: "end",
            data: {
              store: Xe(t.$id),
              action: Xe(c),
              args: f,
              error: a
            },
            groupId: u
          }
        });
      });
    }, !0), t._customProperties.forEach((i) => {
      Mt(() => le(t[i]), (l, c) => {
        n.notifyComponentUpdate(), n.sendInspectorState(Ve), _n && n.addTimelineEvent({
          layerId: Xt,
          event: {
            time: o(),
            title: "Change",
            subtitle: i,
            data: {
              newValue: l,
              oldValue: c
            },
            groupId: jt
          }
        });
      }, { deep: !0 });
    }), t.$subscribe(({ events: i, type: l }, c) => {
      if (n.notifyComponentUpdate(), n.sendInspectorState(Ve), !_n)
        return;
      const f = {
        time: o(),
        title: lp(l),
        data: cp({ store: Xe(t.$id) }, ip(i)),
        groupId: jt
      };
      l === ft.patchFunction ? f.subtitle = "⤵️" : l === ft.patchObject ? f.subtitle = "🧩" : i && !Array.isArray(i) && (f.subtitle = i.type), i && (f.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: i
        }
      }), n.addTimelineEvent({
        layerId: Xt,
        event: f
      });
    }, { detached: !0, flush: "sync" });
    const r = t._hotUpdate;
    t._hotUpdate = bt((i) => {
      r(i), n.addTimelineEvent({
        layerId: Xt,
        event: {
          time: o(),
          title: "🔥 " + t.$id,
          subtitle: "HMR update",
          data: {
            store: Xe(t.$id),
            info: Xe("HMR update")
          }
        }
      }), n.notifyComponentUpdate(), n.sendInspectorTree(Ve), n.sendInspectorState(Ve);
    });
    const { $dispose: s } = t;
    t.$dispose = () => {
      s(), n.notifyComponentUpdate(), n.sendInspectorTree(Ve), n.sendInspectorState(Ve), n.getSettings().logStoreChanges && Ce(`Disposed "${t.$id}" store 🗑`);
    }, n.notifyComponentUpdate(), n.sendInspectorTree(Ve), n.sendInspectorState(Ve), n.getSettings().logStoreChanges && Ce(`"${t.$id}" store installed 🆕`);
  });
}
let Kc = 0, jt;
function Ui(e, t, n) {
  const o = t.reduce((r, s) => (r[s] = z(e)[s], r), {});
  for (const r in o)
    e[r] = function() {
      const s = Kc, i = n ? new Proxy(e, {
        get(...c) {
          return jt = s, Reflect.get(...c);
        },
        set(...c) {
          return jt = s, Reflect.set(...c);
        }
      }) : e;
      jt = s;
      const l = o[r].apply(i, arguments);
      return jt = void 0, l;
    };
}
function fp({ app: e, store: t, options: n }) {
  if (t.$id.startsWith("__hot:"))
    return;
  t._isOptionsAPI = !!n.state, Ui(t, Object.keys(n.actions), t._isOptionsAPI);
  const o = t._hotUpdate;
  z(t)._hotUpdate = function(r) {
    o.apply(this, arguments), Ui(t, Object.keys(r._hmrPayload.actions), !!t._isOptionsAPI);
  }, up(
    e,
    // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
    t
  );
}
function dp() {
  const e = xl(!0), t = e.run(() => $e({}));
  let n = [], o = [];
  const r = bt({
    install(s) {
      Gn(r), r._a = s, s.provide(Lc, r), s.config.globalProperties.$pinia = r, Fn && ap(s, r), o.forEach((i) => n.push(i)), o = [];
    },
    use(s) {
      return !this._a && !kc ? o.push(s) : n.push(s), this;
    },
    _p: n,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return Fn && typeof Proxy < "u" && r.use(fp), r;
}
function zc(e, t) {
  for (const n in t) {
    const o = t[n];
    if (!(n in e))
      continue;
    const r = e[n];
    un(r) && un(o) && !_e(o) && !at(o) ? e[n] = zc(r, o) : e[n] = o;
  }
  return e;
}
const Gc = () => {
};
function Hi(e, t, n, o = Gc) {
  e.push(t);
  const r = () => {
    const s = e.indexOf(t);
    s > -1 && (e.splice(s, 1), o());
  };
  return !n && Rl() && tu(r), r;
}
function pn(e, ...t) {
  e.slice().forEach((n) => {
    n(...t);
  });
}
const pp = (e) => e();
function ts(e, t) {
  e instanceof Map && t instanceof Map && t.forEach((n, o) => e.set(o, n)), e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const o = t[n], r = e[n];
    un(r) && un(o) && e.hasOwnProperty(n) && !_e(o) && !at(o) ? e[n] = ts(r, o) : e[n] = o;
  }
  return e;
}
const hp = ue.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function mp(e) {
  return !un(e) || !e.hasOwnProperty(hp);
}
const { assign: ze } = Object;
function Bi(e) {
  return !!(_e(e) && e.effect);
}
function Wi(e, t, n, o) {
  const { state: r, actions: s, getters: i } = t, l = n.state.value[e];
  let c;
  function f() {
    !l && (ue.NODE_ENV === "production" || !o) && (n.state.value[e] = r ? r() : {});
    const u = ue.NODE_ENV !== "production" && o ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      Lr($e(r ? r() : {}).value)
    ) : Lr(n.state.value[e]);
    return ze(u, s, Object.keys(i || {}).reduce((a, p) => (ue.NODE_ENV !== "production" && p in u && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${p}" in store "${e}".`), a[p] = bt(xe(() => {
      Gn(n);
      const m = n._s.get(e);
      return i[p].call(m, m);
    })), a), {}));
  }
  return c = ns(e, f, t, n, o, !0), c;
}
function ns(e, t, n = {}, o, r, s) {
  let i;
  const l = ze({ actions: {} }, n);
  if (ue.NODE_ENV !== "production" && !o._e.active)
    throw new Error("Pinia destroyed");
  const c = {
    deep: !0
    // flush: 'post',
  };
  ue.NODE_ENV !== "production" && !kc && (c.onTrigger = (L) => {
    f ? m = L : f == !1 && !D._hotUpdating && (Array.isArray(m) ? m.push(L) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let f, u, a = [], p = [], m;
  const _ = o.state.value[e];
  !s && !_ && (ue.NODE_ENV === "production" || !r) && (o.state.value[e] = {});
  const v = $e({});
  let A;
  function P(L) {
    let k;
    f = u = !1, ue.NODE_ENV !== "production" && (m = []), typeof L == "function" ? (L(o.state.value[e]), k = {
      type: ft.patchFunction,
      storeId: e,
      events: m
    }) : (ts(o.state.value[e], L), k = {
      type: ft.patchObject,
      payload: L,
      storeId: e,
      events: m
    });
    const ee = A = Symbol();
    Ho().then(() => {
      A === ee && (f = !0);
    }), u = !0, pn(a, k, o.state.value[e]);
  }
  const M = s ? function() {
    const { state: k } = n, ee = k ? k() : {};
    this.$patch((he) => {
      ze(he, ee);
    });
  } : (
    /* istanbul ignore next */
    ue.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : Gc
  );
  function U() {
    i.stop(), a = [], p = [], o._s.delete(e);
  }
  function Y(L, k) {
    return function() {
      Gn(o);
      const ee = Array.from(arguments), he = [], tt = [];
      function Le(W) {
        he.push(W);
      }
      function Se(W) {
        tt.push(W);
      }
      pn(p, {
        args: ee,
        name: L,
        store: D,
        after: Le,
        onError: Se
      });
      let G;
      try {
        G = k.apply(this && this.$id === e ? this : D, ee);
      } catch (W) {
        throw pn(tt, W), W;
      }
      return G instanceof Promise ? G.then((W) => (pn(he, W), W)).catch((W) => (pn(tt, W), Promise.reject(W))) : (pn(he, G), G);
    };
  }
  const re = /* @__PURE__ */ bt({
    actions: {},
    getters: {},
    state: [],
    hotState: v
  }), pe = {
    _p: o,
    // _s: scope,
    $id: e,
    $onAction: Hi.bind(null, p),
    $patch: P,
    $reset: M,
    $subscribe(L, k = {}) {
      const ee = Hi(a, L, k.detached, () => he()), he = i.run(() => Mt(() => o.state.value[e], (tt) => {
        (k.flush === "sync" ? u : f) && L({
          storeId: e,
          type: ft.direct,
          events: m
        }, tt);
      }, ze({}, c, k)));
      return ee;
    },
    $dispose: U
  }, D = Zn(ue.NODE_ENV !== "production" || Fn ? ze(
    {
      _hmrPayload: re,
      _customProperties: bt(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    pe
    // must be added later
    // setupStore
  ) : pe);
  o._s.set(e, D);
  const fe = (o._a && o._a.runWithContext || pp)(() => o._e.run(() => (i = xl()).run(t)));
  for (const L in fe) {
    const k = fe[L];
    if (_e(k) && !Bi(k) || at(k))
      ue.NODE_ENV !== "production" && r ? _o(v.value, L, yr(fe, L)) : s || (_ && mp(k) && (_e(k) ? k.value = _[L] : ts(k, _[L])), o.state.value[e][L] = k), ue.NODE_ENV !== "production" && re.state.push(L);
    else if (typeof k == "function") {
      const ee = ue.NODE_ENV !== "production" && r ? k : Y(L, k);
      fe[L] = ee, ue.NODE_ENV !== "production" && (re.actions[L] = k), l.actions[L] = k;
    } else
      ue.NODE_ENV !== "production" && Bi(k) && (re.getters[L] = s ? (
        // @ts-expect-error
        n.getters[L]
      ) : k, ur && (fe._getters || // @ts-expect-error: same
      (fe._getters = bt([]))).push(L));
  }
  if (ze(D, fe), ze(z(D), fe), Object.defineProperty(D, "$state", {
    get: () => ue.NODE_ENV !== "production" && r ? v.value : o.state.value[e],
    set: (L) => {
      if (ue.NODE_ENV !== "production" && r)
        throw new Error("cannot set hotState");
      P((k) => {
        ze(k, L);
      });
    }
  }), ue.NODE_ENV !== "production" && (D._hotUpdate = bt((L) => {
    D._hotUpdating = !0, L._hmrPayload.state.forEach((k) => {
      if (k in D.$state) {
        const ee = L.$state[k], he = D.$state[k];
        typeof ee == "object" && un(ee) && un(he) ? zc(ee, he) : L.$state[k] = he;
      }
      _o(D, k, yr(L.$state, k));
    }), Object.keys(D.$state).forEach((k) => {
      k in L.$state || Rr(D, k);
    }), f = !1, u = !1, o.state.value[e] = yr(L._hmrPayload, "hotState"), u = !0, Ho().then(() => {
      f = !0;
    });
    for (const k in L._hmrPayload.actions) {
      const ee = L[k];
      _o(D, k, Y(k, ee));
    }
    for (const k in L._hmrPayload.getters) {
      const ee = L._hmrPayload.getters[k], he = s ? (
        // special handling of options api
        xe(() => (Gn(o), ee.call(D, D)))
      ) : ee;
      _o(D, k, he);
    }
    Object.keys(D._hmrPayload.getters).forEach((k) => {
      k in L._hmrPayload.getters || Rr(D, k);
    }), Object.keys(D._hmrPayload.actions).forEach((k) => {
      k in L._hmrPayload.actions || Rr(D, k);
    }), D._hmrPayload = L._hmrPayload, D._getters = L._getters, D._hotUpdating = !1;
  })), Fn) {
    const L = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((k) => {
      Object.defineProperty(D, k, ze({ value: D[k] }, L));
    });
  }
  return o._p.forEach((L) => {
    if (Fn) {
      const k = i.run(() => L({
        store: D,
        app: o._a,
        pinia: o,
        options: l
      }));
      Object.keys(k || {}).forEach((ee) => D._customProperties.add(ee)), ze(D, k);
    } else
      ze(D, i.run(() => L({
        store: D,
        app: o._a,
        pinia: o,
        options: l
      })));
  }), ue.NODE_ENV !== "production" && D.$state && typeof D.$state == "object" && typeof D.$state.constructor == "function" && !D.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${D.$id}".`), _ && s && n.hydrate && n.hydrate(D.$state, _), f = !0, u = !0, D;
}
function Jc(e, t, n) {
  let o, r;
  const s = typeof t == "function";
  if (typeof e == "string")
    o = e, r = s ? n : t;
  else if (r = e, o = e.id, ue.NODE_ENV !== "production" && typeof o != "string")
    throw new Error('[🍍]: "defineStore()" must be passed a store id as its first argument.');
  function i(l, c) {
    const f = $f();
    if (l = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (ue.NODE_ENV === "test" && kn && kn._testing ? null : l) || (f ? ut(Lc, null) : null), l && Gn(l), ue.NODE_ENV !== "production" && !kn)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    l = kn, l._s.has(o) || (s ? ns(o, t, r, l) : Wi(o, r, l), ue.NODE_ENV !== "production" && (i._pinia = l));
    const u = l._s.get(o);
    if (ue.NODE_ENV !== "production" && c) {
      const a = "__hot:" + o, p = s ? ns(a, t, r, l, !0) : Wi(a, ze({}, r), l, !0);
      c._hotUpdate(p), delete l.state.value[a], l._s.delete(a);
    }
    if (ue.NODE_ENV !== "production" && ur) {
      const a = Ms();
      if (a && a.proxy && // avoid adding stores that are just built for hot module replacement
      !c) {
        const p = a.proxy, m = "_pStores" in p ? p._pStores : p._pStores = {};
        m[o] = u;
      }
    }
    return u;
  }
  return i.$id = o, i;
}
function Yc(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: gp } = Object.prototype, { getPrototypeOf: qs } = Object, fr = /* @__PURE__ */ ((e) => (t) => {
  const n = gp.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), pt = (e) => (e = e.toLowerCase(), (t) => fr(t) === e), dr = (e) => (t) => typeof t === e, { isArray: xn } = Array, Jn = dr("undefined");
function _p(e) {
  return e !== null && !Jn(e) && e.constructor !== null && !Jn(e.constructor) && Je(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Xc = pt("ArrayBuffer");
function Ep(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Xc(e.buffer), t;
}
const yp = dr("string"), Je = dr("function"), Qc = dr("number"), pr = (e) => e !== null && typeof e == "object", bp = (e) => e === !0 || e === !1, Ao = (e) => {
  if (fr(e) !== "object")
    return !1;
  const t = qs(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, vp = pt("Date"), Np = pt("File"), wp = pt("Blob"), Op = pt("FileList"), Sp = (e) => pr(e) && Je(e.pipe), xp = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || Je(e.append) && ((t = fr(e)) === "formdata" || // detect form-data instance
  t === "object" && Je(e.toString) && e.toString() === "[object FormData]"));
}, Rp = pt("URLSearchParams"), Pp = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function ro(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let o, r;
  if (typeof e != "object" && (e = [e]), xn(e))
    for (o = 0, r = e.length; o < r; o++)
      t.call(null, e[o], o, e);
  else {
    const s = n ? Object.getOwnPropertyNames(e) : Object.keys(e), i = s.length;
    let l;
    for (o = 0; o < i; o++)
      l = s[o], t.call(null, e[l], l, e);
  }
}
function Zc(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let o = n.length, r;
  for (; o-- > 0; )
    if (r = n[o], t === r.toLowerCase())
      return r;
  return null;
}
const ea = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, ta = (e) => !Jn(e) && e !== ea;
function os() {
  const { caseless: e } = ta(this) && this || {}, t = {}, n = (o, r) => {
    const s = e && Zc(t, r) || r;
    Ao(t[s]) && Ao(o) ? t[s] = os(t[s], o) : Ao(o) ? t[s] = os({}, o) : xn(o) ? t[s] = o.slice() : t[s] = o;
  };
  for (let o = 0, r = arguments.length; o < r; o++)
    arguments[o] && ro(arguments[o], n);
  return t;
}
const Dp = (e, t, n, { allOwnKeys: o } = {}) => (ro(t, (r, s) => {
  n && Je(r) ? e[s] = Yc(r, n) : e[s] = r;
}, { allOwnKeys: o }), e), Cp = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), $p = (e, t, n, o) => {
  e.prototype = Object.create(t.prototype, o), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, Tp = (e, t, n, o) => {
  let r, s, i;
  const l = {};
  if (t = t || {}, e == null)
    return t;
  do {
    for (r = Object.getOwnPropertyNames(e), s = r.length; s-- > 0; )
      i = r[s], (!o || o(i, e, t)) && !l[i] && (t[i] = e[i], l[i] = !0);
    e = n !== !1 && qs(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, Ap = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const o = e.indexOf(t, n);
  return o !== -1 && o === n;
}, Vp = (e) => {
  if (!e)
    return null;
  if (xn(e))
    return e;
  let t = e.length;
  if (!Qc(t))
    return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, Ip = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && qs(Uint8Array)), kp = (e, t) => {
  const o = (e && e[Symbol.iterator]).call(e);
  let r;
  for (; (r = o.next()) && !r.done; ) {
    const s = r.value;
    t.call(e, s[0], s[1]);
  }
}, jp = (e, t) => {
  let n;
  const o = [];
  for (; (n = e.exec(t)) !== null; )
    o.push(n);
  return o;
}, Lp = pt("HTMLFormElement"), Mp = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, o, r) {
    return o.toUpperCase() + r;
  }
), qi = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), Fp = pt("RegExp"), na = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), o = {};
  ro(n, (r, s) => {
    let i;
    (i = t(r, s, e)) !== !1 && (o[s] = i || r);
  }), Object.defineProperties(e, o);
}, Up = (e) => {
  na(e, (t, n) => {
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
}, Hp = (e, t) => {
  const n = {}, o = (r) => {
    r.forEach((s) => {
      n[s] = !0;
    });
  };
  return xn(e) ? o(e) : o(String(e).split(t)), n;
}, Bp = () => {
}, Wp = (e, t) => (e = +e, Number.isFinite(e) ? e : t), Pr = "abcdefghijklmnopqrstuvwxyz", Ki = "0123456789", oa = {
  DIGIT: Ki,
  ALPHA: Pr,
  ALPHA_DIGIT: Pr + Pr.toUpperCase() + Ki
}, qp = (e = 16, t = oa.ALPHA_DIGIT) => {
  let n = "";
  const { length: o } = t;
  for (; e--; )
    n += t[Math.random() * o | 0];
  return n;
};
function Kp(e) {
  return !!(e && Je(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const zp = (e) => {
  const t = new Array(10), n = (o, r) => {
    if (pr(o)) {
      if (t.indexOf(o) >= 0)
        return;
      if (!("toJSON" in o)) {
        t[r] = o;
        const s = xn(o) ? [] : {};
        return ro(o, (i, l) => {
          const c = n(i, r + 1);
          !Jn(c) && (s[l] = c);
        }), t[r] = void 0, s;
      }
    }
    return o;
  };
  return n(e, 0);
}, Gp = pt("AsyncFunction"), Jp = (e) => e && (pr(e) || Je(e)) && Je(e.then) && Je(e.catch), N = {
  isArray: xn,
  isArrayBuffer: Xc,
  isBuffer: _p,
  isFormData: xp,
  isArrayBufferView: Ep,
  isString: yp,
  isNumber: Qc,
  isBoolean: bp,
  isObject: pr,
  isPlainObject: Ao,
  isUndefined: Jn,
  isDate: vp,
  isFile: Np,
  isBlob: wp,
  isRegExp: Fp,
  isFunction: Je,
  isStream: Sp,
  isURLSearchParams: Rp,
  isTypedArray: Ip,
  isFileList: Op,
  forEach: ro,
  merge: os,
  extend: Dp,
  trim: Pp,
  stripBOM: Cp,
  inherits: $p,
  toFlatObject: Tp,
  kindOf: fr,
  kindOfTest: pt,
  endsWith: Ap,
  toArray: Vp,
  forEachEntry: kp,
  matchAll: jp,
  isHTMLForm: Lp,
  hasOwnProperty: qi,
  hasOwnProp: qi,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: na,
  freezeMethods: Up,
  toObjectSet: Hp,
  toCamelCase: Mp,
  noop: Bp,
  toFiniteNumber: Wp,
  findKey: Zc,
  global: ea,
  isContextDefined: ta,
  ALPHABET: oa,
  generateString: qp,
  isSpecCompliantForm: Kp,
  toJSONObject: zp,
  isAsyncFn: Gp,
  isThenable: Jp
};
function se(e, t, n, o, r) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), o && (this.request = o), r && (this.response = r);
}
N.inherits(se, Error, {
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
      config: N.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const ra = se.prototype, sa = {};
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
  sa[e] = { value: e };
});
Object.defineProperties(se, sa);
Object.defineProperty(ra, "isAxiosError", { value: !0 });
se.from = (e, t, n, o, r, s) => {
  const i = Object.create(ra);
  return N.toFlatObject(e, i, function(c) {
    return c !== Error.prototype;
  }, (l) => l !== "isAxiosError"), se.call(i, e.message, t, n, o, r), i.cause = e, i.name = e.name, s && Object.assign(i, s), i;
};
const Yp = null;
function rs(e) {
  return N.isPlainObject(e) || N.isArray(e);
}
function ia(e) {
  return N.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function zi(e, t, n) {
  return e ? e.concat(t).map(function(r, s) {
    return r = ia(r), !n && s ? "[" + r + "]" : r;
  }).join(n ? "." : "") : t;
}
function Xp(e) {
  return N.isArray(e) && !e.some(rs);
}
const Qp = N.toFlatObject(N, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function hr(e, t, n) {
  if (!N.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = N.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(v, A) {
    return !N.isUndefined(A[v]);
  });
  const o = n.metaTokens, r = n.visitor || u, s = n.dots, i = n.indexes, c = (n.Blob || typeof Blob < "u" && Blob) && N.isSpecCompliantForm(t);
  if (!N.isFunction(r))
    throw new TypeError("visitor must be a function");
  function f(_) {
    if (_ === null)
      return "";
    if (N.isDate(_))
      return _.toISOString();
    if (!c && N.isBlob(_))
      throw new se("Blob is not supported. Use a Buffer instead.");
    return N.isArrayBuffer(_) || N.isTypedArray(_) ? c && typeof Blob == "function" ? new Blob([_]) : Buffer.from(_) : _;
  }
  function u(_, v, A) {
    let P = _;
    if (_ && !A && typeof _ == "object") {
      if (N.endsWith(v, "{}"))
        v = o ? v : v.slice(0, -2), _ = JSON.stringify(_);
      else if (N.isArray(_) && Xp(_) || (N.isFileList(_) || N.endsWith(v, "[]")) && (P = N.toArray(_)))
        return v = ia(v), P.forEach(function(U, Y) {
          !(N.isUndefined(U) || U === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            i === !0 ? zi([v], Y, s) : i === null ? v : v + "[]",
            f(U)
          );
        }), !1;
    }
    return rs(_) ? !0 : (t.append(zi(A, v, s), f(_)), !1);
  }
  const a = [], p = Object.assign(Qp, {
    defaultVisitor: u,
    convertValue: f,
    isVisitable: rs
  });
  function m(_, v) {
    if (!N.isUndefined(_)) {
      if (a.indexOf(_) !== -1)
        throw Error("Circular reference detected in " + v.join("."));
      a.push(_), N.forEach(_, function(P, M) {
        (!(N.isUndefined(P) || P === null) && r.call(
          t,
          P,
          N.isString(M) ? M.trim() : M,
          v,
          p
        )) === !0 && m(P, v ? v.concat(M) : [M]);
      }), a.pop();
    }
  }
  if (!N.isObject(e))
    throw new TypeError("data must be an object");
  return m(e), t;
}
function Gi(e) {
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
function Ks(e, t) {
  this._pairs = [], e && hr(e, this, t);
}
const la = Ks.prototype;
la.append = function(t, n) {
  this._pairs.push([t, n]);
};
la.toString = function(t) {
  const n = t ? function(o) {
    return t.call(this, o, Gi);
  } : Gi;
  return this._pairs.map(function(r) {
    return n(r[0]) + "=" + n(r[1]);
  }, "").join("&");
};
function Zp(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function ca(e, t, n) {
  if (!t)
    return e;
  const o = n && n.encode || Zp, r = n && n.serialize;
  let s;
  if (r ? s = r(t, n) : s = N.isURLSearchParams(t) ? t.toString() : new Ks(t, n).toString(o), s) {
    const i = e.indexOf("#");
    i !== -1 && (e = e.slice(0, i)), e += (e.indexOf("?") === -1 ? "?" : "&") + s;
  }
  return e;
}
class Ji {
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
    N.forEach(this.handlers, function(o) {
      o !== null && t(o);
    });
  }
}
const aa = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, eh = typeof URLSearchParams < "u" ? URLSearchParams : Ks, th = typeof FormData < "u" ? FormData : null, nh = typeof Blob < "u" ? Blob : null, oh = {
  isBrowser: !0,
  classes: {
    URLSearchParams: eh,
    FormData: th,
    Blob: nh
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, ua = typeof window < "u" && typeof document < "u", rh = ((e) => ua && ["ReactNative", "NativeScript", "NS"].indexOf(e) < 0)(typeof navigator < "u" && navigator.product), sh = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", ih = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: ua,
  hasStandardBrowserEnv: rh,
  hasStandardBrowserWebWorkerEnv: sh
}, Symbol.toStringTag, { value: "Module" })), lt = {
  ...ih,
  ...oh
};
function lh(e, t) {
  return hr(e, new lt.classes.URLSearchParams(), Object.assign({
    visitor: function(n, o, r, s) {
      return lt.isNode && N.isBuffer(n) ? (this.append(o, n.toString("base64")), !1) : s.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function ch(e) {
  return N.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function ah(e) {
  const t = {}, n = Object.keys(e);
  let o;
  const r = n.length;
  let s;
  for (o = 0; o < r; o++)
    s = n[o], t[s] = e[s];
  return t;
}
function fa(e) {
  function t(n, o, r, s) {
    let i = n[s++];
    if (i === "__proto__")
      return !0;
    const l = Number.isFinite(+i), c = s >= n.length;
    return i = !i && N.isArray(r) ? r.length : i, c ? (N.hasOwnProp(r, i) ? r[i] = [r[i], o] : r[i] = o, !l) : ((!r[i] || !N.isObject(r[i])) && (r[i] = []), t(n, o, r[i], s) && N.isArray(r[i]) && (r[i] = ah(r[i])), !l);
  }
  if (N.isFormData(e) && N.isFunction(e.entries)) {
    const n = {};
    return N.forEachEntry(e, (o, r) => {
      t(ch(o), r, n, 0);
    }), n;
  }
  return null;
}
function uh(e, t, n) {
  if (N.isString(e))
    try {
      return (t || JSON.parse)(e), N.trim(e);
    } catch (o) {
      if (o.name !== "SyntaxError")
        throw o;
    }
  return (n || JSON.stringify)(e);
}
const zs = {
  transitional: aa,
  adapter: ["xhr", "http"],
  transformRequest: [function(t, n) {
    const o = n.getContentType() || "", r = o.indexOf("application/json") > -1, s = N.isObject(t);
    if (s && N.isHTMLForm(t) && (t = new FormData(t)), N.isFormData(t))
      return r ? JSON.stringify(fa(t)) : t;
    if (N.isArrayBuffer(t) || N.isBuffer(t) || N.isStream(t) || N.isFile(t) || N.isBlob(t))
      return t;
    if (N.isArrayBufferView(t))
      return t.buffer;
    if (N.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let l;
    if (s) {
      if (o.indexOf("application/x-www-form-urlencoded") > -1)
        return lh(t, this.formSerializer).toString();
      if ((l = N.isFileList(t)) || o.indexOf("multipart/form-data") > -1) {
        const c = this.env && this.env.FormData;
        return hr(
          l ? { "files[]": t } : t,
          c && new c(),
          this.formSerializer
        );
      }
    }
    return s || r ? (n.setContentType("application/json", !1), uh(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || zs.transitional, o = n && n.forcedJSONParsing, r = this.responseType === "json";
    if (t && N.isString(t) && (o && !this.responseType || r)) {
      const i = !(n && n.silentJSONParsing) && r;
      try {
        return JSON.parse(t);
      } catch (l) {
        if (i)
          throw l.name === "SyntaxError" ? se.from(l, se.ERR_BAD_RESPONSE, this, null, this.response) : l;
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
    FormData: lt.classes.FormData,
    Blob: lt.classes.Blob
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
N.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  zs.headers[e] = {};
});
const Gs = zs, fh = N.toObjectSet([
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
]), dh = (e) => {
  const t = {};
  let n, o, r;
  return e && e.split(`
`).forEach(function(i) {
    r = i.indexOf(":"), n = i.substring(0, r).trim().toLowerCase(), o = i.substring(r + 1).trim(), !(!n || t[n] && fh[n]) && (n === "set-cookie" ? t[n] ? t[n].push(o) : t[n] = [o] : t[n] = t[n] ? t[n] + ", " + o : o);
  }), t;
}, Yi = Symbol("internals");
function $n(e) {
  return e && String(e).trim().toLowerCase();
}
function Vo(e) {
  return e === !1 || e == null ? e : N.isArray(e) ? e.map(Vo) : String(e);
}
function ph(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let o;
  for (; o = n.exec(e); )
    t[o[1]] = o[2];
  return t;
}
const hh = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Dr(e, t, n, o, r) {
  if (N.isFunction(o))
    return o.call(this, t, n);
  if (r && (t = n), !!N.isString(t)) {
    if (N.isString(o))
      return t.indexOf(o) !== -1;
    if (N.isRegExp(o))
      return o.test(t);
  }
}
function mh(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, o) => n.toUpperCase() + o);
}
function gh(e, t) {
  const n = N.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((o) => {
    Object.defineProperty(e, o + n, {
      value: function(r, s, i) {
        return this[o].call(this, t, r, s, i);
      },
      configurable: !0
    });
  });
}
class mr {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, o) {
    const r = this;
    function s(l, c, f) {
      const u = $n(c);
      if (!u)
        throw new Error("header name must be a non-empty string");
      const a = N.findKey(r, u);
      (!a || r[a] === void 0 || f === !0 || f === void 0 && r[a] !== !1) && (r[a || c] = Vo(l));
    }
    const i = (l, c) => N.forEach(l, (f, u) => s(f, u, c));
    return N.isPlainObject(t) || t instanceof this.constructor ? i(t, n) : N.isString(t) && (t = t.trim()) && !hh(t) ? i(dh(t), n) : t != null && s(n, t, o), this;
  }
  get(t, n) {
    if (t = $n(t), t) {
      const o = N.findKey(this, t);
      if (o) {
        const r = this[o];
        if (!n)
          return r;
        if (n === !0)
          return ph(r);
        if (N.isFunction(n))
          return n.call(this, r, o);
        if (N.isRegExp(n))
          return n.exec(r);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = $n(t), t) {
      const o = N.findKey(this, t);
      return !!(o && this[o] !== void 0 && (!n || Dr(this, this[o], o, n)));
    }
    return !1;
  }
  delete(t, n) {
    const o = this;
    let r = !1;
    function s(i) {
      if (i = $n(i), i) {
        const l = N.findKey(o, i);
        l && (!n || Dr(o, o[l], l, n)) && (delete o[l], r = !0);
      }
    }
    return N.isArray(t) ? t.forEach(s) : s(t), r;
  }
  clear(t) {
    const n = Object.keys(this);
    let o = n.length, r = !1;
    for (; o--; ) {
      const s = n[o];
      (!t || Dr(this, this[s], s, t, !0)) && (delete this[s], r = !0);
    }
    return r;
  }
  normalize(t) {
    const n = this, o = {};
    return N.forEach(this, (r, s) => {
      const i = N.findKey(o, s);
      if (i) {
        n[i] = Vo(r), delete n[s];
        return;
      }
      const l = t ? mh(s) : String(s).trim();
      l !== s && delete n[s], n[l] = Vo(r), o[l] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return N.forEach(this, (o, r) => {
      o != null && o !== !1 && (n[r] = t && N.isArray(o) ? o.join(", ") : o);
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
    const o = (this[Yi] = this[Yi] = {
      accessors: {}
    }).accessors, r = this.prototype;
    function s(i) {
      const l = $n(i);
      o[l] || (gh(r, i), o[l] = !0);
    }
    return N.isArray(t) ? t.forEach(s) : s(t), this;
  }
}
mr.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
N.reduceDescriptors(mr.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(o) {
      this[n] = o;
    }
  };
});
N.freezeMethods(mr);
const Nt = mr;
function Cr(e, t) {
  const n = this || Gs, o = t || n, r = Nt.from(o.headers);
  let s = o.data;
  return N.forEach(e, function(l) {
    s = l.call(n, s, r.normalize(), t ? t.status : void 0);
  }), r.normalize(), s;
}
function da(e) {
  return !!(e && e.__CANCEL__);
}
function so(e, t, n) {
  se.call(this, e ?? "canceled", se.ERR_CANCELED, t, n), this.name = "CanceledError";
}
N.inherits(so, se, {
  __CANCEL__: !0
});
function _h(e, t, n) {
  const o = n.config.validateStatus;
  !n.status || !o || o(n.status) ? e(n) : t(new se(
    "Request failed with status code " + n.status,
    [se.ERR_BAD_REQUEST, se.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
const Eh = lt.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, n, o, r, s) {
      const i = [e + "=" + encodeURIComponent(t)];
      N.isNumber(n) && i.push("expires=" + new Date(n).toGMTString()), N.isString(o) && i.push("path=" + o), N.isString(r) && i.push("domain=" + r), s === !0 && i.push("secure"), document.cookie = i.join("; ");
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
function yh(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function bh(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function pa(e, t) {
  return e && !yh(t) ? bh(e, t) : t;
}
const vh = lt.hasStandardBrowserEnv ? (
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
      const l = N.isString(i) ? r(i) : i;
      return l.protocol === o.protocol && l.host === o.host;
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
function Nh(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function wh(e, t) {
  e = e || 10;
  const n = new Array(e), o = new Array(e);
  let r = 0, s = 0, i;
  return t = t !== void 0 ? t : 1e3, function(c) {
    const f = Date.now(), u = o[s];
    i || (i = f), n[r] = c, o[r] = f;
    let a = s, p = 0;
    for (; a !== r; )
      p += n[a++], a = a % e;
    if (r = (r + 1) % e, r === s && (s = (s + 1) % e), f - i < t)
      return;
    const m = u && f - u;
    return m ? Math.round(p * 1e3 / m) : void 0;
  };
}
function Xi(e, t) {
  let n = 0;
  const o = wh(50, 250);
  return (r) => {
    const s = r.loaded, i = r.lengthComputable ? r.total : void 0, l = s - n, c = o(l), f = s <= i;
    n = s;
    const u = {
      loaded: s,
      total: i,
      progress: i ? s / i : void 0,
      bytes: l,
      rate: c || void 0,
      estimated: c && i && f ? (i - s) / c : void 0,
      event: r
    };
    u[t ? "download" : "upload"] = !0, e(u);
  };
}
const Oh = typeof XMLHttpRequest < "u", Sh = Oh && function(e) {
  return new Promise(function(n, o) {
    let r = e.data;
    const s = Nt.from(e.headers).normalize();
    let { responseType: i, withXSRFToken: l } = e, c;
    function f() {
      e.cancelToken && e.cancelToken.unsubscribe(c), e.signal && e.signal.removeEventListener("abort", c);
    }
    let u;
    if (N.isFormData(r)) {
      if (lt.hasStandardBrowserEnv || lt.hasStandardBrowserWebWorkerEnv)
        s.setContentType(!1);
      else if ((u = s.getContentType()) !== !1) {
        const [v, ...A] = u ? u.split(";").map((P) => P.trim()).filter(Boolean) : [];
        s.setContentType([v || "multipart/form-data", ...A].join("; "));
      }
    }
    let a = new XMLHttpRequest();
    if (e.auth) {
      const v = e.auth.username || "", A = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
      s.set("Authorization", "Basic " + btoa(v + ":" + A));
    }
    const p = pa(e.baseURL, e.url);
    a.open(e.method.toUpperCase(), ca(p, e.params, e.paramsSerializer), !0), a.timeout = e.timeout;
    function m() {
      if (!a)
        return;
      const v = Nt.from(
        "getAllResponseHeaders" in a && a.getAllResponseHeaders()
      ), P = {
        data: !i || i === "text" || i === "json" ? a.responseText : a.response,
        status: a.status,
        statusText: a.statusText,
        headers: v,
        config: e,
        request: a
      };
      _h(function(U) {
        n(U), f();
      }, function(U) {
        o(U), f();
      }, P), a = null;
    }
    if ("onloadend" in a ? a.onloadend = m : a.onreadystatechange = function() {
      !a || a.readyState !== 4 || a.status === 0 && !(a.responseURL && a.responseURL.indexOf("file:") === 0) || setTimeout(m);
    }, a.onabort = function() {
      a && (o(new se("Request aborted", se.ECONNABORTED, e, a)), a = null);
    }, a.onerror = function() {
      o(new se("Network Error", se.ERR_NETWORK, e, a)), a = null;
    }, a.ontimeout = function() {
      let A = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded";
      const P = e.transitional || aa;
      e.timeoutErrorMessage && (A = e.timeoutErrorMessage), o(new se(
        A,
        P.clarifyTimeoutError ? se.ETIMEDOUT : se.ECONNABORTED,
        e,
        a
      )), a = null;
    }, lt.hasStandardBrowserEnv && (l && N.isFunction(l) && (l = l(e)), l || l !== !1 && vh(p))) {
      const v = e.xsrfHeaderName && e.xsrfCookieName && Eh.read(e.xsrfCookieName);
      v && s.set(e.xsrfHeaderName, v);
    }
    r === void 0 && s.setContentType(null), "setRequestHeader" in a && N.forEach(s.toJSON(), function(A, P) {
      a.setRequestHeader(P, A);
    }), N.isUndefined(e.withCredentials) || (a.withCredentials = !!e.withCredentials), i && i !== "json" && (a.responseType = e.responseType), typeof e.onDownloadProgress == "function" && a.addEventListener("progress", Xi(e.onDownloadProgress, !0)), typeof e.onUploadProgress == "function" && a.upload && a.upload.addEventListener("progress", Xi(e.onUploadProgress)), (e.cancelToken || e.signal) && (c = (v) => {
      a && (o(!v || v.type ? new so(null, e, a) : v), a.abort(), a = null);
    }, e.cancelToken && e.cancelToken.subscribe(c), e.signal && (e.signal.aborted ? c() : e.signal.addEventListener("abort", c)));
    const _ = Nh(p);
    if (_ && lt.protocols.indexOf(_) === -1) {
      o(new se("Unsupported protocol " + _ + ":", se.ERR_BAD_REQUEST, e));
      return;
    }
    a.send(r || null);
  });
}, ss = {
  http: Yp,
  xhr: Sh
};
N.forEach(ss, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const Qi = (e) => `- ${e}`, xh = (e) => N.isFunction(e) || e === null || e === !1, ha = {
  getAdapter: (e) => {
    e = N.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, o;
    const r = {};
    for (let s = 0; s < t; s++) {
      n = e[s];
      let i;
      if (o = n, !xh(n) && (o = ss[(i = String(n)).toLowerCase()], o === void 0))
        throw new se(`Unknown adapter '${i}'`);
      if (o)
        break;
      r[i || "#" + s] = o;
    }
    if (!o) {
      const s = Object.entries(r).map(
        ([l, c]) => `adapter ${l} ` + (c === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let i = t ? s.length > 1 ? `since :
` + s.map(Qi).join(`
`) : " " + Qi(s[0]) : "as no adapter specified";
      throw new se(
        "There is no suitable adapter to dispatch the request " + i,
        "ERR_NOT_SUPPORT"
      );
    }
    return o;
  },
  adapters: ss
};
function $r(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new so(null, e);
}
function Zi(e) {
  return $r(e), e.headers = Nt.from(e.headers), e.data = Cr.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), ha.getAdapter(e.adapter || Gs.adapter)(e).then(function(o) {
    return $r(e), o.data = Cr.call(
      e,
      e.transformResponse,
      o
    ), o.headers = Nt.from(o.headers), o;
  }, function(o) {
    return da(o) || ($r(e), o && o.response && (o.response.data = Cr.call(
      e,
      e.transformResponse,
      o.response
    ), o.response.headers = Nt.from(o.response.headers))), Promise.reject(o);
  });
}
const el = (e) => e instanceof Nt ? e.toJSON() : e;
function wn(e, t) {
  t = t || {};
  const n = {};
  function o(f, u, a) {
    return N.isPlainObject(f) && N.isPlainObject(u) ? N.merge.call({ caseless: a }, f, u) : N.isPlainObject(u) ? N.merge({}, u) : N.isArray(u) ? u.slice() : u;
  }
  function r(f, u, a) {
    if (N.isUndefined(u)) {
      if (!N.isUndefined(f))
        return o(void 0, f, a);
    } else
      return o(f, u, a);
  }
  function s(f, u) {
    if (!N.isUndefined(u))
      return o(void 0, u);
  }
  function i(f, u) {
    if (N.isUndefined(u)) {
      if (!N.isUndefined(f))
        return o(void 0, f);
    } else
      return o(void 0, u);
  }
  function l(f, u, a) {
    if (a in t)
      return o(f, u);
    if (a in e)
      return o(void 0, f);
  }
  const c = {
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
    validateStatus: l,
    headers: (f, u) => r(el(f), el(u), !0)
  };
  return N.forEach(Object.keys(Object.assign({}, e, t)), function(u) {
    const a = c[u] || r, p = a(e[u], t[u], u);
    N.isUndefined(p) && a !== l || (n[u] = p);
  }), n;
}
const ma = "1.6.7", Js = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  Js[e] = function(o) {
    return typeof o === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const tl = {};
Js.transitional = function(t, n, o) {
  function r(s, i) {
    return "[Axios v" + ma + "] Transitional option '" + s + "'" + i + (o ? ". " + o : "");
  }
  return (s, i, l) => {
    if (t === !1)
      throw new se(
        r(i, " has been removed" + (n ? " in " + n : "")),
        se.ERR_DEPRECATED
      );
    return n && !tl[i] && (tl[i] = !0, console.warn(
      r(
        i,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(s, i, l) : !0;
  };
};
function Rh(e, t, n) {
  if (typeof e != "object")
    throw new se("options must be an object", se.ERR_BAD_OPTION_VALUE);
  const o = Object.keys(e);
  let r = o.length;
  for (; r-- > 0; ) {
    const s = o[r], i = t[s];
    if (i) {
      const l = e[s], c = l === void 0 || i(l, s, e);
      if (c !== !0)
        throw new se("option " + s + " must be " + c, se.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new se("Unknown option " + s, se.ERR_BAD_OPTION);
  }
}
const is = {
  assertOptions: Rh,
  validators: Js
}, Dt = is.validators;
class Jo {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new Ji(),
      response: new Ji()
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
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = wn(this.defaults, n);
    const { transitional: o, paramsSerializer: r, headers: s } = n;
    o !== void 0 && is.assertOptions(o, {
      silentJSONParsing: Dt.transitional(Dt.boolean),
      forcedJSONParsing: Dt.transitional(Dt.boolean),
      clarifyTimeoutError: Dt.transitional(Dt.boolean)
    }, !1), r != null && (N.isFunction(r) ? n.paramsSerializer = {
      serialize: r
    } : is.assertOptions(r, {
      encode: Dt.function,
      serialize: Dt.function
    }, !0)), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let i = s && N.merge(
      s.common,
      s[n.method]
    );
    s && N.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (_) => {
        delete s[_];
      }
    ), n.headers = Nt.concat(i, s);
    const l = [];
    let c = !0;
    this.interceptors.request.forEach(function(v) {
      typeof v.runWhen == "function" && v.runWhen(n) === !1 || (c = c && v.synchronous, l.unshift(v.fulfilled, v.rejected));
    });
    const f = [];
    this.interceptors.response.forEach(function(v) {
      f.push(v.fulfilled, v.rejected);
    });
    let u, a = 0, p;
    if (!c) {
      const _ = [Zi.bind(this), void 0];
      for (_.unshift.apply(_, l), _.push.apply(_, f), p = _.length, u = Promise.resolve(n); a < p; )
        u = u.then(_[a++], _[a++]);
      return u;
    }
    p = l.length;
    let m = n;
    for (a = 0; a < p; ) {
      const _ = l[a++], v = l[a++];
      try {
        m = _(m);
      } catch (A) {
        v.call(this, A);
        break;
      }
    }
    try {
      u = Zi.call(this, m);
    } catch (_) {
      return Promise.reject(_);
    }
    for (a = 0, p = f.length; a < p; )
      u = u.then(f[a++], f[a++]);
    return u;
  }
  getUri(t) {
    t = wn(this.defaults, t);
    const n = pa(t.baseURL, t.url);
    return ca(n, t.params, t.paramsSerializer);
  }
}
N.forEach(["delete", "get", "head", "options"], function(t) {
  Jo.prototype[t] = function(n, o) {
    return this.request(wn(o || {}, {
      method: t,
      url: n,
      data: (o || {}).data
    }));
  };
});
N.forEach(["post", "put", "patch"], function(t) {
  function n(o) {
    return function(s, i, l) {
      return this.request(wn(l || {}, {
        method: t,
        headers: o ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: s,
        data: i
      }));
    };
  }
  Jo.prototype[t] = n(), Jo.prototype[t + "Form"] = n(!0);
});
const Io = Jo;
class Ys {
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
      const i = new Promise((l) => {
        o.subscribe(l), s = l;
      }).then(r);
      return i.cancel = function() {
        o.unsubscribe(s);
      }, i;
    }, t(function(s, i, l) {
      o.reason || (o.reason = new so(s, i, l), n(o.reason));
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
      token: new Ys(function(r) {
        t = r;
      }),
      cancel: t
    };
  }
}
const Ph = Ys;
function Dh(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function Ch(e) {
  return N.isObject(e) && e.isAxiosError === !0;
}
const ls = {
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
Object.entries(ls).forEach(([e, t]) => {
  ls[t] = e;
});
const $h = ls;
function ga(e) {
  const t = new Io(e), n = Yc(Io.prototype.request, t);
  return N.extend(n, Io.prototype, t, { allOwnKeys: !0 }), N.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(r) {
    return ga(wn(e, r));
  }, n;
}
const Oe = ga(Gs);
Oe.Axios = Io;
Oe.CanceledError = so;
Oe.CancelToken = Ph;
Oe.isCancel = da;
Oe.VERSION = ma;
Oe.toFormData = hr;
Oe.AxiosError = se;
Oe.Cancel = Oe.CanceledError;
Oe.all = function(t) {
  return Promise.all(t);
};
Oe.spread = Dh;
Oe.isAxiosError = Ch;
Oe.mergeConfig = wn;
Oe.AxiosHeaders = Nt;
Oe.formToJSON = (e) => fa(N.isHTMLForm(e) ? new FormData(e) : e);
Oe.getAdapter = ha.getAdapter;
Oe.HttpStatusCode = $h;
Oe.default = Oe;
var bn;
const Zt = class Zt {
  constructor(t, n, o = "api") {
    ri(this, bn, {
      page: "api",
      type: "module",
      prefix: "REPLACE_WITH_MODULE_NAME",
      route: ""
    });
    ao(this, bn).prefix = n, ao(this, bn).page = o, this.client = Oe.create({
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
    const n = new URL(location.href).searchParams, o = { ...ao(this, bn) }, r = ["type", "page"];
    for (const [s, i] of n)
      r.includes(s) || (o[s] = i);
    return window.redcap_csrf_token && (o.redcap_csrf_token = window.redcap_csrf_token), o;
  }
  static makeRoute(t, n = {}) {
    return n.params = n.params || {}, n.params.route = encodeURIComponent(t), n;
  }
  read(t, n = {}) {
    return n = Zt.makeRoute(t, n), this.client.get("", n);
  }
  readOne(t, n, o = {}) {
    return o = Zt.makeRoute(`${t}/${n}`, o), this.client.get("", o);
  }
  create(t, n, o = {}) {
    return o = Zt.makeRoute(`${t}`, o), this.client.post("", n, o);
  }
  update(t, n, o, r = {}) {
    return r = Zt.makeRoute(`${t}/${n}`, r), this.client.put("", o, r);
  }
  delete(t, n, o = {}) {
    return o = Zt.makeRoute(`${t}/${n}`, o), this.client.delete(t, o);
  }
};
bn = new WeakMap();
let Yo = Zt;
const _a = "/api/", Ea = "epic_participant_updater", Xs = Jc("settings", () => {
  const e = new Yo(_a, Ea), t = async () => (await e.read("settings")).data, n = async () => await e.create("regenerate_token"), o = $e({}), r = $e({}), s = $e([]), i = $e("");
  async function l() {
    const c = await t();
    o.value = (c == null ? void 0 : c.api_token_data) ?? {}, r.value = (c == null ? void 0 : c.app_settings) ?? {}, s.value = (c == null ? void 0 : c.projects) ?? [], i.value = (c == null ? void 0 : c.epic_upload_url) ?? "";
  }
  return {
    init: l,
    regenerateToken: n,
    api_token_data: o,
    app_settings: r,
    projects: s,
    epic_upload_url: i
  };
}), Th = Jc("logs", () => {
  const e = new Yo(_a, Ea), t = $e([]), n = $e({}), o = $e(!1), r = $e(1), s = $e(25), i = xe(() => {
    var p;
    return Math.ceil((((p = n.value) == null ? void 0 : p.total) ?? 0) / s.value);
  }), l = async (p = 0, m = 25) => {
    const _ = { _start: p, _limit: m };
    return (await e.read("logs", { params: _ })).data;
  }, c = async (p = 1, m) => {
    o.value = !0;
    const v = (parseInt(p) - 1) * s.value, A = m.value, P = await l(v, A);
    t.value = [...(P == null ? void 0 : P.data) ?? []], n.value = (P == null ? void 0 : P.metadata) ?? {}, o.value = !1;
  }, f = () => c(r.value, s.value), u = () => {
    o.value !== !0 && r.value !== i.value && (r.value = r.value + 1);
  }, a = () => {
    o.value !== !0 && (r.value <= 1 || (r.value = r.value - 1));
  };
  return Mt([r, s], () => {
    c(r.value, s.value);
  }, { immediate: !0 }), {
    getList: l,
    goToNextPage: u,
    goToPrevPage: a,
    refresh: f,
    loading: o,
    page: r,
    perPage: s,
    totalPages: i,
    logs: t,
    metadata: n
  };
}), Ah = {
  key: 0,
  class: "d-flex gap-2 align-items-center p-2"
}, Vh = /* @__PURE__ */ w("i", { class: "fas fa-spinner fa-spin fa-fw" }, null, -1), Ih = /* @__PURE__ */ w("span", null, "Loading...", -1), kh = [
  Vh,
  Ih
], jh = {
  __name: "App",
  setup(e) {
    const t = Xs(), n = $e(!1);
    return $e(), hc(async () => {
      n.value = !0, await t.init(), n.value = !1;
    }), (o, r) => {
      const s = $s("router-view");
      return n.value ? (Te(), He("div", Ah, kh)) : (Te(), js(s, { key: 1 }));
    };
  }
};
var X = {};
const yt = typeof window < "u";
function Lh(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const ie = Object.assign;
function Tr(e, t) {
  const n = {};
  for (const o in t) {
    const r = t[o];
    n[o] = We(r) ? r.map(e) : e(r);
  }
  return n;
}
const Un = () => {
}, We = Array.isArray;
function oe(e) {
  const t = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + e].concat(t));
}
const Mh = /\/$/, Fh = (e) => e.replace(Mh, "");
function Ar(e, t, n = "/") {
  let o, r = {}, s = "", i = "";
  const l = t.indexOf("#");
  let c = t.indexOf("?");
  return l < c && l >= 0 && (c = -1), c > -1 && (o = t.slice(0, c), s = t.slice(c + 1, l > -1 ? l : t.length), r = e(s)), l > -1 && (o = o || t.slice(0, l), i = t.slice(l, t.length)), o = Bh(o ?? t, n), {
    fullPath: o + (s && "?") + s + i,
    path: o,
    query: r,
    hash: i
  };
}
function Uh(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function nl(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function ol(e, t, n) {
  const o = t.matched.length - 1, r = n.matched.length - 1;
  return o > -1 && o === r && Wt(t.matched[o], n.matched[r]) && ya(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function Wt(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function ya(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (!Hh(e[n], t[n]))
      return !1;
  return !0;
}
function Hh(e, t) {
  return We(e) ? rl(e, t) : We(t) ? rl(t, e) : e === t;
}
function rl(e, t) {
  return We(t) ? e.length === t.length && e.every((n, o) => n === t[o]) : e.length === 1 && e[0] === t;
}
function Bh(e, t) {
  if (e.startsWith("/"))
    return e;
  if (X.NODE_ENV !== "production" && !t.startsWith("/"))
    return oe(`Cannot resolve a relative location without an absolute path. Trying to resolve "${e}" from "${t}". It should look like "/${t}".`), e;
  if (!e)
    return t;
  const n = t.split("/"), o = e.split("/"), r = o[o.length - 1];
  (r === ".." || r === ".") && o.push("");
  let s = n.length - 1, i, l;
  for (i = 0; i < o.length; i++)
    if (l = o[i], l !== ".")
      if (l === "..")
        s > 1 && s--;
      else
        break;
  return n.slice(0, s).join("/") + "/" + o.slice(i - (i === o.length ? 1 : 0)).join("/");
}
var Yn;
(function(e) {
  e.pop = "pop", e.push = "push";
})(Yn || (Yn = {}));
var Hn;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(Hn || (Hn = {}));
function Wh(e) {
  if (!e)
    if (yt) {
      const t = document.querySelector("base");
      e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
    } else
      e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Fh(e);
}
const qh = /^[^#]+#/;
function Kh(e, t) {
  return e.replace(qh, "#") + t;
}
function zh(e, t) {
  const n = document.documentElement.getBoundingClientRect(), o = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: o.left - n.left - (t.left || 0),
    top: o.top - n.top - (t.top || 0)
  };
}
const gr = () => ({
  left: window.pageXOffset,
  top: window.pageYOffset
});
function Gh(e) {
  let t;
  if ("el" in e) {
    const n = e.el, o = typeof n == "string" && n.startsWith("#");
    if (X.NODE_ENV !== "production" && typeof e.el == "string" && (!o || !document.getElementById(e.el.slice(1))))
      try {
        const s = document.querySelector(e.el);
        if (o && s) {
          oe(`The selector "${e.el}" should be passed as "el: document.querySelector('${e.el}')" because it starts with "#".`);
          return;
        }
      } catch {
        oe(`The selector "${e.el}" is invalid. If you are using an id selector, make sure to escape it. You can find more information about escaping characters in selectors at https://mathiasbynens.be/notes/css-escapes or use CSS.escape (https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape).`);
        return;
      }
    const r = typeof n == "string" ? o ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
    if (!r) {
      X.NODE_ENV !== "production" && oe(`Couldn't find element using selector "${e.el}" returned by scrollBehavior.`);
      return;
    }
    t = zh(r, e);
  } else
    t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.pageXOffset, t.top != null ? t.top : window.pageYOffset);
}
function sl(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const cs = /* @__PURE__ */ new Map();
function Jh(e, t) {
  cs.set(e, t);
}
function Yh(e) {
  const t = cs.get(e);
  return cs.delete(e), t;
}
let Xh = () => location.protocol + "//" + location.host;
function ba(e, t) {
  const { pathname: n, search: o, hash: r } = t, s = e.indexOf("#");
  if (s > -1) {
    let l = r.includes(e.slice(s)) ? e.slice(s).length : 1, c = r.slice(l);
    return c[0] !== "/" && (c = "/" + c), nl(c, "");
  }
  return nl(n, e) + o + r;
}
function Qh(e, t, n, o) {
  let r = [], s = [], i = null;
  const l = ({ state: p }) => {
    const m = ba(e, location), _ = n.value, v = t.value;
    let A = 0;
    if (p) {
      if (n.value = m, t.value = p, i && i === _) {
        i = null;
        return;
      }
      A = v ? p.position - v.position : 0;
    } else
      o(m);
    r.forEach((P) => {
      P(n.value, _, {
        delta: A,
        type: Yn.pop,
        direction: A ? A > 0 ? Hn.forward : Hn.back : Hn.unknown
      });
    });
  };
  function c() {
    i = n.value;
  }
  function f(p) {
    r.push(p);
    const m = () => {
      const _ = r.indexOf(p);
      _ > -1 && r.splice(_, 1);
    };
    return s.push(m), m;
  }
  function u() {
    const { history: p } = window;
    p.state && p.replaceState(ie({}, p.state, { scroll: gr() }), "");
  }
  function a() {
    for (const p of s)
      p();
    s = [], window.removeEventListener("popstate", l), window.removeEventListener("beforeunload", u);
  }
  return window.addEventListener("popstate", l), window.addEventListener("beforeunload", u, {
    passive: !0
  }), {
    pauseListeners: c,
    listen: f,
    destroy: a
  };
}
function il(e, t, n, o = !1, r = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: o,
    position: window.history.length,
    scroll: r ? gr() : null
  };
}
function Zh(e) {
  const { history: t, location: n } = window, o = {
    value: ba(e, n)
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
  function s(c, f, u) {
    const a = e.indexOf("#"), p = a > -1 ? (n.host && document.querySelector("base") ? e : e.slice(a)) + c : Xh() + e + c;
    try {
      t[u ? "replaceState" : "pushState"](f, "", p), r.value = f;
    } catch (m) {
      X.NODE_ENV !== "production" ? oe("Error with push/replace State", m) : console.error(m), n[u ? "replace" : "assign"](p);
    }
  }
  function i(c, f) {
    const u = ie({}, t.state, il(
      r.value.back,
      // keep back and forward entries but override current position
      c,
      r.value.forward,
      !0
    ), f, { position: r.value.position });
    s(c, u, !0), o.value = c;
  }
  function l(c, f) {
    const u = ie(
      {},
      // use current history state to gracefully handle a wrong call to
      // history.replaceState
      // https://github.com/vuejs/router/issues/366
      r.value,
      t.state,
      {
        forward: c,
        scroll: gr()
      }
    );
    X.NODE_ENV !== "production" && !t.state && oe(`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:

history.replaceState(history.state, '', url)

You can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state.`), s(u.current, u, !0);
    const a = ie({}, il(o.value, c, null), { position: u.position + 1 }, f);
    s(c, a, !1), o.value = c;
  }
  return {
    location: o,
    state: r,
    push: l,
    replace: i
  };
}
function em(e) {
  e = Wh(e);
  const t = Zh(e), n = Qh(e, t.state, t.location, t.replace);
  function o(s, i = !0) {
    i || n.pauseListeners(), history.go(s);
  }
  const r = ie({
    // it's overridden right after
    location: "",
    base: e,
    go: o,
    createHref: Kh.bind(null, e)
  }, t, n);
  return Object.defineProperty(r, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(r, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), r;
}
function tm(e) {
  return e = location.host ? e || location.pathname + location.search : "", e.includes("#") || (e += "#"), X.NODE_ENV !== "production" && !e.endsWith("#/") && !e.endsWith("#") && oe(`A hash base must end with a "#":
"${e}" should be "${e.replace(/#.*$/, "#")}".`), em(e);
}
function nm(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function va(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const Ct = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
}, as = Symbol(X.NODE_ENV !== "production" ? "navigation failure" : "");
var ll;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})(ll || (ll = {}));
const om = {
  1({ location: e, currentLocation: t }) {
    return `No match for
 ${JSON.stringify(e)}${t ? `
while being at
` + JSON.stringify(t) : ""}`;
  },
  2({ from: e, to: t }) {
    return `Redirected from "${e.fullPath}" to "${sm(t)}" via a navigation guard.`;
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
function On(e, t) {
  return X.NODE_ENV !== "production" ? ie(new Error(om[e](t)), {
    type: e,
    [as]: !0
  }, t) : ie(new Error(), {
    type: e,
    [as]: !0
  }, t);
}
function mt(e, t) {
  return e instanceof Error && as in e && (t == null || !!(e.type & t));
}
const rm = ["params", "query", "hash"];
function sm(e) {
  if (typeof e == "string")
    return e;
  if ("path" in e)
    return e.path;
  const t = {};
  for (const n of rm)
    n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
const cl = "[^/]+?", im = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
}, lm = /[.+*?^${}()[\]/\\]/g;
function cm(e, t) {
  const n = ie({}, im, t), o = [];
  let r = n.start ? "^" : "";
  const s = [];
  for (const f of e) {
    const u = f.length ? [] : [
      90
      /* PathScore.Root */
    ];
    n.strict && !f.length && (r += "/");
    for (let a = 0; a < f.length; a++) {
      const p = f[a];
      let m = 40 + (n.sensitive ? 0.25 : 0);
      if (p.type === 0)
        a || (r += "/"), r += p.value.replace(lm, "\\$&"), m += 40;
      else if (p.type === 1) {
        const { value: _, repeatable: v, optional: A, regexp: P } = p;
        s.push({
          name: _,
          repeatable: v,
          optional: A
        });
        const M = P || cl;
        if (M !== cl) {
          m += 10;
          try {
            new RegExp(`(${M})`);
          } catch (Y) {
            throw new Error(`Invalid custom RegExp for param "${_}" (${M}): ` + Y.message);
          }
        }
        let U = v ? `((?:${M})(?:/(?:${M}))*)` : `(${M})`;
        a || (U = // avoid an optional / if there are more segments e.g. /:p?-static
        // or /:p?-:p2
        A && f.length < 2 ? `(?:/${U})` : "/" + U), A && (U += "?"), r += U, m += 20, A && (m += -8), v && (m += -20), M === ".*" && (m += -50);
      }
      u.push(m);
    }
    o.push(u);
  }
  if (n.strict && n.end) {
    const f = o.length - 1;
    o[f][o[f].length - 1] += 0.7000000000000001;
  }
  n.strict || (r += "/?"), n.end ? r += "$" : n.strict && (r += "(?:/|$)");
  const i = new RegExp(r, n.sensitive ? "" : "i");
  function l(f) {
    const u = f.match(i), a = {};
    if (!u)
      return null;
    for (let p = 1; p < u.length; p++) {
      const m = u[p] || "", _ = s[p - 1];
      a[_.name] = m && _.repeatable ? m.split("/") : m;
    }
    return a;
  }
  function c(f) {
    let u = "", a = !1;
    for (const p of e) {
      (!a || !u.endsWith("/")) && (u += "/"), a = !1;
      for (const m of p)
        if (m.type === 0)
          u += m.value;
        else if (m.type === 1) {
          const { value: _, repeatable: v, optional: A } = m, P = _ in f ? f[_] : "";
          if (We(P) && !v)
            throw new Error(`Provided param "${_}" is an array but it is not repeatable (* or + modifiers)`);
          const M = We(P) ? P.join("/") : P;
          if (!M)
            if (A)
              p.length < 2 && (u.endsWith("/") ? u = u.slice(0, -1) : a = !0);
            else
              throw new Error(`Missing required param "${_}"`);
          u += M;
        }
    }
    return u || "/";
  }
  return {
    re: i,
    score: o,
    keys: s,
    parse: l,
    stringify: c
  };
}
function am(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const o = t[n] - e[n];
    if (o)
      return o;
    n++;
  }
  return e.length < t.length ? e.length === 1 && e[0] === 80 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 80 ? 1 : -1 : 0;
}
function um(e, t) {
  let n = 0;
  const o = e.score, r = t.score;
  for (; n < o.length && n < r.length; ) {
    const s = am(o[n], r[n]);
    if (s)
      return s;
    n++;
  }
  if (Math.abs(r.length - o.length) === 1) {
    if (al(o))
      return 1;
    if (al(r))
      return -1;
  }
  return r.length - o.length;
}
function al(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const fm = {
  type: 0,
  value: ""
}, dm = /[a-zA-Z0-9_]/;
function pm(e) {
  if (!e)
    return [[]];
  if (e === "/")
    return [[fm]];
  if (!e.startsWith("/"))
    throw new Error(X.NODE_ENV !== "production" ? `Route paths should start with a "/": "${e}" should be "/${e}".` : `Invalid path "${e}"`);
  function t(m) {
    throw new Error(`ERR (${n})/"${f}": ${m}`);
  }
  let n = 0, o = n;
  const r = [];
  let s;
  function i() {
    s && r.push(s), s = [];
  }
  let l = 0, c, f = "", u = "";
  function a() {
    f && (n === 0 ? s.push({
      type: 0,
      value: f
    }) : n === 1 || n === 2 || n === 3 ? (s.length > 1 && (c === "*" || c === "+") && t(`A repeatable param (${f}) must be alone in its segment. eg: '/:ids+.`), s.push({
      type: 1,
      value: f,
      regexp: u,
      repeatable: c === "*" || c === "+",
      optional: c === "*" || c === "?"
    })) : t("Invalid state to consume buffer"), f = "");
  }
  function p() {
    f += c;
  }
  for (; l < e.length; ) {
    if (c = e[l++], c === "\\" && n !== 2) {
      o = n, n = 4;
      continue;
    }
    switch (n) {
      case 0:
        c === "/" ? (f && a(), i()) : c === ":" ? (a(), n = 1) : p();
        break;
      case 4:
        p(), n = o;
        break;
      case 1:
        c === "(" ? n = 2 : dm.test(c) ? p() : (a(), n = 0, c !== "*" && c !== "?" && c !== "+" && l--);
        break;
      case 2:
        c === ")" ? u[u.length - 1] == "\\" ? u = u.slice(0, -1) + c : n = 3 : u += c;
        break;
      case 3:
        a(), n = 0, c !== "*" && c !== "?" && c !== "+" && l--, u = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${f}"`), a(), i(), r;
}
function hm(e, t, n) {
  const o = cm(pm(e.path), n);
  if (X.NODE_ENV !== "production") {
    const s = /* @__PURE__ */ new Set();
    for (const i of o.keys)
      s.has(i.name) && oe(`Found duplicated params with name "${i.name}" for path "${e.path}". Only the last one will be available on "$route.params".`), s.add(i.name);
  }
  const r = ie(o, {
    record: e,
    parent: t,
    // these needs to be populated by the parent
    children: [],
    alias: []
  });
  return t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r;
}
function mm(e, t) {
  const n = [], o = /* @__PURE__ */ new Map();
  t = dl({ strict: !1, end: !0, sensitive: !1 }, t);
  function r(u) {
    return o.get(u);
  }
  function s(u, a, p) {
    const m = !p, _ = gm(u);
    X.NODE_ENV !== "production" && bm(_, a), _.aliasOf = p && p.record;
    const v = dl(t, u), A = [
      _
    ];
    if ("alias" in u) {
      const U = typeof u.alias == "string" ? [u.alias] : u.alias;
      for (const Y of U)
        A.push(ie({}, _, {
          // this allows us to hold a copy of the `components` option
          // so that async components cache is hold on the original record
          components: p ? p.record.components : _.components,
          path: Y,
          // we might be the child of an alias
          aliasOf: p ? p.record : _
          // the aliases are always of the same kind as the original since they
          // are defined on the same record
        }));
    }
    let P, M;
    for (const U of A) {
      const { path: Y } = U;
      if (a && Y[0] !== "/") {
        const re = a.record.path, pe = re[re.length - 1] === "/" ? "" : "/";
        U.path = a.record.path + (Y && pe + Y);
      }
      if (X.NODE_ENV !== "production" && U.path === "*")
        throw new Error(`Catch all routes ("*") must now be defined using a param with a custom regexp.
See more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.`);
      if (P = hm(U, a, v), X.NODE_ENV !== "production" && a && Y[0] === "/" && vm(P, a), p ? (p.alias.push(P), X.NODE_ENV !== "production" && ym(p, P)) : (M = M || P, M !== P && M.alias.push(P), m && u.name && !fl(P) && i(u.name)), _.children) {
        const re = _.children;
        for (let pe = 0; pe < re.length; pe++)
          s(re[pe], P, p && p.children[pe]);
      }
      p = p || P, (P.record.components && Object.keys(P.record.components).length || P.record.name || P.record.redirect) && c(P);
    }
    return M ? () => {
      i(M);
    } : Un;
  }
  function i(u) {
    if (va(u)) {
      const a = o.get(u);
      a && (o.delete(u), n.splice(n.indexOf(a), 1), a.children.forEach(i), a.alias.forEach(i));
    } else {
      const a = n.indexOf(u);
      a > -1 && (n.splice(a, 1), u.record.name && o.delete(u.record.name), u.children.forEach(i), u.alias.forEach(i));
    }
  }
  function l() {
    return n;
  }
  function c(u) {
    let a = 0;
    for (; a < n.length && um(u, n[a]) >= 0 && // Adding children with empty path should still appear before the parent
    // https://github.com/vuejs/router/issues/1124
    (u.record.path !== n[a].record.path || !Na(u, n[a])); )
      a++;
    n.splice(a, 0, u), u.record.name && !fl(u) && o.set(u.record.name, u);
  }
  function f(u, a) {
    let p, m = {}, _, v;
    if ("name" in u && u.name) {
      if (p = o.get(u.name), !p)
        throw On(1, {
          location: u
        });
      if (X.NODE_ENV !== "production") {
        const M = Object.keys(u.params || {}).filter((U) => !p.keys.find((Y) => Y.name === U));
        M.length && oe(`Discarded invalid param(s) "${M.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
      }
      v = p.record.name, m = ie(
        // paramsFromLocation is a new object
        ul(
          a.params,
          // only keep params that exist in the resolved location
          // TODO: only keep optional params coming from a parent record
          p.keys.filter((M) => !M.optional).map((M) => M.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        u.params && ul(u.params, p.keys.map((M) => M.name))
      ), _ = p.stringify(m);
    } else if ("path" in u)
      _ = u.path, X.NODE_ENV !== "production" && !_.startsWith("/") && oe(`The Matcher cannot resolve relative paths but received "${_}". Unless you directly called \`matcher.resolve("${_}")\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.`), p = n.find((M) => M.re.test(_)), p && (m = p.parse(_), v = p.record.name);
    else {
      if (p = a.name ? o.get(a.name) : n.find((M) => M.re.test(a.path)), !p)
        throw On(1, {
          location: u,
          currentLocation: a
        });
      v = p.record.name, m = ie({}, a.params, u.params), _ = p.stringify(m);
    }
    const A = [];
    let P = p;
    for (; P; )
      A.unshift(P.record), P = P.parent;
    return {
      name: v,
      path: _,
      params: m,
      matched: A,
      meta: Em(A)
    };
  }
  return e.forEach((u) => s(u)), { addRoute: s, resolve: f, removeRoute: i, getRoutes: l, getRecordMatcher: r };
}
function ul(e, t) {
  const n = {};
  for (const o of t)
    o in e && (n[o] = e[o]);
  return n;
}
function gm(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: _m(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
}
function _m(e) {
  const t = {}, n = e.props || !1;
  if ("component" in e)
    t.default = n;
  else
    for (const o in e.components)
      t[o] = typeof n == "object" ? n[o] : n;
  return t;
}
function fl(e) {
  for (; e; ) {
    if (e.record.aliasOf)
      return !0;
    e = e.parent;
  }
  return !1;
}
function Em(e) {
  return e.reduce((t, n) => ie(t, n.meta), {});
}
function dl(e, t) {
  const n = {};
  for (const o in e)
    n[o] = o in t ? t[o] : e[o];
  return n;
}
function us(e, t) {
  return e.name === t.name && e.optional === t.optional && e.repeatable === t.repeatable;
}
function ym(e, t) {
  for (const n of e.keys)
    if (!n.optional && !t.keys.find(us.bind(null, n)))
      return oe(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
  for (const n of t.keys)
    if (!n.optional && !e.keys.find(us.bind(null, n)))
      return oe(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
}
function bm(e, t) {
  t && t.record.name && !e.name && !e.path && oe(`The route named "${String(t.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
}
function vm(e, t) {
  for (const n of t.keys)
    if (!e.keys.find(us.bind(null, n)))
      return oe(`Absolute path "${e.record.path}" must have the exact same param named "${n.name}" as its parent "${t.record.path}".`);
}
function Na(e, t) {
  return t.children.some((n) => n === e || Na(e, n));
}
const wa = /#/g, Nm = /&/g, wm = /\//g, Om = /=/g, Sm = /\?/g, Oa = /\+/g, xm = /%5B/g, Rm = /%5D/g, Sa = /%5E/g, Pm = /%60/g, xa = /%7B/g, Dm = /%7C/g, Ra = /%7D/g, Cm = /%20/g;
function Qs(e) {
  return encodeURI("" + e).replace(Dm, "|").replace(xm, "[").replace(Rm, "]");
}
function $m(e) {
  return Qs(e).replace(xa, "{").replace(Ra, "}").replace(Sa, "^");
}
function fs(e) {
  return Qs(e).replace(Oa, "%2B").replace(Cm, "+").replace(wa, "%23").replace(Nm, "%26").replace(Pm, "`").replace(xa, "{").replace(Ra, "}").replace(Sa, "^");
}
function Tm(e) {
  return fs(e).replace(Om, "%3D");
}
function Am(e) {
  return Qs(e).replace(wa, "%23").replace(Sm, "%3F");
}
function Vm(e) {
  return e == null ? "" : Am(e).replace(wm, "%2F");
}
function Xn(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {
    X.NODE_ENV !== "production" && oe(`Error decoding "${e}". Using original value`);
  }
  return "" + e;
}
function Im(e) {
  const t = {};
  if (e === "" || e === "?")
    return t;
  const o = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let r = 0; r < o.length; ++r) {
    const s = o[r].replace(Oa, " "), i = s.indexOf("="), l = Xn(i < 0 ? s : s.slice(0, i)), c = i < 0 ? null : Xn(s.slice(i + 1));
    if (l in t) {
      let f = t[l];
      We(f) || (f = t[l] = [f]), f.push(c);
    } else
      t[l] = c;
  }
  return t;
}
function pl(e) {
  let t = "";
  for (let n in e) {
    const o = e[n];
    if (n = Tm(n), o == null) {
      o !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (We(o) ? o.map((s) => s && fs(s)) : [o && fs(o)]).forEach((s) => {
      s !== void 0 && (t += (t.length ? "&" : "") + n, s != null && (t += "=" + s));
    });
  }
  return t;
}
function km(e) {
  const t = {};
  for (const n in e) {
    const o = e[n];
    o !== void 0 && (t[n] = We(o) ? o.map((r) => r == null ? null : "" + r) : o == null ? o : "" + o);
  }
  return t;
}
const jm = Symbol(X.NODE_ENV !== "production" ? "router view location matched" : ""), hl = Symbol(X.NODE_ENV !== "production" ? "router view depth" : ""), Zs = Symbol(X.NODE_ENV !== "production" ? "router" : ""), Pa = Symbol(X.NODE_ENV !== "production" ? "route location" : ""), ds = Symbol(X.NODE_ENV !== "production" ? "router view location" : "");
function Tn() {
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
function Vt(e, t, n, o, r) {
  const s = o && // name is defined if record is because of the function overload
  (o.enterCallbacks[r] = o.enterCallbacks[r] || []);
  return () => new Promise((i, l) => {
    const c = (a) => {
      a === !1 ? l(On(4, {
        from: n,
        to: t
      })) : a instanceof Error ? l(a) : nm(a) ? l(On(2, {
        from: t,
        to: a
      })) : (s && // since enterCallbackArray is truthy, both record and name also are
      o.enterCallbacks[r] === s && typeof a == "function" && s.push(a), i());
    }, f = e.call(o && o.instances[r], t, n, X.NODE_ENV !== "production" ? Lm(c, t, n) : c);
    let u = Promise.resolve(f);
    if (e.length < 3 && (u = u.then(c)), X.NODE_ENV !== "production" && e.length > 2) {
      const a = `The "next" callback was never called inside of ${e.name ? '"' + e.name + '"' : ""}:
${e.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof f == "object" && "then" in f)
        u = u.then((p) => c._called ? p : (oe(a), Promise.reject(new Error("Invalid navigation guard"))));
      else if (f !== void 0 && !c._called) {
        oe(a), l(new Error("Invalid navigation guard"));
        return;
      }
    }
    u.catch((a) => l(a));
  });
}
function Lm(e, t, n) {
  let o = 0;
  return function() {
    o++ === 1 && oe(`The "next" callback was called more than once in one navigation guard when going from "${n.fullPath}" to "${t.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`), e._called = !0, o === 1 && e.apply(null, arguments);
  };
}
function Vr(e, t, n, o) {
  const r = [];
  for (const s of e) {
    X.NODE_ENV !== "production" && !s.components && !s.children.length && oe(`Record with path "${s.path}" is either missing a "component(s)" or "children" property.`);
    for (const i in s.components) {
      let l = s.components[i];
      if (X.NODE_ENV !== "production") {
        if (!l || typeof l != "object" && typeof l != "function")
          throw oe(`Component "${i}" in record with path "${s.path}" is not a valid component. Received "${String(l)}".`), new Error("Invalid route component");
        if ("then" in l) {
          oe(`Component "${i}" in record with path "${s.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
          const c = l;
          l = () => c;
        } else
          l.__asyncLoader && // warn only once per component
          !l.__warnedDefineAsync && (l.__warnedDefineAsync = !0, oe(`Component "${i}" in record with path "${s.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`));
      }
      if (!(t !== "beforeRouteEnter" && !s.instances[i]))
        if (Mm(l)) {
          const f = (l.__vccOpts || l)[t];
          f && r.push(Vt(f, n, o, s, i));
        } else {
          let c = l();
          X.NODE_ENV !== "production" && !("catch" in c) && (oe(`Component "${i}" in record with path "${s.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`), c = Promise.resolve(c)), r.push(() => c.then((f) => {
            if (!f)
              return Promise.reject(new Error(`Couldn't resolve component "${i}" at "${s.path}"`));
            const u = Lh(f) ? f.default : f;
            s.components[i] = u;
            const p = (u.__vccOpts || u)[t];
            return p && Vt(p, n, o, s, i)();
          }));
        }
    }
  }
  return r;
}
function Mm(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function ps(e) {
  const t = ut(Zs), n = ut(Pa), o = xe(() => t.resolve(le(e.to))), r = xe(() => {
    const { matched: c } = o.value, { length: f } = c, u = c[f - 1], a = n.matched;
    if (!u || !a.length)
      return -1;
    const p = a.findIndex(Wt.bind(null, u));
    if (p > -1)
      return p;
    const m = ml(c[f - 2]);
    return (
      // we are dealing with nested routes
      f > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      ml(u) === m && // avoid comparing the child with its parent
      a[a.length - 1].path !== m ? a.findIndex(Wt.bind(null, c[f - 2])) : p
    );
  }), s = xe(() => r.value > -1 && Hm(n.params, o.value.params)), i = xe(() => r.value > -1 && r.value === n.matched.length - 1 && ya(n.params, o.value.params));
  function l(c = {}) {
    return Um(c) ? t[le(e.replace) ? "replace" : "push"](
      le(e.to)
      // avoid uncaught errors are they are logged anyway
    ).catch(Un) : Promise.resolve();
  }
  if (X.NODE_ENV !== "production" && yt) {
    const c = Ms();
    if (c) {
      const f = {
        route: o.value,
        isActive: s.value,
        isExactActive: i.value
      };
      c.__vrl_devtools = c.__vrl_devtools || [], c.__vrl_devtools.push(f), lf(() => {
        f.route = o.value, f.isActive = s.value, f.isExactActive = i.value;
      }, { flush: "post" });
    }
  }
  return {
    route: o,
    href: xe(() => o.value.href),
    isActive: s,
    isExactActive: i,
    navigate: l
  };
}
const Fm = /* @__PURE__ */ dc({
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
  useLink: ps,
  setup(e, { slots: t }) {
    const n = Zn(ps(e)), { options: o } = ut(Zs), r = xe(() => ({
      [gl(e.activeClass, o.linkActiveClass, "router-link-active")]: n.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [gl(e.exactActiveClass, o.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
    }));
    return () => {
      const s = t.default && t.default(n);
      return e.custom ? s : Ic("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: n.navigate,
        class: r.value
      }, s);
    };
  }
}), ei = Fm;
function Um(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t))
        return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function Hm(e, t) {
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
function ml(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const gl = (e, t, n) => e ?? t ?? n, Bm = /* @__PURE__ */ dc({
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
    X.NODE_ENV !== "production" && qm();
    const o = ut(ds), r = xe(() => e.route || o.value), s = ut(hl, 0), i = xe(() => {
      let f = le(s);
      const { matched: u } = r.value;
      let a;
      for (; (a = u[f]) && !a.components; )
        f++;
      return f;
    }), l = xe(() => r.value.matched[i.value]);
    xo(hl, xe(() => i.value + 1)), xo(jm, l), xo(ds, r);
    const c = $e();
    return Mt(() => [c.value, l.value, e.name], ([f, u, a], [p, m, _]) => {
      u && (u.instances[a] = f, m && m !== u && f && f === p && (u.leaveGuards.size || (u.leaveGuards = m.leaveGuards), u.updateGuards.size || (u.updateGuards = m.updateGuards))), f && u && // if there is no instance but to and from are the same this might be
      // the first visit
      (!m || !Wt(u, m) || !p) && (u.enterCallbacks[a] || []).forEach((v) => v(f));
    }, { flush: "post" }), () => {
      const f = r.value, u = e.name, a = l.value, p = a && a.components[u];
      if (!p)
        return _l(n.default, { Component: p, route: f });
      const m = a.props[u], _ = m ? m === !0 ? f.params : typeof m == "function" ? m(f) : m : null, A = Ic(p, ie({}, _, t, {
        onVnodeUnmounted: (P) => {
          P.component.isUnmounted && (a.instances[u] = null);
        },
        ref: c
      }));
      if (X.NODE_ENV !== "production" && yt && A.ref) {
        const P = {
          depth: i.value,
          name: a.name,
          path: a.path,
          meta: a.meta
        };
        (We(A.ref) ? A.ref.map((U) => U.i) : [A.ref.i]).forEach((U) => {
          U.__vrv_devtools = P;
        });
      }
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        _l(n.default, { Component: A, route: f }) || A
      );
    };
  }
});
function _l(e, t) {
  if (!e)
    return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const Wm = Bm;
function qm() {
  const e = Ms(), t = e.parent && e.parent.type.name, n = e.parent && e.parent.subTree && e.parent.subTree.type;
  if (t && (t === "KeepAlive" || t.includes("Transition")) && typeof n == "object" && n.name === "RouterView") {
    const o = t === "KeepAlive" ? "keep-alive" : "transition";
    oe(`<router-view> can no longer be used directly inside <transition> or <keep-alive>.
Use slot props instead:

<router-view v-slot="{ Component }">
  <${o}>
    <component :is="Component" />
  </${o}>
</router-view>`);
  }
}
function An(e, t) {
  const n = ie({}, e, {
    // remove variables that can contain vue instances
    matched: e.matched.map((o) => eg(o, ["instances", "children", "aliasOf"]))
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
function Eo(e) {
  return {
    _custom: {
      display: e
    }
  };
}
let Km = 0;
function zm(e, t, n) {
  if (t.__hasDevtools)
    return;
  t.__hasDevtools = !0;
  const o = Km++;
  Hs({
    id: "org.vuejs.router" + (o ? "." + o : ""),
    label: "Vue Router",
    packageName: "vue-router",
    homepage: "https://router.vuejs.org",
    logo: "https://router.vuejs.org/logo.png",
    componentStateTypes: ["Routing"],
    app: e
  }, (r) => {
    typeof r.now != "function" && console.warn("[Vue Router]: You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), r.on.inspectComponent((u, a) => {
      u.instanceData && u.instanceData.state.push({
        type: "Routing",
        key: "$route",
        editable: !1,
        value: An(t.currentRoute.value, "Current Route")
      });
    }), r.on.visitComponentTree(({ treeNode: u, componentInstance: a }) => {
      if (a.__vrv_devtools) {
        const p = a.__vrv_devtools;
        u.tags.push({
          label: (p.name ? `${p.name.toString()}: ` : "") + p.path,
          textColor: 0,
          tooltip: "This component is rendered by &lt;router-view&gt;",
          backgroundColor: Da
        });
      }
      We(a.__vrl_devtools) && (a.__devtoolsApi = r, a.__vrl_devtools.forEach((p) => {
        let m = Ta, _ = "";
        p.isExactActive ? (m = $a, _ = "This is exactly active") : p.isActive && (m = Ca, _ = "This link is active"), u.tags.push({
          label: p.route.path,
          textColor: 0,
          tooltip: _,
          backgroundColor: m
        });
      }));
    }), Mt(t.currentRoute, () => {
      c(), r.notifyComponentUpdate(), r.sendInspectorTree(l), r.sendInspectorState(l);
    });
    const s = "router:navigations:" + o;
    r.addTimelineLayer({
      id: s,
      label: `Router${o ? " " + o : ""} Navigations`,
      color: 4237508
    }), t.onError((u, a) => {
      r.addTimelineEvent({
        layerId: s,
        event: {
          title: "Error during Navigation",
          subtitle: a.fullPath,
          logType: "error",
          time: r.now(),
          data: { error: u },
          groupId: a.meta.__navigationId
        }
      });
    });
    let i = 0;
    t.beforeEach((u, a) => {
      const p = {
        guard: Eo("beforeEach"),
        from: An(a, "Current Location during this navigation"),
        to: An(u, "Target location")
      };
      Object.defineProperty(u.meta, "__navigationId", {
        value: i++
      }), r.addTimelineEvent({
        layerId: s,
        event: {
          time: r.now(),
          title: "Start of navigation",
          subtitle: u.fullPath,
          data: p,
          groupId: u.meta.__navigationId
        }
      });
    }), t.afterEach((u, a, p) => {
      const m = {
        guard: Eo("afterEach")
      };
      p ? (m.failure = {
        _custom: {
          type: Error,
          readOnly: !0,
          display: p ? p.message : "",
          tooltip: "Navigation Failure",
          value: p
        }
      }, m.status = Eo("❌")) : m.status = Eo("✅"), m.from = An(a, "Current Location during this navigation"), m.to = An(u, "Target location"), r.addTimelineEvent({
        layerId: s,
        event: {
          title: "End of navigation",
          subtitle: u.fullPath,
          time: r.now(),
          data: m,
          logType: p ? "warning" : "default",
          groupId: u.meta.__navigationId
        }
      });
    });
    const l = "router-inspector:" + o;
    r.addInspector({
      id: l,
      label: "Routes" + (o ? " " + o : ""),
      icon: "book",
      treeFilterPlaceholder: "Search routes"
    });
    function c() {
      if (!f)
        return;
      const u = f;
      let a = n.getRoutes().filter((p) => !p.parent || // these routes have a parent with no component which will not appear in the view
      // therefore we still need to include them
      !p.parent.record.components);
      a.forEach(Ia), u.filter && (a = a.filter((p) => (
        // save matches state based on the payload
        hs(p, u.filter.toLowerCase())
      ))), a.forEach((p) => Va(p, t.currentRoute.value)), u.rootNodes = a.map(Aa);
    }
    let f;
    r.on.getInspectorTree((u) => {
      f = u, u.app === e && u.inspectorId === l && c();
    }), r.on.getInspectorState((u) => {
      if (u.app === e && u.inspectorId === l) {
        const p = n.getRoutes().find((m) => m.record.__vd_id === u.nodeId);
        p && (u.state = {
          options: Jm(p)
        });
      }
    }), r.sendInspectorTree(l), r.sendInspectorState(l);
  });
}
function Gm(e) {
  return e.optional ? e.repeatable ? "*" : "?" : e.repeatable ? "+" : "";
}
function Jm(e) {
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
        display: e.keys.map((o) => `${o.name}${Gm(o)}`).join(" "),
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
const Da = 15485081, Ca = 2450411, $a = 8702998, Ym = 2282478, Ta = 16486972, Xm = 6710886;
function Aa(e) {
  const t = [], { record: n } = e;
  n.name != null && t.push({
    label: String(n.name),
    textColor: 0,
    backgroundColor: Ym
  }), n.aliasOf && t.push({
    label: "alias",
    textColor: 0,
    backgroundColor: Ta
  }), e.__vd_match && t.push({
    label: "matches",
    textColor: 0,
    backgroundColor: Da
  }), e.__vd_exactActive && t.push({
    label: "exact",
    textColor: 0,
    backgroundColor: $a
  }), e.__vd_active && t.push({
    label: "active",
    textColor: 0,
    backgroundColor: Ca
  }), n.redirect && t.push({
    label: typeof n.redirect == "string" ? `redirect: ${n.redirect}` : "redirects",
    textColor: 16777215,
    backgroundColor: Xm
  });
  let o = n.__vd_id;
  return o == null && (o = String(Qm++), n.__vd_id = o), {
    id: o,
    label: n.path,
    tags: t,
    children: e.children.map(Aa)
  };
}
let Qm = 0;
const Zm = /^\/(.*)\/([a-z]*)$/;
function Va(e, t) {
  const n = t.matched.length && Wt(t.matched[t.matched.length - 1], e.record);
  e.__vd_exactActive = e.__vd_active = n, n || (e.__vd_active = t.matched.some((o) => Wt(o, e.record))), e.children.forEach((o) => Va(o, t));
}
function Ia(e) {
  e.__vd_match = !1, e.children.forEach(Ia);
}
function hs(e, t) {
  const n = String(e.re).match(Zm);
  if (e.__vd_match = !1, !n || n.length < 3)
    return !1;
  if (new RegExp(n[1].replace(/\$$/, ""), n[2]).test(t))
    return e.children.forEach((i) => hs(i, t)), e.record.path !== "/" || t === "/" ? (e.__vd_match = e.re.test(t), !0) : !1;
  const r = e.record.path.toLowerCase(), s = Xn(r);
  return !t.startsWith("/") && (s.includes(t) || r.includes(t)) || s.startsWith(t) || r.startsWith(t) || e.record.name && String(e.record.name).includes(t) ? !0 : e.children.some((i) => hs(i, t));
}
function eg(e, t) {
  const n = {};
  for (const o in e)
    t.includes(o) || (n[o] = e[o]);
  return n;
}
function tg(e) {
  const t = mm(e.routes, e), n = e.parseQuery || Im, o = e.stringifyQuery || pl, r = e.history;
  if (X.NODE_ENV !== "production" && !r)
    throw new Error('Provide the "history" option when calling "createRouter()": https://next.router.vuejs.org/api/#history.');
  const s = Tn(), i = Tn(), l = Tn(), c = wu(Ct);
  let f = Ct;
  yt && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const u = Tr.bind(null, (y) => "" + y), a = Tr.bind(null, Vm), p = (
    // @ts-expect-error: intentionally avoid the type check
    Tr.bind(null, Xn)
  );
  function m(y, I) {
    let V, F;
    return va(y) ? (V = t.getRecordMatcher(y), F = I) : F = y, t.addRoute(F, V);
  }
  function _(y) {
    const I = t.getRecordMatcher(y);
    I ? t.removeRoute(I) : X.NODE_ENV !== "production" && oe(`Cannot remove non-existent route "${String(y)}"`);
  }
  function v() {
    return t.getRoutes().map((y) => y.record);
  }
  function A(y) {
    return !!t.getRecordMatcher(y);
  }
  function P(y, I) {
    if (I = ie({}, I || c.value), typeof y == "string") {
      const d = Ar(n, y, I.path), h = t.resolve({ path: d.path }, I), E = r.createHref(d.fullPath);
      return X.NODE_ENV !== "production" && (E.startsWith("//") ? oe(`Location "${y}" resolved to "${E}". A resolved location cannot start with multiple slashes.`) : h.matched.length || oe(`No match found for location with path "${y}"`)), ie(d, h, {
        params: p(h.params),
        hash: Xn(d.hash),
        redirectedFrom: void 0,
        href: E
      });
    }
    let V;
    if ("path" in y)
      X.NODE_ENV !== "production" && "params" in y && !("name" in y) && // @ts-expect-error: the type is never
      Object.keys(y.params).length && oe(`Path "${y.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`), V = ie({}, y, {
        path: Ar(n, y.path, I.path).path
      });
    else {
      const d = ie({}, y.params);
      for (const h in d)
        d[h] == null && delete d[h];
      V = ie({}, y, {
        params: a(d)
      }), I.params = a(I.params);
    }
    const F = t.resolve(V, I), Z = y.hash || "";
    X.NODE_ENV !== "production" && Z && !Z.startsWith("#") && oe(`A \`hash\` should always start with the character "#". Replace "${Z}" with "#${Z}".`), F.params = u(p(F.params));
    const me = Uh(o, ie({}, y, {
      hash: $m(Z),
      path: F.path
    })), Q = r.createHref(me);
    return X.NODE_ENV !== "production" && (Q.startsWith("//") ? oe(`Location "${y}" resolved to "${Q}". A resolved location cannot start with multiple slashes.`) : F.matched.length || oe(`No match found for location with path "${"path" in y ? y.path : y}"`)), ie({
      fullPath: me,
      // keep the hash encoded so fullPath is effectively path + encodedQuery +
      // hash
      hash: Z,
      query: (
        // if the user is using a custom query lib like qs, we might have
        // nested objects, so we keep the query as is, meaning it can contain
        // numbers at `$route.query`, but at the point, the user will have to
        // use their own type anyway.
        // https://github.com/vuejs/router/issues/328#issuecomment-649481567
        o === pl ? km(y.query) : y.query || {}
      )
    }, F, {
      redirectedFrom: void 0,
      href: Q
    });
  }
  function M(y) {
    return typeof y == "string" ? Ar(n, y, c.value.path) : ie({}, y);
  }
  function U(y, I) {
    if (f !== y)
      return On(8, {
        from: I,
        to: y
      });
  }
  function Y(y) {
    return D(y);
  }
  function re(y) {
    return Y(ie(M(y), { replace: !0 }));
  }
  function pe(y) {
    const I = y.matched[y.matched.length - 1];
    if (I && I.redirect) {
      const { redirect: V } = I;
      let F = typeof V == "function" ? V(y) : V;
      if (typeof F == "string" && (F = F.includes("?") || F.includes("#") ? F = M(F) : (
        // force empty params
        { path: F }
      ), F.params = {}), X.NODE_ENV !== "production" && !("path" in F) && !("name" in F))
        throw oe(`Invalid redirect found:
${JSON.stringify(F, null, 2)}
 when navigating to "${y.fullPath}". A redirect must contain a name or path. This will break in production.`), new Error("Invalid redirect");
      return ie({
        query: y.query,
        hash: y.hash,
        // avoid transferring params if the redirect has a path
        params: "path" in F ? {} : y.params
      }, F);
    }
  }
  function D(y, I) {
    const V = f = P(y), F = c.value, Z = y.state, me = y.force, Q = y.replace === !0, d = pe(V);
    if (d)
      return D(
        ie(M(d), {
          state: typeof d == "object" ? ie({}, Z, d.state) : Z,
          force: me,
          replace: Q
        }),
        // keep original redirectedFrom if it exists
        I || V
      );
    const h = V;
    h.redirectedFrom = I;
    let E;
    return !me && ol(o, F, V) && (E = On(16, { to: h, from: F }), St(
      F,
      F,
      // this is a push, the only way for it to be triggered from a
      // history.listen is with a redirect, which makes it become a push
      !0,
      // This cannot be the first navigation because the initial location
      // cannot be manually navigated to
      !1
    )), (E ? Promise.resolve(E) : L(h, F)).catch((b) => mt(b) ? (
      // navigation redirects still mark the router as ready
      mt(
        b,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? b : zt(b)
    ) : (
      // reject any unknown error
      W(b, h, F)
    )).then((b) => {
      if (b) {
        if (mt(
          b,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        ))
          return X.NODE_ENV !== "production" && // we are redirecting to the same location we were already at
          ol(o, P(b.to), h) && // and we have done it a couple of times
          I && // @ts-expect-error: added only in dev
          (I._count = I._count ? (
            // @ts-expect-error
            I._count + 1
          ) : 1) > 30 ? (oe(`Detected a possibly infinite redirection in a navigation guard when going from "${F.fullPath}" to "${h.fullPath}". Aborting to avoid a Stack Overflow.
 Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`), Promise.reject(new Error("Infinite redirect in navigation guard"))) : D(
            // keep options
            ie({
              // preserve an existing replacement but allow the redirect to override it
              replace: Q
            }, M(b.to), {
              state: typeof b.to == "object" ? ie({}, Z, b.to.state) : Z,
              force: me
            }),
            // preserve the original redirectedFrom if any
            I || h
          );
      } else
        b = ee(h, F, !0, Q, Z);
      return k(h, F, b), b;
    });
  }
  function Pe(y, I) {
    const V = U(y, I);
    return V ? Promise.reject(V) : Promise.resolve();
  }
  function fe(y) {
    const I = xt.values().next().value;
    return I && typeof I.runWithContext == "function" ? I.runWithContext(y) : y();
  }
  function L(y, I) {
    let V;
    const [F, Z, me] = ng(y, I);
    V = Vr(F.reverse(), "beforeRouteLeave", y, I);
    for (const d of F)
      d.leaveGuards.forEach((h) => {
        V.push(Vt(h, y, I));
      });
    const Q = Pe.bind(null, y, I);
    return V.push(Q), Rt(V).then(() => {
      V = [];
      for (const d of s.list())
        V.push(Vt(d, y, I));
      return V.push(Q), Rt(V);
    }).then(() => {
      V = Vr(Z, "beforeRouteUpdate", y, I);
      for (const d of Z)
        d.updateGuards.forEach((h) => {
          V.push(Vt(h, y, I));
        });
      return V.push(Q), Rt(V);
    }).then(() => {
      V = [];
      for (const d of me)
        if (d.beforeEnter)
          if (We(d.beforeEnter))
            for (const h of d.beforeEnter)
              V.push(Vt(h, y, I));
          else
            V.push(Vt(d.beforeEnter, y, I));
      return V.push(Q), Rt(V);
    }).then(() => (y.matched.forEach((d) => d.enterCallbacks = {}), V = Vr(me, "beforeRouteEnter", y, I), V.push(Q), Rt(V))).then(() => {
      V = [];
      for (const d of i.list())
        V.push(Vt(d, y, I));
      return V.push(Q), Rt(V);
    }).catch((d) => mt(
      d,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? d : Promise.reject(d));
  }
  function k(y, I, V) {
    l.list().forEach((F) => fe(() => F(y, I, V)));
  }
  function ee(y, I, V, F, Z) {
    const me = U(y, I);
    if (me)
      return me;
    const Q = I === Ct, d = yt ? history.state : {};
    V && (F || Q ? r.replace(y.fullPath, ie({
      scroll: Q && d && d.scroll
    }, Z)) : r.push(y.fullPath, Z)), c.value = y, St(y, I, V, Q), zt();
  }
  let he;
  function tt() {
    he || (he = r.listen((y, I, V) => {
      if (!co.listening)
        return;
      const F = P(y), Z = pe(F);
      if (Z) {
        D(ie(Z, { replace: !0 }), F).catch(Un);
        return;
      }
      f = F;
      const me = c.value;
      yt && Jh(sl(me.fullPath, V.delta), gr()), L(F, me).catch((Q) => mt(
        Q,
        12
        /* ErrorTypes.NAVIGATION_CANCELLED */
      ) ? Q : mt(
        Q,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? (D(
        Q.to,
        F
        // avoid an uncaught rejection, let push call triggerError
      ).then((d) => {
        mt(
          d,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && !V.delta && V.type === Yn.pop && r.go(-1, !1);
      }).catch(Un), Promise.reject()) : (V.delta && r.go(-V.delta, !1), W(Q, F, me))).then((Q) => {
        Q = Q || ee(
          // after navigation, all matched components are resolved
          F,
          me,
          !1
        ), Q && (V.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
        // entry while a different route is displayed
        !mt(
          Q,
          8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        ) ? r.go(-V.delta, !1) : V.type === Yn.pop && mt(
          Q,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && r.go(-1, !1)), k(F, me, Q);
      }).catch(Un);
    }));
  }
  let Le = Tn(), Se = Tn(), G;
  function W(y, I, V) {
    zt(y);
    const F = Se.list();
    return F.length ? F.forEach((Z) => Z(y, I, V)) : (X.NODE_ENV !== "production" && oe("uncaught error during route navigation:"), console.error(y)), Promise.reject(y);
  }
  function qe() {
    return G && c.value !== Ct ? Promise.resolve() : new Promise((y, I) => {
      Le.add([y, I]);
    });
  }
  function zt(y) {
    return G || (G = !y, tt(), Le.list().forEach(([I, V]) => y ? V(y) : I()), Le.reset()), y;
  }
  function St(y, I, V, F) {
    const { scrollBehavior: Z } = e;
    if (!yt || !Z)
      return Promise.resolve();
    const me = !V && Yh(sl(y.fullPath, 0)) || (F || !V) && history.state && history.state.scroll || null;
    return Ho().then(() => Z(y, I, me)).then((Q) => Q && Gh(Q)).catch((Q) => W(Q, y, I));
  }
  const nt = (y) => r.go(y);
  let Ke;
  const xt = /* @__PURE__ */ new Set(), co = {
    currentRoute: c,
    listening: !0,
    addRoute: m,
    removeRoute: _,
    hasRoute: A,
    getRoutes: v,
    resolve: P,
    options: e,
    push: Y,
    replace: re,
    go: nt,
    back: () => nt(-1),
    forward: () => nt(1),
    beforeEach: s.add,
    beforeResolve: i.add,
    afterEach: l.add,
    onError: Se.add,
    isReady: qe,
    install(y) {
      const I = this;
      y.component("RouterLink", ei), y.component("RouterView", Wm), y.config.globalProperties.$router = I, Object.defineProperty(y.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => le(c)
      }), yt && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !Ke && c.value === Ct && (Ke = !0, Y(r.location).catch((Z) => {
        X.NODE_ENV !== "production" && oe("Unexpected error when starting the router:", Z);
      }));
      const V = {};
      for (const Z in Ct)
        Object.defineProperty(V, Z, {
          get: () => c.value[Z],
          enumerable: !0
        });
      y.provide(Zs, I), y.provide(Pa, Bl(V)), y.provide(ds, c);
      const F = y.unmount;
      xt.add(y), y.unmount = function() {
        xt.delete(y), xt.size < 1 && (f = Ct, he && he(), he = null, c.value = Ct, Ke = !1, G = !1), F();
      }, X.NODE_ENV !== "production" && yt && zm(y, I, t);
    }
  };
  function Rt(y) {
    return y.reduce((I, V) => I.then(() => fe(V)), Promise.resolve());
  }
  return co;
}
function ng(e, t) {
  const n = [], o = [], r = [], s = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < s; i++) {
    const l = t.matched[i];
    l && (e.matched.find((f) => Wt(f, l)) ? o.push(l) : n.push(l));
    const c = e.matched[i];
    c && (t.matched.find((f) => Wt(f, c)) || r.push(c));
  }
  return [n, o, r];
}
const _r = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
}, og = {}, io = (e) => (lc("data-v-7ddf73dc"), e = e(), cc(), e), rg = { class: "error-wrapper" }, sg = /* @__PURE__ */ io(() => /* @__PURE__ */ w("span", { class: "error-title" }, "Error 404", -1)), ig = /* @__PURE__ */ io(() => /* @__PURE__ */ w("span", { class: "error-description" }, "Sorry, we couldn't find this page.", -1)), lg = /* @__PURE__ */ io(() => /* @__PURE__ */ w("span", { class: "error-sub-description" }, "But dont worry, you can find plenty of other things on the homepage..", -1)), cg = { class: "mt-5" }, ag = /* @__PURE__ */ io(() => /* @__PURE__ */ w("i", { class: "fas fa-arrow-left fa-fw me-1" }, null, -1)), ug = /* @__PURE__ */ io(() => /* @__PURE__ */ w("span", null, "Back to Home", -1));
function fg(e, t) {
  const n = $s("router-link");
  return Te(), He("div", rg, [
    So(e.$slots, "title", {}, () => [
      sg
    ], !0),
    So(e.$slots, "description", {}, () => [
      ig
    ], !0),
    So(e.$slots, "subdescription", {}, () => [
      lg
    ], !0),
    w("div", cg, [
      be(n, {
        to: "/",
        class: "btn btn-sm btn-primary"
      }, {
        default: It(() => [
          ag,
          ug
        ]),
        _: 1
      })
    ])
  ]);
}
const dg = /* @__PURE__ */ _r(og, [["render", fg], ["__scopeId", "data-v-7ddf73dc"]]), pg = { class: "nav-item" }, hg = ["href"], mg = {
  __name: "NavLinkItem",
  props: {
    to: { type: [String, Object], required: !0 },
    // Accepts both string or location object
    active: Boolean
    // This prop is optional and can be used to override the active state if needed
  },
  setup(e) {
    const t = e, { to: n } = Lr(t);
    return ps({ to: n }), (o, r) => (Te(), js(le(ei), {
      to: le(n),
      custom: ""
    }, {
      default: It(({ href: s, isExactActive: i }) => [
        w("li", pg, [
          w("a", {
            class: Zo(["nav-link", { active: i }]),
            href: s
          }, [
            So(o.$slots, "default", {}, void 0, !0)
          ], 10, hg)
        ])
      ]),
      _: 3
    }, 8, ["to"]));
  }
}, yo = /* @__PURE__ */ _r(mg, [["__scopeId", "data-v-0d411b52"]]), gg = { class: "navbar navbar-expand-lg bg-light" }, _g = { class: "container-fluid" }, Eg = /* @__PURE__ */ w("button", {
  class: "navbar-toggler",
  type: "button",
  "data-bs-toggle": "collapse",
  "data-bs-target": "#navbarNav",
  "aria-controls": "navbarNav",
  "aria-expanded": "false",
  "aria-label": "Toggle navigation"
}, [
  /* @__PURE__ */ w("span", { class: "navbar-toggler-icon" })
], -1), yg = {
  class: "collapse navbar-collapse",
  id: "navbarNav"
}, bg = { class: "navbar-nav" }, vg = { class: "nav-item" }, Ng = { class: "nav-item" }, wg = { class: "nav-item" }, Og = { class: "nav-item" }, Sg = {
  __name: "MainMenu",
  setup(e) {
    return (t, n) => (Te(), He("nav", gg, [
      w("div", _g, [
        be(le(ei), {
          class: "navbar-brand",
          to: "/"
        }, {
          default: It(() => [
            Qt("Epic Participant Updater")
          ]),
          _: 1
        }),
        Eg,
        w("div", yg, [
          w("ul", bg, [
            w("li", vg, [
              be(yo, { to: "/" }, {
                default: It(() => [
                  Qt("Home")
                ]),
                _: 1
              })
            ]),
            w("li", Ng, [
              be(yo, { to: "/project-templates" }, {
                default: It(() => [
                  Qt("Project Templates")
                ]),
                _: 1
              })
            ]),
            w("li", wg, [
              be(yo, { to: "/api-token" }, {
                default: It(() => [
                  Qt("API token")
                ]),
                _: 1
              })
            ]),
            w("li", Og, [
              be(yo, { to: "/logs" }, {
                default: It(() => [
                  Qt("Logs")
                ]),
                _: 1
              })
            ])
          ])
        ])
      ])
    ]));
  }
}, xg = {
  __name: "MainLayout",
  setup(e) {
    return (t, n) => {
      const o = $s("router-view");
      return Te(), He("div", null, [
        be(Sg),
        be(o)
      ]);
    };
  }
}, Rg = {}, Pg = { class: "border rounded p-2 mt-2" }, Dg = /* @__PURE__ */ w("p", null, "This module exposes an endpoint that listens for study related data coming from Hyperspace.", -1), Cg = /* @__PURE__ */ w("p", null, "Whenever a patient is added to a study in Hyperspace, an XML payload is sent to an exposed URL in REDCap.", -1), $g = /* @__PURE__ */ w("span", null, "The XML payload is parsed to update/create a record in REDCap using this information:", -1), Tg = /* @__PURE__ */ w("ul", null, [
  /* @__PURE__ */ w("li", null, "study ID"),
  /* @__PURE__ */ w("li", null, "patient MRN"),
  /* @__PURE__ */ w("li", null, "enrollment status"),
  /* @__PURE__ */ w("li", null, "starting date of the study"),
  /* @__PURE__ */ w("li", null, "ending date of the study")
], -1), Ag = [
  Dg,
  Cg,
  $g,
  Tg
];
function Vg(e, t) {
  return Te(), He("div", Pg, Ag);
}
const Ig = /* @__PURE__ */ _r(Rg, [["render", Vg]]), kg = { class: "border rounded p-2 mt-2" }, jg = /* @__PURE__ */ w("p", null, "Download a project template and use it as a starting point or as a reference for how to use the module.", -1), Lg = ["href", "download"], Mg = {
  __name: "ProjectTemplatesPage",
  setup(e) {
    const t = Xs(), n = xe(() => {
      var o;
      return ((o = t == null ? void 0 : t.app_settings) == null ? void 0 : o.project_templates) ?? {};
    });
    return (o, r) => (Te(), He("div", kg, [
      jg,
      w("ul", null, [
        (Te(!0), He(Ue, null, gc(n.value, (s, i, l) => (Te(), He("li", { key: l }, [
          w("a", {
            href: s,
            target: "_blank",
            download: `${i}.xml`
          }, Me(i), 9, Lg)
        ]))), 128))
      ])
    ]));
  }
}, Fg = () => {
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
    copy: (r) => new Promise((i, l) => {
      try {
        const c = n(r);
        c instanceof Promise ? c.then(() => {
          console.log(
            "Text copied to clipboard ✌🏼:",
            r
          ), i(r);
        }).catch((f) => {
          console.error("Failed to copy text:", f), l(f);
        }) : c === !0 && (console.log("Text copied to clipboard ✌🏼:", r), i(r));
      } catch (c) {
        console.error("Failed to copy text:", c), l(c);
      }
    })
  };
}, Ug = { class: "d-flex flex-column gap-2 mt-2" }, Hg = { class: "d-flex flex-column gap-2 border rounded p-2" }, Bg = /* @__PURE__ */ w("span", { class: "fs-3" }, "Upload URL", -1), Wg = /* @__PURE__ */ w("span", { class: "d-block" }, "This URL is used to send updates to Epic.", -1), qg = { class: "input-group" }, Kg = ["value"], zg = /* @__PURE__ */ w("i", { class: "fas fa-copy" }, null, -1), Gg = [
  zg
], Jg = { class: "d-flex flex-column gap-2 border rounded p-2" }, Yg = /* @__PURE__ */ w("span", { class: "fs-3" }, "Listening URL", -1), Xg = /* @__PURE__ */ w("span", { class: "d-block" }, "Provide this URL to your Epic staff for the configuration of the EOA service.", -1), Qg = /* @__PURE__ */ w("span", { class: "d-block" }, "This URL will allow Hyperspace to send study enrollment data to REDCap.", -1), Zg = { class: "input-group" }, e_ = ["value"], t_ = /* @__PURE__ */ w("i", { class: "fas fa-copy" }, null, -1), n_ = [
  t_
], o_ = /* @__PURE__ */ w("i", { class: "fas fa-eye" }, null, -1), r_ = [
  o_
], s_ = { class: "d-flex flex-column gap-2 border rounded p-2" }, i_ = /* @__PURE__ */ w("span", { class: "fs-3" }, "API Token", -1), l_ = /* @__PURE__ */ w("span", null, "Inspect or change the API token", -1), c_ = { class: "input-group" }, a_ = ["value"], u_ = /* @__PURE__ */ w("i", { class: "fas fa-copy" }, null, -1), f_ = [
  u_
], d_ = /* @__PURE__ */ w("i", { class: "fas fa-eye" }, null, -1), p_ = [
  d_
], h_ = /* @__PURE__ */ w("div", { class: "alert alert-warning mb-0" }, [
  /* @__PURE__ */ w("span", null, "Please note that, if the API token is changed, the updated listening URL must also be changed in Hyperspace")
], -1), m_ = /* @__PURE__ */ w("span", { class: "d-flex gap-2 align-items-center" }, [
  /* @__PURE__ */ w("i", { class: "fas fa-refresh" }),
  /* @__PURE__ */ w("span", null, "Regenerate token")
], -1), g_ = [
  m_
], __ = {
  __name: "ApiTokenPage",
  setup(e) {
    const t = Xs(), n = Fg(), o = (m) => {
      const _ = $e(!1), v = () => {
        _.value = !_.value;
      }, A = xe(() => _.value ? m.value : "*******");
      return {
        toggle: v,
        value: A
      };
    }, r = xe(() => {
      var m;
      return (m = t == null ? void 0 : t.api_token_data) == null ? void 0 : m.api_token;
    }), s = o(r), i = xe(() => {
      var m;
      return (m = t == null ? void 0 : t.api_token_data) == null ? void 0 : m.listening_url;
    }), l = o(i), c = xe(() => t == null ? void 0 : t.epic_upload_url);
    async function f() {
      var m;
      await n.copy((m = t == null ? void 0 : t.api_token_data) == null ? void 0 : m.api_token), alert("text copied");
    }
    async function u() {
      var m;
      await n.copy((m = t == null ? void 0 : t.api_token_data) == null ? void 0 : m.listening_url), alert("text copied");
    }
    async function a() {
      await n.copy(t == null ? void 0 : t.epic_upload_url), alert("text copied");
    }
    async function p() {
      confirm("Are you sure you want to generate a new API token?") && (await t.regenerateToken(), t.init());
    }
    return (m, _) => (Te(), He("div", Ug, [
      w("div", Hg, [
        Bg,
        Wg,
        w("div", qg, [
          w("input", {
            type: "text",
            class: "form-control",
            disabled: "",
            readonly: "",
            value: c.value
          }, null, 8, Kg),
          w("button", {
            class: "btn btn-outline-secondary",
            type: "button",
            onClick: a
          }, Gg)
        ])
      ]),
      w("div", Jg, [
        Yg,
        Xg,
        Qg,
        w("div", Zg, [
          w("input", {
            type: "text",
            class: "form-control",
            disabled: "",
            readonly: "",
            value: le(l).value.value
          }, null, 8, e_),
          w("button", {
            class: "btn btn-outline-secondary",
            type: "button",
            onClick: u
          }, n_),
          w("button", {
            class: "btn btn-outline-secondary",
            type: "button",
            onClick: _[0] || (_[0] = (...v) => le(l).toggle && le(l).toggle(...v))
          }, r_)
        ])
      ]),
      w("div", s_, [
        i_,
        l_,
        w("div", c_, [
          w("input", {
            type: "text",
            class: "form-control",
            disabled: "",
            readonly: "",
            value: le(s).value.value
          }, null, 8, a_),
          w("button", {
            class: "btn btn-outline-secondary",
            type: "button",
            onClick: f
          }, f_),
          w("button", {
            class: "btn btn-outline-secondary",
            type: "button",
            onClick: _[1] || (_[1] = (...v) => le(s).toggle && le(s).toggle(...v))
          }, p_)
        ]),
        h_,
        w("div", null, [
          w("button", {
            class: "btn btn-sm btn-danger",
            onClick: p
          }, g_)
        ])
      ])
    ]));
  }
}, lo = (e) => (lc("data-v-f190d170"), e = e(), cc(), e), E_ = { class: "d-flex flex-column gap-2 mt-2" }, y_ = { class: "d-flex align-items-center gap-2" }, b_ = ["disabled"], v_ = /* @__PURE__ */ lo(() => /* @__PURE__ */ w("i", { class: "fas fa-chevron-left fa-fw" }, null, -1)), N_ = [
  v_
], w_ = ["disabled"], O_ = /* @__PURE__ */ lo(() => /* @__PURE__ */ w("i", { class: "fas fa-chevron-right fa-fw" }, null, -1)), S_ = [
  O_
], x_ = ["disabled"], R_ = {
  key: 0,
  class: "fas fa-spinner fa-spin fa-fw"
}, P_ = {
  key: 1,
  class: "fas fa-refresh fa-fw"
}, D_ = { style: { "font-variant-numeric": "tabular-nums" } }, C_ = { class: "number" }, $_ = /* @__PURE__ */ lo(() => /* @__PURE__ */ w("span", null, "/", -1)), T_ = { class: "number" }, A_ = { class: "table table-striped table-bordered table-hover" }, V_ = /* @__PURE__ */ lo(() => /* @__PURE__ */ w("thead", null, [
  /* @__PURE__ */ w("tr", null, [
    /* @__PURE__ */ w("th", null, "log ID"),
    /* @__PURE__ */ w("th", null, "timestamp"),
    /* @__PURE__ */ w("th", null, "user"),
    /* @__PURE__ */ w("th", null, "IP"),
    /* @__PURE__ */ w("th", null, "project ID"),
    /* @__PURE__ */ w("th", null, "record"),
    /* @__PURE__ */ w("th", null, "message"),
    /* @__PURE__ */ w("th", null, "status"),
    /* @__PURE__ */ w("th", null, "description"),
    /* @__PURE__ */ w("th", null, "MRN"),
    /* @__PURE__ */ w("th", null, "study ID")
  ])
], -1)), I_ = /* @__PURE__ */ lo(() => /* @__PURE__ */ w("summary", null, "More...", -1)), k_ = {
  __name: "LogsPage",
  setup(e) {
    const t = Th();
    return $e(), (n, o) => (Te(), He("div", E_, [
      w("div", y_, [
        w("button", {
          type: "button",
          class: "btn btn-sm btn-primary",
          onClick: o[0] || (o[0] = (...r) => le(t).goToPrevPage && le(t).goToPrevPage(...r)),
          disabled: le(t).page <= 1
        }, N_, 8, b_),
        w("button", {
          type: "button",
          class: "btn btn-sm btn-primary",
          onClick: o[1] || (o[1] = (...r) => le(t).goToNextPage && le(t).goToNextPage(...r)),
          disabled: le(t).page >= le(t).totalPages
        }, S_, 8, w_),
        w("button", {
          type: "button",
          class: "btn btn-sm btn-primary",
          onClick: o[2] || (o[2] = (...r) => le(t).refresh && le(t).refresh(...r)),
          disabled: le(t).loading
        }, [
          le(t).loading ? (Te(), He("i", R_)) : (Te(), He("i", P_))
        ], 8, x_),
        w("span", D_, [
          Qt(" Page "),
          w("span", C_, Me(le(t).page), 1),
          $_,
          w("span", T_, Me(le(t).totalPages), 1)
        ])
      ]),
      w("table", A_, [
        V_,
        w("tbody", null, [
          (Te(!0), He(Ue, null, gc(le(t).logs, (r, s) => (Te(), He("tr", {
            key: (r == null ? void 0 : r.log_id) ?? s
          }, [
            w("td", null, Me(r.log_id), 1),
            w("td", null, Me(r.timestamp), 1),
            w("td", null, Me(r.user), 1),
            w("td", null, Me(r.ip), 1),
            w("td", null, Me(r.project_id), 1),
            w("td", null, Me(r.record), 1),
            w("td", null, Me(r.message), 1),
            w("td", null, Me(r.status), 1),
            w("td", null, [
              w("details", null, [
                I_,
                w("pre", null, Me(r.description), 1)
              ])
            ]),
            w("td", null, Me(r.MRN), 1),
            w("td", null, Me(r.study_id), 1)
          ]))), 128))
        ])
      ])
    ]));
  }
}, j_ = /* @__PURE__ */ _r(k_, [["__scopeId", "data-v-f190d170"]]), L_ = [
  {
    path: "/",
    component: xg,
    // redirect: '/inbox',
    children: [
      { path: "", name: "home", component: Ig },
      { path: "project-templates", name: "project-templates", component: Mg },
      { path: "api-token", name: "api-token", component: __ },
      { path: "logs", name: "logs", component: j_ },
      { path: "/:pathMatch(.*)*", component: dg }
    ]
  }
];
let bo;
const M_ = () => bo || (bo = tg({
  // Provide the history implementation to use. We are using the hash history for simplicity here.
  history: tm(),
  routes: L_
}), bo), U_ = (e) => {
  const t = Id(jh), n = dp();
  t.use(n);
  const o = M_();
  return t.use(o), t.mount(e), t;
};
export {
  U_ as default
};
