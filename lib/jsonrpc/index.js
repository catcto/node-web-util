const jsonrpc = require('./jsonrpc');
exports.ERROR = jsonrpc.ERROR;
module.exports.client = require('./client');
module.exports.server = require('./server');