/* Stow the sidebar initially
config.ui.stowBarInitially = true;
*/

/* Hide the back / forward buttons
config.history.controls = false;
*/

const Sellable = {
	constructor(cost) {
		this.cost = cost;
	},
	buy() {
		console.log(cost);
	},
};

class weapon {
	damage(damage) {
		console.log(damage);
	}
}

Object.assign(weapon, Sellable);

console.log("gothere");

const gun = new weapon(3);
gun.damage(9);
gun.buy();

