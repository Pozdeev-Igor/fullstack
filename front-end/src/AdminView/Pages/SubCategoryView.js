import React, {useEffect, useState} from 'react';
import {useUser} from "../../UserProvider/UserProvider";
import {useNavigate, useParams} from "react-router-dom";
import ajax from "../../services/fetchServise";
import {Accordion, Button, Form, Table} from "react-bootstrap";

const SubCategoryView = () => {

    const user = useUser();
    const [name, setName] = useState("");
    const [categoryId, SetCategoryId] = useState(null);
    const [subCategories, setSubCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    let {categoryID} = useParams();

    const navigate = useNavigate();

    async function getCategories() {
        const response = await ajax("/api/admin/categories", "GET", user.jwt).then((response) => response);
        setCategories(response);
    }

    useEffect(() => {
        getCategories();
    }, [categoryName]);

    function saveCategory() {
        const reqBody = {
            name: name,
        }
        ajax("/api/admin/categories", "POST", user.jwt, reqBody)
            .then((data) => {
                if (data) {
                    setCategoryName("");
                }
            });
    }

    function saveSubCategory() {
        const reqBody = {
            name: name,
            categoryId: categoryId,
        }
        ajax("/api/admin/subcategories", "POST", user.jwt, reqBody)
            .then((data) => {
                if (data) {
                    setName("");
                }
            });
    };

    async function getSubCategories() {
        const response = await ajax(`/api/admin/subcategories`, "GET", user.jwt).then((response) => response);
        setSubCategories(response);
        console.log(categoryID)
    }

    useEffect(() => {
        getSubCategories();
    }, [name]);

    return (
        <>

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
            </Form>

            <Accordion>
                {categories.map((category) => (
                        <Accordion.Item eventKey="5">
                            <Accordion.Header>{category.name}</Accordion.Header>
                            <Accordion.Body>

                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicInput">
                                        <Form.Label>SubCategory Name</Form.Label>
                                        <Form.Control
                                            value={name}
                                            type="text"
                                            placeholder="Enter subCategory name"
                                            onChange={(e) => setName(e.target.value)}/>
                                    </Form.Group>
                                    <Button className="m-3"
                                            variant="primary"
                                            type="button"
                                            onClick={() => {
                                                saveSubCategory();
                                            }
                                            }
                                    >
                                        Save
                                    </Button>
                                </Form>

                                <Table striped bordered hover className="mt-5">
                                    <thead>
                                    <tr>
                                        <th>Category id</th>
                                        <th>SubCategory Name</th>
                                        <th>Usage</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {subCategories.map((subCategory) => (
                                        <tr key={subCategory.id}>
                                            <td>{subCategory.category.id}</td>
                                            <td>{subCategory.name}</td>
                                            <td><Button
                                                onClick={() => navigate(`/admin/categories/${subCategory.id}`)}>Edit</Button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </Accordion.Body>
                        </Accordion.Item>
                    )
                )
                }
            </Accordion>
        </>
    )
        ;
};


export default SubCategoryView;