import React from 'react';
import jwt_decode from "jwt-decode";
import {Card} from "react-bootstrap";
import {MDBBadge, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBRipple} from "mdb-react-ui-kit";
import {useUser} from "../UserProvider/UserProvider";
import {useNavigate} from "react-router-dom";
import currencyFormat from "../util/currencyFormat";

const ItemCard = (props) => {
    const user = useUser();
    const navigate = useNavigate();

    return (
        <MDBCard
            style={{width: '18rem', marginTop: '30px', cursor: "pointer"}}
            onClick={() => {
                (user.jwt && props.advert.user.username === jwt_decode(user.jwt).sub) ?
                    navigate(`/adverts/personal/${props.advert.id}`)
                    :
                    navigate(`/adverts/${props.advert.user.id}/${props.advert.id}`);
            }}>
            <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
            <MDBCardImage key={props.advert.id} fluid src={props.advert.image}/>
                <a>
                    <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                </a>
            </MDBRipple>
            <MDBCardBody>
                <MDBCardTitle style={{borderBottom: "#0D47A1"}}>{props.advert.title}</MDBCardTitle>
                {props.advert.price !== null ?
                    <h5>
                        <MDBBadge pill className='me-2 text-dark' color='light' light>
                            {currencyFormat(props.advert.price)}
                        </MDBBadge>
                    </h5>
                    :
                    <h5>
                        <MDBBadge pill className='ms-0 text-dark' color='light' light>
                            <cite>
                                Цена не указана
                            </cite>
                        </MDBBadge>
                    </h5>
                }
            </MDBCardBody>
        </MDBCard>
    );
};

export default ItemCard;