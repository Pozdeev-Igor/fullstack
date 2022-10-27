import React, {useEffect} from 'react';
import jwt_decode from "jwt-decode";
import {Card} from "react-bootstrap";
import {MDBBadge} from "mdb-react-ui-kit";
import {useUser} from "../UserProvider/UserProvider";
import {useNavigate} from "react-router-dom";

const ItemCard = (props) => {
    const user = useUser();
    const navigate = useNavigate();

    function currencyFormat(num) {
        if (!num) {
            return 0;
        } else {
            let bum = '' + num;
            return bum.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + '   ₽'
        }
    }

    return (
        <Card
            style={{width: '18rem', marginTop: '30px', cursor: "pointer"}}
            onClick={() => {
                (user.jwt && props.advert.user.username === jwt_decode(user.jwt).sub) ?
                    navigate(`/adverts/personal/${props.advert.id}`)
                    :
                    navigate(`/adverts/${props.advert.user.id}/${props.advert.id}`);
            }}>
            <Card.Img key={props.advert.id} variant="top" src={props.advert.image}/>
            <Card.Body>
                <Card.Title style={{borderBottom: "#0D47A1"}}>{props.advert.title}</Card.Title>
                {props.advert.price !== null ?
                    <h4>
                        <MDBBadge pill className='me-2 text-dark' color='light' light>
                            {currencyFormat(props.advert.price)}
                        </MDBBadge>
                    </h4>
                    :
                    <h4>
                        <MDBBadge pill className='ms-0 text-dark' color='light' light>
                            <cite>
                                Цена не указана
                            </cite>
                        </MDBBadge>
                    </h4>
                }
            </Card.Body>
        </Card>
    );
};

export default ItemCard;