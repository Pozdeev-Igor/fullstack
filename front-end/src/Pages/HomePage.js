import React, {useEffect, useState} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useUser} from "../UserProvider/UserProvider";
import LoginModal from "../Modal/LoginModal";
import ajax from "../services/fetchServise";
import jwt_decode from "jwt-decode";
import {NumericFormat} from 'react-number-format';
import {MDBSpinner} from "mdb-react-ui-kit";

const HomePage = () => {
    const navigate = useNavigate();
    const user = useUser();

    const [adverts, setAdverts] = useState([]);
    const [images, setImages] = useState([]);

    const [show, setShow] = useState(() => false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [isLoading, setIsLoading] = useState(false);


    function getAdverts() {
        ajax(`/api/adverts`, "GET", user.jwt).then((advertsData) => setAdverts(advertsData));
    };

    function getImages() {
        setIsLoading(!isLoading)
        ajax("/api/images", "GET", user.jwt).then((imageData) => {
            setImages(imageData)
            setIsLoading(false);
        });
    }


    useEffect(() => {
        // ajax(`/api/adverts`, "GET", user.jwt).then((advertsData) => setAdverts(advertsData));
        getAdverts();
        getImages();

    }, [user.jwt]);

    // useEffect(() => {
    //     setIsLoading(true)
    //     ajax("/api/images", "GET", user.jwt).then((imageData) => setImages(imageData));
    //     setIsLoading(false)
    // }, [user.jwt]);


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

                        <Container className="row-cols-lg-1" style={{marginBottom: "30px"}}>
                            <Row>
                                {adverts.map((advert) => (
                                    advert.status === "Объявление на проверке" ?
                                        <></>
                                        :
                                        <Col>
                                            <Card
                                                key={advert.id}
                                                style={{width: '18rem', marginTop: '30px', cursor: "pointer"}}
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
                                                            <NumericFormat
                                                                prefix="₽ "
                                                                type="text"
                                                                value={advert.price}
                                                                style={{
                                                                    borderRadius: "15px",
                                                                    backgroundColor: "#1266F1",
                                                                    color: "white",
                                                                    borderColor: "#1266F1",
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
                                        </Col>
                                ))}
                            </Row>
                        </Container>
                    )

            }
            <LoginModal show={show} handleClose={handleClose} handleShow={handleShow}/>

        </div>
    );
};

export default HomePage;
