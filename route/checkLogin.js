// 检查用户是否已经登录
const router = require('express').Router();

router.use(function(req,res,next){
    // 请求放行的条件:登陆了,登录的请求,注册的请求,检查用户名的请求
    var username = req.session.username;
    if(username||req.url=='/user/login'||req.url=='/user/regist'||req.url=='/user/check'){
        next();
    }else{
        // 未登录,也不是登录注册请求,回到登录页面
        res.render('login');
    }


    
    // 当发送的是登录或注册请求,放行
    /* if(req.url=='/user/login'||req.url=='/user/regist'){
        next();
        return ;
    } */
    // 获取session中的username
    /* var username = req.session.username;
    if(!username){
        // 未登录,跳转到登录页面
        res.redirect('login');
        return ;
    } */
    // 登录了,请求放行,交给后续的中间件处理请求
    // next();
})



module.exports = router;