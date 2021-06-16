class Category {
    static all = []
    constructor({name, id}){
        this.name = name
        this.id = id
        Category.all.push(this)
    }
}