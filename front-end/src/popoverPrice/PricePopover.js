import React from 'react';
import {MDBBtn, MDBInput, MDBPopover, MDBPopoverBody, MDBPopoverHeader} from "mdb-react-ui-kit";
import {Col, Row} from "react-bootstrap";
import currencyFormat from "../util/currencyFormat";

const PricePopover = (props) => {

    return (
        <MDBPopover
            rounded
            style={{marginBottom: "30px"}}
            size='lg'
            color='primary'
            btnChildren={currencyFormat(props.advert.price)}>
            <MDBPopoverHeader>
                <Row className="d-flex justify-content-between">
                    <Col className='mt-1'>{currencyFormat(props.advert.price)} </Col>
                </Row>
            </MDBPopoverHeader>
            <MDBPopoverBody>
                <Row>
                    <Col className="justify-content-start">
                        <MDBInput
                            style={{marginTop: "30px"}}
                            label={props.advert.price}
                            id='form1'
                            type='number'
                            value={props.advert.price === null ? 0 : (props.advert.price)}
                            onChange={(e) => props.updateAdvert("price", e.target.value)}/>
                        <MDBBtn className='mt-2' rounded
                                onClick={() => props.savePrice()}>Edit</MDBBtn>
                    </Col>
                </Row>
            </MDBPopoverBody>
        </MDBPopover>
    );
};

export default PricePopover;