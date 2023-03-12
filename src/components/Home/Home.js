import React, { useState } from 'react';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
// Importing Router package!
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importing Functions!
import { loginUser } from '../../Controller/Requests/Function';

const Home = () => {

    // Window Height state handler!
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);

    // Footer state handler!
    const [footer, setFooter] = useState();

    // Login Key Event Handler!
    async function handleLogin(data, id) {
        if (data.key === "Enter") {
           const result = await loginUser(data.target.value, id);
           console.log(result);
        }
    }

    // Cs -> https://179e-2409-4071-2116-4233-1873-aa15-e6c4-9010.ngrok.io"

    return (
        <div>
            <Router>
                <div className="app-container">
                    <Routes>
                        <Route path="/:id/login" exact element={<Login handleLogin = {(data, id) => handleLogin(data, id)} />} />
                        <Route path="/:auth/main" exact element={<Main windowHeight={innerHeight} footerHeight={footer} />} />
                    </Routes>
                </div>
                <Footer footer={setFooter} />
            </Router>
        </div>
    )
}

export default Home;