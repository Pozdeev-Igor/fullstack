import React, {useEffect, useState} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useUser} from "../UserProvider/UserProvider";
import LoginModal from "../Modal/LoginModal";
import ajax from "../services/fetchServise";
import jwt_decode from "jwt-decode";
import {MDBBadge, MDBSpinner} from "mdb-react-ui-kit";
import CommentsContainer from "../Comment/CommentsContainer";

const HomePage = () => {
    const navigate = useNavigate();
    const user = useUser();

    const [currentPage, setCurrentPage] = useState(0);
    const [fetching, setFetching] = useState(true);

    const [adverts, setAdverts] = useState([]);

    const [show, setShow] = useState(() => false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function currencyFormat(num) {
        if (!num) {
            return 0;
        } else {
            let bum = '' + num;
            return bum.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + '   ₽'
        }
    }


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
                                <Card

                                    style={{width: '18rem', marginTop: '30px', cursor: "pointer"}}
                                    onClick={() => {
                                        (user.jwt && advert.user.username === jwt_decode(user.jwt).sub) ?
                                            navigate(`/adverts/personal/${advert.id}`)
                                            :
                                            navigate(`/adverts/${advert.user.id}/${advert.id}`);
                                    }}>
                                    <Card.Img key={advert.id} variant="top" src={advert.image}/>
                                    <Card.Body>
                                        <Card.Title style={{borderBottom: "#0D47A1"}}>{advert.title}</Card.Title>
                                        {advert.price !== null ?
                                            <h4>
                                                <MDBBadge pill className='me-2 text-dark' color='light' light>
                                                    {currencyFormat(advert.price)}
                                                </MDBBadge>
                                            </h4>
                                            :
                                            <h4>
                                                <MDBBadge pill className='me-2 text-dark' color='light' light>
                                                    Цена не указана
                                                </MDBBadge>
                                            </h4>
                                        }
                                    </Card.Body>
                                </Card>
                            </Col>
                    ))}
                </Row>
            </Container>
            <LoginModal show={show} handleClose={handleClose} handleShow={handleShow}/>

        </div>
    );
};

export default HomePage;
