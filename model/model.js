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
// 创建对应的model
var Mess = mongoose.model('mess',msgSchema);


module.exports = {
    Message:Mess
}