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
       Post.all.forEach(post => {
           post.renderPost() //first put the post card on the page
            const div = document.querySelector(`#post-${post.id} .post-body`) //then target the right div, specifically the body of the post card
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
        div.insertAdjacentElement('afterbegin', img) //insert the img as the first child inside the post body - check out insertAdjacentElement here https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement
    })
}
function postFetch(formData) {
    fetch(endPoint, {
        method: "POST",
        body: formData
    })
    .then(resp => resp.json())
    .then(post => {
        const p = new Post(post)
        p.renderPost() 
        const div = document.querySelector(`#post-${post.id} .post-body`)
        getImageFromBackEnd(p.image.url, div)
    })
}