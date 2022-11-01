import React, {useEffect, useRef, useState} from 'react';
import {useUser} from "../UserProvider/UserProvider";
import {useNavigate, useParams} from "react-router-dom";
import ajax from "../services/fetchServise";
import {Col, Container, Row} from "react-bootstrap";
import {MDBBtn, MDBInput, MDBTextArea, MDBTypography} from "mdb-react-ui-kit";
import CommentsContainer from "../Comment/CommentsContainer";
import OptionsBar from "../optionsBar/OptionsBar";
import CustomCarousel from "../carousel/CustomCarousel";
import PricePopover from "../popoverPrice/PricePopover";

const PersonalAdvertView = () => {
    const user = useUser();
    const {advertId} = useParams();
    const [imageList, setImageList] = useState([]);
    const [advert, setAdvert] = useState({
        title: "",
        description: "",
        price: null,
    });

    const [showEditBlock, setShowEditBlock] = useState(false);
    const navigate = useNavigate();

    const handleShowEditBlock = (data) => {
        setShowEditBlock(!data)
    }

    const setStatusArchived = () => {
        ajax(`/api/adverts/archived/${advertId}`, 'PUT', user.jwt, null);
        navigate(-1);
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
        setShowEditBlock(false);
    }

    function saveDescription() {
        if (previousAdvertValue.current.description !== advert.description) {
            updateAdvert("description", advert.description);
        }
        persist();
        setShowEditBlock(false);
    }

    function savePrice() {
        if (previousAdvertValue.current.price !== advert.price) {
            updateAdvert("price", parseInt(advert.price));
        }
        persist();
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
    }, []);

    useEffect(() => {
        ajax(`/api/images/${advertId}`, "GET", user.jwt).then((imagesData) => {
            setImageList(imagesData);
        })
    }, [advertId, user.jwt]);

    return (
        <Container className="personal-advert-view">
            <Row>
                <Col>
                    <Container className={"sticky-top"}>
                        <Row>
                            <Col className='pe-5'>
                                <MDBTypography tag='div' className='display-5 pb-3 mb-3 border-bottom'
                                               style={{marginLeft: "5%"}}>
                                    {advert.title}
                                </MDBTypography>
                            </Col>
                        </Row>
                        <CustomCarousel imageList={imageList}/>
                        <Row>
                            <Col md="10" sm="6" xs="6" style={{marginLeft: "5%", marginTop: "30px"}}>
                                <h5 className='pb-3 mb-3 border-bottom'>
                                    {advert.description}
                                </h5>
                                <PricePopover
                                    advert={advert}
                                    updateAdvert={updateAdvert}
                                    savePrice={savePrice}
                                />

                                {showEditBlock ?
                                    <>
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
                                    </>
                                    :
                                    null
                                }
                            </Col>
                        </Row>
                    </Container>
                </Col>
                <Col className='ms-5'>
                    <OptionsBar
                        setStatusArchived={setStatusArchived}
                        handleShowEditBlock={handleShowEditBlock}/>
                    <CommentsContainer advertId={advertId}/>
                </Col>
            </Row>
        </Container>
    );
};

export default PersonalAdvertView;