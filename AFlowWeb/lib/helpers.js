var Error = require('./error');
//http://expressjs.com/en/guide/error-handling.html
module.exports = {
    res: function (req, res, err, data) {
        if (err) {
            if (!err.code) {
                console.error('helper Error:\n'+err);
                err = Error.unknown(req);
            }

            res.status(err.code).json({msg:err.msg,request:err.request});
        } else {
            var reqMethod = req.method.toLowerCase();
            if (reqMethod == 'post') {
                res.status(201);
            } else if (reqMethod == 'put') {
                res.status(201);
            } else if (reqMethod == 'delete') {
                res.status(204);
            }
            data ? res.json(data) : res.json();
        }
    }
};