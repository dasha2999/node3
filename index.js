import chalk from 'chalk'
import path from 'path'
import { fileURLToPath } from 'url'
import { addNote, getNotes } from './notes.controller.js'
import express from 'express'

const port = 8000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const basePath = path.join(__dirname, 'pages')

const app = express()

app.use(express.urlencoded({
    extended: true
}))

app.set('view engine', 'ejs')
app.set('views', 'pages')

app.use(express.static(path.resolve(__dirname, 'public')))

app.get('/', async (req, res) => {
    // res.sendFile(path.join(basePath, 'index.html'))
    res.render('index', {
        title: 'Express app',
        notes: await getNotes(),
        created: false
    })
})

app.post('/', async (req, res) => {
    await addNote(req.body.title)
    // console.log(req.body)
    // res.sendFile(path.join(basePath, 'index.html'))
    res.render('index', {
        title: 'Post method',
        notes: await getNotes(),
        created: true
    })
})

app.listen(port, () => {
    console.log(chalk.green(`Server has been started on port ${port}`))
})