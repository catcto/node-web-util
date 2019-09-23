// JSON-RPC 2.0 Specification
// https://www.jsonrpc.org/specification

const VERSION = exports.VERSION = '2.0';
exports.ERROR = {
    'PARSE_ERROR': {
        code: -32700,
        message: 'Parse Error.'
    },
    'INVALID_REQUEST': {
        code: -32600,
        message: 'Invalid Request.'
    },
    'METHOD_NOT_FOUND': {
        code: -32601,
        message: 'Method Not Found.'
    },
    'INVALID_PARAMS': {
        code: -32602,
        message: 'Invalid Params.'
    },
    'INTERNAL_ERROR': {
        code: -32603,
        message: 'Internal Error.'
    }
}

exports.normalize = function (body, error, result) {
    var obj = { "jsonrpc": VERSION };
    //obj.id = body.id || null;
    if (error) {
        obj.error = error;
    }
    if (result) {
        obj.result = result;
    }
    return obj;
}

exports.isMethod = function (request, method) {
    method = (method || '').toUpperCase();
    return (request.method || '') === method;
}

exports.isContentType = function (request, type) {
    request = request || { headers: {} };
    const contentType = request.headers['content-type'] || '';
    return RegExp(type, 'i').test(contentType);
}