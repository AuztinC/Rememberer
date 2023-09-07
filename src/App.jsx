
import React, { useId } from 'react';
import './App.css';
import Game from "./Game";


function App() {


  return (

    <div className='App' key={useId()}>
      <div id="game" key={useId()}>
        <Game />
      </div>
    </div>

  );
}

export default App;
