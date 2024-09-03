// import { type } from "@testing-library/user-event/dist/type";
import { useState , useRef , useEffect , useReducer} from "react";
import { db } from "../firebaseinit.js";
import { collection, addDoc , doc,setDoc, onSnapshot, deleteDoc } from "firebase/firestore"; 

import {  getDocs } from "firebase/firestore";




// function blogsReducer(state, action){
//      switch(action.type){
//         case "ADD":
//             return [action.blog,...state];
//         case "REMOVE":
//             return state.filter((blog,index)=>index!==action.index);
//         default:
//             return [];
//      }
// }
export default function Blog(){


    // const [title,setTitle]= useState("");
    // const [content,setContent]= useState("");
    const[formdata,setfrormData]=useState({title:"",content:""})
    const [blogs,setBlog]=useState([]);
    // const[blogs,dispatch]=useReducer(blogsReducer,[]);
    const titleref=useRef(null);

    useEffect(()=>{
        titleref.current.focus();
    },[])
    useEffect(()=>{
        if(blogs.length && blogs[0].title){
                document.title=blogs[0].title;
        }else{
            document.title="No Blogs!!!"
        }
        
    },[blogs])
    useEffect( ()=>{
        // async function fetchData() {
        //     const snapshot = await getDocs(collection(db, "blogs"));
        //     const blog=snapshot.docs.map((doc) => {
        //        return{
        //         id:doc.id,
        //         ...doc.data()
        //        }
        //    });
        //    console.log(blog);
        //    setBlog(blog);
        // }
        // fetchData();
        const unSub=onSnapshot(collection(db,"blogs"),(snapshot)=>{
            const blog=snapshot.docs.map((doc) => {
                           return{
                            id:doc.id,
                            ...doc.data()
                           }
                       });
                       console.log(blog);
                       setBlog(blog);
        }) 

    },[])
  
    async function handleSubmit(e){
        e.preventDefault();
        // dispatch({type:"ADD", blog:{title:formdata.title,content:formdata.content}})
        // setBlog([{title:formdata.title,content:formdata.content},...blogs]);
        // setTitle("");
        // setContent("");
        // Add a new document with a generated id.
       const docRef = doc(collection(db,"blogs"))
       await setDoc(docRef, {
        title: formdata.title,
        content: formdata.content,
        createdAt:new Date()
       });
       console.log("Document written with ID: ", docRef.id);
       setfrormData({title:"",content:""});
        titleref.current.focus();
    }

    async function removeBlog(id){
        // dispatch({type:"REMOVE",index:i})
        // setBlog(blogs.filter((blog,index)=>i!==index));
        const docRef= doc(db,"blogs",id);
        await deleteDoc(docRef);
    }

  

    return(
        <>
        <h1>Write a Blog!</h1>
        <div className="section">
            <form onSubmit={handleSubmit}>
                <Row label="Title">
                        <input className="input" 
                        placeholder="Enter the Ttile here...."
                        value={formdata.title}
                        ref={titleref}
                        onChange={(e)=>setfrormData({title:e.target.value,content:formdata.content})}
                        />
                </Row>
                <Row label="Content">
                    <input className="input content" 
                    placeholder="Content goes here...."
                    value={formdata.content}
                    required
                    onChange={(e)=>setfrormData({title:formdata.title,content:e.target.value})}
                    />
                </Row>

                <button className="btn">Add</button>
            </form>
        </div>
        <hr/>
        <h2>Blogs</h2>
        {blogs.map((blog,i)=>(
           <div className="blog" key={i}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>

            <div className="blog-btn">
            <button className="btn remove" onClick={()=>removeBlog(blog.id)}>Delete</button>
            </div>
           </div>
        

          
        )
       )}
        {/* <h3>{title}</h3>
        <h3>{content}</h3> */}
        </>
    )
}
//Row component to introduce a new row section in the form
function Row(props){
    const{label} = props;
    return(
        <>
        <label>{label}<br/></label>
        {props.children}
        <hr />
        </>
    )
}
