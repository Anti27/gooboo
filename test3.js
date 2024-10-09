var store = document.getElementById("app").__vue__.$store
var ritualNr = store.state.system.rng.nightHunt_ritual
var names = ["power", "rage", "calming", "sorrow", "energy", "hysteria", "insanity", "transformation"]
var ingres = [[ "lavender" ], [ "charredSkull", "mapleLeaf" ], [ "fourLeafClover", "mapleLeaf" ], [ "charredSkull", "charredSkull" ], [ "mapleLeaf", "mapleLeaf" ], [ "mysticalWater", "fourLeafClover", "mysticalWater" ], [ "mysticalWater", "lavender", "fourLeafClover" ], [ "cheese", "cheese", "mapleLeaf" ]]
store.state.nightHunt.ritualIngredients = [ "charredSkull" ]
store.state.currency.event_charredSkull.value = 1000000000000

function gg(){
	growTheThing(20)
}

async function growTheThing(loop){
	let result = await freegg()
	if (result === "") {
		result = await costgg()
	}
	ritualNr ++
	console.log(result)
	if (loop < 0){
		return;
	}
	loop --
	growTheThing(loop)
}

async function costgg(){
	let useNummer = ritualNr
	store.state.nightHunt.bonusIngredients = []
	let resultString = useNummer + " "

	for (let i = 0; names.length > i ; i++){
		setValuesForCurrency()
		store.state.system.rng.nightHunt_ritual = useNummer
		let levelOfCurrent = store.state.nightHunt.potion[names[i]].level
		store.state.nightHunt.ritualIngredients = ingres[i]
		await new Promise(r => setTimeout(r, 1));
		document.getElementsByClassName("ma-1 v-btn v-btn--is-elevated v-btn--has-bg")[0].click()
		if (levelOfCurrent != store.state.nightHunt.potion[names[i]].level)	{
			resultString += names[i] + ", "
		}
		store.state.nightHunt.potion[names[i]].level = levelOfCurrent
	}
	
	store.state.system.rng.nightHunt_ritual = useNummer
	let currToken = store.state.currency.event_nightHuntToken.value
	store.state.nightHunt.ritualIngredients = [ "cheese", "cheese", "cheese" ]
	store.state.nightHunt.performedRituals = store.state.nightHunt.performedRituals.filter(item => item !== "cheese,cheese,cheese");
	await new Promise(r => setTimeout(r, 1));
	document.getElementsByClassName("ma-1 v-btn v-btn--is-elevated v-btn--has-bg")[0].click()
	if (currToken != store.state.currency.event_nightHuntToken.value) {
		resultString += " Random 3 Long"
	}
	store.state.system.rng.nightHunt_ritual = useNummer
	return resultString
}

async function freegg(){
	let found = false
	let useNummer = ritualNr
	store.state.nightHunt.bonusIngredients = [{"name":"charredSkull","amount":4}]
	let resultString = useNummer + " Free: "
	
	for (let i = 0; names.length > i ; i++){
		setValuesForCurrency()
		store.state.system.rng.nightHunt_ritual = useNummer
		let levelOfCurrent = store.state.nightHunt.potion[names[i]].level
		store.state.nightHunt.ritualIngredients = ingres[i]
		await new Promise(r => setTimeout(r, 1));
		document.getElementsByClassName("ma-1 v-btn v-btn--is-elevated v-btn--has-bg")[0].click()
		let totalValue = store.state.currency.event_lavender.value + store.state.currency.event_mapleLeaf.value + store.state.currency.event_fourLeafClover.value + store.state.currency.event_charredSkull.value + store.state.currency.event_mysticalWater.value + store.state.currency.event_cheese.value
		if (levelOfCurrent != store.state.nightHunt.potion[names[i]].level && totalValue === 60000)	{
			resultString += names[i] + ", "
			found = true
		}
		store.state.nightHunt.potion[names[i]].level = levelOfCurrent
	}
	
	store.state.system.rng.nightHunt_ritual = useNummer
	let currToken = store.state.currency.event_nightHuntToken.value
	store.state.nightHunt.ritualIngredients = [ "cheese", "cheese", "cheese" ]
	store.state.nightHunt.performedRituals = store.state.nightHunt.performedRituals.filter(item => item !== "cheese,cheese,cheese");
	await new Promise(r => setTimeout(r, 1));
	document.getElementsByClassName("ma-1 v-btn v-btn--is-elevated v-btn--has-bg")[0].click()
	let totalValueRandom = store.state.currency.event_lavender.value + store.state.currency.event_mapleLeaf.value + store.state.currency.event_fourLeafClover.value + store.state.currency.event_charredSkull.value + store.state.currency.event_mysticalWater.value + store.state.currency.event_cheese.value
	if (currToken != store.state.currency.event_nightHuntToken.value && totalValueRandom === 60000)	{
		resultString += " Random 3 Long"
		found = true
	}
	store.state.system.rng.nightHunt_ritual = useNummer
	if (found){
		return resultString
	} else {
		return "";
	}
}

function setValuesForCurrency(){
	store.state.currency.event_lavender.value = 10000
	store.state.currency.event_mapleLeaf.value = 10000
	store.state.currency.event_fourLeafClover.value = 10000
	store.state.currency.event_charredSkull.value = 10000
	store.state.currency.event_mysticalWater.value = 10000
	store.state.currency.event_cheese.value = 10000
}


async function wololololo(){
	await new Promise(r => setTimeout(r, 1));
	await new Promise(r => setTimeout(r, 1));
	gg()
}

wololololo()
