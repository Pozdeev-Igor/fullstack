import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useUser} from "../UserProvider/UserProvider";
import LoginModal from "../Modal/LoginModal";

const HomePage = () => {
    const navigate = useNavigate();
    const user = useUser();


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const redirect = useEffect(() => {
    //     if (user.jwt)
    //     navigate("/adverts")
    //     console.log(user)
    // },[user]);


        // useEffect(() =>  {
        //     if (localStorage.getItem("jwt") === "") {
        //         localStorage.clear();
        //         handleShow();
        //     }
        // });


    return (
        <div>
            <h1>Home page</h1>
            <Button variant="link"  onClick={() => user.jwt ? (navigate("/adverts")) : handleShow() }>ADVERTS</Button>



            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Example textarea</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default HomePage;

{/*//<Button variant="link" onClick={() => (navigate("/adverts")) } on>ADVERTS</Button>*/}