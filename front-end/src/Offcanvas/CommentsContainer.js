import React from 'react';
import Offcanvas from "react-bootstrap/Offcanvas";

const CommentsContainer = (props) => {
    const {show, handleClose, handleShow} = props

    return (
        <Offcanvas placement="end" scroll="true" backdrop="false" show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Комментарии</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>

            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default CommentsContainer;