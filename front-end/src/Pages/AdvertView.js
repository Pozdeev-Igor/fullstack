import React, {useEffect, useState} from 'react';
import {useUser} from "../UserProvider/UserProvider";
import {useParams} from "react-router-dom";
import ajax from "../services/fetchServise";
import {Carousel, Col, Container, Row} from "react-bootstrap";
import {MDBBtn, MDBIcon, MDBTypography} from "mdb-react-ui-kit";
import {NumericFormat} from "react-number-format";

const AdvertView = () => {
    const user = useUser();
    const {advertId} = useParams();
    const [imageList, setImageList] = useState([]);
    const [advert, setAdvert] = useState({
        title: "",
        description: "",
        price: "",
        phoneNumber: "",
    });


    useEffect(() => {
        ajax(`/api/adverts/${advertId}`, "GET", user.jwt).then((response) => {
            setAdvert(response);
        })
    }, [advertId, user.jwt]);

    useEffect(() => {
        ajax(`/api/images/${advertId}`, "GET", user.jwt).then((imagesData) => {
            setImageList(imagesData);
        })
    }, [advertId, user.jwt]);


    return (

        <Container className="personal-advert-view">
            <Row>
                <Col> {
                    advert.title ? (
                    <MDBTypography tag='div' className='display-5 pb-3 mb-3 border-bottom' style={{marginLeft: "5%"}}>
                        {advert.title}
                    </MDBTypography>
                    ) : (
                        <MDBTypography tag='div' className='display-5 pb-3 mb-3 border-bottom' style={{marginLeft: "5%"}}>
                            Автор не указал заголовок
                        </MDBTypography>
                    )
                }
                </Col>
            </Row>
            <Carousel className="advert-carousel">
                {imageList.map((image) => (
                    <Carousel.Item interval={3000} key={image.id}>
                        <img
                            className="d-block w-100"
                            src={image.name}
                            alt={image.id}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
            <Row>
                <Col lg="8" md="8" sm="6" xs="4" style={{marginLeft: "5%"}}>
                    {
                        advert.description ? (
                    <h5 className='pb-3 mb-3 border-bottom'>
                        {advert.description}
                    </h5>
                        ) : (
                            <h5 className='pb-3 mb-3 border-bottom'>
                                автор не составил описание объявлению
                            </h5>
                        )
                    }

                    {
                        (advert.price !== "" && advert.price !== null) ? (
                    <NumericFormat
                        className="numericFormat"
                        suffix=" ₽"
                        type="text"
                        value={advert.price}
                        thousandSeparator=" "
                    />
                        ) : (
                            <h5 className='pb-3 mb-3 border-bottom' >
                                Цена не указана
                            </h5>
                        )

                    }



                </Col>
                <Col lg="2" md="4" sm="6">
                    <h5>связаться с автором:</h5>
                </Col>
                <Col>
                    <MDBBtn
                        floating
                        className='m-1'
                        style={{ backgroundColor: '#5cb85c' }}
                        href='#!'
                        role='button'
                    >
                        <MDBIcon fas icon="phone" />
                    </MDBBtn>
                </Col>
                <Col>
                    <MDBBtn
                        floating
                        className='m-1'
                        style={{ backgroundColor: '#3b5998' }}
                        href='#!'
                        role='button'
                    >
                        <MDBIcon far icon="comment" />
                    </MDBBtn>
                </Col>
            </Row>
        </Container>
    );
};

export default AdvertView;