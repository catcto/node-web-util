const _ = require('lodash');
const async = require('async');
const paging = require('./paging');

function customizer(objValue, srcValue) {
    if (_.isArray(objValue)) {
        return srcValue;
    }
}

exports.expansion = function (model, sequelize) {
    model.save = function (m, options, callback) {
        if (options) {
            this.findOne(options).then(obj => {
                if (obj) {
                    let o = _.cloneDeep(obj.dataValues);
                    _.mergeWith(o, m, customizer);
                    obj.update(o).then(callback);
                } else {
                    this.create(m).then(callback);
                }
            });
        } else {
            this.create(m).then(callback);
        }
    }
    model.remove = function (options, callback) {
        this.destroy(options).then(callback);
    }
    model.findByOne = function (options, callback) {
        options = _.extend({ raw: true }, options);
        this.findOne(options).then(callback);
    }
    model.findByAll = function (options, callback) {
        let data = {
            list: [],
            total: 0
        };
        options = _.extend({ raw: true }, options);
        this.findAll(options).then(function (results) {
            if (results && results.length > 0) {
                data.list = results;
                data.total = results.length;
            }
            callback(data);
        });
    }
    model.findByPage = function (options, currentPage, pageSize, callback) {
        let data = {
            list: [],
            total: 0
        };
        options = _.extend({
            offset: (currentPage - 1) * pageSize,
            limit: pageSize,
            raw: true
        }, options);
        async.parallel([
            (callback) => {
                this.findAll(options).then(function (results) {
                    if (results && results.length > 0) {
                        data.list = results;
                    }
                    callback(null, null);
                });
            },
            (callback) => {
                this.count({
                    where: options.where,
                }).then(function (results) {
                    if (results) {
                        data.total = results;
                    }
                    callback(null, null);
                });
            }
        ], function (err, results) {
            data.pages = paging.build(data.total, currentPage, pageSize, 4, 9);
            callback(data);
        }
        );
    }

    model.findByNextPage = function (options, currentPage, pageSize, callback) {
        var data = {
            list: [],
            hasNext: false
        };
        options = _.extend({
            offset: (currentPage - 1) * pageSize,
            limit: pageSize + 1,
            raw: true
        }, options);
        this.findAll(options).then(function (results) {
            if (results && results.length > 0) {
                data.list = results;
                if (results.length > pageSize) {
                    results.pop();
                    data.hasNext = true;
                }
            }
            callback(data);
        });
    };
}