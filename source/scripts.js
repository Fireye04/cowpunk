/* Stow the sidebar initially
config.ui.stowBarInitially = true;
*/

/* Hide the back / forward buttons
config.history.controls = false;
*/

let $You_Power;
let $You_Damage;
const $You_Health = 25
let $Difficulty;
let $En_Damage;
let $En_Health;


function You (Power, Damage, Health) {
    this.Power= $You_Power;
    this.Damage= $You_Damage;
    this.Health= $You_Health;
}

const you = new You ($You_Power, $You_Damage, $You_Health);

function Enemy (Power, Damage, Health, Difficulty) {
    this.Damage= $En_Damage;
    this.Health= $En_Health;
    this.Difficulty= $Difficulty;
}


// Roll for Damage//
function Damage (You_Power, Difficulty, You_Health, En_Damage, En_Health, You_Damage){
    x= You_Power + Math.floor(Math.random() * 10 +.5) - Difficulty
    if (x <= 3) {
        You_Health - En_Damage
    } else if (x >= 7) {
        En_Health - You_Damage
    } else {En_Health - You_Damage; You_Health - En_Damage }
}
function StartCombat (Difficulty, En_Health, En_Damage){
    let local= variables();



}