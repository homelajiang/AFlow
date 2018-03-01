var should = require('should');
var seneca = require('seneca')()
    .use(require('../file.js'));

var fileId1;

describe('文件操作测试', function () {
    it('添加文件测试', function (done) {
        seneca.act({
            role: "file", cmd: "add",
            name: 'name1',
            path: '/fhdjs/name',
            mimetype: 'image/jpg',
            size: 10000
        }, function (err, entity) {
            if (err)
                return done(err);
            entity.should.be.an.property("id");
            fileId1 = entity.id;
            done();
        });
    });

    it('文件列表查询', function (done) {
        seneca.act({
            role: "file", cmd: "list"
        }, function (err, entities) {
            if (err)
                return done(err);
            entities.should.be.a.Array();
            done();
        });
    });

    it('文件信息查询', function (done) {
        seneca.act({
            role: "file", cmd: "query", id: fileId1
        }, function (err, entity) {
            if (err)
                return done(err);
            entity.should.be.an.property("id");
            done();
        })
    });

    it("文件删除操作", function (done) {
        seneca.act({
            role: "file", cmd: "remove", id: fileId1
        }, function (err, entity) {
            if (err)
                return done(err);
            entity.should.be.an.property("name");
            done();
        })
    });
});
