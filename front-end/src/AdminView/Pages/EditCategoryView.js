import React, {useEffect, useRef, useState} from 'react';
import {useUser} from "../../UserProvider/UserProvider";
import {useNavigate, useParams} from "react-router-dom";
import ajax from "../../services/fetchServise";
import {Accordion, Button, Col, Container, Form, Row} from "react-bootstrap";
import TableSubcategories from "../Components/TableSubcategories";

const EditCategoryView = () => {

    const user = useUser();
    const navigate = useNavigate();
    const {categoryId} = useParams();
    // const {subId} = useParams();

    const [category, setCategory] = useState({
        name: "",
    });

    const previousCategoryValue = useRef(category);

    function updateCategory(prop, value) {
        const newCategory = {...category};
        newCategory[prop] = value;
        setCategory(newCategory);
    }

    function saveCategory() {
        if (previousCategoryValue.current.name !== category.name) {
            updateCategory("name", category.name);
        }
        persist();
    }

    function deleteCategory() {
        ajax(`/api/admin/categories/${categoryId}`, "DELETE", user.jwt)
            .then(() => setCategory(null))
        navigate("/admin/categories");
    }

    function persist() {
        ajax(`/api/admin/categories/${categoryId}`, "PUT", user.jwt, category)
            .then((categoryData) => {
                setCategory(categoryData);
            });
    };

    useEffect(() => {
        if (previousCategoryValue.current.name !== "") {
            persist();
        }
        previousCategoryValue.current = category;
    }, []);

    useEffect(() => {
        ajax(`/api/admin/categories/${categoryId}`, "GET", user.jwt).then((response) => {
                if (Array.isArray(response)) {
                    setCategory(response && response.map((cat) => cat.category)[0]);
                } else {
                    setCategory(response);
                }
            }
        );
    }, []);

    return (
        <div>
            <Accordion defaultActiveKey="1" className=" md-6" style={{width: "700px"}}>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <Form className="row">
                            <Container>
                                <Row>
                                    <Col>
                                        <Form.Control
                                            value={category.name}
                                            type="text"
                                            placeholder="Category name"
                                            onChange={(e) => updateCategory("name", e.target.value)}/>
                                    </Col>
                                    <Col>
                                        <Button variant="primary" type="button"
                                                onClick={() => saveCategory()}>
                                            Submit
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button variant="danger" type="button"
                                                onClick={() => deleteCategory()}>
                                            Delete
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
                        </Form>
                    </Accordion.Header>
                    <Accordion.Body>
                        <TableSubcategories/>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};

export default EditCategoryView;