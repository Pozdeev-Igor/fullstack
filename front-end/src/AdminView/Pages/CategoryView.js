import React, {useEffect, useState} from 'react';
import ajax from "../../services/fetchServise";
import {useUser} from "../../UserProvider/UserProvider";
import {Button, Form, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const CategoryView = () => {

    const user = useUser();
    const [name, setName] = useState("");
    const [category, setCategory] = useState(null);

    // function saveCategory() {
    //     const reqBody = {
    //         name: name,
    //     }
    //     ajax("api/admin/categories", "POST", user.jwt, reqBody)
    //         .then((data) => {
    //             if (data) {
    //                 setCategory(data)
    //                 console.log(data);
    //             }
    //         })
    // }

    useEffect(() => {
        ajax("api/admin/categories", "GET", user.jwt)
            .then((categoryResponse) => categoryResponse.json())
            .then(data => setCategory(data.name))
    }, []);

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicInput">
                <Form.Label>Category Name</Form.Label>
                <Form.Control type="text" placeholder="Enter category name" />
            </Form.Group>
            <Button variant="primary" type="button" onClick={() => {
                console.log(category)}}>
                Save
            </Button>
            {/*<h2>{category.name}</h2>*/}
        </Form>
    );
};

export default CategoryView;