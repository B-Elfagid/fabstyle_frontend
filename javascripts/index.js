const buttonDiv = () => document.getElementById("button-control")
const button = () => document.getElementById("button")
const ulDiv = () => document.getElementById("list")
const ul = () => document.getElementById("posts-list")
const createPostForm = () => document.getElementById("create-post-form") 
const firstOption = document.getElementById("category_id_first_option")
const categorySelect = () => document.getElementById("categories")
const endPoint = ("http://localhost:3000/posts")

document.addEventListener("DOMContentLoaded", () => {
    fetchCategories()
    button().addEventListener("click", handleClick)
    createPostForm().addEventListener("submit", (e) => createFormHandler(e))
})

function makeCategoryOptions() {
  options = Category.all.map(cat => `<option value = ${cat.id}>${cat.name}</option>`)
  firstOption.append(options)
}

const fetchCategories = () => {
  fetch("http://localhost:3000/categories")
  .then(resp => resp.json())
  .then(json => {
    json.forEach(categoryData => {
    const cat = new Category(categoryData)
    const option = document.createElement("option")
    option.innerText = cat.name
    option.value = cat.id
    categorySelect().appendChild(option)
     categoryData.posts.forEach(postData => {
       new Post(postData)
     })
    })
  })
}
const handleClick = () => {
    const posts = Post.all.sort(function (a, b) {
      return (a.price <= b.price ?  -1 :  1)
    })     
    if (ul().children.length < 1){
        Post.all.forEach(post => {
           post.renderPost() //first put the post card on the page
            const div = document.querySelector(`#post-${post.id} .post-body`) //then target the right div
            getImageFromBackEnd(post.image.url, div) //fire the fetch call to get the post's image
        })
    } else {
        ul().innerHTML = ""
    }
}


function createFormHandler(e) {
    e.preventDefault()
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
        div.insertAdjacentElement('afterbegin', img) 
    })
}
function postFetch(formData) {
    fetch(endPoint, {
        method: "POST",
        body: formData
    })
    .then(resp => resp.json())
    .then(post => {
        console.log(post)
        const p = new Post(post)
        p.renderPost() 
        const div = document.querySelector(`#post-${post.id} .post-body`)
        getImageFromBackEnd(p.image.url, div)
    })
}

