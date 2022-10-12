import React, {useEffect, useState} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useUser} from "../UserProvider/UserProvider";
import LoginModal from "../Modal/LoginModal";
import ajax from "../services/fetchServise";
import jwt_decode from "jwt-decode";
import {NumericFormat} from 'react-number-format';

const HomePage = () => {
    const navigate = useNavigate();
    const user = useUser();

    const [currentPage, setCurrentPage] = useState(0);
    const [fetching, setFetching] = useState(true);

    const [adverts, setAdverts] = useState([]);

    const [show, setShow] = useState(() => false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        if (fetching) {
            ajax(`/api/adverts?page=${currentPage}&limit=16`, "GET", user.jwt).then((advertsData) => {
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
                <Row>
                    {adverts.map((advert) => (
                        advert.status === "Объявление на проверке" ?
                            <></>
                            :
                            <Col>
                                <Card
                                    key={advert.id}
                                    style={{width: '18rem', marginTop: '30px', cursor: "pointer"}}
                                    onClick={() => {
                                        (user.jwt && advert.user.username === jwt_decode(user.jwt).sub) ?
                                            navigate(`/adverts/personal/${advert.id}`)
                                            :
                                            navigate(`/adverts/${advert.user.id}/${advert.id}`);
                                    }}>
                                    <Card.Img key={advert.id} variant="top" src={advert.image}/>
                                    <Card.Body>
                                        <Card.Title>{advert.title}</Card.Title>
                                        {advert.price !== null ?
                                            <Card.Text>
                                                <NumericFormat
                                                    className="numericFormat"
                                                    prefix="₽ "
                                                    type="text"
                                                    value={advert.price}
                                                    thousandSeparator=" "
                                                />
                                            </Card.Text>
                                            :
                                            <Card.Text>
                                                Цена не указана
                                            </Card.Text>
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
