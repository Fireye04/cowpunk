/* Stow the sidebar initially
config.ui.stowBarInitially = true;
*/

/* Hide the back / forward buttons
config.history.controls = false;
*/

const Sellable = (state) => ({
	buy: () => {
		console.log(state.cost);
		if (state.upgrades) {
			console.log(state.upgrades);
		}
	},
});

const Damageable = (state) => ({
	damage: () => {
		console.log(state.damage);
	},
});

const upgrades = (health, power) => {};

const Weapon = (cost, damage) => {
	let state = { cost, damage };

	return Object.assign(state, Sellable(state), Damageable(state));
};

const Augment = (cost, upgrades) => {
	let state = { cost, upgrades };

	return Object.assign(state, Sellable(state));
};

const gun = Weapon(3, 5);
const arm = Augment(3, upgrades(5, 2));
gun.damage();
gun.buy();
arm.buy();
