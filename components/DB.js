import { dirname } from 'path'
import { fileURLToPath } from "url";
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';

const __dirname = dirname(fileURLToPath(import.meta.url))
const __db = __dirname + '/../db/db.json'

export default class DB {
    constructor() {
        const results = fs.readFileSync(__db, 'utf8')
        const posts = JSON.parse(results)
        this.posts = (posts.length > 0) ? posts.reverse() : posts
    }

    save(post) {
        post['id'] = uuidv4()
        const posts = this.posts.slice()
        posts.reverse()
        posts.push(post)
        fs.writeFileSync(__db, JSON.stringify(posts), function (error) {
            if (error) return { isSaveSuccessful: false, error }
        });
        this.posts = posts.reverse()
        return { isSaveSuccessful: true, error: '' }
    }

    update(post) {
        const index = this.posts.findIndex(obj => obj.id === post.id)
        this.posts[index].title = post.title
        this.posts[index].body = post.body
        const posts = this.posts.slice()
        posts.reverse()
        fs.writeFileSync(__db, JSON.stringify(posts), function (error) {
            if (error) return { isSaveSuccessful: false, error }
        });
        this.posts = posts.reverse()
        return { isSaveSuccessful: true, error: '' }
    }

    post(id) {
        return this.posts.find(post => post.id === id)
    }

    getPosts() {
        return this.posts
    }
}
