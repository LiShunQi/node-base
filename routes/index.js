/**
 * Created by lsq on 2017/11/17.
 */
/**
 * 路由
 */
var express = require('express');
var router = express.Router();

//首页
router.get('/', function(req, res){
    res.type('text/plain');
    res.send('Index home');
});

module.exports = router;