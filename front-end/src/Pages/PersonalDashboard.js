import React, {useEffect, useState} from 'react';
import {useUser} from "../UserProvider/UserProvider";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import ajax from "../services/fetchServise";
import jwt_decode from "jwt-decode";
import {MDBBadge} from "mdb-react-ui-kit";

const PersonalDashboard = (props) => {
    const {getUsersData} = props;
    const user = useUser();
    const navigate = useNavigate();
    const [adverts, setAdverts] = useState([]);


    function getAdverts() {
        ajax(`/api/adverts`, "GET", user.jwt).then((advertsData) => setAdverts(advertsData));
        console.log(adverts)
    };

    useEffect(() => {
        getAdverts();

    }, [])

    return (
        <div>
            <Container className="justify-content-start" style={{}}>
                <Row>
                    {adverts.map((advert) => (

                        <Col key={advert.id}>
                            {
                                (advert.user.username) === (jwt_decode(user.jwt).sub) ?
                                    <Card style={{width: '18rem', cursor: "pointer", marginTop: "30px", marginBottom: "30px"}}
                                          onClick={() => navigate(`/adverts/personal/${advert.id}`)}>
                                        <Card.Img variant="top" key={advert.id} src={advert.image}/>
                                        <Card.Body>
                                            <Card.Title>{advert.title}</Card.Title>
                                            {advert.price !== null ?
                                                <Card.Text>
                                                    <MDBBadge  pill color="primary" className='ms-lg-1' >
                                                        <h5 style={{marginTop:"7px"}}>
                                                            ₽ {advert.price}
                                                        </h5>
                                                    </MDBBadge>
                                                </Card.Text>
                                                :
                                                <Card.Text>
                                                    Цена не указана
                                                </Card.Text>
                                            }
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