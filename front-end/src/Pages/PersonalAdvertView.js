import React, {useEffect, useRef, useState} from 'react';
import {useUser} from "../UserProvider/UserProvider";
import {useParams} from "react-router-dom";
import ajax from "../services/fetchServise";
import {MDBInput, MDBTextArea} from "mdb-react-ui-kit";

const PersonalAdvertView = () => {
    const user = useUser();
    const {advertId} = useParams();
    const [advert, setAdvert] = useState({
        title: "",
        description: "",
    });

    const previousAdvertValue = useRef(advert);

    function updateAdvert(prop, value) {
        const newAdvert = {...advert};
        newAdvert[prop] = value;
        setAdvert(newAdvert);
    }


    useEffect(() => {
        ajax(`/api/adverts/${advertId}`, "GET", user.jwt).then((response) => {
            setAdvert(response);
        })
    }, [user.jwt]);

    return (
        <div style={{width:"50%", alignItems:"center"}}>
            <MDBInput
                label='Заголовок объявления'
                id='formControlLg'
                type='text'
                size='lg'
                value={advert.title}
                onChange={(e) => updateAdvert("title", e.target.value)}/>

            <MDBTextArea
                label='Описание'
                id='textAreaExample'
                rows={4}
                style={{marginTop: "30px", marginBottom: "30px"}}
                value={advert.description}
                onChange={(e) => updateAdvert("description", e.target.value)}/>
        </div>
    );
};

export default PersonalAdvertView;