import React, { useState, useCallback } from 'react';
import Grid from './entities/grid';
import './App.css';
import { Colour, Empty } from './entities/types';

type Props = {
  grid: Grid;
};

const blockSize = 100;

const toBackground = (colour: Colour) => (colour === Empty ? 'grey' : colour);

const App: React.FC<Props> = ({ grid }) => {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const onClick = (x: number, y: number) => {
    const block = grid.blocks[x][y];
    grid.clearWithConnectedPeers(block);
    grid.collapseEmptyBlocks();
    forceUpdate();
  };

  const blocks = grid.listOfBlocks.map(({ x, y, colour }) => (
    <div
      className="block"
      data-testid={`block-${x}-${y}`}
      key={`${x},${y}`}
      style={{
        backgroundColor: toBackground(colour),
        width: blockSize,
        height: blockSize,
      }}
      onClick={() => onClick(x, y)}
    />
  ));

  return (
    <div className="grid" style={{ width: grid.width * blockSize }}>
      {blocks}
    </div>
  );
};

export default App;
