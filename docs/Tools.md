# Tools

The internal doccumentation for the cowpunk project

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
