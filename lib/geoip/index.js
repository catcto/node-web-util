const _ = require('lodash');

exports.getCountry = function(req, callback) {
    if (_.isString(req.query.xcountry) && req.query.xcountry) {
        callback(req.query.xcountry);
    } else if (req.headers['cf-ipcountry']) {
        callback(req.headers['cf-ipcountry']);
    } else {
        callback('');
    }
};

exports.getip = function(req) {
    return req.ip || req._remoteAddress || (req.connection && req.connection.remoteAddress) || '';
};
