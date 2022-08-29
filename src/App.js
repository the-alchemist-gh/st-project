// import logo from './logo.svg';
import './App.css';
import React,{useEffect,useState} from 'react';
import { Route,Routes } from "react-router-dom";
import CreatePost from './CreatePost';
import PostsContainer from './PostsContainer';
import ViewPost from './ViewPost';
// import posts from "./db.json"

function App() {
  const [postsState, setPostsState] = useState([])

  useEffect(()=>{
    fetch("https://swapup-api.herokuapp.com/st")
    .then(r=>r.json())
    .then(data=>setPostsState(data))
  },[])

  function getFormData(value){
    setPostsState([...postsState, value])
  }

  function onLikePost(value){
    const updateItem = postsState.map((post)=>{
      if(post.id===value.id){
        return value
      } else {
        return post
      }
    })

    setPostsState(updateItem)
  }

  function deleteItem(value){
    fetch(`https://swapup-api.herokuapp.com/st/${value}`, 
    {
      method: 'DELETE',
  })
  .then(r=>r.json())
  fetch("https://swapup-api.herokuapp.com/st")
    .then(r=>r.json())
    .then(data=>setPostsState(data))
}
  
  const filteredPostsData = postsState.filter(item => item)

  return (
    <>
      {/* <Navbar /> */}
      <Routes>
          <Route path='/item/:id' element={<ViewPost />}></Route>
          <Route path="/" element={
            <div className='homePage'>
            <CreatePost sendFormData={getFormData} />
            <div className='blogPage'>
              <PostsContainer getLikedPost = {onLikePost} getDeleteData={deleteItem} posts = {filteredPostsData} />
            </div>
            </div>
          }>
          </Route>
      </Routes>
      
      
    </>
  );
}

export default App;
