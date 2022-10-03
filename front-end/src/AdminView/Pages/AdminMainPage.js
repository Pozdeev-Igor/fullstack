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
                {/*<th>Usage</th>*/}
            </tr>
            </thead>
            <tbody>
            <tr  style={{cursor:"pointer"}} onClick={() => navigate("/admin/categories")}>
                <td>1</td>
                <td>Категории</td>
                <td>Редактировать категории</td>
                {/*<td><Button onClick={() => navigate("/admin/categories")}>Edit</Button></td>*/}
            </tr>
            {/*<tr style={{cursor:"pointer"}} onClick={() => navigate("/admin/subcategories")}>*/}
            {/*    <td>2</td>*/}
            {/*    <td>Подкатегории</td>*/}
            {/*    <td>Редактировать подкатегории</td>*/}
            {/*    /!*<td><Button onClick={() => navigate("/admin/subcategories")}>Edit</Button></td>*!/*/}
            {/*</tr>*/}
            <tr  style={{cursor:"pointer"}} onClick={() => navigate("/admin/users")}>
                <td>2</td>
                <td>Пользователи</td>
                <td>Редактировать пользователей</td>
                {/*<td><Button onClick={() => navigate("/admin/users")}>Edit</Button></td>*/}
            </tr>

            </tbody>
        </Table>
    );
};

export default AdminMainPage;