import React from 'react';
import Offcanvas from "react-bootstrap/Offcanvas";
import Comment from "../Comment/Comment";
import {
    MDBBtn, MDBCardImage,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog,
    MDBModalHeader,
    MDBModalTitle, MDBTextArea
} from "mdb-react-ui-kit";
import {ModalFooter} from "react-bootstrap";

const CommentsContainer = (props) => {
    const {show, handleClose, handleShow} = props

    return (
        // <Offcanvas placement="end" scroll="true" backdrop="false" show={show} onHide={handleClose}>
        //     <Offcanvas.Header closeButton>
        //         <Offcanvas.Title>Комментарии</Offcanvas.Title>
        //     </Offcanvas.Header>
        //     <Offcanvas.Body>
        //
        //     </Offcanvas.Body>
        // </Offcanvas>


    <>
        <MDBModal staticBackdrop show={show} tabIndex='-1' onHide={handleClose} >
            <MDBModalDialog scrollable size='lg'>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Comments</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={handleClose}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                        <Comment/>
                    </MDBModalBody>
                    <ModalFooter className="py-3 border-0"
                                 style={{ backgroundColor: "#f8f9fa" }}>
                        <div className="d-flex flex-start w-100">
                            <MDBCardImage
                                className="rounded-circle shadow-1-strong me-3"
                                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp"
                                alt="avatar"
                                width="40"
                                height="40"
                            />
                            <MDBTextArea label='Message' id='textAreaExample' rows={2} style={{backgroundColor: '#fff'}} wrapperClass="w-100" />
                        </div>
                        <div className="float-end mt-2 pt-1">
                            <MDBBtn size="sm" className="me-1">Post comment</MDBBtn>
                            <MDBBtn outline size="sm">Cancel</MDBBtn>
                        </div>
                    </ModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    </>


    );
};

export default CommentsContainer;