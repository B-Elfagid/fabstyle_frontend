class Post {
    static all = []
    constructor({id, brand, image, size, description, price, website, category_id}) {
        this.id = id
        this.brand = brand
        this.image = image
        this.size = size
        this.description = description 
        this.price = price
        this.website = website
        this.category_id = category_id
        Post.all.push(this)
    }

    findCategoryById() {
     return Category.all.find(category => category.id === this.category_id)
    }
    renderPost() {
        const li = document.createElement("li")
        li.innerHTML = `
           <h2 class="post-category">${this.findCategoryById().name}</h2>
           <h2 class="post-brand">${this.brand}</h2>
           <h2 class="post-image">
               <img src=${this.image} height="200" width="250"></h2>
           <h2 class="post-size">${this.size}</h2>
           <p class="post-description">${this.description}</p>
           <h4 class="post-price">${this.price}</h4>
           <h2 class="post-website">${this.website}</h2>
           <button class="edit-post" data-id="${this.id}">edit</button> 
           <button class="delete-post" data-id="${this.id}">delete</button> 
        `
        ul().appendChild(li)
       }
       
}
