const _ = require('lodash');
const geoip = require('geoip-lite');

exports.geoip = function(req, callback) {
    var geo = geoip.lookup(exports.getip(req));
    callback(geo);
};

exports.getip = function(req) {
    return req.ip || req._remoteAddress || (req.connection && req.connection.remoteAddress) || '';
};
