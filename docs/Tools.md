# Tools

The internal documentation for the cowpunk project

## Weapons

To initialize a new weapon you'll need to provide:

- Name (String)
- Description (String)
- Cost (Integer)
- Damage (Integer)

Here is a valid weapon constructor that names the weapon "bill", gives it the "shoots stuff" description, a cost of $3, and a damage of 4:
`Weapon("bill", "shoots stuff", 3, 4);`

## Augments

To initialize a new augment you'll need to provide:

- Name (String)
- Description (String)
- Cost (Integer)
- Power (Integer) - Should be a modifier, not the new total; Applied on purchase.
- Health (Integer) - Should be a modifier, not the new total; Applied on purchase.

Here is a valid augment constructor that names the augment "bill's elbow", gives it the "figure it out" description, a cost of $5, a damage modifier of 2, and a health modifier of 8:
`Augment("bill's elbow", "figure it out", 5, 2, 8);`


## Combat

To run the combat system you will need to run:

`:: StartCombat`
`<script>>StartCombat(Enemy Difficulty,Enemy Health, Enemy Damage)<</script>>`
    - Enemy Difficulty, Enemy Health, and Enemy Damage are all integers

EX: If you want to link to a new page where combat occurs against an enemy with a difficulty level of 2, a health of 10, and a damage output of 5 it would be:

`:: StartCombat`
`<script>>StartCombat(2,10,5)<</script>>`

Then to add dialogue/story to the battle you can add different results based on if you win or lose the fight. You will add:
   `<<if $health > 0>>[[You Win | Win]] <<else>> [[You Lose | Lose]] <</if>>`
        - This will take you to two seperate pages depending on if you win or lose the fight. Those pages can be edited like normal to add detail and story to the fight.

EX: All together, if you want to start a new battle against an enemy with a difficulty level of 2, a health value of 10, and a damage output of 5 and then have two different story outcomes based on the results you will have:

`:: StartCombat`
`<script>>StartCombat(2,10,5)<</script>>`
    `<<if $health > 0>>[[You Win | Win]] <<else>> [[You Lose | Lose]] <</if>>`