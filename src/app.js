// express
var express = require('express')
var bodyParser = require('body-parser');
// 路径模块
var path = require('path');
// 文件模块
var fs=require('fs');
// ejs模版引擎
var EJS = require('ejs');

var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '10209',
//   database : 'meetTheBeauty'
// });


console.log('create pool');
var pool = mysql.createPool({
  host     : 'lion930.gotoftp5.com',
  user     : 'lion930',
  password : 'wl`13998528700',
  database : 'lion930'
});

// 首页模版
var devicesHtmlStr = fs.readFileSync(path.resolve(__dirname, 'ad/index.html'), {encoding: 'utf8'});

// 创建server
var APP = express()
.use(bodyParser.urlencoded({extended: false}))
.use(bodyParser.json())
.use('/res', express.static(path.resolve(__dirname, './ad/res')))
.use('/lib', express.static(path.resolve(__dirname, './ad/lib')))
.use('/js', express.static(path.resolve(__dirname, './ad/js')))

.get('/', function (req, res) {

    // 打开设备目录
    res.send(EJS.render(devicesHtmlStr, {}));

}).post('/info', function(req, res){

	var info = req.body;

	if(Date.now() > new Date('2017-03-04').getTime()){


		res.json({
			success: false,
			errorCode: 1 // 活动结束
		})


	}else{

		try{

			pool.getConnection(function (err, conn) {

				console.log('insert info:', info);

			    if (err) console.log("POOL ==> " + err);

			    conn.query('INSERT INTO meet_the_beauty_users (username, phone, sex, age)  values(\"' + info.username + '\", \"' + info.phone + '\", ' + info.sex + ', ' + info.age + ');', function (error, results, fields) {

					if (error) throw error;

			        conn.release();
					console.log('release connection');

					res.json({
						success: true
					})


				});

			});

		}catch (e) {

			console.log(e.message);
			console.log(e.description);
			console.log(e.number);
			console.log(e.name);

		}

	}

}).listen(9000, function () {

    console.log('listening on port 9000!');

})