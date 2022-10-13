import React from 'react';
import {Table} from "react-bootstrap";
import {useUser} from "../../UserProvider/UserProvider";
import {useNavigate} from "react-router-dom";

const AdminMainPage = () => {

    const user = useUser();
    const navigate = useNavigate();

    return (
        <Table striped bordered hover>
            <thead>
            </thead>
            <tbody>
            <tr style={{cursor: "pointer"}} onClick={() => navigate("/admin/categories")}>
                <td>1</td>
                <td>Категории</td>
                <td>Редактировать категории</td>
            </tr>
            <tr style={{cursor: "pointer"}} onClick={() => navigate("/admin/users")}>
                <td>2</td>
                <td>Пользователи</td>
                <td>Редактировать пользователей</td>
            </tr>
            <tr style={{cursor: "pointer"}} onClick={() => navigate("/admin/adverts")}>
                <td>3</td>
                <td>Объявления</td>
                <td>Редактировать объявления</td>
            </tr>

            </tbody>
        </Table>
    );
};

export default AdminMainPage;