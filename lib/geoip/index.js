const _ = require('lodash');
const geoip = require('geoip-lite');

exports.geo = function(ip, callback) {
    var geo = geoip.lookup(ip);
    callback(geo);
};

exports.getip = function(req) {
    return req.ip || req._remoteAddress || (req.connection && req.connection.remoteAddress) || '';
};
