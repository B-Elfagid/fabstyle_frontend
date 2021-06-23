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
        <div class="col-md-4">
        <div class="card mb-4 shadow-sm">
        <img src=${this.image} class="post-img-top" alt="...">
          <div class="post-body">
          <h2 class="post-category">${this.findCategoryById().name}</h2>
          <h5 class="post-brand">${this.brand}</h5>
          <h5 class="post-size">size-${this.size}</h5>
          <h5 class="post-price">£${this.price}</h5>
          <p class="post-description">${this.description}</p>
          <h5 class="post-website">${this.website}</h5>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <button type="button" class="btn btn-sm btn-outline-secondary">Delete</button>
              </div>
              <small class="text-muted">Category: ${this.category.name}</small>
            </div>
          </div>
        </div>
      </div>`
      
      
      

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
