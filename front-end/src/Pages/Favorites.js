import React, {useEffect, useState} from 'react';
import {useUser} from "../UserProvider/UserProvider";
import {useParams} from "react-router-dom";
import ajax from "../services/fetchServise";
import ItemCard from "../itemCard/ItemCard";
import {Col, Container, Row} from "react-bootstrap";

const Favorites = () => {
    const user = useUser();
    const [adverts, setAdverts] = useState([]);
    const {userId} = useParams();

    useEffect(() => {
        ajax(`/api/users/user/${userId}`, 'GET', user.jwt).then(response =>
        setAdverts(response))
    }, [])


    return (
        <div>
            <Container style={{marginBottom: "30px"}}>
            <Row xs="auto" md="auto" lg="auto">
            {adverts.map((advert) => (
            <Col key={advert.id}>
                <ItemCard advert={advert}/>
            </Col>
            ))}
            </Row>
            </Container>
        </div>
    );
};

export default Favorites;