const JWT = require('jsonwebtoken');  // used to sign our content
const jwtSecret = 'NeverShareYourSecret'; // Never Share This! even in private GitHub repos!

module.exports = {
    //生成分页格式
    generatePageModel: function (pageSize, pageNum, count, list) {
        return {
            pageSize: pageSize,
            pageNum: pageNum,
            count: count,
            list: list
        };
    },
    //生成token
    // todo 自动续期
    generateJWT: function (id, username, role) {
        return JWT.sign({
            id: id,
            username: username,
            role: role
        }, jwtSecret);
    }
};

