const buttonDiv = () => document.getElementById("button-control")
const button = () => document.getElementById("button")
const ulDiv = () => document.getElementById("list")
const ul = () => document.getElementById("posts-list")
const createPostForm = () => document.getElementById("create-post-form") 
const endPoint = ("http://localhost:3000/posts")
document.addEventListener("DOMContentLoaded", () => {
    fetchCategories()
    button().addEventListener("click", handleClick)
    createPostForm().addEventListener("submit", (e) => createFormHandler(e))
})
const fetchCategories = () => {
  fetch("http://localhost:3000/categories")
  .then(resp => resp.json())
  .then(json => {
    json.forEach(categoryData => {
    new Category(categoryData)
     categoryData.posts.forEach(postData => {
       new Post(postData)
     })

    })
  })

}

const handleClick = () => {
    if (ul().children.length < 1){
    // fetch(endPoint)
    // .then(resp => resp.json())
    // .then(json => {
       Post.all.forEach(post => {
        const div = document.querySelector(`#post-${post.id} .post-img-top`)
          getImageFromBackEnd(post.image.url, div)
           //fetch the image for each post 
          //let post = new Post(postData)
          post.renderPost()
        })
    //})
    //.catch(err => console.log(err))
} else {
ul().innerHTML = ""
 }
}

function createFormHandler(e) {
    e.preventDefault()
    // const brandInput = document.getElementById("input-brand").value
    // const imageInput = document.getElementById("input-image").value
    // const sizeInput = document.getElementById("input-size").value
    // const priceInput = document.getElementById("input-price").value
    // const websiteInput = document.getElementById("input-website").value
    // const descriptionInput = document.getElementById("input-description").value
    // const categoryInput = document.getElementById("categories").value
    // const categoryId = parseInt(categoryInput)
   
    const formData = new FormData(e.target)
    postFetch(formData)
    createPostForm().reset()
}

function getImageFromBackEnd(url, div){
   fetch(`http://localhost:3000${url}`)
  .then(resp => resp.blob())
  .then(blob => {
    const img  = document.createElement("img")
      img.src = URL.createObjectURL(blob)
      div.append(img)
})
}

function postFetch(formData) {
 //const bodyData = {brand, image, size, price, website, description, category_id}
 fetch(endPoint, {
     method: "POST",
    // headers: {"Content-Type": "application/json"},
     body: formData
 })
 .then(resp => resp.json())
 .then(post => {
const p = new Post(post)
p.renderPost()
    //const li = document.createElement("li")
    // li.id = `post-${post.id}`
    // li.innerHTML = `
    //    <h2 class="post-category">${post.category.name}</h2>
    //    <h2 class="post-brand">${post.brand}</h2>
    //    <h2 class="post-image_url"></h2>
    //    <h2 class="post-size">${post.size}</h2>
    //    <p class="post-description">${post.description}</p>
    //    <h4 class="post-price">${post.price}</h4>
    //    <h2 class="post-website">${post.website}</h2>    
    // `
    //ul().appendChild(li)  
    const div = document.querySelector(`#post-${post.id} .post-img-top`)
    debugger
     getImageFromBackEnd(p.image.url, div)
   
    })
 
}




