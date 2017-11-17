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
//test Ajax\
router.post('/testAjax',function (req,res) {
    console.log(req.body);
    if(req.body.name == 'lsq'){
        res.send({
            code:100,
            msg:'success'
        })
    }else{
        res.send({
            code:101,
            msg:'error'
        })
    }
});

module.exports = router;