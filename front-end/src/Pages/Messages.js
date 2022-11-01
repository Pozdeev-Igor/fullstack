import React from 'react';
import {useLocation} from "react-router-dom";
import {MDBBadge, MDBListGroup, MDBListGroupItem} from "mdb-react-ui-kit";

const Messages = () => {

    const location = useLocation();
    const messages = location.state.messages;

    console.log(messages)
    return (
        <div>
            {messages.map((message) => (

                <MDBListGroup style={{minWidth: '22rem', maxWidth: '50rem'}} light>
                    <MDBListGroupItem className='d-flex justify-content-start align-items-center ms-5 mt-3'>
                        <div className='d-flex align-items-center'>
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

                </MDBListGroup>
            ))}
        </div>
    );
};

export default Messages;