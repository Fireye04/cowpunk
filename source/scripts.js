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

const Weapon = (name, description, cost, damage) => {
	let state = { name, description, cost, damage };
	this.name = name || "Default";
	this.description = description || "Default";
	this.cost = cost || 100;
	this.damage = damage || 0;

	return Object.assign(state, Sellable(state), Damageable(state));
};

Weapon.prototype.clone = function () {
	// Return a new instance containing our own data.
	return new Weapon(this.name, this.description, this.cost, this.damage);
};

Weapon.prototype.toJSON = function () {
	// Return a code string that will create a new instance containing our
	// own data.
	return Serial.createReviver(
		String.format(
			"new Weapon({0},{1},{2},{3})",
			JSON.stringify(this.name),
			JSON.stringify(this.description),
			JSON.stringify(this.cost),
			JSON.stringify(this.damage),
		),
	);
};

const Augment = (name, description, cost, power, health) => {
	let state = { name, description, cost, power, health };

	return Object.assign(state, Sellable(state), Changeable(state));
};

Augment.prototype.clone = function () {
	// Return a new instance containing our own data.
	return new Augment(
		this.name,
		this.description,
		this.cost,
		this.power,
		this.health,
	);
};

Augment.prototype.toJSON = function () {
	// Return a code string that will create a new instance containing our
	// own data.
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
};

window.Weapon = (name, description, cost, damage) =>
	Weapon(name, description, cost, damage);

window.Augment = (name, description, cost, power, health) =>
	Augment(name, description, cost, power, health);
