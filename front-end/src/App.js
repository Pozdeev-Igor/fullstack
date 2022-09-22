import './App.css';
import {Route, Routes} from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import PrivateRoute from "./customRoutes/PrivateRoute";
import AdvertView from "./Pages/AdvertView";
import Dashboard from "./Pages/Dashboard";
import SignUpPage from "./Pages/SignUpPage";
import CategoryView from "./AdminView/Pages/CategoryView";
import PersonalDashboard from "./Pages/PersonalDashboard";
import React, {useEffect, useState} from "react";
import {useUser} from "./UserProvider/UserProvider";
import jwt_decode from "jwt-decode";
import AdminMainPage from "./AdminView/Pages/AdminMainPage";
import UsersView from "./AdminView/Pages/UsersView";

function App() {
    const [roles, setRoles] = useState([]);
    const user = useUser();

    useEffect(() => {
        setRoles(getRolesFromJWT());
    }, [user.jwt]);

    function getRolesFromJWT() {
        if (user.jwt) {
            const decodedJwt = jwt_decode(user.jwt);
            return decodedJwt.authorities;
        }
        return [];
    }

    return (
        <Routes>

            <Route path='/' element={
                    roles.find((role) => role === "ROLE_ADMIN") ? (
                            <PrivateRoute><AdminMainPage/></PrivateRoute>
                        ) : (
                <HomePage/>)}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/activate/*' element={<LoginPage/>}/>
            <Route path='/registration' element={<SignUpPage/>}/>
            <Route path='/adverts/:id' element={<PrivateRoute><AdvertView/></PrivateRoute>}/>
            <Route path='/adverts' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
            <Route path='/:id/adverts' element={<PrivateRoute><PersonalDashboard/></PrivateRoute>}/>
            <Route path='/admin/categories' element={<PrivateRoute><CategoryView/></PrivateRoute>}/>
            <Route path='/admin/users' element={<PrivateRoute><UsersView/></PrivateRoute>}/>
        </Routes>
    );
}

export default App;
