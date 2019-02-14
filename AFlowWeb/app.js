const marked = require('marked');
const markdown = require('nunjucks-markdown');

module.exports = app => {
    markdown.register(app.nunjucks, marked);
};
