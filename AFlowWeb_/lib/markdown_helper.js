var marked = require('marked');
var Post = require('../models/post');
var rf = require("fs");

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
});

module.exports = {
    marked: function (content) {
        return marked(content);
    }
};

/*var data = rf.readFileSync("test.md", "utf-8");
rf.writeFile('./test.html', marked(data), {encoding: 'utf-8'}, function (err) {
    console.log("写完成!");
});*/



