import React from "react";

const InputBox = (props) => {
    return(
        <div>
            <input placeholder = {props.placeholder} className = {props.className} onChange = {(e) => props.onChange(e.target.value)} />
        </div>
    )
}

export default InputBox;