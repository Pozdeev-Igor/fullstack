import './static/App.css';
import {Route, Routes} from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import PrivateRoute from "./customRoutes/PrivateRoute";
import AdvertView from "./Pages/AdvertView";
import Dashboard from "./Pages/Dashboard";
import SignUpPage from "./Pages/SignUpPage";
import CategoryView from "./AdminView/Pages/CategoryView";
import PersonalDashboard from "./Pages/PersonalDashboard";
import React from "react";
import {useUser} from "./UserProvider/UserProvider";
import AdminMainPage from "./AdminView/Pages/AdminMainPage";
import UsersView from "./AdminView/Pages/UsersView";
import EditCategoryView from "./AdminView/Pages/EditCategoryView";
import EditSubCategoryView from "./AdminView/Pages/EditSubCategoryView";
import SubCategoryView from "./AdminView/Pages/SubCategoryView";
import Navbar from "./Navbar/Navbar";

function App() {
    const user = useUser();


    return (
        <>
            <Navbar fixed="top"/>
            <Routes>

                <Route path='/' element={<HomePage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/activate/*' element={<LoginPage/>}/>
                <Route path='/registration' element={<SignUpPage/>}/>
                <Route path='/adverts/:userId/:advertId' element={<PrivateRoute><AdvertView/></PrivateRoute>}/>
                <Route path='/adverts' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
                <Route path='/users/adverts' element={<PrivateRoute><PersonalDashboard/></PrivateRoute>}/>
                <Route path='/admin/categories' element={<PrivateRoute><CategoryView/></PrivateRoute>}/>
                <Route path='/admin/subcategories' element={<PrivateRoute><SubCategoryView/></PrivateRoute>}/>
                <Route path='/admin/categories/:categoryId' element={<PrivateRoute><EditCategoryView/></PrivateRoute>}/>
                <Route path='/admin/subcategories/:categoryId'
                       element={<PrivateRoute><EditSubCategoryView/></PrivateRoute>}/>
                <Route path='/admin/users' element={<PrivateRoute><UsersView/></PrivateRoute>}/>
                <Route path='/admin' element={<PrivateRoute><AdminMainPage/></PrivateRoute>}/>
            </Routes>
        </>
    );
}

export default App;
