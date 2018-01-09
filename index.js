var express = require('express');
var app = express();
app.use(require('body-parser')());//处理表单上传数据
var routes = require('./routes/index');
var path = require('path');

app.set('port',process.env.Port || 3333);

//静态资源目录
app.use(express.static(__dirname + '/public'));
app.use('/static',express.static(path.join(__dirname + '/static'))); //文件上传存放位置

//路由
app.use('/',routes);
/**
 * app.use 是 Express 添加中间件的一种方法
 */
//404
app.use(function (req,res) {
   res.type('text/plain');
   res.status(404);
   res.send('404-NOT FOUND');
});
//500
app.use(function (err,req,res,next) {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500-SERVER ERROR');
});
app.listen(app.get('port'),function () {
   console.log('Express started on http://localhost:' + app.get('port') + ";press Ctrl-C to terminal.");
});