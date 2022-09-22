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
import LoginModal from "./Modal/LoginModal";
import React, {useState} from "react";

function App() {

    const [show, setShow] = useState(() => false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Routes>

            <Route path='/' element={<HomePage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/activate/*' element={<LoginPage/>}/>
            <Route path='/registration' element={<SignUpPage/>}/>
            <Route path='/adverts/:id' element={<PrivateRoute><AdvertView/></PrivateRoute>}/>
            <Route path='/adverts' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
            <Route path='/:id/adverts' element={<PrivateRoute><PersonalDashboard/></PrivateRoute>}/>
            <Route path='/admin/categories' element={<PrivateRoute><CategoryView/></PrivateRoute>}/>
        </Routes>
    );
}

export default App;
