import React from 'react';
import BreadCrumb from './src/BreadCrumb';

const Crumbs = (props) => {

    return (
        <div className="header-breadcrumb">
            <div className="header-crumb">
                <div class="input-group input-group-sm mb-3" style={{ cursor: 'pointer' }}>
                    <span type="text" class="form-control" aria-label="Text input with dropdown button">
                        {
                            props.crumb.map((option,key) => {
                                return(
                                    <BreadCrumb crumb = {option} crumbSelection = {(data) => props.crumbSelection(data)}  />
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
                                {
                                    props.actions.map((options, key) => {
                                        return (
                                            <a style={{ color: "black", cursor: 'pointer' }}>{options}</a>
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