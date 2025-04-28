/* Stow the sidebar initially
config.ui.stowBarInitially = true;
*/

/* Hide the back / forward buttons
config.history.controls = false;
*/

class Sellable {
	buy() {
		let local = variables();
		local.money -= this.cost;
		// Apply any stat mods if applicable
		//TODO: Update when augments are added to revert old augment
		if (typeof this.change === "function") {
			this.change();
		}
	}
	canAfford() {
		let local = variables();
		return local.money >= this.cost;
	}
}

class Changeable {
	change() {
		let local = variables();
		local.power += this.power;
		local.health += this.health;
	}
	revert() {
		let local = variables();
		local.power -= this.power;
		local.health -= this.health;
	}
}

class Damageable {
	damage() {
		return this.damage;
	}
}

window.Weapon = class Weapon {
	constructor(name, description, cost, damage) {
		this.name = name || "Default";
		this.description = description || "Default";
		this.cost = cost || 100;
		this.damage = damage || 0;
		this.sellable = new Sellable();
		this.damageable = new Damageable();
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
	damage() {
		return this.damageable.damage();
	}
};

window.Augment = class Augment {
	constructor(name, description, cost, power, health) {
		this.name = name || "Default";
		this.description = description || "Default";
		this.cost = cost || 100;
		this.power = power || 0;
		this.health = health || 0;
		this.sellable = new Sellable();
		this.changeable = new Changeable();
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
