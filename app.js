var express=require('express');
var bodyParser = require('body-parser')
var app=express();
var path=require('path');
app.use(bodyParser());
 global.mongoose = require('mongoose');
var db=mongoose.connection;
db.on('error',console.error);
var Login;
db.once('open',function(){
   // console.log('connection made');
    var login=new mongoose.Schema({
        name: { type:String 
               ,require:true 
               ,trim:true, 
              },
        password:{ type:String
                  ,require:true 
                  ,trim:true
                 },
        role:{
    type:String,
    require:true,
    trim:true
    }
    });
    Login=mongoose.model('loginuser',login);
});
mongoose.connect('mongodb://localhost/mongoseed,',function(err,db){
  if(err)
      console.log('error in connection'||err)
      else
      {
          console.log('connection made by himanshu');
      return db;
      }
      });

//app.use(express.static(__dirname+'/views'));
app.post('/hello',function(req,res){
   var name=req.body.name;
    var password=req.body.password;
    var role=req.body.role;
    console.log(name);
    var loginuser=new Login({
        name:name,
        password:password,
        role:role});
    console.log('schema object created');
    loginuser.save(function(err,data){
       if(err)
       {
           console.log(err);
           res.send("error in saveing"+err);
       }   else
             res.send('data is saved '+data);
    });
    //res.send('hello world! using post method'+name+password+role);
});
app.get('/hello',function(req,res){
    console.log('in get method');
    Login.find(function(err,data){
       if(err)
           res.send(err)
           else
           {
               res.send(data);
           }
           });
});
app.delete('/hello',function(req,res){
    console.log('in delete method');
    var name=req.body.name;
    console.log(name);
    Login.findOneAndRemove({ name:name},function(err){
        if(err)
            res.send('error in deleteing'+err);
        else
            res.send('data delete successfully');
    });  
});
app.put('/hello',function(req,res){
console.log('in put method');
    var name=req.body.name;
    var role=req.body.role;
    var password=req.body.password;
    console.log(name);
    Login.updateOne({name:name},{$set: {role:role,password:password}},function(err,data){
      if(err)
          res.send('error in updateing'+err);
        else
            res.send('data updated successfully'+data);
    });
});
app.get('/login',function(req,res){    
  res.sendFile(path.join(__dirname+'/views/index.html'));
});
var server=app.listen(3000,function(){
    var host=server.address().address;
    var port=server.address().port;
    console.log('nodejs by himanshu goyal%d %d',host,port);
});