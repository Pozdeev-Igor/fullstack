import React, {useEffect, useRef, useState} from 'react';
import {useUser} from "../UserProvider/UserProvider";
import {useNavigate, useParams} from "react-router-dom";
import ajax from "../services/fetchServise";
import {Alert, Col, Container, Overlay, Row, Tooltip} from "react-bootstrap";
import {MDBBadge, MDBBtn, MDBIcon, MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBTypography} from "mdb-react-ui-kit";
import CommentsContainer from "../Comment/CommentsContainer";
import currencyFormat from "../util/currencyFormat";
import CustomCarousel from "../carousel/CustomCarousel";

const AdvertView = () => {
    const user = useUser();
    const navigate = useNavigate();
    const {advertId} = useParams();
    const [favorites, setFavorites] = useState([]);
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

    const [showClose, setShowClose] = useState(false);
    const targetClose = useRef(null);

    const [currentUser, setCurrentUser] = useState(null);
    const [userId, setUserId] = useState(null);

    const navigateToFavorites = () => {
        navigate(`/adverts/favorite/${currentUser.id}`)
    }

    useEffect(() => {
        ajax(`/api/adverts/${advertId}`, "GET", user.jwt).then((response) => {
            setAdvert(response);
            setCategoryName(response.subCategory.category.name);
            setSubCategoryName(response.subCategory.name);
            setAuthorName(response.user.name);
            setAuthorPhone(response.user.phoneNumber)
        })
    }, [advertId]);

    useEffect(() => {
        ajax(`/api/images/${advertId}`, "GET", user.jwt).then((imagesData) => {
            setImageList(imagesData);
        })
    }, [advertId]);

    useEffect(() => {
        if (user.jwt !== "") {
            ajax("/api/users", "GET", user.jwt).then(usersData => {
                if (usersData) {
                    setCurrentUser(usersData);
                    setUserId(usersData.id);
                } else {
                    return null;
                }
            })
        }
    }, [userId, user.jwt, advert])

    useEffect(() => {
        ajax(`/api/users/user/${userId}`, 'GET', user.jwt).then(
            (responceData) => {
                setFavorites(responceData);
                if (Array.isArray(favorites) && favorites.length > 0) {
                    const favy = favorites.find((fav) => {
                        return fav.id === parseInt(advertId)
                    });
                    favy
                        ?
                        setPreFavoriteShow(false)
                        :
                        setPreFavoriteShow(true)
                } else {
                    setPreFavoriteShow(true)
                }
            }
        )
    }, [user.jwt, favorites, advertId, userId])


    const favoriteClick = () => {
        if (user.jwt) {
            if (preFavoriteShow === true) {
                ajax(`/api/users/user/${userId}/advert/${advertId}`, 'PUT', user.jwt)
            } else {
                ajax(`/api/users/user/${userId}/advert/${advertId}`, 'DELETE', user.jwt)
            }
        }
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Container className={"sticky-top"}>
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
                                <Row>
                                    <Col lg='8' md='8' sm='8'>
                                        <MDBBtn className='text-dark mb-3' style={{width: "40%"}} color='light'
                                                onClick={favoriteClick}>
                                            {preFavoriteShow ? (
                                                <div>
                                                    <MDBIcon far icon="heart" size="1x" style={{color: "#DD4B39FF"}}/>
                                                    <cite style={{marginLeft: "5px"}}>добавить в избранное</cite>
                                                </div>
                                            ) : (
                                                <div>
                                                    <MDBIcon fas icon="heart" size="1x" style={{color: "#DD4B39FF"}}/>
                                                    <cite style={{marginLeft: "5px"}}>добавлено в избранное</cite>
                                                </div>
                                            )}
                                        </MDBBtn>
                                    </Col>
                                    <Col lg='4'>
                                        {!preFavoriteShow ?
                                            <span style={{cursor: 'pointer'}}
                                                  onClick={navigateToFavorites}>перейти в избранное</span>
                                            : null
                                        }
                                    </Col>
                                </Row>
                                <CustomCarousel imageList={imageList}/>
                                <MDBTypography tag='div' className='display-6 pb-3 mb-3 border-bottom'>
                                    Описание
                                </MDBTypography>
                                {
                                    advert.description ? (
                                        <MDBTypography className='lead pb-3 mb-5 border-bottom'>
                                            {advert.description}
                                        </MDBTypography>
                                    ) : (
                                        <MDBTypography className='lead pb-3 mb-5 border-bottom'>
                                            автор не составил описание объявлению
                                        </MDBTypography>
                                    )
                                }
                            </Row>
                        </Container>
                    </Col>
                    <Col className='mt-5 me-2'>
                        <Row>
                            <Col>
                                {
                                    (advert.price !== "" && advert.price !== null) ? (

                                        <h3>
                                            <MDBBadge pill color='primary'>
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
                            </Col>
                            <Col>
                                {user.jwt ?
                                    <MDBPopover className='mt-3 mb-5 mx-2' rounded size='lg'
                                                style={{backgroundColor: "#33691E", width: "300px"}}
                                                btnChildren={
                                                    <>
                                                        <MDBIcon fas icon="phone" size="1x" color="white"/>
                                                        <cite> Связаться с автором</cite>
                                                    </>
                                                }
                                                placement={"bottom"}>
                                        <MDBPopoverHeader>{authorName}</MDBPopoverHeader>
                                        <MDBPopoverBody>{authorPhone}</MDBPopoverBody>
                                    </MDBPopover>
                                    :
                                    <MDBPopover className='mt-3 mb-5 mx-2' rounded size='lg'
                                                style={{backgroundColor: "rgba(90,148,66,0.73)", width: "300px"}}
                                                btnChildren={
                                                    <>
                                                        <MDBIcon fas icon="phone" size="1x" color="white"/>
                                                        <cite> Связаться с автором</cite>
                                                    </>}>
                                        <MDBPopoverBody style={{textAlign: "center"}}>Чтобы связаться с автором
                                            объявления,
                                            необходимо авторизоваться!</MDBPopoverBody>
                                    </MDBPopover>
                                }
                            </Col>
                            <Col>
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
                            </Col>
                        </Row>
                        <figcaption>
                            Пользователь •
                            <cite> {authorName}</cite>
                        </figcaption>

                        {user.jwt ?
                            <CommentsContainer advertId={advertId}/>
                            :
                            <Alert variant="danger" style={{textAlign: "center"}}>
                                Необходимо авторизоваться, чтобы иметь возможность оставлять комментарии!
                            </Alert>
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AdvertView;