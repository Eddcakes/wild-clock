import React from 'react';
import logo from './logo.svg';
import Clock from './clock'

//Do i want to be able to pick a locale or do i just pass the time to the component 
function App() {
    return (
      <div className="App">
        <Clock effect="pulse"/>
        <Clock effect="rainbow"/>
        <Clock effect="spin"/>
      </div>
    );
}

export default App;
