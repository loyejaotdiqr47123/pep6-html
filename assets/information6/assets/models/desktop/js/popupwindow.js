/***************************************************************************************************
 PopupWindow - The ultimate popup/dialog/modal jQuery plugin
 Author          : Gaspare Sganga
 Version         : 1.0.4
 License         : MIT
 Documentation   : http://gasparesganga.com/labs/jquery-popup-window/
 ***************************************************************************************************/
! function (u, c) {
  var m, g = {
      title: "Popup Window",
      modal: !0,
      autoOpen: !0,
      animationTime: 300,
      customClass: "",
      buttons: {
        close: !0,
        maximize: !0,
        collapse: !0,
        minimize: !0
      },
      buttonsPosition: "right",
      buttonsTexts: {
        close: "关闭",
        maximize: "最大化",
        unmaximize: "向下还原",
        minimize: "最小化",
        unminimize: "",
        collapse: "Collapse",
        uncollapse: "Expand"
      },
      draggable: !0,
      nativeDrag: !0,
      dragOpacity: .6,
      resizable: !0,
      resizeOpacity: .6,
      statusBar: !0,
      top: "auto",
      left: "auto",
      height: 200,
      width: 400,
      maxHeight: c,
      maxWidth: c,
      minHeight: 100,
      minWidth: 200,
      collapsedWidth: c,
      keepInViewport: !0,
      mouseMoveEvents: !0
    },
    t = {
      "box-sizing": "border-box",
      position: "fixed",
      top: "0",
      bottom: "0",
      right: "0",
      left: "0",
      display: "flex",
      "justify-content": "flex-start",
      "align-content": "flex-start",
      "pointer-events": "none"
    },
    f = {
      "box-sizing": "border-box",
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%"
    },
    b = {
      "box-sizing": "border-box",
      background: "transparent",
      border: "none"
    },
    x = {
      "box-sizing": "border-box",
      display: "flex",
      "flex-flow": "column nowrap",
      position: "absolute",
      padding: "0",
      "pointer-events": "auto"
    },
    v = {
      "box-sizing": "border-box",
      flex: "0 0 auto",
      display: "flex",
      "align-items": "center"
    },
    z = {
      "box-sizing": "border-box",
      flex: "1 1 auto",
      overflow: "hidden",
      "text-overflow": "ellipsis",
      "white-space": "nowrap"
    },
    _ = {
      "box-sizing": "border-box",
      flex: "0 0 auto",
      display: "flex"
    },
    y = {
      flex: "1 1 auto",
      overflow: "auto"
    },
    T = {
      "box-sizing": "border-box",
      flex: "0 0 auto",
      display: "flex",
      "align-items": "flex-end"
    },
    W = {
      "box-sizing": "border-box",
      flex: "1 1 auto",
      overflow: "hidden",
      "text-align": "left",
      "text-overflow": "ellipsis",
      "white-space": "nowrap"
    },
    k = {
      "box-sizing": "border-box",
      display: "flex"
    },
    X = {
      cursor: "se-resize"
    },
    Y = {
      position: "absolute",
      left: "0",
      right: "0",
      cursor: "n-resize"
    },
    P = {
      position: "absolute",
      left: "0",
      right: "0",
      cursor: "s-resize"
    },
    H = {
      position: "absolute",
      top: "0",
      bottom: "0",
      cursor: "e-resize"
    },
    I = {
      position: "absolute",
      top: "0",
      bottom: "0",
      cursor: "w-resize"
    },
    C = {
      position: "absolute",
      cursor: "nw-resize"
    },
    O = {
      position: "absolute",
      cursor: "ne-resize"
    },
    S = {
      position: "absolute",
      cursor: "ne-resize"
    },
    E = {
      position: "absolute",
      cursor: "nw-resize"
    },
    D = {
      close: '',
      collapse: '',
      uncollapse: '',
      maximize: '',
      unmaximize: '',
      minimize: '',
      resizeHandle: ''
    },
    B = {
      resizersWidth: 4,
      secondaryAnimationTimeFactor: 3
    },
    r = {
      position: "bottom left",
      direction: "horizontal"
    };

  function e(t, i) {
    if (t.closest(".popupwindow").length) Z("jQuery PopupWindow is already initialized on this element");
    else {
      var _id = t.attr('id')
      var e = u.extend(!0, {}, g, i);
      e.animationTime = parseInt(e.animationTime, 10), e.height = parseInt(e.height, 10), e.width = parseInt(e.width,
        10), e.maxHeight = parseInt(e.maxHeight, 10) || 0, e.maxWidth = parseInt(e.maxWidth, 10) || 0, e.minHeight =
        parseInt(e.minHeight, 10) || 0, e.minWidth = parseInt(e.minWidth, 10) || 0;
      var o = u("<div>", {
        class: "popupwindow_overlay"
      }).css(f).appendTo(m);
      e.modal && o.css("pointer-events", "auto");
      var n = u("<div>", {
          class: "popupwindow_minplaceholder"
        }).css(b).hide().appendTo(m),
        a = {
          left: "auto" == e.left ? (o.width() - e.width) / 2 : parseInt(e.left, 10),
          top: "auto" == e.top ? (o.height() - e.height) / 2 : parseInt(e.top, 10)
        },
        s = u("<div>", {
          class: "popupwindow popupwindow_" + _id,
          css: {
            height: e.height,
            left: a.left,
            top: a.top,
            width: e.width
          }
        }).css(x).addClass(e.customClass).data({
          originalTarget: t,
          originalParent: t.parent(),
          overlay: o,
          minPlaceholder: n,
          settings: e,
          opened: !1,
          collapsed: !1,
          minimized: !1,
          maximized: !1,
          currentPosition: a,
          currentSize: {
            height: e.height,
            width: e.width
          },
          savedPosition: c,
          savedSize: c
        }).appendTo(o);
      e.draggable && (e.nativeDrag ? s.on("dragstart", dt).on("drag", dt).on("dragend", dt).on("mousedown",
        ".popupwindow_titlebar_draggable", pt) : s.on("mousedown", ".popupwindow_titlebar_draggable",
        ot));
      var d = e.buttonsPosition.toLowerCase().indexOf("l") < 0,
        p = u("<div>", {
          class: "popupwindow_titlebar"
        }).css(v).appendTo(s);
      e.draggable && p.addClass("popupwindow_titlebar_draggable"), u("<div>", {
        class: "popupwindow_titlebar_text",
        text: e.title
      }).css(z).css("order", d ? 1 : 5).appendTo(p), e.buttons.close && u("<div>", {
        class: "popupwindow_titlebar_button popupwindow_titlebar_button_close"
      }).css(_).css("order", d ? 5 : 1).attr("title", e.buttonsTexts.close).on("click", $).append(D.close).appendTo(
        p), e.buttons.maximize && u("<div>", {
        class: "popupwindow_titlebar_button popupwindow_titlebar_button_maximize"
      }).css(_).css("order", d ? 4 : 2).attr("title", e.buttonsTexts.maximize).on("click", tt).append(D.maximize)
        .appendTo(p), e.buttons.collapse && u("<div>", {
        class: "popupwindow_titlebar_button popupwindow_titlebar_button_collapse"
      }).css(_).css("order", 3).attr("title", e.buttonsTexts.collapse).on("click", it).append(D.collapse).appendTo(
        p), e.buttons.minimize && u("<div>", {
        class: "popupwindow_titlebar_button popupwindow_titlebar_button_minimize"
      }).css(_).css("order", d ? 2 : 4).attr("title", e.buttonsTexts.minimize).on("click", et).append(D.minimize)
        .appendTo(p);
      var r = u("<div>", {
        class: "popupwindow_content"
      }).css(y).appendTo(s);
      if (t.show().appendTo(r), e.statusBar) {
        var l = u("<div>", {
          class: "popupwindow_statusbar"
        }).css(T).appendTo(s);
        u("<div>", {
          class: "popupwindow_statusbar_content"
        }).css(W).appendTo(l);
        var h = u("<div>", {
          class: "popupwindow_statusbar_handle"
        }).css(k).appendTo(l);
        e.resizable && h.css(X).append(D.resizeHandle).on("mousedown", null, {
          dimension: "both",
          directionX: "right",
          directionY: "bottom"
        }, nt)
      }
      if (e.resizable) {
        var w = J(s);
        u("<div>", {
          class: "popupwindow_resizer popupwindow_resizer_top",
          css: {
            top: 0 - w.top - B.resizersWidth / 2,
            height: w.top + B.resizersWidth
          }
        }).css(Y).on("mousedown", null, {
          dimension: "height",
          directionY: "top"
        }, nt).appendTo(s), u("<div>", {
          class: "popupwindow_resizer popupwindow_resizer_bottom",
          css: {
            bottom: 0 - w.bottom - B.resizersWidth / 2,
            height: w.bottom + B.resizersWidth
          }
        }).css(P).on("mousedown", null, {
          dimension: "height",
          directionY: "bottom"
        }, nt).appendTo(s), u("<div>", {
          class: "popupwindow_resizer popupwindow_resizer_left",
          css: {
            left: 0 - w.left - B.resizersWidth / 2,
            width: w.left + B.resizersWidth
          }
        }).css(H).on("mousedown", null, {
          dimension: "width",
          directionX: "left"
        }, nt).appendTo(s), u("<div>", {
          class: "popupwindow_resizer popupwindow_resizer_right",
          css: {
            right: 0 - w.right - B.resizersWidth / 2,
            width: w.right + B.resizersWidth
          }
        }).css(I).on("mousedown", null, {
          dimension: "width",
          directionX: "right"
        }, nt).appendTo(s), u("<div>", {
          class: "popupwindow_resizer popupwindow_resizer_topleft",
          css: {
            top: 0 - w.top - B.resizersWidth / 2,
            left: 0 - w.left - B.resizersWidth / 2,
            width: w.left + B.resizersWidth,
            height: w.top + B.resizersWidth
          }
        }).css(C).on("mousedown", null, {
          dimension: "both",
          directionX: "left",
          directionY: "top"
        }, nt).appendTo(s), u("<div>", {
          class: "popupwindow_resizer popupwindow_resizer_topright",
          css: {
            top: 0 - w.top - B.resizersWidth / 2,
            right: 0 - w.right - B.resizersWidth / 2,
            width: w.right + B.resizersWidth,
            height: w.top + B.resizersWidth
          }
        }).css(O).on("mousedown", null, {
          dimension: "both",
          directionX: "right",
          directionY: "top"
        }, nt).appendTo(s), u("<div>", {
          class: "popupwindow_resizer popupwindow_resizer_bottomleft",
          css: {
            bottom: 0 - w.bottom - B.resizersWidth / 2,
            left: 0 - w.left - B.resizersWidth / 2,
            width: w.left + B.resizersWidth,
            height: w.bottom + B.resizersWidth
          }
        }).css(S).on("mousedown", null, {
          dimension: "both",
          directionX: "left",
          directionY: "bottom"
        }, nt).appendTo(s), u("<div>", {
          class: "popupwindow_resizer popupwindow_resizer_bottomright",
          css: {
            bottom: 0 - w.bottom - B.resizersWidth / 2,
            right: 0 - w.right - B.resizersWidth / 2,
            width: w.right + B.resizersWidth,
            height: w.bottom + B.resizersWidth
          }
        }).css(E).on("mousedown", null, {
          dimension: "both",
          directionX: "right",
          directionY: "bottom"
        }, nt).appendTo(s)
      }
      e.modal || o.width(0).height(0), o.hide(), e.autoOpen && M(s)
    }
  }

  function M(t) {
    U(t) && !t.data("opened") && (t.data("overlay").show(), t.data("opened", !0), N(t, "open"), d(t), l(t))
  }

  function o(t) {
    U(t) && t.data("opened") && (t.data("minimized") && l(t), t.data("overlay").hide(), t.data("opened", !1), N(t,
      "close"))
  }

  function n(t) {
    if (U(t) && t.data("opened") && !t.data("maximized") && !t.data("collapsed") && !t.data("minimized")) {
      var i = t.data("settings");
      t.find(".popupwindow_titlebar_button_maximize").empty().append(D.unmaximize).attr("title", i.buttonsTexts.unmaximize),
        t.find(".popupwindow_statusbar_handle *, .popupwindow_resizer, .popupwindow_titlebar_button_collapse").hide(),
      i.draggable && t.find(".popupwindow_titlebar").removeClass("popupwindow_titlebar_draggable"), i.modal ||
      t.data("overlay").css("background-color", "transparent").width("100%").height("100%"), j(t), F(t);
      var e = L(t, {
          top: 0,
          left: 0
        }),
        o = G(t, {
          width: "100%",
          height: "100%"
        });
      return u.when(e, o).then(function () {
        t.data("maximized", !0), N(t, "maximize")
      })
    }
  }

  function a(t) {
    if (U(t) && t.data("opened") && t.data("maximized")) {
      var i = t.data("settings"),
        e = A(t),
        o = R(t);
      return t.find(".popupwindow_titlebar_button_maximize").empty().append(D.maximize).attr("title", i.buttonsTexts
        .maximize), t.find(
        ".popupwindow_statusbar_handle *, .popupwindow_resizer, .popupwindow_titlebar_button_collapse").show(),
      i.draggable && t.find(".popupwindow_titlebar").addClass("popupwindow_titlebar_draggable"), i.modal || t
        .data("overlay").width(0).height(0).css("background-color", ""), u.when(e, o).then(function () {
        t.data("maximized", !1), N(t, "unmaximize")
      })
    }
  }

  function s(t) {
    if (U(t) && t.data("opened") && !t.data("maximized") && !t.data("collapsed") && !t.data("minimized")) {
      var i = t.data("settings");
      t.find(".popupwindow_titlebar_button_collapse").empty().append(D.uncollapse).attr("title", i.buttonsTexts.uncollapse),
        t.find(
          ".popupwindow_content, .popupwindow_statusbar, .popupwindow_resizer, .popupwindow_titlebar_button_maximize, .popupwindow_titlebar_button_minimize"
        ).hide(), F(t);
      var e = G(t, {
        width: i.collapsedWidth,
        height: J(t, "top") + J(t, "bottom") + t.find(".popupwindow_titlebar").outerHeight()
      });
      return u.when(e).then(function () {
        t.data("collapsed", !0), N(t, "collapse")
      })
    }
  }

  function d(t) {
    if (U(t) && t.data("opened") && t.data("collapsed")) {
      var i = t.data("settings"),
        e = R(t);
      return t.find(".popupwindow_titlebar_button_collapse").empty().append(D.collapse).attr("title", i.buttonsTexts
        .collapse), t.find(
        ".popupwindow_content, .popupwindow_statusbar, .popupwindow_resizer, .popupwindow_titlebar_button_maximize, .popupwindow_titlebar_button_minimize"
      ).show(), u.when(e).then(function () {
        t.data("collapsed", !1), N(t, "uncollapse")
      })
    }
  }

  function p(s) {
    if (U(s) && s.data("opened") && !s.data("collapsed") && !s.data("minimized")) {
      var t, d = u.Deferred(),
        p = s.data("settings");
      if (s.data("maximized")) {
        var i = p.animationTime;
        p.animationTime = p.animationTime / B.secondaryAnimationTimeFactor, t = a(s), p.animationTime = i
      } else j(s), F(s), t = u.Deferred().resolve();
      return u.when(t).then(function () {
        s.addClass("popupwindow_minimized").width(""), s.find(".popupwindow_titlebar_button_minimize").attr(
          "title", p.buttonsTexts.unminimize), s.find(
          ".popupwindow_content, .popupwindow_statusbar, .popupwindow_resizer, .popupwindow_titlebar_button_maximize, .popupwindow_titlebar_button_collapse"
        ).hide(), p.draggable && s.find(".popupwindow_titlebar").removeClass(
          "popupwindow_titlebar_draggable");
        var t = s.data("minPlaceholder"),
          i = {
            width: s.outerWidth(),
            height: J(s, "top") + J(s, "bottom") + s.find(".popupwindow_titlebar").outerHeight()
          };
        t.outerWidth(i.width).outerHeight(i.height).show();
        var e = {},
          o = t.position();
        "horizontal" == r.direction ? (e.width = i.width, t.width(0)) : (e.height = i.height, t.height(
          0));
        var n = L(s, o),
          a = G(s, {
            height: i.height
          });
        t.animate(e, {
          duration: p.animationTime,
          queue: !1,
          complete: function () {
            u(this).hide(), s.css({
              position: "relative",
              top: "",
              left: ""
            }).insertAfter(s.data("overlay"))
          }
        }), u.when(n, a).then(function () {
          s.data("minimized", !0), N(s, "minimize"), d.resolve()
        })
      }), d.promise()
    }
  }

  function l(t) {
    if (U(t) && t.data("opened") && t.data("minimized")) {
      var i = t.data("settings"),
        e = t.data("minPlaceholder");
      t.removeClass("popupwindow_minimized"), t.find(".popupwindow_titlebar_button_minimize").attr("title", i.buttonsTexts
        .minimize), t.find(
        ".popupwindow_content, .popupwindow_statusbar, .popupwindow_resizer, .popupwindow_titlebar_button_maximize, .popupwindow_titlebar_button_collapse"
      ).show(), i.draggable && t.find(".popupwindow_titlebar").addClass("popupwindow_titlebar_draggable"), e.show()
        .insertAfter(t.data("overlay"));
      var o = {
          width: e.outerWidth(),
          height: e.outerHeight()
        },
        n = {},
        a = e.position();
      "horizontal" == r.direction ? (n.width = 0, e.width(o.width)) : (n.height = 0, e.height(o.height)), t.css({
        position: "absolute",
        top: a.top,
        left: a.left,
        width: o.width
      }).appendTo(t.data("overlay"));
      var s = A(t),
        d = R(t);
      return e.animate(n, {
        duration: i.animationTime,
        queue: !1,
        complete: function () {
          u(this).hide()
        }
      }), u.when(s, d).then(function () {
        t.data("minimized", !1), N(t, "unminimize")
      })
    }
  }

  function h(t) {
    return U(t) ? u.extend({}, t.data("currentPosition")) : c
  }

  function w(t, i) {
    u.extend(t.data("currentPosition"), i)
  }

  function j(t) {
    t.data("savedPosition", h(t))
  }

  function A(t) {
    return L(t, t.data("savedPosition"))
  }

  function L(t, i) {
    if (U(t)) {
      var e = u.Deferred(),
        o = t.data("settings"),
        n = i.animationTime !== c ? parseInt(i.animationTime) : o.animationTime,
        a = {
          top: i.top,
          left: i.left
        };
      if (i.check) {
        if (!t.data("opened") || t.data("maximized") || t.data("minimized")) return;
        if (o.keepInViewport) {
          var s = q(t),
            d = u(window);
          a.top > d.height() - s.height && (a.top = d.height() - s.height), a.left > d.width() - s.width && (
            a.left = d.width() - s.width), a.top < 0 && (a.top = 0), a.left < 0 && (a.left = 0)
        }
      }
      var p = h(t);
      return p.top != a.top || p.left != a.left ? t.animate(a, {
        duration: n,
        queue: !1,
        complete: function () {
          w(t, a), i.event && N(t, "move"), e.resolve()
        }
      }) : e.resolve(), e.promise()
    }
  }

  function V(t) {
    L(t, u.extend({
      animationTime: t.data("settings").animationTime / B.secondaryAnimationTimeFactor,
      check: !0,
      event: !0
    }, h(t)))
  }

  function q(t) {
    return U(t) ? u.extend({}, t.data("currentSize")) : c
  }

  function Q(t, i) {
    u.extend(t.data("currentSize"), i)
  }

  function F(t) {
    t.data("savedSize", q(t))
  }

  function R(t) {
    return G(t, u.extend({
      checkPosition: !0,
      checkSize: !1,
      event: !1
    }, t.data("savedSize")))
  }

  function G(t, i) {
    if (U(t)) {
      var e = u.Deferred(),
        o = t.data("settings"),
        n = i.animationTime !== c ? parseInt(i.animationTime) : o.animationTime,
        a = {
          width: i.width,
          height: i.height
        };
      if (i.checkSize) {
        if (!t.data("opened") || t.data("maximized") || t.data("minimized")) return;
        o.maxWidth && a.width > o.maxWidth && (a.width = o.maxWidth), o.minWidth && a.width < o.minWidth && (a.width =
          o.minWidth), o.maxHeight && a.height > o.maxHeight && (a.height = o.maxHeight), o.minHeight &&
        a.height < o.minHeight && (a.height = o.minHeight), t.data("collapsed") && (t.data("savedSize", u.extend({},
          a)), delete a.height)
      }
      var s = q(t);
      return s.width != a.width || s.height != a.height ? t.animate(a, {
        duration: n,
        queue: !1,
        complete: function () {
          Q(t, a), i.event && N(t, "resize"), i.checkPosition && V(t), e.resolve()
        }
      }) : e.resolve(), e.promise()
    }
  }

  function J(t, i) {
    return i !== c ? parseInt(t.css("border-" + i + "-width"), 10) : {
      top: parseInt(t.css("border-top-width"), 10),
      bottom: parseInt(t.css("border-bottom-width"), 10),
      left: parseInt(t.css("border-left-width"), 10),
      right: parseInt(t.css("border-right-width"), 10)
    }
  }

  function K(t) {
    t.popupWindow.fadeTo(0, t.opacity), t.popupWindow.data("settings").mouseMoveEvents || t.popupWindow.data(
      "tempSavedData", {
        position: h(t.popupWindow),
        size: q(t.popupWindow)
      }), u(document).on("mousemove", t, at).on("mouseup", t, st)
  }

  function N(t, i) {
    var e;
    "move" == i && (e = h(t)), "resize" == i && (e = q(t)), t.data("originalTarget").trigger(i + ".popupwindow", e)
  }

  function i() {
    var t = {};
    "horizontal" == r.direction ? (t["flex-direction"] = 0 <= r.position.indexOf("left") ? "row" : "row-reverse", t[
      "flex-wrap"] = 0 <= r.position.indexOf("top") ? "wrap" : "wrap-reverse") : (t["flex-direction"] = 0 <=
    r.position.indexOf("top") ? "column" : "column-reverse", t["flex-wrap"] = 0 <= r.position.indexOf(
      "left") ? "wrap" : "wrap-reverse"), m.css(t)
  }

  function U(t) {
    return !!t.length || (Z("jQuery PopupWindow is not initialized on this element"), !1)
  }

  function Z(t) {
    t = "jQuery PopupWindow Warning: " + t, window.console.warn ? console.warn(t) : window.console.log && console.log(
      t)
  }

  function $(t) {
    o(u(t.currentTarget).closest(".popupwindow"))
  }

  function tt(t) {
    var i = u(t.currentTarget).closest(".popupwindow");
    i.data("maximized") ? a(i) : n(i)
  }

  function it(t) {
    var i = u(t.currentTarget).closest(".popupwindow");
    i.data("collapsed") ? d(i) : s(i)
  }

  function et(t) {
    var i = u(t.currentTarget).closest(".popupwindow");
    i.data("minimized") ? l(i) : p(i)
  }

  function ot(t) {
    if (t.target !== t.currentTarget && !u(t.target).hasClass("popupwindow_titlebar_text")) return !1;
    var i = u(t.currentTarget).closest(".popupwindow"),
      e = h(i),
      o = i.data("settings");
    o.modal || i.data("overlay").css("background-color", "transparent").width("100%").height("100%"), K({
      popupWindow: i,
      action: "drag",
      opacity: o.dragOpacity,
      compensationX: t.pageX - e.left,
      compensationY: t.pageY - e.top
    }), t.preventDefault()
  }

  function nt(t) {
    var i = u(t.currentTarget).closest(".popupwindow"),
      e = h(i),
      o = q(i);
    K({
      popupWindow: i,
      action: "resize",
      dimension: t.data.dimension,
      directionX: t.data.directionX,
      directionY: t.data.directionY,
      opacity: i.data("settings").resizeOpacity,
      startX: t.pageX + ("left" == t.data.directionX ? o.width : -o.width),
      startY: t.pageY + ("top" == t.data.directionY ? o.height : -o.height),
      compensationX: t.pageX - e.left,
      compensationY: t.pageY - e.top
    }), t.preventDefault()
  }

  function at(t) {
    var i = t.data.popupWindow,
      e = i.data("settings"),
      o = h(i),
      n = q(i),
      a = {},
      s = {};
    switch (t.data.action) {
      case "drag":
        if (a.top = t.pageY - t.data.compensationY, a.left = t.pageX - t.data.compensationX, e.keepInViewport) {
          var d = q(i),
            p = u(window);
          a.top < 0 && (a.top = 0), a.left < 0 && (a.left = 0), a.top > p.height() - d.height && (a.top = p.height() -
            d.height), a.left > p.width() - d.width && (a.left = p.width() - d.width)
        }
        break;
      case "resize":
        if ("height" != t.data.dimension && 0 < t.pageX) {
          var r = "left" == t.data.directionX ? t.data.startX - t.pageX : t.pageX - t.data.startX;
          r >= e.minWidth && (!e.maxWidth || r <= e.maxWidth) && (s.width = r, "left" == t.data.directionX &&
          (a.left = t.pageX - t.data.compensationX))
        }
        if ("width" != t.data.dimension && 0 < t.pageY) {
          var l = "top" == t.data.directionY ? t.data.startY - t.pageY : t.pageY - t.data.startY;
          l >= e.minHeight && (!e.maxHeight || l <= e.maxHeight) && (s.height = l, "top" == t.data.directionY &&
          (a.top = t.pageY - t.data.compensationY))
        }
    }(a.top !== c && a.top != o.top || a.left !== c && a.left != o.left) && (i.css(a), w(i, a), e.mouseMoveEvents &&
    N(i, "move")), (s.width !== c && s.width != n.width || s.height !== c && s.height != n.height) && (i.outerWidth(
      s.width).outerHeight(s.height), Q(i, s), e.mouseMoveEvents && N(i, "resize"))
  }

  function st(t) {
    var i = t.data.popupWindow,
      e = i.data("settings");
    if (i.fadeTo(0, 1), u(document).off("mousemove", at).off("mouseup", st), e.modal || i.data("overlay").width(0).height(
      0).css("background-color", ""), !e.mouseMoveEvents) {
      var o = h(i),
        n = q(i),
        a = i.data("tempSavedData");
      a.position.top == o.top && a.position.left == o.left || N(i, "move"), a.size.width == n.width && a.size.height ==
      n.height || N(i, "resize"), i.removeData("tempSavedData")
    }
  }

  function dt(t) {
    switch (t.type) {
      case "dragstart":
        t.originalEvent.dataTransfer.effectAllowed = "move";
        var i = (p = u(t.currentTarget).closest(".popupwindow")).data("settings"),
          e = this.getBoundingClientRect();
        p.data("adjust", {
          x: e.x - t.originalEvent.x,
          y: e.y - t.originalEvent.y
        }), p.css({
          opacity: i.dragOpacity
        });
        break;
      case "drag":
        i = (p = u(t.currentTarget).closest(".popupwindow")).data("settings");
        var o = p.data("adjust"),
          n = {
            top: t.originalEvent.y + o.y,
            left: t.originalEvent.x + o.x
          };
        if (t.originalEvent.y < 0 || t.originalEvent.x < 0) return;
        if (t.originalEvent.x && t.originalEvent.y) {
          var a = q(p),
            s = u(window),
            d = n.top < 0 || n.left < 0 || n.top > s.height() - a.height || n.left > s.width() - a.width;
          p.css(u.extend(n, {
            visibility: d ? "hidden" : "visible"
          })), p.data("coords", n)
        }
        break;
      case "dragend":
        t.preventDefault(), t.stopPropagation();
        var p;
        i = (p = u(t.currentTarget).closest(".popupwindow")).data("settings"), o = p.data("adjust"), n = p.data(
          "coords");
        if (i.keepInViewport) {
          a = q(p), s = u(window);
          n.top < 0 && (n.top = 0), n.left < 0 && (n.left = 0), n.top > s.height() - a.height && (n.top = s.height() -
            a.height), n.left > s.width() - a.width && (n.left = s.width() - a.width)
        }
        p.css(u.extend(n, {
          opacity: 1,
          visibility: "visible"
        })), w(p, n), i.mouseMoveEvents && N(p, "move")
    }
    return !0
  }

  function pt() {
    u(this).parent().attr("draggable", "true")
  }
  u.PopupWindowSetup = function (t) {
    u.extend(!0, g, t)
  }, u.PopupWindowMinimizedArea = function (t) {
    if (t === c) return u.extend({}, r);
    t.position && (r.position = (0 <= t.position.toLowerCase().indexOf("b") ? "bottom" : "top") + " " + (0 <= t
      .position.toLowerCase().indexOf("l") ? "left" : "right")), t.direction && (r.direction = 0 <= t.direction
      .toLowerCase().indexOf("h") ? "horizontal" : "vertical"), i()
  }, u.fn.PopupWindow = function (t, i) {
    if ("string" != typeof t) return this.each(function () {
      e(u(this), t)
    });
    switch (t.toLowerCase()) {
      case "init":
        return this.each(function () {
          e(u(this), i)
        });
      case "open":
        return this.each(function () {
          M(u(this).closest(".popupwindow"))
        });
      case "close":
        return this.each(function () {
          o(u(this).closest(".popupwindow"))
        });
      case "maximize":
        return this.each(function () {
          n(u(this).closest(".popupwindow"))
        });
      case "unmaximize":
        return this.each(function () {
          a(u(this).closest(".popupwindow"))
        });
      case "collapse":
        return this.each(function () {
          s(u(this).closest(".popupwindow"))
        });
      case "uncollapse":
        return this.each(function () {
          d(u(this).closest(".popupwindow"))
        });
      case "minimize":
        return this.each(function () {
          p(u(this).closest(".popupwindow"))
        });
      case "unminimize":
        return this.each(function () {
          l(u(this).closest(".popupwindow"))
        });
      case "getposition":
        return this[0] ? h(u(this[0]).closest(".popupwindow")) : c;
      case "setposition":
        return this.each(function () {
          L(u(this).closest(".popupwindow"), u.extend({}, i, {
            check: !0,
            event: !0
          }))
        });
      case "getsize":
        return this[0] ? q(u(this[0]).closest(".popupwindow")) : c;
      case "setsize":
        return this.each(function () {
          G(u(this).closest(".popupwindow"), u.extend({}, i, {
            checkSize: !0,
            checkPosition: !0,
            event: !0
          }))
        });
      case "getstate":
        return this[0] ? function (t) {
          return t.length ? t.data("opened") ? t.data("minimized") ? "minimized" : t.data("collapsed") ?
            "collapsed" : t.data("maximized") ? "maximized" : "normal" : "closed" : c
        }(u(this[0]).closest(".popupwindow")) : c;
      case "setstate":
        return this.each(function () {
          ! function (t, i) {
            if (!U(t)) return;
            switch (i.toLowerCase()) {
              case "normal":
                t.data("opened") || M(t), t.data("minimized") && l(t), t.data("collapsed") &&
                d(t), t.data("maximized") && a(t);
                break;
              case "closed":
                o(t);
                break;
              case "maximized":
                n(t);
                break;
              case "unmaximized":
                a(t);
                break;
              case "collapsed":
                s(t);
                break;
              case "uncollapsed":
                d(t);
                break;
              case "minimized":
                p(t);
                break;
              case "unminimized":
                l(t)
            }
          }(u(this).closest(".popupwindow"), i)
        });
      case "settitle":
        return this.each(function () {
          ! function (t, i) {
            if (!U(t)) return;
            t.data("settings").title = i, t.find(".popupwindow_titlebar_text").text(i)
          }(u(this).closest(".popupwindow"), i)
        });
      case "statusbar":
        return this.each(function () {
          ! function (t, i) {
            if (!U(t)) return;
            t.find(".popupwindow_statusbar_content").html(i)
          }(u(this).closest(".popupwindow"), i)
        });
      case "destroy":
        return this.each(function () {
          ! function (t) {
            if (!U(t)) return;
            var i = t.data("originalTarget");
            i.appendTo(t.data("originalParent")), t.data("minimized") ? t.remove() : t.data(
              "overlay").remove();
            i.trigger("destroy.popupwindow")
          }(u(this).closest(".popupwindow"))
        })
    }
  }, u(function () {
    m = u("<div>", {
      class: "popupwindow_container"
    }).css(t).appendTo("body"), i(), u(window).on("resize", function () {
      u(document).find(".popupwindow").each(function () {
        var t = u(this);
        t.data("settings").keepInViewport && V(t)
      })
    })
  })
}(jQuery);
