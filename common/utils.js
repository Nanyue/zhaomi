// 根据传入参数拼装url，并跳转到该url
exports.goTo = function(params, without) {
    var oldParams = without ? {} : this.getUrlParameter();
    var newParams = _.extend({}, oldParams, params);

    location.href = '/search?' + $.param(newParams);
}

exports.assert = function(value, msg) {
    if (!value) {
        exports.warn(msg);
    }
}

exports.assertEquals = function(value, anotherValue, msg) {
    if (value !== anotherValue) {
        exports.warn(msg);   
    }
}

exports.warn = function(msg) {
    window.alert(msg);
}

exports.compileTpl = function(tpl, data) {
    return tpl.replace(/\{(\w+)\}/g, function(all, param) {
        return data[param] || '';
    })
}

var $doc = $(document);
var $win = $(window);

exports.loadMore = function(callback) {

    var timeoutId;
    // 处理加载更多
    $win.scroll(function() {
        var LOADING_GAP = 200;
        if ($doc.height() < $doc.scrollTop() + $win.height() + LOADING_GAP) {
            if (timeoutId) {
                return;
            }
            timeoutId = setTimeout(function() {
                callback();
                timeoutId = null;
            }, 300);
        }
    })
}

exports.getUrlParameter = function() {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    var pairs;
    var ret = {};
    for (var i = 0; i < sURLVariables.length; i++) {
        var pairs = sURLVariables[i].split('=');
        if (pairs[0]) {
            ret[pairs[0]] = decodeURIComponent(pairs[1]);
        }
    }
    return ret;
}