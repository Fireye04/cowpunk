/* Stow the sidebar initially
config.ui.stowBarInitially = true;
*/

/* Hide the back / forward buttons
config.history.controls = false;
*/

const Sellable = (state) => ({
	buy: () => {
		console.log(state.cost);
		if (typeof state.power !== "undefined") {
			console.log(state.power);
		}
		if (typeof state.health !== "undefined") {
			console.log(state.health);
		}
	},
});

const Damageable = (state) => ({
	damage: () => {
		console.log(state.damage);
	},
});

const Weapon = (cost, damage) => {
	let state = { cost, damage };

	return Object.assign(state, Sellable(state), Damageable(state));
};

const Augment = (cost, power, health) => {
	let state = { cost, upgrades };

	return Object.assign(state, Sellable(state));
};

let gun = Weapon(3, 4);
let arm = Augment(5, 8, 2);
gun.damage();
gun.buy();
arm.buy();
