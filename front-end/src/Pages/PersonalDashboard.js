import React, {useEffect, useState} from 'react';
import {useUser} from "../UserProvider/UserProvider";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import ajax from "../services/fetchServise";
import jwt_decode from "jwt-decode";
import {MDBBadge, MDBSpinner} from "mdb-react-ui-kit";
import {NumericFormat} from "react-number-format";

const PersonalDashboard = (props) => {
    const {getUsersData} = props;
    const user = useUser();
    const navigate = useNavigate();
    const [adverts, setAdverts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    function getAdverts() {
        setIsLoading(!isLoading)
        ajax(`/api/adverts`, "GET", user.jwt).then((advertsData) => {
            setIsLoading(false);
            setAdverts(advertsData)
        });
    };

    useEffect(() => {
        getAdverts();

    }, [])

    return (
        <div>
            {
                isLoading ?
                    (
                        <div className='d-flex justify-content-center'>
                            <MDBSpinner grow className='mx-2' style={{width: '3rem', height: '3rem'}} color="primary">
                                <span className='visually-hidden'>Loading...</span>
                            </MDBSpinner>
                            <MDBSpinner grow className='mx-2' style={{width: '3rem', height: '3rem'}} color="primary">
                                <span className='visually-hidden'>Loading...</span>
                            </MDBSpinner>
                            <MDBSpinner grow className='mx-2' style={{width: '3rem', height: '3rem'}} color="primary">
                                <span className='visually-hidden'>Loading...</span>
                            </MDBSpinner>
                        </div>
                    ) : (

                        <Container className="justify-content-start" style={{}}>
                            <Row>
                                {adverts.map((advert) => (

                                    <Col key={advert.id}>
                                        {
                                            (advert.user.username) === (jwt_decode(user.jwt).sub) ?
                                                <Card style={{
                                                    width: '18rem',
                                                    cursor: "pointer",
                                                    marginTop: "30px",
                                                    marginBottom: "30px"
                                                }}
                                                      onClick={() => navigate(`/adverts/personal/${advert.id}`)}>
                                                    <Card.Img variant="top" key={advert.id} src={advert.image}/>
                                                    <Card.Body>
                                                        <Card.Title>{advert.title}</Card.Title>
                                                        {advert.price !== null ?
                                                            <Card.Text>
                                                                <NumericFormat
                                                                    prefix="₽ "
                                                                    type="text"
                                                                    value={advert.price}
                                                                    style={{
                                                                        borderRadius: "15px",
                                                                        backgroundColor: "rgb(2, 117, 216)",
                                                                        color: "white",
                                                                        borderColor: "rgb(2, 117, 216)",
                                                                        textAlign: "center",
                                                                        cursor:"pointer"
                                                                    }}
                                                                    thousandSeparator=" "
                                                                />
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
                    )
            }
        </div>
    );
};

export default PersonalDashboard;