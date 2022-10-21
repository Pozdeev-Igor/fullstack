import React, {useEffect, useRef, useState} from 'react';
import {useUser} from "../UserProvider/UserProvider";
import {useNavigate, useParams} from "react-router-dom";
import ajax from "../services/fetchServise";
import {Carousel, Col, Container, Overlay, Row, Tooltip} from "react-bootstrap";
import {
    MDBBtn,
    MDBIcon,
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
    const navigate = useNavigate();
    const {advertId} = useParams();
    const [imageList, setImageList] = useState([]);
    const [price, setPrice] = useState(null);
    const [advert, setAdvert] = useState({
        title: "",
        description: "",
        price: null,
    });

    const [showEditBlock, setShowEditBlock] = useState(false);
    // const targetEditBlock = useRef();

    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showUp, setShowUp] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showClose, setShowClose] = useState(false);
    const targetEdit = useRef(null);
    const targetDelete = useRef(null);
    const targetUp = useRef(null);
    const targetSettings = useRef(null);
    const targetClose = useRef(null);

    // const toggleShow = () => {
    //     setShowShow(true)
    //     console.log(showEdit)
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
        setShowEditBlock(false);
        // window.location.reload();
    }

    function saveDescription() {
        if (previousAdvertValue.current.description !== advert.description) {
            updateAdvert("description", advert.description);
        }
        persist();
        setShowEditBlock(false);
        // window.location.reload();
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
                    <Container className={"sticky-top"}>
                        <Row>
                            <Col>
                                <MDBTypography tag='div' className='display-5 pb-3 mb-3 border-bottom'
                                               style={{marginLeft: "5%"}}>
                                    {advert.title}
                                </MDBTypography>
                            </Col>
                        </Row>
                        <Carousel>
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
                            <Col md="10" sm="6" xs="6" style={{marginLeft: "5%", marginTop: "30px"}}>
                                <h5 className='pb-3 mb-3 border-bottom'>
                                    {advert.description}

                                </h5>

                                <MDBPopover
                                    rounded
                                    style={{marginBottom: "30px"}}
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
                                                    style={{marginTop: "30px"}}
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
                <Col>
                    <div style={{paddingLeft: "360px", marginTop: "30px", backgroundColor: "whitesmoke"}}>

                        <MDBBtn
                            ref={targetEdit}
                            floating
                            className='m-1'
                            style={{backgroundColor: '#55acee'}}
                            role='button'
                            onMouseOver={() => {
                                setShowEdit(!showEdit)
                            }}
                            onMouseLeave={() => {
                                setShowEdit(false)
                            }}
                            onClick={() => {
                                setShowEditBlock(!showEditBlock)
                                window.scrollTo(0, 400)
                            }}
                        >
                            <MDBIcon fas icon="pencil-alt"/>
                            <Overlay target={targetEdit.current} show={showEdit} placement="top">
                                <Tooltip>
                                    edit advert
                                </Tooltip>
                            </Overlay>
                        </MDBBtn>

                        <MDBBtn
                            ref={targetDelete}
                            floating
                            className='m-1'
                            style={{backgroundColor: '#dd4b39'}}
                            onClick={() => {
                                console.log('click!')
                            }}
                            role='button'
                            onMouseOver={() => {
                                setShowDelete(!showDelete)
                            }}
                            onMouseLeave={() => {
                                setShowDelete(false);
                            }}

                        >
                            <MDBIcon fas icon="trash-alt"/>
                            <Overlay target={targetDelete.current} show={showDelete} placement="top">
                                <Tooltip>
                                    completely delete advert
                                </Tooltip>
                            </Overlay>
                        </MDBBtn>

                        <MDBBtn
                            ref={targetUp}
                            floating
                            className='m-1'
                            style={{backgroundColor: '#ac2bac'}}
                            role='button'
                            onMouseOver={() => {
                                setShowUp(!showUp)
                            }}
                            onMouseLeave={() => {
                                setShowUp(false);
                            }}
                            onClick={() => {
                                alert('заглушка')
                            }}
                        >
                            <MDBIcon fas icon="arrow-up"/>
                            <Overlay target={targetUp.current} show={showUp} placement="top">
                                <Tooltip>
                                    increase views
                                </Tooltip>
                            </Overlay>
                        </MDBBtn>

                        <MDBBtn
                            ref={targetSettings}
                            floating
                            className='m-1'
                            style={{backgroundColor: '#0082ca'}}
                            role='button'
                            onMouseOver={() => {
                                setShowSettings(!showSettings)
                            }}
                            onMouseLeave={() => {
                                setShowSettings(false);
                            }}
                            onClick={() => {
                                alert('заглушка')
                            }}
                        >
                            <MDBIcon fas icon="cog"/>
                            <Overlay target={targetSettings.current} show={showSettings} placement="top">
                                <Tooltip>
                                    settings
                                </Tooltip>
                            </Overlay>
                        </MDBBtn>

                        <MDBBtn
                            ref={targetClose}
                            floating
                            className='m-1'
                            style={{backgroundColor: '#333333'}}
                            role='button'
                            onMouseOver={() => {
                                setShowClose(!showClose)
                            }}
                            onMouseLeave={() => {
                                setShowClose(false);
                            }}
                            onClick={() => navigate(-1)}
                        >
                            <MDBIcon fas icon="times"/>
                            <Overlay target={targetClose.current} show={showClose} placement="top">
                                <Tooltip>
                                    close
                                </Tooltip>
                            </Overlay>
                        </MDBBtn>
                    </div>
                    <CommentsContainer advertId={advertId}/>

                </Col>
            </Row>
        </Container>

    );
};

export default PersonalAdvertView;