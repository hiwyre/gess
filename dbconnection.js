var MongoClient = require('mongodb').MongoClient;
var dburl="mongodb://localhost:27017/calavera";
var _connection =null;

var open=function(){
  MongoClient.connect(dburl,function(err,db){
    if(err){
      console.log("DBconnection failed");
      return;
    }
    _connection =db;
    console.log("DB connection open",db);
  });
  //set connection
};

var get = function(){
  return _connection;
};
module.exports={
  open:open,
  get:get
};
