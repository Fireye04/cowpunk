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

	return Object.assign(state, Sellable(state), Damageable(state));
};

const Augment = (name, description, cost, power, health) => {
	let state = { name, description, cost, power, health };

	return Object.assign(state, Sellable(state), Changeable(state));
};

window.Weapon = (name, description, cost, damage) =>
	Weapon(name, description, cost, damage);

window.Augment = (name, description, cost, power, health) =>
	Augment(name, description, cost, power, health);
