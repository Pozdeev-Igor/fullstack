import {useUser} from "../UserProvider/UserProvider";
import React, {useState} from "react";
import ajax from "../services/fetchServise";
import {Navigate} from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import LoginModal from "../Modal/LoginModal";

const PrivateRoute = (props) => {

    const [show, setShow] = useState(() => false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const user = useUser();
    const [isLoading, setIsLoading] = useState(true);
    const [isValid, setIsValid] = useState(null);
    const {children} = props;

    if (user) {
        ajax(`/api/auth/validate?token=${user.jwt}`, "get", user.jwt).then(
            (isValid) => {
                setIsValid(isValid);
                setIsLoading(false);
            }
        );
    } else {
        return <LoginModal show={show} handleClose={handleClose} handleShow={handleShow}/>
    }

    return isLoading ? (

        <Skeleton width={"570px"} height={"45px"}/>

    ) : isValid === true ? (
        children
    ) : (
        // <Navigate to="/login"/>
        <LoginModal show={show} handleClose={handleClose} handleShow={handleShow}/>
    );
};

export default PrivateRoute;