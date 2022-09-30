import React from 'react';
import {Button, Container, Form} from "react-bootstrap";

const AdvertView = () => {
    return (
        <div className="w-75">
            <Container className="justify-content-lg-center">
                <h1>Here you gonna see advertisement</h1>
                <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label>Multiple files input example</Form.Label>
                    <Form.Control type="file" multiple/>
                </Form.Group>
                <Button className="justify-content-end">Upload</Button>
            </Container>
        </div>
    );
};

export default AdvertView;