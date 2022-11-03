import React, {useEffect, useState} from 'react';
import {useUser} from "../UserProvider/UserProvider";
import {Col, Container, Row} from "react-bootstrap";
import ajax from "../services/fetchServise";
import jwt_decode from "jwt-decode";
import Footer from "../Footer/Footer";
import ItemCard from "../itemCard/ItemCard";
import loginPage from "./LoginPage";

const PersonalDashboard = () => {
    const user = useUser();
    const [adverts, setAdverts] = useState([]);

    const [currentPage, setCurrentPage] = useState(0);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if (fetching) {
            ajax(`/api/adverts/user?page=${currentPage}&limit=12`, "GET", user.jwt).then((advertsData) => {
                setAdverts([...adverts, ...advertsData])
                setCurrentPage(prevState => prevState + 1);
            }).finally(() => {
                setFetching(false);
            });
        }
    }, [fetching]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, []);

    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100)
            setFetching(true);
    };

    return (
        <div>
            <Container style={{marginBottom: "30px"}}>
                <Row xs="auto" md="auto" lg="auto">
                    {adverts.map((advert) => (
                        <Col key={advert.id}>
                            {
                                ((advert.user.username) !== (jwt_decode(user.jwt).sub) || (advert.status === "Объявление в архиве")) ?
                                   <></>
                                    :
                                    <ItemCard advert={advert}/>
                            }
                        </Col>
                    ))}
                </Row>
            </Container>
            <Footer adverts={adverts}/>
        </div>
    );
};

export default PersonalDashboard;