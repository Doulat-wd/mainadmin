import React from "react";
import { useNavigate } from "react-router-dom";
import "./sideBar.css"
const Sidebar=(props)=>{
console.log(props.display)
let navigation=useNavigate()
    return(
        <div>
            <div id="SideMainDiv" style={{display:props.display}}>

            <div id="SidebarLinks">
                <h1 onClick={()=>navigation("/Allusers")}>All users</h1>
                <h1 onClick={()=>navigation("/Approvedusers")}>Approved users</h1>
                <h1 onClick={()=>navigation("/Pendingusers")}>Pending users</h1>
                <h1 onClick={()=>navigation("/Rejectedusers")}>Rejected users</h1>
                <h1 onClick={()=>navigation("/mainpage")}>All posts</h1>
                <h1 onClick={()=>navigation("/Approvedposts")}>Approved posts</h1>
                <h1 onClick={()=>navigation("/Pendingposts")}>Pending posts</h1>
                <h1 onClick={()=>navigation("/Rejectedposts")}>Rejected posts</h1>
            </div>
            </div>
        </div>
    )
}
export default Sidebar