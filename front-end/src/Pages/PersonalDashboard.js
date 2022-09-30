import React, {useEffect, useState} from 'react';
import {useUser} from "../UserProvider/UserProvider";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import testPicture from "../static/img/testPicture.jpg"
import {useNavigate} from "react-router-dom";
import ajax from "../services/fetchServise";

const PersonalDashboard = (props) => {
    const {getUsersData} = props;
    const user = useUser();
    const navigate = useNavigate();
    const [adverts, setAdverts] = useState([]);


    useEffect(() => {
        getAdverts();
    }, [])


    async function getAdverts() {
        const advertsData = await ajax(`/api/users/adverts`, "GET", user.jwt).then((advertsData) => advertsData)
        setAdverts(advertsData);

        // console.log(advertsData)

    };

    return (
        <div>
            <Container className="row-cols-lg-1">
                <Row>
                    {adverts && adverts.map((advert) => (
                        <Col className="" key={advert.id}>
                            <a href={`/adverts/${advert.id}`}>
                                <Card style={{width: '18rem'}} >
                                    <Card.Img variant="top" src={testPicture}/>
                                    <Card.Body>
                                        <Card.Title>{advert.title}</Card.Title>
                                        <Card.Text>
                                            {advert.description}
                                        </Card.Text>
                                        <Button variant="primary">Go somewhere</Button>
                                    </Card.Body>
                                </Card>
                            </a>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default PersonalDashboard;