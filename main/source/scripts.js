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
			return "success at cost";
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
		return "success at cost";
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
	} else if (result === "success at cost") {
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

window.Weapon = class Weapon {
	constructor(name, description, cost, damage, shops) {
		this.name = name ??= "Default";
		this.description = description ??= "Default";
		this.cost = cost ??= 100;
		this.damage = damage ??= 0;
		this.shops = shops ??= ["deadeye"];
	}
	clone() {
		return new Weapon(
			this.name,
			this.description,
			this.cost,
			this.damage,
			this.shops,
		);
	}
	toJSON() {
		return Serial.createReviver(
			String.format(
				"new Weapon({0},{1},{2},{3},{4})",
				JSON.stringify(this.name),
				JSON.stringify(this.description),
				JSON.stringify(this.cost),
				JSON.stringify(this.damage),
				JSON.stringify(this.shops),
			),
		);
	}
	buy() {
		let local = variables();
		local.money -= this.cost;
		local.inv.addItem(this);
	}
	canAfford() {
		let local = variables();
		return local.money >= this.cost;
	}
	getShops() {
		return this.shops;
	}
	getDamage() {
		return this.damage;
	}
};

window.Augment = class Augment {
	constructor(
		name,
		description,
		location,
		cost,
		power,
		health,
		humanity,
		fame,
		shops,
	) {
		this.name = name ??= "Default";
		this.description = description ??= "Default";
		this.location = location ??= "arms";
		this.cost = cost ??= 100;
		this.power = power ??= 0;
		this.health = health ??= 0;
		this.humanity = humanity ??= 0;
		this.fame = fame ??= 0;
		this.shops = shops ??= ["deadeye"];
	}
	clone() {
		return new Augment(
			this.name,
			this.description,
			this.location,
			this.cost,
			this.power,
			this.health,
			this.humanity,
			this.fame,
			this.shops,
		);
	}
	toJSON() {
		return Serial.createReviver(
			String.format(
				"new Augment({0},{1},{2},{3},{4},{5},{6},{7},{8})",
				JSON.stringify(this.name),
				JSON.stringify(this.description),
				JSON.stringify(this.location),
				JSON.stringify(this.cost),
				JSON.stringify(this.power),
				JSON.stringify(this.health),
				JSON.stringify(this.humanity),
				JSON.stringify(this.fame),
				JSON.stringify(this.shops),
			),
		);
	}
	buy() {
		let local = variables();
		local.money -= this.cost;
		local.inv.addItem(this);
	}
	canAfford() {
		let local = variables();
		return local.money >= this.cost;
	}
	getShops() {
		return this.shops;
	}
	change() {
		let local = variables();
		local.power += this.parent.power ??= 0;
		local.health += this.parent.health ??= 0;
		local.humanity += this.parent.humanity ??= 0;
		local.fame += this.parent.fame ??= 0;
		local.money += this.parent.payout ??= 0;
	}
	revert() {
		let local = variables();
		local.power -= this.parent.power ??= 0;
		local.health -= this.parent.health ??= 0;
		local.humanity -= this.parent.humanity ??= 0;
		local.fame -= this.parent.fame ??= 0;
		local.money -= this.parent.payout ??= 0;
	}
};

window.Bounty = class Bounty {
	constructor(
		name,
		description,
		status,
		payout,
		fame,
		humanity,
		difficulty,
		postings,
	) {
		this.name = name ??= "Default";
		this.description = description ??= "Default";
		this.status = status ??= "available";
		this.payout = payout ??= 0;
		this.fame = fame ??= 0;
		this.humanity = humanity ??= 0;
		this.difficulty = difficulty ??= "hard";
		this.postings = postings ??= [];
	}
	clone() {
		return new Bounty(
			this.name,
			this.description,
			this.status,
			this.payout,
			this.fame,
			this.humanity,
			this.difficulty,
			this.postings,
		);
	}
	toJSON() {
		return Serial.createReviver(
			String.format(
				"new Bounty({0},{1},{2},{3},{4},{5},{6},{7})",
				JSON.stringify(this.name),
				JSON.stringify(this.description),
				JSON.stringify(this.status),
				JSON.stringify(this.payout),
				JSON.stringify(this.fame),
				JSON.stringify(this.humanity),
				JSON.stringify(this.difficulty),
				JSON.stringify(this.postings),
			),
		);
	}
	updateStatus(newStatus) {
		if (newStatus === "succeeded") {
			this.change();
		}
		this.status = newStatus;
	}
	change() {
		let local = variables();
		local.power += this.parent.power ??= 0;
		local.health += this.parent.health ??= 0;
		local.humanity += this.parent.humanity ??= 0;
		local.fame += this.parent.fame ??= 0;
		local.money += this.parent.payout ??= 0;
	}
	revert() {
		let local = variables();
		local.power -= this.parent.power ??= 0;
		local.health -= this.parent.health ??= 0;
		local.humanity -= this.parent.humanity ??= 0;
		local.fame -= this.parent.fame ??= 0;
		local.money -= this.parent.payout ??= 0;
	}
};

window.Inventory = class Inventory {
	constructor(weapons, augments) {
		this.weapons = weapons ??= [];
		this.augments = augments ??= function () {
			let m = new Map();
			m.set("legs", null);
			m.set("arms", null);
			m.set("ears", null);
			m.set("eyes", null);
			m.set("head", null);
			m.set("brain", null);
			m.set("heart", null);
			m.set("lungs", null);
			return m;
		};
	}
	clone() {
		return new Inventory(this.weapons, this.augments);
	}
	toJSON() {
		return Serial.createReviver(
			String.format(
				"new Inventory({0},{1})",
				JSON.stringify(this.weapons),
				JSON.stringify(this.augments),
			),
		);
	}
	getWeapon() {
		let maxitem;
		let max = 0;
		for (let i = 0; i < this.weapons; i++) {
			let weapon = this.weapons[i];
			if (weapon.getDamage() >= max) {
				maxitem = weapon;
			}
		}
		return (maxitem ??= new Weapon(
			"My bare fists",
			"Hitting people has never been easier",
			0,
			1,
		));
	}
	getDamage() {
		return this.getWeapon().getDamage();
	}
	addItem(item) {
		if (item instanceof Weapon) {
			this.weapons.push(item);
		} else if (item instanceof Augment) {
			let old = this.augments.get(item.location);
			if (old !== null) {
				old.revert();
			}
			this.augments.set(item.location, item);
			item.change();
		}
	}
};

window.Catalog = class Catalog {
	constructor(items) {
		let itTemp = (items ??= []);

		// Removes items that have not implemented sellable
		let toRemove = [];
		for (let i = 0; i < itTemp.length; i++) {
			let item = itTemp[i];
			if (typeof item.buy !== "function") {
				toRemove.push(item);
			}
		}
		this.items = itTemp.filter((item) => !toRemove.includes(item));
	}
	clone() {
		return new Catalog(this.items);
	}
	toJSON() {
		return Serial.createReviver(
			String.format("new Catalog({0})", JSON.stringify(this.items)),
		);
	}
	getItemsFromShop(shop) {
		let total = [];
		for (let i = 0; i < this.items.length; i++) {
			let item = this.items[i];
			if (item.getShops().includes(shop)) {
				total.push(item);
			}
		}
		return total;
	}
};
