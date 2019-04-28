const marked = require('marked');
const markdown = require('nunjucks-markdown');

module.exports = app => {

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pendantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
  });

  // The second argument can be any function that renders markdown
  markdown.register(app.nunjucks, marked);
};
