import React,{useState,useEffect} from "react"
import { useParams, useNavigate} from "react-router-dom";

function ViewPost(){
  const [postDetail, setPostDetail] = useState({});
  const {id} = useParams();

  useEffect(()=>{
    fetch(`http://localhost:3000/posts/${id}`)
    .then(r=>r.json())
    .then(data=>setPostDetail(data))
  },[id])
  
  let homeRedirect = useNavigate();
  
  function onClick(){
    homeRedirect("/");
  }

  return (
    <>
          {
            <div className="post-1">
              <button onClick={onClick}>Back to homePage</button>
              <div className="img-1">
                <img className="post-img-1" src={postDetail.img} alt={postDetail.postTitle}/>
              </div>
              <div className="post-desc-1">                 <h1  className="post-title-1">{postDetail.postTitle}</h1>
              <p className="post-date-1"> {postDetail.date}</p>
                <p className="post-body-1">{postDetail.postBody}</p>
              </div>
            </div>
          }
    </>
  )
}


export default ViewPost