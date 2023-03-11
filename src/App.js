import React, {useState, useEffect} from 'react'
import './App.css';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';

// Importing Router package!
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setStorage } from './Controller/Storage';
import { root } from './components/Main/root/root';

function App() {

  // Footer state handler!
  const [footer, setFooter] = useState();

  // Window Height state handler!
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);

  // Mandatory Default Data!
  function stateValue(){
    const data = [];
    setStorage(root.breadCrumb, JSON.stringify(data));
  }

  // Constructor!
  useEffect(() => {
    stateValue();
  }, [])

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/main" exact element={<Main footerHeight = {footer} windowHeight = {innerHeight} />} />
        </Routes>
        <Footer footer = {setFooter} />
      </div>
    </Router>
  );
}

export default App;
