// var http = require("http");
// var fs = require("fs");
// var handlers = function(req, res){
// 	res.writeHeader(200, {"Content-Type": "text/html"}); 
// 	if(req.url == "/"){
// 		req.url = "/index.html";
// 	}
// 	if(fs.existsSync("./public"+req.url)){
// 		var file = fs.readFileSync("./public"+req.url);
// 		res.end(file);
// 	}else{
// 		res.end();
// 	}
// }
var express = require('express');
var http = require('http');
var app = express();
app.use(express.static('public/.'));
app.get('/', function(req, res){
	res.redirect('index.html');
});
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
console.log("Starting Server at port:", port);

http.createServer(app).listen(port, ip);
