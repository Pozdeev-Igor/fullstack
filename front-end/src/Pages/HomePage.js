import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useUser} from "../UserProvider/UserProvider";
import LoginModal from "../Modal/LoginModal";
import ajax from "../services/fetchServise";
import testPicture from "../static/img/testPicture.jpg";
import jwt_decode from "jwt-decode";

const HomePage = () => {
    const navigate = useNavigate();
    const user = useUser();
    let decodedJwt = null;

    const [adverts, setAdverts] = useState([]);

    const [show, setShow] = useState(() => false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    async function getAdverts() {
        const advertsData = await ajax(`/api/adverts`, "GET", user.jwt).then((advertsData) => advertsData)
        setAdverts(advertsData);


    };

    useEffect(() => {
        getAdverts();
        console.log(adverts)
    }, []);

    return (
        <div>
            <Container className="row-cols-lg-1">
                <Row>
                    {adverts && adverts.map((advert) => (
                        <Col className="" key={advert.id}>
                            <Card style={{width: '18rem', marginTop: '30px', cursor: "pointer"}} onClick={() => {
                                (user.jwt && advert.user.username === jwt_decode(user.jwt).sub) ?
                                    navigate(`/adverts/${advert.user.id}/${advert.id}`)
                                    :
                                    handleShow();
                            }}>
                                <Card.Img variant="top" src={testPicture}/>
                                <Card.Body>
                                    <Card.Title>{advert.title}</Card.Title>
                                    <Card.Text>
                                        {advert.description}
                                    </Card.Text>
                                    <Button variant="primary">Go somewhere</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/*<Button variant="link" onClick={() => user.jwt ? (navigate("/adverts")) : (handleShow())}>ADVERTS</Button>*/}
            <LoginModal show={show} handleClose={handleClose} handleShow={handleShow}/>
        </div>
    );
};

export default HomePage;
