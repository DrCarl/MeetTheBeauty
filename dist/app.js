var express=require("express"),bodyParser=require("body-parser"),path=require("path"),fs=require("fs"),EJS=require("ejs"),mysql=require("mysql");console.log("create pool");var pool=mysql.createPool({host:"lion930.gotoftp5.com",user:"lion930",password:"wl`13998528700",database:"lion930"}),devicesHtmlStr=fs.readFileSync(path.resolve(__dirname,"ad/index.html"),{encoding:"utf8"}),APP=express().use(bodyParser.urlencoded({extended:!1})).use(bodyParser.json()).use("/res",express["static"](path.resolve(__dirname,"./ad/res"))).use("/lib",express["static"](path.resolve(__dirname,"./ad/lib"))).use("/js",express["static"](path.resolve(__dirname,"./ad/js"))).get("/",function(e,s){s.send(EJS.render(devicesHtmlStr,{}))}).post("/info",function(e,s){var o=e.body;if(Date.now()>new Date("2017-03-04").getTime())s.json({success:!1,errorCode:1});else try{pool.getConnection(function(e,r){console.log("insert info:",o),e&&console.log("POOL ==> "+e),r.query('INSERT INTO meet_the_beauty_users (username, phone, sex, age)  values("'+o.username+'", "'+o.phone+'", '+o.sex+", "+o.age+");",function(e,o,n){if(e)throw e;r.release(),console.log("release connection"),s.json({success:!0})})})}catch(r){console.log(r.message),console.log(r.description),console.log(r.number),console.log(r.name)}}).listen(9e3,function(){console.log("listening on port 9000!")});