import React, {useEffect, useRef, useState} from 'react';
import {useUser} from "../../UserProvider/UserProvider";
import {useNavigate, useParams} from "react-router-dom";
import ajax from "../../services/fetchServise";
import {Button, Form} from "react-bootstrap";

const EditCategoryView = () => {

    const user = useUser();
    const navigate = useNavigate();
    const {categoryId} = useParams();
    const [categoryName, setCategoryName] = useState("");

    const [category, setCategory] = useState({
        name: "",
    });

    const [subCategory, setSubCategory] = useState({
        name: "",
        category: category,
    });

    const previousCategoryValue = useRef(category);

    function updateCategory(prop, value) {
        const newCategory = {...category};
        newCategory[prop] = value;
        setCategory(newCategory);
    }

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

    // useEffect(() => {
    //     if (previousCategoryValue.current.name !== "") {
    //         persist();
    //     }
    //     previousCategoryValue.current = category;
    // }, []);

    useEffect(() => {
        ajax(`/api/admin/categories/${categoryId}`, "GET", user.jwt).then((response) => {
                // let subcategoryData = response;
                if (Array.isArray(response)) {
                    setCategory(response && response.map((cat) => cat.category)[0]);
                    setSubCategory(response && response.map((element) => element));
                    console.log(response && response.map((element) => element))
                } else {
                    setCategory(response);
                    console.log(response)
                }

            }
        );

    }, [category]);

    // useEffect(() => {
    //     ajax(`/api/admin/categories/${categoryId}`, "GET", user.jwt).then((response) => {
    //             let subCategoryData = response;
    //             setSubCategory(subCategoryData);
    //             console.log(subCategory)
    //         }
    //     );
    // }, []);


    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicInput">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        value={category.name}
                        type="text"
                        placeholder="Category name"
                        onChange={(e) => updateCategory("name", e.target.value)}/>
                </Form.Group>
                <Button className="m-3" variant="primary" type="button" onClick={() => save()}>
                    Submit
                </Button>
                <Button className="m-3" variant="danger" type="button" onClick={() => deleteCategory()}>
                    Delete
                </Button>
            </Form>
        </div>
    );
};

export default EditCategoryView;