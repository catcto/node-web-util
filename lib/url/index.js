const url = {
    setParam: function(url, param, value) {
        var reg = new RegExp('([?&]' + param + '=).*?(&|$)');
        value = encodeURIComponent(value);
        if (reg.test(url)) {
            url = url.replace(reg, '$1' + value + '$2');
        } else {
            url = [url, param + '=' + value].join(~url.indexOf('?') ? '&' : '?');
        }
        return url;
    },
    setParams: function(url, params) {
        for (var param in params) {
            if (params.hasOwnProperty(param)) {
                url = $$.url.setUrlParam(url, param, params[param]);
            }
        }
        return url;
    },
    removeParam: function(url, param) {
        return url.replace(new RegExp('[?&]' + param + '=[^&#]*(#.*)?$'), '$1').replace(new RegExp('([?&])' + param + '=[^&]*&'), '$1');
    }
};

module.exports = url;
