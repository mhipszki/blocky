export interface Coordinate {
  x: number;
  y: number;
}

export const Red = 'red';
export const Green = 'green';
export const Blue = 'blue';
export const Yellow = 'yellow';

const colours = [Red, Green, Blue, Yellow] as const;

export type Colour = typeof colours[number];
