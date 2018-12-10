var express = require('express');
var router = express.Router();

var query = require('../mysql/sql.js');
/* GET users listing. */
router.get('/api/get/list', function(req, res, next) {
    var type = req.query.type, //数据类别
        page = req.query.page, //第几页数据
        page_size = req.query.page_size; //每页显示的条数

    var start = (page - 1) * page_size < 0 ? 0 : (page - 1) * page_size;

    //用于查询type类型为？ 从start截取到page_size;的位置
    var jc = `select * from bgx where type=? limit ${start},${page_size}`;
    //查询所有的type 类型为  ？ 的数据     返回一个数值个数
    var Count = `select count(*) from bgx where type=?`;

    //从后台返回的数据
    query(Count, [type], function(err, result) {
            if (err) {
                res.json({ code: 0, msg: error });
            } else {
                var total = Math.ceil(result[0]['count(*)'] / page_size); //会产生的页面数
                // res.json({ code: 1, msg: total });
                selectList(total);
            }
        })
        //查询分页数据
    function selectList(total) {
        query(jc, [type], function(err, result) {
            if (err) {
                res.json({ code: 0, msg: error });
            } else {
                res.json({ code: 1, msg: result, total: total });
            }
        })
    }
});

module.exports = router;