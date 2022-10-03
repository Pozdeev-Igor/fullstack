import React, {useEffect, useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import {useUser} from "../UserProvider/UserProvider";
import ImageUploader from "../services/ImageUploader";
import {MDBInput, MDBTextArea} from "mdb-react-ui-kit";

const NewAdvertView = () => {
    const user = useUser();


    return (
        <div className="w-75">
            <Container className="justify-content-lg-center">
                <h1 style={{textAlign:"center"}}>Add new advert</h1>
                <MDBInput label='Заголовок объявления' id='formControlLg' type='text' size='lg' />
                <MDBTextArea label='Описание' id='textAreaExample' rows={4} style={{marginTop:"30px"}}/>

               <ImageUploader />
            </Container>
        </div>
    );
};

export default NewAdvertView;