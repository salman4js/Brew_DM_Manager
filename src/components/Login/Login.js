import React from 'react';
import { useParams, useNavigate } from "react-router-dom";

// Importing Functions!
import { loginUser } from '../../Controller/Requests/Function';

const Login = (props) => {

    // Navigate Instance!
    let navigate = useNavigate();

    // Retrieving ID
    const { id } = useParams();

    // Login Key Event Handler!
    async function handleLogin(data, id) {
        if (data.key === "Enter") {
           const result = await loginUser(data.target.value, id);
           if(result.status === 200){
            navigate(`/${id}/desktop`, {replace: true});
           } else {
            // TODO: Error Handling!
           }
        }
    }

    return (
        <div className="container">
            <div className="text-center">
                <div className="login-section">
                    <div className="card-login-container">
                        <div>
                            <label className="login-section-label">Enter Your Password To Unlock</label>
                        </div>
                        <div>
                            <input type="password" placeholder="Enter Your Password" className="form-control form-control-sm" onKeyDown={(e) => handleLogin(e, id)} />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;