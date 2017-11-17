/**
 * Created by lsq on 2017/11/17.
 */
/**
 * 路由
 */
var express = require('express');
var router = express.Router();
var formidable = require('formidable');//处理上传的文件

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
//test form submit
router.post('/testSubmit',function (req,res) {
   res.send({
       code:100,
       data:req.body,
       msg:'success'
   })
});
//file upload
router.post('/uploadFile',function (req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
        if(err) return res.redirect(303, '/error');
        console.log('received fields:');
        console.log(fields);
        console.log('received files:');
        console.log(files);
        res.send({
            code:100,
            msg:'success'
        })
        // res.redirect(303, '/thank-you');
    });
});
module.exports = router;