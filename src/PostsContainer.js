import React from "react"
import Post from "./Post"

function PostsContainer({posts,getDeleteData,getLikedPost}){



  return (
    <>
    {
      posts.map(post=>(
        <Post key={post.id} sendLikedPost = {getLikedPost} sendDeleteData={getDeleteData} post={post}/>
      ))
    }
    </>
  )
}


export default PostsContainer