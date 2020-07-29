const express = require('express');
const router = express.Router();
const sd = require('silly-datetime');
const db = require('../model/db.js');
const {SUCCESS,FAILED} = require('../status.js');

// 处理 /mess请求
router.get('/',function(req,res){
    db.findMess({},function(err,messes){
        if(err){
            res.render('error',{errMsg:'获取信息失败'});
            return ;
        }
        res.render('index',{messes:messes});
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
    db.addMess(u,function(err){
        if(err){
            res.send({status:FAILED,msg:'添加数据失败'});
            return ;
        }
        res.redirect('/mess');
    })
})

// 处理 get方式的 /mess/edit 
router.get('/edit',function(req,res){
    res.render('edit');
})

// 处理post方式的 /mess/edit ,编辑数据提交
router.post('/edit',function(req,res){
    var username = req.body.username;
    var message = req.body.message; 
    var u = {
        username:username,
        message:message
    }
    db.editMess({username:username},u,function(err){
        if(err){
            res.send({status:FAILED,msg:'修改数据失败'});
            return ;
        }
        res.redirect('/mess');
    })
})

// 处理get方式的 /mess/delete ,删除数据
router.get('/delete',function(req,res){
    var username = req.query.username;
    db.deleteMess({username:username},function(err){
        if(err){
            res.send({status:FAILED,msg:'删除数据失败'});
            return ;
        }
        res.redirect('/mess');
    })
})
// 暴露路由
module.exports = router;