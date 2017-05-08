/**
 * Created by onlyhom on 2017/5/7.
 */


var express = require('express');//加载express模块
var swig = require('swig'); //加载模板处理模块

var app = express(); //创建app应用 => NodeJS Http.createServer();

//设置静态文件托管
//当用户访问的url以/public开始 那么直接返回对应__dirname + '/public'下的文件
app.use('/public', express.static(__dirname + '/public'));



//配置应用模板
//参数1 模板引擎名称&模板文件后缀名
//参数2 用于解析模板内容的方法
app.engine('html', swig.renderFile); // 定义当前应用所使用的模板引擎
app.set('views','./views');//设置存放目录
app.set('view engine','html'); //设置需要使用的模板引擎

//为了开发方便 暂时取消模板缓存
swig.setDefaults({cache:false});


// 首页
app.get('/',function (req, res, next) { //request response next:函数
    //res.send('<h1>hello my blog<h1/>');
    res.render('index'); //参数1 模板文件名 相对于views的目录  参数2：传递给模板使用的数据

});



//监听http请求
app.listen(8081);
