import React from 'react';
import {useParams} from "react-router-dom";

const Login = (props) => {

    // Retrieving ID
    const { id } = useParams();


  return (
    <div className = "container">
        <div className = "text-center">
            <div className = "login-section">   
               <div className = "card-login-container">
                    <div>
                        <label className = "login-section-label">Enter Your Password To Unlock</label>
                    </div>
                    <div>
                        <input type = "password" placeholder = "Enter Your Password" className = "form-control form-control-sm" onKeyDown = {(e) => props.handleLogin(e, id)} />
                    </div>
                    
               </div>
            </div>
        </div>
    </div>
  )
}

export default Login;