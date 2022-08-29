import React,{useState} from "react"

function CreatePost({sendFormData}){
  const [formData, setFormData] = useState({
    postTitle: "",
    postBody: "",
    date : new Date().toDateString(),
    like: 0,
    img: ""
})

  function handleSubmit(e){
    e.preventDefault();
    console.log("changed")
    const newFormData = {
      postTitle: formData.postTitle,
      postBody: formData.postBody,
      date : new Date().toDateString(),
      like: 0,
      img: formData.img
    }
    setFormData(newFormData)
    fetch("https://swapup-api.herokuapp.com/st",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(newFormData),
    })
    .then(r=>r.json())
    .then(data=>{
      
      sendFormData(data)   
    })


  }

  function handleChange(e){
   
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

//   create
// update
// delete
// view one, view a list of posts

  return (
    <>
        <div className="post-form">
          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <label>Post Title</label>
              <input type="text" placeholder="Enter Article title" name="postTitle" value={formData.postTitle} onChange={handleChange} />
            </div>
            <div className="input-box">
              <label>Feature Image</label>
              <input type="text" name="img" placeholder="Enter image url" value={formData.img} onChange={handleChange} />
            </div>
            <div className="input-box">
              <label>Article</label>
              <textarea placeholder="Write your article here" type="text" row="10" name="postBody" onChange={handleChange} value={formData.postBody}></textarea>
            </div>
            <button type="submit">Post Article</button>
          </form>
        </div>
    </>
  )
}


export default CreatePost