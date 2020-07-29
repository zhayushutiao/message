const express = require('express');
const router = require('./route')
const app = express();

app.listen(4000);

// 设置模板引擎
app.set('view engine','ejs');

// post请求参数的解析方式
app.use(express.urlencoded({extended:true}));

// 根目录
app.use(express.static('./public'));


// 处理/请求
app.get('/',function(req,res){
    res.redirect('/mess');
})

// 处理所有以 /mess开头的请求
app.use('/mess',router.mess);

// 处理其他错误的请求地址
app.use(function(req,res){
    res.render('error',{errMsg:'地址错误'});
})