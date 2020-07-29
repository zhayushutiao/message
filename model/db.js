const { Mess } = require('../model/model.js');


/**
 * @method 根据传递进来的条件查找数据库
 * @param {Object} match 匹配条件
 * @param {Function} cb 回调函数
 */
exports.findMess = function(match,cb){
    Mess.find(match,null,{sort:{username:1}},function(err,docs){
        cb(err,docs);
    })
}

/**
 * @method 把传递进来的数据添加到数据库
 * @param {Object} data 传递的数据
 * @param {Function} cb 回调函数
 */
exports.addMess = function(data,cb){
    var o = new Mess(data);
    o.save(function(err,doc){
        cb(err,doc);
    })
}


/**
 * @method 修改数据
 * @param {Object} match 修改的条件
 * @param {Object} data 修改的数据
 * @param {Function} cb 回调函数
 */
exports.editMess = function(match,data,cb){
    Mess.updateOne(match,{$set:data},function(err,raw){
        cb(err,raw);
    })
}

/**
 * @method 删除数据
 * @param {Object} match 删除的条件
 * @param {Function} cb 回调函数
 */
exports.deleteMess = function(match,cb){
    Mess.deleteOne(match,function(err){
        cb(err);
    })
}