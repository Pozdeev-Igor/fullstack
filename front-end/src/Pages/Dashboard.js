import React from 'react';
import {Button} from "react-bootstrap";
import {Navigate, useNavigate} from "react-router-dom";

const Dashboard = () => {
    let navigate = useNavigate();
    return (
        <div>
            <h1>Here you gonna see dashboard</h1>
            <Button variant="link" onClick={() => {
                navigate("/")
            } }>HOME PAGE</Button>
        </div>
    );
};

export default Dashboard;