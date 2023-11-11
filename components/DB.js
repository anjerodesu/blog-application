import { dirname } from 'path'
import { fileURLToPath } from "url";
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';

const __dirname = dirname(fileURLToPath(import.meta.url))
const __db = __dirname + '/../db/db.json'

export default class DB {
    constructor() {
        const results = fs.readFileSync(__db, 'utf8')
        this.posts = JSON.parse(results)
    }

    save(post) {
        post['id'] = uuidv4()
        this.posts.push(post)
        fs.writeFileSync(__db, JSON.stringify(this.posts), function (error) {
            if (error) return { isSaveSuccessful: false, error }
        });
        return { isSaveSuccessful: true, error: '' }
    }

    update(post) {
        const index = this.posts.findIndex(obj => obj.id === post.id)
        this.posts[index].title = post.title
        this.posts[index].body = post.body
        fs.writeFileSync(__db, JSON.stringify(this.posts), function (error) {
            if (error) return { isSaveSuccessful: false, error }
        });
        return { isSaveSuccessful: true, error: '' }
    }

    delete(id) {
        const filteredPosts = this.posts.filter(post => post.id !== id)
        fs.writeFileSync(__db, JSON.stringify(filteredPosts), function (error) {
            if (error) return { isSaveSuccessful: false, error }
        });
        this.posts = filteredPosts
        return { isSaveSuccessful: true, error: '' }
    }

    post(id) {
        return this.posts.find(post => post.id === id)
    }

    getPosts() {
        return this.posts
    }
}
