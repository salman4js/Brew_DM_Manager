import React, { useState, useEffect } from 'react'
import './App.css';
import Home from './components/Home/Home';

import { setStorage } from './Controller/Storage';
import { root } from './components/Main/root/root';

function App() {

  // Mandatory Default Data!
  function stateValue() {
    const data = [];
    setStorage(root.breadCrumb, JSON.stringify(data));
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
