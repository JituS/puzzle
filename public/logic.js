var tiles = [
	["","","",""],
	["","","",""],
	["","","",""],
	["","","",""]
]

var possibleNumbers = {
	0 : 2,
	1 : 4
}

var fill = function() {
	var currentTiles = document.querySelectorAll("input");
	var i = 0;
	tiles.forEach(function(tileRow){
		tileRow.forEach(function(tile){
			currentTiles[i].setAttribute("value", tile);
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

var canGo = function(x, y, direction){
	if(direction == "down")
		return ((x!=3) && (tiles[x+1][y]=="" || tiles[x+1][y]==tiles[x][y]))
	if(direction == "up")
		return ((x!=0) && (tiles[x-1][y]=="" || tiles[x-1][y]==tiles[x][y]))
	if(direction == "right")
		return ((y!=3) && (tiles[x][y+1]=="" || tiles[x][y+1]==tiles[x][y]))
	if(direction == "left")
		return ((y!=0) && (tiles[x][y-1]=="" || tiles[x][y-1]==tiles[x][y]))
}

var directions = {
	"down" : function(x, y){
		tiles[x+1][y] = (tiles[x+1][y]=="") ? tiles[x][y] : tiles[x+1][y]+tiles[x][y];
	},

	"up" : function(x, y){
		tiles[x-1][y] = (tiles[x-1][y]=="") ? tiles[x][y] : tiles[x-1][y]+tiles[x][y];
	},
	"right" : function(x, y){
		tiles[x][y+1] = (tiles[x][y+1]=="") ? tiles[x][y] : tiles[x][y+1]+tiles[x][y];
	},
	"left" : function(x, y){
		tiles[x][y-1] = (tiles[x][y-1]=="") ? tiles[x][y] : tiles[x][y-1]+tiles[x][y];
	}
}

var generateNumber = function(){
	var possition = getPossiotion();
	tiles[possition[0]][possition[1]] = possibleNumbers[Math.floor(Math.random() * 2)];
	fill();
}

var down = function() {
	for (var i = 0; i < tiles.length; i++) {
		for (var j = 0; j < tiles[i].length-1; j++) {
			if(canGo(j, i, "down")){
				directions.down(j, i, "down");
				tiles[j][i] = "";
			}
		}
	}
	generateNumber();
}

var up = function() {
	for (var i = tiles.length-1; i >= 0; i--) {
		for (var j = tiles.length-1; j >= 0; j--) {
			if(canGo(j, i, "up")){
				directions.up(j, i);
				tiles[j][i] = "";
			}
		}
	}
	generateNumber();
}


var right = function() {
	for (var i = 0; i < tiles.length; i++) {
		for (var j = 0; j < tiles[i].length-1; j++) {
			if(canGo(i, j, "right")){
				directions.right(i, j, "right");
				tiles[i][j] = "";
			}
		}
	}
	generateNumber();
}

var left = function() {
	for (var i = tiles.length-1; i >= 0; i--) {
		for (var j = tiles.length-1; j >= 0; j--) {
			if(canGo(i, j, "left")){
				directions.left(i, j, "left");
				tiles[i][j] = "";
			}
		}
	}
	generateNumber();
}

window.onload = initialize();



