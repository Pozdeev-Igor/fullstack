import React, {useEffect, useState} from 'react';
import {useUser} from "../UserProvider/UserProvider";
import {Card, Col, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import ajax from "../services/fetchServise";
import jwt_decode from "jwt-decode";
import {NumericFormat} from "react-number-format";

const PersonalDashboard = (props) => {
    const {getUsersData} = props;
    const user = useUser();
    const navigate = useNavigate();
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
        console.log(adverts)

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
            <Container className="justify-content-start" style={{marginBottom: "30px"}}>
                <Row>
                    {adverts.map((advert) => (
                        <Col key={advert.id}>
                            {
                                (advert.user.username) === (jwt_decode(user.jwt).sub) ?
                                    <Card style={{
                                        width: '18rem',
                                        cursor: "pointer",
                                        marginTop: "30px",
                                    }}
                                          onClick={() => navigate(`/adverts/personal/${advert.id}`)}>
                                        <Card.Img variant="top" key={advert.id} src={advert.image}/>
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
                                    :
                                    <></>
                            }
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default PersonalDashboard;