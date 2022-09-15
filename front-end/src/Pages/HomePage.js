import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useUser} from "../UserProvider/UserProvider";
import LoginModal from "../Modal/LoginModal";

const HomePage = () => {
    const navigate = useNavigate();
    const user = useUser();

    const [show, setShow] = useState(() => false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <h1>Home page</h1>
            <Button variant="link" onClick={() => user.jwt ? (navigate("/adverts")) : (handleShow())}>ADVERTS</Button>
            <LoginModal show={show} handleClose={handleClose} handleShow={handleShow}/>
        </div>
    );
};

export default HomePage;
