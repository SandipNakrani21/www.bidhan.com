//Spritely 0.6

/*
 * jQuery spritely 0.6.7
 * http://spritely.net/
 *
 * Documentation:
 * http://spritely.net/documentation/
 *
 * Copyright 2010-2011, Peter Chater, Artlogic Media Ltd, http://www.artlogic.net/
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 */

! function(t) {
    t._spritely = {
        instances: {},
        animate: function(e) {
            var s = t(e.el),
                i = s.attr("id");
            if (!t._spritely.instances[i]) return this;
            if (e = t.extend(e, t._spritely.instances[i] || {}), "sprite" == e.type && e.fps) {
                e.play_frames && !t._spritely.instances[i].remaining_frames ? t._spritely.instances[i].remaining_frames = e.play_frames + 1 : e.do_once && !t._spritely.instances[i].remaining_frames && (t._spritely.instances[i].remaining_frames = e.no_of_frames);
                var n, r = function(s) {
                    var r = e.width;
                    e.height;
                    if (!n) {
                        n = [], total = 0;
                        for (var a = 0; a < e.no_of_frames; a++) n[n.length] = 0 - total, total += r
                    }
                    0 == t._spritely.instances[i].current_frame ? e.on_first_frame && e.on_first_frame(s) : t._spritely.instances[i].current_frame == n.length - 1 && e.on_last_frame && e.on_last_frame(s), e.on_frame && e.on_frame[t._spritely.instances[i].current_frame] && e.on_frame[t._spritely.instances[i].current_frame](s), 1 == e.rewind ? t._spritely.instances[i].current_frame <= 0 ? t._spritely.instances[i].current_frame = n.length - 1 : t._spritely.instances[i].current_frame = t._spritely.instances[i].current_frame - 1 : t._spritely.instances[i].current_frame >= n.length - 1 ? t._spritely.instances[i].current_frame = 0 : t._spritely.instances[i].current_frame = t._spritely.instances[i].current_frame + 1;
                    var p = t._spritely.getBgY(s);
                    if (s.css("background-position", n[t._spritely.instances[i].current_frame] + "px " + p), e.bounce && e.bounce[0] > 0 && e.bounce[1] > 0) {
                        var c = e.bounce[0],
                            o = e.bounce[1],
                            _ = e.bounce[2];
                        s.animate({
                            top: "+=" + c + "px",
                            left: "-=" + o + "px"
                        }, _).animate({
                            top: "-=" + c + "px",
                            left: "+=" + o + "px"
                        }, _)
                    }
                };
                if (t._spritely.instances[i].remaining_frames && t._spritely.instances[i].remaining_frames > 0) {
                    if (t._spritely.instances[i].remaining_frames--, 0 == t._spritely.instances[i].remaining_frames) return t._spritely.instances[i].remaining_frames = -1, delete t._spritely.instances[i].remaining_frames, this;
                    r(s)
                } else -1 != t._spritely.instances[i].remaining_frames && r(s)
            } else if ("pan" == e.type && !t._spritely.instances[i]._stopped) {
                var a = e.speed || 1,
                    p = t._spritely.instances[i].l || parseInt(t._spritely.getBgX(s).replace("px", ""), 10) || 0,
                    c = t._spritely.instances[i].t || parseInt(t._spritely.getBgY(s).replace("px", ""), 10) || 0;
                if (e.do_once && !t._spritely.instances[i].remaining_frames || t._spritely.instances[i].remaining_frames <= 0) {
                    switch (e.dir) {
                        case "up":
                        case "down":
                            t._spritely.instances[i].remaining_frames = Math.floor((e.img_height || 0) / a);
                            break;
                        case "left":
                        case "right":
                            t._spritely.instances[i].remaining_frames = Math.floor((e.img_width || 0) / a)
                    }
                    t._spritely.instances[i].remaining_frames++
                } else e.do_once && t._spritely.instances[i].remaining_frames--;
                switch (e.dir) {
                    case "up":
                        a *= -1;
                    case "down":
                        t._spritely.instances[i].l || (t._spritely.instances[i].l = p), t._spritely.instances[i].t = c + a, e.img_height && (t._spritely.instances[i].t %= e.img_height);
                        break;
                    case "left":
                        a *= -1;
                    case "right":
                        t._spritely.instances[i].t || (t._spritely.instances[i].t = c), t._spritely.instances[i].l = p + a, e.img_width && (t._spritely.instances[i].l %= e.img_width)
                }
                var o = t._spritely.instances[i].l.toString();
                o += -1 == o.indexOf("%") ? "px " : " ";
                var _ = t._spritely.instances[i].t.toString();
                if (_ += -1 == _.indexOf("%") ? "px " : " ", t(s).css("background-position", o + _), e.do_once && !t._spritely.instances[i].remaining_frames) return this
            }
            t._spritely.instances[i].options = e, t._spritely.instances[i].timeout = window.setTimeout(function() {
                t._spritely.animate(e)
            }, parseInt(1e3 / e.fps))
        },
        randomIntBetween: function(t, e) {
            return parseInt(rand_no = Math.floor((e - (t - 1)) * Math.random()) + t)
        },
        getBgUseXY: function() {
            try {
                return "string" == typeof t("body").css("background-position-x")
            } catch (e) {
                return !1
            }
        }(),
        getBgY: function(e) {
            return t._spritely.getBgUseXY ? t(e).css("background-position-y") || "0" : (t(e).css("background-position") || " ").split(" ")[1]
        },
        getBgX: function(e) {
            return t._spritely.getBgUseXY ? t(e).css("background-position-x") || "0" : (t(e).css("background-position") || " ").split(" ")[0]
        },
        get_rel_pos: function(t, e) {
            var s = t;
            if (0 > t)
                for (; 0 > s;) s += e;
            else
                for (; s > e;) s -= e;
            return s
        },
        _spStrip: function(t, e) {
            for (; t.length;) {
                var s, i, n = !1,
                    r = !1;
                for (s = 0; s < e.length; s++) {
                    var a = t.slice(0, 1);
                    i = t.slice(1), e.indexOf(a) > -1 ? t = i : n = !0
                }
                for (s = 0; s < e.length; s++) {
                    var p = t.slice(-1);
                    i = t.slice(0, -1), e.indexOf(p) > -1 ? t = i : r = !0
                }
                if (n && r) return t
            }
            return ""
        }
    }, t.fn.extend({
        spritely: function(e) {
            var s = t(this),
                i = s.attr("id"),
                e = t.extend({
                    type: "sprite",
                    do_once: !1,
                    width: null,
                    height: null,
                    img_width: 0,
                    img_height: 0,
                    fps: 12,
                    no_of_frames: 2,
                    play_frames: 0
                }, e || {}),
                n = new Image,
                r = t._spritely._spStrip(s.css("background-image") || "", 'url("); ');
            return t._spritely.instances[i] || (e.start_at_frame ? t._spritely.instances[i] = {
                current_frame: e.start_at_frame - 1
            } : t._spritely.instances[i] = {
                current_frame: -1
            }), t._spritely.instances[i].type = e.type, t._spritely.instances[i].depth = e.depth, e.el = s, e.width = e.width || s.width() || 100, e.height = e.height || s.height() || 100, n.onload = function() {
                e.img_width = n.width, e.img_height = n.height, e.img = n;
                var s = function() {
                    return parseInt(1e3 / e.fps)
                };
                e.do_once ? setTimeout(function() {
                    t._spritely.animate(e)
                }, 0) : setTimeout(function() {
                    t._spritely.animate(e)
                }, s(e.fps))
            }, n.src = r, this
        },
        sprite: function(e) {
            var e = t.extend({
                type: "sprite",
                bounce: [0, 0, 1e3]
            }, e || {});
            return t(this).spritely(e)
        },
        pan: function(e) {
            var e = t.extend({
                type: "pan",
                dir: "left",
                continuous: !0,
                speed: 1
            }, e || {});
            return t(this).spritely(e)
        },
        flyToTap: function(e) {
            var e = t.extend({
                el_to_move: null,
                type: "moveToTap",
                ms: 1e3,
                do_once: !0
            }, e || {});
            return e.el_to_move && t(e.el_to_move).active(), t._spritely.activeSprite && ("ontouchstart" in document ? t(this)[0].ontouchstart = function(e) {
                var s = t._spritely.activeSprite,
                    i = e.touches[0],
                    n = i.pageY - s.height() / 2,
                    r = i.pageX - s.width() / 2;
                s.animate({
                    top: n + "px",
                    left: r + "px"
                }, 1e3)
            } : t(this).click(function(e) {
                var s = t._spritely.activeSprite;
                t(s).stop(!0);
                var i = s.width(),
                    n = s.height(),
                    r = e.pageX - i / 2,
                    a = e.pageY - n / 2;
                s.animate({
                    top: a + "px",
                    left: r + "px"
                }, 1e3)
            })), this
        },
        isDraggable: function(e) {
            if (!t(this).draggable) return this;
            var e = t.extend({
                    type: "isDraggable",
                    start: null,
                    stop: null,
                    drag: null
                }, e || {}),
                s = t(this).attr("id");
            return t._spritely.instances[s] ? (t._spritely.instances[s].isDraggableOptions = e, t(this).draggable({
                start: function() {
                    var e = t(this).attr("id");
                    t._spritely.instances[e].stop_random = !0, t(this).stop(!0), t._spritely.instances[e].isDraggableOptions.start && t._spritely.instances[e].isDraggableOptions.start(this)
                },
                drag: e.drag,
                stop: function() {
                    var e = t(this).attr("id");
                    t._spritely.instances[e].stop_random = !1, t._spritely.instances[e].isDraggableOptions.stop && t._spritely.instances[e].isDraggableOptions.stop(this)
                }
            }), this) : this
        },
        active: function() {
            return t._spritely.activeSprite = this, this
        },
        activeOnClick: function() {
            var e = t(this);
            return "ontouchstart" in document ? e[0].ontouchstart = function(s) {
                t._spritely.activeSprite = e
            } : e.click(function(s) {
                t._spritely.activeSprite = e
            }), this
        },
        spRandom: function(e) {
            var e = t.extend({
                    top: 50,
                    left: 50,
                    right: 290,
                    bottom: 320,
                    speed: 4e3,
                    pause: 0
                }, e || {}),
                s = t(this).attr("id");
            if (!t._spritely.instances[s]) return this;
            if (!t._spritely.instances[s].stop_random) {
                var i = t._spritely.randomIntBetween,
                    n = i(e.top, e.bottom),
                    r = i(e.left, e.right);
                t("#" + s).animate({
                    top: n + "px",
                    left: r + "px"
                }, e.speed)
            }
            return window.setTimeout(function() {
                t("#" + s).spRandom(e)
            }, e.speed + e.pause), this
        },
        makeAbsolute: function() {
            return this.each(function() {
                var e = t(this),
                    s = e.position();
                e.css({
                    position: "absolute",
                    marginLeft: 0,
                    marginTop: 0,
                    top: s.top,
                    left: s.left
                }).remove().appendTo("body")
            })
        },
        spSet: function(e, s) {
            var i = t(this).attr("id");
            return t._spritely.instances[i][e] = s, this
        },
        spGet: function(e, s) {
            var i = t(this).attr("id");
            return t._spritely.instances[i][e]
        },
        spStop: function(e) {
            return this.each(function() {
                var s = t(this),
                    i = s.attr("id");
                if (t._spritely.instances[i].options.fps && (t._spritely.instances[i]._last_fps = t._spritely.instances[i].options.fps), "sprite" == t._spritely.instances[i].type && s.spSet("fps", 0), t._spritely.instances[i]._stopped = !0, t._spritely.instances[i]._stopped_f1 = e, e) {
                    var n = t._spritely.getBgY(t(this));
                    s.css("background-position", "0 " + n)
                }
            }), this
        },
        spStart: function() {
            return t(this).each(function() {
                var e = t(this).attr("id"),
                    s = t._spritely.instances[e]._last_fps || 12;
                "sprite" == t._spritely.instances[e].type && t(this).spSet("fps", s), t._spritely.instances[e]._stopped = !1
            }), this
        },
        spToggle: function() {
            var e = t(this).attr("id"),
                s = t._spritely.instances[e]._stopped || !1,
                i = t._spritely.instances[e]._stopped_f1 || !1;
            return s ? t(this).spStart() : t(this).spStop(i), this
        },
        fps: function(e) {
            return t(this).each(function() {
                t(this).spSet("fps", e)
            }), this
        },
        goToFrame: function(e) {
            var s = t(this).attr("id");
            return t._spritely.instances && t._spritely.instances[s] && (t._spritely.instances[s].current_frame = e - 1), this
        },
        spSpeed: function(e) {
            return t(this).each(function() {
                t(this).spSet("speed", e)
            }), this
        },
        spRelSpeed: function(e) {
            return t(this).each(function() {
                var s = t(this).spGet("depth") / 100;
                t(this).spSet("speed", e * s)
            }), this
        },
        spChangeDir: function(e) {
            return t(this).each(function() {
                t(this).spSet("dir", e)
            }), this
        },
        spState: function(e) {
            return t(this).each(function() {
                var s = (e - 1) * t(this).height() + "px",
                    i = t._spritely.getBgX(t(this)),
                    n = i + " -" + s;
                t(this).css("background-position", n)
            }), this
        },
        lockTo: function(e, s) {
            return t(this).each(function() {
                var i = t(this).attr("id");
                return t._spritely.instances[i] ? (t._spritely.instances[i].locked_el = t(this), t._spritely.instances[i].lock_to = t(e), t._spritely.instances[i].lock_to_options = s, void(t._spritely.instances[i].interval = window.setInterval(function() {
                    if (t._spritely.instances[i].lock_to) {
                        var e = t._spritely.instances[i].locked_el,
                            s = t._spritely.instances[i].lock_to,
                            n = t._spritely.instances[i].lock_to_options,
                            r = n.bg_img_width,
                            a = (s.height(), t._spritely.getBgY(s)),
                            p = t._spritely.getBgX(s),
                            c = parseInt(p) + parseInt(n.left),
                            o = parseInt(a) + parseInt(n.top);
                        c = t._spritely.get_rel_pos(c, r), t(e).css({
                            top: o + "px",
                            left: c + "px"
                        })
                    }
                }, s.interval || 20))) : this
            }), this
        },
        destroy: function() {
            var e = (t(this), t(this).attr("id"));
            return t._spritely.instances[e] && t._spritely.instances[e].timeout && window.clearTimeout(t._spritely.instances[e].timeout), t._spritely.instances[e] && t._spritely.instances[e].interval && window.clearInterval(t._spritely.instances[e].interval), delete t._spritely.instances[e], this
        }
    })
}(jQuery);
try {
    document.execCommand("BackgroundImageCache", !1, !0)
} catch (err) {}