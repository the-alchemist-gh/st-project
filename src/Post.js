import React,{useState} from "react";
import { NavLink } from "react-router-dom";

function Post({post, sendDeleteData, sendLikedPost}){
  const [likeState, setLikeState] = useState(post.like);
  const id = post.id
  function handleDelete(){
   
    sendDeleteData(id)
  }

  function handleLike(){
    fetch(`http://localhost:3000/posts/${id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        like: (likeState + 1) ,
      }),
    }) 
    .then(r=>r.json())
    .then(data=>{
      sendLikedPost(data)
      setLikeState(data.like)
    })
  }



  return (
    <>
          {
            <div className="post-list">
              <div className="img-div">
                <img className="post-img" src={post.img} alt={post.postTitle}/>
              </div>
              <div className="post-desc">                 <h1  className="post-title">
              <NavLink to={`/item/${id}`}>{post.postTitle}</NavLink>
                </h1>
              <p className="post-date"> {post.date}</p>
                <p className="post-body">{post.postBody}</p>
              </div>
              <div className="btn-grp">
                <button onClick={handleLike}  className="action-btn likes">
                  <span>{likeState} </span>
                  {
                    likeState <= 1 ? "like" : "likes"
                  }
                </button>
                <button onClick={handleDelete} className="action-btn delete">
                  Delete
                </button>
              </div>
            </div>
          }
    </>
  )
}


export default Post