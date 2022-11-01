import React, {useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {MDBBadge, MDBListGroup, MDBListGroupItem, MDBRipple, MDBTypography} from "mdb-react-ui-kit";
import {useUser} from "../UserProvider/UserProvider";
import jwt_decode from "jwt-decode";
import ajax from "../services/fetchServise";

const Messages = () => {
    const user = useUser();
    const location = useLocation();
    const messages = location.state.messages;
    const allMessages = location.state.allMessages;
    const navigate = useNavigate();

    const navigateToAdvert = (message) => {
        user.jwt && message.comment.advert.user.username === jwt_decode(user.jwt).sub ?
            (navigate(`/adverts/personal/${message.comment.advert.id}`))
            :
            (navigate(`/adverts/${message.comment.advert.user.id}/${message.comment.advert.id}`))

        ajax(`/api/comments/messages/${message.id}`, 'PUT', user.jwt)
    }

    return (
        <div>
            <h3 className='ms-5 mt-3 align-items-center border-bottom'>
                <MDBTypography>
                    Новые сообщения
                </MDBTypography>
            </h3>
            {messages.map((message) => (

                <MDBListGroup style={{minWidth: '22rem', maxWidth: '50rem'}} light >
                    <span style={{cursor: 'pointer'}} onClick={() => navigateToAdvert(message)}>
                    <MDBListGroupItem className='d-flex justify-content-start align-items-center ms-5 mt-3'>
                        <div className='d-flex align-items-center ms-3 pe-3'>
                            <img
                                src={message.comment.advert.image}
                                alt=''
                                style={{width: '50px', height: '50px'}}
                                className='rounded-circle'
                            />
                            <div className='ms-3'>
                                <p className='fw-bold mb-1'>{message.comment.advert.title}</p>
                                <p className='text-muted mb-0'>{message.text}</p>
                            </div>
                        <MDBBadge pill light color='success' className='ms-5 mb-4'>
                            {message.status}
                        </MDBBadge>
                        </div>
                    </MDBListGroupItem>
                </span>
                </MDBListGroup>
            ))}
            <h3 className='ms-5 mt-5 align-items-center border-bottom'>
                <MDBTypography>
                    Просмотренные сообщения
                </MDBTypography>
            </h3>
            {allMessages.map((mess) => (


                <MDBListGroup style={{minWidth: '22rem', maxWidth: '50rem'}} light>
                    <span style={{cursor: 'pointer'}} onClick={() => navigateToAdvert(mess)}>
                <MDBRipple rippleTag='div' className='bg-image'>
                    <MDBListGroupItem className='d-flex justify-content-start align-items-center ms-5 mt-3'>
                        <div className='d-flex align-items-center ms-3 pe-3'>
                            <img
                                src={mess.comment.advert.image}
                                alt=''
                                style={{width: '50px', height: '50px'}}
                                className='rounded-circle'
                            />
                            <div className='ms-3'>
                                <p className='fw-bold mb-1'>{mess.comment.advert.title}</p>
                                <p className='text-muted mb-0'>{mess.text}</p>
                            </div>
                        <MDBBadge pill light color='light' className='ms-5 mb-4'>
                            {mess.status}
                        </MDBBadge>
                        </div>
                    </MDBListGroupItem>
                    <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.4)' }}></div>
                </MDBRipple>
                </span>
                </MDBListGroup>
            ))}
        </div>
    );
};

export default Messages;