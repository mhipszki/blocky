import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Grid from './entities/grid';
import { blockColours } from './entities/types';

const colourFactory = () =>
  blockColours[Math.floor(Math.random() * blockColours.length)];

const grid = new Grid({ x: 0, y: 0 }, { x: 5, y: 5 }, colourFactory);

ReactDOM.render(<App grid={grid} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
