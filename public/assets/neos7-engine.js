var e = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports); (function () { let e = document.createElement(`link`).relList; if (e && e.supports && e.supports(`modulepreload`)) return; for (let e of document.querySelectorAll(`link[rel="modulepreload"]`)) n(e); new MutationObserver(e => { for (let t of e) if (t.type === `childList`) for (let e of t.addedNodes) e.tagName === `LINK` && e.rel === `modulepreload` && n(e) }).observe(document, { childList: !0, subtree: !0 }); function t(e) { let t = {}; return e.integrity && (t.integrity = e.integrity), e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy), e.crossOrigin === `use-credentials` ? t.credentials = `include` : e.crossOrigin === `anonymous` ? t.credentials = `omit` : t.credentials = `same-origin`, t } function n(e) { if (e.ep) return; e.ep = !0; let n = t(e); fetch(e.href, n) } })(); function t(e) { if (e === void 0) throw ReferenceError(`this hasn't been initialised - super() hasn't been called`); return e } function n(e, t) { e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.__proto__ = t } var r = { autoSleep: 120, force3D: `auto`, nullTargetWarn: 1, units: { lineHeight: `` } }, i = { duration: .5, overwrite: !1, delay: 0 }, a, o, s, c = 1e8, l = 1 / c, u = Math.PI * 2, d = u / 4, f = 0, p = Math.sqrt, m = Math.cos, h = Math.sin, g = function (e) { return typeof e == `string` }, _ = function (e) { return typeof e == `function` }, v = function (e) { return typeof e == `number` }, y = function (e) { return e === void 0 }, b = function (e) { return typeof e == `object` }, x = function (e) { return e !== !1 }, S = function () { return typeof window < `u` }, C = function (e) { return _(e) || g(e) }, w = typeof ArrayBuffer == `function` && ArrayBuffer.isView || function () { }, T = Array.isArray, E = /random\([^)]+\)/g, D = /,\s*/g, O = /(?:-?\.?\d|\.)+/gi, k = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, A = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, j = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, M = /[+-]=-?[.\d]+/, N = /[^,'"\[\]\s]+/gi, P = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, F, I, ee, te, ne = {}, L = {}, re, ie = function (e) { return (L = Me(e, ne)) && Qn }, ae = function (e, t) { return console.warn(`Invalid property`, e, `set to`, t, `Missing plugin? gsap.registerPlugin()`) }, oe = function (e, t) { return !t && console.warn(e) }, se = function (e, t) { return e && (ne[e] = t) && L && (L[e] = t) || ne }, ce = function () { return 0 }, le = { suppressEvents: !0, isStart: !0, kill: !1 }, ue = { suppressEvents: !0, kill: !1 }, de = { suppressEvents: !0 }, fe = {}, pe = [], me = {}, he, ge = {}, R = {}, _e = 30, ve = [], ye = ``, z = function (e) { var t = e[0], n, r; if (b(t) || _(t) || (e = [e]), !(n = (t._gsap || {}).harness)) { for (r = ve.length; r-- && !ve[r].targetTest(t);); n = ve[r] } for (r = e.length; r--;)e[r] && (e[r]._gsap || (e[r]._gsap = new cn(e[r], n))) || e.splice(r, 1); return e }, be = function (e) { return e._gsap || z(ht(e))[0]._gsap }, B = function (e, t, n) { return (n = e[t]) && _(n) ? e[t]() : y(n) && e.getAttribute && e.getAttribute(t) || n }, V = function (e, t) { return (e = e.split(`,`)).forEach(t) || e }, xe = function (e) { return Math.round(e * 1e5) / 1e5 || 0 }, Se = function (e) { return Math.round(e * 1e7) / 1e7 || 0 }, Ce = function (e, t) { var n = t.charAt(0), r = parseFloat(t.substr(2)); return e = parseFloat(e), n === `+` ? e + r : n === `-` ? e - r : n === `*` ? e * r : e / r }, we = function (e, t) { for (var n = t.length, r = 0; e.indexOf(t[r]) < 0 && ++r < n;); return r < n }, Te = function () { var e = pe.length, t = pe.slice(0), n, r; for (me = {}, pe.length = 0, n = 0; n < e; n++)r = t[n], r && r._lazy && (r.render(r._lazy[0], r._lazy[1], !0)._lazy = 0) }, Ee = function (e) { return !!(e._initted || e._startAt || e.add) }, De = function (e, t, n, r) { pe.length && !o && Te(), e.render(t, n, r || !!(o && t < 0 && Ee(e))), pe.length && !o && Te() }, Oe = function (e) { var t = parseFloat(e); return (t || t === 0) && (e + ``).match(N).length < 2 ? t : g(e) ? e.trim() : e }, ke = function (e) { return e }, Ae = function (e, t) { for (var n in t) n in e || (e[n] = t[n]); return e }, je = function (e) { return function (t, n) { for (var r in n) r in t || r === `duration` && e || r === `ease` || (t[r] = n[r]) } }, Me = function (e, t) { for (var n in t) e[n] = t[n]; return e }, Ne = function e(t, n) { for (var r in n) r !== `__proto__` && r !== `constructor` && r !== `prototype` && (t[r] = b(n[r]) ? e(t[r] || (t[r] = {}), n[r]) : n[r]); return t }, Pe = function (e, t) { var n = {}, r; for (r in e) r in t || (n[r] = e[r]); return n }, Fe = function (e) { var t = e.parent || F, n = e.keyframes ? je(T(e.keyframes)) : Ae; if (x(e.inherit)) for (; t;)n(e, t.vars.defaults), t = t.parent || t._dp; return e }, Ie = function (e, t) { for (var n = e.length, r = n === t.length; r && n-- && e[n] === t[n];); return n < 0 }, Le = function (e, t, n, r, i) { n === void 0 && (n = `_first`), r === void 0 && (r = `_last`); var a = e[r], o; if (i) for (o = t[i]; a && a[i] > o;)a = a._prev; return a ? (t._next = a._next, a._next = t) : (t._next = e[n], e[n] = t), t._next ? t._next._prev = t : e[r] = t, t._prev = a, t.parent = t._dp = e, t }, Re = function (e, t, n, r) { n === void 0 && (n = `_first`), r === void 0 && (r = `_last`); var i = t._prev, a = t._next; i ? i._next = a : e[n] === t && (e[n] = a), a ? a._prev = i : e[r] === t && (e[r] = i), t._next = t._prev = t.parent = null }, ze = function (e, t) { e.parent && (!t || e.parent.autoRemoveChildren) && e.parent.remove && e.parent.remove(e), e._act = 0 }, Be = function (e, t) { if (e && (!t || t._end > e._dur || t._start < 0)) for (var n = e; n;)n._dirty = 1, n = n.parent; return e }, Ve = function (e) { for (var t = e.parent; t && t.parent;)t._dirty = 1, t.totalDuration(), t = t.parent; return e }, He = function (e, t, n, r) { return e._startAt && (o ? e._startAt.revert(ue) : e.vars.immediateRender && !e.vars.autoRevert || e._startAt.render(t, !0, r)) }, Ue = function e(t) { return !t || t._ts && e(t.parent) }, We = function (e) { return e._repeat ? Ge(e._tTime, e = e.duration() + e._rDelay) * e : 0 }, Ge = function (e, t) { var n = Math.floor(e = Se(e / t)); return e && n === e ? n - 1 : n }, Ke = function (e, t) { return (e - t._start) * t._ts + (t._ts >= 0 ? 0 : t._dirty ? t.totalDuration() : t._tDur) }, qe = function (e) { return e._end = Se(e._start + (e._tDur / Math.abs(e._ts || e._rts || l) || 0)) }, Je = function (e, t) { var n = e._dp; return n && n.smoothChildTiming && e._ts && (e._start = Se(n._time - (e._ts > 0 ? t / e._ts : ((e._dirty ? e.totalDuration() : e._tDur) - t) / -e._ts)), qe(e), n._dirty || Be(n, e)), e }, Ye = function (e, t) { var n; if ((t._time || !t._dur && t._initted || t._start < e._time && (t._dur || !t.add)) && (n = Ke(e.rawTime(), t), (!t._dur || lt(0, t.totalDuration(), n) - t._tTime > l) && t.render(n, !0)), Be(e, t)._dp && e._initted && e._time >= e._dur && e._ts) { if (e._dur < e.duration()) for (n = e; n._dp;)n.rawTime() >= 0 && n.totalTime(n._tTime), n = n._dp; e._zTime = -l } }, Xe = function (e, t, n, r) { return t.parent && ze(t), t._start = Se((v(n) ? n : n || e !== F ? ot(e, n, t) : e._time) + t._delay), t._end = Se(t._start + (t.totalDuration() / Math.abs(t.timeScale()) || 0)), Le(e, t, `_first`, `_last`, e._sort ? `_start` : 0), et(t) || (e._recent = t), r || Ye(e, t), e._ts < 0 && Je(e, e._tTime), e }, Ze = function (e, t) { return (ne.ScrollTrigger || ae(`scrollTrigger`, t)) && ne.ScrollTrigger.create(t, e) }, Qe = function (e, t, n, r, i) { if (_n(e, t, i), !e._initted) return 1; if (!n && e._pt && !o && (e._dur && e.vars.lazy !== !1 || !e._dur && e.vars.lazy) && he !== qt.frame) return pe.push(e), e._lazy = [i, r], 1 }, $e = function e(t) { var n = t.parent; return n && n._ts && n._initted && !n._lock && (n.rawTime() < 0 || e(n)) }, et = function (e) { var t = e.data; return t === `isFromStart` || t === `isStart` }, tt = function (e, t, n, r) { var i = e.ratio, a = t < 0 || !t && (!e._start && $e(e) && !(!e._initted && et(e)) || (e._ts < 0 || e._dp._ts < 0) && !et(e)) ? 0 : 1, s = e._rDelay, c = 0, u, d, f; if (s && e._repeat && (c = lt(0, e._tDur, t), d = Ge(c, s), e._yoyo && d & 1 && (a = 1 - a), d !== Ge(e._tTime, s) && (i = 1 - a, e.vars.repeatRefresh && e._initted && e.invalidate())), a !== i || o || r || e._zTime === l || !t && e._zTime) { if (!e._initted && Qe(e, t, r, n, c)) return; for (f = e._zTime, e._zTime = t || (n ? l : 0), n ||= t && !f, e.ratio = a, e._from && (a = 1 - a), e._time = 0, e._tTime = c, u = e._pt; u;)u.r(a, u.d), u = u._next; t < 0 && He(e, t, n, !0), e._onUpdate && !n && Mt(e, `onUpdate`), c && e._repeat && !n && e.parent && Mt(e, `onRepeat`), (t >= e._tDur || t < 0) && e.ratio === a && (a && ze(e, 1), !n && !o && (Mt(e, a ? `onComplete` : `onReverseComplete`, !0), e._prom && e._prom())) } else e._zTime ||= t }, nt = function (e, t, n) { var r; if (n > t) for (r = e._first; r && r._start <= n;) { if (r.data === `isPause` && r._start > t) return r; r = r._next } else for (r = e._last; r && r._start >= n;) { if (r.data === `isPause` && r._start < t) return r; r = r._prev } }, rt = function (e, t, n, r) { var i = e._repeat, a = Se(t) || 0, o = e._tTime / e._tDur; return o && !r && (e._time *= a / e._dur), e._dur = a, e._tDur = i ? i < 0 ? 1e10 : Se(a * (i + 1) + e._rDelay * i) : a, o > 0 && !r && Je(e, e._tTime = e._tDur * o), e.parent && qe(e), n || Be(e.parent, e), e }, it = function (e) { return e instanceof un ? Be(e) : rt(e, e._dur) }, at = { _start: 0, endTime: ce, totalDuration: ce }, ot = function e(t, n, r) { var i = t.labels, a = t._recent || at, o = t.duration() >= c ? a.endTime(!1) : t._dur, s, l, u; return g(n) && (isNaN(n) || n in i) ? (l = n.charAt(0), u = n.substr(-1) === `%`, s = n.indexOf(`=`), l === `<` || l === `>` ? (s >= 0 && (n = n.replace(/=/, ``)), (l === `<` ? a._start : a.endTime(a._repeat >= 0)) + (parseFloat(n.substr(1)) || 0) * (u ? (s < 0 ? a : r).totalDuration() / 100 : 1)) : s < 0 ? (n in i || (i[n] = o), i[n]) : (l = parseFloat(n.charAt(s - 1) + n.substr(s + 1)), u && r && (l = l / 100 * (T(r) ? r[0] : r).totalDuration()), s > 1 ? e(t, n.substr(0, s - 1), r) + l : o + l)) : n == null ? o : +n }, st = function (e, t, n) { var r = v(t[1]), i = (r ? 2 : 1) + (e < 2 ? 0 : 1), a = t[i], o, s; if (r && (a.duration = t[1]), a.parent = n, e) { for (o = a, s = n; s && !(`immediateRender` in o);)o = s.vars.defaults || {}, s = x(s.vars.inherit) && s.parent; a.immediateRender = x(o.immediateRender), e < 2 ? a.runBackwards = 1 : a.startAt = t[i - 1] } return new wn(t[0], a, t[i + 1]) }, ct = function (e, t) { return e || e === 0 ? t(e) : t }, lt = function (e, t, n) { return n < e ? e : n > t ? t : n }, ut = function (e, t) { return !g(e) || !(t = P.exec(e)) ? `` : t[1] }, dt = function (e, t, n) { return ct(n, function (n) { return lt(e, t, n) }) }, ft = [].slice, pt = function (e, t) { return e && b(e) && `length` in e && (!t && !e.length || e.length - 1 in e && b(e[0])) && !e.nodeType && e !== I }, mt = function (e, t, n) { return n === void 0 && (n = []), e.forEach(function (e) { var r; return g(e) && !t || pt(e, 1) ? (r = n).push.apply(r, ht(e)) : n.push(e) }) || n }, ht = function (e, t, n) { return s && !t && s.selector ? s.selector(e) : g(e) && !n && (ee || !Jt()) ? ft.call((t || te).querySelectorAll(e), 0) : T(e) ? mt(e, n) : pt(e) ? ft.call(e, 0) : e ? [e] : [] }, gt = function (e) { return e = ht(e)[0] || oe(`Invalid scope`) || {}, function (t) { var n = e.current || e.nativeElement || e; return ht(t, n.querySelectorAll ? n : n === e ? oe(`Invalid scope`) || te.createElement(`div`) : e) } }, _t = function (e) { return e.sort(function () { return .5 - Math.random() }) }, vt = function (e) { if (_(e)) return e; var t = b(e) ? e : { each: e }, n = nn(t.ease), r = t.from || 0, i = parseFloat(t.base) || 0, a = {}, o = r > 0 && r < 1, s = isNaN(r) || o, l = t.axis, u = r, d = r; return g(r) ? u = d = { center: .5, edges: .5, end: 1 }[r] || 0 : !o && s && (u = r[0], d = r[1]), function (e, o, f) { var m = (f || t).length, h = a[m], g, _, v, y, b, x, S, C, w; if (!h) { if (w = t.grid === `auto` ? 0 : (t.grid || [1, c])[1], !w) { for (S = -c; S < (S = f[w++].getBoundingClientRect().left) && w < m;); w < m && w-- } for (h = a[m] = [], g = s ? Math.min(w, m) * u - .5 : r % w, _ = w === c ? 0 : s ? m * d / w - .5 : r / w | 0, S = 0, C = c, x = 0; x < m; x++)v = x % w - g, y = _ - (x / w | 0), h[x] = b = l ? Math.abs(l === `y` ? y : v) : p(v * v + y * y), b > S && (S = b), b < C && (C = b); r === `random` && _t(h), h.max = S - C, h.min = C, h.v = m = (parseFloat(t.amount) || parseFloat(t.each) * (w > m ? m - 1 : l ? l === `y` ? m / w : w : Math.max(w, m / w)) || 0) * (r === `edges` ? -1 : 1), h.b = m < 0 ? i - m : i, h.u = ut(t.amount || t.each) || 0, n = n && m < 0 ? tn(n) : n } return m = (h[e] - h.min) / h.max || 0, Se(h.b + (n ? n(m) : m) * h.v) + h.u } }, yt = function (e) { var t = 10 ** ((e + ``).split(`.`)[1] || ``).length; return function (n) { var r = Se(Math.round(parseFloat(n) / e) * e * t); return (r - r % 1) / t + (v(n) ? 0 : ut(n)) } }, bt = function (e, t) { var n = T(e), r, i; return !n && b(e) && (r = n = e.radius || c, e.values ? (e = ht(e.values), (i = !v(e[0])) && (r *= r)) : e = yt(e.increment)), ct(t, n ? _(e) ? function (t) { return i = e(t), Math.abs(i - t) <= r ? i : t } : function (t) { for (var n = parseFloat(i ? t.x : t), a = parseFloat(i ? t.y : 0), o = c, s = 0, l = e.length, u, d; l--;)i ? (u = e[l].x - n, d = e[l].y - a, u = u * u + d * d) : u = Math.abs(e[l] - n), u < o && (o = u, s = l); return s = !r || o <= r ? e[s] : t, i || s === t || v(t) ? s : s + ut(t) } : yt(e)) }, xt = function (e, t, n, r) { return ct(T(e) ? !t : n === !0 ? !!(n = 0) : !r, function () { return T(e) ? e[~~(Math.random() * e.length)] : (n ||= 1e-5) && (r = n < 1 ? 10 ** ((n + ``).length - 2) : 1) && Math.floor(Math.round((e - n / 2 + Math.random() * (t - e + n * .99)) / n) * n * r) / r }) }, St = function () { var e = [...arguments]; return function (t) { return e.reduce(function (e, t) { return t(e) }, t) } }, Ct = function (e, t) { return function (n) { return e(parseFloat(n)) + (t || ut(n)) } }, wt = function (e, t, n) { return kt(e, t, 0, 1, n) }, Tt = function (e, t, n) { return ct(n, function (n) { return e[~~t(n)] }) }, Et = function e(t, n, r) { var i = n - t; return T(t) ? Tt(t, e(0, t.length), n) : ct(r, function (e) { return (i + (e - t) % i) % i + t }) }, Dt = function e(t, n, r) { var i = n - t, a = i * 2; return T(t) ? Tt(t, e(0, t.length - 1), n) : ct(r, function (e) { return e = (a + (e - t) % a) % a || 0, t + (e > i ? a - e : e) }) }, Ot = function (e) { return e.replace(E, function (e) { var t = e.indexOf(`[`) + 1, n = e.substring(t || 7, t ? e.indexOf(`]`) : e.length - 1).split(D); return xt(t ? n : +n[0], t ? 0 : +n[1], +n[2] || 1e-5) }) }, kt = function (e, t, n, r, i) { var a = t - e, o = r - n; return ct(i, function (t) { return n + ((t - e) / a * o || 0) }) }, At = function e(t, n, r, i) { var a = isNaN(t + n) ? 0 : function (e) { return (1 - e) * t + e * n }; if (!a) { var o = g(t), s = {}, c, l, u, d, f; if (r === !0 && (i = 1) && (r = null), o) t = { p: t }, n = { p: n }; else if (T(t) && !T(n)) { for (u = [], d = t.length, f = d - 2, l = 1; l < d; l++)u.push(e(t[l - 1], t[l])); d--, a = function (e) { e *= d; var t = Math.min(f, ~~e); return u[t](e - t) }, r = n } else i || (t = Me(T(t) ? [] : {}, t)); if (!u) { for (c in n) fn.call(s, t, c, `get`, n[c]); a = function (e) { return Nn(e, s) || (o ? t.p : t) } } } return ct(r, a) }, jt = function (e, t, n) { var r = e.labels, i = c, a, o, s; for (a in r) o = r[a] - t, o < 0 == !!n && o && i > (o = Math.abs(o)) && (s = a, i = o); return s }, Mt = function (e, t, n) { var r = e.vars, i = r[t], a = s, o = e._ctx, c, l, u; if (i) return c = r[t + `Params`], l = r.callbackScope || e, n && pe.length && Te(), o && (s = o), u = c ? i.apply(l, c) : i.call(l), s = a, u }, Nt = function (e) { return ze(e), e.scrollTrigger && e.scrollTrigger.kill(!!o), e.progress() < 1 && Mt(e, `onInterrupt`), e }, Pt, Ft = [], It = function (e) { if (e) if (e = !e.name && e.default || e, S() || e.headless) { var t = e.name, n = _(e), r = t && !n && e.init ? function () { this._props = [] } : e, i = { init: ce, render: Nn, add: fn, kill: Fn, modifier: Pn, rawVars: 0 }, a = { targetTest: 0, get: 0, getSetter: kn, aliases: {}, register: 0 }; if (Jt(), e !== r) { if (ge[t]) return; Ae(r, Ae(Pe(e, i), a)), Me(r.prototype, Me(i, Pe(e, a))), ge[r.prop = t] = r, e.targetTest && (ve.push(r), fe[t] = 1), t = (t === `css` ? `CSS` : t.charAt(0).toUpperCase() + t.substr(1)) + `Plugin` } se(t, r), e.register && e.register(Qn, r, Rn) } else Ft.push(e) }, Lt = 255, Rt = { aqua: [0, Lt, Lt], lime: [0, Lt, 0], silver: [192, 192, 192], black: [0, 0, 0], maroon: [128, 0, 0], teal: [0, 128, 128], blue: [0, 0, Lt], navy: [0, 0, 128], white: [Lt, Lt, Lt], olive: [128, 128, 0], yellow: [Lt, Lt, 0], orange: [Lt, 165, 0], gray: [128, 128, 128], purple: [128, 0, 128], green: [0, 128, 0], red: [Lt, 0, 0], pink: [Lt, 192, 203], cyan: [0, Lt, Lt], transparent: [Lt, Lt, Lt, 0] }, zt = function (e, t, n) { return e += e < 0 ? 1 : e > 1 ? -1 : 0, (e * 6 < 1 ? t + (n - t) * e * 6 : e < .5 ? n : e * 3 < 2 ? t + (n - t) * (2 / 3 - e) * 6 : t) * Lt + .5 | 0 }, Bt = function (e, t, n) { var r = e ? v(e) ? [e >> 16, e >> 8 & Lt, e & Lt] : 0 : Rt.black, i, a, o, s, c, l, u, d, f, p; if (!r) { if (e.substr(-1) === `,` && (e = e.substr(0, e.length - 1)), Rt[e]) r = Rt[e]; else if (e.charAt(0) === `#`) { if (e.length < 6 && (i = e.charAt(1), a = e.charAt(2), o = e.charAt(3), e = `#` + i + i + a + a + o + o + (e.length === 5 ? e.charAt(4) + e.charAt(4) : ``)), e.length === 9) return r = parseInt(e.substr(1, 6), 16), [r >> 16, r >> 8 & Lt, r & Lt, parseInt(e.substr(7), 16) / 255]; e = parseInt(e.substr(1), 16), r = [e >> 16, e >> 8 & Lt, e & Lt] } else if (e.substr(0, 3) === `hsl`) { if (r = p = e.match(O), !t) s = r[0] % 360 / 360, c = r[1] / 100, l = r[2] / 100, a = l <= .5 ? l * (c + 1) : l + c - l * c, i = l * 2 - a, r.length > 3 && (r[3] *= 1), r[0] = zt(s + 1 / 3, i, a), r[1] = zt(s, i, a), r[2] = zt(s - 1 / 3, i, a); else if (~e.indexOf(`=`)) return r = e.match(k), n && r.length < 4 && (r[3] = 1), r } else r = e.match(O) || Rt.transparent; r = r.map(Number) } return t && !p && (i = r[0] / Lt, a = r[1] / Lt, o = r[2] / Lt, u = Math.max(i, a, o), d = Math.min(i, a, o), l = (u + d) / 2, u === d ? s = c = 0 : (f = u - d, c = l > .5 ? f / (2 - u - d) : f / (u + d), s = u === i ? (a - o) / f + (a < o ? 6 : 0) : u === a ? (o - i) / f + 2 : (i - a) / f + 4, s *= 60), r[0] = ~~(s + .5), r[1] = ~~(c * 100 + .5), r[2] = ~~(l * 100 + .5)), n && r.length < 4 && (r[3] = 1), r }, Vt = function (e) { var t = [], n = [], r = -1; return e.split(Ut).forEach(function (e) { var i = e.match(A) || []; t.push.apply(t, i), n.push(r += i.length + 1) }), t.c = n, t }, Ht = function (e, t, n) { var r = ``, i = (e + r).match(Ut), a = t ? `hsla(` : `rgba(`, o = 0, s, c, l, u; if (!i) return e; if (i = i.map(function (e) { return (e = Bt(e, t, 1)) && a + (t ? e[0] + `,` + e[1] + `%,` + e[2] + `%,` + e[3] : e.join(`,`)) + `)` }), n && (l = Vt(e), s = n.c, s.join(r) !== l.c.join(r))) for (c = e.replace(Ut, `1`).split(A), u = c.length - 1; o < u; o++)r += c[o] + (~s.indexOf(o) ? i.shift() || a + `0,0,0,0)` : (l.length ? l : i.length ? i : n).shift()); if (!c) for (c = e.split(Ut), u = c.length - 1; o < u; o++)r += c[o] + i[o]; return r + c[u] }, Ut = function () { var e = `(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b`, t; for (t in Rt) e += `|` + t + `\\b`; return RegExp(e + `)`, `gi`) }(), Wt = /hsl[a]?\(/, Gt = function (e) { var t = e.join(` `), n; if (Ut.lastIndex = 0, Ut.test(t)) return n = Wt.test(t), e[1] = Ht(e[1], n), e[0] = Ht(e[0], n, Vt(e[1])), !0 }, Kt, qt = function () { var e = Date.now, t = 500, n = 33, r = e(), i = r, a = 1e3 / 240, o = a, s = [], c, l, u, d, f, p, m = function u(m) { var h = e() - i, g = m === !0, _, v, y, b; if ((h > t || h < 0) && (r += h - n), i += h, y = i - r, _ = y - o, (_ > 0 || g) && (b = ++d.frame, f = y - d.time * 1e3, d.time = y /= 1e3, o += _ + (_ >= a ? 4 : a - _), v = 1), g || (c = l(u)), v) for (p = 0; p < s.length; p++)s[p](y, f, b, m) }; return d = { time: 0, frame: 0, tick: function () { m(!0) }, deltaRatio: function (e) { return f / (1e3 / (e || 60)) }, wake: function () { re && (!ee && S() && (I = ee = window, te = I.document || {}, ne.gsap = Qn, (I.gsapVersions ||= []).push(Qn.version), ie(L || I.GreenSockGlobals || !I.gsap && I || {}), Ft.forEach(It)), u = typeof requestAnimationFrame < `u` && requestAnimationFrame, c && d.sleep(), l = u || function (e) { return setTimeout(e, o - d.time * 1e3 + 1 | 0) }, Kt = 1, m(2)) }, sleep: function () { (u ? cancelAnimationFrame : clearTimeout)(c), Kt = 0, l = ce }, lagSmoothing: function (e, r) { t = e || 1 / 0, n = Math.min(r || 33, t) }, fps: function (e) { a = 1e3 / (e || 240), o = d.time * 1e3 + a }, add: function (e, t, n) { var r = t ? function (t, n, i, a) { e(t, n, i, a), d.remove(r) } : e; return d.remove(e), s[n ? `unshift` : `push`](r), Jt(), r }, remove: function (e, t) { ~(t = s.indexOf(e)) && s.splice(t, 1) && p >= t && p-- }, _listeners: s }, d }(), Jt = function () { return !Kt && qt.wake() }, Yt = {}, Xt = /^[\d.\-M][\d.\-,\s]/, Zt = /["']/g, Qt = function (e) { for (var t = {}, n = e.substr(1, e.length - 3).split(`:`), r = n[0], i = 1, a = n.length, o, s, c; i < a; i++)s = n[i], o = i === a - 1 ? s.length : s.lastIndexOf(`,`), c = s.substr(0, o), t[r] = isNaN(c) ? c.replace(Zt, ``).trim() : +c, r = s.substr(o + 1).trim(); return t }, $t = function (e) { var t = e.indexOf(`(`) + 1, n = e.indexOf(`)`), r = e.indexOf(`(`, t); return e.substring(t, ~r && r < n ? e.indexOf(`)`, n + 1) : n) }, en = function (e) { var t = (e + ``).split(`(`), n = Yt[t[0]]; return n && t.length > 1 && n.config ? n.config.apply(null, ~e.indexOf(`{`) ? [Qt(t[1])] : $t(e).split(`,`).map(Oe)) : Yt._CE && Xt.test(e) ? Yt._CE(``, e) : n }, tn = function (e) { return function (t) { return 1 - e(1 - t) } }, nn = function (e, t) { return e && (_(e) ? e : Yt[e] || en(e)) || t }, rn = function (e, t, n, r) { n === void 0 && (n = function (e) { return 1 - t(1 - e) }), r === void 0 && (r = function (e) { return e < .5 ? t(e * 2) / 2 : 1 - t((1 - e) * 2) / 2 }); var i = { easeIn: t, easeOut: n, easeInOut: r }, a; return V(e, function (e) { for (var t in Yt[e] = ne[e] = i, Yt[a = e.toLowerCase()] = n, i) Yt[a + (t === `easeIn` ? `.in` : t === `easeOut` ? `.out` : `.inOut`)] = Yt[e + `.` + t] = i[t] }), i }, an = function (e) { return function (t) { return t < .5 ? (1 - e(1 - t * 2)) / 2 : .5 + e((t - .5) * 2) / 2 } }, on = function e(t, n, r) { var i = n >= 1 ? n : 1, a = (r || (t ? .3 : .45)) / (n < 1 ? n : 1), o = a / u * (Math.asin(1 / i) || 0), s = function (e) { return e === 1 ? 1 : i * 2 ** (-10 * e) * h((e - o) * a) + 1 }, c = t === `out` ? s : t === `in` ? function (e) { return 1 - s(1 - e) } : an(s); return a = u / a, c.config = function (n, r) { return e(t, n, r) }, c }, sn = function e(t, n) { n === void 0 && (n = 1.70158); var r = function (e) { return e ? --e * e * ((n + 1) * e + n) + 1 : 0 }, i = t === `out` ? r : t === `in` ? function (e) { return 1 - r(1 - e) } : an(r); return i.config = function (n) { return e(t, n) }, i }; V(`Linear,Quad,Cubic,Quart,Quint,Strong`, function (e, t) { var n = t < 5 ? t + 1 : t; rn(e + `,Power` + (n - 1), t ? function (e) { return e ** +n } : function (e) { return e }, function (e) { return 1 - (1 - e) ** n }, function (e) { return e < .5 ? (e * 2) ** n / 2 : 1 - ((1 - e) * 2) ** n / 2 }) }), Yt.Linear.easeNone = Yt.none = Yt.Linear.easeIn, rn(`Elastic`, on(`in`), on(`out`), on()), (function (e, t) { var n = 1 / t, r = 2 * n, i = 2.5 * n, a = function (a) { return a < n ? e * a * a : a < r ? e * (a - 1.5 / t) ** 2 + .75 : a < i ? e * (a -= 2.25 / t) * a + .9375 : e * (a - 2.625 / t) ** 2 + .984375 }; rn(`Bounce`, function (e) { return 1 - a(1 - e) }, a) })(7.5625, 2.75), rn(`Expo`, function (e) { return 2 ** (10 * (e - 1)) * e + e * e * e * e * e * e * (1 - e) }), rn(`Circ`, function (e) { return -(p(1 - e * e) - 1) }), rn(`Sine`, function (e) { return e === 1 ? 1 : -m(e * d) + 1 }), rn(`Back`, sn(`in`), sn(`out`), sn()), Yt.SteppedEase = Yt.steps = ne.SteppedEase = { config: function (e, t) { e === void 0 && (e = 1); var n = 1 / e, r = e + +!t, i = +!!t, a = 1 - l; return function (e) { return ((r * lt(0, a, e) | 0) + i) * n } } }, i.ease = Yt[`quad.out`], V(`onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt`, function (e) { return ye += e + `,` + e + `Params,` }); var cn = function (e, t) { this.id = f++, e._gsap = this, this.target = e, this.harness = t, this.get = t ? t.get : B, this.set = t ? t.getSetter : kn }, ln = function () { function e(e) { this.vars = e, this._delay = +e.delay || 0, (this._repeat = e.repeat === 1 / 0 ? -2 : e.repeat || 0) && (this._rDelay = e.repeatDelay || 0, this._yoyo = !!e.yoyo || !!e.yoyoEase), this._ts = 1, rt(this, +e.duration, 1, 1), this.data = e.data, s && (this._ctx = s, s.data.push(this)), Kt || qt.wake() } var t = e.prototype; return t.delay = function (e) { return e || e === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + e - this._delay), this._delay = e, this) : this._delay }, t.duration = function (e) { return arguments.length ? this.totalDuration(this._repeat > 0 ? e + (e + this._rDelay) * this._repeat : e) : this.totalDuration() && this._dur }, t.totalDuration = function (e) { return arguments.length ? (this._dirty = 0, rt(this, this._repeat < 0 ? e : (e - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur }, t.totalTime = function (e, t) { if (Jt(), !arguments.length) return this._tTime; var n = this._dp; if (n && n.smoothChildTiming && this._ts) { for (Je(this, e), !n._dp || n.parent || Ye(n, this); n && n.parent;)n.parent._time !== n._start + (n._ts >= 0 ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) && n.totalTime(n._tTime, !0), n = n.parent; !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && e < this._tDur || this._ts < 0 && e > 0 || !this._tDur && !e) && Xe(this._dp, this, this._start - this._delay) } return (this._tTime !== e || !this._dur && !t || this._initted && Math.abs(this._zTime) === l || !this._initted && this._dur && e || !e && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = e), De(this, e, t)), this }, t.time = function (e, t) { return arguments.length ? this.totalTime(Math.min(this.totalDuration(), e + We(this)) % (this._dur + this._rDelay) || (e ? this._dur : 0), t) : this._time }, t.totalProgress = function (e, t) { return arguments.length ? this.totalTime(this.totalDuration() * e, t) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0 }, t.progress = function (e, t) { return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - e : e) + We(this), t) : this.duration() ? Math.min(1, this._time / this._dur) : +(this.rawTime() > 0) }, t.iteration = function (e, t) { var n = this.duration() + this._rDelay; return arguments.length ? this.totalTime(this._time + (e - 1) * n, t) : this._repeat ? Ge(this._tTime, n) + 1 : 1 }, t.timeScale = function (e, t) { if (!arguments.length) return this._rts === -l ? 0 : this._rts; if (this._rts === e) return this; var n = this.parent && this._ts ? Ke(this.parent._time, this) : this._tTime; return this._rts = +e || 0, this._ts = this._ps || e === -l ? 0 : this._rts, this.totalTime(lt(-Math.abs(this._delay), this.totalDuration(), n), t !== !1), qe(this), Ve(this) }, t.paused = function (e) { return arguments.length ? (this._ps !== e && (this._ps = e, e ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (Jt(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== l && (this._tTime -= l)))), this) : this._ps }, t.startTime = function (e) { if (arguments.length) { this._start = Se(e); var t = this.parent || this._dp; return t && (t._sort || !this.parent) && Xe(t, this, this._start - this._delay), this } return this._start }, t.endTime = function (e) { return this._start + (x(e) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1) }, t.rawTime = function (e) { var t = this.parent || this._dp; return t ? e && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Ke(t.rawTime(e), this) : this._tTime : this._tTime }, t.revert = function (e) { e === void 0 && (e = de); var t = o; return o = e, Ee(this) && (this.timeline && this.timeline.revert(e), this.totalTime(-.01, e.suppressEvents)), this.data !== `nested` && e.kill !== !1 && this.kill(), o = t, this }, t.globalTime = function (e) { for (var t = this, n = arguments.length ? e : t.rawTime(); t;)n = t._start + n / (Math.abs(t._ts) || 1), t = t._dp; return !this.parent && this._sat ? this._sat.globalTime(e) : n }, t.repeat = function (e) { return arguments.length ? (this._repeat = e === 1 / 0 ? -2 : e, it(this)) : this._repeat === -2 ? 1 / 0 : this._repeat }, t.repeatDelay = function (e) { if (arguments.length) { var t = this._time; return this._rDelay = e, it(this), t ? this.time(t) : this } return this._rDelay }, t.yoyo = function (e) { return arguments.length ? (this._yoyo = e, this) : this._yoyo }, t.seek = function (e, t) { return this.totalTime(ot(this, e), x(t)) }, t.restart = function (e, t) { return this.play().totalTime(e ? -this._delay : 0, x(t)), this._dur || (this._zTime = -l), this }, t.play = function (e, t) { return e != null && this.seek(e, t), this.reversed(!1).paused(!1) }, t.reverse = function (e, t) { return e != null && this.seek(e || this.totalDuration(), t), this.reversed(!0).paused(!1) }, t.pause = function (e, t) { return e != null && this.seek(e, t), this.paused(!0) }, t.resume = function () { return this.paused(!1) }, t.reversed = function (e) { return arguments.length ? (!!e !== this.reversed() && this.timeScale(-this._rts || (e ? -l : 0)), this) : this._rts < 0 }, t.invalidate = function () { return this._initted = this._act = 0, this._zTime = -l, this }, t.isActive = function () { var e = this.parent || this._dp, t = this._start, n; return !!(!e || this._ts && this._initted && e.isActive() && (n = e.rawTime(!0)) >= t && n < this.endTime(!0) - l) }, t.eventCallback = function (e, t, n) { var r = this.vars; return arguments.length > 1 ? (t ? (r[e] = t, n && (r[e + `Params`] = n), e === `onUpdate` && (this._onUpdate = t)) : delete r[e], this) : r[e] }, t.then = function (e) { var t = this, n = t._prom; return new Promise(function (r) { var i = _(e) ? e : ke, a = function () { var e = t.then; t.then = null, n && n(), _(i) && (i = i(t)) && (i.then || i === t) && (t.then = e), r(i), t.then = e }; t._initted && t.totalProgress() === 1 && t._ts >= 0 || !t._tTime && t._ts < 0 ? a() : t._prom = a }) }, t.kill = function () { Nt(this) }, e }(); Ae(ln.prototype, { _time: 0, _start: 0, _end: 0, _tTime: 0, _tDur: 0, _dirty: 0, _repeat: 0, _yoyo: !1, parent: null, _initted: !1, _rDelay: 0, _ts: 1, _dp: 0, ratio: 0, _zTime: -l, _prom: 0, _ps: !1, _rts: 1 }); var un = function (e) { n(i, e); function i(n, r) { var i; return n === void 0 && (n = {}), i = e.call(this, n) || this, i.labels = {}, i.smoothChildTiming = !!n.smoothChildTiming, i.autoRemoveChildren = !!n.autoRemoveChildren, i._sort = x(n.sortChildren), F && Xe(n.parent || F, t(i), r), n.reversed && i.reverse(), n.paused && i.paused(!0), n.scrollTrigger && Ze(t(i), n.scrollTrigger), i } var a = i.prototype; return a.to = function (e, t, n) { return st(0, arguments, this), this }, a.from = function (e, t, n) { return st(1, arguments, this), this }, a.fromTo = function (e, t, n, r) { return st(2, arguments, this), this }, a.set = function (e, t, n) { return t.duration = 0, t.parent = this, Fe(t).repeatDelay || (t.repeat = 0), t.immediateRender = !!t.immediateRender, new wn(e, t, ot(this, n), 1), this }, a.call = function (e, t, n) { return Xe(this, wn.delayedCall(0, e, t), n) }, a.staggerTo = function (e, t, n, r, i, a, o) { return n.duration = t, n.stagger = n.stagger || r, n.onComplete = a, n.onCompleteParams = o, n.parent = this, new wn(e, n, ot(this, i)), this }, a.staggerFrom = function (e, t, n, r, i, a, o) { return n.runBackwards = 1, Fe(n).immediateRender = x(n.immediateRender), this.staggerTo(e, t, n, r, i, a, o) }, a.staggerFromTo = function (e, t, n, r, i, a, o, s) { return r.startAt = n, Fe(r).immediateRender = x(r.immediateRender), this.staggerTo(e, t, r, i, a, o, s) }, a.render = function (e, t, n) { var r = this._time, i = this._dirty ? this.totalDuration() : this._tDur, a = this._dur, s = e <= 0 ? 0 : Se(e), c = this._zTime < 0 != e < 0 && (this._initted || !a), u, d, f, p, m, h, g, _, v, y, b, x; if (this !== F && s > i && e >= 0 && (s = i), s !== this._tTime || n || c) { if (r !== this._time && a && (s += this._time - r, e += this._time - r), u = s, v = this._start, _ = this._ts, h = !_, c && (a || (r = this._zTime), (e || !t) && (this._zTime = e)), this._repeat) { if (b = this._yoyo, m = a + this._rDelay, this._repeat < -1 && e < 0) return this.totalTime(m * 100 + e, t, n); if (u = Se(s % m), s === i ? (p = this._repeat, u = a) : (y = Se(s / m), p = ~~y, p && p === y && (u = a, p--), u > a && (u = a)), y = Ge(this._tTime, m), !r && this._tTime && y !== p && this._tTime - y * m - this._dur <= 0 && (y = p), b && p & 1 && (u = a - u, x = 1), p !== y && !this._lock) { var S = b && y & 1, C = S === (b && p & 1); if (p < y && (S = !S), r = S ? 0 : s % a ? a : s, this._lock = 1, this.render(r || (x ? 0 : Se(p * m)), t, !a)._lock = 0, this._tTime = s, !t && this.parent && Mt(this, `onRepeat`), this.vars.repeatRefresh && !x && (this.invalidate()._lock = 1, y = p), r && r !== this._time || h !== !this._ts || this.vars.onRepeat && !this.parent && !this._act || (a = this._dur, i = this._tDur, C && (this._lock = 2, r = S ? a : -1e-4, this.render(r, !0), this.vars.repeatRefresh && !x && this.invalidate()), this._lock = 0, !this._ts && !h)) return this } } if (this._hasPause && !this._forcing && this._lock < 2 && (g = nt(this, Se(r), Se(u)), g && (s -= u - (u = g._start))), this._tTime = s, this._time = u, this._act = !!_, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = e, r = 0), !r && s && a && !t && !y && (Mt(this, `onStart`), this._tTime !== s)) return this; if (u >= r && e >= 0) for (d = this._first; d;) { if (f = d._next, (d._act || u >= d._start) && d._ts && g !== d) { if (d.parent !== this) return this.render(e, t, n); if (d.render(d._ts > 0 ? (u - d._start) * d._ts : (d._dirty ? d.totalDuration() : d._tDur) + (u - d._start) * d._ts, t, n), u !== this._time || !this._ts && !h) { g = 0, f && (s += this._zTime = -l); break } } d = f } else { d = this._last; for (var w = e < 0 ? e : u; d;) { if (f = d._prev, (d._act || w <= d._end) && d._ts && g !== d) { if (d.parent !== this) return this.render(e, t, n); if (d.render(d._ts > 0 ? (w - d._start) * d._ts : (d._dirty ? d.totalDuration() : d._tDur) + (w - d._start) * d._ts, t, n || o && Ee(d)), u !== this._time || !this._ts && !h) { g = 0, f && (s += this._zTime = w ? -l : l); break } } d = f } } if (g && !t && (this.pause(), g.render(u >= r ? 0 : -l)._zTime = u >= r ? 1 : -1, this._ts)) return this._start = v, qe(this), this.render(e, t, n); this._onUpdate && !t && Mt(this, `onUpdate`, !0), (s === i && this._tTime >= this.totalDuration() || !s && r) && (v === this._start || Math.abs(_) !== Math.abs(this._ts)) && (this._lock || ((e || !a) && (s === i && this._ts > 0 || !s && this._ts < 0) && ze(this, 1), !t && !(e < 0 && !r) && (s || r || !i) && (Mt(this, s === i && e >= 0 ? `onComplete` : `onReverseComplete`, !0), this._prom && !(s < i && this.timeScale() > 0) && this._prom()))) } return this }, a.add = function (e, t) { var n = this; if (v(t) || (t = ot(this, t, e)), !(e instanceof ln)) { if (T(e)) return e.forEach(function (e) { return n.add(e, t) }), this; if (g(e)) return this.addLabel(e, t); if (_(e)) e = wn.delayedCall(0, e); else return this } return this === e ? this : Xe(this, e, t) }, a.getChildren = function (e, t, n, r) { e === void 0 && (e = !0), t === void 0 && (t = !0), n === void 0 && (n = !0), r === void 0 && (r = -c); for (var i = [], a = this._first; a;)a._start >= r && (a instanceof wn ? t && i.push(a) : (n && i.push(a), e && i.push.apply(i, a.getChildren(!0, t, n)))), a = a._next; return i }, a.getById = function (e) { for (var t = this.getChildren(1, 1, 1), n = t.length; n--;)if (t[n].vars.id === e) return t[n] }, a.remove = function (e) { return g(e) ? this.removeLabel(e) : _(e) ? this.killTweensOf(e) : (e.parent === this && Re(this, e), e === this._recent && (this._recent = this._last), Be(this)) }, a.totalTime = function (t, n) { return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = Se(qt.time - (this._ts > 0 ? t / this._ts : (this.totalDuration() - t) / -this._ts))), e.prototype.totalTime.call(this, t, n), this._forcing = 0, this) : this._tTime }, a.addLabel = function (e, t) { return this.labels[e] = ot(this, t), this }, a.removeLabel = function (e) { return delete this.labels[e], this }, a.addPause = function (e, t, n) { var r = wn.delayedCall(0, t || ce, n); return r.data = `isPause`, this._hasPause = 1, Xe(this, r, ot(this, e)) }, a.removePause = function (e) { var t = this._first; for (e = ot(this, e); t;)t._start === e && t.data === `isPause` && ze(t), t = t._next }, a.killTweensOf = function (e, t, n) { for (var r = this.getTweensOf(e, n), i = r.length; i--;)hn !== r[i] && r[i].kill(e, t); return this }, a.getTweensOf = function (e, t) { for (var n = [], r = ht(e), i = this._first, a = v(t), o; i;)i instanceof wn ? we(i._targets, r) && (a ? (!hn || i._initted && i._ts) && i.globalTime(0) <= t && i.globalTime(i.totalDuration()) > t : !t || i.isActive()) && n.push(i) : (o = i.getTweensOf(r, t)).length && n.push.apply(n, o), i = i._next; return n }, a.tweenTo = function (e, t) { t ||= {}; var n = this, r = ot(n, e), i = t, a = i.startAt, o = i.onStart, s = i.onStartParams, c = i.immediateRender, u, d = wn.to(n, Ae({ ease: t.ease || `none`, lazy: !1, immediateRender: !1, time: r, overwrite: `auto`, duration: t.duration || Math.abs((r - (a && `time` in a ? a.time : n._time)) / n.timeScale()) || l, onStart: function () { if (n.pause(), !u) { var e = t.duration || Math.abs((r - (a && `time` in a ? a.time : n._time)) / n.timeScale()); d._dur !== e && rt(d, e, 0, 1).render(d._time, !0, !0), u = 1 } o && o.apply(d, s || []) } }, t)); return c ? d.render(0) : d }, a.tweenFromTo = function (e, t, n) { return this.tweenTo(t, Ae({ startAt: { time: ot(this, e) } }, n)) }, a.recent = function () { return this._recent }, a.nextLabel = function (e) { return e === void 0 && (e = this._time), jt(this, ot(this, e)) }, a.previousLabel = function (e) { return e === void 0 && (e = this._time), jt(this, ot(this, e), 1) }, a.currentLabel = function (e) { return arguments.length ? this.seek(e, !0) : this.previousLabel(this._time + l) }, a.shiftChildren = function (e, t, n) { n === void 0 && (n = 0); var r = this._first, i = this.labels, a; for (e = Se(e); r;)r._start >= n && (r._start += e, r._end += e), r = r._next; if (t) for (a in i) i[a] >= n && (i[a] += e); return Be(this) }, a.invalidate = function (t) { var n = this._first; for (this._lock = 0; n;)n.invalidate(t), n = n._next; return e.prototype.invalidate.call(this, t) }, a.clear = function (e) { e === void 0 && (e = !0); for (var t = this._first, n; t;)n = t._next, this.remove(t), t = n; return this._dp && (this._time = this._tTime = this._pTime = 0), e && (this.labels = {}), Be(this) }, a.totalDuration = function (e) { var t = 0, n = this, r = n._last, i = c, a, o, s; if (arguments.length) return n.timeScale((n._repeat < 0 ? n.duration() : n.totalDuration()) / (n.reversed() ? -e : e)); if (n._dirty) { for (s = n.parent; r;)a = r._prev, r._dirty && r.totalDuration(), o = r._start, o > i && n._sort && r._ts && !n._lock ? (n._lock = 1, Xe(n, r, o - r._delay, 1)._lock = 0) : i = o, o < 0 && r._ts && (t -= o, (!s && !n._dp || s && s.smoothChildTiming) && (n._start += Se(o / n._ts), n._time -= o, n._tTime -= o), n.shiftChildren(-o, !1, -1 / 0), i = 0), r._end > t && r._ts && (t = r._end), r = a; rt(n, n === F && n._time > t ? n._time : t, 1, 1), n._dirty = 0 } return n._tDur }, i.updateRoot = function (e) { if (F._ts && (De(F, Ke(e, F)), he = qt.frame), qt.frame >= _e) { _e += r.autoSleep || 120; var t = F._first; if ((!t || !t._ts) && r.autoSleep && qt._listeners.length < 2) { for (; t && !t._ts;)t = t._next; t || qt.sleep() } } }, i }(ln); Ae(un.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 }); var dn = function (e, t, n, r, i, a, o) { var s = new Rn(this._pt, e, t, 0, 1, Mn, null, i), c = 0, l = 0, u, d, f, p, m, h, g, _; for (s.b = n, s.e = r, n += ``, r += ``, (g = ~r.indexOf(`random(`)) && (r = Ot(r)), a && (_ = [n, r], a(_, e, t), n = _[0], r = _[1]), d = n.match(j) || []; u = j.exec(r);)p = u[0], m = r.substring(c, u.index), f ? f = (f + 1) % 5 : m.substr(-5) === `rgba(` && (f = 1), p !== d[l++] && (h = parseFloat(d[l - 1]) || 0, s._pt = { _next: s._pt, p: m || l === 1 ? m : `,`, s: h, c: p.charAt(1) === `=` ? Ce(h, p) - h : parseFloat(p) - h, m: f && f < 4 ? Math.round : 0 }, c = j.lastIndex); return s.c = c < r.length ? r.substring(c, r.length) : ``, s.fp = o, (M.test(r) || g) && (s.e = 0), this._pt = s, s }, fn = function (e, t, n, i, a, o, s, c, l, u) { _(i) && (i = i(a || 0, e, o)); var d = e[t], f = n === `get` ? _(d) ? l ? e[t.indexOf(`set`) || !_(e[`get` + t.substr(3)]) ? t : `get` + t.substr(3)](l) : e[t]() : d : n, p = _(d) ? l ? Dn : En : Tn, m; if (g(i) && (~i.indexOf(`random(`) && (i = Ot(i)), i.charAt(1) === `=` && (m = Ce(f, i) + (ut(f) || 0), (m || m === 0) && (i = m))), !u || f !== i || gn) return !isNaN(f * i) && i !== `` ? (m = new Rn(this._pt, e, t, +f || 0, i - (f || 0), typeof d == `boolean` ? jn : An, 0, p), l && (m.fp = l), s && m.modifier(s, this, e), this._pt = m) : (!d && !(t in e) && ae(t, i), dn.call(this, e, t, f, i, p, c || r.stringFilter, l)) }, pn = function (e, t, n, r, i) { if (_(e) && (e = xn(e, i, t, n, r)), !b(e) || e.style && e.nodeType || T(e) || w(e)) return g(e) ? xn(e, i, t, n, r) : e; var a = {}, o; for (o in e) a[o] = xn(e[o], i, t, n, r); return a }, mn = function (e, t, n, r, i, a) { var o, s, c, l; if (ge[e] && (o = new ge[e]).init(i, o.rawVars ? t[e] : pn(t[e], r, i, a, n), n, r, a) !== !1 && (n._pt = s = new Rn(n._pt, i, e, 0, 1, o.render, o, 0, o.priority), n !== Pt)) for (c = n._ptLookup[n._targets.indexOf(i)], l = o._props.length; l--;)c[o._props[l]] = s; return o }, hn, gn, _n = function e(t, n, r) { var s = t.vars, u = s.ease, d = s.startAt, f = s.immediateRender, p = s.lazy, m = s.onUpdate, h = s.runBackwards, g = s.yoyoEase, _ = s.keyframes, v = s.autoRevert, y = t._dur, b = t._startAt, S = t._targets, C = t.parent, w = C && C.data === `nested` ? C.vars.targets : S, T = t._overwrite === `auto` && !a, E = t.timeline, D = s.easeReverse || g, O, k, A, j, M, N, P, I, ee, te, ne, L, re; if (E && (!_ || !u) && (u = `none`), t._ease = nn(u, i.ease), t._rEase = D && (nn(D) || t._ease), t._from = !E && !!s.runBackwards, t._from && (t.ratio = 1), !E || _ && !s.stagger) { if (I = S[0] ? be(S[0]).harness : 0, L = I && s[I.prop], O = Pe(s, fe), b && (b._zTime < 0 && b.progress(1), n < 0 && h && f && !v ? b.render(-1, !0) : b.revert(h && y ? ue : le), b._lazy = 0), d) { if (ze(t._startAt = wn.set(S, Ae({ data: `isStart`, overwrite: !1, parent: C, immediateRender: !0, lazy: !b && x(p), startAt: null, delay: 0, onUpdate: m && function () { return Mt(t, `onUpdate`) }, stagger: 0 }, d))), t._startAt._dp = 0, t._startAt._sat = t, n < 0 && (o || !f && !v) && t._startAt.revert(ue), f && y && n <= 0 && r <= 0) { n && (t._zTime = n); return } } else if (h && y && !b) { if (n && (f = !1), A = Ae({ overwrite: !1, data: `isFromStart`, lazy: f && !b && x(p), immediateRender: f, stagger: 0, parent: C }, O), L && (A[I.prop] = L), ze(t._startAt = wn.set(S, A)), t._startAt._dp = 0, t._startAt._sat = t, n < 0 && (o ? t._startAt.revert(ue) : t._startAt.render(-1, !0)), t._zTime = n, !f) e(t._startAt, l, l); else if (!n) return } for (t._pt = t._ptCache = 0, p = y && x(p) || p && !y, k = 0; k < S.length; k++) { if (M = S[k], P = M._gsap || z(S)[k]._gsap, t._ptLookup[k] = te = {}, me[P.id] && pe.length && Te(), ne = w === S ? k : w.indexOf(M), I && (ee = new I).init(M, L || O, t, ne, w) !== !1 && (t._pt = j = new Rn(t._pt, M, ee.name, 0, 1, ee.render, ee, 0, ee.priority), ee._props.forEach(function (e) { te[e] = j }), ee.priority && (N = 1)), !I || L) for (A in O) ge[A] && (ee = mn(A, O, t, ne, M, w)) ? ee.priority && (N = 1) : te[A] = j = fn.call(t, M, A, `get`, O[A], ne, w, 0, s.stringFilter); t._op && t._op[k] && t.kill(M, t._op[k]), T && t._pt && (hn = t, F.killTweensOf(M, te, t.globalTime(n)), re = !t.parent, hn = 0), t._pt && p && (me[P.id] = 1) } N && Ln(t), t._onInit && t._onInit(t) } t._onUpdate = m, t._initted = (!t._op || t._pt) && !re, _ && n <= 0 && E.render(c, !0, !0) }, vn = function (e, t, n, r, i, a, o, s) { var c = (e._pt && e._ptCache || (e._ptCache = {}))[t], l, u, d, f; if (!c) for (c = e._ptCache[t] = [], d = e._ptLookup, f = e._targets.length; f--;) { if (l = d[f][t], l && l.d && l.d._pt) for (l = l.d._pt; l && l.p !== t && l.fp !== t;)l = l._next; if (!l) return gn = 1, e.vars[t] = `+=0`, _n(e, o), gn = 0, s ? oe(t + ` not eligible for reset. Try splitting into individual properties`) : 1; c.push(l) } for (f = c.length; f--;)u = c[f], l = u._pt || u, l.s = (r || r === 0) && !i ? r : l.s + (r || 0) + a * l.c, l.c = n - l.s, u.e &&= xe(n) + ut(u.e), u.b &&= l.s + ut(u.b) }, yn = function (e, t) { var n = e[0] ? be(e[0]).harness : 0, r = n && n.aliases, i, a, o, s; if (!r) return t; for (a in i = Me({}, t), r) if (a in i) for (s = r[a].split(`,`), o = s.length; o--;)i[s[o]] = i[a]; return i }, bn = function (e, t, n, r) { var i = t.ease || r || `power1.inOut`, a, o; if (T(t)) o = n[e] || (n[e] = []), t.forEach(function (e, n) { return o.push({ t: n / (t.length - 1) * 100, v: e, e: i }) }); else for (a in t) o = n[a] || (n[a] = []), a === `ease` || o.push({ t: parseFloat(e), v: t[a], e: i }) }, xn = function (e, t, n, r, i) { return _(e) ? e.call(t, n, r, i) : g(e) && ~e.indexOf(`random(`) ? Ot(e) : e }, Sn = ye + `repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert`, Cn = {}; V(Sn + `,id,stagger,delay,duration,paused,scrollTrigger`, function (e) { return Cn[e] = 1 }); var wn = function (e) { n(i, e); function i(n, i, o, s) { var c; typeof i == `number` && (o.duration = i, i = o, o = null), c = e.call(this, s ? i : Fe(i)) || this; var u = c.vars, d = u.duration, f = u.delay, p = u.immediateRender, m = u.stagger, h = u.overwrite, g = u.keyframes, _ = u.defaults, y = u.scrollTrigger, S = i.parent || F, E = (T(n) || w(n) ? v(n[0]) : `length` in i) ? [n] : ht(n), D, O, k, A, j, M, N, P; if (c._targets = E.length ? z(E) : oe(`GSAP target ` + n + ` not found. https://gsap.com`, !r.nullTargetWarn) || [], c._ptLookup = [], c._overwrite = h, g || m || C(d) || C(f)) { i = c.vars; var I = i.easeReverse || i.yoyoEase; if (D = c.timeline = new un({ data: `nested`, defaults: _ || {}, targets: S && S.data === `nested` ? S.vars.targets : E }), D.kill(), D.parent = D._dp = t(c), D._start = 0, m || C(d) || C(f)) { if (A = E.length, N = m && vt(m), b(m)) for (j in m) ~Sn.indexOf(j) && (P ||= {}, P[j] = m[j]); for (O = 0; O < A; O++)k = Pe(i, Cn), k.stagger = 0, I && (k.easeReverse = I), P && Me(k, P), M = E[O], k.duration = +xn(d, t(c), O, M, E), k.delay = (+xn(f, t(c), O, M, E) || 0) - c._delay, !m && A === 1 && k.delay && (c._delay = f = k.delay, c._start += f, k.delay = 0), D.to(M, k, N ? N(O, M, E) : 0), D._ease = Yt.none; D.duration() ? d = f = 0 : c.timeline = 0 } else if (g) { Fe(Ae(D.vars.defaults, { ease: `none` })), D._ease = nn(g.ease || i.ease || `none`); var ee = 0, te, ne, L; if (T(g)) g.forEach(function (e) { return D.to(E, e, `>`) }), D.duration(); else { for (j in k = {}, g) j === `ease` || j === `easeEach` || bn(j, g[j], k, g.easeEach); for (j in k) for (te = k[j].sort(function (e, t) { return e.t - t.t }), ee = 0, O = 0; O < te.length; O++)ne = te[O], L = { ease: ne.e, duration: (ne.t - (O ? te[O - 1].t : 0)) / 100 * d }, L[j] = ne.v, D.to(E, L, ee), ee += L.duration; D.duration() < d && D.to({}, { duration: d - D.duration() }) } } d || c.duration(d = D.duration()) } else c.timeline = 0; return h === !0 && !a && (hn = t(c), F.killTweensOf(E), hn = 0), Xe(S, t(c), o), i.reversed && c.reverse(), i.paused && c.paused(!0), (p || !d && !g && c._start === Se(S._time) && x(p) && Ue(t(c)) && S.data !== `nested`) && (c._tTime = -l, c.render(Math.max(0, -f) || 0)), y && Ze(t(c), y), c } var s = i.prototype; return s.render = function (e, t, n) { var r = this._time, i = this._tDur, a = this._dur, o = e < 0, s = e > i - l && !o ? i : e < l ? 0 : e, c, u, d, f, p, m, h, g; if (!a) tt(this, e, t, n); else if (s !== this._tTime || !e || n || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== o || this._lazy) { if (c = s, g = this.timeline, this._repeat) { if (f = a + this._rDelay, this._repeat < -1 && o) return this.totalTime(f * 100 + e, t, n); if (c = Se(s % f), s === i ? (d = this._repeat, c = a) : (p = Se(s / f), d = ~~p, d && d === p ? (c = a, d--) : c > a && (c = a)), m = this._yoyo && d & 1, m && (c = a - c), p = Ge(this._tTime, f), c === r && !n && this._initted && d === p) return this._tTime = s, this; d !== p && this.vars.repeatRefresh && !m && !this._lock && c !== f && this._initted && (this._lock = n = 1, this.render(Se(f * d), !0).invalidate()._lock = 0) } if (!this._initted) { if (Qe(this, o ? e : c, n, t, s)) return this._tTime = 0, this; if (r !== this._time && !(n && this.vars.repeatRefresh && d !== p)) return this; if (a !== this._dur) return this.render(e, t, n) } if (this._rEase) { var _ = c < r; if (_ !== this._inv) { var v = _ ? r : a - r; this._inv = _, this._from && (this.ratio = 1 - this.ratio), this._invRatio = this.ratio, this._invTime = r, this._invRecip = v ? (_ ? -1 : 1) / v : 0, this._invScale = _ ? -this.ratio : 1 - this.ratio, this._invEase = _ ? this._rEase : this._ease } this.ratio = h = this._invRatio + this._invScale * this._invEase((c - this._invTime) * this._invRecip) } else this.ratio = h = this._ease(c / a); if (this._from && (this.ratio = h = 1 - h), this._tTime = s, this._time = c, !this._act && this._ts && (this._act = 1, this._lazy = 0), !r && s && !t && !p && (Mt(this, `onStart`), this._tTime !== s)) return this; for (u = this._pt; u;)u.r(h, u.d), u = u._next; g && g.render(e < 0 ? e : g._dur * g._ease(c / this._dur), t, n) || this._startAt && (this._zTime = e), this._onUpdate && !t && (o && He(this, e, t, n), Mt(this, `onUpdate`)), this._repeat && d !== p && this.vars.onRepeat && !t && this.parent && Mt(this, `onRepeat`), (s === this._tDur || !s) && this._tTime === s && (o && !this._onUpdate && He(this, e, !0, !0), (e || !a) && (s === this._tDur && this._ts > 0 || !s && this._ts < 0) && ze(this, 1), !t && !(o && !r) && (s || r || m) && (Mt(this, s === i ? `onComplete` : `onReverseComplete`, !0), this._prom && !(s < i && this.timeScale() > 0) && this._prom())) } return this }, s.targets = function () { return this._targets }, s.invalidate = function (t) { return (!t || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(t), e.prototype.invalidate.call(this, t) }, s.resetTo = function (e, t, n, r, i) { Kt || qt.wake(), this._ts || this.play(); var a = Math.min(this._dur, (this._dp._time - this._start) * this._ts), o; return this._initted || _n(this, a), o = this._ease(a / this._dur), vn(this, e, t, n, r, o, a, i) ? this.resetTo(e, t, n, r, 1) : (Je(this, 0), this.parent || Le(this._dp, this, `_first`, `_last`, this._dp._sort ? `_start` : 0), this.render(0)) }, s.kill = function (e, t) { if (t === void 0 && (t = `all`), !e && (!t || t === `all`)) return this._lazy = this._pt = 0, this.parent ? Nt(this) : this.scrollTrigger && this.scrollTrigger.kill(!!o), this; if (this.timeline) { var n = this.timeline.totalDuration(); return this.timeline.killTweensOf(e, t, hn && hn.vars.overwrite !== !0)._first || Nt(this), this.parent && n !== this.timeline.totalDuration() && rt(this, this._dur * this.timeline._tDur / n, 0, 1), this } var r = this._targets, i = e ? ht(e) : r, a = this._ptLookup, s = this._pt, c, l, u, d, f, p, m; if ((!t || t === `all`) && Ie(r, i)) return t === `all` && (this._pt = 0), Nt(this); for (c = this._op = this._op || [], t !== `all` && (g(t) && (f = {}, V(t, function (e) { return f[e] = 1 }), t = f), t = yn(r, t)), m = r.length; m--;)if (~i.indexOf(r[m])) for (f in l = a[m], t === `all` ? (c[m] = t, d = l, u = {}) : (u = c[m] = c[m] || {}, d = t), d) p = l && l[f], p && ((!(`kill` in p.d) || p.d.kill(f) === !0) && Re(this, p, `_pt`), delete l[f]), u !== `all` && (u[f] = 1); return this._initted && !this._pt && s && Nt(this), this }, i.to = function (e, t) { return new i(e, t, arguments[2]) }, i.from = function (e, t) { return st(1, arguments) }, i.delayedCall = function (e, t, n, r) { return new i(t, 0, { immediateRender: !1, lazy: !1, overwrite: !1, delay: e, onComplete: t, onReverseComplete: t, onCompleteParams: n, onReverseCompleteParams: n, callbackScope: r }) }, i.fromTo = function (e, t, n) { return st(2, arguments) }, i.set = function (e, t) { return t.duration = 0, t.repeatDelay || (t.repeat = 0), new i(e, t) }, i.killTweensOf = function (e, t, n) { return F.killTweensOf(e, t, n) }, i }(ln); Ae(wn.prototype, { _targets: [], _lazy: 0, _startAt: 0, _op: 0, _onInit: 0 }), V(`staggerTo,staggerFrom,staggerFromTo`, function (e) { wn[e] = function () { var t = new un, n = ft.call(arguments, 0); return n.splice(e === `staggerFromTo` ? 5 : 4, 0, 0), t[e].apply(t, n) } }); var Tn = function (e, t, n) { return e[t] = n }, En = function (e, t, n) { return e[t](n) }, Dn = function (e, t, n, r) { return e[t](r.fp, n) }, On = function (e, t, n) { return e.setAttribute(t, n) }, kn = function (e, t) { return _(e[t]) ? En : y(e[t]) && e.setAttribute ? On : Tn }, An = function (e, t) { return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e6) / 1e6, t) }, jn = function (e, t) { return t.set(t.t, t.p, !!(t.s + t.c * e), t) }, Mn = function (e, t) { var n = t._pt, r = ``; if (!e && t.b) r = t.b; else if (e === 1 && t.e) r = t.e; else { for (; n;)r = n.p + (n.m ? n.m(n.s + n.c * e) : Math.round((n.s + n.c * e) * 1e4) / 1e4) + r, n = n._next; r += t.c } t.set(t.t, t.p, r, t) }, Nn = function (e, t) { for (var n = t._pt; n;)n.r(e, n.d), n = n._next }, Pn = function (e, t, n, r) { for (var i = this._pt, a; i;)a = i._next, i.p === r && i.modifier(e, t, n), i = a }, Fn = function (e) { for (var t = this._pt, n, r; t;)r = t._next, t.p === e && !t.op || t.op === e ? Re(this, t, `_pt`) : t.dep || (n = 1), t = r; return !n }, In = function (e, t, n, r) { r.mSet(e, t, r.m.call(r.tween, n, r.mt), r) }, Ln = function (e) { for (var t = e._pt, n, r, i, a; t;) { for (n = t._next, r = i; r && r.pr > t.pr;)r = r._next; (t._prev = r ? r._prev : a) ? t._prev._next = t : i = t, (t._next = r) ? r._prev = t : a = t, t = n } e._pt = i }, Rn = function () { function e(e, t, n, r, i, a, o, s, c) { this.t = t, this.s = r, this.c = i, this.p = n, this.r = a || An, this.d = o || this, this.set = s || Tn, this.pr = c || 0, this._next = e, e && (e._prev = this) } var t = e.prototype; return t.modifier = function (e, t, n) { this.mSet = this.mSet || this.set, this.set = In, this.m = e, this.mt = n, this.tween = t }, e }(); V(ye + `parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse`, function (e) { return fe[e] = 1 }), ne.TweenMax = ne.TweenLite = wn, ne.TimelineLite = ne.TimelineMax = un, F = new un({ sortChildren: !1, defaults: i, autoRemoveChildren: !0, id: `root`, smoothChildTiming: !0 }), r.stringFilter = Gt; var zn = [], Bn = {}, Vn = [], Hn = 0, Un = 0, Wn = function (e) { return (Bn[e] || Vn).map(function (e) { return e() }) }, Gn = function () { var e = Date.now(), t = []; e - Hn > 2 && (Wn(`matchMediaInit`), zn.forEach(function (e) { var n = e.queries, r = e.conditions, i, a, o, s; for (a in n) i = I.matchMedia(n[a]).matches, i && (o = 1), i !== r[a] && (r[a] = i, s = 1); s && (e.revert(), o && t.push(e)) }), Wn(`matchMediaRevert`), t.forEach(function (e) { return e.onMatch(e, function (t) { return e.add(null, t) }) }), Hn = e, Wn(`matchMedia`)) }, Kn = function () { function e(e, t) { this.selector = t && gt(t), this.data = [], this._r = [], this.isReverted = !1, this.id = Un++, e && this.add(e) } var t = e.prototype; return t.add = function (e, t, n) { _(e) && (n = t, t = e, e = _); var r = this, i = function () { var e = s, i = r.selector, a; return e && e !== r && e.data.push(r), n && (r.selector = gt(n)), s = r, a = t.apply(r, arguments), _(a) && r._r.push(a), s = e, r.selector = i, r.isReverted = !1, a }; return r.last = i, e === _ ? i(r, function (e) { return r.add(null, e) }) : e ? r[e] = i : i }, t.ignore = function (e) { var t = s; s = null, e(this), s = t }, t.getTweens = function () { var t = []; return this.data.forEach(function (n) { return n instanceof e ? t.push.apply(t, n.getTweens()) : n instanceof wn && !(n.parent && n.parent.data === `nested`) && t.push(n) }), t }, t.clear = function () { this._r.length = this.data.length = 0 }, t.kill = function (e, t) { var n = this; if (e ? (function () { for (var t = n.getTweens(), r = n.data.length, i; r--;)i = n.data[r], i.data === `isFlip` && (i.revert(), i.getChildren(!0, !0, !1).forEach(function (e) { return t.splice(t.indexOf(e), 1) })); for (t.map(function (e) { return { g: e._dur || e._delay || e._sat && !e._sat.vars.immediateRender ? e.globalTime(0) : -1 / 0, t: e } }).sort(function (e, t) { return t.g - e.g || -1 / 0 }).forEach(function (t) { return t.t.revert(e) }), r = n.data.length; r--;)i = n.data[r], i instanceof un ? i.data !== `nested` && (i.scrollTrigger && i.scrollTrigger.revert(), i.kill()) : !(i instanceof wn) && i.revert && i.revert(e); n._r.forEach(function (t) { return t(e, n) }), n.isReverted = !0 })() : this.data.forEach(function (e) { return e.kill && e.kill() }), this.clear(), t) for (var r = zn.length; r--;)zn[r].id === this.id && zn.splice(r, 1) }, t.revert = function (e) { this.kill(e || {}) }, e }(), qn = function () { function e(e) { this.contexts = [], this.scope = e, s && s.data.push(this) } var t = e.prototype; return t.add = function (e, t, n) { b(e) || (e = { matches: e }); var r = new Kn(0, n || this.scope), i = r.conditions = {}, a, o, c; for (o in s && !r.selector && (r.selector = s.selector), this.contexts.push(r), t = r.add(`onMatch`, t), r.queries = e, e) o === `all` ? c = 1 : (a = I.matchMedia(e[o]), a && (zn.indexOf(r) < 0 && zn.push(r), (i[o] = a.matches) && (c = 1), a.addListener ? a.addListener(Gn) : a.addEventListener(`change`, Gn))); return c && t(r, function (e) { return r.add(null, e) }), this }, t.revert = function (e) { this.kill(e || {}) }, t.kill = function (e) { this.contexts.forEach(function (t) { return t.kill(e, !0) }) }, e }(), Jn = { registerPlugin: function () { [...arguments].forEach(function (e) { return It(e) }) }, timeline: function (e) { return new un(e) }, getTweensOf: function (e, t) { return F.getTweensOf(e, t) }, getProperty: function (e, t, n, r) { g(e) && (e = ht(e)[0]); var i = be(e || {}).get, a = n ? ke : Oe; return n === `native` && (n = ``), e && (t ? a((ge[t] && ge[t].get || i)(e, t, n, r)) : function (t, n, r) { return a((ge[t] && ge[t].get || i)(e, t, n, r)) }) }, quickSetter: function (e, t, n) { if (e = ht(e), e.length > 1) { var r = e.map(function (e) { return Qn.quickSetter(e, t, n) }), i = r.length; return function (e) { for (var t = i; t--;)r[t](e) } } e = e[0] || {}; var a = ge[t], o = be(e), s = o.harness && (o.harness.aliases || {})[t] || t, c = a ? function (t) { var r = new a; Pt._pt = 0, r.init(e, n ? t + n : t, Pt, 0, [e]), r.render(1, r), Pt._pt && Nn(1, Pt) } : o.set(e, s); return a ? c : function (t) { return c(e, s, n ? t + n : t, o, 1) } }, quickTo: function (e, t, n) { var r, i = Qn.to(e, Ae((r = {}, r[t] = `+=0.1`, r.paused = !0, r.stagger = 0, r), n || {})), a = function (e, n, r) { return i.resetTo(t, e, n, r) }; return a.tween = i, a }, isTweening: function (e) { return F.getTweensOf(e, !0).length > 0 }, defaults: function (e) { return e && e.ease && (e.ease = nn(e.ease, i.ease)), Ne(i, e || {}) }, config: function (e) { return Ne(r, e || {}) }, registerEffect: function (e) { var t = e.name, n = e.effect, r = e.plugins, i = e.defaults, a = e.extendTimeline; (r || ``).split(`,`).forEach(function (e) { return e && !ge[e] && !ne[e] && oe(t + ` effect requires ` + e + ` plugin.`) }), R[t] = function (e, t, r) { return n(ht(e), Ae(t || {}, i), r) }, a && (un.prototype[t] = function (e, n, r) { return this.add(R[t](e, b(n) ? n : (r = n) && {}, this), r) }) }, registerEase: function (e, t) { Yt[e] = nn(t) }, parseEase: function (e, t) { return arguments.length ? nn(e, t) : Yt }, getById: function (e) { return F.getById(e) }, exportRoot: function (e, t) { e === void 0 && (e = {}); var n = new un(e), r, i; for (n.smoothChildTiming = x(e.smoothChildTiming), F.remove(n), n._dp = 0, n._time = n._tTime = F._time, r = F._first; r;)i = r._next, (t || !(!r._dur && r instanceof wn && r.vars.onComplete === r._targets[0])) && Xe(n, r, r._start - r._delay), r = i; return Xe(F, n, 0), n }, context: function (e, t) { return e ? new Kn(e, t) : s }, matchMedia: function (e) { return new qn(e) }, matchMediaRefresh: function () { return zn.forEach(function (e) { var t = e.conditions, n, r; for (r in t) t[r] && (t[r] = !1, n = 1); n && e.revert() }) || Gn() }, addEventListener: function (e, t) { var n = Bn[e] || (Bn[e] = []); ~n.indexOf(t) || n.push(t) }, removeEventListener: function (e, t) { var n = Bn[e], r = n && n.indexOf(t); r >= 0 && n.splice(r, 1) }, utils: { wrap: Et, wrapYoyo: Dt, distribute: vt, random: xt, snap: bt, normalize: wt, getUnit: ut, clamp: dt, splitColor: Bt, toArray: ht, selector: gt, mapRange: kt, pipe: St, unitize: Ct, interpolate: At, shuffle: _t }, install: ie, effects: R, ticker: qt, updateRoot: un.updateRoot, plugins: ge, globalTimeline: F, core: { PropTween: Rn, globals: se, Tween: wn, Timeline: un, Animation: ln, getCache: be, _removeLinkedListItem: Re, reverting: function () { return o }, context: function (e) { return e && s && (s.data.push(e), e._ctx = s), s }, suppressOverwrites: function (e) { return a = e } } }; V(`to,from,fromTo,delayedCall,set,killTweensOf`, function (e) { return Jn[e] = wn[e] }), qt.add(un.updateRoot), Pt = Jn.to({}, { duration: 0 }); var Yn = function (e, t) { for (var n = e._pt; n && n.p !== t && n.op !== t && n.fp !== t;)n = n._next; return n }, Xn = function (e, t) { var n = e._targets, r, i, a; for (r in t) for (i = n.length; i--;)a = e._ptLookup[i][r], (a &&= a.d) && (a._pt && (a = Yn(a, r)), a && a.modifier && a.modifier(t[r], e, n[i], r)) }, Zn = function (e, t) { return { name: e, headless: 1, rawVars: 1, init: function (e, n, r) { r._onInit = function (e) { var r, i; if (g(n) && (r = {}, V(n, function (e) { return r[e] = 1 }), n = r), t) { for (i in r = {}, n) r[i] = t(n[i]); n = r } Xn(e, n) } } } }, Qn = Jn.registerPlugin({ name: `attr`, init: function (e, t, n, r, i) { var a, o, s; for (a in this.tween = n, t) s = e.getAttribute(a) || ``, o = this.add(e, `setAttribute`, (s || 0) + ``, t[a], r, i, 0, 0, a), o.op = a, o.b = s, this._props.push(a) }, render: function (e, t) { for (var n = t._pt; n;)o ? n.set(n.t, n.p, n.b, n) : n.r(e, n.d), n = n._next } }, { name: `endArray`, headless: 1, init: function (e, t) { for (var n = t.length; n--;)this.add(e, n, e[n] || 0, t[n], 0, 0, 0, 0, 0, 1) } }, Zn(`roundProps`, yt), Zn(`modifiers`), Zn(`snap`, bt)) || Jn; wn.version = un.version = Qn.version = `3.15.0`, re = 1, S() && Jt(), Yt.Power0, Yt.Power1, Yt.Power2, Yt.Power3, Yt.Power4, Yt.Linear, Yt.Quad, Yt.Cubic, Yt.Quart, Yt.Quint, Yt.Strong, Yt.Elastic, Yt.Back, Yt.SteppedEase, Yt.Bounce, Yt.Sine, Yt.Expo, Yt.Circ; var $n, er, tr, nr, rr, ir, ar, or = function () { return typeof window < `u` }, sr = {}, cr = 180 / Math.PI, lr = Math.PI / 180, ur = Math.atan2, dr = 1e8, fr = /([A-Z])/g, pr = /(left|right|width|margin|padding|x)/i, mr = /[\s,\(]\S/, hr = { autoAlpha: `opacity,visibility`, scale: `scaleX,scaleY`, alpha: `opacity` }, gr = function (e, t) { return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t) }, _r = function (e, t) { return t.set(t.t, t.p, e === 1 ? t.e : Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t) }, vr = function (e, t) { return t.set(t.t, t.p, e ? Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u : t.b, t) }, yr = function (e, t) { return t.set(t.t, t.p, e === 1 ? t.e : e ? Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u : t.b, t) }, br = function (e, t) { var n = t.s + t.c * e; t.set(t.t, t.p, ~~(n + (n < 0 ? -.5 : .5)) + t.u, t) }, xr = function (e, t) { return t.set(t.t, t.p, e ? t.e : t.b, t) }, Sr = function (e, t) { return t.set(t.t, t.p, e === 1 ? t.e : t.b, t) }, Cr = function (e, t, n) { return e.style[t] = n }, wr = function (e, t, n) { return e.style.setProperty(t, n) }, Tr = function (e, t, n) { return e._gsap[t] = n }, Er = function (e, t, n) { return e._gsap.scaleX = e._gsap.scaleY = n }, Dr = function (e, t, n, r, i) { var a = e._gsap; a.scaleX = a.scaleY = n, a.renderTransform(i, a) }, Or = function (e, t, n, r, i) { var a = e._gsap; a[t] = n, a.renderTransform(i, a) }, kr = `transform`, Ar = kr + `Origin`, jr = function e(t, n) { var r = this, i = this.target, a = i.style, o = i._gsap; if (t in sr && a) { if (this.tfm = this.tfm || {}, t !== `transform`) t = hr[t] || t, ~t.indexOf(`,`) ? t.split(`,`).forEach(function (e) { return r.tfm[e] = Xr(i, e) }) : this.tfm[t] = o.x ? o[t] : Xr(i, t), t === Ar && (this.tfm.zOrigin = o.zOrigin); else return hr.transform.split(`,`).forEach(function (t) { return e.call(r, t, n) }); if (this.props.indexOf(kr) >= 0) return; o.svg && (this.svgo = i.getAttribute(`data-svg-origin`), this.props.push(Ar, n, ``)), t = kr } (a || n) && this.props.push(t, n, a[t]) }, Mr = function (e) { e.translate && (e.removeProperty(`translate`), e.removeProperty(`scale`), e.removeProperty(`rotate`)) }, Nr = function () { var e = this.props, t = this.target, n = t.style, r = t._gsap, i, a; for (i = 0; i < e.length; i += 3)e[i + 1] ? e[i + 1] === 2 ? t[e[i]](e[i + 2]) : t[e[i]] = e[i + 2] : e[i + 2] ? n[e[i]] = e[i + 2] : n.removeProperty(e[i].substr(0, 2) === `--` ? e[i] : e[i].replace(fr, `-$1`).toLowerCase()); if (this.tfm) { for (a in this.tfm) r[a] = this.tfm[a]; r.svg && (r.renderTransform(), t.setAttribute(`data-svg-origin`, this.svgo || ``)), i = ar(), (!i || !i.isStart) && !n[kr] && (Mr(n), r.zOrigin && n[Ar] && (n[Ar] += ` ` + r.zOrigin + `px`, r.zOrigin = 0, r.renderTransform()), r.uncache = 1) } }, Pr = function (e, t) { var n = { target: e, props: [], revert: Nr, save: jr }; return e._gsap || Qn.core.getCache(e), t && e.style && e.nodeType && t.split(`,`).forEach(function (e) { return n.save(e) }), n }, Fr, Ir = function (e, t) { var n = er.createElementNS ? er.createElementNS((t || `http://www.w3.org/1999/xhtml`).replace(/^https/, `http`), e) : er.createElement(e); return n && n.style ? n : er.createElement(e) }, Lr = function e(t, n, r) { var i = getComputedStyle(t); return i[n] || i.getPropertyValue(n.replace(fr, `-$1`).toLowerCase()) || i.getPropertyValue(n) || !r && e(t, zr(n) || n, 1) || `` }, Rr = `O,Moz,ms,Ms,Webkit`.split(`,`), zr = function (e, t, n) { var r = (t || rr).style, i = 5; if (e in r && !n) return e; for (e = e.charAt(0).toUpperCase() + e.substr(1); i-- && !(Rr[i] + e in r);); return i < 0 ? null : (i === 3 ? `ms` : i >= 0 ? Rr[i] : ``) + e }, Br = function () { or() && window.document && ($n = window, er = $n.document, tr = er.documentElement, rr = Ir(`div`) || { style: {} }, Ir(`div`), kr = zr(kr), Ar = kr + `Origin`, rr.style.cssText = `border-width:0;line-height:0;position:absolute;padding:0`, Fr = !!zr(`perspective`), ar = Qn.core.reverting, nr = 1) }, Vr = function (e) { var t = e.ownerSVGElement, n = Ir(`svg`, t && t.getAttribute(`xmlns`) || `http://www.w3.org/2000/svg`), r = e.cloneNode(!0), i; r.style.display = `block`, n.appendChild(r), tr.appendChild(n); try { i = r.getBBox() } catch { } return n.removeChild(r), tr.removeChild(n), i }, Hr = function (e, t) { for (var n = t.length; n--;)if (e.hasAttribute(t[n])) return e.getAttribute(t[n]) }, Ur = function (e) { var t, n; try { t = e.getBBox() } catch { t = Vr(e), n = 1 } return t && (t.width || t.height) || n || (t = Vr(e)), t && !t.width && !t.x && !t.y ? { x: +Hr(e, [`x`, `cx`, `x1`]) || 0, y: +Hr(e, [`y`, `cy`, `y1`]) || 0, width: 0, height: 0 } : t }, Wr = function (e) { return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && Ur(e)) }, Gr = function (e, t) { if (t) { var n = e.style, r; t in sr && t !== Ar && (t = kr), n.removeProperty ? (r = t.substr(0, 2), (r === `ms` || t.substr(0, 6) === `webkit`) && (t = `-` + t), n.removeProperty(r === `--` ? t : t.replace(fr, `-$1`).toLowerCase())) : n.removeAttribute(t) } }, Kr = function (e, t, n, r, i, a) { var o = new Rn(e._pt, t, n, 0, 1, a ? Sr : xr); return e._pt = o, o.b = r, o.e = i, e._props.push(n), o }, qr = { deg: 1, rad: 1, turn: 1 }, Jr = { grid: 1, flex: 1 }, Yr = function e(t, n, r, i) { var a = parseFloat(r) || 0, o = (r + ``).trim().substr((a + ``).length) || `px`, s = rr.style, c = pr.test(n), l = t.tagName.toLowerCase() === `svg`, u = (l ? `client` : `offset`) + (c ? `Width` : `Height`), d = 100, f = i === `px`, p = i === `%`, m, h, g, _; if (i === o || !a || qr[i] || qr[o]) return a; if (o !== `px` && !f && (a = e(t, n, r, `px`)), _ = t.getCTM && Wr(t), (p || o === `%`) && (sr[n] || ~n.indexOf(`adius`))) return m = _ ? t.getBBox()[c ? `width` : `height`] : t[u], xe(p ? a / m * d : a / 100 * m); if (s[c ? `width` : `height`] = d + (f ? o : i), h = i !== `rem` && ~n.indexOf(`adius`) || i === `em` && t.appendChild && !l ? t : t.parentNode, _ && (h = (t.ownerSVGElement || {}).parentNode), (!h || h === er || !h.appendChild) && (h = er.body), g = h._gsap, g && p && g.width && c && g.time === qt.time && !g.uncache) return xe(a / g.width * d); if (p && (n === `height` || n === `width`)) { var v = t.style[n]; t.style[n] = d + i, m = t[u], v ? t.style[n] = v : Gr(t, n) } else (p || o === `%`) && !Jr[Lr(h, `display`)] && (s.position = Lr(t, `position`)), h === t && (s.position = `static`), h.appendChild(rr), m = rr[u], h.removeChild(rr), s.position = `absolute`; return c && p && (g = be(h), g.time = qt.time, g.width = h[u]), xe(f ? m * a / d : m && a ? d / m * a : 0) }, Xr = function (e, t, n, r) { var i; return nr || Br(), t in hr && t !== `transform` && (t = hr[t], ~t.indexOf(`,`) && (t = t.split(`,`)[0])), sr[t] && t !== `transform` ? (i = ci(e, r), i = t === `transformOrigin` ? i.svg ? i.origin : li(Lr(e, Ar)) + ` ` + i.zOrigin + `px` : i[t]) : (i = e.style[t], (!i || i === `auto` || r || ~(i + ``).indexOf(`calc(`)) && (i = ti[t] && ti[t](e, t, n) || Lr(e, t) || B(e, t) || +(t === `opacity`))), n && !~(i + ``).trim().indexOf(` `) ? Yr(e, t, i, n) + n : i }, Zr = function (e, t, n, i) { if (!n || n === `none`) { var a = zr(t, e, 1), o = a && Lr(e, a, 1); o && o !== n ? (t = a, n = o) : t === `borderColor` && (n = Lr(e, `borderTopColor`)) } var s = new Rn(this._pt, e.style, t, 0, 1, Mn), c = 0, l = 0, u, d, f, p, m, h, g, _, v, y, b, x; if (s.b = n, s.e = i, n += ``, i += ``, i.substring(0, 6) === `var(--` && (i = Lr(e, i.substring(4, i.indexOf(`)`)))), i === `auto` && (h = e.style[t], e.style[t] = i, i = Lr(e, t) || i, h ? e.style[t] = h : Gr(e, t)), u = [n, i], Gt(u), n = u[0], i = u[1], f = n.match(A) || [], x = i.match(A) || [], x.length) { for (; d = A.exec(i);)g = d[0], v = i.substring(c, d.index), m ? m = (m + 1) % 5 : (v.substr(-5) === `rgba(` || v.substr(-5) === `hsla(`) && (m = 1), g !== (h = f[l++] || ``) && (p = parseFloat(h) || 0, b = h.substr((p + ``).length), g.charAt(1) === `=` && (g = Ce(p, g) + b), _ = parseFloat(g), y = g.substr((_ + ``).length), c = A.lastIndex - y.length, y || (y = y || r.units[t] || b, c === i.length && (i += y, s.e += y)), b !== y && (p = Yr(e, t, h, y) || 0), s._pt = { _next: s._pt, p: v || l === 1 ? v : `,`, s: p, c: _ - p, m: m && m < 4 || t === `zIndex` ? Math.round : 0 }); s.c = c < i.length ? i.substring(c, i.length) : `` } else s.r = t === `display` && i === `none` ? Sr : xr; return M.test(i) && (s.e = 0), this._pt = s, s }, Qr = { top: `0%`, bottom: `100%`, left: `0%`, right: `100%`, center: `50%` }, $r = function (e) { var t = e.split(` `), n = t[0], r = t[1] || `50%`; return (n === `top` || n === `bottom` || r === `left` || r === `right`) && (e = n, n = r, r = e), t[0] = Qr[n] || n, t[1] = Qr[r] || r, t.join(` `) }, ei = function (e, t) { if (t.tween && t.tween._time === t.tween._dur) { var n = t.t, r = n.style, i = t.u, a = n._gsap, o, s, c; if (i === `all` || i === !0) r.cssText = ``, s = 1; else for (i = i.split(`,`), c = i.length; --c > -1;)o = i[c], sr[o] && (s = 1, o = o === `transformOrigin` ? Ar : kr), Gr(n, o); s && (Gr(n, kr), a && (a.svg && n.removeAttribute(`transform`), r.scale = r.rotate = r.translate = `none`, ci(n, 1), a.uncache = 1, Mr(r))) } }, ti = { clearProps: function (e, t, n, r, i) { if (i.data !== `isFromStart`) { var a = e._pt = new Rn(e._pt, t, n, 0, 0, ei); return a.u = r, a.pr = -10, a.tween = i, e._props.push(n), 1 } } }, ni = [1, 0, 0, 1, 0, 0], ri = {}, ii = function (e) { return e === `matrix(1, 0, 0, 1, 0, 0)` || e === `none` || !e }, ai = function (e) { var t = Lr(e, kr); return ii(t) ? ni : t.substr(7).match(k).map(xe) }, oi = function (e, t) { var n = e._gsap || be(e), r = e.style, i = ai(e), a, o, s, c; return n.svg && e.getAttribute(`transform`) ? (s = e.transform.baseVal.consolidate().matrix, i = [s.a, s.b, s.c, s.d, s.e, s.f], i.join(`,`) === `1,0,0,1,0,0` ? ni : i) : (i === ni && !e.offsetParent && e !== tr && !n.svg && (s = r.display, r.display = `block`, a = e.parentNode, (!a || !e.offsetParent && !e.getBoundingClientRect().width) && (c = 1, o = e.nextElementSibling, tr.appendChild(e)), i = ai(e), s ? r.display = s : Gr(e, `display`), c && (o ? a.insertBefore(e, o) : a ? a.appendChild(e) : tr.removeChild(e))), t && i.length > 6 ? [i[0], i[1], i[4], i[5], i[12], i[13]] : i) }, si = function (e, t, n, r, i, a) { var o = e._gsap, s = i || oi(e, !0), c = o.xOrigin || 0, l = o.yOrigin || 0, u = o.xOffset || 0, d = o.yOffset || 0, f = s[0], p = s[1], m = s[2], h = s[3], g = s[4], _ = s[5], v = t.split(` `), y = parseFloat(v[0]) || 0, b = parseFloat(v[1]) || 0, x, S, C, w; n ? s !== ni && (S = f * h - p * m) && (C = h / S * y + b * (-m / S) + (m * _ - h * g) / S, w = y * (-p / S) + f / S * b - (f * _ - p * g) / S, y = C, b = w) : (x = Ur(e), y = x.x + (~v[0].indexOf(`%`) ? y / 100 * x.width : y), b = x.y + (~(v[1] || v[0]).indexOf(`%`) ? b / 100 * x.height : b)), r || r !== !1 && o.smooth ? (g = y - c, _ = b - l, o.xOffset = u + (g * f + _ * m) - g, o.yOffset = d + (g * p + _ * h) - _) : o.xOffset = o.yOffset = 0, o.xOrigin = y, o.yOrigin = b, o.smooth = !!r, o.origin = t, o.originIsAbsolute = !!n, e.style[Ar] = `0px 0px`, a && (Kr(a, o, `xOrigin`, c, y), Kr(a, o, `yOrigin`, l, b), Kr(a, o, `xOffset`, u, o.xOffset), Kr(a, o, `yOffset`, d, o.yOffset)), e.setAttribute(`data-svg-origin`, y + ` ` + b) }, ci = function (e, t) { var n = e._gsap || new cn(e); if (`x` in n && !t && !n.uncache) return n; var i = e.style, a = n.scaleX < 0, o = `px`, s = `deg`, c = getComputedStyle(e), l = Lr(e, Ar) || `0`, u = d = f = h = g = _ = v = y = b = 0, d, f, p = m = 1, m, h, g, _, v, y, b, x, S, C, w, T, E, D, O, k, A, j, M, N, P, F, I, ee, te, ne, L, re; return n.svg = !!(e.getCTM && Wr(e)), c.translate && ((c.translate !== `none` || c.scale !== `none` || c.rotate !== `none`) && (i[kr] = (c.translate === `none` ? `` : `translate3d(` + (c.translate + ` 0 0`).split(` `).slice(0, 3).join(`, `) + `) `) + (c.rotate === `none` ? `` : `rotate(` + c.rotate + `) `) + (c.scale === `none` ? `` : `scale(` + c.scale.split(` `).join(`,`) + `) `) + (c[kr] === `none` ? `` : c[kr])), i.scale = i.rotate = i.translate = `none`), C = oi(e, n.svg), n.svg && (n.uncache ? (P = e.getBBox(), l = n.xOrigin - P.x + `px ` + (n.yOrigin - P.y) + `px`, N = ``) : N = !t && e.getAttribute(`data-svg-origin`), si(e, N || l, !!N || n.originIsAbsolute, n.smooth !== !1, C)), x = n.xOrigin || 0, S = n.yOrigin || 0, C !== ni && (D = C[0], O = C[1], k = C[2], A = C[3], u = j = C[4], d = M = C[5], C.length === 6 ? (p = Math.sqrt(D * D + O * O), m = Math.sqrt(A * A + k * k), h = D || O ? ur(O, D) * cr : 0, v = k || A ? ur(k, A) * cr + h : 0, v && (m *= Math.abs(Math.cos(v * lr))), n.svg && (u -= x - (x * D + S * k), d -= S - (x * O + S * A))) : (re = C[6], ne = C[7], I = C[8], ee = C[9], te = C[10], L = C[11], u = C[12], d = C[13], f = C[14], w = ur(re, te), g = w * cr, w && (T = Math.cos(-w), E = Math.sin(-w), N = j * T + I * E, P = M * T + ee * E, F = re * T + te * E, I = j * -E + I * T, ee = M * -E + ee * T, te = re * -E + te * T, L = ne * -E + L * T, j = N, M = P, re = F), w = ur(-k, te), _ = w * cr, w && (T = Math.cos(-w), E = Math.sin(-w), N = D * T - I * E, P = O * T - ee * E, F = k * T - te * E, L = A * E + L * T, D = N, O = P, k = F), w = ur(O, D), h = w * cr, w && (T = Math.cos(w), E = Math.sin(w), N = D * T + O * E, P = j * T + M * E, O = O * T - D * E, M = M * T - j * E, D = N, j = P), g && Math.abs(g) + Math.abs(h) > 359.9 && (g = h = 0, _ = 180 - _), p = xe(Math.sqrt(D * D + O * O + k * k)), m = xe(Math.sqrt(M * M + re * re)), w = ur(j, M), v = Math.abs(w) > 2e-4 ? w * cr : 0, b = L ? 1 / (L < 0 ? -L : L) : 0), n.svg && (N = e.getAttribute(`transform`), n.forceCSS = e.setAttribute(`transform`, ``) || !ii(Lr(e, kr)), N && e.setAttribute(`transform`, N))), Math.abs(v) > 90 && Math.abs(v) < 270 && (a ? (p *= -1, v += h <= 0 ? 180 : -180, h += h <= 0 ? 180 : -180) : (m *= -1, v += v <= 0 ? 180 : -180)), t ||= n.uncache, n.x = u - ((n.xPercent = u && (!t && n.xPercent || (Math.round(e.offsetWidth / 2) === Math.round(-u) ? -50 : 0))) ? e.offsetWidth * n.xPercent / 100 : 0) + o, n.y = d - ((n.yPercent = d && (!t && n.yPercent || (Math.round(e.offsetHeight / 2) === Math.round(-d) ? -50 : 0))) ? e.offsetHeight * n.yPercent / 100 : 0) + o, n.z = f + o, n.scaleX = xe(p), n.scaleY = xe(m), n.rotation = xe(h) + s, n.rotationX = xe(g) + s, n.rotationY = xe(_) + s, n.skewX = v + s, n.skewY = y + s, n.transformPerspective = b + o, (n.zOrigin = parseFloat(l.split(` `)[2]) || !t && n.zOrigin || 0) && (i[Ar] = li(l)), n.xOffset = n.yOffset = 0, n.force3D = r.force3D, n.renderTransform = n.svg ? gi : Fr ? hi : di, n.uncache = 0, n }, li = function (e) { return (e = e.split(` `))[0] + ` ` + e[1] }, ui = function (e, t, n) { var r = ut(t); return xe(parseFloat(t) + parseFloat(Yr(e, `x`, n + `px`, r))) + r }, di = function (e, t) { t.z = `0px`, t.rotationY = t.rotationX = `0deg`, t.force3D = 0, hi(e, t) }, fi = `0deg`, pi = `0px`, mi = `) `, hi = function (e, t) { var n = t || this, r = n.xPercent, i = n.yPercent, a = n.x, o = n.y, s = n.z, c = n.rotation, l = n.rotationY, u = n.rotationX, d = n.skewX, f = n.skewY, p = n.scaleX, m = n.scaleY, h = n.transformPerspective, g = n.force3D, _ = n.target, v = n.zOrigin, y = ``, b = g === `auto` && e && e !== 1 || g === !0; if (v && (u !== fi || l !== fi)) { var x = parseFloat(l) * lr, S = Math.sin(x), C = Math.cos(x), w; x = parseFloat(u) * lr, w = Math.cos(x), a = ui(_, a, S * w * -v), o = ui(_, o, -Math.sin(x) * -v), s = ui(_, s, C * w * -v + v) } h !== pi && (y += `perspective(` + h + mi), (r || i) && (y += `translate(` + r + `%, ` + i + `%) `), (b || a !== pi || o !== pi || s !== pi) && (y += s !== pi || b ? `translate3d(` + a + `, ` + o + `, ` + s + `) ` : `translate(` + a + `, ` + o + mi), c !== fi && (y += `rotate(` + c + mi), l !== fi && (y += `rotateY(` + l + mi), u !== fi && (y += `rotateX(` + u + mi), (d !== fi || f !== fi) && (y += `skew(` + d + `, ` + f + mi), (p !== 1 || m !== 1) && (y += `scale(` + p + `, ` + m + mi), _.style[kr] = y || `translate(0, 0)` }, gi = function (e, t) { var n = t || this, r = n.xPercent, i = n.yPercent, a = n.x, o = n.y, s = n.rotation, c = n.skewX, l = n.skewY, u = n.scaleX, d = n.scaleY, f = n.target, p = n.xOrigin, m = n.yOrigin, h = n.xOffset, g = n.yOffset, _ = n.forceCSS, v = parseFloat(a), y = parseFloat(o), b, x, S, C, w; s = parseFloat(s), c = parseFloat(c), l = parseFloat(l), l && (l = parseFloat(l), c += l, s += l), s || c ? (s *= lr, c *= lr, b = Math.cos(s) * u, x = Math.sin(s) * u, S = Math.sin(s - c) * -d, C = Math.cos(s - c) * d, c && (l *= lr, w = Math.tan(c - l), w = Math.sqrt(1 + w * w), S *= w, C *= w, l && (w = Math.tan(l), w = Math.sqrt(1 + w * w), b *= w, x *= w)), b = xe(b), x = xe(x), S = xe(S), C = xe(C)) : (b = u, C = d, x = S = 0), (v && !~(a + ``).indexOf(`px`) || y && !~(o + ``).indexOf(`px`)) && (v = Yr(f, `x`, a, `px`), y = Yr(f, `y`, o, `px`)), (p || m || h || g) && (v = xe(v + p - (p * b + m * S) + h), y = xe(y + m - (p * x + m * C) + g)), (r || i) && (w = f.getBBox(), v = xe(v + r / 100 * w.width), y = xe(y + i / 100 * w.height)), w = `matrix(` + b + `,` + x + `,` + S + `,` + C + `,` + v + `,` + y + `)`, f.setAttribute(`transform`, w), _ && (f.style[kr] = w) }, _i = function (e, t, n, r, i) { var a = 360, o = g(i), s = parseFloat(i) * (o && ~i.indexOf(`rad`) ? cr : 1) - r, c = r + s + `deg`, l, u; return o && (l = i.split(`_`)[1], l === `short` && (s %= a, s !== s % (a / 2) && (s += s < 0 ? a : -a)), l === `cw` && s < 0 ? s = (s + a * dr) % a - ~~(s / a) * a : l === `ccw` && s > 0 && (s = (s - a * dr) % a - ~~(s / a) * a)), e._pt = u = new Rn(e._pt, t, n, r, s, _r), u.e = c, u.u = `deg`, e._props.push(n), u }, vi = function (e, t) { for (var n in t) e[n] = t[n]; return e }, yi = function (e, t, n) { var r = vi({}, n._gsap), i = `perspective,force3D,transformOrigin,svgOrigin`, a = n.style, o, s, c, l, u, d, f, p; for (s in r.svg ? (c = n.getAttribute(`transform`), n.setAttribute(`transform`, ``), a[kr] = t, o = ci(n, 1), Gr(n, kr), n.setAttribute(`transform`, c)) : (c = getComputedStyle(n)[kr], a[kr] = t, o = ci(n, 1), a[kr] = c), sr) c = r[s], l = o[s], c !== l && i.indexOf(s) < 0 && (f = ut(c), p = ut(l), u = f === p ? parseFloat(c) : Yr(n, s, c, p), d = parseFloat(l), e._pt = new Rn(e._pt, o, s, u, d - u, gr), e._pt.u = p || 0, e._props.push(s)); vi(o, r) }; V(`padding,margin,Width,Radius`, function (e, t) { var n = `Top`, r = `Right`, i = `Bottom`, a = `Left`, o = (t < 3 ? [n, r, i, a] : [n + a, n + r, i + r, i + a]).map(function (n) { return t < 2 ? e + n : `border` + n + e }); ti[t > 1 ? `border` + e : e] = function (e, t, n, r, i) { var a, s; if (arguments.length < 4) return a = o.map(function (t) { return Xr(e, t, n) }), s = a.join(` `), s.split(a[0]).length === 5 ? a[0] : s; a = (r + ``).split(` `), s = {}, o.forEach(function (e, t) { return s[e] = a[t] = a[t] || a[(t - 1) / 2 | 0] }), e.init(t, s, i) } }); var bi = { name: `css`, register: Br, targetTest: function (e) { return e.style && e.nodeType }, init: function (e, t, n, i, a) { var o = this._props, s = e.style, c = n.vars.startAt, l, u, d, f, p, m, h, _, v, y, b, x, S, C, w, T, E; for (h in nr || Br(), this.styles = this.styles || Pr(e), T = this.styles.props, this.tween = n, t) if (h !== `autoRound` && (u = t[h], !(ge[h] && mn(h, t, n, i, e, a)))) { if (p = typeof u, m = ti[h], p === `function` && (u = u.call(n, i, e, a), p = typeof u), p === `string` && ~u.indexOf(`random(`) && (u = Ot(u)), m) m(this, e, h, u, n) && (w = 1); else if (h.substr(0, 2) === `--`) l = (getComputedStyle(e).getPropertyValue(h) + ``).trim(), u += ``, Ut.lastIndex = 0, Ut.test(l) || (_ = ut(l), v = ut(u), v ? _ !== v && (l = Yr(e, h, l, v) + v) : _ && (u += _)), this.add(s, `setProperty`, l, u, i, a, 0, 0, h), o.push(h), T.push(h, 0, s[h]); else if (p !== `undefined`) { if (c && h in c ? (l = typeof c[h] == `function` ? c[h].call(n, i, e, a) : c[h], g(l) && ~l.indexOf(`random(`) && (l = Ot(l)), ut(l + ``) || l === `auto` || (l += r.units[h] || ut(Xr(e, h)) || ``), (l + ``).charAt(1) === `=` && (l = Xr(e, h))) : l = Xr(e, h), f = parseFloat(l), y = p === `string` && u.charAt(1) === `=` && u.substr(0, 2), y && (u = u.substr(2)), d = parseFloat(u), h in hr && (h === `autoAlpha` && (f === 1 && Xr(e, `visibility`) === `hidden` && d && (f = 0), T.push(`visibility`, 0, s.visibility), Kr(this, s, `visibility`, f ? `inherit` : `hidden`, d ? `inherit` : `hidden`, !d)), h !== `scale` && h !== `transform` && (h = hr[h], ~h.indexOf(`,`) && (h = h.split(`,`)[0]))), b = h in sr, b) { if (this.styles.save(h), E = u, p === `string` && u.substring(0, 6) === `var(--`) { if (u = Lr(e, u.substring(4, u.indexOf(`)`))), u.substring(0, 5) === `calc(`) { var D = e.style.perspective; e.style.perspective = u, u = Lr(e, `perspective`), D ? e.style.perspective = D : Gr(e, `perspective`) } d = parseFloat(u) } if (x || (S = e._gsap, S.renderTransform && !t.parseTransform || ci(e, t.parseTransform), C = t.smoothOrigin !== !1 && S.smooth, x = this._pt = new Rn(this._pt, s, kr, 0, 1, S.renderTransform, S, 0, -1), x.dep = 1), h === `scale`) this._pt = new Rn(this._pt, S, `scaleY`, S.scaleY, (y ? Ce(S.scaleY, y + d) : d) - S.scaleY || 0, gr), this._pt.u = 0, o.push(`scaleY`, h), h += `X`; else if (h === `transformOrigin`) { T.push(Ar, 0, s[Ar]), u = $r(u), S.svg ? si(e, u, 0, C, 0, this) : (v = parseFloat(u.split(` `)[2]) || 0, v !== S.zOrigin && Kr(this, S, `zOrigin`, S.zOrigin, v), Kr(this, s, h, li(l), li(u))); continue } else if (h === `svgOrigin`) { si(e, u, 1, C, 0, this); continue } else if (h in ri) { _i(this, S, h, f, y ? Ce(f, y + u) : u); continue } else if (h === `smoothOrigin`) { Kr(this, S, `smooth`, S.smooth, u); continue } else if (h === `force3D`) { S[h] = u; continue } else if (h === `transform`) { yi(this, u, e); continue } } else h in s || (h = zr(h) || h); if (b || (d || d === 0) && (f || f === 0) && !mr.test(u) && h in s) _ = (l + ``).substr((f + ``).length), d ||= 0, v = ut(u) || (h in r.units ? r.units[h] : _), _ !== v && (f = Yr(e, h, l, v)), this._pt = new Rn(this._pt, b ? S : s, h, f, (y ? Ce(f, y + d) : d) - f, !b && (v === `px` || h === `zIndex`) && t.autoRound !== !1 ? br : gr), this._pt.u = v || 0, b && E !== u ? (this._pt.b = l, this._pt.e = E, this._pt.r = yr) : _ !== v && v !== `%` && (this._pt.b = l, this._pt.r = vr); else if (h in s) Zr.call(this, e, h, l, y ? y + u : u); else if (h in e) this.add(e, h, l || e[h], y ? y + u : u, i, a); else if (h !== `parseTransform`) { ae(h, u); continue } b || (h in s ? T.push(h, 0, s[h]) : typeof e[h] == `function` ? T.push(h, 2, e[h]()) : T.push(h, 1, l || e[h])), o.push(h) } } w && Ln(this) }, render: function (e, t) { if (t.tween._time || !ar()) for (var n = t._pt; n;)n.r(e, n.d), n = n._next; else t.styles.revert() }, get: Xr, aliases: hr, getSetter: function (e, t, n) { var r = hr[t]; return r && r.indexOf(`,`) < 0 && (t = r), t in sr && t !== Ar && (e._gsap.x || Xr(e, `x`)) ? n && ir === n ? t === `scale` ? Er : Tr : (ir = n || {}) && (t === `scale` ? Dr : Or) : e.style && !y(e.style[t]) ? Cr : ~t.indexOf(`-`) ? wr : kn(e, t) }, core: { _removeProperty: Gr, _getMatrix: oi } }; Qn.utils.checkPrefix = zr, Qn.core.getStyleSaver = Pr, (function (e, t, n, i) { var a = V(e + `,` + t + `,` + n, function (e) { sr[e] = 1 }); V(t, function (e) { r.units[e] = `deg`, ri[e] = 1 }), hr[a[13]] = e + `,` + t, V(i, function (e) { var t = e.split(`:`); hr[t[1]] = a[t[0]] }) })(`x,y,z,scale,scaleX,scaleY,xPercent,yPercent`, `rotation,rotationX,rotationY,skewX,skewY`, `transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective`, `0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY`), V(`x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective`, function (e) { r.units[e] = `px` }), Qn.registerPlugin(bi); var xi = Qn.registerPlugin(bi) || Qn; xi.core.Tween; var Si = `attached`, Ci = 1e3, wi = 1001, Ti = 1002, Ei = 1003, Di = 1004, Oi = 1005, ki = 1006, Ai = 1007, ji = 1008, Mi = 1009, Ni = 1010, Pi = 1011, Fi = 1012, Ii = 1013, Li = 1014, Ri = 1015, zi = 1016, Bi = 1017, Vi = 1018, Hi = 1020, Ui = 35902, Wi = 35899, Gi = 1021, Ki = 1022, qi = 1023, Ji = 1026, Yi = 1027, Xi = 1028, Zi = 1029, Qi = 1030, $i = 1031, ea = 1033, ta = 33776, na = 33777, ra = 33778, ia = 33779, aa = 35840, oa = 35841, sa = 35842, ca = 35843, la = 36196, ua = 37492, da = 37496, fa = 37488, pa = 37489, ma = 37490, ha = 37491, ga = 37808, _a = 37809, va = 37810, ya = 37811, ba = 37812, xa = 37813, Sa = 37814, Ca = 37815, wa = 37816, Ta = 37817, Ea = 37818, Da = 37819, Oa = 37820, ka = 37821, Aa = 36492, ja = 36494, Ma = 36495, Na = 36283, Pa = 36284, Fa = 36285, Ia = 36286, La = 2201, Ra = 2202, za = 2300, Ba = 2301, Va = 2302, Ha = 2303, Ua = 2400, Wa = 2401, Ga = 2402, Ka = 2500, qa = 2501, Ja = 3200, Ya = `srgb`, Xa = `srgb-linear`, Za = `linear`, Qa = `srgb`, $a = 7680, eo = 35044, to = 2e3; function no(e) { for (let t = e.length - 1; t >= 0; --t)if (e[t] >= 65535) return !0; return !1 } function ro(e) { return ArrayBuffer.isView(e) && !(e instanceof DataView) } function io(e) { return document.createElementNS(`http://www.w3.org/1999/xhtml`, e) } function ao() { let e = io(`canvas`); return e.style.display = `block`, e } var oo = {}, so = null; function co(...e) { let t = `THREE.` + e.shift(); so ? so(`log`, t, ...e) : console.log(t, ...e) } function lo(e) { let t = e[0]; if (typeof t == `string` && t.startsWith(`TSL:`)) { let t = e[1]; t && t.isStackTrace ? e[0] += ` ` + t.getLocation() : e[1] = `Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.` } return e } function H(...e) { e = lo(e); let t = `THREE.` + e.shift(); if (so) so(`warn`, t, ...e); else { let n = e[0]; n && n.isStackTrace ? console.warn(n.getError(t)) : console.warn(t, ...e) } } function U(...e) { e = lo(e); let t = `THREE.` + e.shift(); if (so) so(`error`, t, ...e); else { let n = e[0]; n && n.isStackTrace ? console.error(n.getError(t)) : console.error(t, ...e) } } function uo(...e) { let t = e.join(` `); t in oo || (oo[t] = !0, H(...e)) } function fo(e, t, n) { return new Promise(function (r, i) { function a() { switch (e.clientWaitSync(t, e.SYNC_FLUSH_COMMANDS_BIT, 0)) { case e.WAIT_FAILED: i(); break; case e.TIMEOUT_EXPIRED: setTimeout(a, n); break; default: r() } } setTimeout(a, n) }) } var po = { 0: 1, 2: 6, 4: 7, 3: 5, 1: 0, 6: 2, 7: 4, 5: 3 }, mo = class { addEventListener(e, t) { this._listeners === void 0 && (this._listeners = {}); let n = this._listeners; n[e] === void 0 && (n[e] = []), n[e].indexOf(t) === -1 && n[e].push(t) } hasEventListener(e, t) { let n = this._listeners; return n === void 0 ? !1 : n[e] !== void 0 && n[e].indexOf(t) !== -1 } removeEventListener(e, t) { let n = this._listeners; if (n === void 0) return; let r = n[e]; if (r !== void 0) { let e = r.indexOf(t); e !== -1 && r.splice(e, 1) } } dispatchEvent(e) { let t = this._listeners; if (t === void 0) return; let n = t[e.type]; if (n !== void 0) { e.target = this; let t = n.slice(0); for (let n = 0, r = t.length; n < r; n++)t[n].call(this, e); e.target = null } } }, ho = `00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`), go = 1234567, _o = Math.PI / 180, vo = 180 / Math.PI; function yo() { let e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0, r = Math.random() * 4294967295 | 0; return (ho[e & 255] + ho[e >> 8 & 255] + ho[e >> 16 & 255] + ho[e >> 24 & 255] + `-` + ho[t & 255] + ho[t >> 8 & 255] + `-` + ho[t >> 16 & 15 | 64] + ho[t >> 24 & 255] + `-` + ho[n & 63 | 128] + ho[n >> 8 & 255] + `-` + ho[n >> 16 & 255] + ho[n >> 24 & 255] + ho[r & 255] + ho[r >> 8 & 255] + ho[r >> 16 & 255] + ho[r >> 24 & 255]).toLowerCase() } function W(e, t, n) { return Math.max(t, Math.min(n, e)) } function bo(e, t) { return (e % t + t) % t } function xo(e, t, n, r, i) { return r + (e - t) * (i - r) / (n - t) } function So(e, t, n) { return e === t ? 0 : (n - e) / (t - e) } function Co(e, t, n) { return (1 - n) * e + n * t } function wo(e, t, n, r) { return Co(e, t, 1 - Math.exp(-n * r)) } function To(e, t = 1) { return t - Math.abs(bo(e, t * 2) - t) } function Eo(e, t, n) { return e <= t ? 0 : e >= n ? 1 : (e = (e - t) / (n - t), e * e * (3 - 2 * e)) } function Do(e, t, n) { return e <= t ? 0 : e >= n ? 1 : (e = (e - t) / (n - t), e * e * e * (e * (e * 6 - 15) + 10)) } function Oo(e, t) { return e + Math.floor(Math.random() * (t - e + 1)) } function ko(e, t) { return e + Math.random() * (t - e) } function Ao(e) { return e * (.5 - Math.random()) } function jo(e) { e !== void 0 && (go = e); let t = go += 1831565813; return t = Math.imul(t ^ t >>> 15, t | 1), t ^= t + Math.imul(t ^ t >>> 7, t | 61), ((t ^ t >>> 14) >>> 0) / 4294967296 } function Mo(e) { return e * _o } function No(e) { return e * vo } function Po(e) { return (e & e - 1) == 0 && e !== 0 } function Fo(e) { return 2 ** Math.ceil(Math.log(e) / Math.LN2) } function Io(e) { return 2 ** Math.floor(Math.log(e) / Math.LN2) } function Lo(e, t, n, r, i) { let a = Math.cos, o = Math.sin, s = a(n / 2), c = o(n / 2), l = a((t + r) / 2), u = o((t + r) / 2), d = a((t - r) / 2), f = o((t - r) / 2), p = a((r - t) / 2), m = o((r - t) / 2); switch (i) { case `XYX`: e.set(s * u, c * d, c * f, s * l); break; case `YZY`: e.set(c * f, s * u, c * d, s * l); break; case `ZXZ`: e.set(c * d, c * f, s * u, s * l); break; case `XZX`: e.set(s * u, c * m, c * p, s * l); break; case `YXY`: e.set(c * p, s * u, c * m, s * l); break; case `ZYZ`: e.set(c * m, c * p, s * u, s * l); break; default: H(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: ` + i) } } function Ro(e, t) { switch (t.constructor) { case Float32Array: return e; case Uint32Array: return e / 4294967295; case Uint16Array: return e / 65535; case Uint8Array: return e / 255; case Int32Array: return Math.max(e / 2147483647, -1); case Int16Array: return Math.max(e / 32767, -1); case Int8Array: return Math.max(e / 127, -1); default: throw Error(`Invalid component type.`) } } function zo(e, t) { switch (t.constructor) { case Float32Array: return e; case Uint32Array: return Math.round(e * 4294967295); case Uint16Array: return Math.round(e * 65535); case Uint8Array: return Math.round(e * 255); case Int32Array: return Math.round(e * 2147483647); case Int16Array: return Math.round(e * 32767); case Int8Array: return Math.round(e * 127); default: throw Error(`Invalid component type.`) } } var Bo = { DEG2RAD: _o, RAD2DEG: vo, generateUUID: yo, clamp: W, euclideanModulo: bo, mapLinear: xo, inverseLerp: So, lerp: Co, damp: wo, pingpong: To, smoothstep: Eo, smootherstep: Do, randInt: Oo, randFloat: ko, randFloatSpread: Ao, seededRandom: jo, degToRad: Mo, radToDeg: No, isPowerOfTwo: Po, ceilPowerOfTwo: Fo, floorPowerOfTwo: Io, setQuaternionFromProperEuler: Lo, normalize: zo, denormalize: Ro }, G = class e { static { e.prototype.isVector2 = !0 } constructor(e = 0, t = 0) { this.x = e, this.y = t } get width() { return this.x } set width(e) { this.x = e } get height() { return this.y } set height(e) { this.y = e } set(e, t) { return this.x = e, this.y = t, this } setScalar(e) { return this.x = e, this.y = e, this } setX(e) { return this.x = e, this } setY(e) { return this.y = e, this } setComponent(e, t) { switch (e) { case 0: this.x = t; break; case 1: this.y = t; break; default: throw Error(`index is out of range: ` + e) }return this } getComponent(e) { switch (e) { case 0: return this.x; case 1: return this.y; default: throw Error(`index is out of range: ` + e) } } clone() { return new this.constructor(this.x, this.y) } copy(e) { return this.x = e.x, this.y = e.y, this } add(e) { return this.x += e.x, this.y += e.y, this } addScalar(e) { return this.x += e, this.y += e, this } addVectors(e, t) { return this.x = e.x + t.x, this.y = e.y + t.y, this } addScaledVector(e, t) { return this.x += e.x * t, this.y += e.y * t, this } sub(e) { return this.x -= e.x, this.y -= e.y, this } subScalar(e) { return this.x -= e, this.y -= e, this } subVectors(e, t) { return this.x = e.x - t.x, this.y = e.y - t.y, this } multiply(e) { return this.x *= e.x, this.y *= e.y, this } multiplyScalar(e) { return this.x *= e, this.y *= e, this } divide(e) { return this.x /= e.x, this.y /= e.y, this } divideScalar(e) { return this.multiplyScalar(1 / e) } applyMatrix3(e) { let t = this.x, n = this.y, r = e.elements; return this.x = r[0] * t + r[3] * n + r[6], this.y = r[1] * t + r[4] * n + r[7], this } min(e) { return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this } max(e) { return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this } clamp(e, t) { return this.x = W(this.x, e.x, t.x), this.y = W(this.y, e.y, t.y), this } clampScalar(e, t) { return this.x = W(this.x, e, t), this.y = W(this.y, e, t), this } clampLength(e, t) { let n = this.length(); return this.divideScalar(n || 1).multiplyScalar(W(n, e, t)) } floor() { return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this } ceil() { return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this } round() { return this.x = Math.round(this.x), this.y = Math.round(this.y), this } roundToZero() { return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this } negate() { return this.x = -this.x, this.y = -this.y, this } dot(e) { return this.x * e.x + this.y * e.y } cross(e) { return this.x * e.y - this.y * e.x } lengthSq() { return this.x * this.x + this.y * this.y } length() { return Math.sqrt(this.x * this.x + this.y * this.y) } manhattanLength() { return Math.abs(this.x) + Math.abs(this.y) } normalize() { return this.divideScalar(this.length() || 1) } angle() { return Math.atan2(-this.y, -this.x) + Math.PI } angleTo(e) { let t = Math.sqrt(this.lengthSq() * e.lengthSq()); if (t === 0) return Math.PI / 2; let n = this.dot(e) / t; return Math.acos(W(n, -1, 1)) } distanceTo(e) { return Math.sqrt(this.distanceToSquared(e)) } distanceToSquared(e) { let t = this.x - e.x, n = this.y - e.y; return t * t + n * n } manhattanDistanceTo(e) { return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) } setLength(e) { return this.normalize().multiplyScalar(e) } lerp(e, t) { return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this } lerpVectors(e, t, n) { return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this } equals(e) { return e.x === this.x && e.y === this.y } fromArray(e, t = 0) { return this.x = e[t], this.y = e[t + 1], this } toArray(e = [], t = 0) { return e[t] = this.x, e[t + 1] = this.y, e } fromBufferAttribute(e, t) { return this.x = e.getX(t), this.y = e.getY(t), this } rotateAround(e, t) { let n = Math.cos(t), r = Math.sin(t), i = this.x - e.x, a = this.y - e.y; return this.x = i * n - a * r + e.x, this.y = i * r + a * n + e.y, this } random() { return this.x = Math.random(), this.y = Math.random(), this } *[Symbol.iterator]() { yield this.x, yield this.y } }, Vo = class { constructor(e = 0, t = 0, n = 0, r = 1) { this.isQuaternion = !0, this._x = e, this._y = t, this._z = n, this._w = r } static slerpFlat(e, t, n, r, i, a, o) { let s = n[r + 0], c = n[r + 1], l = n[r + 2], u = n[r + 3], d = i[a + 0], f = i[a + 1], p = i[a + 2], m = i[a + 3]; if (u !== m || s !== d || c !== f || l !== p) { let e = s * d + c * f + l * p + u * m; e < 0 && (d = -d, f = -f, p = -p, m = -m, e = -e); let t = 1 - o; if (e < .9995) { let n = Math.acos(e), r = Math.sin(n); t = Math.sin(t * n) / r, o = Math.sin(o * n) / r, s = s * t + d * o, c = c * t + f * o, l = l * t + p * o, u = u * t + m * o } else { s = s * t + d * o, c = c * t + f * o, l = l * t + p * o, u = u * t + m * o; let e = 1 / Math.sqrt(s * s + c * c + l * l + u * u); s *= e, c *= e, l *= e, u *= e } } e[t] = s, e[t + 1] = c, e[t + 2] = l, e[t + 3] = u } static multiplyQuaternionsFlat(e, t, n, r, i, a) { let o = n[r], s = n[r + 1], c = n[r + 2], l = n[r + 3], u = i[a], d = i[a + 1], f = i[a + 2], p = i[a + 3]; return e[t] = o * p + l * u + s * f - c * d, e[t + 1] = s * p + l * d + c * u - o * f, e[t + 2] = c * p + l * f + o * d - s * u, e[t + 3] = l * p - o * u - s * d - c * f, e } get x() { return this._x } set x(e) { this._x = e, this._onChangeCallback() } get y() { return this._y } set y(e) { this._y = e, this._onChangeCallback() } get z() { return this._z } set z(e) { this._z = e, this._onChangeCallback() } get w() { return this._w } set w(e) { this._w = e, this._onChangeCallback() } set(e, t, n, r) { return this._x = e, this._y = t, this._z = n, this._w = r, this._onChangeCallback(), this } clone() { return new this.constructor(this._x, this._y, this._z, this._w) } copy(e) { return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this } setFromEuler(e, t = !0) { let n = e._x, r = e._y, i = e._z, a = e._order, o = Math.cos, s = Math.sin, c = o(n / 2), l = o(r / 2), u = o(i / 2), d = s(n / 2), f = s(r / 2), p = s(i / 2); switch (a) { case `XYZ`: this._x = d * l * u + c * f * p, this._y = c * f * u - d * l * p, this._z = c * l * p + d * f * u, this._w = c * l * u - d * f * p; break; case `YXZ`: this._x = d * l * u + c * f * p, this._y = c * f * u - d * l * p, this._z = c * l * p - d * f * u, this._w = c * l * u + d * f * p; break; case `ZXY`: this._x = d * l * u - c * f * p, this._y = c * f * u + d * l * p, this._z = c * l * p + d * f * u, this._w = c * l * u - d * f * p; break; case `ZYX`: this._x = d * l * u - c * f * p, this._y = c * f * u + d * l * p, this._z = c * l * p - d * f * u, this._w = c * l * u + d * f * p; break; case `YZX`: this._x = d * l * u + c * f * p, this._y = c * f * u + d * l * p, this._z = c * l * p - d * f * u, this._w = c * l * u - d * f * p; break; case `XZY`: this._x = d * l * u - c * f * p, this._y = c * f * u - d * l * p, this._z = c * l * p + d * f * u, this._w = c * l * u + d * f * p; break; default: H(`Quaternion: .setFromEuler() encountered an unknown order: ` + a) }return t === !0 && this._onChangeCallback(), this } setFromAxisAngle(e, t) { let n = t / 2, r = Math.sin(n); return this._x = e.x * r, this._y = e.y * r, this._z = e.z * r, this._w = Math.cos(n), this._onChangeCallback(), this } setFromRotationMatrix(e) { let t = e.elements, n = t[0], r = t[4], i = t[8], a = t[1], o = t[5], s = t[9], c = t[2], l = t[6], u = t[10], d = n + o + u; if (d > 0) { let e = .5 / Math.sqrt(d + 1); this._w = .25 / e, this._x = (l - s) * e, this._y = (i - c) * e, this._z = (a - r) * e } else if (n > o && n > u) { let e = 2 * Math.sqrt(1 + n - o - u); this._w = (l - s) / e, this._x = .25 * e, this._y = (r + a) / e, this._z = (i + c) / e } else if (o > u) { let e = 2 * Math.sqrt(1 + o - n - u); this._w = (i - c) / e, this._x = (r + a) / e, this._y = .25 * e, this._z = (s + l) / e } else { let e = 2 * Math.sqrt(1 + u - n - o); this._w = (a - r) / e, this._x = (i + c) / e, this._y = (s + l) / e, this._z = .25 * e } return this._onChangeCallback(), this } setFromUnitVectors(e, t) { let n = e.dot(t) + 1; return n < 1e-8 ? (n = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = n)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = n), this.normalize() } angleTo(e) { return 2 * Math.acos(Math.abs(W(this.dot(e), -1, 1))) } rotateTowards(e, t) { let n = this.angleTo(e); if (n === 0) return this; let r = Math.min(1, t / n); return this.slerp(e, r), this } identity() { return this.set(0, 0, 0, 1) } invert() { return this.conjugate() } conjugate() { return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this } dot(e) { return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w } lengthSq() { return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w } length() { return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w) } normalize() { let e = this.length(); return e === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x *= e, this._y *= e, this._z *= e, this._w *= e), this._onChangeCallback(), this } multiply(e) { return this.multiplyQuaternions(this, e) } premultiply(e) { return this.multiplyQuaternions(e, this) } multiplyQuaternions(e, t) { let n = e._x, r = e._y, i = e._z, a = e._w, o = t._x, s = t._y, c = t._z, l = t._w; return this._x = n * l + a * o + r * c - i * s, this._y = r * l + a * s + i * o - n * c, this._z = i * l + a * c + n * s - r * o, this._w = a * l - n * o - r * s - i * c, this._onChangeCallback(), this } slerp(e, t) { let n = e._x, r = e._y, i = e._z, a = e._w, o = this.dot(e); o < 0 && (n = -n, r = -r, i = -i, a = -a, o = -o); let s = 1 - t; if (o < .9995) { let e = Math.acos(o), c = Math.sin(e); s = Math.sin(s * e) / c, t = Math.sin(t * e) / c, this._x = this._x * s + n * t, this._y = this._y * s + r * t, this._z = this._z * s + i * t, this._w = this._w * s + a * t, this._onChangeCallback() } else this._x = this._x * s + n * t, this._y = this._y * s + r * t, this._z = this._z * s + i * t, this._w = this._w * s + a * t, this.normalize(); return this } slerpQuaternions(e, t, n) { return this.copy(e).slerp(t, n) } random() { let e = 2 * Math.PI * Math.random(), t = 2 * Math.PI * Math.random(), n = Math.random(), r = Math.sqrt(1 - n), i = Math.sqrt(n); return this.set(r * Math.sin(e), r * Math.cos(e), i * Math.sin(t), i * Math.cos(t)) } equals(e) { return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w } fromArray(e, t = 0) { return this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this._onChangeCallback(), this } toArray(e = [], t = 0) { return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e } fromBufferAttribute(e, t) { return this._x = e.getX(t), this._y = e.getY(t), this._z = e.getZ(t), this._w = e.getW(t), this._onChangeCallback(), this } toJSON() { return this.toArray() } _onChange(e) { return this._onChangeCallback = e, this } _onChangeCallback() { } *[Symbol.iterator]() { yield this._x, yield this._y, yield this._z, yield this._w } }, K = class e { static { e.prototype.isVector3 = !0 } constructor(e = 0, t = 0, n = 0) { this.x = e, this.y = t, this.z = n } set(e, t, n) { return n === void 0 && (n = this.z), this.x = e, this.y = t, this.z = n, this } setScalar(e) { return this.x = e, this.y = e, this.z = e, this } setX(e) { return this.x = e, this } setY(e) { return this.y = e, this } setZ(e) { return this.z = e, this } setComponent(e, t) { switch (e) { case 0: this.x = t; break; case 1: this.y = t; break; case 2: this.z = t; break; default: throw Error(`index is out of range: ` + e) }return this } getComponent(e) { switch (e) { case 0: return this.x; case 1: return this.y; case 2: return this.z; default: throw Error(`index is out of range: ` + e) } } clone() { return new this.constructor(this.x, this.y, this.z) } copy(e) { return this.x = e.x, this.y = e.y, this.z = e.z, this } add(e) { return this.x += e.x, this.y += e.y, this.z += e.z, this } addScalar(e) { return this.x += e, this.y += e, this.z += e, this } addVectors(e, t) { return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this } addScaledVector(e, t) { return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this } sub(e) { return this.x -= e.x, this.y -= e.y, this.z -= e.z, this } subScalar(e) { return this.x -= e, this.y -= e, this.z -= e, this } subVectors(e, t) { return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this } multiply(e) { return this.x *= e.x, this.y *= e.y, this.z *= e.z, this } multiplyScalar(e) { return this.x *= e, this.y *= e, this.z *= e, this } multiplyVectors(e, t) { return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this } applyEuler(e) { return this.applyQuaternion(Uo.setFromEuler(e)) } applyAxisAngle(e, t) { return this.applyQuaternion(Uo.setFromAxisAngle(e, t)) } applyMatrix3(e) { let t = this.x, n = this.y, r = this.z, i = e.elements; return this.x = i[0] * t + i[3] * n + i[6] * r, this.y = i[1] * t + i[4] * n + i[7] * r, this.z = i[2] * t + i[5] * n + i[8] * r, this } applyNormalMatrix(e) { return this.applyMatrix3(e).normalize() } applyMatrix4(e) { let t = this.x, n = this.y, r = this.z, i = e.elements, a = 1 / (i[3] * t + i[7] * n + i[11] * r + i[15]); return this.x = (i[0] * t + i[4] * n + i[8] * r + i[12]) * a, this.y = (i[1] * t + i[5] * n + i[9] * r + i[13]) * a, this.z = (i[2] * t + i[6] * n + i[10] * r + i[14]) * a, this } applyQuaternion(e) { let t = this.x, n = this.y, r = this.z, i = e.x, a = e.y, o = e.z, s = e.w, c = 2 * (a * r - o * n), l = 2 * (o * t - i * r), u = 2 * (i * n - a * t); return this.x = t + s * c + a * u - o * l, this.y = n + s * l + o * c - i * u, this.z = r + s * u + i * l - a * c, this } project(e) { return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix) } unproject(e) { return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld) } transformDirection(e) { let t = this.x, n = this.y, r = this.z, i = e.elements; return this.x = i[0] * t + i[4] * n + i[8] * r, this.y = i[1] * t + i[5] * n + i[9] * r, this.z = i[2] * t + i[6] * n + i[10] * r, this.normalize() } divide(e) { return this.x /= e.x, this.y /= e.y, this.z /= e.z, this } divideScalar(e) { return this.multiplyScalar(1 / e) } min(e) { return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this } max(e) { return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this } clamp(e, t) { return this.x = W(this.x, e.x, t.x), this.y = W(this.y, e.y, t.y), this.z = W(this.z, e.z, t.z), this } clampScalar(e, t) { return this.x = W(this.x, e, t), this.y = W(this.y, e, t), this.z = W(this.z, e, t), this } clampLength(e, t) { let n = this.length(); return this.divideScalar(n || 1).multiplyScalar(W(n, e, t)) } floor() { return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this } ceil() { return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this } round() { return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this } roundToZero() { return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this } negate() { return this.x = -this.x, this.y = -this.y, this.z = -this.z, this } dot(e) { return this.x * e.x + this.y * e.y + this.z * e.z } lengthSq() { return this.x * this.x + this.y * this.y + this.z * this.z } length() { return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z) } manhattanLength() { return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) } normalize() { return this.divideScalar(this.length() || 1) } setLength(e) { return this.normalize().multiplyScalar(e) } lerp(e, t) { return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this } lerpVectors(e, t, n) { return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this } cross(e) { return this.crossVectors(this, e) } crossVectors(e, t) { let n = e.x, r = e.y, i = e.z, a = t.x, o = t.y, s = t.z; return this.x = r * s - i * o, this.y = i * a - n * s, this.z = n * o - r * a, this } projectOnVector(e) { let t = e.lengthSq(); if (t === 0) return this.set(0, 0, 0); let n = e.dot(this) / t; return this.copy(e).multiplyScalar(n) } projectOnPlane(e) { return Ho.copy(this).projectOnVector(e), this.sub(Ho) } reflect(e) { return this.sub(Ho.copy(e).multiplyScalar(2 * this.dot(e))) } angleTo(e) { let t = Math.sqrt(this.lengthSq() * e.lengthSq()); if (t === 0) return Math.PI / 2; let n = this.dot(e) / t; return Math.acos(W(n, -1, 1)) } distanceTo(e) { return Math.sqrt(this.distanceToSquared(e)) } distanceToSquared(e) { let t = this.x - e.x, n = this.y - e.y, r = this.z - e.z; return t * t + n * n + r * r } manhattanDistanceTo(e) { return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z) } setFromSpherical(e) { return this.setFromSphericalCoords(e.radius, e.phi, e.theta) } setFromSphericalCoords(e, t, n) { let r = Math.sin(t) * e; return this.x = r * Math.sin(n), this.y = Math.cos(t) * e, this.z = r * Math.cos(n), this } setFromCylindrical(e) { return this.setFromCylindricalCoords(e.radius, e.theta, e.y) } setFromCylindricalCoords(e, t, n) { return this.x = e * Math.sin(t), this.y = n, this.z = e * Math.cos(t), this } setFromMatrixPosition(e) { let t = e.elements; return this.x = t[12], this.y = t[13], this.z = t[14], this } setFromMatrixScale(e) { let t = this.setFromMatrixColumn(e, 0).length(), n = this.setFromMatrixColumn(e, 1).length(), r = this.setFromMatrixColumn(e, 2).length(); return this.x = t, this.y = n, this.z = r, this } setFromMatrixColumn(e, t) { return this.fromArray(e.elements, t * 4) } setFromMatrix3Column(e, t) { return this.fromArray(e.elements, t * 3) } setFromEuler(e) { return this.x = e._x, this.y = e._y, this.z = e._z, this } setFromColor(e) { return this.x = e.r, this.y = e.g, this.z = e.b, this } equals(e) { return e.x === this.x && e.y === this.y && e.z === this.z } fromArray(e, t = 0) { return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this } toArray(e = [], t = 0) { return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e } fromBufferAttribute(e, t) { return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this } random() { return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this } randomDirection() { let e = Math.random() * Math.PI * 2, t = Math.random() * 2 - 1, n = Math.sqrt(1 - t * t); return this.x = n * Math.cos(e), this.y = t, this.z = n * Math.sin(e), this } *[Symbol.iterator]() { yield this.x, yield this.y, yield this.z } }, Ho = new K, Uo = new Vo, q = class e { static { e.prototype.isMatrix3 = !0 } constructor(e, t, n, r, i, a, o, s, c) { this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1], e !== void 0 && this.set(e, t, n, r, i, a, o, s, c) } set(e, t, n, r, i, a, o, s, c) { let l = this.elements; return l[0] = e, l[1] = r, l[2] = o, l[3] = t, l[4] = i, l[5] = s, l[6] = n, l[7] = a, l[8] = c, this } identity() { return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this } copy(e) { let t = this.elements, n = e.elements; return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], this } extractBasis(e, t, n) { return e.setFromMatrix3Column(this, 0), t.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this } setFromMatrix4(e) { let t = e.elements; return this.set(t[0], t[4], t[8], t[1], t[5], t[9], t[2], t[6], t[10]), this } multiply(e) { return this.multiplyMatrices(this, e) } premultiply(e) { return this.multiplyMatrices(e, this) } multiplyMatrices(e, t) { let n = e.elements, r = t.elements, i = this.elements, a = n[0], o = n[3], s = n[6], c = n[1], l = n[4], u = n[7], d = n[2], f = n[5], p = n[8], m = r[0], h = r[3], g = r[6], _ = r[1], v = r[4], y = r[7], b = r[2], x = r[5], S = r[8]; return i[0] = a * m + o * _ + s * b, i[3] = a * h + o * v + s * x, i[6] = a * g + o * y + s * S, i[1] = c * m + l * _ + u * b, i[4] = c * h + l * v + u * x, i[7] = c * g + l * y + u * S, i[2] = d * m + f * _ + p * b, i[5] = d * h + f * v + p * x, i[8] = d * g + f * y + p * S, this } multiplyScalar(e) { let t = this.elements; return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this } determinant() { let e = this.elements, t = e[0], n = e[1], r = e[2], i = e[3], a = e[4], o = e[5], s = e[6], c = e[7], l = e[8]; return t * a * l - t * o * c - n * i * l + n * o * s + r * i * c - r * a * s } invert() { let e = this.elements, t = e[0], n = e[1], r = e[2], i = e[3], a = e[4], o = e[5], s = e[6], c = e[7], l = e[8], u = l * a - o * c, d = o * s - l * i, f = c * i - a * s, p = t * u + n * d + r * f; if (p === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0); let m = 1 / p; return e[0] = u * m, e[1] = (r * c - l * n) * m, e[2] = (o * n - r * a) * m, e[3] = d * m, e[4] = (l * t - r * s) * m, e[5] = (r * i - o * t) * m, e[6] = f * m, e[7] = (n * s - c * t) * m, e[8] = (a * t - n * i) * m, this } transpose() { let e, t = this.elements; return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this } getNormalMatrix(e) { return this.setFromMatrix4(e).invert().transpose() } transposeIntoArray(e) { let t = this.elements; return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this } setUvTransform(e, t, n, r, i, a, o) { let s = Math.cos(i), c = Math.sin(i); return this.set(n * s, n * c, -n * (s * a + c * o) + a + e, -r * c, r * s, -r * (-c * a + s * o) + o + t, 0, 0, 1), this } scale(e, t) { return this.premultiply(Wo.makeScale(e, t)), this } rotate(e) { return this.premultiply(Wo.makeRotation(-e)), this } translate(e, t) { return this.premultiply(Wo.makeTranslation(e, t)), this } makeTranslation(e, t) { return e.isVector2 ? this.set(1, 0, e.x, 0, 1, e.y, 0, 0, 1) : this.set(1, 0, e, 0, 1, t, 0, 0, 1), this } makeRotation(e) { let t = Math.cos(e), n = Math.sin(e); return this.set(t, -n, 0, n, t, 0, 0, 0, 1), this } makeScale(e, t) { return this.set(e, 0, 0, 0, t, 0, 0, 0, 1), this } equals(e) { let t = this.elements, n = e.elements; for (let e = 0; e < 9; e++)if (t[e] !== n[e]) return !1; return !0 } fromArray(e, t = 0) { for (let n = 0; n < 9; n++)this.elements[n] = e[n + t]; return this } toArray(e = [], t = 0) { let n = this.elements; return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e } clone() { return new this.constructor().fromArray(this.elements) } }, Wo = new q, Go = new q().set(.4123908, .3575843, .1804808, .212639, .7151687, .0721923, .0193308, .1191948, .9505322), Ko = new q().set(3.2409699, -1.5373832, -.4986108, -.9692436, 1.8759675, .0415551, .0556301, -.203977, 1.0569715); function qo() { let e = { enabled: !0, workingColorSpace: Xa, spaces: {}, convert: function (e, t, n) { return this.enabled === !1 || t === n || !t || !n ? e : (this.spaces[t].transfer === `srgb` && (e.r = Jo(e.r), e.g = Jo(e.g), e.b = Jo(e.b)), this.spaces[t].primaries !== this.spaces[n].primaries && (e.applyMatrix3(this.spaces[t].toXYZ), e.applyMatrix3(this.spaces[n].fromXYZ)), this.spaces[n].transfer === `srgb` && (e.r = Yo(e.r), e.g = Yo(e.g), e.b = Yo(e.b)), e) }, workingToColorSpace: function (e, t) { return this.convert(e, this.workingColorSpace, t) }, colorSpaceToWorking: function (e, t) { return this.convert(e, t, this.workingColorSpace) }, getPrimaries: function (e) { return this.spaces[e].primaries }, getTransfer: function (e) { return e === `` ? Za : this.spaces[e].transfer }, getToneMappingMode: function (e) { return this.spaces[e].outputColorSpaceConfig.toneMappingMode || `standard` }, getLuminanceCoefficients: function (e, t = this.workingColorSpace) { return e.fromArray(this.spaces[t].luminanceCoefficients) }, define: function (e) { Object.assign(this.spaces, e) }, _getMatrix: function (e, t, n) { return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ) }, _getDrawingBufferColorSpace: function (e) { return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace }, _getUnpackColorSpace: function (e = this.workingColorSpace) { return this.spaces[e].workingColorSpaceConfig.unpackColorSpace }, fromWorkingColorSpace: function (t, n) { return uo(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`), e.workingToColorSpace(t, n) }, toWorkingColorSpace: function (t, n) { return uo(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`), e.colorSpaceToWorking(t, n) } }, t = [.64, .33, .3, .6, .15, .06], n = [.2126, .7152, .0722], r = [.3127, .329]; return e.define({ [Xa]: { primaries: t, whitePoint: r, transfer: Za, toXYZ: Go, fromXYZ: Ko, luminanceCoefficients: n, workingColorSpaceConfig: { unpackColorSpace: Ya }, outputColorSpaceConfig: { drawingBufferColorSpace: Ya } }, [Ya]: { primaries: t, whitePoint: r, transfer: Qa, toXYZ: Go, fromXYZ: Ko, luminanceCoefficients: n, outputColorSpaceConfig: { drawingBufferColorSpace: Ya } } }), e } var J = qo(); function Jo(e) { return e < .04045 ? e * .0773993808 : (e * .9478672986 + .0521327014) ** 2.4 } function Yo(e) { return e < .0031308 ? e * 12.92 : 1.055 * e ** .41666 - .055 } var Xo, Zo = class { static getDataURL(e, t = `image/png`) { if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > `u`) return e.src; let n; if (e instanceof HTMLCanvasElement) n = e; else { Xo === void 0 && (Xo = io(`canvas`)), Xo.width = e.width, Xo.height = e.height; let t = Xo.getContext(`2d`); e instanceof ImageData ? t.putImageData(e, 0, 0) : t.drawImage(e, 0, 0, e.width, e.height), n = Xo } return n.toDataURL(t) } static sRGBToLinear(e) { if (typeof HTMLImageElement < `u` && e instanceof HTMLImageElement || typeof HTMLCanvasElement < `u` && e instanceof HTMLCanvasElement || typeof ImageBitmap < `u` && e instanceof ImageBitmap) { let t = io(`canvas`); t.width = e.width, t.height = e.height; let n = t.getContext(`2d`); n.drawImage(e, 0, 0, e.width, e.height); let r = n.getImageData(0, 0, e.width, e.height), i = r.data; for (let e = 0; e < i.length; e++)i[e] = Jo(i[e] / 255) * 255; return n.putImageData(r, 0, 0), t } else if (e.data) { let t = e.data.slice(0); for (let e = 0; e < t.length; e++)t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[e] = Math.floor(Jo(t[e] / 255) * 255) : t[e] = Jo(t[e]); return { data: t, width: e.width, height: e.height } } else return H(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`), e } }, Qo = 0, $o = class { constructor(e = null) { this.isSource = !0, Object.defineProperty(this, `id`, { value: Qo++ }), this.uuid = yo(), this.data = e, this.dataReady = !0, this.version = 0 } getSize(e) { let t = this.data; return typeof HTMLVideoElement < `u` && t instanceof HTMLVideoElement ? e.set(t.videoWidth, t.videoHeight, 0) : typeof VideoFrame < `u` && t instanceof VideoFrame ? e.set(t.displayWidth, t.displayHeight, 0) : t === null ? e.set(0, 0, 0) : e.set(t.width, t.height, t.depth || 0), e } set needsUpdate(e) { e === !0 && this.version++ } toJSON(e) { let t = e === void 0 || typeof e == `string`; if (!t && e.images[this.uuid] !== void 0) return e.images[this.uuid]; let n = { uuid: this.uuid, url: `` }, r = this.data; if (r !== null) { let e; if (Array.isArray(r)) { e = []; for (let t = 0, n = r.length; t < n; t++)r[t].isDataTexture ? e.push(es(r[t].image)) : e.push(es(r[t])) } else e = es(r); n.url = e } return t || (e.images[this.uuid] = n), n } }; function es(e) { return typeof HTMLImageElement < `u` && e instanceof HTMLImageElement || typeof HTMLCanvasElement < `u` && e instanceof HTMLCanvasElement || typeof ImageBitmap < `u` && e instanceof ImageBitmap ? Zo.getDataURL(e) : e.data ? { data: Array.from(e.data), width: e.width, height: e.height, type: e.data.constructor.name } : (H(`Texture: Unable to serialize Texture.`), {}) } var ts = 0, ns = new K, rs = class e extends mo { constructor(t = e.DEFAULT_IMAGE, n = e.DEFAULT_MAPPING, r = wi, i = wi, a = ki, o = ji, s = qi, c = Mi, l = e.DEFAULT_ANISOTROPY, u = ``) { super(), this.isTexture = !0, Object.defineProperty(this, `id`, { value: ts++ }), this.uuid = yo(), this.name = ``, this.source = new $o(t), this.mipmaps = [], this.mapping = n, this.channel = 0, this.wrapS = r, this.wrapT = i, this.magFilter = a, this.minFilter = o, this.anisotropy = l, this.format = s, this.internalFormat = null, this.type = c, this.offset = new G(0, 0), this.repeat = new G(1, 1), this.center = new G(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new q, this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = u, this.userData = {}, this.updateRanges = [], this.version = 0, this.onUpdate = null, this.renderTarget = null, this.isRenderTargetTexture = !1, this.isArrayTexture = !!(t && t.depth && t.depth > 1), this.pmremVersion = 0, this.normalized = !1 } get width() { return this.source.getSize(ns).x } get height() { return this.source.getSize(ns).y } get depth() { return this.source.getSize(ns).z } get image() { return this.source.data } set image(e) { this.source.data = e } updateMatrix() { this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y) } addUpdateRange(e, t) { this.updateRanges.push({ start: e, count: t }) } clearUpdateRanges() { this.updateRanges.length = 0 } clone() { return new this.constructor().copy(this) } copy(e) { return this.name = e.name, this.source = e.source, this.mipmaps = e.mipmaps.slice(0), this.mapping = e.mapping, this.channel = e.channel, this.wrapS = e.wrapS, this.wrapT = e.wrapT, this.magFilter = e.magFilter, this.minFilter = e.minFilter, this.anisotropy = e.anisotropy, this.format = e.format, this.internalFormat = e.internalFormat, this.type = e.type, this.normalized = e.normalized, this.offset.copy(e.offset), this.repeat.copy(e.repeat), this.center.copy(e.center), this.rotation = e.rotation, this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrix.copy(e.matrix), this.generateMipmaps = e.generateMipmaps, this.premultiplyAlpha = e.premultiplyAlpha, this.flipY = e.flipY, this.unpackAlignment = e.unpackAlignment, this.colorSpace = e.colorSpace, this.renderTarget = e.renderTarget, this.isRenderTargetTexture = e.isRenderTargetTexture, this.isArrayTexture = e.isArrayTexture, this.userData = JSON.parse(JSON.stringify(e.userData)), this.needsUpdate = !0, this } setValues(e) { for (let t in e) { let n = e[t]; if (n === void 0) { H(`Texture.setValues(): parameter '${t}' has value of undefined.`); continue } let r = this[t]; if (r === void 0) { H(`Texture.setValues(): property '${t}' does not exist.`); continue } r && n && r.isVector2 && n.isVector2 || r && n && r.isVector3 && n.isVector3 || r && n && r.isMatrix3 && n.isMatrix3 ? r.copy(n) : this[t] = n } } toJSON(e) { let t = e === void 0 || typeof e == `string`; if (!t && e.textures[this.uuid] !== void 0) return e.textures[this.uuid]; let n = { metadata: { version: 4.7, type: `Texture`, generator: `Texture.toJSON` }, uuid: this.uuid, name: this.name, image: this.source.toJSON(e).uuid, mapping: this.mapping, channel: this.channel, repeat: [this.repeat.x, this.repeat.y], offset: [this.offset.x, this.offset.y], center: [this.center.x, this.center.y], rotation: this.rotation, wrap: [this.wrapS, this.wrapT], format: this.format, internalFormat: this.internalFormat, type: this.type, normalized: this.normalized, colorSpace: this.colorSpace, minFilter: this.minFilter, magFilter: this.magFilter, anisotropy: this.anisotropy, flipY: this.flipY, generateMipmaps: this.generateMipmaps, premultiplyAlpha: this.premultiplyAlpha, unpackAlignment: this.unpackAlignment }; return Object.keys(this.userData).length > 0 && (n.userData = this.userData), t || (e.textures[this.uuid] = n), n } dispose() { this.dispatchEvent({ type: `dispose` }) } transformUv(e) { if (this.mapping !== 300) return e; if (e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1) switch (this.wrapS) { case Ci: e.x -= Math.floor(e.x); break; case wi: e.x = e.x < 0 ? 0 : 1; break; case Ti: Math.abs(Math.floor(e.x) % 2) === 1 ? e.x = Math.ceil(e.x) - e.x : e.x -= Math.floor(e.x); break }if (e.y < 0 || e.y > 1) switch (this.wrapT) { case Ci: e.y -= Math.floor(e.y); break; case wi: e.y = e.y < 0 ? 0 : 1; break; case Ti: Math.abs(Math.floor(e.y) % 2) === 1 ? e.y = Math.ceil(e.y) - e.y : e.y -= Math.floor(e.y); break }return this.flipY && (e.y = 1 - e.y), e } set needsUpdate(e) { e === !0 && (this.version++, this.source.needsUpdate = !0) } set needsPMREMUpdate(e) { e === !0 && this.pmremVersion++ } }; rs.DEFAULT_IMAGE = null, rs.DEFAULT_MAPPING = 300, rs.DEFAULT_ANISOTROPY = 1; var is = class e { static { e.prototype.isVector4 = !0 } constructor(e = 0, t = 0, n = 0, r = 1) { this.x = e, this.y = t, this.z = n, this.w = r } get width() { return this.z } set width(e) { this.z = e } get height() { return this.w } set height(e) { this.w = e } set(e, t, n, r) { return this.x = e, this.y = t, this.z = n, this.w = r, this } setScalar(e) { return this.x = e, this.y = e, this.z = e, this.w = e, this } setX(e) { return this.x = e, this } setY(e) { return this.y = e, this } setZ(e) { return this.z = e, this } setW(e) { return this.w = e, this } setComponent(e, t) { switch (e) { case 0: this.x = t; break; case 1: this.y = t; break; case 2: this.z = t; break; case 3: this.w = t; break; default: throw Error(`index is out of range: ` + e) }return this } getComponent(e) { switch (e) { case 0: return this.x; case 1: return this.y; case 2: return this.z; case 3: return this.w; default: throw Error(`index is out of range: ` + e) } } clone() { return new this.constructor(this.x, this.y, this.z, this.w) } copy(e) { return this.x = e.x, this.y = e.y, this.z = e.z, this.w = e.w === void 0 ? 1 : e.w, this } add(e) { return this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this } addScalar(e) { return this.x += e, this.y += e, this.z += e, this.w += e, this } addVectors(e, t) { return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this } addScaledVector(e, t) { return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this.w += e.w * t, this } sub(e) { return this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this } subScalar(e) { return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this } subVectors(e, t) { return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this } multiply(e) { return this.x *= e.x, this.y *= e.y, this.z *= e.z, this.w *= e.w, this } multiplyScalar(e) { return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this } applyMatrix4(e) { let t = this.x, n = this.y, r = this.z, i = this.w, a = e.elements; return this.x = a[0] * t + a[4] * n + a[8] * r + a[12] * i, this.y = a[1] * t + a[5] * n + a[9] * r + a[13] * i, this.z = a[2] * t + a[6] * n + a[10] * r + a[14] * i, this.w = a[3] * t + a[7] * n + a[11] * r + a[15] * i, this } divide(e) { return this.x /= e.x, this.y /= e.y, this.z /= e.z, this.w /= e.w, this } divideScalar(e) { return this.multiplyScalar(1 / e) } setAxisAngleFromQuaternion(e) { this.w = 2 * Math.acos(e.w); let t = Math.sqrt(1 - e.w * e.w); return t < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this } setAxisAngleFromRotationMatrix(e) { let t, n, r, i, a = .01, o = .1, s = e.elements, c = s[0], l = s[4], u = s[8], d = s[1], f = s[5], p = s[9], m = s[2], h = s[6], g = s[10]; if (Math.abs(l - d) < a && Math.abs(u - m) < a && Math.abs(p - h) < a) { if (Math.abs(l + d) < o && Math.abs(u + m) < o && Math.abs(p + h) < o && Math.abs(c + f + g - 3) < o) return this.set(1, 0, 0, 0), this; t = Math.PI; let e = (c + 1) / 2, s = (f + 1) / 2, _ = (g + 1) / 2, v = (l + d) / 4, y = (u + m) / 4, b = (p + h) / 4; return e > s && e > _ ? e < a ? (n = 0, r = .707106781, i = .707106781) : (n = Math.sqrt(e), r = v / n, i = y / n) : s > _ ? s < a ? (n = .707106781, r = 0, i = .707106781) : (r = Math.sqrt(s), n = v / r, i = b / r) : _ < a ? (n = .707106781, r = .707106781, i = 0) : (i = Math.sqrt(_), n = y / i, r = b / i), this.set(n, r, i, t), this } let _ = Math.sqrt((h - p) * (h - p) + (u - m) * (u - m) + (d - l) * (d - l)); return Math.abs(_) < .001 && (_ = 1), this.x = (h - p) / _, this.y = (u - m) / _, this.z = (d - l) / _, this.w = Math.acos((c + f + g - 1) / 2), this } setFromMatrixPosition(e) { let t = e.elements; return this.x = t[12], this.y = t[13], this.z = t[14], this.w = t[15], this } min(e) { return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this.w = Math.min(this.w, e.w), this } max(e) { return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this.w = Math.max(this.w, e.w), this } clamp(e, t) { return this.x = W(this.x, e.x, t.x), this.y = W(this.y, e.y, t.y), this.z = W(this.z, e.z, t.z), this.w = W(this.w, e.w, t.w), this } clampScalar(e, t) { return this.x = W(this.x, e, t), this.y = W(this.y, e, t), this.z = W(this.z, e, t), this.w = W(this.w, e, t), this } clampLength(e, t) { let n = this.length(); return this.divideScalar(n || 1).multiplyScalar(W(n, e, t)) } floor() { return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this } ceil() { return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this } round() { return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this } roundToZero() { return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this } negate() { return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this } dot(e) { return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w } lengthSq() { return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w } length() { return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w) } manhattanLength() { return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w) } normalize() { return this.divideScalar(this.length() || 1) } setLength(e) { return this.normalize().multiplyScalar(e) } lerp(e, t) { return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this } lerpVectors(e, t, n) { return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this.w = e.w + (t.w - e.w) * n, this } equals(e) { return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w } fromArray(e, t = 0) { return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this } toArray(e = [], t = 0) { return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e } fromBufferAttribute(e, t) { return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this.w = e.getW(t), this } random() { return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this } *[Symbol.iterator]() { yield this.x, yield this.y, yield this.z, yield this.w } }, as = class extends mo { constructor(e = 1, t = 1, n = {}) { super(), n = Object.assign({ generateMipmaps: !1, internalFormat: null, minFilter: ki, depthBuffer: !0, stencilBuffer: !1, resolveDepthBuffer: !0, resolveStencilBuffer: !0, depthTexture: null, samples: 0, count: 1, depth: 1, multiview: !1 }, n), this.isRenderTarget = !0, this.width = e, this.height = t, this.depth = n.depth, this.scissor = new is(0, 0, e, t), this.scissorTest = !1, this.viewport = new is(0, 0, e, t), this.textures = []; let r = new rs({ width: e, height: t, depth: n.depth }), i = n.count; for (let e = 0; e < i; e++)this.textures[e] = r.clone(), this.textures[e].isRenderTargetTexture = !0, this.textures[e].renderTarget = this; this._setTextureOptions(n), this.depthBuffer = n.depthBuffer, this.stencilBuffer = n.stencilBuffer, this.resolveDepthBuffer = n.resolveDepthBuffer, this.resolveStencilBuffer = n.resolveStencilBuffer, this._depthTexture = null, this.depthTexture = n.depthTexture, this.samples = n.samples, this.multiview = n.multiview } _setTextureOptions(e = {}) { let t = { minFilter: ki, generateMipmaps: !1, flipY: !1, internalFormat: null }; e.mapping !== void 0 && (t.mapping = e.mapping), e.wrapS !== void 0 && (t.wrapS = e.wrapS), e.wrapT !== void 0 && (t.wrapT = e.wrapT), e.wrapR !== void 0 && (t.wrapR = e.wrapR), e.magFilter !== void 0 && (t.magFilter = e.magFilter), e.minFilter !== void 0 && (t.minFilter = e.minFilter), e.format !== void 0 && (t.format = e.format), e.type !== void 0 && (t.type = e.type), e.anisotropy !== void 0 && (t.anisotropy = e.anisotropy), e.colorSpace !== void 0 && (t.colorSpace = e.colorSpace), e.flipY !== void 0 && (t.flipY = e.flipY), e.generateMipmaps !== void 0 && (t.generateMipmaps = e.generateMipmaps), e.internalFormat !== void 0 && (t.internalFormat = e.internalFormat); for (let e = 0; e < this.textures.length; e++)this.textures[e].setValues(t) } get texture() { return this.textures[0] } set texture(e) { this.textures[0] = e } set depthTexture(e) { this._depthTexture !== null && (this._depthTexture.renderTarget = null), e !== null && (e.renderTarget = this), this._depthTexture = e } get depthTexture() { return this._depthTexture } setSize(e, t, n = 1) { if (this.width !== e || this.height !== t || this.depth !== n) { this.width = e, this.height = t, this.depth = n; for (let r = 0, i = this.textures.length; r < i; r++)this.textures[r].image.width = e, this.textures[r].image.height = t, this.textures[r].image.depth = n, this.textures[r].isData3DTexture !== !0 && (this.textures[r].isArrayTexture = this.textures[r].image.depth > 1); this.dispose() } this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t) } clone() { return new this.constructor().copy(this) } copy(e) { this.width = e.width, this.height = e.height, this.depth = e.depth, this.scissor.copy(e.scissor), this.scissorTest = e.scissorTest, this.viewport.copy(e.viewport), this.textures.length = 0; for (let t = 0, n = e.textures.length; t < n; t++) { this.textures[t] = e.textures[t].clone(), this.textures[t].isRenderTargetTexture = !0, this.textures[t].renderTarget = this; let n = Object.assign({}, e.textures[t].image); this.textures[t].source = new $o(n) } return this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.resolveDepthBuffer = e.resolveDepthBuffer, this.resolveStencilBuffer = e.resolveStencilBuffer, e.depthTexture !== null && (this.depthTexture = e.depthTexture.clone()), this.samples = e.samples, this.multiview = e.multiview, this } dispose() { this.dispatchEvent({ type: `dispose` }) } }, os = class extends as { constructor(e = 1, t = 1, n = {}) { super(e, t, n), this.isWebGLRenderTarget = !0 } }, ss = class extends rs { constructor(e = null, t = 1, n = 1, r = 1) { super(null), this.isDataArrayTexture = !0, this.image = { data: e, width: t, height: n, depth: r }, this.magFilter = Ei, this.minFilter = Ei, this.wrapR = wi, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = new Set } addLayerUpdate(e) { this.layerUpdates.add(e) } clearLayerUpdates() { this.layerUpdates.clear() } }, cs = class extends rs { constructor(e = null, t = 1, n = 1, r = 1) { super(null), this.isData3DTexture = !0, this.image = { data: e, width: t, height: n, depth: r }, this.magFilter = Ei, this.minFilter = Ei, this.wrapR = wi, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1 } }, Y = class e { static { e.prototype.isMatrix4 = !0 } constructor(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h) { this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], e !== void 0 && this.set(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h) } set(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h) { let g = this.elements; return g[0] = e, g[4] = t, g[8] = n, g[12] = r, g[1] = i, g[5] = a, g[9] = o, g[13] = s, g[2] = c, g[6] = l, g[10] = u, g[14] = d, g[3] = f, g[7] = p, g[11] = m, g[15] = h, this } identity() { return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this } clone() { return new e().fromArray(this.elements) } copy(e) { let t = this.elements, n = e.elements; return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], t[9] = n[9], t[10] = n[10], t[11] = n[11], t[12] = n[12], t[13] = n[13], t[14] = n[14], t[15] = n[15], this } copyPosition(e) { let t = this.elements, n = e.elements; return t[12] = n[12], t[13] = n[13], t[14] = n[14], this } setFromMatrix3(e) { let t = e.elements; return this.set(t[0], t[3], t[6], 0, t[1], t[4], t[7], 0, t[2], t[5], t[8], 0, 0, 0, 0, 1), this } extractBasis(e, t, n) { return this.determinant() === 0 ? (e.set(1, 0, 0), t.set(0, 1, 0), n.set(0, 0, 1), this) : (e.setFromMatrixColumn(this, 0), t.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this) } makeBasis(e, t, n) { return this.set(e.x, t.x, n.x, 0, e.y, t.y, n.y, 0, e.z, t.z, n.z, 0, 0, 0, 0, 1), this } extractRotation(e) { if (e.determinant() === 0) return this.identity(); let t = this.elements, n = e.elements, r = 1 / ls.setFromMatrixColumn(e, 0).length(), i = 1 / ls.setFromMatrixColumn(e, 1).length(), a = 1 / ls.setFromMatrixColumn(e, 2).length(); return t[0] = n[0] * r, t[1] = n[1] * r, t[2] = n[2] * r, t[3] = 0, t[4] = n[4] * i, t[5] = n[5] * i, t[6] = n[6] * i, t[7] = 0, t[8] = n[8] * a, t[9] = n[9] * a, t[10] = n[10] * a, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this } makeRotationFromEuler(e) { let t = this.elements, n = e.x, r = e.y, i = e.z, a = Math.cos(n), o = Math.sin(n), s = Math.cos(r), c = Math.sin(r), l = Math.cos(i), u = Math.sin(i); if (e.order === `XYZ`) { let e = a * l, n = a * u, r = o * l, i = o * u; t[0] = s * l, t[4] = -s * u, t[8] = c, t[1] = n + r * c, t[5] = e - i * c, t[9] = -o * s, t[2] = i - e * c, t[6] = r + n * c, t[10] = a * s } else if (e.order === `YXZ`) { let e = s * l, n = s * u, r = c * l, i = c * u; t[0] = e + i * o, t[4] = r * o - n, t[8] = a * c, t[1] = a * u, t[5] = a * l, t[9] = -o, t[2] = n * o - r, t[6] = i + e * o, t[10] = a * s } else if (e.order === `ZXY`) { let e = s * l, n = s * u, r = c * l, i = c * u; t[0] = e - i * o, t[4] = -a * u, t[8] = r + n * o, t[1] = n + r * o, t[5] = a * l, t[9] = i - e * o, t[2] = -a * c, t[6] = o, t[10] = a * s } else if (e.order === `ZYX`) { let e = a * l, n = a * u, r = o * l, i = o * u; t[0] = s * l, t[4] = r * c - n, t[8] = e * c + i, t[1] = s * u, t[5] = i * c + e, t[9] = n * c - r, t[2] = -c, t[6] = o * s, t[10] = a * s } else if (e.order === `YZX`) { let e = a * s, n = a * c, r = o * s, i = o * c; t[0] = s * l, t[4] = i - e * u, t[8] = r * u + n, t[1] = u, t[5] = a * l, t[9] = -o * l, t[2] = -c * l, t[6] = n * u + r, t[10] = e - i * u } else if (e.order === `XZY`) { let e = a * s, n = a * c, r = o * s, i = o * c; t[0] = s * l, t[4] = -u, t[8] = c * l, t[1] = e * u + i, t[5] = a * l, t[9] = n * u - r, t[2] = r * u - n, t[6] = o * l, t[10] = i * u + e } return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this } makeRotationFromQuaternion(e) { return this.compose(ds, e, fs) } lookAt(e, t, n) { let r = this.elements; return hs.subVectors(e, t), hs.lengthSq() === 0 && (hs.z = 1), hs.normalize(), ps.crossVectors(n, hs), ps.lengthSq() === 0 && (Math.abs(n.z) === 1 ? hs.x += 1e-4 : hs.z += 1e-4, hs.normalize(), ps.crossVectors(n, hs)), ps.normalize(), ms.crossVectors(hs, ps), r[0] = ps.x, r[4] = ms.x, r[8] = hs.x, r[1] = ps.y, r[5] = ms.y, r[9] = hs.y, r[2] = ps.z, r[6] = ms.z, r[10] = hs.z, this } multiply(e) { return this.multiplyMatrices(this, e) } premultiply(e) { return this.multiplyMatrices(e, this) } multiplyMatrices(e, t) { let n = e.elements, r = t.elements, i = this.elements, a = n[0], o = n[4], s = n[8], c = n[12], l = n[1], u = n[5], d = n[9], f = n[13], p = n[2], m = n[6], h = n[10], g = n[14], _ = n[3], v = n[7], y = n[11], b = n[15], x = r[0], S = r[4], C = r[8], w = r[12], T = r[1], E = r[5], D = r[9], O = r[13], k = r[2], A = r[6], j = r[10], M = r[14], N = r[3], P = r[7], F = r[11], I = r[15]; return i[0] = a * x + o * T + s * k + c * N, i[4] = a * S + o * E + s * A + c * P, i[8] = a * C + o * D + s * j + c * F, i[12] = a * w + o * O + s * M + c * I, i[1] = l * x + u * T + d * k + f * N, i[5] = l * S + u * E + d * A + f * P, i[9] = l * C + u * D + d * j + f * F, i[13] = l * w + u * O + d * M + f * I, i[2] = p * x + m * T + h * k + g * N, i[6] = p * S + m * E + h * A + g * P, i[10] = p * C + m * D + h * j + g * F, i[14] = p * w + m * O + h * M + g * I, i[3] = _ * x + v * T + y * k + b * N, i[7] = _ * S + v * E + y * A + b * P, i[11] = _ * C + v * D + y * j + b * F, i[15] = _ * w + v * O + y * M + b * I, this } multiplyScalar(e) { let t = this.elements; return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this } determinant() { let e = this.elements, t = e[0], n = e[4], r = e[8], i = e[12], a = e[1], o = e[5], s = e[9], c = e[13], l = e[2], u = e[6], d = e[10], f = e[14], p = e[3], m = e[7], h = e[11], g = e[15], _ = s * f - c * d, v = o * f - c * u, y = o * d - s * u, b = a * f - c * l, x = a * d - s * l, S = a * u - o * l; return t * (m * _ - h * v + g * y) - n * (p * _ - h * b + g * x) + r * (p * v - m * b + g * S) - i * (p * y - m * x + h * S) } transpose() { let e = this.elements, t; return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this } setPosition(e, t, n) { let r = this.elements; return e.isVector3 ? (r[12] = e.x, r[13] = e.y, r[14] = e.z) : (r[12] = e, r[13] = t, r[14] = n), this } invert() { let e = this.elements, t = e[0], n = e[1], r = e[2], i = e[3], a = e[4], o = e[5], s = e[6], c = e[7], l = e[8], u = e[9], d = e[10], f = e[11], p = e[12], m = e[13], h = e[14], g = e[15], _ = t * o - n * a, v = t * s - r * a, y = t * c - i * a, b = n * s - r * o, x = n * c - i * o, S = r * c - i * s, C = l * m - u * p, w = l * h - d * p, T = l * g - f * p, E = u * h - d * m, D = u * g - f * m, O = d * g - f * h, k = _ * O - v * D + y * E + b * T - x * w + S * C; if (k === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0); let A = 1 / k; return e[0] = (o * O - s * D + c * E) * A, e[1] = (r * D - n * O - i * E) * A, e[2] = (m * S - h * x + g * b) * A, e[3] = (d * x - u * S - f * b) * A, e[4] = (s * T - a * O - c * w) * A, e[5] = (t * O - r * T + i * w) * A, e[6] = (h * y - p * S - g * v) * A, e[7] = (l * S - d * y + f * v) * A, e[8] = (a * D - o * T + c * C) * A, e[9] = (n * T - t * D - i * C) * A, e[10] = (p * x - m * y + g * _) * A, e[11] = (u * y - l * x - f * _) * A, e[12] = (o * w - a * E - s * C) * A, e[13] = (t * E - n * w + r * C) * A, e[14] = (m * v - p * b - h * _) * A, e[15] = (l * b - u * v + d * _) * A, this } scale(e) { let t = this.elements, n = e.x, r = e.y, i = e.z; return t[0] *= n, t[4] *= r, t[8] *= i, t[1] *= n, t[5] *= r, t[9] *= i, t[2] *= n, t[6] *= r, t[10] *= i, t[3] *= n, t[7] *= r, t[11] *= i, this } getMaxScaleOnAxis() { let e = this.elements, t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2], n = e[4] * e[4] + e[5] * e[5] + e[6] * e[6], r = e[8] * e[8] + e[9] * e[9] + e[10] * e[10]; return Math.sqrt(Math.max(t, n, r)) } makeTranslation(e, t, n) { return e.isVector3 ? this.set(1, 0, 0, e.x, 0, 1, 0, e.y, 0, 0, 1, e.z, 0, 0, 0, 1) : this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, n, 0, 0, 0, 1), this } makeRotationX(e) { let t = Math.cos(e), n = Math.sin(e); return this.set(1, 0, 0, 0, 0, t, -n, 0, 0, n, t, 0, 0, 0, 0, 1), this } makeRotationY(e) { let t = Math.cos(e), n = Math.sin(e); return this.set(t, 0, n, 0, 0, 1, 0, 0, -n, 0, t, 0, 0, 0, 0, 1), this } makeRotationZ(e) { let t = Math.cos(e), n = Math.sin(e); return this.set(t, -n, 0, 0, n, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this } makeRotationAxis(e, t) { let n = Math.cos(t), r = Math.sin(t), i = 1 - n, a = e.x, o = e.y, s = e.z, c = i * a, l = i * o; return this.set(c * a + n, c * o - r * s, c * s + r * o, 0, c * o + r * s, l * o + n, l * s - r * a, 0, c * s - r * o, l * s + r * a, i * s * s + n, 0, 0, 0, 0, 1), this } makeScale(e, t, n) { return this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, n, 0, 0, 0, 0, 1), this } makeShear(e, t, n, r, i, a) { return this.set(1, n, i, 0, e, 1, a, 0, t, r, 1, 0, 0, 0, 0, 1), this } compose(e, t, n) { let r = this.elements, i = t._x, a = t._y, o = t._z, s = t._w, c = i + i, l = a + a, u = o + o, d = i * c, f = i * l, p = i * u, m = a * l, h = a * u, g = o * u, _ = s * c, v = s * l, y = s * u, b = n.x, x = n.y, S = n.z; return r[0] = (1 - (m + g)) * b, r[1] = (f + y) * b, r[2] = (p - v) * b, r[3] = 0, r[4] = (f - y) * x, r[5] = (1 - (d + g)) * x, r[6] = (h + _) * x, r[7] = 0, r[8] = (p + v) * S, r[9] = (h - _) * S, r[10] = (1 - (d + m)) * S, r[11] = 0, r[12] = e.x, r[13] = e.y, r[14] = e.z, r[15] = 1, this } decompose(e, t, n) { let r = this.elements; e.x = r[12], e.y = r[13], e.z = r[14]; let i = this.determinant(); if (i === 0) return n.set(1, 1, 1), t.identity(), this; let a = ls.set(r[0], r[1], r[2]).length(), o = ls.set(r[4], r[5], r[6]).length(), s = ls.set(r[8], r[9], r[10]).length(); i < 0 && (a = -a), us.copy(this); let c = 1 / a, l = 1 / o, u = 1 / s; return us.elements[0] *= c, us.elements[1] *= c, us.elements[2] *= c, us.elements[4] *= l, us.elements[5] *= l, us.elements[6] *= l, us.elements[8] *= u, us.elements[9] *= u, us.elements[10] *= u, t.setFromRotationMatrix(us), n.x = a, n.y = o, n.z = s, this } makePerspective(e, t, n, r, i, a, o = to, s = !1) { let c = this.elements, l = 2 * i / (t - e), u = 2 * i / (n - r), d = (t + e) / (t - e), f = (n + r) / (n - r), p, m; if (s) p = i / (a - i), m = a * i / (a - i); else if (o === 2e3) p = -(a + i) / (a - i), m = -2 * a * i / (a - i); else if (o === 2001) p = -a / (a - i), m = -a * i / (a - i); else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: ` + o); return c[0] = l, c[4] = 0, c[8] = d, c[12] = 0, c[1] = 0, c[5] = u, c[9] = f, c[13] = 0, c[2] = 0, c[6] = 0, c[10] = p, c[14] = m, c[3] = 0, c[7] = 0, c[11] = -1, c[15] = 0, this } makeOrthographic(e, t, n, r, i, a, o = to, s = !1) { let c = this.elements, l = 2 / (t - e), u = 2 / (n - r), d = -(t + e) / (t - e), f = -(n + r) / (n - r), p, m; if (s) p = 1 / (a - i), m = a / (a - i); else if (o === 2e3) p = -2 / (a - i), m = -(a + i) / (a - i); else if (o === 2001) p = -1 / (a - i), m = -i / (a - i); else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: ` + o); return c[0] = l, c[4] = 0, c[8] = 0, c[12] = d, c[1] = 0, c[5] = u, c[9] = 0, c[13] = f, c[2] = 0, c[6] = 0, c[10] = p, c[14] = m, c[3] = 0, c[7] = 0, c[11] = 0, c[15] = 1, this } equals(e) { let t = this.elements, n = e.elements; for (let e = 0; e < 16; e++)if (t[e] !== n[e]) return !1; return !0 } fromArray(e, t = 0) { for (let n = 0; n < 16; n++)this.elements[n] = e[n + t]; return this } toArray(e = [], t = 0) { let n = this.elements; return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e[t + 9] = n[9], e[t + 10] = n[10], e[t + 11] = n[11], e[t + 12] = n[12], e[t + 13] = n[13], e[t + 14] = n[14], e[t + 15] = n[15], e } }, ls = new K, us = new Y, ds = new K(0, 0, 0), fs = new K(1, 1, 1), ps = new K, ms = new K, hs = new K, gs = new Y, _s = new Vo, vs = class e { constructor(t = 0, n = 0, r = 0, i = e.DEFAULT_ORDER) { this.isEuler = !0, this._x = t, this._y = n, this._z = r, this._order = i } get x() { return this._x } set x(e) { this._x = e, this._onChangeCallback() } get y() { return this._y } set y(e) { this._y = e, this._onChangeCallback() } get z() { return this._z } set z(e) { this._z = e, this._onChangeCallback() } get order() { return this._order } set order(e) { this._order = e, this._onChangeCallback() } set(e, t, n, r = this._order) { return this._x = e, this._y = t, this._z = n, this._order = r, this._onChangeCallback(), this } clone() { return new this.constructor(this._x, this._y, this._z, this._order) } copy(e) { return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this._onChangeCallback(), this } setFromRotationMatrix(e, t = this._order, n = !0) { let r = e.elements, i = r[0], a = r[4], o = r[8], s = r[1], c = r[5], l = r[9], u = r[2], d = r[6], f = r[10]; switch (t) { case `XYZ`: this._y = Math.asin(W(o, -1, 1)), Math.abs(o) < .9999999 ? (this._x = Math.atan2(-l, f), this._z = Math.atan2(-a, i)) : (this._x = Math.atan2(d, c), this._z = 0); break; case `YXZ`: this._x = Math.asin(-W(l, -1, 1)), Math.abs(l) < .9999999 ? (this._y = Math.atan2(o, f), this._z = Math.atan2(s, c)) : (this._y = Math.atan2(-u, i), this._z = 0); break; case `ZXY`: this._x = Math.asin(W(d, -1, 1)), Math.abs(d) < .9999999 ? (this._y = Math.atan2(-u, f), this._z = Math.atan2(-a, c)) : (this._y = 0, this._z = Math.atan2(s, i)); break; case `ZYX`: this._y = Math.asin(-W(u, -1, 1)), Math.abs(u) < .9999999 ? (this._x = Math.atan2(d, f), this._z = Math.atan2(s, i)) : (this._x = 0, this._z = Math.atan2(-a, c)); break; case `YZX`: this._z = Math.asin(W(s, -1, 1)), Math.abs(s) < .9999999 ? (this._x = Math.atan2(-l, c), this._y = Math.atan2(-u, i)) : (this._x = 0, this._y = Math.atan2(o, f)); break; case `XZY`: this._z = Math.asin(-W(a, -1, 1)), Math.abs(a) < .9999999 ? (this._x = Math.atan2(d, c), this._y = Math.atan2(o, i)) : (this._x = Math.atan2(-l, f), this._y = 0); break; default: H(`Euler: .setFromRotationMatrix() encountered an unknown order: ` + t) }return this._order = t, n === !0 && this._onChangeCallback(), this } setFromQuaternion(e, t, n) { return gs.makeRotationFromQuaternion(e), this.setFromRotationMatrix(gs, t, n) } setFromVector3(e, t = this._order) { return this.set(e.x, e.y, e.z, t) } reorder(e) { return _s.setFromEuler(this), this.setFromQuaternion(_s, e) } equals(e) { return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order } fromArray(e) { return this._x = e[0], this._y = e[1], this._z = e[2], e[3] !== void 0 && (this._order = e[3]), this._onChangeCallback(), this } toArray(e = [], t = 0) { return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._order, e } _onChange(e) { return this._onChangeCallback = e, this } _onChangeCallback() { } *[Symbol.iterator]() { yield this._x, yield this._y, yield this._z, yield this._order } }; vs.DEFAULT_ORDER = `XYZ`; var ys = class { constructor() { this.mask = 1 } set(e) { this.mask = (1 << e | 0) >>> 0 } enable(e) { this.mask |= 1 << e | 0 } enableAll() { this.mask = -1 } toggle(e) { this.mask ^= 1 << e | 0 } disable(e) { this.mask &= ~(1 << e | 0) } disableAll() { this.mask = 0 } test(e) { return (this.mask & e.mask) !== 0 } isEnabled(e) { return (this.mask & (1 << e | 0)) != 0 } }, bs = 0, xs = new K, Ss = new Vo, Cs = new Y, ws = new K, Ts = new K, Es = new K, Ds = new Vo, Os = new K(1, 0, 0), ks = new K(0, 1, 0), As = new K(0, 0, 1), js = { type: `added` }, Ms = { type: `removed` }, Ns = { type: `childadded`, child: null }, Ps = { type: `childremoved`, child: null }, Fs = class e extends mo { constructor() { super(), this.isObject3D = !0, Object.defineProperty(this, `id`, { value: bs++ }), this.uuid = yo(), this.name = ``, this.type = `Object3D`, this.parent = null, this.children = [], this.up = e.DEFAULT_UP.clone(); let t = new K, n = new vs, r = new Vo, i = new K(1, 1, 1); function a() { r.setFromEuler(n, !1) } function o() { n.setFromQuaternion(r, void 0, !1) } n._onChange(a), r._onChange(o), Object.defineProperties(this, { position: { configurable: !0, enumerable: !0, value: t }, rotation: { configurable: !0, enumerable: !0, value: n }, quaternion: { configurable: !0, enumerable: !0, value: r }, scale: { configurable: !0, enumerable: !0, value: i }, modelViewMatrix: { value: new Y }, normalMatrix: { value: new q } }), this.matrix = new Y, this.matrixWorld = new Y, this.matrixAutoUpdate = e.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new ys, this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.customDepthMaterial = void 0, this.customDistanceMaterial = void 0, this.static = !1, this.userData = {}, this.pivot = null } onBeforeShadow() { } onAfterShadow() { } onBeforeRender() { } onAfterRender() { } applyMatrix4(e) { this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale) } applyQuaternion(e) { return this.quaternion.premultiply(e), this } setRotationFromAxisAngle(e, t) { this.quaternion.setFromAxisAngle(e, t) } setRotationFromEuler(e) { this.quaternion.setFromEuler(e, !0) } setRotationFromMatrix(e) { this.quaternion.setFromRotationMatrix(e) } setRotationFromQuaternion(e) { this.quaternion.copy(e) } rotateOnAxis(e, t) { return Ss.setFromAxisAngle(e, t), this.quaternion.multiply(Ss), this } rotateOnWorldAxis(e, t) { return Ss.setFromAxisAngle(e, t), this.quaternion.premultiply(Ss), this } rotateX(e) { return this.rotateOnAxis(Os, e) } rotateY(e) { return this.rotateOnAxis(ks, e) } rotateZ(e) { return this.rotateOnAxis(As, e) } translateOnAxis(e, t) { return xs.copy(e).applyQuaternion(this.quaternion), this.position.add(xs.multiplyScalar(t)), this } translateX(e) { return this.translateOnAxis(Os, e) } translateY(e) { return this.translateOnAxis(ks, e) } translateZ(e) { return this.translateOnAxis(As, e) } localToWorld(e) { return this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld) } worldToLocal(e) { return this.updateWorldMatrix(!0, !1), e.applyMatrix4(Cs.copy(this.matrixWorld).invert()) } lookAt(e, t, n) { e.isVector3 ? ws.copy(e) : ws.set(e, t, n); let r = this.parent; this.updateWorldMatrix(!0, !1), Ts.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? Cs.lookAt(Ts, ws, this.up) : Cs.lookAt(ws, Ts, this.up), this.quaternion.setFromRotationMatrix(Cs), r && (Cs.extractRotation(r.matrixWorld), Ss.setFromRotationMatrix(Cs), this.quaternion.premultiply(Ss.invert())) } add(e) { if (arguments.length > 1) { for (let e = 0; e < arguments.length; e++)this.add(arguments[e]); return this } return e === this ? (U(`Object3D.add: object can't be added as a child of itself.`, e), this) : (e && e.isObject3D ? (e.removeFromParent(), e.parent = this, this.children.push(e), e.dispatchEvent(js), Ns.child = e, this.dispatchEvent(Ns), Ns.child = null) : U(`Object3D.add: object not an instance of THREE.Object3D.`, e), this) } remove(e) { if (arguments.length > 1) { for (let e = 0; e < arguments.length; e++)this.remove(arguments[e]); return this } let t = this.children.indexOf(e); return t !== -1 && (e.parent = null, this.children.splice(t, 1), e.dispatchEvent(Ms), Ps.child = e, this.dispatchEvent(Ps), Ps.child = null), this } removeFromParent() { let e = this.parent; return e !== null && e.remove(this), this } clear() { return this.remove(...this.children) } attach(e) { return this.updateWorldMatrix(!0, !1), Cs.copy(this.matrixWorld).invert(), e.parent !== null && (e.parent.updateWorldMatrix(!0, !1), Cs.multiply(e.parent.matrixWorld)), e.applyMatrix4(Cs), e.removeFromParent(), e.parent = this, this.children.push(e), e.updateWorldMatrix(!1, !0), e.dispatchEvent(js), Ns.child = e, this.dispatchEvent(Ns), Ns.child = null, this } getObjectById(e) { return this.getObjectByProperty(`id`, e) } getObjectByName(e) { return this.getObjectByProperty(`name`, e) } getObjectByProperty(e, t) { if (this[e] === t) return this; for (let n = 0, r = this.children.length; n < r; n++) { let r = this.children[n].getObjectByProperty(e, t); if (r !== void 0) return r } } getObjectsByProperty(e, t, n = []) { this[e] === t && n.push(this); let r = this.children; for (let i = 0, a = r.length; i < a; i++)r[i].getObjectsByProperty(e, t, n); return n } getWorldPosition(e) { return this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld) } getWorldQuaternion(e) { return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Ts, e, Es), e } getWorldScale(e) { return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Ts, Ds, e), e } getWorldDirection(e) { this.updateWorldMatrix(!0, !1); let t = this.matrixWorld.elements; return e.set(t[8], t[9], t[10]).normalize() } raycast() { } traverse(e) { e(this); let t = this.children; for (let n = 0, r = t.length; n < r; n++)t[n].traverse(e) } traverseVisible(e) { if (this.visible === !1) return; e(this); let t = this.children; for (let n = 0, r = t.length; n < r; n++)t[n].traverseVisible(e) } traverseAncestors(e) { let t = this.parent; t !== null && (e(t), t.traverseAncestors(e)) } updateMatrix() { this.matrix.compose(this.position, this.quaternion, this.scale); let e = this.pivot; if (e !== null) { let t = e.x, n = e.y, r = e.z, i = this.matrix.elements; i[12] += t - i[0] * t - i[4] * n - i[8] * r, i[13] += n - i[1] * t - i[5] * n - i[9] * r, i[14] += r - i[2] * t - i[6] * n - i[10] * r } this.matrixWorldNeedsUpdate = !0 } updateMatrixWorld(e) { this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, e = !0); let t = this.children; for (let n = 0, r = t.length; n < r; n++)t[n].updateMatrixWorld(e) } updateWorldMatrix(e, t) { let n = this.parent; if (e === !0 && n !== null && n.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), t === !0) { let e = this.children; for (let t = 0, n = e.length; t < n; t++)e[t].updateWorldMatrix(!1, !0) } } toJSON(e) { let t = e === void 0 || typeof e == `string`, n = {}; t && (e = { geometries: {}, materials: {}, textures: {}, images: {}, shapes: {}, skeletons: {}, animations: {}, nodes: {} }, n.metadata = { version: 4.7, type: `Object`, generator: `Object3D.toJSON` }); let r = {}; r.uuid = this.uuid, r.type = this.type, this.name !== `` && (r.name = this.name), this.castShadow === !0 && (r.castShadow = !0), this.receiveShadow === !0 && (r.receiveShadow = !0), this.visible === !1 && (r.visible = !1), this.frustumCulled === !1 && (r.frustumCulled = !1), this.renderOrder !== 0 && (r.renderOrder = this.renderOrder), this.static !== !1 && (r.static = this.static), Object.keys(this.userData).length > 0 && (r.userData = this.userData), r.layers = this.layers.mask, r.matrix = this.matrix.toArray(), r.up = this.up.toArray(), this.pivot !== null && (r.pivot = this.pivot.toArray()), this.matrixAutoUpdate === !1 && (r.matrixAutoUpdate = !1), this.morphTargetDictionary !== void 0 && (r.morphTargetDictionary = Object.assign({}, this.morphTargetDictionary)), this.morphTargetInfluences !== void 0 && (r.morphTargetInfluences = this.morphTargetInfluences.slice()), this.isInstancedMesh && (r.type = `InstancedMesh`, r.count = this.count, r.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (r.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (r.type = `BatchedMesh`, r.perObjectFrustumCulled = this.perObjectFrustumCulled, r.sortObjects = this.sortObjects, r.drawRanges = this._drawRanges, r.reservedRanges = this._reservedRanges, r.geometryInfo = this._geometryInfo.map(e => ({ ...e, boundingBox: e.boundingBox ? e.boundingBox.toJSON() : void 0, boundingSphere: e.boundingSphere ? e.boundingSphere.toJSON() : void 0 })), r.instanceInfo = this._instanceInfo.map(e => ({ ...e })), r.availableInstanceIds = this._availableInstanceIds.slice(), r.availableGeometryIds = this._availableGeometryIds.slice(), r.nextIndexStart = this._nextIndexStart, r.nextVertexStart = this._nextVertexStart, r.geometryCount = this._geometryCount, r.maxInstanceCount = this._maxInstanceCount, r.maxVertexCount = this._maxVertexCount, r.maxIndexCount = this._maxIndexCount, r.geometryInitialized = this._geometryInitialized, r.matricesTexture = this._matricesTexture.toJSON(e), r.indirectTexture = this._indirectTexture.toJSON(e), this._colorsTexture !== null && (r.colorsTexture = this._colorsTexture.toJSON(e)), this.boundingSphere !== null && (r.boundingSphere = this.boundingSphere.toJSON()), this.boundingBox !== null && (r.boundingBox = this.boundingBox.toJSON())); function i(t, n) { return t[n.uuid] === void 0 && (t[n.uuid] = n.toJSON(e)), n.uuid } if (this.isScene) this.background && (this.background.isColor ? r.background = this.background.toJSON() : this.background.isTexture && (r.background = this.background.toJSON(e).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (r.environment = this.environment.toJSON(e).uuid); else if (this.isMesh || this.isLine || this.isPoints) { r.geometry = i(e.geometries, this.geometry); let t = this.geometry.parameters; if (t !== void 0 && t.shapes !== void 0) { let n = t.shapes; if (Array.isArray(n)) for (let t = 0, r = n.length; t < r; t++) { let r = n[t]; i(e.shapes, r) } else i(e.shapes, n) } } if (this.isSkinnedMesh && (r.bindMode = this.bindMode, r.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (i(e.skeletons, this.skeleton), r.skeleton = this.skeleton.uuid)), this.material !== void 0) if (Array.isArray(this.material)) { let t = []; for (let n = 0, r = this.material.length; n < r; n++)t.push(i(e.materials, this.material[n])); r.material = t } else r.material = i(e.materials, this.material); if (this.children.length > 0) { r.children = []; for (let t = 0; t < this.children.length; t++)r.children.push(this.children[t].toJSON(e).object) } if (this.animations.length > 0) { r.animations = []; for (let t = 0; t < this.animations.length; t++) { let n = this.animations[t]; r.animations.push(i(e.animations, n)) } } if (t) { let t = a(e.geometries), r = a(e.materials), i = a(e.textures), o = a(e.images), s = a(e.shapes), c = a(e.skeletons), l = a(e.animations), u = a(e.nodes); t.length > 0 && (n.geometries = t), r.length > 0 && (n.materials = r), i.length > 0 && (n.textures = i), o.length > 0 && (n.images = o), s.length > 0 && (n.shapes = s), c.length > 0 && (n.skeletons = c), l.length > 0 && (n.animations = l), u.length > 0 && (n.nodes = u) } return n.object = r, n; function a(e) { let t = []; for (let n in e) { let r = e[n]; delete r.metadata, t.push(r) } return t } } clone(e) { return new this.constructor().copy(this, e) } copy(e, t = !0) { if (this.name = e.name, this.up.copy(e.up), this.position.copy(e.position), this.rotation.order = e.rotation.order, this.quaternion.copy(e.quaternion), this.scale.copy(e.scale), this.pivot = e.pivot === null ? null : e.pivot.clone(), this.matrix.copy(e.matrix), this.matrixWorld.copy(e.matrixWorld), this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate, this.layers.mask = e.layers.mask, this.visible = e.visible, this.castShadow = e.castShadow, this.receiveShadow = e.receiveShadow, this.frustumCulled = e.frustumCulled, this.renderOrder = e.renderOrder, this.static = e.static, this.animations = e.animations.slice(), this.userData = JSON.parse(JSON.stringify(e.userData)), t === !0) for (let t = 0; t < e.children.length; t++) { let n = e.children[t]; this.add(n.clone()) } return this } }; Fs.DEFAULT_UP = new K(0, 1, 0), Fs.DEFAULT_MATRIX_AUTO_UPDATE = !0, Fs.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0; var Is = class extends Fs { constructor() { super(), this.isGroup = !0, this.type = `Group` } }, Ls = { type: `move` }, Rs = class { constructor() { this._targetRay = null, this._grip = null, this._hand = null } getHandSpace() { return this._hand === null && (this._hand = new Is, this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand } getTargetRaySpace() { return this._targetRay === null && (this._targetRay = new Is, this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new K, this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new K), this._targetRay } getGripSpace() { return this._grip === null && (this._grip = new Is, this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new K, this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new K, this._grip.eventsEnabled = !1), this._grip } dispatchEvent(e) { return this._targetRay !== null && this._targetRay.dispatchEvent(e), this._grip !== null && this._grip.dispatchEvent(e), this._hand !== null && this._hand.dispatchEvent(e), this } connect(e) { if (e && e.hand) { let t = this._hand; if (t) for (let n of e.hand.values()) this._getHandJoint(t, n) } return this.dispatchEvent({ type: `connected`, data: e }), this } disconnect(e) { return this.dispatchEvent({ type: `disconnected`, data: e }), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this } update(e, t, n) { let r = null, i = null, a = null, o = this._targetRay, s = this._grip, c = this._hand; if (e && t.session.visibilityState !== `visible-blurred`) { if (c && e.hand) { a = !0; for (let r of e.hand.values()) { let e = t.getJointPose(r, n), i = this._getHandJoint(c, r); e !== null && (i.matrix.fromArray(e.transform.matrix), i.matrix.decompose(i.position, i.rotation, i.scale), i.matrixWorldNeedsUpdate = !0, i.jointRadius = e.radius), i.visible = e !== null } let r = c.joints[`index-finger-tip`], i = c.joints[`thumb-tip`], o = r.position.distanceTo(i.position), s = .02, l = .005; c.inputState.pinching && o > s + l ? (c.inputState.pinching = !1, this.dispatchEvent({ type: `pinchend`, handedness: e.handedness, target: this })) : !c.inputState.pinching && o <= s - l && (c.inputState.pinching = !0, this.dispatchEvent({ type: `pinchstart`, handedness: e.handedness, target: this })) } else s !== null && e.gripSpace && (i = t.getPose(e.gripSpace, n), i !== null && (s.matrix.fromArray(i.transform.matrix), s.matrix.decompose(s.position, s.rotation, s.scale), s.matrixWorldNeedsUpdate = !0, i.linearVelocity ? (s.hasLinearVelocity = !0, s.linearVelocity.copy(i.linearVelocity)) : s.hasLinearVelocity = !1, i.angularVelocity ? (s.hasAngularVelocity = !0, s.angularVelocity.copy(i.angularVelocity)) : s.hasAngularVelocity = !1, s.eventsEnabled && s.dispatchEvent({ type: `gripUpdated`, data: e, target: this }))); o !== null && (r = t.getPose(e.targetRaySpace, n), r === null && i !== null && (r = i), r !== null && (o.matrix.fromArray(r.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), o.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (o.hasLinearVelocity = !0, o.linearVelocity.copy(r.linearVelocity)) : o.hasLinearVelocity = !1, r.angularVelocity ? (o.hasAngularVelocity = !0, o.angularVelocity.copy(r.angularVelocity)) : o.hasAngularVelocity = !1, this.dispatchEvent(Ls))) } return o !== null && (o.visible = r !== null), s !== null && (s.visible = i !== null), c !== null && (c.visible = a !== null), this } _getHandJoint(e, t) { if (e.joints[t.jointName] === void 0) { let n = new Is; n.matrixAutoUpdate = !1, n.visible = !1, e.joints[t.jointName] = n, e.add(n) } return e.joints[t.jointName] } }, zs = { aliceblue: 15792383, antiquewhite: 16444375, aqua: 65535, aquamarine: 8388564, azure: 15794175, beige: 16119260, bisque: 16770244, black: 0, blanchedalmond: 16772045, blue: 255, blueviolet: 9055202, brown: 10824234, burlywood: 14596231, cadetblue: 6266528, chartreuse: 8388352, chocolate: 13789470, coral: 16744272, cornflowerblue: 6591981, cornsilk: 16775388, crimson: 14423100, cyan: 65535, darkblue: 139, darkcyan: 35723, darkgoldenrod: 12092939, darkgray: 11119017, darkgreen: 25600, darkgrey: 11119017, darkkhaki: 12433259, darkmagenta: 9109643, darkolivegreen: 5597999, darkorange: 16747520, darkorchid: 10040012, darkred: 9109504, darksalmon: 15308410, darkseagreen: 9419919, darkslateblue: 4734347, darkslategray: 3100495, darkslategrey: 3100495, darkturquoise: 52945, darkviolet: 9699539, deeppink: 16716947, deepskyblue: 49151, dimgray: 6908265, dimgrey: 6908265, dodgerblue: 2003199, firebrick: 11674146, floralwhite: 16775920, forestgreen: 2263842, fuchsia: 16711935, gainsboro: 14474460, ghostwhite: 16316671, gold: 16766720, goldenrod: 14329120, gray: 8421504, green: 32768, greenyellow: 11403055, grey: 8421504, honeydew: 15794160, hotpink: 16738740, indianred: 13458524, indigo: 4915330, ivory: 16777200, khaki: 15787660, lavender: 15132410, lavenderblush: 16773365, lawngreen: 8190976, lemonchiffon: 16775885, lightblue: 11393254, lightcoral: 15761536, lightcyan: 14745599, lightgoldenrodyellow: 16448210, lightgray: 13882323, lightgreen: 9498256, lightgrey: 13882323, lightpink: 16758465, lightsalmon: 16752762, lightseagreen: 2142890, lightskyblue: 8900346, lightslategray: 7833753, lightslategrey: 7833753, lightsteelblue: 11584734, lightyellow: 16777184, lime: 65280, limegreen: 3329330, linen: 16445670, magenta: 16711935, maroon: 8388608, mediumaquamarine: 6737322, mediumblue: 205, mediumorchid: 12211667, mediumpurple: 9662683, mediumseagreen: 3978097, mediumslateblue: 8087790, mediumspringgreen: 64154, mediumturquoise: 4772300, mediumvioletred: 13047173, midnightblue: 1644912, mintcream: 16121850, mistyrose: 16770273, moccasin: 16770229, navajowhite: 16768685, navy: 128, oldlace: 16643558, olive: 8421376, olivedrab: 7048739, orange: 16753920, orangered: 16729344, orchid: 14315734, palegoldenrod: 15657130, palegreen: 10025880, paleturquoise: 11529966, palevioletred: 14381203, papayawhip: 16773077, peachpuff: 16767673, peru: 13468991, pink: 16761035, plum: 14524637, powderblue: 11591910, purple: 8388736, rebeccapurple: 6697881, red: 16711680, rosybrown: 12357519, royalblue: 4286945, saddlebrown: 9127187, salmon: 16416882, sandybrown: 16032864, seagreen: 3050327, seashell: 16774638, sienna: 10506797, silver: 12632256, skyblue: 8900331, slateblue: 6970061, slategray: 7372944, slategrey: 7372944, snow: 16775930, springgreen: 65407, steelblue: 4620980, tan: 13808780, teal: 32896, thistle: 14204888, tomato: 16737095, turquoise: 4251856, violet: 15631086, wheat: 16113331, white: 16777215, whitesmoke: 16119285, yellow: 16776960, yellowgreen: 10145074 }, Bs = { h: 0, s: 0, l: 0 }, Vs = { h: 0, s: 0, l: 0 }; function Hs(e, t, n) { return n < 0 && (n += 1), n > 1 && --n, n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * 6 * (2 / 3 - n) : e } var X = class { constructor(e, t, n) { return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(e, t, n) } set(e, t, n) { if (t === void 0 && n === void 0) { let t = e; t && t.isColor ? this.copy(t) : typeof t == `number` ? this.setHex(t) : typeof t == `string` && this.setStyle(t) } else this.setRGB(e, t, n); return this } setScalar(e) { return this.r = e, this.g = e, this.b = e, this } setHex(e, t = Ya) { return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, J.colorSpaceToWorking(this, t), this } setRGB(e, t, n, r = J.workingColorSpace) { return this.r = e, this.g = t, this.b = n, J.colorSpaceToWorking(this, r), this } setHSL(e, t, n, r = J.workingColorSpace) { if (e = bo(e, 1), t = W(t, 0, 1), n = W(n, 0, 1), t === 0) this.r = this.g = this.b = n; else { let r = n <= .5 ? n * (1 + t) : n + t - n * t, i = 2 * n - r; this.r = Hs(i, r, e + 1 / 3), this.g = Hs(i, r, e), this.b = Hs(i, r, e - 1 / 3) } return J.colorSpaceToWorking(this, r), this } setStyle(e, t = Ya) { function n(t) { t !== void 0 && parseFloat(t) < 1 && H(`Color: Alpha component of ` + e + ` will be ignored.`) } let r; if (r = /^(\w+)\(([^\)]*)\)/.exec(e)) { let i, a = r[1], o = r[2]; switch (a) { case `rgb`: case `rgba`: if (i = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)) return n(i[4]), this.setRGB(Math.min(255, parseInt(i[1], 10)) / 255, Math.min(255, parseInt(i[2], 10)) / 255, Math.min(255, parseInt(i[3], 10)) / 255, t); if (i = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)) return n(i[4]), this.setRGB(Math.min(100, parseInt(i[1], 10)) / 100, Math.min(100, parseInt(i[2], 10)) / 100, Math.min(100, parseInt(i[3], 10)) / 100, t); break; case `hsl`: case `hsla`: if (i = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)) return n(i[4]), this.setHSL(parseFloat(i[1]) / 360, parseFloat(i[2]) / 100, parseFloat(i[3]) / 100, t); break; default: H(`Color: Unknown color model ` + e) } } else if (r = /^\#([A-Fa-f\d]+)$/.exec(e)) { let n = r[1], i = n.length; if (i === 3) return this.setRGB(parseInt(n.charAt(0), 16) / 15, parseInt(n.charAt(1), 16) / 15, parseInt(n.charAt(2), 16) / 15, t); if (i === 6) return this.setHex(parseInt(n, 16), t); H(`Color: Invalid hex color ` + e) } else if (e && e.length > 0) return this.setColorName(e, t); return this } setColorName(e, t = Ya) { let n = zs[e.toLowerCase()]; return n === void 0 ? H(`Color: Unknown color ` + e) : this.setHex(n, t), this } clone() { return new this.constructor(this.r, this.g, this.b) } copy(e) { return this.r = e.r, this.g = e.g, this.b = e.b, this } copySRGBToLinear(e) { return this.r = Jo(e.r), this.g = Jo(e.g), this.b = Jo(e.b), this } copyLinearToSRGB(e) { return this.r = Yo(e.r), this.g = Yo(e.g), this.b = Yo(e.b), this } convertSRGBToLinear() { return this.copySRGBToLinear(this), this } convertLinearToSRGB() { return this.copyLinearToSRGB(this), this } getHex(e = Ya) { return J.workingToColorSpace(Us.copy(this), e), Math.round(W(Us.r * 255, 0, 255)) * 65536 + Math.round(W(Us.g * 255, 0, 255)) * 256 + Math.round(W(Us.b * 255, 0, 255)) } getHexString(e = Ya) { return (`000000` + this.getHex(e).toString(16)).slice(-6) } getHSL(e, t = J.workingColorSpace) { J.workingToColorSpace(Us.copy(this), t); let n = Us.r, r = Us.g, i = Us.b, a = Math.max(n, r, i), o = Math.min(n, r, i), s, c, l = (o + a) / 2; if (o === a) s = 0, c = 0; else { let e = a - o; switch (c = l <= .5 ? e / (a + o) : e / (2 - a - o), a) { case n: s = (r - i) / e + (r < i ? 6 : 0); break; case r: s = (i - n) / e + 2; break; case i: s = (n - r) / e + 4; break }s /= 6 } return e.h = s, e.s = c, e.l = l, e } getRGB(e, t = J.workingColorSpace) { return J.workingToColorSpace(Us.copy(this), t), e.r = Us.r, e.g = Us.g, e.b = Us.b, e } getStyle(e = Ya) { J.workingToColorSpace(Us.copy(this), e); let t = Us.r, n = Us.g, r = Us.b; return e === `srgb` ? `rgb(${Math.round(t * 255)},${Math.round(n * 255)},${Math.round(r * 255)})` : `color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})` } offsetHSL(e, t, n) { return this.getHSL(Bs), this.setHSL(Bs.h + e, Bs.s + t, Bs.l + n) } add(e) { return this.r += e.r, this.g += e.g, this.b += e.b, this } addColors(e, t) { return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this } addScalar(e) { return this.r += e, this.g += e, this.b += e, this } sub(e) { return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this } multiply(e) { return this.r *= e.r, this.g *= e.g, this.b *= e.b, this } multiplyScalar(e) { return this.r *= e, this.g *= e, this.b *= e, this } lerp(e, t) { return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this } lerpColors(e, t, n) { return this.r = e.r + (t.r - e.r) * n, this.g = e.g + (t.g - e.g) * n, this.b = e.b + (t.b - e.b) * n, this } lerpHSL(e, t) { this.getHSL(Bs), e.getHSL(Vs); let n = Co(Bs.h, Vs.h, t), r = Co(Bs.s, Vs.s, t), i = Co(Bs.l, Vs.l, t); return this.setHSL(n, r, i), this } setFromVector3(e) { return this.r = e.x, this.g = e.y, this.b = e.z, this } applyMatrix3(e) { let t = this.r, n = this.g, r = this.b, i = e.elements; return this.r = i[0] * t + i[3] * n + i[6] * r, this.g = i[1] * t + i[4] * n + i[7] * r, this.b = i[2] * t + i[5] * n + i[8] * r, this } equals(e) { return e.r === this.r && e.g === this.g && e.b === this.b } fromArray(e, t = 0) { return this.r = e[t], this.g = e[t + 1], this.b = e[t + 2], this } toArray(e = [], t = 0) { return e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e } fromBufferAttribute(e, t) { return this.r = e.getX(t), this.g = e.getY(t), this.b = e.getZ(t), this } toJSON() { return this.getHex() } *[Symbol.iterator]() { yield this.r, yield this.g, yield this.b } }, Us = new X; X.NAMES = zs; var Ws = class extends Fs { constructor() { super(), this.isScene = !0, this.type = `Scene`, this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new vs, this.environmentIntensity = 1, this.environmentRotation = new vs, this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < `u` && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`, { detail: this })) } copy(e, t) { return super.copy(e, t), e.background !== null && (this.background = e.background.clone()), e.environment !== null && (this.environment = e.environment.clone()), e.fog !== null && (this.fog = e.fog.clone()), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, this.backgroundRotation.copy(e.backgroundRotation), this.environmentIntensity = e.environmentIntensity, this.environmentRotation.copy(e.environmentRotation), e.overrideMaterial !== null && (this.overrideMaterial = e.overrideMaterial.clone()), this.matrixAutoUpdate = e.matrixAutoUpdate, this } toJSON(e) { let t = super.toJSON(e); return this.fog !== null && (t.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (t.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (t.object.backgroundIntensity = this.backgroundIntensity), t.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (t.object.environmentIntensity = this.environmentIntensity), t.object.environmentRotation = this.environmentRotation.toArray(), t } }, Gs = new K, Ks = new K, qs = new K, Js = new K, Ys = new K, Xs = new K, Zs = new K, Qs = new K, $s = new K, ec = new K, tc = new is, nc = new is, rc = new is, ic = class e { constructor(e = new K, t = new K, n = new K) { this.a = e, this.b = t, this.c = n } static getNormal(e, t, n, r) { r.subVectors(n, t), Gs.subVectors(e, t), r.cross(Gs); let i = r.lengthSq(); return i > 0 ? r.multiplyScalar(1 / Math.sqrt(i)) : r.set(0, 0, 0) } static getBarycoord(e, t, n, r, i) { Gs.subVectors(r, t), Ks.subVectors(n, t), qs.subVectors(e, t); let a = Gs.dot(Gs), o = Gs.dot(Ks), s = Gs.dot(qs), c = Ks.dot(Ks), l = Ks.dot(qs), u = a * c - o * o; if (u === 0) return i.set(0, 0, 0), null; let d = 1 / u, f = (c * s - o * l) * d, p = (a * l - o * s) * d; return i.set(1 - f - p, p, f) } static containsPoint(e, t, n, r) { return this.getBarycoord(e, t, n, r, Js) === null ? !1 : Js.x >= 0 && Js.y >= 0 && Js.x + Js.y <= 1 } static getInterpolation(e, t, n, r, i, a, o, s) { return this.getBarycoord(e, t, n, r, Js) === null ? (s.x = 0, s.y = 0, `z` in s && (s.z = 0), `w` in s && (s.w = 0), null) : (s.setScalar(0), s.addScaledVector(i, Js.x), s.addScaledVector(a, Js.y), s.addScaledVector(o, Js.z), s) } static getInterpolatedAttribute(e, t, n, r, i, a) { return tc.setScalar(0), nc.setScalar(0), rc.setScalar(0), tc.fromBufferAttribute(e, t), nc.fromBufferAttribute(e, n), rc.fromBufferAttribute(e, r), a.setScalar(0), a.addScaledVector(tc, i.x), a.addScaledVector(nc, i.y), a.addScaledVector(rc, i.z), a } static isFrontFacing(e, t, n, r) { return Gs.subVectors(n, t), Ks.subVectors(e, t), Gs.cross(Ks).dot(r) < 0 } set(e, t, n) { return this.a.copy(e), this.b.copy(t), this.c.copy(n), this } setFromPointsAndIndices(e, t, n, r) { return this.a.copy(e[t]), this.b.copy(e[n]), this.c.copy(e[r]), this } setFromAttributeAndIndices(e, t, n, r) { return this.a.fromBufferAttribute(e, t), this.b.fromBufferAttribute(e, n), this.c.fromBufferAttribute(e, r), this } clone() { return new this.constructor().copy(this) } copy(e) { return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this } getArea() { return Gs.subVectors(this.c, this.b), Ks.subVectors(this.a, this.b), Gs.cross(Ks).length() * .5 } getMidpoint(e) { return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3) } getNormal(t) { return e.getNormal(this.a, this.b, this.c, t) } getPlane(e) { return e.setFromCoplanarPoints(this.a, this.b, this.c) } getBarycoord(t, n) { return e.getBarycoord(t, this.a, this.b, this.c, n) } getInterpolation(t, n, r, i, a) { return e.getInterpolation(t, this.a, this.b, this.c, n, r, i, a) } containsPoint(t) { return e.containsPoint(t, this.a, this.b, this.c) } isFrontFacing(t) { return e.isFrontFacing(this.a, this.b, this.c, t) } intersectsBox(e) { return e.intersectsTriangle(this) } closestPointToPoint(e, t) { let n = this.a, r = this.b, i = this.c, a, o; Ys.subVectors(r, n), Xs.subVectors(i, n), Qs.subVectors(e, n); let s = Ys.dot(Qs), c = Xs.dot(Qs); if (s <= 0 && c <= 0) return t.copy(n); $s.subVectors(e, r); let l = Ys.dot($s), u = Xs.dot($s); if (l >= 0 && u <= l) return t.copy(r); let d = s * u - l * c; if (d <= 0 && s >= 0 && l <= 0) return a = s / (s - l), t.copy(n).addScaledVector(Ys, a); ec.subVectors(e, i); let f = Ys.dot(ec), p = Xs.dot(ec); if (p >= 0 && f <= p) return t.copy(i); let m = f * c - s * p; if (m <= 0 && c >= 0 && p <= 0) return o = c / (c - p), t.copy(n).addScaledVector(Xs, o); let h = l * p - f * u; if (h <= 0 && u - l >= 0 && f - p >= 0) return Zs.subVectors(i, r), o = (u - l) / (u - l + (f - p)), t.copy(r).addScaledVector(Zs, o); let g = 1 / (h + m + d); return a = m * g, o = d * g, t.copy(n).addScaledVector(Ys, a).addScaledVector(Xs, o) } equals(e) { return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c) } }, ac = class { constructor(e = new K(1 / 0, 1 / 0, 1 / 0), t = new K(-1 / 0, -1 / 0, -1 / 0)) { this.isBox3 = !0, this.min = e, this.max = t } set(e, t) { return this.min.copy(e), this.max.copy(t), this } setFromArray(e) { this.makeEmpty(); for (let t = 0, n = e.length; t < n; t += 3)this.expandByPoint(sc.fromArray(e, t)); return this } setFromBufferAttribute(e) { this.makeEmpty(); for (let t = 0, n = e.count; t < n; t++)this.expandByPoint(sc.fromBufferAttribute(e, t)); return this } setFromPoints(e) { this.makeEmpty(); for (let t = 0, n = e.length; t < n; t++)this.expandByPoint(e[t]); return this } setFromCenterAndSize(e, t) { let n = sc.copy(t).multiplyScalar(.5); return this.min.copy(e).sub(n), this.max.copy(e).add(n), this } setFromObject(e, t = !1) { return this.makeEmpty(), this.expandByObject(e, t) } clone() { return new this.constructor().copy(this) } copy(e) { return this.min.copy(e.min), this.max.copy(e.max), this } makeEmpty() { return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this } isEmpty() { return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z } getCenter(e) { return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(.5) } getSize(e) { return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min) } expandByPoint(e) { return this.min.min(e), this.max.max(e), this } expandByVector(e) { return this.min.sub(e), this.max.add(e), this } expandByScalar(e) { return this.min.addScalar(-e), this.max.addScalar(e), this } expandByObject(e, t = !1) { e.updateWorldMatrix(!1, !1); let n = e.geometry; if (n !== void 0) { let r = n.getAttribute(`position`); if (t === !0 && r !== void 0 && e.isInstancedMesh !== !0) for (let t = 0, n = r.count; t < n; t++)e.isMesh === !0 ? e.getVertexPosition(t, sc) : sc.fromBufferAttribute(r, t), sc.applyMatrix4(e.matrixWorld), this.expandByPoint(sc); else e.boundingBox === void 0 ? (n.boundingBox === null && n.computeBoundingBox(), cc.copy(n.boundingBox)) : (e.boundingBox === null && e.computeBoundingBox(), cc.copy(e.boundingBox)), cc.applyMatrix4(e.matrixWorld), this.union(cc) } let r = e.children; for (let e = 0, n = r.length; e < n; e++)this.expandByObject(r[e], t); return this } containsPoint(e) { return e.x >= this.min.x && e.x <= this.max.x && e.y >= this.min.y && e.y <= this.max.y && e.z >= this.min.z && e.z <= this.max.z } containsBox(e) { return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z } getParameter(e, t) { return t.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y), (e.z - this.min.z) / (this.max.z - this.min.z)) } intersectsBox(e) { return e.max.x >= this.min.x && e.min.x <= this.max.x && e.max.y >= this.min.y && e.min.y <= this.max.y && e.max.z >= this.min.z && e.min.z <= this.max.z } intersectsSphere(e) { return this.clampPoint(e.center, sc), sc.distanceToSquared(e.center) <= e.radius * e.radius } intersectsPlane(e) { let t, n; return e.normal.x > 0 ? (t = e.normal.x * this.min.x, n = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, n = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, n += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, n += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, n += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, n += e.normal.z * this.min.z), t <= -e.constant && n >= -e.constant } intersectsTriangle(e) { if (this.isEmpty()) return !1; this.getCenter(hc), gc.subVectors(this.max, hc), lc.subVectors(e.a, hc), uc.subVectors(e.b, hc), dc.subVectors(e.c, hc), fc.subVectors(uc, lc), pc.subVectors(dc, uc), mc.subVectors(lc, dc); let t = [0, -fc.z, fc.y, 0, -pc.z, pc.y, 0, -mc.z, mc.y, fc.z, 0, -fc.x, pc.z, 0, -pc.x, mc.z, 0, -mc.x, -fc.y, fc.x, 0, -pc.y, pc.x, 0, -mc.y, mc.x, 0]; return !yc(t, lc, uc, dc, gc) || (t = [1, 0, 0, 0, 1, 0, 0, 0, 1], !yc(t, lc, uc, dc, gc)) ? !1 : (_c.crossVectors(fc, pc), t = [_c.x, _c.y, _c.z], yc(t, lc, uc, dc, gc)) } clampPoint(e, t) { return t.copy(e).clamp(this.min, this.max) } distanceToPoint(e) { return this.clampPoint(e, sc).distanceTo(e) } getBoundingSphere(e) { return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), e.radius = this.getSize(sc).length() * .5), e } intersect(e) { return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this } union(e) { return this.min.min(e.min), this.max.max(e.max), this } applyMatrix4(e) { return this.isEmpty() ? this : (oc[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), oc[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), oc[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), oc[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), oc[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), oc[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), oc[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), oc[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(oc), this) } translate(e) { return this.min.add(e), this.max.add(e), this } equals(e) { return e.min.equals(this.min) && e.max.equals(this.max) } toJSON() { return { min: this.min.toArray(), max: this.max.toArray() } } fromJSON(e) { return this.min.fromArray(e.min), this.max.fromArray(e.max), this } }, oc = [new K, new K, new K, new K, new K, new K, new K, new K], sc = new K, cc = new ac, lc = new K, uc = new K, dc = new K, fc = new K, pc = new K, mc = new K, hc = new K, gc = new K, _c = new K, vc = new K; function yc(e, t, n, r, i) { for (let a = 0, o = e.length - 3; a <= o; a += 3) { vc.fromArray(e, a); let o = i.x * Math.abs(vc.x) + i.y * Math.abs(vc.y) + i.z * Math.abs(vc.z), s = t.dot(vc), c = n.dot(vc), l = r.dot(vc); if (Math.max(-Math.max(s, c, l), Math.min(s, c, l)) > o) return !1 } return !0 } var bc = xc(); function xc() { let e = new ArrayBuffer(4), t = new Float32Array(e), n = new Uint32Array(e), r = new Uint32Array(512), i = new Uint32Array(512); for (let e = 0; e < 256; ++e) { let t = e - 127; t < -27 ? (r[e] = 0, r[e | 256] = 32768, i[e] = 24, i[e | 256] = 24) : t < -14 ? (r[e] = 1024 >> -t - 14, r[e | 256] = 1024 >> -t - 14 | 32768, i[e] = -t - 1, i[e | 256] = -t - 1) : t <= 15 ? (r[e] = t + 15 << 10, r[e | 256] = t + 15 << 10 | 32768, i[e] = 13, i[e | 256] = 13) : t < 128 ? (r[e] = 31744, r[e | 256] = 64512, i[e] = 24, i[e | 256] = 24) : (r[e] = 31744, r[e | 256] = 64512, i[e] = 13, i[e | 256] = 13) } let a = new Uint32Array(2048), o = new Uint32Array(64), s = new Uint32Array(64); for (let e = 1; e < 1024; ++e) { let t = e << 13, n = 0; for (; !(t & 8388608);)t <<= 1, n -= 8388608; t &= -8388609, n += 947912704, a[e] = t | n } for (let e = 1024; e < 2048; ++e)a[e] = 939524096 + (e - 1024 << 13); for (let e = 1; e < 31; ++e)o[e] = e << 23; o[31] = 1199570944, o[32] = 2147483648; for (let e = 33; e < 63; ++e)o[e] = 2147483648 + (e - 32 << 23); o[63] = 3347054592; for (let e = 1; e < 64; ++e)e !== 32 && (s[e] = 1024); return { floatView: t, uint32View: n, baseTable: r, shiftTable: i, mantissaTable: a, exponentTable: o, offsetTable: s } } function Sc(e) { Math.abs(e) > 65504 && H(`DataUtils.toHalfFloat(): Value out of range.`), e = W(e, -65504, 65504), bc.floatView[0] = e; let t = bc.uint32View[0], n = t >> 23 & 511; return bc.baseTable[n] + ((t & 8388607) >> bc.shiftTable[n]) } function Cc(e) { let t = e >> 10; return bc.uint32View[0] = bc.mantissaTable[bc.offsetTable[t] + (e & 1023)] + bc.exponentTable[t], bc.floatView[0] } var wc = class { static toHalfFloat(e) { return Sc(e) } static fromHalfFloat(e) { return Cc(e) } }, Tc = new K, Ec = new G, Dc = 0, Oc = class extends mo { constructor(e, t, n = !1) { if (super(), Array.isArray(e)) throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`); this.isBufferAttribute = !0, Object.defineProperty(this, `id`, { value: Dc++ }), this.name = ``, this.array = e, this.itemSize = t, this.count = e === void 0 ? 0 : e.length / t, this.normalized = n, this.usage = eo, this.updateRanges = [], this.gpuType = Ri, this.version = 0 } onUploadCallback() { } set needsUpdate(e) { e === !0 && this.version++ } setUsage(e) { return this.usage = e, this } addUpdateRange(e, t) { this.updateRanges.push({ start: e, count: t }) } clearUpdateRanges() { this.updateRanges.length = 0 } copy(e) { return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this.gpuType = e.gpuType, this } copyAt(e, t, n) { e *= this.itemSize, n *= t.itemSize; for (let r = 0, i = this.itemSize; r < i; r++)this.array[e + r] = t.array[n + r]; return this } copyArray(e) { return this.array.set(e), this } applyMatrix3(e) { if (this.itemSize === 2) for (let t = 0, n = this.count; t < n; t++)Ec.fromBufferAttribute(this, t), Ec.applyMatrix3(e), this.setXY(t, Ec.x, Ec.y); else if (this.itemSize === 3) for (let t = 0, n = this.count; t < n; t++)Tc.fromBufferAttribute(this, t), Tc.applyMatrix3(e), this.setXYZ(t, Tc.x, Tc.y, Tc.z); return this } applyMatrix4(e) { for (let t = 0, n = this.count; t < n; t++)Tc.fromBufferAttribute(this, t), Tc.applyMatrix4(e), this.setXYZ(t, Tc.x, Tc.y, Tc.z); return this } applyNormalMatrix(e) { for (let t = 0, n = this.count; t < n; t++)Tc.fromBufferAttribute(this, t), Tc.applyNormalMatrix(e), this.setXYZ(t, Tc.x, Tc.y, Tc.z); return this } transformDirection(e) { for (let t = 0, n = this.count; t < n; t++)Tc.fromBufferAttribute(this, t), Tc.transformDirection(e), this.setXYZ(t, Tc.x, Tc.y, Tc.z); return this } set(e, t = 0) { return this.array.set(e, t), this } getComponent(e, t) { let n = this.array[e * this.itemSize + t]; return this.normalized && (n = Ro(n, this.array)), n } setComponent(e, t, n) { return this.normalized && (n = zo(n, this.array)), this.array[e * this.itemSize + t] = n, this } getX(e) { let t = this.array[e * this.itemSize]; return this.normalized && (t = Ro(t, this.array)), t } setX(e, t) { return this.normalized && (t = zo(t, this.array)), this.array[e * this.itemSize] = t, this } getY(e) { let t = this.array[e * this.itemSize + 1]; return this.normalized && (t = Ro(t, this.array)), t } setY(e, t) { return this.normalized && (t = zo(t, this.array)), this.array[e * this.itemSize + 1] = t, this } getZ(e) { let t = this.array[e * this.itemSize + 2]; return this.normalized && (t = Ro(t, this.array)), t } setZ(e, t) { return this.normalized && (t = zo(t, this.array)), this.array[e * this.itemSize + 2] = t, this } getW(e) { let t = this.array[e * this.itemSize + 3]; return this.normalized && (t = Ro(t, this.array)), t } setW(e, t) { return this.normalized && (t = zo(t, this.array)), this.array[e * this.itemSize + 3] = t, this } setXY(e, t, n) { return e *= this.itemSize, this.normalized && (t = zo(t, this.array), n = zo(n, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this } setXYZ(e, t, n, r) { return e *= this.itemSize, this.normalized && (t = zo(t, this.array), n = zo(n, this.array), r = zo(r, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this } setXYZW(e, t, n, r, i) { return e *= this.itemSize, this.normalized && (t = zo(t, this.array), n = zo(n, this.array), r = zo(r, this.array), i = zo(i, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this.array[e + 3] = i, this } onUpload(e) { return this.onUploadCallback = e, this } clone() { return new this.constructor(this.array, this.itemSize).copy(this) } toJSON() { let e = { itemSize: this.itemSize, type: this.array.constructor.name, array: Array.from(this.array), normalized: this.normalized }; return this.name !== `` && (e.name = this.name), this.usage !== 35044 && (e.usage = this.usage), e } dispose() { this.dispatchEvent({ type: `dispose` }) } }, kc = class extends Oc { constructor(e, t, n) { super(new Uint16Array(e), t, n) } }, Ac = class extends Oc { constructor(e, t, n) { super(new Uint32Array(e), t, n) } }, jc = class extends Oc { constructor(e, t, n) { super(new Float32Array(e), t, n) } }, Mc = new ac, Nc = new K, Pc = new K, Fc = class { constructor(e = new K, t = -1) { this.isSphere = !0, this.center = e, this.radius = t } set(e, t) { return this.center.copy(e), this.radius = t, this } setFromPoints(e, t) { let n = this.center; t === void 0 ? Mc.setFromPoints(e).getCenter(n) : n.copy(t); let r = 0; for (let t = 0, i = e.length; t < i; t++)r = Math.max(r, n.distanceToSquared(e[t])); return this.radius = Math.sqrt(r), this } copy(e) { return this.center.copy(e.center), this.radius = e.radius, this } isEmpty() { return this.radius < 0 } makeEmpty() { return this.center.set(0, 0, 0), this.radius = -1, this } containsPoint(e) { return e.distanceToSquared(this.center) <= this.radius * this.radius } distanceToPoint(e) { return e.distanceTo(this.center) - this.radius } intersectsSphere(e) { let t = this.radius + e.radius; return e.center.distanceToSquared(this.center) <= t * t } intersectsBox(e) { return e.intersectsSphere(this) } intersectsPlane(e) { return Math.abs(e.distanceToPoint(this.center)) <= this.radius } clampPoint(e, t) { let n = this.center.distanceToSquared(e); return t.copy(e), n > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t } getBoundingBox(e) { return this.isEmpty() ? (e.makeEmpty(), e) : (e.set(this.center, this.center), e.expandByScalar(this.radius), e) } applyMatrix4(e) { return this.center.applyMatrix4(e), this.radius *= e.getMaxScaleOnAxis(), this } translate(e) { return this.center.add(e), this } expandByPoint(e) { if (this.isEmpty()) return this.center.copy(e), this.radius = 0, this; Nc.subVectors(e, this.center); let t = Nc.lengthSq(); if (t > this.radius * this.radius) { let e = Math.sqrt(t), n = (e - this.radius) * .5; this.center.addScaledVector(Nc, n / e), this.radius += n } return this } union(e) { return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (this.center.equals(e.center) === !0 ? this.radius = Math.max(this.radius, e.radius) : (Pc.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(Nc.copy(e.center).add(Pc)), this.expandByPoint(Nc.copy(e.center).sub(Pc))), this) } equals(e) { return e.center.equals(this.center) && e.radius === this.radius } clone() { return new this.constructor().copy(this) } toJSON() { return { radius: this.radius, center: this.center.toArray() } } fromJSON(e) { return this.radius = e.radius, this.center.fromArray(e.center), this } }, Ic = 0, Lc = new Y, Rc = new Fs, zc = new K, Bc = new ac, Vc = new ac, Hc = new K, Uc = class e extends mo { constructor() { super(), this.isBufferGeometry = !0, Object.defineProperty(this, `id`, { value: Ic++ }), this.uuid = yo(), this.name = ``, this.type = `BufferGeometry`, this.index = null, this.indirect = null, this.indirectOffset = 0, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {} } getIndex() { return this.index } setIndex(e) { return Array.isArray(e) ? this.index = new (no(e) ? Ac : kc)(e, 1) : this.index = e, this } setIndirect(e, t = 0) { return this.indirect = e, this.indirectOffset = t, this } getIndirect() { return this.indirect } getAttribute(e) { return this.attributes[e] } setAttribute(e, t) { return this.attributes[e] = t, this } deleteAttribute(e) { return delete this.attributes[e], this } hasAttribute(e) { return this.attributes[e] !== void 0 } addGroup(e, t, n = 0) { this.groups.push({ start: e, count: t, materialIndex: n }) } clearGroups() { this.groups = [] } setDrawRange(e, t) { this.drawRange.start = e, this.drawRange.count = t } applyMatrix4(e) { let t = this.attributes.position; t !== void 0 && (t.applyMatrix4(e), t.needsUpdate = !0); let n = this.attributes.normal; if (n !== void 0) { let t = new q().getNormalMatrix(e); n.applyNormalMatrix(t), n.needsUpdate = !0 } let r = this.attributes.tangent; return r !== void 0 && (r.transformDirection(e), r.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this } applyQuaternion(e) { return Lc.makeRotationFromQuaternion(e), this.applyMatrix4(Lc), this } rotateX(e) { return Lc.makeRotationX(e), this.applyMatrix4(Lc), this } rotateY(e) { return Lc.makeRotationY(e), this.applyMatrix4(Lc), this } rotateZ(e) { return Lc.makeRotationZ(e), this.applyMatrix4(Lc), this } translate(e, t, n) { return Lc.makeTranslation(e, t, n), this.applyMatrix4(Lc), this } scale(e, t, n) { return Lc.makeScale(e, t, n), this.applyMatrix4(Lc), this } lookAt(e) { return Rc.lookAt(e), Rc.updateMatrix(), this.applyMatrix4(Rc.matrix), this } center() { return this.computeBoundingBox(), this.boundingBox.getCenter(zc).negate(), this.translate(zc.x, zc.y, zc.z), this } setFromPoints(e) { let t = this.getAttribute(`position`); if (t === void 0) { let t = []; for (let n = 0, r = e.length; n < r; n++) { let r = e[n]; t.push(r.x, r.y, r.z || 0) } this.setAttribute(`position`, new jc(t, 3)) } else { let n = Math.min(e.length, t.count); for (let r = 0; r < n; r++) { let n = e[r]; t.setXYZ(r, n.x, n.y, n.z || 0) } e.length > t.count && H(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`), t.needsUpdate = !0 } return this } computeBoundingBox() { this.boundingBox === null && (this.boundingBox = new ac); let e = this.attributes.position, t = this.morphAttributes.position; if (e && e.isGLBufferAttribute) { U(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`, this), this.boundingBox.set(new K(-1 / 0, -1 / 0, -1 / 0), new K(1 / 0, 1 / 0, 1 / 0)); return } if (e !== void 0) { if (this.boundingBox.setFromBufferAttribute(e), t) for (let e = 0, n = t.length; e < n; e++) { let n = t[e]; Bc.setFromBufferAttribute(n), this.morphTargetsRelative ? (Hc.addVectors(this.boundingBox.min, Bc.min), this.boundingBox.expandByPoint(Hc), Hc.addVectors(this.boundingBox.max, Bc.max), this.boundingBox.expandByPoint(Hc)) : (this.boundingBox.expandByPoint(Bc.min), this.boundingBox.expandByPoint(Bc.max)) } } else this.boundingBox.makeEmpty(); (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && U(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`, this) } computeBoundingSphere() { this.boundingSphere === null && (this.boundingSphere = new Fc); let e = this.attributes.position, t = this.morphAttributes.position; if (e && e.isGLBufferAttribute) { U(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`, this), this.boundingSphere.set(new K, 1 / 0); return } if (e) { let n = this.boundingSphere.center; if (Bc.setFromBufferAttribute(e), t) for (let e = 0, n = t.length; e < n; e++) { let n = t[e]; Vc.setFromBufferAttribute(n), this.morphTargetsRelative ? (Hc.addVectors(Bc.min, Vc.min), Bc.expandByPoint(Hc), Hc.addVectors(Bc.max, Vc.max), Bc.expandByPoint(Hc)) : (Bc.expandByPoint(Vc.min), Bc.expandByPoint(Vc.max)) } Bc.getCenter(n); let r = 0; for (let t = 0, i = e.count; t < i; t++)Hc.fromBufferAttribute(e, t), r = Math.max(r, n.distanceToSquared(Hc)); if (t) for (let i = 0, a = t.length; i < a; i++) { let a = t[i], o = this.morphTargetsRelative; for (let t = 0, i = a.count; t < i; t++)Hc.fromBufferAttribute(a, t), o && (zc.fromBufferAttribute(e, t), Hc.add(zc)), r = Math.max(r, n.distanceToSquared(Hc)) } this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && U(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`, this) } } computeTangents() { let e = this.index, t = this.attributes; if (e === null || t.position === void 0 || t.normal === void 0 || t.uv === void 0) { U(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`); return } let n = t.position, r = t.normal, i = t.uv; this.hasAttribute(`tangent`) === !1 && this.setAttribute(`tangent`, new Oc(new Float32Array(4 * n.count), 4)); let a = this.getAttribute(`tangent`), o = [], s = []; for (let e = 0; e < n.count; e++)o[e] = new K, s[e] = new K; let c = new K, l = new K, u = new K, d = new G, f = new G, p = new G, m = new K, h = new K; function g(e, t, r) { c.fromBufferAttribute(n, e), l.fromBufferAttribute(n, t), u.fromBufferAttribute(n, r), d.fromBufferAttribute(i, e), f.fromBufferAttribute(i, t), p.fromBufferAttribute(i, r), l.sub(c), u.sub(c), f.sub(d), p.sub(d); let a = 1 / (f.x * p.y - p.x * f.y); isFinite(a) && (m.copy(l).multiplyScalar(p.y).addScaledVector(u, -f.y).multiplyScalar(a), h.copy(u).multiplyScalar(f.x).addScaledVector(l, -p.x).multiplyScalar(a), o[e].add(m), o[t].add(m), o[r].add(m), s[e].add(h), s[t].add(h), s[r].add(h)) } let _ = this.groups; _.length === 0 && (_ = [{ start: 0, count: e.count }]); for (let t = 0, n = _.length; t < n; ++t) { let n = _[t], r = n.start, i = n.count; for (let t = r, n = r + i; t < n; t += 3)g(e.getX(t + 0), e.getX(t + 1), e.getX(t + 2)) } let v = new K, y = new K, b = new K, x = new K; function S(e) { b.fromBufferAttribute(r, e), x.copy(b); let t = o[e]; v.copy(t), v.sub(b.multiplyScalar(b.dot(t))).normalize(), y.crossVectors(x, t); let n = y.dot(s[e]) < 0 ? -1 : 1; a.setXYZW(e, v.x, v.y, v.z, n) } for (let t = 0, n = _.length; t < n; ++t) { let n = _[t], r = n.start, i = n.count; for (let t = r, n = r + i; t < n; t += 3)S(e.getX(t + 0)), S(e.getX(t + 1)), S(e.getX(t + 2)) } } computeVertexNormals() { let e = this.index, t = this.getAttribute(`position`); if (t !== void 0) { let n = this.getAttribute(`normal`); if (n === void 0) n = new Oc(new Float32Array(t.count * 3), 3), this.setAttribute(`normal`, n); else for (let e = 0, t = n.count; e < t; e++)n.setXYZ(e, 0, 0, 0); let r = new K, i = new K, a = new K, o = new K, s = new K, c = new K, l = new K, u = new K; if (e) for (let d = 0, f = e.count; d < f; d += 3) { let f = e.getX(d + 0), p = e.getX(d + 1), m = e.getX(d + 2); r.fromBufferAttribute(t, f), i.fromBufferAttribute(t, p), a.fromBufferAttribute(t, m), l.subVectors(a, i), u.subVectors(r, i), l.cross(u), o.fromBufferAttribute(n, f), s.fromBufferAttribute(n, p), c.fromBufferAttribute(n, m), o.add(l), s.add(l), c.add(l), n.setXYZ(f, o.x, o.y, o.z), n.setXYZ(p, s.x, s.y, s.z), n.setXYZ(m, c.x, c.y, c.z) } else for (let e = 0, o = t.count; e < o; e += 3)r.fromBufferAttribute(t, e + 0), i.fromBufferAttribute(t, e + 1), a.fromBufferAttribute(t, e + 2), l.subVectors(a, i), u.subVectors(r, i), l.cross(u), n.setXYZ(e + 0, l.x, l.y, l.z), n.setXYZ(e + 1, l.x, l.y, l.z), n.setXYZ(e + 2, l.x, l.y, l.z); this.normalizeNormals(), n.needsUpdate = !0 } } normalizeNormals() { let e = this.attributes.normal; for (let t = 0, n = e.count; t < n; t++)Hc.fromBufferAttribute(e, t), Hc.normalize(), e.setXYZ(t, Hc.x, Hc.y, Hc.z) } toNonIndexed() { function t(e, t) { let n = e.array, r = e.itemSize, i = e.normalized, a = new n.constructor(t.length * r), o = 0, s = 0; for (let i = 0, c = t.length; i < c; i++) { o = e.isInterleavedBufferAttribute ? t[i] * e.data.stride + e.offset : t[i] * r; for (let e = 0; e < r; e++)a[s++] = n[o++] } return new Oc(a, r, i) } if (this.index === null) return H(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`), this; let n = new e, r = this.index.array, i = this.attributes; for (let e in i) { let a = i[e], o = t(a, r); n.setAttribute(e, o) } let a = this.morphAttributes; for (let e in a) { let i = [], o = a[e]; for (let e = 0, n = o.length; e < n; e++) { let n = o[e], a = t(n, r); i.push(a) } n.morphAttributes[e] = i } n.morphTargetsRelative = this.morphTargetsRelative; let o = this.groups; for (let e = 0, t = o.length; e < t; e++) { let t = o[e]; n.addGroup(t.start, t.count, t.materialIndex) } return n } toJSON() { let e = { metadata: { version: 4.7, type: `BufferGeometry`, generator: `BufferGeometry.toJSON` } }; if (e.uuid = this.uuid, e.type = this.type, this.name !== `` && (e.name = this.name), Object.keys(this.userData).length > 0 && (e.userData = this.userData), this.parameters !== void 0) { let t = this.parameters; for (let n in t) t[n] !== void 0 && (e[n] = t[n]); return e } e.data = { attributes: {} }; let t = this.index; t !== null && (e.data.index = { type: t.array.constructor.name, array: Array.prototype.slice.call(t.array) }); let n = this.attributes; for (let t in n) { let r = n[t]; e.data.attributes[t] = r.toJSON(e.data) } let r = {}, i = !1; for (let t in this.morphAttributes) { let n = this.morphAttributes[t], a = []; for (let t = 0, r = n.length; t < r; t++) { let r = n[t]; a.push(r.toJSON(e.data)) } a.length > 0 && (r[t] = a, i = !0) } i && (e.data.morphAttributes = r, e.data.morphTargetsRelative = this.morphTargetsRelative); let a = this.groups; a.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(a))); let o = this.boundingSphere; return o !== null && (e.data.boundingSphere = o.toJSON()), e } clone() { return new this.constructor().copy(this) } copy(e) { this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null; let t = {}; this.name = e.name; let n = e.index; n !== null && this.setIndex(n.clone()); let r = e.attributes; for (let e in r) { let n = r[e]; this.setAttribute(e, n.clone(t)) } let i = e.morphAttributes; for (let e in i) { let n = [], r = i[e]; for (let e = 0, i = r.length; e < i; e++)n.push(r[e].clone(t)); this.morphAttributes[e] = n } this.morphTargetsRelative = e.morphTargetsRelative; let a = e.groups; for (let e = 0, t = a.length; e < t; e++) { let t = a[e]; this.addGroup(t.start, t.count, t.materialIndex) } let o = e.boundingBox; o !== null && (this.boundingBox = o.clone()); let s = e.boundingSphere; return s !== null && (this.boundingSphere = s.clone()), this.drawRange.start = e.drawRange.start, this.drawRange.count = e.drawRange.count, this.userData = e.userData, this } dispose() { this.dispatchEvent({ type: `dispose` }) } }, Wc = class { constructor(e, t) { this.isInterleavedBuffer = !0, this.array = e, this.stride = t, this.count = e === void 0 ? 0 : e.length / t, this.usage = eo, this.updateRanges = [], this.version = 0, this.uuid = yo() } onUploadCallback() { } set needsUpdate(e) { e === !0 && this.version++ } setUsage(e) { return this.usage = e, this } addUpdateRange(e, t) { this.updateRanges.push({ start: e, count: t }) } clearUpdateRanges() { this.updateRanges.length = 0 } copy(e) { return this.array = new e.array.constructor(e.array), this.count = e.count, this.stride = e.stride, this.usage = e.usage, this } copyAt(e, t, n) { e *= this.stride, n *= t.stride; for (let r = 0, i = this.stride; r < i; r++)this.array[e + r] = t.array[n + r]; return this } set(e, t = 0) { return this.array.set(e, t), this } clone(e) { e.arrayBuffers === void 0 && (e.arrayBuffers = {}), this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = yo()), e.arrayBuffers[this.array.buffer._uuid] === void 0 && (e.arrayBuffers[this.array.buffer._uuid] = this.array.slice(0).buffer); let t = new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]), n = new this.constructor(t, this.stride); return n.setUsage(this.usage), n } onUpload(e) { return this.onUploadCallback = e, this } toJSON(e) { return e.arrayBuffers === void 0 && (e.arrayBuffers = {}), this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = yo()), e.arrayBuffers[this.array.buffer._uuid] === void 0 && (e.arrayBuffers[this.array.buffer._uuid] = Array.from(new Uint32Array(this.array.buffer))), { uuid: this.uuid, buffer: this.array.buffer._uuid, type: this.array.constructor.name, stride: this.stride } } }, Gc = new K, Kc = class e { constructor(e, t, n, r = !1) { this.isInterleavedBufferAttribute = !0, this.name = ``, this.data = e, this.itemSize = t, this.offset = n, this.normalized = r } get count() { return this.data.count } get array() { return this.data.array } set needsUpdate(e) { this.data.needsUpdate = e } applyMatrix4(e) { for (let t = 0, n = this.data.count; t < n; t++)Gc.fromBufferAttribute(this, t), Gc.applyMatrix4(e), this.setXYZ(t, Gc.x, Gc.y, Gc.z); return this } applyNormalMatrix(e) { for (let t = 0, n = this.count; t < n; t++)Gc.fromBufferAttribute(this, t), Gc.applyNormalMatrix(e), this.setXYZ(t, Gc.x, Gc.y, Gc.z); return this } transformDirection(e) { for (let t = 0, n = this.count; t < n; t++)Gc.fromBufferAttribute(this, t), Gc.transformDirection(e), this.setXYZ(t, Gc.x, Gc.y, Gc.z); return this } getComponent(e, t) { let n = this.array[e * this.data.stride + this.offset + t]; return this.normalized && (n = Ro(n, this.array)), n } setComponent(e, t, n) { return this.normalized && (n = zo(n, this.array)), this.data.array[e * this.data.stride + this.offset + t] = n, this } setX(e, t) { return this.normalized && (t = zo(t, this.array)), this.data.array[e * this.data.stride + this.offset] = t, this } setY(e, t) { return this.normalized && (t = zo(t, this.array)), this.data.array[e * this.data.stride + this.offset + 1] = t, this } setZ(e, t) { return this.normalized && (t = zo(t, this.array)), this.data.array[e * this.data.stride + this.offset + 2] = t, this } setW(e, t) { return this.normalized && (t = zo(t, this.array)), this.data.array[e * this.data.stride + this.offset + 3] = t, this } getX(e) { let t = this.data.array[e * this.data.stride + this.offset]; return this.normalized && (t = Ro(t, this.array)), t } getY(e) { let t = this.data.array[e * this.data.stride + this.offset + 1]; return this.normalized && (t = Ro(t, this.array)), t } getZ(e) { let t = this.data.array[e * this.data.stride + this.offset + 2]; return this.normalized && (t = Ro(t, this.array)), t } getW(e) { let t = this.data.array[e * this.data.stride + this.offset + 3]; return this.normalized && (t = Ro(t, this.array)), t } setXY(e, t, n) { return e = e * this.data.stride + this.offset, this.normalized && (t = zo(t, this.array), n = zo(n, this.array)), this.data.array[e + 0] = t, this.data.array[e + 1] = n, this } setXYZ(e, t, n, r) { return e = e * this.data.stride + this.offset, this.normalized && (t = zo(t, this.array), n = zo(n, this.array), r = zo(r, this.array)), this.data.array[e + 0] = t, this.data.array[e + 1] = n, this.data.array[e + 2] = r, this } setXYZW(e, t, n, r, i) { return e = e * this.data.stride + this.offset, this.normalized && (t = zo(t, this.array), n = zo(n, this.array), r = zo(r, this.array), i = zo(i, this.array)), this.data.array[e + 0] = t, this.data.array[e + 1] = n, this.data.array[e + 2] = r, this.data.array[e + 3] = i, this } clone(t) { if (t === void 0) { co(`InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`); let e = []; for (let t = 0; t < this.count; t++) { let n = t * this.data.stride + this.offset; for (let t = 0; t < this.itemSize; t++)e.push(this.data.array[n + t]) } return new Oc(new this.array.constructor(e), this.itemSize, this.normalized) } else return t.interleavedBuffers === void 0 && (t.interleavedBuffers = {}), t.interleavedBuffers[this.data.uuid] === void 0 && (t.interleavedBuffers[this.data.uuid] = this.data.clone(t)), new e(t.interleavedBuffers[this.data.uuid], this.itemSize, this.offset, this.normalized) } toJSON(e) { if (e === void 0) { co(`InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`); let e = []; for (let t = 0; t < this.count; t++) { let n = t * this.data.stride + this.offset; for (let t = 0; t < this.itemSize; t++)e.push(this.data.array[n + t]) } return { itemSize: this.itemSize, type: this.array.constructor.name, array: e, normalized: this.normalized } } else return e.interleavedBuffers === void 0 && (e.interleavedBuffers = {}), e.interleavedBuffers[this.data.uuid] === void 0 && (e.interleavedBuffers[this.data.uuid] = this.data.toJSON(e)), { isInterleavedBufferAttribute: !0, itemSize: this.itemSize, data: this.data.uuid, offset: this.offset, normalized: this.normalized } } }, qc = 0, Jc = class extends mo { constructor() { super(), this.isMaterial = !0, Object.defineProperty(this, `id`, { value: qc++ }), this.uuid = yo(), this.name = ``, this.type = `Material`, this.blending = 1, this.side = 0, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = 204, this.blendDst = 205, this.blendEquation = 100, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new X(0, 0, 0), this.blendAlpha = 0, this.depthFunc = 3, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = 519, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = $a, this.stencilZFail = $a, this.stencilZPass = $a, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.allowOverride = !0, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0 } get alphaTest() { return this._alphaTest } set alphaTest(e) { this._alphaTest > 0 != e > 0 && this.version++, this._alphaTest = e } onBeforeRender() { } onBeforeCompile() { } customProgramCacheKey() { return this.onBeforeCompile.toString() } setValues(e) { if (e !== void 0) for (let t in e) { let n = e[t]; if (n === void 0) { H(`Material: parameter '${t}' has value of undefined.`); continue } let r = this[t]; if (r === void 0) { H(`Material: '${t}' is not a property of THREE.${this.type}.`); continue } r && r.isColor ? r.set(n) : r && r.isVector3 && n && n.isVector3 ? r.copy(n) : this[t] = n } } toJSON(e) { let t = e === void 0 || typeof e == `string`; t && (e = { textures: {}, images: {} }); let n = { metadata: { version: 4.7, type: `Material`, generator: `Material.toJSON` } }; n.uuid = this.uuid, n.type = this.type, this.name !== `` && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== void 0 && (n.roughness = this.roughness), this.metalness !== void 0 && (n.metalness = this.metalness), this.sheen !== void 0 && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (n.shininess = this.shininess), this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.sheenColorMap && this.sheenColorMap.isTexture && (n.sheenColorMap = this.sheenColorMap.toJSON(e).uuid), this.sheenRoughnessMap && this.sheenRoughnessMap.isTexture && (n.sheenRoughnessMap = this.sheenRoughnessMap.toJSON(e).uuid), this.dispersion !== void 0 && (n.dispersion = this.dispersion), this.iridescence !== void 0 && (n.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (n.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(e).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid), this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(e).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(e).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(e).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(e).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(e).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(e).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(e).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(e).uuid, this.combine !== void 0 && (n.combine = this.combine)), this.envMapRotation !== void 0 && (n.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(e).uuid), this.transmission !== void 0 && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(e).uuid), this.thickness !== void 0 && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(e).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (n.size = this.size), this.shadowSide !== null && (n.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation), this.blending !== 1 && (n.blending = this.blending), this.side !== 0 && (n.side = this.side), this.vertexColors === !0 && (n.vertexColors = !0), this.opacity < 1 && (n.opacity = this.opacity), this.transparent === !0 && (n.transparent = !0), this.blendSrc !== 204 && (n.blendSrc = this.blendSrc), this.blendDst !== 205 && (n.blendDst = this.blendDst), this.blendEquation !== 100 && (n.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (n.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (n.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (n.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (n.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (n.blendAlpha = this.blendAlpha), this.depthFunc !== 3 && (n.depthFunc = this.depthFunc), this.depthTest === !1 && (n.depthTest = this.depthTest), this.depthWrite === !1 && (n.depthWrite = this.depthWrite), this.colorWrite === !1 && (n.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (n.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== 519 && (n.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (n.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (n.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== 7680 && (n.stencilFail = this.stencilFail), this.stencilZFail !== 7680 && (n.stencilZFail = this.stencilZFail), this.stencilZPass !== 7680 && (n.stencilZPass = this.stencilZPass), this.stencilWrite === !0 && (n.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (n.rotation = this.rotation), this.polygonOffset === !0 && (n.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (n.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (n.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (n.linewidth = this.linewidth), this.dashSize !== void 0 && (n.dashSize = this.dashSize), this.gapSize !== void 0 && (n.gapSize = this.gapSize), this.scale !== void 0 && (n.scale = this.scale), this.dithering === !0 && (n.dithering = !0), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), this.alphaHash === !0 && (n.alphaHash = !0), this.alphaToCoverage === !0 && (n.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (n.premultipliedAlpha = !0), this.forceSinglePass === !0 && (n.forceSinglePass = !0), this.allowOverride === !1 && (n.allowOverride = !1), this.wireframe === !0 && (n.wireframe = !0), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== `round` && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== `round` && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (n.flatShading = !0), this.visible === !1 && (n.visible = !1), this.toneMapped === !1 && (n.toneMapped = !1), this.fog === !1 && (n.fog = !1), Object.keys(this.userData).length > 0 && (n.userData = this.userData); function r(e) { let t = []; for (let n in e) { let r = e[n]; delete r.metadata, t.push(r) } return t } if (t) { let t = r(e.textures), i = r(e.images); t.length > 0 && (n.textures = t), i.length > 0 && (n.images = i) } return n } clone() { return new this.constructor().copy(this) } copy(e) { this.name = e.name, this.blending = e.blending, this.side = e.side, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.blendColor.copy(e.blendColor), this.blendAlpha = e.blendAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite; let t = e.clippingPlanes, n = null; if (t !== null) { let e = t.length; n = Array(e); for (let r = 0; r !== e; ++r)n[r] = t[r].clone() } return this.clippingPlanes = n, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.alphaHash = e.alphaHash, this.alphaToCoverage = e.alphaToCoverage, this.premultipliedAlpha = e.premultipliedAlpha, this.forceSinglePass = e.forceSinglePass, this.allowOverride = e.allowOverride, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this } dispose() { this.dispatchEvent({ type: `dispose` }) } set needsUpdate(e) { e === !0 && this.version++ } }, Yc = new K, Xc = new K, Zc = new K, Qc = new K, $c = new K, el = new K, tl = new K, nl = class { constructor(e = new K, t = new K(0, 0, -1)) { this.origin = e, this.direction = t } set(e, t) { return this.origin.copy(e), this.direction.copy(t), this } copy(e) { return this.origin.copy(e.origin), this.direction.copy(e.direction), this } at(e, t) { return t.copy(this.origin).addScaledVector(this.direction, e) } lookAt(e) { return this.direction.copy(e).sub(this.origin).normalize(), this } recast(e) { return this.origin.copy(this.at(e, Yc)), this } closestPointToPoint(e, t) { t.subVectors(e, this.origin); let n = t.dot(this.direction); return n < 0 ? t.copy(this.origin) : t.copy(this.origin).addScaledVector(this.direction, n) } distanceToPoint(e) { return Math.sqrt(this.distanceSqToPoint(e)) } distanceSqToPoint(e) { let t = Yc.subVectors(e, this.origin).dot(this.direction); return t < 0 ? this.origin.distanceToSquared(e) : (Yc.copy(this.origin).addScaledVector(this.direction, t), Yc.distanceToSquared(e)) } distanceSqToSegment(e, t, n, r) { Xc.copy(e).add(t).multiplyScalar(.5), Zc.copy(t).sub(e).normalize(), Qc.copy(this.origin).sub(Xc); let i = e.distanceTo(t) * .5, a = -this.direction.dot(Zc), o = Qc.dot(this.direction), s = -Qc.dot(Zc), c = Qc.lengthSq(), l = Math.abs(1 - a * a), u, d, f, p; if (l > 0) if (u = a * s - o, d = a * o - s, p = i * l, u >= 0) if (d >= -p) if (d <= p) { let e = 1 / l; u *= e, d *= e, f = u * (u + a * d + 2 * o) + d * (a * u + d + 2 * s) + c } else d = i, u = Math.max(0, -(a * d + o)), f = -u * u + d * (d + 2 * s) + c; else d = -i, u = Math.max(0, -(a * d + o)), f = -u * u + d * (d + 2 * s) + c; else d <= -p ? (u = Math.max(0, -(-a * i + o)), d = u > 0 ? -i : Math.min(Math.max(-i, -s), i), f = -u * u + d * (d + 2 * s) + c) : d <= p ? (u = 0, d = Math.min(Math.max(-i, -s), i), f = d * (d + 2 * s) + c) : (u = Math.max(0, -(a * i + o)), d = u > 0 ? i : Math.min(Math.max(-i, -s), i), f = -u * u + d * (d + 2 * s) + c); else d = a > 0 ? -i : i, u = Math.max(0, -(a * d + o)), f = -u * u + d * (d + 2 * s) + c; return n && n.copy(this.origin).addScaledVector(this.direction, u), r && r.copy(Xc).addScaledVector(Zc, d), f } intersectSphere(e, t) { Yc.subVectors(e.center, this.origin); let n = Yc.dot(this.direction), r = Yc.dot(Yc) - n * n, i = e.radius * e.radius; if (r > i) return null; let a = Math.sqrt(i - r), o = n - a, s = n + a; return s < 0 ? null : o < 0 ? this.at(s, t) : this.at(o, t) } intersectsSphere(e) { return e.radius < 0 ? !1 : this.distanceSqToPoint(e.center) <= e.radius * e.radius } distanceToPlane(e) { let t = e.normal.dot(this.direction); if (t === 0) return e.distanceToPoint(this.origin) === 0 ? 0 : null; let n = -(this.origin.dot(e.normal) + e.constant) / t; return n >= 0 ? n : null } intersectPlane(e, t) { let n = this.distanceToPlane(e); return n === null ? null : this.at(n, t) } intersectsPlane(e) { let t = e.distanceToPoint(this.origin); return t === 0 || e.normal.dot(this.direction) * t < 0 } intersectBox(e, t) { let n, r, i, a, o, s, c = 1 / this.direction.x, l = 1 / this.direction.y, u = 1 / this.direction.z, d = this.origin; return c >= 0 ? (n = (e.min.x - d.x) * c, r = (e.max.x - d.x) * c) : (n = (e.max.x - d.x) * c, r = (e.min.x - d.x) * c), l >= 0 ? (i = (e.min.y - d.y) * l, a = (e.max.y - d.y) * l) : (i = (e.max.y - d.y) * l, a = (e.min.y - d.y) * l), n > a || i > r || ((i > n || isNaN(n)) && (n = i), (a < r || isNaN(r)) && (r = a), u >= 0 ? (o = (e.min.z - d.z) * u, s = (e.max.z - d.z) * u) : (o = (e.max.z - d.z) * u, s = (e.min.z - d.z) * u), n > s || o > r) || ((o > n || n !== n) && (n = o), (s < r || r !== r) && (r = s), r < 0) ? null : this.at(n >= 0 ? n : r, t) } intersectsBox(e) { return this.intersectBox(e, Yc) !== null } intersectTriangle(e, t, n, r, i) { $c.subVectors(t, e), el.subVectors(n, e), tl.crossVectors($c, el); let a = this.direction.dot(tl), o; if (a > 0) { if (r) return null; o = 1 } else if (a < 0) o = -1, a = -a; else return null; Qc.subVectors(this.origin, e); let s = o * this.direction.dot(el.crossVectors(Qc, el)); if (s < 0) return null; let c = o * this.direction.dot($c.cross(Qc)); if (c < 0 || s + c > a) return null; let l = -o * Qc.dot(tl); return l < 0 ? null : this.at(l / a, i) } applyMatrix4(e) { return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this } equals(e) { return e.origin.equals(this.origin) && e.direction.equals(this.direction) } clone() { return new this.constructor().copy(this) } }, rl = class extends Jc { constructor(e) { super(), this.isMeshBasicMaterial = !0, this.type = `MeshBasicMaterial`, this.color = new X(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new vs, this.combine = 0, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = `round`, this.wireframeLinejoin = `round`, this.fog = !0, this.setValues(e) } copy(e) { return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this } }, il = new Y, al = new nl, ol = new Fc, sl = new K, cl = new K, ll = new K, ul = new K, dl = new K, fl = new K, pl = new K, ml = new K, hl = class extends Fs { constructor(e = new Uc, t = new rl) { super(), this.isMesh = !0, this.type = `Mesh`, this.geometry = e, this.material = t, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.count = 1, this.updateMorphTargets() } copy(e, t) { return super.copy(e, t), e.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = e.morphTargetInfluences.slice()), e.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this } updateMorphTargets() { let e = this.geometry.morphAttributes, t = Object.keys(e); if (t.length > 0) { let n = e[t[0]]; if (n !== void 0) { this.morphTargetInfluences = [], this.morphTargetDictionary = {}; for (let e = 0, t = n.length; e < t; e++) { let t = n[e].name || String(e); this.morphTargetInfluences.push(0), this.morphTargetDictionary[t] = e } } } } getVertexPosition(e, t) { let n = this.geometry, r = n.attributes.position, i = n.morphAttributes.position, a = n.morphTargetsRelative; t.fromBufferAttribute(r, e); let o = this.morphTargetInfluences; if (i && o) { fl.set(0, 0, 0); for (let n = 0, r = i.length; n < r; n++) { let r = o[n], s = i[n]; r !== 0 && (dl.fromBufferAttribute(s, e), a ? fl.addScaledVector(dl, r) : fl.addScaledVector(dl.sub(t), r)) } t.add(fl) } return t } raycast(e, t) { let n = this.geometry, r = this.material, i = this.matrixWorld; r !== void 0 && (n.boundingSphere === null && n.computeBoundingSphere(), ol.copy(n.boundingSphere), ol.applyMatrix4(i), al.copy(e.ray).recast(e.near), !(ol.containsPoint(al.origin) === !1 && (al.intersectSphere(ol, sl) === null || al.origin.distanceToSquared(sl) > (e.far - e.near) ** 2)) && (il.copy(i).invert(), al.copy(e.ray).applyMatrix4(il), !(n.boundingBox !== null && al.intersectsBox(n.boundingBox) === !1) && this._computeIntersections(e, t, al))) } _computeIntersections(e, t, n) { let r, i = this.geometry, a = this.material, o = i.index, s = i.attributes.position, c = i.attributes.uv, l = i.attributes.uv1, u = i.attributes.normal, d = i.groups, f = i.drawRange; if (o !== null) if (Array.isArray(a)) for (let i = 0, s = d.length; i < s; i++) { let s = d[i], p = a[s.materialIndex], m = Math.max(s.start, f.start), h = Math.min(o.count, Math.min(s.start + s.count, f.start + f.count)); for (let i = m, a = h; i < a; i += 3) { let a = o.getX(i), d = o.getX(i + 1), f = o.getX(i + 2); r = _l(this, p, e, n, c, l, u, a, d, f), r && (r.faceIndex = Math.floor(i / 3), r.face.materialIndex = s.materialIndex, t.push(r)) } } else { let i = Math.max(0, f.start), s = Math.min(o.count, f.start + f.count); for (let d = i, f = s; d < f; d += 3) { let i = o.getX(d), s = o.getX(d + 1), f = o.getX(d + 2); r = _l(this, a, e, n, c, l, u, i, s, f), r && (r.faceIndex = Math.floor(d / 3), t.push(r)) } } else if (s !== void 0) if (Array.isArray(a)) for (let i = 0, o = d.length; i < o; i++) { let o = d[i], p = a[o.materialIndex], m = Math.max(o.start, f.start), h = Math.min(s.count, Math.min(o.start + o.count, f.start + f.count)); for (let i = m, a = h; i < a; i += 3) { let a = i, s = i + 1, d = i + 2; r = _l(this, p, e, n, c, l, u, a, s, d), r && (r.faceIndex = Math.floor(i / 3), r.face.materialIndex = o.materialIndex, t.push(r)) } } else { let i = Math.max(0, f.start), o = Math.min(s.count, f.start + f.count); for (let s = i, d = o; s < d; s += 3) { let i = s, o = s + 1, d = s + 2; r = _l(this, a, e, n, c, l, u, i, o, d), r && (r.faceIndex = Math.floor(s / 3), t.push(r)) } } } }; function gl(e, t, n, r, i, a, o, s) { let c; if (c = t.side === 1 ? r.intersectTriangle(o, a, i, !0, s) : r.intersectTriangle(i, a, o, t.side === 0, s), c === null) return null; ml.copy(s), ml.applyMatrix4(e.matrixWorld); let l = n.ray.origin.distanceTo(ml); return l < n.near || l > n.far ? null : { distance: l, point: ml.clone(), object: e } } function _l(e, t, n, r, i, a, o, s, c, l) { e.getVertexPosition(s, cl), e.getVertexPosition(c, ll), e.getVertexPosition(l, ul); let u = gl(e, t, n, r, cl, ll, ul, pl); if (u) { let e = new K; ic.getBarycoord(pl, cl, ll, ul, e), i && (u.uv = ic.getInterpolatedAttribute(i, s, c, l, e, new G)), a && (u.uv1 = ic.getInterpolatedAttribute(a, s, c, l, e, new G)), o && (u.normal = ic.getInterpolatedAttribute(o, s, c, l, e, new K), u.normal.dot(r.direction) > 0 && u.normal.multiplyScalar(-1)); let t = { a: s, b: c, c: l, normal: new K, materialIndex: 0 }; ic.getNormal(cl, ll, ul, t.normal), u.face = t, u.barycoord = e } return u } var vl = new is, yl = new is, bl = new is, xl = new is, Sl = new Y, Cl = new K, wl = new Fc, Tl = new Y, El = new nl, Dl = class extends hl { constructor(e, t) { super(e, t), this.isSkinnedMesh = !0, this.type = `SkinnedMesh`, this.bindMode = Si, this.bindMatrix = new Y, this.bindMatrixInverse = new Y, this.boundingBox = null, this.boundingSphere = null } computeBoundingBox() { let e = this.geometry; this.boundingBox === null && (this.boundingBox = new ac), this.boundingBox.makeEmpty(); let t = e.getAttribute(`position`); for (let e = 0; e < t.count; e++)this.getVertexPosition(e, Cl), this.boundingBox.expandByPoint(Cl) } computeBoundingSphere() { let e = this.geometry; this.boundingSphere === null && (this.boundingSphere = new Fc), this.boundingSphere.makeEmpty(); let t = e.getAttribute(`position`); for (let e = 0; e < t.count; e++)this.getVertexPosition(e, Cl), this.boundingSphere.expandByPoint(Cl) } copy(e, t) { return super.copy(e, t), this.bindMode = e.bindMode, this.bindMatrix.copy(e.bindMatrix), this.bindMatrixInverse.copy(e.bindMatrixInverse), this.skeleton = e.skeleton, e.boundingBox !== null && (this.boundingBox = e.boundingBox.clone()), e.boundingSphere !== null && (this.boundingSphere = e.boundingSphere.clone()), this } raycast(e, t) { let n = this.material, r = this.matrixWorld; n !== void 0 && (this.boundingSphere === null && this.computeBoundingSphere(), wl.copy(this.boundingSphere), wl.applyMatrix4(r), e.ray.intersectsSphere(wl) !== !1 && (Tl.copy(r).invert(), El.copy(e.ray).applyMatrix4(Tl), !(this.boundingBox !== null && El.intersectsBox(this.boundingBox) === !1) && this._computeIntersections(e, t, El))) } getVertexPosition(e, t) { return super.getVertexPosition(e, t), this.applyBoneTransform(e, t), t } bind(e, t) { this.skeleton = e, t === void 0 && (this.updateMatrixWorld(!0), this.skeleton.calculateInverses(), t = this.matrixWorld), this.bindMatrix.copy(t), this.bindMatrixInverse.copy(t).invert() } pose() { this.skeleton.pose() } normalizeSkinWeights() { let e = new is, t = this.geometry.attributes.skinWeight; for (let n = 0, r = t.count; n < r; n++) { e.fromBufferAttribute(t, n); let r = 1 / e.manhattanLength(); r === 1 / 0 ? e.set(1, 0, 0, 0) : e.multiplyScalar(r), t.setXYZW(n, e.x, e.y, e.z, e.w) } } updateMatrixWorld(e) { super.updateMatrixWorld(e), this.bindMode === `attached` ? this.bindMatrixInverse.copy(this.matrixWorld).invert() : this.bindMode === `detached` ? this.bindMatrixInverse.copy(this.bindMatrix).invert() : H(`SkinnedMesh: Unrecognized bindMode: ` + this.bindMode) } applyBoneTransform(e, t) { let n = this.skeleton, r = this.geometry; yl.fromBufferAttribute(r.attributes.skinIndex, e), bl.fromBufferAttribute(r.attributes.skinWeight, e), t.isVector4 ? (vl.copy(t), t.set(0, 0, 0, 0)) : (vl.set(...t, 1), t.set(0, 0, 0)), vl.applyMatrix4(this.bindMatrix); for (let e = 0; e < 4; e++) { let r = bl.getComponent(e); if (r !== 0) { let i = yl.getComponent(e); Sl.multiplyMatrices(n.bones[i].matrixWorld, n.boneInverses[i]), t.addScaledVector(xl.copy(vl).applyMatrix4(Sl), r) } } return t.isVector4 && (t.w = vl.w), t.applyMatrix4(this.bindMatrixInverse) } }, Ol = class extends Fs { constructor() { super(), this.isBone = !0, this.type = `Bone` } }, kl = class extends rs { constructor(e = null, t = 1, n = 1, r, i, a, o, s, c = Ei, l = Ei, u, d) { super(null, a, o, s, c, l, r, i, u, d), this.isDataTexture = !0, this.image = { data: e, width: t, height: n }, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1 } }, Al = new Y, jl = new Y, Ml = class e { constructor(e = [], t = []) { this.uuid = yo(), this.bones = e.slice(0), this.boneInverses = t, this.boneMatrices = null, this.previousBoneMatrices = null, this.boneTexture = null, this.init() } init() { let e = this.bones, t = this.boneInverses; if (this.boneMatrices = new Float32Array(e.length * 16), t.length === 0) this.calculateInverses(); else if (e.length !== t.length) { H(`Skeleton: Number of inverse bone matrices does not match amount of bones.`), this.boneInverses = []; for (let e = 0, t = this.bones.length; e < t; e++)this.boneInverses.push(new Y) } } calculateInverses() { this.boneInverses.length = 0; for (let e = 0, t = this.bones.length; e < t; e++) { let t = new Y; this.bones[e] && t.copy(this.bones[e].matrixWorld).invert(), this.boneInverses.push(t) } } pose() { for (let e = 0, t = this.bones.length; e < t; e++) { let t = this.bones[e]; t && t.matrixWorld.copy(this.boneInverses[e]).invert() } for (let e = 0, t = this.bones.length; e < t; e++) { let t = this.bones[e]; t && (t.parent && t.parent.isBone ? (t.matrix.copy(t.parent.matrixWorld).invert(), t.matrix.multiply(t.matrixWorld)) : t.matrix.copy(t.matrixWorld), t.matrix.decompose(t.position, t.quaternion, t.scale)) } } update() { let e = this.bones, t = this.boneInverses, n = this.boneMatrices, r = this.boneTexture; for (let r = 0, i = e.length; r < i; r++) { let i = e[r] ? e[r].matrixWorld : jl; Al.multiplyMatrices(i, t[r]), Al.toArray(n, r * 16) } r !== null && (r.needsUpdate = !0) } clone() { return new e(this.bones, this.boneInverses) } computeBoneTexture() { let e = Math.sqrt(this.bones.length * 4); e = Math.ceil(e / 4) * 4, e = Math.max(e, 4); let t = new Float32Array(e * e * 4); t.set(this.boneMatrices); let n = new kl(t, e, e, qi, Ri); return n.needsUpdate = !0, this.boneMatrices = t, this.boneTexture = n, this } getBoneByName(e) { for (let t = 0, n = this.bones.length; t < n; t++) { let n = this.bones[t]; if (n.name === e) return n } } dispose() { this.boneTexture !== null && (this.boneTexture.dispose(), this.boneTexture = null) } fromJSON(e, t) { this.uuid = e.uuid; for (let n = 0, r = e.bones.length; n < r; n++) { let r = e.bones[n], i = t[r]; i === void 0 && (H(`Skeleton: No bone found with UUID:`, r), i = new Ol), this.bones.push(i), this.boneInverses.push(new Y().fromArray(e.boneInverses[n])) } return this.init(), this } toJSON() { let e = { metadata: { version: 4.7, type: `Skeleton`, generator: `Skeleton.toJSON` }, bones: [], boneInverses: [] }; e.uuid = this.uuid; let t = this.bones, n = this.boneInverses; for (let r = 0, i = t.length; r < i; r++) { let i = t[r]; e.bones.push(i.uuid); let a = n[r]; e.boneInverses.push(a.toArray()) } return e } }, Nl = class extends Oc { constructor(e, t, n, r = 1) { super(e, t, n), this.isInstancedBufferAttribute = !0, this.meshPerAttribute = r } copy(e) { return super.copy(e), this.meshPerAttribute = e.meshPerAttribute, this } toJSON() { let e = super.toJSON(); return e.meshPerAttribute = this.meshPerAttribute, e.isInstancedBufferAttribute = !0, e } }, Pl = new Y, Fl = new Y, Il = [], Ll = new ac, Rl = new Y, zl = new hl, Bl = new Fc, Vl = class extends hl { constructor(e, t, n) { super(e, t), this.isInstancedMesh = !0, this.instanceMatrix = new Nl(new Float32Array(n * 16), 16), this.previousInstanceMatrix = null, this.instanceColor = null, this.morphTexture = null, this.count = n, this.boundingBox = null, this.boundingSphere = null; for (let e = 0; e < n; e++)this.setMatrixAt(e, Rl) } computeBoundingBox() { let e = this.geometry, t = this.count; this.boundingBox === null && (this.boundingBox = new ac), e.boundingBox === null && e.computeBoundingBox(), this.boundingBox.makeEmpty(); for (let n = 0; n < t; n++)this.getMatrixAt(n, Pl), Ll.copy(e.boundingBox).applyMatrix4(Pl), this.boundingBox.union(Ll) } computeBoundingSphere() { let e = this.geometry, t = this.count; this.boundingSphere === null && (this.boundingSphere = new Fc), e.boundingSphere === null && e.computeBoundingSphere(), this.boundingSphere.makeEmpty(); for (let n = 0; n < t; n++)this.getMatrixAt(n, Pl), Bl.copy(e.boundingSphere).applyMatrix4(Pl), this.boundingSphere.union(Bl) } copy(e, t) { return super.copy(e, t), this.instanceMatrix.copy(e.instanceMatrix), e.previousInstanceMatrix !== null && (this.previousInstanceMatrix = e.previousInstanceMatrix.clone()), e.morphTexture !== null && (this.morphTexture = e.morphTexture.clone()), e.instanceColor !== null && (this.instanceColor = e.instanceColor.clone()), this.count = e.count, e.boundingBox !== null && (this.boundingBox = e.boundingBox.clone()), e.boundingSphere !== null && (this.boundingSphere = e.boundingSphere.clone()), this } getColorAt(e, t) { return this.instanceColor === null ? t.setRGB(1, 1, 1) : t.fromArray(this.instanceColor.array, e * 3) } getMatrixAt(e, t) { return t.fromArray(this.instanceMatrix.array, e * 16) } getMorphAt(e, t) { let n = t.morphTargetInfluences, r = this.morphTexture.source.data.data, i = e * (n.length + 1) + 1; for (let e = 0; e < n.length; e++)n[e] = r[i + e] } raycast(e, t) { let n = this.matrixWorld, r = this.count; if (zl.geometry = this.geometry, zl.material = this.material, zl.material !== void 0 && (this.boundingSphere === null && this.computeBoundingSphere(), Bl.copy(this.boundingSphere), Bl.applyMatrix4(n), e.ray.intersectsSphere(Bl) !== !1)) for (let i = 0; i < r; i++) { this.getMatrixAt(i, Pl), Fl.multiplyMatrices(n, Pl), zl.matrixWorld = Fl, zl.raycast(e, Il); for (let e = 0, n = Il.length; e < n; e++) { let n = Il[e]; n.instanceId = i, n.object = this, t.push(n) } Il.length = 0 } } setColorAt(e, t) { return this.instanceColor === null && (this.instanceColor = new Nl(new Float32Array(this.instanceMatrix.count * 3).fill(1), 3)), t.toArray(this.instanceColor.array, e * 3), this } setMatrixAt(e, t) { return t.toArray(this.instanceMatrix.array, e * 16), this } setMorphAt(e, t) { let n = t.morphTargetInfluences, r = n.length + 1; this.morphTexture === null && (this.morphTexture = new kl(new Float32Array(r * this.count), r, this.count, Xi, Ri)); let i = this.morphTexture.source.data.data, a = 0; for (let e = 0; e < n.length; e++)a += n[e]; let o = this.geometry.morphTargetsRelative ? 1 : 1 - a, s = r * e; return i[s] = o, i.set(n, s + 1), this } updateMorphTargets() { } dispose() { this.dispatchEvent({ type: `dispose` }), this.morphTexture !== null && (this.morphTexture.dispose(), this.morphTexture = null) } }, Hl = new K, Ul = new K, Wl = new q, Gl = class { constructor(e = new K(1, 0, 0), t = 0) { this.isPlane = !0, this.normal = e, this.constant = t } set(e, t) { return this.normal.copy(e), this.constant = t, this } setComponents(e, t, n, r) { return this.normal.set(e, t, n), this.constant = r, this } setFromNormalAndCoplanarPoint(e, t) { return this.normal.copy(e), this.constant = -t.dot(this.normal), this } setFromCoplanarPoints(e, t, n) { let r = Hl.subVectors(n, t).cross(Ul.subVectors(e, t)).normalize(); return this.setFromNormalAndCoplanarPoint(r, e), this } copy(e) { return this.normal.copy(e.normal), this.constant = e.constant, this } normalize() { let e = 1 / this.normal.length(); return this.normal.multiplyScalar(e), this.constant *= e, this } negate() { return this.constant *= -1, this.normal.negate(), this } distanceToPoint(e) { return this.normal.dot(e) + this.constant } distanceToSphere(e) { return this.distanceToPoint(e.center) - e.radius } projectPoint(e, t) { return t.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e)) } intersectLine(e, t, n = !0) { let r = e.delta(Hl), i = this.normal.dot(r); if (i === 0) return this.distanceToPoint(e.start) === 0 ? t.copy(e.start) : null; let a = -(e.start.dot(this.normal) + this.constant) / i; return n === !0 && (a < 0 || a > 1) ? null : t.copy(e.start).addScaledVector(r, a) } intersectsLine(e) { let t = this.distanceToPoint(e.start), n = this.distanceToPoint(e.end); return t < 0 && n > 0 || n < 0 && t > 0 } intersectsBox(e) { return e.intersectsPlane(this) } intersectsSphere(e) { return e.intersectsPlane(this) } coplanarPoint(e) { return e.copy(this.normal).multiplyScalar(-this.constant) } applyMatrix4(e, t) { let n = t || Wl.getNormalMatrix(e), r = this.coplanarPoint(Hl).applyMatrix4(e), i = this.normal.applyMatrix3(n).normalize(); return this.constant = -r.dot(i), this } translate(e) { return this.constant -= e.dot(this.normal), this } equals(e) { return e.normal.equals(this.normal) && e.constant === this.constant } clone() { return new this.constructor().copy(this) } }, Kl = new Fc, ql = new G(.5, .5), Jl = new K, Yl = class { constructor(e = new Gl, t = new Gl, n = new Gl, r = new Gl, i = new Gl, a = new Gl) { this.planes = [e, t, n, r, i, a] } set(e, t, n, r, i, a) { let o = this.planes; return o[0].copy(e), o[1].copy(t), o[2].copy(n), o[3].copy(r), o[4].copy(i), o[5].copy(a), this } copy(e) { let t = this.planes; for (let n = 0; n < 6; n++)t[n].copy(e.planes[n]); return this } setFromProjectionMatrix(e, t = to, n = !1) { let r = this.planes, i = e.elements, a = i[0], o = i[1], s = i[2], c = i[3], l = i[4], u = i[5], d = i[6], f = i[7], p = i[8], m = i[9], h = i[10], g = i[11], _ = i[12], v = i[13], y = i[14], b = i[15]; if (r[0].setComponents(c - a, f - l, g - p, b - _).normalize(), r[1].setComponents(c + a, f + l, g + p, b + _).normalize(), r[2].setComponents(c + o, f + u, g + m, b + v).normalize(), r[3].setComponents(c - o, f - u, g - m, b - v).normalize(), n) r[4].setComponents(s, d, h, y).normalize(), r[5].setComponents(c - s, f - d, g - h, b - y).normalize(); else if (r[4].setComponents(c - s, f - d, g - h, b - y).normalize(), t === 2e3) r[5].setComponents(c + s, f + d, g + h, b + y).normalize(); else if (t === 2001) r[5].setComponents(s, d, h, y).normalize(); else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: ` + t); return this } intersectsObject(e) { if (e.boundingSphere !== void 0) e.boundingSphere === null && e.computeBoundingSphere(), Kl.copy(e.boundingSphere).applyMatrix4(e.matrixWorld); else { let t = e.geometry; t.boundingSphere === null && t.computeBoundingSphere(), Kl.copy(t.boundingSphere).applyMatrix4(e.matrixWorld) } return this.intersectsSphere(Kl) } intersectsSprite(e) { return Kl.center.set(0, 0, 0), Kl.radius = .7071067811865476 + ql.distanceTo(e.center), Kl.applyMatrix4(e.matrixWorld), this.intersectsSphere(Kl) } intersectsSphere(e) { let t = this.planes, n = e.center, r = -e.radius; for (let e = 0; e < 6; e++)if (t[e].distanceToPoint(n) < r) return !1; return !0 } intersectsBox(e) { let t = this.planes; for (let n = 0; n < 6; n++) { let r = t[n]; if (Jl.x = r.normal.x > 0 ? e.max.x : e.min.x, Jl.y = r.normal.y > 0 ? e.max.y : e.min.y, Jl.z = r.normal.z > 0 ? e.max.z : e.min.z, r.distanceToPoint(Jl) < 0) return !1 } return !0 } containsPoint(e) { let t = this.planes; for (let n = 0; n < 6; n++)if (t[n].distanceToPoint(e) < 0) return !1; return !0 } clone() { return new this.constructor().copy(this) } }, Xl = class extends Jc { constructor(e) { super(), this.isLineBasicMaterial = !0, this.type = `LineBasicMaterial`, this.color = new X(16777215), this.map = null, this.linewidth = 1, this.linecap = `round`, this.linejoin = `round`, this.fog = !0, this.setValues(e) } copy(e) { return super.copy(e), this.color.copy(e.color), this.map = e.map, this.linewidth = e.linewidth, this.linecap = e.linecap, this.linejoin = e.linejoin, this.fog = e.fog, this } }, Zl = new K, Ql = new K, $l = new Y, eu = new nl, tu = new Fc, nu = new K, ru = new K, iu = class extends Fs { constructor(e = new Uc, t = new Xl) { super(), this.isLine = !0, this.type = `Line`, this.geometry = e, this.material = t, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.updateMorphTargets() } copy(e, t) { return super.copy(e, t), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this } computeLineDistances() { let e = this.geometry; if (e.index === null) { let t = e.attributes.position, n = [0]; for (let e = 1, r = t.count; e < r; e++)Zl.fromBufferAttribute(t, e - 1), Ql.fromBufferAttribute(t, e), n[e] = n[e - 1], n[e] += Zl.distanceTo(Ql); e.setAttribute(`lineDistance`, new jc(n, 1)) } else H(`Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`); return this } raycast(e, t) { let n = this.geometry, r = this.matrixWorld, i = e.params.Line.threshold, a = n.drawRange; if (n.boundingSphere === null && n.computeBoundingSphere(), tu.copy(n.boundingSphere), tu.applyMatrix4(r), tu.radius += i, e.ray.intersectsSphere(tu) === !1) return; $l.copy(r).invert(), eu.copy(e.ray).applyMatrix4($l); let o = i / ((this.scale.x + this.scale.y + this.scale.z) / 3), s = o * o, c = this.isLineSegments ? 2 : 1, l = n.index, u = n.attributes.position; if (l !== null) { let n = Math.max(0, a.start), r = Math.min(l.count, a.start + a.count); for (let i = n, a = r - 1; i < a; i += c) { let n = l.getX(i), r = l.getX(i + 1), a = au(this, e, eu, s, n, r, i); a && t.push(a) } if (this.isLineLoop) { let i = l.getX(r - 1), a = l.getX(n), o = au(this, e, eu, s, i, a, r - 1); o && t.push(o) } } else { let n = Math.max(0, a.start), r = Math.min(u.count, a.start + a.count); for (let i = n, a = r - 1; i < a; i += c) { let n = au(this, e, eu, s, i, i + 1, i); n && t.push(n) } if (this.isLineLoop) { let i = au(this, e, eu, s, r - 1, n, r - 1); i && t.push(i) } } } updateMorphTargets() { let e = this.geometry.morphAttributes, t = Object.keys(e); if (t.length > 0) { let n = e[t[0]]; if (n !== void 0) { this.morphTargetInfluences = [], this.morphTargetDictionary = {}; for (let e = 0, t = n.length; e < t; e++) { let t = n[e].name || String(e); this.morphTargetInfluences.push(0), this.morphTargetDictionary[t] = e } } } } }; function au(e, t, n, r, i, a, o) { let s = e.geometry.attributes.position; if (Zl.fromBufferAttribute(s, i), Ql.fromBufferAttribute(s, a), n.distanceSqToSegment(Zl, Ql, nu, ru) > r) return; nu.applyMatrix4(e.matrixWorld); let c = t.ray.origin.distanceTo(nu); if (!(c < t.near || c > t.far)) return { distance: c, point: ru.clone().applyMatrix4(e.matrixWorld), index: o, face: null, faceIndex: null, barycoord: null, object: e } } var ou = new K, su = new K, cu = class extends iu { constructor(e, t) { super(e, t), this.isLineSegments = !0, this.type = `LineSegments` } computeLineDistances() { let e = this.geometry; if (e.index === null) { let t = e.attributes.position, n = []; for (let e = 0, r = t.count; e < r; e += 2)ou.fromBufferAttribute(t, e), su.fromBufferAttribute(t, e + 1), n[e] = e === 0 ? 0 : n[e - 1], n[e + 1] = n[e] + ou.distanceTo(su); e.setAttribute(`lineDistance`, new jc(n, 1)) } else H(`LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`); return this } }, lu = class extends iu { constructor(e, t) { super(e, t), this.isLineLoop = !0, this.type = `LineLoop` } }, uu = class extends Jc { constructor(e) { super(), this.isPointsMaterial = !0, this.type = `PointsMaterial`, this.color = new X(16777215), this.map = null, this.alphaMap = null, this.size = 1, this.sizeAttenuation = !0, this.fog = !0, this.setValues(e) } copy(e) { return super.copy(e), this.color.copy(e.color), this.map = e.map, this.alphaMap = e.alphaMap, this.size = e.size, this.sizeAttenuation = e.sizeAttenuation, this.fog = e.fog, this } }, du = new Y, fu = new nl, pu = new Fc, mu = new K, hu = class extends Fs { constructor(e = new Uc, t = new uu) { super(), this.isPoints = !0, this.type = `Points`, this.geometry = e, this.material = t, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.updateMorphTargets() } copy(e, t) { return super.copy(e, t), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this } raycast(e, t) { let n = this.geometry, r = this.matrixWorld, i = e.params.Points.threshold, a = n.drawRange; if (n.boundingSphere === null && n.computeBoundingSphere(), pu.copy(n.boundingSphere), pu.applyMatrix4(r), pu.radius += i, e.ray.intersectsSphere(pu) === !1) return; du.copy(r).invert(), fu.copy(e.ray).applyMatrix4(du); let o = i / ((this.scale.x + this.scale.y + this.scale.z) / 3), s = o * o, c = n.index, l = n.attributes.position; if (c !== null) { let n = Math.max(0, a.start), i = Math.min(c.count, a.start + a.count); for (let a = n, o = i; a < o; a++) { let n = c.getX(a); mu.fromBufferAttribute(l, n), gu(mu, n, s, r, e, t, this) } } else { let n = Math.max(0, a.start), i = Math.min(l.count, a.start + a.count); for (let a = n, o = i; a < o; a++)mu.fromBufferAttribute(l, a), gu(mu, a, s, r, e, t, this) } } updateMorphTargets() { let e = this.geometry.morphAttributes, t = Object.keys(e); if (t.length > 0) { let n = e[t[0]]; if (n !== void 0) { this.morphTargetInfluences = [], this.morphTargetDictionary = {}; for (let e = 0, t = n.length; e < t; e++) { let t = n[e].name || String(e); this.morphTargetInfluences.push(0), this.morphTargetDictionary[t] = e } } } } }; function gu(e, t, n, r, i, a, o) { let s = fu.distanceSqToPoint(e); if (s < n) { let n = new K; fu.closestPointToPoint(e, n), n.applyMatrix4(r); let c = i.ray.origin.distanceTo(n); if (c < i.near || c > i.far) return; a.push({ distance: c, distanceToRay: Math.sqrt(s), point: n, index: t, face: null, faceIndex: null, barycoord: null, object: o }) } } var _u = class extends rs { constructor(e = [], t = 301, n, r, i, a, o, s, c, l) { super(e, t, n, r, i, a, o, s, c, l), this.isCubeTexture = !0, this.flipY = !1 } get images() { return this.image } set images(e) { this.image = e } }, vu = class extends rs { constructor(e, t, n = Li, r, i, a, o = Ei, s = Ei, c, l = Ji, u = 1) { if (l !== 1026 && l !== 1027) throw Error(`DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat`); super({ width: e, height: t, depth: u }, r, i, a, o, s, l, n, c), this.isDepthTexture = !0, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null } copy(e) { return super.copy(e), this.source = new $o(Object.assign({}, e.image)), this.compareFunction = e.compareFunction, this } toJSON(e) { let t = super.toJSON(e); return this.compareFunction !== null && (t.compareFunction = this.compareFunction), t } }, yu = class extends vu { constructor(e, t = Li, n = 301, r, i, a = Ei, o = Ei, s, c = Ji) { let l = { width: e, height: e, depth: 1 }, u = [l, l, l, l, l, l]; super(e, e, t, n, r, i, a, o, s, c), this.image = u, this.isCubeDepthTexture = !0, this.isCubeTexture = !0 } get images() { return this.image } set images(e) { this.image = e } }, bu = class extends rs { constructor(e = null) { super(), this.sourceTexture = e, this.isExternalTexture = !0 } copy(e) { return super.copy(e), this.sourceTexture = e.sourceTexture, this } }, xu = class e extends Uc { constructor(e = 1, t = 1, n = 1, r = 1, i = 1, a = 1) { super(), this.type = `BoxGeometry`, this.parameters = { width: e, height: t, depth: n, widthSegments: r, heightSegments: i, depthSegments: a }; let o = this; r = Math.floor(r), i = Math.floor(i), a = Math.floor(a); let s = [], c = [], l = [], u = [], d = 0, f = 0; p(`z`, `y`, `x`, -1, -1, n, t, e, a, i, 0), p(`z`, `y`, `x`, 1, -1, n, t, -e, a, i, 1), p(`x`, `z`, `y`, 1, 1, e, n, t, r, a, 2), p(`x`, `z`, `y`, 1, -1, e, n, -t, r, a, 3), p(`x`, `y`, `z`, 1, -1, e, t, n, r, i, 4), p(`x`, `y`, `z`, -1, -1, e, t, -n, r, i, 5), this.setIndex(s), this.setAttribute(`position`, new jc(c, 3)), this.setAttribute(`normal`, new jc(l, 3)), this.setAttribute(`uv`, new jc(u, 2)); function p(e, t, n, r, i, a, p, m, h, g, _) { let v = a / h, y = p / g, b = a / 2, x = p / 2, S = m / 2, C = h + 1, w = g + 1, T = 0, E = 0, D = new K; for (let a = 0; a < w; a++) { let o = a * y - x; for (let s = 0; s < C; s++)D[e] = (s * v - b) * r, D[t] = o * i, D[n] = S, c.push(D.x, D.y, D.z), D[e] = 0, D[t] = 0, D[n] = m > 0 ? 1 : -1, l.push(D.x, D.y, D.z), u.push(s / h), u.push(1 - a / g), T += 1 } for (let e = 0; e < g; e++)for (let t = 0; t < h; t++) { let n = d + t + C * e, r = d + t + C * (e + 1), i = d + (t + 1) + C * (e + 1), a = d + (t + 1) + C * e; s.push(n, r, a), s.push(r, i, a), E += 6 } o.addGroup(f, E, _), f += E, d += T } } copy(e) { return super.copy(e), this.parameters = Object.assign({}, e.parameters), this } static fromJSON(t) { return new e(t.width, t.height, t.depth, t.widthSegments, t.heightSegments, t.depthSegments) } }, Su = class e extends Uc { constructor(e = 1, t = 1, n = 1, r = 1) { super(), this.type = `PlaneGeometry`, this.parameters = { width: e, height: t, widthSegments: n, heightSegments: r }; let i = e / 2, a = t / 2, o = Math.floor(n), s = Math.floor(r), c = o + 1, l = s + 1, u = e / o, d = t / s, f = [], p = [], m = [], h = []; for (let e = 0; e < l; e++) { let t = e * d - a; for (let n = 0; n < c; n++) { let r = n * u - i; p.push(r, -t, 0), m.push(0, 0, 1), h.push(n / o), h.push(1 - e / s) } } for (let e = 0; e < s; e++)for (let t = 0; t < o; t++) { let n = t + c * e, r = t + c * (e + 1), i = t + 1 + c * (e + 1), a = t + 1 + c * e; f.push(n, r, a), f.push(r, i, a) } this.setIndex(f), this.setAttribute(`position`, new jc(p, 3)), this.setAttribute(`normal`, new jc(m, 3)), this.setAttribute(`uv`, new jc(h, 2)) } copy(e) { return super.copy(e), this.parameters = Object.assign({}, e.parameters), this } static fromJSON(t) { return new e(t.width, t.height, t.widthSegments, t.heightSegments) } }, Cu = class e extends Uc { constructor(e = 1, t = 32, n = 16, r = 0, i = Math.PI * 2, a = 0, o = Math.PI) { super(), this.type = `SphereGeometry`, this.parameters = { radius: e, widthSegments: t, heightSegments: n, phiStart: r, phiLength: i, thetaStart: a, thetaLength: o }, t = Math.max(3, Math.floor(t)), n = Math.max(2, Math.floor(n)); let s = Math.min(a + o, Math.PI), c = 0, l = [], u = new K, d = new K, f = [], p = [], m = [], h = []; for (let f = 0; f <= n; f++) { let g = [], _ = f / n, v = 0; f === 0 && a === 0 ? v = .5 / t : f === n && s === Math.PI && (v = -.5 / t); for (let n = 0; n <= t; n++) { let s = n / t; u.x = -e * Math.cos(r + s * i) * Math.sin(a + _ * o), u.y = e * Math.cos(a + _ * o), u.z = e * Math.sin(r + s * i) * Math.sin(a + _ * o), p.push(u.x, u.y, u.z), d.copy(u).normalize(), m.push(d.x, d.y, d.z), h.push(s + v, 1 - _), g.push(c++) } l.push(g) } for (let e = 0; e < n; e++)for (let r = 0; r < t; r++) { let t = l[e][r + 1], i = l[e][r], o = l[e + 1][r], c = l[e + 1][r + 1]; (e !== 0 || a > 0) && f.push(t, i, c), (e !== n - 1 || s < Math.PI) && f.push(i, o, c) } this.setIndex(f), this.setAttribute(`position`, new jc(p, 3)), this.setAttribute(`normal`, new jc(m, 3)), this.setAttribute(`uv`, new jc(h, 2)) } copy(e) { return super.copy(e), this.parameters = Object.assign({}, e.parameters), this } static fromJSON(t) { return new e(t.radius, t.widthSegments, t.heightSegments, t.phiStart, t.phiLength, t.thetaStart, t.thetaLength) } }; function wu(e) { let t = {}; for (let n in e) { t[n] = {}; for (let r in e[n]) { let i = e[n][r]; if (Eu(i)) i.isRenderTargetTexture ? (H(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`), t[n][r] = null) : t[n][r] = i.clone(); else if (Array.isArray(i)) if (Eu(i[0])) { let e = []; for (let t = 0, n = i.length; t < n; t++)e[t] = i[t].clone(); t[n][r] = e } else t[n][r] = i.slice(); else t[n][r] = i } } return t } function Tu(e) { let t = {}; for (let n = 0; n < e.length; n++) { let r = wu(e[n]); for (let e in r) t[e] = r[e] } return t } function Eu(e) { return e && (e.isColor || e.isMatrix3 || e.isMatrix4 || e.isVector2 || e.isVector3 || e.isVector4 || e.isTexture || e.isQuaternion) } function Du(e) { let t = []; for (let n = 0; n < e.length; n++)t.push(e[n].clone()); return t } function Ou(e) { let t = e.getRenderTarget(); return t === null ? e.outputColorSpace : t.isXRRenderTarget === !0 ? t.texture.colorSpace : J.workingColorSpace } var ku = { clone: wu, merge: Tu }, Au = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, ju = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`, Mu = class extends Jc { constructor(e) { super(), this.isShaderMaterial = !0, this.type = `ShaderMaterial`, this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = Au, this.fragmentShader = ju, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = { clipCullDistance: !1, multiDraw: !1 }, this.defaultAttributeValues = { color: [1, 1, 1], uv: [0, 0], uv1: [0, 0] }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, e !== void 0 && this.setValues(e) } copy(e) { return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = wu(e.uniforms), this.uniformsGroups = Du(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this.defaultAttributeValues = Object.assign({}, e.defaultAttributeValues), this.index0AttributeName = e.index0AttributeName, this.uniformsNeedUpdate = e.uniformsNeedUpdate, this } toJSON(e) { let t = super.toJSON(e); t.glslVersion = this.glslVersion, t.uniforms = {}; for (let n in this.uniforms) { let r = this.uniforms[n].value; r && r.isTexture ? t.uniforms[n] = { type: `t`, value: r.toJSON(e).uuid } : r && r.isColor ? t.uniforms[n] = { type: `c`, value: r.getHex() } : r && r.isVector2 ? t.uniforms[n] = { type: `v2`, value: r.toArray() } : r && r.isVector3 ? t.uniforms[n] = { type: `v3`, value: r.toArray() } : r && r.isVector4 ? t.uniforms[n] = { type: `v4`, value: r.toArray() } : r && r.isMatrix3 ? t.uniforms[n] = { type: `m3`, value: r.toArray() } : r && r.isMatrix4 ? t.uniforms[n] = { type: `m4`, value: r.toArray() } : t.uniforms[n] = { value: r } } Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader, t.lights = this.lights, t.clipping = this.clipping; let n = {}; for (let e in this.extensions) this.extensions[e] === !0 && (n[e] = !0); return Object.keys(n).length > 0 && (t.extensions = n), t } }, Nu = class extends Mu { constructor(e) { super(e), this.isRawShaderMaterial = !0, this.type = `RawShaderMaterial` } }, Pu = class extends Jc { constructor(e) { super(), this.isMeshStandardMaterial = !0, this.type = `MeshStandardMaterial`, this.defines = { STANDARD: `` }, this.color = new X(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new X(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new G(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new vs, this.envMapIntensity = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = `round`, this.wireframeLinejoin = `round`, this.flatShading = !1, this.fog = !0, this.setValues(e) } copy(e) { return super.copy(e), this.defines = { STANDARD: `` }, this.color.copy(e.color), this.roughness = e.roughness, this.metalness = e.metalness, this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.roughnessMap = e.roughnessMap, this.metalnessMap = e.metalnessMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.envMapIntensity = e.envMapIntensity, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.flatShading = e.flatShading, this.fog = e.fog, this } }, Fu = class extends Pu { constructor(e) { super(), this.isMeshPhysicalMaterial = !0, this.defines = { STANDARD: ``, PHYSICAL: `` }, this.type = `MeshPhysicalMaterial`, this.anisotropyRotation = 0, this.anisotropyMap = null, this.clearcoatMap = null, this.clearcoatRoughness = 0, this.clearcoatRoughnessMap = null, this.clearcoatNormalScale = new G(1, 1), this.clearcoatNormalMap = null, this.ior = 1.5, Object.defineProperty(this, `reflectivity`, { get: function () { return W(2.5 * (this.ior - 1) / (this.ior + 1), 0, 1) }, set: function (e) { this.ior = (1 + .4 * e) / (1 - .4 * e) } }), this.iridescenceMap = null, this.iridescenceIOR = 1.3, this.iridescenceThicknessRange = [100, 400], this.iridescenceThicknessMap = null, this.sheenColor = new X(0), this.sheenColorMap = null, this.sheenRoughness = 1, this.sheenRoughnessMap = null, this.transmissionMap = null, this.thickness = 0, this.thicknessMap = null, this.attenuationDistance = 1 / 0, this.attenuationColor = new X(1, 1, 1), this.specularIntensity = 1, this.specularIntensityMap = null, this.specularColor = new X(1, 1, 1), this.specularColorMap = null, this._anisotropy = 0, this._clearcoat = 0, this._dispersion = 0, this._iridescence = 0, this._sheen = 0, this._transmission = 0, this.setValues(e) } get anisotropy() { return this._anisotropy } set anisotropy(e) { this._anisotropy > 0 != e > 0 && this.version++, this._anisotropy = e } get clearcoat() { return this._clearcoat } set clearcoat(e) { this._clearcoat > 0 != e > 0 && this.version++, this._clearcoat = e } get iridescence() { return this._iridescence } set iridescence(e) { this._iridescence > 0 != e > 0 && this.version++, this._iridescence = e } get dispersion() { return this._dispersion } set dispersion(e) { this._dispersion > 0 != e > 0 && this.version++, this._dispersion = e } get sheen() { return this._sheen } set sheen(e) { this._sheen > 0 != e > 0 && this.version++, this._sheen = e } get transmission() { return this._transmission } set transmission(e) { this._transmission > 0 != e > 0 && this.version++, this._transmission = e } copy(e) { return super.copy(e), this.defines = { STANDARD: ``, PHYSICAL: `` }, this.anisotropy = e.anisotropy, this.anisotropyRotation = e.anisotropyRotation, this.anisotropyMap = e.anisotropyMap, this.clearcoat = e.clearcoat, this.clearcoatMap = e.clearcoatMap, this.clearcoatRoughness = e.clearcoatRoughness, this.clearcoatRoughnessMap = e.clearcoatRoughnessMap, this.clearcoatNormalMap = e.clearcoatNormalMap, this.clearcoatNormalScale.copy(e.clearcoatNormalScale), this.dispersion = e.dispersion, this.ior = e.ior, this.iridescence = e.iridescence, this.iridescenceMap = e.iridescenceMap, this.iridescenceIOR = e.iridescenceIOR, this.iridescenceThicknessRange = [...e.iridescenceThicknessRange], this.iridescenceThicknessMap = e.iridescenceThicknessMap, this.sheen = e.sheen, this.sheenColor.copy(e.sheenColor), this.sheenColorMap = e.sheenColorMap, this.sheenRoughness = e.sheenRoughness, this.sheenRoughnessMap = e.sheenRoughnessMap, this.transmission = e.transmission, this.transmissionMap = e.transmissionMap, this.thickness = e.thickness, this.thicknessMap = e.thicknessMap, this.attenuationDistance = e.attenuationDistance, this.attenuationColor.copy(e.attenuationColor), this.specularIntensity = e.specularIntensity, this.specularIntensityMap = e.specularIntensityMap, this.specularColor.copy(e.specularColor), this.specularColorMap = e.specularColorMap, this } }, Iu = class extends Jc { constructor(e) { super(), this.isMeshDepthMaterial = !0, this.type = `MeshDepthMaterial`, this.depthPacking = Ja, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e) } copy(e) { return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this } }, Lu = class extends Jc { constructor(e) { super(), this.isMeshDistanceMaterial = !0, this.type = `MeshDistanceMaterial`, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(e) } copy(e) { return super.copy(e), this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this } }; function Ru(e, t) { return !e || e.constructor === t ? e : typeof t.BYTES_PER_ELEMENT == `number` ? new t(e) : Array.prototype.slice.call(e) } function zu(e) { function t(t, n) { return e[t] - e[n] } let n = e.length, r = Array(n); for (let e = 0; e !== n; ++e)r[e] = e; return r.sort(t), r } function Bu(e, t, n) { let r = e.length, i = new e.constructor(r); for (let a = 0, o = 0; o !== r; ++a) { let r = n[a] * t; for (let n = 0; n !== t; ++n)i[o++] = e[r + n] } return i } function Vu(e, t, n, r) { let i = 1, a = e[0]; for (; a !== void 0 && a[r] === void 0;)a = e[i++]; if (a === void 0) return; let o = a[r]; if (o !== void 0) if (Array.isArray(o)) do o = a[r], o !== void 0 && (t.push(a.time), n.push(...o)), a = e[i++]; while (a !== void 0); else if (o.toArray !== void 0) do o = a[r], o !== void 0 && (t.push(a.time), o.toArray(n, n.length)), a = e[i++]; while (a !== void 0); else do o = a[r], o !== void 0 && (t.push(a.time), n.push(o)), a = e[i++]; while (a !== void 0) } var Hu = class { constructor(e, t, n, r) { this.parameterPositions = e, this._cachedIndex = 0, this.resultBuffer = r === void 0 ? new t.constructor(n) : r, this.sampleValues = t, this.valueSize = n, this.settings = null, this.DefaultSettings_ = {} } evaluate(e) { let t = this.parameterPositions, n = this._cachedIndex, r = t[n], i = t[n - 1]; validate_interval: { seek: { let a; linear_scan: { forward_scan: if (!(e < r)) { for (let a = n + 2; ;) { if (r === void 0) { if (e < i) break forward_scan; return n = t.length, this._cachedIndex = n, this.copySampleValue_(n - 1) } if (n === a) break; if (i = r, r = t[++n], e < r) break seek } a = t.length; break linear_scan } if (!(e >= i)) { let o = t[1]; e < o && (n = 2, i = o); for (let a = n - 2; ;) { if (i === void 0) return this._cachedIndex = 0, this.copySampleValue_(0); if (n === a) break; if (r = i, i = t[--n - 1], e >= i) break seek } a = n, n = 0; break linear_scan } break validate_interval } for (; n < a;) { let r = n + a >>> 1; e < t[r] ? a = r : n = r + 1 } if (r = t[n], i = t[n - 1], i === void 0) return this._cachedIndex = 0, this.copySampleValue_(0); if (r === void 0) return n = t.length, this._cachedIndex = n, this.copySampleValue_(n - 1) } this._cachedIndex = n, this.intervalChanged_(n, i, r) } return this.interpolate_(n, i, e, r) } getSettings_() { return this.settings || this.DefaultSettings_ } copySampleValue_(e) { let t = this.resultBuffer, n = this.sampleValues, r = this.valueSize, i = e * r; for (let e = 0; e !== r; ++e)t[e] = n[i + e]; return t } interpolate_() { throw Error(`call to abstract method`) } intervalChanged_() { } }, Uu = class extends Hu { constructor(e, t, n, r) { super(e, t, n, r), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0, this.DefaultSettings_ = { endingStart: Ua, endingEnd: Ua } } intervalChanged_(e, t, n) { let r = this.parameterPositions, i = e - 2, a = e + 1, o = r[i], s = r[a]; if (o === void 0) switch (this.getSettings_().endingStart) { case Wa: i = e, o = 2 * t - n; break; case Ga: i = r.length - 2, o = t + r[i] - r[i + 1]; break; default: i = e, o = n }if (s === void 0) switch (this.getSettings_().endingEnd) { case Wa: a = e, s = 2 * n - t; break; case Ga: a = 1, s = n + r[1] - r[0]; break; default: a = e - 1, s = t }let c = (n - t) * .5, l = this.valueSize; this._weightPrev = c / (t - o), this._weightNext = c / (s - n), this._offsetPrev = i * l, this._offsetNext = a * l } interpolate_(e, t, n, r) { let i = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = e * o, c = s - o, l = this._offsetPrev, u = this._offsetNext, d = this._weightPrev, f = this._weightNext, p = (n - t) / (r - t), m = p * p, h = m * p, g = -d * h + 2 * d * m - d * p, _ = (1 + d) * h + (-1.5 - 2 * d) * m + (-.5 + d) * p + 1, v = (-1 - f) * h + (1.5 + f) * m + .5 * p, y = f * h - f * m; for (let e = 0; e !== o; ++e)i[e] = g * a[l + e] + _ * a[c + e] + v * a[s + e] + y * a[u + e]; return i } }, Wu = class extends Hu { constructor(e, t, n, r) { super(e, t, n, r) } interpolate_(e, t, n, r) { let i = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = e * o, c = s - o, l = (n - t) / (r - t), u = 1 - l; for (let e = 0; e !== o; ++e)i[e] = a[c + e] * u + a[s + e] * l; return i } }, Gu = class extends Hu { constructor(e, t, n, r) { super(e, t, n, r) } interpolate_(e) { return this.copySampleValue_(e - 1) } }, Ku = class extends Hu { interpolate_(e, t, n, r) { let i = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = e * o, c = s - o, l = this.settings || this.DefaultSettings_, u = l.inTangents, d = l.outTangents; if (!u || !d) { let e = (n - t) / (r - t), l = 1 - e; for (let t = 0; t !== o; ++t)i[t] = a[c + t] * l + a[s + t] * e; return i } let f = o * 2, p = e - 1; for (let l = 0; l !== o; ++l) { let o = a[c + l], m = a[s + l], h = p * f + l * 2, g = d[h], _ = d[h + 1], v = e * f + l * 2, y = u[v], b = u[v + 1], x = (n - t) / (r - t), S, C, w, T, E; for (let e = 0; e < 8; e++) { S = x * x, C = S * x, w = 1 - x, T = w * w, E = T * w; let e = E * t + 3 * T * x * g + 3 * w * S * y + C * r - n; if (Math.abs(e) < 1e-10) break; let i = 3 * T * (g - t) + 6 * w * x * (y - g) + 3 * S * (r - y); if (Math.abs(i) < 1e-10) break; x -= e / i, x = Math.max(0, Math.min(1, x)) } i[l] = E * o + 3 * T * x * _ + 3 * w * S * b + C * m } return i } }, qu = class { constructor(e, t, n, r) { if (e === void 0) throw Error(`THREE.KeyframeTrack: track name is undefined`); if (t === void 0 || t.length === 0) throw Error(`THREE.KeyframeTrack: no keyframes in track named ` + e); this.name = e, this.times = Ru(t, this.TimeBufferType), this.values = Ru(n, this.ValueBufferType), this.setInterpolation(r || this.DefaultInterpolation) } static toJSON(e) { let t = e.constructor, n; if (t.toJSON !== this.toJSON) n = t.toJSON(e); else { n = { name: e.name, times: Ru(e.times, Array), values: Ru(e.values, Array) }; let t = e.getInterpolation(); t !== e.DefaultInterpolation && (n.interpolation = t) } return n.type = e.ValueTypeName, n } InterpolantFactoryMethodDiscrete(e) { return new Gu(this.times, this.values, this.getValueSize(), e) } InterpolantFactoryMethodLinear(e) { return new Wu(this.times, this.values, this.getValueSize(), e) } InterpolantFactoryMethodSmooth(e) { return new Uu(this.times, this.values, this.getValueSize(), e) } InterpolantFactoryMethodBezier(e) { let t = new Ku(this.times, this.values, this.getValueSize(), e); return this.settings && (t.settings = this.settings), t } setInterpolation(e) { let t; switch (e) { case za: t = this.InterpolantFactoryMethodDiscrete; break; case Ba: t = this.InterpolantFactoryMethodLinear; break; case Va: t = this.InterpolantFactoryMethodSmooth; break; case Ha: t = this.InterpolantFactoryMethodBezier; break }if (t === void 0) { let t = `unsupported interpolation for ` + this.ValueTypeName + ` keyframe track named ` + this.name; if (this.createInterpolant === void 0) if (e !== this.DefaultInterpolation) this.setInterpolation(this.DefaultInterpolation); else throw Error(t); return H(`KeyframeTrack:`, t), this } return this.createInterpolant = t, this } getInterpolation() { switch (this.createInterpolant) { case this.InterpolantFactoryMethodDiscrete: return za; case this.InterpolantFactoryMethodLinear: return Ba; case this.InterpolantFactoryMethodSmooth: return Va; case this.InterpolantFactoryMethodBezier: return Ha } } getValueSize() { return this.values.length / this.times.length } shift(e) { if (e !== 0) { let t = this.times; for (let n = 0, r = t.length; n !== r; ++n)t[n] += e } return this } scale(e) { if (e !== 1) { let t = this.times; for (let n = 0, r = t.length; n !== r; ++n)t[n] *= e } return this } trim(e, t) { let n = this.times, r = n.length, i = 0, a = r - 1; for (; i !== r && n[i] < e;)++i; for (; a !== -1 && n[a] > t;)--a; if (++a, i !== 0 || a !== r) { i >= a && (a = Math.max(a, 1), i = a - 1); let e = this.getValueSize(); this.times = n.slice(i, a), this.values = this.values.slice(i * e, a * e) } return this } validate() { let e = !0, t = this.getValueSize(); t - Math.floor(t) !== 0 && (U(`KeyframeTrack: Invalid value size in track.`, this), e = !1); let n = this.times, r = this.values, i = n.length; i === 0 && (U(`KeyframeTrack: Track is empty.`, this), e = !1); let a = null; for (let t = 0; t !== i; t++) { let r = n[t]; if (typeof r == `number` && isNaN(r)) { U(`KeyframeTrack: Time is not a valid number.`, this, t, r), e = !1; break } if (a !== null && a > r) { U(`KeyframeTrack: Out of order keys.`, this, t, r, a), e = !1; break } a = r } if (r !== void 0 && ro(r)) for (let t = 0, n = r.length; t !== n; ++t) { let n = r[t]; if (isNaN(n)) { U(`KeyframeTrack: Value is not a valid number.`, this, t, n), e = !1; break } } return e } optimize() { let e = this.times.slice(), t = this.values.slice(), n = this.getValueSize(), r = this.getInterpolation() === Va, i = e.length - 1, a = 1; for (let o = 1; o < i; ++o) { let i = !1, s = e[o]; if (s !== e[o + 1] && (o !== 1 || s !== e[0])) if (r) i = !0; else { let e = o * n, r = e - n, a = e + n; for (let o = 0; o !== n; ++o) { let n = t[e + o]; if (n !== t[r + o] || n !== t[a + o]) { i = !0; break } } } if (i) { if (o !== a) { e[a] = e[o]; let r = o * n, i = a * n; for (let e = 0; e !== n; ++e)t[i + e] = t[r + e] } ++a } } if (i > 0) { e[a] = e[i]; for (let e = i * n, r = a * n, o = 0; o !== n; ++o)t[r + o] = t[e + o]; ++a } return a === e.length ? (this.times = e, this.values = t) : (this.times = e.slice(0, a), this.values = t.slice(0, a * n)), this } clone() { let e = this.times.slice(), t = this.values.slice(), n = this.constructor, r = new n(this.name, e, t); return r.createInterpolant = this.createInterpolant, r } }; qu.prototype.ValueTypeName = ``, qu.prototype.TimeBufferType = Float32Array, qu.prototype.ValueBufferType = Float32Array, qu.prototype.DefaultInterpolation = Ba; var Ju = class extends qu { constructor(e, t, n) { super(e, t, n) } }; Ju.prototype.ValueTypeName = `bool`, Ju.prototype.ValueBufferType = Array, Ju.prototype.DefaultInterpolation = za, Ju.prototype.InterpolantFactoryMethodLinear = void 0, Ju.prototype.InterpolantFactoryMethodSmooth = void 0; var Yu = class extends qu { constructor(e, t, n, r) { super(e, t, n, r) } }; Yu.prototype.ValueTypeName = `color`; var Xu = class extends qu { constructor(e, t, n, r) { super(e, t, n, r) } }; Xu.prototype.ValueTypeName = `number`; var Zu = class extends Hu { constructor(e, t, n, r) { super(e, t, n, r) } interpolate_(e, t, n, r) { let i = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = (n - t) / (r - t), c = e * o; for (let e = c + o; c !== e; c += 4)Vo.slerpFlat(i, 0, a, c - o, a, c, s); return i } }, Qu = class extends qu { constructor(e, t, n, r) { super(e, t, n, r) } InterpolantFactoryMethodLinear(e) { return new Zu(this.times, this.values, this.getValueSize(), e) } }; Qu.prototype.ValueTypeName = `quaternion`, Qu.prototype.InterpolantFactoryMethodSmooth = void 0; var $u = class extends qu { constructor(e, t, n) { super(e, t, n) } }; $u.prototype.ValueTypeName = `string`, $u.prototype.ValueBufferType = Array, $u.prototype.DefaultInterpolation = za, $u.prototype.InterpolantFactoryMethodLinear = void 0, $u.prototype.InterpolantFactoryMethodSmooth = void 0; var ed = class extends qu { constructor(e, t, n, r) { super(e, t, n, r) } }; ed.prototype.ValueTypeName = `vector`; var td = class { constructor(e = ``, t = -1, n = [], r = Ka) { this.name = e, this.tracks = n, this.duration = t, this.blendMode = r, this.uuid = yo(), this.userData = {}, this.duration < 0 && this.resetDuration() } static parse(e) { let t = [], n = e.tracks, r = 1 / (e.fps || 1); for (let e = 0, i = n.length; e !== i; ++e)t.push(rd(n[e]).scale(r)); let i = new this(e.name, e.duration, t, e.blendMode); return i.uuid = e.uuid, i.userData = JSON.parse(e.userData || `{}`), i } static toJSON(e) { let t = [], n = e.tracks, r = { name: e.name, duration: e.duration, tracks: t, uuid: e.uuid, blendMode: e.blendMode, userData: JSON.stringify(e.userData) }; for (let e = 0, r = n.length; e !== r; ++e)t.push(qu.toJSON(n[e])); return r } static CreateFromMorphTargetSequence(e, t, n, r) { let i = t.length, a = []; for (let e = 0; e < i; e++) { let o = [], s = []; o.push((e + i - 1) % i, e, (e + 1) % i), s.push(0, 1, 0); let c = zu(o); o = Bu(o, 1, c), s = Bu(s, 1, c), !r && o[0] === 0 && (o.push(i), s.push(s[0])), a.push(new Xu(`.morphTargetInfluences[` + t[e].name + `]`, o, s).scale(1 / n)) } return new this(e, -1, a) } static findByName(e, t) { let n = e; if (!Array.isArray(e)) { let t = e; n = t.geometry && t.geometry.animations || t.animations } for (let e = 0; e < n.length; e++)if (n[e].name === t) return n[e]; return null } static CreateClipsFromMorphTargetSequences(e, t, n) { let r = {}, i = /^([\w-]*?)([\d]+)$/; for (let t = 0, n = e.length; t < n; t++) { let n = e[t], a = n.name.match(i); if (a && a.length > 1) { let e = a[1], t = r[e]; t || (r[e] = t = []), t.push(n) } } let a = []; for (let e in r) a.push(this.CreateFromMorphTargetSequence(e, r[e], t, n)); return a } static parseAnimation(e, t) { if (H(`AnimationClip: parseAnimation() is deprecated and will be removed with r185`), !e) return U(`AnimationClip: No animation in JSONLoader data.`), null; let n = function (e, t, n, r, i) { if (n.length !== 0) { let a = [], o = []; Vu(n, a, o, r), a.length !== 0 && i.push(new e(t, a, o)) } }, r = [], i = e.name || `default`, a = e.fps || 30, o = e.blendMode, s = e.length || -1, c = e.hierarchy || []; for (let e = 0; e < c.length; e++) { let i = c[e].keys; if (!(!i || i.length === 0)) if (i[0].morphTargets) { let e = {}, t; for (t = 0; t < i.length; t++)if (i[t].morphTargets) for (let n = 0; n < i[t].morphTargets.length; n++)e[i[t].morphTargets[n]] = -1; for (let n in e) { let e = [], a = []; for (let r = 0; r !== i[t].morphTargets.length; ++r) { let r = i[t]; e.push(r.time), a.push(+(r.morphTarget === n)) } r.push(new Xu(`.morphTargetInfluence[` + n + `]`, e, a)) } s = e.length * a } else { let a = `.bones[` + t[e].name + `]`; n(ed, a + `.position`, i, `pos`, r), n(Qu, a + `.quaternion`, i, `rot`, r), n(ed, a + `.scale`, i, `scl`, r) } } return r.length === 0 ? null : new this(i, s, r, o) } resetDuration() { let e = this.tracks, t = 0; for (let n = 0, r = e.length; n !== r; ++n) { let e = this.tracks[n]; t = Math.max(t, e.times[e.times.length - 1]) } return this.duration = t, this } trim() { for (let e = 0; e < this.tracks.length; e++)this.tracks[e].trim(0, this.duration); return this } validate() { let e = !0; for (let t = 0; t < this.tracks.length; t++)e &&= this.tracks[t].validate(); return e } optimize() { for (let e = 0; e < this.tracks.length; e++)this.tracks[e].optimize(); return this } clone() { let e = []; for (let t = 0; t < this.tracks.length; t++)e.push(this.tracks[t].clone()); let t = new this.constructor(this.name, this.duration, e, this.blendMode); return t.userData = JSON.parse(JSON.stringify(this.userData)), t } toJSON() { return this.constructor.toJSON(this) } }; function nd(e) { switch (e.toLowerCase()) { case `scalar`: case `double`: case `float`: case `number`: case `integer`: return Xu; case `vector`: case `vector2`: case `vector3`: case `vector4`: return ed; case `color`: return Yu; case `quaternion`: return Qu; case `bool`: case `boolean`: return Ju; case `string`: return $u }throw Error(`THREE.KeyframeTrack: Unsupported typeName: ` + e) } function rd(e) { if (e.type === void 0) throw Error(`THREE.KeyframeTrack: track type undefined, can not parse`); let t = nd(e.type); if (e.times === void 0) { let t = [], n = []; Vu(e.keys, t, n, `value`), e.times = t, e.values = n } return t.parse === void 0 ? new t(e.name, e.times, e.values, e.interpolation) : t.parse(e) } var id = { enabled: !1, files: {}, add: function (e, t) { this.enabled !== !1 && (ad(e) || (this.files[e] = t)) }, get: function (e) { if (this.enabled !== !1 && !ad(e)) return this.files[e] }, remove: function (e) { delete this.files[e] }, clear: function () { this.files = {} } }; function ad(e) { try { let t = e.slice(e.indexOf(`:`) + 1); return new URL(t).protocol === `blob:` } catch { return !1 } } var od = class { constructor(e, t, n) { let r = this, i = !1, a = 0, o = 0, s, c = []; this.onStart = void 0, this.onLoad = e, this.onProgress = t, this.onError = n, this._abortController = null, this.itemStart = function (e) { o++, i === !1 && r.onStart !== void 0 && r.onStart(e, a, o), i = !0 }, this.itemEnd = function (e) { a++, r.onProgress !== void 0 && r.onProgress(e, a, o), a === o && (i = !1, r.onLoad !== void 0 && r.onLoad()) }, this.itemError = function (e) { r.onError !== void 0 && r.onError(e) }, this.resolveURL = function (e) { return s ? s(e) : e }, this.setURLModifier = function (e) { return s = e, this }, this.addHandler = function (e, t) { return c.push(e, t), this }, this.removeHandler = function (e) { let t = c.indexOf(e); return t !== -1 && c.splice(t, 2), this }, this.getHandler = function (e) { for (let t = 0, n = c.length; t < n; t += 2) { let n = c[t], r = c[t + 1]; if (n.global && (n.lastIndex = 0), n.test(e)) return r } return null }, this.abort = function () { return this.abortController.abort(), this._abortController = null, this } } get abortController() { return this._abortController ||= new AbortController, this._abortController } }, sd = new od, cd = class { constructor(e) { this.manager = e === void 0 ? sd : e, this.crossOrigin = `anonymous`, this.withCredentials = !1, this.path = ``, this.resourcePath = ``, this.requestHeader = {}, typeof __THREE_DEVTOOLS__ < `u` && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`, { detail: this })) } load() { } loadAsync(e, t) { let n = this; return new Promise(function (r, i) { n.load(e, r, t, i) }) } parse() { } setCrossOrigin(e) { return this.crossOrigin = e, this } setWithCredentials(e) { return this.withCredentials = e, this } setPath(e) { return this.path = e, this } setResourcePath(e) { return this.resourcePath = e, this } setRequestHeader(e) { return this.requestHeader = e, this } abort() { return this } }; cd.DEFAULT_MATERIAL_NAME = `__DEFAULT`; var ld = {}, ud = class extends Error { constructor(e, t) { super(e), this.response = t } }, dd = class extends cd { constructor(e) { super(e), this.mimeType = ``, this.responseType = ``, this._abortController = new AbortController } load(e, t, n, r) { e === void 0 && (e = ``), this.path !== void 0 && (e = this.path + e), e = this.manager.resolveURL(e); let i = id.get(`file:${e}`); if (i !== void 0) { this.manager.itemStart(e), setTimeout(() => { t && t(i), this.manager.itemEnd(e) }, 0); return } if (ld[e] !== void 0) { ld[e].push({ onLoad: t, onProgress: n, onError: r }); return } ld[e] = [], ld[e].push({ onLoad: t, onProgress: n, onError: r }); let a = new Request(e, { headers: new Headers(this.requestHeader), credentials: this.withCredentials ? `include` : `same-origin`, signal: typeof AbortSignal.any == `function` ? AbortSignal.any([this._abortController.signal, this.manager.abortController.signal]) : this._abortController.signal }), o = this.mimeType, s = this.responseType; fetch(a).then(t => { if (t.status === 200 || t.status === 0) { if (t.status === 0 && H(`FileLoader: HTTP Status 0 received.`), typeof ReadableStream > `u` || t.body === void 0 || t.body.getReader === void 0) return t; let n = ld[e], r = t.body.getReader(), i = t.headers.get(`X-File-Size`) || t.headers.get(`Content-Length`), a = i ? parseInt(i) : 0, o = a !== 0, s = 0, c = new ReadableStream({ start(e) { t(); function t() { r.read().then(({ done: r, value: i }) => { if (r) e.close(); else { s += i.byteLength; let r = new ProgressEvent(`progress`, { lengthComputable: o, loaded: s, total: a }); for (let e = 0, t = n.length; e < t; e++) { let t = n[e]; t.onProgress && t.onProgress(r) } e.enqueue(i), t() } }, t => { e.error(t) }) } } }); return new Response(c) } else throw new ud(`fetch for "${t.url}" responded with ${t.status}: ${t.statusText}`, t) }).then(e => { switch (s) { case `arraybuffer`: return e.arrayBuffer(); case `blob`: return e.blob(); case `document`: return e.text().then(e => new DOMParser().parseFromString(e, o)); case `json`: return e.json(); default: if (o === ``) return e.text(); { let t = /charset="?([^;"\s]*)"?/i.exec(o), n = t && t[1] ? t[1].toLowerCase() : void 0, r = new TextDecoder(n); return e.arrayBuffer().then(e => r.decode(e)) } } }).then(t => { id.add(`file:${e}`, t); let n = ld[e]; delete ld[e]; for (let e = 0, r = n.length; e < r; e++) { let r = n[e]; r.onLoad && r.onLoad(t) } }).catch(t => { let n = ld[e]; if (n === void 0) throw this.manager.itemError(e), t; delete ld[e]; for (let e = 0, r = n.length; e < r; e++) { let r = n[e]; r.onError && r.onError(t) } this.manager.itemError(e) }).finally(() => { this.manager.itemEnd(e) }), this.manager.itemStart(e) } setResponseType(e) { return this.responseType = e, this } setMimeType(e) { return this.mimeType = e, this } abort() { return this._abortController.abort(), this._abortController = new AbortController, this } }, fd = new WeakMap, pd = class extends cd { constructor(e) { super(e) } load(e, t, n, r) { this.path !== void 0 && (e = this.path + e), e = this.manager.resolveURL(e); let i = this, a = id.get(`image:${e}`); if (a !== void 0) { if (a.complete === !0) i.manager.itemStart(e), setTimeout(function () { t && t(a), i.manager.itemEnd(e) }, 0); else { let e = fd.get(a); e === void 0 && (e = [], fd.set(a, e)), e.push({ onLoad: t, onError: r }) } return a } let o = io(`img`); function s() { l(), t && t(this); let n = fd.get(this) || []; for (let e = 0; e < n.length; e++) { let t = n[e]; t.onLoad && t.onLoad(this) } fd.delete(this), i.manager.itemEnd(e) } function c(t) { l(), r && r(t), id.remove(`image:${e}`); let n = fd.get(this) || []; for (let e = 0; e < n.length; e++) { let r = n[e]; r.onError && r.onError(t) } fd.delete(this), i.manager.itemError(e), i.manager.itemEnd(e) } function l() { o.removeEventListener(`load`, s, !1), o.removeEventListener(`error`, c, !1) } return o.addEventListener(`load`, s, !1), o.addEventListener(`error`, c, !1), e.slice(0, 5) !== `data:` && this.crossOrigin !== void 0 && (o.crossOrigin = this.crossOrigin), id.add(`image:${e}`, o), i.manager.itemStart(e), o.src = e, o } }, md = class extends cd { constructor(e) { super(e) } load(e, t, n, r) { let i = this, a = new kl, o = new dd(this.manager); return o.setResponseType(`arraybuffer`), o.setRequestHeader(this.requestHeader), o.setPath(this.path), o.setWithCredentials(i.withCredentials), o.load(e, function (e) { let n; try { n = i.parse(e) } catch (e) { r === void 0 ? U(e) : r(e); return } n.image === void 0 ? n.data !== void 0 && (a.image.width = n.width, a.image.height = n.height, a.image.data = n.data) : a.image = n.image, a.wrapS = n.wrapS === void 0 ? wi : n.wrapS, a.wrapT = n.wrapT === void 0 ? wi : n.wrapT, a.magFilter = n.magFilter === void 0 ? ki : n.magFilter, a.minFilter = n.minFilter === void 0 ? ki : n.minFilter, a.anisotropy = n.anisotropy === void 0 ? 1 : n.anisotropy, n.colorSpace !== void 0 && (a.colorSpace = n.colorSpace), n.flipY !== void 0 && (a.flipY = n.flipY), n.format !== void 0 && (a.format = n.format), n.type !== void 0 && (a.type = n.type), n.mipmaps !== void 0 && (a.mipmaps = n.mipmaps, a.minFilter = ji), n.mipmapCount === 1 && (a.minFilter = ki), n.generateMipmaps !== void 0 && (a.generateMipmaps = n.generateMipmaps), a.needsUpdate = !0, t && t(a, n) }, n, r), a } }, hd = class extends cd { constructor(e) { super(e) } load(e, t, n, r) { let i = new rs, a = new pd(this.manager); return a.setCrossOrigin(this.crossOrigin), a.setPath(this.path), a.load(e, function (e) { i.image = e, i.needsUpdate = !0, t !== void 0 && t(i) }, n, r), i } }, gd = class extends Fs { constructor(e, t = 1) { super(), this.isLight = !0, this.type = `Light`, this.color = new X(e), this.intensity = t } dispose() { this.dispatchEvent({ type: `dispose` }) } copy(e, t) { return super.copy(e, t), this.color.copy(e.color), this.intensity = e.intensity, this } toJSON(e) { let t = super.toJSON(e); return t.object.color = this.color.getHex(), t.object.intensity = this.intensity, t } }, _d = new Y, vd = new K, yd = new K, bd = class { constructor(e) { this.camera = e, this.intensity = 1, this.bias = 0, this.biasNode = null, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new G(512, 512), this.mapType = Mi, this.map = null, this.mapPass = null, this.matrix = new Y, this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new Yl, this._frameExtents = new G(1, 1), this._viewportCount = 1, this._viewports = [new is(0, 0, 1, 1)] } getViewportCount() { return this._viewportCount } getFrustum() { return this._frustum } updateMatrices(e) { let t = this.camera, n = this.matrix; vd.setFromMatrixPosition(e.matrixWorld), t.position.copy(vd), yd.setFromMatrixPosition(e.target.matrixWorld), t.lookAt(yd), t.updateMatrixWorld(), _d.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), this._frustum.setFromProjectionMatrix(_d, t.coordinateSystem, t.reversedDepth), t.coordinateSystem === 2001 || t.reversedDepth ? n.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, 1, 0, 0, 0, 0, 1) : n.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1), n.multiply(_d) } getViewport(e) { return this._viewports[e] } getFrameExtents() { return this._frameExtents } dispose() { this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose() } copy(e) { return this.camera = e.camera.clone(), this.intensity = e.intensity, this.bias = e.bias, this.radius = e.radius, this.autoUpdate = e.autoUpdate, this.needsUpdate = e.needsUpdate, this.normalBias = e.normalBias, this.blurSamples = e.blurSamples, this.mapSize.copy(e.mapSize), this.biasNode = e.biasNode, this } clone() { return new this.constructor().copy(this) } toJSON() { let e = {}; return this.intensity !== 1 && (e.intensity = this.intensity), this.bias !== 0 && (e.bias = this.bias), this.normalBias !== 0 && (e.normalBias = this.normalBias), this.radius !== 1 && (e.radius = this.radius), (this.mapSize.x !== 512 || this.mapSize.y !== 512) && (e.mapSize = this.mapSize.toArray()), e.camera = this.camera.toJSON(!1).object, delete e.camera.matrix, e } }, xd = new K, Sd = new Vo, Cd = new K, wd = class extends Fs { constructor() { super(), this.isCamera = !0, this.type = `Camera`, this.matrixWorldInverse = new Y, this.projectionMatrix = new Y, this.projectionMatrixInverse = new Y, this.coordinateSystem = to, this._reversedDepth = !1 } get reversedDepth() { return this._reversedDepth } copy(e, t) { return super.copy(e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this.coordinateSystem = e.coordinateSystem, this } getWorldDirection(e) { return super.getWorldDirection(e).negate() } updateMatrixWorld(e) { super.updateMatrixWorld(e), this.matrixWorld.decompose(xd, Sd, Cd), Cd.x === 1 && Cd.y === 1 && Cd.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(xd, Sd, Cd.set(1, 1, 1)).invert() } updateWorldMatrix(e, t) { super.updateWorldMatrix(e, t), this.matrixWorld.decompose(xd, Sd, Cd), Cd.x === 1 && Cd.y === 1 && Cd.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(xd, Sd, Cd.set(1, 1, 1)).invert() } clone() { return new this.constructor().copy(this) } }, Td = new K, Ed = new G, Dd = new G, Od = class extends wd { constructor(e = 50, t = 1, n = .1, r = 2e3) { super(), this.isPerspectiveCamera = !0, this.type = `PerspectiveCamera`, this.fov = e, this.zoom = 1, this.near = n, this.far = r, this.focus = 10, this.aspect = t, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix() } copy(e, t) { return super.copy(e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = e.view === null ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this } setFocalLength(e) { let t = .5 * this.getFilmHeight() / e; this.fov = vo * 2 * Math.atan(t), this.updateProjectionMatrix() } getFocalLength() { let e = Math.tan(_o * .5 * this.fov); return .5 * this.getFilmHeight() / e } getEffectiveFOV() { return vo * 2 * Math.atan(Math.tan(_o * .5 * this.fov) / this.zoom) } getFilmWidth() { return this.filmGauge * Math.min(this.aspect, 1) } getFilmHeight() { return this.filmGauge / Math.max(this.aspect, 1) } getViewBounds(e, t, n) { Td.set(-1, -1, .5).applyMatrix4(this.projectionMatrixInverse), t.set(Td.x, Td.y).multiplyScalar(-e / Td.z), Td.set(1, 1, .5).applyMatrix4(this.projectionMatrixInverse), n.set(Td.x, Td.y).multiplyScalar(-e / Td.z) } getViewSize(e, t) { return this.getViewBounds(e, Ed, Dd), t.subVectors(Dd, Ed) } setViewOffset(e, t, n, r, i, a) { this.aspect = e / t, this.view === null && (this.view = { enabled: !0, fullWidth: 1, fullHeight: 1, offsetX: 0, offsetY: 0, width: 1, height: 1 }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = r, this.view.width = i, this.view.height = a, this.updateProjectionMatrix() } clearViewOffset() { this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix() } updateProjectionMatrix() { let e = this.near, t = e * Math.tan(_o * .5 * this.fov) / this.zoom, n = 2 * t, r = this.aspect * n, i = -.5 * r, a = this.view; if (this.view !== null && this.view.enabled) { let e = a.fullWidth, o = a.fullHeight; i += a.offsetX * r / e, t -= a.offsetY * n / o, r *= a.width / e, n *= a.height / o } let o = this.filmOffset; o !== 0 && (i += e * o / this.getFilmWidth()), this.projectionMatrix.makePerspective(i, i + r, t, t - n, e, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert() } toJSON(e) { let t = super.toJSON(e); return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, this.view !== null && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t } }, kd = class extends bd { constructor() { super(new Od(50, 1, .5, 500)), this.isSpotLightShadow = !0, this.focus = 1, this.aspect = 1 } updateMatrices(e) { let t = this.camera, n = vo * 2 * e.angle * this.focus, r = this.mapSize.width / this.mapSize.height * this.aspect, i = e.distance || t.far; (n !== t.fov || r !== t.aspect || i !== t.far) && (t.fov = n, t.aspect = r, t.far = i, t.updateProjectionMatrix()), super.updateMatrices(e) } copy(e) { return super.copy(e), this.focus = e.focus, this } }, Ad = class extends gd { constructor(e, t, n = 0, r = Math.PI / 3, i = 0, a = 2) { super(e, t), this.isSpotLight = !0, this.type = `SpotLight`, this.position.copy(Fs.DEFAULT_UP), this.updateMatrix(), this.target = new Fs, this.distance = n, this.angle = r, this.penumbra = i, this.decay = a, this.map = null, this.shadow = new kd } get power() { return this.intensity * Math.PI } set power(e) { this.intensity = e / Math.PI } dispose() { super.dispose(), this.shadow.dispose() } copy(e, t) { return super.copy(e, t), this.distance = e.distance, this.angle = e.angle, this.penumbra = e.penumbra, this.decay = e.decay, this.target = e.target.clone(), this.map = e.map, this.shadow = e.shadow.clone(), this } toJSON(e) { let t = super.toJSON(e); return t.object.distance = this.distance, t.object.angle = this.angle, t.object.decay = this.decay, t.object.penumbra = this.penumbra, t.object.target = this.target.uuid, this.map && this.map.isTexture && (t.object.map = this.map.toJSON(e).uuid), t.object.shadow = this.shadow.toJSON(), t } }, jd = class extends bd { constructor() { super(new Od(90, 1, .5, 500)), this.isPointLightShadow = !0 } }, Md = class extends gd { constructor(e, t, n = 0, r = 2) { super(e, t), this.isPointLight = !0, this.type = `PointLight`, this.distance = n, this.decay = r, this.shadow = new jd } get power() { return this.intensity * 4 * Math.PI } set power(e) { this.intensity = e / (4 * Math.PI) } dispose() { super.dispose(), this.shadow.dispose() } copy(e, t) { return super.copy(e, t), this.distance = e.distance, this.decay = e.decay, this.shadow = e.shadow.clone(), this } toJSON(e) { let t = super.toJSON(e); return t.object.distance = this.distance, t.object.decay = this.decay, t.object.shadow = this.shadow.toJSON(), t } }, Nd = class extends wd { constructor(e = -1, t = 1, n = 1, r = -1, i = .1, a = 2e3) { super(), this.isOrthographicCamera = !0, this.type = `OrthographicCamera`, this.zoom = 1, this.view = null, this.left = e, this.right = t, this.top = n, this.bottom = r, this.near = i, this.far = a, this.updateProjectionMatrix() } copy(e, t) { return super.copy(e, t), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = e.view === null ? null : Object.assign({}, e.view), this } setViewOffset(e, t, n, r, i, a) { this.view === null && (this.view = { enabled: !0, fullWidth: 1, fullHeight: 1, offsetX: 0, offsetY: 0, width: 1, height: 1 }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = r, this.view.width = i, this.view.height = a, this.updateProjectionMatrix() } clearViewOffset() { this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix() } updateProjectionMatrix() { let e = (this.right - this.left) / (2 * this.zoom), t = (this.top - this.bottom) / (2 * this.zoom), n = (this.right + this.left) / 2, r = (this.top + this.bottom) / 2, i = n - e, a = n + e, o = r + t, s = r - t; if (this.view !== null && this.view.enabled) { let e = (this.right - this.left) / this.view.fullWidth / this.zoom, t = (this.top - this.bottom) / this.view.fullHeight / this.zoom; i += e * this.view.offsetX, a = i + e * this.view.width, o -= t * this.view.offsetY, s = o - t * this.view.height } this.projectionMatrix.makeOrthographic(i, a, o, s, this.near, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert() } toJSON(e) { let t = super.toJSON(e); return t.object.zoom = this.zoom, t.object.left = this.left, t.object.right = this.right, t.object.top = this.top, t.object.bottom = this.bottom, t.object.near = this.near, t.object.far = this.far, this.view !== null && (t.object.view = Object.assign({}, this.view)), t } }, Pd = class extends bd { constructor() { super(new Nd(-5, 5, 5, -5, .5, 500)), this.isDirectionalLightShadow = !0 } }, Fd = class extends gd { constructor(e, t) { super(e, t), this.isDirectionalLight = !0, this.type = `DirectionalLight`, this.position.copy(Fs.DEFAULT_UP), this.updateMatrix(), this.target = new Fs, this.shadow = new Pd } dispose() { super.dispose(), this.shadow.dispose() } copy(e) { return super.copy(e), this.target = e.target.clone(), this.shadow = e.shadow.clone(), this } toJSON(e) { let t = super.toJSON(e); return t.object.shadow = this.shadow.toJSON(), t.object.target = this.target.uuid, t } }, Id = class extends gd { constructor(e, t) { super(e, t), this.isAmbientLight = !0, this.type = `AmbientLight` } }, Ld = class { static extractUrlBase(e) { let t = e.lastIndexOf(`/`); return t === -1 ? `./` : e.slice(0, t + 1) } static resolveURL(e, t) { return typeof e != `string` || e === `` ? `` : (/^https?:\/\//i.test(t) && /^\//.test(e) && (t = t.replace(/(^https?:\/\/[^\/]+).*/i, `$1`)), /^(https?:)?\/\//i.test(e) || /^data:.*,.*$/i.test(e) || /^blob:.*$/i.test(e) ? e : t + e) } }, Rd = new WeakMap, zd = class extends cd { constructor(e) { super(e), this.isImageBitmapLoader = !0, typeof createImageBitmap > `u` && H(`ImageBitmapLoader: createImageBitmap() not supported.`), typeof fetch > `u` && H(`ImageBitmapLoader: fetch() not supported.`), this.options = { premultiplyAlpha: `none` }, this._abortController = new AbortController } setOptions(e) { return this.options = e, this } load(e, t, n, r) { e === void 0 && (e = ``), this.path !== void 0 && (e = this.path + e), e = this.manager.resolveURL(e); let i = this, a = id.get(`image-bitmap:${e}`); if (a !== void 0) { if (i.manager.itemStart(e), a.then) { a.then(n => { Rd.has(a) === !0 ? (r && r(Rd.get(a)), i.manager.itemError(e), i.manager.itemEnd(e)) : (t && t(n), i.manager.itemEnd(e)) }); return } setTimeout(function () { t && t(a), i.manager.itemEnd(e) }, 0); return } let o = {}; o.credentials = this.crossOrigin === `anonymous` ? `same-origin` : `include`, o.headers = this.requestHeader, o.signal = typeof AbortSignal.any == `function` ? AbortSignal.any([this._abortController.signal, this.manager.abortController.signal]) : this._abortController.signal; let s = fetch(e, o).then(function (e) { return e.blob() }).then(function (e) { return createImageBitmap(e, Object.assign(i.options, { colorSpaceConversion: `none` })) }).then(function (n) { id.add(`image-bitmap:${e}`, n), t && t(n), i.manager.itemEnd(e) }).catch(function (t) { r && r(t), Rd.set(s, t), id.remove(`image-bitmap:${e}`), i.manager.itemError(e), i.manager.itemEnd(e) }); id.add(`image-bitmap:${e}`, s), i.manager.itemStart(e) } abort() { return this._abortController.abort(), this._abortController = new AbortController, this } }, Bd = -90, Vd = 1, Hd = class extends Fs { constructor(e, t, n) { super(), this.type = `CubeCamera`, this.renderTarget = n, this.coordinateSystem = null, this.activeMipmapLevel = 0; let r = new Od(Bd, Vd, e, t); r.layers = this.layers, this.add(r); let i = new Od(Bd, Vd, e, t); i.layers = this.layers, this.add(i); let a = new Od(Bd, Vd, e, t); a.layers = this.layers, this.add(a); let o = new Od(Bd, Vd, e, t); o.layers = this.layers, this.add(o); let s = new Od(Bd, Vd, e, t); s.layers = this.layers, this.add(s); let c = new Od(Bd, Vd, e, t); c.layers = this.layers, this.add(c) } updateCoordinateSystem() { let e = this.coordinateSystem, t = this.children.concat(), [n, r, i, a, o, s] = t; for (let e of t) this.remove(e); if (e === 2e3) n.up.set(0, 1, 0), n.lookAt(1, 0, 0), r.up.set(0, 1, 0), r.lookAt(-1, 0, 0), i.up.set(0, 0, -1), i.lookAt(0, 1, 0), a.up.set(0, 0, 1), a.lookAt(0, -1, 0), o.up.set(0, 1, 0), o.lookAt(0, 0, 1), s.up.set(0, 1, 0), s.lookAt(0, 0, -1); else if (e === 2001) n.up.set(0, -1, 0), n.lookAt(-1, 0, 0), r.up.set(0, -1, 0), r.lookAt(1, 0, 0), i.up.set(0, 0, 1), i.lookAt(0, 1, 0), a.up.set(0, 0, -1), a.lookAt(0, -1, 0), o.up.set(0, -1, 0), o.lookAt(0, 0, 1), s.up.set(0, -1, 0), s.lookAt(0, 0, -1); else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: ` + e); for (let e of t) this.add(e), e.updateMatrixWorld() } update(e, t) { this.parent === null && this.updateMatrixWorld(); let { renderTarget: n, activeMipmapLevel: r } = this; this.coordinateSystem !== e.coordinateSystem && (this.coordinateSystem = e.coordinateSystem, this.updateCoordinateSystem()); let [i, a, o, s, c, l] = this.children, u = e.getRenderTarget(), d = e.getActiveCubeFace(), f = e.getActiveMipmapLevel(), p = e.xr.enabled; e.xr.enabled = !1; let m = n.texture.generateMipmaps; n.texture.generateMipmaps = !1; let h = !1; h = e.isWebGLRenderer === !0 ? e.state.buffers.depth.getReversed() : e.reversedDepthBuffer, e.setRenderTarget(n, 0, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, i), e.setRenderTarget(n, 1, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, a), e.setRenderTarget(n, 2, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, o), e.setRenderTarget(n, 3, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, s), e.setRenderTarget(n, 4, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, c), n.texture.generateMipmaps = m, e.setRenderTarget(n, 5, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, l), e.setRenderTarget(u, d, f), e.xr.enabled = p, n.texture.needsPMREMUpdate = !0 } }, Ud = class extends Od { constructor(e = []) { super(), this.isArrayCamera = !0, this.isMultiViewCamera = !1, this.cameras = e } }, Wd = class { constructor() { this._previousTime = 0, this._currentTime = 0, this._startTime = performance.now(), this._delta = 0, this._elapsed = 0, this._timescale = 1, this._document = null, this._pageVisibilityHandler = null } connect(e) { this._document = e, e.hidden !== void 0 && (this._pageVisibilityHandler = Gd.bind(this), e.addEventListener(`visibilitychange`, this._pageVisibilityHandler, !1)) } disconnect() { this._pageVisibilityHandler !== null && (this._document.removeEventListener(`visibilitychange`, this._pageVisibilityHandler), this._pageVisibilityHandler = null), this._document = null } getDelta() { return this._delta / 1e3 } getElapsed() { return this._elapsed / 1e3 } getTimescale() { return this._timescale } setTimescale(e) { return this._timescale = e, this } reset() { return this._currentTime = performance.now() - this._startTime, this } dispose() { this.disconnect() } update(e) { return this._pageVisibilityHandler !== null && this._document.hidden === !0 ? this._delta = 0 : (this._previousTime = this._currentTime, this._currentTime = (e === void 0 ? performance.now() : e) - this._startTime, this._delta = (this._currentTime - this._previousTime) * this._timescale, this._elapsed += this._delta), this } }; function Gd() { this._document.hidden === !1 && this.reset() } var Kd = class { constructor(e, t, n) { this.binding = e, this.valueSize = n; let r, i, a; switch (t) { case `quaternion`: r = this._slerp, i = this._slerpAdditive, a = this._setAdditiveIdentityQuaternion, this.buffer = new Float64Array(n * 6), this._workIndex = 5; break; case `string`: case `bool`: r = this._select, i = this._select, a = this._setAdditiveIdentityOther, this.buffer = Array(n * 5); break; default: r = this._lerp, i = this._lerpAdditive, a = this._setAdditiveIdentityNumeric, this.buffer = new Float64Array(n * 5) }this._mixBufferRegion = r, this._mixBufferRegionAdditive = i, this._setIdentity = a, this._origIndex = 3, this._addIndex = 4, this.cumulativeWeight = 0, this.cumulativeWeightAdditive = 0, this.useCount = 0, this.referenceCount = 0 } accumulate(e, t) { let n = this.buffer, r = this.valueSize, i = e * r + r, a = this.cumulativeWeight; if (a === 0) { for (let e = 0; e !== r; ++e)n[i + e] = n[e]; a = t } else { a += t; let e = t / a; this._mixBufferRegion(n, i, 0, e, r) } this.cumulativeWeight = a } accumulateAdditive(e) { let t = this.buffer, n = this.valueSize, r = n * this._addIndex; this.cumulativeWeightAdditive === 0 && this._setIdentity(), this._mixBufferRegionAdditive(t, r, 0, e, n), this.cumulativeWeightAdditive += e } apply(e) { let t = this.valueSize, n = this.buffer, r = e * t + t, i = this.cumulativeWeight, a = this.cumulativeWeightAdditive, o = this.binding; if (this.cumulativeWeight = 0, this.cumulativeWeightAdditive = 0, i < 1) { let e = t * this._origIndex; this._mixBufferRegion(n, r, e, 1 - i, t) } a > 0 && this._mixBufferRegionAdditive(n, r, this._addIndex * t, 1, t); for (let e = t, i = t + t; e !== i; ++e)if (n[e] !== n[e + t]) { o.setValue(n, r); break } } saveOriginalState() { let e = this.binding, t = this.buffer, n = this.valueSize, r = n * this._origIndex; e.getValue(t, r); for (let e = n, i = r; e !== i; ++e)t[e] = t[r + e % n]; this._setIdentity(), this.cumulativeWeight = 0, this.cumulativeWeightAdditive = 0 } restoreOriginalState() { let e = this.valueSize * 3; this.binding.setValue(this.buffer, e) } _setAdditiveIdentityNumeric() { let e = this._addIndex * this.valueSize, t = e + this.valueSize; for (let n = e; n < t; n++)this.buffer[n] = 0 } _setAdditiveIdentityQuaternion() { this._setAdditiveIdentityNumeric(), this.buffer[this._addIndex * this.valueSize + 3] = 1 } _setAdditiveIdentityOther() { let e = this._origIndex * this.valueSize, t = this._addIndex * this.valueSize; for (let n = 0; n < this.valueSize; n++)this.buffer[t + n] = this.buffer[e + n] } _select(e, t, n, r, i) { if (r >= .5) for (let r = 0; r !== i; ++r)e[t + r] = e[n + r] } _slerp(e, t, n, r) { Vo.slerpFlat(e, t, e, t, e, n, r) } _slerpAdditive(e, t, n, r, i) { let a = this._workIndex * i; Vo.multiplyQuaternionsFlat(e, a, e, t, e, n), Vo.slerpFlat(e, t, e, t, e, a, r) } _lerp(e, t, n, r, i) { let a = 1 - r; for (let o = 0; o !== i; ++o) { let i = t + o; e[i] = e[i] * a + e[n + o] * r } } _lerpAdditive(e, t, n, r, i) { for (let a = 0; a !== i; ++a) { let i = t + a; e[i] = e[i] + e[n + a] * r } } }, qd = `\\[\\]\\.:\\/`, Jd = RegExp(`[` + qd + `]`, `g`), Yd = `[^` + qd + `]`, Xd = `[^` + qd.replace(`\\.`, ``) + `]`, Zd = `((?:WC+[\\/:])*)`.replace(`WC`, Yd), Qd = `(WCOD+)?`.replace(`WCOD`, Xd), $d = `(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`, Yd), ef = `\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`, Yd), tf = RegExp(`^` + Zd + Qd + $d + ef + `$`), nf = [`material`, `materials`, `bones`, `map`], rf = class { constructor(e, t, n) { let r = n || af.parseTrackName(t); this._targetGroup = e, this._bindings = e.subscribe_(t, r) } getValue(e, t) { this.bind(); let n = this._targetGroup.nCachedObjects_, r = this._bindings[n]; r !== void 0 && r.getValue(e, t) } setValue(e, t) { let n = this._bindings; for (let r = this._targetGroup.nCachedObjects_, i = n.length; r !== i; ++r)n[r].setValue(e, t) } bind() { let e = this._bindings; for (let t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t)e[t].bind() } unbind() { let e = this._bindings; for (let t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t)e[t].unbind() } }, af = class e { constructor(t, n, r) { this.path = n, this.parsedPath = r || e.parseTrackName(n), this.node = e.findNode(t, this.parsedPath.nodeName), this.rootNode = t, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound } static create(t, n, r) { return t && t.isAnimationObjectGroup ? new e.Composite(t, n, r) : new e(t, n, r) } static sanitizeNodeName(e) { return e.replace(/\s/g, `_`).replace(Jd, ``) } static parseTrackName(e) { let t = tf.exec(e); if (t === null) throw Error(`PropertyBinding: Cannot parse trackName: ` + e); let n = { nodeName: t[2], objectName: t[3], objectIndex: t[4], propertyName: t[5], propertyIndex: t[6] }, r = n.nodeName && n.nodeName.lastIndexOf(`.`); if (r !== void 0 && r !== -1) { let e = n.nodeName.substring(r + 1); nf.indexOf(e) !== -1 && (n.nodeName = n.nodeName.substring(0, r), n.objectName = e) } if (n.propertyName === null || n.propertyName.length === 0) throw Error(`PropertyBinding: can not parse propertyName from trackName: ` + e); return n } static findNode(e, t) { if (t === void 0 || t === `` || t === `.` || t === -1 || t === e.name || t === e.uuid) return e; if (e.skeleton) { let n = e.skeleton.getBoneByName(t); if (n !== void 0) return n } if (e.children) { let n = function (e) { for (let r = 0; r < e.length; r++) { let i = e[r]; if (i.name === t || i.uuid === t) return i; let a = n(i.children); if (a) return a } return null }, r = n(e.children); if (r) return r } return null } _getValue_unavailable() { } _setValue_unavailable() { } _getValue_direct(e, t) { e[t] = this.targetObject[this.propertyName] } _getValue_array(e, t) { let n = this.resolvedProperty; for (let r = 0, i = n.length; r !== i; ++r)e[t++] = n[r] } _getValue_arrayElement(e, t) { e[t] = this.resolvedProperty[this.propertyIndex] } _getValue_toArray(e, t) { this.resolvedProperty.toArray(e, t) } _setValue_direct(e, t) { this.targetObject[this.propertyName] = e[t] } _setValue_direct_setNeedsUpdate(e, t) { this.targetObject[this.propertyName] = e[t], this.targetObject.needsUpdate = !0 } _setValue_direct_setMatrixWorldNeedsUpdate(e, t) { this.targetObject[this.propertyName] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0 } _setValue_array(e, t) { let n = this.resolvedProperty; for (let r = 0, i = n.length; r !== i; ++r)n[r] = e[t++] } _setValue_array_setNeedsUpdate(e, t) { let n = this.resolvedProperty; for (let r = 0, i = n.length; r !== i; ++r)n[r] = e[t++]; this.targetObject.needsUpdate = !0 } _setValue_array_setMatrixWorldNeedsUpdate(e, t) { let n = this.resolvedProperty; for (let r = 0, i = n.length; r !== i; ++r)n[r] = e[t++]; this.targetObject.matrixWorldNeedsUpdate = !0 } _setValue_arrayElement(e, t) { this.resolvedProperty[this.propertyIndex] = e[t] } _setValue_arrayElement_setNeedsUpdate(e, t) { this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.needsUpdate = !0 } _setValue_arrayElement_setMatrixWorldNeedsUpdate(e, t) { this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0 } _setValue_fromArray(e, t) { this.resolvedProperty.fromArray(e, t) } _setValue_fromArray_setNeedsUpdate(e, t) { this.resolvedProperty.fromArray(e, t), this.targetObject.needsUpdate = !0 } _setValue_fromArray_setMatrixWorldNeedsUpdate(e, t) { this.resolvedProperty.fromArray(e, t), this.targetObject.matrixWorldNeedsUpdate = !0 } _getValue_unbound(e, t) { this.bind(), this.getValue(e, t) } _setValue_unbound(e, t) { this.bind(), this.setValue(e, t) } bind() { let t = this.node, n = this.parsedPath, r = n.objectName, i = n.propertyName, a = n.propertyIndex; if (t || (t = e.findNode(this.rootNode, n.nodeName), this.node = t), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !t) { H(`PropertyBinding: No target node found for track: ` + this.path + `.`); return } if (r) { let e = n.objectIndex; switch (r) { case `materials`: if (!t.material) { U(`PropertyBinding: Can not bind to material as node does not have a material.`, this); return } if (!t.material.materials) { U(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`, this); return } t = t.material.materials; break; case `bones`: if (!t.skeleton) { U(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`, this); return } t = t.skeleton.bones; for (let n = 0; n < t.length; n++)if (t[n].name === e) { e = n; break } break; case `map`: if (`map` in t) { t = t.map; break } if (!t.material) { U(`PropertyBinding: Can not bind to material as node does not have a material.`, this); return } if (!t.material.map) { U(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`, this); return } t = t.material.map; break; default: if (t[r] === void 0) { U(`PropertyBinding: Can not bind to objectName of node undefined.`, this); return } t = t[r] }if (e !== void 0) { if (t[e] === void 0) { U(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`, this, t); return } t = t[e] } } let o = t[i]; if (o === void 0) { let e = n.nodeName; U(`PropertyBinding: Trying to update property for track: ` + e + `.` + i + ` but it wasn't found.`, t); return } let s = this.Versioning.None; this.targetObject = t, t.isMaterial === !0 ? s = this.Versioning.NeedsUpdate : t.isObject3D === !0 && (s = this.Versioning.MatrixWorldNeedsUpdate); let c = this.BindingType.Direct; if (a !== void 0) { if (i === `morphTargetInfluences`) { if (!t.geometry) { U(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`, this); return } if (!t.geometry.morphAttributes) { U(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`, this); return } t.morphTargetDictionary[a] !== void 0 && (a = t.morphTargetDictionary[a]) } c = this.BindingType.ArrayElement, this.resolvedProperty = o, this.propertyIndex = a } else o.fromArray !== void 0 && o.toArray !== void 0 ? (c = this.BindingType.HasFromToArray, this.resolvedProperty = o) : Array.isArray(o) ? (c = this.BindingType.EntireArray, this.resolvedProperty = o) : this.propertyName = i; this.getValue = this.GetterByBindingType[c], this.setValue = this.SetterByBindingTypeAndVersioning[c][s] } unbind() { this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound } }; af.Composite = rf, af.prototype.BindingType = { Direct: 0, EntireArray: 1, ArrayElement: 2, HasFromToArray: 3 }, af.prototype.Versioning = { None: 0, NeedsUpdate: 1, MatrixWorldNeedsUpdate: 2 }, af.prototype.GetterByBindingType = [af.prototype._getValue_direct, af.prototype._getValue_array, af.prototype._getValue_arrayElement, af.prototype._getValue_toArray], af.prototype.SetterByBindingTypeAndVersioning = [[af.prototype._setValue_direct, af.prototype._setValue_direct_setNeedsUpdate, af.prototype._setValue_direct_setMatrixWorldNeedsUpdate], [af.prototype._setValue_array, af.prototype._setValue_array_setNeedsUpdate, af.prototype._setValue_array_setMatrixWorldNeedsUpdate], [af.prototype._setValue_arrayElement, af.prototype._setValue_arrayElement_setNeedsUpdate, af.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate], [af.prototype._setValue_fromArray, af.prototype._setValue_fromArray_setNeedsUpdate, af.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]]; var of = class { constructor(e, t, n = null, r = t.blendMode) { this._mixer = e, this._clip = t, this._localRoot = n, this.blendMode = r; let i = t.tracks, a = i.length, o = Array(a), s = { endingStart: Ua, endingEnd: Ua }; for (let e = 0; e !== a; ++e) { let t = i[e].createInterpolant(null); o[e] = t, t.settings && Object.assign(s, t.settings), t.settings = s } this._interpolantSettings = s, this._interpolants = o, this._propertyBindings = Array(a), this._cacheIndex = null, this._byClipCacheIndex = null, this._timeScaleInterpolant = null, this._weightInterpolant = null, this.loop = La, this._loopCount = -1, this._startTime = null, this.time = 0, this.timeScale = 1, this._effectiveTimeScale = 1, this.weight = 1, this._effectiveWeight = 1, this.repetitions = 1 / 0, this.paused = !1, this.enabled = !0, this.clampWhenFinished = !1, this.zeroSlopeAtStart = !0, this.zeroSlopeAtEnd = !0 } play() { return this._mixer._activateAction(this), this } stop() { return this._mixer._deactivateAction(this), this.reset() } reset() { return this.paused = !1, this.enabled = !0, this.time = 0, this._loopCount = -1, this._startTime = null, this.stopFading().stopWarping() } isRunning() { return this.enabled && !this.paused && this.timeScale !== 0 && this._startTime === null && this._mixer._isActiveAction(this) } isScheduled() { return this._mixer._isActiveAction(this) } startAt(e) { return this._startTime = e, this } setLoop(e, t) { return this.loop = e, this.repetitions = t, this } setEffectiveWeight(e) { return this.weight = e, this._effectiveWeight = this.enabled ? e : 0, this.stopFading() } getEffectiveWeight() { return this._effectiveWeight } fadeIn(e) { return this._scheduleFading(e, 0, 1) } fadeOut(e) { return this._scheduleFading(e, 1, 0) } crossFadeFrom(e, t, n = !1) { if (e.fadeOut(t), this.fadeIn(t), n === !0) { let n = this._clip.duration, r = e._clip.duration, i = r / n, a = n / r; e.warp(1, i, t), this.warp(a, 1, t) } return this } crossFadeTo(e, t, n = !1) { return e.crossFadeFrom(this, t, n) } stopFading() { let e = this._weightInterpolant; return e !== null && (this._weightInterpolant = null, this._mixer._takeBackControlInterpolant(e)), this } setEffectiveTimeScale(e) { return this.timeScale = e, this._effectiveTimeScale = this.paused ? 0 : e, this.stopWarping() } getEffectiveTimeScale() { return this._effectiveTimeScale } setDuration(e) { return this.timeScale = this._clip.duration / e, this.stopWarping() } syncWith(e) { return this.time = e.time, this.timeScale = e.timeScale, this.stopWarping() } halt(e) { return this.warp(this._effectiveTimeScale, 0, e) } warp(e, t, n) { let r = this._mixer, i = r.time, a = this.timeScale, o = this._timeScaleInterpolant; o === null && (o = r._lendControlInterpolant(), this._timeScaleInterpolant = o); let s = o.parameterPositions, c = o.sampleValues; return s[0] = i, s[1] = i + n, c[0] = e / a, c[1] = t / a, this } stopWarping() { let e = this._timeScaleInterpolant; return e !== null && (this._timeScaleInterpolant = null, this._mixer._takeBackControlInterpolant(e)), this } getMixer() { return this._mixer } getClip() { return this._clip } getRoot() { return this._localRoot || this._mixer._root } _update(e, t, n, r) { if (!this.enabled) { this._updateWeight(e); return } let i = this._startTime; if (i !== null) { let r = (e - i) * n; r < 0 || n === 0 ? t = 0 : (this._startTime = null, t = n * r) } t *= this._updateTimeScale(e); let a = this._updateTime(t), o = this._updateWeight(e); if (o > 0) { let e = this._interpolants, t = this._propertyBindings; switch (this.blendMode) { case qa: for (let n = 0, r = e.length; n !== r; ++n)e[n].evaluate(a), t[n].accumulateAdditive(o); break; case Ka: default: for (let n = 0, i = e.length; n !== i; ++n)e[n].evaluate(a), t[n].accumulate(r, o) } } } _updateWeight(e) { let t = 0; if (this.enabled) { t = this.weight; let n = this._weightInterpolant; if (n !== null) { let r = n.evaluate(e)[0]; t *= r, e > n.parameterPositions[1] && (this.stopFading(), r === 0 && (this.enabled = !1)) } } return this._effectiveWeight = t, t } _updateTimeScale(e) { let t = 0; if (!this.paused) { t = this.timeScale; let n = this._timeScaleInterpolant; if (n !== null) { let r = n.evaluate(e)[0]; t *= r, e > n.parameterPositions[1] && (this.stopWarping(), t === 0 ? this.paused = !0 : this.timeScale = t) } } return this._effectiveTimeScale = t, t } _updateTime(e) { let t = this._clip.duration, n = this.loop, r = this.time + e, i = this._loopCount, a = n === Ra; if (e === 0) return i === -1 ? r : a && (i & 1) == 1 ? t - r : r; if (n === 2200) { i === -1 && (this._loopCount = 0, this._setEndings(!0, !0, !1)); handle_stop: { if (r >= t) r = t; else if (r < 0) r = 0; else { this.time = r; break handle_stop } this.clampWhenFinished ? this.paused = !0 : this.enabled = !1, this.time = r, this._mixer.dispatchEvent({ type: `finished`, action: this, direction: e < 0 ? -1 : 1 }) } } else { if (i === -1 && (e >= 0 ? (i = 0, this._setEndings(!0, this.repetitions === 0, a)) : this._setEndings(this.repetitions === 0, !0, a)), r >= t || r < 0) { let n = Math.floor(r / t); r -= t * n, i += Math.abs(n); let o = this.repetitions - i; if (o <= 0) this.clampWhenFinished ? this.paused = !0 : this.enabled = !1, r = e > 0 ? t : 0, this.time = r, this._mixer.dispatchEvent({ type: `finished`, action: this, direction: e > 0 ? 1 : -1 }); else { if (o === 1) { let t = e < 0; this._setEndings(t, !t, a) } else this._setEndings(!1, !1, a); this._loopCount = i, this.time = r, this._mixer.dispatchEvent({ type: `loop`, action: this, loopDelta: n }) } } else this._loopCount = i, this.time = r; if (a && (i & 1) == 1) return t - r } return r } _setEndings(e, t, n) { let r = this._interpolantSettings; n ? (r.endingStart = Wa, r.endingEnd = Wa) : (e ? r.endingStart = this.zeroSlopeAtStart ? Wa : Ua : r.endingStart = Ga, t ? r.endingEnd = this.zeroSlopeAtEnd ? Wa : Ua : r.endingEnd = Ga) } _scheduleFading(e, t, n) { let r = this._mixer, i = r.time, a = this._weightInterpolant; a === null && (a = r._lendControlInterpolant(), this._weightInterpolant = a); let o = a.parameterPositions, s = a.sampleValues; return o[0] = i, s[0] = t, o[1] = i + e, s[1] = n, this } }, sf = new Float32Array(1), cf = class extends mo { constructor(e) { super(), this._root = e, this._initMemoryManager(), this._accuIndex = 0, this.time = 0, this.timeScale = 1, typeof __THREE_DEVTOOLS__ < `u` && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`, { detail: this })) } _bindAction(e, t) { let n = e._localRoot || this._root, r = e._clip.tracks, i = r.length, a = e._propertyBindings, o = e._interpolants, s = n.uuid, c = this._bindingsByRootAndName, l = c[s]; l === void 0 && (l = {}, c[s] = l); for (let e = 0; e !== i; ++e) { let i = r[e], c = i.name, u = l[c]; if (u !== void 0) ++u.referenceCount, a[e] = u; else { if (u = a[e], u !== void 0) { u._cacheIndex === null && (++u.referenceCount, this._addInactiveBinding(u, s, c)); continue } let r = t && t._propertyBindings[e].binding.parsedPath; u = new Kd(af.create(n, c, r), i.ValueTypeName, i.getValueSize()), ++u.referenceCount, this._addInactiveBinding(u, s, c), a[e] = u } o[e].resultBuffer = u.buffer } } _activateAction(e) { if (!this._isActiveAction(e)) { if (e._cacheIndex === null) { let t = (e._localRoot || this._root).uuid, n = e._clip.uuid, r = this._actionsByClip[n]; this._bindAction(e, r && r.knownActions[0]), this._addInactiveAction(e, n, t) } let t = e._propertyBindings; for (let e = 0, n = t.length; e !== n; ++e) { let n = t[e]; n.useCount++ === 0 && (this._lendBinding(n), n.saveOriginalState()) } this._lendAction(e) } } _deactivateAction(e) { if (this._isActiveAction(e)) { let t = e._propertyBindings; for (let e = 0, n = t.length; e !== n; ++e) { let n = t[e]; --n.useCount === 0 && (n.restoreOriginalState(), this._takeBackBinding(n)) } this._takeBackAction(e) } } _initMemoryManager() { this._actions = [], this._nActiveActions = 0, this._actionsByClip = {}, this._bindings = [], this._nActiveBindings = 0, this._bindingsByRootAndName = {}, this._controlInterpolants = [], this._nActiveControlInterpolants = 0; let e = this; this.stats = { actions: { get total() { return e._actions.length }, get inUse() { return e._nActiveActions } }, bindings: { get total() { return e._bindings.length }, get inUse() { return e._nActiveBindings } }, controlInterpolants: { get total() { return e._controlInterpolants.length }, get inUse() { return e._nActiveControlInterpolants } } } } _isActiveAction(e) { let t = e._cacheIndex; return t !== null && t < this._nActiveActions } _addInactiveAction(e, t, n) { let r = this._actions, i = this._actionsByClip, a = i[t]; if (a === void 0) a = { knownActions: [e], actionByRoot: {} }, e._byClipCacheIndex = 0, i[t] = a; else { let t = a.knownActions; e._byClipCacheIndex = t.length, t.push(e) } e._cacheIndex = r.length, r.push(e), a.actionByRoot[n] = e } _removeInactiveAction(e) { let t = this._actions, n = t[t.length - 1], r = e._cacheIndex; n._cacheIndex = r, t[r] = n, t.pop(), e._cacheIndex = null; let i = e._clip.uuid, a = this._actionsByClip, o = a[i], s = o.knownActions, c = s[s.length - 1], l = e._byClipCacheIndex; c._byClipCacheIndex = l, s[l] = c, s.pop(), e._byClipCacheIndex = null; let u = o.actionByRoot, d = (e._localRoot || this._root).uuid; delete u[d], s.length === 0 && delete a[i], this._removeInactiveBindingsForAction(e) } _removeInactiveBindingsForAction(e) { let t = e._propertyBindings; for (let e = 0, n = t.length; e !== n; ++e) { let n = t[e]; --n.referenceCount === 0 && this._removeInactiveBinding(n) } } _lendAction(e) { let t = this._actions, n = e._cacheIndex, r = this._nActiveActions++, i = t[r]; e._cacheIndex = r, t[r] = e, i._cacheIndex = n, t[n] = i } _takeBackAction(e) { let t = this._actions, n = e._cacheIndex, r = --this._nActiveActions, i = t[r]; e._cacheIndex = r, t[r] = e, i._cacheIndex = n, t[n] = i } _addInactiveBinding(e, t, n) { let r = this._bindingsByRootAndName, i = this._bindings, a = r[t]; a === void 0 && (a = {}, r[t] = a), a[n] = e, e._cacheIndex = i.length, i.push(e) } _removeInactiveBinding(e) { let t = this._bindings, n = e.binding, r = n.rootNode.uuid, i = n.path, a = this._bindingsByRootAndName, o = a[r], s = t[t.length - 1], c = e._cacheIndex; s._cacheIndex = c, t[c] = s, t.pop(), delete o[i], Object.keys(o).length === 0 && delete a[r] } _lendBinding(e) { let t = this._bindings, n = e._cacheIndex, r = this._nActiveBindings++, i = t[r]; e._cacheIndex = r, t[r] = e, i._cacheIndex = n, t[n] = i } _takeBackBinding(e) { let t = this._bindings, n = e._cacheIndex, r = --this._nActiveBindings, i = t[r]; e._cacheIndex = r, t[r] = e, i._cacheIndex = n, t[n] = i } _lendControlInterpolant() { let e = this._controlInterpolants, t = this._nActiveControlInterpolants++, n = e[t]; return n === void 0 && (n = new Wu(new Float32Array(2), new Float32Array(2), 1, sf), n.__cacheIndex = t, e[t] = n), n } _takeBackControlInterpolant(e) { let t = this._controlInterpolants, n = e.__cacheIndex, r = --this._nActiveControlInterpolants, i = t[r]; e.__cacheIndex = r, t[r] = e, i.__cacheIndex = n, t[n] = i } clipAction(e, t, n) { let r = t || this._root, i = r.uuid, a = typeof e == `string` ? td.findByName(r, e) : e, o = a === null ? e : a.uuid, s = this._actionsByClip[o], c = null; if (n === void 0 && (n = a === null ? Ka : a.blendMode), s !== void 0) { let e = s.actionByRoot[i]; if (e !== void 0 && e.blendMode === n) return e; c = s.knownActions[0], a === null && (a = c._clip) } if (a === null) return null; let l = new of(this, a, t, n); return this._bindAction(l, c), this._addInactiveAction(l, o, i), l } existingAction(e, t) { let n = t || this._root, r = n.uuid, i = typeof e == `string` ? td.findByName(n, e) : e, a = i ? i.uuid : e, o = this._actionsByClip[a]; return o === void 0 ? null : o.actionByRoot[r] || null } stopAllAction() { let e = this._actions, t = this._nActiveActions; for (let n = t - 1; n >= 0; --n)e[n].stop(); return this } update(e) { e *= this.timeScale; let t = this._actions, n = this._nActiveActions, r = this.time += e, i = Math.sign(e), a = this._accuIndex ^= 1; for (let o = 0; o !== n; ++o)t[o]._update(r, e, i, a); let o = this._bindings, s = this._nActiveBindings; for (let e = 0; e !== s; ++e)o[e].apply(a); return this } setTime(e) { this.time = 0; for (let e = 0; e < this._actions.length; e++)this._actions[e].time = 0; return this.update(e) } getRoot() { return this._root } uncacheClip(e) { let t = this._actions, n = e.uuid, r = this._actionsByClip, i = r[n]; if (i !== void 0) { let e = i.knownActions; for (let n = 0, r = e.length; n !== r; ++n) { let r = e[n]; this._deactivateAction(r); let i = r._cacheIndex, a = t[t.length - 1]; r._cacheIndex = null, r._byClipCacheIndex = null, a._cacheIndex = i, t[i] = a, t.pop(), this._removeInactiveBindingsForAction(r) } delete r[n] } } uncacheRoot(e) { let t = e.uuid, n = this._actionsByClip; for (let e in n) { let r = n[e].actionByRoot[t]; r !== void 0 && (this._deactivateAction(r), this._removeInactiveAction(r)) } let r = this._bindingsByRootAndName[t]; if (r !== void 0) for (let e in r) { let t = r[e]; t.restoreOriginalState(), this._removeInactiveBinding(t) } } uncacheAction(e, t) { let n = this.existingAction(e, t); n !== null && (this._deactivateAction(n), this._removeInactiveAction(n)) } }; (class e { static { e.prototype.isMatrix2 = !0 } constructor(e, t, n, r) { this.elements = [1, 0, 0, 1], e !== void 0 && this.set(e, t, n, r) } identity() { return this.set(1, 0, 0, 1), this } fromArray(e, t = 0) { for (let n = 0; n < 4; n++)this.elements[n] = e[n + t]; return this } set(e, t, n, r) { let i = this.elements; return i[0] = e, i[2] = t, i[1] = n, i[3] = r, this } }); var lf = new K, uf = new K, df = new K, ff = new K, pf = new K, mf = new K, hf = new K, gf = class { constructor(e = new K, t = new K) { this.start = e, this.end = t } set(e, t) { return this.start.copy(e), this.end.copy(t), this } copy(e) { return this.start.copy(e.start), this.end.copy(e.end), this } getCenter(e) { return e.addVectors(this.start, this.end).multiplyScalar(.5) } delta(e) { return e.subVectors(this.end, this.start) } distanceSq() { return this.start.distanceToSquared(this.end) } distance() { return this.start.distanceTo(this.end) } at(e, t) { return this.delta(t).multiplyScalar(e).add(this.start) } closestPointToPointParameter(e, t) { lf.subVectors(e, this.start), uf.subVectors(this.end, this.start); let n = uf.dot(uf); if (n === 0) return 0; let r = uf.dot(lf) / n; return t && (r = W(r, 0, 1)), r } closestPointToPoint(e, t, n) { let r = this.closestPointToPointParameter(e, t); return this.delta(n).multiplyScalar(r).add(this.start) } distanceSqToLine3(e, t = mf, n = hf) { let r = 1e-8 * 1e-8, i, a, o = this.start, s = e.start, c = this.end, l = e.end; df.subVectors(c, o), ff.subVectors(l, s), pf.subVectors(o, s); let u = df.dot(df), d = ff.dot(ff), f = ff.dot(pf); if (u <= r && d <= r) return t.copy(o), n.copy(s), t.sub(n), t.dot(t); if (u <= r) i = 0, a = f / d, a = W(a, 0, 1); else { let e = df.dot(pf); if (d <= r) a = 0, i = W(-e / u, 0, 1); else { let t = df.dot(ff), n = u * d - t * t; i = n === 0 ? 0 : W((t * f - e * d) / n, 0, 1), a = (t * i + f) / d, a < 0 ? (a = 0, i = W(-e / u, 0, 1)) : a > 1 && (a = 1, i = W((t - e) / u, 0, 1)) } } return t.copy(o).addScaledVector(df, i), n.copy(s).addScaledVector(ff, a), t.distanceToSquared(n) } applyMatrix4(e) { return this.start.applyMatrix4(e), this.end.applyMatrix4(e), this } equals(e) { return e.start.equals(this.start) && e.end.equals(this.end) } clone() { return new this.constructor().copy(this) } }; function _f(e, t, n, r) { let i = vf(r); switch (n) { case Gi: return e * t; case Xi: return e * t / i.components * i.byteLength; case Zi: return e * t / i.components * i.byteLength; case Qi: return e * t * 2 / i.components * i.byteLength; case $i: return e * t * 2 / i.components * i.byteLength; case Ki: return e * t * 3 / i.components * i.byteLength; case qi: return e * t * 4 / i.components * i.byteLength; case ea: return e * t * 4 / i.components * i.byteLength; case ta: case na: return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 8; case ra: case ia: return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16; case oa: case ca: return Math.max(e, 16) * Math.max(t, 8) / 4; case aa: case sa: return Math.max(e, 8) * Math.max(t, 8) / 2; case la: case ua: case fa: case pa: return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 8; case da: case ma: case ha: return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16; case ga: return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16; case _a: return Math.floor((e + 4) / 5) * Math.floor((t + 3) / 4) * 16; case va: return Math.floor((e + 4) / 5) * Math.floor((t + 4) / 5) * 16; case ya: return Math.floor((e + 5) / 6) * Math.floor((t + 4) / 5) * 16; case ba: return Math.floor((e + 5) / 6) * Math.floor((t + 5) / 6) * 16; case xa: return Math.floor((e + 7) / 8) * Math.floor((t + 4) / 5) * 16; case Sa: return Math.floor((e + 7) / 8) * Math.floor((t + 5) / 6) * 16; case Ca: return Math.floor((e + 7) / 8) * Math.floor((t + 7) / 8) * 16; case wa: return Math.floor((e + 9) / 10) * Math.floor((t + 4) / 5) * 16; case Ta: return Math.floor((e + 9) / 10) * Math.floor((t + 5) / 6) * 16; case Ea: return Math.floor((e + 9) / 10) * Math.floor((t + 7) / 8) * 16; case Da: return Math.floor((e + 9) / 10) * Math.floor((t + 9) / 10) * 16; case Oa: return Math.floor((e + 11) / 12) * Math.floor((t + 9) / 10) * 16; case ka: return Math.floor((e + 11) / 12) * Math.floor((t + 11) / 12) * 16; case Aa: case ja: case Ma: return Math.ceil(e / 4) * Math.ceil(t / 4) * 16; case Na: case Pa: return Math.ceil(e / 4) * Math.ceil(t / 4) * 8; case Fa: case Ia: return Math.ceil(e / 4) * Math.ceil(t / 4) * 16 }throw Error(`Unable to determine texture byte length for ${n} format.`) } function vf(e) { switch (e) { case Mi: case Ni: return { byteLength: 1, components: 1 }; case Fi: case Pi: case zi: return { byteLength: 2, components: 1 }; case Bi: case Vi: return { byteLength: 2, components: 4 }; case Li: case Ii: case Ri: return { byteLength: 4, components: 1 }; case Ui: case Wi: return { byteLength: 4, components: 3 } }throw Error(`Unknown texture type ${e}.`) } typeof __THREE_DEVTOOLS__ < `u` && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`, { detail: { revision: `184` } })), typeof window < `u` && (window.__THREE__ ? H(`WARNING: Multiple instances of Three.js being imported.`) : window.__THREE__ = `184`); function yf() { let e = null, t = !1, n = null, r = null; function i(t, a) { n(t, a), r = e.requestAnimationFrame(i) } return { start: function () { t !== !0 && n !== null && e !== null && (r = e.requestAnimationFrame(i), t = !0) }, stop: function () { e !== null && e.cancelAnimationFrame(r), t = !1 }, setAnimationLoop: function (e) { n = e }, setContext: function (t) { e = t } } } function bf(e) { let t = new WeakMap; function n(t, n) { let r = t.array, i = t.usage, a = r.byteLength, o = e.createBuffer(); e.bindBuffer(n, o), e.bufferData(n, r, i), t.onUploadCallback(); let s; if (r instanceof Float32Array) s = e.FLOAT; else if (typeof Float16Array < `u` && r instanceof Float16Array) s = e.HALF_FLOAT; else if (r instanceof Uint16Array) s = t.isFloat16BufferAttribute ? e.HALF_FLOAT : e.UNSIGNED_SHORT; else if (r instanceof Int16Array) s = e.SHORT; else if (r instanceof Uint32Array) s = e.UNSIGNED_INT; else if (r instanceof Int32Array) s = e.INT; else if (r instanceof Int8Array) s = e.BYTE; else if (r instanceof Uint8Array) s = e.UNSIGNED_BYTE; else if (r instanceof Uint8ClampedArray) s = e.UNSIGNED_BYTE; else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: ` + r); return { buffer: o, type: s, bytesPerElement: r.BYTES_PER_ELEMENT, version: t.version, size: a } } function r(t, n, r) { let i = n.array, a = n.updateRanges; if (e.bindBuffer(r, t), a.length === 0) e.bufferSubData(r, 0, i); else { a.sort((e, t) => e.start - t.start); let t = 0; for (let e = 1; e < a.length; e++) { let n = a[t], r = a[e]; r.start <= n.start + n.count + 1 ? n.count = Math.max(n.count, r.start + r.count - n.start) : (++t, a[t] = r) } a.length = t + 1; for (let t = 0, n = a.length; t < n; t++) { let n = a[t]; e.bufferSubData(r, n.start * i.BYTES_PER_ELEMENT, i, n.start, n.count) } n.clearUpdateRanges() } n.onUploadCallback() } function i(e) { return e.isInterleavedBufferAttribute && (e = e.data), t.get(e) } function a(n) { n.isInterleavedBufferAttribute && (n = n.data); let r = t.get(n); r && (e.deleteBuffer(r.buffer), t.delete(n)) } function o(e, i) { if (e.isInterleavedBufferAttribute && (e = e.data), e.isGLBufferAttribute) { let n = t.get(e); (!n || n.version < e.version) && t.set(e, { buffer: e.buffer, type: e.type, bytesPerElement: e.elementSize, version: e.version }); return } let a = t.get(e); if (a === void 0) t.set(e, n(e, i)); else if (a.version < e.version) { if (a.size !== e.array.byteLength) throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`); r(a.buffer, e, i), a.version = e.version } } return { get: i, remove: a, update: o } } var Z = {
	alphahash_fragment: `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`, alphahash_pars_fragment: `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`, alphamap_fragment: `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`, alphamap_pars_fragment: `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, alphatest_fragment: `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`, alphatest_pars_fragment: `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`, aomap_fragment: `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`, aomap_pars_fragment: `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`, batching_pars_vertex: `#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`, batching_vertex: `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`, begin_vertex: `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`, beginnormal_vertex: `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`, bsdfs: `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`, iridescence_fragment: `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`, bumpmap_pars_fragment: `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`, clipping_planes_fragment: `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`, clipping_planes_pars_fragment: `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`, clipping_planes_pars_vertex: `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`, clipping_planes_vertex: `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`, color_fragment: `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`, color_pars_fragment: `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`, color_pars_vertex: `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`, color_vertex: `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`, common: `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`, cube_uv_reflection_fragment: `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`, defaultnormal_vertex: `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`, displacementmap_pars_vertex: `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`, displacementmap_vertex: `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`, emissivemap_fragment: `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`, emissivemap_pars_fragment: `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`, colorspace_fragment: `gl_FragColor = linearToOutputTexel( gl_FragColor );`, colorspace_pars_fragment: `vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`, envmap_fragment: `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`, envmap_common_pars_fragment: `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`, envmap_pars_fragment: `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`, envmap_pars_vertex: `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`, envmap_physical_pars_fragment: `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`, envmap_vertex: `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`, fog_vertex: `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`, fog_pars_vertex: `#ifdef USE_FOG
	varying float vFogDepth;
#endif`, fog_fragment: `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`, fog_pars_fragment: `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`, gradientmap_pars_fragment: `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`, lightmap_pars_fragment: `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`, lights_lambert_fragment: `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`, lights_lambert_pars_fragment: `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`, lights_pars_begin: `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`, lights_toon_fragment: `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`, lights_toon_pars_fragment: `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`, lights_phong_fragment: `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`, lights_phong_pars_fragment: `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`, lights_physical_fragment: `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`, lights_physical_pars_fragment: `uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`, lights_fragment_begin: `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = inverseTransformDirection( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`, lights_fragment_maps: `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`, lights_fragment_end: `#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`, lightprobes_pars_fragment: `#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`, logdepthbuf_fragment: `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`, logdepthbuf_pars_fragment: `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, logdepthbuf_pars_vertex: `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, logdepthbuf_vertex: `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`, map_fragment: `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`, map_pars_fragment: `#ifdef USE_MAP
	uniform sampler2D map;
#endif`, map_particle_fragment: `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`, map_particle_pars_fragment: `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, metalnessmap_fragment: `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`, metalnessmap_pars_fragment: `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`, morphinstance_vertex: `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`, morphcolor_vertex: `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`, morphnormal_vertex: `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, morphtarget_pars_vertex: `#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`, morphtarget_vertex: `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, normal_fragment_begin: `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`, normal_fragment_maps: `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`, normal_pars_fragment: `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, normal_pars_vertex: `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, normal_vertex: `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`, normalmap_pars_fragment: `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`, clearcoat_normal_fragment_begin: `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`, clearcoat_normal_fragment_maps: `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`, clearcoat_pars_fragment: `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`, iridescence_pars_fragment: `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`, opaque_fragment: `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`, packing: `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`, premultiplied_alpha_fragment: `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`, project_vertex: `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`, dithering_fragment: `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`, dithering_pars_fragment: `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`, roughnessmap_fragment: `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`, roughnessmap_pars_fragment: `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`, shadowmap_pars_fragment: `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`, shadowmap_pars_vertex: `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`, shadowmap_vertex: `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`, shadowmask_pars_fragment: `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`, skinbase_vertex: `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`, skinning_pars_vertex: `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`, skinning_vertex: `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`, skinnormal_vertex: `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`, specularmap_fragment: `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`, specularmap_pars_fragment: `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`, tonemapping_fragment: `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`, tonemapping_pars_fragment: `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`, transmission_fragment: `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`, transmission_pars_fragment: `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`, uv_pars_fragment: `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, uv_pars_vertex: `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, uv_vertex: `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`, worldpos_vertex: `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`, background_vert: `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`, background_frag: `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, backgroundCube_vert: `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, backgroundCube_frag: `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, cube_vert: `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, cube_frag: `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, depth_vert: `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`, depth_frag: `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`, distance_vert: `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`, distance_frag: `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`, equirect_vert: `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`, equirect_frag: `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, linedashed_vert: `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, linedashed_frag: `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, meshbasic_vert: `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`, meshbasic_frag: `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, meshlambert_vert: `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, meshlambert_frag: `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, meshmatcap_vert: `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`, meshmatcap_frag: `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, meshnormal_vert: `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`, meshnormal_frag: `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`, meshphong_vert: `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, meshphong_frag: `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, meshphysical_vert: `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`, meshphysical_frag: `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, meshtoon_vert: `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, meshtoon_frag: `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, points_vert: `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`, points_frag: `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, shadow_vert: `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, shadow_frag: `uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, sprite_vert: `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, sprite_frag: `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`}, Q = { common: { diffuse: { value: new X(16777215) }, opacity: { value: 1 }, map: { value: null }, mapTransform: { value: new q }, alphaMap: { value: null }, alphaMapTransform: { value: new q }, alphaTest: { value: 0 } }, specularmap: { specularMap: { value: null }, specularMapTransform: { value: new q } }, envmap: { envMap: { value: null }, envMapRotation: { value: new q }, reflectivity: { value: 1 }, ior: { value: 1.5 }, refractionRatio: { value: .98 }, dfgLUT: { value: null } }, aomap: { aoMap: { value: null }, aoMapIntensity: { value: 1 }, aoMapTransform: { value: new q } }, lightmap: { lightMap: { value: null }, lightMapIntensity: { value: 1 }, lightMapTransform: { value: new q } }, bumpmap: { bumpMap: { value: null }, bumpMapTransform: { value: new q }, bumpScale: { value: 1 } }, normalmap: { normalMap: { value: null }, normalMapTransform: { value: new q }, normalScale: { value: new G(1, 1) } }, displacementmap: { displacementMap: { value: null }, displacementMapTransform: { value: new q }, displacementScale: { value: 1 }, displacementBias: { value: 0 } }, emissivemap: { emissiveMap: { value: null }, emissiveMapTransform: { value: new q } }, metalnessmap: { metalnessMap: { value: null }, metalnessMapTransform: { value: new q } }, roughnessmap: { roughnessMap: { value: null }, roughnessMapTransform: { value: new q } }, gradientmap: { gradientMap: { value: null } }, fog: { fogDensity: { value: 25e-5 }, fogNear: { value: 1 }, fogFar: { value: 2e3 }, fogColor: { value: new X(16777215) } }, lights: { ambientLightColor: { value: [] }, lightProbe: { value: [] }, directionalLights: { value: [], properties: { direction: {}, color: {} } }, directionalLightShadows: { value: [], properties: { shadowIntensity: 1, shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {} } }, directionalShadowMatrix: { value: [] }, spotLights: { value: [], properties: { color: {}, position: {}, direction: {}, distance: {}, coneCos: {}, penumbraCos: {}, decay: {} } }, spotLightShadows: { value: [], properties: { shadowIntensity: 1, shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {} } }, spotLightMap: { value: [] }, spotLightMatrix: { value: [] }, pointLights: { value: [], properties: { color: {}, position: {}, decay: {}, distance: {} } }, pointLightShadows: { value: [], properties: { shadowIntensity: 1, shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {}, shadowCameraNear: {}, shadowCameraFar: {} } }, pointShadowMatrix: { value: [] }, hemisphereLights: { value: [], properties: { direction: {}, skyColor: {}, groundColor: {} } }, rectAreaLights: { value: [], properties: { color: {}, position: {}, width: {}, height: {} } }, ltc_1: { value: null }, ltc_2: { value: null }, probesSH: { value: null }, probesMin: { value: new K }, probesMax: { value: new K }, probesResolution: { value: new K } }, points: { diffuse: { value: new X(16777215) }, opacity: { value: 1 }, size: { value: 1 }, scale: { value: 1 }, map: { value: null }, alphaMap: { value: null }, alphaMapTransform: { value: new q }, alphaTest: { value: 0 }, uvTransform: { value: new q } }, sprite: { diffuse: { value: new X(16777215) }, opacity: { value: 1 }, center: { value: new G(.5, .5) }, rotation: { value: 0 }, map: { value: null }, mapTransform: { value: new q }, alphaMap: { value: null }, alphaMapTransform: { value: new q }, alphaTest: { value: 0 } } }, xf = { basic: { uniforms: Tu([Q.common, Q.specularmap, Q.envmap, Q.aomap, Q.lightmap, Q.fog]), vertexShader: Z.meshbasic_vert, fragmentShader: Z.meshbasic_frag }, lambert: { uniforms: Tu([Q.common, Q.specularmap, Q.envmap, Q.aomap, Q.lightmap, Q.emissivemap, Q.bumpmap, Q.normalmap, Q.displacementmap, Q.fog, Q.lights, { emissive: { value: new X(0) }, envMapIntensity: { value: 1 } }]), vertexShader: Z.meshlambert_vert, fragmentShader: Z.meshlambert_frag }, phong: { uniforms: Tu([Q.common, Q.specularmap, Q.envmap, Q.aomap, Q.lightmap, Q.emissivemap, Q.bumpmap, Q.normalmap, Q.displacementmap, Q.fog, Q.lights, { emissive: { value: new X(0) }, specular: { value: new X(1118481) }, shininess: { value: 30 }, envMapIntensity: { value: 1 } }]), vertexShader: Z.meshphong_vert, fragmentShader: Z.meshphong_frag }, standard: { uniforms: Tu([Q.common, Q.envmap, Q.aomap, Q.lightmap, Q.emissivemap, Q.bumpmap, Q.normalmap, Q.displacementmap, Q.roughnessmap, Q.metalnessmap, Q.fog, Q.lights, { emissive: { value: new X(0) }, roughness: { value: 1 }, metalness: { value: 0 }, envMapIntensity: { value: 1 } }]), vertexShader: Z.meshphysical_vert, fragmentShader: Z.meshphysical_frag }, toon: { uniforms: Tu([Q.common, Q.aomap, Q.lightmap, Q.emissivemap, Q.bumpmap, Q.normalmap, Q.displacementmap, Q.gradientmap, Q.fog, Q.lights, { emissive: { value: new X(0) } }]), vertexShader: Z.meshtoon_vert, fragmentShader: Z.meshtoon_frag }, matcap: { uniforms: Tu([Q.common, Q.bumpmap, Q.normalmap, Q.displacementmap, Q.fog, { matcap: { value: null } }]), vertexShader: Z.meshmatcap_vert, fragmentShader: Z.meshmatcap_frag }, points: { uniforms: Tu([Q.points, Q.fog]), vertexShader: Z.points_vert, fragmentShader: Z.points_frag }, dashed: { uniforms: Tu([Q.common, Q.fog, { scale: { value: 1 }, dashSize: { value: 1 }, totalSize: { value: 2 } }]), vertexShader: Z.linedashed_vert, fragmentShader: Z.linedashed_frag }, depth: { uniforms: Tu([Q.common, Q.displacementmap]), vertexShader: Z.depth_vert, fragmentShader: Z.depth_frag }, normal: { uniforms: Tu([Q.common, Q.bumpmap, Q.normalmap, Q.displacementmap, { opacity: { value: 1 } }]), vertexShader: Z.meshnormal_vert, fragmentShader: Z.meshnormal_frag }, sprite: { uniforms: Tu([Q.sprite, Q.fog]), vertexShader: Z.sprite_vert, fragmentShader: Z.sprite_frag }, background: { uniforms: { uvTransform: { value: new q }, t2D: { value: null }, backgroundIntensity: { value: 1 } }, vertexShader: Z.background_vert, fragmentShader: Z.background_frag }, backgroundCube: { uniforms: { envMap: { value: null }, backgroundBlurriness: { value: 0 }, backgroundIntensity: { value: 1 }, backgroundRotation: { value: new q } }, vertexShader: Z.backgroundCube_vert, fragmentShader: Z.backgroundCube_frag }, cube: { uniforms: { tCube: { value: null }, tFlip: { value: -1 }, opacity: { value: 1 } }, vertexShader: Z.cube_vert, fragmentShader: Z.cube_frag }, equirect: { uniforms: { tEquirect: { value: null } }, vertexShader: Z.equirect_vert, fragmentShader: Z.equirect_frag }, distance: { uniforms: Tu([Q.common, Q.displacementmap, { referencePosition: { value: new K }, nearDistance: { value: 1 }, farDistance: { value: 1e3 } }]), vertexShader: Z.distance_vert, fragmentShader: Z.distance_frag }, shadow: { uniforms: Tu([Q.lights, Q.fog, { color: { value: new X(0) }, opacity: { value: 1 } }]), vertexShader: Z.shadow_vert, fragmentShader: Z.shadow_frag } }; xf.physical = { uniforms: Tu([xf.standard.uniforms, { clearcoat: { value: 0 }, clearcoatMap: { value: null }, clearcoatMapTransform: { value: new q }, clearcoatNormalMap: { value: null }, clearcoatNormalMapTransform: { value: new q }, clearcoatNormalScale: { value: new G(1, 1) }, clearcoatRoughness: { value: 0 }, clearcoatRoughnessMap: { value: null }, clearcoatRoughnessMapTransform: { value: new q }, dispersion: { value: 0 }, iridescence: { value: 0 }, iridescenceMap: { value: null }, iridescenceMapTransform: { value: new q }, iridescenceIOR: { value: 1.3 }, iridescenceThicknessMinimum: { value: 100 }, iridescenceThicknessMaximum: { value: 400 }, iridescenceThicknessMap: { value: null }, iridescenceThicknessMapTransform: { value: new q }, sheen: { value: 0 }, sheenColor: { value: new X(0) }, sheenColorMap: { value: null }, sheenColorMapTransform: { value: new q }, sheenRoughness: { value: 1 }, sheenRoughnessMap: { value: null }, sheenRoughnessMapTransform: { value: new q }, transmission: { value: 0 }, transmissionMap: { value: null }, transmissionMapTransform: { value: new q }, transmissionSamplerSize: { value: new G }, transmissionSamplerMap: { value: null }, thickness: { value: 0 }, thicknessMap: { value: null }, thicknessMapTransform: { value: new q }, attenuationDistance: { value: 0 }, attenuationColor: { value: new X(0) }, specularColor: { value: new X(1, 1, 1) }, specularColorMap: { value: null }, specularColorMapTransform: { value: new q }, specularIntensity: { value: 1 }, specularIntensityMap: { value: null }, specularIntensityMapTransform: { value: new q }, anisotropyVector: { value: new G }, anisotropyMap: { value: null }, anisotropyMapTransform: { value: new q } }]), vertexShader: Z.meshphysical_vert, fragmentShader: Z.meshphysical_frag }; var Sf = { r: 0, b: 0, g: 0 }, Cf = new Y, wf = new q; wf.set(-1, 0, 0, 0, 1, 0, 0, 0, 1); function Tf(e, t, n, r, i, a) { let o = new X(0), s = i === !0 ? 0 : 1, c, l, u = null, d = 0, f = null; function p(e) { let n = e.isScene === !0 ? e.background : null; if (n && n.isTexture) { let r = e.backgroundBlurriness > 0; n = t.get(n, r) } return n } function m(t) { let r = !1, i = p(t); i === null ? g(o, s) : i && i.isColor && (g(i, 1), r = !0); let c = e.xr.getEnvironmentBlendMode(); c === `additive` ? n.buffers.color.setClear(0, 0, 0, 1, a) : c === `alpha-blend` && n.buffers.color.setClear(0, 0, 0, 0, a), (e.autoClear || r) && (n.buffers.depth.setTest(!0), n.buffers.depth.setMask(!0), n.buffers.color.setMask(!0), e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil)) } function h(t, n) { let i = p(n); i && (i.isCubeTexture || i.mapping === 306) ? (l === void 0 && (l = new hl(new xu(1, 1, 1), new Mu({ name: `BackgroundCubeMaterial`, uniforms: wu(xf.backgroundCube.uniforms), vertexShader: xf.backgroundCube.vertexShader, fragmentShader: xf.backgroundCube.fragmentShader, side: 1, depthTest: !1, depthWrite: !1, fog: !1, allowOverride: !1 })), l.geometry.deleteAttribute(`normal`), l.geometry.deleteAttribute(`uv`), l.onBeforeRender = function (e, t, n) { this.matrixWorld.copyPosition(n.matrixWorld) }, Object.defineProperty(l.material, `envMap`, { get: function () { return this.uniforms.envMap.value } }), r.update(l)), l.material.uniforms.envMap.value = i, l.material.uniforms.backgroundBlurriness.value = n.backgroundBlurriness, l.material.uniforms.backgroundIntensity.value = n.backgroundIntensity, l.material.uniforms.backgroundRotation.value.setFromMatrix4(Cf.makeRotationFromEuler(n.backgroundRotation)).transpose(), i.isCubeTexture && i.isRenderTargetTexture === !1 && l.material.uniforms.backgroundRotation.value.premultiply(wf), l.material.toneMapped = J.getTransfer(i.colorSpace) !== Qa, (u !== i || d !== i.version || f !== e.toneMapping) && (l.material.needsUpdate = !0, u = i, d = i.version, f = e.toneMapping), l.layers.enableAll(), t.unshift(l, l.geometry, l.material, 0, 0, null)) : i && i.isTexture && (c === void 0 && (c = new hl(new Su(2, 2), new Mu({ name: `BackgroundMaterial`, uniforms: wu(xf.background.uniforms), vertexShader: xf.background.vertexShader, fragmentShader: xf.background.fragmentShader, side: 0, depthTest: !1, depthWrite: !1, fog: !1, allowOverride: !1 })), c.geometry.deleteAttribute(`normal`), Object.defineProperty(c.material, `map`, { get: function () { return this.uniforms.t2D.value } }), r.update(c)), c.material.uniforms.t2D.value = i, c.material.uniforms.backgroundIntensity.value = n.backgroundIntensity, c.material.toneMapped = J.getTransfer(i.colorSpace) !== Qa, i.matrixAutoUpdate === !0 && i.updateMatrix(), c.material.uniforms.uvTransform.value.copy(i.matrix), (u !== i || d !== i.version || f !== e.toneMapping) && (c.material.needsUpdate = !0, u = i, d = i.version, f = e.toneMapping), c.layers.enableAll(), t.unshift(c, c.geometry, c.material, 0, 0, null)) } function g(t, r) { t.getRGB(Sf, Ou(e)), n.buffers.color.setClear(Sf.r, Sf.g, Sf.b, r, a) } function _() { l !== void 0 && (l.geometry.dispose(), l.material.dispose(), l = void 0), c !== void 0 && (c.geometry.dispose(), c.material.dispose(), c = void 0) } return { getClearColor: function () { return o }, setClearColor: function (e, t = 1) { o.set(e), s = t, g(o, s) }, getClearAlpha: function () { return s }, setClearAlpha: function (e) { s = e, g(o, s) }, render: m, addToRenderList: h, dispose: _ } } function Ef(e, t) { let n = e.getParameter(e.MAX_VERTEX_ATTRIBS), r = {}, i = f(null), a = i, o = !1; function s(n, r, i, s, c) { let u = !1, f = d(n, s, i, r); a !== f && (a = f, l(a.object)), u = p(n, s, i, c), u && m(n, s, i, c), c !== null && t.update(c, e.ELEMENT_ARRAY_BUFFER), (u || o) && (o = !1, b(n, r, i, s), c !== null && e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, t.get(c).buffer)) } function c() { return e.createVertexArray() } function l(t) { return e.bindVertexArray(t) } function u(t) { return e.deleteVertexArray(t) } function d(e, t, n, i) { let a = i.wireframe === !0, o = r[t.id]; o === void 0 && (o = {}, r[t.id] = o); let s = e.isInstancedMesh === !0 ? e.id : 0, l = o[s]; l === void 0 && (l = {}, o[s] = l); let u = l[n.id]; u === void 0 && (u = {}, l[n.id] = u); let d = u[a]; return d === void 0 && (d = f(c()), u[a] = d), d } function f(e) { let t = [], r = [], i = []; for (let e = 0; e < n; e++)t[e] = 0, r[e] = 0, i[e] = 0; return { geometry: null, program: null, wireframe: !1, newAttributes: t, enabledAttributes: r, attributeDivisors: i, object: e, attributes: {}, index: null } } function p(e, t, n, r) { let i = a.attributes, o = t.attributes, s = 0, c = n.getAttributes(); for (let t in c) if (c[t].location >= 0) { let n = i[t], r = o[t]; if (r === void 0 && (t === `instanceMatrix` && e.instanceMatrix && (r = e.instanceMatrix), t === `instanceColor` && e.instanceColor && (r = e.instanceColor)), n === void 0 || n.attribute !== r || r && n.data !== r.data) return !0; s++ } return a.attributesNum !== s || a.index !== r } function m(e, t, n, r) { let i = {}, o = t.attributes, s = 0, c = n.getAttributes(); for (let t in c) if (c[t].location >= 0) { let n = o[t]; n === void 0 && (t === `instanceMatrix` && e.instanceMatrix && (n = e.instanceMatrix), t === `instanceColor` && e.instanceColor && (n = e.instanceColor)); let r = {}; r.attribute = n, n && n.data && (r.data = n.data), i[t] = r, s++ } a.attributes = i, a.attributesNum = s, a.index = r } function h() { let e = a.newAttributes; for (let t = 0, n = e.length; t < n; t++)e[t] = 0 } function g(e) { _(e, 0) } function _(t, n) { let r = a.newAttributes, i = a.enabledAttributes, o = a.attributeDivisors; r[t] = 1, i[t] === 0 && (e.enableVertexAttribArray(t), i[t] = 1), o[t] !== n && (e.vertexAttribDivisor(t, n), o[t] = n) } function v() { let t = a.newAttributes, n = a.enabledAttributes; for (let r = 0, i = n.length; r < i; r++)n[r] !== t[r] && (e.disableVertexAttribArray(r), n[r] = 0) } function y(t, n, r, i, a, o, s) { s === !0 ? e.vertexAttribIPointer(t, n, r, a, o) : e.vertexAttribPointer(t, n, r, i, a, o) } function b(n, r, i, a) { h(); let o = a.attributes, s = i.getAttributes(), c = r.defaultAttributeValues; for (let r in s) { let i = s[r]; if (i.location >= 0) { let s = o[r]; if (s === void 0 && (r === `instanceMatrix` && n.instanceMatrix && (s = n.instanceMatrix), r === `instanceColor` && n.instanceColor && (s = n.instanceColor)), s !== void 0) { let r = s.normalized, o = s.itemSize, c = t.get(s); if (c === void 0) continue; let l = c.buffer, u = c.type, d = c.bytesPerElement, f = u === e.INT || u === e.UNSIGNED_INT || s.gpuType === 1013; if (s.isInterleavedBufferAttribute) { let t = s.data, c = t.stride, p = s.offset; if (t.isInstancedInterleavedBuffer) { for (let e = 0; e < i.locationSize; e++)_(i.location + e, t.meshPerAttribute); n.isInstancedMesh !== !0 && a._maxInstanceCount === void 0 && (a._maxInstanceCount = t.meshPerAttribute * t.count) } else for (let e = 0; e < i.locationSize; e++)g(i.location + e); e.bindBuffer(e.ARRAY_BUFFER, l); for (let e = 0; e < i.locationSize; e++)y(i.location + e, o / i.locationSize, u, r, c * d, (p + o / i.locationSize * e) * d, f) } else { if (s.isInstancedBufferAttribute) { for (let e = 0; e < i.locationSize; e++)_(i.location + e, s.meshPerAttribute); n.isInstancedMesh !== !0 && a._maxInstanceCount === void 0 && (a._maxInstanceCount = s.meshPerAttribute * s.count) } else for (let e = 0; e < i.locationSize; e++)g(i.location + e); e.bindBuffer(e.ARRAY_BUFFER, l); for (let e = 0; e < i.locationSize; e++)y(i.location + e, o / i.locationSize, u, r, o * d, o / i.locationSize * e * d, f) } } else if (c !== void 0) { let t = c[r]; if (t !== void 0) switch (t.length) { case 2: e.vertexAttrib2fv(i.location, t); break; case 3: e.vertexAttrib3fv(i.location, t); break; case 4: e.vertexAttrib4fv(i.location, t); break; default: e.vertexAttrib1fv(i.location, t) } } } } v() } function x() { T(); for (let e in r) { let t = r[e]; for (let e in t) { let n = t[e]; for (let e in n) { let t = n[e]; for (let e in t) u(t[e].object), delete t[e]; delete n[e] } } delete r[e] } } function S(e) { if (r[e.id] === void 0) return; let t = r[e.id]; for (let e in t) { let n = t[e]; for (let e in n) { let t = n[e]; for (let e in t) u(t[e].object), delete t[e]; delete n[e] } } delete r[e.id] } function C(e) { for (let t in r) { let n = r[t]; for (let t in n) { let r = n[t]; if (r[e.id] === void 0) continue; let i = r[e.id]; for (let e in i) u(i[e].object), delete i[e]; delete r[e.id] } } } function w(e) { for (let t in r) { let n = r[t], i = e.isInstancedMesh === !0 ? e.id : 0, a = n[i]; if (a !== void 0) { for (let e in a) { let t = a[e]; for (let e in t) u(t[e].object), delete t[e]; delete a[e] } delete n[i], Object.keys(n).length === 0 && delete r[t] } } } function T() { E(), o = !0, a !== i && (a = i, l(a.object)) } function E() { i.geometry = null, i.program = null, i.wireframe = !1 } return { setup: s, reset: T, resetDefaultState: E, dispose: x, releaseStatesOfGeometry: S, releaseStatesOfObject: w, releaseStatesOfProgram: C, initAttributes: h, enableAttribute: g, disableUnusedAttributes: v } } function Df(e, t, n) { let r; function i(e) { r = e } function a(t, i) { e.drawArrays(r, t, i), n.update(i, r, 1) } function o(t, i, a) { a !== 0 && (e.drawArraysInstanced(r, t, i, a), n.update(i, r, a)) } function s(e, i, a) { if (a === 0) return; t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r, e, 0, i, 0, a); let o = 0; for (let e = 0; e < a; e++)o += i[e]; n.update(o, r, 1) } this.setMode = i, this.render = a, this.renderInstances = o, this.renderMultiDraw = s } function Of(e, t, n, r) { let i; function a() { if (i !== void 0) return i; if (t.has(`EXT_texture_filter_anisotropic`) === !0) { let n = t.get(`EXT_texture_filter_anisotropic`); i = e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT) } else i = 0; return i } function o(t) { return !(t !== 1023 && r.convert(t) !== e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)) } function s(n) { let i = n === 1016 && (t.has(`EXT_color_buffer_half_float`) || t.has(`EXT_color_buffer_float`)); return !(n !== 1009 && r.convert(n) !== e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE) && n !== 1015 && !i) } function c(t) { if (t === `highp`) { if (e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).precision > 0 && e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).precision > 0) return `highp`; t = `mediump` } return t === `mediump` && e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).precision > 0 && e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).precision > 0 ? `mediump` : `lowp` } let l = n.precision === void 0 ? `highp` : n.precision, u = c(l); u !== l && (H(`WebGLRenderer:`, l, `not supported, using`, u, `instead.`), l = u); let d = n.logarithmicDepthBuffer === !0, f = n.reversedDepthBuffer === !0 && t.has(`EXT_clip_control`); n.reversedDepthBuffer === !0 && f === !1 && H(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`); let p = e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS), m = e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS), h = e.getParameter(e.MAX_TEXTURE_SIZE), g = e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE), _ = e.getParameter(e.MAX_VERTEX_ATTRIBS), v = e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS), y = e.getParameter(e.MAX_VARYING_VECTORS), b = e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS), x = e.getParameter(e.MAX_SAMPLES), S = e.getParameter(e.SAMPLES); return { isWebGL2: !0, getMaxAnisotropy: a, getMaxPrecision: c, textureFormatReadable: o, textureTypeReadable: s, precision: l, logarithmicDepthBuffer: d, reversedDepthBuffer: f, maxTextures: p, maxVertexTextures: m, maxTextureSize: h, maxCubemapSize: g, maxAttributes: _, maxVertexUniforms: v, maxVaryings: y, maxFragmentUniforms: b, maxSamples: x, samples: S } } function kf(e) { let t = this, n = null, r = 0, i = !1, a = !1, o = new Gl, s = new q, c = { value: null, needsUpdate: !1 }; this.uniform = c, this.numPlanes = 0, this.numIntersection = 0, this.init = function (e, t) { let n = e.length !== 0 || t || r !== 0 || i; return i = t, r = e.length, n }, this.beginShadows = function () { a = !0, u(null) }, this.endShadows = function () { a = !1 }, this.setGlobalState = function (e, t) { n = u(e, t, 0) }, this.setState = function (t, o, s) { let d = t.clippingPlanes, f = t.clipIntersection, p = t.clipShadows, m = e.get(t); if (!i || d === null || d.length === 0 || a && !p) a ? u(null) : l(); else { let e = a ? 0 : r, t = e * 4, i = m.clippingState || null; c.value = i, i = u(d, o, t, s); for (let e = 0; e !== t; ++e)i[e] = n[e]; m.clippingState = i, this.numIntersection = f ? this.numPlanes : 0, this.numPlanes += e } }; function l() { c.value !== n && (c.value = n, c.needsUpdate = r > 0), t.numPlanes = r, t.numIntersection = 0 } function u(e, n, r, i) { let a = e === null ? 0 : e.length, l = null; if (a !== 0) { if (l = c.value, i !== !0 || l === null) { let t = r + a * 4, i = n.matrixWorldInverse; s.getNormalMatrix(i), (l === null || l.length < t) && (l = new Float32Array(t)); for (let t = 0, n = r; t !== a; ++t, n += 4)o.copy(e[t]).applyMatrix4(i, s), o.normal.toArray(l, n), l[n + 3] = o.constant } c.value = l, c.needsUpdate = !0 } return t.numPlanes = a, t.numIntersection = 0, l } } var Af = 4, jf = [.125, .215, .35, .446, .526, .582], Mf = 20, Nf = 256, Pf = new Nd, Ff = new X, If = null, Lf = 0, Rf = 0, zf = !1, Bf = new K, Vf = class { constructor(e) { this._renderer = e, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._sizeLods = [], this._sigmas = [], this._lodMeshes = [], this._backgroundBox = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._blurMaterial = null, this._ggxMaterial = null } fromScene(e, t = 0, n = .1, r = 100, i = {}) { let { size: a = 256, position: o = Bf } = i; If = this._renderer.getRenderTarget(), Lf = this._renderer.getActiveCubeFace(), Rf = this._renderer.getActiveMipmapLevel(), zf = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(a); let s = this._allocateTargets(); return s.depthBuffer = !0, this._sceneToCubeUV(e, n, r, s, o), t > 0 && this._blur(s, 0, 0, t), this._applyPMREM(s), this._cleanup(s), s } fromEquirectangular(e, t = null) { return this._fromTexture(e, t) } fromCubemap(e, t = null) { return this._fromTexture(e, t) } compileCubemapShader() { this._cubemapMaterial === null && (this._cubemapMaterial = Jf(), this._compileMaterial(this._cubemapMaterial)) } compileEquirectangularShader() { this._equirectMaterial === null && (this._equirectMaterial = qf(), this._compileMaterial(this._equirectMaterial)) } dispose() { this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose(), this._backgroundBox !== null && (this._backgroundBox.geometry.dispose(), this._backgroundBox.material.dispose()) } _setSize(e) { this._lodMax = Math.floor(Math.log2(e)), this._cubeSize = 2 ** this._lodMax } _dispose() { this._blurMaterial !== null && this._blurMaterial.dispose(), this._ggxMaterial !== null && this._ggxMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose(); for (let e = 0; e < this._lodMeshes.length; e++)this._lodMeshes[e].geometry.dispose() } _cleanup(e) { this._renderer.setRenderTarget(If, Lf, Rf), this._renderer.xr.enabled = zf, e.scissorTest = !1, Wf(e, 0, 0, e.width, e.height) } _fromTexture(e, t) { e.mapping === 301 || e.mapping === 302 ? this._setSize(e.image.length === 0 ? 16 : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4), If = this._renderer.getRenderTarget(), Lf = this._renderer.getActiveCubeFace(), Rf = this._renderer.getActiveMipmapLevel(), zf = this._renderer.xr.enabled, this._renderer.xr.enabled = !1; let n = t || this._allocateTargets(); return this._textureToCubeUV(e, n), this._applyPMREM(n), this._cleanup(n), n } _allocateTargets() { let e = 3 * Math.max(this._cubeSize, 112), t = 4 * this._cubeSize, n = { magFilter: ki, minFilter: ki, generateMipmaps: !1, type: zi, format: qi, colorSpace: Xa, depthBuffer: !1 }, r = Uf(e, t, n); if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== e || this._pingPongRenderTarget.height !== t) { this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = Uf(e, t, n); let { _lodMax: r } = this; ({ lodMeshes: this._lodMeshes, sizeLods: this._sizeLods, sigmas: this._sigmas } = Hf(r)), this._blurMaterial = Kf(r, e, t), this._ggxMaterial = Gf(r, e, t) } return r } _compileMaterial(e) { let t = new hl(new Uc, e); this._renderer.compile(t, Pf) } _sceneToCubeUV(e, t, n, r, i) { let a = new Od(90, 1, t, n), o = [1, -1, 1, 1, 1, 1], s = [1, 1, 1, -1, -1, -1], c = this._renderer, l = c.autoClear, u = c.toneMapping; c.getClearColor(Ff), c.toneMapping = 0, c.autoClear = !1, c.state.buffers.depth.getReversed() && (c.setRenderTarget(r), c.clearDepth(), c.setRenderTarget(null)), this._backgroundBox === null && (this._backgroundBox = new hl(new xu, new rl({ name: `PMREM.Background`, side: 1, depthWrite: !1, depthTest: !1 }))); let d = this._backgroundBox, f = d.material, p = !1, m = e.background; m ? m.isColor && (f.color.copy(m), e.background = null, p = !0) : (f.color.copy(Ff), p = !0); for (let t = 0; t < 6; t++) { let n = t % 3; n === 0 ? (a.up.set(0, o[t], 0), a.position.set(i.x, i.y, i.z), a.lookAt(i.x + s[t], i.y, i.z)) : n === 1 ? (a.up.set(0, 0, o[t]), a.position.set(i.x, i.y, i.z), a.lookAt(i.x, i.y + s[t], i.z)) : (a.up.set(0, o[t], 0), a.position.set(i.x, i.y, i.z), a.lookAt(i.x, i.y, i.z + s[t])); let l = this._cubeSize; Wf(r, n * l, t > 2 ? l : 0, l, l), c.setRenderTarget(r), p && c.render(d, a), c.render(e, a) } c.toneMapping = u, c.autoClear = l, e.background = m } _textureToCubeUV(e, t) { let n = this._renderer, r = e.mapping === 301 || e.mapping === 302; r ? (this._cubemapMaterial === null && (this._cubemapMaterial = Jf()), this._cubemapMaterial.uniforms.flipEnvMap.value = e.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = qf()); let i = r ? this._cubemapMaterial : this._equirectMaterial, a = this._lodMeshes[0]; a.material = i; let o = i.uniforms; o.envMap.value = e; let s = this._cubeSize; Wf(t, 0, 0, 3 * s, 2 * s), n.setRenderTarget(t), n.render(a, Pf) } _applyPMREM(e) { let t = this._renderer, n = t.autoClear; t.autoClear = !1; let r = this._lodMeshes.length; for (let t = 1; t < r; t++)this._applyGGXFilter(e, t - 1, t); t.autoClear = n } _applyGGXFilter(e, t, n) { let r = this._renderer, i = this._pingPongRenderTarget, a = this._ggxMaterial, o = this._lodMeshes[n]; o.material = a; let s = a.uniforms, c = n / (this._lodMeshes.length - 1), l = t / (this._lodMeshes.length - 1), u = Math.sqrt(c * c - l * l) * (0 + c * 1.25), { _lodMax: d } = this, f = this._sizeLods[n], p = 3 * f * (n > d - Af ? n - d + Af : 0), m = 4 * (this._cubeSize - f); s.envMap.value = e.texture, s.roughness.value = u, s.mipInt.value = d - t, Wf(i, p, m, 3 * f, 2 * f), r.setRenderTarget(i), r.render(o, Pf), s.envMap.value = i.texture, s.roughness.value = 0, s.mipInt.value = d - n, Wf(e, p, m, 3 * f, 2 * f), r.setRenderTarget(e), r.render(o, Pf) } _blur(e, t, n, r, i) { let a = this._pingPongRenderTarget; this._halfBlur(e, a, t, n, r, `latitudinal`, i), this._halfBlur(a, e, n, n, r, `longitudinal`, i) } _halfBlur(e, t, n, r, i, a, o) { let s = this._renderer, c = this._blurMaterial; a !== `latitudinal` && a !== `longitudinal` && U(`blur direction must be either latitudinal or longitudinal!`); let l = this._lodMeshes[r]; l.material = c; let u = c.uniforms, d = this._sizeLods[n] - 1, f = isFinite(i) ? Math.PI / (2 * d) : 2 * Math.PI / (2 * Mf - 1), p = i / f, m = isFinite(i) ? 1 + Math.floor(3 * p) : Mf; m > Mf && H(`sigmaRadians, ${i}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Mf}`); let h = [], g = 0; for (let e = 0; e < Mf; ++e) { let t = e / p, n = Math.exp(-t * t / 2); h.push(n), e === 0 ? g += n : e < m && (g += 2 * n) } for (let e = 0; e < h.length; e++)h[e] = h[e] / g; u.envMap.value = e.texture, u.samples.value = m, u.weights.value = h, u.latitudinal.value = a === `latitudinal`, o && (u.poleAxis.value = o); let { _lodMax: _ } = this; u.dTheta.value = f, u.mipInt.value = _ - n; let v = this._sizeLods[r]; Wf(t, 3 * v * (r > _ - Af ? r - _ + Af : 0), 4 * (this._cubeSize - v), 3 * v, 2 * v), s.setRenderTarget(t), s.render(l, Pf) } }; function Hf(e) { let t = [], n = [], r = [], i = e, a = e - Af + 1 + jf.length; for (let o = 0; o < a; o++) { let a = 2 ** i; t.push(a); let s = 1 / a; o > e - Af ? s = jf[o - e + Af - 1] : o === 0 && (s = 0), n.push(s); let c = 1 / (a - 2), l = -c, u = 1 + c, d = [l, l, u, l, u, u, l, l, u, u, l, u], f = new Float32Array(108), p = new Float32Array(72), m = new Float32Array(36); for (let e = 0; e < 6; e++) { let t = e % 3 * 2 / 3 - 1, n = e > 2 ? 0 : -1, r = [t, n, 0, t + 2 / 3, n, 0, t + 2 / 3, n + 1, 0, t, n, 0, t + 2 / 3, n + 1, 0, t, n + 1, 0]; f.set(r, 18 * e), p.set(d, 12 * e); let i = [e, e, e, e, e, e]; m.set(i, 6 * e) } let h = new Uc; h.setAttribute(`position`, new Oc(f, 3)), h.setAttribute(`uv`, new Oc(p, 2)), h.setAttribute(`faceIndex`, new Oc(m, 1)), r.push(new hl(h, null)), i > Af && i-- } return { lodMeshes: r, sizeLods: t, sigmas: n } } function Uf(e, t, n) { let r = new os(e, t, n); return r.texture.mapping = 306, r.texture.name = `PMREM.cubeUv`, r.scissorTest = !0, r } function Wf(e, t, n, r, i) { e.viewport.set(t, n, r, i), e.scissor.set(t, n, r, i) } function Gf(e, t, n) {
	return new Mu({
		name: `PMREMGGXConvolution`, defines: { GGX_SAMPLES: Nf, CUBEUV_TEXEL_WIDTH: 1 / t, CUBEUV_TEXEL_HEIGHT: 1 / n, CUBEUV_MAX_MIP: `${e}.0` }, uniforms: { envMap: { value: null }, roughness: { value: 0 }, mipInt: { value: 0 } }, vertexShader: Yf(), fragmentShader: `

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`, blending: 0, depthTest: !1, depthWrite: !1
	})
} function Kf(e, t, n) {
	let r = new Float32Array(Mf), i = new K(0, 1, 0); return new Mu({
		name: `SphericalGaussianBlur`, defines: { n: Mf, CUBEUV_TEXEL_WIDTH: 1 / t, CUBEUV_TEXEL_HEIGHT: 1 / n, CUBEUV_MAX_MIP: `${e}.0` }, uniforms: { envMap: { value: null }, samples: { value: 1 }, weights: { value: r }, latitudinal: { value: !1 }, dTheta: { value: 0 }, mipInt: { value: 0 }, poleAxis: { value: i } }, vertexShader: Yf(), fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`, blending: 0, depthTest: !1, depthWrite: !1
	})
} function qf() {
	return new Mu({
		name: `EquirectangularToCubeUV`, uniforms: { envMap: { value: null } }, vertexShader: Yf(), fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`, blending: 0, depthTest: !1, depthWrite: !1
	})
} function Jf() {
	return new Mu({
		name: `CubemapToCubeUV`, uniforms: { envMap: { value: null }, flipEnvMap: { value: -1 } }, vertexShader: Yf(), fragmentShader: `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`, blending: 0, depthTest: !1, depthWrite: !1
	})
} function Yf() {
	return `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`} var Xf = class extends os {
	constructor(e = 1, t = {}) { super(e, e, t), this.isWebGLCubeRenderTarget = !0; let n = { width: e, height: e, depth: 1 }, r = [n, n, n, n, n, n]; this.texture = new _u(r), this._setTextureOptions(t), this.texture.isRenderTargetTexture = !0 } fromEquirectangularTexture(e, t) {
		this.texture.type = t.type, this.texture.colorSpace = t.colorSpace, this.texture.generateMipmaps = t.generateMipmaps, this.texture.minFilter = t.minFilter, this.texture.magFilter = t.magFilter; let n = {
			uniforms: { tEquirect: { value: null } }, vertexShader: `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`, fragmentShader: `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`}, r = new xu(5, 5, 5), i = new Mu({ name: `CubemapFromEquirect`, uniforms: wu(n.uniforms), vertexShader: n.vertexShader, fragmentShader: n.fragmentShader, side: 1, blending: 0 }); i.uniforms.tEquirect.value = t; let a = new hl(r, i), o = t.minFilter; return t.minFilter === 1008 && (t.minFilter = ki), new Hd(1, 10, this).update(e, a), t.minFilter = o, a.geometry.dispose(), a.material.dispose(), this
	} clear(e, t = !0, n = !0, r = !0) { let i = e.getRenderTarget(); for (let i = 0; i < 6; i++)e.setRenderTarget(this, i), e.clear(t, n, r); e.setRenderTarget(i) }
}; function Zf(e) { let t = new WeakMap, n = new WeakMap, r = null; function i(e, t = !1) { return e == null ? null : t ? o(e) : a(e) } function a(n) { if (n && n.isTexture) { let r = n.mapping; if (r === 303 || r === 304) if (t.has(n)) { let e = t.get(n).texture; return s(e, n.mapping) } else { let r = n.image; if (r && r.height > 0) { let i = new Xf(r.height); return i.fromEquirectangularTexture(e, n), t.set(n, i), n.addEventListener(`dispose`, l), s(i.texture, n.mapping) } else return null } } return n } function o(t) { if (t && t.isTexture) { let i = t.mapping, a = i === 303 || i === 304, o = i === 301 || i === 302; if (a || o) { let i = n.get(t), s = i === void 0 ? 0 : i.texture.pmremVersion; if (t.isRenderTargetTexture && t.pmremVersion !== s) return r === null && (r = new Vf(e)), i = a ? r.fromEquirectangular(t, i) : r.fromCubemap(t, i), i.texture.pmremVersion = t.pmremVersion, n.set(t, i), i.texture; if (i !== void 0) return i.texture; { let s = t.image; return a && s && s.height > 0 || o && s && c(s) ? (r === null && (r = new Vf(e)), i = a ? r.fromEquirectangular(t) : r.fromCubemap(t), i.texture.pmremVersion = t.pmremVersion, n.set(t, i), t.addEventListener(`dispose`, u), i.texture) : null } } } return t } function s(e, t) { return t === 303 ? e.mapping = 301 : t === 304 && (e.mapping = 302), e } function c(e) { let t = 0; for (let n = 0; n < 6; n++)e[n] !== void 0 && t++; return t === 6 } function l(e) { let n = e.target; n.removeEventListener(`dispose`, l); let r = t.get(n); r !== void 0 && (t.delete(n), r.dispose()) } function u(e) { let t = e.target; t.removeEventListener(`dispose`, u); let r = n.get(t); r !== void 0 && (n.delete(t), r.dispose()) } function d() { t = new WeakMap, n = new WeakMap, r !== null && (r.dispose(), r = null) } return { get: i, dispose: d } } function Qf(e) { let t = {}; function n(n) { if (t[n] !== void 0) return t[n]; let r = e.getExtension(n); return t[n] = r, r } return { has: function (e) { return n(e) !== null }, init: function () { n(`EXT_color_buffer_float`), n(`WEBGL_clip_cull_distance`), n(`OES_texture_float_linear`), n(`EXT_color_buffer_half_float`), n(`WEBGL_multisampled_render_to_texture`), n(`WEBGL_render_shared_exponent`) }, get: function (e) { let t = n(e); return t === null && uo(`WebGLRenderer: ` + e + ` extension not supported.`), t } } } function $f(e, t, n, r) { let i = {}, a = new WeakMap; function o(e) { let s = e.target; s.index !== null && t.remove(s.index); for (let e in s.attributes) t.remove(s.attributes[e]); s.removeEventListener(`dispose`, o), delete i[s.id]; let c = a.get(s); c && (t.remove(c), a.delete(s)), r.releaseStatesOfGeometry(s), s.isInstancedBufferGeometry === !0 && delete s._maxInstanceCount, n.memory.geometries-- } function s(e, t) { return i[t.id] === !0 ? t : (t.addEventListener(`dispose`, o), i[t.id] = !0, n.memory.geometries++, t) } function c(n) { let r = n.attributes; for (let n in r) t.update(r[n], e.ARRAY_BUFFER) } function l(e) { let n = [], r = e.index, i = e.attributes.position, o = 0; if (i === void 0) return; if (r !== null) { let e = r.array; o = r.version; for (let t = 0, r = e.length; t < r; t += 3) { let r = e[t + 0], i = e[t + 1], a = e[t + 2]; n.push(r, i, i, a, a, r) } } else { let e = i.array; o = i.version; for (let t = 0, r = e.length / 3 - 1; t < r; t += 3) { let e = t + 0, r = t + 1, i = t + 2; n.push(e, r, r, i, i, e) } } let s = new (i.count >= 65535 ? Ac : kc)(n, 1); s.version = o; let c = a.get(e); c && t.remove(c), a.set(e, s) } function u(e) { let t = a.get(e); if (t) { let n = e.index; n !== null && t.version < n.version && l(e) } else l(e); return a.get(e) } return { get: s, update: c, getWireframeAttribute: u } } function ep(e, t, n) { let r; function i(e) { r = e } let a, o; function s(e) { a = e.type, o = e.bytesPerElement } function c(t, i) { e.drawElements(r, i, a, t * o), n.update(i, r, 1) } function l(t, i, s) { s !== 0 && (e.drawElementsInstanced(r, i, a, t * o, s), n.update(i, r, s)) } function u(e, i, o) { if (o === 0) return; t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r, i, 0, a, e, 0, o); let s = 0; for (let e = 0; e < o; e++)s += i[e]; n.update(s, r, 1) } this.setMode = i, this.setIndex = s, this.render = c, this.renderInstances = l, this.renderMultiDraw = u } function tp(e) { let t = { geometries: 0, textures: 0 }, n = { frame: 0, calls: 0, triangles: 0, points: 0, lines: 0 }; function r(t, r, i) { switch (n.calls++, r) { case e.TRIANGLES: n.triangles += t / 3 * i; break; case e.LINES: n.lines += t / 2 * i; break; case e.LINE_STRIP: n.lines += i * (t - 1); break; case e.LINE_LOOP: n.lines += i * t; break; case e.POINTS: n.points += i * t; break; default: U(`WebGLInfo: Unknown draw mode:`, r); break } } function i() { n.calls = 0, n.triangles = 0, n.points = 0, n.lines = 0 } return { memory: t, render: n, programs: null, autoReset: !0, reset: i, update: r } } function np(e, t, n) { let r = new WeakMap, i = new is; function a(a, o, s) { let c = a.morphTargetInfluences, l = o.morphAttributes.position || o.morphAttributes.normal || o.morphAttributes.color, u = l === void 0 ? 0 : l.length, d = r.get(o); if (d === void 0 || d.count !== u) { d !== void 0 && d.texture.dispose(); let e = o.morphAttributes.position !== void 0, n = o.morphAttributes.normal !== void 0, a = o.morphAttributes.color !== void 0, s = o.morphAttributes.position || [], c = o.morphAttributes.normal || [], l = o.morphAttributes.color || [], f = 0; e === !0 && (f = 1), n === !0 && (f = 2), a === !0 && (f = 3); let p = o.attributes.position.count * f, m = 1; p > t.maxTextureSize && (m = Math.ceil(p / t.maxTextureSize), p = t.maxTextureSize); let h = new Float32Array(p * m * 4 * u), g = new ss(h, p, m, u); g.type = Ri, g.needsUpdate = !0; let _ = f * 4; for (let t = 0; t < u; t++) { let r = s[t], o = c[t], u = l[t], d = p * m * 4 * t; for (let t = 0; t < r.count; t++) { let s = t * _; e === !0 && (i.fromBufferAttribute(r, t), h[d + s + 0] = i.x, h[d + s + 1] = i.y, h[d + s + 2] = i.z, h[d + s + 3] = 0), n === !0 && (i.fromBufferAttribute(o, t), h[d + s + 4] = i.x, h[d + s + 5] = i.y, h[d + s + 6] = i.z, h[d + s + 7] = 0), a === !0 && (i.fromBufferAttribute(u, t), h[d + s + 8] = i.x, h[d + s + 9] = i.y, h[d + s + 10] = i.z, h[d + s + 11] = u.itemSize === 4 ? i.w : 1) } } d = { count: u, texture: g, size: new G(p, m) }, r.set(o, d); function v() { g.dispose(), r.delete(o), o.removeEventListener(`dispose`, v) } o.addEventListener(`dispose`, v) } if (a.isInstancedMesh === !0 && a.morphTexture !== null) s.getUniforms().setValue(e, `morphTexture`, a.morphTexture, n); else { let t = 0; for (let e = 0; e < c.length; e++)t += c[e]; let n = o.morphTargetsRelative ? 1 : 1 - t; s.getUniforms().setValue(e, `morphTargetBaseInfluence`, n), s.getUniforms().setValue(e, `morphTargetInfluences`, c) } s.getUniforms().setValue(e, `morphTargetsTexture`, d.texture, n), s.getUniforms().setValue(e, `morphTargetsTextureSize`, d.size) } return { update: a } } function rp(e, t, n, r, i) { let a = new WeakMap; function o(r) { let o = i.render.frame, s = r.geometry, l = t.get(r, s); if (a.get(l) !== o && (t.update(l), a.set(l, o)), r.isInstancedMesh && (r.hasEventListener(`dispose`, c) === !1 && r.addEventListener(`dispose`, c), a.get(r) !== o && (n.update(r.instanceMatrix, e.ARRAY_BUFFER), r.instanceColor !== null && n.update(r.instanceColor, e.ARRAY_BUFFER), a.set(r, o))), r.isSkinnedMesh) { let e = r.skeleton; a.get(e) !== o && (e.update(), a.set(e, o)) } return l } function s() { a = new WeakMap } function c(e) { let t = e.target; t.removeEventListener(`dispose`, c), r.releaseStatesOfObject(t), n.remove(t.instanceMatrix), t.instanceColor !== null && n.remove(t.instanceColor) } return { update: o, dispose: s } } var ip = { 1: `LINEAR_TONE_MAPPING`, 2: `REINHARD_TONE_MAPPING`, 3: `CINEON_TONE_MAPPING`, 4: `ACES_FILMIC_TONE_MAPPING`, 6: `AGX_TONE_MAPPING`, 7: `NEUTRAL_TONE_MAPPING`, 5: `CUSTOM_TONE_MAPPING` }; function ap(e, t, n, r, i) {
	let a = new os(t, n, { type: e, depthBuffer: r, stencilBuffer: i, depthTexture: r ? new vu(t, n) : void 0 }), o = new os(t, n, { type: zi, depthBuffer: !1, stencilBuffer: !1 }), s = new Uc; s.setAttribute(`position`, new jc([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)), s.setAttribute(`uv`, new jc([0, 2, 0, 0, 2, 0], 2)); let c = new Nu({
		uniforms: { tDiffuse: { value: null } }, vertexShader: `
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`, fragmentShader: `
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`, depthTest: !1, depthWrite: !1
	}), l = new hl(s, c), u = new Nd(-1, 1, 1, -1, 0, 1), d = null, f = null, p = !1, m, h = null, g = [], _ = !1; this.setSize = function (e, t) { a.setSize(e, t), o.setSize(e, t); for (let n = 0; n < g.length; n++) { let r = g[n]; r.setSize && r.setSize(e, t) } }, this.setEffects = function (e) { g = e, _ = g.length > 0 && g[0].isRenderPass === !0; let t = a.width, n = a.height; for (let e = 0; e < g.length; e++) { let r = g[e]; r.setSize && r.setSize(t, n) } }, this.begin = function (e, t) { if (p || e.toneMapping === 0 && g.length === 0) return !1; if (h = t, t !== null) { let e = t.width, n = t.height; (a.width !== e || a.height !== n) && this.setSize(e, n) } return _ === !1 && e.setRenderTarget(a), m = e.toneMapping, e.toneMapping = 0, !0 }, this.hasRenderPass = function () { return _ }, this.end = function (e, t) { e.toneMapping = m, p = !0; let n = a, r = o; for (let i = 0; i < g.length; i++) { let a = g[i]; if (a.enabled !== !1 && (a.render(e, r, n, t), a.needsSwap !== !1)) { let e = n; n = r, r = e } } if (d !== e.outputColorSpace || f !== e.toneMapping) { d = e.outputColorSpace, f = e.toneMapping, c.defines = {}, J.getTransfer(d) === `srgb` && (c.defines.SRGB_TRANSFER = ``); let t = ip[f]; t && (c.defines[t] = ``), c.needsUpdate = !0 } c.uniforms.tDiffuse.value = n.texture, e.setRenderTarget(h), e.render(l, u), h = null, p = !1 }, this.isCompositing = function () { return p }, this.dispose = function () { a.depthTexture && a.depthTexture.dispose(), a.dispose(), o.dispose(), s.dispose(), c.dispose() }
} var op = new rs, sp = new vu(1, 1), cp = new ss, lp = new cs, up = new _u, dp = [], fp = [], pp = new Float32Array(16), mp = new Float32Array(9), hp = new Float32Array(4); function gp(e, t, n) { let r = e[0]; if (r <= 0 || r > 0) return e; let i = t * n, a = dp[i]; if (a === void 0 && (a = new Float32Array(i), dp[i] = a), t !== 0) { r.toArray(a, 0); for (let r = 1, i = 0; r !== t; ++r)i += n, e[r].toArray(a, i) } return a } function _p(e, t) { if (e.length !== t.length) return !1; for (let n = 0, r = e.length; n < r; n++)if (e[n] !== t[n]) return !1; return !0 } function vp(e, t) { for (let n = 0, r = t.length; n < r; n++)e[n] = t[n] } function yp(e, t) { let n = fp[t]; n === void 0 && (n = new Int32Array(t), fp[t] = n); for (let r = 0; r !== t; ++r)n[r] = e.allocateTextureUnit(); return n } function bp(e, t) { let n = this.cache; n[0] !== t && (e.uniform1f(this.addr, t), n[0] = t) } function xp(e, t) { let n = this.cache; if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y) && (e.uniform2f(this.addr, t.x, t.y), n[0] = t.x, n[1] = t.y); else { if (_p(n, t)) return; e.uniform2fv(this.addr, t), vp(n, t) } } function Sp(e, t) { let n = this.cache; if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z) && (e.uniform3f(this.addr, t.x, t.y, t.z), n[0] = t.x, n[1] = t.y, n[2] = t.z); else if (t.r !== void 0) (n[0] !== t.r || n[1] !== t.g || n[2] !== t.b) && (e.uniform3f(this.addr, t.r, t.g, t.b), n[0] = t.r, n[1] = t.g, n[2] = t.b); else { if (_p(n, t)) return; e.uniform3fv(this.addr, t), vp(n, t) } } function Cp(e, t) { let n = this.cache; if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z || n[3] !== t.w) && (e.uniform4f(this.addr, t.x, t.y, t.z, t.w), n[0] = t.x, n[1] = t.y, n[2] = t.z, n[3] = t.w); else { if (_p(n, t)) return; e.uniform4fv(this.addr, t), vp(n, t) } } function wp(e, t) { let n = this.cache, r = t.elements; if (r === void 0) { if (_p(n, t)) return; e.uniformMatrix2fv(this.addr, !1, t), vp(n, t) } else { if (_p(n, r)) return; hp.set(r), e.uniformMatrix2fv(this.addr, !1, hp), vp(n, r) } } function Tp(e, t) { let n = this.cache, r = t.elements; if (r === void 0) { if (_p(n, t)) return; e.uniformMatrix3fv(this.addr, !1, t), vp(n, t) } else { if (_p(n, r)) return; mp.set(r), e.uniformMatrix3fv(this.addr, !1, mp), vp(n, r) } } function Ep(e, t) { let n = this.cache, r = t.elements; if (r === void 0) { if (_p(n, t)) return; e.uniformMatrix4fv(this.addr, !1, t), vp(n, t) } else { if (_p(n, r)) return; pp.set(r), e.uniformMatrix4fv(this.addr, !1, pp), vp(n, r) } } function Dp(e, t) { let n = this.cache; n[0] !== t && (e.uniform1i(this.addr, t), n[0] = t) } function Op(e, t) { let n = this.cache; if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y) && (e.uniform2i(this.addr, t.x, t.y), n[0] = t.x, n[1] = t.y); else { if (_p(n, t)) return; e.uniform2iv(this.addr, t), vp(n, t) } } function kp(e, t) { let n = this.cache; if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z) && (e.uniform3i(this.addr, t.x, t.y, t.z), n[0] = t.x, n[1] = t.y, n[2] = t.z); else { if (_p(n, t)) return; e.uniform3iv(this.addr, t), vp(n, t) } } function Ap(e, t) { let n = this.cache; if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z || n[3] !== t.w) && (e.uniform4i(this.addr, t.x, t.y, t.z, t.w), n[0] = t.x, n[1] = t.y, n[2] = t.z, n[3] = t.w); else { if (_p(n, t)) return; e.uniform4iv(this.addr, t), vp(n, t) } } function jp(e, t) { let n = this.cache; n[0] !== t && (e.uniform1ui(this.addr, t), n[0] = t) } function Mp(e, t) { let n = this.cache; if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y) && (e.uniform2ui(this.addr, t.x, t.y), n[0] = t.x, n[1] = t.y); else { if (_p(n, t)) return; e.uniform2uiv(this.addr, t), vp(n, t) } } function Np(e, t) { let n = this.cache; if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z) && (e.uniform3ui(this.addr, t.x, t.y, t.z), n[0] = t.x, n[1] = t.y, n[2] = t.z); else { if (_p(n, t)) return; e.uniform3uiv(this.addr, t), vp(n, t) } } function Pp(e, t) { let n = this.cache; if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z || n[3] !== t.w) && (e.uniform4ui(this.addr, t.x, t.y, t.z, t.w), n[0] = t.x, n[1] = t.y, n[2] = t.z, n[3] = t.w); else { if (_p(n, t)) return; e.uniform4uiv(this.addr, t), vp(n, t) } } function Fp(e, t, n) { let r = this.cache, i = n.allocateTextureUnit(); r[0] !== i && (e.uniform1i(this.addr, i), r[0] = i); let a; this.type === e.SAMPLER_2D_SHADOW ? (sp.compareFunction = n.isReversedDepthBuffer() ? 518 : 515, a = sp) : a = op, n.setTexture2D(t || a, i) } function Ip(e, t, n) { let r = this.cache, i = n.allocateTextureUnit(); r[0] !== i && (e.uniform1i(this.addr, i), r[0] = i), n.setTexture3D(t || lp, i) } function Lp(e, t, n) { let r = this.cache, i = n.allocateTextureUnit(); r[0] !== i && (e.uniform1i(this.addr, i), r[0] = i), n.setTextureCube(t || up, i) } function Rp(e, t, n) { let r = this.cache, i = n.allocateTextureUnit(); r[0] !== i && (e.uniform1i(this.addr, i), r[0] = i), n.setTexture2DArray(t || cp, i) } function zp(e) { switch (e) { case 5126: return bp; case 35664: return xp; case 35665: return Sp; case 35666: return Cp; case 35674: return wp; case 35675: return Tp; case 35676: return Ep; case 5124: case 35670: return Dp; case 35667: case 35671: return Op; case 35668: case 35672: return kp; case 35669: case 35673: return Ap; case 5125: return jp; case 36294: return Mp; case 36295: return Np; case 36296: return Pp; case 35678: case 36198: case 36298: case 36306: case 35682: return Fp; case 35679: case 36299: case 36307: return Ip; case 35680: case 36300: case 36308: case 36293: return Lp; case 36289: case 36303: case 36311: case 36292: return Rp } } function Bp(e, t) { e.uniform1fv(this.addr, t) } function Vp(e, t) { let n = gp(t, this.size, 2); e.uniform2fv(this.addr, n) } function Hp(e, t) { let n = gp(t, this.size, 3); e.uniform3fv(this.addr, n) } function Up(e, t) { let n = gp(t, this.size, 4); e.uniform4fv(this.addr, n) } function Wp(e, t) { let n = gp(t, this.size, 4); e.uniformMatrix2fv(this.addr, !1, n) } function Gp(e, t) { let n = gp(t, this.size, 9); e.uniformMatrix3fv(this.addr, !1, n) } function Kp(e, t) { let n = gp(t, this.size, 16); e.uniformMatrix4fv(this.addr, !1, n) } function qp(e, t) { e.uniform1iv(this.addr, t) } function Jp(e, t) { e.uniform2iv(this.addr, t) } function Yp(e, t) { e.uniform3iv(this.addr, t) } function Xp(e, t) { e.uniform4iv(this.addr, t) } function Zp(e, t) { e.uniform1uiv(this.addr, t) } function Qp(e, t) { e.uniform2uiv(this.addr, t) } function $p(e, t) { e.uniform3uiv(this.addr, t) } function em(e, t) { e.uniform4uiv(this.addr, t) } function tm(e, t, n) { let r = this.cache, i = t.length, a = yp(n, i); _p(r, a) || (e.uniform1iv(this.addr, a), vp(r, a)); let o; o = this.type === e.SAMPLER_2D_SHADOW ? sp : op; for (let e = 0; e !== i; ++e)n.setTexture2D(t[e] || o, a[e]) } function nm(e, t, n) { let r = this.cache, i = t.length, a = yp(n, i); _p(r, a) || (e.uniform1iv(this.addr, a), vp(r, a)); for (let e = 0; e !== i; ++e)n.setTexture3D(t[e] || lp, a[e]) } function rm(e, t, n) { let r = this.cache, i = t.length, a = yp(n, i); _p(r, a) || (e.uniform1iv(this.addr, a), vp(r, a)); for (let e = 0; e !== i; ++e)n.setTextureCube(t[e] || up, a[e]) } function im(e, t, n) { let r = this.cache, i = t.length, a = yp(n, i); _p(r, a) || (e.uniform1iv(this.addr, a), vp(r, a)); for (let e = 0; e !== i; ++e)n.setTexture2DArray(t[e] || cp, a[e]) } function am(e) { switch (e) { case 5126: return Bp; case 35664: return Vp; case 35665: return Hp; case 35666: return Up; case 35674: return Wp; case 35675: return Gp; case 35676: return Kp; case 5124: case 35670: return qp; case 35667: case 35671: return Jp; case 35668: case 35672: return Yp; case 35669: case 35673: return Xp; case 5125: return Zp; case 36294: return Qp; case 36295: return $p; case 36296: return em; case 35678: case 36198: case 36298: case 36306: case 35682: return tm; case 35679: case 36299: case 36307: return nm; case 35680: case 36300: case 36308: case 36293: return rm; case 36289: case 36303: case 36311: case 36292: return im } } var om = class { constructor(e, t, n) { this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.setValue = zp(t.type) } }, sm = class { constructor(e, t, n) { this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.size = t.size, this.setValue = am(t.type) } }, cm = class { constructor(e) { this.id = e, this.seq = [], this.map = {} } setValue(e, t, n) { let r = this.seq; for (let i = 0, a = r.length; i !== a; ++i) { let a = r[i]; a.setValue(e, t[a.id], n) } } }, lm = /(\w+)(\])?(\[|\.)?/g; function um(e, t) { e.seq.push(t), e.map[t.id] = t } function dm(e, t, n) { let r = e.name, i = r.length; for (lm.lastIndex = 0; ;) { let a = lm.exec(r), o = lm.lastIndex, s = a[1], c = a[2] === `]`, l = a[3]; if (c && (s |= 0), l === void 0 || l === `[` && o + 2 === i) { um(n, l === void 0 ? new om(s, e, t) : new sm(s, e, t)); break } else { let e = n.map[s]; e === void 0 && (e = new cm(s), um(n, e)), n = e } } } var fm = class { constructor(e, t) { this.seq = [], this.map = {}; let n = e.getProgramParameter(t, e.ACTIVE_UNIFORMS); for (let r = 0; r < n; ++r) { let n = e.getActiveUniform(t, r); dm(n, e.getUniformLocation(t, n.name), this) } let r = [], i = []; for (let t of this.seq) t.type === e.SAMPLER_2D_SHADOW || t.type === e.SAMPLER_CUBE_SHADOW || t.type === e.SAMPLER_2D_ARRAY_SHADOW ? r.push(t) : i.push(t); r.length > 0 && (this.seq = r.concat(i)) } setValue(e, t, n, r) { let i = this.map[t]; i !== void 0 && i.setValue(e, n, r) } setOptional(e, t, n) { let r = t[n]; r !== void 0 && this.setValue(e, n, r) } static upload(e, t, n, r) { for (let i = 0, a = t.length; i !== a; ++i) { let a = t[i], o = n[a.id]; o.needsUpdate !== !1 && a.setValue(e, o.value, r) } } static seqWithValue(e, t) { let n = []; for (let r = 0, i = e.length; r !== i; ++r) { let i = e[r]; i.id in t && n.push(i) } return n } }; function pm(e, t, n) { let r = e.createShader(t); return e.shaderSource(r, n), e.compileShader(r), r } var mm = 37297, hm = 0; function gm(e, t) {
	let n = e.split(`
`), r = [], i = Math.max(t - 6, 0), a = Math.min(t + 6, n.length); for (let e = i; e < a; e++) { let i = e + 1; r.push(`${i === t ? `>` : ` `} ${i}: ${n[e]}`) } return r.join(`
`)
} var _m = new q; function vm(e) { J._getMatrix(_m, J.workingColorSpace, e); let t = `mat3( ${_m.elements.map(e => e.toFixed(4))} )`; switch (J.getTransfer(e)) { case Za: return [t, `LinearTransferOETF`]; case Qa: return [t, `sRGBTransferOETF`]; default: return H(`WebGLProgram: Unsupported color space: `, e), [t, `LinearTransferOETF`] } } function ym(e, t, n) {
	let r = e.getShaderParameter(t, e.COMPILE_STATUS), i = (e.getShaderInfoLog(t) || ``).trim(); if (r && i === ``) return ``; let a = /ERROR: 0:(\d+)/.exec(i); if (a) {
		let r = parseInt(a[1]); return n.toUpperCase() + `

`+ i + `

`+ gm(e.getShaderSource(t), r)
	} else return i
} function bm(e, t) {
	let n = vm(t); return [`vec4 ${e}( vec4 value ) {`, `	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`, `}`].join(`
`)
} var xm = { 1: `Linear`, 2: `Reinhard`, 3: `Cineon`, 4: `ACESFilmic`, 6: `AgX`, 7: `Neutral`, 5: `Custom` }; function Sm(e, t) { let n = xm[t]; return n === void 0 ? (H(`WebGLProgram: Unsupported toneMapping:`, t), `vec3 ` + e + `( vec3 color ) { return LinearToneMapping( color ); }`) : `vec3 ` + e + `( vec3 color ) { return ` + n + `ToneMapping( color ); }` } var Cm = new K; function wm() {
	return J.getLuminanceCoefficients(Cm), [`float luminance( const in vec3 rgb ) {`, `	const vec3 weights = vec3( ${Cm.x.toFixed(4)}, ${Cm.y.toFixed(4)}, ${Cm.z.toFixed(4)} );`, `	return dot( weights, rgb );`, `}`].join(`
`)
} function Tm(e) {
	return [e.extensionClipCullDistance ? `#extension GL_ANGLE_clip_cull_distance : require` : ``, e.extensionMultiDraw ? `#extension GL_ANGLE_multi_draw : require` : ``].filter(Om).join(`
`)
} function Em(e) {
	let t = []; for (let n in e) { let r = e[n]; r !== !1 && t.push(`#define ` + n + ` ` + r) } return t.join(`
`)
} function Dm(e, t) { let n = {}, r = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES); for (let i = 0; i < r; i++) { let r = e.getActiveAttrib(t, i), a = r.name, o = 1; r.type === e.FLOAT_MAT2 && (o = 2), r.type === e.FLOAT_MAT3 && (o = 3), r.type === e.FLOAT_MAT4 && (o = 4), n[a] = { type: r.type, location: e.getAttribLocation(t, a), locationSize: o } } return n } function Om(e) { return e !== `` } function km(e, t) { let n = t.numSpotLightShadows + t.numSpotLightMaps - t.numSpotLightShadowsWithMaps; return e.replace(/NUM_DIR_LIGHTS/g, t.numDirLights).replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, n).replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, t.numPointLights).replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows) } function Am(e, t) { return e.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection) } var jm = /^[ \t]*#include +<([\w\d./]+)>/gm; function Mm(e) { return e.replace(jm, Pm) } var Nm = new Map; function Pm(e, t) { let n = Z[t]; if (n === void 0) { let e = Nm.get(t); if (e !== void 0) n = Z[e], H(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`, t, e); else throw Error(`Can not resolve #include <` + t + `>`) } return Mm(n) } var Fm = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g; function Im(e) { return e.replace(Fm, Lm) } function Lm(e, t, n, r) { let i = ``; for (let e = parseInt(t); e < parseInt(n); e++)i += r.replace(/\[\s*i\s*\]/g, `[ ` + e + ` ]`).replace(/UNROLLED_LOOP_INDEX/g, e); return i } function Rm(e) {
	let t = `precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`; return e.precision === `highp` ? t += `
#define HIGH_PRECISION`: e.precision === `mediump` ? t += `
#define MEDIUM_PRECISION`: e.precision === `lowp` && (t += `
#define LOW_PRECISION`), t
} var zm = { 1: `SHADOWMAP_TYPE_PCF`, 3: `SHADOWMAP_TYPE_VSM` }; function Bm(e) { return zm[e.shadowMapType] || `SHADOWMAP_TYPE_BASIC` } var Vm = { 301: `ENVMAP_TYPE_CUBE`, 302: `ENVMAP_TYPE_CUBE`, 306: `ENVMAP_TYPE_CUBE_UV` }; function Hm(e) { return e.envMap === !1 ? `ENVMAP_TYPE_CUBE` : Vm[e.envMapMode] || `ENVMAP_TYPE_CUBE` } var Um = { 302: `ENVMAP_MODE_REFRACTION` }; function Wm(e) { return e.envMap === !1 ? `ENVMAP_MODE_REFLECTION` : Um[e.envMapMode] || `ENVMAP_MODE_REFLECTION` } var Gm = { 0: `ENVMAP_BLENDING_MULTIPLY`, 1: `ENVMAP_BLENDING_MIX`, 2: `ENVMAP_BLENDING_ADD` }; function Km(e) { return e.envMap === !1 ? `ENVMAP_BLENDING_NONE` : Gm[e.combine] || `ENVMAP_BLENDING_NONE` } function qm(e) { let t = e.envMapCubeUVHeight; if (t === null) return null; let n = Math.log2(t) - 2, r = 1 / t; return { texelWidth: 1 / (3 * Math.max(2 ** n, 112)), texelHeight: r, maxMip: n } } function Jm(e, t, n, r) {
	let i = e.getContext(), a = n.defines, o = n.vertexShader, s = n.fragmentShader, c = Bm(n), l = Hm(n), u = Wm(n), d = Km(n), f = qm(n), p = Tm(n), m = Em(a), h = i.createProgram(), g, _, v = n.glslVersion ? `#version ` + n.glslVersion + `
`: ``; n.isRawShaderMaterial ? (g = [`#define SHADER_TYPE ` + n.shaderType, `#define SHADER_NAME ` + n.shaderName, m].filter(Om).join(`
`), g.length > 0 && (g += `
`), _ = [`#define SHADER_TYPE ` + n.shaderType, `#define SHADER_NAME ` + n.shaderName, m].filter(Om).join(`
`), _.length > 0 && (_ += `
`)) : (g = [Rm(n), `#define SHADER_TYPE ` + n.shaderType, `#define SHADER_NAME ` + n.shaderName, m, n.extensionClipCullDistance ? `#define USE_CLIP_DISTANCE` : ``, n.batching ? `#define USE_BATCHING` : ``, n.batchingColor ? `#define USE_BATCHING_COLOR` : ``, n.instancing ? `#define USE_INSTANCING` : ``, n.instancingColor ? `#define USE_INSTANCING_COLOR` : ``, n.instancingMorph ? `#define USE_INSTANCING_MORPH` : ``, n.useFog && n.fog ? `#define USE_FOG` : ``, n.useFog && n.fogExp2 ? `#define FOG_EXP2` : ``, n.map ? `#define USE_MAP` : ``, n.envMap ? `#define USE_ENVMAP` : ``, n.envMap ? `#define ` + u : ``, n.lightMap ? `#define USE_LIGHTMAP` : ``, n.aoMap ? `#define USE_AOMAP` : ``, n.bumpMap ? `#define USE_BUMPMAP` : ``, n.normalMap ? `#define USE_NORMALMAP` : ``, n.normalMapObjectSpace ? `#define USE_NORMALMAP_OBJECTSPACE` : ``, n.normalMapTangentSpace ? `#define USE_NORMALMAP_TANGENTSPACE` : ``, n.displacementMap ? `#define USE_DISPLACEMENTMAP` : ``, n.emissiveMap ? `#define USE_EMISSIVEMAP` : ``, n.anisotropy ? `#define USE_ANISOTROPY` : ``, n.anisotropyMap ? `#define USE_ANISOTROPYMAP` : ``, n.clearcoatMap ? `#define USE_CLEARCOATMAP` : ``, n.clearcoatRoughnessMap ? `#define USE_CLEARCOAT_ROUGHNESSMAP` : ``, n.clearcoatNormalMap ? `#define USE_CLEARCOAT_NORMALMAP` : ``, n.iridescenceMap ? `#define USE_IRIDESCENCEMAP` : ``, n.iridescenceThicknessMap ? `#define USE_IRIDESCENCE_THICKNESSMAP` : ``, n.specularMap ? `#define USE_SPECULARMAP` : ``, n.specularColorMap ? `#define USE_SPECULAR_COLORMAP` : ``, n.specularIntensityMap ? `#define USE_SPECULAR_INTENSITYMAP` : ``, n.roughnessMap ? `#define USE_ROUGHNESSMAP` : ``, n.metalnessMap ? `#define USE_METALNESSMAP` : ``, n.alphaMap ? `#define USE_ALPHAMAP` : ``, n.alphaHash ? `#define USE_ALPHAHASH` : ``, n.transmission ? `#define USE_TRANSMISSION` : ``, n.transmissionMap ? `#define USE_TRANSMISSIONMAP` : ``, n.thicknessMap ? `#define USE_THICKNESSMAP` : ``, n.sheenColorMap ? `#define USE_SHEEN_COLORMAP` : ``, n.sheenRoughnessMap ? `#define USE_SHEEN_ROUGHNESSMAP` : ``, n.mapUv ? `#define MAP_UV ` + n.mapUv : ``, n.alphaMapUv ? `#define ALPHAMAP_UV ` + n.alphaMapUv : ``, n.lightMapUv ? `#define LIGHTMAP_UV ` + n.lightMapUv : ``, n.aoMapUv ? `#define AOMAP_UV ` + n.aoMapUv : ``, n.emissiveMapUv ? `#define EMISSIVEMAP_UV ` + n.emissiveMapUv : ``, n.bumpMapUv ? `#define BUMPMAP_UV ` + n.bumpMapUv : ``, n.normalMapUv ? `#define NORMALMAP_UV ` + n.normalMapUv : ``, n.displacementMapUv ? `#define DISPLACEMENTMAP_UV ` + n.displacementMapUv : ``, n.metalnessMapUv ? `#define METALNESSMAP_UV ` + n.metalnessMapUv : ``, n.roughnessMapUv ? `#define ROUGHNESSMAP_UV ` + n.roughnessMapUv : ``, n.anisotropyMapUv ? `#define ANISOTROPYMAP_UV ` + n.anisotropyMapUv : ``, n.clearcoatMapUv ? `#define CLEARCOATMAP_UV ` + n.clearcoatMapUv : ``, n.clearcoatNormalMapUv ? `#define CLEARCOAT_NORMALMAP_UV ` + n.clearcoatNormalMapUv : ``, n.clearcoatRoughnessMapUv ? `#define CLEARCOAT_ROUGHNESSMAP_UV ` + n.clearcoatRoughnessMapUv : ``, n.iridescenceMapUv ? `#define IRIDESCENCEMAP_UV ` + n.iridescenceMapUv : ``, n.iridescenceThicknessMapUv ? `#define IRIDESCENCE_THICKNESSMAP_UV ` + n.iridescenceThicknessMapUv : ``, n.sheenColorMapUv ? `#define SHEEN_COLORMAP_UV ` + n.sheenColorMapUv : ``, n.sheenRoughnessMapUv ? `#define SHEEN_ROUGHNESSMAP_UV ` + n.sheenRoughnessMapUv : ``, n.specularMapUv ? `#define SPECULARMAP_UV ` + n.specularMapUv : ``, n.specularColorMapUv ? `#define SPECULAR_COLORMAP_UV ` + n.specularColorMapUv : ``, n.specularIntensityMapUv ? `#define SPECULAR_INTENSITYMAP_UV ` + n.specularIntensityMapUv : ``, n.transmissionMapUv ? `#define TRANSMISSIONMAP_UV ` + n.transmissionMapUv : ``, n.thicknessMapUv ? `#define THICKNESSMAP_UV ` + n.thicknessMapUv : ``, n.vertexTangents && n.flatShading === !1 ? `#define USE_TANGENT` : ``, n.vertexNormals ? `#define HAS_NORMAL` : ``, n.vertexColors ? `#define USE_COLOR` : ``, n.vertexAlphas ? `#define USE_COLOR_ALPHA` : ``, n.vertexUv1s ? `#define USE_UV1` : ``, n.vertexUv2s ? `#define USE_UV2` : ``, n.vertexUv3s ? `#define USE_UV3` : ``, n.pointsUvs ? `#define USE_POINTS_UV` : ``, n.flatShading ? `#define FLAT_SHADED` : ``, n.skinning ? `#define USE_SKINNING` : ``, n.morphTargets ? `#define USE_MORPHTARGETS` : ``, n.morphNormals && n.flatShading === !1 ? `#define USE_MORPHNORMALS` : ``, n.morphColors ? `#define USE_MORPHCOLORS` : ``, n.morphTargetsCount > 0 ? `#define MORPHTARGETS_TEXTURE_STRIDE ` + n.morphTextureStride : ``, n.morphTargetsCount > 0 ? `#define MORPHTARGETS_COUNT ` + n.morphTargetsCount : ``, n.doubleSided ? `#define DOUBLE_SIDED` : ``, n.flipSided ? `#define FLIP_SIDED` : ``, n.shadowMapEnabled ? `#define USE_SHADOWMAP` : ``, n.shadowMapEnabled ? `#define ` + c : ``, n.sizeAttenuation ? `#define USE_SIZEATTENUATION` : ``, n.numLightProbes > 0 ? `#define USE_LIGHT_PROBES` : ``, n.logarithmicDepthBuffer ? `#define USE_LOGARITHMIC_DEPTH_BUFFER` : ``, n.reversedDepthBuffer ? `#define USE_REVERSED_DEPTH_BUFFER` : ``, `uniform mat4 modelMatrix;`, `uniform mat4 modelViewMatrix;`, `uniform mat4 projectionMatrix;`, `uniform mat4 viewMatrix;`, `uniform mat3 normalMatrix;`, `uniform vec3 cameraPosition;`, `uniform bool isOrthographic;`, `#ifdef USE_INSTANCING`, `	attribute mat4 instanceMatrix;`, `#endif`, `#ifdef USE_INSTANCING_COLOR`, `	attribute vec3 instanceColor;`, `#endif`, `#ifdef USE_INSTANCING_MORPH`, `	uniform sampler2D morphTexture;`, `#endif`, `attribute vec3 position;`, `attribute vec3 normal;`, `attribute vec2 uv;`, `#ifdef USE_UV1`, `	attribute vec2 uv1;`, `#endif`, `#ifdef USE_UV2`, `	attribute vec2 uv2;`, `#endif`, `#ifdef USE_UV3`, `	attribute vec2 uv3;`, `#endif`, `#ifdef USE_TANGENT`, `	attribute vec4 tangent;`, `#endif`, `#if defined( USE_COLOR_ALPHA )`, `	attribute vec4 color;`, `#elif defined( USE_COLOR )`, `	attribute vec3 color;`, `#endif`, `#ifdef USE_SKINNING`, `	attribute vec4 skinIndex;`, `	attribute vec4 skinWeight;`, `#endif`, `
`].filter(Om).join(`
`), _ = [Rm(n), `#define SHADER_TYPE ` + n.shaderType, `#define SHADER_NAME ` + n.shaderName, m, n.useFog && n.fog ? `#define USE_FOG` : ``, n.useFog && n.fogExp2 ? `#define FOG_EXP2` : ``, n.alphaToCoverage ? `#define ALPHA_TO_COVERAGE` : ``, n.map ? `#define USE_MAP` : ``, n.matcap ? `#define USE_MATCAP` : ``, n.envMap ? `#define USE_ENVMAP` : ``, n.envMap ? `#define ` + l : ``, n.envMap ? `#define ` + u : ``, n.envMap ? `#define ` + d : ``, f ? `#define CUBEUV_TEXEL_WIDTH ` + f.texelWidth : ``, f ? `#define CUBEUV_TEXEL_HEIGHT ` + f.texelHeight : ``, f ? `#define CUBEUV_MAX_MIP ` + f.maxMip + `.0` : ``, n.lightMap ? `#define USE_LIGHTMAP` : ``, n.aoMap ? `#define USE_AOMAP` : ``, n.bumpMap ? `#define USE_BUMPMAP` : ``, n.normalMap ? `#define USE_NORMALMAP` : ``, n.normalMapObjectSpace ? `#define USE_NORMALMAP_OBJECTSPACE` : ``, n.normalMapTangentSpace ? `#define USE_NORMALMAP_TANGENTSPACE` : ``, n.packedNormalMap ? `#define USE_PACKED_NORMALMAP` : ``, n.emissiveMap ? `#define USE_EMISSIVEMAP` : ``, n.anisotropy ? `#define USE_ANISOTROPY` : ``, n.anisotropyMap ? `#define USE_ANISOTROPYMAP` : ``, n.clearcoat ? `#define USE_CLEARCOAT` : ``, n.clearcoatMap ? `#define USE_CLEARCOATMAP` : ``, n.clearcoatRoughnessMap ? `#define USE_CLEARCOAT_ROUGHNESSMAP` : ``, n.clearcoatNormalMap ? `#define USE_CLEARCOAT_NORMALMAP` : ``, n.dispersion ? `#define USE_DISPERSION` : ``, n.iridescence ? `#define USE_IRIDESCENCE` : ``, n.iridescenceMap ? `#define USE_IRIDESCENCEMAP` : ``, n.iridescenceThicknessMap ? `#define USE_IRIDESCENCE_THICKNESSMAP` : ``, n.specularMap ? `#define USE_SPECULARMAP` : ``, n.specularColorMap ? `#define USE_SPECULAR_COLORMAP` : ``, n.specularIntensityMap ? `#define USE_SPECULAR_INTENSITYMAP` : ``, n.roughnessMap ? `#define USE_ROUGHNESSMAP` : ``, n.metalnessMap ? `#define USE_METALNESSMAP` : ``, n.alphaMap ? `#define USE_ALPHAMAP` : ``, n.alphaTest ? `#define USE_ALPHATEST` : ``, n.alphaHash ? `#define USE_ALPHAHASH` : ``, n.sheen ? `#define USE_SHEEN` : ``, n.sheenColorMap ? `#define USE_SHEEN_COLORMAP` : ``, n.sheenRoughnessMap ? `#define USE_SHEEN_ROUGHNESSMAP` : ``, n.transmission ? `#define USE_TRANSMISSION` : ``, n.transmissionMap ? `#define USE_TRANSMISSIONMAP` : ``, n.thicknessMap ? `#define USE_THICKNESSMAP` : ``, n.vertexTangents && n.flatShading === !1 ? `#define USE_TANGENT` : ``, n.vertexColors || n.instancingColor ? `#define USE_COLOR` : ``, n.vertexAlphas || n.batchingColor ? `#define USE_COLOR_ALPHA` : ``, n.vertexUv1s ? `#define USE_UV1` : ``, n.vertexUv2s ? `#define USE_UV2` : ``, n.vertexUv3s ? `#define USE_UV3` : ``, n.pointsUvs ? `#define USE_POINTS_UV` : ``, n.gradientMap ? `#define USE_GRADIENTMAP` : ``, n.flatShading ? `#define FLAT_SHADED` : ``, n.doubleSided ? `#define DOUBLE_SIDED` : ``, n.flipSided ? `#define FLIP_SIDED` : ``, n.shadowMapEnabled ? `#define USE_SHADOWMAP` : ``, n.shadowMapEnabled ? `#define ` + c : ``, n.premultipliedAlpha ? `#define PREMULTIPLIED_ALPHA` : ``, n.numLightProbes > 0 ? `#define USE_LIGHT_PROBES` : ``, n.numLightProbeGrids > 0 ? `#define USE_LIGHT_PROBES_GRID` : ``, n.decodeVideoTexture ? `#define DECODE_VIDEO_TEXTURE` : ``, n.decodeVideoTextureEmissive ? `#define DECODE_VIDEO_TEXTURE_EMISSIVE` : ``, n.logarithmicDepthBuffer ? `#define USE_LOGARITHMIC_DEPTH_BUFFER` : ``, n.reversedDepthBuffer ? `#define USE_REVERSED_DEPTH_BUFFER` : ``, `uniform mat4 viewMatrix;`, `uniform vec3 cameraPosition;`, `uniform bool isOrthographic;`, n.toneMapping === 0 ? `` : `#define TONE_MAPPING`, n.toneMapping === 0 ? `` : Z.tonemapping_pars_fragment, n.toneMapping === 0 ? `` : Sm(`toneMapping`, n.toneMapping), n.dithering ? `#define DITHERING` : ``, n.opaque ? `#define OPAQUE` : ``, Z.colorspace_pars_fragment, bm(`linearToOutputTexel`, n.outputColorSpace), wm(), n.useDepthPacking ? `#define DEPTH_PACKING ` + n.depthPacking : ``, `
`].filter(Om).join(`
`)), o = Mm(o), o = km(o, n), o = Am(o, n), s = Mm(s), s = km(s, n), s = Am(s, n), o = Im(o), s = Im(s), n.isRawShaderMaterial !== !0 && (v = `#version 300 es
`, g = [p, `#define attribute in`, `#define varying out`, `#define texture2D texture`].join(`
`) + `
`+ g, _ = [`#define varying in`, n.glslVersion === `300 es` ? `` : `layout(location = 0) out highp vec4 pc_fragColor;`, n.glslVersion === `300 es` ? `` : `#define gl_FragColor pc_fragColor`, `#define gl_FragDepthEXT gl_FragDepth`, `#define texture2D texture`, `#define textureCube texture`, `#define texture2DProj textureProj`, `#define texture2DLodEXT textureLod`, `#define texture2DProjLodEXT textureProjLod`, `#define textureCubeLodEXT textureLod`, `#define texture2DGradEXT textureGrad`, `#define texture2DProjGradEXT textureProjGrad`, `#define textureCubeGradEXT textureGrad`].join(`
`) + `
`+ _); let y = v + g + o, b = v + _ + s, x = pm(i, i.VERTEX_SHADER, y), S = pm(i, i.FRAGMENT_SHADER, b); i.attachShader(h, x), i.attachShader(h, S), n.index0AttributeName === void 0 ? n.morphTargets === !0 && i.bindAttribLocation(h, 0, `position`) : i.bindAttribLocation(h, 0, n.index0AttributeName), i.linkProgram(h); function C(t) {
		if (e.debug.checkShaderErrors) {
			let n = i.getProgramInfoLog(h) || ``, r = i.getShaderInfoLog(x) || ``, a = i.getShaderInfoLog(S) || ``, o = n.trim(), s = r.trim(), c = a.trim(), l = !0, u = !0; if (i.getProgramParameter(h, i.LINK_STATUS) === !1) if (l = !1, typeof e.debug.onShaderError == `function`) e.debug.onShaderError(i, h, x, S); else {
				let e = ym(i, x, `vertex`), n = ym(i, S, `fragment`); U(`THREE.WebGLProgram: Shader Error ` + i.getError() + ` - VALIDATE_STATUS ` + i.getProgramParameter(h, i.VALIDATE_STATUS) + `

Material Name: `+ t.name + `
Material Type: `+ t.type + `

Program Info Log: `+ o + `
`+ e + `
`+ n)
			} else o === `` ? (s === `` || c === ``) && (u = !1) : H(`WebGLProgram: Program Info Log:`, o); u && (t.diagnostics = { runnable: l, programLog: o, vertexShader: { log: s, prefix: g }, fragmentShader: { log: c, prefix: _ } })
		} i.deleteShader(x), i.deleteShader(S), w = new fm(i, h), T = Dm(i, h)
	} let w; this.getUniforms = function () { return w === void 0 && C(this), w }; let T; this.getAttributes = function () { return T === void 0 && C(this), T }; let E = n.rendererExtensionParallelShaderCompile === !1; return this.isReady = function () { return E === !1 && (E = i.getProgramParameter(h, mm)), E }, this.destroy = function () { r.releaseStatesOfProgram(this), i.deleteProgram(h), this.program = void 0 }, this.type = n.shaderType, this.name = n.shaderName, this.id = hm++, this.cacheKey = t, this.usedTimes = 1, this.program = h, this.vertexShader = x, this.fragmentShader = S, this
} var Ym = 0, Xm = class { constructor() { this.shaderCache = new Map, this.materialCache = new Map } update(e) { let t = e.vertexShader, n = e.fragmentShader, r = this._getShaderStage(t), i = this._getShaderStage(n), a = this._getShaderCacheForMaterial(e); return a.has(r) === !1 && (a.add(r), r.usedTimes++), a.has(i) === !1 && (a.add(i), i.usedTimes++), this } remove(e) { let t = this.materialCache.get(e); for (let e of t) e.usedTimes--, e.usedTimes === 0 && this.shaderCache.delete(e.code); return this.materialCache.delete(e), this } getVertexShaderID(e) { return this._getShaderStage(e.vertexShader).id } getFragmentShaderID(e) { return this._getShaderStage(e.fragmentShader).id } dispose() { this.shaderCache.clear(), this.materialCache.clear() } _getShaderCacheForMaterial(e) { let t = this.materialCache, n = t.get(e); return n === void 0 && (n = new Set, t.set(e, n)), n } _getShaderStage(e) { let t = this.shaderCache, n = t.get(e); return n === void 0 && (n = new Zm(e), t.set(e, n)), n } }, Zm = class { constructor(e) { this.id = Ym++, this.code = e, this.usedTimes = 0 } }; function Qm(e) { return e === 1030 || e === 37490 || e === 36285 } function $m(e, t, n, r, i, a) { let o = new ys, s = new Xm, c = new Set, l = [], u = new Map, d = r.logarithmicDepthBuffer, f = r.precision, p = { MeshDepthMaterial: `depth`, MeshDistanceMaterial: `distance`, MeshNormalMaterial: `normal`, MeshBasicMaterial: `basic`, MeshLambertMaterial: `lambert`, MeshPhongMaterial: `phong`, MeshToonMaterial: `toon`, MeshStandardMaterial: `physical`, MeshPhysicalMaterial: `physical`, MeshMatcapMaterial: `matcap`, LineBasicMaterial: `basic`, LineDashedMaterial: `dashed`, PointsMaterial: `points`, ShadowMaterial: `shadow`, SpriteMaterial: `sprite` }; function m(e) { return c.add(e), e === 0 ? `uv` : `uv${e}` } function h(i, o, l, u, h, g) { let _ = u.fog, v = h.geometry, y = i.isMeshStandardMaterial || i.isMeshLambertMaterial || i.isMeshPhongMaterial ? u.environment : null, b = i.isMeshStandardMaterial || i.isMeshLambertMaterial && !i.envMap || i.isMeshPhongMaterial && !i.envMap, x = t.get(i.envMap || y, b), S = x && x.mapping === 306 ? x.image.height : null, C = p[i.type]; i.precision !== null && (f = r.getMaxPrecision(i.precision), f !== i.precision && H(`WebGLProgram.getParameters:`, i.precision, `not supported, using`, f, `instead.`)); let w = v.morphAttributes.position || v.morphAttributes.normal || v.morphAttributes.color, T = w === void 0 ? 0 : w.length, E = 0; v.morphAttributes.position !== void 0 && (E = 1), v.morphAttributes.normal !== void 0 && (E = 2), v.morphAttributes.color !== void 0 && (E = 3); let D, O, k, A; if (C) { let e = xf[C]; D = e.vertexShader, O = e.fragmentShader } else D = i.vertexShader, O = i.fragmentShader, s.update(i), k = s.getVertexShaderID(i), A = s.getFragmentShaderID(i); let j = e.getRenderTarget(), M = e.state.buffers.depth.getReversed(), N = h.isInstancedMesh === !0, P = h.isBatchedMesh === !0, F = !!i.map, I = !!i.matcap, ee = !!x, te = !!i.aoMap, ne = !!i.lightMap, L = !!i.bumpMap, re = !!i.normalMap, ie = !!i.displacementMap, ae = !!i.emissiveMap, oe = !!i.metalnessMap, se = !!i.roughnessMap, ce = i.anisotropy > 0, le = i.clearcoat > 0, ue = i.dispersion > 0, de = i.iridescence > 0, fe = i.sheen > 0, pe = i.transmission > 0, me = ce && !!i.anisotropyMap, he = le && !!i.clearcoatMap, ge = le && !!i.clearcoatNormalMap, R = le && !!i.clearcoatRoughnessMap, _e = de && !!i.iridescenceMap, ve = de && !!i.iridescenceThicknessMap, ye = fe && !!i.sheenColorMap, z = fe && !!i.sheenRoughnessMap, be = !!i.specularMap, B = !!i.specularColorMap, V = !!i.specularIntensityMap, xe = pe && !!i.transmissionMap, Se = pe && !!i.thicknessMap, Ce = !!i.gradientMap, we = !!i.alphaMap, Te = i.alphaTest > 0, Ee = !!i.alphaHash, De = !!i.extensions, Oe = 0; i.toneMapped && (j === null || j.isXRRenderTarget === !0) && (Oe = e.toneMapping); let ke = { shaderID: C, shaderType: i.type, shaderName: i.name, vertexShader: D, fragmentShader: O, defines: i.defines, customVertexShaderID: k, customFragmentShaderID: A, isRawShaderMaterial: i.isRawShaderMaterial === !0, glslVersion: i.glslVersion, precision: f, batching: P, batchingColor: P && h._colorsTexture !== null, instancing: N, instancingColor: N && h.instanceColor !== null, instancingMorph: N && h.morphTexture !== null, outputColorSpace: j === null ? e.outputColorSpace : j.isXRRenderTarget === !0 ? j.texture.colorSpace : J.workingColorSpace, alphaToCoverage: !!i.alphaToCoverage, map: F, matcap: I, envMap: ee, envMapMode: ee && x.mapping, envMapCubeUVHeight: S, aoMap: te, lightMap: ne, bumpMap: L, normalMap: re, displacementMap: ie, emissiveMap: ae, normalMapObjectSpace: re && i.normalMapType === 1, normalMapTangentSpace: re && i.normalMapType === 0, packedNormalMap: re && i.normalMapType === 0 && Qm(i.normalMap.format), metalnessMap: oe, roughnessMap: se, anisotropy: ce, anisotropyMap: me, clearcoat: le, clearcoatMap: he, clearcoatNormalMap: ge, clearcoatRoughnessMap: R, dispersion: ue, iridescence: de, iridescenceMap: _e, iridescenceThicknessMap: ve, sheen: fe, sheenColorMap: ye, sheenRoughnessMap: z, specularMap: be, specularColorMap: B, specularIntensityMap: V, transmission: pe, transmissionMap: xe, thicknessMap: Se, gradientMap: Ce, opaque: i.transparent === !1 && i.blending === 1 && i.alphaToCoverage === !1, alphaMap: we, alphaTest: Te, alphaHash: Ee, combine: i.combine, mapUv: F && m(i.map.channel), aoMapUv: te && m(i.aoMap.channel), lightMapUv: ne && m(i.lightMap.channel), bumpMapUv: L && m(i.bumpMap.channel), normalMapUv: re && m(i.normalMap.channel), displacementMapUv: ie && m(i.displacementMap.channel), emissiveMapUv: ae && m(i.emissiveMap.channel), metalnessMapUv: oe && m(i.metalnessMap.channel), roughnessMapUv: se && m(i.roughnessMap.channel), anisotropyMapUv: me && m(i.anisotropyMap.channel), clearcoatMapUv: he && m(i.clearcoatMap.channel), clearcoatNormalMapUv: ge && m(i.clearcoatNormalMap.channel), clearcoatRoughnessMapUv: R && m(i.clearcoatRoughnessMap.channel), iridescenceMapUv: _e && m(i.iridescenceMap.channel), iridescenceThicknessMapUv: ve && m(i.iridescenceThicknessMap.channel), sheenColorMapUv: ye && m(i.sheenColorMap.channel), sheenRoughnessMapUv: z && m(i.sheenRoughnessMap.channel), specularMapUv: be && m(i.specularMap.channel), specularColorMapUv: B && m(i.specularColorMap.channel), specularIntensityMapUv: V && m(i.specularIntensityMap.channel), transmissionMapUv: xe && m(i.transmissionMap.channel), thicknessMapUv: Se && m(i.thicknessMap.channel), alphaMapUv: we && m(i.alphaMap.channel), vertexTangents: !!v.attributes.tangent && (re || ce), vertexNormals: !!v.attributes.normal, vertexColors: i.vertexColors, vertexAlphas: i.vertexColors === !0 && !!v.attributes.color && v.attributes.color.itemSize === 4, pointsUvs: h.isPoints === !0 && !!v.attributes.uv && (F || we), fog: !!_, useFog: i.fog === !0, fogExp2: !!_ && _.isFogExp2, flatShading: i.wireframe === !1 && (i.flatShading === !0 || v.attributes.normal === void 0 && re === !1 && (i.isMeshLambertMaterial || i.isMeshPhongMaterial || i.isMeshStandardMaterial || i.isMeshPhysicalMaterial)), sizeAttenuation: i.sizeAttenuation === !0, logarithmicDepthBuffer: d, reversedDepthBuffer: M, skinning: h.isSkinnedMesh === !0, morphTargets: v.morphAttributes.position !== void 0, morphNormals: v.morphAttributes.normal !== void 0, morphColors: v.morphAttributes.color !== void 0, morphTargetsCount: T, morphTextureStride: E, numDirLights: o.directional.length, numPointLights: o.point.length, numSpotLights: o.spot.length, numSpotLightMaps: o.spotLightMap.length, numRectAreaLights: o.rectArea.length, numHemiLights: o.hemi.length, numDirLightShadows: o.directionalShadowMap.length, numPointLightShadows: o.pointShadowMap.length, numSpotLightShadows: o.spotShadowMap.length, numSpotLightShadowsWithMaps: o.numSpotLightShadowsWithMaps, numLightProbes: o.numLightProbes, numLightProbeGrids: g.length, numClippingPlanes: a.numPlanes, numClipIntersection: a.numIntersection, dithering: i.dithering, shadowMapEnabled: e.shadowMap.enabled && l.length > 0, shadowMapType: e.shadowMap.type, toneMapping: Oe, decodeVideoTexture: F && i.map.isVideoTexture === !0 && J.getTransfer(i.map.colorSpace) === `srgb`, decodeVideoTextureEmissive: ae && i.emissiveMap.isVideoTexture === !0 && J.getTransfer(i.emissiveMap.colorSpace) === `srgb`, premultipliedAlpha: i.premultipliedAlpha, doubleSided: i.side === 2, flipSided: i.side === 1, useDepthPacking: i.depthPacking >= 0, depthPacking: i.depthPacking || 0, index0AttributeName: i.index0AttributeName, extensionClipCullDistance: De && i.extensions.clipCullDistance === !0 && n.has(`WEBGL_clip_cull_distance`), extensionMultiDraw: (De && i.extensions.multiDraw === !0 || P) && n.has(`WEBGL_multi_draw`), rendererExtensionParallelShaderCompile: n.has(`KHR_parallel_shader_compile`), customProgramCacheKey: i.customProgramCacheKey() }; return ke.vertexUv1s = c.has(1), ke.vertexUv2s = c.has(2), ke.vertexUv3s = c.has(3), c.clear(), ke } function g(t) { let n = []; if (t.shaderID ? n.push(t.shaderID) : (n.push(t.customVertexShaderID), n.push(t.customFragmentShaderID)), t.defines !== void 0) for (let e in t.defines) n.push(e), n.push(t.defines[e]); return t.isRawShaderMaterial === !1 && (_(n, t), v(n, t), n.push(e.outputColorSpace)), n.push(t.customProgramCacheKey), n.join() } function _(e, t) { e.push(t.precision), e.push(t.outputColorSpace), e.push(t.envMapMode), e.push(t.envMapCubeUVHeight), e.push(t.mapUv), e.push(t.alphaMapUv), e.push(t.lightMapUv), e.push(t.aoMapUv), e.push(t.bumpMapUv), e.push(t.normalMapUv), e.push(t.displacementMapUv), e.push(t.emissiveMapUv), e.push(t.metalnessMapUv), e.push(t.roughnessMapUv), e.push(t.anisotropyMapUv), e.push(t.clearcoatMapUv), e.push(t.clearcoatNormalMapUv), e.push(t.clearcoatRoughnessMapUv), e.push(t.iridescenceMapUv), e.push(t.iridescenceThicknessMapUv), e.push(t.sheenColorMapUv), e.push(t.sheenRoughnessMapUv), e.push(t.specularMapUv), e.push(t.specularColorMapUv), e.push(t.specularIntensityMapUv), e.push(t.transmissionMapUv), e.push(t.thicknessMapUv), e.push(t.combine), e.push(t.fogExp2), e.push(t.sizeAttenuation), e.push(t.morphTargetsCount), e.push(t.morphAttributeCount), e.push(t.numDirLights), e.push(t.numPointLights), e.push(t.numSpotLights), e.push(t.numSpotLightMaps), e.push(t.numHemiLights), e.push(t.numRectAreaLights), e.push(t.numDirLightShadows), e.push(t.numPointLightShadows), e.push(t.numSpotLightShadows), e.push(t.numSpotLightShadowsWithMaps), e.push(t.numLightProbes), e.push(t.shadowMapType), e.push(t.toneMapping), e.push(t.numClippingPlanes), e.push(t.numClipIntersection), e.push(t.depthPacking) } function v(e, t) { o.disableAll(), t.instancing && o.enable(0), t.instancingColor && o.enable(1), t.instancingMorph && o.enable(2), t.matcap && o.enable(3), t.envMap && o.enable(4), t.normalMapObjectSpace && o.enable(5), t.normalMapTangentSpace && o.enable(6), t.clearcoat && o.enable(7), t.iridescence && o.enable(8), t.alphaTest && o.enable(9), t.vertexColors && o.enable(10), t.vertexAlphas && o.enable(11), t.vertexUv1s && o.enable(12), t.vertexUv2s && o.enable(13), t.vertexUv3s && o.enable(14), t.vertexTangents && o.enable(15), t.anisotropy && o.enable(16), t.alphaHash && o.enable(17), t.batching && o.enable(18), t.dispersion && o.enable(19), t.batchingColor && o.enable(20), t.gradientMap && o.enable(21), t.packedNormalMap && o.enable(22), t.vertexNormals && o.enable(23), e.push(o.mask), o.disableAll(), t.fog && o.enable(0), t.useFog && o.enable(1), t.flatShading && o.enable(2), t.logarithmicDepthBuffer && o.enable(3), t.reversedDepthBuffer && o.enable(4), t.skinning && o.enable(5), t.morphTargets && o.enable(6), t.morphNormals && o.enable(7), t.morphColors && o.enable(8), t.premultipliedAlpha && o.enable(9), t.shadowMapEnabled && o.enable(10), t.doubleSided && o.enable(11), t.flipSided && o.enable(12), t.useDepthPacking && o.enable(13), t.dithering && o.enable(14), t.transmission && o.enable(15), t.sheen && o.enable(16), t.opaque && o.enable(17), t.pointsUvs && o.enable(18), t.decodeVideoTexture && o.enable(19), t.decodeVideoTextureEmissive && o.enable(20), t.alphaToCoverage && o.enable(21), t.numLightProbeGrids > 0 && o.enable(22), e.push(o.mask) } function y(e) { let t = p[e.type], n; if (t) { let e = xf[t]; n = ku.clone(e.uniforms) } else n = e.uniforms; return n } function b(t, n) { let r = u.get(n); return r === void 0 ? (r = new Jm(e, n, t, i), l.push(r), u.set(n, r)) : ++r.usedTimes, r } function x(e) { if (--e.usedTimes === 0) { let t = l.indexOf(e); l[t] = l[l.length - 1], l.pop(), u.delete(e.cacheKey), e.destroy() } } function S(e) { s.remove(e) } function C() { s.dispose() } return { getParameters: h, getProgramCacheKey: g, getUniforms: y, acquireProgram: b, releaseProgram: x, releaseShaderCache: S, programs: l, dispose: C } } function eh() { let e = new WeakMap; function t(t) { return e.has(t) } function n(t) { let n = e.get(t); return n === void 0 && (n = {}, e.set(t, n)), n } function r(t) { e.delete(t) } function i(t, n, r) { e.get(t)[n] = r } function a() { e = new WeakMap } return { has: t, get: n, remove: r, update: i, dispose: a } } function th(e, t) { return e.groupOrder === t.groupOrder ? e.renderOrder === t.renderOrder ? e.material.id === t.material.id ? e.materialVariant === t.materialVariant ? e.z === t.z ? e.id - t.id : e.z - t.z : e.materialVariant - t.materialVariant : e.material.id - t.material.id : e.renderOrder - t.renderOrder : e.groupOrder - t.groupOrder } function nh(e, t) { return e.groupOrder === t.groupOrder ? e.renderOrder === t.renderOrder ? e.z === t.z ? e.id - t.id : t.z - e.z : e.renderOrder - t.renderOrder : e.groupOrder - t.groupOrder } function rh() { let e = [], t = 0, n = [], r = [], i = []; function a() { t = 0, n.length = 0, r.length = 0, i.length = 0 } function o(e) { let t = 0; return e.isInstancedMesh && (t += 2), e.isSkinnedMesh && (t += 1), t } function s(n, r, i, a, s, c) { let l = e[t]; return l === void 0 ? (l = { id: n.id, object: n, geometry: r, material: i, materialVariant: o(n), groupOrder: a, renderOrder: n.renderOrder, z: s, group: c }, e[t] = l) : (l.id = n.id, l.object = n, l.geometry = r, l.material = i, l.materialVariant = o(n), l.groupOrder = a, l.renderOrder = n.renderOrder, l.z = s, l.group = c), t++, l } function c(e, t, a, o, c, l) { let u = s(e, t, a, o, c, l); a.transmission > 0 ? r.push(u) : a.transparent === !0 ? i.push(u) : n.push(u) } function l(e, t, a, o, c, l) { let u = s(e, t, a, o, c, l); a.transmission > 0 ? r.unshift(u) : a.transparent === !0 ? i.unshift(u) : n.unshift(u) } function u(e, t) { n.length > 1 && n.sort(e || th), r.length > 1 && r.sort(t || nh), i.length > 1 && i.sort(t || nh) } function d() { for (let n = t, r = e.length; n < r; n++) { let t = e[n]; if (t.id === null) break; t.id = null, t.object = null, t.geometry = null, t.material = null, t.group = null } } return { opaque: n, transmissive: r, transparent: i, init: a, push: c, unshift: l, finish: d, sort: u } } function ih() { let e = new WeakMap; function t(t, n) { let r = e.get(t), i; return r === void 0 ? (i = new rh, e.set(t, [i])) : n >= r.length ? (i = new rh, r.push(i)) : i = r[n], i } function n() { e = new WeakMap } return { get: t, dispose: n } } function ah() { let e = {}; return { get: function (t) { if (e[t.id] !== void 0) return e[t.id]; let n; switch (t.type) { case `DirectionalLight`: n = { direction: new K, color: new X }; break; case `SpotLight`: n = { position: new K, direction: new K, color: new X, distance: 0, coneCos: 0, penumbraCos: 0, decay: 0 }; break; case `PointLight`: n = { position: new K, color: new X, distance: 0, decay: 0 }; break; case `HemisphereLight`: n = { direction: new K, skyColor: new X, groundColor: new X }; break; case `RectAreaLight`: n = { color: new X, position: new K, halfWidth: new K, halfHeight: new K }; break }return e[t.id] = n, n } } } function oh() { let e = {}; return { get: function (t) { if (e[t.id] !== void 0) return e[t.id]; let n; switch (t.type) { case `DirectionalLight`: n = { shadowIntensity: 1, shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new G }; break; case `SpotLight`: n = { shadowIntensity: 1, shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new G }; break; case `PointLight`: n = { shadowIntensity: 1, shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new G, shadowCameraNear: 1, shadowCameraFar: 1e3 }; break }return e[t.id] = n, n } } } var sh = 0; function ch(e, t) { return (t.castShadow ? 2 : 0) - (e.castShadow ? 2 : 0) + +!!t.map - !!e.map } function lh(e) { let t = new ah, n = oh(), r = { version: 0, hash: { directionalLength: -1, pointLength: -1, spotLength: -1, rectAreaLength: -1, hemiLength: -1, numDirectionalShadows: -1, numPointShadows: -1, numSpotShadows: -1, numSpotMaps: -1, numLightProbes: -1 }, ambient: [0, 0, 0], probe: [], directional: [], directionalShadow: [], directionalShadowMap: [], directionalShadowMatrix: [], spot: [], spotLightMap: [], spotShadow: [], spotShadowMap: [], spotLightMatrix: [], rectArea: [], rectAreaLTC1: null, rectAreaLTC2: null, point: [], pointShadow: [], pointShadowMap: [], pointShadowMatrix: [], hemi: [], numSpotLightShadowsWithMaps: 0, numLightProbes: 0 }; for (let e = 0; e < 9; e++)r.probe.push(new K); let i = new K, a = new Y, o = new Y; function s(i) { let a = 0, o = 0, s = 0; for (let e = 0; e < 9; e++)r.probe[e].set(0, 0, 0); let c = 0, l = 0, u = 0, d = 0, f = 0, p = 0, m = 0, h = 0, g = 0, _ = 0, v = 0; i.sort(ch); for (let e = 0, y = i.length; e < y; e++) { let y = i[e], b = y.color, x = y.intensity, S = y.distance, C = null; if (y.shadow && y.shadow.map && (C = y.shadow.map.texture.format === 1030 ? y.shadow.map.texture : y.shadow.map.depthTexture || y.shadow.map.texture), y.isAmbientLight) a += b.r * x, o += b.g * x, s += b.b * x; else if (y.isLightProbe) { for (let e = 0; e < 9; e++)r.probe[e].addScaledVector(y.sh.coefficients[e], x); v++ } else if (y.isDirectionalLight) { let e = t.get(y); if (e.color.copy(y.color).multiplyScalar(y.intensity), y.castShadow) { let e = y.shadow, t = n.get(y); t.shadowIntensity = e.intensity, t.shadowBias = e.bias, t.shadowNormalBias = e.normalBias, t.shadowRadius = e.radius, t.shadowMapSize = e.mapSize, r.directionalShadow[c] = t, r.directionalShadowMap[c] = C, r.directionalShadowMatrix[c] = y.shadow.matrix, p++ } r.directional[c] = e, c++ } else if (y.isSpotLight) { let e = t.get(y); e.position.setFromMatrixPosition(y.matrixWorld), e.color.copy(b).multiplyScalar(x), e.distance = S, e.coneCos = Math.cos(y.angle), e.penumbraCos = Math.cos(y.angle * (1 - y.penumbra)), e.decay = y.decay, r.spot[u] = e; let i = y.shadow; if (y.map && (r.spotLightMap[g] = y.map, g++, i.updateMatrices(y), y.castShadow && _++), r.spotLightMatrix[u] = i.matrix, y.castShadow) { let e = n.get(y); e.shadowIntensity = i.intensity, e.shadowBias = i.bias, e.shadowNormalBias = i.normalBias, e.shadowRadius = i.radius, e.shadowMapSize = i.mapSize, r.spotShadow[u] = e, r.spotShadowMap[u] = C, h++ } u++ } else if (y.isRectAreaLight) { let e = t.get(y); e.color.copy(b).multiplyScalar(x), e.halfWidth.set(y.width * .5, 0, 0), e.halfHeight.set(0, y.height * .5, 0), r.rectArea[d] = e, d++ } else if (y.isPointLight) { let e = t.get(y); if (e.color.copy(y.color).multiplyScalar(y.intensity), e.distance = y.distance, e.decay = y.decay, y.castShadow) { let e = y.shadow, t = n.get(y); t.shadowIntensity = e.intensity, t.shadowBias = e.bias, t.shadowNormalBias = e.normalBias, t.shadowRadius = e.radius, t.shadowMapSize = e.mapSize, t.shadowCameraNear = e.camera.near, t.shadowCameraFar = e.camera.far, r.pointShadow[l] = t, r.pointShadowMap[l] = C, r.pointShadowMatrix[l] = y.shadow.matrix, m++ } r.point[l] = e, l++ } else if (y.isHemisphereLight) { let e = t.get(y); e.skyColor.copy(y.color).multiplyScalar(x), e.groundColor.copy(y.groundColor).multiplyScalar(x), r.hemi[f] = e, f++ } } d > 0 && (e.has(`OES_texture_float_linear`) === !0 ? (r.rectAreaLTC1 = Q.LTC_FLOAT_1, r.rectAreaLTC2 = Q.LTC_FLOAT_2) : (r.rectAreaLTC1 = Q.LTC_HALF_1, r.rectAreaLTC2 = Q.LTC_HALF_2)), r.ambient[0] = a, r.ambient[1] = o, r.ambient[2] = s; let y = r.hash; (y.directionalLength !== c || y.pointLength !== l || y.spotLength !== u || y.rectAreaLength !== d || y.hemiLength !== f || y.numDirectionalShadows !== p || y.numPointShadows !== m || y.numSpotShadows !== h || y.numSpotMaps !== g || y.numLightProbes !== v) && (r.directional.length = c, r.spot.length = u, r.rectArea.length = d, r.point.length = l, r.hemi.length = f, r.directionalShadow.length = p, r.directionalShadowMap.length = p, r.pointShadow.length = m, r.pointShadowMap.length = m, r.spotShadow.length = h, r.spotShadowMap.length = h, r.directionalShadowMatrix.length = p, r.pointShadowMatrix.length = m, r.spotLightMatrix.length = h + g - _, r.spotLightMap.length = g, r.numSpotLightShadowsWithMaps = _, r.numLightProbes = v, y.directionalLength = c, y.pointLength = l, y.spotLength = u, y.rectAreaLength = d, y.hemiLength = f, y.numDirectionalShadows = p, y.numPointShadows = m, y.numSpotShadows = h, y.numSpotMaps = g, y.numLightProbes = v, r.version = sh++) } function c(e, t) { let n = 0, s = 0, c = 0, l = 0, u = 0, d = t.matrixWorldInverse; for (let t = 0, f = e.length; t < f; t++) { let f = e[t]; if (f.isDirectionalLight) { let e = r.directional[n]; e.direction.setFromMatrixPosition(f.matrixWorld), i.setFromMatrixPosition(f.target.matrixWorld), e.direction.sub(i), e.direction.transformDirection(d), n++ } else if (f.isSpotLight) { let e = r.spot[c]; e.position.setFromMatrixPosition(f.matrixWorld), e.position.applyMatrix4(d), e.direction.setFromMatrixPosition(f.matrixWorld), i.setFromMatrixPosition(f.target.matrixWorld), e.direction.sub(i), e.direction.transformDirection(d), c++ } else if (f.isRectAreaLight) { let e = r.rectArea[l]; e.position.setFromMatrixPosition(f.matrixWorld), e.position.applyMatrix4(d), o.identity(), a.copy(f.matrixWorld), a.premultiply(d), o.extractRotation(a), e.halfWidth.set(f.width * .5, 0, 0), e.halfHeight.set(0, f.height * .5, 0), e.halfWidth.applyMatrix4(o), e.halfHeight.applyMatrix4(o), l++ } else if (f.isPointLight) { let e = r.point[s]; e.position.setFromMatrixPosition(f.matrixWorld), e.position.applyMatrix4(d), s++ } else if (f.isHemisphereLight) { let e = r.hemi[u]; e.direction.setFromMatrixPosition(f.matrixWorld), e.direction.transformDirection(d), u++ } } } return { setup: s, setupView: c, state: r } } function uh(e) { let t = new lh(e), n = [], r = [], i = []; function a(e) { d.camera = e, n.length = 0, r.length = 0, i.length = 0 } function o(e) { n.push(e) } function s(e) { r.push(e) } function c(e) { i.push(e) } function l() { t.setup(n) } function u(e) { t.setupView(n, e) } let d = { lightsArray: n, shadowsArray: r, lightProbeGridArray: i, camera: null, lights: t, transmissionRenderTarget: {}, textureUnits: 0 }; return { init: a, state: d, setupLights: l, setupLightsView: u, pushLight: o, pushShadow: s, pushLightProbeGrid: c } } function dh(e) { let t = new WeakMap; function n(n, r = 0) { let i = t.get(n), a; return i === void 0 ? (a = new uh(e), t.set(n, [a])) : r >= i.length ? (a = new uh(e), i.push(a)) : a = i[r], a } function r() { t = new WeakMap } return { get: n, dispose: r } } var fh = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, ph = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`, mh = [new K(1, 0, 0), new K(-1, 0, 0), new K(0, 1, 0), new K(0, -1, 0), new K(0, 0, 1), new K(0, 0, -1)], hh = [new K(0, -1, 0), new K(0, -1, 0), new K(0, 0, 1), new K(0, 0, -1), new K(0, -1, 0), new K(0, -1, 0)], gh = new Y, _h = new K, vh = new K; function yh(e, t, n) { let r = new Yl, i = new G, a = new G, o = new is, s = new Iu, c = new Lu, l = {}, u = n.maxTextureSize, d = { 0: 1, 1: 0, 2: 2 }, f = new Mu({ defines: { VSM_SAMPLES: 8 }, uniforms: { shadow_pass: { value: null }, resolution: { value: new G }, radius: { value: 4 } }, vertexShader: fh, fragmentShader: ph }), p = f.clone(); p.defines.HORIZONTAL_PASS = 1; let m = new Uc; m.setAttribute(`position`, new Oc(new Float32Array([-1, -1, .5, 3, -1, .5, -1, 3, .5]), 3)); let h = new hl(m, f), g = this; this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = 1; let _ = this.type; this.render = function (t, n, s) { if (g.enabled === !1 || g.autoUpdate === !1 && g.needsUpdate === !1 || t.length === 0) return; this.type === 2 && (H(`WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead.`), this.type = 1); let c = e.getRenderTarget(), l = e.getActiveCubeFace(), d = e.getActiveMipmapLevel(), f = e.state; f.setBlending(0), f.buffers.depth.getReversed() === !0 ? f.buffers.color.setClear(0, 0, 0, 0) : f.buffers.color.setClear(1, 1, 1, 1), f.buffers.depth.setTest(!0), f.setScissorTest(!1); let p = _ !== this.type; p && n.traverse(function (e) { e.material && (Array.isArray(e.material) ? e.material.forEach(e => e.needsUpdate = !0) : e.material.needsUpdate = !0) }); for (let c = 0, l = t.length; c < l; c++) { let l = t[c], d = l.shadow; if (d === void 0) { H(`WebGLShadowMap:`, l, `has no shadow.`); continue } if (d.autoUpdate === !1 && d.needsUpdate === !1) continue; i.copy(d.mapSize); let m = d.getFrameExtents(); i.multiply(m), a.copy(d.mapSize), (i.x > u || i.y > u) && (i.x > u && (a.x = Math.floor(u / m.x), i.x = a.x * m.x, d.mapSize.x = a.x), i.y > u && (a.y = Math.floor(u / m.y), i.y = a.y * m.y, d.mapSize.y = a.y)); let h = e.state.buffers.depth.getReversed(); if (d.camera._reversedDepth = h, d.map === null || p === !0) { if (d.map !== null && (d.map.depthTexture !== null && (d.map.depthTexture.dispose(), d.map.depthTexture = null), d.map.dispose()), this.type === 3) { if (l.isPointLight) { H(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`); continue } d.map = new os(i.x, i.y, { format: Qi, type: zi, minFilter: ki, magFilter: ki, generateMipmaps: !1 }), d.map.texture.name = l.name + `.shadowMap`, d.map.depthTexture = new vu(i.x, i.y, Ri), d.map.depthTexture.name = l.name + `.shadowMapDepth`, d.map.depthTexture.format = Ji, d.map.depthTexture.compareFunction = null, d.map.depthTexture.minFilter = Ei, d.map.depthTexture.magFilter = Ei } else l.isPointLight ? (d.map = new Xf(i.x), d.map.depthTexture = new yu(i.x, Li)) : (d.map = new os(i.x, i.y), d.map.depthTexture = new vu(i.x, i.y, Li)), d.map.depthTexture.name = l.name + `.shadowMap`, d.map.depthTexture.format = Ji, this.type === 1 ? (d.map.depthTexture.compareFunction = h ? 518 : 515, d.map.depthTexture.minFilter = ki, d.map.depthTexture.magFilter = ki) : (d.map.depthTexture.compareFunction = null, d.map.depthTexture.minFilter = Ei, d.map.depthTexture.magFilter = Ei); d.camera.updateProjectionMatrix() } let g = d.map.isWebGLCubeRenderTarget ? 6 : 1; for (let t = 0; t < g; t++) { if (d.map.isWebGLCubeRenderTarget) e.setRenderTarget(d.map, t), e.clear(); else { t === 0 && (e.setRenderTarget(d.map), e.clear()); let n = d.getViewport(t); o.set(a.x * n.x, a.y * n.y, a.x * n.z, a.y * n.w), f.viewport(o) } if (l.isPointLight) { let e = d.camera, n = d.matrix, r = l.distance || e.far; r !== e.far && (e.far = r, e.updateProjectionMatrix()), _h.setFromMatrixPosition(l.matrixWorld), e.position.copy(_h), vh.copy(e.position), vh.add(mh[t]), e.up.copy(hh[t]), e.lookAt(vh), e.updateMatrixWorld(), n.makeTranslation(-_h.x, -_h.y, -_h.z), gh.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), d._frustum.setFromProjectionMatrix(gh, e.coordinateSystem, e.reversedDepth) } else d.updateMatrices(l); r = d.getFrustum(), b(n, s, d.camera, l, this.type) } d.isPointLightShadow !== !0 && this.type === 3 && v(d, s), d.needsUpdate = !1 } _ = this.type, g.needsUpdate = !1, e.setRenderTarget(c, l, d) }; function v(n, r) { let a = t.update(h); f.defines.VSM_SAMPLES !== n.blurSamples && (f.defines.VSM_SAMPLES = n.blurSamples, p.defines.VSM_SAMPLES = n.blurSamples, f.needsUpdate = !0, p.needsUpdate = !0), n.mapPass === null && (n.mapPass = new os(i.x, i.y, { format: Qi, type: zi })), f.uniforms.shadow_pass.value = n.map.depthTexture, f.uniforms.resolution.value = n.mapSize, f.uniforms.radius.value = n.radius, e.setRenderTarget(n.mapPass), e.clear(), e.renderBufferDirect(r, null, a, f, h, null), p.uniforms.shadow_pass.value = n.mapPass.texture, p.uniforms.resolution.value = n.mapSize, p.uniforms.radius.value = n.radius, e.setRenderTarget(n.map), e.clear(), e.renderBufferDirect(r, null, a, p, h, null) } function y(t, n, r, i) { let a = null, o = r.isPointLight === !0 ? t.customDistanceMaterial : t.customDepthMaterial; if (o !== void 0) a = o; else if (a = r.isPointLight === !0 ? c : s, e.localClippingEnabled && n.clipShadows === !0 && Array.isArray(n.clippingPlanes) && n.clippingPlanes.length !== 0 || n.displacementMap && n.displacementScale !== 0 || n.alphaMap && n.alphaTest > 0 || n.map && n.alphaTest > 0 || n.alphaToCoverage === !0) { let e = a.uuid, t = n.uuid, r = l[e]; r === void 0 && (r = {}, l[e] = r); let i = r[t]; i === void 0 && (i = a.clone(), r[t] = i, n.addEventListener(`dispose`, x)), a = i } if (a.visible = n.visible, a.wireframe = n.wireframe, i === 3 ? a.side = n.shadowSide === null ? n.side : n.shadowSide : a.side = n.shadowSide === null ? d[n.side] : n.shadowSide, a.alphaMap = n.alphaMap, a.alphaTest = n.alphaToCoverage === !0 ? .5 : n.alphaTest, a.map = n.map, a.clipShadows = n.clipShadows, a.clippingPlanes = n.clippingPlanes, a.clipIntersection = n.clipIntersection, a.displacementMap = n.displacementMap, a.displacementScale = n.displacementScale, a.displacementBias = n.displacementBias, a.wireframeLinewidth = n.wireframeLinewidth, a.linewidth = n.linewidth, r.isPointLight === !0 && a.isMeshDistanceMaterial === !0) { let t = e.properties.get(a); t.light = r } return a } function b(n, i, a, o, s) { if (n.visible === !1) return; if (n.layers.test(i.layers) && (n.isMesh || n.isLine || n.isPoints) && (n.castShadow || n.receiveShadow && s === 3) && (!n.frustumCulled || r.intersectsObject(n))) { n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse, n.matrixWorld); let r = t.update(n), c = n.material; if (Array.isArray(c)) { let t = r.groups; for (let l = 0, u = t.length; l < u; l++) { let u = t[l], d = c[u.materialIndex]; if (d && d.visible) { let t = y(n, d, o, s); n.onBeforeShadow(e, n, i, a, r, t, u), e.renderBufferDirect(a, null, r, t, n, u), n.onAfterShadow(e, n, i, a, r, t, u) } } } else if (c.visible) { let t = y(n, c, o, s); n.onBeforeShadow(e, n, i, a, r, t, null), e.renderBufferDirect(a, null, r, t, n, null), n.onAfterShadow(e, n, i, a, r, t, null) } } let c = n.children; for (let e = 0, t = c.length; e < t; e++)b(c[e], i, a, o, s) } function x(e) { e.target.removeEventListener(`dispose`, x); for (let t in l) { let n = l[t], r = e.target.uuid; r in n && (n[r].dispose(), delete n[r]) } } } function bh(e, t) { function n() { let t = !1, n = new is, r = null, i = new is(0, 0, 0, 0); return { setMask: function (n) { r !== n && !t && (e.colorMask(n, n, n, n), r = n) }, setLocked: function (e) { t = e }, setClear: function (t, r, a, o, s) { s === !0 && (t *= o, r *= o, a *= o), n.set(t, r, a, o), i.equals(n) === !1 && (e.clearColor(t, r, a, o), i.copy(n)) }, reset: function () { t = !1, r = null, i.set(-1, 0, 0, 0) } } } function r() { let n = !1, r = !1, i = null, a = null, o = null; return { setReversed: function (e) { if (r !== e) { let n = t.get(`EXT_clip_control`); e ? n.clipControlEXT(n.LOWER_LEFT_EXT, n.ZERO_TO_ONE_EXT) : n.clipControlEXT(n.LOWER_LEFT_EXT, n.NEGATIVE_ONE_TO_ONE_EXT), r = e; let i = o; o = null, this.setClear(i) } }, getReversed: function () { return r }, setTest: function (t) { t ? oe(e.DEPTH_TEST) : se(e.DEPTH_TEST) }, setMask: function (t) { i !== t && !n && (e.depthMask(t), i = t) }, setFunc: function (t) { if (r && (t = po[t]), a !== t) { switch (t) { case 0: e.depthFunc(e.NEVER); break; case 1: e.depthFunc(e.ALWAYS); break; case 2: e.depthFunc(e.LESS); break; case 3: e.depthFunc(e.LEQUAL); break; case 4: e.depthFunc(e.EQUAL); break; case 5: e.depthFunc(e.GEQUAL); break; case 6: e.depthFunc(e.GREATER); break; case 7: e.depthFunc(e.NOTEQUAL); break; default: e.depthFunc(e.LEQUAL) }a = t } }, setLocked: function (e) { n = e }, setClear: function (t) { o !== t && (o = t, r && (t = 1 - t), e.clearDepth(t)) }, reset: function () { n = !1, i = null, a = null, o = null, r = !1 } } } function i() { let t = !1, n = null, r = null, i = null, a = null, o = null, s = null, c = null, l = null; return { setTest: function (n) { t || (n ? oe(e.STENCIL_TEST) : se(e.STENCIL_TEST)) }, setMask: function (r) { n !== r && !t && (e.stencilMask(r), n = r) }, setFunc: function (t, n, o) { (r !== t || i !== n || a !== o) && (e.stencilFunc(t, n, o), r = t, i = n, a = o) }, setOp: function (t, n, r) { (o !== t || s !== n || c !== r) && (e.stencilOp(t, n, r), o = t, s = n, c = r) }, setLocked: function (e) { t = e }, setClear: function (t) { l !== t && (e.clearStencil(t), l = t) }, reset: function () { t = !1, n = null, r = null, i = null, a = null, o = null, s = null, c = null, l = null } } } let a = new n, o = new r, s = new i, c = new WeakMap, l = new WeakMap, u = {}, d = {}, f = {}, p = new WeakMap, m = [], h = null, g = !1, _ = null, v = null, y = null, b = null, x = null, S = null, C = null, w = new X(0, 0, 0), T = 0, E = !1, D = null, O = null, k = null, A = null, j = null, M = e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS), N = !1, P = 0, F = e.getParameter(e.VERSION); F.indexOf(`WebGL`) === -1 ? F.indexOf(`OpenGL ES`) !== -1 && (P = parseFloat(/^OpenGL ES (\d)/.exec(F)[1]), N = P >= 2) : (P = parseFloat(/^WebGL (\d)/.exec(F)[1]), N = P >= 1); let I = null, ee = {}, te = e.getParameter(e.SCISSOR_BOX), ne = e.getParameter(e.VIEWPORT), L = new is().fromArray(te), re = new is().fromArray(ne); function ie(t, n, r, i) { let a = new Uint8Array(4), o = e.createTexture(); e.bindTexture(t, o), e.texParameteri(t, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(t, e.TEXTURE_MAG_FILTER, e.NEAREST); for (let o = 0; o < r; o++)t === e.TEXTURE_3D || t === e.TEXTURE_2D_ARRAY ? e.texImage3D(n, 0, e.RGBA, 1, 1, i, 0, e.RGBA, e.UNSIGNED_BYTE, a) : e.texImage2D(n + o, 0, e.RGBA, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, a); return o } let ae = {}; ae[e.TEXTURE_2D] = ie(e.TEXTURE_2D, e.TEXTURE_2D, 1), ae[e.TEXTURE_CUBE_MAP] = ie(e.TEXTURE_CUBE_MAP, e.TEXTURE_CUBE_MAP_POSITIVE_X, 6), ae[e.TEXTURE_2D_ARRAY] = ie(e.TEXTURE_2D_ARRAY, e.TEXTURE_2D_ARRAY, 1, 1), ae[e.TEXTURE_3D] = ie(e.TEXTURE_3D, e.TEXTURE_3D, 1, 1), a.setClear(0, 0, 0, 1), o.setClear(1), s.setClear(0), oe(e.DEPTH_TEST), o.setFunc(3), he(!1), ge(1), oe(e.CULL_FACE), pe(0); function oe(t) { u[t] !== !0 && (e.enable(t), u[t] = !0) } function se(t) { u[t] !== !1 && (e.disable(t), u[t] = !1) } function ce(t, n) { return f[t] === n ? !1 : (e.bindFramebuffer(t, n), f[t] = n, t === e.DRAW_FRAMEBUFFER && (f[e.FRAMEBUFFER] = n), t === e.FRAMEBUFFER && (f[e.DRAW_FRAMEBUFFER] = n), !0) } function le(t, n) { let r = m, i = !1; if (t) { r = p.get(n), r === void 0 && (r = [], p.set(n, r)); let a = t.textures; if (r.length !== a.length || r[0] !== e.COLOR_ATTACHMENT0) { for (let t = 0, n = a.length; t < n; t++)r[t] = e.COLOR_ATTACHMENT0 + t; r.length = a.length, i = !0 } } else r[0] !== e.BACK && (r[0] = e.BACK, i = !0); i && e.drawBuffers(r) } function ue(t) { return h === t ? !1 : (e.useProgram(t), h = t, !0) } let de = { 100: e.FUNC_ADD, 101: e.FUNC_SUBTRACT, 102: e.FUNC_REVERSE_SUBTRACT }; de[103] = e.MIN, de[104] = e.MAX; let fe = { 200: e.ZERO, 201: e.ONE, 202: e.SRC_COLOR, 204: e.SRC_ALPHA, 210: e.SRC_ALPHA_SATURATE, 208: e.DST_COLOR, 206: e.DST_ALPHA, 203: e.ONE_MINUS_SRC_COLOR, 205: e.ONE_MINUS_SRC_ALPHA, 209: e.ONE_MINUS_DST_COLOR, 207: e.ONE_MINUS_DST_ALPHA, 211: e.CONSTANT_COLOR, 212: e.ONE_MINUS_CONSTANT_COLOR, 213: e.CONSTANT_ALPHA, 214: e.ONE_MINUS_CONSTANT_ALPHA }; function pe(t, n, r, i, a, o, s, c, l, u) { if (t === 0) { g === !0 && (se(e.BLEND), g = !1); return } if (g === !1 && (oe(e.BLEND), g = !0), t !== 5) { if (t !== _ || u !== E) { if ((v !== 100 || x !== 100) && (e.blendEquation(e.FUNC_ADD), v = 100, x = 100), u) switch (t) { case 1: e.blendFuncSeparate(e.ONE, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA); break; case 2: e.blendFunc(e.ONE, e.ONE); break; case 3: e.blendFuncSeparate(e.ZERO, e.ONE_MINUS_SRC_COLOR, e.ZERO, e.ONE); break; case 4: e.blendFuncSeparate(e.DST_COLOR, e.ONE_MINUS_SRC_ALPHA, e.ZERO, e.ONE); break; default: U(`WebGLState: Invalid blending: `, t); break } else switch (t) { case 1: e.blendFuncSeparate(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA); break; case 2: e.blendFuncSeparate(e.SRC_ALPHA, e.ONE, e.ONE, e.ONE); break; case 3: U(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`); break; case 4: U(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`); break; default: U(`WebGLState: Invalid blending: `, t); break }y = null, b = null, S = null, C = null, w.set(0, 0, 0), T = 0, _ = t, E = u } return } a ||= n, o ||= r, s ||= i, (n !== v || a !== x) && (e.blendEquationSeparate(de[n], de[a]), v = n, x = a), (r !== y || i !== b || o !== S || s !== C) && (e.blendFuncSeparate(fe[r], fe[i], fe[o], fe[s]), y = r, b = i, S = o, C = s), (c.equals(w) === !1 || l !== T) && (e.blendColor(c.r, c.g, c.b, l), w.copy(c), T = l), _ = t, E = !1 } function me(t, n) { t.side === 2 ? se(e.CULL_FACE) : oe(e.CULL_FACE); let r = t.side === 1; n && (r = !r), he(r), t.blending === 1 && t.transparent === !1 ? pe(0) : pe(t.blending, t.blendEquation, t.blendSrc, t.blendDst, t.blendEquationAlpha, t.blendSrcAlpha, t.blendDstAlpha, t.blendColor, t.blendAlpha, t.premultipliedAlpha), o.setFunc(t.depthFunc), o.setTest(t.depthTest), o.setMask(t.depthWrite), a.setMask(t.colorWrite); let i = t.stencilWrite; s.setTest(i), i && (s.setMask(t.stencilWriteMask), s.setFunc(t.stencilFunc, t.stencilRef, t.stencilFuncMask), s.setOp(t.stencilFail, t.stencilZFail, t.stencilZPass)), _e(t.polygonOffset, t.polygonOffsetFactor, t.polygonOffsetUnits), t.alphaToCoverage === !0 ? oe(e.SAMPLE_ALPHA_TO_COVERAGE) : se(e.SAMPLE_ALPHA_TO_COVERAGE) } function he(t) { D !== t && (t ? e.frontFace(e.CW) : e.frontFace(e.CCW), D = t) } function ge(t) { t === 0 ? se(e.CULL_FACE) : (oe(e.CULL_FACE), t !== O && (t === 1 ? e.cullFace(e.BACK) : t === 2 ? e.cullFace(e.FRONT) : e.cullFace(e.FRONT_AND_BACK))), O = t } function R(t) { t !== k && (N && e.lineWidth(t), k = t) } function _e(t, n, r) { t ? (oe(e.POLYGON_OFFSET_FILL), (A !== n || j !== r) && (A = n, j = r, o.getReversed() && (n = -n), e.polygonOffset(n, r))) : se(e.POLYGON_OFFSET_FILL) } function ve(t) { t ? oe(e.SCISSOR_TEST) : se(e.SCISSOR_TEST) } function ye(t) { t === void 0 && (t = e.TEXTURE0 + M - 1), I !== t && (e.activeTexture(t), I = t) } function z(t, n, r) { r === void 0 && (r = I === null ? e.TEXTURE0 + M - 1 : I); let i = ee[r]; i === void 0 && (i = { type: void 0, texture: void 0 }, ee[r] = i), (i.type !== t || i.texture !== n) && (I !== r && (e.activeTexture(r), I = r), e.bindTexture(t, n || ae[t]), i.type = t, i.texture = n) } function be() { let t = ee[I]; t !== void 0 && t.type !== void 0 && (e.bindTexture(t.type, null), t.type = void 0, t.texture = void 0) } function B() { try { e.compressedTexImage2D(...arguments) } catch (e) { U(`WebGLState:`, e) } } function V() { try { e.compressedTexImage3D(...arguments) } catch (e) { U(`WebGLState:`, e) } } function xe() { try { e.texSubImage2D(...arguments) } catch (e) { U(`WebGLState:`, e) } } function Se() { try { e.texSubImage3D(...arguments) } catch (e) { U(`WebGLState:`, e) } } function Ce() { try { e.compressedTexSubImage2D(...arguments) } catch (e) { U(`WebGLState:`, e) } } function we() { try { e.compressedTexSubImage3D(...arguments) } catch (e) { U(`WebGLState:`, e) } } function Te() { try { e.texStorage2D(...arguments) } catch (e) { U(`WebGLState:`, e) } } function Ee() { try { e.texStorage3D(...arguments) } catch (e) { U(`WebGLState:`, e) } } function De() { try { e.texImage2D(...arguments) } catch (e) { U(`WebGLState:`, e) } } function Oe() { try { e.texImage3D(...arguments) } catch (e) { U(`WebGLState:`, e) } } function ke(t) { return d[t] === void 0 ? e.getParameter(t) : d[t] } function Ae(t, n) { d[t] !== n && (e.pixelStorei(t, n), d[t] = n) } function je(t) { L.equals(t) === !1 && (e.scissor(t.x, t.y, t.z, t.w), L.copy(t)) } function Me(t) { re.equals(t) === !1 && (e.viewport(t.x, t.y, t.z, t.w), re.copy(t)) } function Ne(t, n) { let r = l.get(n); r === void 0 && (r = new WeakMap, l.set(n, r)); let i = r.get(t); i === void 0 && (i = e.getUniformBlockIndex(n, t.name), r.set(t, i)) } function Pe(t, n) { let r = l.get(n).get(t); c.get(n) !== r && (e.uniformBlockBinding(n, r, t.__bindingPointIndex), c.set(n, r)) } function Fe() { e.disable(e.BLEND), e.disable(e.CULL_FACE), e.disable(e.DEPTH_TEST), e.disable(e.POLYGON_OFFSET_FILL), e.disable(e.SCISSOR_TEST), e.disable(e.STENCIL_TEST), e.disable(e.SAMPLE_ALPHA_TO_COVERAGE), e.blendEquation(e.FUNC_ADD), e.blendFunc(e.ONE, e.ZERO), e.blendFuncSeparate(e.ONE, e.ZERO, e.ONE, e.ZERO), e.blendColor(0, 0, 0, 0), e.colorMask(!0, !0, !0, !0), e.clearColor(0, 0, 0, 0), e.depthMask(!0), e.depthFunc(e.LESS), o.setReversed(!1), e.clearDepth(1), e.stencilMask(4294967295), e.stencilFunc(e.ALWAYS, 0, 4294967295), e.stencilOp(e.KEEP, e.KEEP, e.KEEP), e.clearStencil(0), e.cullFace(e.BACK), e.frontFace(e.CCW), e.polygonOffset(0, 0), e.activeTexture(e.TEXTURE0), e.bindFramebuffer(e.FRAMEBUFFER, null), e.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), e.bindFramebuffer(e.READ_FRAMEBUFFER, null), e.useProgram(null), e.lineWidth(1), e.scissor(0, 0, e.canvas.width, e.canvas.height), e.viewport(0, 0, e.canvas.width, e.canvas.height), e.pixelStorei(e.PACK_ALIGNMENT, 4), e.pixelStorei(e.UNPACK_ALIGNMENT, 4), e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, !1), e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, e.BROWSER_DEFAULT_WEBGL), e.pixelStorei(e.PACK_ROW_LENGTH, 0), e.pixelStorei(e.PACK_SKIP_PIXELS, 0), e.pixelStorei(e.PACK_SKIP_ROWS, 0), e.pixelStorei(e.UNPACK_ROW_LENGTH, 0), e.pixelStorei(e.UNPACK_IMAGE_HEIGHT, 0), e.pixelStorei(e.UNPACK_SKIP_PIXELS, 0), e.pixelStorei(e.UNPACK_SKIP_ROWS, 0), e.pixelStorei(e.UNPACK_SKIP_IMAGES, 0), u = {}, d = {}, I = null, ee = {}, f = {}, p = new WeakMap, m = [], h = null, g = !1, _ = null, v = null, y = null, b = null, x = null, S = null, C = null, w = new X(0, 0, 0), T = 0, E = !1, D = null, O = null, k = null, A = null, j = null, L.set(0, 0, e.canvas.width, e.canvas.height), re.set(0, 0, e.canvas.width, e.canvas.height), a.reset(), o.reset(), s.reset() } return { buffers: { color: a, depth: o, stencil: s }, enable: oe, disable: se, bindFramebuffer: ce, drawBuffers: le, useProgram: ue, setBlending: pe, setMaterial: me, setFlipSided: he, setCullFace: ge, setLineWidth: R, setPolygonOffset: _e, setScissorTest: ve, activeTexture: ye, bindTexture: z, unbindTexture: be, compressedTexImage2D: B, compressedTexImage3D: V, texImage2D: De, texImage3D: Oe, pixelStorei: Ae, getParameter: ke, updateUBOMapping: Ne, uniformBlockBinding: Pe, texStorage2D: Te, texStorage3D: Ee, texSubImage2D: xe, texSubImage3D: Se, compressedTexSubImage2D: Ce, compressedTexSubImage3D: we, scissor: je, viewport: Me, reset: Fe } } function xh(e, t, n, r, i, a, o) { let s = t.has(`WEBGL_multisampled_render_to_texture`) ? t.get(`WEBGL_multisampled_render_to_texture`) : null, c = typeof navigator > `u` ? !1 : /OculusBrowser/g.test(navigator.userAgent), l = new G, u = new WeakMap, d = new Set, f, p = new WeakMap, m = !1; try { m = typeof OffscreenCanvas < `u` && new OffscreenCanvas(1, 1).getContext(`2d`) !== null } catch { } function h(e, t) { return m ? new OffscreenCanvas(e, t) : io(`canvas`) } function g(e, t, n) { let r = 1, i = B(e); if ((i.width > n || i.height > n) && (r = n / Math.max(i.width, i.height)), r < 1) if (typeof HTMLImageElement < `u` && e instanceof HTMLImageElement || typeof HTMLCanvasElement < `u` && e instanceof HTMLCanvasElement || typeof ImageBitmap < `u` && e instanceof ImageBitmap || typeof VideoFrame < `u` && e instanceof VideoFrame) { let n = Math.floor(r * i.width), a = Math.floor(r * i.height); f === void 0 && (f = h(n, a)); let o = t ? h(n, a) : f; return o.width = n, o.height = a, o.getContext(`2d`).drawImage(e, 0, 0, n, a), H(`WebGLRenderer: Texture has been resized from (` + i.width + `x` + i.height + `) to (` + n + `x` + a + `).`), o } else return `data` in e && H(`WebGLRenderer: Image in DataTexture is too big (` + i.width + `x` + i.height + `).`), e; return e } function _(e) { return e.generateMipmaps } function v(t) { e.generateMipmap(t) } function y(t) { return t.isWebGLCubeRenderTarget ? e.TEXTURE_CUBE_MAP : t.isWebGL3DRenderTarget ? e.TEXTURE_3D : t.isWebGLArrayRenderTarget || t.isCompressedArrayTexture ? e.TEXTURE_2D_ARRAY : e.TEXTURE_2D } function b(n, r, i, a, o, s = !1) { if (n !== null) { if (e[n] !== void 0) return e[n]; H(`WebGLRenderer: Attempt to use non-existing WebGL internal format '` + n + `'`) } let c; a && (c = t.get(`EXT_texture_norm16`), c || H(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`)); let l = r; if (r === e.RED && (i === e.FLOAT && (l = e.R32F), i === e.HALF_FLOAT && (l = e.R16F), i === e.UNSIGNED_BYTE && (l = e.R8), i === e.UNSIGNED_SHORT && c && (l = c.R16_EXT), i === e.SHORT && c && (l = c.R16_SNORM_EXT)), r === e.RED_INTEGER && (i === e.UNSIGNED_BYTE && (l = e.R8UI), i === e.UNSIGNED_SHORT && (l = e.R16UI), i === e.UNSIGNED_INT && (l = e.R32UI), i === e.BYTE && (l = e.R8I), i === e.SHORT && (l = e.R16I), i === e.INT && (l = e.R32I)), r === e.RG && (i === e.FLOAT && (l = e.RG32F), i === e.HALF_FLOAT && (l = e.RG16F), i === e.UNSIGNED_BYTE && (l = e.RG8), i === e.UNSIGNED_SHORT && c && (l = c.RG16_EXT), i === e.SHORT && c && (l = c.RG16_SNORM_EXT)), r === e.RG_INTEGER && (i === e.UNSIGNED_BYTE && (l = e.RG8UI), i === e.UNSIGNED_SHORT && (l = e.RG16UI), i === e.UNSIGNED_INT && (l = e.RG32UI), i === e.BYTE && (l = e.RG8I), i === e.SHORT && (l = e.RG16I), i === e.INT && (l = e.RG32I)), r === e.RGB_INTEGER && (i === e.UNSIGNED_BYTE && (l = e.RGB8UI), i === e.UNSIGNED_SHORT && (l = e.RGB16UI), i === e.UNSIGNED_INT && (l = e.RGB32UI), i === e.BYTE && (l = e.RGB8I), i === e.SHORT && (l = e.RGB16I), i === e.INT && (l = e.RGB32I)), r === e.RGBA_INTEGER && (i === e.UNSIGNED_BYTE && (l = e.RGBA8UI), i === e.UNSIGNED_SHORT && (l = e.RGBA16UI), i === e.UNSIGNED_INT && (l = e.RGBA32UI), i === e.BYTE && (l = e.RGBA8I), i === e.SHORT && (l = e.RGBA16I), i === e.INT && (l = e.RGBA32I)), r === e.RGB && (i === e.UNSIGNED_SHORT && c && (l = c.RGB16_EXT), i === e.SHORT && c && (l = c.RGB16_SNORM_EXT), i === e.UNSIGNED_INT_5_9_9_9_REV && (l = e.RGB9_E5), i === e.UNSIGNED_INT_10F_11F_11F_REV && (l = e.R11F_G11F_B10F)), r === e.RGBA) { let t = s ? Za : J.getTransfer(o); i === e.FLOAT && (l = e.RGBA32F), i === e.HALF_FLOAT && (l = e.RGBA16F), i === e.UNSIGNED_BYTE && (l = t === `srgb` ? e.SRGB8_ALPHA8 : e.RGBA8), i === e.UNSIGNED_SHORT && c && (l = c.RGBA16_EXT), i === e.SHORT && c && (l = c.RGBA16_SNORM_EXT), i === e.UNSIGNED_SHORT_4_4_4_4 && (l = e.RGBA4), i === e.UNSIGNED_SHORT_5_5_5_1 && (l = e.RGB5_A1) } return (l === e.R16F || l === e.R32F || l === e.RG16F || l === e.RG32F || l === e.RGBA16F || l === e.RGBA32F) && t.get(`EXT_color_buffer_float`), l } function x(t, n) { let r; return t ? n === null || n === 1014 || n === 1020 ? r = e.DEPTH24_STENCIL8 : n === 1015 ? r = e.DEPTH32F_STENCIL8 : n === 1012 && (r = e.DEPTH24_STENCIL8, H(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)) : n === null || n === 1014 || n === 1020 ? r = e.DEPTH_COMPONENT24 : n === 1015 ? r = e.DEPTH_COMPONENT32F : n === 1012 && (r = e.DEPTH_COMPONENT16), r } function S(e, t) { return _(e) === !0 || e.isFramebufferTexture && e.minFilter !== 1003 && e.minFilter !== 1006 ? Math.log2(Math.max(t.width, t.height)) + 1 : e.mipmaps !== void 0 && e.mipmaps.length > 0 ? e.mipmaps.length : e.isCompressedTexture && Array.isArray(e.image) ? t.mipmaps.length : 1 } function C(e) { let t = e.target; t.removeEventListener(`dispose`, C), T(t), t.isVideoTexture && u.delete(t), t.isHTMLTexture && d.delete(t) } function w(e) { let t = e.target; t.removeEventListener(`dispose`, w), D(t) } function T(e) { let t = r.get(e); if (t.__webglInit === void 0) return; let n = e.source, i = p.get(n); if (i) { let r = i[t.__cacheKey]; r.usedTimes--, r.usedTimes === 0 && E(e), Object.keys(i).length === 0 && p.delete(n) } r.remove(e) } function E(t) { let n = r.get(t); e.deleteTexture(n.__webglTexture); let i = t.source, a = p.get(i); delete a[n.__cacheKey], o.memory.textures-- } function D(t) { let n = r.get(t); if (t.depthTexture && (t.depthTexture.dispose(), r.remove(t.depthTexture)), t.isWebGLCubeRenderTarget) for (let t = 0; t < 6; t++) { if (Array.isArray(n.__webglFramebuffer[t])) for (let r = 0; r < n.__webglFramebuffer[t].length; r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]); else e.deleteFramebuffer(n.__webglFramebuffer[t]); n.__webglDepthbuffer && e.deleteRenderbuffer(n.__webglDepthbuffer[t]) } else { if (Array.isArray(n.__webglFramebuffer)) for (let t = 0; t < n.__webglFramebuffer.length; t++)e.deleteFramebuffer(n.__webglFramebuffer[t]); else e.deleteFramebuffer(n.__webglFramebuffer); if (n.__webglDepthbuffer && e.deleteRenderbuffer(n.__webglDepthbuffer), n.__webglMultisampledFramebuffer && e.deleteFramebuffer(n.__webglMultisampledFramebuffer), n.__webglColorRenderbuffer) for (let t = 0; t < n.__webglColorRenderbuffer.length; t++)n.__webglColorRenderbuffer[t] && e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]); n.__webglDepthRenderbuffer && e.deleteRenderbuffer(n.__webglDepthRenderbuffer) } let i = t.textures; for (let t = 0, n = i.length; t < n; t++) { let n = r.get(i[t]); n.__webglTexture && (e.deleteTexture(n.__webglTexture), o.memory.textures--), r.remove(i[t]) } r.remove(t) } let O = 0; function k() { O = 0 } function A() { return O } function j(e) { O = e } function M() { let e = O; return e >= i.maxTextures && H(`WebGLTextures: Trying to use ` + e + ` texture units while this GPU supports only ` + i.maxTextures), O += 1, e } function N(e) { let t = []; return t.push(e.wrapS), t.push(e.wrapT), t.push(e.wrapR || 0), t.push(e.magFilter), t.push(e.minFilter), t.push(e.anisotropy), t.push(e.internalFormat), t.push(e.format), t.push(e.type), t.push(e.generateMipmaps), t.push(e.premultiplyAlpha), t.push(e.flipY), t.push(e.unpackAlignment), t.push(e.colorSpace), t.join() } function P(t, i) { let a = r.get(t); if (t.isVideoTexture && z(t), t.isRenderTargetTexture === !1 && t.isExternalTexture !== !0 && t.version > 0 && a.__version !== t.version) { let e = t.image; if (e === null) H(`WebGLRenderer: Texture marked for update but no image data found.`); else if (e.complete === !1) H(`WebGLRenderer: Texture marked for update but image is incomplete`); else { se(a, t, i); return } } else t.isExternalTexture && (a.__webglTexture = t.sourceTexture ? t.sourceTexture : null); n.bindTexture(e.TEXTURE_2D, a.__webglTexture, e.TEXTURE0 + i) } function F(t, i) { let a = r.get(t); if (t.isRenderTargetTexture === !1 && t.version > 0 && a.__version !== t.version) { se(a, t, i); return } else t.isExternalTexture && (a.__webglTexture = t.sourceTexture ? t.sourceTexture : null); n.bindTexture(e.TEXTURE_2D_ARRAY, a.__webglTexture, e.TEXTURE0 + i) } function I(t, i) { let a = r.get(t); if (t.isRenderTargetTexture === !1 && t.version > 0 && a.__version !== t.version) { se(a, t, i); return } n.bindTexture(e.TEXTURE_3D, a.__webglTexture, e.TEXTURE0 + i) } function ee(t, i) { let a = r.get(t); if (t.isCubeDepthTexture !== !0 && t.version > 0 && a.__version !== t.version) { ce(a, t, i); return } n.bindTexture(e.TEXTURE_CUBE_MAP, a.__webglTexture, e.TEXTURE0 + i) } let te = { [Ci]: e.REPEAT, [wi]: e.CLAMP_TO_EDGE, [Ti]: e.MIRRORED_REPEAT }, ne = { [Ei]: e.NEAREST, [Di]: e.NEAREST_MIPMAP_NEAREST, [Oi]: e.NEAREST_MIPMAP_LINEAR, [ki]: e.LINEAR, [Ai]: e.LINEAR_MIPMAP_NEAREST, [ji]: e.LINEAR_MIPMAP_LINEAR }, L = { 512: e.NEVER, 519: e.ALWAYS, 513: e.LESS, 515: e.LEQUAL, 514: e.EQUAL, 518: e.GEQUAL, 516: e.GREATER, 517: e.NOTEQUAL }; function re(n, a) { if (a.type === 1015 && t.has(`OES_texture_float_linear`) === !1 && (a.magFilter === 1006 || a.magFilter === 1007 || a.magFilter === 1005 || a.magFilter === 1008 || a.minFilter === 1006 || a.minFilter === 1007 || a.minFilter === 1005 || a.minFilter === 1008) && H(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`), e.texParameteri(n, e.TEXTURE_WRAP_S, te[a.wrapS]), e.texParameteri(n, e.TEXTURE_WRAP_T, te[a.wrapT]), (n === e.TEXTURE_3D || n === e.TEXTURE_2D_ARRAY) && e.texParameteri(n, e.TEXTURE_WRAP_R, te[a.wrapR]), e.texParameteri(n, e.TEXTURE_MAG_FILTER, ne[a.magFilter]), e.texParameteri(n, e.TEXTURE_MIN_FILTER, ne[a.minFilter]), a.compareFunction && (e.texParameteri(n, e.TEXTURE_COMPARE_MODE, e.COMPARE_REF_TO_TEXTURE), e.texParameteri(n, e.TEXTURE_COMPARE_FUNC, L[a.compareFunction])), t.has(`EXT_texture_filter_anisotropic`) === !0) { if (a.magFilter === 1003 || a.minFilter !== 1005 && a.minFilter !== 1008 || a.type === 1015 && t.has(`OES_texture_float_linear`) === !1) return; if (a.anisotropy > 1 || r.get(a).__currentAnisotropy) { let o = t.get(`EXT_texture_filter_anisotropic`); e.texParameterf(n, o.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(a.anisotropy, i.getMaxAnisotropy())), r.get(a).__currentAnisotropy = a.anisotropy } } } function ie(t, n) { let r = !1; t.__webglInit === void 0 && (t.__webglInit = !0, n.addEventListener(`dispose`, C)); let i = n.source, a = p.get(i); a === void 0 && (a = {}, p.set(i, a)); let s = N(n); if (s !== t.__cacheKey) { a[s] === void 0 && (a[s] = { texture: e.createTexture(), usedTimes: 0 }, o.memory.textures++, r = !0), a[s].usedTimes++; let i = a[t.__cacheKey]; i !== void 0 && (a[t.__cacheKey].usedTimes--, i.usedTimes === 0 && E(n)), t.__cacheKey = s, t.__webglTexture = a[s].texture } return r } function ae(e, t, n) { return Math.floor(Math.floor(e / n) / t) } function oe(t, r, i, a) { let o = t.updateRanges; if (o.length === 0) n.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, r.width, r.height, i, a, r.data); else { o.sort((e, t) => e.start - t.start); let s = 0; for (let e = 1; e < o.length; e++) { let t = o[s], n = o[e], i = t.start + t.count, a = ae(n.start, r.width, 4), c = ae(t.start, r.width, 4); n.start <= i + 1 && a === c && ae(n.start + n.count - 1, r.width, 4) === a ? t.count = Math.max(t.count, n.start + n.count - t.start) : (++s, o[s] = n) } o.length = s + 1; let c = n.getParameter(e.UNPACK_ROW_LENGTH), l = n.getParameter(e.UNPACK_SKIP_PIXELS), u = n.getParameter(e.UNPACK_SKIP_ROWS); n.pixelStorei(e.UNPACK_ROW_LENGTH, r.width); for (let t = 0, s = o.length; t < s; t++) { let s = o[t], c = Math.floor(s.start / 4), l = Math.ceil(s.count / 4), u = c % r.width, d = Math.floor(c / r.width), f = l; n.pixelStorei(e.UNPACK_SKIP_PIXELS, u), n.pixelStorei(e.UNPACK_SKIP_ROWS, d), n.texSubImage2D(e.TEXTURE_2D, 0, u, d, f, 1, i, a, r.data) } t.clearUpdateRanges(), n.pixelStorei(e.UNPACK_ROW_LENGTH, c), n.pixelStorei(e.UNPACK_SKIP_PIXELS, l), n.pixelStorei(e.UNPACK_SKIP_ROWS, u) } } function se(t, o, s) { let c = e.TEXTURE_2D; (o.isDataArrayTexture || o.isCompressedArrayTexture) && (c = e.TEXTURE_2D_ARRAY), o.isData3DTexture && (c = e.TEXTURE_3D); let l = ie(t, o), u = o.source; n.bindTexture(c, t.__webglTexture, e.TEXTURE0 + s); let f = r.get(u); if (u.version !== f.__version || l === !0) { if (n.activeTexture(e.TEXTURE0 + s), !(typeof ImageBitmap < `u` && o.image instanceof ImageBitmap)) { let t = J.getPrimaries(J.workingColorSpace), r = o.colorSpace === `` ? null : J.getPrimaries(o.colorSpace), i = o.colorSpace === `` || t === r ? e.NONE : e.BROWSER_DEFAULT_WEBGL; n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, o.flipY), n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, o.premultiplyAlpha), n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, i) } n.pixelStorei(e.UNPACK_ALIGNMENT, o.unpackAlignment); let t = g(o.image, !1, i.maxTextureSize); t = be(o, t); let r = a.convert(o.format, o.colorSpace), p = a.convert(o.type), m = b(o.internalFormat, r, p, o.normalized, o.colorSpace, o.isVideoTexture); re(c, o); let h, y = o.mipmaps, C = o.isVideoTexture !== !0, w = f.__version === void 0 || l === !0, T = u.dataReady, E = S(o, t); if (o.isDepthTexture) m = x(o.format === Yi, o.type), w && (C ? n.texStorage2D(e.TEXTURE_2D, 1, m, t.width, t.height) : n.texImage2D(e.TEXTURE_2D, 0, m, t.width, t.height, 0, r, p, null)); else if (o.isDataTexture) if (y.length > 0) { C && w && n.texStorage2D(e.TEXTURE_2D, E, m, y[0].width, y[0].height); for (let t = 0, i = y.length; t < i; t++)h = y[t], C ? T && n.texSubImage2D(e.TEXTURE_2D, t, 0, 0, h.width, h.height, r, p, h.data) : n.texImage2D(e.TEXTURE_2D, t, m, h.width, h.height, 0, r, p, h.data); o.generateMipmaps = !1 } else C ? (w && n.texStorage2D(e.TEXTURE_2D, E, m, t.width, t.height), T && oe(o, t, r, p)) : n.texImage2D(e.TEXTURE_2D, 0, m, t.width, t.height, 0, r, p, t.data); else if (o.isCompressedTexture) if (o.isCompressedArrayTexture) { C && w && n.texStorage3D(e.TEXTURE_2D_ARRAY, E, m, y[0].width, y[0].height, t.depth); for (let i = 0, a = y.length; i < a; i++)if (h = y[i], o.format !== 1023) if (r !== null) if (C) { if (T) if (o.layerUpdates.size > 0) { let t = _f(h.width, h.height, o.format, o.type); for (let a of o.layerUpdates) { let o = h.data.subarray(a * t / h.data.BYTES_PER_ELEMENT, (a + 1) * t / h.data.BYTES_PER_ELEMENT); n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY, i, 0, 0, a, h.width, h.height, 1, r, o) } o.clearLayerUpdates() } else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY, i, 0, 0, 0, h.width, h.height, t.depth, r, h.data) } else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY, i, m, h.width, h.height, t.depth, 0, h.data, 0, 0); else H(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`); else C ? T && n.texSubImage3D(e.TEXTURE_2D_ARRAY, i, 0, 0, 0, h.width, h.height, t.depth, r, p, h.data) : n.texImage3D(e.TEXTURE_2D_ARRAY, i, m, h.width, h.height, t.depth, 0, r, p, h.data) } else { C && w && n.texStorage2D(e.TEXTURE_2D, E, m, y[0].width, y[0].height); for (let t = 0, i = y.length; t < i; t++)h = y[t], o.format === 1023 ? C ? T && n.texSubImage2D(e.TEXTURE_2D, t, 0, 0, h.width, h.height, r, p, h.data) : n.texImage2D(e.TEXTURE_2D, t, m, h.width, h.height, 0, r, p, h.data) : r === null ? H(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`) : C ? T && n.compressedTexSubImage2D(e.TEXTURE_2D, t, 0, 0, h.width, h.height, r, h.data) : n.compressedTexImage2D(e.TEXTURE_2D, t, m, h.width, h.height, 0, h.data) } else if (o.isDataArrayTexture) if (C) { if (w && n.texStorage3D(e.TEXTURE_2D_ARRAY, E, m, t.width, t.height, t.depth), T) if (o.layerUpdates.size > 0) { let i = _f(t.width, t.height, o.format, o.type); for (let a of o.layerUpdates) { let o = t.data.subarray(a * i / t.data.BYTES_PER_ELEMENT, (a + 1) * i / t.data.BYTES_PER_ELEMENT); n.texSubImage3D(e.TEXTURE_2D_ARRAY, 0, 0, 0, a, t.width, t.height, 1, r, p, o) } o.clearLayerUpdates() } else n.texSubImage3D(e.TEXTURE_2D_ARRAY, 0, 0, 0, 0, t.width, t.height, t.depth, r, p, t.data) } else n.texImage3D(e.TEXTURE_2D_ARRAY, 0, m, t.width, t.height, t.depth, 0, r, p, t.data); else if (o.isData3DTexture) C ? (w && n.texStorage3D(e.TEXTURE_3D, E, m, t.width, t.height, t.depth), T && n.texSubImage3D(e.TEXTURE_3D, 0, 0, 0, 0, t.width, t.height, t.depth, r, p, t.data)) : n.texImage3D(e.TEXTURE_3D, 0, m, t.width, t.height, t.depth, 0, r, p, t.data); else if (o.isFramebufferTexture) { if (w) if (C) n.texStorage2D(e.TEXTURE_2D, E, m, t.width, t.height); else { let i = t.width, a = t.height; for (let t = 0; t < E; t++)n.texImage2D(e.TEXTURE_2D, t, m, i, a, 0, r, p, null), i >>= 1, a >>= 1 } } else if (o.isHTMLTexture) { if (`texElementImage2D` in e) { let n = e.canvas; if (n.hasAttribute(`layoutsubtree`) || n.setAttribute(`layoutsubtree`, `true`), t.parentNode !== n) { n.appendChild(t), d.add(o), n.onpaint = e => { let t = e.changedElements; for (let e of d) t.includes(e.image) && (e.needsUpdate = !0) }, n.requestPaint(); return } let r = e.RGBA, i = e.RGBA, a = e.UNSIGNED_BYTE; e.texElementImage2D(e.TEXTURE_2D, 0, r, i, a, t), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE) } } else if (y.length > 0) { if (C && w) { let t = B(y[0]); n.texStorage2D(e.TEXTURE_2D, E, m, t.width, t.height) } for (let t = 0, i = y.length; t < i; t++)h = y[t], C ? T && n.texSubImage2D(e.TEXTURE_2D, t, 0, 0, r, p, h) : n.texImage2D(e.TEXTURE_2D, t, m, r, p, h); o.generateMipmaps = !1 } else if (C) { if (w) { let r = B(t); n.texStorage2D(e.TEXTURE_2D, E, m, r.width, r.height) } T && n.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, r, p, t) } else n.texImage2D(e.TEXTURE_2D, 0, m, r, p, t); _(o) && v(c), f.__version = u.version, o.onUpdate && o.onUpdate(o) } t.__version = o.version } function ce(t, o, s) { if (o.image.length !== 6) return; let c = ie(t, o), l = o.source; n.bindTexture(e.TEXTURE_CUBE_MAP, t.__webglTexture, e.TEXTURE0 + s); let u = r.get(l); if (l.version !== u.__version || c === !0) { n.activeTexture(e.TEXTURE0 + s); let t = J.getPrimaries(J.workingColorSpace), r = o.colorSpace === `` ? null : J.getPrimaries(o.colorSpace), d = o.colorSpace === `` || t === r ? e.NONE : e.BROWSER_DEFAULT_WEBGL; n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, o.flipY), n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, o.premultiplyAlpha), n.pixelStorei(e.UNPACK_ALIGNMENT, o.unpackAlignment), n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, d); let f = o.isCompressedTexture || o.image[0].isCompressedTexture, p = o.image[0] && o.image[0].isDataTexture, m = []; for (let e = 0; e < 6; e++)!f && !p ? m[e] = g(o.image[e], !0, i.maxCubemapSize) : m[e] = p ? o.image[e].image : o.image[e], m[e] = be(o, m[e]); let h = m[0], y = a.convert(o.format, o.colorSpace), x = a.convert(o.type), C = b(o.internalFormat, y, x, o.normalized, o.colorSpace), w = o.isVideoTexture !== !0, T = u.__version === void 0 || c === !0, E = l.dataReady, D = S(o, h); re(e.TEXTURE_CUBE_MAP, o); let O; if (f) { w && T && n.texStorage2D(e.TEXTURE_CUBE_MAP, D, C, h.width, h.height); for (let t = 0; t < 6; t++) { O = m[t].mipmaps; for (let r = 0; r < O.length; r++) { let i = O[r]; o.format === 1023 ? w ? E && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r, 0, 0, i.width, i.height, y, x, i.data) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r, C, i.width, i.height, 0, y, x, i.data) : y === null ? H(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`) : w ? E && n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r, 0, 0, i.width, i.height, y, i.data) : n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r, C, i.width, i.height, 0, i.data) } } } else { if (O = o.mipmaps, w && T) { O.length > 0 && D++; let t = B(m[0]); n.texStorage2D(e.TEXTURE_CUBE_MAP, D, C, t.width, t.height) } for (let t = 0; t < 6; t++)if (p) { w ? E && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, 0, 0, 0, m[t].width, m[t].height, y, x, m[t].data) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, 0, C, m[t].width, m[t].height, 0, y, x, m[t].data); for (let r = 0; r < O.length; r++) { let i = O[r].image[t].image; w ? E && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r + 1, 0, 0, i.width, i.height, y, x, i.data) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r + 1, C, i.width, i.height, 0, y, x, i.data) } } else { w ? E && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, 0, 0, 0, y, x, m[t]) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, 0, C, y, x, m[t]); for (let r = 0; r < O.length; r++) { let i = O[r]; w ? E && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r + 1, 0, 0, y, x, i.image[t]) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r + 1, C, y, x, i.image[t]) } } } _(o) && v(e.TEXTURE_CUBE_MAP), u.__version = l.version, o.onUpdate && o.onUpdate(o) } t.__version = o.version } function le(t, i, o, c, l, u) { let d = a.convert(o.format, o.colorSpace), f = a.convert(o.type), p = b(o.internalFormat, d, f, o.normalized, o.colorSpace), m = r.get(i), h = r.get(o); if (h.__renderTarget = i, !m.__hasExternalTextures) { let t = Math.max(1, i.width >> u), r = Math.max(1, i.height >> u); l === e.TEXTURE_3D || l === e.TEXTURE_2D_ARRAY ? n.texImage3D(l, u, p, t, r, i.depth, 0, d, f, null) : n.texImage2D(l, u, p, t, r, 0, d, f, null) } n.bindFramebuffer(e.FRAMEBUFFER, t), ye(i) ? s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, c, l, h.__webglTexture, 0, ve(i)) : (l === e.TEXTURE_2D || l >= e.TEXTURE_CUBE_MAP_POSITIVE_X && l <= e.TEXTURE_CUBE_MAP_NEGATIVE_Z) && e.framebufferTexture2D(e.FRAMEBUFFER, c, l, h.__webglTexture, u), n.bindFramebuffer(e.FRAMEBUFFER, null) } function ue(t, n, r) { if (e.bindRenderbuffer(e.RENDERBUFFER, t), n.depthBuffer) { let i = n.depthTexture, a = i && i.isDepthTexture ? i.type : null, o = x(n.stencilBuffer, a), c = n.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT; ye(n) ? s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER, ve(n), o, n.width, n.height) : r ? e.renderbufferStorageMultisample(e.RENDERBUFFER, ve(n), o, n.width, n.height) : e.renderbufferStorage(e.RENDERBUFFER, o, n.width, n.height), e.framebufferRenderbuffer(e.FRAMEBUFFER, c, e.RENDERBUFFER, t) } else { let t = n.textures; for (let i = 0; i < t.length; i++) { let o = t[i], c = a.convert(o.format, o.colorSpace), l = a.convert(o.type), u = b(o.internalFormat, c, l, o.normalized, o.colorSpace); ye(n) ? s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER, ve(n), u, n.width, n.height) : r ? e.renderbufferStorageMultisample(e.RENDERBUFFER, ve(n), u, n.width, n.height) : e.renderbufferStorage(e.RENDERBUFFER, u, n.width, n.height) } } e.bindRenderbuffer(e.RENDERBUFFER, null) } function de(t, i, o) { let c = i.isWebGLCubeRenderTarget === !0; if (n.bindFramebuffer(e.FRAMEBUFFER, t), !(i.depthTexture && i.depthTexture.isDepthTexture)) throw Error(`renderTarget.depthTexture must be an instance of THREE.DepthTexture`); let l = r.get(i.depthTexture); if (l.__renderTarget = i, (!l.__webglTexture || i.depthTexture.image.width !== i.width || i.depthTexture.image.height !== i.height) && (i.depthTexture.image.width = i.width, i.depthTexture.image.height = i.height, i.depthTexture.needsUpdate = !0), c) { if (l.__webglInit === void 0 && (l.__webglInit = !0, i.depthTexture.addEventListener(`dispose`, C)), l.__webglTexture === void 0) { l.__webglTexture = e.createTexture(), n.bindTexture(e.TEXTURE_CUBE_MAP, l.__webglTexture), re(e.TEXTURE_CUBE_MAP, i.depthTexture); let t = a.convert(i.depthTexture.format), r = a.convert(i.depthTexture.type), o; i.depthTexture.format === 1026 ? o = e.DEPTH_COMPONENT24 : i.depthTexture.format === 1027 && (o = e.DEPTH24_STENCIL8); for (let n = 0; n < 6; n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + n, 0, o, i.width, i.height, 0, t, r, null) } } else P(i.depthTexture, 0); let u = l.__webglTexture, d = ve(i), f = c ? e.TEXTURE_CUBE_MAP_POSITIVE_X + o : e.TEXTURE_2D, p = i.depthTexture.format === 1027 ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT; if (i.depthTexture.format === 1026) ye(i) ? s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, p, f, u, 0, d) : e.framebufferTexture2D(e.FRAMEBUFFER, p, f, u, 0); else if (i.depthTexture.format === 1027) ye(i) ? s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, p, f, u, 0, d) : e.framebufferTexture2D(e.FRAMEBUFFER, p, f, u, 0); else throw Error(`Unknown depthTexture format`) } function fe(t) { let i = r.get(t), a = t.isWebGLCubeRenderTarget === !0; if (i.__boundDepthTexture !== t.depthTexture) { let e = t.depthTexture; if (i.__depthDisposeCallback && i.__depthDisposeCallback(), e) { let t = () => { delete i.__boundDepthTexture, delete i.__depthDisposeCallback, e.removeEventListener(`dispose`, t) }; e.addEventListener(`dispose`, t), i.__depthDisposeCallback = t } i.__boundDepthTexture = e } if (t.depthTexture && !i.__autoAllocateDepthBuffer) if (a) for (let e = 0; e < 6; e++)de(i.__webglFramebuffer[e], t, e); else { let e = t.texture.mipmaps; e && e.length > 0 ? de(i.__webglFramebuffer[0], t, 0) : de(i.__webglFramebuffer, t, 0) } else if (a) { i.__webglDepthbuffer = []; for (let r = 0; r < 6; r++)if (n.bindFramebuffer(e.FRAMEBUFFER, i.__webglFramebuffer[r]), i.__webglDepthbuffer[r] === void 0) i.__webglDepthbuffer[r] = e.createRenderbuffer(), ue(i.__webglDepthbuffer[r], t, !1); else { let n = t.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT, a = i.__webglDepthbuffer[r]; e.bindRenderbuffer(e.RENDERBUFFER, a), e.framebufferRenderbuffer(e.FRAMEBUFFER, n, e.RENDERBUFFER, a) } } else { let r = t.texture.mipmaps; if (r && r.length > 0 ? n.bindFramebuffer(e.FRAMEBUFFER, i.__webglFramebuffer[0]) : n.bindFramebuffer(e.FRAMEBUFFER, i.__webglFramebuffer), i.__webglDepthbuffer === void 0) i.__webglDepthbuffer = e.createRenderbuffer(), ue(i.__webglDepthbuffer, t, !1); else { let n = t.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT, r = i.__webglDepthbuffer; e.bindRenderbuffer(e.RENDERBUFFER, r), e.framebufferRenderbuffer(e.FRAMEBUFFER, n, e.RENDERBUFFER, r) } } n.bindFramebuffer(e.FRAMEBUFFER, null) } function pe(t, n, i) { let a = r.get(t); n !== void 0 && le(a.__webglFramebuffer, t, t.texture, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, 0), i !== void 0 && fe(t) } function me(t) { let i = t.texture, s = r.get(t), c = r.get(i); t.addEventListener(`dispose`, w); let l = t.textures, u = t.isWebGLCubeRenderTarget === !0, d = l.length > 1; if (d || (c.__webglTexture === void 0 && (c.__webglTexture = e.createTexture()), c.__version = i.version, o.memory.textures++), u) { s.__webglFramebuffer = []; for (let t = 0; t < 6; t++)if (i.mipmaps && i.mipmaps.length > 0) { s.__webglFramebuffer[t] = []; for (let n = 0; n < i.mipmaps.length; n++)s.__webglFramebuffer[t][n] = e.createFramebuffer() } else s.__webglFramebuffer[t] = e.createFramebuffer() } else { if (i.mipmaps && i.mipmaps.length > 0) { s.__webglFramebuffer = []; for (let t = 0; t < i.mipmaps.length; t++)s.__webglFramebuffer[t] = e.createFramebuffer() } else s.__webglFramebuffer = e.createFramebuffer(); if (d) for (let t = 0, n = l.length; t < n; t++) { let n = r.get(l[t]); n.__webglTexture === void 0 && (n.__webglTexture = e.createTexture(), o.memory.textures++) } if (t.samples > 0 && ye(t) === !1) { s.__webglMultisampledFramebuffer = e.createFramebuffer(), s.__webglColorRenderbuffer = [], n.bindFramebuffer(e.FRAMEBUFFER, s.__webglMultisampledFramebuffer); for (let n = 0; n < l.length; n++) { let r = l[n]; s.__webglColorRenderbuffer[n] = e.createRenderbuffer(), e.bindRenderbuffer(e.RENDERBUFFER, s.__webglColorRenderbuffer[n]); let i = a.convert(r.format, r.colorSpace), o = a.convert(r.type), c = b(r.internalFormat, i, o, r.normalized, r.colorSpace, t.isXRRenderTarget === !0), u = ve(t); e.renderbufferStorageMultisample(e.RENDERBUFFER, u, c, t.width, t.height), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + n, e.RENDERBUFFER, s.__webglColorRenderbuffer[n]) } e.bindRenderbuffer(e.RENDERBUFFER, null), t.depthBuffer && (s.__webglDepthRenderbuffer = e.createRenderbuffer(), ue(s.__webglDepthRenderbuffer, t, !0)), n.bindFramebuffer(e.FRAMEBUFFER, null) } } if (u) { n.bindTexture(e.TEXTURE_CUBE_MAP, c.__webglTexture), re(e.TEXTURE_CUBE_MAP, i); for (let n = 0; n < 6; n++)if (i.mipmaps && i.mipmaps.length > 0) for (let r = 0; r < i.mipmaps.length; r++)le(s.__webglFramebuffer[n][r], t, i, e.COLOR_ATTACHMENT0, e.TEXTURE_CUBE_MAP_POSITIVE_X + n, r); else le(s.__webglFramebuffer[n], t, i, e.COLOR_ATTACHMENT0, e.TEXTURE_CUBE_MAP_POSITIVE_X + n, 0); _(i) && v(e.TEXTURE_CUBE_MAP), n.unbindTexture() } else if (d) { for (let i = 0, a = l.length; i < a; i++) { let a = l[i], o = r.get(a), c = e.TEXTURE_2D; (t.isWebGL3DRenderTarget || t.isWebGLArrayRenderTarget) && (c = t.isWebGL3DRenderTarget ? e.TEXTURE_3D : e.TEXTURE_2D_ARRAY), n.bindTexture(c, o.__webglTexture), re(c, a), le(s.__webglFramebuffer, t, a, e.COLOR_ATTACHMENT0 + i, c, 0), _(a) && v(c) } n.unbindTexture() } else { let r = e.TEXTURE_2D; if ((t.isWebGL3DRenderTarget || t.isWebGLArrayRenderTarget) && (r = t.isWebGL3DRenderTarget ? e.TEXTURE_3D : e.TEXTURE_2D_ARRAY), n.bindTexture(r, c.__webglTexture), re(r, i), i.mipmaps && i.mipmaps.length > 0) for (let n = 0; n < i.mipmaps.length; n++)le(s.__webglFramebuffer[n], t, i, e.COLOR_ATTACHMENT0, r, n); else le(s.__webglFramebuffer, t, i, e.COLOR_ATTACHMENT0, r, 0); _(i) && v(r), n.unbindTexture() } t.depthBuffer && fe(t) } function he(e) { let t = e.textures; for (let i = 0, a = t.length; i < a; i++) { let a = t[i]; if (_(a)) { let t = y(e), i = r.get(a).__webglTexture; n.bindTexture(t, i), v(t), n.unbindTexture() } } } let ge = [], R = []; function _e(t) { if (t.samples > 0) { if (ye(t) === !1) { let i = t.textures, a = t.width, o = t.height, s = e.COLOR_BUFFER_BIT, l = t.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT, u = r.get(t), d = i.length > 1; if (d) for (let t = 0; t < i.length; t++)n.bindFramebuffer(e.FRAMEBUFFER, u.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + t, e.RENDERBUFFER, null), n.bindFramebuffer(e.FRAMEBUFFER, u.__webglFramebuffer), e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0 + t, e.TEXTURE_2D, null, 0); n.bindFramebuffer(e.READ_FRAMEBUFFER, u.__webglMultisampledFramebuffer); let f = t.texture.mipmaps; f && f.length > 0 ? n.bindFramebuffer(e.DRAW_FRAMEBUFFER, u.__webglFramebuffer[0]) : n.bindFramebuffer(e.DRAW_FRAMEBUFFER, u.__webglFramebuffer); for (let n = 0; n < i.length; n++) { if (t.resolveDepthBuffer && (t.depthBuffer && (s |= e.DEPTH_BUFFER_BIT), t.stencilBuffer && t.resolveStencilBuffer && (s |= e.STENCIL_BUFFER_BIT)), d) { e.framebufferRenderbuffer(e.READ_FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.RENDERBUFFER, u.__webglColorRenderbuffer[n]); let t = r.get(i[n]).__webglTexture; e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, t, 0) } e.blitFramebuffer(0, 0, a, o, 0, 0, a, o, s, e.NEAREST), c === !0 && (ge.length = 0, R.length = 0, ge.push(e.COLOR_ATTACHMENT0 + n), t.depthBuffer && t.resolveDepthBuffer === !1 && (ge.push(l), R.push(l), e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER, R)), e.invalidateFramebuffer(e.READ_FRAMEBUFFER, ge)) } if (n.bindFramebuffer(e.READ_FRAMEBUFFER, null), n.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), d) for (let t = 0; t < i.length; t++) { n.bindFramebuffer(e.FRAMEBUFFER, u.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + t, e.RENDERBUFFER, u.__webglColorRenderbuffer[t]); let a = r.get(i[t]).__webglTexture; n.bindFramebuffer(e.FRAMEBUFFER, u.__webglFramebuffer), e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0 + t, e.TEXTURE_2D, a, 0) } n.bindFramebuffer(e.DRAW_FRAMEBUFFER, u.__webglMultisampledFramebuffer) } else if (t.depthBuffer && t.resolveDepthBuffer === !1 && c) { let n = t.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT; e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER, [n]) } } } function ve(e) { return Math.min(i.maxSamples, e.samples) } function ye(e) { let n = r.get(e); return e.samples > 0 && t.has(`WEBGL_multisampled_render_to_texture`) === !0 && n.__useRenderToTexture !== !1 } function z(e) { let t = o.render.frame; u.get(e) !== t && (u.set(e, t), e.update()) } function be(e, t) { let n = e.colorSpace, r = e.format, i = e.type; return e.isCompressedTexture === !0 || e.isVideoTexture === !0 || n !== `srgb-linear` && n !== `` && (J.getTransfer(n) === `srgb` ? (r !== 1023 || i !== 1009) && H(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`) : U(`WebGLTextures: Unsupported texture color space:`, n)), t } function B(e) { return typeof HTMLImageElement < `u` && e instanceof HTMLImageElement ? (l.width = e.naturalWidth || e.width, l.height = e.naturalHeight || e.height) : typeof VideoFrame < `u` && e instanceof VideoFrame ? (l.width = e.displayWidth, l.height = e.displayHeight) : (l.width = e.width, l.height = e.height), l } this.allocateTextureUnit = M, this.resetTextureUnits = k, this.getTextureUnits = A, this.setTextureUnits = j, this.setTexture2D = P, this.setTexture2DArray = F, this.setTexture3D = I, this.setTextureCube = ee, this.rebindTextures = pe, this.setupRenderTarget = me, this.updateRenderTargetMipmap = he, this.updateMultisampleRenderTarget = _e, this.setupDepthRenderbuffer = fe, this.setupFrameBufferTexture = le, this.useMultisampledRTT = ye, this.isReversedDepthBuffer = function () { return n.buffers.depth.getReversed() } } function Sh(e, t) { function n(n, r = ``) { let i, a = J.getTransfer(r); if (n === 1009) return e.UNSIGNED_BYTE; if (n === 1017) return e.UNSIGNED_SHORT_4_4_4_4; if (n === 1018) return e.UNSIGNED_SHORT_5_5_5_1; if (n === 35902) return e.UNSIGNED_INT_5_9_9_9_REV; if (n === 35899) return e.UNSIGNED_INT_10F_11F_11F_REV; if (n === 1010) return e.BYTE; if (n === 1011) return e.SHORT; if (n === 1012) return e.UNSIGNED_SHORT; if (n === 1013) return e.INT; if (n === 1014) return e.UNSIGNED_INT; if (n === 1015) return e.FLOAT; if (n === 1016) return e.HALF_FLOAT; if (n === 1021) return e.ALPHA; if (n === 1022) return e.RGB; if (n === 1023) return e.RGBA; if (n === 1026) return e.DEPTH_COMPONENT; if (n === 1027) return e.DEPTH_STENCIL; if (n === 1028) return e.RED; if (n === 1029) return e.RED_INTEGER; if (n === 1030) return e.RG; if (n === 1031) return e.RG_INTEGER; if (n === 1033) return e.RGBA_INTEGER; if (n === 33776 || n === 33777 || n === 33778 || n === 33779) if (a === `srgb`) if (i = t.get(`WEBGL_compressed_texture_s3tc_srgb`), i !== null) { if (n === 33776) return i.COMPRESSED_SRGB_S3TC_DXT1_EXT; if (n === 33777) return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT; if (n === 33778) return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT; if (n === 33779) return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT } else return null; else if (i = t.get(`WEBGL_compressed_texture_s3tc`), i !== null) { if (n === 33776) return i.COMPRESSED_RGB_S3TC_DXT1_EXT; if (n === 33777) return i.COMPRESSED_RGBA_S3TC_DXT1_EXT; if (n === 33778) return i.COMPRESSED_RGBA_S3TC_DXT3_EXT; if (n === 33779) return i.COMPRESSED_RGBA_S3TC_DXT5_EXT } else return null; if (n === 35840 || n === 35841 || n === 35842 || n === 35843) if (i = t.get(`WEBGL_compressed_texture_pvrtc`), i !== null) { if (n === 35840) return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG; if (n === 35841) return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG; if (n === 35842) return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG; if (n === 35843) return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG } else return null; if (n === 36196 || n === 37492 || n === 37496 || n === 37488 || n === 37489 || n === 37490 || n === 37491) if (i = t.get(`WEBGL_compressed_texture_etc`), i !== null) { if (n === 36196 || n === 37492) return a === `srgb` ? i.COMPRESSED_SRGB8_ETC2 : i.COMPRESSED_RGB8_ETC2; if (n === 37496) return a === `srgb` ? i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : i.COMPRESSED_RGBA8_ETC2_EAC; if (n === 37488) return i.COMPRESSED_R11_EAC; if (n === 37489) return i.COMPRESSED_SIGNED_R11_EAC; if (n === 37490) return i.COMPRESSED_RG11_EAC; if (n === 37491) return i.COMPRESSED_SIGNED_RG11_EAC } else return null; if (n === 37808 || n === 37809 || n === 37810 || n === 37811 || n === 37812 || n === 37813 || n === 37814 || n === 37815 || n === 37816 || n === 37817 || n === 37818 || n === 37819 || n === 37820 || n === 37821) if (i = t.get(`WEBGL_compressed_texture_astc`), i !== null) { if (n === 37808) return a === `srgb` ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : i.COMPRESSED_RGBA_ASTC_4x4_KHR; if (n === 37809) return a === `srgb` ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : i.COMPRESSED_RGBA_ASTC_5x4_KHR; if (n === 37810) return a === `srgb` ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : i.COMPRESSED_RGBA_ASTC_5x5_KHR; if (n === 37811) return a === `srgb` ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : i.COMPRESSED_RGBA_ASTC_6x5_KHR; if (n === 37812) return a === `srgb` ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : i.COMPRESSED_RGBA_ASTC_6x6_KHR; if (n === 37813) return a === `srgb` ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : i.COMPRESSED_RGBA_ASTC_8x5_KHR; if (n === 37814) return a === `srgb` ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : i.COMPRESSED_RGBA_ASTC_8x6_KHR; if (n === 37815) return a === `srgb` ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : i.COMPRESSED_RGBA_ASTC_8x8_KHR; if (n === 37816) return a === `srgb` ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : i.COMPRESSED_RGBA_ASTC_10x5_KHR; if (n === 37817) return a === `srgb` ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : i.COMPRESSED_RGBA_ASTC_10x6_KHR; if (n === 37818) return a === `srgb` ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : i.COMPRESSED_RGBA_ASTC_10x8_KHR; if (n === 37819) return a === `srgb` ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : i.COMPRESSED_RGBA_ASTC_10x10_KHR; if (n === 37820) return a === `srgb` ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : i.COMPRESSED_RGBA_ASTC_12x10_KHR; if (n === 37821) return a === `srgb` ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : i.COMPRESSED_RGBA_ASTC_12x12_KHR } else return null; if (n === 36492 || n === 36494 || n === 36495) if (i = t.get(`EXT_texture_compression_bptc`), i !== null) { if (n === 36492) return a === `srgb` ? i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : i.COMPRESSED_RGBA_BPTC_UNORM_EXT; if (n === 36494) return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT; if (n === 36495) return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT } else return null; if (n === 36283 || n === 36284 || n === 36285 || n === 36286) if (i = t.get(`EXT_texture_compression_rgtc`), i !== null) { if (n === 36283) return i.COMPRESSED_RED_RGTC1_EXT; if (n === 36284) return i.COMPRESSED_SIGNED_RED_RGTC1_EXT; if (n === 36285) return i.COMPRESSED_RED_GREEN_RGTC2_EXT; if (n === 36286) return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT } else return null; return n === 1020 ? e.UNSIGNED_INT_24_8 : e[n] === void 0 ? null : e[n] } return { convert: n } } var Ch = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`, wh = `
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`, Th = class { constructor() { this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0 } init(e, t) { if (this.texture === null) { let n = new bu(e.texture); (e.depthNear !== t.depthNear || e.depthFar !== t.depthFar) && (this.depthNear = e.depthNear, this.depthFar = e.depthFar), this.texture = n } } getMesh(e) { if (this.texture !== null && this.mesh === null) { let t = e.cameras[0].viewport, n = new Mu({ vertexShader: Ch, fragmentShader: wh, uniforms: { depthColor: { value: this.texture }, depthWidth: { value: t.z }, depthHeight: { value: t.w } } }); this.mesh = new hl(new Su(20, 20), n) } return this.mesh } reset() { this.texture = null, this.mesh = null } getDepthTexture() { return this.texture } }, Eh = class extends mo { constructor(e, t) { super(); let n = this, r = null, i = 1, a = null, o = `local-floor`, s = 1, c = null, l = null, u = null, d = null, f = null, p = null, m = typeof XRWebGLBinding < `u`, h = new Th, g = {}, _ = t.getContextAttributes(), v = null, y = null, b = [], x = [], S = new G, C = null, w = new Od; w.viewport = new is; let T = new Od; T.viewport = new is; let E = [w, T], D = new Ud, O = null, k = null; this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function (e) { let t = b[e]; return t === void 0 && (t = new Rs, b[e] = t), t.getTargetRaySpace() }, this.getControllerGrip = function (e) { let t = b[e]; return t === void 0 && (t = new Rs, b[e] = t), t.getGripSpace() }, this.getHand = function (e) { let t = b[e]; return t === void 0 && (t = new Rs, b[e] = t), t.getHandSpace() }; function A(e) { let t = x.indexOf(e.inputSource); if (t === -1) return; let n = b[t]; n !== void 0 && (n.update(e.inputSource, e.frame, c || a), n.dispatchEvent({ type: e.type, data: e.inputSource })) } function j() { r.removeEventListener(`select`, A), r.removeEventListener(`selectstart`, A), r.removeEventListener(`selectend`, A), r.removeEventListener(`squeeze`, A), r.removeEventListener(`squeezestart`, A), r.removeEventListener(`squeezeend`, A), r.removeEventListener(`end`, j), r.removeEventListener(`inputsourceschange`, M); for (let e = 0; e < b.length; e++) { let t = x[e]; t !== null && (x[e] = null, b[e].disconnect(t)) } O = null, k = null, h.reset(); for (let e in g) delete g[e]; e.setRenderTarget(v), f = null, d = null, u = null, r = null, y = null, L.stop(), n.isPresenting = !1, e.setPixelRatio(C), e.setSize(S.width, S.height, !1), n.dispatchEvent({ type: `sessionend` }) } this.setFramebufferScaleFactor = function (e) { i = e, n.isPresenting === !0 && H(`WebXRManager: Cannot change framebuffer scale while presenting.`) }, this.setReferenceSpaceType = function (e) { o = e, n.isPresenting === !0 && H(`WebXRManager: Cannot change reference space type while presenting.`) }, this.getReferenceSpace = function () { return c || a }, this.setReferenceSpace = function (e) { c = e }, this.getBaseLayer = function () { return d === null ? f : d }, this.getBinding = function () { return u === null && m && (u = new XRWebGLBinding(r, t)), u }, this.getFrame = function () { return p }, this.getSession = function () { return r }, this.setSession = async function (l) { if (r = l, r !== null) { if (v = e.getRenderTarget(), r.addEventListener(`select`, A), r.addEventListener(`selectstart`, A), r.addEventListener(`selectend`, A), r.addEventListener(`squeeze`, A), r.addEventListener(`squeezestart`, A), r.addEventListener(`squeezeend`, A), r.addEventListener(`end`, j), r.addEventListener(`inputsourceschange`, M), _.xrCompatible !== !0 && await t.makeXRCompatible(), C = e.getPixelRatio(), e.getSize(S), m && `createProjectionLayer` in XRWebGLBinding.prototype) { let n = null, a = null, o = null; _.depth && (o = _.stencil ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT24, n = _.stencil ? Yi : Ji, a = _.stencil ? Hi : Li); let s = { colorFormat: t.RGBA8, depthFormat: o, scaleFactor: i }; u = this.getBinding(), d = u.createProjectionLayer(s), r.updateRenderState({ layers: [d] }), e.setPixelRatio(1), e.setSize(d.textureWidth, d.textureHeight, !1), y = new os(d.textureWidth, d.textureHeight, { format: qi, type: Mi, depthTexture: new vu(d.textureWidth, d.textureHeight, a, void 0, void 0, void 0, void 0, void 0, void 0, n), stencilBuffer: _.stencil, colorSpace: e.outputColorSpace, samples: _.antialias ? 4 : 0, resolveDepthBuffer: d.ignoreDepthValues === !1, resolveStencilBuffer: d.ignoreDepthValues === !1 }) } else { let n = { antialias: _.antialias, alpha: !0, depth: _.depth, stencil: _.stencil, framebufferScaleFactor: i }; f = new XRWebGLLayer(r, t, n), r.updateRenderState({ baseLayer: f }), e.setPixelRatio(1), e.setSize(f.framebufferWidth, f.framebufferHeight, !1), y = new os(f.framebufferWidth, f.framebufferHeight, { format: qi, type: Mi, colorSpace: e.outputColorSpace, stencilBuffer: _.stencil, resolveDepthBuffer: f.ignoreDepthValues === !1, resolveStencilBuffer: f.ignoreDepthValues === !1 }) } y.isXRRenderTarget = !0, this.setFoveation(s), c = null, a = await r.requestReferenceSpace(o), L.setContext(r), L.start(), n.isPresenting = !0, n.dispatchEvent({ type: `sessionstart` }) } }, this.getEnvironmentBlendMode = function () { if (r !== null) return r.environmentBlendMode }, this.getDepthTexture = function () { return h.getDepthTexture() }; function M(e) { for (let t = 0; t < e.removed.length; t++) { let n = e.removed[t], r = x.indexOf(n); r >= 0 && (x[r] = null, b[r].disconnect(n)) } for (let t = 0; t < e.added.length; t++) { let n = e.added[t], r = x.indexOf(n); if (r === -1) { for (let e = 0; e < b.length; e++)if (e >= x.length) { x.push(n), r = e; break } else if (x[e] === null) { x[e] = n, r = e; break } if (r === -1) break } let i = b[r]; i && i.connect(n) } } let N = new K, P = new K; function F(e, t, n) { N.setFromMatrixPosition(t.matrixWorld), P.setFromMatrixPosition(n.matrixWorld); let r = N.distanceTo(P), i = t.projectionMatrix.elements, a = n.projectionMatrix.elements, o = i[14] / (i[10] - 1), s = i[14] / (i[10] + 1), c = (i[9] + 1) / i[5], l = (i[9] - 1) / i[5], u = (i[8] - 1) / i[0], d = (a[8] + 1) / a[0], f = o * u, p = o * d, m = r / (-u + d), h = m * -u; if (t.matrixWorld.decompose(e.position, e.quaternion, e.scale), e.translateX(h), e.translateZ(m), e.matrixWorld.compose(e.position, e.quaternion, e.scale), e.matrixWorldInverse.copy(e.matrixWorld).invert(), i[10] === -1) e.projectionMatrix.copy(t.projectionMatrix), e.projectionMatrixInverse.copy(t.projectionMatrixInverse); else { let t = o + m, n = s + m, i = f - h, a = p + (r - h), u = c * s / n * t, d = l * s / n * t; e.projectionMatrix.makePerspective(i, a, u, d, t, n), e.projectionMatrixInverse.copy(e.projectionMatrix).invert() } } function I(e, t) { t === null ? e.matrixWorld.copy(e.matrix) : e.matrixWorld.multiplyMatrices(t.matrixWorld, e.matrix), e.matrixWorldInverse.copy(e.matrixWorld).invert() } this.updateCamera = function (e) { if (r === null) return; let t = e.near, n = e.far; h.texture !== null && (h.depthNear > 0 && (t = h.depthNear), h.depthFar > 0 && (n = h.depthFar)), D.near = T.near = w.near = t, D.far = T.far = w.far = n, (O !== D.near || k !== D.far) && (r.updateRenderState({ depthNear: D.near, depthFar: D.far }), O = D.near, k = D.far), D.layers.mask = e.layers.mask | 6, w.layers.mask = D.layers.mask & -5, T.layers.mask = D.layers.mask & -3; let i = e.parent, a = D.cameras; I(D, i); for (let e = 0; e < a.length; e++)I(a[e], i); a.length === 2 ? F(D, w, T) : D.projectionMatrix.copy(w.projectionMatrix), ee(e, D, i) }; function ee(e, t, n) { n === null ? e.matrix.copy(t.matrixWorld) : (e.matrix.copy(n.matrixWorld), e.matrix.invert(), e.matrix.multiply(t.matrixWorld)), e.matrix.decompose(e.position, e.quaternion, e.scale), e.updateMatrixWorld(!0), e.projectionMatrix.copy(t.projectionMatrix), e.projectionMatrixInverse.copy(t.projectionMatrixInverse), e.isPerspectiveCamera && (e.fov = vo * 2 * Math.atan(1 / e.projectionMatrix.elements[5]), e.zoom = 1) } this.getCamera = function () { return D }, this.getFoveation = function () { if (!(d === null && f === null)) return s }, this.setFoveation = function (e) { s = e, d !== null && (d.fixedFoveation = e), f !== null && f.fixedFoveation !== void 0 && (f.fixedFoveation = e) }, this.hasDepthSensing = function () { return h.texture !== null }, this.getDepthSensingMesh = function () { return h.getMesh(D) }, this.getCameraTexture = function (e) { return g[e] }; let te = null; function ne(t, i) { if (l = i.getViewerPose(c || a), p = i, l !== null) { let t = l.views; f !== null && (e.setRenderTargetFramebuffer(y, f.framebuffer), e.setRenderTarget(y)); let i = !1; t.length !== D.cameras.length && (D.cameras.length = 0, i = !0); for (let n = 0; n < t.length; n++) { let r = t[n], a = null; if (f !== null) a = f.getViewport(r); else { let t = u.getViewSubImage(d, r); a = t.viewport, n === 0 && (e.setRenderTargetTextures(y, t.colorTexture, t.depthStencilTexture), e.setRenderTarget(y)) } let o = E[n]; o === void 0 && (o = new Od, o.layers.enable(n), o.viewport = new is, E[n] = o), o.matrix.fromArray(r.transform.matrix), o.matrix.decompose(o.position, o.quaternion, o.scale), o.projectionMatrix.fromArray(r.projectionMatrix), o.projectionMatrixInverse.copy(o.projectionMatrix).invert(), o.viewport.set(a.x, a.y, a.width, a.height), n === 0 && (D.matrix.copy(o.matrix), D.matrix.decompose(D.position, D.quaternion, D.scale)), i === !0 && D.cameras.push(o) } let a = r.enabledFeatures; if (a && a.includes(`depth-sensing`) && r.depthUsage == `gpu-optimized` && m) { u = n.getBinding(); let e = u.getDepthInformation(t[0]); e && e.isValid && e.texture && h.init(e, r.renderState) } if (a && a.includes(`camera-access`) && m) { e.state.unbindTexture(), u = n.getBinding(); for (let e = 0; e < t.length; e++) { let n = t[e].camera; if (n) { let e = g[n]; e || (e = new bu, g[n] = e); let t = u.getCameraImage(n); e.sourceTexture = t } } } } for (let e = 0; e < b.length; e++) { let t = x[e], n = b[e]; t !== null && n !== void 0 && n.update(t, i, c || a) } te && te(t, i), i.detectedPlanes && n.dispatchEvent({ type: `planesdetected`, data: i }), p = null } let L = new yf; L.setAnimationLoop(ne), this.setAnimationLoop = function (e) { te = e }, this.dispose = function () { } } }, Dh = new Y, Oh = new q; Oh.set(-1, 0, 0, 0, 1, 0, 0, 0, 1); function kh(e, t) { function n(e, t) { e.matrixAutoUpdate === !0 && e.updateMatrix(), t.value.copy(e.matrix) } function r(t, n) { n.color.getRGB(t.fogColor.value, Ou(e)), n.isFog ? (t.fogNear.value = n.near, t.fogFar.value = n.far) : n.isFogExp2 && (t.fogDensity.value = n.density) } function i(e, t, n, r, i) { t.isNodeMaterial ? t.uniformsNeedUpdate = !1 : t.isMeshBasicMaterial ? a(e, t) : t.isMeshLambertMaterial ? (a(e, t), t.envMap && (e.envMapIntensity.value = t.envMapIntensity)) : t.isMeshToonMaterial ? (a(e, t), d(e, t)) : t.isMeshPhongMaterial ? (a(e, t), u(e, t), t.envMap && (e.envMapIntensity.value = t.envMapIntensity)) : t.isMeshStandardMaterial ? (a(e, t), f(e, t), t.isMeshPhysicalMaterial && p(e, t, i)) : t.isMeshMatcapMaterial ? (a(e, t), m(e, t)) : t.isMeshDepthMaterial ? a(e, t) : t.isMeshDistanceMaterial ? (a(e, t), h(e, t)) : t.isMeshNormalMaterial ? a(e, t) : t.isLineBasicMaterial ? (o(e, t), t.isLineDashedMaterial && s(e, t)) : t.isPointsMaterial ? c(e, t, n, r) : t.isSpriteMaterial ? l(e, t) : t.isShadowMaterial ? (e.color.value.copy(t.color), e.opacity.value = t.opacity) : t.isShaderMaterial && (t.uniformsNeedUpdate = !1) } function a(e, r) { e.opacity.value = r.opacity, r.color && e.diffuse.value.copy(r.color), r.emissive && e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity), r.map && (e.map.value = r.map, n(r.map, e.mapTransform)), r.alphaMap && (e.alphaMap.value = r.alphaMap, n(r.alphaMap, e.alphaMapTransform)), r.bumpMap && (e.bumpMap.value = r.bumpMap, n(r.bumpMap, e.bumpMapTransform), e.bumpScale.value = r.bumpScale, r.side === 1 && (e.bumpScale.value *= -1)), r.normalMap && (e.normalMap.value = r.normalMap, n(r.normalMap, e.normalMapTransform), e.normalScale.value.copy(r.normalScale), r.side === 1 && e.normalScale.value.negate()), r.displacementMap && (e.displacementMap.value = r.displacementMap, n(r.displacementMap, e.displacementMapTransform), e.displacementScale.value = r.displacementScale, e.displacementBias.value = r.displacementBias), r.emissiveMap && (e.emissiveMap.value = r.emissiveMap, n(r.emissiveMap, e.emissiveMapTransform)), r.specularMap && (e.specularMap.value = r.specularMap, n(r.specularMap, e.specularMapTransform)), r.alphaTest > 0 && (e.alphaTest.value = r.alphaTest); let i = t.get(r), a = i.envMap, o = i.envMapRotation; a && (e.envMap.value = a, e.envMapRotation.value.setFromMatrix4(Dh.makeRotationFromEuler(o)).transpose(), a.isCubeTexture && a.isRenderTargetTexture === !1 && e.envMapRotation.value.premultiply(Oh), e.reflectivity.value = r.reflectivity, e.ior.value = r.ior, e.refractionRatio.value = r.refractionRatio), r.lightMap && (e.lightMap.value = r.lightMap, e.lightMapIntensity.value = r.lightMapIntensity, n(r.lightMap, e.lightMapTransform)), r.aoMap && (e.aoMap.value = r.aoMap, e.aoMapIntensity.value = r.aoMapIntensity, n(r.aoMap, e.aoMapTransform)) } function o(e, t) { e.diffuse.value.copy(t.color), e.opacity.value = t.opacity, t.map && (e.map.value = t.map, n(t.map, e.mapTransform)) } function s(e, t) { e.dashSize.value = t.dashSize, e.totalSize.value = t.dashSize + t.gapSize, e.scale.value = t.scale } function c(e, t, r, i) { e.diffuse.value.copy(t.color), e.opacity.value = t.opacity, e.size.value = t.size * r, e.scale.value = i * .5, t.map && (e.map.value = t.map, n(t.map, e.uvTransform)), t.alphaMap && (e.alphaMap.value = t.alphaMap, n(t.alphaMap, e.alphaMapTransform)), t.alphaTest > 0 && (e.alphaTest.value = t.alphaTest) } function l(e, t) { e.diffuse.value.copy(t.color), e.opacity.value = t.opacity, e.rotation.value = t.rotation, t.map && (e.map.value = t.map, n(t.map, e.mapTransform)), t.alphaMap && (e.alphaMap.value = t.alphaMap, n(t.alphaMap, e.alphaMapTransform)), t.alphaTest > 0 && (e.alphaTest.value = t.alphaTest) } function u(e, t) { e.specular.value.copy(t.specular), e.shininess.value = Math.max(t.shininess, 1e-4) } function d(e, t) { t.gradientMap && (e.gradientMap.value = t.gradientMap) } function f(e, t) { e.metalness.value = t.metalness, t.metalnessMap && (e.metalnessMap.value = t.metalnessMap, n(t.metalnessMap, e.metalnessMapTransform)), e.roughness.value = t.roughness, t.roughnessMap && (e.roughnessMap.value = t.roughnessMap, n(t.roughnessMap, e.roughnessMapTransform)), t.envMap && (e.envMapIntensity.value = t.envMapIntensity) } function p(e, t, r) { e.ior.value = t.ior, t.sheen > 0 && (e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen), e.sheenRoughness.value = t.sheenRoughness, t.sheenColorMap && (e.sheenColorMap.value = t.sheenColorMap, n(t.sheenColorMap, e.sheenColorMapTransform)), t.sheenRoughnessMap && (e.sheenRoughnessMap.value = t.sheenRoughnessMap, n(t.sheenRoughnessMap, e.sheenRoughnessMapTransform))), t.clearcoat > 0 && (e.clearcoat.value = t.clearcoat, e.clearcoatRoughness.value = t.clearcoatRoughness, t.clearcoatMap && (e.clearcoatMap.value = t.clearcoatMap, n(t.clearcoatMap, e.clearcoatMapTransform)), t.clearcoatRoughnessMap && (e.clearcoatRoughnessMap.value = t.clearcoatRoughnessMap, n(t.clearcoatRoughnessMap, e.clearcoatRoughnessMapTransform)), t.clearcoatNormalMap && (e.clearcoatNormalMap.value = t.clearcoatNormalMap, n(t.clearcoatNormalMap, e.clearcoatNormalMapTransform), e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale), t.side === 1 && e.clearcoatNormalScale.value.negate())), t.dispersion > 0 && (e.dispersion.value = t.dispersion), t.iridescence > 0 && (e.iridescence.value = t.iridescence, e.iridescenceIOR.value = t.iridescenceIOR, e.iridescenceThicknessMinimum.value = t.iridescenceThicknessRange[0], e.iridescenceThicknessMaximum.value = t.iridescenceThicknessRange[1], t.iridescenceMap && (e.iridescenceMap.value = t.iridescenceMap, n(t.iridescenceMap, e.iridescenceMapTransform)), t.iridescenceThicknessMap && (e.iridescenceThicknessMap.value = t.iridescenceThicknessMap, n(t.iridescenceThicknessMap, e.iridescenceThicknessMapTransform))), t.transmission > 0 && (e.transmission.value = t.transmission, e.transmissionSamplerMap.value = r.texture, e.transmissionSamplerSize.value.set(r.width, r.height), t.transmissionMap && (e.transmissionMap.value = t.transmissionMap, n(t.transmissionMap, e.transmissionMapTransform)), e.thickness.value = t.thickness, t.thicknessMap && (e.thicknessMap.value = t.thicknessMap, n(t.thicknessMap, e.thicknessMapTransform)), e.attenuationDistance.value = t.attenuationDistance, e.attenuationColor.value.copy(t.attenuationColor)), t.anisotropy > 0 && (e.anisotropyVector.value.set(t.anisotropy * Math.cos(t.anisotropyRotation), t.anisotropy * Math.sin(t.anisotropyRotation)), t.anisotropyMap && (e.anisotropyMap.value = t.anisotropyMap, n(t.anisotropyMap, e.anisotropyMapTransform))), e.specularIntensity.value = t.specularIntensity, e.specularColor.value.copy(t.specularColor), t.specularColorMap && (e.specularColorMap.value = t.specularColorMap, n(t.specularColorMap, e.specularColorMapTransform)), t.specularIntensityMap && (e.specularIntensityMap.value = t.specularIntensityMap, n(t.specularIntensityMap, e.specularIntensityMapTransform)) } function m(e, t) { t.matcap && (e.matcap.value = t.matcap) } function h(e, n) { let r = t.get(n).light; e.referencePosition.value.setFromMatrixPosition(r.matrixWorld), e.nearDistance.value = r.shadow.camera.near, e.farDistance.value = r.shadow.camera.far } return { refreshFogUniforms: r, refreshMaterialUniforms: i } } function Ah(e, t, n, r) { let i = {}, a = {}, o = [], s = e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS); function c(e, t) { let n = t.program; r.uniformBlockBinding(e, n) } function l(e, n) { let o = i[e.id]; o === void 0 && (m(e), o = u(e), i[e.id] = o, e.addEventListener(`dispose`, g)); let s = n.program; r.updateUBOMapping(e, s); let c = t.render.frame; a[e.id] !== c && (f(e), a[e.id] = c) } function u(t) { let n = d(); t.__bindingPointIndex = n; let r = e.createBuffer(), i = t.__size, a = t.usage; return e.bindBuffer(e.UNIFORM_BUFFER, r), e.bufferData(e.UNIFORM_BUFFER, i, a), e.bindBuffer(e.UNIFORM_BUFFER, null), e.bindBufferBase(e.UNIFORM_BUFFER, n, r), r } function d() { for (let e = 0; e < s; e++)if (o.indexOf(e) === -1) return o.push(e), e; return U(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`), 0 } function f(t) { let n = i[t.id], r = t.uniforms, a = t.__cache; e.bindBuffer(e.UNIFORM_BUFFER, n); for (let t = 0, n = r.length; t < n; t++) { let n = Array.isArray(r[t]) ? r[t] : [r[t]]; for (let r = 0, i = n.length; r < i; r++) { let i = n[r]; if (p(i, t, r, a) === !0) { let t = i.__offset, n = Array.isArray(i.value) ? i.value : [i.value], r = 0; for (let a = 0; a < n.length; a++) { let o = n[a], s = h(o); typeof o == `number` || typeof o == `boolean` ? (i.__data[0] = o, e.bufferSubData(e.UNIFORM_BUFFER, t + r, i.__data)) : o.isMatrix3 ? (i.__data[0] = o.elements[0], i.__data[1] = o.elements[1], i.__data[2] = o.elements[2], i.__data[3] = 0, i.__data[4] = o.elements[3], i.__data[5] = o.elements[4], i.__data[6] = o.elements[5], i.__data[7] = 0, i.__data[8] = o.elements[6], i.__data[9] = o.elements[7], i.__data[10] = o.elements[8], i.__data[11] = 0) : ArrayBuffer.isView(o) ? i.__data.set(new o.constructor(o.buffer, o.byteOffset, i.__data.length)) : (o.toArray(i.__data, r), r += s.storage / Float32Array.BYTES_PER_ELEMENT) } e.bufferSubData(e.UNIFORM_BUFFER, t, i.__data) } } } e.bindBuffer(e.UNIFORM_BUFFER, null) } function p(e, t, n, r) { let i = e.value, a = t + `_` + n; if (r[a] === void 0) return typeof i == `number` || typeof i == `boolean` ? r[a] = i : ArrayBuffer.isView(i) ? r[a] = i.slice() : r[a] = i.clone(), !0; { let e = r[a]; if (typeof i == `number` || typeof i == `boolean`) { if (e !== i) return r[a] = i, !0 } else if (ArrayBuffer.isView(i)) return !0; else if (e.equals(i) === !1) return e.copy(i), !0 } return !1 } function m(e) { let t = e.uniforms, n = 0; for (let e = 0, r = t.length; e < r; e++) { let r = Array.isArray(t[e]) ? t[e] : [t[e]]; for (let e = 0, t = r.length; e < t; e++) { let t = r[e], i = Array.isArray(t.value) ? t.value : [t.value]; for (let e = 0, r = i.length; e < r; e++) { let r = i[e], a = h(r), o = n % 16, s = o % a.boundary, c = o + s; n += s, c !== 0 && 16 - c < a.storage && (n += 16 - c), t.__data = new Float32Array(a.storage / Float32Array.BYTES_PER_ELEMENT), t.__offset = n, n += a.storage } } } let r = n % 16; return r > 0 && (n += 16 - r), e.__size = n, e.__cache = {}, this } function h(e) { let t = { boundary: 0, storage: 0 }; return typeof e == `number` || typeof e == `boolean` ? (t.boundary = 4, t.storage = 4) : e.isVector2 ? (t.boundary = 8, t.storage = 8) : e.isVector3 || e.isColor ? (t.boundary = 16, t.storage = 12) : e.isVector4 ? (t.boundary = 16, t.storage = 16) : e.isMatrix3 ? (t.boundary = 48, t.storage = 48) : e.isMatrix4 ? (t.boundary = 64, t.storage = 64) : e.isTexture ? H(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`) : ArrayBuffer.isView(e) ? (t.boundary = 16, t.storage = e.byteLength) : H(`WebGLRenderer: Unsupported uniform value type.`, e), t } function g(t) { let n = t.target; n.removeEventListener(`dispose`, g); let r = o.indexOf(n.__bindingPointIndex); o.splice(r, 1), e.deleteBuffer(i[n.id]), delete i[n.id], delete a[n.id] } function _() { for (let t in i) e.deleteBuffer(i[t]); o = [], i = {}, a = {} } return { bind: c, update: l, dispose: _ } } var jh = new Uint16Array([12469, 15057, 12620, 14925, 13266, 14620, 13807, 14376, 14323, 13990, 14545, 13625, 14713, 13328, 14840, 12882, 14931, 12528, 14996, 12233, 15039, 11829, 15066, 11525, 15080, 11295, 15085, 10976, 15082, 10705, 15073, 10495, 13880, 14564, 13898, 14542, 13977, 14430, 14158, 14124, 14393, 13732, 14556, 13410, 14702, 12996, 14814, 12596, 14891, 12291, 14937, 11834, 14957, 11489, 14958, 11194, 14943, 10803, 14921, 10506, 14893, 10278, 14858, 9960, 14484, 14039, 14487, 14025, 14499, 13941, 14524, 13740, 14574, 13468, 14654, 13106, 14743, 12678, 14818, 12344, 14867, 11893, 14889, 11509, 14893, 11180, 14881, 10751, 14852, 10428, 14812, 10128, 14765, 9754, 14712, 9466, 14764, 13480, 14764, 13475, 14766, 13440, 14766, 13347, 14769, 13070, 14786, 12713, 14816, 12387, 14844, 11957, 14860, 11549, 14868, 11215, 14855, 10751, 14825, 10403, 14782, 10044, 14729, 9651, 14666, 9352, 14599, 9029, 14967, 12835, 14966, 12831, 14963, 12804, 14954, 12723, 14936, 12564, 14917, 12347, 14900, 11958, 14886, 11569, 14878, 11247, 14859, 10765, 14828, 10401, 14784, 10011, 14727, 9600, 14660, 9289, 14586, 8893, 14508, 8533, 15111, 12234, 15110, 12234, 15104, 12216, 15092, 12156, 15067, 12010, 15028, 11776, 14981, 11500, 14942, 11205, 14902, 10752, 14861, 10393, 14812, 9991, 14752, 9570, 14682, 9252, 14603, 8808, 14519, 8445, 14431, 8145, 15209, 11449, 15208, 11451, 15202, 11451, 15190, 11438, 15163, 11384, 15117, 11274, 15055, 10979, 14994, 10648, 14932, 10343, 14871, 9936, 14803, 9532, 14729, 9218, 14645, 8742, 14556, 8381, 14461, 8020, 14365, 7603, 15273, 10603, 15272, 10607, 15267, 10619, 15256, 10631, 15231, 10614, 15182, 10535, 15118, 10389, 15042, 10167, 14963, 9787, 14883, 9447, 14800, 9115, 14710, 8665, 14615, 8318, 14514, 7911, 14411, 7507, 14279, 7198, 15314, 9675, 15313, 9683, 15309, 9712, 15298, 9759, 15277, 9797, 15229, 9773, 15166, 9668, 15084, 9487, 14995, 9274, 14898, 8910, 14800, 8539, 14697, 8234, 14590, 7790, 14479, 7409, 14367, 7067, 14178, 6621, 15337, 8619, 15337, 8631, 15333, 8677, 15325, 8769, 15305, 8871, 15264, 8940, 15202, 8909, 15119, 8775, 15022, 8565, 14916, 8328, 14804, 8009, 14688, 7614, 14569, 7287, 14448, 6888, 14321, 6483, 14088, 6171, 15350, 7402, 15350, 7419, 15347, 7480, 15340, 7613, 15322, 7804, 15287, 7973, 15229, 8057, 15148, 8012, 15046, 7846, 14933, 7611, 14810, 7357, 14682, 7069, 14552, 6656, 14421, 6316, 14251, 5948, 14007, 5528, 15356, 5942, 15356, 5977, 15353, 6119, 15348, 6294, 15332, 6551, 15302, 6824, 15249, 7044, 15171, 7122, 15070, 7050, 14949, 6861, 14818, 6611, 14679, 6349, 14538, 6067, 14398, 5651, 14189, 5311, 13935, 4958, 15359, 4123, 15359, 4153, 15356, 4296, 15353, 4646, 15338, 5160, 15311, 5508, 15263, 5829, 15188, 6042, 15088, 6094, 14966, 6001, 14826, 5796, 14678, 5543, 14527, 5287, 14377, 4985, 14133, 4586, 13869, 4257, 15360, 1563, 15360, 1642, 15358, 2076, 15354, 2636, 15341, 3350, 15317, 4019, 15273, 4429, 15203, 4732, 15105, 4911, 14981, 4932, 14836, 4818, 14679, 4621, 14517, 4386, 14359, 4156, 14083, 3795, 13808, 3437, 15360, 122, 15360, 137, 15358, 285, 15355, 636, 15344, 1274, 15322, 2177, 15281, 2765, 15215, 3223, 15120, 3451, 14995, 3569, 14846, 3567, 14681, 3466, 14511, 3305, 14344, 3121, 14037, 2800, 13753, 2467, 15360, 0, 15360, 1, 15359, 21, 15355, 89, 15346, 253, 15325, 479, 15287, 796, 15225, 1148, 15133, 1492, 15008, 1749, 14856, 1882, 14685, 1886, 14506, 1783, 14324, 1608, 13996, 1398, 13702, 1183]), Mh = null; function Nh() { return Mh === null && (Mh = new kl(jh, 16, 16, Qi, zi), Mh.name = `DFG_LUT`, Mh.minFilter = ki, Mh.magFilter = ki, Mh.wrapS = wi, Mh.wrapT = wi, Mh.generateMipmaps = !1, Mh.needsUpdate = !0), Mh } var Ph = class { constructor(e = {}) { let { canvas: t = ao(), context: n = null, depth: r = !0, stencil: i = !1, alpha: a = !1, antialias: o = !1, premultipliedAlpha: s = !0, preserveDrawingBuffer: c = !1, powerPreference: l = `default`, failIfMajorPerformanceCaveat: u = !1, reversedDepthBuffer: d = !1, outputBufferType: f = Mi } = e; this.isWebGLRenderer = !0; let p; if (n !== null) { if (typeof WebGLRenderingContext < `u` && n instanceof WebGLRenderingContext) throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`); p = n.getContextAttributes().alpha } else p = a; let m = f, h = new Set([ea, $i, Zi]), g = new Set([Mi, Li, Fi, Hi, Bi, Vi]), _ = new Uint32Array(4), v = new Int32Array(4), y = new K, b = null, x = null, S = [], C = [], w = null; this.domElement = t, this.debug = { checkShaderErrors: !0, onShaderError: null }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.toneMapping = 0, this.toneMappingExposure = 1, this.transmissionResolutionScale = 1; let T = this, E = !1, D = null; this._outputColorSpace = Ya; let O = 0, k = 0, A = null, j = -1, M = null, N = new is, P = new is, F = null, I = new X(0), ee = 0, te = t.width, ne = t.height, L = 1, re = null, ie = null, ae = new is(0, 0, te, ne), oe = new is(0, 0, te, ne), se = !1, ce = new Yl, le = !1, ue = !1, de = new Y, fe = new K, pe = new is, me = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 }, he = !1; function ge() { return A === null ? L : 1 } let R = n; function _e(e, n) { return t.getContext(e, n) } try { let e = { alpha: !0, depth: r, stencil: i, antialias: o, premultipliedAlpha: s, preserveDrawingBuffer: c, powerPreference: l, failIfMajorPerformanceCaveat: u }; if (`setAttribute` in t && t.setAttribute(`data-engine`, `three.js r184`), t.addEventListener(`webglcontextlost`, Be, !1), t.addEventListener(`webglcontextrestored`, Ve, !1), t.addEventListener(`webglcontextcreationerror`, He, !1), R === null) { let t = `webgl2`; if (R = _e(t, e), R === null) throw _e(t) ? Error(`Error creating WebGL context with your selected attributes.`) : Error(`Error creating WebGL context.`) } } catch (e) { throw U(`WebGLRenderer: ` + e.message), e } let ve, ye, z, be, B, V, xe, Se, Ce, we, Te, Ee, De, Oe, ke, Ae, je, Me, Ne, Pe, Fe, Ie, Le; function Re() { ve = new Qf(R), ve.init(), Fe = new Sh(R, ve), ye = new Of(R, ve, e, Fe), z = new bh(R, ve), ye.reversedDepthBuffer && d && z.buffers.depth.setReversed(!0), be = new tp(R), B = new eh, V = new xh(R, ve, z, B, ye, Fe, be), xe = new Zf(T), Se = new bf(R), Ie = new Ef(R, Se), Ce = new $f(R, Se, be, Ie), we = new rp(R, Ce, Se, Ie, be), Me = new np(R, ye, V), ke = new kf(B), Te = new $m(T, xe, ve, ye, Ie, ke), Ee = new kh(T, B), De = new ih, Oe = new dh(ve), je = new Tf(T, xe, z, we, p, s), Ae = new yh(T, we, ye), Le = new Ah(R, be, ye, z), Ne = new Df(R, ve, be), Pe = new ep(R, ve, be), be.programs = Te.programs, T.capabilities = ye, T.extensions = ve, T.properties = B, T.renderLists = De, T.shadowMap = Ae, T.state = z, T.info = be } Re(), m !== 1009 && (w = new ap(m, t.width, t.height, r, i)); let ze = new Eh(T, R); this.xr = ze, this.getContext = function () { return R }, this.getContextAttributes = function () { return R.getContextAttributes() }, this.forceContextLoss = function () { let e = ve.get(`WEBGL_lose_context`); e && e.loseContext() }, this.forceContextRestore = function () { let e = ve.get(`WEBGL_lose_context`); e && e.restoreContext() }, this.getPixelRatio = function () { return L }, this.setPixelRatio = function (e) { e !== void 0 && (L = e, this.setSize(te, ne, !1)) }, this.getSize = function (e) { return e.set(te, ne) }, this.setSize = function (e, n, r = !0) { if (ze.isPresenting) { H(`WebGLRenderer: Can't change size while VR device is presenting.`); return } te = e, ne = n, t.width = Math.floor(e * L), t.height = Math.floor(n * L), r === !0 && (t.style.width = e + `px`, t.style.height = n + `px`), w !== null && w.setSize(t.width, t.height), this.setViewport(0, 0, e, n) }, this.getDrawingBufferSize = function (e) { return e.set(te * L, ne * L).floor() }, this.setDrawingBufferSize = function (e, n, r) { te = e, ne = n, L = r, t.width = Math.floor(e * r), t.height = Math.floor(n * r), this.setViewport(0, 0, e, n) }, this.setEffects = function (e) { if (m === 1009) { U(`THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`); return } if (e) { for (let t = 0; t < e.length; t++)if (e[t].isOutputPass === !0) { H(`THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`); break } } w.setEffects(e || []) }, this.getCurrentViewport = function (e) { return e.copy(N) }, this.getViewport = function (e) { return e.copy(ae) }, this.setViewport = function (e, t, n, r) { e.isVector4 ? ae.set(e.x, e.y, e.z, e.w) : ae.set(e, t, n, r), z.viewport(N.copy(ae).multiplyScalar(L).round()) }, this.getScissor = function (e) { return e.copy(oe) }, this.setScissor = function (e, t, n, r) { e.isVector4 ? oe.set(e.x, e.y, e.z, e.w) : oe.set(e, t, n, r), z.scissor(P.copy(oe).multiplyScalar(L).round()) }, this.getScissorTest = function () { return se }, this.setScissorTest = function (e) { z.setScissorTest(se = e) }, this.setOpaqueSort = function (e) { re = e }, this.setTransparentSort = function (e) { ie = e }, this.getClearColor = function (e) { return e.copy(je.getClearColor()) }, this.setClearColor = function () { je.setClearColor(...arguments) }, this.getClearAlpha = function () { return je.getClearAlpha() }, this.setClearAlpha = function () { je.setClearAlpha(...arguments) }, this.clear = function (e = !0, t = !0, n = !0) { let r = 0; if (e) { let e = !1; if (A !== null) { let t = A.texture.format; e = h.has(t) } if (e) { let e = A.texture.type, t = g.has(e), n = je.getClearColor(), r = je.getClearAlpha(), i = n.r, a = n.g, o = n.b; t ? (_[0] = i, _[1] = a, _[2] = o, _[3] = r, R.clearBufferuiv(R.COLOR, 0, _)) : (v[0] = i, v[1] = a, v[2] = o, v[3] = r, R.clearBufferiv(R.COLOR, 0, v)) } else r |= R.COLOR_BUFFER_BIT } t && (r |= R.DEPTH_BUFFER_BIT, this.state.buffers.depth.setMask(!0)), n && (r |= R.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), r !== 0 && R.clear(r) }, this.clearColor = function () { this.clear(!0, !1, !1) }, this.clearDepth = function () { this.clear(!1, !0, !1) }, this.clearStencil = function () { this.clear(!1, !1, !0) }, this.setNodesHandler = function (e) { e.setRenderer(this), D = e }, this.dispose = function () { t.removeEventListener(`webglcontextlost`, Be, !1), t.removeEventListener(`webglcontextrestored`, Ve, !1), t.removeEventListener(`webglcontextcreationerror`, He, !1), je.dispose(), De.dispose(), Oe.dispose(), B.dispose(), xe.dispose(), we.dispose(), Ie.dispose(), Le.dispose(), Te.dispose(), ze.dispose(), ze.removeEventListener(`sessionstart`, Ye), ze.removeEventListener(`sessionend`, Xe), Ze.stop() }; function Be(e) { e.preventDefault(), co(`WebGLRenderer: Context Lost.`), E = !0 } function Ve() { co(`WebGLRenderer: Context Restored.`), E = !1; let e = be.autoReset, t = Ae.enabled, n = Ae.autoUpdate, r = Ae.needsUpdate, i = Ae.type; Re(), be.autoReset = e, Ae.enabled = t, Ae.autoUpdate = n, Ae.needsUpdate = r, Ae.type = i } function He(e) { U(`WebGLRenderer: A WebGL context could not be created. Reason: `, e.statusMessage) } function Ue(e) { let t = e.target; t.removeEventListener(`dispose`, Ue), We(t) } function We(e) { Ge(e), B.remove(e) } function Ge(e) { let t = B.get(e).programs; t !== void 0 && (t.forEach(function (e) { Te.releaseProgram(e) }), e.isShaderMaterial && Te.releaseShaderCache(e)) } this.renderBufferDirect = function (e, t, n, r, i, a) { t === null && (t = me); let o = i.isMesh && i.matrixWorld.determinant() < 0, s = st(e, t, n, r, i); z.setMaterial(r, o); let c = n.index, l = 1; if (r.wireframe === !0) { if (c = Ce.getWireframeAttribute(n), c === void 0) return; l = 2 } let u = n.drawRange, d = n.attributes.position, f = u.start * l, p = (u.start + u.count) * l; a !== null && (f = Math.max(f, a.start * l), p = Math.min(p, (a.start + a.count) * l)), c === null ? d != null && (f = Math.max(f, 0), p = Math.min(p, d.count)) : (f = Math.max(f, 0), p = Math.min(p, c.count)); let m = p - f; if (m < 0 || m === 1 / 0) return; Ie.setup(i, r, s, n, c); let h, g = Ne; if (c !== null && (h = Se.get(c), g = Pe, g.setIndex(h)), i.isMesh) r.wireframe === !0 ? (z.setLineWidth(r.wireframeLinewidth * ge()), g.setMode(R.LINES)) : g.setMode(R.TRIANGLES); else if (i.isLine) { let e = r.linewidth; e === void 0 && (e = 1), z.setLineWidth(e * ge()), i.isLineSegments ? g.setMode(R.LINES) : i.isLineLoop ? g.setMode(R.LINE_LOOP) : g.setMode(R.LINE_STRIP) } else i.isPoints ? g.setMode(R.POINTS) : i.isSprite && g.setMode(R.TRIANGLES); if (i.isBatchedMesh) if (ve.get(`WEBGL_multi_draw`)) g.renderMultiDraw(i._multiDrawStarts, i._multiDrawCounts, i._multiDrawCount); else { let e = i._multiDrawStarts, t = i._multiDrawCounts, n = i._multiDrawCount, a = c ? Se.get(c).bytesPerElement : 1, o = B.get(r).currentProgram.getUniforms(); for (let r = 0; r < n; r++)o.setValue(R, `_gl_DrawID`, r), g.render(e[r] / a, t[r]) } else if (i.isInstancedMesh) g.renderInstances(f, m, i.count); else if (n.isInstancedBufferGeometry) { let e = n._maxInstanceCount === void 0 ? 1 / 0 : n._maxInstanceCount, t = Math.min(n.instanceCount, e); g.renderInstances(f, m, t) } else g.render(f, m) }; function Ke(e, t, n) { e.transparent === !0 && e.side === 2 && e.forceSinglePass === !1 ? (e.side = 1, e.needsUpdate = !0, rt(e, t, n), e.side = 0, e.needsUpdate = !0, rt(e, t, n), e.side = 2) : rt(e, t, n) } this.compile = function (e, t, n = null) { n === null && (n = e), x = Oe.get(n), x.init(t), C.push(x), n.traverseVisible(function (e) { e.isLight && e.layers.test(t.layers) && (x.pushLight(e), e.castShadow && x.pushShadow(e)) }), e !== n && e.traverseVisible(function (e) { e.isLight && e.layers.test(t.layers) && (x.pushLight(e), e.castShadow && x.pushShadow(e)) }), x.setupLights(); let r = new Set; return e.traverse(function (e) { if (!(e.isMesh || e.isPoints || e.isLine || e.isSprite)) return; let t = e.material; if (t) if (Array.isArray(t)) for (let i = 0; i < t.length; i++) { let a = t[i]; Ke(a, n, e), r.add(a) } else Ke(t, n, e), r.add(t) }), x = C.pop(), r }, this.compileAsync = function (e, t, n = null) { let r = this.compile(e, t, n); return new Promise(t => { function n() { if (r.forEach(function (e) { B.get(e).currentProgram.isReady() && r.delete(e) }), r.size === 0) { t(e); return } setTimeout(n, 10) } ve.get(`KHR_parallel_shader_compile`) === null ? setTimeout(n, 10) : n() }) }; let qe = null; function Je(e) { qe && qe(e) } function Ye() { Ze.stop() } function Xe() { Ze.start() } let Ze = new yf; Ze.setAnimationLoop(Je), typeof self < `u` && Ze.setContext(self), this.setAnimationLoop = function (e) { qe = e, ze.setAnimationLoop(e), e === null ? Ze.stop() : Ze.start() }, ze.addEventListener(`sessionstart`, Ye), ze.addEventListener(`sessionend`, Xe), this.render = function (e, t) { if (t !== void 0 && t.isCamera !== !0) { U(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`); return } if (E === !0) return; D !== null && D.renderStart(e, t); let n = ze.enabled === !0 && ze.isPresenting === !0, r = w !== null && (A === null || n) && w.begin(T, A); if (e.matrixWorldAutoUpdate === !0 && e.updateMatrixWorld(), t.parent === null && t.matrixWorldAutoUpdate === !0 && t.updateMatrixWorld(), ze.enabled === !0 && ze.isPresenting === !0 && (w === null || w.isCompositing() === !1) && (ze.cameraAutoUpdate === !0 && ze.updateCamera(t), t = ze.getCamera()), e.isScene === !0 && e.onBeforeRender(T, e, t, A), x = Oe.get(e, C.length), x.init(t), x.state.textureUnits = V.getTextureUnits(), C.push(x), de.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), ce.setFromProjectionMatrix(de, to, t.reversedDepth), ue = this.localClippingEnabled, le = ke.init(this.clippingPlanes, ue), b = De.get(e, S.length), b.init(), S.push(b), ze.enabled === !0 && ze.isPresenting === !0) { let e = T.xr.getDepthSensingMesh(); e !== null && Qe(e, t, -1 / 0, T.sortObjects) } Qe(e, t, 0, T.sortObjects), b.finish(), T.sortObjects === !0 && b.sort(re, ie), he = ze.enabled === !1 || ze.isPresenting === !1 || ze.hasDepthSensing() === !1, he && je.addToRenderList(b, e), this.info.render.frame++, le === !0 && ke.beginShadows(); let i = x.state.shadowsArray; if (Ae.render(i, e, t), le === !0 && ke.endShadows(), this.info.autoReset === !0 && this.info.reset(), (r && w.hasRenderPass()) === !1) { let n = b.opaque, r = b.transmissive; if (x.setupLights(), t.isArrayCamera) { let i = t.cameras; if (r.length > 0) for (let t = 0, a = i.length; t < a; t++) { let a = i[t]; et(n, r, e, a) } he && je.render(e); for (let t = 0, n = i.length; t < n; t++) { let n = i[t]; $e(b, e, n, n.viewport) } } else r.length > 0 && et(n, r, e, t), he && je.render(e), $e(b, e, t) } A !== null && k === 0 && (V.updateMultisampleRenderTarget(A), V.updateRenderTargetMipmap(A)), r && w.end(T), e.isScene === !0 && e.onAfterRender(T, e, t), Ie.resetDefaultState(), j = -1, M = null, C.pop(), C.length > 0 ? (x = C[C.length - 1], V.setTextureUnits(x.state.textureUnits), le === !0 && ke.setGlobalState(T.clippingPlanes, x.state.camera)) : x = null, S.pop(), b = S.length > 0 ? S[S.length - 1] : null, D !== null && D.renderEnd() }; function Qe(e, t, n, r) { if (e.visible === !1) return; if (e.layers.test(t.layers)) { if (e.isGroup) n = e.renderOrder; else if (e.isLOD) e.autoUpdate === !0 && e.update(t); else if (e.isLightProbeGrid) x.pushLightProbeGrid(e); else if (e.isLight) x.pushLight(e), e.castShadow && x.pushShadow(e); else if (e.isSprite) { if (!e.frustumCulled || ce.intersectsSprite(e)) { r && pe.setFromMatrixPosition(e.matrixWorld).applyMatrix4(de); let t = we.update(e), i = e.material; i.visible && b.push(e, t, i, n, pe.z, null) } } else if ((e.isMesh || e.isLine || e.isPoints) && (!e.frustumCulled || ce.intersectsObject(e))) { let t = we.update(e), i = e.material; if (r && (e.boundingSphere === void 0 ? (t.boundingSphere === null && t.computeBoundingSphere(), pe.copy(t.boundingSphere.center)) : (e.boundingSphere === null && e.computeBoundingSphere(), pe.copy(e.boundingSphere.center)), pe.applyMatrix4(e.matrixWorld).applyMatrix4(de)), Array.isArray(i)) { let r = t.groups; for (let a = 0, o = r.length; a < o; a++) { let o = r[a], s = i[o.materialIndex]; s && s.visible && b.push(e, t, s, n, pe.z, o) } } else i.visible && b.push(e, t, i, n, pe.z, null) } } let i = e.children; for (let e = 0, a = i.length; e < a; e++)Qe(i[e], t, n, r) } function $e(e, t, n, r) { let { opaque: i, transmissive: a, transparent: o } = e; x.setupLightsView(n), le === !0 && ke.setGlobalState(T.clippingPlanes, n), r && z.viewport(N.copy(r)), i.length > 0 && tt(i, t, n), a.length > 0 && tt(a, t, n), o.length > 0 && tt(o, t, n), z.buffers.depth.setTest(!0), z.buffers.depth.setMask(!0), z.buffers.color.setMask(!0), z.setPolygonOffset(!1) } function et(e, t, n, r) { if ((n.isScene === !0 ? n.overrideMaterial : null) !== null) return; if (x.state.transmissionRenderTarget[r.id] === void 0) { let e = ve.has(`EXT_color_buffer_half_float`) || ve.has(`EXT_color_buffer_float`); x.state.transmissionRenderTarget[r.id] = new os(1, 1, { generateMipmaps: !0, type: e ? zi : Mi, minFilter: ji, samples: Math.max(4, ye.samples), stencilBuffer: i, resolveDepthBuffer: !1, resolveStencilBuffer: !1, colorSpace: J.workingColorSpace }) } let a = x.state.transmissionRenderTarget[r.id], o = r.viewport || N; a.setSize(o.z * T.transmissionResolutionScale, o.w * T.transmissionResolutionScale); let s = T.getRenderTarget(), c = T.getActiveCubeFace(), l = T.getActiveMipmapLevel(); T.setRenderTarget(a), T.getClearColor(I), ee = T.getClearAlpha(), ee < 1 && T.setClearColor(16777215, .5), T.clear(), he && je.render(n); let u = T.toneMapping; T.toneMapping = 0; let d = r.viewport; if (r.viewport !== void 0 && (r.viewport = void 0), x.setupLightsView(r), le === !0 && ke.setGlobalState(T.clippingPlanes, r), tt(e, n, r), V.updateMultisampleRenderTarget(a), V.updateRenderTargetMipmap(a), ve.has(`WEBGL_multisampled_render_to_texture`) === !1) { let e = !1; for (let i = 0, a = t.length; i < a; i++) { let { object: a, geometry: o, material: s, group: c } = t[i]; if (s.side === 2 && a.layers.test(r.layers)) { let t = s.side; s.side = 1, s.needsUpdate = !0, nt(a, n, r, o, s, c), s.side = t, s.needsUpdate = !0, e = !0 } } e === !0 && (V.updateMultisampleRenderTarget(a), V.updateRenderTargetMipmap(a)) } T.setRenderTarget(s, c, l), T.setClearColor(I, ee), d !== void 0 && (r.viewport = d), T.toneMapping = u } function tt(e, t, n) { let r = t.isScene === !0 ? t.overrideMaterial : null; for (let i = 0, a = e.length; i < a; i++) { let a = e[i], { object: o, geometry: s, group: c } = a, l = a.material; l.allowOverride === !0 && r !== null && (l = r), o.layers.test(n.layers) && nt(o, t, n, s, l, c) } } function nt(e, t, n, r, i, a) { e.onBeforeRender(T, t, n, r, i, a), e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse, e.matrixWorld), e.normalMatrix.getNormalMatrix(e.modelViewMatrix), i.onBeforeRender(T, t, n, r, e, a), i.transparent === !0 && i.side === 2 && i.forceSinglePass === !1 ? (i.side = 1, i.needsUpdate = !0, T.renderBufferDirect(n, t, r, i, e, a), i.side = 0, i.needsUpdate = !0, T.renderBufferDirect(n, t, r, i, e, a), i.side = 2) : T.renderBufferDirect(n, t, r, i, e, a), e.onAfterRender(T, t, n, r, i, a) } function rt(e, t, n) { t.isScene !== !0 && (t = me); let r = B.get(e), i = x.state.lights, a = x.state.shadowsArray, o = i.state.version, s = Te.getParameters(e, i.state, a, t, n, x.state.lightProbeGridArray), c = Te.getProgramCacheKey(s), l = r.programs; r.environment = e.isMeshStandardMaterial || e.isMeshLambertMaterial || e.isMeshPhongMaterial ? t.environment : null, r.fog = t.fog; let u = e.isMeshStandardMaterial || e.isMeshLambertMaterial && !e.envMap || e.isMeshPhongMaterial && !e.envMap; r.envMap = xe.get(e.envMap || r.environment, u), r.envMapRotation = r.environment !== null && e.envMap === null ? t.environmentRotation : e.envMapRotation, l === void 0 && (e.addEventListener(`dispose`, Ue), l = new Map, r.programs = l); let d = l.get(c); if (d !== void 0) { if (r.currentProgram === d && r.lightsStateVersion === o) return at(e, s), d } else s.uniforms = Te.getUniforms(e), D !== null && e.isNodeMaterial && D.build(e, n, s), e.onBeforeCompile(s, T), d = Te.acquireProgram(s, c), l.set(c, d), r.uniforms = s.uniforms; let f = r.uniforms; return (!e.isShaderMaterial && !e.isRawShaderMaterial || e.clipping === !0) && (f.clippingPlanes = ke.uniform), at(e, s), r.needsLights = lt(e), r.lightsStateVersion = o, r.needsLights && (f.ambientLightColor.value = i.state.ambient, f.lightProbe.value = i.state.probe, f.directionalLights.value = i.state.directional, f.directionalLightShadows.value = i.state.directionalShadow, f.spotLights.value = i.state.spot, f.spotLightShadows.value = i.state.spotShadow, f.rectAreaLights.value = i.state.rectArea, f.ltc_1.value = i.state.rectAreaLTC1, f.ltc_2.value = i.state.rectAreaLTC2, f.pointLights.value = i.state.point, f.pointLightShadows.value = i.state.pointShadow, f.hemisphereLights.value = i.state.hemi, f.directionalShadowMatrix.value = i.state.directionalShadowMatrix, f.spotLightMatrix.value = i.state.spotLightMatrix, f.spotLightMap.value = i.state.spotLightMap, f.pointShadowMatrix.value = i.state.pointShadowMatrix), r.lightProbeGrid = x.state.lightProbeGridArray.length > 0, r.currentProgram = d, r.uniformsList = null, d } function it(e) { if (e.uniformsList === null) { let t = e.currentProgram.getUniforms(); e.uniformsList = fm.seqWithValue(t.seq, e.uniforms) } return e.uniformsList } function at(e, t) { let n = B.get(e); n.outputColorSpace = t.outputColorSpace, n.batching = t.batching, n.batchingColor = t.batchingColor, n.instancing = t.instancing, n.instancingColor = t.instancingColor, n.instancingMorph = t.instancingMorph, n.skinning = t.skinning, n.morphTargets = t.morphTargets, n.morphNormals = t.morphNormals, n.morphColors = t.morphColors, n.morphTargetsCount = t.morphTargetsCount, n.numClippingPlanes = t.numClippingPlanes, n.numIntersection = t.numClipIntersection, n.vertexAlphas = t.vertexAlphas, n.vertexTangents = t.vertexTangents, n.toneMapping = t.toneMapping } function ot(e, t) { if (e.length === 0) return null; if (e.length === 1) return e[0].texture === null ? null : e[0]; y.setFromMatrixPosition(t.matrixWorld); for (let t = 0, n = e.length; t < n; t++) { let n = e[t]; if (n.texture !== null && n.boundingBox.containsPoint(y)) return n } return null } function st(e, t, n, r, i) { t.isScene !== !0 && (t = me), V.resetTextureUnits(); let a = t.fog, o = r.isMeshStandardMaterial || r.isMeshLambertMaterial || r.isMeshPhongMaterial ? t.environment : null, s = A === null ? T.outputColorSpace : A.isXRRenderTarget === !0 ? A.texture.colorSpace : J.workingColorSpace, c = r.isMeshStandardMaterial || r.isMeshLambertMaterial && !r.envMap || r.isMeshPhongMaterial && !r.envMap, l = xe.get(r.envMap || o, c), u = r.vertexColors === !0 && !!n.attributes.color && n.attributes.color.itemSize === 4, d = !!n.attributes.tangent && (!!r.normalMap || r.anisotropy > 0), f = !!n.morphAttributes.position, p = !!n.morphAttributes.normal, m = !!n.morphAttributes.color, h = 0; r.toneMapped && (A === null || A.isXRRenderTarget === !0) && (h = T.toneMapping); let g = n.morphAttributes.position || n.morphAttributes.normal || n.morphAttributes.color, _ = g === void 0 ? 0 : g.length, v = B.get(r), y = x.state.lights; if (le === !0 && (ue === !0 || e !== M)) { let t = e === M && r.id === j; ke.setState(r, e, t) } let b = !1; r.version === v.__version ? v.needsLights && v.lightsStateVersion !== y.state.version ? b = !0 : v.outputColorSpace === s ? i.isBatchedMesh && v.batching === !1 || !i.isBatchedMesh && v.batching === !0 || i.isBatchedMesh && v.batchingColor === !0 && i.colorTexture === null || i.isBatchedMesh && v.batchingColor === !1 && i.colorTexture !== null || i.isInstancedMesh && v.instancing === !1 || !i.isInstancedMesh && v.instancing === !0 || i.isSkinnedMesh && v.skinning === !1 || !i.isSkinnedMesh && v.skinning === !0 || i.isInstancedMesh && v.instancingColor === !0 && i.instanceColor === null || i.isInstancedMesh && v.instancingColor === !1 && i.instanceColor !== null || i.isInstancedMesh && v.instancingMorph === !0 && i.morphTexture === null || i.isInstancedMesh && v.instancingMorph === !1 && i.morphTexture !== null ? b = !0 : v.envMap === l ? r.fog === !0 && v.fog !== a || v.numClippingPlanes !== void 0 && (v.numClippingPlanes !== ke.numPlanes || v.numIntersection !== ke.numIntersection) ? b = !0 : v.vertexAlphas === u && v.vertexTangents === d && v.morphTargets === f && v.morphNormals === p && v.morphColors === m && v.toneMapping === h && v.morphTargetsCount === _ ? !!v.lightProbeGrid != x.state.lightProbeGridArray.length > 0 && (b = !0) : b = !0 : b = !0 : b = !0 : (b = !0, v.__version = r.version); let S = v.currentProgram; b === !0 && (S = rt(r, t, i), D && r.isNodeMaterial && D.onUpdateProgram(r, S, v)); let C = !1, w = !1, E = !1, O = S.getUniforms(), k = v.uniforms; if (z.useProgram(S.program) && (C = !0, w = !0, E = !0), r.id !== j && (j = r.id, w = !0), v.needsLights) { let e = ot(x.state.lightProbeGridArray, i); v.lightProbeGrid !== e && (v.lightProbeGrid = e, w = !0) } if (C || M !== e) { z.buffers.depth.getReversed() && e.reversedDepth !== !0 && (e._reversedDepth = !0, e.updateProjectionMatrix()), O.setValue(R, `projectionMatrix`, e.projectionMatrix), O.setValue(R, `viewMatrix`, e.matrixWorldInverse); let t = O.map.cameraPosition; t !== void 0 && t.setValue(R, fe.setFromMatrixPosition(e.matrixWorld)), ye.logarithmicDepthBuffer && O.setValue(R, `logDepthBufFC`, 2 / (Math.log(e.far + 1) / Math.LN2)), (r.isMeshPhongMaterial || r.isMeshToonMaterial || r.isMeshLambertMaterial || r.isMeshBasicMaterial || r.isMeshStandardMaterial || r.isShaderMaterial) && O.setValue(R, `isOrthographic`, e.isOrthographicCamera === !0), M !== e && (M = e, w = !0, E = !0) } if (v.needsLights && (y.state.directionalShadowMap.length > 0 && O.setValue(R, `directionalShadowMap`, y.state.directionalShadowMap, V), y.state.spotShadowMap.length > 0 && O.setValue(R, `spotShadowMap`, y.state.spotShadowMap, V), y.state.pointShadowMap.length > 0 && O.setValue(R, `pointShadowMap`, y.state.pointShadowMap, V)), i.isSkinnedMesh) { O.setOptional(R, i, `bindMatrix`), O.setOptional(R, i, `bindMatrixInverse`); let e = i.skeleton; e && (e.boneTexture === null && e.computeBoneTexture(), O.setValue(R, `boneTexture`, e.boneTexture, V)) } i.isBatchedMesh && (O.setOptional(R, i, `batchingTexture`), O.setValue(R, `batchingTexture`, i._matricesTexture, V), O.setOptional(R, i, `batchingIdTexture`), O.setValue(R, `batchingIdTexture`, i._indirectTexture, V), O.setOptional(R, i, `batchingColorTexture`), i._colorsTexture !== null && O.setValue(R, `batchingColorTexture`, i._colorsTexture, V)); let N = n.morphAttributes; if ((N.position !== void 0 || N.normal !== void 0 || N.color !== void 0) && Me.update(i, n, S), (w || v.receiveShadow !== i.receiveShadow) && (v.receiveShadow = i.receiveShadow, O.setValue(R, `receiveShadow`, i.receiveShadow)), (r.isMeshStandardMaterial || r.isMeshLambertMaterial || r.isMeshPhongMaterial) && r.envMap === null && t.environment !== null && (k.envMapIntensity.value = t.environmentIntensity), k.dfgLUT !== void 0 && (k.dfgLUT.value = Nh()), w) { if (O.setValue(R, `toneMappingExposure`, T.toneMappingExposure), v.needsLights && ct(k, E), a && r.fog === !0 && Ee.refreshFogUniforms(k, a), Ee.refreshMaterialUniforms(k, r, L, ne, x.state.transmissionRenderTarget[e.id]), v.needsLights && v.lightProbeGrid) { let e = v.lightProbeGrid; k.probesSH.value = e.texture, k.probesMin.value.copy(e.boundingBox.min), k.probesMax.value.copy(e.boundingBox.max), k.probesResolution.value.copy(e.resolution) } fm.upload(R, it(v), k, V) } if (r.isShaderMaterial && r.uniformsNeedUpdate === !0 && (fm.upload(R, it(v), k, V), r.uniformsNeedUpdate = !1), r.isSpriteMaterial && O.setValue(R, `center`, i.center), O.setValue(R, `modelViewMatrix`, i.modelViewMatrix), O.setValue(R, `normalMatrix`, i.normalMatrix), O.setValue(R, `modelMatrix`, i.matrixWorld), r.uniformsGroups !== void 0) { let e = r.uniformsGroups; for (let t = 0, n = e.length; t < n; t++) { let n = e[t]; Le.update(n, S), Le.bind(n, S) } } return S } function ct(e, t) { e.ambientLightColor.needsUpdate = t, e.lightProbe.needsUpdate = t, e.directionalLights.needsUpdate = t, e.directionalLightShadows.needsUpdate = t, e.pointLights.needsUpdate = t, e.pointLightShadows.needsUpdate = t, e.spotLights.needsUpdate = t, e.spotLightShadows.needsUpdate = t, e.rectAreaLights.needsUpdate = t, e.hemisphereLights.needsUpdate = t } function lt(e) { return e.isMeshLambertMaterial || e.isMeshToonMaterial || e.isMeshPhongMaterial || e.isMeshStandardMaterial || e.isShadowMaterial || e.isShaderMaterial && e.lights === !0 } this.getActiveCubeFace = function () { return O }, this.getActiveMipmapLevel = function () { return k }, this.getRenderTarget = function () { return A }, this.setRenderTargetTextures = function (e, t, n) { let r = B.get(e); r.__autoAllocateDepthBuffer = e.resolveDepthBuffer === !1, r.__autoAllocateDepthBuffer === !1 && (r.__useRenderToTexture = !1), B.get(e.texture).__webglTexture = t, B.get(e.depthTexture).__webglTexture = r.__autoAllocateDepthBuffer ? void 0 : n, r.__hasExternalTextures = !0 }, this.setRenderTargetFramebuffer = function (e, t) { let n = B.get(e); n.__webglFramebuffer = t, n.__useDefaultFramebuffer = t === void 0 }; let ut = R.createFramebuffer(); this.setRenderTarget = function (e, t = 0, n = 0) { A = e, O = t, k = n; let r = null, i = !1, a = !1; if (e) { let o = B.get(e); if (o.__useDefaultFramebuffer !== void 0) { z.bindFramebuffer(R.FRAMEBUFFER, o.__webglFramebuffer), N.copy(e.viewport), P.copy(e.scissor), F = e.scissorTest, z.viewport(N), z.scissor(P), z.setScissorTest(F), j = -1; return } else if (o.__webglFramebuffer === void 0) V.setupRenderTarget(e); else if (o.__hasExternalTextures) V.rebindTextures(e, B.get(e.texture).__webglTexture, B.get(e.depthTexture).__webglTexture); else if (e.depthBuffer) { let t = e.depthTexture; if (o.__boundDepthTexture !== t) { if (t !== null && B.has(t) && (e.width !== t.image.width || e.height !== t.image.height)) throw Error(`WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.`); V.setupDepthRenderbuffer(e) } } let s = e.texture; (s.isData3DTexture || s.isDataArrayTexture || s.isCompressedArrayTexture) && (a = !0); let c = B.get(e).__webglFramebuffer; e.isWebGLCubeRenderTarget ? (r = Array.isArray(c[t]) ? c[t][n] : c[t], i = !0) : r = e.samples > 0 && V.useMultisampledRTT(e) === !1 ? B.get(e).__webglMultisampledFramebuffer : Array.isArray(c) ? c[n] : c, N.copy(e.viewport), P.copy(e.scissor), F = e.scissorTest } else N.copy(ae).multiplyScalar(L).floor(), P.copy(oe).multiplyScalar(L).floor(), F = se; if (n !== 0 && (r = ut), z.bindFramebuffer(R.FRAMEBUFFER, r) && z.drawBuffers(e, r), z.viewport(N), z.scissor(P), z.setScissorTest(F), i) { let r = B.get(e.texture); R.framebufferTexture2D(R.FRAMEBUFFER, R.COLOR_ATTACHMENT0, R.TEXTURE_CUBE_MAP_POSITIVE_X + t, r.__webglTexture, n) } else if (a) { let r = t; for (let t = 0; t < e.textures.length; t++) { let i = B.get(e.textures[t]); R.framebufferTextureLayer(R.FRAMEBUFFER, R.COLOR_ATTACHMENT0 + t, i.__webglTexture, n, r) } } else if (e !== null && n !== 0) { let t = B.get(e.texture); R.framebufferTexture2D(R.FRAMEBUFFER, R.COLOR_ATTACHMENT0, R.TEXTURE_2D, t.__webglTexture, n) } j = -1 }, this.readRenderTargetPixels = function (e, t, n, r, i, a, o, s = 0) { if (!(e && e.isWebGLRenderTarget)) { U(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`); return } let c = B.get(e).__webglFramebuffer; if (e.isWebGLCubeRenderTarget && o !== void 0 && (c = c[o]), c) { z.bindFramebuffer(R.FRAMEBUFFER, c); try { let o = e.textures[s], c = o.format, l = o.type; if (e.textures.length > 1 && R.readBuffer(R.COLOR_ATTACHMENT0 + s), !ye.textureFormatReadable(c)) { U(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`); return } if (!ye.textureTypeReadable(l)) { U(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`); return } t >= 0 && t <= e.width - r && n >= 0 && n <= e.height - i && R.readPixels(t, n, r, i, Fe.convert(c), Fe.convert(l), a) } finally { let e = A === null ? null : B.get(A).__webglFramebuffer; z.bindFramebuffer(R.FRAMEBUFFER, e) } } }, this.readRenderTargetPixelsAsync = async function (e, t, n, r, i, a, o, s = 0) { if (!(e && e.isWebGLRenderTarget)) throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`); let c = B.get(e).__webglFramebuffer; if (e.isWebGLCubeRenderTarget && o !== void 0 && (c = c[o]), c) if (t >= 0 && t <= e.width - r && n >= 0 && n <= e.height - i) { z.bindFramebuffer(R.FRAMEBUFFER, c); let o = e.textures[s], l = o.format, u = o.type; if (e.textures.length > 1 && R.readBuffer(R.COLOR_ATTACHMENT0 + s), !ye.textureFormatReadable(l)) throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`); if (!ye.textureTypeReadable(u)) throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`); let d = R.createBuffer(); R.bindBuffer(R.PIXEL_PACK_BUFFER, d), R.bufferData(R.PIXEL_PACK_BUFFER, a.byteLength, R.STREAM_READ), R.readPixels(t, n, r, i, Fe.convert(l), Fe.convert(u), 0); let f = A === null ? null : B.get(A).__webglFramebuffer; z.bindFramebuffer(R.FRAMEBUFFER, f); let p = R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE, 0); return R.flush(), await fo(R, p, 4), R.bindBuffer(R.PIXEL_PACK_BUFFER, d), R.getBufferSubData(R.PIXEL_PACK_BUFFER, 0, a), R.deleteBuffer(d), R.deleteSync(p), a } else throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`) }, this.copyFramebufferToTexture = function (e, t = null, n = 0) { let r = 2 ** -n, i = Math.floor(e.image.width * r), a = Math.floor(e.image.height * r), o = t === null ? 0 : t.x, s = t === null ? 0 : t.y; V.setTexture2D(e, 0), R.copyTexSubImage2D(R.TEXTURE_2D, n, 0, 0, o, s, i, a), z.unbindTexture() }; let dt = R.createFramebuffer(), ft = R.createFramebuffer(); this.copyTextureToTexture = function (e, t, n = null, r = null, i = 0, a = 0) { let o, s, c, l, u, d, f, p, m, h = e.isCompressedTexture ? e.mipmaps[a] : e.image; if (n !== null) o = n.max.x - n.min.x, s = n.max.y - n.min.y, c = n.isBox3 ? n.max.z - n.min.z : 1, l = n.min.x, u = n.min.y, d = n.isBox3 ? n.min.z : 0; else { let t = 2 ** -i; o = Math.floor(h.width * t), s = Math.floor(h.height * t), c = e.isDataArrayTexture ? h.depth : e.isData3DTexture ? Math.floor(h.depth * t) : 1, l = 0, u = 0, d = 0 } r === null ? (f = 0, p = 0, m = 0) : (f = r.x, p = r.y, m = r.z); let g = Fe.convert(t.format), _ = Fe.convert(t.type), v; t.isData3DTexture ? (V.setTexture3D(t, 0), v = R.TEXTURE_3D) : t.isDataArrayTexture || t.isCompressedArrayTexture ? (V.setTexture2DArray(t, 0), v = R.TEXTURE_2D_ARRAY) : (V.setTexture2D(t, 0), v = R.TEXTURE_2D), z.activeTexture(R.TEXTURE0), z.pixelStorei(R.UNPACK_FLIP_Y_WEBGL, t.flipY), z.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL, t.premultiplyAlpha), z.pixelStorei(R.UNPACK_ALIGNMENT, t.unpackAlignment); let y = z.getParameter(R.UNPACK_ROW_LENGTH), b = z.getParameter(R.UNPACK_IMAGE_HEIGHT), x = z.getParameter(R.UNPACK_SKIP_PIXELS), S = z.getParameter(R.UNPACK_SKIP_ROWS), C = z.getParameter(R.UNPACK_SKIP_IMAGES); z.pixelStorei(R.UNPACK_ROW_LENGTH, h.width), z.pixelStorei(R.UNPACK_IMAGE_HEIGHT, h.height), z.pixelStorei(R.UNPACK_SKIP_PIXELS, l), z.pixelStorei(R.UNPACK_SKIP_ROWS, u), z.pixelStorei(R.UNPACK_SKIP_IMAGES, d); let w = e.isDataArrayTexture || e.isData3DTexture, T = t.isDataArrayTexture || t.isData3DTexture; if (e.isDepthTexture) { let n = B.get(e), r = B.get(t), h = B.get(n.__renderTarget), g = B.get(r.__renderTarget); z.bindFramebuffer(R.READ_FRAMEBUFFER, h.__webglFramebuffer), z.bindFramebuffer(R.DRAW_FRAMEBUFFER, g.__webglFramebuffer); for (let n = 0; n < c; n++)w && (R.framebufferTextureLayer(R.READ_FRAMEBUFFER, R.COLOR_ATTACHMENT0, B.get(e).__webglTexture, i, d + n), R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER, R.COLOR_ATTACHMENT0, B.get(t).__webglTexture, a, m + n)), R.blitFramebuffer(l, u, o, s, f, p, o, s, R.DEPTH_BUFFER_BIT, R.NEAREST); z.bindFramebuffer(R.READ_FRAMEBUFFER, null), z.bindFramebuffer(R.DRAW_FRAMEBUFFER, null) } else if (i !== 0 || e.isRenderTargetTexture || B.has(e)) { let n = B.get(e), r = B.get(t); z.bindFramebuffer(R.READ_FRAMEBUFFER, dt), z.bindFramebuffer(R.DRAW_FRAMEBUFFER, ft); for (let e = 0; e < c; e++)w ? R.framebufferTextureLayer(R.READ_FRAMEBUFFER, R.COLOR_ATTACHMENT0, n.__webglTexture, i, d + e) : R.framebufferTexture2D(R.READ_FRAMEBUFFER, R.COLOR_ATTACHMENT0, R.TEXTURE_2D, n.__webglTexture, i), T ? R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER, R.COLOR_ATTACHMENT0, r.__webglTexture, a, m + e) : R.framebufferTexture2D(R.DRAW_FRAMEBUFFER, R.COLOR_ATTACHMENT0, R.TEXTURE_2D, r.__webglTexture, a), i === 0 ? T ? R.copyTexSubImage3D(v, a, f, p, m + e, l, u, o, s) : R.copyTexSubImage2D(v, a, f, p, l, u, o, s) : R.blitFramebuffer(l, u, o, s, f, p, o, s, R.COLOR_BUFFER_BIT, R.NEAREST); z.bindFramebuffer(R.READ_FRAMEBUFFER, null), z.bindFramebuffer(R.DRAW_FRAMEBUFFER, null) } else T ? e.isDataTexture || e.isData3DTexture ? R.texSubImage3D(v, a, f, p, m, o, s, c, g, _, h.data) : t.isCompressedArrayTexture ? R.compressedTexSubImage3D(v, a, f, p, m, o, s, c, g, h.data) : R.texSubImage3D(v, a, f, p, m, o, s, c, g, _, h) : e.isDataTexture ? R.texSubImage2D(R.TEXTURE_2D, a, f, p, o, s, g, _, h.data) : e.isCompressedTexture ? R.compressedTexSubImage2D(R.TEXTURE_2D, a, f, p, h.width, h.height, g, h.data) : R.texSubImage2D(R.TEXTURE_2D, a, f, p, o, s, g, _, h); z.pixelStorei(R.UNPACK_ROW_LENGTH, y), z.pixelStorei(R.UNPACK_IMAGE_HEIGHT, b), z.pixelStorei(R.UNPACK_SKIP_PIXELS, x), z.pixelStorei(R.UNPACK_SKIP_ROWS, S), z.pixelStorei(R.UNPACK_SKIP_IMAGES, C), a === 0 && t.generateMipmaps && R.generateMipmap(v), z.unbindTexture() }, this.initRenderTarget = function (e) { B.get(e).__webglFramebuffer === void 0 && V.setupRenderTarget(e) }, this.initTexture = function (e) { e.isCubeTexture ? V.setTextureCube(e, 0) : e.isData3DTexture ? V.setTexture3D(e, 0) : e.isDataArrayTexture || e.isCompressedArrayTexture ? V.setTexture2DArray(e, 0) : V.setTexture2D(e, 0), z.unbindTexture() }, this.resetState = function () { O = 0, k = 0, A = null, z.reset(), Ie.reset() }, typeof __THREE_DEVTOOLS__ < `u` && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`, { detail: this })) } get coordinateSystem() { return to } get outputColorSpace() { return this._outputColorSpace } set outputColorSpace(e) { this._outputColorSpace = e; let t = this.getContext(); t.drawingBufferColorSpace = J._getDrawingBufferColorSpace(e), t.unpackColorSpace = J._getUnpackColorSpace() } }; function Fh(e, t) { if (t === 0) return console.warn(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles.`), e; if (t === 2 || t === 1) { let n = e.getIndex(); if (n === null) { let t = [], r = e.getAttribute(`position`); if (r !== void 0) { for (let e = 0; e < r.count; e++)t.push(e); e.setIndex(t), n = e.getIndex() } else return console.error(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible.`), e } let r = n.count - 2, i = []; if (t === 2) for (let e = 1; e <= r; e++)i.push(n.getX(0)), i.push(n.getX(e)), i.push(n.getX(e + 1)); else for (let e = 0; e < r; e++)e % 2 == 0 ? (i.push(n.getX(e)), i.push(n.getX(e + 1)), i.push(n.getX(e + 2))) : (i.push(n.getX(e + 2)), i.push(n.getX(e + 1)), i.push(n.getX(e))); i.length / 3 !== r && console.error(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.`); let a = e.clone(); return a.setIndex(i), a.clearGroups(), a } else return console.error(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:`, t), e } function Ih(e) { let t = new Map, n = new Map, r = e.clone(); return Lh(e, r, function (e, r) { t.set(r, e), n.set(e, r) }), r.traverse(function (e) { if (!e.isSkinnedMesh) return; let r = e, i = t.get(e), a = i.skeleton.bones; r.skeleton = i.skeleton.clone(), r.bindMatrix.copy(i.bindMatrix), r.skeleton.bones = a.map(function (e) { return n.get(e) }), r.bind(r.skeleton, r.bindMatrix) }), r } function Lh(e, t, n) { n(e, t); for (let r = 0; r < e.children.length; r++)Lh(e.children[r], t.children[r], n) } var Rh = class extends cd { constructor(e) { super(e), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function (e) { return new Wh(e) }), this.register(function (e) { return new Gh(e) }), this.register(function (e) { return new eg(e) }), this.register(function (e) { return new tg(e) }), this.register(function (e) { return new ng(e) }), this.register(function (e) { return new qh(e) }), this.register(function (e) { return new Jh(e) }), this.register(function (e) { return new Yh(e) }), this.register(function (e) { return new Xh(e) }), this.register(function (e) { return new Uh(e) }), this.register(function (e) { return new Zh(e) }), this.register(function (e) { return new Kh(e) }), this.register(function (e) { return new $h(e) }), this.register(function (e) { return new Qh(e) }), this.register(function (e) { return new Vh(e) }), this.register(function (e) { return new rg(e, $.EXT_MESHOPT_COMPRESSION) }), this.register(function (e) { return new rg(e, $.KHR_MESHOPT_COMPRESSION) }), this.register(function (e) { return new ig(e) }) } load(e, t, n, r) { let i = this, a; if (this.resourcePath !== ``) a = this.resourcePath; else if (this.path !== ``) { let t = Ld.extractUrlBase(e); a = Ld.resolveURL(t, this.path) } else a = Ld.extractUrlBase(e); this.manager.itemStart(e); let o = function (t) { r ? r(t) : console.error(t), i.manager.itemError(e), i.manager.itemEnd(e) }, s = new dd(this.manager); s.setPath(this.path), s.setResponseType(`arraybuffer`), s.setRequestHeader(this.requestHeader), s.setWithCredentials(this.withCredentials), s.load(e, function (n) { try { i.parse(n, a, function (n) { t(n), i.manager.itemEnd(e) }, o) } catch (e) { o(e) } }, n, o) } setDRACOLoader(e) { return this.dracoLoader = e, this } setKTX2Loader(e) { return this.ktx2Loader = e, this } setMeshoptDecoder(e) { return this.meshoptDecoder = e, this } register(e) { return this.pluginCallbacks.indexOf(e) === -1 && this.pluginCallbacks.push(e), this } unregister(e) { return this.pluginCallbacks.indexOf(e) !== -1 && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1), this } parse(e, t, n, r) { let i, a = {}, o = {}, s = new TextDecoder; if (typeof e == `string`) i = JSON.parse(e); else if (e instanceof ArrayBuffer) if (s.decode(new Uint8Array(e, 0, 4)) === ag) { try { a[$.KHR_BINARY_GLTF] = new cg(e) } catch (e) { r && r(e); return } i = JSON.parse(a[$.KHR_BINARY_GLTF].content) } else i = JSON.parse(s.decode(e)); else i = e; if (i.asset === void 0 || i.asset.version[0] < 2) { r && r(Error(`THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported.`)); return } let c = new Pg(i, { path: t || this.resourcePath || ``, crossOrigin: this.crossOrigin, requestHeader: this.requestHeader, manager: this.manager, ktx2Loader: this.ktx2Loader, meshoptDecoder: this.meshoptDecoder }); c.fileLoader.setRequestHeader(this.requestHeader); for (let e = 0; e < this.pluginCallbacks.length; e++) { let t = this.pluginCallbacks[e](c); t.name || console.error(`THREE.GLTFLoader: Invalid plugin found: missing name`), o[t.name] = t, a[t.name] = !0 } if (i.extensionsUsed) for (let e = 0; e < i.extensionsUsed.length; ++e) { let t = i.extensionsUsed[e], n = i.extensionsRequired || []; switch (t) { case $.KHR_MATERIALS_UNLIT: a[t] = new Hh; break; case $.KHR_DRACO_MESH_COMPRESSION: a[t] = new lg(i, this.dracoLoader); break; case $.KHR_TEXTURE_TRANSFORM: a[t] = new ug; break; case $.KHR_MESH_QUANTIZATION: a[t] = new dg; break; default: n.indexOf(t) >= 0 && o[t] === void 0 && console.warn(`THREE.GLTFLoader: Unknown extension "` + t + `".`) } } c.setExtensions(a), c.setPlugins(o), c.parse(n, r) } parseAsync(e, t) { let n = this; return new Promise(function (r, i) { n.parse(e, t, r, i) }) } }; function zh() { let e = {}; return { get: function (t) { return e[t] }, add: function (t, n) { e[t] = n }, remove: function (t) { delete e[t] }, removeAll: function () { e = {} } } } function Bh(e, t, n) { let r = e.json.materials[t]; return r.extensions && r.extensions[n] ? r.extensions[n] : null } var $ = { KHR_BINARY_GLTF: `KHR_binary_glTF`, KHR_DRACO_MESH_COMPRESSION: `KHR_draco_mesh_compression`, KHR_LIGHTS_PUNCTUAL: `KHR_lights_punctual`, KHR_MATERIALS_CLEARCOAT: `KHR_materials_clearcoat`, KHR_MATERIALS_DISPERSION: `KHR_materials_dispersion`, KHR_MATERIALS_IOR: `KHR_materials_ior`, KHR_MATERIALS_SHEEN: `KHR_materials_sheen`, KHR_MATERIALS_SPECULAR: `KHR_materials_specular`, KHR_MATERIALS_TRANSMISSION: `KHR_materials_transmission`, KHR_MATERIALS_IRIDESCENCE: `KHR_materials_iridescence`, KHR_MATERIALS_ANISOTROPY: `KHR_materials_anisotropy`, KHR_MATERIALS_UNLIT: `KHR_materials_unlit`, KHR_MATERIALS_VOLUME: `KHR_materials_volume`, KHR_TEXTURE_BASISU: `KHR_texture_basisu`, KHR_TEXTURE_TRANSFORM: `KHR_texture_transform`, KHR_MESH_QUANTIZATION: `KHR_mesh_quantization`, KHR_MATERIALS_EMISSIVE_STRENGTH: `KHR_materials_emissive_strength`, EXT_MATERIALS_BUMP: `EXT_materials_bump`, EXT_TEXTURE_WEBP: `EXT_texture_webp`, EXT_TEXTURE_AVIF: `EXT_texture_avif`, EXT_MESHOPT_COMPRESSION: `EXT_meshopt_compression`, KHR_MESHOPT_COMPRESSION: `KHR_meshopt_compression`, EXT_MESH_GPU_INSTANCING: `EXT_mesh_gpu_instancing` }, Vh = class { constructor(e) { this.parser = e, this.name = $.KHR_LIGHTS_PUNCTUAL, this.cache = { refs: {}, uses: {} } } _markDefs() { let e = this.parser, t = this.parser.json.nodes || []; for (let n = 0, r = t.length; n < r; n++) { let r = t[n]; r.extensions && r.extensions[this.name] && r.extensions[this.name].light !== void 0 && e._addNodeRef(this.cache, r.extensions[this.name].light) } } _loadLight(e) { let t = this.parser, n = `light:` + e, r = t.cache.get(n); if (r) return r; let i = t.json, a = ((i.extensions && i.extensions[this.name] || {}).lights || [])[e], o, s = new X(16777215); a.color !== void 0 && s.setRGB(a.color[0], a.color[1], a.color[2], Xa); let c = a.range === void 0 ? 0 : a.range; switch (a.type) { case `directional`: o = new Fd(s), o.target.position.set(0, 0, -1), o.add(o.target); break; case `point`: o = new Md(s), o.distance = c; break; case `spot`: o = new Ad(s), o.distance = c, a.spot = a.spot || {}, a.spot.innerConeAngle = a.spot.innerConeAngle === void 0 ? 0 : a.spot.innerConeAngle, a.spot.outerConeAngle = a.spot.outerConeAngle === void 0 ? Math.PI / 4 : a.spot.outerConeAngle, o.angle = a.spot.outerConeAngle, o.penumbra = 1 - a.spot.innerConeAngle / a.spot.outerConeAngle, o.target.position.set(0, 0, -1), o.add(o.target); break; default: throw Error(`THREE.GLTFLoader: Unexpected light type: ` + a.type) }return o.position.set(0, 0, 0), Eg(o, a), a.intensity !== void 0 && (o.intensity = a.intensity), o.name = t.createUniqueName(a.name || `light_` + e), r = Promise.resolve(o), t.cache.add(n, r), r } getDependency(e, t) { if (e === `light`) return this._loadLight(t) } createNodeAttachment(e) { let t = this, n = this.parser, r = n.json.nodes[e], i = (r.extensions && r.extensions[this.name] || {}).light; return i === void 0 ? null : this._loadLight(i).then(function (e) { return n._getNodeRef(t.cache, i, e) }) } }, Hh = class { constructor() { this.name = $.KHR_MATERIALS_UNLIT } getMaterialType() { return rl } extendParams(e, t, n) { let r = []; e.color = new X(1, 1, 1), e.opacity = 1; let i = t.pbrMetallicRoughness; if (i) { if (Array.isArray(i.baseColorFactor)) { let t = i.baseColorFactor; e.color.setRGB(t[0], t[1], t[2], Xa), e.opacity = t[3] } i.baseColorTexture !== void 0 && r.push(n.assignTexture(e, `map`, i.baseColorTexture, Ya)) } return Promise.all(r) } }, Uh = class { constructor(e) { this.parser = e, this.name = $.KHR_MATERIALS_EMISSIVE_STRENGTH } extendMaterialParams(e, t) { let n = Bh(this.parser, e, this.name); return n === null || n.emissiveStrength !== void 0 && (t.emissiveIntensity = n.emissiveStrength), Promise.resolve() } }, Wh = class { constructor(e) { this.parser = e, this.name = $.KHR_MATERIALS_CLEARCOAT } getMaterialType(e) { return Bh(this.parser, e, this.name) === null ? null : Fu } extendMaterialParams(e, t) { let n = Bh(this.parser, e, this.name); if (n === null) return Promise.resolve(); let r = []; if (n.clearcoatFactor !== void 0 && (t.clearcoat = n.clearcoatFactor), n.clearcoatTexture !== void 0 && r.push(this.parser.assignTexture(t, `clearcoatMap`, n.clearcoatTexture)), n.clearcoatRoughnessFactor !== void 0 && (t.clearcoatRoughness = n.clearcoatRoughnessFactor), n.clearcoatRoughnessTexture !== void 0 && r.push(this.parser.assignTexture(t, `clearcoatRoughnessMap`, n.clearcoatRoughnessTexture)), n.clearcoatNormalTexture !== void 0 && (r.push(this.parser.assignTexture(t, `clearcoatNormalMap`, n.clearcoatNormalTexture)), n.clearcoatNormalTexture.scale !== void 0)) { let e = n.clearcoatNormalTexture.scale; t.clearcoatNormalScale = new G(e, e) } return Promise.all(r) } }, Gh = class { constructor(e) { this.parser = e, this.name = $.KHR_MATERIALS_DISPERSION } getMaterialType(e) { return Bh(this.parser, e, this.name) === null ? null : Fu } extendMaterialParams(e, t) { let n = Bh(this.parser, e, this.name); return n === null || (t.dispersion = n.dispersion === void 0 ? 0 : n.dispersion), Promise.resolve() } }, Kh = class { constructor(e) { this.parser = e, this.name = $.KHR_MATERIALS_IRIDESCENCE } getMaterialType(e) { return Bh(this.parser, e, this.name) === null ? null : Fu } extendMaterialParams(e, t) { let n = Bh(this.parser, e, this.name); if (n === null) return Promise.resolve(); let r = []; return n.iridescenceFactor !== void 0 && (t.iridescence = n.iridescenceFactor), n.iridescenceTexture !== void 0 && r.push(this.parser.assignTexture(t, `iridescenceMap`, n.iridescenceTexture)), n.iridescenceIor !== void 0 && (t.iridescenceIOR = n.iridescenceIor), t.iridescenceThicknessRange === void 0 && (t.iridescenceThicknessRange = [100, 400]), n.iridescenceThicknessMinimum !== void 0 && (t.iridescenceThicknessRange[0] = n.iridescenceThicknessMinimum), n.iridescenceThicknessMaximum !== void 0 && (t.iridescenceThicknessRange[1] = n.iridescenceThicknessMaximum), n.iridescenceThicknessTexture !== void 0 && r.push(this.parser.assignTexture(t, `iridescenceThicknessMap`, n.iridescenceThicknessTexture)), Promise.all(r) } }, qh = class { constructor(e) { this.parser = e, this.name = $.KHR_MATERIALS_SHEEN } getMaterialType(e) { return Bh(this.parser, e, this.name) === null ? null : Fu } extendMaterialParams(e, t) { let n = Bh(this.parser, e, this.name); if (n === null) return Promise.resolve(); let r = []; if (t.sheenColor = new X(0, 0, 0), t.sheenRoughness = 0, t.sheen = 1, n.sheenColorFactor !== void 0) { let e = n.sheenColorFactor; t.sheenColor.setRGB(e[0], e[1], e[2], Xa) } return n.sheenRoughnessFactor !== void 0 && (t.sheenRoughness = n.sheenRoughnessFactor), n.sheenColorTexture !== void 0 && r.push(this.parser.assignTexture(t, `sheenColorMap`, n.sheenColorTexture, Ya)), n.sheenRoughnessTexture !== void 0 && r.push(this.parser.assignTexture(t, `sheenRoughnessMap`, n.sheenRoughnessTexture)), Promise.all(r) } }, Jh = class { constructor(e) { this.parser = e, this.name = $.KHR_MATERIALS_TRANSMISSION } getMaterialType(e) { return Bh(this.parser, e, this.name) === null ? null : Fu } extendMaterialParams(e, t) { let n = Bh(this.parser, e, this.name); if (n === null) return Promise.resolve(); let r = []; return n.transmissionFactor !== void 0 && (t.transmission = n.transmissionFactor), n.transmissionTexture !== void 0 && r.push(this.parser.assignTexture(t, `transmissionMap`, n.transmissionTexture)), Promise.all(r) } }, Yh = class { constructor(e) { this.parser = e, this.name = $.KHR_MATERIALS_VOLUME } getMaterialType(e) { return Bh(this.parser, e, this.name) === null ? null : Fu } extendMaterialParams(e, t) { let n = Bh(this.parser, e, this.name); if (n === null) return Promise.resolve(); let r = []; t.thickness = n.thicknessFactor === void 0 ? 0 : n.thicknessFactor, n.thicknessTexture !== void 0 && r.push(this.parser.assignTexture(t, `thicknessMap`, n.thicknessTexture)), t.attenuationDistance = n.attenuationDistance || 1 / 0; let i = n.attenuationColor || [1, 1, 1]; return t.attenuationColor = new X().setRGB(i[0], i[1], i[2], Xa), Promise.all(r) } }, Xh = class { constructor(e) { this.parser = e, this.name = $.KHR_MATERIALS_IOR } getMaterialType(e) { return Bh(this.parser, e, this.name) === null ? null : Fu } extendMaterialParams(e, t) { let n = Bh(this.parser, e, this.name); return n === null ? Promise.resolve() : (t.ior = n.ior === void 0 ? 1.5 : n.ior, t.ior === 0 && (t.ior = 1e3), Promise.resolve()) } }, Zh = class { constructor(e) { this.parser = e, this.name = $.KHR_MATERIALS_SPECULAR } getMaterialType(e) { return Bh(this.parser, e, this.name) === null ? null : Fu } extendMaterialParams(e, t) { let n = Bh(this.parser, e, this.name); if (n === null) return Promise.resolve(); let r = []; t.specularIntensity = n.specularFactor === void 0 ? 1 : n.specularFactor, n.specularTexture !== void 0 && r.push(this.parser.assignTexture(t, `specularIntensityMap`, n.specularTexture)); let i = n.specularColorFactor || [1, 1, 1]; return t.specularColor = new X().setRGB(i[0], i[1], i[2], Xa), n.specularColorTexture !== void 0 && r.push(this.parser.assignTexture(t, `specularColorMap`, n.specularColorTexture, Ya)), Promise.all(r) } }, Qh = class { constructor(e) { this.parser = e, this.name = $.EXT_MATERIALS_BUMP } getMaterialType(e) { return Bh(this.parser, e, this.name) === null ? null : Fu } extendMaterialParams(e, t) { let n = Bh(this.parser, e, this.name); if (n === null) return Promise.resolve(); let r = []; return t.bumpScale = n.bumpFactor === void 0 ? 1 : n.bumpFactor, n.bumpTexture !== void 0 && r.push(this.parser.assignTexture(t, `bumpMap`, n.bumpTexture)), Promise.all(r) } }, $h = class { constructor(e) { this.parser = e, this.name = $.KHR_MATERIALS_ANISOTROPY } getMaterialType(e) { return Bh(this.parser, e, this.name) === null ? null : Fu } extendMaterialParams(e, t) { let n = Bh(this.parser, e, this.name); if (n === null) return Promise.resolve(); let r = []; return n.anisotropyStrength !== void 0 && (t.anisotropy = n.anisotropyStrength), n.anisotropyRotation !== void 0 && (t.anisotropyRotation = n.anisotropyRotation), n.anisotropyTexture !== void 0 && r.push(this.parser.assignTexture(t, `anisotropyMap`, n.anisotropyTexture)), Promise.all(r) } }, eg = class { constructor(e) { this.parser = e, this.name = $.KHR_TEXTURE_BASISU } loadTexture(e) { let t = this.parser, n = t.json, r = n.textures[e]; if (!r.extensions || !r.extensions[this.name]) return null; let i = r.extensions[this.name], a = t.options.ktx2Loader; if (!a) { if (n.extensionsRequired && n.extensionsRequired.indexOf(this.name) >= 0) throw Error(`THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures`); return null } return t.loadTextureImage(e, i.source, a) } }, tg = class { constructor(e) { this.parser = e, this.name = $.EXT_TEXTURE_WEBP } loadTexture(e) { let t = this.name, n = this.parser, r = n.json, i = r.textures[e]; if (!i.extensions || !i.extensions[t]) return null; let a = i.extensions[t], o = r.images[a.source], s = n.textureLoader; if (o.uri) { let e = n.options.manager.getHandler(o.uri); e !== null && (s = e) } return n.loadTextureImage(e, a.source, s) } }, ng = class { constructor(e) { this.parser = e, this.name = $.EXT_TEXTURE_AVIF } loadTexture(e) { let t = this.name, n = this.parser, r = n.json, i = r.textures[e]; if (!i.extensions || !i.extensions[t]) return null; let a = i.extensions[t], o = r.images[a.source], s = n.textureLoader; if (o.uri) { let e = n.options.manager.getHandler(o.uri); e !== null && (s = e) } return n.loadTextureImage(e, a.source, s) } }, rg = class { constructor(e, t) { this.name = t, this.parser = e } loadBufferView(e) { let t = this.parser.json, n = t.bufferViews[e]; if (n.extensions && n.extensions[this.name]) { let e = n.extensions[this.name], r = this.parser.getDependency(`buffer`, e.buffer), i = this.parser.options.meshoptDecoder; if (!i || !i.supported) { if (t.extensionsRequired && t.extensionsRequired.indexOf(this.name) >= 0) throw Error(`THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files`); return null } return r.then(function (t) { let n = e.byteOffset || 0, r = e.byteLength || 0, a = e.count, o = e.byteStride, s = new Uint8Array(t, n, r); return i.decodeGltfBufferAsync ? i.decodeGltfBufferAsync(a, o, s, e.mode, e.filter).then(function (e) { return e.buffer }) : i.ready.then(function () { let t = new ArrayBuffer(a * o); return i.decodeGltfBuffer(new Uint8Array(t), a, o, s, e.mode, e.filter), t }) }) } else return null } }, ig = class { constructor(e) { this.name = $.EXT_MESH_GPU_INSTANCING, this.parser = e } createNodeMesh(e) { let t = this.parser.json, n = t.nodes[e]; if (!n.extensions || !n.extensions[this.name] || n.mesh === void 0) return null; let r = t.meshes[n.mesh]; for (let e of r.primitives) if (e.mode !== hg.TRIANGLES && e.mode !== hg.TRIANGLE_STRIP && e.mode !== hg.TRIANGLE_FAN && e.mode !== void 0) return null; let i = n.extensions[this.name].attributes, a = [], o = {}; for (let e in i) a.push(this.parser.getDependency(`accessor`, i[e]).then(t => (o[e] = t, o[e]))); return a.length < 1 ? null : (a.push(this.parser.createNodeMesh(e)), Promise.all(a).then(e => { let t = e.pop(), n = t.isGroup ? t.children : [t], r = e[0].count, i = []; for (let e of n) { let t = new Y, n = new K, a = new Vo, s = new K(1, 1, 1), c = new Vl(e.geometry, e.material, r); for (let e = 0; e < r; e++)o.TRANSLATION && n.fromBufferAttribute(o.TRANSLATION, e), o.ROTATION && a.fromBufferAttribute(o.ROTATION, e), o.SCALE && s.fromBufferAttribute(o.SCALE, e), c.setMatrixAt(e, t.compose(n, a, s)); for (let t in o) if (t === `_COLOR_0`) { let e = o[t]; c.instanceColor = new Nl(e.array, e.itemSize, e.normalized) } else t !== `TRANSLATION` && t !== `ROTATION` && t !== `SCALE` && e.geometry.setAttribute(t, o[t]); Fs.prototype.copy.call(c, e), this.parser.assignFinalMaterial(c), i.push(c) } return t.isGroup ? (t.clear(), t.add(...i), t) : i[0] })) } }, ag = `glTF`, og = 12, sg = { JSON: 1313821514, BIN: 5130562 }, cg = class { constructor(e) { this.name = $.KHR_BINARY_GLTF, this.content = null, this.body = null; let t = new DataView(e, 0, og), n = new TextDecoder; if (this.header = { magic: n.decode(new Uint8Array(e.slice(0, 4))), version: t.getUint32(4, !0), length: t.getUint32(8, !0) }, this.header.magic !== ag) throw Error(`THREE.GLTFLoader: Unsupported glTF-Binary header.`); if (this.header.version < 2) throw Error(`THREE.GLTFLoader: Legacy binary file detected.`); let r = this.header.length - og, i = new DataView(e, og), a = 0; for (; a < r;) { let t = i.getUint32(a, !0); a += 4; let r = i.getUint32(a, !0); if (a += 4, r === sg.JSON) { let r = new Uint8Array(e, og + a, t); this.content = n.decode(r) } else if (r === sg.BIN) { let n = og + a; this.body = e.slice(n, n + t) } a += t } if (this.content === null) throw Error(`THREE.GLTFLoader: JSON content not found.`) } }, lg = class { constructor(e, t) { if (!t) throw Error(`THREE.GLTFLoader: No DRACOLoader instance provided.`); this.name = $.KHR_DRACO_MESH_COMPRESSION, this.json = e, this.dracoLoader = t, this.dracoLoader.preload() } decodePrimitive(e, t) { let n = this.json, r = this.dracoLoader, i = e.extensions[this.name].bufferView, a = e.extensions[this.name].attributes, o = {}, s = {}, c = {}; for (let e in a) { let t = bg[e] || e.toLowerCase(); o[t] = a[e] } for (let t in e.attributes) { let r = bg[t] || t.toLowerCase(); if (a[t] !== void 0) { let i = n.accessors[e.attributes[t]]; c[r] = gg[i.componentType].name, s[r] = i.normalized === !0 } } return t.getDependency(`bufferView`, i).then(function (e) { return new Promise(function (t, n) { r.decodeDracoFile(e, function (e) { for (let t in e.attributes) { let n = e.attributes[t], r = s[t]; r !== void 0 && (n.normalized = r) } t(e) }, o, c, Xa, n) }) }) } }, ug = class { constructor() { this.name = $.KHR_TEXTURE_TRANSFORM } extendTexture(e, t) { return (t.texCoord === void 0 || t.texCoord === e.channel) && t.offset === void 0 && t.rotation === void 0 && t.scale === void 0 ? e : (e = e.clone(), t.texCoord !== void 0 && (e.channel = t.texCoord), t.offset !== void 0 && e.offset.fromArray(t.offset), t.rotation !== void 0 && (e.rotation = t.rotation), t.scale !== void 0 && e.repeat.fromArray(t.scale), e.needsUpdate = !0, e) } }, dg = class { constructor() { this.name = $.KHR_MESH_QUANTIZATION } }, fg = class extends Hu { constructor(e, t, n, r) { super(e, t, n, r) } copySampleValue_(e) { let t = this.resultBuffer, n = this.sampleValues, r = this.valueSize, i = e * r * 3 + r; for (let e = 0; e !== r; e++)t[e] = n[i + e]; return t } interpolate_(e, t, n, r) { let i = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = o * 2, c = o * 3, l = r - t, u = (n - t) / l, d = u * u, f = d * u, p = e * c, m = p - c, h = -2 * f + 3 * d, g = f - d, _ = 1 - h, v = g - d + u; for (let e = 0; e !== o; e++) { let t = a[m + e + o], n = a[m + e + s] * l, r = a[p + e + o], c = a[p + e] * l; i[e] = _ * t + v * n + h * r + g * c } return i } }, pg = new Vo, mg = class extends fg { interpolate_(e, t, n, r) { let i = super.interpolate_(e, t, n, r); return pg.fromArray(i).normalize().toArray(i), i } }, hg = { FLOAT: 5126, FLOAT_MAT3: 35675, FLOAT_MAT4: 35676, FLOAT_VEC2: 35664, FLOAT_VEC3: 35665, FLOAT_VEC4: 35666, LINEAR: 9729, REPEAT: 10497, SAMPLER_2D: 35678, POINTS: 0, LINES: 1, LINE_LOOP: 2, LINE_STRIP: 3, TRIANGLES: 4, TRIANGLE_STRIP: 5, TRIANGLE_FAN: 6, UNSIGNED_BYTE: 5121, UNSIGNED_SHORT: 5123 }, gg = { 5120: Int8Array, 5121: Uint8Array, 5122: Int16Array, 5123: Uint16Array, 5125: Uint32Array, 5126: Float32Array }, _g = { 9728: Ei, 9729: ki, 9984: Di, 9985: Ai, 9986: Oi, 9987: ji }, vg = { 33071: wi, 33648: Ti, 10497: Ci }, yg = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT2: 4, MAT3: 9, MAT4: 16 }, bg = { POSITION: `position`, NORMAL: `normal`, TANGENT: `tangent`, TEXCOORD_0: `uv`, TEXCOORD_1: `uv1`, TEXCOORD_2: `uv2`, TEXCOORD_3: `uv3`, COLOR_0: `color`, WEIGHTS_0: `skinWeight`, JOINTS_0: `skinIndex` }, xg = { scale: `scale`, translation: `position`, rotation: `quaternion`, weights: `morphTargetInfluences` }, Sg = { CUBICSPLINE: void 0, LINEAR: Ba, STEP: za }, Cg = { OPAQUE: `OPAQUE`, MASK: `MASK`, BLEND: `BLEND` }; function wg(e) { return e.DefaultMaterial === void 0 && (e.DefaultMaterial = new Pu({ color: 16777215, emissive: 0, metalness: 1, roughness: 1, transparent: !1, depthTest: !0, side: 0 })), e.DefaultMaterial } function Tg(e, t, n) { for (let r in n.extensions) e[r] === void 0 && (t.userData.gltfExtensions = t.userData.gltfExtensions || {}, t.userData.gltfExtensions[r] = n.extensions[r]) } function Eg(e, t) { t.extras !== void 0 && (typeof t.extras == `object` ? Object.assign(e.userData, t.extras) : console.warn(`THREE.GLTFLoader: Ignoring primitive type .extras, ` + t.extras)) } function Dg(e, t, n) { let r = !1, i = !1, a = !1; for (let e = 0, n = t.length; e < n; e++) { let n = t[e]; if (n.POSITION !== void 0 && (r = !0), n.NORMAL !== void 0 && (i = !0), n.COLOR_0 !== void 0 && (a = !0), r && i && a) break } if (!r && !i && !a) return Promise.resolve(e); let o = [], s = [], c = []; for (let l = 0, u = t.length; l < u; l++) { let u = t[l]; if (r) { let t = u.POSITION === void 0 ? e.attributes.position : n.getDependency(`accessor`, u.POSITION); o.push(t) } if (i) { let t = u.NORMAL === void 0 ? e.attributes.normal : n.getDependency(`accessor`, u.NORMAL); s.push(t) } if (a) { let t = u.COLOR_0 === void 0 ? e.attributes.color : n.getDependency(`accessor`, u.COLOR_0); c.push(t) } } return Promise.all([Promise.all(o), Promise.all(s), Promise.all(c)]).then(function (t) { let n = t[0], o = t[1], s = t[2]; return r && (e.morphAttributes.position = n), i && (e.morphAttributes.normal = o), a && (e.morphAttributes.color = s), e.morphTargetsRelative = !0, e }) } function Og(e, t) { if (e.updateMorphTargets(), t.weights !== void 0) for (let n = 0, r = t.weights.length; n < r; n++)e.morphTargetInfluences[n] = t.weights[n]; if (t.extras && Array.isArray(t.extras.targetNames)) { let n = t.extras.targetNames; if (e.morphTargetInfluences.length === n.length) { e.morphTargetDictionary = {}; for (let t = 0, r = n.length; t < r; t++)e.morphTargetDictionary[n[t]] = t } else console.warn(`THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.`) } } function kg(e) { let t, n = e.extensions && e.extensions[$.KHR_DRACO_MESH_COMPRESSION]; if (t = n ? `draco:` + n.bufferView + `:` + n.indices + `:` + Ag(n.attributes) : e.indices + `:` + Ag(e.attributes) + `:` + e.mode, e.targets !== void 0) for (let n = 0, r = e.targets.length; n < r; n++)t += `:` + Ag(e.targets[n]); return t } function Ag(e) { let t = ``, n = Object.keys(e).sort(); for (let r = 0, i = n.length; r < i; r++)t += n[r] + `:` + e[n[r]] + `;`; return t } function jg(e) { switch (e) { case Int8Array: return 1 / 127; case Uint8Array: return 1 / 255; case Int16Array: return 1 / 32767; case Uint16Array: return 1 / 65535; default: throw Error(`THREE.GLTFLoader: Unsupported normalized accessor component type.`) } } function Mg(e) { return e.search(/\.jpe?g($|\?)/i) > 0 || e.search(/^data\:image\/jpeg/) === 0 ? `image/jpeg` : e.search(/\.webp($|\?)/i) > 0 || e.search(/^data\:image\/webp/) === 0 ? `image/webp` : e.search(/\.ktx2($|\?)/i) > 0 || e.search(/^data\:image\/ktx2/) === 0 ? `image/ktx2` : `image/png` } var Ng = new Y, Pg = class { constructor(e = {}, t = {}) { this.json = e, this.extensions = {}, this.plugins = {}, this.options = t, this.cache = new zh, this.associations = new Map, this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = { refs: {}, uses: {} }, this.cameraCache = { refs: {}, uses: {} }, this.lightCache = { refs: {}, uses: {} }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {}; let n = !1, r = -1, i = !1, a = -1; if (typeof navigator < `u` && navigator.userAgent !== void 0) { let e = navigator.userAgent; n = /^((?!chrome|android).)*safari/i.test(e) === !0; let t = e.match(/Version\/(\d+)/); r = n && t ? parseInt(t[1], 10) : -1, i = e.indexOf(`Firefox`) > -1, a = i ? e.match(/Firefox\/([0-9]+)\./)[1] : -1 } typeof createImageBitmap > `u` || n && r < 17 || i && a < 98 ? this.textureLoader = new hd(this.options.manager) : this.textureLoader = new zd(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new dd(this.options.manager), this.fileLoader.setResponseType(`arraybuffer`), this.options.crossOrigin === `use-credentials` && this.fileLoader.setWithCredentials(!0) } setExtensions(e) { this.extensions = e } setPlugins(e) { this.plugins = e } parse(e, t) { let n = this, r = this.json, i = this.extensions; this.cache.removeAll(), this.nodeCache = {}, this._invokeAll(function (e) { return e._markDefs && e._markDefs() }), Promise.all(this._invokeAll(function (e) { return e.beforeRoot && e.beforeRoot() })).then(function () { return Promise.all([n.getDependencies(`scene`), n.getDependencies(`animation`), n.getDependencies(`camera`)]) }).then(function (t) { let a = { scene: t[0][r.scene || 0], scenes: t[0], animations: t[1], cameras: t[2], asset: r.asset, parser: n, userData: {} }; return Tg(i, a, r), Eg(a, r), Promise.all(n._invokeAll(function (e) { return e.afterRoot && e.afterRoot(a) })).then(function () { for (let e of a.scenes) e.updateMatrixWorld(); e(a) }) }).catch(t) } _markDefs() { let e = this.json.nodes || [], t = this.json.skins || [], n = this.json.meshes || []; for (let n = 0, r = t.length; n < r; n++) { let r = t[n].joints; for (let t = 0, n = r.length; t < n; t++)e[r[t]].isBone = !0 } for (let t = 0, r = e.length; t < r; t++) { let r = e[t]; r.mesh !== void 0 && (this._addNodeRef(this.meshCache, r.mesh), r.skin !== void 0 && (n[r.mesh].isSkinnedMesh = !0)), r.camera !== void 0 && this._addNodeRef(this.cameraCache, r.camera) } } _addNodeRef(e, t) { t !== void 0 && (e.refs[t] === void 0 && (e.refs[t] = e.uses[t] = 0), e.refs[t]++) } _getNodeRef(e, t, n) { if (e.refs[t] <= 1) return n; let r = n.clone(), i = (e, t) => { let n = this.associations.get(e); n != null && this.associations.set(t, n); for (let [n, r] of e.children.entries()) i(r, t.children[n]) }; return i(n, r), r.name += `_instance_` + e.uses[t]++, r } _invokeOne(e) { let t = Object.values(this.plugins); t.push(this); for (let n = 0; n < t.length; n++) { let r = e(t[n]); if (r) return r } return null } _invokeAll(e) { let t = Object.values(this.plugins); t.unshift(this); let n = []; for (let r = 0; r < t.length; r++) { let i = e(t[r]); i && n.push(i) } return n } getDependency(e, t) { let n = e + `:` + t, r = this.cache.get(n); if (!r) { switch (e) { case `scene`: r = this.loadScene(t); break; case `node`: r = this._invokeOne(function (e) { return e.loadNode && e.loadNode(t) }); break; case `mesh`: r = this._invokeOne(function (e) { return e.loadMesh && e.loadMesh(t) }); break; case `accessor`: r = this.loadAccessor(t); break; case `bufferView`: r = this._invokeOne(function (e) { return e.loadBufferView && e.loadBufferView(t) }); break; case `buffer`: r = this.loadBuffer(t); break; case `material`: r = this._invokeOne(function (e) { return e.loadMaterial && e.loadMaterial(t) }); break; case `texture`: r = this._invokeOne(function (e) { return e.loadTexture && e.loadTexture(t) }); break; case `skin`: r = this.loadSkin(t); break; case `animation`: r = this._invokeOne(function (e) { return e.loadAnimation && e.loadAnimation(t) }); break; case `camera`: r = this.loadCamera(t); break; default: if (r = this._invokeOne(function (n) { return n != this && n.getDependency && n.getDependency(e, t) }), !r) throw Error(`Unknown type: ` + e); break }this.cache.add(n, r) } return r } getDependencies(e) { let t = this.cache.get(e); if (!t) { let n = this, r = this.json[e + (e === `mesh` ? `es` : `s`)] || []; t = Promise.all(r.map(function (t, r) { return n.getDependency(e, r) })), this.cache.add(e, t) } return t } loadBuffer(e) { let t = this.json.buffers[e], n = this.fileLoader; if (t.type && t.type !== `arraybuffer`) throw Error(`THREE.GLTFLoader: ` + t.type + ` buffer type is not supported.`); if (t.uri === void 0 && e === 0) return Promise.resolve(this.extensions[$.KHR_BINARY_GLTF].body); let r = this.options; return new Promise(function (e, i) { n.load(Ld.resolveURL(t.uri, r.path), e, void 0, function () { i(Error(`THREE.GLTFLoader: Failed to load buffer "` + t.uri + `".`)) }) }) } loadBufferView(e) { let t = this.json.bufferViews[e]; return this.getDependency(`buffer`, t.buffer).then(function (e) { let n = t.byteLength || 0, r = t.byteOffset || 0; return e.slice(r, r + n) }) } loadAccessor(e) { let t = this, n = this.json, r = this.json.accessors[e]; if (r.bufferView === void 0 && r.sparse === void 0) { let e = yg[r.type], t = gg[r.componentType], n = r.normalized === !0, i = new t(r.count * e); return Promise.resolve(new Oc(i, e, n)) } let i = []; return r.bufferView === void 0 ? i.push(null) : i.push(this.getDependency(`bufferView`, r.bufferView)), r.sparse !== void 0 && (i.push(this.getDependency(`bufferView`, r.sparse.indices.bufferView)), i.push(this.getDependency(`bufferView`, r.sparse.values.bufferView))), Promise.all(i).then(function (e) { let i = e[0], a = yg[r.type], o = gg[r.componentType], s = o.BYTES_PER_ELEMENT, c = s * a, l = r.byteOffset || 0, u = r.bufferView === void 0 ? void 0 : n.bufferViews[r.bufferView].byteStride, d = r.normalized === !0, f, p; if (u && u !== c) { let e = Math.floor(l / u), n = `InterleavedBuffer:` + r.bufferView + `:` + r.componentType + `:` + e + `:` + r.count, c = t.cache.get(n); c || (f = new o(i, e * u, r.count * u / s), c = new Wc(f, u / s), t.cache.add(n, c)), p = new Kc(c, a, l % u / s, d) } else f = i === null ? new o(r.count * a) : new o(i, l, r.count * a), p = new Oc(f, a, d); if (r.sparse !== void 0) { let t = yg.SCALAR, n = gg[r.sparse.indices.componentType], s = r.sparse.indices.byteOffset || 0, c = r.sparse.values.byteOffset || 0, l = new n(e[1], s, r.sparse.count * t), u = new o(e[2], c, r.sparse.count * a); i !== null && (p = new Oc(p.array.slice(), p.itemSize, p.normalized)), p.normalized = !1; for (let e = 0, t = l.length; e < t; e++) { let t = l[e]; if (p.setX(t, u[e * a]), a >= 2 && p.setY(t, u[e * a + 1]), a >= 3 && p.setZ(t, u[e * a + 2]), a >= 4 && p.setW(t, u[e * a + 3]), a >= 5) throw Error(`THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.`) } p.normalized = d } return p }) } loadTexture(e) { let t = this.json, n = this.options, r = t.textures[e].source, i = t.images[r], a = this.textureLoader; if (i.uri) { let e = n.manager.getHandler(i.uri); e !== null && (a = e) } return this.loadTextureImage(e, r, a) } loadTextureImage(e, t, n) { let r = this, i = this.json, a = i.textures[e], o = i.images[t], s = (o.uri || o.bufferView) + `:` + a.sampler; if (this.textureCache[s]) return this.textureCache[s]; let c = this.loadImageSource(t, n).then(function (t) { t.flipY = !1, t.name = a.name || o.name || ``, t.name === `` && typeof o.uri == `string` && o.uri.startsWith(`data:image/`) === !1 && (t.name = o.uri); let n = (i.samplers || {})[a.sampler] || {}; return t.magFilter = _g[n.magFilter] || 1006, t.minFilter = _g[n.minFilter] || 1008, t.wrapS = vg[n.wrapS] || 1e3, t.wrapT = vg[n.wrapT] || 1e3, t.generateMipmaps = !t.isCompressedTexture && t.minFilter !== 1003 && t.minFilter !== 1006, r.associations.set(t, { textures: e }), t }).catch(function () { return null }); return this.textureCache[s] = c, c } loadImageSource(e, t) { let n = this, r = this.json, i = this.options; if (this.sourceCache[e] !== void 0) return this.sourceCache[e].then(e => e.clone()); let a = r.images[e], o = self.URL || self.webkitURL, s = a.uri || ``, c = !1; if (a.bufferView !== void 0) s = n.getDependency(`bufferView`, a.bufferView).then(function (e) { c = !0; let t = new Blob([e], { type: a.mimeType }); return s = o.createObjectURL(t), s }); else if (a.uri === void 0) throw Error(`THREE.GLTFLoader: Image ` + e + ` is missing URI and bufferView`); let l = Promise.resolve(s).then(function (e) { return new Promise(function (n, r) { let a = n; t.isImageBitmapLoader === !0 && (a = function (e) { let t = new rs(e); t.needsUpdate = !0, n(t) }), t.load(Ld.resolveURL(e, i.path), a, void 0, r) }) }).then(function (e) { return c === !0 && o.revokeObjectURL(s), Eg(e, a), e.userData.mimeType = a.mimeType || Mg(a.uri), e }).catch(function (e) { throw console.error(`THREE.GLTFLoader: Couldn't load texture`, s), e }); return this.sourceCache[e] = l, l } assignTexture(e, t, n, r) { let i = this; return this.getDependency(`texture`, n.index).then(function (a) { if (!a) return null; if (n.texCoord !== void 0 && n.texCoord > 0 && (a = a.clone(), a.channel = n.texCoord), i.extensions[$.KHR_TEXTURE_TRANSFORM]) { let e = n.extensions === void 0 ? void 0 : n.extensions[$.KHR_TEXTURE_TRANSFORM]; if (e) { let t = i.associations.get(a); a = i.extensions[$.KHR_TEXTURE_TRANSFORM].extendTexture(a, e), i.associations.set(a, t) } } return r !== void 0 && (a.colorSpace = r), e[t] = a, a }) } assignFinalMaterial(e) { let t = e.geometry, n = e.material, r = t.attributes.tangent === void 0, i = t.attributes.color !== void 0, a = t.attributes.normal === void 0; if (e.isPoints) { let e = `PointsMaterial:` + n.uuid, t = this.cache.get(e); t || (t = new uu, Jc.prototype.copy.call(t, n), t.color.copy(n.color), t.map = n.map, t.sizeAttenuation = !1, this.cache.add(e, t)), n = t } else if (e.isLine) { let e = `LineBasicMaterial:` + n.uuid, t = this.cache.get(e); t || (t = new Xl, Jc.prototype.copy.call(t, n), t.color.copy(n.color), t.map = n.map, this.cache.add(e, t)), n = t } if (r || i || a) { let e = `ClonedMaterial:` + n.uuid + `:`; r && (e += `derivative-tangents:`), i && (e += `vertex-colors:`), a && (e += `flat-shading:`); let t = this.cache.get(e); t || (t = n.clone(), i && (t.vertexColors = !0), a && (t.flatShading = !0), r && (t.normalScale && (t.normalScale.y *= -1), t.clearcoatNormalScale && (t.clearcoatNormalScale.y *= -1)), this.cache.add(e, t), this.associations.set(t, this.associations.get(n))), n = t } e.material = n } getMaterialType() { return Pu } loadMaterial(e) { let t = this, n = this.json, r = this.extensions, i = n.materials[e], a, o = {}, s = i.extensions || {}, c = []; if (s[$.KHR_MATERIALS_UNLIT]) { let e = r[$.KHR_MATERIALS_UNLIT]; a = e.getMaterialType(), c.push(e.extendParams(o, i, t)) } else { let n = i.pbrMetallicRoughness || {}; if (o.color = new X(1, 1, 1), o.opacity = 1, Array.isArray(n.baseColorFactor)) { let e = n.baseColorFactor; o.color.setRGB(e[0], e[1], e[2], Xa), o.opacity = e[3] } n.baseColorTexture !== void 0 && c.push(t.assignTexture(o, `map`, n.baseColorTexture, Ya)), o.metalness = n.metallicFactor === void 0 ? 1 : n.metallicFactor, o.roughness = n.roughnessFactor === void 0 ? 1 : n.roughnessFactor, n.metallicRoughnessTexture !== void 0 && (c.push(t.assignTexture(o, `metalnessMap`, n.metallicRoughnessTexture)), c.push(t.assignTexture(o, `roughnessMap`, n.metallicRoughnessTexture))), a = this._invokeOne(function (t) { return t.getMaterialType && t.getMaterialType(e) }), c.push(Promise.all(this._invokeAll(function (t) { return t.extendMaterialParams && t.extendMaterialParams(e, o) }))) } i.doubleSided === !0 && (o.side = 2); let l = i.alphaMode || Cg.OPAQUE; if (l === Cg.BLEND ? (o.transparent = !0, o.depthWrite = !1) : (o.transparent = !1, l === Cg.MASK && (o.alphaTest = i.alphaCutoff === void 0 ? .5 : i.alphaCutoff)), i.normalTexture !== void 0 && a !== rl && (c.push(t.assignTexture(o, `normalMap`, i.normalTexture)), o.normalScale = new G(1, 1), i.normalTexture.scale !== void 0)) { let e = i.normalTexture.scale; o.normalScale.set(e, e) } if (i.occlusionTexture !== void 0 && a !== rl && (c.push(t.assignTexture(o, `aoMap`, i.occlusionTexture)), i.occlusionTexture.strength !== void 0 && (o.aoMapIntensity = i.occlusionTexture.strength)), i.emissiveFactor !== void 0 && a !== rl) { let e = i.emissiveFactor; o.emissive = new X().setRGB(e[0], e[1], e[2], Xa) } return i.emissiveTexture !== void 0 && a !== rl && c.push(t.assignTexture(o, `emissiveMap`, i.emissiveTexture, Ya)), Promise.all(c).then(function () { let n = new a(o); return i.name && (n.name = i.name), Eg(n, i), t.associations.set(n, { materials: e }), i.extensions && Tg(r, n, i), n }) } createUniqueName(e) { let t = af.sanitizeNodeName(e || ``); return t in this.nodeNamesUsed ? t + `_` + ++this.nodeNamesUsed[t] : (this.nodeNamesUsed[t] = 0, t) } loadGeometries(e) { let t = this, n = this.extensions, r = this.primitiveCache; function i(e) { return n[$.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(e, t).then(function (n) { return Ig(n, e, t) }) } let a = []; for (let n = 0, o = e.length; n < o; n++) { let o = e[n], s = kg(o), c = r[s]; if (c) a.push(c.promise); else { let e; e = o.extensions && o.extensions[$.KHR_DRACO_MESH_COMPRESSION] ? i(o) : Ig(new Uc, o, t), r[s] = { primitive: o, promise: e }, a.push(e) } } return Promise.all(a) } loadMesh(e) { let t = this, n = this.json, r = this.extensions, i = n.meshes[e], a = i.primitives, o = []; for (let e = 0, t = a.length; e < t; e++) { let t = a[e].material === void 0 ? wg(this.cache) : this.getDependency(`material`, a[e].material); o.push(t) } return o.push(t.loadGeometries(a)), Promise.all(o).then(function (n) { let o = n.slice(0, n.length - 1), s = n[n.length - 1], c = []; for (let n = 0, l = s.length; n < l; n++) { let l = s[n], u = a[n], d, f = o[n]; if (u.mode === hg.TRIANGLES || u.mode === hg.TRIANGLE_STRIP || u.mode === hg.TRIANGLE_FAN || u.mode === void 0) d = i.isSkinnedMesh === !0 ? new Dl(l, f) : new hl(l, f), d.isSkinnedMesh === !0 && d.normalizeSkinWeights(), u.mode === hg.TRIANGLE_STRIP ? d.geometry = Fh(d.geometry, 1) : u.mode === hg.TRIANGLE_FAN && (d.geometry = Fh(d.geometry, 2)); else if (u.mode === hg.LINES) d = new cu(l, f); else if (u.mode === hg.LINE_STRIP) d = new iu(l, f); else if (u.mode === hg.LINE_LOOP) d = new lu(l, f); else if (u.mode === hg.POINTS) d = new hu(l, f); else throw Error(`THREE.GLTFLoader: Primitive mode unsupported: ` + u.mode); Object.keys(d.geometry.morphAttributes).length > 0 && Og(d, i), d.name = t.createUniqueName(i.name || `mesh_` + e), Eg(d, i), u.extensions && Tg(r, d, u), t.assignFinalMaterial(d), c.push(d) } for (let n = 0, r = c.length; n < r; n++)t.associations.set(c[n], { meshes: e, primitives: n }); if (c.length === 1) return i.extensions && Tg(r, c[0], i), c[0]; let l = new Is; i.extensions && Tg(r, l, i), t.associations.set(l, { meshes: e }); for (let e = 0, t = c.length; e < t; e++)l.add(c[e]); return l }) } loadCamera(e) { let t, n = this.json.cameras[e], r = n[n.type]; if (!r) { console.warn(`THREE.GLTFLoader: Missing camera parameters.`); return } return n.type === `perspective` ? t = new Od(Bo.radToDeg(r.yfov), r.aspectRatio || 1, r.znear || 1, r.zfar || 2e6) : n.type === `orthographic` && (t = new Nd(-r.xmag, r.xmag, r.ymag, -r.ymag, r.znear, r.zfar)), n.name && (t.name = this.createUniqueName(n.name)), Eg(t, n), Promise.resolve(t) } loadSkin(e) { let t = this.json.skins[e], n = []; for (let e = 0, r = t.joints.length; e < r; e++)n.push(this._loadNodeShallow(t.joints[e])); return t.inverseBindMatrices === void 0 ? n.push(null) : n.push(this.getDependency(`accessor`, t.inverseBindMatrices)), Promise.all(n).then(function (e) { let n = e.pop(), r = e, i = [], a = []; for (let e = 0, o = r.length; e < o; e++) { let o = r[e]; if (o) { i.push(o); let t = new Y; n !== null && t.fromArray(n.array, e * 16), a.push(t) } else console.warn(`THREE.GLTFLoader: Joint "%s" could not be found.`, t.joints[e]) } return new Ml(i, a) }) } loadAnimation(e) { let t = this.json, n = this, r = t.animations[e], i = r.name ? r.name : `animation_` + e, a = [], o = [], s = [], c = [], l = []; for (let e = 0, t = r.channels.length; e < t; e++) { let t = r.channels[e], n = r.samplers[t.sampler], i = t.target, u = i.node, d = r.parameters === void 0 ? n.input : r.parameters[n.input], f = r.parameters === void 0 ? n.output : r.parameters[n.output]; i.node !== void 0 && (a.push(this.getDependency(`node`, u)), o.push(this.getDependency(`accessor`, d)), s.push(this.getDependency(`accessor`, f)), c.push(n), l.push(i)) } return Promise.all([Promise.all(a), Promise.all(o), Promise.all(s), Promise.all(c), Promise.all(l)]).then(function (e) { let t = e[0], a = e[1], o = e[2], s = e[3], c = e[4], l = []; for (let e = 0, r = t.length; e < r; e++) { let r = t[e], i = a[e], u = o[e], d = s[e], f = c[e]; if (r === void 0) continue; r.updateMatrix && r.updateMatrix(); let p = n._createAnimationTracks(r, i, u, d, f); if (p) for (let e = 0; e < p.length; e++)l.push(p[e]) } let u = new td(i, void 0, l); return Eg(u, r), u }) } createNodeMesh(e) { let t = this.json, n = this, r = t.nodes[e]; return r.mesh === void 0 ? null : n.getDependency(`mesh`, r.mesh).then(function (e) { let t = n._getNodeRef(n.meshCache, r.mesh, e); return r.weights !== void 0 && t.traverse(function (e) { if (e.isMesh) for (let t = 0, n = r.weights.length; t < n; t++)e.morphTargetInfluences[t] = r.weights[t] }), t }) } loadNode(e) { let t = this.json, n = this, r = t.nodes[e], i = n._loadNodeShallow(e), a = [], o = r.children || []; for (let e = 0, t = o.length; e < t; e++)a.push(n.getDependency(`node`, o[e])); let s = r.skin === void 0 ? Promise.resolve(null) : n.getDependency(`skin`, r.skin); return Promise.all([i, Promise.all(a), s]).then(function (e) { let t = e[0], n = e[1], r = e[2]; r !== null && t.traverse(function (e) { e.isSkinnedMesh && e.bind(r, Ng) }); for (let e = 0, r = n.length; e < r; e++)t.add(n[e]); if (t.userData.pivot !== void 0 && n.length > 0) { let e = t.userData.pivot, r = n[0]; t.pivot = new K().fromArray(e), t.position.x -= e[0], t.position.y -= e[1], t.position.z -= e[2], r.position.set(0, 0, 0), delete t.userData.pivot } return t }) } _loadNodeShallow(e) { let t = this.json, n = this.extensions, r = this; if (this.nodeCache[e] !== void 0) return this.nodeCache[e]; let i = t.nodes[e], a = i.name ? r.createUniqueName(i.name) : ``, o = [], s = r._invokeOne(function (t) { return t.createNodeMesh && t.createNodeMesh(e) }); return s && o.push(s), i.camera !== void 0 && o.push(r.getDependency(`camera`, i.camera).then(function (e) { return r._getNodeRef(r.cameraCache, i.camera, e) })), r._invokeAll(function (t) { return t.createNodeAttachment && t.createNodeAttachment(e) }).forEach(function (e) { o.push(e) }), this.nodeCache[e] = Promise.all(o).then(function (t) { let o; if (o = i.isBone === !0 ? new Ol : t.length > 1 ? new Is : t.length === 1 ? t[0] : new Fs, o !== t[0]) for (let e = 0, n = t.length; e < n; e++)o.add(t[e]); if (i.name && (o.userData.name = i.name, o.name = a), Eg(o, i), i.extensions && Tg(n, o, i), i.matrix !== void 0) { let e = new Y; e.fromArray(i.matrix), o.applyMatrix4(e) } else i.translation !== void 0 && o.position.fromArray(i.translation), i.rotation !== void 0 && o.quaternion.fromArray(i.rotation), i.scale !== void 0 && o.scale.fromArray(i.scale); if (!r.associations.has(o)) r.associations.set(o, {}); else if (i.mesh !== void 0 && r.meshCache.refs[i.mesh] > 1) { let e = r.associations.get(o); r.associations.set(o, { ...e }) } return r.associations.get(o).nodes = e, o }), this.nodeCache[e] } loadScene(e) { let t = this.extensions, n = this.json.scenes[e], r = this, i = new Is; n.name && (i.name = r.createUniqueName(n.name)), Eg(i, n), n.extensions && Tg(t, i, n); let a = n.nodes || [], o = []; for (let e = 0, t = a.length; e < t; e++)o.push(r.getDependency(`node`, a[e])); return Promise.all(o).then(function (e) { for (let t = 0, n = e.length; t < n; t++) { let n = e[t]; n.parent === null ? i.add(n) : i.add(Ih(n)) } return r.associations = (e => { let t = new Map; for (let [e, n] of r.associations) (e instanceof Jc || e instanceof rs) && t.set(e, n); return e.traverse(e => { let n = r.associations.get(e); n != null && t.set(e, n) }), t })(i), i }) } _createAnimationTracks(e, t, n, r, i) { let a = [], o = e.name ? e.name : e.uuid, s = []; function c(e) { e.morphTargetInfluences && s.push(e.name ? e.name : e.uuid) } xg[i.path] === xg.weights ? (c(e), e.isGroup && e.children.forEach(c)) : s.push(o); let l; switch (xg[i.path]) { case xg.weights: l = Xu; break; case xg.rotation: l = Qu; break; case xg.translation: case xg.scale: l = ed; break; default: switch (n.itemSize) { case 1: l = Xu; break; default: l = ed; break }break }let u = r.interpolation === void 0 ? Ba : Sg[r.interpolation], d = this._getArrayFromAccessor(n); for (let e = 0, n = s.length; e < n; e++) { let n = new l(s[e] + `.` + xg[i.path], t.array, d, u); r.interpolation === `CUBICSPLINE` && this._createCubicSplineTrackInterpolant(n), a.push(n) } return a } _getArrayFromAccessor(e) { let t = e.array; if (e.normalized) { let e = jg(t.constructor), n = new Float32Array(t.length); for (let r = 0, i = t.length; r < i; r++)n[r] = t[r] * e; t = n } return t } _createCubicSplineTrackInterpolant(e) { e.createInterpolant = function (e) { return new (this instanceof Qu ? mg : fg)(this.times, this.values, this.getValueSize() / 3, e) }, e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0 } }; function Fg(e, t, n) { let r = t.attributes, i = new ac; if (r.POSITION !== void 0) { let e = n.json.accessors[r.POSITION], t = e.min, a = e.max; if (t !== void 0 && a !== void 0) { if (i.set(new K(t[0], t[1], t[2]), new K(a[0], a[1], a[2])), e.normalized) { let t = jg(gg[e.componentType]); i.min.multiplyScalar(t), i.max.multiplyScalar(t) } } else { console.warn(`THREE.GLTFLoader: Missing min/max properties for accessor POSITION.`); return } } else return; let a = t.targets; if (a !== void 0) { let e = new K, t = new K; for (let r = 0, i = a.length; r < i; r++) { let i = a[r]; if (i.POSITION !== void 0) { let r = n.json.accessors[i.POSITION], a = r.min, o = r.max; if (a !== void 0 && o !== void 0) { if (t.setX(Math.max(Math.abs(a[0]), Math.abs(o[0]))), t.setY(Math.max(Math.abs(a[1]), Math.abs(o[1]))), t.setZ(Math.max(Math.abs(a[2]), Math.abs(o[2]))), r.normalized) { let e = jg(gg[r.componentType]); t.multiplyScalar(e) } e.max(t) } else console.warn(`THREE.GLTFLoader: Missing min/max properties for accessor POSITION.`) } } i.expandByVector(e) } e.boundingBox = i; let o = new Fc; i.getCenter(o.center), o.radius = i.min.distanceTo(i.max) / 2, e.boundingSphere = o } function Ig(e, t, n) { let r = t.attributes, i = []; function a(t, r) { return n.getDependency(`accessor`, t).then(function (t) { e.setAttribute(r, t) }) } for (let t in r) { let n = bg[t] || t.toLowerCase(); n in e.attributes || i.push(a(r[t], n)) } if (t.indices !== void 0 && !e.index) { let r = n.getDependency(`accessor`, t.indices).then(function (t) { e.setIndex(t) }); i.push(r) } return J.workingColorSpace !== `srgb-linear` && `COLOR_0` in r && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${J.workingColorSpace}" not supported.`), Eg(e, t), Fg(e, t, n), Promise.all(i).then(function () { return t.targets === void 0 ? e : Dg(e, t.targets, n) }) } var Lg = new WeakMap, Rg = class extends cd {
	constructor(e) { super(e), this.decoderPath = ``, this.decoderConfig = {}, this.decoderBinary = null, this.decoderPending = null, this.workerLimit = 4, this.workerPool = [], this.workerNextTaskID = 1, this.workerSourceURL = ``, this.defaultAttributeIDs = { position: `POSITION`, normal: `NORMAL`, color: `COLOR`, uv: `TEX_COORD` }, this.defaultAttributeTypes = { position: `Float32Array`, normal: `Float32Array`, color: `Float32Array`, uv: `Float32Array` } } setDecoderPath(e) { return this.decoderPath = e, this } setDecoderConfig(e) { return this.decoderConfig = e, this } setWorkerLimit(e) { return this.workerLimit = e, this } load(e, t, n, r) { let i = new dd(this.manager); i.setPath(this.path), i.setResponseType(`arraybuffer`), i.setRequestHeader(this.requestHeader), i.setWithCredentials(this.withCredentials), i.load(e, e => { this.parse(e, t, r) }, n, r) } parse(e, t, n = () => { }) { this.decodeDracoFile(e, t, null, null, Ya, n).catch(n) } decodeDracoFile(e, t, n, r, i = Xa, a = () => { }) { let o = { attributeIDs: n || this.defaultAttributeIDs, attributeTypes: r || this.defaultAttributeTypes, useUniqueIDs: !!n, vertexColorSpace: i }; return this.decodeGeometry(e, o).then(t).catch(a) } decodeGeometry(e, t) { let n = JSON.stringify(t); if (Lg.has(e)) { let t = Lg.get(e); if (t.key === n) return t.promise; if (e.byteLength === 0) throw Error(`THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.`) } let r, i = this.workerNextTaskID++, a = e.byteLength, o = this._getWorker(i, a).then(n => (r = n, new Promise((n, a) => { r._callbacks[i] = { resolve: n, reject: a }, r.postMessage({ type: `decode`, id: i, taskConfig: t, buffer: e }, [e]) }))).then(e => this._createGeometry(e.geometry)); return o.catch(() => !0).then(() => { r && i && this._releaseTask(r, i) }), Lg.set(e, { key: n, promise: o }), o } _createGeometry(e) { let t = new Uc; e.index && t.setIndex(new Oc(e.index.array, 1)); for (let n = 0; n < e.attributes.length; n++) { let { name: r, array: i, itemSize: a, stride: o, vertexColorSpace: s } = e.attributes[n], c; c = a === o ? new Oc(i, a) : new Kc(new Wc(i, o), a, 0), r === `color` && (this._assignVertexColorSpace(c, s), c.normalized = !(i instanceof Float32Array)), t.setAttribute(r, c) } return t } _assignVertexColorSpace(e, t) { if (t !== `srgb`) return; let n = new X; for (let t = 0, r = e.count; t < r; t++)n.fromBufferAttribute(e, t), J.colorSpaceToWorking(n, Ya), e.setXYZ(t, n.r, n.g, n.b) } _loadLibrary(e, t) { let n = new dd(this.manager); return n.setPath(this.decoderPath), n.setResponseType(t), n.setWithCredentials(this.withCredentials), new Promise((t, r) => { n.load(e, t, void 0, r) }) } preload() { return this._initDecoder(), this } _initDecoder() {
		if (this.decoderPending) return this.decoderPending; let e = typeof WebAssembly != `object` || this.decoderConfig.type === `js`, t = []; return e ? t.push(this._loadLibrary(`draco_decoder.js`, `text`)) : (t.push(this._loadLibrary(`draco_wasm_wrapper.js`, `text`)), t.push(this._loadLibrary(`draco_decoder.wasm`, `arraybuffer`))), this.decoderPending = Promise.all(t).then(t => {
			let n = t[0]; e || (this.decoderConfig.wasmBinary = t[1]); let r = zg.toString(), i = [`/* draco decoder */`, n, ``, `/* worker */`, r.substring(r.indexOf(`{`) + 1, r.lastIndexOf(`}`))].join(`
`); this.workerSourceURL = URL.createObjectURL(new Blob([i]))
		}), this.decoderPending
	} _getWorker(e, t) { return this._initDecoder().then(() => { if (this.workerPool.length < this.workerLimit) { let e = new Worker(this.workerSourceURL); e._callbacks = {}, e._taskCosts = {}, e._taskLoad = 0, e.postMessage({ type: `init`, decoderConfig: this.decoderConfig }), e.onmessage = function (t) { let n = t.data; switch (n.type) { case `decode`: e._callbacks[n.id].resolve(n); break; case `error`: e._callbacks[n.id].reject(n); break; default: console.error(`THREE.DRACOLoader: Unexpected message, "` + n.type + `"`) } }, this.workerPool.push(e) } else this.workerPool.sort(function (e, t) { return e._taskLoad > t._taskLoad ? -1 : 1 }); let n = this.workerPool[this.workerPool.length - 1]; return n._taskCosts[e] = t, n._taskLoad += t, n }) } _releaseTask(e, t) { e._taskLoad -= e._taskCosts[t], delete e._callbacks[t], delete e._taskCosts[t] } debug() { console.log(`Task load: `, this.workerPool.map(e => e._taskLoad)) } dispose() { for (let e = 0; e < this.workerPool.length; ++e)this.workerPool[e].terminate(); return this.workerPool.length = 0, this.workerSourceURL !== `` && URL.revokeObjectURL(this.workerSourceURL), this }
}; function zg() { let e, t; onmessage = function (r) { let i = r.data; switch (i.type) { case `init`: e = i.decoderConfig, t = new Promise(function (t) { e.onModuleLoaded = function (e) { t({ draco: e }) }, DracoDecoderModule(e) }); break; case `decode`: let r = i.buffer, a = i.taskConfig; t.then(e => { let t = e.draco, o = new t.Decoder; try { let e = n(t, o, new Int8Array(r), a), s = e.attributes.map(e => e.array.buffer); e.index && s.push(e.index.array.buffer), self.postMessage({ type: `decode`, id: i.id, geometry: e }, s) } catch (e) { console.error(e), self.postMessage({ type: `error`, id: i.id, error: e.message }) } finally { t.destroy(o) } }); break } }; function n(e, t, n, a) { let o = a.attributeIDs, s = a.attributeTypes, c, l, u = t.GetEncodedGeometryType(n); if (u === e.TRIANGULAR_MESH) c = new e.Mesh, l = t.DecodeArrayToMesh(n, n.byteLength, c); else if (u === e.POINT_CLOUD) c = new e.PointCloud, l = t.DecodeArrayToPointCloud(n, n.byteLength, c); else throw Error(`THREE.DRACOLoader: Unexpected geometry type.`); if (!l.ok() || c.ptr === 0) throw Error(`THREE.DRACOLoader: Decoding failed: ` + l.error_msg()); let d = { index: null, attributes: [] }; for (let n in o) { let r = self[s[n]], l, u; if (a.useUniqueIDs) u = o[n], l = t.GetAttributeByUniqueId(c, u); else { if (u = t.GetAttributeId(c, e[o[n]]), u === -1) continue; l = t.GetAttribute(c, u) } let f = i(e, t, c, n, r, l); n === `color` && (f.vertexColorSpace = a.vertexColorSpace), d.attributes.push(f) } return u === e.TRIANGULAR_MESH && (d.index = r(e, t, c)), e.destroy(c), d } function r(e, t, n) { let r = n.num_faces() * 3, i = r * 4, a = e._malloc(i); t.GetTrianglesUInt32Array(n, i, a); let o = new Uint32Array(e.HEAPF32.buffer, a, r).slice(); return e._free(a), { array: o, itemSize: 1 } } function i(e, t, n, r, i, o) { let s = n.num_points(), c = o.num_components(), l = a(e, i), u = c * i.BYTES_PER_ELEMENT, d = Math.ceil(u / 4) * 4, f = d / i.BYTES_PER_ELEMENT, p = s * u, m = s * d, h = e._malloc(p); t.GetAttributeDataArrayForAllPoints(n, o, l, p, h); let g = new i(e.HEAPF32.buffer, h, p / i.BYTES_PER_ELEMENT), _; if (u === d) _ = g.slice(); else { _ = new i(m / i.BYTES_PER_ELEMENT); let e = 0; for (let t = 0, n = g.length; t < n; t++) { for (let n = 0; n < c; n++)_[e + n] = g[t * c + n]; e += f } } return e._free(h), { name: r, count: s, itemSize: c, array: _, stride: f } } function a(e, t) { switch (t) { case Float32Array: return e.DT_FLOAT32; case Int8Array: return e.DT_INT8; case Int16Array: return e.DT_INT16; case Int32Array: return e.DT_INT32; case Uint8Array: return e.DT_UINT8; case Uint16Array: return e.DT_UINT16; case Uint32Array: return e.DT_UINT32 } } } var Bg = class extends md {
	constructor(e) { super(e), this.type = zi } parse(e) {
		let t = function (e, t) { switch (e) { case 1: throw Error(`THREE.HDRLoader: Read Error: ` + (t || ``)); case 2: throw Error(`THREE.HDRLoader: Write Error: ` + (t || ``)); case 3: throw Error(`THREE.HDRLoader: Bad File Format: ` + (t || ``)); default: case 4: throw Error(`THREE.HDRLoader: Memory Error: ` + (t || ``)) } }, n = function (e, t, n) {
			t ||= 1024; let r = e.pos, i = -1, a = 0, o = ``, s = String.fromCharCode.apply(null, new Uint16Array(e.subarray(r, r + 128))); for (; 0 > (i = s.indexOf(`
`)) && a < t && r < e.byteLength;)o += s, a += s.length, r += 128, s = String.fromCharCode.apply(null, new Uint16Array(e.subarray(r, r + 128))); return -1 < i ? (!1 !== n && (e.pos += a + i + 1), o + s.slice(0, i)) : !1
		}, r = function (e) {
			let r = /^#\?(\S+)/, i = /^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/, a = /^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/, o = /^\s*FORMAT=(\S+)\s*$/, s = /^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/, c = { valid: 0, string: ``, comments: ``, programtype: `RGBE`, format: ``, gamma: 1, exposure: 1, width: 0, height: 0 }, l, u; for ((e.pos >= e.byteLength || !(l = n(e))) && t(1, `no header found`), (u = l.match(r)) || t(3, `bad initial token`), c.valid |= 1, c.programtype = u[1], c.string += l + `
`; l = n(e), !1 !== l;) {
				if (c.string += l + `
`, l.charAt(0) === `#`) {
					c.comments += l + `
`; continue
				} if ((u = l.match(i)) && (c.gamma = parseFloat(u[1])), (u = l.match(a)) && (c.exposure = parseFloat(u[1])), (u = l.match(o)) && (c.valid |= 2, c.format = u[1]), (u = l.match(s)) && (c.valid |= 4, c.height = parseInt(u[1], 10), c.width = parseInt(u[2], 10)), c.valid & 2 && c.valid & 4) break
			} return c.valid & 2 || t(3, `missing format specifier`), c.valid & 4 || t(3, `missing image size specifier`), c
		}, i = function (e, n, r) { let i = n; if (i < 8 || i > 32767 || e[0] !== 2 || e[1] !== 2 || e[2] & 128) return new Uint8Array(e); i !== (e[2] << 8 | e[3]) && t(3, `wrong scanline width`); let a = new Uint8Array(4 * n * r); a.length || t(4, `unable to allocate buffer space`); let o = 0, s = 0, c = 4 * i, l = new Uint8Array(4), u = new Uint8Array(c), d = r; for (; d > 0 && s < e.byteLength;) { s + 4 > e.byteLength && t(1), l[0] = e[s++], l[1] = e[s++], l[2] = e[s++], l[3] = e[s++], (l[0] != 2 || l[1] != 2 || (l[2] << 8 | l[3]) != i) && t(3, `bad rgbe scanline format`); let n = 0, r; for (; n < c && s < e.byteLength;) { r = e[s++]; let i = r > 128; if (i && (r -= 128), (r === 0 || n + r > c) && t(3, `bad scanline data`), i) { let t = e[s++]; for (let e = 0; e < r; e++)u[n++] = t } else u.set(e.subarray(s, s + r), n), n += r, s += r } let f = i; for (let e = 0; e < f; e++) { let t = 0; a[o] = u[e + t], t += i, a[o + 1] = u[e + t], t += i, a[o + 2] = u[e + t], t += i, a[o + 3] = u[e + t], o += 4 } d-- } return a }, a = function (e, t, n, r) { let i = 2 ** (e[t + 3] - 128) / 255; n[r + 0] = e[t + 0] * i, n[r + 1] = e[t + 1] * i, n[r + 2] = e[t + 2] * i, n[r + 3] = 1 }, o = function (e, t, n, r) { let i = 2 ** (e[t + 3] - 128) / 255; n[r + 0] = wc.toHalfFloat(Math.min(e[t + 0] * i, 65504)), n[r + 1] = wc.toHalfFloat(Math.min(e[t + 1] * i, 65504)), n[r + 2] = wc.toHalfFloat(Math.min(e[t + 2] * i, 65504)), n[r + 3] = wc.toHalfFloat(1) }, s = new Uint8Array(e); s.pos = 0; let c = r(s), l = c.width, u = c.height, d = i(s.subarray(s.pos), l, u), f, p, m; switch (this.type) { case Ri: m = d.length / 4; let e = new Float32Array(m * 4); for (let t = 0; t < m; t++)a(d, t * 4, e, t * 4); f = e, p = Ri; break; case zi: m = d.length / 4; let t = new Uint16Array(m * 4); for (let e = 0; e < m; e++)o(d, e * 4, t, e * 4); f = t, p = zi; break; default: throw Error(`THREE.HDRLoader: Unsupported type: ` + this.type) }return { width: l, height: u, data: f, header: c.string, gamma: c.gamma, exposure: c.exposure, type: p }
	} setDataType(e) { return this.type = e, this } load(e, t, n, r) { function i(e, n) { switch (e.type) { case Ri: case zi: e.colorSpace = Xa, e.minFilter = ki, e.magFilter = ki, e.generateMipmaps = !1, e.flipY = !0; break }t && t(e, n) } return super.load(e, i, n, r) }
}, Vg = {
	name: `CopyShader`, uniforms: { tDiffuse: { value: null }, opacity: { value: 1 } }, vertexShader: `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`, fragmentShader: `

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`}, Hg = class { constructor() { this.isPass = !0, this.enabled = !0, this.needsSwap = !0, this.clear = !1, this.renderToScreen = !1 } setSize() { } render() { console.error(`THREE.Pass: .render() must be implemented in derived pass.`) } dispose() { } }, Ug = new Nd(-1, 1, 1, -1, 0, 1), Wg = new class extends Uc { constructor() { super(), this.setAttribute(`position`, new jc([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)), this.setAttribute(`uv`, new jc([0, 2, 0, 0, 2, 0], 2)) } }, Gg = class { constructor(e) { this._mesh = new hl(Wg, e) } dispose() { this._mesh.geometry.dispose() } render(e) { e.render(this._mesh, Ug) } get material() { return this._mesh.material } set material(e) { this._mesh.material = e } }, Kg = class extends Hg { constructor(e, t = `tDiffuse`) { super(), this.textureID = t, this.uniforms = null, this.material = null, e instanceof Mu ? (this.uniforms = e.uniforms, this.material = e) : e && (this.uniforms = ku.clone(e.uniforms), this.material = new Mu({ name: e.name === void 0 ? `unspecified` : e.name, defines: Object.assign({}, e.defines), uniforms: this.uniforms, vertexShader: e.vertexShader, fragmentShader: e.fragmentShader })), this._fsQuad = new Gg(this.material) } render(e, t, n) { this.uniforms[this.textureID] && (this.uniforms[this.textureID].value = n.texture), this._fsQuad.material = this.material, this.renderToScreen ? (e.setRenderTarget(null), this._fsQuad.render(e)) : (e.setRenderTarget(t), this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), this._fsQuad.render(e)) } dispose() { this.material.dispose(), this._fsQuad.dispose() } }, qg = class extends Hg { constructor(e, t) { super(), this.scene = e, this.camera = t, this.clear = !0, this.needsSwap = !1, this.inverse = !1 } render(e, t, n) { let r = e.getContext(), i = e.state; i.buffers.color.setMask(!1), i.buffers.depth.setMask(!1), i.buffers.color.setLocked(!0), i.buffers.depth.setLocked(!0); let a, o; this.inverse ? (a = 0, o = 1) : (a = 1, o = 0), i.buffers.stencil.setTest(!0), i.buffers.stencil.setOp(r.REPLACE, r.REPLACE, r.REPLACE), i.buffers.stencil.setFunc(r.ALWAYS, a, 4294967295), i.buffers.stencil.setClear(o), i.buffers.stencil.setLocked(!0), e.setRenderTarget(n), this.clear && e.clear(), e.render(this.scene, this.camera), e.setRenderTarget(t), this.clear && e.clear(), e.render(this.scene, this.camera), i.buffers.color.setLocked(!1), i.buffers.depth.setLocked(!1), i.buffers.color.setMask(!0), i.buffers.depth.setMask(!0), i.buffers.stencil.setLocked(!1), i.buffers.stencil.setFunc(r.EQUAL, 1, 4294967295), i.buffers.stencil.setOp(r.KEEP, r.KEEP, r.KEEP), i.buffers.stencil.setLocked(!0) } }, Jg = class extends Hg { constructor() { super(), this.needsSwap = !1 } render(e) { e.state.buffers.stencil.setLocked(!1), e.state.buffers.stencil.setTest(!1) } }, Yg = class { constructor(e, t) { if (this.renderer = e, this._pixelRatio = e.getPixelRatio(), t === void 0) { let n = e.getSize(new G); this._width = n.width, this._height = n.height, t = new os(this._width * this._pixelRatio, this._height * this._pixelRatio, { type: zi }), t.texture.name = `EffectComposer.rt1` } else this._width = t.width, this._height = t.height; this.renderTarget1 = t, this.renderTarget2 = t.clone(), this.renderTarget2.texture.name = `EffectComposer.rt2`, this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2, this.renderToScreen = !0, this.passes = [], this.copyPass = new Kg(Vg), this.copyPass.material.blending = 0, this.timer = new Wd } swapBuffers() { let e = this.readBuffer; this.readBuffer = this.writeBuffer, this.writeBuffer = e } addPass(e) { this.passes.push(e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio) } insertPass(e, t) { this.passes.splice(t, 0, e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio) } removePass(e) { let t = this.passes.indexOf(e); t !== -1 && this.passes.splice(t, 1) } isLastEnabledPass(e) { for (let t = e + 1; t < this.passes.length; t++)if (this.passes[t].enabled) return !1; return !0 } render(e) { this.timer.update(), e === void 0 && (e = this.timer.getDelta()); let t = this.renderer.getRenderTarget(), n = !1; for (let t = 0, r = this.passes.length; t < r; t++) { let r = this.passes[t]; if (r.enabled !== !1) { if (r.renderToScreen = this.renderToScreen && this.isLastEnabledPass(t), r.render(this.renderer, this.writeBuffer, this.readBuffer, e, n), r.needsSwap) { if (n) { let t = this.renderer.getContext(), n = this.renderer.state.buffers.stencil; n.setFunc(t.NOTEQUAL, 1, 4294967295), this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, e), n.setFunc(t.EQUAL, 1, 4294967295) } this.swapBuffers() } qg !== void 0 && (r instanceof qg ? n = !0 : r instanceof Jg && (n = !1)) } } this.renderer.setRenderTarget(t) } reset(e) { if (e === void 0) { let t = this.renderer.getSize(new G); this._pixelRatio = this.renderer.getPixelRatio(), this._width = t.width, this._height = t.height, e = this.renderTarget1.clone(), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio) } this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.renderTarget1 = e, this.renderTarget2 = e.clone(), this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2 } setSize(e, t) { this._width = e, this._height = t; let n = this._width * this._pixelRatio, r = this._height * this._pixelRatio; this.renderTarget1.setSize(n, r), this.renderTarget2.setSize(n, r); for (let e = 0; e < this.passes.length; e++)this.passes[e].setSize(n, r) } setPixelRatio(e) { this._pixelRatio = e, this.setSize(this._width, this._height) } dispose() { this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.copyPass.dispose() } }, Xg = class extends Hg { constructor(e, t, n = null, r = null, i = null) { super(), this.scene = e, this.camera = t, this.overrideMaterial = n, this.clearColor = r, this.clearAlpha = i, this.clear = !0, this.clearDepth = !1, this.needsSwap = !1, this.isRenderPass = !0, this._oldClearColor = new X } render(e, t, n) { let r = e.autoClear; e.autoClear = !1; let i, a; this.overrideMaterial !== null && (a = this.scene.overrideMaterial, this.scene.overrideMaterial = this.overrideMaterial), this.clearColor !== null && (e.getClearColor(this._oldClearColor), e.setClearColor(this.clearColor, e.getClearAlpha())), this.clearAlpha !== null && (i = e.getClearAlpha(), e.setClearAlpha(this.clearAlpha)), this.clearDepth == 1 && e.clearDepth(), e.setRenderTarget(this.renderToScreen ? null : n), this.clear === !0 && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), e.render(this.scene, this.camera), this.clearColor !== null && e.setClearColor(this._oldClearColor), this.clearAlpha !== null && e.setClearAlpha(i), this.overrideMaterial !== null && (this.scene.overrideMaterial = a), e.autoClear = r } }, Zg = {
		name: `LuminosityHighPassShader`, uniforms: { tDiffuse: { value: null }, luminosityThreshold: { value: 1 }, smoothWidth: { value: 1 }, defaultColor: { value: new X(0) }, defaultOpacity: { value: 0 } }, vertexShader: `

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`, fragmentShader: `

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`}, Qg = class e extends Hg {
		constructor(e, t = 1, n, r) { super(), this.strength = t, this.radius = n, this.threshold = r, this.resolution = e === void 0 ? new G(256, 256) : new G(e.x, e.y), this.clearColor = new X(0, 0, 0), this.needsSwap = !1, this.renderTargetsHorizontal = [], this.renderTargetsVertical = [], this.nMips = 5; let i = Math.round(this.resolution.x / 2), a = Math.round(this.resolution.y / 2); this.renderTargetBright = new os(i, a, { type: zi }), this.renderTargetBright.texture.name = `UnrealBloomPass.bright`, this.renderTargetBright.texture.generateMipmaps = !1; for (let e = 0; e < this.nMips; e++) { let t = new os(i, a, { type: zi }); t.texture.name = `UnrealBloomPass.h` + e, t.texture.generateMipmaps = !1, this.renderTargetsHorizontal.push(t); let n = new os(i, a, { type: zi }); n.texture.name = `UnrealBloomPass.v` + e, n.texture.generateMipmaps = !1, this.renderTargetsVertical.push(n), i = Math.round(i / 2), a = Math.round(a / 2) } let o = Zg; this.highPassUniforms = ku.clone(o.uniforms), this.highPassUniforms.luminosityThreshold.value = r, this.highPassUniforms.smoothWidth.value = .01, this.materialHighPassFilter = new Mu({ uniforms: this.highPassUniforms, vertexShader: o.vertexShader, fragmentShader: o.fragmentShader }), this.separableBlurMaterials = []; let s = [6, 10, 14, 18, 22]; i = Math.round(this.resolution.x / 2), a = Math.round(this.resolution.y / 2); for (let e = 0; e < this.nMips; e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(s[e])), this.separableBlurMaterials[e].uniforms.invSize.value = new G(1 / i, 1 / a), i = Math.round(i / 2), a = Math.round(a / 2); this.compositeMaterial = this._getCompositeMaterial(this.nMips), this.compositeMaterial.uniforms.blurTexture1.value = this.renderTargetsVertical[0].texture, this.compositeMaterial.uniforms.blurTexture2.value = this.renderTargetsVertical[1].texture, this.compositeMaterial.uniforms.blurTexture3.value = this.renderTargetsVertical[2].texture, this.compositeMaterial.uniforms.blurTexture4.value = this.renderTargetsVertical[3].texture, this.compositeMaterial.uniforms.blurTexture5.value = this.renderTargetsVertical[4].texture, this.compositeMaterial.uniforms.bloomStrength.value = t, this.compositeMaterial.uniforms.bloomRadius.value = .1; let c = [1, .8, .6, .4, .2]; this.compositeMaterial.uniforms.bloomFactors.value = c, this.bloomTintColors = [new K(1, 1, 1), new K(1, 1, 1), new K(1, 1, 1), new K(1, 1, 1), new K(1, 1, 1)], this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors, this.copyUniforms = ku.clone(Vg.uniforms), this.blendMaterial = new Mu({ uniforms: this.copyUniforms, vertexShader: Vg.vertexShader, fragmentShader: Vg.fragmentShader, premultipliedAlpha: !0, blending: 2, depthTest: !1, depthWrite: !1, transparent: !0 }), this._oldClearColor = new X, this._oldClearAlpha = 1, this._basic = new rl, this._fsQuad = new Gg(null) } dispose() { for (let e = 0; e < this.renderTargetsHorizontal.length; e++)this.renderTargetsHorizontal[e].dispose(); for (let e = 0; e < this.renderTargetsVertical.length; e++)this.renderTargetsVertical[e].dispose(); this.renderTargetBright.dispose(); for (let e = 0; e < this.separableBlurMaterials.length; e++)this.separableBlurMaterials[e].dispose(); this.compositeMaterial.dispose(), this.blendMaterial.dispose(), this._basic.dispose(), this._fsQuad.dispose() } setSize(e, t) { let n = Math.round(e / 2), r = Math.round(t / 2); this.renderTargetBright.setSize(n, r); for (let e = 0; e < this.nMips; e++)this.renderTargetsHorizontal[e].setSize(n, r), this.renderTargetsVertical[e].setSize(n, r), this.separableBlurMaterials[e].uniforms.invSize.value = new G(1 / n, 1 / r), n = Math.round(n / 2), r = Math.round(r / 2) } render(t, n, r, i, a) { t.getClearColor(this._oldClearColor), this._oldClearAlpha = t.getClearAlpha(); let o = t.autoClear; t.autoClear = !1, t.setClearColor(this.clearColor, 0), a && t.state.buffers.stencil.setTest(!1), this.renderToScreen && (this._fsQuad.material = this._basic, this._basic.map = r.texture, t.setRenderTarget(null), t.clear(), this._fsQuad.render(t)), this.highPassUniforms.tDiffuse.value = r.texture, this.highPassUniforms.luminosityThreshold.value = this.threshold, this._fsQuad.material = this.materialHighPassFilter, t.setRenderTarget(this.renderTargetBright), t.clear(), this._fsQuad.render(t); let s = this.renderTargetBright; for (let n = 0; n < this.nMips; n++)this._fsQuad.material = this.separableBlurMaterials[n], this.separableBlurMaterials[n].uniforms.colorTexture.value = s.texture, this.separableBlurMaterials[n].uniforms.direction.value = e.BlurDirectionX, t.setRenderTarget(this.renderTargetsHorizontal[n]), t.clear(), this._fsQuad.render(t), this.separableBlurMaterials[n].uniforms.colorTexture.value = this.renderTargetsHorizontal[n].texture, this.separableBlurMaterials[n].uniforms.direction.value = e.BlurDirectionY, t.setRenderTarget(this.renderTargetsVertical[n]), t.clear(), this._fsQuad.render(t), s = this.renderTargetsVertical[n]; this._fsQuad.material = this.compositeMaterial, this.compositeMaterial.uniforms.bloomStrength.value = this.strength, this.compositeMaterial.uniforms.bloomRadius.value = this.radius, this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors, t.setRenderTarget(this.renderTargetsHorizontal[0]), t.clear(), this._fsQuad.render(t), this._fsQuad.material = this.blendMaterial, this.copyUniforms.tDiffuse.value = this.renderTargetsHorizontal[0].texture, a && t.state.buffers.stencil.setTest(!0), this.renderToScreen ? (t.setRenderTarget(null), this._fsQuad.render(t)) : (t.setRenderTarget(r), this._fsQuad.render(t)), t.setClearColor(this._oldClearColor, this._oldClearAlpha), t.autoClear = o } _getSeparableBlurMaterial(e) {
			let t = [], n = e / 3; for (let r = 0; r < e; r++)t.push(.39894 * Math.exp(-.5 * r * r / (n * n)) / n); return new Mu({
				defines: { KERNEL_RADIUS: e }, uniforms: { colorTexture: { value: null }, invSize: { value: new G(.5, .5) }, direction: { value: new G(.5, .5) }, gaussianCoefficients: { value: t } }, vertexShader: `

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`, fragmentShader: `

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})
		} _getCompositeMaterial(e) {
			return new Mu({
				defines: { NUM_MIPS: e }, uniforms: { blurTexture1: { value: null }, blurTexture2: { value: null }, blurTexture3: { value: null }, blurTexture4: { value: null }, blurTexture5: { value: null }, bloomStrength: { value: 1 }, bloomFactors: { value: null }, bloomTintColors: { value: null }, bloomRadius: { value: 0 } }, vertexShader: `

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`, fragmentShader: `

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})
		}
	}; Qg.BlurDirectionX = new G(1, 0), Qg.BlurDirectionY = new G(0, 1); var $g = 1.25, e_ = 65535, t_ = e_ << 16, n_ = 2 ** -24, r_ = Symbol(`SKIP_GENERATION`), i_ = { strategy: 0, maxDepth: 40, maxLeafSize: 10, useSharedArrayBuffer: !1, setBoundingBox: !0, onProgress: null, indirect: !1, verbose: !0, range: null, [r_]: !1 }; function a_(e, t, n) { return n.min.x = t[e], n.min.y = t[e + 1], n.min.z = t[e + 2], n.max.x = t[e + 3], n.max.y = t[e + 4], n.max.z = t[e + 5], n } function o_(e) { let t = -1, n = -1 / 0; for (let r = 0; r < 3; r++) { let i = e[r + 3] - e[r]; i > n && (n = i, t = r) } return t } function s_(e, t) { t.set(e) } function c_(e, t, n) { let r, i; for (let a = 0; a < 3; a++) { let o = a + 3; r = e[a], i = t[a], n[a] = r < i ? r : i, r = e[o], i = t[o], n[o] = r > i ? r : i } } function l_(e, t, n) { for (let r = 0; r < 3; r++) { let i = t[e + 2 * r], a = t[e + 2 * r + 1], o = i - a, s = i + a; o < n[r] && (n[r] = o), s > n[r + 3] && (n[r + 3] = s) } } function u_(e) { let t = e[3] - e[0], n = e[4] - e[1], r = e[5] - e[2]; return 2 * (t * n + n * r + r * t) } function d_(e, t) { return t[e + 15] === e_ } function f_(e, t) { return t[e + 6] } function p_(e, t) { return t[e + 14] } function m_(e) { return e + 8 } function h_(e, t) { return e + t[e + 6] * 8 } function g_(e, t) { return t[e + 7] } function __(e) { return e } function v_(e, t, n, r, i) { let a = 1 / 0, o = 1 / 0, s = 1 / 0, c = -1 / 0, l = -1 / 0, u = -1 / 0, d = 1 / 0, f = 1 / 0, p = 1 / 0, m = -1 / 0, h = -1 / 0, g = -1 / 0, _ = e.offset || 0; for (let r = (t - _) * 6, i = (t + n - _) * 6; r < i; r += 6) { let t = e[r + 0], n = e[r + 1], i = t - n, _ = t + n; i < a && (a = i), _ > c && (c = _), t < d && (d = t), t > m && (m = t); let v = e[r + 2], y = e[r + 3], b = v - y, x = v + y; b < o && (o = b), x > l && (l = x), v < f && (f = v), v > h && (h = v); let S = e[r + 4], C = e[r + 5], w = S - C, T = S + C; w < s && (s = w), T > u && (u = T), S < p && (p = S), S > g && (g = S) } r[0] = a, r[1] = o, r[2] = s, r[3] = c, r[4] = l, r[5] = u, i[0] = d, i[1] = f, i[2] = p, i[3] = m, i[4] = h, i[5] = g } var y_ = 32, b_ = (e, t) => e.candidate - t.candidate, x_ = Array(y_).fill().map(() => ({ count: 0, bounds: new Float32Array(6), rightCacheBounds: new Float32Array(6), leftCacheBounds: new Float32Array(6), candidate: 0 })), S_ = new Float32Array(6); function C_(e, t, n, r, i, a) { let o = -1, s = 0; if (a === 0) o = o_(t), o !== -1 && (s = (t[o] + t[o + 3]) / 2); else if (a === 1) o = o_(e), o !== -1 && (s = w_(n, r, i, o)); else if (a === 2) { let a = u_(e), c = $g * i, l = n.offset || 0, u = (r - l) * 6, d = (r + i - l) * 6; for (let e = 0; e < 3; e++) { let r = t[e], l = (t[e + 3] - r) / y_; if (i < y_ / 4) { let t = [...x_]; t.length = i; let r = 0; for (let i = u; i < d; i += 6, r++) { let a = t[r]; a.candidate = n[i + 2 * e], a.count = 0; let { bounds: o, leftCacheBounds: s, rightCacheBounds: c } = a; for (let e = 0; e < 3; e++)c[e] = 1 / 0, c[e + 3] = -1 / 0, s[e] = 1 / 0, s[e + 3] = -1 / 0, o[e] = 1 / 0, o[e + 3] = -1 / 0; l_(i, n, o) } t.sort(b_); let l = i; for (let e = 0; e < l; e++) { let n = t[e]; for (; e + 1 < l && t[e + 1].candidate === n.candidate;)t.splice(e + 1, 1), l-- } for (let r = u; r < d; r += 6) { let i = n[r + 2 * e]; for (let e = 0; e < l; e++) { let a = t[e]; i >= a.candidate ? l_(r, n, a.rightCacheBounds) : (l_(r, n, a.leftCacheBounds), a.count++) } } for (let n = 0; n < l; n++) { let r = t[n], l = r.count, u = i - r.count, d = r.leftCacheBounds, f = r.rightCacheBounds, p = 0; l !== 0 && (p = u_(d) / a); let m = 0; u !== 0 && (m = u_(f) / a); let h = 1 + $g * (p * l + m * u); h < c && (o = e, c = h, s = r.candidate) } } else { for (let e = 0; e < y_; e++) { let t = x_[e]; t.count = 0, t.candidate = r + l + e * l; let n = t.bounds; for (let e = 0; e < 3; e++)n[e] = 1 / 0, n[e + 3] = -1 / 0 } for (let t = u; t < d; t += 6) { let i = ~~((n[t + 2 * e] - r) / l); i >= y_ && (i = y_ - 1); let a = x_[i]; a.count++, l_(t, n, a.bounds) } let t = x_[y_ - 1]; s_(t.bounds, t.rightCacheBounds); for (let e = y_ - 2; e >= 0; e--) { let t = x_[e], n = x_[e + 1]; c_(t.bounds, n.rightCacheBounds, t.rightCacheBounds) } let f = 0; for (let t = 0; t < y_ - 1; t++) { let n = x_[t], r = n.count, l = n.bounds, u = x_[t + 1].rightCacheBounds; r !== 0 && (f === 0 ? s_(l, S_) : c_(l, S_, S_)), f += r; let d = 0, p = 0; f !== 0 && (d = u_(S_) / a); let m = i - f; m !== 0 && (p = u_(u) / a); let h = 1 + $g * (d * f + p * m); h < c && (o = e, c = h, s = n.candidate) } } } } else console.warn(`BVH: Invalid build strategy value ${a} used.`); return { axis: o, pos: s } } function w_(e, t, n, r) { let i = 0, a = e.offset; for (let o = t, s = t + n; o < s; o++)i += e[(o - a) * 6 + r * 2]; return i / n } var T_ = class { constructor() { this.boundingData = new Float32Array(6) } }; function E_(e, t, n, r, i, a) { let o = r, s = r + i - 1, c = a.pos, l = a.axis * 2, u = n.offset || 0; for (; ;) { for (; o <= s && n[(o - u) * 6 + l] < c;)o++; for (; o <= s && n[(s - u) * 6 + l] >= c;)s--; if (o < s) { for (let n = 0; n < t; n++) { let r = e[o * t + n]; e[o * t + n] = e[s * t + n], e[s * t + n] = r } for (let e = 0; e < 6; e++) { let t = o - u, r = s - u, i = n[t * 6 + e]; n[t * 6 + e] = n[r * 6 + e], n[r * 6 + e] = i } o++, s-- } else return o } } var D_, O_, k_, A_, j_ = 2 ** 32; function M_(e) { return `count` in e ? 1 : 1 + M_(e.left) + M_(e.right) } function N_(e, t, n) { return D_ = new Float32Array(n), O_ = new Uint32Array(n), k_ = new Uint16Array(n), A_ = new Uint8Array(n), P_(e, t) } function P_(e, t) { let n = e / 4, r = e / 2, i = `count` in t, a = t.boundingData; for (let e = 0; e < 6; e++)D_[n + e] = a[e]; if (i) return t.buffer ? (A_.set(new Uint8Array(t.buffer), e), e + t.buffer.byteLength) : (O_[n + 6] = t.offset, k_[r + 14] = t.count, k_[r + 15] = e_, e + 32); { let { left: r, right: i, splitAxis: a } = t, o = P_(e + 32, r), s = e / 32, c = o / 32 - s; if (c > j_) throw Error(`MeshBVH: Cannot store relative child node offset greater than 32 bits.`); return O_[n + 6] = c, O_[n + 7] = a, P_(o, i) } } function F_(e, t, n, r, i, a) { let { maxDepth: o, verbose: s, maxLeafSize: c, strategy: l, onProgress: u } = i, d = e.primitiveBuffer, f = e.primitiveBufferStride, p = new Float32Array(6), m = !1, h = new T_; return v_(t, n, r, h.boundingData, p), _(h, n, r, p), h; function g(e) { u && u((e - a.offset) / a.count) } function _(e, n, r, i = null, a = 0) { if (!m && a >= o && (m = !0, s && console.warn(`BVH: Max depth of ${o} reached when generating BVH. Consider increasing maxDepth.`)), r <= c || a >= o) return g(n + r), e.offset = n, e.count = r, e; let u = C_(e.boundingData, i, t, n, r, l); if (u.axis === -1) return g(n + r), e.offset = n, e.count = r, e; let h = E_(d, f, t, n, r, u); if (h === n || h === n + r) g(n + r), e.offset = n, e.count = r; else { e.splitAxis = u.axis; let i = new T_, o = n, s = h - n; e.left = i, v_(t, o, s, i.boundingData, p), _(i, o, s, p, a + 1); let c = new T_, l = h, d = r - s; e.right = c, v_(t, l, d, c.boundingData, p), _(c, l, d, p, a + 1) } return e } } function I_(e, t) { let n = t.useSharedArrayBuffer ? SharedArrayBuffer : ArrayBuffer, r = e.getRootRanges(t.range), i = r[0], a = r[r.length - 1], o = { offset: i.offset, count: a.offset + a.count - i.offset }, s = new Float32Array(6 * o.count); s.offset = o.offset, e.computePrimitiveBounds(o.offset, o.count, s), e._roots = r.map(r => { let i = F_(e, s, r.offset, r.count, t, o), a = new n(32 * M_(i)); return N_(0, i, a), a }) } var L_ = class { constructor(e) { this._getNewPrimitive = e, this._primitives = [] } getPrimitive() { let e = this._primitives; return e.length === 0 ? this._getNewPrimitive() : e.pop() } releasePrimitive(e) { this._primitives.push(e) } }, R_ = new class { constructor() { this.float32Array = null, this.uint16Array = null, this.uint32Array = null; let e = [], t = null; this.setBuffer = n => { t && e.push(t), t = n, this.float32Array = new Float32Array(n), this.uint16Array = new Uint16Array(n), this.uint32Array = new Uint32Array(n) }, this.clearBuffer = () => { t = null, this.float32Array = null, this.uint16Array = null, this.uint32Array = null, e.length !== 0 && this.setBuffer(e.pop()) } } }, z_, B_, V_ = [], H_ = new L_(() => new ac); function U_(e, t, n, r, i, a) { z_ = H_.getPrimitive(), B_ = H_.getPrimitive(), V_.push(z_, B_), R_.setBuffer(e._roots[t]); let o = W_(0, e.geometry, n, r, i, a); R_.clearBuffer(), H_.releasePrimitive(z_), H_.releasePrimitive(B_), V_.pop(), V_.pop(); let s = V_.length; return s > 0 && (B_ = V_[s - 1], z_ = V_[s - 2]), o } function W_(e, t, n, r, i = null, a = 0, o = 0) { let { float32Array: s, uint16Array: c, uint32Array: l } = R_, u = e * 2; if (d_(u, c)) { let t = f_(e, l), n = p_(u, c); return a_(__(e), s, z_), r(t, n, !1, o, a + e / 8, z_) } else { let u = m_(e), d = h_(e, l), f = u, p = d, m, h, g, _; if (i && (g = z_, _ = B_, a_(__(f), s, g), a_(__(p), s, _), m = i(g), h = i(_), h < m)) { f = d, p = u; let e = m; m = h, h = e, g = _ } g || (g = z_, a_(__(f), s, g)); let v = d_(f * 2, c), y = n(g, v, m, o + 1, a + f / 8), b; if (y === 2) { let e = w(f); b = r(e, T(f) - e, !0, o + 1, a + f / 8, g) } else b = y && W_(f, t, n, r, i, a, o + 1); if (b) return !0; _ = B_, a_(__(p), s, _); let x = d_(p * 2, c), S = n(_, x, h, o + 1, a + p / 8), C; if (S === 2) { let e = w(p); C = r(e, T(p) - e, !0, o + 1, a + p / 8, _) } else C = S && W_(p, t, n, r, i, a, o + 1); if (C) return !0; return !1; function w(e) { let { uint16Array: t, uint32Array: n } = R_, r = e * 2; for (; !d_(r, t);)e = m_(e), r = e * 2; return f_(e, n) } function T(e) { let { uint16Array: t, uint32Array: n } = R_, r = e * 2; for (; !d_(r, t);)e = h_(e, n), r = e * 2; return f_(e, n) + p_(r, t) } } } var G_ = new R_.constructor, K_ = new R_.constructor, q_ = new L_(() => new ac), J_ = new ac, Y_ = new ac, X_ = new ac, Z_ = new ac, Q_ = !1; function $_(e, t, n, r) { if (Q_) throw Error(`MeshBVH: Recursive calls to bvhcast not supported.`); Q_ = !0; let i = e._roots, a = t._roots, o, s = 0, c = 0, l = new Y().copy(n).invert(); for (let e = 0, t = i.length; e < t; e++) { G_.setBuffer(i[e]), c = 0; let t = q_.getPrimitive(); a_(__(0), G_.float32Array, t), t.applyMatrix4(l); for (let e = 0, i = a.length; e < i && (K_.setBuffer(a[e]), o = ev(0, 0, n, l, r, s, c, 0, 0, t), K_.clearBuffer(), c += a[e].byteLength / 32, !o); e++); if (q_.releasePrimitive(t), G_.clearBuffer(), s += i[e].byteLength / 32, o) break } return Q_ = !1, o } function ev(e, t, n, r, i, a = 0, o = 0, s = 0, c = 0, l = null, u = !1) { let d, f; u ? (d = K_, f = G_) : (d = G_, f = K_); let p = d.float32Array, m = d.uint32Array, h = d.uint16Array, g = f.float32Array, _ = f.uint32Array, v = f.uint16Array, y = e * 2, b = t * 2, x = d_(y, h), S = d_(b, v), C = !1; if (S && x) C = u ? i(f_(t, _), p_(t * 2, v), f_(e, m), p_(e * 2, h), c, o + t / 8, s, a + e / 8) : i(f_(e, m), p_(e * 2, h), f_(t, _), p_(t * 2, v), s, a + e / 8, c, o + t / 8); else if (S) { let l = q_.getPrimitive(); a_(__(t), g, l), l.applyMatrix4(n); let d = m_(e), f = h_(e, m); a_(__(d), p, J_), a_(__(f), p, Y_); let h = l.intersectsBox(J_), _ = l.intersectsBox(Y_); C = h && ev(t, d, r, n, i, o, a, c, s + 1, l, !u) || _ && ev(t, f, r, n, i, o, a, c, s + 1, l, !u), q_.releasePrimitive(l) } else { let d = m_(t), f = h_(t, _); a_(__(d), g, X_), a_(__(f), g, Z_); let h = l.intersectsBox(X_), v = l.intersectsBox(Z_); if (h && v) C = ev(e, d, n, r, i, a, o, s, c + 1, l, u) || ev(e, f, n, r, i, a, o, s, c + 1, l, u); else if (h) if (x) C = ev(e, d, n, r, i, a, o, s, c + 1, l, u); else { let t = q_.getPrimitive(); t.copy(X_).applyMatrix4(n); let l = m_(e), f = h_(e, m); a_(__(l), p, J_), a_(__(f), p, Y_); let h = t.intersectsBox(J_), g = t.intersectsBox(Y_); C = h && ev(d, l, r, n, i, o, a, c, s + 1, t, !u) || g && ev(d, f, r, n, i, o, a, c, s + 1, t, !u), q_.releasePrimitive(t) } else if (v) if (x) C = ev(e, f, n, r, i, a, o, s, c + 1, l, u); else { let t = q_.getPrimitive(); t.copy(Z_).applyMatrix4(n); let l = m_(e), d = h_(e, m); a_(__(l), p, J_), a_(__(d), p, Y_); let h = t.intersectsBox(J_), g = t.intersectsBox(Y_); C = h && ev(f, l, r, n, i, o, a, c, s + 1, t, !u) || g && ev(f, d, r, n, i, o, a, c, s + 1, t, !u), q_.releasePrimitive(t) } } return C } var tv = new ac, nv = new Float32Array(6), rv = class { constructor() { this._roots = null, this.primitiveBuffer = null, this.primitiveBufferStride = null } init(e) { e = { ...i_, ...e }, I_(this, e) } getRootRanges() { throw Error(`BVH: getRootRanges() not implemented`) } writePrimitiveBounds() { throw Error(`BVH: writePrimitiveBounds() not implemented`) } writePrimitiveRangeBounds(e, t, n, r) { let i = 1 / 0, a = 1 / 0, o = 1 / 0, s = -1 / 0, c = -1 / 0, l = -1 / 0; for (let n = e, r = e + t; n < r; n++) { this.writePrimitiveBounds(n, nv, 0); let [e, t, r, u, d, f] = nv; e < i && (i = e), u > s && (s = u), t < a && (a = t), d > c && (c = d), r < o && (o = r), f > l && (l = f) } return n[r + 0] = i, n[r + 1] = a, n[r + 2] = o, n[r + 3] = s, n[r + 4] = c, n[r + 5] = l, n } computePrimitiveBounds(e, t, n) { let r = n.offset || 0; for (let i = e, a = e + t; i < a; i++) { this.writePrimitiveBounds(i, nv, 0); let [e, t, a, o, s, c] = nv, l = (e + o) / 2, u = (t + s) / 2, d = (a + c) / 2, f = (o - e) / 2, p = (s - t) / 2, m = (c - a) / 2, h = (i - r) * 6; n[h + 0] = l, n[h + 1] = f + (Math.abs(l) + f) * n_, n[h + 2] = u, n[h + 3] = p + (Math.abs(u) + p) * n_, n[h + 4] = d, n[h + 5] = m + (Math.abs(d) + m) * n_ } return n } shiftPrimitiveOffsets(e) { let t = this._indirectBuffer; if (t) for (let n = 0, r = t.length; n < r; n++)t[n] += e; else { let t = this._roots; for (let n = 0; n < t.length; n++) { let r = t[n], i = new Uint32Array(r), a = new Uint16Array(r), o = r.byteLength / 32; for (let t = 0; t < o; t++) { let n = 8 * t; d_(2 * n, a) && (i[n + 6] += e) } } } } traverse(e, t = 0) { let n = this._roots[t], r = new Uint32Array(n), i = new Uint16Array(n); a(0); function a(t, o = 0) { let s = t * 2, c = d_(s, i); if (c) { let a = r[t + 6], l = i[s + 14]; e(o, c, new Float32Array(n, t * 4, 6), a, l) } else { let i = m_(t), s = h_(t, r), l = g_(t, r); e(o, c, new Float32Array(n, t * 4, 6), l) || (a(i, o + 1), a(s, o + 1)) } } } refit() { let e = this._roots; for (let t = 0, n = e.length; t < n; t++) { let n = e[t], r = new Uint32Array(n), i = new Uint16Array(n), a = new Float32Array(n), o = n.byteLength / 32; for (let e = o - 1; e >= 0; e--) { let t = e * 8, n = t * 2; if (d_(n, i)) { let e = f_(t, r), o = p_(n, i); this.writePrimitiveRangeBounds(e, o, nv, 0), a.set(nv, t) } else { let e = m_(t), n = h_(t, r); for (let r = 0; r < 3; r++) { let i = a[e + r], o = a[e + r + 3], s = a[n + r], c = a[n + r + 3]; a[t + r] = i < s ? i : s, a[t + r + 3] = o > c ? o : c } } } } } getBoundingBox(e) { return e.makeEmpty(), this._roots.forEach(t => { a_(0, new Float32Array(t), tv), e.union(tv) }), e } shapecast(e) { let { boundsTraverseOrder: t, intersectsBounds: n, intersectsRange: r, intersectsPrimitive: i, scratchPrimitive: a, iterate: o } = e; if (r && i) { let e = r; r = (t, n, r, s, c) => e(t, n, r, s, c) ? !0 : o(t, n, this, i, r, s, a) } else r ||= i ? (e, t, n, r) => o(e, t, this, i, n, r, a) : (e, t, n) => n; let s = !1, c = 0, l = this._roots; for (let e = 0, i = l.length; e < i; e++) { let i = l[e]; if (s = U_(this, e, n, r, t, c), s) break; c += i.byteLength / 32 } return s } bvhcast(e, t, n) { let { intersectsRanges: r } = n; return $_(this, e, t, r) } }; function iv() { return typeof SharedArrayBuffer < `u` } function av(e) { return e.index ? e.index.count : e.attributes.position.count } function ov(e) { return av(e) / 3 } function sv(e, t = ArrayBuffer) { return e > 65535 ? new Uint32Array(new t(4 * e)) : new Uint16Array(new t(2 * e)) } function cv(e, t) { if (!e.index) { let n = e.attributes.position.count, r = sv(n, t.useSharedArrayBuffer ? SharedArrayBuffer : ArrayBuffer); e.setIndex(new Oc(r, 1)); for (let e = 0; e < n; e++)r[e] = e } } function lv(e, t, n) { let r = av(e) / n, i = t || e.drawRange, a = i.start / n, o = (i.start + i.count) / n, s = Math.max(0, a), c = Math.min(r, o) - s; return { offset: Math.floor(s), count: Math.floor(c) } } function uv(e, t) { return e.groups.map(e => ({ offset: e.start / t, count: e.count / t })) } function dv(e, t, n) { let r = lv(e, t, n), i = uv(e, n); if (!i.length) return [r]; let a = [], o = r.offset, s = r.offset + r.count, c = av(e) / n, l = []; for (let e of i) { let { offset: t, count: n } = e, r = t, i = t + (isFinite(n) ? n : c - t); r < s && i > o && (l.push({ pos: Math.max(o, r), isStart: !0 }), l.push({ pos: Math.min(s, i), isStart: !1 })) } l.sort((e, t) => e.pos === t.pos ? e.type === `end` ? -1 : 1 : e.pos - t.pos); let u = 0, d = null; for (let e of l) { let t = e.pos; u !== 0 && t !== d && a.push({ offset: d, count: t - d }), u += e.isStart ? 1 : -1, d = t } return a } function fv(e, t) { let n = e[e.length - 1], r = n.offset + n.count > 2 ** 16, i = e.reduce((e, t) => e + t.count, 0), a = r ? 4 : 2, o = t ? new SharedArrayBuffer(i * a) : new ArrayBuffer(i * a), s = r ? new Uint32Array(o) : new Uint16Array(o), c = 0; for (let t = 0; t < e.length; t++) { let { offset: n, count: r } = e[t]; for (let e = 0; e < r; e++)s[c + e] = n + e; c += r } return s } var pv = class extends rv { get indirect() { return !!this._indirectBuffer } get primitiveStride() { return null } get primitiveBufferStride() { return this.indirect ? 1 : this.primitiveStride } set primitiveBufferStride(e) { } get primitiveBuffer() { return this.indirect ? this._indirectBuffer : this.geometry.index.array } set primitiveBuffer(e) { } constructor(e, t = {}) { if (!e.isBufferGeometry) throw Error(`BVH: Only BufferGeometries are supported.`); if (e.index && e.index.isInterleavedBufferAttribute) throw Error(`BVH: InterleavedBufferAttribute is not supported for the index attribute.`); if (t.useSharedArrayBuffer && !iv()) throw Error(`BVH: SharedArrayBuffer is not available.`); super(), this.geometry = e, this.resolvePrimitiveIndex = t.indirect ? e => this._indirectBuffer[e] : e => e, this.primitiveBuffer = null, this.primitiveBufferStride = null, this._indirectBuffer = null, t = { ...i_, ...t }, t[r_] || this.init(t) } init(e) { let { geometry: t, primitiveStride: n } = this; if (e.indirect) { let r = fv(dv(t, e.range, n), e.useSharedArrayBuffer); this._indirectBuffer = r } else cv(t, e); super.init(e), !t.boundingBox && e.setBoundingBox && (t.boundingBox = this.getBoundingBox(new ac)) } getRootRanges(e) { return this.indirect ? [{ offset: 0, count: this._indirectBuffer.length }] : dv(this.geometry, e, this.primitiveStride) } raycastObject3D() { throw Error(`BVH: raycastObject3D() not implemented`) } }, mv = class { constructor() { this.min = 1 / 0, this.max = -1 / 0 } setFromPointsField(e, t) { let n = 1 / 0, r = -1 / 0; for (let i = 0, a = e.length; i < a; i++) { let a = e[i][t]; n = a < n ? a : n, r = a > r ? a : r } this.min = n, this.max = r } setFromPoints(e, t) { let n = 1 / 0, r = -1 / 0; for (let i = 0, a = t.length; i < a; i++) { let a = t[i], o = e.dot(a); n = o < n ? o : n, r = o > r ? o : r } this.min = n, this.max = r } isSeparated(e) { return this.min > e.max || e.min > this.max } }; mv.prototype.setFromBox = (function () { let e = new K; return function (t, n) { let r = n.min, i = n.max, a = 1 / 0, o = -1 / 0; for (let n = 0; n <= 1; n++)for (let s = 0; s <= 1; s++)for (let c = 0; c <= 1; c++) { e.x = r.x * n + i.x * (1 - n), e.y = r.y * s + i.y * (1 - s), e.z = r.z * c + i.z * (1 - c); let l = t.dot(e); a = Math.min(l, a), o = Math.max(l, o) } this.min = a, this.max = o } })(), (function () { let e = new mv; return function (t, n) { let r = t.points, i = t.satAxes, a = t.satBounds, o = n.points, s = n.satAxes, c = n.satBounds; for (let t = 0; t < 3; t++) { let n = a[t], r = i[t]; if (e.setFromPoints(r, o), n.isSeparated(e)) return !1 } for (let t = 0; t < 3; t++) { let n = c[t], i = s[t]; if (e.setFromPoints(i, r), n.isSeparated(e)) return !1 } } })(); var hv = (function () { let e = new K, t = new K, n = new K; return function (r, i, a) { let o = r.start, s = e, c = i.start, l = t; n.subVectors(o, c), e.subVectors(r.end, r.start), t.subVectors(i.end, i.start); let u = n.dot(l), d = l.dot(s), f = l.dot(l), p = n.dot(s), m = s.dot(s) * f - d * d, h, g; h = m === 0 ? 0 : (u * d - p * f) / m, g = (u + h * d) / f, a.x = h, a.y = g } })(), gv = (function () { let e = new G, t = new K, n = new K; return function (r, i, a, o) { hv(r, i, e); let s = e.x, c = e.y; if (s >= 0 && s <= 1 && c >= 0 && c <= 1) { r.at(s, a), i.at(c, o); return } else if (s >= 0 && s <= 1) { c < 0 ? i.at(0, o) : i.at(1, o), r.closestPointToPoint(o, !0, a); return } else if (c >= 0 && c <= 1) { s < 0 ? r.at(0, a) : r.at(1, a), i.closestPointToPoint(a, !0, o); return } else { let e; e = s < 0 ? r.start : r.end; let l; l = c < 0 ? i.start : i.end; let u = t, d = n; if (r.closestPointToPoint(l, !0, t), i.closestPointToPoint(e, !0, n), u.distanceToSquared(l) <= d.distanceToSquared(e)) { a.copy(u), o.copy(l); return } else { a.copy(e), o.copy(d); return } } } })(), _v = (function () { let e = new K, t = new K, n = new Gl, r = new gf; return function (i, a) { let { radius: o, center: s } = i, { a: c, b: l, c: u } = a; if (r.start = c, r.end = l, r.closestPointToPoint(s, !0, e).distanceTo(s) <= o || (r.start = c, r.end = u, r.closestPointToPoint(s, !0, e).distanceTo(s) <= o) || (r.start = l, r.end = u, r.closestPointToPoint(s, !0, e).distanceTo(s) <= o)) return !0; let d = a.getPlane(n); if (Math.abs(d.distanceToPoint(s)) <= o) { let e = d.projectPoint(s, t); if (a.containsPoint(e)) return !0 } return !1 } })(), vv = [`x`, `y`, `z`], yv = 1e-15, bv = yv * yv; function xv(e) { return Math.abs(e) < yv } var Sv = class extends ic { constructor(...e) { super(...e), this.isExtendedTriangle = !0, this.satAxes = [, , , ,].fill().map(() => new K), this.satBounds = [, , , ,].fill().map(() => new mv), this.points = [this.a, this.b, this.c], this.plane = new Gl, this.isDegenerateIntoSegment = !1, this.isDegenerateIntoPoint = !1, this.degenerateSegment = new gf, this.needsUpdate = !0 } intersectsSphere(e) { return _v(e, this) } update() { let e = this.a, t = this.b, n = this.c, r = this.points, i = this.satAxes, a = this.satBounds, o = i[0], s = a[0]; this.getNormal(o), s.setFromPoints(o, r); let c = i[1], l = a[1]; c.subVectors(e, t), l.setFromPoints(c, r); let u = i[2], d = a[2]; u.subVectors(t, n), d.setFromPoints(u, r); let f = i[3], p = a[3]; f.subVectors(n, e), p.setFromPoints(f, r); let m = c.length(), h = u.length(), g = f.length(); this.isDegenerateIntoPoint = !1, this.isDegenerateIntoSegment = !1, m < yv ? h < yv || g < yv ? this.isDegenerateIntoPoint = !0 : (this.isDegenerateIntoSegment = !0, this.degenerateSegment.start.copy(e), this.degenerateSegment.end.copy(n)) : h < yv ? g < yv ? this.isDegenerateIntoPoint = !0 : (this.isDegenerateIntoSegment = !0, this.degenerateSegment.start.copy(t), this.degenerateSegment.end.copy(e)) : g < yv && (this.isDegenerateIntoSegment = !0, this.degenerateSegment.start.copy(n), this.degenerateSegment.end.copy(t)), this.plane.setFromNormalAndCoplanarPoint(o, e), this.needsUpdate = !1 } }; Sv.prototype.closestPointToSegment = (function () { let e = new K, t = new K, n = new gf; return function (r, i = null, a = null) { let { start: o, end: s } = r, c = this.points, l, u = 1 / 0; for (let o = 0; o < 3; o++) { let s = (o + 1) % 3; n.start.copy(c[o]), n.end.copy(c[s]), gv(n, r, e, t), l = e.distanceToSquared(t), l < u && (u = l, i && i.copy(e), a && a.copy(t)) } return this.closestPointToPoint(o, e), l = o.distanceToSquared(e), l < u && (u = l, i && i.copy(e), a && a.copy(o)), this.closestPointToPoint(s, e), l = s.distanceToSquared(e), l < u && (u = l, i && i.copy(e), a && a.copy(s)), Math.sqrt(u) } })(), Sv.prototype.intersectsTriangle = (function () { let e = new Sv, t = new mv, n = new mv, r = new K, i = new K, a = new K, o = new K, s = new gf, c = new gf, l = new K, u = new G, d = new G; function f(e, i, a, s) { let c = r; !e.isDegenerateIntoPoint && !e.isDegenerateIntoSegment ? c.copy(e.plane.normal) : c.copy(i.plane.normal); let l = e.satBounds, u = e.satAxes; for (let r = 1; r < 4; r++) { let a = l[r], s = u[r]; if (t.setFromPoints(s, i.points), a.isSeparated(t) || (o.copy(c).cross(s), t.setFromPoints(o, e.points), n.setFromPoints(o, i.points), t.isSeparated(n))) return !1 } let d = i.satBounds, f = i.satAxes; for (let r = 1; r < 4; r++) { let a = d[r], s = f[r]; if (t.setFromPoints(s, e.points), a.isSeparated(t) || (o.crossVectors(c, s), t.setFromPoints(o, e.points), n.setFromPoints(o, i.points), t.isSeparated(n))) return !1 } return a && (s || console.warn(`ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0.`), a.start.set(0, 0, 0), a.end.set(0, 0, 0)), !0 } function p(e, t, n, r, i, a, o, s, c, l, u) { let d = o / (o - s); l.x = r + (i - r) * d, u.start.subVectors(t, e).multiplyScalar(d).add(e), d = o / (o - c), l.y = r + (a - r) * d, u.end.subVectors(n, e).multiplyScalar(d).add(e) } function m(e, t, n, r, i, a, o, s, c, l, u) { if (i > 0) p(e.c, e.a, e.b, r, t, n, c, o, s, l, u); else if (a > 0) p(e.b, e.a, e.c, n, t, r, s, o, c, l, u); else if (s * c > 0 || o != 0) p(e.a, e.b, e.c, t, n, r, o, s, c, l, u); else if (s != 0) p(e.b, e.a, e.c, n, t, r, s, o, c, l, u); else if (c != 0) p(e.c, e.a, e.b, r, t, n, c, o, s, l, u); else return !0; return !1 } function h(e, t, n, i) { let a = t.degenerateSegment, o = e.plane.distanceToPoint(a.start), s = e.plane.distanceToPoint(a.end); return xv(o) ? xv(s) ? f(e, t, n, i) : (n && (n.start.copy(a.start), n.end.copy(a.start)), e.containsPoint(a.start)) : xv(s) ? (n && (n.start.copy(a.end), n.end.copy(a.end)), e.containsPoint(a.end)) : e.plane.intersectLine(a, r) == null ? !1 : (n && (n.start.copy(r), n.end.copy(r)), e.containsPoint(r)) } function g(e, t, n) { let r = t.a; return xv(e.plane.distanceToPoint(r)) && e.containsPoint(r) ? (n && (n.start.copy(r), n.end.copy(r)), !0) : !1 } function _(e, t, n) { let i = e.degenerateSegment, a = t.a; return i.closestPointToPoint(a, !0, r), a.distanceToSquared(r) < bv ? (n && (n.start.copy(a), n.end.copy(a)), !0) : !1 } function v(e, t, n, o) { if (e.isDegenerateIntoSegment) if (t.isDegenerateIntoSegment) { let o = e.degenerateSegment, s = t.degenerateSegment, c = i, l = a; o.delta(c), s.delta(l); let u = r.subVectors(s.start, o.start), d = c.x * l.y - c.y * l.x; if (xv(d)) return !1; let f = (u.x * l.y - u.y * l.x) / d, p = -(c.x * u.y - c.y * u.x) / d; return f < 0 || f > 1 || p < 0 || p > 1 ? !1 : xv(o.start.z + c.z * f - (s.start.z + l.z * p)) ? (n && (n.start.copy(o.start).addScaledVector(c, f), n.end.copy(o.start).addScaledVector(c, f)), !0) : !1 } else if (t.isDegenerateIntoPoint) return _(e, t, n); else return h(t, e, n, o); else if (e.isDegenerateIntoPoint) return t.isDegenerateIntoPoint ? t.a.distanceToSquared(e.a) < bv ? (n && (n.start.copy(e.a), n.end.copy(e.a)), !0) : !1 : t.isDegenerateIntoSegment ? _(t, e, n) : g(t, e, n); else if (t.isDegenerateIntoPoint) return g(e, t, n); else if (t.isDegenerateIntoSegment) return h(e, t, n, o) } return function (t, n = null, r = !1) { this.needsUpdate && this.update(), t.isExtendedTriangle ? t.needsUpdate && t.update() : (e.copy(t), e.update(), t = e); let o = v(this, t, n, r); if (o !== void 0) return o; let p = this.plane, h = t.plane, g = h.distanceToPoint(this.a), _ = h.distanceToPoint(this.b), y = h.distanceToPoint(this.c); xv(g) && (g = 0), xv(_) && (_ = 0), xv(y) && (y = 0); let b = g * _, x = g * y; if (b > 0 && x > 0) return !1; let S = p.distanceToPoint(t.a), C = p.distanceToPoint(t.b), w = p.distanceToPoint(t.c); xv(S) && (S = 0), xv(C) && (C = 0), xv(w) && (w = 0); let T = S * C, E = S * w; if (T > 0 && E > 0) return !1; i.copy(p.normal), a.copy(h.normal); let D = i.cross(a), O = 0, k = Math.abs(D.x), A = Math.abs(D.y); A > k && (k = A, O = 1), Math.abs(D.z) > k && (O = 2); let j = vv[O], M = this.a[j], N = this.b[j], P = this.c[j], F = t.a[j], I = t.b[j], ee = t.c[j]; if (m(this, M, N, P, b, x, g, _, y, u, s) || m(t, F, I, ee, T, E, S, C, w, d, c)) return f(this, t, n, r); if (u.y < u.x) { let e = u.y; u.y = u.x, u.x = e, l.copy(s.start), s.start.copy(s.end), s.end.copy(l) } if (d.y < d.x) { let e = d.y; d.y = d.x, d.x = e, l.copy(c.start), c.start.copy(c.end), c.end.copy(l) } return u.y < d.x || d.y < u.x ? !1 : (n && (d.x > u.x ? n.start.copy(c.start) : n.start.copy(s.start), d.y < u.y ? n.end.copy(c.end) : n.end.copy(s.end)), !0) } })(), Sv.prototype.distanceToPoint = (function () { let e = new K; return function (t) { return this.closestPointToPoint(t, e), t.distanceTo(e) } })(), Sv.prototype.distanceToTriangle = (function () { let e = new K, t = new K, n = [`a`, `b`, `c`], r = new gf, i = new gf; return function (a, o = null, s = null) { let c = o || s ? r : null; if (this.intersectsTriangle(a, c)) return (o || s) && (o && c.getCenter(o), s && c.getCenter(s)), 0; let l = 1 / 0; for (let t = 0; t < 3; t++) { let r, i = n[t], c = a[i]; this.closestPointToPoint(c, e), r = c.distanceToSquared(e), r < l && (l = r, o && o.copy(e), s && s.copy(c)); let u = this[i]; a.closestPointToPoint(u, e), r = u.distanceToSquared(e), r < l && (l = r, o && o.copy(u), s && s.copy(e)) } for (let c = 0; c < 3; c++) { let u = n[c], d = n[(c + 1) % 3]; r.set(this[u], this[d]); for (let c = 0; c < 3; c++) { let u = n[c], d = n[(c + 1) % 3]; i.set(a[u], a[d]), gv(r, i, e, t); let f = e.distanceToSquared(t); f < l && (l = f, o && o.copy(e), s && s.copy(t)) } } return Math.sqrt(l) } })(); var Cv = class { constructor(e, t, n) { this.isOrientedBox = !0, this.min = new K, this.max = new K, this.matrix = new Y, this.invMatrix = new Y, this.points = Array(8).fill().map(() => new K), this.satAxes = [, , ,].fill().map(() => new K), this.satBounds = [, , ,].fill().map(() => new mv), this.alignedSatBounds = [, , ,].fill().map(() => new mv), this.needsUpdate = !1, e && this.min.copy(e), t && this.max.copy(t), n && this.matrix.copy(n) } set(e, t, n) { this.min.copy(e), this.max.copy(t), this.matrix.copy(n), this.needsUpdate = !0 } copy(e) { this.min.copy(e.min), this.max.copy(e.max), this.matrix.copy(e.matrix), this.needsUpdate = !0 } }; Cv.prototype.update = (function () { return function () { let e = this.matrix, t = this.min, n = this.max, r = this.points; for (let i = 0; i <= 1; i++)for (let a = 0; a <= 1; a++)for (let o = 0; o <= 1; o++) { let s = r[1 * i | 2 * a | 4 * o]; s.x = i ? n.x : t.x, s.y = a ? n.y : t.y, s.z = o ? n.z : t.z, s.applyMatrix4(e) } let i = this.satBounds, a = this.satAxes, o = r[0]; for (let e = 0; e < 3; e++) { let t = a[e], n = i[e], s = r[1 << e]; t.subVectors(o, s), n.setFromPoints(t, r) } let s = this.alignedSatBounds; s[0].setFromPointsField(r, `x`), s[1].setFromPointsField(r, `y`), s[2].setFromPointsField(r, `z`), this.invMatrix.copy(this.matrix).invert(), this.needsUpdate = !1 } })(), Cv.prototype.intersectsBox = (function () { let e = new mv; return function (t) { this.needsUpdate && this.update(); let n = t.min, r = t.max, i = this.satBounds, a = this.satAxes, o = this.alignedSatBounds; if (e.min = n.x, e.max = r.x, o[0].isSeparated(e) || (e.min = n.y, e.max = r.y, o[1].isSeparated(e)) || (e.min = n.z, e.max = r.z, o[2].isSeparated(e))) return !1; for (let n = 0; n < 3; n++) { let r = a[n], o = i[n]; if (e.setFromBox(r, t), o.isSeparated(e)) return !1 } return !0 } })(), Cv.prototype.intersectsTriangle = (function () { let e = new Sv, t = [, , ,], n = new mv, r = new mv, i = new K; return function (a) { this.needsUpdate && this.update(), a.isExtendedTriangle ? a.needsUpdate && a.update() : (e.copy(a), e.update(), a = e); let o = this.satBounds, s = this.satAxes; t[0] = a.a, t[1] = a.b, t[2] = a.c; for (let e = 0; e < 3; e++) { let r = o[e], i = s[e]; if (n.setFromPoints(i, t), r.isSeparated(n)) return !1 } let c = a.satBounds, l = a.satAxes, u = this.points; for (let e = 0; e < 3; e++) { let t = c[e], r = l[e]; if (n.setFromPoints(r, u), t.isSeparated(n)) return !1 } for (let e = 0; e < 3; e++) { let a = s[e]; for (let e = 0; e < 4; e++) { let o = l[e]; if (i.crossVectors(a, o), n.setFromPoints(i, t), r.setFromPoints(i, u), n.isSeparated(r)) return !1 } } return !0 } })(), Cv.prototype.closestPointToPoint = (function () { return function (e, t) { return this.needsUpdate && this.update(), t.copy(e).applyMatrix4(this.invMatrix).clamp(this.min, this.max).applyMatrix4(this.matrix), t } })(), Cv.prototype.distanceToPoint = (function () { let e = new K; return function (t) { return this.closestPointToPoint(t, e), t.distanceTo(e) } })(), Cv.prototype.distanceToBox = (function () { let e = [`x`, `y`, `z`], t = Array(12).fill().map(() => new gf), n = Array(12).fill().map(() => new gf), r = new K, i = new K; return function (a, o = 0, s = null, c = null) { if (this.needsUpdate && this.update(), this.intersectsBox(a)) return (s || c) && (a.getCenter(i), this.closestPointToPoint(i, r), a.closestPointToPoint(r, i), s && s.copy(r), c && c.copy(i)), 0; let l = o * o, u = a.min, d = a.max, f = this.points, p = 1 / 0; for (let e = 0; e < 8; e++) { let t = f[e]; i.copy(t).clamp(u, d); let n = t.distanceToSquared(i); if (n < p && (p = n, s && s.copy(t), c && c.copy(i), n < l)) return Math.sqrt(n) } let m = 0; for (let r = 0; r < 3; r++)for (let i = 0; i <= 1; i++)for (let a = 0; a <= 1; a++) { let o = (r + 1) % 3, s = (r + 2) % 3, c = i << o | a << s, l = 1 << r | i << o | a << s, p = f[c], h = f[l]; t[m].set(p, h); let g = e[r], _ = e[o], v = e[s], y = n[m], b = y.start, x = y.end; b[g] = u[g], b[_] = i ? u[_] : d[_], b[v] = a ? u[v] : d[_], x[g] = d[g], x[_] = i ? u[_] : d[_], x[v] = a ? u[v] : d[_], m++ } for (let e = 0; e <= 1; e++)for (let t = 0; t <= 1; t++)for (let n = 0; n <= 1; n++) { i.x = e ? d.x : u.x, i.y = t ? d.y : u.y, i.z = n ? d.z : u.z, this.closestPointToPoint(i, r); let a = i.distanceToSquared(r); if (a < p && (p = a, s && s.copy(r), c && c.copy(i), a < l)) return Math.sqrt(a) } for (let e = 0; e < 12; e++) { let a = t[e]; for (let e = 0; e < 12; e++) { let t = n[e]; gv(a, t, r, i); let o = r.distanceToSquared(i); if (o < p && (p = o, s && s.copy(r), c && c.copy(i), o < l)) return Math.sqrt(o) } } return Math.sqrt(p) } })(); var wv = new class extends L_ { constructor() { super(() => new Sv) } }, Tv = new K, Ev = new K; function Dv(e, t, n = {}, r = 0, i = 1 / 0) { let a = r * r, o = i * i, s = 1 / 0, c = null; if (e.shapecast({ boundsTraverseOrder: e => (Tv.copy(t).clamp(e.min, e.max), Tv.distanceToSquared(t)), intersectsBounds: (e, t, n) => n < s && n < o, intersectsTriangle: (e, n) => { e.closestPointToPoint(t, Tv); let r = t.distanceToSquared(Tv); return r < s && (Ev.copy(Tv), s = r, c = n), r < a } }), s === 1 / 0) return null; let l = Math.sqrt(s); return n.point ? n.point.copy(Ev) : n.point = Ev.clone(), n.distance = l, n.faceIndex = c, n } var Ov = !0, kv = !1, Av = new K, jv = new K, Mv = new K, Nv = new G, Pv = new G, Fv = new G, Iv = new K, Lv = new K, Rv = new K, zv = new K; function Bv(e, t, n, r, i, a, o, s) { let c; if (c = a === 1 ? e.intersectTriangle(r, n, t, !0, i) : e.intersectTriangle(t, n, r, a !== 2, i), c === null) return null; let l = e.origin.distanceTo(i); return l < o || l > s ? null : { distance: l, point: i.clone() } } function Vv(e, t, n, r, i, a, o, s, c, l, u) { Av.fromBufferAttribute(t, a), jv.fromBufferAttribute(t, o), Mv.fromBufferAttribute(t, s); let d = Bv(e, Av, jv, Mv, zv, c, l, u); if (d) { if (r) { Nv.fromBufferAttribute(r, a), Pv.fromBufferAttribute(r, o), Fv.fromBufferAttribute(r, s), d.uv = new G; let e = ic.getInterpolation(zv, Av, jv, Mv, Nv, Pv, Fv, d.uv); Ov || (d.uv = e) } if (i) { Nv.fromBufferAttribute(i, a), Pv.fromBufferAttribute(i, o), Fv.fromBufferAttribute(i, s), d.uv1 = new G; let e = ic.getInterpolation(zv, Av, jv, Mv, Nv, Pv, Fv, d.uv1); Ov || (d.uv1 = e), kv && (d.uv2 = d.uv1) } if (n) { Iv.fromBufferAttribute(n, a), Lv.fromBufferAttribute(n, o), Rv.fromBufferAttribute(n, s), d.normal = new K; let t = ic.getInterpolation(zv, Av, jv, Mv, Iv, Lv, Rv, d.normal); d.normal.dot(e.direction) > 0 && d.normal.multiplyScalar(-1), Ov || (d.normal = t) } let t = { a, b: o, c: s, normal: new K, materialIndex: 0 }; if (ic.getNormal(Av, jv, Mv, t.normal), d.face = t, d.faceIndex = a, Ov) { let e = new K; ic.getBarycoord(zv, Av, jv, Mv, e), d.barycoord = e } } return d } function Hv(e) { return e && e.isMaterial ? e.side : e } function Uv(e, t, n, r, i, a, o) { let s = r * 3, c = s + 0, l = s + 1, u = s + 2, { index: d, groups: f } = e; e.index && (c = d.getX(c), l = d.getX(l), u = d.getX(u)); let { position: p, normal: m, uv: h, uv1: g } = e.attributes; if (Array.isArray(t)) { let e = r * 3; for (let s = 0, d = f.length; s < d; s++) { let { start: d, count: _, materialIndex: v } = f[s]; if (e >= d && e < d + _) { let e = Hv(t[v]), s = Vv(n, p, m, h, g, c, l, u, e, a, o); if (s) if (s.faceIndex = r, s.face.materialIndex = v, i) i.push(s); else return s } } } else { let e = Hv(t), s = Vv(n, p, m, h, g, c, l, u, e, a, o); if (s) if (s.faceIndex = r, s.face.materialIndex = 0, i) i.push(s); else return s } return null } function Wv(e, t, n, r) { let i = e.a, a = e.b, o = e.c, s = t, c = t + 1, l = t + 2; n && (s = n.getX(s), c = n.getX(c), l = n.getX(l)), i.x = r.getX(s), i.y = r.getY(s), i.z = r.getZ(s), a.x = r.getX(c), a.y = r.getY(c), a.z = r.getZ(c), o.x = r.getX(l), o.y = r.getY(l), o.z = r.getZ(l) } function Gv(e, t, n, r, i, a, o, s) { let { geometry: c, _indirectBuffer: l } = e; for (let e = r, l = r + i; e < l; e++)Uv(c, t, n, e, a, o, s) } function Kv(e, t, n, r, i, a, o) { let { geometry: s, _indirectBuffer: c } = e, l = 1 / 0, u = null; for (let e = r, c = r + i; e < c; e++) { let r; r = Uv(s, t, n, e, null, a, o), r && r.distance < l && (u = r, l = r.distance) } return u } function qv(e, t, n, r, i, a, o) { let { geometry: s } = n, { index: c } = s, l = s.attributes.position; for (let n = e, s = t + e; n < s; n++) { let e; if (e = n, Wv(o, e * 3, c, l), o.needsUpdate = !0, r(o, e, i, a)) return !0 } return !1 } function Jv(e, t = null) { t && Array.isArray(t) && (t = new Set(t)); let n = e.geometry, r = n.index ? n.index.array : null, i = n.attributes.position, a, o, s, c, l = 0, u = e._roots; for (let e = 0, t = u.length; e < t; e++)a = u[e], o = new Uint32Array(a), s = new Uint16Array(a), c = new Float32Array(a), d(0, l), l += a.byteLength; function d(e, n, a = !1) { let l = e * 2; if (d_(l, s)) { let t = f_(e, o), n = p_(l, s), a = 1 / 0, u = 1 / 0, d = 1 / 0, f = -1 / 0, p = -1 / 0, m = -1 / 0; for (let e = 3 * t, o = 3 * (t + n); e < o; e++) { let t = r[e], n = i.getX(t), o = i.getY(t), s = i.getZ(t); n < a && (a = n), n > f && (f = n), o < u && (u = o), o > p && (p = o), s < d && (d = s), s > m && (m = s) } return c[e + 0] !== a || c[e + 1] !== u || c[e + 2] !== d || c[e + 3] !== f || c[e + 4] !== p || c[e + 5] !== m ? (c[e + 0] = a, c[e + 1] = u, c[e + 2] = d, c[e + 3] = f, c[e + 4] = p, c[e + 5] = m, !0) : !1 } else { let r = m_(e), i = h_(e, o), s = a, l = !1, u = !1; if (t) { if (!s) { let e = r / 8 + n / 32, a = i / 8 + n / 32; l = t.has(e), u = t.has(a), s = !l && !u } } else l = !0, u = !0; let f = s || l, p = s || u, m = !1; f && (m = d(r, n, s)); let h = !1; p && (h = d(i, n, s)); let g = m || h; if (g) for (let t = 0; t < 3; t++) { let n = r + t, a = i + t, o = c[n], s = c[n + 3], l = c[a], u = c[a + 3]; c[e + t] = o < l ? o : l, c[e + t + 3] = s > u ? s : u } return g } } } function Yv(e, t, n, r, i) { let a, o, s, c, l, u, d = 1 / n.direction.x, f = 1 / n.direction.y, p = 1 / n.direction.z, m = n.origin.x, h = n.origin.y, g = n.origin.z, _ = t[e], v = t[e + 3], y = t[e + 1], b = t[e + 3 + 1], x = t[e + 2], S = t[e + 3 + 2]; return d >= 0 ? (a = (_ - m) * d, o = (v - m) * d) : (a = (v - m) * d, o = (_ - m) * d), f >= 0 ? (s = (y - h) * f, c = (b - h) * f) : (s = (b - h) * f, c = (y - h) * f), a > c || s > o || ((s > a || isNaN(a)) && (a = s), (c < o || isNaN(o)) && (o = c), p >= 0 ? (l = (x - g) * p, u = (S - g) * p) : (l = (S - g) * p, u = (x - g) * p), a > u || l > o) ? !1 : ((l > a || a !== a) && (a = l), (u < o || o !== o) && (o = u), a <= i && o >= r) } function Xv(e, t, n, r, i, a, o, s) { let { geometry: c, _indirectBuffer: l } = e; for (let e = r, u = r + i; e < u; e++)Uv(c, t, n, l ? l[e] : e, a, o, s) } function Zv(e, t, n, r, i, a, o) { let { geometry: s, _indirectBuffer: c } = e, l = 1 / 0, u = null; for (let e = r, d = r + i; e < d; e++) { let r; r = Uv(s, t, n, c ? c[e] : e, null, a, o), r && r.distance < l && (u = r, l = r.distance) } return u } function Qv(e, t, n, r, i, a, o) { let { geometry: s } = n, { index: c } = s, l = s.attributes.position; for (let s = e, u = t + e; s < u; s++) { let e; if (e = n.resolveTriangleIndex(s), Wv(o, e * 3, c, l), o.needsUpdate = !0, r(o, e, i, a)) return !0 } return !1 } function $v(e, t, n, r, i, a, o) { R_.setBuffer(e._roots[t]), ey(0, e, n, r, i, a, o), R_.clearBuffer() } function ey(e, t, n, r, i, a, o) { let { float32Array: s, uint16Array: c, uint32Array: l } = R_, u = e * 2; if (d_(u, c)) Gv(t, n, r, f_(e, l), p_(u, c), i, a, o); else { let c = m_(e); Yv(c, s, r, a, o) && ey(c, t, n, r, i, a, o); let u = h_(e, l); Yv(u, s, r, a, o) && ey(u, t, n, r, i, a, o) } } var ty = [`x`, `y`, `z`]; function ny(e, t, n, r, i, a) { R_.setBuffer(e._roots[t]); let o = ry(0, e, n, r, i, a); return R_.clearBuffer(), o } function ry(e, t, n, r, i, a) { let { float32Array: o, uint16Array: s, uint32Array: c } = R_, l = e * 2; if (d_(l, s)) return Kv(t, n, r, f_(e, c), p_(l, s), i, a); { let s = g_(e, c), l = ty[s], u = r.direction[l] >= 0, d, f; u ? (d = m_(e), f = h_(e, c)) : (d = h_(e, c), f = m_(e)); let p = Yv(d, o, r, i, a) ? ry(d, t, n, r, i, a) : null; if (p) { let e = p.point[l]; if (u ? e <= o[f + s] : e >= o[f + s + 3]) return p } let m = Yv(f, o, r, i, a) ? ry(f, t, n, r, i, a) : null; return p && m ? p.distance <= m.distance ? p : m : p || m || null } } var iy = new ac, ay = new Sv, oy = new Sv, sy = new Y, cy = new Cv, ly = new Cv; function uy(e, t, n, r) { R_.setBuffer(e._roots[t]); let i = dy(0, e, n, r); return R_.clearBuffer(), i } function dy(e, t, n, r, i = null) { let { float32Array: a, uint16Array: o, uint32Array: s } = R_, c = e * 2; if (i === null && (n.boundingBox || n.computeBoundingBox(), cy.set(n.boundingBox.min, n.boundingBox.max, r), i = cy), d_(c, o)) { let i = t.geometry, l = i.index, u = i.attributes.position, d = n.index, f = n.attributes.position, p = f_(e, s), m = p_(c, o); if (sy.copy(r).invert(), n.boundsTree) return a_(__(e), a, ly), ly.matrix.copy(sy), ly.needsUpdate = !0, n.boundsTree.shapecast({ intersectsBounds: e => ly.intersectsBox(e), intersectsTriangle: e => { e.a.applyMatrix4(r), e.b.applyMatrix4(r), e.c.applyMatrix4(r), e.needsUpdate = !0; for (let t = p * 3, n = (m + p) * 3; t < n; t += 3)if (Wv(oy, t, l, u), oy.needsUpdate = !0, e.intersectsTriangle(oy)) return !0; return !1 } }); { let e = ov(n); for (let t = p * 3, n = (m + p) * 3; t < n; t += 3) { Wv(ay, t, l, u), ay.a.applyMatrix4(sy), ay.b.applyMatrix4(sy), ay.c.applyMatrix4(sy), ay.needsUpdate = !0; for (let t = 0, n = e * 3; t < n; t += 3)if (Wv(oy, t, d, f), oy.needsUpdate = !0, ay.intersectsTriangle(oy)) return !0 } } } else { let o = m_(e), c = h_(e, s); return a_(__(o), a, iy), !!(i.intersectsBox(iy) && dy(o, t, n, r, i) || (a_(__(c), a, iy), i.intersectsBox(iy) && dy(c, t, n, r, i))) } } var fy = new Y, py = new Cv, my = new Cv, hy = new K, gy = new K, _y = new K, vy = new K; function yy(e, t, n, r = {}, i = {}, a = 0, o = 1 / 0) { t.boundingBox || t.computeBoundingBox(), py.set(t.boundingBox.min, t.boundingBox.max, n), py.needsUpdate = !0; let s = e.geometry, c = s.attributes.position, l = s.index, u = t.attributes.position, d = t.index, f = wv.getPrimitive(), p = wv.getPrimitive(), m = hy, h = gy, g = null, _ = null; i && (g = _y, _ = vy); let v = 1 / 0, y = null, b = null; return fy.copy(n).invert(), my.matrix.copy(fy), e.shapecast({ boundsTraverseOrder: e => py.distanceToBox(e), intersectsBounds: (e, t, n) => n < v && n < o ? (t && (my.min.copy(e.min), my.max.copy(e.max), my.needsUpdate = !0), !0) : !1, intersectsRange: (e, r) => { if (t.boundsTree) return t.boundsTree.shapecast({ boundsTraverseOrder: e => my.distanceToBox(e), intersectsBounds: (e, t, n) => n < v && n < o, intersectsRange: (t, i) => { for (let o = t, s = t + i; o < s; o++) { Wv(p, 3 * o, d, u), p.a.applyMatrix4(n), p.b.applyMatrix4(n), p.c.applyMatrix4(n), p.needsUpdate = !0; for (let t = e, n = e + r; t < n; t++) { Wv(f, 3 * t, l, c), f.needsUpdate = !0; let e = f.distanceToTriangle(p, m, g); if (e < v && (h.copy(m), _ && _.copy(g), v = e, y = t, b = o), e < a) return !0 } } } }); { let i = ov(t); for (let t = 0, o = i; t < o; t++) { Wv(p, 3 * t, d, u), p.a.applyMatrix4(n), p.b.applyMatrix4(n), p.c.applyMatrix4(n), p.needsUpdate = !0; for (let n = e, i = e + r; n < i; n++) { Wv(f, 3 * n, l, c), f.needsUpdate = !0; let e = f.distanceToTriangle(p, m, g); if (e < v && (h.copy(m), _ && _.copy(g), v = e, y = n, b = t), e < a) return !0 } } } } }), wv.releasePrimitive(f), wv.releasePrimitive(p), v === 1 / 0 ? null : (r.point ? r.point.copy(h) : r.point = h.clone(), r.distance = v, r.faceIndex = y, i && (i.point ? i.point.copy(_) : i.point = _.clone(), i.point.applyMatrix4(fy), h.applyMatrix4(fy), i.distance = h.sub(i.point).length(), i.faceIndex = b), r) } function by(e, t = null) { t && Array.isArray(t) && (t = new Set(t)); let n = e.geometry, r = n.index ? n.index.array : null, i = n.attributes.position, a, o, s, c, l = 0, u = e._roots; for (let e = 0, t = u.length; e < t; e++)a = u[e], o = new Uint32Array(a), s = new Uint16Array(a), c = new Float32Array(a), d(0, l), l += a.byteLength; function d(n, a, l = !1) { let u = n * 2; if (d_(u, s)) { let t = f_(n, o), a = p_(u, s), l = 1 / 0, d = 1 / 0, f = 1 / 0, p = -1 / 0, m = -1 / 0, h = -1 / 0; for (let n = t, o = t + a; n < o; n++) { let t = 3 * e.resolveTriangleIndex(n); for (let e = 0; e < 3; e++) { let n = t + e; n = r ? r[n] : n; let a = i.getX(n), o = i.getY(n), s = i.getZ(n); a < l && (l = a), a > p && (p = a), o < d && (d = o), o > m && (m = o), s < f && (f = s), s > h && (h = s) } } return c[n + 0] !== l || c[n + 1] !== d || c[n + 2] !== f || c[n + 3] !== p || c[n + 4] !== m || c[n + 5] !== h ? (c[n + 0] = l, c[n + 1] = d, c[n + 2] = f, c[n + 3] = p, c[n + 4] = m, c[n + 5] = h, !0) : !1 } else { let e = m_(n), r = h_(n, o), i = l, s = !1, u = !1; if (t) { if (!i) { let n = e / 8 + a / 32, o = r / 8 + a / 32; s = t.has(n), u = t.has(o), i = !s && !u } } else s = !0, u = !0; let f = i || s, p = i || u, m = !1; f && (m = d(e, a, i)); let h = !1; p && (h = d(r, a, i)); let g = m || h; if (g) for (let t = 0; t < 3; t++) { let i = e + t, a = r + t, o = c[i], s = c[i + 3], l = c[a], u = c[a + 3]; c[n + t] = o < l ? o : l, c[n + t + 3] = s > u ? s : u } return g } } } function xy(e, t, n, r, i, a, o) { R_.setBuffer(e._roots[t]), Sy(0, e, n, r, i, a, o), R_.clearBuffer() } function Sy(e, t, n, r, i, a, o) { let { float32Array: s, uint16Array: c, uint32Array: l } = R_, u = e * 2; if (d_(u, c)) Xv(t, n, r, f_(e, l), p_(u, c), i, a, o); else { let c = m_(e); Yv(c, s, r, a, o) && Sy(c, t, n, r, i, a, o); let u = h_(e, l); Yv(u, s, r, a, o) && Sy(u, t, n, r, i, a, o) } } var Cy = [`x`, `y`, `z`]; function wy(e, t, n, r, i, a) { R_.setBuffer(e._roots[t]); let o = Ty(0, e, n, r, i, a); return R_.clearBuffer(), o } function Ty(e, t, n, r, i, a) { let { float32Array: o, uint16Array: s, uint32Array: c } = R_, l = e * 2; if (d_(l, s)) return Zv(t, n, r, f_(e, c), p_(l, s), i, a); { let s = g_(e, c), l = Cy[s], u = r.direction[l] >= 0, d, f; u ? (d = m_(e), f = h_(e, c)) : (d = h_(e, c), f = m_(e)); let p = Yv(d, o, r, i, a) ? Ty(d, t, n, r, i, a) : null; if (p) { let e = p.point[l]; if (u ? e <= o[f + s] : e >= o[f + s + 3]) return p } let m = Yv(f, o, r, i, a) ? Ty(f, t, n, r, i, a) : null; return p && m ? p.distance <= m.distance ? p : m : p || m || null } } var Ey = new ac, Dy = new Sv, Oy = new Sv, ky = new Y, Ay = new Cv, jy = new Cv; function My(e, t, n, r) { R_.setBuffer(e._roots[t]); let i = Ny(0, e, n, r); return R_.clearBuffer(), i } function Ny(e, t, n, r, i = null) { let { float32Array: a, uint16Array: o, uint32Array: s } = R_, c = e * 2; if (i === null && (n.boundingBox || n.computeBoundingBox(), Ay.set(n.boundingBox.min, n.boundingBox.max, r), i = Ay), d_(c, o)) { let i = t.geometry, l = i.index, u = i.attributes.position, d = n.index, f = n.attributes.position, p = f_(e, s), m = p_(c, o); if (ky.copy(r).invert(), n.boundsTree) return a_(__(e), a, jy), jy.matrix.copy(ky), jy.needsUpdate = !0, n.boundsTree.shapecast({ intersectsBounds: e => jy.intersectsBox(e), intersectsTriangle: e => { e.a.applyMatrix4(r), e.b.applyMatrix4(r), e.c.applyMatrix4(r), e.needsUpdate = !0; for (let n = p, r = m + p; n < r; n++)if (Wv(Oy, 3 * t.resolveTriangleIndex(n), l, u), Oy.needsUpdate = !0, e.intersectsTriangle(Oy)) return !0; return !1 } }); { let e = ov(n); for (let n = p, r = m + p; n < r; n++) { Wv(Dy, 3 * t.resolveTriangleIndex(n), l, u), Dy.a.applyMatrix4(ky), Dy.b.applyMatrix4(ky), Dy.c.applyMatrix4(ky), Dy.needsUpdate = !0; for (let t = 0, n = e * 3; t < n; t += 3)if (Wv(Oy, t, d, f), Oy.needsUpdate = !0, Dy.intersectsTriangle(Oy)) return !0 } } } else { let o = m_(e), c = h_(e, s); return a_(__(o), a, Ey), !!(i.intersectsBox(Ey) && Ny(o, t, n, r, i) || (a_(__(c), a, Ey), i.intersectsBox(Ey) && Ny(c, t, n, r, i))) } } var Py = new Y, Fy = new Cv, Iy = new Cv, Ly = new K, Ry = new K, zy = new K, By = new K; function Vy(e, t, n, r = {}, i = {}, a = 0, o = 1 / 0) { t.boundingBox || t.computeBoundingBox(), Fy.set(t.boundingBox.min, t.boundingBox.max, n), Fy.needsUpdate = !0; let s = e.geometry, c = s.attributes.position, l = s.index, u = t.attributes.position, d = t.index, f = wv.getPrimitive(), p = wv.getPrimitive(), m = Ly, h = Ry, g = null, _ = null; i && (g = zy, _ = By); let v = 1 / 0, y = null, b = null; return Py.copy(n).invert(), Iy.matrix.copy(Py), e.shapecast({ boundsTraverseOrder: e => Fy.distanceToBox(e), intersectsBounds: (e, t, n) => n < v && n < o ? (t && (Iy.min.copy(e.min), Iy.max.copy(e.max), Iy.needsUpdate = !0), !0) : !1, intersectsRange: (r, i) => { if (t.boundsTree) { let s = t.boundsTree; return s.shapecast({ boundsTraverseOrder: e => Iy.distanceToBox(e), intersectsBounds: (e, t, n) => n < v && n < o, intersectsRange: (t, o) => { for (let x = t, S = t + o; x < S; x++) { Wv(p, 3 * s.resolveTriangleIndex(x), d, u), p.a.applyMatrix4(n), p.b.applyMatrix4(n), p.c.applyMatrix4(n), p.needsUpdate = !0; for (let t = r, n = r + i; t < n; t++) { Wv(f, 3 * e.resolveTriangleIndex(t), l, c), f.needsUpdate = !0; let n = f.distanceToTriangle(p, m, g); if (n < v && (h.copy(m), _ && _.copy(g), v = n, y = t, b = x), n < a) return !0 } } } }) } else { let o = ov(t); for (let t = 0, s = o; t < s; t++) { Wv(p, 3 * t, d, u), p.a.applyMatrix4(n), p.b.applyMatrix4(n), p.c.applyMatrix4(n), p.needsUpdate = !0; for (let n = r, o = r + i; n < o; n++) { Wv(f, 3 * e.resolveTriangleIndex(n), l, c), f.needsUpdate = !0; let r = f.distanceToTriangle(p, m, g); if (r < v && (h.copy(m), _ && _.copy(g), v = r, y = n, b = t), r < a) return !0 } } } } }), wv.releasePrimitive(f), wv.releasePrimitive(p), v === 1 / 0 ? null : (r.point ? r.point.copy(h) : r.point = h.clone(), r.distance = v, r.faceIndex = y, i && (i.point ? i.point.copy(_) : i.point = _.clone(), i.point.applyMatrix4(Py), h.applyMatrix4(Py), i.distance = h.sub(i.point).length(), i.faceIndex = b), r) } function Hy(e, t, n) { return e === null ? null : (e.point.applyMatrix4(t.matrixWorld), e.distance = e.point.distanceTo(n.ray.origin), e.object = t, e) } var Uy = new Cv, Wy = new nl, Gy = new K, Ky = new Y, qy = new K, Jy = [`getX`, `getY`, `getZ`], Yy = class e extends pv { static serialize(e, t = {}) { t = { cloneBuffers: !0, ...t }; let n = e.geometry, r = e._roots, i = e._indirectBuffer, a = n.getIndex(), o = { version: 1, roots: null, index: null, indirectBuffer: null }; return t.cloneBuffers ? (o.roots = r.map(e => e.slice()), o.index = a ? a.array.slice() : null, o.indirectBuffer = i ? i.slice() : null) : (o.roots = r, o.index = a ? a.array : null, o.indirectBuffer = i), o } static deserialize(t, n, r = {}) { r = { setIndex: !0, indirect: !!t.indirectBuffer, ...r }; let { index: i, roots: a, indirectBuffer: o } = t; t.version || (console.warn(`MeshBVH.deserialize: Serialization format has been changed and will be fixed up. It is recommended to regenerate any stored serialized data.`), c(a)); let s = new e(n, { ...r, [r_]: !0 }); if (s._roots = a, s._indirectBuffer = o || null, r.setIndex) { let e = n.getIndex(); if (e === null) { let e = new Oc(t.index, 1, !1); n.setIndex(e) } else e.array !== i && (e.array.set(i), e.needsUpdate = !0) } return s; function c(e) { for (let t = 0; t < e.length; t++) { let n = e[t], r = new Uint32Array(n), i = new Uint16Array(n); for (let e = 0, t = n.byteLength / 32; e < t; e++) { let t = 8 * e; d_(2 * t, i) || (r[t + 6] = r[t + 6] / 8 - e) } } } } get primitiveStride() { return 3 } get resolveTriangleIndex() { return this.resolvePrimitiveIndex } constructor(e, t = {}) { t.maxLeafTris && (console.warn(`MeshBVH: "maxLeafTris" option has been deprecated. Use maxLeafSize, instead.`), t = { ...t, maxLeafSize: t.maxLeafTris }), super(e, t) } shiftTriangleOffsets(e) { return super.shiftPrimitiveOffsets(e) } writePrimitiveBounds(e, t, n) { let r = this.geometry, i = this._indirectBuffer, a = r.attributes.position, o = r.index ? r.index.array : null, s = (i ? i[e] : e) * 3, c = s + 0, l = s + 1, u = s + 2; o && (c = o[c], l = o[l], u = o[u]); for (let e = 0; e < 3; e++) { let r = a[Jy[e]](c), i = a[Jy[e]](l), o = a[Jy[e]](u), s = r; i < s && (s = i), o < s && (s = o); let d = r; i > d && (d = i), o > d && (d = o), t[n + e] = s, t[n + e + 3] = d } return t } computePrimitiveBounds(e, t, n) { let r = this.geometry, i = this._indirectBuffer, a = r.attributes.position, o = r.index ? r.index.array : null, s = a.normalized; if (e < 0 || t + e - n.offset > n.length / 6) throw Error(`MeshBVH: compute triangle bounds range is invalid.`); let c = a.array, l = a.offset || 0, u = 3; a.isInterleavedBufferAttribute && (u = a.data.stride); let d = [`getX`, `getY`, `getZ`], f = n.offset; for (let r = e, p = e + t; r < p; r++) { let e = (i ? i[r] : r) * 3, t = (r - f) * 6, p = e + 0, m = e + 1, h = e + 2; o && (p = o[p], m = o[m], h = o[h]), s || (p = p * u + l, m = m * u + l, h = h * u + l); for (let e = 0; e < 3; e++) { let r, i, o; s ? (r = a[d[e]](p), i = a[d[e]](m), o = a[d[e]](h)) : (r = c[p + e], i = c[m + e], o = c[h + e]); let l = r; i < l && (l = i), o < l && (l = o); let u = r; i > u && (u = i), o > u && (u = o); let f = (u - l) / 2, g = e * 2; n[t + g + 0] = l + f, n[t + g + 1] = f + (Math.abs(l) + f) * n_ } } return n } raycastObject3D(e, t, n = []) { let { material: r } = e; if (r === void 0) return; Ky.copy(e.matrixWorld).invert(), Wy.copy(t.ray).applyMatrix4(Ky), qy.setFromMatrixScale(e.matrixWorld), Gy.copy(Wy.direction).multiply(qy); let i = Gy.length(), a = t.near / i, o = t.far / i; if (t.firstHitOnly === !0) { let i = this.raycastFirst(Wy, r, a, o); i = Hy(i, e, t), i && n.push(i) } else { let i = this.raycast(Wy, r, a, o); for (let r = 0, a = i.length; r < a; r++) { let a = Hy(i[r], e, t); a && n.push(a) } } return n } refit(e = null) { return (this.indirect ? by : Jv)(this, e) } raycast(e, t = 0, n = 0, r = 1 / 0) { let i = this._roots, a = [], o = this.indirect ? xy : $v; for (let s = 0, c = i.length; s < c; s++)o(this, s, t, e, a, n, r); return a } raycastFirst(e, t = 0, n = 0, r = 1 / 0) { let i = this._roots, a = null, o = this.indirect ? wy : ny; for (let s = 0, c = i.length; s < c; s++) { let i = o(this, s, t, e, n, r); i != null && (a == null || i.distance < a.distance) && (a = i) } return a } intersectsGeometry(e, t) { let n = !1, r = this._roots, i = this.indirect ? My : uy; for (let a = 0, o = r.length; a < o && (n = i(this, a, e, t), !n); a++); return n } shapecast(e) { let t = wv.getPrimitive(), n = super.shapecast({ ...e, intersectsPrimitive: e.intersectsTriangle, scratchPrimitive: t, iterate: this.indirect ? Qv : qv }); return wv.releasePrimitive(t), n } bvhcast(t, n, r) { let { intersectsRanges: i, intersectsTriangles: a } = r, o = wv.getPrimitive(), s = this.geometry.index, c = this.geometry.attributes.position, l = this.indirect ? e => { Wv(o, this.resolveTriangleIndex(e) * 3, s, c) } : e => { Wv(o, e * 3, s, c) }, u = wv.getPrimitive(), d = t.geometry.index, f = t.geometry.attributes.position, p = t.indirect ? e => { Wv(u, t.resolveTriangleIndex(e) * 3, d, f) } : e => { Wv(u, e * 3, d, f) }; if (a) { if (!(t instanceof e)) throw Error(`MeshBVH: "intersectsTriangles" callback can only be used with another MeshBVH.`); let r = (e, t, r, i, s, c, d, f) => { for (let m = r, h = r + i; m < h; m++) { p(m), u.a.applyMatrix4(n), u.b.applyMatrix4(n), u.c.applyMatrix4(n), u.needsUpdate = !0; for (let n = e, r = e + t; n < r; n++)if (l(n), o.needsUpdate = !0, a(o, u, n, m, s, c, d, f)) return !0 } return !1 }; if (i) { let e = i; i = function (t, n, i, a, o, s, c, l) { return e(t, n, i, a, o, s, c, l) ? !0 : r(t, n, i, a, o, s, c, l) } } else i = r } return super.bvhcast(t, n, { intersectsRanges: i }) } intersectsBox(e, t) { return Uy.set(e.min, e.max, t), Uy.needsUpdate = !0, this.shapecast({ intersectsBounds: e => Uy.intersectsBox(e), intersectsTriangle: e => Uy.intersectsTriangle(e) }) } intersectsSphere(e) { return this.shapecast({ intersectsBounds: t => e.intersectsBox(t), intersectsTriangle: t => t.intersectsSphere(e) }) } closestPointToGeometry(e, t, n = {}, r = {}, i = 0, a = 1 / 0) { return (this.indirect ? Vy : yy)(this, e, t, n, r, i, a) } closestPointToPoint(e, t = {}, n = 0, r = 1 / 0) { return Dv(this, e, t, n, r) } }; function Xy(e) { switch (e) { case 1: return `R`; case 2: return `RG`; case 3: return `RGBA`; case 4: return `RGBA` }throw Error() } function Zy(e) { switch (e) { case 1: return Xi; case 2: return Qi; case 3: return qi; case 4: return qi } } function Qy(e) { switch (e) { case 1: return Zi; case 2: return $i; case 3: return ea; case 4: return ea } } var $y = class extends kl { constructor() { super(), this.minFilter = Ei, this.magFilter = Ei, this.generateMipmaps = !1, this.overrideItemSize = null, this._forcedType = null } updateFrom(e) { let t = this.overrideItemSize, n = e.itemSize, r = e.count; if (t !== null) { if (n * r % t !== 0) throw Error(`VertexAttributeTexture: overrideItemSize must divide evenly into buffer length.`); e.itemSize = t, e.count = r * n / t } let i = e.itemSize, a = e.count, o = e.normalized, s = e.array.constructor, c = s.BYTES_PER_ELEMENT, l = this._forcedType, u = i; if (l === null) switch (s) { case Float32Array: l = Ri; break; case Uint8Array: case Uint16Array: case Uint32Array: l = Li; break; case Int8Array: case Int16Array: case Int32Array: l = Ii; break }let d, f, p, m, h = Xy(i); switch (l) { case Ri: p = 1, f = Zy(i), o && c === 1 ? (m = s, h += `8`, s === Uint8Array ? d = Mi : (d = Ni, h += `_SNORM`)) : (m = Float32Array, h += `32F`, d = Ri); break; case Ii: h += c * 8 + `I`, p = o ? 2 ** (s.BYTES_PER_ELEMENT * 8 - 1) : 1, f = Qy(i), c === 1 ? (m = Int8Array, d = Ni) : c === 2 ? (m = Int16Array, d = Pi) : (m = Int32Array, d = Ii); break; case Li: h += c * 8 + `UI`, p = o ? 2 ** (s.BYTES_PER_ELEMENT * 8 - 1) : 1, f = Qy(i), c === 1 ? (m = Uint8Array, d = Mi) : c === 2 ? (m = Uint16Array, d = Fi) : (m = Uint32Array, d = Li); break }u === 3 && (f === 1023 || f === 1033) && (u = 4); let g = Math.ceil(Math.sqrt(a)) || 1, _ = u * g * g, v = new m(_), y = e.normalized; e.normalized = !1; for (let t = 0; t < a; t++) { let n = u * t; v[n] = e.getX(t) / p, i >= 2 && (v[n + 1] = e.getY(t) / p), i >= 3 && (v[n + 2] = e.getZ(t) / p, u === 4 && (v[n + 3] = 1)), i >= 4 && (v[n + 3] = e.getW(t) / p) } e.normalized = y, this.internalFormat = h, this.format = f, this.type = d, this.image.width = g, this.image.height = g, this.image.data = v, this.needsUpdate = !0, this.dispose(), e.itemSize = n, e.count = r } }, eb = class extends $y { constructor() { super(), this._forcedType = Li } }, tb = class extends $y { constructor() { super(), this._forcedType = Ri } }, nb = class { constructor() { this.index = new eb, this.position = new tb, this.bvhBounds = new kl, this.bvhContents = new kl, this._cachedIndexAttr = null, this.index.overrideItemSize = 3 } updateFrom(e) { let { geometry: t } = e; if (ib(e, this.bvhBounds, this.bvhContents), this.position.updateFrom(t.attributes.position), e.indirect) { let n = e._indirectBuffer; if (this._cachedIndexAttr === null || this._cachedIndexAttr.count !== n.length) if (t.index) this._cachedIndexAttr = t.index.clone(); else { let e = sv(av(t)); this._cachedIndexAttr = new Oc(e, 1, !1) } rb(t, n, this._cachedIndexAttr), this.index.updateFrom(this._cachedIndexAttr) } else this.index.updateFrom(t.index) } dispose() { let { index: e, position: t, bvhBounds: n, bvhContents: r } = this; e && e.dispose(), t && t.dispose(), n && n.dispose(), r && r.dispose() } }; function rb(e, t, n) { let r = n.array, i = e.index ? e.index.array : null; for (let e = 0, n = t.length; e < n; e++) { let n = 3 * e, a = 3 * t[e]; for (let e = 0; e < 3; e++)r[n + e] = i ? i[a + e] : a + e } } function ib(e, t, n) { let r = e._roots; if (r.length !== 1) throw Error(`MeshBVHUniformStruct: Multi-root BVHs not supported.`); let i = r[0], a = new Uint16Array(i), o = new Uint32Array(i), s = new Float32Array(i), c = i.byteLength / 32, l = 2 * Math.ceil(Math.sqrt(c / 2)), u = new Float32Array(4 * l * l), d = Math.ceil(Math.sqrt(c)), f = new Uint32Array(2 * d * d); for (let e = 0; e < c; e++) { let t = e * 32 / 4, n = t * 2, r = __(t); for (let t = 0; t < 3; t++)u[8 * e + 0 + t] = s[r + 0 + t], u[8 * e + 4 + t] = s[r + 3 + t]; if (d_(n, a)) { let r = p_(n, a), i = f_(t, o), s = t_ | r; f[e * 2 + 0] = s, f[e * 2 + 1] = i } else { let n = o[t + 6], r = g_(t, o); f[e * 2 + 0] = r, f[e * 2 + 1] = n } } t.image.data = u, t.image.width = l, t.image.height = l, t.format = qi, t.type = Ri, t.internalFormat = `RGBA32F`, t.minFilter = Ei, t.magFilter = Ei, t.generateMipmaps = !1, t.needsUpdate = !0, t.dispose(), n.image.data = f, n.image.width = d, n.image.height = d, n.format = $i, n.type = Li, n.internalFormat = `RG32UI`, n.minFilter = Ei, n.magFilter = Ei, n.generateMipmaps = !1, n.needsUpdate = !0, n.dispose() } var ab = `

// A stack of uint32 indices can can store the indices for
// a perfectly balanced tree with a depth up to 31. Lower stack
// depth gets higher performance.
//
// However not all trees are balanced. Best value to set this to
// is the trees max depth.
#ifndef BVH_STACK_DEPTH
#define BVH_STACK_DEPTH 60
#endif

#ifndef INFINITY
#define INFINITY 1e20
#endif

// Utilities
uvec4 uTexelFetch1D( usampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

ivec4 iTexelFetch1D( isampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 texelFetch1D( sampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 textureSampleBarycoord( sampler2D tex, vec3 barycoord, uvec3 faceIndices ) {

	return
		barycoord.x * texelFetch1D( tex, faceIndices.x ) +
		barycoord.y * texelFetch1D( tex, faceIndices.y ) +
		barycoord.z * texelFetch1D( tex, faceIndices.z );

}

void ndcToCameraRay(
	vec2 coord, mat4 cameraWorld, mat4 invProjectionMatrix,
	out vec3 rayOrigin, out vec3 rayDirection
) {

	// get camera look direction and near plane for camera clipping
	vec4 lookDirection = cameraWorld * vec4( 0.0, 0.0, - 1.0, 0.0 );
	vec4 nearVector = invProjectionMatrix * vec4( 0.0, 0.0, - 1.0, 1.0 );
	float near = abs( nearVector.z / nearVector.w );

	// get the camera direction and position from camera matrices
	vec4 origin = cameraWorld * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec4 direction = invProjectionMatrix * vec4( coord, 0.5, 1.0 );
	direction /= direction.w;
	direction = cameraWorld * direction - origin;

	// slide the origin along the ray until it sits at the near clip plane position
	origin.xyz += direction.xyz * near / dot( direction, lookDirection );

	rayOrigin = origin.xyz;
	rayDirection = direction.xyz;

}
`, ob = `

#ifndef TRI_INTERSECT_EPSILON
#define TRI_INTERSECT_EPSILON 1e-5
#endif

// Raycasting
bool intersectsBounds( vec3 rayOrigin, vec3 rayDirection, vec3 boundsMin, vec3 boundsMax, out float dist ) {

	// https://www.reddit.com/r/opengl/comments/8ntzz5/fast_glsl_ray_box_intersection/
	// https://tavianator.com/2011/ray_box.html
	vec3 invDir = 1.0 / rayDirection;

	// find intersection distances for each plane
	vec3 tMinPlane = invDir * ( boundsMin - rayOrigin );
	vec3 tMaxPlane = invDir * ( boundsMax - rayOrigin );

	// get the min and max distances from each intersection
	vec3 tMinHit = min( tMaxPlane, tMinPlane );
	vec3 tMaxHit = max( tMaxPlane, tMinPlane );

	// get the furthest hit distance
	vec2 t = max( tMinHit.xx, tMinHit.yz );
	float t0 = max( t.x, t.y );

	// get the minimum hit distance
	t = min( tMaxHit.xx, tMaxHit.yz );
	float t1 = min( t.x, t.y );

	// set distance to 0.0 if the ray starts inside the box
	dist = max( t0, 0.0 );

	return t1 >= dist;

}

bool intersectsTriangle(
	vec3 rayOrigin, vec3 rayDirection, vec3 a, vec3 b, vec3 c,
	out vec3 barycoord, out vec3 norm, out float dist, out float side
) {

	// https://stackoverflow.com/questions/42740765/intersection-between-line-and-triangle-in-3d
	vec3 edge1 = b - a;
	vec3 edge2 = c - a;
	norm = cross( edge1, edge2 );

	float det = - dot( rayDirection, norm );
	float invdet = 1.0 / det;

	vec3 AO = rayOrigin - a;
	vec3 DAO = cross( AO, rayDirection );

	vec4 uvt;
	uvt.x = dot( edge2, DAO ) * invdet;
	uvt.y = - dot( edge1, DAO ) * invdet;
	uvt.z = dot( AO, norm ) * invdet;
	uvt.w = 1.0 - uvt.x - uvt.y;

	// set the hit information
	barycoord = uvt.wxy; // arranged in A, B, C order
	dist = uvt.z;
	side = sign( det );
	norm = side * normalize( norm );

	// add an epsilon to avoid misses between triangles
	uvt += vec4( TRI_INTERSECT_EPSILON );

	return all( greaterThanEqual( uvt, vec4( 0.0 ) ) );

}

bool intersectTriangles(
	// geometry info and triangle range
	sampler2D positionAttr, usampler2D indexAttr, uint offset, uint count,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// outputs
	inout float minDistance, inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	bool found = false;
	vec3 localBarycoord, localNormal;
	float localDist, localSide;
	for ( uint i = offset, l = offset + count; i < l; i ++ ) {

		uvec3 indices = uTexelFetch1D( indexAttr, i ).xyz;
		vec3 a = texelFetch1D( positionAttr, indices.x ).rgb;
		vec3 b = texelFetch1D( positionAttr, indices.y ).rgb;
		vec3 c = texelFetch1D( positionAttr, indices.z ).rgb;

		if (
			intersectsTriangle( rayOrigin, rayDirection, a, b, c, localBarycoord, localNormal, localDist, localSide )
			&& localDist < minDistance
		) {

			found = true;
			minDistance = localDist;

			faceIndices = uvec4( indices.xyz, i );
			faceNormal = localNormal;

			side = localSide;
			barycoord = localBarycoord;
			dist = localDist;

		}

	}

	return found;

}

bool intersectsBVHNodeBounds( vec3 rayOrigin, vec3 rayDirection, sampler2D bvhBounds, uint currNodeIndex, out float dist ) {

	uint cni2 = currNodeIndex * 2u;
	vec3 boundsMin = texelFetch1D( bvhBounds, cni2 ).xyz;
	vec3 boundsMax = texelFetch1D( bvhBounds, cni2 + 1u ).xyz;
	return intersectsBounds( rayOrigin, rayDirection, boundsMin, boundsMax, dist );

}

// use a macro to hide the fact that we need to expand the struct into separate fields
#define	bvhIntersectFirstHit(		bvh,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)	_bvhIntersectFirstHit(		bvh.position, bvh.index, bvh.bvhBounds, bvh.bvhContents,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)

bool _bvhIntersectFirstHit(
	// bvh info
	sampler2D bvh_position, usampler2D bvh_index, sampler2D bvh_bvhBounds, usampler2D bvh_bvhContents,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// output variables split into separate variables due to output precision
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	// stack needs to be twice as long as the deepest tree we expect because
	// we push both the left and right child onto the stack every traversal
	int pointer = 0;
	uint stack[ BVH_STACK_DEPTH ];
	stack[ 0 ] = 0u;

	float triangleDistance = INFINITY;
	bool found = false;
	while ( pointer > - 1 && pointer < BVH_STACK_DEPTH ) {

		uint currNodeIndex = stack[ pointer ];
		pointer --;

		// check if we intersect the current bounds
		float boundsHitDistance;
		if (
			! intersectsBVHNodeBounds( rayOrigin, rayDirection, bvh_bvhBounds, currNodeIndex, boundsHitDistance )
			|| boundsHitDistance > triangleDistance
		) {

			continue;

		}

		uvec2 boundsInfo = uTexelFetch1D( bvh_bvhContents, currNodeIndex ).xy;
		bool isLeaf = bool( boundsInfo.x & 0xffff0000u );

		if ( isLeaf ) {

			uint count = boundsInfo.x & 0x0000ffffu;
			uint offset = boundsInfo.y;

			found = intersectTriangles(
				bvh_position, bvh_index, offset, count,
				rayOrigin, rayDirection, triangleDistance,
				faceIndices, faceNormal, barycoord, side, dist
			) || found;

		} else {

			uint leftIndex = currNodeIndex + 1u;
			uint splitAxis = boundsInfo.x & 0x0000ffffu;
			uint rightIndex = currNodeIndex + boundsInfo.y;

			bool leftToRight = rayDirection[ splitAxis ] >= 0.0;
			uint c1 = leftToRight ? leftIndex : rightIndex;
			uint c2 = leftToRight ? rightIndex : leftIndex;

			// set c2 in the stack so we traverse it later. We need to keep track of a pointer in
			// the stack while we traverse. The second pointer added is the one that will be
			// traversed first
			pointer ++;
			stack[ pointer ] = c2;

			pointer ++;
			stack[ pointer ] = c1;

		}

	}

	return found;

}
`, sb = `
struct BVH {

	usampler2D index;
	sampler2D position;

	sampler2D bvhBounds;
	usampler2D bvhContents;

};
`, cb = `
	${ab}
	${ob}
`, lb = e((e => { (function () { var t = function () { this.init() }; t.prototype = { init: function () { var e = this || n; return e._counter = 1e3, e._html5AudioPool = [], e.html5PoolSize = 10, e._codecs = {}, e._howls = [], e._muted = !1, e._volume = 1, e._canPlayEvent = `canplaythrough`, e._navigator = typeof window < `u` && window.navigator ? window.navigator : null, e.masterGain = null, e.noAudio = !1, e.usingWebAudio = !0, e.autoSuspend = !0, e.ctx = null, e.autoUnlock = !0, e._setup(), e }, volume: function (e) { var t = this || n; if (e = parseFloat(e), t.ctx || u(), e !== void 0 && e >= 0 && e <= 1) { if (t._volume = e, t._muted) return t; t.usingWebAudio && t.masterGain.gain.setValueAtTime(e, n.ctx.currentTime); for (var r = 0; r < t._howls.length; r++)if (!t._howls[r]._webAudio) for (var i = t._howls[r]._getSoundIds(), a = 0; a < i.length; a++) { var o = t._howls[r]._soundById(i[a]); o && o._node && (o._node.volume = o._volume * e) } return t } return t._volume }, mute: function (e) { var t = this || n; t.ctx || u(), t._muted = e, t.usingWebAudio && t.masterGain.gain.setValueAtTime(e ? 0 : t._volume, n.ctx.currentTime); for (var r = 0; r < t._howls.length; r++)if (!t._howls[r]._webAudio) for (var i = t._howls[r]._getSoundIds(), a = 0; a < i.length; a++) { var o = t._howls[r]._soundById(i[a]); o && o._node && (o._node.muted = e ? !0 : o._muted) } return t }, stop: function () { for (var e = this || n, t = 0; t < e._howls.length; t++)e._howls[t].stop(); return e }, unload: function () { for (var e = this || n, t = e._howls.length - 1; t >= 0; t--)e._howls[t].unload(); return e.usingWebAudio && e.ctx && e.ctx.close !== void 0 && (e.ctx.close(), e.ctx = null, u()), e }, codecs: function (e) { return (this || n)._codecs[e.replace(/^x-/, ``)] }, _setup: function () { var e = this || n; if (e.state = e.ctx && e.ctx.state || `suspended`, e._autoSuspend(), !e.usingWebAudio) if (typeof Audio < `u`) try { var t = new Audio; t.oncanplaythrough === void 0 && (e._canPlayEvent = `canplay`) } catch { e.noAudio = !0 } else e.noAudio = !0; try { var t = new Audio; t.muted && (e.noAudio = !0) } catch { } return e.noAudio || e._setupCodecs(), e }, _setupCodecs: function () { var e = this || n, t = null; try { t = typeof Audio < `u` ? new Audio : null } catch { return e } if (!t || typeof t.canPlayType != `function`) return e; var r = t.canPlayType(`audio/mpeg;`).replace(/^no$/, ``), i = e._navigator ? e._navigator.userAgent : ``, a = i.match(/OPR\/(\d+)/g), o = a && parseInt(a[0].split(`/`)[1], 10) < 33, s = i.indexOf(`Safari`) !== -1 && i.indexOf(`Chrome`) === -1, c = i.match(/Version\/(.*?) /), l = s && c && parseInt(c[1], 10) < 15; return e._codecs = { mp3: !!(!o && (r || t.canPlayType(`audio/mp3;`).replace(/^no$/, ``))), mpeg: !!r, opus: !!t.canPlayType(`audio/ogg; codecs="opus"`).replace(/^no$/, ``), ogg: !!t.canPlayType(`audio/ogg; codecs="vorbis"`).replace(/^no$/, ``), oga: !!t.canPlayType(`audio/ogg; codecs="vorbis"`).replace(/^no$/, ``), wav: !!(t.canPlayType(`audio/wav; codecs="1"`) || t.canPlayType(`audio/wav`)).replace(/^no$/, ``), aac: !!t.canPlayType(`audio/aac;`).replace(/^no$/, ``), caf: !!t.canPlayType(`audio/x-caf;`).replace(/^no$/, ``), m4a: !!(t.canPlayType(`audio/x-m4a;`) || t.canPlayType(`audio/m4a;`) || t.canPlayType(`audio/aac;`)).replace(/^no$/, ``), m4b: !!(t.canPlayType(`audio/x-m4b;`) || t.canPlayType(`audio/m4b;`) || t.canPlayType(`audio/aac;`)).replace(/^no$/, ``), mp4: !!(t.canPlayType(`audio/x-mp4;`) || t.canPlayType(`audio/mp4;`) || t.canPlayType(`audio/aac;`)).replace(/^no$/, ``), weba: !!(!l && t.canPlayType(`audio/webm; codecs="vorbis"`).replace(/^no$/, ``)), webm: !!(!l && t.canPlayType(`audio/webm; codecs="vorbis"`).replace(/^no$/, ``)), dolby: !!t.canPlayType(`audio/mp4; codecs="ec-3"`).replace(/^no$/, ``), flac: !!(t.canPlayType(`audio/x-flac;`) || t.canPlayType(`audio/flac;`)).replace(/^no$/, ``) }, e }, _unlockAudio: function () { var e = this || n; if (!(e._audioUnlocked || !e.ctx)) { e._audioUnlocked = !1, e.autoUnlock = !1, !e._mobileUnloaded && e.ctx.sampleRate !== 44100 && (e._mobileUnloaded = !0, e.unload()), e._scratchBuffer = e.ctx.createBuffer(1, 1, 22050); var t = function (n) { for (; e._html5AudioPool.length < e.html5PoolSize;)try { var r = new Audio; r._unlocked = !0, e._releaseHtml5Audio(r) } catch { e.noAudio = !0; break } for (var i = 0; i < e._howls.length; i++)if (!e._howls[i]._webAudio) for (var a = e._howls[i]._getSoundIds(), o = 0; o < a.length; o++) { var s = e._howls[i]._soundById(a[o]); s && s._node && !s._node._unlocked && (s._node._unlocked = !0, s._node.load()) } e._autoResume(); var c = e.ctx.createBufferSource(); c.buffer = e._scratchBuffer, c.connect(e.ctx.destination), c.start === void 0 ? c.noteOn(0) : c.start(0), typeof e.ctx.resume == `function` && e.ctx.resume(), c.onended = function () { c.disconnect(0), e._audioUnlocked = !0, document.removeEventListener(`touchstart`, t, !0), document.removeEventListener(`touchend`, t, !0), document.removeEventListener(`click`, t, !0), document.removeEventListener(`keydown`, t, !0); for (var n = 0; n < e._howls.length; n++)e._howls[n]._emit(`unlock`) } }; return document.addEventListener(`touchstart`, t, !0), document.addEventListener(`touchend`, t, !0), document.addEventListener(`click`, t, !0), document.addEventListener(`keydown`, t, !0), e } }, _obtainHtml5Audio: function () { var e = this || n; if (e._html5AudioPool.length) return e._html5AudioPool.pop(); var t = new Audio().play(); return t && typeof Promise < `u` && (t instanceof Promise || typeof t.then == `function`) && t.catch(function () { console.warn(`HTML5 Audio pool exhausted, returning potentially locked audio object.`) }), new Audio }, _releaseHtml5Audio: function (e) { var t = this || n; return e._unlocked && t._html5AudioPool.push(e), t }, _autoSuspend: function () { var e = this; if (!(!e.autoSuspend || !e.ctx || e.ctx.suspend === void 0 || !n.usingWebAudio)) { for (var t = 0; t < e._howls.length; t++)if (e._howls[t]._webAudio) { for (var r = 0; r < e._howls[t]._sounds.length; r++)if (!e._howls[t]._sounds[r]._paused) return e } return e._suspendTimer && clearTimeout(e._suspendTimer), e._suspendTimer = setTimeout(function () { if (e.autoSuspend) { e._suspendTimer = null, e.state = `suspending`; var t = function () { e.state = `suspended`, e._resumeAfterSuspend && (delete e._resumeAfterSuspend, e._autoResume()) }; e.ctx.suspend().then(t, t) } }, 3e4), e } }, _autoResume: function () { var e = this; if (!(!e.ctx || e.ctx.resume === void 0 || !n.usingWebAudio)) return e.state === `running` && e.ctx.state !== `interrupted` && e._suspendTimer ? (clearTimeout(e._suspendTimer), e._suspendTimer = null) : e.state === `suspended` || e.state === `running` && e.ctx.state === `interrupted` ? (e.ctx.resume().then(function () { e.state = `running`; for (var t = 0; t < e._howls.length; t++)e._howls[t]._emit(`resume`) }), e._suspendTimer &&= (clearTimeout(e._suspendTimer), null)) : e.state === `suspending` && (e._resumeAfterSuspend = !0), e } }; var n = new t, r = function (e) { var t = this; if (!e.src || e.src.length === 0) { console.error(`An array of source files must be passed with any new Howl.`); return } t.init(e) }; r.prototype = { init: function (e) { var t = this; return n.ctx || u(), t._autoplay = e.autoplay || !1, t._format = typeof e.format == `string` ? [e.format] : e.format, t._html5 = e.html5 || !1, t._muted = e.mute || !1, t._loop = e.loop || !1, t._pool = e.pool || 5, t._preload = typeof e.preload == `boolean` || e.preload === `metadata` ? e.preload : !0, t._rate = e.rate || 1, t._sprite = e.sprite || {}, t._src = typeof e.src == `string` ? [e.src] : e.src, t._volume = e.volume === void 0 ? 1 : e.volume, t._xhr = { method: e.xhr && e.xhr.method ? e.xhr.method : `GET`, headers: e.xhr && e.xhr.headers ? e.xhr.headers : null, withCredentials: e.xhr && e.xhr.withCredentials ? e.xhr.withCredentials : !1 }, t._duration = 0, t._state = `unloaded`, t._sounds = [], t._endTimers = {}, t._queue = [], t._playLock = !1, t._onend = e.onend ? [{ fn: e.onend }] : [], t._onfade = e.onfade ? [{ fn: e.onfade }] : [], t._onload = e.onload ? [{ fn: e.onload }] : [], t._onloaderror = e.onloaderror ? [{ fn: e.onloaderror }] : [], t._onplayerror = e.onplayerror ? [{ fn: e.onplayerror }] : [], t._onpause = e.onpause ? [{ fn: e.onpause }] : [], t._onplay = e.onplay ? [{ fn: e.onplay }] : [], t._onstop = e.onstop ? [{ fn: e.onstop }] : [], t._onmute = e.onmute ? [{ fn: e.onmute }] : [], t._onvolume = e.onvolume ? [{ fn: e.onvolume }] : [], t._onrate = e.onrate ? [{ fn: e.onrate }] : [], t._onseek = e.onseek ? [{ fn: e.onseek }] : [], t._onunlock = e.onunlock ? [{ fn: e.onunlock }] : [], t._onresume = [], t._webAudio = n.usingWebAudio && !t._html5, n.ctx !== void 0 && n.ctx && n.autoUnlock && n._unlockAudio(), n._howls.push(t), t._autoplay && t._queue.push({ event: `play`, action: function () { t.play() } }), t._preload && t._preload !== `none` && t.load(), t }, load: function () { var e = this, t = null; if (n.noAudio) { e._emit(`loaderror`, null, `No audio support.`); return } typeof e._src == `string` && (e._src = [e._src]); for (var r = 0; r < e._src.length; r++) { var a, s; if (e._format && e._format[r]) a = e._format[r]; else { if (s = e._src[r], typeof s != `string`) { e._emit(`loaderror`, null, `Non-string found in selected audio sources - ignoring.`); continue } a = /^data:audio\/([^;,]+);/i.exec(s), a ||= /\.([^.]+)$/.exec(s.split(`?`, 1)[0]), a &&= a[1].toLowerCase() } if (a || console.warn(`No file extension was found. Consider using the "format" property or specify an extension.`), a && n.codecs(a)) { t = e._src[r]; break } } if (!t) { e._emit(`loaderror`, null, `No codec support for selected audio sources.`); return } return e._src = t, e._state = `loading`, window.location.protocol === `https:` && t.slice(0, 5) === `http:` && (e._html5 = !0, e._webAudio = !1), new i(e), e._webAudio && o(e), e }, play: function (e, t) { var r = this, i = null; if (typeof e == `number`) i = e, e = null; else if (typeof e == `string` && r._state === `loaded` && !r._sprite[e]) return null; else if (e === void 0 && (e = `__default`, !r._playLock)) { for (var a = 0, o = 0; o < r._sounds.length; o++)r._sounds[o]._paused && !r._sounds[o]._ended && (a++, i = r._sounds[o]._id); a === 1 ? e = null : i = null } var s = i ? r._soundById(i) : r._inactiveSound(); if (!s) return null; if (i && !e && (e = s._sprite || `__default`), r._state !== `loaded`) { s._sprite = e, s._ended = !1; var c = s._id; return r._queue.push({ event: `play`, action: function () { r.play(c) } }), c } if (i && !s._paused) return t || r._loadQueue(`play`), s._id; r._webAudio && n._autoResume(); var l = Math.max(0, s._seek > 0 ? s._seek : r._sprite[e][0] / 1e3), u = Math.max(0, (r._sprite[e][0] + r._sprite[e][1]) / 1e3 - l), d = u * 1e3 / Math.abs(s._rate), f = r._sprite[e][0] / 1e3, p = (r._sprite[e][0] + r._sprite[e][1]) / 1e3; s._sprite = e, s._ended = !1; var m = function () { s._paused = !1, s._seek = l, s._start = f, s._stop = p, s._loop = !!(s._loop || r._sprite[e][2]) }; if (l >= p) { r._ended(s); return } var h = s._node; if (r._webAudio) { var g = function () { r._playLock = !1, m(), r._refreshBuffer(s); var e = s._muted || r._muted ? 0 : s._volume; h.gain.setValueAtTime(e, n.ctx.currentTime), s._playStart = n.ctx.currentTime, h.bufferSource.start === void 0 ? s._loop ? h.bufferSource.noteGrainOn(0, l, 86400) : h.bufferSource.noteGrainOn(0, l, u) : s._loop ? h.bufferSource.start(0, l, 86400) : h.bufferSource.start(0, l, u), d !== 1 / 0 && (r._endTimers[s._id] = setTimeout(r._ended.bind(r, s), d)), t || setTimeout(function () { r._emit(`play`, s._id), r._loadQueue() }, 0) }; n.state === `running` && n.ctx.state !== `interrupted` ? g() : (r._playLock = !0, r.once(`resume`, g), r._clearTimer(s._id)) } else { var _ = function () { h.currentTime = l, h.muted = s._muted || r._muted || n._muted || h.muted, h.volume = s._volume * n.volume(), h.playbackRate = s._rate; try { var i = h.play(); if (i && typeof Promise < `u` && (i instanceof Promise || typeof i.then == `function`) ? (r._playLock = !0, m(), i.then(function () { r._playLock = !1, h._unlocked = !0, t ? r._loadQueue() : r._emit(`play`, s._id) }).catch(function () { r._playLock = !1, r._emit(`playerror`, s._id, `Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.`), s._ended = !0, s._paused = !0 })) : t || (r._playLock = !1, m(), r._emit(`play`, s._id)), h.playbackRate = s._rate, h.paused) { r._emit(`playerror`, s._id, `Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.`); return } e !== `__default` || s._loop ? r._endTimers[s._id] = setTimeout(r._ended.bind(r, s), d) : (r._endTimers[s._id] = function () { r._ended(s), h.removeEventListener(`ended`, r._endTimers[s._id], !1) }, h.addEventListener(`ended`, r._endTimers[s._id], !1)) } catch (e) { r._emit(`playerror`, s._id, e) } }; h.src === `data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA` && (h.src = r._src, h.load()); var v = window && window.ejecta || !h.readyState && n._navigator.isCocoonJS; if (h.readyState >= 3 || v) _(); else { r._playLock = !0, r._state = `loading`; var y = function () { r._state = `loaded`, _(), h.removeEventListener(n._canPlayEvent, y, !1) }; h.addEventListener(n._canPlayEvent, y, !1), r._clearTimer(s._id) } } return s._id }, pause: function (e) { var t = this; if (t._state !== `loaded` || t._playLock) return t._queue.push({ event: `pause`, action: function () { t.pause(e) } }), t; for (var n = t._getSoundIds(e), r = 0; r < n.length; r++) { t._clearTimer(n[r]); var i = t._soundById(n[r]); if (i && !i._paused && (i._seek = t.seek(n[r]), i._rateSeek = 0, i._paused = !0, t._stopFade(n[r]), i._node)) if (t._webAudio) { if (!i._node.bufferSource) continue; i._node.bufferSource.stop === void 0 ? i._node.bufferSource.noteOff(0) : i._node.bufferSource.stop(0), t._cleanBuffer(i._node) } else (!isNaN(i._node.duration) || i._node.duration === 1 / 0) && i._node.pause(); arguments[1] || t._emit(`pause`, i ? i._id : null) } return t }, stop: function (e, t) { var n = this; if (n._state !== `loaded` || n._playLock) return n._queue.push({ event: `stop`, action: function () { n.stop(e) } }), n; for (var r = n._getSoundIds(e), i = 0; i < r.length; i++) { n._clearTimer(r[i]); var a = n._soundById(r[i]); a && (a._seek = a._start || 0, a._rateSeek = 0, a._paused = !0, a._ended = !0, n._stopFade(r[i]), a._node && (n._webAudio ? a._node.bufferSource && (a._node.bufferSource.stop === void 0 ? a._node.bufferSource.noteOff(0) : a._node.bufferSource.stop(0), n._cleanBuffer(a._node)) : (!isNaN(a._node.duration) || a._node.duration === 1 / 0) && (a._node.currentTime = a._start || 0, a._node.pause(), a._node.duration === 1 / 0 && n._clearSound(a._node))), t || n._emit(`stop`, a._id)) } return n }, mute: function (e, t) { var r = this; if (r._state !== `loaded` || r._playLock) return r._queue.push({ event: `mute`, action: function () { r.mute(e, t) } }), r; if (t === void 0) if (typeof e == `boolean`) r._muted = e; else return r._muted; for (var i = r._getSoundIds(t), a = 0; a < i.length; a++) { var o = r._soundById(i[a]); o && (o._muted = e, o._interval && r._stopFade(o._id), r._webAudio && o._node ? o._node.gain.setValueAtTime(e ? 0 : o._volume, n.ctx.currentTime) : o._node && (o._node.muted = n._muted ? !0 : e), r._emit(`mute`, o._id)) } return r }, volume: function () { var e = this, t = arguments, r, i; if (t.length === 0) return e._volume; t.length === 1 || t.length === 2 && t[1] === void 0 ? e._getSoundIds().indexOf(t[0]) >= 0 ? i = parseInt(t[0], 10) : r = parseFloat(t[0]) : t.length >= 2 && (r = parseFloat(t[0]), i = parseInt(t[1], 10)); var a; if (r !== void 0 && r >= 0 && r <= 1) { if (e._state !== `loaded` || e._playLock) return e._queue.push({ event: `volume`, action: function () { e.volume.apply(e, t) } }), e; i === void 0 && (e._volume = r), i = e._getSoundIds(i); for (var o = 0; o < i.length; o++)a = e._soundById(i[o]), a && (a._volume = r, t[2] || e._stopFade(i[o]), e._webAudio && a._node && !a._muted ? a._node.gain.setValueAtTime(r, n.ctx.currentTime) : a._node && !a._muted && (a._node.volume = r * n.volume()), e._emit(`volume`, a._id)) } else return a = i ? e._soundById(i) : e._sounds[0], a ? a._volume : 0; return e }, fade: function (e, t, r, i) { var a = this; if (a._state !== `loaded` || a._playLock) return a._queue.push({ event: `fade`, action: function () { a.fade(e, t, r, i) } }), a; e = Math.min(Math.max(0, parseFloat(e)), 1), t = Math.min(Math.max(0, parseFloat(t)), 1), r = parseFloat(r), a.volume(e, i); for (var o = a._getSoundIds(i), s = 0; s < o.length; s++) { var c = a._soundById(o[s]); if (c) { if (i || a._stopFade(o[s]), a._webAudio && !c._muted) { var l = n.ctx.currentTime, u = l + r / 1e3; c._volume = e, c._node.gain.setValueAtTime(e, l), c._node.gain.linearRampToValueAtTime(t, u) } a._startFadeInterval(c, e, t, r, o[s], i === void 0) } } return a }, _startFadeInterval: function (e, t, n, r, i, a) { var o = this, s = t, c = n - t, l = Math.abs(c / .01), u = Math.max(4, l > 0 ? r / l : r), d = Date.now(); e._fadeTo = n, e._interval = setInterval(function () { var i = (Date.now() - d) / r; d = Date.now(), s += c * i, s = Math.round(s * 100) / 100, s = c < 0 ? Math.max(n, s) : Math.min(n, s), o._webAudio ? e._volume = s : o.volume(s, e._id, !0), a && (o._volume = s), (n < t && s <= n || n > t && s >= n) && (clearInterval(e._interval), e._interval = null, e._fadeTo = null, o.volume(n, e._id), o._emit(`fade`, e._id)) }, u) }, _stopFade: function (e) { var t = this, r = t._soundById(e); return r && r._interval && (t._webAudio && r._node.gain.cancelScheduledValues(n.ctx.currentTime), clearInterval(r._interval), r._interval = null, t.volume(r._fadeTo, e), r._fadeTo = null, t._emit(`fade`, e)), t }, loop: function () { var e = this, t = arguments, n, r, i; if (t.length === 0) return e._loop; if (t.length === 1) if (typeof t[0] == `boolean`) n = t[0], e._loop = n; else return i = e._soundById(parseInt(t[0], 10)), i ? i._loop : !1; else t.length === 2 && (n = t[0], r = parseInt(t[1], 10)); for (var a = e._getSoundIds(r), o = 0; o < a.length; o++)i = e._soundById(a[o]), i && (i._loop = n, e._webAudio && i._node && i._node.bufferSource && (i._node.bufferSource.loop = n, n && (i._node.bufferSource.loopStart = i._start || 0, i._node.bufferSource.loopEnd = i._stop, e.playing(a[o]) && (e.pause(a[o], !0), e.play(a[o], !0))))); return e }, rate: function () { var e = this, t = arguments, r, i; t.length === 0 ? i = e._sounds[0]._id : t.length === 1 ? e._getSoundIds().indexOf(t[0]) >= 0 ? i = parseInt(t[0], 10) : r = parseFloat(t[0]) : t.length === 2 && (r = parseFloat(t[0]), i = parseInt(t[1], 10)); var a; if (typeof r == `number`) { if (e._state !== `loaded` || e._playLock) return e._queue.push({ event: `rate`, action: function () { e.rate.apply(e, t) } }), e; i === void 0 && (e._rate = r), i = e._getSoundIds(i); for (var o = 0; o < i.length; o++)if (a = e._soundById(i[o]), a) { e.playing(i[o]) && (a._rateSeek = e.seek(i[o]), a._playStart = e._webAudio ? n.ctx.currentTime : a._playStart), a._rate = r, e._webAudio && a._node && a._node.bufferSource ? a._node.bufferSource.playbackRate.setValueAtTime(r, n.ctx.currentTime) : a._node && (a._node.playbackRate = r); var s = e.seek(i[o]), c = ((e._sprite[a._sprite][0] + e._sprite[a._sprite][1]) / 1e3 - s) * 1e3 / Math.abs(a._rate); (e._endTimers[i[o]] || !a._paused) && (e._clearTimer(i[o]), e._endTimers[i[o]] = setTimeout(e._ended.bind(e, a), c)), e._emit(`rate`, a._id) } } else return a = e._soundById(i), a ? a._rate : e._rate; return e }, seek: function () { var e = this, t = arguments, r, i; if (t.length === 0 ? e._sounds.length && (i = e._sounds[0]._id) : t.length === 1 ? e._getSoundIds().indexOf(t[0]) >= 0 ? i = parseInt(t[0], 10) : e._sounds.length && (i = e._sounds[0]._id, r = parseFloat(t[0])) : t.length === 2 && (r = parseFloat(t[0]), i = parseInt(t[1], 10)), i === void 0) return 0; if (typeof r == `number` && (e._state !== `loaded` || e._playLock)) return e._queue.push({ event: `seek`, action: function () { e.seek.apply(e, t) } }), e; var a = e._soundById(i); if (a) if (typeof r == `number` && r >= 0) { var o = e.playing(i); o && e.pause(i, !0), a._seek = r, a._ended = !1, e._clearTimer(i), !e._webAudio && a._node && !isNaN(a._node.duration) && (a._node.currentTime = r); var s = function () { o && e.play(i, !0), e._emit(`seek`, i) }; if (o && !e._webAudio) { var c = function () { e._playLock ? setTimeout(c, 0) : s() }; setTimeout(c, 0) } else s() } else if (e._webAudio) { var l = e.playing(i) ? n.ctx.currentTime - a._playStart : 0, u = a._rateSeek ? a._rateSeek - a._seek : 0; return a._seek + (u + l * Math.abs(a._rate)) } else return a._node.currentTime; return e }, playing: function (e) { var t = this; if (typeof e == `number`) { var n = t._soundById(e); return n ? !n._paused : !1 } for (var r = 0; r < t._sounds.length; r++)if (!t._sounds[r]._paused) return !0; return !1 }, duration: function (e) { var t = this, n = t._duration, r = t._soundById(e); return r && (n = t._sprite[r._sprite][1] / 1e3), n }, state: function () { return this._state }, unload: function () { for (var e = this, t = e._sounds, r = 0; r < t.length; r++)t[r]._paused || e.stop(t[r]._id), e._webAudio || (e._clearSound(t[r]._node), t[r]._node.removeEventListener(`error`, t[r]._errorFn, !1), t[r]._node.removeEventListener(n._canPlayEvent, t[r]._loadFn, !1), t[r]._node.removeEventListener(`ended`, t[r]._endFn, !1), n._releaseHtml5Audio(t[r]._node)), delete t[r]._node, e._clearTimer(t[r]._id); var i = n._howls.indexOf(e); i >= 0 && n._howls.splice(i, 1); var o = !0; for (r = 0; r < n._howls.length; r++)if (n._howls[r]._src === e._src || e._src.indexOf(n._howls[r]._src) >= 0) { o = !1; break } return a && o && delete a[e._src], n.noAudio = !1, e._state = `unloaded`, e._sounds = [], e = null, null }, on: function (e, t, n, r) { var i = this, a = i[`_on` + e]; return typeof t == `function` && a.push(r ? { id: n, fn: t, once: r } : { id: n, fn: t }), i }, off: function (e, t, n) { var r = this, i = r[`_on` + e], a = 0; if (typeof t == `number` && (n = t, t = null), t || n) for (a = 0; a < i.length; a++) { var o = n === i[a].id; if (t === i[a].fn && o || !t && o) { i.splice(a, 1); break } } else if (e) r[`_on` + e] = []; else { var s = Object.keys(r); for (a = 0; a < s.length; a++)s[a].indexOf(`_on`) === 0 && Array.isArray(r[s[a]]) && (r[s[a]] = []) } return r }, once: function (e, t, n) { var r = this; return r.on(e, t, n, 1), r }, _emit: function (e, t, n) { for (var r = this, i = r[`_on` + e], a = i.length - 1; a >= 0; a--)(!i[a].id || i[a].id === t || e === `load`) && (setTimeout(function (e) { e.call(this, t, n) }.bind(r, i[a].fn), 0), i[a].once && r.off(e, i[a].fn, i[a].id)); return r._loadQueue(e), r }, _loadQueue: function (e) { var t = this; if (t._queue.length > 0) { var n = t._queue[0]; n.event === e && (t._queue.shift(), t._loadQueue()), e || n.action() } return t }, _ended: function (e) { var t = this, r = e._sprite; if (!t._webAudio && e._node && !e._node.paused && !e._node.ended && e._node.currentTime < e._stop) return setTimeout(t._ended.bind(t, e), 100), t; var i = !!(e._loop || t._sprite[r][2]); if (t._emit(`end`, e._id), !t._webAudio && i && t.stop(e._id, !0).play(e._id), t._webAudio && i) { t._emit(`play`, e._id), e._seek = e._start || 0, e._rateSeek = 0, e._playStart = n.ctx.currentTime; var a = (e._stop - e._start) * 1e3 / Math.abs(e._rate); t._endTimers[e._id] = setTimeout(t._ended.bind(t, e), a) } return t._webAudio && !i && (e._paused = !0, e._ended = !0, e._seek = e._start || 0, e._rateSeek = 0, t._clearTimer(e._id), t._cleanBuffer(e._node), n._autoSuspend()), !t._webAudio && !i && t.stop(e._id, !0), t }, _clearTimer: function (e) { var t = this; if (t._endTimers[e]) { if (typeof t._endTimers[e] != `function`) clearTimeout(t._endTimers[e]); else { var n = t._soundById(e); n && n._node && n._node.removeEventListener(`ended`, t._endTimers[e], !1) } delete t._endTimers[e] } return t }, _soundById: function (e) { for (var t = this, n = 0; n < t._sounds.length; n++)if (e === t._sounds[n]._id) return t._sounds[n]; return null }, _inactiveSound: function () { var e = this; e._drain(); for (var t = 0; t < e._sounds.length; t++)if (e._sounds[t]._ended) return e._sounds[t].reset(); return new i(e) }, _drain: function () { var e = this, t = e._pool, n = 0, r = 0; if (!(e._sounds.length < t)) { for (r = 0; r < e._sounds.length; r++)e._sounds[r]._ended && n++; for (r = e._sounds.length - 1; r >= 0; r--) { if (n <= t) return; e._sounds[r]._ended && (e._webAudio && e._sounds[r]._node && e._sounds[r]._node.disconnect(0), e._sounds.splice(r, 1), n--) } } }, _getSoundIds: function (e) { var t = this; if (e === void 0) { for (var n = [], r = 0; r < t._sounds.length; r++)n.push(t._sounds[r]._id); return n } else return [e] }, _refreshBuffer: function (e) { var t = this; return e._node.bufferSource = n.ctx.createBufferSource(), e._node.bufferSource.buffer = a[t._src], e._panner ? e._node.bufferSource.connect(e._panner) : e._node.bufferSource.connect(e._node), e._node.bufferSource.loop = e._loop, e._loop && (e._node.bufferSource.loopStart = e._start || 0, e._node.bufferSource.loopEnd = e._stop || 0), e._node.bufferSource.playbackRate.setValueAtTime(e._rate, n.ctx.currentTime), t }, _cleanBuffer: function (e) { var t = this, r = n._navigator && n._navigator.vendor.indexOf(`Apple`) >= 0; if (!e.bufferSource) return t; if (n._scratchBuffer && e.bufferSource && (e.bufferSource.onended = null, e.bufferSource.disconnect(0), r)) try { e.bufferSource.buffer = n._scratchBuffer } catch { } return e.bufferSource = null, t }, _clearSound: function (e) { /MSIE |Trident\//.test(n._navigator && n._navigator.userAgent) || (e.src = `data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA`) } }; var i = function (e) { this._parent = e, this.init() }; i.prototype = { init: function () { var e = this, t = e._parent; return e._muted = t._muted, e._loop = t._loop, e._volume = t._volume, e._rate = t._rate, e._seek = 0, e._paused = !0, e._ended = !0, e._sprite = `__default`, e._id = ++n._counter, t._sounds.push(e), e.create(), e }, create: function () { var e = this, t = e._parent, r = n._muted || e._muted || e._parent._muted ? 0 : e._volume; return t._webAudio ? (e._node = n.ctx.createGain === void 0 ? n.ctx.createGainNode() : n.ctx.createGain(), e._node.gain.setValueAtTime(r, n.ctx.currentTime), e._node.paused = !0, e._node.connect(n.masterGain)) : n.noAudio || (e._node = n._obtainHtml5Audio(), e._errorFn = e._errorListener.bind(e), e._node.addEventListener(`error`, e._errorFn, !1), e._loadFn = e._loadListener.bind(e), e._node.addEventListener(n._canPlayEvent, e._loadFn, !1), e._endFn = e._endListener.bind(e), e._node.addEventListener(`ended`, e._endFn, !1), e._node.src = t._src, e._node.preload = t._preload === !0 ? `auto` : t._preload, e._node.volume = r * n.volume(), e._node.load()), e }, reset: function () { var e = this, t = e._parent; return e._muted = t._muted, e._loop = t._loop, e._volume = t._volume, e._rate = t._rate, e._seek = 0, e._rateSeek = 0, e._paused = !0, e._ended = !0, e._sprite = `__default`, e._id = ++n._counter, e }, _errorListener: function () { var e = this; e._parent._emit(`loaderror`, e._id, e._node.error ? e._node.error.code : 0), e._node.removeEventListener(`error`, e._errorFn, !1) }, _loadListener: function () { var e = this, t = e._parent; t._duration = Math.ceil(e._node.duration * 10) / 10, Object.keys(t._sprite).length === 0 && (t._sprite = { __default: [0, t._duration * 1e3] }), t._state !== `loaded` && (t._state = `loaded`, t._emit(`load`), t._loadQueue()), e._node.removeEventListener(n._canPlayEvent, e._loadFn, !1) }, _endListener: function () { var e = this, t = e._parent; t._duration === 1 / 0 && (t._duration = Math.ceil(e._node.duration * 10) / 10, t._sprite.__default[1] === 1 / 0 && (t._sprite.__default[1] = t._duration * 1e3), t._ended(e)), e._node.removeEventListener(`ended`, e._endFn, !1) } }; var a = {}, o = function (e) { var t = e._src; if (a[t]) { e._duration = a[t].duration, l(e); return } if (/^data:[^;]+;base64,/.test(t)) { for (var n = atob(t.split(`,`)[1]), r = new Uint8Array(n.length), i = 0; i < n.length; ++i)r[i] = n.charCodeAt(i); c(r.buffer, e) } else { var o = new XMLHttpRequest; o.open(e._xhr.method, t, !0), o.withCredentials = e._xhr.withCredentials, o.responseType = `arraybuffer`, e._xhr.headers && Object.keys(e._xhr.headers).forEach(function (t) { o.setRequestHeader(t, e._xhr.headers[t]) }), o.onload = function () { var t = (o.status + ``)[0]; if (t !== `0` && t !== `2` && t !== `3`) { e._emit(`loaderror`, null, `Failed loading audio file with status: ` + o.status + `.`); return } c(o.response, e) }, o.onerror = function () { e._webAudio && (e._html5 = !0, e._webAudio = !1, e._sounds = [], delete a[t], e.load()) }, s(o) } }, s = function (e) { try { e.send() } catch { e.onerror() } }, c = function (e, t) { var r = function () { t._emit(`loaderror`, null, `Decoding audio data failed.`) }, i = function (e) { e && t._sounds.length > 0 ? (a[t._src] = e, l(t, e)) : r() }; typeof Promise < `u` && n.ctx.decodeAudioData.length === 1 ? n.ctx.decodeAudioData(e).then(i).catch(r) : n.ctx.decodeAudioData(e, i, r) }, l = function (e, t) { t && !e._duration && (e._duration = t.duration), Object.keys(e._sprite).length === 0 && (e._sprite = { __default: [0, e._duration * 1e3] }), e._state !== `loaded` && (e._state = `loaded`, e._emit(`load`), e._loadQueue()) }, u = function () { if (n.usingWebAudio) { try { typeof AudioContext < `u` ? n.ctx = new AudioContext : typeof webkitAudioContext < `u` ? n.ctx = new webkitAudioContext : n.usingWebAudio = !1 } catch { n.usingWebAudio = !1 } n.ctx || (n.usingWebAudio = !1); var e = /iP(hone|od|ad)/.test(n._navigator && n._navigator.platform), t = n._navigator && n._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/), r = t ? parseInt(t[1], 10) : null; if (e && r && r < 9) { var i = /safari/.test(n._navigator && n._navigator.userAgent.toLowerCase()); n._navigator && !i && (n.usingWebAudio = !1) } n.usingWebAudio && (n.masterGain = n.ctx.createGain === void 0 ? n.ctx.createGainNode() : n.ctx.createGain(), n.masterGain.gain.setValueAtTime(n._muted ? 0 : n._volume, n.ctx.currentTime), n.masterGain.connect(n.ctx.destination)), n._setup() } }; typeof define == `function` && define.amd && define([], function () { return { Howler: n, Howl: r } }), e !== void 0 && (e.Howler = n, e.Howl = r), typeof global < `u` ? (global.HowlerGlobal = t, global.Howler = n, global.Howl = r, global.Sound = i) : typeof window < `u` && (window.HowlerGlobal = t, window.Howler = n, window.Howl = r, window.Sound = i) })(), (function () { HowlerGlobal.prototype._pos = [0, 0, 0], HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0], HowlerGlobal.prototype.stereo = function (e) { var t = this; if (!t.ctx || !t.ctx.listener) return t; for (var n = t._howls.length - 1; n >= 0; n--)t._howls[n].stereo(e); return t }, HowlerGlobal.prototype.pos = function (e, t, n) { var r = this; if (!r.ctx || !r.ctx.listener) return r; if (t = typeof t == `number` ? t : r._pos[1], n = typeof n == `number` ? n : r._pos[2], typeof e == `number`) r._pos = [e, t, n], r.ctx.listener.positionX === void 0 ? r.ctx.listener.setPosition(r._pos[0], r._pos[1], r._pos[2]) : (r.ctx.listener.positionX.setTargetAtTime(r._pos[0], Howler.ctx.currentTime, .1), r.ctx.listener.positionY.setTargetAtTime(r._pos[1], Howler.ctx.currentTime, .1), r.ctx.listener.positionZ.setTargetAtTime(r._pos[2], Howler.ctx.currentTime, .1)); else return r._pos; return r }, HowlerGlobal.prototype.orientation = function (e, t, n, r, i, a) { var o = this; if (!o.ctx || !o.ctx.listener) return o; var s = o._orientation; if (t = typeof t == `number` ? t : s[1], n = typeof n == `number` ? n : s[2], r = typeof r == `number` ? r : s[3], i = typeof i == `number` ? i : s[4], a = typeof a == `number` ? a : s[5], typeof e == `number`) o._orientation = [e, t, n, r, i, a], o.ctx.listener.forwardX === void 0 ? o.ctx.listener.setOrientation(e, t, n, r, i, a) : (o.ctx.listener.forwardX.setTargetAtTime(e, Howler.ctx.currentTime, .1), o.ctx.listener.forwardY.setTargetAtTime(t, Howler.ctx.currentTime, .1), o.ctx.listener.forwardZ.setTargetAtTime(n, Howler.ctx.currentTime, .1), o.ctx.listener.upX.setTargetAtTime(r, Howler.ctx.currentTime, .1), o.ctx.listener.upY.setTargetAtTime(i, Howler.ctx.currentTime, .1), o.ctx.listener.upZ.setTargetAtTime(a, Howler.ctx.currentTime, .1)); else return s; return o }, Howl.prototype.init = (function (e) { return function (t) { var n = this; return n._orientation = t.orientation || [1, 0, 0], n._stereo = t.stereo || null, n._pos = t.pos || null, n._pannerAttr = { coneInnerAngle: t.coneInnerAngle === void 0 ? 360 : t.coneInnerAngle, coneOuterAngle: t.coneOuterAngle === void 0 ? 360 : t.coneOuterAngle, coneOuterGain: t.coneOuterGain === void 0 ? 0 : t.coneOuterGain, distanceModel: t.distanceModel === void 0 ? `inverse` : t.distanceModel, maxDistance: t.maxDistance === void 0 ? 1e4 : t.maxDistance, panningModel: t.panningModel === void 0 ? `HRTF` : t.panningModel, refDistance: t.refDistance === void 0 ? 1 : t.refDistance, rolloffFactor: t.rolloffFactor === void 0 ? 1 : t.rolloffFactor }, n._onstereo = t.onstereo ? [{ fn: t.onstereo }] : [], n._onpos = t.onpos ? [{ fn: t.onpos }] : [], n._onorientation = t.onorientation ? [{ fn: t.onorientation }] : [], e.call(this, t) } })(Howl.prototype.init), Howl.prototype.stereo = function (t, n) { var r = this; if (!r._webAudio) return r; if (r._state !== `loaded`) return r._queue.push({ event: `stereo`, action: function () { r.stereo(t, n) } }), r; var i = Howler.ctx.createStereoPanner === void 0 ? `spatial` : `stereo`; if (n === void 0) if (typeof t == `number`) r._stereo = t, r._pos = [t, 0, 0]; else return r._stereo; for (var a = r._getSoundIds(n), o = 0; o < a.length; o++) { var s = r._soundById(a[o]); if (s) if (typeof t == `number`) s._stereo = t, s._pos = [t, 0, 0], s._node && (s._pannerAttr.panningModel = `equalpower`, (!s._panner || !s._panner.pan) && e(s, i), i === `spatial` ? s._panner.positionX === void 0 ? s._panner.setPosition(t, 0, 0) : (s._panner.positionX.setValueAtTime(t, Howler.ctx.currentTime), s._panner.positionY.setValueAtTime(0, Howler.ctx.currentTime), s._panner.positionZ.setValueAtTime(0, Howler.ctx.currentTime)) : s._panner.pan.setValueAtTime(t, Howler.ctx.currentTime)), r._emit(`stereo`, s._id); else return s._stereo } return r }, Howl.prototype.pos = function (t, n, r, i) { var a = this; if (!a._webAudio) return a; if (a._state !== `loaded`) return a._queue.push({ event: `pos`, action: function () { a.pos(t, n, r, i) } }), a; if (n = typeof n == `number` ? n : 0, r = typeof r == `number` ? r : -.5, i === void 0) if (typeof t == `number`) a._pos = [t, n, r]; else return a._pos; for (var o = a._getSoundIds(i), s = 0; s < o.length; s++) { var c = a._soundById(o[s]); if (c) if (typeof t == `number`) c._pos = [t, n, r], c._node && ((!c._panner || c._panner.pan) && e(c, `spatial`), c._panner.positionX === void 0 ? c._panner.setPosition(t, n, r) : (c._panner.positionX.setValueAtTime(t, Howler.ctx.currentTime), c._panner.positionY.setValueAtTime(n, Howler.ctx.currentTime), c._panner.positionZ.setValueAtTime(r, Howler.ctx.currentTime))), a._emit(`pos`, c._id); else return c._pos } return a }, Howl.prototype.orientation = function (t, n, r, i) { var a = this; if (!a._webAudio) return a; if (a._state !== `loaded`) return a._queue.push({ event: `orientation`, action: function () { a.orientation(t, n, r, i) } }), a; if (n = typeof n == `number` ? n : a._orientation[1], r = typeof r == `number` ? r : a._orientation[2], i === void 0) if (typeof t == `number`) a._orientation = [t, n, r]; else return a._orientation; for (var o = a._getSoundIds(i), s = 0; s < o.length; s++) { var c = a._soundById(o[s]); if (c) if (typeof t == `number`) c._orientation = [t, n, r], c._node && (c._panner || (c._pos ||= a._pos || [0, 0, -.5], e(c, `spatial`)), c._panner.orientationX === void 0 ? c._panner.setOrientation(t, n, r) : (c._panner.orientationX.setValueAtTime(t, Howler.ctx.currentTime), c._panner.orientationY.setValueAtTime(n, Howler.ctx.currentTime), c._panner.orientationZ.setValueAtTime(r, Howler.ctx.currentTime))), a._emit(`orientation`, c._id); else return c._orientation } return a }, Howl.prototype.pannerAttr = function () { var t = this, n = arguments, r, i, a; if (!t._webAudio) return t; if (n.length === 0) return t._pannerAttr; if (n.length === 1) if (typeof n[0] == `object`) r = n[0], i === void 0 && (r.pannerAttr ||= { coneInnerAngle: r.coneInnerAngle, coneOuterAngle: r.coneOuterAngle, coneOuterGain: r.coneOuterGain, distanceModel: r.distanceModel, maxDistance: r.maxDistance, refDistance: r.refDistance, rolloffFactor: r.rolloffFactor, panningModel: r.panningModel }, t._pannerAttr = { coneInnerAngle: r.pannerAttr.coneInnerAngle === void 0 ? t._coneInnerAngle : r.pannerAttr.coneInnerAngle, coneOuterAngle: r.pannerAttr.coneOuterAngle === void 0 ? t._coneOuterAngle : r.pannerAttr.coneOuterAngle, coneOuterGain: r.pannerAttr.coneOuterGain === void 0 ? t._coneOuterGain : r.pannerAttr.coneOuterGain, distanceModel: r.pannerAttr.distanceModel === void 0 ? t._distanceModel : r.pannerAttr.distanceModel, maxDistance: r.pannerAttr.maxDistance === void 0 ? t._maxDistance : r.pannerAttr.maxDistance, refDistance: r.pannerAttr.refDistance === void 0 ? t._refDistance : r.pannerAttr.refDistance, rolloffFactor: r.pannerAttr.rolloffFactor === void 0 ? t._rolloffFactor : r.pannerAttr.rolloffFactor, panningModel: r.pannerAttr.panningModel === void 0 ? t._panningModel : r.pannerAttr.panningModel }); else return a = t._soundById(parseInt(n[0], 10)), a ? a._pannerAttr : t._pannerAttr; else n.length === 2 && (r = n[0], i = parseInt(n[1], 10)); for (var o = t._getSoundIds(i), s = 0; s < o.length; s++)if (a = t._soundById(o[s]), a) { var c = a._pannerAttr; c = { coneInnerAngle: r.coneInnerAngle === void 0 ? c.coneInnerAngle : r.coneInnerAngle, coneOuterAngle: r.coneOuterAngle === void 0 ? c.coneOuterAngle : r.coneOuterAngle, coneOuterGain: r.coneOuterGain === void 0 ? c.coneOuterGain : r.coneOuterGain, distanceModel: r.distanceModel === void 0 ? c.distanceModel : r.distanceModel, maxDistance: r.maxDistance === void 0 ? c.maxDistance : r.maxDistance, refDistance: r.refDistance === void 0 ? c.refDistance : r.refDistance, rolloffFactor: r.rolloffFactor === void 0 ? c.rolloffFactor : r.rolloffFactor, panningModel: r.panningModel === void 0 ? c.panningModel : r.panningModel }; var l = a._panner; l ||= (a._pos ||= t._pos || [0, 0, -.5], e(a, `spatial`), a._panner), l.coneInnerAngle = c.coneInnerAngle, l.coneOuterAngle = c.coneOuterAngle, l.coneOuterGain = c.coneOuterGain, l.distanceModel = c.distanceModel, l.maxDistance = c.maxDistance, l.refDistance = c.refDistance, l.rolloffFactor = c.rolloffFactor, l.panningModel = c.panningModel } return t }, Sound.prototype.init = (function (e) { return function () { var t = this, n = t._parent; t._orientation = n._orientation, t._stereo = n._stereo, t._pos = n._pos, t._pannerAttr = n._pannerAttr, e.call(this), t._stereo ? n.stereo(t._stereo) : t._pos && n.pos(t._pos[0], t._pos[1], t._pos[2], t._id) } })(Sound.prototype.init), Sound.prototype.reset = (function (e) { return function () { var t = this, n = t._parent; return t._orientation = n._orientation, t._stereo = n._stereo, t._pos = n._pos, t._pannerAttr = n._pannerAttr, t._stereo ? n.stereo(t._stereo) : t._pos ? n.pos(t._pos[0], t._pos[1], t._pos[2], t._id) : t._panner && (t._panner.disconnect(0), t._panner = void 0, n._refreshBuffer(t)), e.call(this) } })(Sound.prototype.reset); var e = function (e, t) { t ||= `spatial`, t === `spatial` ? (e._panner = Howler.ctx.createPanner(), e._panner.coneInnerAngle = e._pannerAttr.coneInnerAngle, e._panner.coneOuterAngle = e._pannerAttr.coneOuterAngle, e._panner.coneOuterGain = e._pannerAttr.coneOuterGain, e._panner.distanceModel = e._pannerAttr.distanceModel, e._panner.maxDistance = e._pannerAttr.maxDistance, e._panner.refDistance = e._pannerAttr.refDistance, e._panner.rolloffFactor = e._pannerAttr.rolloffFactor, e._panner.panningModel = e._pannerAttr.panningModel, e._panner.positionX === void 0 ? e._panner.setPosition(e._pos[0], e._pos[1], e._pos[2]) : (e._panner.positionX.setValueAtTime(e._pos[0], Howler.ctx.currentTime), e._panner.positionY.setValueAtTime(e._pos[1], Howler.ctx.currentTime), e._panner.positionZ.setValueAtTime(e._pos[2], Howler.ctx.currentTime)), e._panner.orientationX === void 0 ? e._panner.setOrientation(e._orientation[0], e._orientation[1], e._orientation[2]) : (e._panner.orientationX.setValueAtTime(e._orientation[0], Howler.ctx.currentTime), e._panner.orientationY.setValueAtTime(e._orientation[1], Howler.ctx.currentTime), e._panner.orientationZ.setValueAtTime(e._orientation[2], Howler.ctx.currentTime))) : (e._panner = Howler.ctx.createStereoPanner(), e._panner.pan.setValueAtTime(e._stereo, Howler.ctx.currentTime)), e._panner.connect(e._node), e._paused || e._parent.pause(e._id, !0).play(e._id, !0) } })() }))(); new class { constructor() { this.designBase = { width: 1920, height: 1080 }, this.scale = 1, this.init() } init() { window.addEventListener(`resize`, () => this.update()), this.update() } update() { let e = window.innerWidth, t = window.innerHeight, n = Math.sqrt(this.designBase.width ** 2 + this.designBase.height ** 2), r = Math.sqrt(e ** 2 + t ** 2); this.scale = r / n, document.documentElement.style.setProperty(`--scale`, this.scale.toFixed(4)), document.body.classList.toggle(`is-mobile`, e <= 768) } px(e) { return e * this.scale } }; var ub = 1, db = 45, fb = [[70, 80], [120, 140], [330, 340], [467, 477], [545, 555]], pb = [70, 130, 335, 472, 550], mb = !1, hb = document.querySelector(`canvas.webgl`), gb = new Ws, _b = { width: window.innerWidth, height: window.innerHeight }, vb = new Ph({ canvas: hb, antialias: !0, alpha: !0 }); vb.setSize(_b.width, _b.height), vb.setPixelRatio(Math.min(window.devicePixelRatio, 2)), vb.outputColorSpace = Ya; var yb = new Od(db, _b.width / _b.height, .1, 100); yb.position.set(0, 0, 5), gb.add(yb); var bb = { position: new K, quaternion: new Vo, fov: db }, xb = new Yg(vb), Sb = new Xg(gb, yb), Cb = new Qg(new G(_b.width, _b.height), .15, 1, 0); xb.addPass(Sb), xb.addPass(Cb); var wb = new Ws, Tb = new Nd(-1, 1, 1, -1, 0, 1), Eb = new Mu({
		uniforms: { uProgress: { value: 1 }, uTime: { value: 0 }, uColorCenter: { value: new X(`#1c1508`) }, uColorEdge: { value: new X(`#050402`) } }, transparent: !0, depthTest: !1, depthWrite: !1, vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position.xy, 1.0, 1.0);
    }
  `, fragmentShader: `
    uniform float uProgress;
    uniform float uTime;
    uniform vec3 uColorCenter;
    uniform vec3 uColorEdge;
    varying vec2 vUv;

    vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                         -0.577350269189626, 0.024390243902439);
      vec2 i = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m; m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
      vec3 g;
      g.x = a0.x * x0.x + h.x * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      if (uProgress <= 0.005) discard;

      // Unique 'Liquid' Perlin Noise with multiple octaves
      float n = snoise(vUv * 2.5 + uTime * 0.1) * 0.5
              + snoise(vUv * 5.0 - uTime * 0.08) * 0.3
              + snoise(vUv * 10.0 + uTime * 0.05) * 0.2;
      n = n * 0.5 + 0.5;

      // Premium 'Liquid Reveal' Logic
      float p = uProgress * 1.5 - 0.25; 
      float mask = 1.0 - smoothstep(p - 0.15, p + 0.15, n);
      
      // Energy Edge: A subtle 'shimmer' at the transition point
      float edge = smoothstep(p - 0.15, p, n) * (1.0 - smoothstep(p, p + 0.15, n));
      edge *= pow(1.0 - uProgress, 2.0); // Fade edge as we finish

      // Match the preloader radial gradient
      float dist = distance(vUv, vec2(0.5));
      vec3 bgColor = mix(uColorCenter, uColorEdge, smoothstep(0.0, 0.8, dist));
      
      // Add a slight 'platinum' shimmer to the revealing edge
      vec3 edgeColor = vec3(1.0, 0.84, 0.22) * edge * 0.5;
      vec3 finalColor = bgColor + edgeColor;

      gl_FragColor = vec4(finalColor, mask);
      
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `}); wb.add(new hl(new Su(2, 2), Eb)); var Db = !0, Ob = { parallaxIntensity: .06, parallaxSmoothing: .025, scrollDuration: 6.5 }, kb = new Fu({ color: new X(`#F5B800`), roughness: .15, metalness: .15, transmission: .67, thickness: 2, ior: 2.07, clearcoat: 1, clearcoatRoughness: .05, envMapIntensity: 1.5, sheenColor: new X(`#D4AF37`), sheen: .3 }), Ab = new Fu({ color: new X(`#D4AF37`), roughness: 0, metalness: 1, transmission: .51, thickness: 1.7, ior: 1.57, clearcoat: .48, clearcoatRoughness: .25, envMapIntensity: 2.9, sheenColor: new X(`#2A1F00`), sheen: .48 }), jb = class { constructor(e, t, n) { this.button = e, this.canvas = t, this.audioSrc = n, this.active = !1, this.hover = !1, this.volume = 0, this.amp = 0, this.h = 0, this.ctx = null, this.width = 0, this.height = 0, this.animationId = null, this.settings = { width: 40, height: 6, amplitude: -.18, hoverHeight: 1.5, hoverAmplitude: -.1, speed: 3.7 }, this.init() } init() { this.audio = new lb.Howl({ src: [this.audioSrc], loop: !0, volume: 0, preload: !0 }), this.button.addEventListener(`click`, e => { e.stopImmediatePropagation(), this.active = !this.active, this.button.classList.toggle(`active`, this.active), this.active && this.audio.play(), Hb !== void 0 && Hb.play(), this.hover = !1 }), this.button.addEventListener(`mouseenter`, () => { this.hover = !0 }), this.button.addEventListener(`mouseleave`, () => { this.hover = !1 }), window.addEventListener(`blur`, () => { this.audio && this.audio.mute(!0) }), window.addEventListener(`focus`, () => { this.audio && this.audio.mute(!1) }), this.ctx = this.canvas.getContext(`2d`), this.width = this.canvas.clientWidth, this.height = this.canvas.clientHeight; let e = window.devicePixelRatio || 1; this.canvas.width = this.width * e, this.canvas.height = this.height * e, this.canvas.style.width = `${this.width}px`, this.canvas.style.height = `${this.height}px`, this.ctx && this.ctx.setTransform(e, 0, 0, e, 0, 0), this.animate() } draw(e) { if (this.ctx) { this.ctx.clearRect(-1, -1, this.width + 2, this.height + 2), this.ctx.beginPath(), this.ctx.strokeStyle = `#D4AF37`, this.ctx.lineWidth = 1, this.ctx.lineCap = `round`, this.ctx.lineJoin = `round`; for (let t = 0; t < this.settings.width; t++) { let n = this.width / 2 - this.settings.width / 2 * .8 + t * .8, r = e * this.settings.speed + t * this.amp, i = this.height / 2 + -Math.cos(r) * this.h; t === 0 ? this.ctx.moveTo(n, i) : this.ctx.lineTo(n, i) } this.ctx.stroke() } } animate = () => { let e = performance.now() / 1e3, t = this.hover ? this.settings.hoverHeight : 0; this.active && (t = this.settings.height), this.h = Bo.lerp(this.h, t, .04); let n = this.hover ? this.settings.hoverAmplitude : 0; this.active && (n = this.settings.amplitude), this.amp = Bo.lerp(this.amp, n, .04); let r = +!!this.active; this.volume = Bo.lerp(this.volume, r, .04), this.audio && (this.audio.volume(this.volume), !this.active && this.volume < .01 && this.audio.playing() && this.audio.stop()), this.draw(e), this.animationId = requestAnimationFrame(this.animate) } }; function Mb() { document.querySelectorAll(`.hero-title, .section-title, .about-title, .info-value`).forEach(e => { let t = Array.from(e.childNodes); e.innerHTML = ``, t.forEach(t => { if (t.nodeType === Node.TEXT_NODE) t.textContent.split(``).forEach(t => { let n = document.createElement(`span`); n.textContent = t === ` ` ? `\xA0` : t, e.appendChild(n) }); else if (t.nodeName === `BR`) e.appendChild(t.cloneNode(!0)); else if (t.nodeName === `A` || t.nodeName === `SPAN`) { let n = t.cloneNode(!1); t.textContent.split(``).forEach(e => { let t = document.createElement(`span`); t.textContent = e === ` ` ? `\xA0` : e, n.appendChild(t) }), e.appendChild(n) } }) }) } Mb(); var Nb = document.getElementById(`progress-bar`), Pb = document.getElementById(`loading-screen`), Fb = document.getElementById(`enter-btn`), Ib = document.getElementById(`audio-btn`), Lb = document.getElementById(`audio-wave`), Rb = document.querySelector(`.about-btn`), zb = document.querySelector(`.vig-tl`), Bb = document.querySelector(`.vig-tr`), Vb = new lb.Howl({ src: [`/neos7gold_marketplace/on_click_Sound.ogg`], volume: .45, rate: .3, pool: 8 }); new lb.Howl({ src: [`/neos7gold_marketplace/on_click_Sound.ogg`], volume: .35, rate: .5, pool: 6 }); var Hb = new lb.Howl({ src: [`/neos7gold_marketplace/on_click_Sound.ogg`], volume: .3, rate: .9, pool: 5 }), Ub = new lb.Howl({ src: [`/neos7gold_marketplace/on_click_Sound.ogg`], volume: .35, rate: .25, pool: 3 }); function Wb(e) { document.querySelectorAll(e).forEach(e => { e.id === `audio-btn` || e.classList.contains(`about-btn`) || e.id === `enter-btn` || e.classList.contains(`audio-toggle`) || e.addEventListener(`click`, e => { e.currentTarget.id !== `audio-btn` && Vb && Vb.play() }) }) } Fb && Fb.addEventListener(`click`, () => { Hb !== void 0 && Hb.play(), ox() }), Wb(`button, .logo-wrap, .header-item`); var Gb = null; Ib && Lb && (Gb = new jb(Ib, Lb, `/neos7gold_marketplace/background_music.mp3`), Ib.addEventListener(`mouseenter`, () => { Bb && Bb.classList.add(`hover-active`) }), Ib.addEventListener(`mouseleave`, () => { Bb && Bb.classList.remove(`hover-active`) })); var Kb = document.querySelector(`.logo-wrap`); Kb && Kb.addEventListener(`click`, () => { if (Jx || !mb || !Ox || qx === 0) return; let e = Math.round(Yx.animTime * 24), t = Math.round(Ox * 24), n = pb[0], r = e % t; r < 0 && (r += t); let i = n - r; i > 0 && (i -= t); let a = Yx.animTime + i / 24; Jx = !0, xi.to(Yx, { animTime: a, duration: 3, ease: `power2.inOut`, onComplete: () => { Jx = !1, qx = 0, Yx.animTime = a } }) }); var qb = document.querySelector(`.cta-btn`); qb && qb.addEventListener(`click`, () => { Hb !== void 0 && Hb.play(), qx === 0 && Qx(1, 1) }), Rb && (window.isAboutOpen = !1, Rb.addEventListener(`click`, () => { window.isAboutOpen = !window.isAboutOpen, Hb !== void 0 && Hb.play(), document.body.classList.toggle(`about-open`, window.isAboutOpen), Rb.textContent = window.isAboutOpen ? `Close` : `About`; let e = [document.querySelector(`.hero-main`), document.querySelector(`.hero-footer`), document.querySelector(`.hero-scroll-indicator`), ...document.querySelectorAll(`.section-content`)]; if (window.isAboutOpen) { xi.to(e, { opacity: 0, y: 15, duration: .8, stagger: .02, ease: `power3.inOut`, pointerEvents: `none` }), xi.killTweensOf([`#about-overlay`, `.about-vector-wrap`, `.about-logo-img`, `.about-eyebrow`, `.about-text`, `.about-credentials`]), xi.set([`.about-eyebrow`, `.about-text`, `.about-credentials`], { scale: .98, filter: `blur(10px)` }); let t = xi.timeline(); t.to(`#about-overlay`, { opacity: 1, duration: 1, ease: `power2.inOut` }), t.to(`.about-vector-wrap`, { opacity: 1, scale: 1, filter: `blur(0px)`, duration: 1.8, ease: `expo.out` }, .2), t.to(`.about-eyebrow`, { opacity: 1, y: 0, scale: 1, filter: `blur(0px)`, duration: 1.4, ease: `power3.out` }, .7), t.to(`.about-text`, { opacity: 1, y: 0, scale: 1, filter: `blur(0px)`, duration: 1.8, ease: `power3.out` }, .9), t.to(`.about-credentials`, { opacity: 1, y: 0, scale: 1, filter: `blur(0px)`, duration: 1.4, ease: `power3.out` }, 1.1), Jx = !0 } else { xi.killTweensOf([`#about-overlay`, `.about-vector-wrap`, `.about-logo-img`, `.about-eyebrow`, `.about-text`, `.about-credentials`]); let t = xi.timeline({ onComplete: () => { Jx = !1 } }); t.to([`.about-vector-wrap`, `.about-eyebrow`, `.about-text`, `.about-credentials`], { opacity: 0, y: -20, filter: `blur(10px)`, duration: .8, ease: `power2.in` }), t.to(`#about-overlay`, { opacity: 0, duration: .8 }, .4); let n = [document.querySelector(`.hero-main`), document.querySelector(`.hero-footer`), ...document.querySelectorAll(`.section-content.active`)].filter(e => e !== null); t.set(e, { clearProps: `opacity,y,pointerEvents` }, .6), t.fromTo(n, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 1.5, stagger: .05, ease: `power3.out`, pointerEvents: `auto` }, .6) } }), Rb.addEventListener(`mouseenter`, () => { zb && zb.classList.add(`hover-active`) }), Rb.addEventListener(`mouseleave`, () => { zb && zb.classList.remove(`hover-active`) })); function Jb(e, t, n) { n.aspect = e / t, n.fov = db, n.updateProjectionMatrix() } var Yb = new Mu({ side: 1, uniforms: { uBottom: { value: new X(`#140f06`) }, uTop: { value: new X(`#050402`) } }, vertexShader: `varying vec3 vPos; void main(){ vPos=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`, fragmentShader: `varying vec3 vPos; uniform vec3 uBottom,uTop; void main(){ float t=clamp((vPos.y+80.0)/160.0,0.0,1.0); gl_FragColor=vec4(mix(uBottom,uTop,t),1.0); }` }); gb.add(new hl(new Cu(80, 32, 32), Yb)); var Xb = new Uc, Zb = new Float32Array(380 * 3); for (let e = 0; e < 380; e++) { let t = Math.random() * Math.PI * 2, n = Math.acos(2 * Math.random() - 1), r = 75 + Math.random() * 3; Zb.set([r * Math.sin(n) * Math.cos(t), r * Math.sin(n) * Math.sin(t), r * Math.cos(n)], e * 3) } Xb.setAttribute(`position`, new Oc(Zb, 3)), gb.add(new hu(Xb, new uu({ color: 16768883, size: .14, transparent: !0, opacity: .75 }))), gb.add(new Id(16774616, .75)); var Qb = new Fd(16769177, 5); Qb.position.set(10, 10, 5), gb.add(Qb); var $b = new Fd(14400323, .85); $b.position.set(-8, 4, -6), gb.add($b); var ex = 2, tx = new Ad(16769177, 3, 30, Math.PI / 5, .5, 1); tx.position.set(2, 6, 4), tx.layers.set(ex), gb.add(tx); var nx = new Md(16760635, 2.5, 18); nx.position.set(-4, 3, -3), nx.layers.set(ex), gb.add(nx); var rx = !1, ix = new od; function ax() { let e = document.querySelector(`.loader-logo-svg`); setTimeout(() => { e && e.classList.add(`reveal`) }, 600), xi.to(`#gold-flow-loader`, { attr: { x1: `-100%`, x2: `100%` }, duration: 4, repeat: -1, ease: `none` }) } ax(), xi.set(`.loader-action-wrap, .loader-desc`, { opacity: 0, visibility: `hidden` }), ix.onLoad=()=>{rx=!0;let e=document.querySelector(`.loader-progress-wrap`),t=document.querySelector(`.loader-brand-wrap`),n=document.querySelector(`.loader-action-wrap`),r=document.querySelector(`.loader-desc`);try{vb.compile(gb,yb);xb.render()}catch(i){}t&&t.classList.add(`exit`),e&&xi.to(e,{opacity:0,duration:.2,ease:`power2.inOut`}),requestAnimationFrame(()=>{if(n){xi.set(n,{display:`flex`,visibility:`visible`}),xi.to(n,{opacity:1,pointerEvents:`auto`,duration:.35,ease:`power2.out`});let e=document.getElementById(`enter-btn`);e&&xi.to(e,{filter:`blur(0px)`,opacity:1,duration:.35,ease:`power2.out`,onComplete:()=>{xi.to(e,{opacity:.85,duration:1.8,repeat:-1,yoyo:!0,ease:`sine.inOut`})}})}r&&(xi.set(r,{display:`block`,visibility:`visible`}),xi.to(r,{opacity:1,duration:.35,ease:`power2.out`}))})},ix.onProgress=(e,t,n)=>{if(Nb){let e=t/n*100;xi.to(Nb,{width:e+`%`,duration:.2,ease:`power2.out`})}};function ox(){if(!rx)return;mb=!0;let e=document.querySelector(`.loader-action-wrap`),t=document.querySelector(`.loader-desc`),n=document.querySelector(`.loader-brand-wrap`);xi.to([e,t,n],{opacity:0,filter:`blur(40px)`,y:-40,duration:.8,stagger:.06,ease:`power3.inOut`}),Pb&&(Pb.style.pointerEvents=`none`,xi.to(Pb,{opacity:0,duration:.4,ease:`power2.out`,onComplete:()=>{Pb.style.display=`none`}})),xi.to(Eb.uniforms.uProgress,{value:-.1,duration:1.8,ease:`power3.inOut`,onComplete:()=>{Db=!1}}),Jx=!0,xi.to(Yx,{animTime:pb[0]/24,duration:1.8,ease:`power3.inOut`,onComplete:()=>{Jx=!1,qx=0}}),setTimeout(()=>{Jx=!1},700),setTimeout(()=>{Lx(),Fx(0),Gb&&!Gb.active&&(Gb.active=!0,Gb.button.classList.add(`active`),Gb.audio.play())},1000)} var sx = new hd(ix), cx = new Rh(ix), lx = new Rg; lx.setDecoderPath(`/neos7gold_marketplace/draco/`), cx.setDRACOLoader(lx); function ux(e, t, n) {
	let r = new Yy(e, { strategy: 2, maxLeafTris: 1 }), i = new nb; return i.updateFrom(r), new Mu({
		uniforms: { envMap: { value: t }, bvh: { value: i }, projectionMatrixInv: { value: n.projectionMatrixInverse }, viewMatrixInv: { value: n.matrixWorld }, resolution: { value: new G(_b.width, _b.height) }, bounces: { value: 3 }, ior: { value: 1.95 }, color: { value: new X(`#FFF4D0`) }, fastChroma: { value: !1 }, aberrationStrength: { value: .104 } }, vertexShader: `
      varying vec3 vWorldPosition; varying vec3 vNormal;
      uniform mat4 viewMatrixInv;
      void main(){
        vWorldPosition=(modelMatrix*vec4(position,1.0)).xyz;
        vNormal=(viewMatrixInv*vec4(normalMatrix*normal,0.0)).xyz;
        gl_Position=projectionMatrix*viewMatrix*modelMatrix*vec4(position,1.0);
      }`, fragmentShader: `
      #define RAY_OFFSET 0.001
      #include <common>
      precision highp isampler2D; precision highp usampler2D;
      ${sb} ${cb}
      varying vec3 vWorldPosition; varying vec3 vNormal;
      uniform sampler2D envMap; uniform float bounces; uniform BVH bvh; uniform float ior;
      uniform vec3 color; uniform bool fastChroma;
      uniform mat4 projectionMatrixInv,viewMatrixInv,modelMatrix; uniform vec2 resolution;
      uniform float aberrationStrength;
      #include <cube_uv_reflection_fragment>
      vec2 equirectUv2(vec3 d){ return vec2(atan(d.z,d.x)/(2.0*PI)+0.5,asin(clamp(d.y,-1.0,1.0))/PI+0.5); }
      vec3 tir(vec3 ro,vec3 rd,vec3 n,float iv,mat4 mmi){
        vec3 ray=refract(rd,n,1.0/iv);
        ro=vWorldPosition+ray*RAY_OFFSET;
        ro=(mmi*vec4(ro,1.0)).xyz; ray=normalize((mmi*vec4(ray,0.0)).xyz);
        for(float i=0.0;i<bounces;i++){
          uvec4 fi=uvec4(0u); vec3 fn=vec3(0,0,1),bc=vec3(0); float s=1.0,d=0.0;
          bvhIntersectFirstHit(bvh,ro,ray,fi,fn,bc,s,d);
          vec3 hp=ro+ray*d; vec3 rr=refract(ray,fn,iv);
          if(length(rr)>0.0){ray=rr;break;}
          ray=reflect(ray,fn); ro=hp+ray*RAY_OFFSET;
        }
        return normalize((modelMatrix*vec4(ray,0.0)).xyz);
      }
      vec4 envS(sampler2D m,vec3 d){ return texture(m,equirectUv2(d)); }
      void main(){
        mat4 mmi=inverse(modelMatrix); vec3 ro=cameraPosition;
        vec3 rd=normalize(vWorldPosition-cameraPosition);
        if(aberrationStrength!=0.0){
          vec3 dG=tir(ro,rd,vNormal,max(ior,1.0),mmi),dR,dB;
          if(fastChroma){dR=normalize(dG+vec3(aberrationStrength*.5));dB=normalize(dG-vec3(aberrationStrength*.5));}
          else{float rI=max(ior*(1.0-aberrationStrength),1.0),bI=max(ior*(1.0+aberrationStrength),1.0);dR=tir(ro,rd,vNormal,rI,mmi);dB=tir(ro,rd,vNormal,bI,mmi);}
          gl_FragColor=vec4(vec3(envS(envMap,dR).r,envS(envMap,dG).g,envS(envMap,dB).b)*color,1.0);
        } else {
          gl_FragColor=vec4(envS(envMap,tir(ro,rd,vNormal,max(ior,1.0),mmi)).rgb*color,1.0);
        }
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`, side: 2
	})
} function dx(e, t = 1, n = 1) { let r = sx.load(e); return r.wrapS = r.wrapT = Ci, r.repeat.set(t, n), r } var fx = dx(`/neos7gold_marketplace/platinum_roughness.png`, 5, 5), px = dx(`/neos7gold_marketplace/necklace_normal.png`, 5, 5), mx = dx(`/neos7gold_marketplace/necklace_ao.png`, 5, 5); mx.channel = 0; var hx = new Fu({ color: 14728522, roughness: .32, metalness: 1, roughnessMap: fx, bumpMap: fx, bumpScale: .015, normalMap: px, normalScale: new G(.41, .41), aoMap: mx, aoMapIntensity: 4, clearcoat: 1, clearcoatRoughness: .4, envMapIntensity: 2.2 }), gx = new Fu({ color: 0, roughness: .38, metalness: .1, bumpMap: dx(`/neos7gold_marketplace/velvet_bump.png`, 8, 8), bumpScale: .008, sheen: .56, sheenRoughness: .31, sheenColor: 13938487, envMapIntensity: .5 }), _x = new Fu({ color: 14728522, emissive: 14728522, emissiveIntensity: .35, roughness: .2, metalness: .95, reflectivity: 1 }), vx = new Fu({ color: 1710618, emissive: 1052688, emissiveIntensity: .04, roughness: .52, metalness: .4, reflectivity: 1 }), yx = new Xf(256, { format: qi, generateMipmaps: !0, minFilter: ji }), bx = new Hd(.1, 100, yx); gb.add(bx); var xx = new Fu({ color: 14869503, roughness: .02, metalness: 0, envMapIntensity: 1.5, map: dx(`/neos7gold_marketplace/dark_marble.png`, 4, 4), envMap: yx.texture }); function Sx(e) { let t = sx.load(`/neos7gold_marketplace/textures/${e}?v=3`); return t.flipY = !1, t.colorSpace = Ya, t.anisotropy = vb.capabilities.getMaxAnisotropy(), new rl({ map: t }) } var Cx = { s1: Sx(`s1_baked.jpg`), s2: Sx(`s2_baked.jpg`), s3: Sx(`s3_main_baked_v2.jpg`), s3_stone: Sx(`s3_stones_baked.jpg`), s4: Sx(`s4_baked.jpg`) }, wx = new Mu({ uniforms: { uTime: { value: 0 }, uColorGreen: { value: new X(`#000000`) }, uColorPurple: { value: new X(`#1a1406`) }, uIntensity: { value: 2 } }, vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`, fragmentShader: `varying vec2 vUv; uniform float uTime; uniform vec3 uColorGreen, uColorPurple; uniform float uIntensity; void main() { float noise = sin(vUv.y * 10.0 + uTime * 2.0); vec3 finalColor = mix(uColorGreen, uColorPurple, noise * 0.5 + 0.5); gl_FragColor = vec4(finalColor * uIntensity, 1.0); }` }), Tx = new Fu({ color: 43775, transmission: .9, roughness: .1, ior: 1.33 }), Ex = null, Dx = null, Ox = 0; function kx(e) { let t = e.name.toLowerCase(); return e.geometry.attributes.uv1 && e.geometry.setAttribute(`uv`, e.geometry.attributes.uv1), t.includes(`eye`) && (t.includes(`panther`) || t.includes(`s2`)) ? (e.layers.enable(ub), e.layers.enable(ex), new rl({ color: new X(`#FFDF73`).multiplyScalar(15) })) : t.includes(`panther`) ? (e.layers.enable(ex), new Pu({ color: 2236962, roughness: .2, metalness: .7 })) : t.includes(`bottom_stage_light`) ? (e.layers.enable(ub), new rl({ color: new X(`#FFD700`).multiplyScalar(5) })) : (t.includes(`logo`) || (t.includes(`frame`) && t.includes(`89`))) ? (e.visible = !1, _x) : t.includes(`women`) && !t.includes(`jwellery`) && !t.includes(`jewelry`) ? vx : t.includes(`s1_top_stage`) ? (Ax = e, xx) : t.includes(`s1_purple_diamond`) || t === `s1_purple_diamond_mesh.001` ? kb : t.includes(`s4`) && t.includes(`diamond`) ? Ab : t.includes(`diamond`) ? (e.geometry.computeVertexNormals(), jx.push(e), Mx ? ux(e.geometry, Mx, Ex || yb) : new rl({ color: 7798988, transparent: !0, opacity: .7 })) : t.includes(`neckless`) || t.includes(`necklace`) || t.includes(`women_jwellery`) ? hx : t.includes(`jwellery_stand`) || t.includes(`jewelry_stand`) ? gx : t.includes(`plant`) || t.includes(`leaf`) ? wx : t.includes(`water`) ? Tx : t === `pool` ? (e.layers.enable(ub), new rl({ color: new X(`#C59B27`).multiplyScalar(6) })) : t.includes(`pillar_one_light`) ? (e.layers.enable(ub), new rl({ color: new X(`#D4AF37`).multiplyScalar(8) })) : t.includes(`back_room_light`) ? (e.layers.enable(ub), new rl({ color: new X(`#FFDF73`).multiplyScalar(6) })) : t.includes(`light`) && !t.includes(`wall_light_support`) ? (e.layers.enable(ub), new rl({ color: new X(`#FFF4D6`).multiplyScalar(5) })) : t.startsWith(`s1`) || t.includes(`_s1_`) ? Cx.s1 : t.startsWith(`s2`) || t.includes(`_s2_`) ? Cx.s2 : t.startsWith(`s3`) || t.includes(`_s3_`) ? t.includes(`stone_0`) ? Cx.s3_stone : Cx.s3 : t.startsWith(`s4`) || t.includes(`_s4_`) ? Cx.s4 : Cx.s1 } var Ax = null, jx = [], Mx = null, matIcon = null, matText = null; cx.load(`/neos7gold_marketplace/models/neos7gold_final.glb?v=3`, e => {
	let t = e.scene; if (t.traverse(e => { let nm = (e.name || '').toLowerCase(); if (nm.includes('logo') || nm.includes('grair') || (nm.includes('frame') && nm.includes('89'))) { e.visible = !1; e.castShadow = !1; e.receiveShadow = !1; if (e.geometry) { try { e.geometry.dispose() } catch (err) { } } if (e.parent) { setTimeout(() => { try { e.parent.remove(e) } catch (err) { } }, 0) } return } e.isMesh && (e.material = kx(e), e.castShadow = !0, e.receiveShadow = !0) }), new Bg(ix).load(`https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_08_1k.hdr`, e => { e.mapping = 303, Mx = e, hx.envMap = e, gx.envMap = e, kb.envMap = e, Ab.envMap = e, hx.needsUpdate = !0, gx.needsUpdate = !0, kb.needsUpdate = !0, Ab.needsUpdate = !0, matIcon && (matIcon.envMap = e, matIcon.needsUpdate = !0), matText && (matText.envMap = e, matText.needsUpdate = !0); let t = Ex || yb; jx.forEach(n => { n.material = ux(n.geometry, e, t) }) }), t.traverse(e => { e.isCamera && (Ex ||= e, e.name.toLowerCase().includes(`camera`) && (Ex = e)) }), !Ex && e.cameras.length > 0 && (Ex = e.cameras[0]), Ex && e.animations.length > 0) { Dx = new cf(t), Ox = 0; let n = console.warn; console.warn = () => { }, e.animations.forEach(e => { if (e.tracks) { e.tracks = e.tracks.filter(tr => !tr.name.toLowerCase().includes('logo') && !tr.name.toLowerCase().includes('frame')) } e.duration > Ox && (Ox = e.duration), Dx.clipAction(e).play() }), console.warn = n, yb.position.copy(Ex.position), yb.quaternion.copy(Ex.quaternion), Jb(_b.width, _b.height, yb), Yx.animTime = 0, Dx.setTime(0) }
	// --- NEOS7Gold Wall Sign Branding under S3_Wall_light.002 ---
	try {
		let texIcon = sx.load('/neos7gold_marketplace/neos7gold_logo_icon.png?v=3');
		texIcon.colorSpace = Ya;
		matIcon = new Fu({
			map: texIcon,
			transparent: !0,
			alphaTest: 0.02,
			metalness: 0.92,
			roughness: 0.22,
			emissive: new X('#D4AF37'),
			emissiveIntensity: 0.35,
			emissiveMap: texIcon,
			polygonOffset: !0,
			polygonOffsetFactor: -8,
			polygonOffsetUnits: -8
		});
		if (Mx) matIcon.envMap = Mx;
		let meshIcon = new hl(new Su(0.55, 0.55), matIcon);
		meshIcon.position.set(19.865, 2.50, 0.48);
		meshIcon.rotation.set(0, Math.PI / 2, 0);
		meshIcon.name = 'NEOS7Gold_Wall_Icon';
		t.add(meshIcon);

		let texText = sx.load('/neos7gold_marketplace/neos7gold_text_clean.png?v=3');
		texText.colorSpace = Ya;
		matText = new Fu({
			map: texText,
			transparent: !0,
			alphaTest: 0.02,
			metalness: 0.92,
			roughness: 0.22,
			emissive: new X('#D4AF37'),
			emissiveIntensity: 0.35,
			emissiveMap: texText,
			polygonOffset: !0,
			polygonOffsetFactor: -8,
			polygonOffsetUnits: -8
		});
		if (Mx) matText.envMap = Mx;
		let meshText = new hl(new Su(1.55, 0.68), matText);
		meshText.position.set(19.865, 1.84, 0.48);
		meshText.rotation.set(0, Math.PI / 2, 0);
		meshText.name = 'NEOS7Gold_Wall_Text';
		t.add(meshText);

		// Warm golden down-light from the wall luminaire S3_Wall_light.002
		let wallLampGold = new Md(16768883, 2.2, 8);
		wallLampGold.position.set(20.0, 3.05, 0.42);
		t.add(wallLampGold);
	} catch (err) {
		console.warn('[NEOS7Gold] Failed to mount wall branding:', err);
	}
	// -------------------------------------------------------------
	gb.add(t)
}, void 0, e => { console.error(`[NEOS7Gold] GLB load failed:`, e), Pb.style.display = `none` }); var Nx = -1, Px = document.getElementById(`css-vignette`); function Fx(e) { document.body.classList.forEach(e => { e.startsWith(`section-`) && e.endsWith(`-active`) && document.body.classList.remove(e) }), e !== -1 && document.body.classList.add(`section-${e}-active`), document.querySelectorAll(`.hero-title`).forEach((t, n) => { if (n === e) { if (e !== 0) { t.classList.add(`active`); let e = t.querySelectorAll(`span`); xi.killTweensOf(e), xi.fromTo(e, { opacity: 0, filter: `blur(12px)`, y: 15, scale: .98 }, { opacity: 1, filter: `blur(0px)`, y: 0, scale: 1, stagger: { each: .02, from: `random` }, duration: 1.8, ease: `power2.out` }) } } else t.classList.remove(`active`), xi.to(t.querySelectorAll(`span`), { opacity: 0, filter: `blur(12px)`, y: -10, duration: .4, stagger: .01, ease: `power2.in` }) }), document.querySelectorAll(`.section-content`).forEach((t, n) => { let r = n + 1, i = t.querySelector(`.section-title`), a = i ? i.querySelectorAll(`span`) : []; r === e ? (xi.set(t, { clearProps: `opacity,pointerEvents,y` }), t.classList.add(`active`), a.length > 0 && (xi.killTweensOf(a), xi.fromTo(a, { opacity: 0, filter: `blur(12px)`, y: 15, scale: .98 }, { opacity: 1, filter: `blur(0px)`, y: 0, scale: 1, stagger: { each: .02, from: `random` }, duration: 1.8, ease: `power2.out` }))) : (t.classList.remove(`active`), a.length > 0 && xi.to(a, { opacity: 0, filter: `blur(12px)`, y: -10, duration: .4, stagger: .005, ease: `power2.in` })) }); let t = document.querySelector(`.hero-desc`), n = document.querySelector(`.cta-btn`); if (t && e !== 0 && xi.to(t, { opacity: 0, y: 10, duration: .6 }), n && (e === 0 ? xi.to(n, { opacity: 1, y: 0, duration: 1, pointerEvents: `auto`, ease: `power2.out` }) : xi.to(n, { opacity: 0, y: 10, duration: .4, pointerEvents: `none`, ease: `power2.in` })), Px) { let t = Px.querySelectorAll(`.vig-corner`); t.forEach(e => e.classList.remove(`active`)), e !== -1 && (e === 0 ? t.forEach(e => e.classList.add(`active`)) : e === 1 || e === 2 || e === 4 ? (Px.querySelector(`.vig-tl`)?.classList.add(`active`), Px.querySelector(`.vig-bl`)?.classList.add(`active`)) : e === 3 && (Px.querySelector(`.vig-tr`)?.classList.add(`active`), Px.querySelector(`.vig-br`)?.classList.add(`active`))) } } var Ix = !1; function Lx() { if (Ix) return; Ix = !0; let e = xi.timeline({ defaults: { ease: `power3.out`, duration: 1.5 } }); e.set(`#hero-ui`, { opacity: 1, visibility: `visible` }), e.fromTo([`.hero-header`, `.hero-scroll-indicator`], { opacity: 0, filter: `blur(15px)` }, { opacity: 1, filter: `blur(0px)`, duration: 2.5, stagger: .4 }, 0); let t = document.getElementById(`title-0`); if (t) { t.classList.add(`active`); let n = t.querySelectorAll(`span`); e.fromTo(n, { opacity: 0, filter: `blur(12px)`, y: 15, scale: .98 }, { opacity: 1, filter: `blur(0px)`, y: 0, scale: 1, stagger: { each: .02, from: `random` }, duration: 1.8, ease: `power2.out` }, .4), e.set(t, { pointerEvents: `auto` }, `>`) } let n = document.querySelector(`.hero-desc`); n && e.fromTo(n, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 1 }, 1), e.fromTo(`.hero-footer`, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.5 }, 1.4), e.fromTo([`.footer-left`, `.footer-center`], { opacity: 0, y: 40, filter: `blur(15px)` }, { opacity: 1, y: 0, filter: `blur(0px)`, stagger: .3, duration: 2 }, 1.6) } function Rx() { if (!Ix) return; Ix = !1; let e = xi.timeline({ defaults: { ease: `power2.inOut`, duration: 1 } }), t = document.getElementById(`title-0`); if (t) { let n = t.querySelectorAll(`span`); e.to(n, { opacity: 0, filter: `blur(12px)`, y: 15, scale: .98, stagger: { each: .005, from: `random` } }, 0), e.set(t, { pointerEvents: `none` }, `>`), setTimeout(() => { t && t.classList.remove(`active`) }, 1e3) } e.to(`.hero-footer`, { opacity: 0, y: 15 }, .1), e.to([`.footer-left`, `.footer-center`], { opacity: 0, y: 15, filter: `blur(12px)`, stagger: .05 }, .1) } var zx = document.getElementById(`scroll-pointer`), Bx = document.getElementById(`scroll-path`), Vx = 0; Bx && (Vx = Bx.getTotalLength()); var Hx = document.querySelector(`.title-container`); function Ux() { Hx && (Hx.style.transform = `none`) } var Wx = 0; function Gx(e) { if (!zx || !Bx || !Ox) return; let t = e % Ox / Ox; Wx = Bo.lerp(Wx, t, .08); let n = Bx.getPointAtLength(Wx * Vx), r = n.x / 30 * 100, i = n.y / 452 * 100; zx.style.left = `${r}%`, zx.style.top = `${i}%` } window.addEventListener(`resize`, () => { Bx && (Vx = Bx.getTotalLength()) }); function Kx(e) { if (window.isAboutOpen) return; let t = -1; for (let n = 0; n < fb.length; n++) { let [r, i] = fb[n]; if (e >= r && e < i) { t = n; break } } t !== Nx && (Nx === 0 && t !== 0 && Rx(), t === 0 && mb && Lx(), Nx = t, Fx(t), t > 0 && Ub && !window.isAboutOpen && Ub.play()) } var qx = 0, Jx = !1, Yx = { animTime: pb[0] / 24 }, Xx = { x: 0, y: 0 }, Zx = { x: 0, y: 0 }; function Qx(e, t) { if (Jx || !Ox || !mb) return; let n = pb.length; if (e = (e % n + n) % n, e === qx) return; if (Jx = !0, qx === 0) Rx(); else { let e = document.querySelectorAll(`.section-content`)[qx - 1]; if (e) { e.classList.remove(`active`); let t = e.querySelectorAll(`.section-title span`); t.length > 0 && xi.to(t, { opacity: 0, filter: `blur(12px)`, y: 15, scale: .98, stagger: { each: .005, from: `random` }, duration: 1, ease: `power2.inOut` }) } } let r = Math.round(Ox * 24), i = pb[qx], a = pb[e], o; t > 0 ? (o = a - i, o <= 0 && (o += r)) : (o = a - i, o >= 0 && (o -= r)); let s = Yx.animTime + o / 24, c = Math.abs(o) / (qx === 0 || e === 0 ? 40 : 25); qx = e, xi.to(Yx, { animTime: s, duration: c, ease: `power1.inOut`, overwrite: !0, onComplete: () => { Jx = !1 } }) } window.addEventListener(`mousemove`, e => { Xx.x = e.clientX / _b.width * 2 - 1, Xx.y = -(e.clientY / _b.height) * 2 + 1 }); var $x = !1; window.addEventListener(`touchstart`, e => { if (e.touches.length > 0) { $x = !0; let t = e.touches[0]; Xx.x = t.clientX / _b.width * 2 - 1, Xx.y = -(t.clientY / _b.height) * 2 + 1 } }, { passive: !0 }), window.addEventListener(`touchmove`, e => { if ($x && e.touches.length > 0) { let t = e.touches[0]; Xx.x = t.clientX / _b.width * 2 - 1, Xx.y = -(t.clientY / _b.height) * 2 + 1 } }, { passive: !0 }), window.addEventListener(`touchend`, () => { $x = !1 }, { passive: !0 }); var eS = !1; var kbActive={ArrowLeft:!1,ArrowRight:!1,ArrowUp:!1,ArrowDown:!1},kbRot={x:0,y:0,targetX:0,targetY:0},lastDownTap=0,lastUpTap=0,navDebounce=0;function highlightHudKey(e){let t=document.getElementById(e);t&&(t.classList.add(`active`),setTimeout(()=>{t.classList.remove(`active`)},220))}function navNext(){let e=performance.now();if(e-navDebounce<350)return;if(navDebounce=e,!mb){rx&&ox();return}if(!Ox||Jx)return;Hb!==void 0&&Hb.play(),kbRot.targetX=0,kbRot.targetY=0,highlightHudKey(`hud-next-btn`),Qx(qx+1,1)}function navPrev(){let e=performance.now();if(e-navDebounce<350)return;if(navDebounce=e,!mb||!Ox||Jx)return;Hb!==void 0&&Hb.play(),kbRot.targetX=0,kbRot.targetY=0,highlightHudKey(`hud-prev-btn`),Qx(qx-1,-1)}function handleKeyDown(e){let t=performance.now();if(e.key===`PageDown`||e.key===` `&&!e.shiftKey||e.key===`s`||e.key===`S`||e.key===`j`||e.key===`J`||e.key===`n`||e.key===`N`||e.key===`Enter`&&mb||e.key===`ArrowDown`&&(e.shiftKey||e.ctrlKey||e.altKey)||e.key===`ArrowRight`&&(e.shiftKey||e.ctrlKey||e.altKey)){e.preventDefault(),navNext();return}if(e.key===`PageUp`||e.key===` `&&e.shiftKey||e.key===`w`||e.key===`W`||e.key===`k`||e.key===`K`||e.key===`p`||e.key===`P`||e.key===`ArrowUp`&&(e.shiftKey||e.ctrlKey||e.altKey)||e.key===`ArrowLeft`&&(e.shiftKey||e.ctrlKey||e.altKey)){e.preventDefault(),navPrev();return}if(!mb&&(e.key===`Enter`||e.key===` `||e.key===`ArrowDown`)){rx&&(e.preventDefault(),ox());return}if([`ArrowLeft`,`ArrowRight`,`ArrowUp`,`ArrowDown`].includes(e.key)){e.preventDefault(),kbActive[e.key]=!0;if(e.key===`ArrowLeft`)kbRot.targetY-=0.22,highlightHudKey(`k-left`);else if(e.key===`ArrowRight`)kbRot.targetY+=0.22,highlightHudKey(`k-right`);else if(e.key===`ArrowUp`){highlightHudKey(`k-up`);if(t-lastUpTap<450){navPrev(),lastUpTap=0;return}lastUpTap=t,kbRot.targetX+=0.16}else if(e.key===`ArrowDown`){highlightHudKey(`k-down`);if(t-lastDownTap<450){navNext(),lastDownTap=0;return}lastDownTap=t,kbRot.targetX-=0.16}}if(e.key===`c`||e.key===`C`||e.key===`r`||e.key===`R`)kbRot.targetX=0,kbRot.targetY=0}function handleKeyUp(e){[`ArrowLeft`,`ArrowRight`,`ArrowUp`,`ArrowDown`].includes(e.key)&&(kbActive[e.key]=!1)}window.addEventListener(`keydown`,handleKeyDown,{passive:!1}),window.addEventListener(`keyup`,handleKeyUp,{passive:!0}),document.addEventListener(`keydown`,handleKeyDown,{passive:!1}),document.addEventListener(`keyup`,handleKeyUp,{passive:!0});window.addEventListener(`wheel`, e => { if (!Ox || eS || !mb || Jx) return; let t = e.deltaY; Math.abs(t) < 5 || (eS = !0, setTimeout(() => { eS = !1 }, 1e3), t > 0 ? Qx(qx + 1, 1) : Qx(qx - 1, -1)) }, { passive: !0 }), document.querySelectorAll(`.hero-title`).forEach(e => { e.addEventListener(`mousemove`, t => { let n = e.getBoundingClientRect(), r = t.clientX - n.left, i = t.clientY - n.top, a = r / n.width * 2 - 1, o = i / n.height * 2 - 1; e.style.setProperty(`--mx`, `${r}px`), e.style.setProperty(`--my`, `${i}px`), e.style.setProperty(`--rx`, `${-o * 8}deg`), e.style.setProperty(`--ry`, `${a * 12}deg`) }), e.addEventListener(`mouseleave`, () => { e.style.setProperty(`--rx`, `0deg`), e.style.setProperty(`--ry`, `0deg`) }) }); var tS = 0, nS = 0; window.addEventListener(`touchstart`, e => { tS = e.touches[0].clientY, nS = performance.now() }, { passive: !0 }), window.addEventListener(`touchend`, e => { if (!Ox) return; let t = tS - e.changedTouches[0].clientY, n = performance.now() - nS; Math.abs(t) > 40 && n < 500 && (t > 0 ? Qx(qx + 1, 1) : Qx(qx - 1, -1)) }, { passive: !0 }), window.addEventListener(`resize`, () => { _b.width = window.innerWidth, _b.height = window.innerHeight, vb.setSize(_b.width, _b.height), vb.setPixelRatio(Math.min(window.devicePixelRatio, 2)), xb.setSize(_b.width, _b.height), Jb(_b.width, _b.height, yb), Bx && (Vx = Bx.getTotalLength()) }); var rS = performance.now(), iS = new Vo, aS = new Vo, oS = new Vo; function sS() { let e = performance.now(), t = (e - rS) / 1e3; if (rS = e, wx.uniforms.uTime.value += t, Db && (Eb.uniforms.uTime.value += t), Dx && Ox > 0) { kbActive.ArrowLeft&&(kbRot.targetY-=0.032),kbActive.ArrowRight&&(kbRot.targetY+=0.032),kbActive.ArrowUp&&(kbRot.targetX+=0.022),kbActive.ArrowDown&&(kbRot.targetX-=0.022);kbRot.targetX=Bo.clamp(kbRot.targetX,-0.65,0.65),kbRot.targetY=Bo.clamp(kbRot.targetY,-2.5,2.5);kbRot.x=Bo.lerp(kbRot.x,kbRot.targetX,0.12),kbRot.y=Bo.lerp(kbRot.y,kbRot.targetY,0.12);if(!kbActive.ArrowLeft&&!kbActive.ArrowRight)kbRot.targetY=Bo.lerp(kbRot.targetY,0,0.005);if(!kbActive.ArrowUp&&!kbActive.ArrowDown)kbRot.targetX=Bo.lerp(kbRot.targetX,0,0.005);let e = Yx.animTime % Ox; e < 0 && (e += Ox), Dx.setTime(e), Ex && (Ex.updateMatrixWorld(!0), bb.position.setFromMatrixPosition(Ex.matrixWorld), bb.quaternion.setFromRotationMatrix(Ex.matrixWorld), bb.fov = Ex.fov), Ax && (Ax.visible = !1, bx.position.setFromMatrixPosition(Ax.matrixWorld), bx.position.y += .5, bx.update(vb, gb), Ax.visible = !0), Jb(_b.width, _b.height, yb); let t = _b.width <= 768, n = Ob.parallaxIntensity; if (Nx !== -1 && mb && n > 0) { let e = t ? 2.5 : 1, r = Bo.clamp(Xx.y * n, -n, n), i = Bo.clamp(-Xx.x * n * e, -n * e, n * e); Zx.x = Bo.lerp(Zx.x, r, Ob.parallaxSmoothing), Zx.y = Bo.lerp(Zx.y, i, Ob.parallaxSmoothing), Zx.x = Bo.clamp(Zx.x, -n, n), Zx.y = Bo.clamp(Zx.y, -n * e, n * e) } else Zx.x = Bo.lerp(Zx.x, 0, .06), Zx.y = Bo.lerp(Zx.y, 0, .06); let r = t && Nx === 1 ? -.0785 : 0; iS.copy(bb.quaternion);let totalPitch=Zx.x+kbRot.x,totalYaw=Zx.y+kbRot.y+r;aS.setFromEuler(new vs(totalPitch,totalYaw,0,`YXZ`));oS.copy(iS).multiply(aS), yb.position.lerp(bb.position, .1), yb.quaternion.slerp(oS, .1), Kx(Math.round(e * 24)), Gx(e), Ux() } xb.render(), Db && (vb.autoClear = !1, vb.render(wb, Tb), vb.autoClear = !0), requestAnimationFrame(sS) } sS();window.__neos7={scene:gb,camera:yb,Qx:Qx,Cx:Cx,renderer:vb,kbRot:kbRot,navNext:navNext,navPrev:navPrev};