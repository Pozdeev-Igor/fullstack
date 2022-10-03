import React, {useEffect, useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import {useUser} from "../UserProvider/UserProvider";
import ImageUploader from "../services/ImageUploader";
import {MDBInput, MDBTextArea} from "mdb-react-ui-kit";

const NewAdvertView = () => {
    const user = useUser();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [subCategoryId, setSubCategoryId] = useState(null);

    useEffect(() => {
    console.log(title, description);
    });


    return (
        <div className="w-75">
            <Container className="justify-content-lg-center">
                <h1 style={{textAlign:"center"}}>Add new advert</h1>
                <MDBInput
                    label='Заголовок объявления'
                    id='formControlLg'
                    type='text'
                    size='lg'
                    onChange={(e) => setTitle(e.target.value)}/>

                <MDBTextArea
                    label='Описание'
                    id='textAreaExample'
                    rows={4}
                    style={{marginTop:"30px", marginBottom:"30px"}}
                    onChange={(e) => setDescription(e.target.value)}/>

               <ImageUploader title={title} description={description}/>
            </Container>
        </div>
    );
};

export default NewAdvertView;