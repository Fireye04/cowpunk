/* Stow the sidebar initially
config.ui.stowBarInitially = true;
*/

/* Hide the back / forward buttons
config.history.controls = false;
*/

const Sellable = (state) => ({
	buy: () => {
		let local = variables();
		local.money -= state.cost;
		// Apply any stat mods if applicable
		//TODO: Update when augments are added to revert old augment
		if (typeof this.change === "function") {
			this.change();
		}
	},
	canAfford: () => {
		let local = variables();
		return local.money >= state.cost;
	},
});

const Changeable = (power, health) => ({
	change: () => {
		let local = variables();
		local.power += power;
		local.health += health;
	},
	revert: () => {
		let local = variables();
		local.power -= power;
		local.health -= health;
	},
});

const Damageable = (state) => ({
	damage: () => {
		return state.damage;
	},
});

window.Weapon = class Weapon {
	constructor(name, description, cost, damage) {
		let state = { name, description, cost, damage };
		this.name = name || "Default";
		this.description = description || "Default";
		this.cost = cost || 100;
		this.damage = damage || 0;

		Object.assign(state, Sellable(state), Damageable(state));
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
};

window.Augment = class Augment {
	constructor(name, description, cost, power, health) {
		let state = { name, description, cost, power, health };
		this.name = name || "Default";
		this.description || "Default";
		this.cost = cost || 100;
		this.power = power || 0;
		this.health = health || 0;

		Object.assign(state, Sellable(state), Changeable(state));
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
};
