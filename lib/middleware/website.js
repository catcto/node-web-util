const _ = require('lodash');
const geoip = require('../geoip');

function website(l) {
    return (req, res, next) => {
        let $ = {};
        let hl = $$.website.locales.default;

        $.req = {
            url: req.url,
            query: req.query,
            body: req.body,
            headers: req.headers,
            cookies: req.cookies,
            ip: geoip.getip(req)
        };

        $.get = function (key) {
            if ($$.website.locales[hl] && $$.website.locales[hl][key]) {
                if (arguments.length == 1) {
                    return $$.website.locales[hl][key];
                } else {
                    return $$.string.format.apply($$.website.locales[hl][key], Array.prototype.slice.call(arguments, 1));
                }
            } else {
                return key;
            }
        }

        $.view = {};

        res.setView = function (view) {
            $.view = _.extend($.view, view);
        }

        geoip.geo($.req.ip, function (geo) {
            $.req.geo = geo;
            res.locals[l] = $;
            next();
        });
    };
}

module.exports = website;