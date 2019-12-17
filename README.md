# Blocky

## Solution

- written in `TypeScript` in a test-driven manner
- scaffolded using `Create React App`
- fulfills requirements: generates and draws grid, clicking clears and collapses connected blocks with same colour

Possible improvements:

- thorough testing of UI (`App.tsx`) apart from current sanity check of rendering a grid
- often used types could be refactored e.g. `type Grid = Block[][]`
- `Block` could just extend `Coordinate` and thus simplified
- better UI features e.g. recreate grid to play new game, allow new grid size from UI, scoring, animated collapsing of empty blocks etc.
- better colours!! xD

To run, first install dependencies:

```
yarn
```

then run all unit tests:

```
yarn test
```

and start application via:

```
yarn start
```

this will open up the solution in a browser and render a grid with random colours.

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
- can collapse empty blocks

```ts
abstract class Grid {
  readonly width: number;
  readonly height: number;
  constructor(readonly lowerLeft: Coordinate, readonly upperRight: Coordinate);
  abstract removeAt(position: Coordinate);
  abstract clearWithConnectedPeers(block: Block);
  abstract collapseEmptyBlocks();
}
```
