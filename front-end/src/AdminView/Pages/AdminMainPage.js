import React from 'react';
import {Button, Table} from "react-bootstrap";
import {useUser} from "../../UserProvider/UserProvider";
import {useNavigate} from "react-router-dom";

const AdminMainPage = () => {

    const user = useUser();
    const navigate = useNavigate();

    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Usage</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>1</td>
                <td>Категории</td>
                <td>Редактировать категории</td>
                <td><Button onClick={() => navigate("/admin/categories")}>Войти</Button></td>
            </tr>
            <tr>
                <td>2</td>
                <td>Пользователи</td>
                <td>Редактировать пользователей</td>
                <td><Button onClick={() => navigate("/admin/users")}>Войти</Button></td>
            </tr>
            <tr>
                <td>3</td>
                <td colSpan={2}>Larry the Bird</td>
                <td>@twitter</td>
            </tr>
            </tbody>
        </Table>
    );
};

export default AdminMainPage;