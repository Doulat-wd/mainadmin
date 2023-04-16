import React,{useState,useEffect} from "react";
import { collection,doc,getDoc,getDocs,getFirestore,onSnapshot,deleteDoc} from "firebase/firestore";
import {getAuth,onAuthStateChanged} from "firebase/auth"
import {  Sidebar,Navbar} from "../../components";
import { useNavigate } from "react-router-dom";
import {  query, where,updateDoc } from "firebase/firestore";
import db from "../../config/firebase"
import { useParams } from "react-router-dom";
import { Await } from "react-router-dom";
import swal from "sweetalert";
import EmptyProfile from "./download.png"
import SidebarButton from "./menu.png"
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";
import "./singleuser.css"
const SingleUserPage=()=>{
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
      text: "Are you sure that you want to approve this user?",
      icon: "warning",
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        swal("Approved!", "This user has been Approved!", "success");
        updateDoc(doc(db, "users", PostsMainArray[0].uid),{
          status:"approved"
        }).then(()=>{
    
        })
      } 
    });
    
    
  }
  let RejectPost=()=>{
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to reject this user?",
      icon: "warning",
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        swal("Reject!", "This user has been rejectet!", "success");
        updateDoc(doc(db, "users", PostsMainArray[0].uid),{
          status:"rejected"
        }).then(()=>{
    
        })
      }
    });
    
    
  }
useEffect(()=>{
 
 
const Allusersdata=onSnapshot(collection(db,"users"),(allUsers)=>{
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
  if(v.uid===params.id){
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
    <div key={i} id="SingleUserInnerDiv">
    <div id="ImageSectionUser">
      <img src={v.profileImage===""?EmptyProfile:v.profileImage} alt="" />
    </div>
    <div id="headingsectionData">
      <h1 className="Headingdata">{v.firstname} {v.lastname}</h1>
      <h1 className="Headingdata">{v.email}</h1>
      <h1 className="Headingdata">{v.mobilenumber}</h1>
    </div>
    <div id="statusSectionuser"><span>Status</span><span>{v.status}</span></div>
    {v.status==="pending"&&(
          <div id="UserPendingApprovesection">
            <h1>What you want to do with this user ?</h1>
<div>
  <button id="Approvingbutton" onClick={ApprovePost}>Approve</button>
  <button id="rejectingbutton" onClick={RejectPost}>Reject</button>
</div>
          </div>
        )}
  
    </div>
   )
     })}
    </div>
  </div>
)
}
export default SingleUserPage