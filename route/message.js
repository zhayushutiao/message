// 处理留言的路由
const express = require('express');
const router = express.Router();
const sd = require('silly-datetime');
const db = require('../model');
const Message = db.Message;

// 处理 /mess请求
router.get('/',function(req,res){
    // 查询数据库中的数据,传递给index页面解析
    db.find(Message,function(err,docs){
        if(err){
            console.log(err);
            res.render('error',{errMsg:'网络错误,稍后再试'});
            return ;
        }
        // 取到数据,传递给页面
        res.render('index',{msg:docs});
    })
})

// 处理 post方式的 /mess/tijiao ,添加数据
router.post('/tijiao',function(req,res){
    var username = req.body.username;
    var message = req.body.message;
    var time = sd.format(new Date(),'YYYY-MM-DD HH:mm:ss');
    var u = {
        username:username,
        message:message,
        date:time
    }
    db.add(Message,u,function(err){
        if(err){
            console.log(err);
            res.render('error',{errMsg:'提交留言失败'});
            return ;
        }
        // 提交成功,回到首页
        res.redirect('/');
    })
})

// 处理 get方式的 /mess/edit 
router.get('/edit',function(req,res){
    var username = req.query.username;
    db.find(Message,{username:username},function(err,docs){
        if(err){
            console.log(err);
            res.render('error',{errMsg:'网络错误,稍后再试'});
            return ;
        }
        res.render('edit',{msg:docs});
    })    
})

// 处理post方式的 /mess/edit ,编辑数据提交
router.post('/edit',function(req,res){
    var username = req.body.username;
    db.modify(Message,{username:username},req.body,function(err,result){
        if(err){
            console.log(err);
            res.render('error',{errMsg:'修改留言失败'});
            return ;
        }
        res.redirect('/');
    })
})

// 处理get方式的 /mess/delete ,删除数据
router.get('/delete',function(req,res){
    var username = req.query.username;
    db.del(Message,{username:username},function(err){
        if(err){
            console.log(err);
            res.render('error',{errMsg:'删除留言失败'});
            return ;
        }
        res.redirect('/');
    })
})
// 暴露路由
module.exports = router;