/* Stow the sidebar initially
config.ui.stowBarInitially = true;
*/

/* Hide the back / forward buttons
config.history.controls = false;
*/


// function You(Power, Damage, Health) {
// 	this.Power = $You_Power;
// 	this.Damage = $You_Damage;
// 	this.Health = $You_Health;
// }
//
// const you = new You($You_Power, $You_Damage, $You_Health);
//
// function Enemy(Power, Damage, Health, Difficulty) {
// 	this.Damage = $En_Damage;
// 	this.Health = $En_Health;
// 	this.Difficulty = $Difficulty;
// }

function roll(You_Power, Difficulty) {
	let numRolls = You_Power - Difficulty;
	if (numRolls <= 0) {
		if (Math.floor(Math.random() * 10 + 0.5) === 10) {
			return "success_at_cost";
		}
		return "falure";
	}
	const rolls = [];
	for (let i = 0; i < numRolls; i++) {
		rolls.push(Math.floor(Math.random() * 10 + 0.5));
	}
	let max = Math.max(...array1);

	if (max <= 3) {
		return "falure";
	} else if (max <= 6) {
		return "success_at_cost";
	} else {
		return "success";
	}
}

// Roll for Damage//
function Damage(
	You_Power,
	Difficulty,
	You_Health,
	En_Damage,
	En_Health,
	You_Damage,
) {
	let result = roll(You_Power, Difficulty);
	if (result === "success") {
		En_Health -= You_Damage;
	} else if (result === "success_at_cost") {
		En_Health -= You_Damage;
		You_Health -= En_Damage;
	} else {
		You_Health -= En_Damage;
	}
	return You_Health, En_Health;
}
function StartCombat(Difficulty, En_Health, En_Damage) {
	let local = variables();
	local.health = 99;
	console.log("mwahahah");
	while (En_Health > 0 && local.health > 0) {}
}

window.StartCombat(Difficulty,En_Health,En_Damage) = StartCombat(Difficulty, En_Health, En_Damage);

