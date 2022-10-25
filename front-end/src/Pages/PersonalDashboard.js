import React, {useEffect, useState} from 'react';
import {useUser} from "../UserProvider/UserProvider";
import {Card, Col, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import ajax from "../services/fetchServise";
import jwt_decode from "jwt-decode";
import {MDBBadge} from "mdb-react-ui-kit";
import Footer from "../Footer/Footer";

const PersonalDashboard = (props) => {
    // const {getUsersData} = props;
    const user = useUser();
    const navigate = useNavigate();
    const [adverts, setAdverts] = useState([]);

    const [currentPage, setCurrentPage] = useState(0);
    const [fetching, setFetching] = useState(true);


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
                                (advert.user.username) === (jwt_decode(user.jwt).sub) ?
                                    <Card className="justify-content-lg-start " style={{
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
                                                    {/*<h4>*/}
                                                        <MDBBadge pill className='me-2 text-dark' color='light' light>
                                                            {currencyFormat(advert.price)}
                                                        </MDBBadge>
                                                    {/*</h4>*/}
                                                </Card.Text>
                                                :
                                                <Card.Text>
                                                    {/*<h4>*/}
                                                        <MDBBadge pill className='me-2 text-dark' color='light' light>
                                                            Цена не указана
                                                        </MDBBadge>
                                                    {/*</h4>*/}
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
            <Footer/>
        </div>
    );
};

export default PersonalDashboard;