import React, {useRef, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';

const Footer = (props) => {

    // Defining navigate instance
    let navigate = useNavigate();

    // Defining the reference instance!
    const footerRef = useRef(null);

    // Path Navigation!
    function navigatePath(){
        navigate("/main", {replace: true})
    }

    // Constructor
    useEffect(() => {
        props.footer(footerRef.current.offsetHeight);
    }, [])

    return (
        <div className="main-footer" ref = {footerRef}>
            <div className="icon-container" style = {{width: '42px'}} onClick = {() => navigatePath()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="62" fill="currentColor" class="bi bi-folder-fill" viewBox="0 0 16 16">
                    <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
                </svg>
            </div>
        </div>
    )
}

export default Footer;