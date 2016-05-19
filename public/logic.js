var tiles = [
	["","","",""],
	["","","",""],
	["","","",""],
	["","","",""]
];

var score = 0;

var colors = {2:"#F3E5AB",4:"#FFDB58",8:"#F0DC82",16:"#FFD12A",32:"#E9D66B",64:"#F4C430",128:"#FFBF00",256:"#C2B280",512:"#DAA520",1024:"#B8860B",2048:"#918151"};

var possibleNumbers = {
	0 : 2,
	1 : 4
}

var showInUI = function() {
	var currentTiles = document.querySelectorAll("td");
	var i = 0;
	tiles.forEach(function(tileRow){
		tileRow.forEach(function(tile){
			currentTiles[i].innerHTML = tile;
			currentTiles[i].setAttribute("style", "background-color:"+colors[tile]);
			i++;
		});
	});
};

var getPossiotion = function() {
	while(true){
		var x = Math.floor(Math.random() * 4);
		var y = Math.floor(Math.random() * 4);
		if(tiles[x][y] == "") return [x, y];
		if(!hasSpace()) break;
	}
}

var initialize = function() {
	var x = Math.floor(Math.random() * 4);
	var y = Math.floor(Math.random() * 4);
	tiles[0][0] = 2;
	tiles[y][x] = possibleNumbers[Math.floor(Math.random() * 2)];
	showInUI();
};

var canGo = function(newX, newY, prevX, prevY, isNotOnExtreme){
	return isNotOnExtreme && (tiles[newX][newY]=="" || tiles[newX][newY]==tiles[prevX][prevY])
}

var goToNewLocation = function(newX, newY, prevX, prevY, isNotOnExtreme, go, token){
	if(canGo(newX, newY, prevX, prevY, isNotOnExtreme)){
		token.moved = true;
		go(newX, newY, prevX, prevY, isNotOnExtreme);
	}
}

var shiftFirstTile = function(newX, newY, prevX, prevY){
	score += (tiles[newX][newY]=="") ? 0 : +(+(tiles[newX][newY])+(+tiles[prevX][prevY]));
	tiles[newX][newY] = (tiles[newX][newY]=="") ? tiles[prevX][prevY] : tiles[newX][newY]+tiles[prevX][prevY];
	console.log(score, tiles[newX][newY])
	tiles[prevX][prevY] = "";
}

var directions = {
	"down" : function(newX, newY, prevX, prevY, isNotOnExtreme){
		shiftFirstTile(newX, newY, prevX, prevY);
		for(var i = prevX; i > 0; i--){
			tiles[i][prevY] = tiles[i-1][prevY];
			tiles[i-1][prevY] = "";
		}
	},
	"up" : function(newX, newY, prevX, prevY, isNotOnExtreme){
		shiftFirstTile(newX, newY, prevX, prevY);
		for(var i = prevX; i < tiles.length - 1; i++){
			tiles[i][prevY] = tiles[i+1][prevY];
			tiles[i+1][prevY] = "";
		}
	},
	"right" : function(newX, newY, prevX, prevY, isNotOnExtreme){
		shiftFirstTile(newX, newY, prevX, prevY);
		for(var i = prevY; i > 0; i--){
			tiles[prevX][i] = tiles[prevX][i-1];
			tiles[prevX][i-1] = "";
		}
	},
	"left" : function(newX, newY, prevX, prevY, isNotOnExtreme){
		shiftFirstTile(newX, newY, prevX, prevY);
		for(var i = prevY; i < tiles.length - 1; i++){
			tiles[prevX][i] = tiles[prevX][i+1];
			tiles[prevX][i+1] = "";
		}
	}
}

var showNewStatus = function(){
	var possition = getPossiotion();
	tiles[possition[0]][possition[1]] = possibleNumbers[Math.floor(Math.random() * 2)];
	showInUI();
}

var gameOver = function() {
	alert("game over");
	window.location.href = window.location.href;
}

var hasSpace = function(){
	for (var i = 0; i < tiles.length; i++) {
		for (var j = 0; j < tiles[i].length; j++) {
			if(tiles[i][j] == "") return true;
		}
	}
}

var down = function() {
	var token = {moved:false};
	for (var i = 0; i < tiles.length; i++) 
		for (var j = 0; j < tiles[i].length-1; j++) 
			goToNewLocation(j+1, i, j, i, j!=3, directions.down, token);
	if(!token.moved && !hasSpace()) gameOver();
}

var right = function() {
	var token = {moved:false};
	for (var i = 0; i < tiles.length; i++) 
		for (var j = 0; j < tiles[i].length-1; j++) 
			goToNewLocation(i, j + 1, i, j, j!=3, directions.right, token);
	if(!token.moved && !hasSpace()) gameOver();
}

var up = function() {
	var token = {moved:false};
	for (var i = tiles.length-1; i >= 0; i--) 
		for (var j = tiles.length-1; j >= 0; j--) 
			goToNewLocation(j-1, i, j, i, j!=0, directions.up, token);
	if(!token.moved && !hasSpace()) gameOver();
}


var left = function() {
	var token = {moved:false};
	for (var i = tiles.length-1; i >= 0; i--) 
		for (var j = tiles.length-1; j >= 0; j--) 
			goToNewLocation(i, j - 1, i, j, j!=0, directions.left, token);
	if(!token.moved && !hasSpace()) gameOver();
}

var updateScore = function(){
	document.querySelector("#score").innerHTML = "Score : " + score;
}

var move = function(e){
	if(e.keyCode == 38) up(), showNewStatus();	
	if(e.keyCode == 40) down(), showNewStatus();	
	if(e.keyCode == 39) right(), showNewStatus();
	if(e.keyCode == 37) left(), showNewStatus();	
	updateScore();
}

window.onload = initialize();




