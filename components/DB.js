import { dirname } from 'path'
import { fileURLToPath } from "url";
import fs from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const __db = __dirname + '/../db/db.json'

export default class DB {
    constructor() {
        const results = fs.readFileSync(__db, 'utf8')
        this.posts = JSON.parse(results)
    }

    save(data) {
        // TODO: process data here...

        fs.writeFile(__db, this.posts, function (error) {
           if (error) throw error;
           console.log('the file has been saved!');
        });
    }

    get(id) {
        return this.posts.find(post => post.id === id)
    }

    getPosts() {
        return this.posts
    }
}
