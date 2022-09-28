import React, {useEffect, useState} from 'react';
import {useUser} from "../../UserProvider/UserProvider";
import {useNavigate, useParams} from "react-router-dom";
import ajax from "../../services/fetchServise";
import {Accordion, Button, Container, Form, Row, Table} from "react-bootstrap";

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

            {/*<Form className="row">*/}
            {/*    <Form.Group className="mb-3" controlId="formBasicInput">*/}
            {/*        <Form.Label >Category</Form.Label>*/}
            {/*        <Form.Control*/}
            {/*            value={category.name}*/}
            {/*            type="text"*/}
            {/*            placeholder="Category name"*/}
            {/*            onChange={(e) => updateCategory("name", e.target.value)}/>*/}
            {/*    </Form.Group>*/}
            {/*    <Container className="col-md-100">*/}
            {/*        <Row className="col-md-3">*/}
            {/*            <><Button className="p-2" variant="primary" type="button" onClick={() => save()}>*/}
            {/*                Submit*/}
            {/*            </Button></>*/}
            {/*            <><Button className="p-2 col-md-offset-3" variant="danger" type="button" onClick={() => deleteCategory()}>*/}
            {/*                Delete*/}
            {/*            </Button></>*/}
            {/*        </Row>*/}
            {/*    </Container>*/}
            {/*</Form>*/}

                    )
                )
                }
        </>
    )
        ;
};


export default SubCategoryView;