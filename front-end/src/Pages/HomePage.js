import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useUser} from "../UserProvider/UserProvider";
import LoginModal from "../Modal/LoginModal";
import ajax from "../services/fetchServise";
import testPicture from "../static/img/testPicture.jpg";

const HomePage = () => {
    const navigate = useNavigate();
    const user = useUser();

    const [adverts, setAdverts] = useState([]);

    const [show, setShow] = useState(() => false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    async function getAdverts() {
        const advertsData = await ajax(`/api/adverts`, "GET", user.jwt).then((advertsData) => advertsData)
        setAdverts(advertsData);

        // console.log(advertsData)

    };

    useEffect(() => {
        getAdverts();
    }, []);

    return (
        <div>
            <Container className="row-cols-lg-1">
                <Row>
                    {adverts && adverts.map((advert) => (
                        <Col className="" key={advert.id}>
                            <span style={{cursor:"pointer"}}>
                                <Card style={{width: '18rem'}} onClick={() => navigate(`/adverts/${advert.id}`)}>
                                    <Card.Img variant="top" src={testPicture}/>
                                    <Card.Body>
                                        <Card.Title>{advert.title}</Card.Title>
                                        <Card.Text>
                                            {advert.description}
                                        </Card.Text>
                                        <Button variant="primary">Go somewhere</Button>
                                    </Card.Body>
                                </Card>
                            </span>
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
