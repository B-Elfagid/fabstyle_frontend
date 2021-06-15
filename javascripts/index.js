const buttonDiv = () => document.getElementById("button-control")
const button = () => document.getElementById("button")
const ulDiv = () => document.getElementById("list")
const ul = () => document.getElementById("posts-list")
const createPostForm = () => document.getElementById("create-post-form") 
const endPoint = ("http://localhost:3000/posts")
document.addEventListener("DOMContentLoaded", () => {
    button().addEventListener("click", handleClick)
    createPostForm().addEventListener("submit", (e) => createFormHandler(e))
})
const handleClick = () => {
    if (ul().children.length < 1){
    fetch(endPoint)
    .then(resp => resp.json())
    .then(json => renderPosts(json))
    .catch(err => console.log(err))
} else {
ul().innerHTML = ""
 }
}

const renderPosts = (posts) => {
 posts.forEach(element => {
 const li = document.createElement("li")
 li.innerHTML = `
    <h2 class="post-category">${element.category.name}</h2>
    <h2 class="post-brand">${element.brand}</h2>
    <h2 class="post-image_url">
        <img src=${element.image_url} height="200" width="250"></h2>
    <h2 class="post-size">${element.size}</h2>
    <p class="post-description">${element.description}</p>
    <h4 class="post-price">${element.price}</h4>
    <h2 class="post-website">${element.website}</h2>
    <button data-id=${posts.id}>edit</button>
 `
 ul().appendChild(li)
 });
}
function createFormHandler(e) {
    e.preventDefault()
    const brandInput = document.getElementById("input-brand").value
    const imageInput = document.getElementById("input-image").value
    const sizeInput = document.getElementById("input-size").value
    const priceInput = document.getElementById("input-price").value
    const websiteInput = document.getElementById("input-website").value
    const descriptionInput = document.getElementById("input-description").value
    const categoryInput = document.getElementById("categories").value
    const categoryId = parseInt(categoryInput)
    postFetch(brandInput, imageInput, sizeInput, priceInput, websiteInput, descriptionInput, categoryId)
}
function postFetch(brand, image, size, price, website, description, category_id) {
 const bodyData = {brand, image, size, price, website, description, category_id}
 fetch(endPoint, {
     method: "POST",
     headers: {"Content-Type": "application/json"},
     body: JSON.stringify(bodyData)
 })
 .then(resp => resp.json())
 .then(post => {
     debugger
 console.log(post);
 const renderPosts = posts
    const li = document.createElement("li")
    li.innerHTML = `
       <h2 class="post-category">${element.category.name}</h2>
       <h2 class="post-brand">${element.brand}</h2>
       <h2 class="post-image_url">
           <img src=${element.image_url} height="200" width="250"></h2>
       <h2 class="post-size">${element.size}</h2>
       <p class="post-description">${element.description}</p>
       <h4 class="post-price">${element.price}</h4>
       <h2 class="post-website">${element.website}</h2>
       <button data-id=${posts.id}>edit</button>
    `
    ul().appendChild(li)   
 })
}