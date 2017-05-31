/**
 * Created by Administrator on 2017/4/7.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('errorPoint', { title: '房毅贷' });
});

module.exports = router;
