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
	constructor(cost) {
		this.cost = cost;
	}
	damage(damage) {
		console.log(damage);
	}
}

Object.assign(weapon.prototype, Sellable);

console.log("gothere");

const gun = new weapon(3);
gun.buy();

