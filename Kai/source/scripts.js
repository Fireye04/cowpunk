/* Stow the sidebar initially
config.ui.stowBarInitially = true;
*/

/* Hide the back / forward buttons
config.history.controls = false;
*/

const Sellable = {
	buy() {
		console.log(this.cost);
	},
};

class weapon {
	constructor(cost, damageFunc) {
		this.cost = cost;
		this.damageFunc = damageFunc;
	}
	damage() {
		console.log(this.damageFunc());
	}
}

Object.assign(weapon.prototype, Sellable);

const gun = new weapon(3, function () {
	return Math.random() * 8;
});
gun.damage();
