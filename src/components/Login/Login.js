import React, {useState} from 'react';
import { useParams, useNavigate } from "react-router-dom";

// Importing Functions!
import { loginUser } from '../../Controller/Requests/Function';
import PanelView from '../modal.panel/modal.panel.header.view';

const Login = (props) => {

    // Navigate Instance!
    let navigate = useNavigate();

    // Retrieving ID
    const { id } = useParams();

    // Error Handling State!
    const [error, setError] = useState({
        show : false,
        header: undefined,
        body: false,
        bodyText: undefined,
        footer: false,
        footerAttr: {
            variant1: "secondary",
            variant2: "primary",
            btnText1: "Cancel",
            btnText2: "OK"
        },
        onHide : function(){
            changeErrorState();
        } 
    })

    // Change Error State!
    function changeErrorState(){
        setError({
            ...error,
            show: false
        })
    }

    // Login Key Event Handler!
    async function handleLogin(data, id) {
        if (data.key === "Enter") {
           const result = await loginUser(data.target.value, id);
           if(result.status === 200){
            navigate(`/${id}/desktop`, {replace: true});
           } else {
            // Error Handling!
            setError({
                ...error,
                show: !result.data.success,
                header: "Error Logging In!",
                body: !result.data.success,
                bodyText: result.data.message,
                footer: result.data.success,
            })
           }
        }
    }

    return (
        <div className="container">
            {
                error ? (
                    <PanelView onHide = {error.onHide} show = {error.show} header = {error.header} body = {error.body} bodyText = {error.bodyText} footer = {error.footer} footerAttr = {error.footerAttr}   />
                ) : (
                    null
                )
            }
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