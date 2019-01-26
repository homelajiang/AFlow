var express = require('express');
var router = express.Router();

router
    .get('/post')
    .get('/post:postId')
    .post('/post')
    .put('/post/:postId')
    .delete('/post/:postId')
;