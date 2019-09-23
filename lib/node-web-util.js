const _ = require('lodash');
const moment = require('moment');
const momentTimezone = require('moment-timezone');
const string = require('./string');
const template = require('./template');
const url = require('./url');

var util = {
    _,
    moment,
    momentTimezone,
    string,
    template,
    url,
    config: {},
    setConfig: function(config) {
        this.config = _.extend(this.config, config);
    },
    cache: {
        get: function(k) {
            return this[k];
        },
        set: function(k, v) {
            this[k] = v;
        }
    }
};

module.exports = function(g, config) {
    util.setConfig(config);
    global[g] = util;
};

module.exports.middleware = require('./middleware');
module.exports.sequelize = require('./sequelize');
module.exports.geoip = require('./geoip');
module.exports.jsonrpc = require('./jsonrpc');
module.exports.string = string;
module.exports.template = template;
module.exports.url = url;