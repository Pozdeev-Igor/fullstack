import React, {useEffect, useRef, useState} from 'react';
import {useUser} from "../../UserProvider/UserProvider";
import {useNavigate, useParams} from "react-router-dom";
import ajax from "../../services/fetchServise";
import {Accordion, Button, Container, Form, Row, Table} from "react-bootstrap";

const EditCategoryView = () => {

    const user = useUser();
    const navigate = useNavigate();
    const {categoryId} = useParams();
    const [categoryName, setCategoryName] = useState("");

    const [category, setCategory] = useState({
        name: "",
    });

    const [subCategory, setSubCategory] = useState([]);

    const previousCategoryValue = useRef(category);

    function updateCategory(prop, value) {
        const newCategory = {...category};
        newCategory[prop] = value;
        setCategory(newCategory);
    }

    // function updateSubCategory(prop, value) {
    //     const newSubCategory = {...subCategory};
    //     newSubCategory[prop] = value;
    //     setSubCategory(newSubCategory);
    // }

    function save() {
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
                let subcategoryData = response;
                if (Array.isArray(response)) {
                    setCategory(response && response.map((cat) => cat.category)[0]);
                    setSubCategory(subcategoryData.map((element) => element));
                    console.log("rendered")
                    console.log(subCategory)

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
                            <Form.Group className="mb-3" controlId="formBasicInput">
                                <Form.Label >Category</Form.Label>
                                <Form.Control
                                    value={category.name}
                                    type="text"
                                    placeholder="Category name"
                                    onChange={(e) => updateCategory("name", e.target.value)}/>
                            </Form.Group>
                            <Container className="col-md-100">
                            <Row className="col-md-3">
                            <Button className="p-2" variant="primary" type="button" onClick={() => save()}>
                                Submit
                            </Button>
                            <Button className="p-2 col-md-offset-3" variant="danger" type="button" onClick={() => deleteCategory()}>
                                Delete
                            </Button>
                            </Row>
                            </Container>
                        </Form>
                    </Accordion.Header>
                    <Accordion.Body>
                        <Table>
                            <tbody>
                            {console.log(subCategory)}
                            {
                                subCategory.map((sub) =>
                                (
                                <tr>
                                <td>{sub.id}</td>
                                <td><Form.Control
                                    value={sub.name}
                                    type="text"
                                    placeholder="SubCategory name"
                                    onChange={(e) => updateCategory("name", e.target.value)}/></td>
                                <td><Button type="button">Edit</Button></td>
                                <td><Button type="button" variant="danger">Delete</Button></td>
                                </tr>

                            )
                            )
                            }
                            </tbody>
                        </Table>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};

export default EditCategoryView;