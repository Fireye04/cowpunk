/* Stow the sidebar initially
config.ui.stowBarInitially = true;
*/

/* Hide the back / forward buttons
config.history.controls = false;
*/

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
