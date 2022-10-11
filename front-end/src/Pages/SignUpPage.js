import React, {useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import LoginModal from "../Modal/LoginModal";
import { PatternFormat } from 'react-number-format';

const SignUpPage = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [show, setShow] = useState(() => false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function sendSignupRequest(e) {

        const reqBody = {
            name: name,
            username: username,
            email: email,
            password: password,
            phoneNumber: phoneNumber,
            confirmPassword: confirmPassword,
        };

        fetch("api/auth/registration", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "post",
            body: JSON.stringify(reqBody),
        })
            .then(response => response.json());
        alert("check your mailbox");

        navigate("/");
    }

    return (
        <div
            style={{backgroundImage: "url(https://images.wallpaperscraft.com/image/single/clouds_sky_porous_133455_1920x1080.jpg)"}}>
            <Container style={{
                marginTop: "30px",
                boxShadow: "2px 3px 4px rgba(0,0,0,.5)",
                borderRadius: "25px",
                width: "600px",
                backgroundColor: "white"
            }}>
                <Form>
                    <Row className="justify-content-center">
                        <Col md="8" lg="6">
                            <Form.Text style={{color: "ActiveBorder"}}><h1>Sign up</h1></Form.Text>
                            <Form.Text className="text-muted">Please fill in this form to create an account.</Form.Text>
                        </Col>
                    </Row>
                    <Row className="justify-content-center" style={{marginTop: "20px"}}>
                        <Col md="8" lg="6">

                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Full name</Form.Label>
                                <Form.Control
                                    value={name}
                                    type="text"
                                    placeholder="Enter your full name"
                                    onChange={(e) => setName(e.target.value)}/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col md="8" lg="6">
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    value={username}
                                    type="text"
                                    placeholder="Enter username"
                                    onChange={(e) => setUsername(e.target.value)}/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col md="8" lg="6">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    value={email}
                                    type="email"
                                    placeholder="Enter email"
                                    onChange={(e) => setEmail(e.target.value)}/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col md="8" lg="6">
                            <Form.Group className="mb-3" controlId="formBasicPhone">
                                <Form.Label>Phone number</Form.Label>

                                <PatternFormat
                                    format="+7 (###) ### ## ##"
                                    allowEmptyFormatting mask="*"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}/>
                                {/*<Form.Control*/}
                                {/*    value={phoneNumber}*/}
                                {/*    type="text"*/}
                                {/*    placeholder="+71234567890"*/}
                                {/*    onChange={(e) => setPhoneNumber(e.target.value)}/>*/}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col md="8" lg="6">
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    value={password}
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}/>
                            </Form.Group>

                            {(confirmPassword !== "" && confirmPassword !== password) ?
                                (<Form.Group className="mb-3" controlId="formBasicConfirmPassword" >
                                    <Form.Label style={{color:"red"}}>Пароли не совпадают!</Form.Label>
                                    <Form.Control
                                        style={{borderColor:"red", borderWidth:"3px"}}
                                        value={confirmPassword}
                                        type="password"
                                        placeholder="Password"
                                        onChange={(e) => setConfirmPassword(e.target.value)}/>
                                </Form.Group>
                                ):(

                            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    value={confirmPassword}
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}/>
                            </Form.Group>
                                )}
                            <Row className="justify-content-center">
                                <Col
                                    className="mt-3 mb-2 d-flex flex-column gap-3 flex-md-row justify-content-md-between">
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Remember me"/>
                                    </Form.Group>
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        type="submit"
                                        onClick={() => sendSignupRequest()}>
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Container>
            <LoginModal show={show} handleClose={handleClose} handleShow={handleShow}/>
        </div>
    );
};

export default SignUpPage;