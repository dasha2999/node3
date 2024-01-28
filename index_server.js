import http from 'http'
import chalk from 'chalk'
import path from 'path'
import fs from 'fs/promises'
import { fileURLToPath } from 'url'
import { addNote } from './notes.controller.js'

const port = 8000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const basePath = path.join(__dirname, 'pages')

const server = http.createServer(async (req, res) => {

    if (req.method === 'GET') {
        const content = await fs.readFile(path.join(basePath, 'index.html'))

        res.setHeader('Content-type', 'text/html')

        res.end(content)
    } else if (req.method === 'POST') {

        const body = []

        res.writeHead(200, {
            'Content-type': 'text/plain; charset=utf-8'
        })

        // on - хранится информация которая приходит от клиента
        req.on('data', (data) => {
            // записываем в массив порции данны  и трансформируем в обычные данные
            body.push(Buffer.from(data))
            // console.log(data)
        })
        // процесс получения данных завершился, вызывается end 
        req.on('end', () => {
            // console.log(body.toString())
            // console.log(body.toString().split('=')[1].replaceAll('+', ' '))
            const title = body.toString().split('=')[1].replaceAll('+', ' ')
            addNote(title)
            console.log(title)
            res.end(`Title: ${title}`)
        })
        // res.end('Post success')
    }
    // console.log('Server!')
    // // console.log('Request:', req)
    // console.log('Request url:', req.url)
    // console.log('Request method:', chalk.bgMagenta(req.method))
    // res.end('Hello world!')
})

server.listen(port, () => {
    console.log(chalk.green(`Server has been started on port ${port}`))
})