(function () {
    var splitByFirstChar = function (toBeSplit, splitChar) {
        var index = toBeSplit.indexOf(splitChar);
        if (index >= 0) {
            return [toBeSplit.substring(0, index), toBeSplit.substring(index + 1)];
        }
        return [toBeSplit];
    };
    var langChooser_parseParams = function (paramsSection) {
        if (paramsSection) {
            var query = {};
            var params = paramsSection.split("&");
            for (var i = 0; i < params.length; i++) {
                var param = splitByFirstChar(params[i], "=");
                if (param.length == 2) {
                    query[param[0]] = param[1];
                }
            }
            return query;
        }
        return {};
    };
    var langChooser_getParamStr = function (params) {
        var paramsStr = [];
        for (var a in params) {
            paramsStr.push(a + "=" + params[a]);
        }
        return paramsStr.join("&");
    };
    var langChooser_currentUrl = window.location.href;
    var match = langChooser_currentUrl.match("^(.*?)(\\?(.*?))?(#(.*))?$");
    var langChooser_currentPath = match[1];
    var langChooser_params = langChooser_parseParams(match[3]);
    var langChooser_fragment = match[5];

    var langChooser = document.getElementById("lang-chooser");
    var langChooserWrap = document.getElementById("lang-chooser-wrap");
    var langVisControl = document.getElementById("lang-vis-control");
    if (langVisControl && langChooser) {
        langVisControl.style.display = "inline";
        langChooser.onchange = function () {
            langChooser_params["lp"] = 1;
            langChooser_params["hl"] = encodeURIComponent(this.value);
            var paramsStr = langChooser_getParamStr(langChooser_params);
            var newHref = langChooser_currentPath + "?" + paramsStr;
            if (langChooser_fragment) {
                newHref = newHref + "#" + langChooser_fragment;
            }
            window.location.href = newHref;
        };
    }
})();
var gaia_attachEvent = function (element, event, callback) {
    if (element.addEventListener) {
        element.addEventListener(event, callback, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + event, callback);
    }
};

var G,
    Gb = function (a, b) {
        var c = a;
        a && "string" == typeof a && (c = document.getElementById(a));
        if (b && !c) throw new Ga(a);
        return c;
    },
    Ga = function (a) {
        this.id = a;
        this.toString = function () {
            return "No element found for id '" + this.id + "'";
        };
    };
var Gc = {},
    Gf = function (a, b, c) {
        var d = function (a) {
            var b = c.call(this, a);
            !1 === b && Gd(a);
            return b;
        };
        a = Gb(a, !0);
        a.addEventListener(b, d, !1);
        Ge(a, b).push(d);
        return d;
    },
    Gg = function (a, b, c) {
        a = Gb(a, !0);
        var d = function () {
            var b = window.event,
                d = c.call(a, b);
            !1 === d && Gd(b);
            return d;
        };
        a.attachEvent("on" + b, d);
        Ge(a, b).push(d);
        return d;
    },
    Gh;
Gh = window.addEventListener ? Gf : window.attachEvent ? Gg : void 0;
var Gd = function (a) {
    a.preventDefault ? a.preventDefault() : (a.returnValue = !1);
    return !1;
};
var Ge = function (a, b) {
    Gc[a] = Gc[a] || {};
    Gc[a][b] = Gc[a][b] || [];
    return Gc[a][b];
};
var Gi = function () {
        try {
            return new XMLHttpRequest();
        } catch (a) {
            for (
                var b = [
                        "MSXML2.XMLHTTP.6.0",
                        "MSXML2.XMLHTTP.3.0",
                        "MSXML2.XMLHTTP",
                        "Microsoft.XMLHTTP",
                    ],
                    c = 0; c < b.length; c++
            )
                try {
                    return new ActiveXObject(b[c]);
                } catch (d) {}
        }
        return null;
    },
    Gj = function () {
        this.request = Gi();
        this.parameters = {};
    };
Gj.prototype.send = function (a, b) {
    var c = [],
        d;
    for (d in this.parameters) {
        var e = this.parameters[d];
        c.push(d + "=" + encodeURIComponent(e));
    }
    var c = c.join("&"),
        f = this.request;
    f.open("POST", a, !0);
    f.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    f.onreadystatechange = function () {
        4 == f.readyState &&
            b({
                status: f.status,
                text: f.responseText,
            });
    };
    f.send(c);
};
Gj.prototype.get = function (a, b) {
    var c = this.request;
    c.open("GET", a, !0);
    c.onreadystatechange = function () {
        4 == c.readyState &&
            b({
                status: c.status,
                text: c.responseText,
            });
    };
    c.send();
};
var Gl = function (a) {
    this.g = a;
    this.v = this.o();
    if (null == this.g) throw new Gk("Empty module name");
};
G = Gl.prototype;
G.o = function () {
    var a = window.location.pathname;
    return a && 0 == a.indexOf("/accounts") ?
        "/accounts/JsRemoteLog" :
        "/JsRemoteLog";
};
G.j = function (a, b, c) {
    var d = this.v,
        e = this.g || "",
        d = d + "?module=" + encodeURIComponent(e);
    a = a || "";
    d = d + "&type=" + encodeURIComponent(a);
    b = b || "";
    d = d + "&msg=" + encodeURIComponent(b);
    c = c || [];
    for (a = 0; a < c.length; a++) d = d + "&arg=" + encodeURIComponent(c[a]);
    try {
        var f = Math.floor(1e4 * Math.random()),
            d = d + "&r=" + String(f);
    } catch (g) {}
    return d;
};
G.send = function (a, b, c) {
    var d = new Gj();
    d.parameters = {};
    try {
        var e = this.j(a, b, c);
        d.get(e, function () {});
    } catch (f) {}
};
G.error = function (a, b) {
    this.send("ERROR", a, b);
};
G.warn = function (a, b) {
    this.send("WARN", a, b);
};
G.info = function (a, b) {
    this.send("INFO", a, b);
};
G.f = function (a) {
    var b = this;
    return function () {
        try {
            return a.apply(null, arguments);
        } catch (c) {
            throw (b.error("Uncatched exception: " + c), c);
        }
    };
};
var Gk = function () {};
var Gm = Gm || new Gl("uri"),
    Gn = RegExp(
        "^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([\\w\\d\\-\\u0100-\\uffff.%]*)(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$"
    ),
    Go = function (a) {
        return "http" == a.toLowerCase() ?
            80 :
            "https" == a.toLowerCase() ?
            443 :
            null;
    },
    Gp = function (a, b) {
        var c = b.match(Gn)[1] || null,
            d,
            e = b.match(Gn)[3] || null;
        d = e && decodeURIComponent(e);
        e = Number(b.match(Gn)[4] || null) || null;
        if (!c || !d) return Gm.error("Invalid origin Exception", [String(b)]), !1;
        e || (e = Go(c));
        var f = a.match(Gn)[1] || null;
        if (!f || f.toLowerCase() != c.toLowerCase()) return !1;
        c = (c = a.match(Gn)[3] || null) && decodeURIComponent(c);
        if (!c || c.toLowerCase() != d.toLowerCase()) return !1;
        (d = Number(a.match(Gn)[4] || null) || null) || (d = Go(f));
        return e == d;
    };
var Gq = Gq || new Gl("check_connection"),
    Gr = null,
    Gs = null,
    Gt = null,
    Gu = function (a, b) {
        this.c = a;
        this.b = b;
        this.a = !1;
    };
G = Gu.prototype;
G.i = function (a, b) {
    if (!b) return !1;
    if (0 <= a.indexOf(","))
        return Gq.error("CheckConnection result contains comma", [a]), !1;
    var c = b.value;
    b.value = c ? c + "," + a : a;
    return !0;
};
G.h = function (a) {
    return this.i(a, Gs);
};
G.w = function (a) {
    return this.i(a, Gt);
};
G.m = function (a) {
    a = a.match("^([^:]+):(\\d*):(\\d?)$");
    return !a || 3 > a.length ? null : a[1];
};
G.u = function (a, b) {
    if (!Gp(this.c, a)) return !1;
    if (this.a || !b) return !0;
    "accessible" == b
        ?
        (this.h(a), (this.a = !0)) :
        this.m(b) == this.b && (this.w(b) || this.h(a), (this.a = !0));
    return !0;
};
G.s = function () {
    var a;
    a = this.c;
    var b = "timestamp",
        c = String(new Date().getTime());
    if (0 < a.indexOf("#")) throw Object("Unsupported URL Exception: " + a);
    return (a =
        0 <= a.indexOf("?") ?
        a + "&" + encodeURIComponent(b) + "=" + encodeURIComponent(c) :
        a + "?" + encodeURIComponent(b) + "=" + encodeURIComponent(c));
};
G.l = function () {
    var a = window.document.createElement("iframe"),
        b = a.style;
    b.visibility = "hidden";
    b.width = "1px";
    b.height = "1px";
    b.position = "absolute";
    b.top = "-100px";
    a.src = this.s();
    a.id = this.b;
    Gr.appendChild(a);
};
var Gv = function (a) {
        return function (b) {
            var c = b.origin.toLowerCase();
            b = b.data;
            for (var d = a.length, e = 0; e < d && !a[e].u(c, b); e++);
        };
    },
    Gw = function () {
        if (window.postMessage) {
            var a;
            a = window.__CHECK_CONNECTION_CONFIG.iframeParentElementId;
            var b = window.__CHECK_CONNECTION_CONFIG.connectivityElementId,
                c = window.__CHECK_CONNECTION_CONFIG.newResultElementId;
            (Gr = document.getElementById(a)) ?
            (b && (Gs = document.getElementById(b)),
                c && (Gt = document.getElementById(c)),
                Gs || Gt ?
                (a = !0) :
                (Gq.error(
                        "Unable to locate the input element to storeCheckConnection result",
                        ["old id: " + String(b), "new id: " + String(c)]
                    ),
                    (a = !1))) :
            (Gq.error(
                    "Unable to locate the iframe anchor to append connection test iframe",
                    ["element id: " + a]
                ),
                (a = !1));
            if (a) {
                a = window.__CHECK_CONNECTION_CONFIG.domainConfigs;
                if (!a) {
                    if (!window.__CHECK_CONNECTION_CONFIG.iframeUri) {
                        Gq.error("Missing iframe URL in old configuration");
                        return;
                    }
                    a = [{
                        iframeUri: window.__CHECK_CONNECTION_CONFIG.iframeUri,
                        domainSymbol: "youtube",
                    }, ];
                }
                if (0 != a.length) {
                    for (var b = a.length, c = [], d = 0; d < b; d++)
                        c.push(new Gu(a[d].iframeUri, a[d].domainSymbol));
                    Gh(window, "message", Gv(c));
                    for (d = 0; d < b; d++) c[d].l();
                }
            }
        }
    },
    Gx = function () {
        if (window.__CHECK_CONNECTION_CONFIG) {
            var a = window.__CHECK_CONNECTION_CONFIG.postMsgSupportElementId;
            if (window.postMessage) {
                var b = document.getElementById(a);
                b
                    ?
                    (b.value = "1") :
                    Gq.error(
                        "Unable to locate the input element to storepostMessage test result",
                        ["element id: " + a]
                    );
            }
        }
    };
G_checkConnectionMain = Gq.f(Gw);
G_setPostMessageSupportFlag = Gq.f(Gx);