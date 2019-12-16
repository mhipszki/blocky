# Blocky

## Requirements

- clicking on a block removes the block and all blocks of the same colour that are connected to it
- then blocks above removed ones fall down

## Architectural plan

- game logic and UI to be separated into different layers
- when a rendered block is clicked, the UI notifies the game controller to act
- each time the data has changed the UI re-renders
- coordinate system: lower left is (0;0), upper right is the greatest position on the grid, together they define the size of the grid

## Identified types

### Coordinate

- two dimensional position on the grid

```ts
interface Coordinate {
  x: number;
  y: number;
}
```

### Colour

- can be `red`, `green`, `blue` and `yellow`

```ts
const Red = 'red';
const Green = 'green';
const Blue = 'blue';
const Yellow = 'yellow';

const colours = [Red, Green, Blue, Yellow] as const;

type Colour = typeof colours[number];
```

### Block

- has position and colour
- can change position on `Y axis` downwards
- can't change its colour

```ts
abstract class Block {
  private _position: Coordinate;
  constructor(position: Coordinate, readonly colour: Colour);
  abstract moveDown();
  get position(): Coordinate;
}
```

### Grid

- has dimensions (lower left, upper right position)
- contains a set of blocks
- creates all blocks with random colours on instantiation
- can remove a specific block and its connected blocks with the same colour

```ts
abstract class Grid {
  readonly width: number;
  readonly height: number;
  constructor(readonly lowerLeft: Coordinate, readonly upperRight: Coordinate);
  abstract removeAt(position: Coordinate);
}
```
