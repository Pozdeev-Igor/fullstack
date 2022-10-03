import React, {useEffect, useState} from 'react';
import {Button, Table} from "react-bootstrap";
import ajax from "../../services/fetchServise";
import {useUser} from "../../UserProvider/UserProvider";
import {useNavigate} from "react-router-dom";

const UsersView = () => {
    const user = useUser();
    const navigate = useNavigate();
    const [userList, setUserList] = useState([]);

    async function getAllUsers() {
        const usersData = await ajax("/api/admin/users", "GET", user.jwt).then((usersData) => usersData)
        setUserList(usersData);
    }

    useEffect(() => {
        getAllUsers();
    }, [userList]);

    return (
        <div>
            <Table striped bordered hover className="mt-5">
                <thead>

                <tr>
                    <th>User id</th>
                    <th>User's Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Started date</th>
                    <th>Activation code</th>
                    <th>Authorities</th>
                </tr>
                </thead>
                <tbody>
                {userList.map((u) => (
                    <tr key={u.id} style={{cursor:"pointer"}} onClick={() => navigate(`/admin/users/${u.id}`)}>
                        <td>{u.id}</td>
                        <td>{u.name}</td>
                        <td>{u.username}</td>
                        <td>{u.email}</td>
                        <td>{u.cohortStartDate}</td>
                        <td>{u.activationCode}</td>
                        <td>Authorities</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default UsersView;