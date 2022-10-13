import React, {useEffect, useState} from 'react';
import {useUser} from "../UserProvider/UserProvider";
import {useParams} from "react-router-dom";
import ajax from "../services/fetchServise";
import {Carousel, Col, Container, Row} from "react-bootstrap";
import {MDBBadge, MDBBtn, MDBIcon, MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBTypography} from "mdb-react-ui-kit";
import {NumericFormat} from "react-number-format";
import CommentsContainer from "../Offcanvas/CommentsContainer";

const AdvertView = () => {
    const user = useUser();
    const {advertId} = useParams();
    const [favoriteShow, setFavoriteShow] = useState(false);
    const [preFavoriteShow, setPreFavoriteShow] = useState(true);
    const [imageList, setImageList] = useState([]);
    const [advert, setAdvert] = useState({
        title: "",
        description: "",
        price: "",
        phoneNumber: "",
    });
    const [categoryName, setCategoryName] = useState("");
    const [subCategoryName, setSubCategoryName] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [authorPhone, setAuthorPhone] = useState("");

    const [show, setShow] = useState(() => false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function currencyFormat(num) {
        if (!num) {
            return 0;
        } else {
            let bum = '' + num;
            return bum.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + '   ₽'
        }
    }

    useEffect(() => {
        ajax(`/api/adverts/${advertId}`, "GET", user.jwt).then((response) => {
            setAdvert(response);
            setCategoryName(response.subCategory.category.name);
            setSubCategoryName(response.subCategory.name);
            setAuthorName(response.user.name);
            setAuthorPhone(response.user.phoneNumber)
            // console.log(response)
        })
    }, [advertId, user.jwt]);

    useEffect(() => {
        ajax(`/api/images/${advertId}`, "GET", user.jwt).then((imagesData) => {
            setImageList(imagesData);
        })
    }, [advertId, user.jwt]);

    const favoriteClick = () => {
        setPreFavoriteShow(!preFavoriteShow);
        setFavoriteShow(!favoriteShow)
    }


    return (
        <div>
        <Container>
            <Row>
                <Col>
                    <Container>
                        <Row>
                            {
                                advert.title ? (
                                    <MDBTypography tag='div' className='display-5 pb-3 mt-5 mb-3 border-bottom'>
                                        {advert.title}
                                    </MDBTypography>
                                ) : (
                                    <MDBTypography tag='div' className='display-5 pb-3 mt-5 mb-3 border-bottom'>
                                        Автор не указал заголовок
                                    </MDBTypography>
                                )
                            }
                            {subCategoryName ? (
                                <figcaption className='blockquote-footer mb-3 mt-0'>
                                    {categoryName} • <cite
                                    title='Source Title'>{subCategoryName}</cite>
                                </figcaption>
                            ) : (
                                <figcaption className='blockquote-footer mb-3 mt-0'>
                                    Категория объявления не определена
                                </figcaption>
                            )

                            }

                            <MDBBtn className='text-dark mb-3' style={{width: "40%"}} color='light'
                                    onClick={favoriteClick}>
                                {preFavoriteShow ? (
                                    <div>
                                        <MDBIcon far icon="heart" size="1x" style={{color: "#DD4B39FF"}}/>
                                        <h7 style={{marginLeft: "5px"}}>добавить в избранное</h7>
                                    </div>
                                ) : (
                                    <div>
                                        <MDBIcon fas icon="heart" size="1x" style={{color: "#DD4B39FF"}}/>
                                        <h7 style={{marginLeft: "5px"}}>добавлено в избранное</h7>
                                    </div>
                                )}
                            </MDBBtn>

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

                            <MDBTypography tag='div' className='display-6 pb-3 mb-3 border-bottom'>
                                Описание
                            </MDBTypography>
                            {
                                advert.description ? (
                                    <MDBTypography className='lead pb-3 mb-5 border-bottom'>
                                        {advert.description}
                                    </MDBTypography>
                                ) : (
                                    <h5 className='pb-3 mb-3 border-bottom'>
                                        автор не составил описание объявлению
                                    </h5>
                                )
                            }
                        </Row>
                    </Container>
                </Col>
                <Col className="bg-fixed">
                    {
                        (advert.price !== "" && advert.price !== null) ? (

                            <h3>
                                <MDBBadge pill className='mt-5 me-2 text-light' color='primary'>
                                    {currencyFormat(advert.price)}
                                </MDBBadge>
                            </h3>
                        ) : (
                            <h3>
                                <MDBBadge pill className='mt-5 me-2 text-light' color='primary' light>
                                    Цена не указана
                                </MDBBadge>
                            </h3>
                        )

                    }
                    <div className="d-flex justify-content-start" style={{marginTop: "150px"}}>

                        <MDBPopover className='mt-3 mb-5 mx-2' rounded size='lg'
                                    style={{backgroundColor: "#33691E", width: "100px"}}
                                    btnChildren={<MDBIcon fas icon="phone" size="2x" color="white"/>}>
                            <MDBPopoverHeader>{authorName}</MDBPopoverHeader>
                            <MDBPopoverBody>{authorPhone}</MDBPopoverBody>
                        </MDBPopover>

                        <MDBPopover
                            onClick={handleShow}
                            className=' mt-3 mb-5 mx-2'
                            rounded
                            size='lg'
                            style={{backgroundColor: "#0D47A1", width: "100px", marginLeft: "30px"}}
                            btnChildren=
                                {
                                    <MDBIcon fas icon="comment" size="2x"/>
                                }
                        >
                        </MDBPopover>
                    </div>

                    <figcaption>
                        Пользователь •
                        <cite> {authorName}</cite>
                    </figcaption>

                </Col>
            </Row>
        </Container>


    <CommentsContainer show={show} handleClose={handleClose} handleShow={handleShow}/>
        </div>
        // <Container className="personal-advert-view">
        //
        //
        //     <Row>
        //         <Col>
        //         </Col>
        //         <Col lg={{span: 3, offset: 6}}>

        //         </Col>
        //
        //     </Row>
        //
        //     {
        //         (advert.price !== "" && advert.price !== null) ? (
        //
        //             <h4>
        //                 <MDBBadge pill className='me-2 text-light' color='primary'>
        //                     {currencyFormat(advert.price)}
        //                 </MDBBadge>
        //             </h4>
        //         ) : (
        //             <h4>
        //                 <MDBBadge pill className='me-2 text-light' color='primary'>
        //                     Цена не указана
        //                 </MDBBadge>
        //             </h4>
        //         )
        //
        //     }
        //     <Row>
        //         <Col className="d-grid gap-2 d-md-block">
        //             <MDBBtn rounded className='lg' color='success'>
        //                 <MDBIcon fas icon="phone"/><h6>позвонить</h6>
        //             </MDBBtn>
        //         </Col>
        //         <Col className="d-grid gap-2 d-md-block">
        //             <MDBBtn rounded className='mx-2' color='secondary'>
        //                 <Col><MDBIcon fas icon="comment"/></Col><Col><h6>написать</h6></Col>
        //             </MDBBtn>
        //
        //         </Col>
        //     </Row>
        //     <Row>
        //         <Col lg="8" md="8" sm="6" xs="4" style={{marginLeft: "5%"}}>
        //             {
        //                 advert.description ? (
        //                     <h5 className='pb-3 mb-3 border-bottom'>
        //                         {advert.description}
        //                     </h5>
        //                 ) : (
        //                     <h5 className='pb-3 mb-3 border-bottom'>
        //                         автор не составил описание объявлению
        //                     </h5>
        //                 )
        //             }
        //         </Col>
        //
        //     </Row>
        // </Container>
    )
        ;
};

export default AdvertView;