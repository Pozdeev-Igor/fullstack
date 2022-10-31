import React from 'react';
import {MDBBtn, MDBInput} from "mdb-react-ui-kit";
import {PatternFormat} from "react-number-format";
import {Col} from "react-bootstrap";

const EditAccountBlock = (props) => {
    const {
        userProfile,
        updateUserProfile,
        saveUsersName,
        saveUsersPhone,
        saveUsersEmail,
        } = props
    return (
        <Col>
            <div>
                <MDBInput
                    label={userProfile.name}
                    id='name' type='text'
                    className='display-5 pb-3 mt-5 mb-3 '
                    onChange={(e) => updateUserProfile('name', e.target.value)}/>
                <MDBBtn rounded style={{backgroundColor: '#55acee', marginLeft: '550px'}} className="mt-1"
                        onClick={() => {
                            saveUsersName()
                        }}>edit</MDBBtn>

                <MDBInput
                    label={userProfile.email}
                    id='email' type='email'
                    className='display-5 pb-3 mt-5 mb-3 '
                    onChange={(e) => updateUserProfile('email', e.target.value)}/>
                <MDBBtn rounded style={{backgroundColor: '#55acee', marginLeft: '550px'}} className="mt-1"
                        onClick={() => {
                            saveUsersEmail()
                        }}>edit</MDBBtn>

                <PatternFormat
                    className='pb-3 mt-5 mb-3'
                    style={{
                        width: '100%',
                        borderRadius: '4px',
                        borderWidth: '1px',
                        borderColor: 'lightgray',
                        height: '45px'
                    }}
                    format="+7 (###) ### ## ##"
                    allowEmptyFormatting mask="*"
                    value={userProfile.phoneNumber}
                    onChange={(e) => updateUserProfile('phoneNumber', e.target.value)}
                />
                <MDBBtn rounded style={{backgroundColor: '#55acee', marginLeft: '550px'}} className="mt-1"
                        onClick={() => {
                            saveUsersPhone()
                        }}>edit</MDBBtn>
            </div>
        </Col>
    );
};

export default EditAccountBlock;