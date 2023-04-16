import React from "react";
import {  Login,MainPage,SinglePostPage,Rejectedusers,SingleUserPage,Pendingusers,Approvedusers,Approvedposts,Pendingposts,Rejectedposts,Alluserspage} from "../../pages";
import {BrowserRouter,Route,Routes} from 'react-router-dom';
const Navigation=()=>{
    return(
        <BrowserRouter>
        <Routes>
            <Route element={<MainPage/>} path="/mainpage"/>
            <Route element={<Login/>} path="/"/>
            <Route element={<Rejectedusers/>} path="/Rejectedusers"/>
            <Route element={<Pendingusers/>} path="/Pendingusers"/>
            <Route element={<Approvedusers/>} path="/Approvedusers"/>
            <Route element={<Approvedposts/>} path="/Approvedposts"/>
            <Route element={<Rejectedposts/>} path="/Rejectedposts"/>
            <Route element={<Alluserspage/>} path="/Allusers"/>
            <Route element={<Pendingposts/>} path="/Pendingposts"/>
            <Route element={<SinglePostPage/>} path="/Singlepost/:id"/>
            <Route element={<SingleUserPage/>} path="/SingleUserPage/:id"/>
        </Routes>
        </BrowserRouter>
    )
}
export default Navigation