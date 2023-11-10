import express from 'express'
import DB from './components/DB.js'

const app = express()
const port = 3000
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (req, res) => {
    const db = new DB()
    const posts = db.getPosts()
    res.render('index', posts)
})

app.get('/add', (req, res) => {
    res.render('add')
})

app.post('/add', (req, res) => {

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