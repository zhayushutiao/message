const mongoose = require('mongoose');
// 创建messSchema
var messSchema = new mongoose.Schema({
    username:String,
    message:String,
    date:String
})
// 创建对应的model
var Mess = mongoose.model('mess',messSchema);

// 连接数据库
const url = 'mongodb://localhost:27017/web';
const opt = {
    useNewUrlParser:true,
    useUnifiedTopology:true
};
mongoose.connect(url,opt);

module.exports = {
    Mess:Mess
}