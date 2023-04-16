import React,{useState,useEffect} from "react";
import { collection,doc,getDoc,getDocs,getFirestore,onSnapshot} from "firebase/firestore";
import {getAuth,onAuthStateChanged} from "firebase/auth"
import { Sidebar ,BasicGrid,Navbar} from "../../components";
import { useNavigate } from "react-router-dom";
import {  query, where } from "firebase/firestore";
import EmptyCoverImage from "./coverimage.png"
import SidebarButton from "./menu.png"
import db from "../../config/firebase"

import "./manipage.css"
const MainPage=()=>{
let db=getFirestore()
let [SidebarDis,setSidebarDis]=useState("none")
  let navigation=useNavigate()
 let auth=getAuth()
let [getUid,setUid]=useState("")
let [GetDataPosts,SetDataPosts]=useState([])
let [GetDataPostsUid,SetDataPostsUid]=useState([])
let [GetDataPostsLength,SetDataPostsLength]=useState(0)
let allPostsMainArray=[]
let PostsMainArray=[]
let PendingMainArray=[]
let ApprovedMainArray=[]
let RejectedMainArray=[]
  
useEffect(()=>{
 

const Allusersdata=onSnapshot(collection(db,"posts"),(allUsers)=>{
  allPostsMainArray=[]
  allUsers.forEach((singleLoopUsers)=>{
    allPostsMainArray.push(singleLoopUsers.data())
    SetDataPosts(allPostsMainArray)

  })
  })
// 
},[auth])
GetDataPosts.map((v,i)=>{
  // console.log(v.uid)
PostsMainArray.push(v)
if(v.status==="pending"){
  PendingMainArray.push(v)
}
if(v.status==="approved"){
  ApprovedMainArray.push(v)
}
if(v.status==="rejected"){
  RejectedMainArray.push(v)
}

   

})
// console.log(PendingMainArray)
// console.log(RejectedMainArray)
// console.log(ApprovedMainArray)
  
return(
    <div>
      <Navbar/>
        <Sidebar display={SidebarDis}/>

  <img src={SidebarButton} alt="" id="MenuButtonImg" onClick={SidebarDis==="none"?()=>setSidebarDis("flex"):()=>setSidebarDis("none")}/>

      <div id="MainPageDiv">
      <BasicGrid Type="posts"  all={PostsMainArray.length} approved={ApprovedMainArray.length} rejected={RejectedMainArray.length} pending={PendingMainArray.length}/>
      </div>
      <div id="MainPostDivAll">
     {PostsMainArray.map((v,i)=>{
   return(
    <div key={i} id="MainPostInnerDiv" onClick={()=>navigation(`/Singlepost/${v.title}`)}>
     <img id="MainPostImage" src={v.imageUrl===""?EmptyCoverImage:v.imageUrl} alt="" />
    <h1 id="MainPostTitle">{v.title}</h1>
    <p id="MainPostDesciption">{v.description.slice(0,190) }{v.description.length>190&&"..."}</p>
    <p id="MainPostCategory1">Catergory: <span id="MainPostCategory">{v.category}</span></p>
    <p id="MainPostStatus1">Status: <span id="MainPostStatus">{v.status}</span></p>

    </div>
   )
     })}
    </div>
    </div>
)
}
export default MainPage