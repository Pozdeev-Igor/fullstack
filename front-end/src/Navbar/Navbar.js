import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import logo from "../static/img/logo.png"
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import ajax from "../services/fetchServise";
import {useUser} from "../UserProvider/UserProvider";
import LoginModal from "../Modal/LoginModal";
import jwt_decode from "jwt-decode";
import {MDBBadge, MDBIcon} from "mdb-react-ui-kit";


function BasicExample(props) {

    const navigate = useNavigate();
    const user = useUser();
    const [usersName, setUsersName] = useState(null);
    const [id, setId] = useState(null);
    const [roles, setRoles] = useState([]);
    const [messages, setMessages] = useState([]);

    const [show, setShow] = useState(() => false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        setRoles(getRolesFromJWT());
    }, [user.jwt]);

    function getRolesFromJWT() {
        if (user.jwt) {
            const decodedJwt = jwt_decode(user.jwt);
            return decodedJwt.authorities;
        }
        return [];
    };

    function getUsersData() {
        if (user.jwt !== "") {
            ajax("/api/users", "GET", user.jwt).then(usersData => {
                if (usersData) {
                    setUsersName(usersData.name);
                    setId(usersData.id);
                } else {
                    return null;
                }
            })
        }
    };

    useEffect(() => {
        getUsersData();
    }, [user.jwt]);


    function toLogOut() {
        localStorage.removeItem("jwt");
        navigate("/");
        window.location.reload();
    }

    function createAdvert() {
        ajax("/api/adverts", "POST", user.jwt).then((advert) => {
            if (user.jwt && usersName !== null) {
                navigate(`/adverts/new/${advert.id}`);
            } else handleShow();

        })
    }


useEffect(() => {
    ajax(`/api/comments/messages?usersName=${usersName}`, 'GET', user.jwt).then(response =>
    setMessages(response.filter((mess) => { return mess.status === "Не просмотрено"} )));
}, [user.jwt, usersName, messages])

    const toMessages = () => {
        console.log(messages)
        navigate(`/users/${id}/messages`, {state: {messages: messages}})
    }

    return (
        <Navbar bg="white" expand="lg">
            <Container>
                <span style={{cursor: "pointer"}}>
                    <Navbar.Brand onClick={() => navigate("/")}>
                        <img
                            src={logo}
                            height="70"
                            className="d-inline-block align-top"
                            alt="App logo"/>
                    </Navbar.Brand>
                </span>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {roles.find((role) => role === "ROLE_ADMIN") ? (
                            <Nav.Link onClick={() => {
                                navigate("/admin")
                            }}>ADMIN</Nav.Link>
                        ) : (
                            <Nav.Link onClick={() => createAdvert()}>New Advert</Nav.Link>
                        )

                        }
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">

                    {user.jwt && usersName !== null ? (

                        <NavDropdown title={usersName} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() => {
                                navigate(`/users/adverts`)
                            }}>
                                <div className='d-flex justify-content-between'>
                                    My adverts
                                    <MDBIcon fas icon="photo-video"/>
                                </div>
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => {
                                navigate(`/users/${id}`)
                            }}>
                                <div className='d-flex justify-content-between'>
                                    Account
                                    <MDBIcon far icon="user"/>
                                </div>
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => {
                                navigate(`/adverts/favorite/${id}`)
                            }}>
                                <div className='d-flex justify-content-between'>
                                    Favorites
                                    <MDBIcon far icon="heart" />
                                </div>
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={toMessages}>
                                <div className='d-flex justify-content-between'>
                                    Messages
                                    <div>
                                        <MDBIcon far icon="envelope"/>
                                        {Array.isArray(messages) && messages.length > 0 ?
                                    <MDBBadge color='danger' notification pill>
                                        {messages.length}
                                    </MDBBadge>
                                            :
                                            <></>
                                        }
                                    </div>
                                </div>
                            </NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item onClick={() => {
                                toLogOut()
                            }}>
                                Log out
                            </NavDropdown.Item>
                        </NavDropdown>
                    ) : (

                        <Navbar.Text>
                            <span style={{cursor: "pointer"}} onClick={() => {
                                handleShow()
                            }}>Sign In</span>
                        </Navbar.Text>
                    )}
                </Navbar.Collapse>
            </Container>
            <LoginModal show={show} handleClose={handleClose} handleShow={handleShow}/>
        </Navbar>
    );
}

export default BasicExample;