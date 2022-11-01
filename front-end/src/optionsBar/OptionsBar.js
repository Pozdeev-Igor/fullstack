import React, {useRef, useState} from 'react';
import {MDBBtn, MDBIcon} from "mdb-react-ui-kit";
import {Overlay, Tooltip} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const OptionsBar = (props) => {

    const navigate = useNavigate();

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

    return (
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
                    props.handleShowEditBlock(false);
                    window.scrollTo(0, 1800)
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
                    props.setStatusArchived();
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
                <MDBIcon fas icon="chart-line"/>
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
    );
};

export default OptionsBar;