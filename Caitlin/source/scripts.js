/* Stow the sidebar initially
config.ui.stowBarInitially = true;
*/

/* Hide the back / forward buttons
config.history.controls = false;
*/

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
	let max = Math.max(...rolls);

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
	return [You_Health, En_Health];
}
function StartCombat(Difficulty, En_Health, En_Damage) {
	let local = variables();
	while (En_Health > 0 && local.health > 0) {
		console.log(local.health);
		console.log(En_Health);
		[local.health, En_Health] = Damage(
			local.power,
			Difficulty,
			local.health,
			En_Damage,
			En_Health,
			local.damage,
		);
	}
	if (En_Health <= 0) {
		console.log("you win");
		return true;
	}
	console.log("you lose :(");
	return false;
}

window.StartCombat = (Dif, En_Health, En_Damage) =>
	StartCombat(Dif, En_Health, En_Damage);

class Sellable {
	constructor(parent) {
		this.parent = parent;
	}
	buy() {
		let local = variables();
		local.money -= this.parent.cost;
		// Apply any stat mods if applicable
		//TODO: Update when augments are added to revert old augment
		if (typeof this.parent.changeable === "object") {
			this.parent.change();
		}
	}
	canAfford() {
		let local = variables();
		return local.money >= this.parent.cost;
	}
}

class Changeable {
	constructor(parent) {
		this.parent = parent;
	}
	change() {
		let local = variables();
		local.power += this.parent.power;
		local.health += this.parent.health;
	}
	revert() {
		let local = variables();
		local.power -= this.parent.power;
		local.health -= this.parent.health;
	}
}

class Damageable {
	constructor(parent) {
		this.parent = parent;
	}
	getDamage() {
		return this.parent.damage;
	}
}

window.Weapon = class Weapon {
	constructor(name, description, cost, damage) {
		this.name = name || "Default";
		this.description = description || "Default";
		this.cost = cost || 100;
		this.damage = damage || 0;
		this.sellable = new Sellable(this);
		this.damageable = new Damageable(this);
	}
	clone() {
		return new Weapon(this.name, this.description, this.cost, this.damage);
	}
	toJSON() {
		return Serial.createReviver(
			String.format(
				"new Weapon({0},{1},{2},{3})",
				JSON.stringify(this.name),
				JSON.stringify(this.description),
				JSON.stringify(this.cost),
				JSON.stringify(this.damage),
			),
		);
	}
	buy() {
		this.sellable.buy();
	}
	canAfford() {
		return this.sellable.canAfford();
	}
	getDamage() {
		return this.damageable.getDamage();
	}
};

window.Augment = class Augment {
	constructor(name, description, cost, power, health) {
		this.name = name || "Default";
		this.description = description || "Default";
		this.cost = cost || 100;
		this.power = power || 0;
		this.health = health || 0;
		this.sellable = new Sellable(this);
		this.changeable = new Changeable(this);
	}
	clone() {
		return new Augment(
			this.name,
			this.description,
			this.cost,
			this.power,
			this.health,
		);
	}
	toJSON() {
		return Serial.createReviver(
			String.format(
				"new Augment({0},{1},{2},{3},{4})",
				JSON.stringify(this.name),
				JSON.stringify(this.description),
				JSON.stringify(this.cost),
				JSON.stringify(this.power),
				JSON.stringify(this.health),
			),
		);
	}
	buy() {
		this.sellable.buy();
	}
	canAfford() {
		return this.sellable.canAfford();
	}
	change() {
		this.changeable.change();
	}
	revert() {
		this.changeable.revert();
	}
};

// Shops //
let shop1 = "deadeye"
let shop2 = "the iron giant"
let shop3 = "cyberwares"
let shop4 = "blackmarket guns"
let shop5 = "forge and flame"