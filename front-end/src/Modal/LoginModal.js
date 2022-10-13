import React, {useState} from 'react';
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {useUser} from "../UserProvider/UserProvider";
import {useNavigate} from "react-router-dom";

const LoginModal = (props) => {

    const user = useUser();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {show, handleClose, handleShow} = props

    function handleSignUp () {
        navigate("/registration");
        handleClose();
    }

    function sendLoginRequest(e) {
        const reqBody = {
            username: username,
            password: password
        };

        fetch("api/auth/login", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "post",
            body: JSON.stringify(reqBody),
        })
            .then((response) => {
                if (response.status === 200) {
                    return Promise.all([response.json(), response.headers]);
                } else return Promise.reject("Invalid login attempt");
            })
            .then(([body, headers]) => {
                user.setJwt(headers.get("authorization"));
            })
            .catch((message) => {
                alert(message);
            });
        handleClose();
        // navigate("/")
    }

    return (
        <Modal show={show} onHide={handleClose} style={{backdropFilter: "blur(5px)"}}>
            <Modal.Header closeButton>
                <Modal.Title><p>Login</p></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="fs-4">Username</Form.Label>
                        <Form.Control size="lg"
                                      type="text"
                                      placeholder="Enter your username"
                                      value={username}
                                      onChange={(e) => setUsername(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className="fs-4">Password</Form.Label>
                        <Form.Control size="lg"
                                      type="password"
                                      placeholder="Enter your password"
                                      value={password}
                                      onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Row className="justify-content-center">
                    <Button variant="link"
                            onClick={() => handleSignUp()}>
                        Sign up
                    </Button>
                </Row>
                <Row className="justify-content-center">

                    <Col className="mt-2 d-flex flex-column gap-5 flex-md-row justify-content-md-between">


                        <Button
                            id="submit"
                            type="button"
                            size="md"
                            onClick={() => sendLoginRequest()}>
                            Login
                        </Button>

                        <Button
                            size="md"
                            variant="secondary"
                            type="button"
                            onClick={handleClose}>
                            Exit
                        </Button>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
    );
};

export default LoginModal;