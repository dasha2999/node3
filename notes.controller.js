import chalk from 'chalk'
import path from 'path'
import fs from 'fs/promises'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const notesPath = path.join(__dirname, 'db.json')


export async function addNote(title) {
    const notes = await getNotes()
    const note = {
        title,
        id: Date.now().toString()
    }
    notes.push(note)
    await saveNotes(notes)
    console.log(chalk.green('Note was added!'))
}

async function saveNotes(notes) {
    await fs.writeFile(notesPath, JSON.stringify(notes))
}

async function printNotes() {
    const notes = await getNotes()
    console.log(chalk.bgBlue('Here is the list of notes:'))
    notes.forEach((note) => {
        console.log(chalk.blue(note.title))
    })
}

export async function getNotes() {
    const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []

}

export async function removeNotes(id) {
    const notes = await getNotes()

    const filteredNotes = notes.filter((note) => note.id !== id) 

    await saveNotes(filteredNotes)
    console.log(chalk.red(`Note with ${id} has been removed!`))
}