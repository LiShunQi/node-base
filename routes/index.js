/**
 * Created by lsq on 2017/11/17.
 */
/**
 * 路由
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var formidable = require('formidable');//处理上传的文件

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
//form + iframe 上传文件(异步无刷新，可跨域)
router.post('/formUpload',function (req, res) {
   var form  = new formidable.IncomingForm();
    var param_name,param_file;
    form.uploadDir = './static/file'; //上传文件临时文件存放处

    form.on('fileBegin', function(name,file) {
        file.path = './static/file/' + file.name;
        param_name = name;
        param_file = file;
    });
    form.parse(req, function (err, fields, files) {
        res.type('text/plain');
        res.send({
            fields:fields,
            files:files,
            param_name: param_name,
            param_file: param_file
        });
    });
});
//ajax + formdata
router.post('/ajaxforformdata', function (req, res) {
   var form = new formidable.IncomingForm();
    var param_name,param_file = [];
    form.uploadDir = './static/file'; //上传文件临时文件存放处

   form.on('fileBegin', function (name, file) {
       file.path = path.join('./static/file/',file.name);
       var fileList = {};
       fileList.path = '/static/file/' + file.name;
       fileList.type = file.type;
       param_name = name;
       param_file.push(fileList);
   });

   form.parse(req, function (err, fields, files) {
       res.send({
           fields:fields,
           files:files,
           param_name: param_name,
           param_file: param_file
       })
   });
});
module.exports = router;