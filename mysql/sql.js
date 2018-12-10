/*
 * @Author: 楚凤沛 
 * @Date: 2018-12-10 15:23:23 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-10 15:36:34
 */
var pool = require('mysql').createPool({
    port: "3306",
    user: "root",
    password: "root",
    database: "again"
});
module.exports = function(sql, arr, ck) {
    var ck = ck ? ck : arr;
    pool.getConnection(function(err, con) {
        if (err) {
            return ck && ck(err);
        }
        con.query(sql, arr, function(err, result, filed) {
            if (err) {
                return ck && ck(err);
            }
            ck && ck(null, result, filed);
            con.release();
        })
    })
};