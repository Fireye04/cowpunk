# Tools

The internal documentation for the cowpunk project

## Enums

Limited options for certain variables. Current implementation are plain strings.

### Shops

- "deadeye"
- "the iron giant"
- "cyberwares"
- "blackmarket guns"
- "forge and flame"

### Postings

(aka bounty boards)

- "the first one"
- "dennis"
- "el pequenito caballero"

### Augment Locations

- "legs"
- "arms"
- "ears"
- "eyes"
- "head"
- "brain"
- "heart"
- "lungs"

### Combat round results

- "success"
- "success at cost"
- "failure"

### Bounty status

- "available"
- "unavailable"
- "in-progress"
- "succeeded"
- "failed"

### Bounty difficulty

- "novice"
- "easy"
- "intermediate"
- "hard"
- "extreme"

## Components

Components convey their functions to objects that apply them.

### Sellable

Things that can be sold by a shop

- buy() - allows the player to buy the item, subtracts the cost, and applies changeable attributes if applicable.
- canAfford() - returns a bool: true if the player can currently afford this item, false otherwise.
- getShops() - returns an array of the shops that the item is sold at

### Changeable

Things that can affect player stats

- change() - applies item modifications to player stats
- revert() - undos application of item modifications to player stats

### Damageable

Things that can deal damage

- getDamage() - returns item's output damage.

## Class Structs

To use a class in sugarcube, do the following:

```
<<set $VariableNameHere to new ClassNameHere('parameter 1','parameter 2', 3, 4)>>
```

### Catalog

Represents a full list of sellable items

- Items (Array)- only accepts items that have implemented sellable

Methods:

- getItemsFromShop(shop) - takes a shop enum string (see above) as a parameter and returns an array of Sellable items that can be purchased at that shop.

Example catalog usage:

```
<<set $cat to new Catalog([new Weapon("bob", "im a silly lil cowboy", 1,2, ["deadeye"])])>>
<<set $deadeyeShops to $cat.getItemsFromShop("deadeye")>>
<<for _item range $deadeyeShops>>
<<= _item.name>>
<</for>>
```

### Inventory

Contains the following:

- Weapons (Array) - defaults to []
- Augments (Map) - defaults to fully initialized & empty map of body part to the current occupying augmentation.

To initialize, do so empty unless you know what you're doing: `Inventory(null, null);`

Inventory also contains a couple helpful functions:

- getWeapon() - Returns a reference to the player's best weapon, or just: `new Weapon("My bare fists", "Hitting people has never been easier", 0, 1, [])`
- getDamage() - Shortcut to return the damage of the player's best weapon as an integer.
- addItem(item) - adds weapons or augments into the proper list by type. Other items will be ignored.

### Weapons

To initialize a new weapon you'll need to provide:

- Name (String)
- Description (String)
- Cost (Integer)
- Damage (Integer)
- Shops (Array)- array of shops where item is sold, see enums above

Here is a valid weapon constructor that names the weapon "bill", gives it the "shoots stuff" description, a cost of $3, and a damage of 4, sold only at the deadeye shop:
`Weapon("bill", "shoots stuff", 3, 4, ["deadeye"]);`

Implements the Changeable and Sellable components

### Augments

To initialize a new augment you'll need to provide:

- Name (String)
- Description (String)
- Location (String) - body location, see enums above
- Cost (Integer)
- Power (Integer) - Should be a modifier, not the new total; Applied on purchase.
- Health (Integer) - Should be a modifier, not the new total; Applied on purchase.
- Humanity (Integer) - Should be a modifier, not the new total; Applied on purchase.
- Fame(Integer) - Should be a modifier, not the new total; Applied on purchase.
- Shops (Array)- array of shops where item is sold, see enums above

Here is a valid augment constructor that names the augment "bill's elbow", gives it the "figure it out" description, a cost of $5, a damage modifier of 2, a health modifier of 8, a humanity modifier of -3, and a fame modifier of -5, sold only at the deadeye shop:
`Augment("bill's elbow", "figure it out", "arms", 5, 2, 8, -3, -5, ["deadeye"]);`

Implements the Damageable and Sellable components

### Bounty

To initialize a bounty you'll need the following:

- Name (String)
- Description (String)
- Status (String) - current bounty status, see enums above.
- Payout (Integer) - Should be a modifier, not the new total; Applied on mission success.
- Fame (Integer) - Should be a modifier, not the new total; Applied on mission success.
- Humanity (Integer) - Should be a modifier, not the new total; Applied on mission success.
- Difficulty (String) - bounty difficulty, see enums above.
- Postings (Array) - Array of postings (Locations) where bounty can be found, see enums above.

> [!WARNING]
> Do not edit Status directly, use updateStatus() instead

Methods:

- updateStatus(newStatus) - changes the status of the mission and applies any applicable modifiers to game variables.

A bounty called Kill bob, with the description "he took my cheese wheel :(", a payout of $20, -1 fame, and -2 humanity on success, and a difficulty of "easy", that can only be found at "el pequenito caballero" can be created like so:
`Bounty("Kill bob", "he took my cheese wheel :(", "available", 20, -1, -2, "easy", ["el pequenito caballero"]);`

Implements the changeable component

## Functions

### Combat

To run the combat system you will need to run:

`:: StartCombat`
`<script>>StartCombat(Enemy Difficulty,Enemy Health, Enemy Damage)<</script>>` - Enemy Difficulty, Enemy Health, and Enemy Damage are all integers

EX: If you want to link to a new page where combat occurs against an enemy with a difficulty level of 2, a health of 10, and a damage output of 5 it would be:

`:: StartCombat`
`<script>>StartCombat(2,10,5)<</script>>`

Then to add dialogue/story to the battle you can add different results based on if you win or lose the fight. You will add:
`<<if $health > 0>>[[You Win | Win]] <<else>> [[You Lose | Lose]] <</if>>` - This will take you to two seperate pages depending on if you win or lose the fight. Those pages can be edited like normal to add detail and story to the fight.

EX: All together, if you want to start a new battle against an enemy with a difficulty level of 2, a health value of 10, and a damage output of 5 and then have two different story outcomes based on the results you will have:

`:: StartCombat`
`<script>>StartCombat(2,10,5)<</script>>`
`<<if $health > 0>>[[You Win | Win]] <<else>> [[You Lose | Lose]] <</if>>`
