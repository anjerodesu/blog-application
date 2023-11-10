import express from 'express'
import DB from './components/DB.js'

const app = express()
const port = 3000
const db = new DB()
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (req, res) => {
    const posts = db.getPosts()
    res.render('index', {
        posts: posts,
    })
})

app.get('/add', (req, res) => {
    res.render('add')
})

app.post('/add', (req, res) => {
    const date = new Date()
    const currentDay = date.toLocaleDateString('en-UK', { year: 'numeric', month: 'long', day: 'numeric' })

    const post = {
        title: req.body.title,
        body: req.body.body,
        date: currentDay,
    }
    db.save(post)
    res.redirect('/')
})

app.get('/edit', (req, res) => {
    res.render('add')
})

app.post('/edit', (req, res) => {

})

app.post('/delete', (req, res) => {
    res.redirect('/')
})

app.listen(port, () => {
    console.log(`Listening to port ${port}...`)
})