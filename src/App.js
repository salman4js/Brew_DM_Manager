import React, { useState, useEffect } from 'react'
import './App.css';
import Home from './components/Home/Home';
import { defaultStorage, setStorage } from './Controller/Storage';

function App() {

  // Mandatory Default Data!
  function stateValue() {

    // Root Data!
    const options = [];
    const content = 'content';

    // Data
    const data = {
      "Crumb" : JSON.stringify(options),
      'content' : content
    }

    // Assign mandatory in a single shot!
    defaultStorage(data);
  }

  // Constructor!
  useEffect(() => {
    stateValue();
  }, [])

  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
