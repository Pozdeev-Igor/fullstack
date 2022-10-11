import React, {useEffect, useState} from 'react';
import {useUser} from "../UserProvider/UserProvider";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import ajax from "../services/fetchServise";
import jwt_decode from "jwt-decode";

const PersonalDashboard = (props) => {
    const {getUsersData} = props;
    const user = useUser();
    const navigate = useNavigate();
    const [adverts, setAdverts] = useState([]);


    useEffect(() => {
        getAdverts();
    }, [adverts])


    async function getAdverts() {
        const advertsData = await ajax(`/api/adverts`, "GET", user.jwt).then((advertsData) => advertsData)
        setAdverts(advertsData);


    };

    return (
        <div>
            <Container className="justify-content-start">
                <Row >
                    {adverts.map((advert) => (

                        <Col key={advert.id}>
                            {
                                (advert.user.username) === (jwt_decode(user.jwt).sub) ?
                                    <Card style={{width: '18rem', cursor: "pointer"}}
                                          onClick={() => navigate(`/adverts/personal/${advert.id}`)}>
                                        <Card.Img variant="top" key={advert.id} src={advert.image}/>
                                        <Card.Body>
                                            <Card.Title>{advert.title}</Card.Title>
                                            <Card.Text>
                                                {advert.description}
                                            </Card.Text>
                                            <Button variant="primary">Go somewhere</Button>
                                        </Card.Body>
                                    </Card>
                                    :
                                    <></>
                            }
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default PersonalDashboard;