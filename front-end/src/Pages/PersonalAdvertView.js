import React, {useEffect, useRef, useState} from 'react';
import {useUser} from "../UserProvider/UserProvider";
import {useParams} from "react-router-dom";
import ajax from "../services/fetchServise";
import {Carousel, Col, Container, Row} from "react-bootstrap";
import {MDBBtn, MDBCollapse, MDBIcon, MDBInput, MDBTextArea, MDBTypography} from "mdb-react-ui-kit";

const PersonalAdvertView = () => {
    const user = useUser();
    const {advertId} = useParams();
    const [imageList, setImageList] = useState([]);
    const [show, setShow] = useState(false);
    const [advert, setAdvert] = useState({
        title: "",
        description: "",
    });

    function handleShow() {
        return setShow(!show);
    }

    const previousAdvertValue = useRef(advert);

    function updateAdvert(prop, value) {
        const newAdvert = {...advert};
        newAdvert[prop] = value;
        setAdvert(newAdvert);
    }

    function saveTitle() {
        if (previousAdvertValue.current.title !== advert.title) {
            updateAdvert("title", advert.title);
        }
        persist();
    }

    function saveDescription() {
        if (previousAdvertValue.current.description !== advert.description) {
            updateAdvert("description", advert.description);
        }
        persist();
    }
    useEffect(() => {
        ajax(`/api/adverts/${advertId}`, "GET", user.jwt).then((response) => {
            setAdvert(response);
        })
    }, [advertId, user.jwt]);

    const persist = () => {
        const reqBody = {
            title: advert.title,
            description: advert.description,
        }
        console.log(reqBody)
        ajax(`/api/adverts/${advertId}`, "PUT", user.jwt, reqBody)
        // window.location.reload();
    };


    useEffect(() => {
        ajax(`/api/images/${advertId}`, "GET", user.jwt).then((imagesData) => {
            setImageList(imagesData);
        })
    }, [advertId, user.jwt]);

    return (
        <Container className="personal-advert-view">
            <Row>
                <Col>
                    <MDBTypography tag='div' className='display-5 pb-3 mb-3 border-bottom' style={{marginLeft: "5%"}}>
                        {advert.title}
                    </MDBTypography>
                </Col>
                <Col md="2" sm="2" xs="1" className="justify-content-end">
                    <span style={{cursor: "pointer"}}
                          onClick={handleShow}
                    >
                    <MDBIcon fas icon="pen" size={"lg"} style={{marginTop: "20px"}}/>
                        </span>
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
                <Col md="10" sm="6" xs="6">
                    <h5 className='pb-3 mb-3 border-bottom' style={{marginLeft: "5%"}}>
                        {advert.description}
                    </h5>
                    <MDBCollapse show={show} style={{marginTop: "50px"}}>
                        <Row>
                            <Col className="justify-content-start">
                                <MDBInput
                                    label='Title'
                                    id='form1'
                                    type='text'
                                    value={advert.title}
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
                                    value={advert.description}
                                    style={{marginTop: "20px", marginBottom: "30px"}}
                                    onChange={(e) => updateAdvert("description", e.target.value)}/>
                            </Col>
                            <Col md="2" sm="2" xs="1" className="justify-content-end" style={{marginTop:"50px"}}>
                                <MDBBtn rounded onClick={() => saveDescription()}>Edit</MDBBtn>
                            </Col>

                        </Row>
                    </MDBCollapse>
                </Col>

                <Col md="10" sm="6" xs="6">
                    {/*<MDBCollapse show={show}>*/}
                    {/*    <Row>*/}
                    {/*        <Col>*/}
                    {/*        </Col>*/}
                    {/*        <Col>*/}
                    {/*        </Col>*/}
                    {/*    </Row>*/}
                    {/*</MDBCollapse>*/}
                </Col>
            </Row>
        </Container>

        // {/*<MDBInput*/
        // }
        // {/*    label='Заголовок объявления'*/
        // }
        // {/*    id='formControlLg'*/
        // }
        // {/*    type='text'*/
        // }
        // {/*    size='lg'*/
        // }
        // {/*    value={advert.title}*/
        // }
        // {/*    onChange={(e) => updateAdvert("title", e.target.value)}/>*/
        // }
        //
        // {/*<MDBTextArea*/
        // }
        // {/*    label='Описание'*/
        // }
        // {/*    id='textAreaExample'*/
        // }
        // {/*    rows={4}*/
        // }
        // {/*    style={{marginTop: "30px", marginBottom: "30px"}}*/
        // }
        // {/*    value={advert.description}*/
        // }
        // {/*    onChange={(e) => updateAdvert("description", e.target.value)}/>*/
        // }

    )
        ;
};

export default PersonalAdvertView;