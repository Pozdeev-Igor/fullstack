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
                <Col> {
                    advert.title ? (
                        <MDBTypography tag='div' className='display-5 pb-3 mb-3 border-bottom'
                                       style={{marginLeft: "5%"}}>
                            {advert.title}
                        </MDBTypography>
                    ) : (
                        <MDBTypography tag='div' className='display-5 pb-3 mb-3 border-bottom'
                                       style={{marginLeft: "5%"}}>
                            Автор не указал заголовок
                        </MDBTypography>
                    )
                }
                </Col>
            </Row>

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
                    <h5 className='pb-3 mb-3 border-bottom'>
                        Цена не указана
                    </h5>
                )

            }
            <Row>
                    <h5 style={{marginTop:"30px"}}>связаться с автором:</h5>
                <Col className="d-grid gap-2 d-md-block">


                        <MDBBtn rounded className='lg' color='success'>
                        <MDBIcon fas icon="phone"/><h6>позвонить</h6>
                        </MDBBtn>


                </Col>
                <Col className="d-grid gap-2 d-md-block">
                        <MDBBtn rounded className='mx-2' color='secondary'>
                            <Col><MDBIcon fas icon="comment"/></Col><Col><h6>написать</h6></Col>
                        </MDBBtn>

                        {/*<MDBIcon far icon=""/>*/}
                    {/*</MDBBtn>*/}
                </Col>
            </Row>
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
                </Col>

            </Row>
        </Container>
    );
};

export default AdvertView;