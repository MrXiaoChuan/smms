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

router.all('*',(req,res,next)=>{
  res.header('Access-Control-Allow-Origin','http://localhost:8080');
  res.header("Access-Control-Allow-Credentials", "true");
  next();
})

// 添加用户的路由
router.post('/useradd',(req,res)=>{
  // res.header('Access-Control-Allow-Origin','*');
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

router.get('/getusers',(req,res)=>{
  // 构造sql语句
  let sqlStr = 'select * from userinfo order by userid DESC';
  // 执行sql语句
  conn.query(sqlStr,(err,result)=>{
    if(err){
      throw err;
    }else{
      // 返回查询到的数据给前端
      res.send(result);
    }
  })
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('路由通了');
});

router.get('/deluser',(req,res)=>{
  let userid = req.query.userid;
  let sqlStr = `delete from userinfo where userid = ${userid}`;
  conn.query(sqlStr,(err,result)=>{
    if(err){
      throw err;
    }else{
      if(result.affectedRows>0){
        res.send({"isOk":true,"code":1,"msg":'用户删除成功！'});
      }else{
        res.send({"isOk":false,"code":0,"msg":'用户删除失败！'});
      }
    }
  })
})

// 修改用户资料的路由
router.post('/usersave',(req,res)=>{
  let {username,usergroup,userid} = req.body;
  let sqlStr = "update userinfo set username=?,usergroup=?where userid=?";
  let sqlParams=[username,usergroup,userid];
  conn.query(sqlStr,sqlParams,(err,result)=>{
    if(err){
      throw err;
    }else{
      if(result.affectedRows>0){
        res.send({"isOk":true,"msg":"用户修改成功"});
      }else{
        res.send({"isOk":false,"msg":"用户修改成功"});
      }
    }
  })
})

// 登陆验证
router.post('/checklogin',(req,res)=>{
  let {username,userpwd} = req.body;
  let sqlStr = "select * from userinfo where username=? and userpwd=?";
  let sqlparams = [username,userpwd];
  conn.query(sqlStr,sqlparams,(err,result)=>{
    if(err){
      throw err;
    }else{
      if(result.length>0){
        res.cookie("userid",result[0].userid);
        res.cookie("username",username);
        res.send({"isOk":true,"msg":"登陆成功"});
      }else{
        res.send({"isOk":false,"msg":"登陆失败"});
      }
    }
  })
});

// 验证路由是否存在
router.get('/getcookie',(req,res)=>{
  let userid = req.cookies.userid;
  let username = req.cookies.username;
  if(userid && username){
    res.send({"isOk":true});
  }else{
    res.send({"isOk":false});
  }
});

// 清楚cookie的路由
router.get("/loginout",(req,res)=>{
  res.clearCookie("userid");
  res.clearCookie("username");
  // if(userid && username){
  //   res.send({"isOk":false});
  // }else{
  //   res.send({"isOk":true});
  // }
  res.send({"isOk":true});
});

module.exports = router;
