import './static/App.css';
import {Route, Routes} from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import PrivateRoute from "./customRoutes/PrivateRoute";
import NewAdvertView from "./Pages/NewAdvertView";
import SignUpPage from "./Pages/SignUpPage";
import CategoryView from "./AdminView/Pages/CategoryView";
import PersonalDashboard from "./Pages/PersonalDashboard";
import React from "react";
import {useUser} from "./UserProvider/UserProvider";
import AdminMainPage from "./AdminView/Pages/AdminMainPage";
import UsersView from "./AdminView/Pages/UsersView";
import EditCategoryView from "./AdminView/Pages/EditCategoryView";
import SubCategoryView from "./AdminView/Pages/SubCategoryView";
import Navbar from "./Navbar/Navbar";
import PersonalAdvertView from "./Pages/PersonalAdvertView";
import AdvertView from "./Pages/AdvertView";
import AccountView from "./Pages/AccountView";
import Favorites from "./Pages/Favorites";

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
                <Route path='/adverts/new/:advertId' element={<PrivateRoute><NewAdvertView/></PrivateRoute>}/>
                <Route path='/adverts/:userId/:advertId' element={<AdvertView/>}/>
                <Route path='/adverts/personal/:advertId' element={<PrivateRoute><PersonalAdvertView/></PrivateRoute>}/>
                <Route path='/adverts/favorite/:userId' element={<PrivateRoute><Favorites/></PrivateRoute>}/>
                <Route path='/users/adverts' element={<PrivateRoute><PersonalDashboard/></PrivateRoute>}/>
                <Route path='/users/:userId' element={<PrivateRoute><AccountView/></PrivateRoute>}/>
                <Route path='/admin/categories' element={<PrivateRoute><CategoryView/></PrivateRoute>}/>
                <Route path='/admin/subcategories' element={<PrivateRoute><SubCategoryView/></PrivateRoute>}/>
                <Route path='/admin/categories/:categoryId' element={<PrivateRoute><EditCategoryView/></PrivateRoute>}/>
                <Route path='/admin/users' element={<PrivateRoute><UsersView/></PrivateRoute>}/>
                <Route path='/admin' element={<PrivateRoute><AdminMainPage/></PrivateRoute>}/>
            </Routes>
        </>
    );
}

export default App;
