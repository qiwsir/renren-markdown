// Generated by CoffeeScript 1.4.0
(function() {
  var JQ, getCssRules, getTextNodesIn, injectScript, injectScriptRaw, inlineCss, spanifyAll, testCss;

  JQ = jQuery;

  injectScriptRaw = function(doc, src) {
    return JQ(doc).find('head').append("<script>" + src + "</script>");
  };

  injectScript = function(f) {
    return injectScriptRaw(document, "(" + (f.toString()) + ")();");
  };

  getTextNodesIn = function(node) {
    var getTextNodes, textNodes, whitespace;
    textNodes = [];
    whitespace = /^\s*$/;
    getTextNodes = function(node) {
      var n, _i, _len, _ref;
      if (node.nodeType === 3) {
        textNodes.push(node);
      } else {
        _ref = node.childNodes;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          n = _ref[_i];
          getTextNodes(n);
        }
      }
      return null;
    };
    getTextNodes(node);
    return textNodes;
  };

  getCssRules = function(css) {
    var doc;
    doc = JQ('<iframe />').css('display', 'none').appendTo(JQ('body'))[0].contentDocument;
    JQ(doc).find('head').append(JQ("<style>" + css + "</style>"));
    return doc.styleSheets[0].cssRules;
  };

  inlineCss = function(el, cssRules) {
    var jel, rule, _i, _len, _results;
    jel = JQ(el);
    _results = [];
    for (_i = 0, _len = cssRules.length; _i < _len; _i++) {
      rule = cssRules[_i];
      _results.push(jel.find(rule.selectorText).each(function(i, x) {
        return x.style.cssText = ("" + rule.style.cssText + ";") + x.style.cssText;
      }));
    }
    return _results;
  };

  spanifyAll = function(el) {
    var jel, spanify;
    jel = JQ(el);
    spanify = function(el) {
      if (!(el != null)) {
        return JQ('<span />');
      }
      return JQ("<span style=\"" + el.style.cssText + "\">" + el.innerHTML + "</span>");
    };
    jel.find('pre').each(function(i, x) {
      var str, text, _i, _len, _ref, _results;
      _ref = getTextNodesIn(x);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        text = _ref[_i];
        str = text.data.toString().replace(/\&/g, '&amp;').replace(/\ /g, '&nbsp;').replace(/[\n\r\v]/g, '<br/>');
        _results.push(JQ(text).replaceWith(JQ("<span>" + str + "</span>")));
      }
      return _results;
    });
    [['pre, code', 'inline'], ['div, p, blockquote', 'block'], ['td', 'table-cell'], ['tr', 'table-row'], ['tbody', 'table'], ['table', 'block'], ['h1, h2, h3, h4, h5, h6', 'inline']].forEach(function(arg) {
      (function(tag, disp) {
        var s, x, _base;
        while (x = jel.find(tag)[0]) {
          s = spanify(x);
          (_base = s[0].style).display || (_base.display = disp);
          JQ(x).replaceWith(s);
        }
      }).apply(null, arg);
    });
    ['a'].forEach(function(tag) {
      return JQ(tag).each(function(i, x) {
        var st;
        st = x.style.cssText;
        x.style.cssText = '';
        return JQ(x).wrap('<span />').parent()[0].style.cssText = st;
      });
    });
  };

  testCss = ' pre, code { font-size: 0.85em; font-family: Consolas, Inconsolata, Courier, monospace; } code { margin: 0 0.15em; padding: 0 0.3em; white-space: nowrap; border: 1px solid #EAEAEA; background-color: #F8F8F8; border-radius: 3px; display: inline; /* adam-p: added to fix Yahoo block display */ } pre { font-size: 1em; line-height: 1.2em; overflow: auto; } pre code { white-space: pre; border-radius: 3px; border: 1px solid #CCC; padding: 0.5em 0.7em; } ul, ol { } p, blockquote, ul, ol, dl, li, table, pre { margin: 1em 0; } dl { padding: 0; } dl dt { font-size: 1em; font-weight: bold; font-style: italic; padding: 0; margin: 1em 0 0.4em; } dl dd { margin: 0 0 1em; padding: 0 1em; } blockquote { border-left: 4px solid #DDD; padding: 0 1em; color: #777; } blockquote, q { quotes: none; } blockquote::before, blockquote::after, q::before, q::after { content: none; } a:link, a:visited { color: #33e; text-decoration: none; } a:hover { color: #00f; text-shadow: 1px 1px 2px #ccf; text-decoration: underline; } h1, h2, h3, h4, h5, h6 { margin: 1.3em 0 1em; padding-top: 1em; font-weight: bold; color: black; cursor: text; position: relative; } h1 { font-size: 2.3em; } h2 { font-size: 1.7em; border-bottom: 1px solid #CCC; } h3 { font-size: 1.5em; } h4 { font-size: 1.2em; } h5 { font-size: 1em; } h6 { font-size: 1em; color: #777; } .shadow { box-shadow:0 5px 15px #000; } table { padding: 0; border-collapse: collapse; border-spacing: 0; font-size: 100%; font: inherit; border: 0; } tbody { margin: 0; padding: 0; border: 0; } table tr { border: 0; border-top: 1px solid #CCC; background-color: white; margin: 0; padding: 0; } table tr:nth-child(2n) { background-color: #F8F8F8; } table tr th, table tr td { border: 1px solid #CCC; text-align: left; margin: 0; padding: 0.5em 1em; } table tr th { font-weight: bold; } ';

  inlineCss(document, getCssRules(testCss));

  spanifyAll(document);

}).call(this);