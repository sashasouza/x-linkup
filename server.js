const express = require('express');
const mysql = require('mysql');

global.id;

//Create connection
const db = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: 'MyNewPass',
    database: 'x_linkup',
  });
  
  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('Connected...');
    });

const app = express();

app.get('/friendrequests', (req, res) => {
    let user = global.id;
    let sql = `SELECT u.UN, u.FN, u.LN, u.DP, s.Sname
    FROM Users u, Stream s, friend_request f
    WHERE u.Sid = s.Sid AND
    f.UN2 = '${user}' AND
    f.response = '0' AND
    f.UN1 = u.UN`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        const reqs = result;
        console.log(reqs);
        res.send(reqs);
    });
});

app.get('/search', (req, res) => {
  let id = global.id;
  let sql = `SELECT UN, FN, LN FROM Users WHERE (UN NOT IN (SELECT UN FROM Users WHERE UN=${id})) AND (active=1)`;
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.get('/response/:value/:Id',(req, res) => {
  let value = req.params.value;
  let id=global.id;
  let Id = req.params.Id;
  let sql = `UPDATE friend_request SET response='${value}' WHERE UN2='${id}'and UN1=${Id}`;
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Updated...');
  });
});

app.get('/responses/:value/:id',(req,res) => {
  let value = req.params.value;
  let id=global.id;
  let Id = req.params.id;
    sql = `INSERT INTO Friends(UN1,UN2) VALUES('${id}','${Id}')`;
    db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
    });
});

app.get('/responses1/:value/:id',(req,res) => {
  let value = req.params.value;
  let id=global.id;
  let Id = req.params.id;
    sql = `INSERT INTO Friends(UN1,UN2) VALUES('${Id}','${id}')`;
    db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
    });
});

app.get('/locate/:lat/:lon',(req,res) => {
  let id=global.id;
  let lat = req.params.lat;
  let lon = req.params.lon;
  let sql = `UPDATE Location SET lat='${lat}',lon=${lon} where UN='${id}'`;
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Found...');
    });
    sql = `SELECT UN,lat,lon FROM Location WHERE UN NOT IN (SELECT UN2 FROM Friends WHERE UN1='${id}') AND UN NOT IN (SELECT UN1 FROM Friends WHERE UN1='${id}')`;
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
    });
});

app.get('/users',(req,res)  => {
  let id=global.id;
  let sql = `SELECT * FROM Users,Location WHERE UN NOT IN (SELECT UN FROM Location WHERE UN NOT IN (SELECT UN2 FROM Friends WHERE UN1='${id}') AND UN NOT IN (SELECT UN1 FROM Friends WHERE UN1='${id}')) AND Location.lat='15.597896' AND Location.lon='73.807860'`;
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
    });
});



app.get('/message/:id',(req,res) => {
  let id=global.id;
  let Id=req.params.id;
  sql = `SELECT c.UN1,c.UN2,c.msg,c.dt,u.FN,u.LN FROM Conversations c,Users u WHERE (UN1='${id}' AND UN2='${Id}' AND c.UN1=u.UN) OR (UN1='${Id}' AND UN2='${id}' AND c.UN1=u.UN) ORDER BY dt ASC`;
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
    });
});

app.get('/messages/:id',(req,res) => {
  let id=global.id;
  let Id=req.params.id;
  sql = `SELECT DISTINCT c.UN2,c.UN1 FROM Conversations c WHERE (UN1='${id}' AND UN2='${Id}') OR ( c.UN2='${id}' AND UN1='${Id}');`;
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
    });
});

app.get('/sendmsg/:id/:msg',(req,res) => {
  let id =global.id;
  let Id = req.params.id;
  let msg = req.params.msg;
  let sql = `INSERT INTO CONVERSATIONS(UN1,UN2,msg,dt) VALUES('${id}','${Id}','${msg}',NOW())`;
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Inserted...');
    });
});

app.get('/messages',(req,res) => {
  let id=global.id;
  sql = `SELECT DISTINCT u.UN,u.FN,u.LN,u.DP FROM Conversations c,Users u WHERE (c.UN1='${id}' AND c.UN2=u.UN) OR (c.UN2='${id}' AND c.UN1=u.UN)`;
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
    });
});

app.get('/new',(req,res) => {
  let id=global.id;
  sql = `SELECT DISTINCT u.UN,u.FN,u.LN,u.DP FROM Users u, Friends f where (f.UN1='${id}' and u.UN=f.UN2) OR (f.UN2='${id}' AND u.UN=f.UN1)`;
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
    });
});

app.get('/new/:id',(req,res) => {
  let id=global.id;
  Id=req.params.id;
  sql = `SELECT UN2 FROM Friends WHERE UN2='${Id}' AND UN1='${id}'`;
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
    });
});

app.get('/details',(req,res) => {
  let id=global.id;
  let sql= `SELECT * FROM Users where UN='${id}'`;
  db.query(sql,(err,result) =>{
    if (err) throw err;
    const reqs=result;
    console.log(reqs);
    res.send(reqs);
  })
  });

  
app.get('/edit/:FN/:LN/:bio/:batch/:subj', function(req, res) {
  let FN= req.params.FN;
  let LN= req.params.LN;
  let bio= req.params.bio;
  let batch= req.params.batch;
  let subj= req.params.subj;
   let UN=global.id;
   let sql=`UPDATE Users SET FN = '${FN}' , LN= '${LN}', bio= '${bio}', year= '${batch}' , subj= '${subj}' WHERE UN = '${UN}'`;
   db.query(sql,(err,result) =>{
    if (err) throw err;
    const reqs=result;
    console.log(reqs);
    res.send(reqs);
  })
  });

  app.get('/getusers', function(req, res) {
    let UN=global.id;
  
  let sql=`SELECT * FROM Users WHERE UN='${UN}'`;
  db.query(sql,(err,result) =>{
    if (err) throw err;
    const reqs=result;
    console.log(reqs);
    res.send(reqs);
  });
  });

  app.get("/friends", (req, res) => {
    let UN = global.id;
    let sql = `SELECT u.UN,u.FN,u.LN,s.Sname FROM Friends f,Users u, Stream s WHERE f.UN1=${UN} AND f.UN2=u.UN and s.Sid=u.Sid`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      const reqs = result;
      console.log(reqs);
      res.send(reqs);
    });
  });
  
  app.get("/mainpage", (req, res) => {
    let sql = "SELECT * FROM Users";
    db.query(sql, (err, result) => {
      if (err) throw err;
      const reqs = result;
      console.log(reqs);
      res.send(reqs);
    });
  });

  app.get("/activated/:value", (req, res) => {
    let value = req.params.value;
    let sql = `UPDATE Users SET active=1 where UN='${value}'`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      const reqs = result;
      console.log(reqs);
      res.send(reqs);
    });
  });
  
  app.get("/logged/:value", (req, res) => {
    let value = req.params.value;
    global.id=value;
    let sql = `UPDATE Users SET logged=1 WHERE UN='${value}'`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      const reqs = result;
      console.log(reqs);
      res.send(reqs);
    });
  });

  app.get('/addp/:value',(req,res) => {
    let value=req.params.value;
    let id=global.id;
    let  aa=`INSERT INTO Posts(UN,type,P_dt,text) VALUES ('${id}',0,NOW(),'${value}')`;
    db.query(aa,(err,result) =>{
        if(err) throw err;
        const reqs=result;
       console.log(reqs);
        res.send(reqs);
    });
   });

   app.get('/commnts/:value',(req,res) => {
    let value=req.params.value;
    
    let qr=`SELECT c.*,r.UN,u.FN,u.LN FROM Comments c,react r,Users u WHERE c.lcid IN (SELECT lcid FROM react WHERE Pid='${value}') AND r.lcid=c.lcid AND u.UN=r.UN ORDER BY c.dt ASC`;
     db.query(qr,(err,result) =>{
        if(err) throw err;
        const reqs=result;
       console.log(reqs);
        res.send(reqs);
    });
});

app.get('/comments/:value',(req,res) => {
  let value=req.params.value;
  
  let id=global.id;
   
  let q=`INSERT INTO react(Pid,UN) VALUES ('${value}','${id}')`;
  db.query(q,(err,result) =>{
      if(err) throw err;
      const reqs=result;
     console.log(reqs);
      res.send(reqs);
  });
});

app.get('/commentss/:txt',(req,res) => {
let txt=req.params.txt;
let qry=`INSERT INTO Comments(lcid,c_text,dt) VALUES((SELECT lcid FROM react WHERE lcid=LAST_INSERT_ID()),'${txt}',NOW())`;
db.query(qry,(err,result) =>{
    if(err) throw err;
    const reqs=result;
   console.log(reqs);
    res.send(reqs);
});
});


app.get('/statuses', (req,res) =>{
  let id=global.id;
  let qry=`SELECT p.*,q.FN,q.LN, (SELECT COUNT(*) FROM Likes WHERE lcid IN (SELECT lcid FROM react WHERE Pid=p.Pid)) AS lk,(SELECT COUNT(*) FROM Comments WHERE lcid IN (SELECT lcid FROM react WHERE Pid=p.Pid)) AS cmt FROM Users q, Posts p WHERE p.UN in(SELECT UN FROM Users WHERE UN IN( SELECT UN2 FROM Friends WHERE UN1='${id}') OR UN='${id}') AND q.UN=p.UN AND q.active=1 ORDER BY P_dt DESC`;
   db.query(qry,(err,result) =>{
      if(err) throw err;
      const reqs=result;
     console.log(reqs);
      res.send(reqs);
  });
 });

app.get('/lk/:valu',(req,res) => {
  let val=req.params.valu;
  let id=global.id;
  let sql=`INSERT INTO react(Pid,UN) VALUES ((SELECT Pid FROM Posts WHERE Pid='${val}'),'${id}')`;
  db.query(sql,(err,result) =>{
      if(err) throw err;
      const reqs=result;
     console.log(reqs);
      res.send(reqs);
  });
 });

 app.get('/like',(req,res) => {
 let sq=`INSERT INTO Likes(lcid,lk_value) VALUES ((SELECT lcid FROM react WHERE lcid=LAST_INSERT_ID()),true)`;
  db.query(sq,(err,result) =>{
     if(err) throw err;
     const reqs=result;
     console.log(reqs);
      res.send(reqs);
 });
});

 app.get('/comm/:value',(req,res) => {
  let value=req.params.value;
  let id=global.id;
  let cm=`INSERT INTO react(Pid,UN) VALUES ('${value}','${id}')`;
  db.query(cm,(err,result) =>{
      if(err) throw err;
      const reqs=result;
     console.log(reqs);
      res.send(reqs);
  });
});

app.get('/posts', (req,res) =>{
  let id=global.id;
  let sql=`select p.*,q.FN,q.LN, (select COUNT(*) from Likes where lcid in (select lcid from react where 
Pid=p.Pid)) as lk,(select COUNT(*) from Comments where lcid in (select lcid from react where Pid=p.Pid)) 
as cmt from Users q, Posts p where p.UN in(select UN from Users where UN='${id}') AND q.UN=p.UN order by P_dt DESC`;
   db.query(sql,(err,result) =>{
      if(err) throw err;
      const reqs=result;
     console.log(reqs);
      res.send(reqs);
  });
 });

 app.get("/button", (req, res) => {
  let UN2 = "201606822";
  let sql = `SELECT uname FROM user where UN=${UN2}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    const reqs = result;
    console.log(reqs);
    res.send(reqs);
  });
});

app.get("/button1/:value", (req, res) => {
  let UN1 = global.id;
  let value = req.params.value;
  let sql2 = `INSERT INTO friend_request (UN1,UN2,req_dt,response) VALUES ('${UN1}',(SELECT UN FROM user where uname='${value}'),NOW(),'0')`;
  db.query(sql2, (err, result) => {
    if (err) throw err;
    const reqs = result;
    console.log(reqs);
    res.send(reqs);
  });
});

app.get("/logout", (req, res) => {
  let id = global.id;
  let sql = `UPDATE Users SET logged=0 WHERE UN='${id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    const reqs = result;
    console.log(reqs);
    res.send(reqs);
  });
});

app.get("/deactivate", (req, res) => {
  let id = global.id;
  let sql = `UPDATE Users SET active=0 WHERE UN='${id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    const reqs = result;
    console.log(reqs);
    res.send(reqs);
  });
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

 