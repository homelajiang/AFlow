module.exports = {
    user_invalid: function (req) {
        {"statusCode":404,"error":"Not Found","message":"Not Found"}
        return {
            statusCode: 404,
            msg: '用户不存在',
            request: req ? req.method.toUpperCase() + "  " + req.path : undefined
        }
    },
    user_existed: function (req) {
        return {
            statusCode: 403,
            msg: '用户已存在',
            request: req ? req.method.toUpperCase() + "  " + req.path : undefined
        }
    },
    username_password_mismatch: function (req) {
        return {
            statusCode: 401,
            msg: '用户名和密码不匹配',
            request: req ? req.method.toUpperCase() + "  " + req.path : undefined
        }
    },
    access_token_invalid: function (req) {
        return {
            statusCode: 401,
            msg: 'accessToken 认证失败',
            request: req ? req.method.toUpperCase() + "  " + req.path : undefined
        }
    },
    request_params_invalid: function (req) {
        return {
            statusCode: 400,
            msg: '请求参数错误',
            request: req ? req.method.toUpperCase() + "  " + req.path : undefined
        }
    },
    upload_file_invalid: function (req) {
        return {
            statusCode: 400,
            msg: '文件内容格式错误',
            request: req ? req.method.toUpperCase() + "  " + req.path : undefined
        }
    },
    unknown: function (req) {
        return {
            statusCode: 500,
            msg: '服务器错误',
            request: req ? req.method.toUpperCase() + "  " + req.path : undefined
        }
    }
};