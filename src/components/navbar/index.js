import React from "react";
import "./navbar.css"
import iskillerslogo from "./download.jpeg"
const Navbar =()=>{
return(
    <div id="NavbarMainSection">
        <div id="emptydiv" ></div>
        <div id="NavbarFilleddiv">
            <h1>iSkillers</h1>
            <img src={iskillerslogo} alt="" />
        </div>
    </div>
)
}
export default Navbar