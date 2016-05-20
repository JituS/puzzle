var http = require("http");
var fs = require("fs");
var handlers = function(req, res){
	res.writeHeader(200, {"Content-Type": "text/html"}); 
	if(req.url == "/"){
		req.url = "/index.html";
	}
	if(fs.existsSync("./public"+req.url)){
		var file = fs.readFileSync("./public"+req.url);
		res.end(file);
	}else{
		res.end();
	}
}
http.createServer(handlers).listen(process.env.OPENSHIFT_NODEJS_PORT || 3000, process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");
