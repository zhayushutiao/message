const express = require('express');
const session = require('express-session');
const router = require('./route')
const app = express();

app.listen(4000);

// 设置模板引擎
app.set('view engine','ejs');

app.use(session({
    secret:'aaaa',
    resave:false,
    saveUninitialized:true
}))

// post请求参数的解析方式
app.use(express.urlencoded({extended:true}));

// 根目录
app.use(express.static('./public'));
app.use(express.static('./temp'));
app.use(express.static('./avatars'));


// 处理/请求
app.get('/',function(req,res){
    res.redirect('/mess?page=1');
})

// 验证是否已经登录
app.use(router.checkIsLogin);

// 处理所有以 /mess开头的请求
app.use('/mess',router.mess);

// 处理/user开头的请求地址
app.use('/user',router.user);

// 处理其他错误的请求地址
app.use(function(req,res){
    res.render('error',{errMsg:'地址错误'});
})

/* 
不需要登录验证的请求:
    登录请求,
    注册请求
*/