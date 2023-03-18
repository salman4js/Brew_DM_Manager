import React from 'react';
import BreadCrumb from './src/BreadCrumb';

const Crumbs = (props) => {

    // Upload file handler!
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        props.uploadFile(file); // Upload the file to the server!
    };

    const handleButtonClick = () => {
        const fileInput = document.getElementById("fileInput");
        fileInput.click();
    };

    return (
        <div className="header-breadcrumb">
            <div className="header-crumb">
                <div class="input-group input-group-sm mb-3" style={{ cursor: 'pointer' }}>
                    <span type="text" class="form-control" aria-label="Text input with dropdown button">
                        {
                            props.crumb.map((option, key) => {
                                return (
                                    <BreadCrumb crumb={option} crumbSelection={(data) => props.crumbSelection(data)} />
                                )
                            })
                        }
                    </span>
                    <div class="input-group-append">
                        <div class="dropdown">
                            <div class="dropbtn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                </svg>
                            </div>
                            <div class="dropdown-content">
                                <div>
                                    <input
                                        type="file"
                                        id="fileInput"
                                        onChange={handleFileUpload}
                                        style={{ display: "none" }}
                                        className="form-control"
                                    />
                                    <div className="btn-light text-center" style={{ padding: '5px' }} onClick={handleButtonClick}>Upload File</div>
                                </div>
                                {
                                    props.actions.map((options, key) => {
                                        return (
                                            <div>
                                                <div className="btn-light text-center" style={{ padding: '5px' }}>
                                                    {options}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Crumbs;