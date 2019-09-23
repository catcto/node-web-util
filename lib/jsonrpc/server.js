const jsonrpc = require('./jsonrpc');

function server(method) {
    return function (req, res, next) {
        if (!jsonrpc.isMethod(req, 'POST')) {
            return error(405, { 'Allow': 'POST' });
        }
        if (!jsonrpc.isContentType(req, 'application/json')) {
            return error(415);
        }
        if (!req.body || typeof req.body !== 'object') {
            return next(new Error('Request body must be parsed'));
        }
        if (req.body.jsonrpc === jsonrpc.VERSION && typeof req.body.method === 'string') {
            if (typeof method === 'object' && typeof method[req.body.method] === 'function') {
                if (typeof req.body.params === 'object') {
                    switch (method[req.body.method].length) {
                        case 2:
                            method[req.body.method](req.body.params, function (err, result) {
                                res.json(jsonrpc.normalize(req.body, err, result));
                            });
                            break;
                        case 3:
                            method[req.body.method](req, req.body.params, function (err, result) {
                                res.json(jsonrpc.normalize(req.body, err, result));
                            });
                            break;
                        default:
                            break;
                    }
                } else {
                    res.json(jsonrpc.normalize(req.body, jsonrpc.ERROR.INVALID_PARAMS));
                }
            } else {
                res.json(jsonrpc.normalize(req.body, jsonrpc.ERROR.METHOD_NOT_FOUND));
            }
        } else {
            res.json(jsonrpc.normalize(req.body, jsonrpc.ERROR.INVALID_REQUEST));
        }
        function error(code, headers) {
            res.writeHead(code, headers || {});
            res.end();
        }
    };
};

module.exports = server;