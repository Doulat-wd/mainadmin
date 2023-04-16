import React,{useState,useEffect} from "react";
import { collection,doc,getDoc,getDocs,getFirestore,onSnapshot,deleteDoc} from "firebase/firestore";
import {getAuth,onAuthStateChanged} from "firebase/auth"
import {  Sidebar,Navbar} from "../../components";
import { useNavigate } from "react-router-dom";
import {  query, where,updateDoc } from "firebase/firestore";
import EmptyCoverImage from "./coverimage.png"
import db from "../../config/firebase"
import { useParams } from "react-router-dom";
import { Await } from "react-router-dom";
import CrossImage from "./close.png"
import swal from "sweetalert";

import SidebarButton from "./menu.png"
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";
import "./singlepost.css"
const SinglePostPage=()=>{
let db=getFirestore()
let params=useParams()
console.log(params.id)
  let navigation=useNavigate()
let [SidebarDis,setSidebarDis]=useState("none")

 let auth=getAuth()
let [getUid,setUid]=useState("")
let [GetDataPosts,SetDataPosts]=useState([])
let [GetDataPostsUid,SetDataPostsUid]=useState([])
let [GetDataPostsLength,SetDataPostsLength]=useState(0)
let allPostsMainArray=[]
let PostsMainArray=[]
let [Getposition,setPosition]=useState("none")
// states
let [getTitleAmount, setTitleAmount] = useState("0");
let [getTitleText, setTitleText] = useState("");
let [getDescriptionAmount, setDescriptionAmount] = useState("0");
let [getDescriptionText, setDescriptionText] = useState("");
let [getCategory,setCategory]=useState("")
let [getImage,setImage]=useState("")
let [getMessage,setMessage]=useState("")
let [getMessageType,setMessageType]=useState("")

// states over
  let ApprovePost=()=>{
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to approve this post?",
      icon: "warning",
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        swal("Approved!", "This post has been Approved!", "success");
        updateDoc(doc(db, "posts", PostsMainArray[0].postid),{
          status:"approved"
        }).then(()=>{
    
        })
      }
    });
    
    
  }
  let RejectPost=()=>{
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to reject this post?",
      icon: "warning",
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        swal("Reject!", "This post has been rejectet!", "success");
        updateDoc(doc(db, "posts", PostsMainArray[0].postid),{
          status:"rejected"
        }).then(()=>{
    
        })
      }
    });
    
    
  }
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
  if(v.title===params.id){
PostsMainArray.push(v)
   
 
  }

})

 

return(
  <div>
    <Navbar/>
     <Sidebar display={SidebarDis}/>

<img src={SidebarButton} alt="" id="MenuButtonImg" onClick={SidebarDis==="none"?()=>setSidebarDis("flex"):()=>setSidebarDis("none")}/>
   
    <div id="singleMainDiv">
    {PostsMainArray.map((v,i)=>{
   return(
    <div key={i} id="SinglePostInnerDiv">
     <img id="SinglePostImage" src={v.imageUrl===""?EmptyCoverImage:v.imageUrl} alt="" />
    <div id="SingleConditionDiv">
        <h1>Catergory: {v.category}</h1>
        <h1>Status: {v.status}</h1>
       
    </div>
    {v.status==="pending"&&(
          <div id="PendingApprovesection">
            <h1>What you want to do with this post ?</h1>
<div>
  <button id="Approvingbutton" onClick={ApprovePost}>Approve</button>
  <button id="rejectingbutton" onClick={RejectPost}>Reject</button>
</div>
          </div>
        )}
    <h1 id="SinglePostTitle">{v.title}</h1>
    <p id="SinglePostDesciption">{v.description}</p>
   
    </div>
   )
     })}
    </div>
  </div>
)
}
export default SinglePostPage