/* Stow the sidebar initially
config.ui.stowBarInitially = true;
*/

/* Hide the back / forward buttons
config.history.controls = false;
*/
const Globals = {
	money: 0,
	init: (startingMoney) => {
		money = startingMoney;
	},
};

window.Globals = Globals;

const Sellable = (state) => {
	buy: () => {
		console.log(state.cost);
	};
};

const Upgradeable = (state) => {
	applyUpgrades: () => {
		console.log(state.upgrades);
	};
};

const Damageable = (state) => {
	damage: () => {
		console.log(this.damageFunc());
	};
};

// Object.assign(weapon.prototype, Sellable);

// const gun = new weapon(3, function () {
// 	return Math.floor(Math.random() * 8 + 0.5);
// });
// gun.damage();
