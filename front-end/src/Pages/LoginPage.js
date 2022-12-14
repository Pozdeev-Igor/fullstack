import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useUser} from "../UserProvider/UserProvider";

const LoginPage = () => {

    const user = useUser();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (user.jwt) navigate("/");
    }, [user]);

    function sendLoginRequest(e) {

        const reqBody = {
            username: username,
            password: password,
        };

        fetch("api/auth/login", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "post",
            body: JSON.stringify(reqBody),
        })
            .then((response) => {
                if (response.status === 200){
                    return Promise.all([response.json(), response.headers]);
               }
                else return Promise.reject("Invalid login attempt");
            })
            .then(([body, headers]) => {
                user.setJwt(headers.get("authorization"));
            })
            .catch((message) => {
                alert(message);
            });
    }
    return (
        <div>

        <a href="/">На главную</a>
        </div>

        // <div style={{
        //     position: "fixed",
        //     top: "0",
        //     left: "0",
        //     width: "100%",
        //     height: "100%",
        // }}>
        //
        //
        //     <Container style={{marginTop: "50px"}}>
        //         <Form>
        //             <Row className="justify-content-center">
        //                 <Col md="8" lg="6">
        //                     <Form.Group className="mb-3" controlId="formBasicEmail">
        //                         <Form.Label className="fs-4">Username</Form.Label>
        //                         <Form.Control size="lg"
        //                                       type="text"
        //                                       placeholder="Enter your username"
        //                                       value={username}
        //                                       onChange={(e) => setUsername(e.target.value)}/>
        //                     </Form.Group>
        //                 </Col>
        //             </Row>
        //
        //             <Row className="justify-content-center">
        //                 <Col md="8" lg="6">
        //                     <Form.Group className="mb-3" controlId="formBasicPassword">
        //                         <Form.Label className="fs-4">Password</Form.Label>
        //                         <Form.Control size="lg"
        //                                       type="password"
        //                                       placeholder="Enter your password"
        //                                       value={password}
        //                                       onChange={(e) => setPassword(e.target.value)}/>
        //                     </Form.Group>
        //                     <Form.Group className="mb-3" controlId="formBasicCheckbox">
        //                     </Form.Group>
        //                 </Col>
        //             </Row>
        //             <Row className="justify-content-center">
        //                 <Col md="8" lg="6"
        //                      className="mt-2 d-flex flex-column gap-3 flex-md-row justify-content-md-between">
        //                     <Button
        //                         id="submit"
        //                         type="button"
        //                         size="lg"
        //                         onClick={() => sendLoginRequest()}
        //                     >
        //                         Login
        //                     </Button>
        //                     <Button size="lg" variant="secondary" type="button" onClick={() => {
        //                         navigate("/");
        //                     }}
        //                     >
        //                         Exit
        //                     </Button>
        //                 </Col>
        //             </Row>
        //
        //         </Form>
        //
        //     </Container>
        // </div>
    );
};

export default LoginPage;