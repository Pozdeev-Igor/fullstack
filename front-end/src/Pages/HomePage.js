import React, {useEffect, useState} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useUser} from "../UserProvider/UserProvider";
import LoginModal from "../Modal/LoginModal";
import ajax from "../services/fetchServise";
import jwt_decode from "jwt-decode";
import {NumericFormat} from 'react-number-format';

const HomePage = () => {
    const navigate = useNavigate();
    const user = useUser();

    const [adverts, setAdverts] = useState([]);
    const [images, setImages] = useState([]);

    const [show, setShow] = useState(() => false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // async function getAdverts() {
    //     const advertsData = await ajax(`/api/adverts`, "GET", user.jwt).then((advertsData) => advertsData)
    //     setAdverts(advertsData);
    // };

    // async function getImages() {
    //     const imageData = await ajax("/api/images", "GET", user.jwt).then((imageData) => imageData)
    //     setImages(imageData);
    // }

    useEffect(() => {
        ajax(`/api/adverts`, "GET", user.jwt).then((advertsData) => setAdverts(advertsData));
        // getAdverts();
        // getImages();

    }, [user.jwt]);

    useEffect(() => {
        ajax("/api/images", "GET", user.jwt).then((imageData) => setImages(imageData));

    }, [user.jwt]);


    return (
        <div>
            <Container className="row-cols-lg-1" style={{marginBottom: "30px"}}>
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
                                        {advert.price !== null ?
                                            <Card.Text>
                                                {/*<MDBBadge pill color="primary" className='ms-lg-1'>*/}
                                                {/*    <h7 style={{marginTop: "7px"}}>*/}

                                                        <NumericFormat
                                                            prefix="₽ "
                                                            type="text"
                                                            value={advert.price}
                                                            style={{borderRadius:"15px", backgroundColor:"rgb(2, 117, 216)", color:"white", borderColor:"rgb(2, 117, 216)", textAlign:"center"}}
                                                            thousandSeparator=" "
                                                            // decimalSeparator=","
                                                        />
                                                    {/*</h7>*/}
                                                {/*</MDBBadge>*/}
                                            </Card.Text>
                                            :
                                            <Card.Text>
                                                Цена не указана
                                            </Card.Text>
                                        }
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
