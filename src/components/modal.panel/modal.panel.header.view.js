import React from "react";
import Modal from 'react-bootstrap/Modal';
import PanelFooter from "./Panel/moda.panel.footer.view";
import PanelBodyView from "./Panel/modal.panel.body.view";

const PanelView = (props) => {

    return(
        <Modal
            show = {props.show}
            onHide = {props.onHide}
        >
            <Modal.Header closeButton>
                {props.header}
            </Modal.Header>
            {props.body && (
                <PanelBodyView bodyText = {props.bodyText} />
            )}
            {props.footer && (
                <PanelFooter variant1 = {props.footerAttr.variant1} variant2 = {props.footerAttr.variant2}
                btnText1 = {props.footerAttr.btnText1} btnText2 = {props.footerAttr.btnText2} onHide = {() => props.onHide()}
                />
            )}
        </Modal>
    )
}

export default PanelView;