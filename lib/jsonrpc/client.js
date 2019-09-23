const request = require('request');
const async = require('async');
const _ = require('lodash');
const jsonrpc = require('./jsonrpc');

function client(options) {
    this.options = options;
}

client.prototype.request = function(body, callback) {
    const self = this;
    let bodys = Array.isArray(body) ? body : [body];
    let options = {
        method: 'POST',
        timeout: 15000,
        json: true
    };
    let results = [];
    let errors = [];
    async.eachSeries(
        bodys,
        function(b, callback) {
            b.jsonrpc = jsonrpc.VERSION;
            let opt = _.extend({ body: b }, options, self.options);
            request(opt, function(error, response, body) {
                if (error) {
                    console.error(error);
                    errors.push(jsonrpc.normalize(body, jsonrpc.ERROR.INTERNAL_ERROR));
                } else {
                    if (response.statusCode == 200) {
                        results.push(body);
                    } else {
                        errors.push(jsonrpc.normalize(body, jsonrpc.ERROR.INVALID_REQUEST));
                    }
                }
                callback();
            });
        },
        function(err) {
            if (bodys.length === 1) {
                callback(errors[0], results[0]);
            } else {
                callback(errors, results);
            }
        }
    );
};

module.exports = client;
