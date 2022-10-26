import React, {useEffect, useState} from 'react';
import {Col, Container, Form, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import LoginModal from "../Modal/LoginModal";
import {PatternFormat} from 'react-number-format';
import {MDBBtn, MDBInput, MDBTypography, MDBValidation, MDBValidationItem} from "mdb-react-ui-kit";

const SignUpPage = () => {

    const navigate = useNavigate();
    const [formValue, setFormValue] = useState({
        name: '',
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });

    const onChange = (e: any) => {
        setFormValue({...formValue, [e.target.name]: e.target.value});
    };

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
        if (formValue.confirmPassword === '' ||
            formValue.password === '' ||
            formValue.name === '' || formValue.email === '' || formValue.username === '') {
            return null;
        } else {
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
    }

    useEffect(() => {
        console.log(localStorage.getItem('jwt') !== "\"\"")
        if (window.location.href === 'http://localhost:3000/registration' && localStorage.getItem('jwt') !== "\"\"") {
            window.location.reload();
        }
    })

    return (
        <div
            style={{backgroundImage: "url(https://images.wallpaperscraft.com/image/single/clouds_sky_porous_133455_1920x1080.jpg)"}}>
            <Container
                className="signUpContainer" style={{width: "600px", paddingBottom: '30px'}}>
                <Row className="justify-content-center">
                    <MDBTypography className='text-muted text-center mt-3'>
                        Please fill in this form to create an account
                    </MDBTypography>
                    <Col md="8" lg="6" className='mt-3'>
                        <MDBValidation>
                            <MDBValidationItem feedback='Please input your full name' invalid className='col-md-10'>
                                <MDBInput
                                    value={formValue.name}
                                    name='name'
                                    onChange={onChange}
                                    id='validationCustom01'
                                    required
                                    label='Full name'
                                />
                            </MDBValidationItem>
                            <MDBValidationItem feedback='Please input your username' invalid className='col-md-10 mt-4'>
                                <MDBInput
                                    value={formValue.username}
                                    name='username'
                                    onChange={onChange}
                                    id='validationCustom02'
                                    required
                                    label='Username'
                                />
                            </MDBValidationItem>
                            <MDBValidationItem feedback='Please input your email' invalid className='col-md-10 mt-4'>
                                <MDBInput
                                    value={formValue.email}
                                    name='email'
                                    onChange={onChange}
                                    id='validationCustom03'
                                    required
                                    label='Email'
                                />
                            </MDBValidationItem>
                            <MDBValidationItem className='col-md-10 mt-4' feedback='Please provide a valid city.'
                                               invalid>
                                <PatternFormat
                                    format="+7 (###) ### ## ##"
                                    name='phoneNumber'
                                    style={{
                                        width: '100%',
                                        borderRadius: '4px',
                                        borderWidth: '1px',
                                        borderColor: 'lightgray',
                                        height: '38px',
                                        backgroundColor: 'whitesmoke'
                                    }}
                                    allowEmptyFormatting mask="*"
                                    value={formValue.phoneNumber}
                                    required
                                    onChange={onChange}/>
                            </MDBValidationItem>
                            <MDBValidationItem feedback='Please input password' invalid className='col-md-10 mt-4'>
                                <MDBInput
                                    value={formValue.password}
                                    type='password'
                                    name='password'
                                    onChange={onChange}
                                    id='validationCustom04'
                                    required
                                    label='password'
                                />
                            </MDBValidationItem>
                            {(formValue.confirmPassword !== "" && formValue.confirmPassword !== formValue.password) ?
                                (<MDBValidationItem feedback='Please confirm password' invalid
                                                    className='col-md-10 mt-4'>
                                        <MDBInput
                                            value={formValue.confirmPassword}
                                            type='password'
                                            name='confirmPassword'
                                            onChange={onChange}
                                            id='validationCustom05'
                                            required
                                            label='Пароли не совпадают!'
                                        />
                                    </MDBValidationItem>
                                ) : (

                                    <MDBValidationItem feedback='Please confirm password' invalid
                                                       className='col-md-10 mt-4'>
                                        <MDBInput
                                            value={formValue.confirmPassword}
                                            type='password'
                                            name='confirmPassword'
                                            onChange={onChange}
                                            id='validationCustom05'
                                            required
                                            label='Confirm password'
                                        />
                                    </MDBValidationItem>
                                )}
                            <div className='col-12 mt-5 space-between'>
                                {(formValue.confirmPassword === "" || formValue.confirmPassword !== formValue.password) ?
                                    <MDBBtn
                                        rounded
                                        disabled
                                        variant="primary"
                                        size="sm"
                                        type="submit"
                                        onClick={() => sendSignupRequest()}
                                    >
                                        Submit
                                    </MDBBtn>
                                    :
                                    <MDBBtn
                                        rounded
                                        variant="primary"
                                        size="sm"
                                        type="submit"
                                        onClick={() => sendSignupRequest()}
                                    >
                                        Submit
                                    </MDBBtn>
                                }
                            </div>
                        </MDBValidation>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default SignUpPage;