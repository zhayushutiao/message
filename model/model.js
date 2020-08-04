// 创建message1对应的model对象
const mongoose = require('mongoose');
// 创建messSchema
var msgSchema = new mongoose.Schema({
    username:String,
    message:String,
    date:String
},{
    collection:'message'//指定集合名称
})

const userSchema = new mongoose.Schema({
    username:String,
    nickname:String,
    password:String,
    avatar:{type:String,default:'/img/avatar.jpg'}
})
// 创建对应的model
var Mess = mongoose.model('mess',msgSchema);


module.exports = {
    Message:Mess,
    User:mongoose.model('user',userSchema)
}