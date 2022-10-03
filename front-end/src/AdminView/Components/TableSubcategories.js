import React, {useEffect, useState} from 'react';
import {Button, Container, Form, InputGroup, Table} from "react-bootstrap";
import ajax from "../../services/fetchServise";
import {useParams} from "react-router-dom";
import {useUser} from "../../UserProvider/UserProvider";

const TableSubcategories = () => {

    const user = useUser();
    const [subCategoryName, setSubCategoryName] = useState("");
    const [subCategory, setSubCategory] = useState([]);

    const {categoryId} = useParams();


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

    function deleteSubCategory(subId) {
        ajax(`/api/admin/categories/${categoryId}/${subId}`, "DELETE", user.jwt)
    }

    useEffect(() => {
        ajax(`/api/admin/categories/${categoryId}`, "GET", user.jwt).then((response) => {
                let subcategoryData = response;
                if (Array.isArray(response)) {
                    setSubCategory(subcategoryData.map((element) => element));
                }
            }
        );

    }, [subCategory]);


    return (
        <Container>
            <Table>
                <tbody>
                {
                    subCategory.map((sub) =>
                        (
                            <tr key={sub.name}>
                                <td>{sub.id}</td>
                                <td>{sub.name}</td>
                                <td>
                                    <Button type="button">Edit</Button>
                                </td>
                                <td><Button type="button" variant="danger"
                                              onClick={() => deleteSubCategory(sub.id)}>Delete</Button>
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
        </Container>
    );
};

export default TableSubcategories;