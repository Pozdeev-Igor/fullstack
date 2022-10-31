import React, {useEffect, useState} from 'react';
import ajax from "../../services/fetchServise";
import {useUser} from "../../UserProvider/UserProvider";
import {Button, Form, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const CategoryView = () => {

    const user = useUser();
    const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    function saveCategory() {
        const reqBody = {
            name: name,
        }
        ajax("/api/admin/categories", "POST", user.jwt, reqBody)
            .then((data) => {
                if (data) {
                    setName("");
                }
            });
    }

    async function getCategories() {
        const response = await ajax("/api/admin/categories", "GET", user.jwt).then((response) => response);
        setCategories(response);
    }

    useEffect(() => {
        getCategories();
    }, [name]);

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicInput">
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                    value={name}
                    type="text"
                    placeholder="Enter category name"
                    onChange={(e) => setName(e.target.value)}/>
            </Form.Group>
            <Button className="m-3"
                    variant="primary"
                    type="button"
                    onClick={() => {
                        saveCategory();
                    }
                    }
            >
                Save
            </Button>

            <Table striped bordered hover className="mt-5">
                <thead>
                <tr>
                    <th>id</th>
                    <th>Category Name</th>
                </tr>
                </thead>
                <tbody>
                {categories && categories.map((category) => (
                    <tr key={category.id} style={{cursor: "pointer"}}
                        onClick={() => navigate(`/admin/categories/${category.id}`)}>
                        <td>{category.id}</td>
                        <td>{category.name}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Form>
    );
};

export default CategoryView;