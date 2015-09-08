var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendfile('index.html');
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});

io.sockets.on('connection', function (socket){
	// hello, worldはクライアントが接続するとすぐに1度だけ送信されます
	socket.emit('message_from_server', 'hello, world');

	//　クライアントからmessage_from_clientがemitされた時
	socket.on('message_from_client', function (msg){
		console.log('message:', msg);
	});
});