var express = require('express');
var router = express.Router();


// 引入mysql
const mysql = require('mysql');
const conn = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'root',
  database:'hlsmms',
});
conn.connect((err)=>{
  if(err){
    console.log("错误数据库链接失败");
  }else{
    console.log('数据库链接成功');
  }
})

// 添加用户的路由
router.post('/useradd',(req,res)=>{
  res.header('Access-Control-Allow-Origin','*');
  let {username,pass,usergroup} = req.body;
  // 构造sql语句
  let sqlStr = 'insert into userinfo(username,userpwd,usergroup) value(?,?,?)'
  let pramas = [username,pass,usergroup];
  conn.query(sqlStr,pramas,(err,result)=>{
    if(err){
      throw err;
    }else{
      if(result.affectedRows>0){
        res.json({"isOk":true,"code":1,"msg":'用户添加成功！'});
      }else{
        res.json({"isOk":false,"code":-1,"msg":'用户添加失败！'});
      }
    }

  })
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('路由通了');
});

module.exports = router;
