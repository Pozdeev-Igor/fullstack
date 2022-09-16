import {useUser} from "../UserProvider/UserProvider";
import {useState} from "react";
import ajax from "../services/fetchServise";
import {Navigate} from "react-router-dom";
import {Button, Spinner} from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

const PrivateRoute = (props) => {

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
        return <Navigate to="/login"/>
    }

    return isLoading ? (

            <Skeleton width={"570px"} height={"45px"} />

    ) : isValid === true ? (
        children
    ) : (
        <Navigate to="/login"/>
    );
};

export default PrivateRoute;