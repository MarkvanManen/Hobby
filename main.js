var coins = 0;
var cursors = 0;
var cursorCost = Math.floor(10 * Math.pow(1.1,cursors));
var nextCost = Math.floor(10 * Math.pow(1.1,cursors));
var cursorUpgrades = 0;

var nextUpgradeCost = Math.floor(100 * Math.pow(2.5,cursorUpgrades));
var clickUpgrades = 0;
var clickUpgradeCost = Math.floor(150 * Math.pow(1.5,clickUpgrades));
var timer = Math.round(1000 - 100 * cursorUpgrades)
var coinsPerSecond = round((cursors * 1000 / timer), 2);

function coinClick(number){
	if(clickUpgrades >= 1){
	coins = coins + (number * (clickUpgrades * 2));
	} else {
	coins = coins + number
	};
	document.getElementById("coins").innerHTML = coins;
};

function periodicall() {
    coinClick(cursors);
    //if you change cursorUpgrades, your timer will change
    timer = Math.round(1000 - 100 * cursorUpgrades)
    console.log(timer);
    setTimeout(periodicall, timer);
};
periodicall();

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

function buyCursor(){
	var cursorCost = Math.floor(10 * Math.pow(1.1,cursors));
	if(coins >= cursorCost){
		coins = coins - cursorCost;
		cursors = cursors + 1;
		coinsPerSecond = round((cursors * 1000 / timer), 2);
		document.getElementById('cursors').innerHTML = cursors;
		document.getElementById('coins').innerHTML = coins;
		document.getElementById('coinsPerSecond').innerHTML = coinsPerSecond;
		console.log("1 cursor bought.")
	} else {
	console.log("not enough money");
	};
	var nextCost = Math.floor(10 * Math.pow(1.1,cursors));
	document.getElementById('cursorCost').innerHTML = nextCost;
};

function buyCursorUpgrade(){
	if(coins >= Math.floor(100 * Math.pow(2.5,cursorUpgrades)) && cursorUpgrades < 9){
		var cursorUpgradeCost = Math.floor(100 * Math.pow(2.5,cursorUpgrades));
		cursorUpgrades = cursorUpgrades + 1;
		coins = coins - cursorUpgradeCost;
		coinsPerSecond = round((cursors * 1000 / timer), 2);
		updatecps();
		document.getElementById('cursorUpgrades').innerHTML = cursorUpgrades;
		document.getElementById('coins').innerHTML = coins;
		console.log(cursors * 1000 / timer)
		document.getElementById('coinsPerSecond').innerHTML = coinsPerSecond;
		console.log("cursor upgrade bought.")
	} else if(cursorUpgrades == 9){
		document.getElementById('cursorUpgradeCost').innerHTML = "Maximum";
		console.log('maximum cursor upgrades')
	} else {
	console.log("not enough money or max");
	};
	var nextUpgradeCost = Math.floor(100 * Math.pow(2.5,cursorUpgrades));
	document.getElementById('cursorUpgradeCost').innerHTML = nextUpgradeCost;
	console.log("new cost updated.")
	console.log(cursors * 1000 / timer)
	updatecps();
};

function buyClickUpgrade(){
	if(coins >= Math.floor(150 * Math.pow(1.5,clickUpgrades))){
		coins = coins - Math.floor(150 * Math.pow(1.5,clickUpgrades));
		clickUpgrades = clickUpgrades + 1;
		document.getElementById('clickUpgrades').innerHTML = clickUpgrades;
		document.getElementById('coins').innerHTML = coins;
	} else {
	console.log("not enough money");
	};
	var nextClickUpgradeCost = Math.floor(150 * Math.pow(1.5,clickUpgrades));
	document.getElementById('clickUpgradeCost').innerHTML = nextClickUpgradeCost;
};

function save(){
	localStorage.setItem("coins",JSON.stringify(coins));
	localStorage.setItem("cursors",JSON.stringify(cursors));
	localStorage.setItem("clickUpgrades",JSON.stringify(clickUpgrades));
	localStorage.setItem("cursorUpgrades",JSON.stringify(cursorUpgrades));
	console.log('Saved.');
};

function load(){
	coins = JSON.parse(localStorage.getItem('coins'));
	cursors = JSON.parse(localStorage.getItem('cursors'));
	cursorCost = Math.floor(10 * Math.pow(1.1,cursors));
	cursorUpgrades = JSON.parse(localStorage.getItem('cursorUpgrades'));
	cursorUpgradeCost = Math.floor(100 * Math.pow(2.5,cursorUpgrades));
	clickUpgrades = JSON.parse(localStorage.getItem('clickUpgrades'));
	clickUpgradeCost = Math.floor(150 * Math.pow(1.5,clickUpgrades));
	document.getElementById('cursors').innerHTML = cursors;
	document.getElementById('coins').innerHTML = coins;
	document.getElementById('cursorCost').innerHTML = cursorCost;
	document.getElementById('cursorUpgrades').innerHTML = cursorUpgrades;
	document.getElementById('clickUpgrades').innerHTML = clickUpgrades;
	document.getElementById('clickUpgradeCost').innerHTML = clickUpgradeCost;
	if(cursorUpgrades == 9){
		document.getElementById('cursorUpgradeCost').innerHTML = "Maximum";
	} else {
	document.getElementById('cursorUpgradeCost').innerHTML = cursorUpgradeCost;
	};
	console.log('Loaded.');
};

function resetgame(){
	coins = 0;
	cursors = 0;
	cursorUpgrades = 0;
	cursorUpgradeCost = Math.floor(100 * Math.pow(2.5,cursorUpgrades));
	cursorCost = Math.floor(10 * Math.pow(1.1,cursors));
	clickUpgrades = 0;
	clickUpgradeCost = Math.floor(150 * Math.pow(1.5,cursorUpgrades));
	document.getElementById('cursors').innerHTML = cursors;
	document.getElementById('coins').innerHTML = coins;
	document.getElementById('cursorCost').innerHTML = cursorCost;
	document.getElementById('cursorUpgradeCost').innerHTML = cursorUpgradeCost;
	document.getElementById('cursorUpgrades').innerHTML = cursorUpgrades;
	document.getElementById('clickUpgrades').innerHTML = clickUpgrades;
	document.getElementById('clickUpgradeCost').innerHTML = clickUpgradeCost;
};

function updatecps(){
	console.log(round((cursors * 1000 / timer), 2))
	console.log(coinsPerSecond)
	document.getElementById('coinsPerSecond').innerHTML = round((cursors * 1000 / timer), 2);
}

/*
if (coins == 0 && cursors == 0) {
		coins = savegamecoins;
		cursors = savegamecursors;
		cursorCost = Math.floor(10 * Math.pow(1.1,cursors));
		document.getElementById('cursors').innerHTML = cursors;
		document.getElementById('coins').innerHTML = coins;
		document.getElementById('cursorCost').innerHTML = cursorCost;
};
*/

//cursorUpgradeCost en formule niet gelijk
//CPS wordt niet in function aangepast, pas later.

