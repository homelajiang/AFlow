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
            role: 'blog',
            cmd: 'post_list',
            pageSize: size,
            pageNum: page
        });
    }

    //获取评论列表
    async getComments(postId, page, size) {
        return await act({
            role: 'blog',
            cmd: 'comment_list',
            id: postId,
            pageSize: size,
            pageNum: page
        });
    }

    // 获取博客详情
    async getPost(id) {
        //获取博客详情
        return await act({
            role: 'blog',
            cmd: 'post_info',
            id: id
        });
    }

    //获取上一篇和下一篇
    async getAroundPost(id) {
        return await act({
            role: 'blog',
            cmd: 'post_around',
            id: id
        });
    }


    //校验博客密码
    async checkPostPassword(id, password) {

    }

    // 获取tag列表
    async getTags() {

        const tags = await act({
            role: 'blog',
            cmd: 'tags'
        });

        const categories = await act({
            role: 'blog',
            cmd: 'categories'
        });
        return {
            categories: categories,
            tags: tags
        };
    }

    // 获取归档列表
    async getArchives() {
        return await act({
            role: 'blog',
            cmd: 'archives'
        });
    }

    // 检索搜索结果（keyword、tag、categories）
    async search(type, keyword) {
        return await act({
            role: 'blog',
            cmd: 'search',
            type: type,
            keyword: keyword
        });
    }
}

module.exports = BlogService;
