import React, {useEffect, useRef, useState} from 'react';
import {useUser} from "../UserProvider/UserProvider";
import {useNavigate, useParams} from "react-router-dom";
import ajax from "../services/fetchServise";
import {Col, Container, Overlay, Row, Tooltip} from "react-bootstrap";
import {MDBBtn, MDBIcon, MDBRipple, MDBTypography} from "mdb-react-ui-kit";
import formatDate from "../util/dateFormatter";
import EditAccountBlock from "../editAccountBlock/EditAccountBlock";
import ItemCard from "../itemCard/ItemCard";

const AccountView = () => {
    const user = useUser();
    const {userId} = useParams();
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState({
        accountNonExpired: false,
        accountNonLocked: false,
        activationCode: "",
        cohortStartDate: "",
        credentialsNonExpired: false,
        email: "",
        enabled: false,
        id: null,
        name: "",
        phoneNumber: "",
        username: "",
    });

    const [advertsByUser, setAdvertsByUser] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [showEditBlock, setShowEditBlock] = useState(false);
    const targetEdit = useRef(null);

    const previousProfileDataValue = useRef(userProfile)

    useEffect(() => {
        ajax(`/api/adverts/user/${userId}`, 'GET', user.jwt).then(advertsData => {
            setAdvertsByUser(advertsData)
        })
    }, [user.jwt])

    useEffect(() => {
        ajax("/api/users", "GET", user.jwt).then(usersData => {
            if (usersData) {
                setUserProfile(usersData);
            } else return null;
        })
    }, [user.jwt, userId])


    function updateUserProfile(prop, label) {
        const newUserProfile = {...userProfile};
        newUserProfile[prop] = label;
        setUserProfile(newUserProfile);
    }

    function saveUsersName() {
        if (previousProfileDataValue.current.name !== userProfile.name) {
            updateUserProfile('name', userProfile.name)
        }
        persist();
        setShowEditBlock(false);
    }

    function saveUsersEmail() {
        if (previousProfileDataValue.current.email !== userProfile.email) {
            updateUserProfile('email', userProfile.email)
        }
        persist();
        setShowEditBlock(false);
    }

    function saveUsersPhone() {
        if (previousProfileDataValue.current.phoneNumber !== userProfile.phoneNumber) {
            updateUserProfile('phoneNumber', userProfile.phoneNumber)
        }
        persist();
        setShowEditBlock(false);
    }

    function persist() {
        const reqBody = {
            name: userProfile.name,
            email: userProfile.email,
            phoneNumber: userProfile.phoneNumber,
        }
        ajax(`/api/users/${userProfile.id}`, 'PUT', user.jwt, reqBody)
    }

    return (
        <Container>
            <Row>
                <Col>
                    <MDBTypography className='display-5 pb-3 mt-5 mb-3 border-bottom'>
                        {userProfile.name}
                    </MDBTypography>
                    <div className=' border-bottom'>
                        <cite className="text-muted mt-5 ">
                            Номер профиля: {userProfile.id}
                        </cite>
                    </div>
                    <br/>
                    <div className="border-bottom d-flex align-items-center justify-content-start">
                        <MDBIcon far icon="envelope" size="2x" className=""/>
                        <cite className="text-muted ms-3 mt-0 ">
                            {userProfile.email}
                        </cite>
                    </div>
                    <div className="border-bottom d-flex align-items-center justify-content-start mt-3">
                        <MDBIcon far icon="calendar-alt" size="2x"/>
                        <cite className="text-muted ms-3 mt-0 ">
                            user from {formatDate(userProfile.cohortStartDate)}
                        </cite>
                    </div>
                    <div className="border-bottom d-flex align-items-center justify-content-start mt-3">
                        <MDBIcon fas icon="phone-alt" size="2x"/>
                        <cite className="text-muted ms-3 mt-0 ">
                            {userProfile.phoneNumber}
                        </cite>
                    </div>
                    <div className="border-bottom d-flex align-items-center justify-content-start mt-3">
                        <MDBIcon fas icon="photo-video" size="2x"/>
                        {advertsByUser.length > 0 ?
                            <span style={{cursor: 'pointer'}} onClick={() => navigate(`/users/adverts`)}>
                            <cite className="text-muted ms-3 mt-0 ">
                                Всего объявлений: {advertsByUser.length}
                            </cite>
                        </span>
                            :
                            <span>
                            <cite className="text-muted ms-3 mt-0 ">
                                Всего объявлений: {advertsByUser.length}
                            </cite>
                        </span>
                        }
                    </div>
                    <div className="d-flex align-items-center mt-3 border-bottom">
                        <MDBBtn
                            ref={targetEdit}
                            floating
                            className='m-1'
                            style={{backgroundColor: '#55acee', paddingBottom: '10px'}}
                            role='button'
                            onMouseOver={() => {
                                setShowEdit(!showEdit)
                            }}
                            onMouseLeave={() => {
                                setShowEdit(false)
                            }}
                            onClick={() => {
                                setShowEditBlock(!showEditBlock)
                            }}
                        >
                            <MDBIcon fas icon="pencil-alt"/>
                            <Overlay target={targetEdit.current} show={showEdit} placement="top">
                                <Tooltip>
                                    edit profile
                                </Tooltip>
                            </Overlay>
                        </MDBBtn>
                        <div>
                            <cite className="text-muted">
                                Редактировать профиль
                            </cite>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <cite className="text-muted">
                            <strong>Объявления в архиве</strong>
                        </cite>
                    </div>
                    <div className="d-flex align-items-center border-bottom mb-5 pb-3">
                        <Container style={{marginBottom: "30px"}}>
                            <Row xs="auto" md="auto" lg="auto">
                                {advertsByUser.map((advert) => (
                                    advert.status === "Объявление в архиве" ?
                                        <Col key={advert.id}>
                                            <MDBRipple rippleTag='div' className='bg-image'>
                                                <ItemCard advert={advert}/>
                                                <div className='mask'
                                                     style={{backgroundColor: 'rgba(251, 251, 251, 0.6)'}}></div>
                                            </MDBRipple>
                                        </Col>

                                        :
                                        <></>
                                ))}
                            </Row>
                        </Container>
                    </div>
                </Col>
                {showEditBlock ?
                    <EditAccountBlock userProfile={userProfile}
                                      updateUserProfile={updateUserProfile}
                                      saveUsersEmail={saveUsersEmail}
                                      saveUsersPhone={saveUsersPhone}
                                      saveUsersName={saveUsersName}/>
                    :
                    null
                }
            </Row>
        </Container>
    );
};

export default AccountView;