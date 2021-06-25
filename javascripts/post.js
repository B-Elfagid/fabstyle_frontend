class Post {
    static all = []
    constructor({id, brand, image, size, description, price, website, category_id, category}) {
        this.id = id
        this.brand = brand
        this.image = image
        this.size = size
        this.description = description 
        this.price = price
        this.website = website
        this.category_id = category_id
        this.category = category
        Post.all.push(this)
    }
    
    findCategoryById() {
     return Category.all.find(category => category.id === this.category_id)
    }
    
    renderPost() {
        const li = document.createElement("li")
        li.innerHTML = `
       
          <div class="post-body">
          <img src=${this.image} class="post-img-top" alt="...">
          <h2 class="post-category">${this.findCategoryById().name}</h2>
          <h5 class="post-brand">${this.brand}</h5>
          <h5 class="post-size">size-${this.size}</h5>
          <h5 class="post-price">£${this.price}</h5>
          <p class="post-description">${this.description}</p>
          <h5 class="post-website">${this.website}</h5>
          <button class="delete-post" data-id="${this.id}">Delete</button>
              <small class="text-muted">Category: ${this.category.name}</small>
            </div>
        
      </div>`
     
      const deleteBtn = li.querySelector(".delete-post")
      deleteBtn.addEventListener('click', deletePost)
      //li.addEventListener('click', handlePostClick)
     

      

           //<h2 class="post-category">${this.findCategoryById().name}</h2>
           //<h2 class="post-brand">${this.brand}</h2>
           //<h2 class="post-image">
              // <img src=${this.image} height="200" width="250"></h2>
           //<h2 class="post-size">${this.size}</h2>
          // <p class="post-description">${this.description}</p>
           //<h4 class="post-price">${this.price}</h4>
           //<h2 class="post-website">${this.website}</h2>
          // <button class="edit-post" data-id="${this.id}">edit</button> 
          // <button class="delete-post" data-id="${this.id}">delete</button> 
       // `
      
        ul().appendChild(li)
       
      }
       
}

//function handlePostClick(e) {
  //if (e.target.innerText === "Delete") {
    //deletePost(e)
  //}
//}

function deletePost(e) {
  const id = e.target.dataset.id 
  e.target.parentElement.remove()
  fetch(endPoint + "/" + id, {
    method: "DELETE",
   //headers: {"Content-Type": "application/json"},
  })
  .then(resp => resp.json())
  .then(post => {
   alert(post.message)
  })

 }
