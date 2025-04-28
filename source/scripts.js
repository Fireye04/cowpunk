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

let gun = Weapon("bill", "shoots stuff", 3, 4);
let arm = Augment("bill", "shoots stuff", 5, 8, 2);
gun.damage();
gun.buy();
arm.buy();
