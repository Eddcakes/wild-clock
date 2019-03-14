import React, { useState } from 'react';
import logo from './logo.svg';
import Clock from './clock'

//Do i want to be able to pick a locale or do i just pass the time to the component 
//all a cock needs to know is the time to display


function App() {
    return (
      <div className="App">
        <p>this will by my clock app</p> 
        <Clock />
      </div>
    );
}

export default App;
