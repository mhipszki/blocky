import findNeighbours from './findNeighbours';
import Block from './block';

const hasSameColourOf = (block: Block) => ({ colour }: Block) =>
  colour === block.colour;

const notIn = (immediatePeers: Block[]) => (block: Block) =>
  !immediatePeers.includes(block);

const findPeers = (
  block: Block,
  grid: Block[][],
  ignored: Block[] = []
): Block[] => {
  const immediatePeers = findNeighbours(block, grid)
    .filter(notIn(ignored))
    .filter(hasSameColourOf(block));

  const peers = immediatePeers.reduce<Block[]>((collected, peer) => {
    const peersOfPeers = findPeers(peer, grid, [
      block,
      ...immediatePeers,
      ...ignored,
      ...collected,
    ]);

    return [...collected, ...peersOfPeers];
  }, []);

  return [...immediatePeers, ...peers];
};

export default findPeers;
