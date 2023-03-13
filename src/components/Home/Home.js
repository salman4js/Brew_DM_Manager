import React, { useState } from 'react';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Desktop from '../Screen/Desktop';
// Importing Router package!
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = () => {

    // Window Height state handler!
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);

    return (
        <div>
            <Router>
                <div className="app-container">
                    <Routes>
                        <Route path="/:id/login" exact element={<Login />} />
                        <Route path = "/:id/desktop" exact element = {<Desktop />} />
                        <Route path="/:id/main" exact element={<Main windowHeight={innerHeight}/>} />
                    </Routes>
                </div>
            </Router>
        </div>
    )
}

export default Home;