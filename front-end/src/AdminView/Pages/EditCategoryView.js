import React, {useEffect, useRef, useState} from 'react';
import {useUser} from "../../UserProvider/UserProvider";
import {useNavigate, useParams} from "react-router-dom";
import ajax from "../../services/fetchServise";
import {Accordion, Button, Container, Form, InputGroup, Row, Table} from "react-bootstrap";

const EditCategoryView = () => {

    const user = useUser();
    const navigate = useNavigate();
    const {categoryId} = useParams();
    const {subId} = useParams();

    const [category, setCategory] = useState({
        name: "",
    });

    const [subCategoryName, setSubCategoryName] = useState("");

    const [subCategory, setSubCategory] = useState([]);

    const previousCategoryValue = useRef(category);

    // const previousSubCategoryValue = useRef(subCategory);

    function updateCategory(prop, value) {
        const newCategory = {...category};
        newCategory[prop] = value;
        setCategory(newCategory);
    }

    // function updateSubCategory(prop, value) {
    //     const newSubCategoryName = {...[subCategory.map((sub) => sub.name)]};
    //     newSubCategoryName[prop] = value;
    //     console.log(newSubCategoryName)
    //     setSubCategory(subCategory.map((sub) => sub.name === newSubCategoryName));
    // }

    function saveCategory() {
        if (previousCategoryValue.current.name !== category.name) {
            updateCategory("name", category.name);
        }
        persist();
    }


    function saveSubCategory() {
        const reqBody = {
            name: subCategoryName,
        }
        ajax(`/api/admin/categories/${categoryId}`, "POST", user.jwt, reqBody)
            .then((data) => {
                if (data) {
                    setSubCategoryName("");
                }
            });
    }

    function deleteCategory() {
        ajax(`/api/admin/categories/${categoryId}`, "DELETE", user.jwt)
            .then(() => setCategory(null))
        navigate("/admin/categories");
    }

    function deleteSubCategory(subId) {
        ajax(`/api/admin/categories/${categoryId}/${subId}`, "DELETE", user.jwt)
        // .then(() => setSubCategory(null))

    }

    function persist() {
        ajax(`/api/admin/categories/${categoryId}`, "PUT", user.jwt, category)
            .then((categoryData) => {
                setCategory(categoryData);
            });
    };

    // function subPersist(subId) {
    //     ajax(`/api/admin/categories/${categoryId}/${subId}`, "PUT", user.jwt, subCategory[0])
    //         .then((subCategoryData) => {
    //             setSubCategory(subCategoryData);
    //         });
    // };


    useEffect(() => {
        if (previousCategoryValue.current.name !== "") {
            persist();
        }
        previousCategoryValue.current = category;
    }, []);


    // useEffect(() => {
    //     if (previousSubCategoryValue.current.name !== "") {
    //         subPersist();
    //     }
    //     previousSubCategoryValue.current = subCategory.map((sub) => sub.name);
    // }, []);


    useEffect(() => {
        ajax(`/api/admin/categories/${categoryId}`, "GET", user.jwt).then((response) => {
                let subcategoryData = response;
                if (Array.isArray(response)) {
                    setCategory(response && response.map((cat) => cat.category)[0]);
                    setSubCategory(subcategoryData.map((element) => element));
                } else {
                    setCategory(response);
                }
            }
        );

    }, [subCategoryName]);

    return (
        <div>

            <Accordion defaultActiveKey="1" className=" md-6" style={{width: "700px"}}>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <Form className="row">
                            <Form.Group className="mb-3" controlId="formBasicInput">
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    value={category.name}
                                    type="text"
                                    placeholder="Category name"
                                    onChange={(e) => updateCategory("name", e.target.value)}/>
                            </Form.Group>
                            <Container className="col-md-100">
                                <Row className="col-md-3">
                                    <><Button className="p-2" variant="primary" type="button"
                                              onClick={() => saveCategory()}>
                                        Submit
                                    </Button></>
                                    <><Button className="p-2 col-md-offset-3" variant="danger" type="button"
                                              onClick={() => deleteCategory()}>
                                        Delete
                                    </Button></>
                                </Row>
                            </Container>
                        </Form>
                    </Accordion.Header>
                    <Accordion.Body>
                        <Table>
                            <tbody>
                            {
                                subCategory.map((sub) =>
                                    (
                                        <tr key={sub.name}>
                                            <td>{sub.id}</td>
                                            <td>{sub.name}</td>
                                            <td>
                                                <><Button type="button"
                                                    // onClick={() => saveSubCategory()}
                                                >Edit</Button></>
                                            </td>
                                            <td><><Button type="button" variant="danger"
                                                          onClick={() => deleteSubCategory(sub.id)}>Delete</Button></>
                                            </td>
                                        </tr>
                                    )
                                )
                            }
                            </tbody>
                        </Table>
                        <InputGroup className="mb-3">
                            <Button
                                variant="outline-primary"
                                id="button-addon1"
                                onClick={() => saveSubCategory()}
                            >
                                Save
                            </Button>
                            <Form.Control
                                aria-label="Example text with button addon"
                                aria-describedby="basic-addon1"
                                value={subCategoryName}
                                type="text"
                                placeholder="Добавить подкатегорию"
                                onChange={(e) => setSubCategoryName(e.target.value)}
                            />
                        </InputGroup>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};

export default EditCategoryView;