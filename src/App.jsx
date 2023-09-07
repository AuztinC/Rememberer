
import React, { useId } from 'react';
import './App.css';
import Game from "./Game";


function App() {


  return (

    <div className='App' key={223}>
      <div id="game" key={366}>
        <Game />
      </div>
    </div>

  );
}

export default App;
