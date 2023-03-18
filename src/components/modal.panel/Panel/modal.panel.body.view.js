import React from "react";
import Modal from 'react-bootstrap/Modal';

const PanelBodyView = (props) => {
   return(
    <Modal.Body>
        {props.bodyText}
    </Modal.Body>
   )
}

export default PanelBodyView;