const Service = require('egg').Service;
const Promise = require('bluebird');

const seneca = require('seneca')()
    .use('basic')
    .use('entity')
    .client(5202);

const act = Promise.promisify(seneca.act, {context: seneca});

class BlogService extends Service {
    // 获取首页博客列表
    async getPosts(page, size) {
        return await act({
            role: 'post',
            cmd: 'list',
            pageSize: size,
            pageNum: page
        });
    }

    // 获取博客详情
    async getPost(id) {
        return await act({
            role: 'post',
            cmd: 'query',
            id: id
        });

    }

    //校验博客密码
    async checkPostPassword(id, password) {

    }

    // 获取tag列表
    async getTags() {

        const tagPage = await act({
            role: 'tag',
            cmd: 'list',
            pageSize: '1000',
            pageNum: '1'
        });

        const categoriesPage = await act({
            role: 'categories',
            cmd: 'list',
            pageSize: '1000',
            pageNum: '1'
        });
        return {
            categories: categoriesPage.list,
            tags: tagPage.list
        };
    }

    // 获取归档列表
    async getArchives() {
        return await act({
            role: 'post',
            cmd: 'archive'
        });
    }

    // 检索搜索结果（keyword、tag、categories）
    async search(keyword, tag, categories) {

    }
}

module.exports = BlogService;
