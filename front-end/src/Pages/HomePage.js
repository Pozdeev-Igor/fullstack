import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useUser} from "../UserProvider/UserProvider";
import LoginModal from "../Modal/LoginModal";
import ajax from "../services/fetchServise";
import jwt_decode from "jwt-decode";

const HomePage = () => {
    const navigate = useNavigate();
    const user = useUser();
    let decodedJwt = null;

    const [adverts, setAdverts] = useState([]);
    const [images, setImages] = useState([]);

    const [show, setShow] = useState(() => false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    async function getAdverts() {
        const advertsData = await ajax(`/api/adverts`, "GET", user.jwt).then((advertsData) => advertsData)
        setAdverts(advertsData);
    };

    async function getImages() {
        const imageData = await ajax("/api/images", "GET", user.jwt).then((imageData) => imageData)
        setImages(imageData);
    }

    useEffect(() => {
        getAdverts();
        getImages();
    }, [adverts]);

    return (
        <div>
            <Container className="row-cols-lg-1">
                <Row>
                    {adverts.map((advert) => (
                        advert.status === "Объявление на проверке" ?
                            <></>
                            :
                            <Col>
                                <Card key={advert.id} style={{width: '18rem', marginTop: '30px', cursor: "pointer"}}
                                      onClick={() => {
                                          (user.jwt && advert.user.username === jwt_decode(user.jwt).sub) ?
                                              navigate(`/adverts/${advert.user.id}/${advert.id}`)
                                              :
                                              handleShow();
                                      }}>

                                    <Card.Img key={advert.id} variant="top" src={advert.image}/>
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
            <LoginModal show={show} handleClose={handleClose} handleShow={handleShow}/>
        </div>
    );
};

export default HomePage;
