var tiles = [
	["","","",""],
	["","","",""],
	["","","",""],
	["","","",""]
]

var colors = {2:"#F3E5AB",4:"#FFDB58",8:"#F0DC82",16:"#FFD12A",32:"#E9D66B",64:"#F4C430",128:"#FFBF00",256:"#C2B280",512:"#DAA520",1024:"#B8860B",2048:"#918151"};

var possibleNumbers = {
	0 : 2,
	1 : 4
}

var fill = function() {
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
	}
}

var initialize = function() {
	var x = Math.floor(Math.random() * 4);
	var y = Math.floor(Math.random() * 4);
	tiles[0][0] = 2;
	tiles[y][x] = possibleNumbers[Math.floor(Math.random() * 2)];
	fill();
};

var canGoToThis = function(x, y, direction){
	if(direction == "down")
		return ((x!=3) && (tiles[x+1][y]=="" || tiles[x+1][y]==tiles[x][y]));
	if(direction == "up")
		return ((x!=0) && (tiles[x-1][y]=="" || tiles[x-1][y]==tiles[x][y]));
	if(direction == "right")
		return ((y!=3) && (tiles[x][y+1]=="" || tiles[x][y+1]==tiles[x][y]));
	if(direction == "left")
		return ((y!=0) && (tiles[x][y-1]=="" || tiles[x][y-1]==tiles[x][y]));
}

var directions = {
	"down" : function(x, y){
		if(canGoToThis(x , y, "down")){
			tiles[x+1][y] = (tiles[x+1][y]=="") ? tiles[x][y] : tiles[x+1][y]+tiles[x][y];
			tiles[x][y] = "";
			for(var i = x; i > 0; i--){
				tiles[i][y] = tiles[i-1][y];
				tiles[i-1][y] = "";
			}
		}
	},
	"up" : function(x, y){
		if(canGoToThis(x, y, "up")){
			tiles[x-1][y] = (tiles[x-1][y]=="") ? tiles[x][y] : tiles[x-1][y]+tiles[x][y];
			tiles[x][y] = "";
			for(var i = x; i < tiles.length - 1; i++){
				tiles[i][y] = tiles[i+1][y];
				tiles[i+1][y] = "";
			}
		}

	},
	"right" : function(x, y){
		if(canGoToThis(x, y, "right")){
			tiles[x][y+1] = (tiles[x][y+1]=="") ? tiles[x][y] : tiles[x][y+1]+tiles[x][y];
			tiles[x][y] = "";
			for(var i = y; i > 0; i--){
				tiles[x][i] = tiles[x][i-1];
				tiles[x][i-1] = "";
			}
		}
	},
	"left" : function(x, y){
		if(canGoToThis(x, y, "left")){
			tiles[x][y-1] = (tiles[x][y-1]=="") ? tiles[x][y] : tiles[x][y-1]+tiles[x][y];
			tiles[x][y] = "";
			for(var i = y; i < tiles.length - 1; i++){
				tiles[x][i] = tiles[x][i+1];
				tiles[x][i+1] = "";
			}
		}
	}
}

var showNewStatus = function(){
	var possition = getPossiotion();
	tiles[possition[0]][possition[1]] = possibleNumbers[Math.floor(Math.random() * 2)];
	fill();
}

var down = function() {
	for (var i = 0; i < tiles.length; i++) {
		for (var j = 0; j < tiles[i].length-1; j++) {
			directions.down(j, i);
		}
	}
	showNewStatus();
}

var up = function(e) {
	for (var i = tiles.length-1; i >= 0; i--) {
		for (var j = tiles.length-1; j >= 0; j--) {
			directions.up(j, i);
		}
	}
	showNewStatus();
}


var right = function() {
	for (var i = 0; i < tiles.length; i++) {
		for (var j = 0; j < tiles[i].length-1; j++) {
			directions.right(i, j);
		}
	}
	showNewStatus();
}

var left = function() {
	for (var i = tiles.length-1; i >= 0; i--) {
		for (var j = tiles.length-1; j >= 0; j--) {
			directions.left(i, j);
		}
	}
	showNewStatus();
}

var move = function(e){
	if(e.keyCode == 38) up();	
	if(e.keyCode == 40) down();	
	if(e.keyCode == 39) right();	
	if(e.keyCode == 37) left();	
}

var isDead = function() {

}

window.onload = initialize();



