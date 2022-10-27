import React, {useEffect, useState} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useUser} from "../UserProvider/UserProvider";
import LoginModal from "../Modal/LoginModal";
import ajax from "../services/fetchServise";
import jwt_decode from "jwt-decode";
import {MDBBadge} from "mdb-react-ui-kit";
import Footer from "../Footer/Footer";
import ItemCard from "../itemCard/ItemCard";

const HomePage = () => {
    const navigate = useNavigate();
    const user = useUser();

    const [currentPage, setCurrentPage] = useState(0);
    const [fetching, setFetching] = useState(true);

    const [adverts, setAdverts] = useState([]);

    const [show, setShow] = useState(() => false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // function currencyFormat(num) {
    //     if (!num) {
    //         return 0;
    //     } else {
    //         let bum = '' + num;
    //         return bum.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + '   ₽'
    //     }
    // }


    useEffect(() => {
        if (fetching) {
            ajax(`/api/adverts?page=${currentPage}&limit=12`, "GET", user.jwt).then((advertsData) => {
                setAdverts([...adverts, ...advertsData])
                setCurrentPage(prevState => prevState + 1);

            }).finally(() => setFetching(false));
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
            <Container className="row-cols-lg-1" style={{marginBottom: "30px"}}>
                <Row xs="auto" md="auto" lg="auto">
                    {adverts.map((advert) => (
                        advert.status === "Объявление на проверке" ?
                            <></>
                            :
                            <Col key={advert.id}>
                                <ItemCard advert={advert}/>
                            </Col>
                    ))}
                </Row>
            </Container>
            <LoginModal show={show} handleClose={handleClose} handleShow={handleShow}/>

            <Footer/>
        </div>
    );
};

export default HomePage;
