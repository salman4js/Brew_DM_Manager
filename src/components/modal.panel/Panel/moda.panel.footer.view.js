import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const PanelFooter = (props) => {
    return(
        <Modal.Footer>
            <Button variant = {props.variant1} onClick = {props.onHide}>{props.btnText1}</Button>
            <Button variant = {props.variant2} onClick = {props.onSuccess} > {props.btnText2}</Button>
        </Modal.Footer>
    )
}

export default PanelFooter;