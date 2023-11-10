import { dirname } from 'path'
import { fileURLToPath } from "url";
import fs from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const __db = __dirname + '/../db/db.json'

Array.prototype.lastItem = function () {
    return this[this.length - 1]
}

export default class DB {
    constructor() {
        const results = fs.readFileSync(__db, 'utf8')
        this.posts = JSON.parse(results)
    }

    save(post) {
        const currentID = this.posts.lastItem().id + 1
        post['id'] = currentID

        this.posts.push(post)
        fs.writeFileSync(__db, JSON.stringify(this.posts), function (error) {
            if (error) return { isSaveSuccessful: false, error }
        });
        return { isSaveSuccessful: true, error: '' }
    }

    get(id) {
        return this.posts.find(post => post.id === id)
    }

    getPosts() {
        return this.posts
    }
}
