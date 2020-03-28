const _ = require('lodash');
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);
const momentTimezone = require('moment-timezone');
const string = require('./string');
const template = require('./template');
const url = require('./url');
const paging = require('./paging');

var util = {
    _,
    moment,
    momentTimezone,
    string,
    template,
    url,
    paging,
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
module.exports.ua = require('./ua');
module.exports.jsonrpc = require('./jsonrpc');
module.exports.string = string;
module.exports.template = template;
module.exports.url = url;