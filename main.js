var coins = 0;
var cursors = 0;
//var cursorCost = Math.floor(10 * Math.pow(1.1,cursors));
var nextCost = Math.floor(10 * Math.pow(1.1,cursors));
var cursorUpgrades = 0;
//var cursorUpgradeCost = Math.floor(100 * Math.pow(2.5,cursorUpgrades));
var nextUpgradeCost = Math.floor(100 * Math.pow(2.5,cursorUpgrades));
var clickUpgrades = 0;
var clickUpgradeCost = Math.floor(150 * Math.pow(1.5,clickUpgrades));
var timer = Math.round(1000 - 100 * cursorUpgrades)
var coinsPerSecond = round((cursors * 1000 / timer), 2);

//Elke muisklik op de knop geeft 1 coins, met de click upgrade wordt dit aantal verdubbeld.
function coinClick(number){
	if(clickUpgrades >= 1){
	coins = coins + (number * (clickUpgrades * 2));
	} else {
	coins = coins + number
	};
	document.getElementById("coins").innerHTML = coins;
};

//Elke cursor geeft 1 coin per seconde (1000 millieseconde), elke cursor upgrade haalt hier 100 millieseconde vanaf waardoor de cursors dus 'sneller' werken.
function periodicall() {
    coinClick(cursors);
    timer = Math.round(1000 - 100 * cursorUpgrades)
    console.log(timer);
    setTimeout(periodicall, timer);
};
periodicall();

//kleine functie om getallen netjes af te ronden, verder niet belangrijk.
function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

//Er wordt gekeken of het aantal coins dat je hebt groter dan of gelijk aan de prijs van een cursor is. Is dit het geval dan update je aantal coins, 
//aantal cursors en het aantal Coins per seconde.
function buyCursor(){
	var cursorCost = Math.floor(10 * Math.pow(1.1,cursors));
	if(coins >= cursorCost){
		coins = coins - cursorCost;
		cursors = cursors + 1;
		coinsPerSecond = round((cursors * 1000 / timer), 2);
		document.getElementById('cursors').innerHTML = cursors;
		document.getElementById('coins').innerHTML = coins;
		//hier wordt coinsPerSecond dus in HTML ge-update, en dit zie je direct terug. Later in de code doe ik exact hetzelfde maar werkt het niet.
		document.getElementById('coinsPerSecond').innerHTML = coinsPerSecond;
		console.log("1 cursor bought.")
	} else {
	console.log("not enough money");
	};
	var nextCost = Math.floor(10 * Math.pow(1.1,cursors));
	document.getElementById('cursorCost').innerHTML = nextCost;
};

//Hier zit mijn probleem!
//Het werkt hetzelfde als bij de functie voor het kopen van een cursor, en deze functie werkt verder ook goed, behalve het aantal coinsPerSecond.
function buyCursorUpgrade(){
	var cursorUpgradeCost = Math.floor(100 * Math.pow(2.5,cursorUpgrades));
	//9 is het maximale aantal upgrades dat er gekocht mag worden.
	if(coins >= cursorUpgradeCost && cursorUpgrades < 9){
		cursorUpgrades = cursorUpgrades + 1;
		coins = coins - Math.floor(100 * Math.pow(2.5,cursorUpgrades));
		//Hier doe ik dus hetzelfde als op regel 45 en 49, alleen werkt het daar wel maar hier niet.
		coinsPerSecond = round((cursors * 1000 / timer), 2);
		document.getElementById('coinsPerSecond').innerHTML = coinsPerSecond;
		document.getElementById('cursorUpgrades').innerHTML = cursorUpgrades;
		document.getElementById('coins').innerHTML = coins;
		//Ik print de formule van CPS en ook de variabele zelf, maar beiden geven nooit het juiste getal.
		//Wat bedoel ik met het juiste getal:
		//Stel ik koop 5 cursors, dan krijg ik elke seconde 5 coins, oftewel coinsPerSecond = 5. Dit werkt allemaal prima.
		//Vervolgens koop ik een cursorUpgrade, nu krijg ik dus 5 coins per 900 millieseconde, omgerekend is dit 5.56 coinsPerSecond.
		//Na het kopen van deze upgrade krijg ik ook daadwerkelijk 5 coins per 900 millieseconde, ik zie dat het sneller gaat hoe meer upgrades ik koop.
		//Echter verandert het aantal coinsPerSecond niet, niet op het scherm en niet in de console. Het update pas als ik een nieuwe cursor koop of als ik de 
		//functie updatecps() gebruik. Dit is vreemd want updatecps() bevat exact dezelfde code die ik hier uitvoer, en hier verwijs ik zelf nog naar updatecps()
		console.log (round((cursors * 1000 / timer), 2);
		console.log(coinsPerSecond);
		console.log("cursor upgrade bought.");
	} else if(cursorUpgrades == 9){
		document.getElementById('cursorUpgradeCost').innerHTML = "Maximum";
		console.log('maximum cursor upgrades')
	} else {
	console.log("not enough money or max");
	};
	var nextUpgradeCost = Math.floor(100 * Math.pow(2.5,cursorUpgrades));
	document.getElementById('cursorUpgradeCost').innerHTML = nextUpgradeCost;
	console.log("new cost updated.")
	//Hier print ik het nog een keer maar ook hier geeft het de verkeerde value.
	console.log(cursors * 1000 / timer)
	//Deze functie kan ook naar verwijzen worden met een knop op de html pagina, als ik de knop gebruik laat hij wel de goede waarde zien, maar als ik
	//hier naar dezelfde functie verwijs al de knop werkt het niet en blijft hij de verkeerde value geven.
	updatecps();
};

//Spreekt voor zich, irrelevant.
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

//irrelevant
function save(){
	localStorage.setItem("coins",JSON.stringify(coins));
	localStorage.setItem("cursors",JSON.stringify(cursors));
	localStorage.setItem("clickUpgrades",JSON.stringify(clickUpgrades));
	localStorage.setItem("cursorUpgrades",JSON.stringify(cursorUpgrades));
	console.log('Saved.');
};

//irrelevant
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

//irrelevant
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

//Dit is de functie waar ik het eerder over had. Als ik in de html pagina op de knop "Buy cursor upgrade" klik werkt alles behalve het aantal CPS dat niet aanpast.
//Als ik op de knop "update CPS" druk dan laat hij opeens wel de juiste CPS waarde zien, terwijl de code in de functie hieronder exact hetzelfde bevat als in
//de functie buyCursorUpgrade, sterker nog in buyCursorUpgrade verwijs ik zelf naar de functie updatecps en alsnog werkt het niet.
function updatecps(){
	console.log(round((cursors * 1000 / timer), 2))
	console.log(coinsPerSecond)
	document.getElementById('coinsPerSecond').innerHTML = round((cursors * 1000 / timer), 2);
}


