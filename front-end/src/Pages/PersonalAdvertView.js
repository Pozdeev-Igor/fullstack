import React, {useEffect, useRef, useState} from 'react';
import {useUser} from "../UserProvider/UserProvider";
import {useParams} from "react-router-dom";
import ajax from "../services/fetchServise";
import {Carousel, Col, Container, Row} from "react-bootstrap";
import {
    MDBBtn,
    MDBCollapse,
    MDBInput,
    MDBPopover,
    MDBPopoverBody,
    MDBPopoverHeader,
    MDBTextArea,
    MDBTypography
} from "mdb-react-ui-kit";
import CommentsContainer from "../Offcanvas/CommentsContainer";

const PersonalAdvertView = () => {
    const user = useUser();
    const {advertId} = useParams();
    const [imageList, setImageList] = useState([]);
    const [price, setPrice] = useState(null);
    const [advert, setAdvert] = useState({
        title: "",
        description: "",
        price: null,
    });

    const [showShow, setShowShow] = useState(true);

    // const toggleShow = () => {
    //     setShowShow(!showShow)
    //     console.log(showShow)
    // };

    const previousAdvertValue = useRef(advert);

    function updateAdvert(prop, value) {
        const newAdvert = {...advert};
        newAdvert[prop] = value;
        setAdvert(newAdvert);
    }

    function currencyFormat(num) {
        if (!num) {
            return 0;
        } else {
            let bum = '' + num;
            return bum.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + '   ₽'
        }
    }

    function saveTitle() {
        if (previousAdvertValue.current.title !== advert.title) {
            updateAdvert("title", advert.title);
        }
        persist();
        window.location.reload();
    }

    function saveDescription() {
        if (previousAdvertValue.current.description !== advert.description) {
            updateAdvert("description", advert.description);
        }
        persist();
        window.location.reload();
    }

    function savePrice() {
        if (previousAdvertValue.current.price !== advert.price) {
            updateAdvert("price", parseInt(advert.price));
        }
        persist();
        window.location.reload();
    }

    const persist = () => {
        const reqBody = {
            title: advert.title,
            description: advert.description,
            price: advert.price,
        }
        ajax(`/api/adverts/${advertId}`, "PUT", user.jwt, reqBody)
    };

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
                <Col>
                    <Container >
                        <Row>
                            <Col>
                                <MDBTypography tag='div' className='display-5 pb-3 mb-3 border-bottom'
                                               style={{marginLeft: "5%"}}>
                                    {advert.title}
                                </MDBTypography>
                            </Col>
                        </Row>
                        <Carousel >
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
                            <Col md="10" sm="6" xs="6" style={{marginLeft: "5%", marginTop:"30px"}}>
                                <h5 className='pb-3 mb-3 border-bottom'>
                                    {advert.description}

                                </h5>

                                <MDBPopover
                                    rounded
                                    style={{marginBottom:"30px"}}
                                    size='lg'
                                    color='primary'
                                    btnChildren={currencyFormat(advert.price)}>
                                    <MDBPopoverHeader>
                                        {currencyFormat(advert.price)}
                                    </MDBPopoverHeader>
                                    <MDBPopoverBody>
                                        <Row>
                                            <Col className="justify-content-start">
                                                <MDBInput
                                                    style={{marginTop:"30px"}}
                                                    label='price'
                                                    id='form1'
                                                    type='number'
                                                    value={advert.price === null ? 0 : (advert.price)}
                                                    onChange={(e) => updateAdvert("price", e.target.value)}/>
                                            </Col>
                                            <Col className="justify-content-start">
                                                <MDBBtn rounded onClick={() => savePrice()}>Edit</MDBBtn>
                                            </Col>
                                        </Row>
                                    </MDBPopoverBody>
                                </MDBPopover>

                                <MDBCollapse show={showShow}>
                                    <Row>
                                        <Col>
                                            {/*<CurrencyInput*/}
                                            {/*    className="currencyInput"*/}
                                            {/*    prefix="₽ "*/}
                                            {/*    name="currencyInput"*/}
                                            {/*    id="currencyInput"*/}
                                            {/*    data-number-to-fixed="2"*/}
                                            {/*    data-number-stepfactor="100"*/}
                                            {/*    value={price === "" ? "" : price}*/}
                                            {/*    placeholder=""*/}
                                            {/*    onChange={handlePriceChange}*/}
                                            {/*    onBlur={handleOnBlur}*/}
                                            {/*    allowDecimals*/}
                                            {/*    decimalsLimit="2"*/}
                                            {/*    disableAbbreviations*/}
                                            {/*/>*/}
                                        </Col>
                                    </Row>
                                </MDBCollapse>
                                <Row>
                                    <Col className="justify-content-start">
                                        <MDBInput
                                            label='Title'
                                            id='form1'
                                            type='text'
                                            value={advert.title === null ? "" : advert.title}
                                            onChange={(e) => updateAdvert("title", e.target.value)}/>
                                    </Col>
                                    <Col md="2" sm="2" xs="1" className="justify-content-end">
                                        <MDBBtn rounded onClick={() => saveTitle()}>Edit</MDBBtn>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <MDBTextArea
                                            rows={4}
                                            label='Description'
                                            id='form1'
                                            type='text'
                                            value={advert.description === null ? "" : advert.description}
                                            style={{marginTop: "30px", marginBottom: "30px"}}
                                            onChange={(e) => updateAdvert("description", e.target.value)}/>
                                    </Col>
                                    <Col md="2" sm="2" xs="1" className="justify-content-end"
                                         style={{marginTop: "50px"}}>
                                        <MDBBtn rounded onClick={() => saveDescription()}>Edit</MDBBtn>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </Col>
                <Col>
                    <CommentsContainer advertId={advertId}/>

                </Col>
            </Row>
        </Container>

    );
};

export default PersonalAdvertView;