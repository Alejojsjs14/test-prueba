import express from 'express'
const app = express()
const port = 3000

app.use(express.json())

let usuarios = []

app.get('/usuarios', (req, res) => {
    res.status(200).json({ usuarios })
})

app.get('/usuarios/:id', (req, res) => {
    const { id } = req.params
    const usuario = usuarios.find(u => u.id === parseInt(id))

    if (!usuario) {
        res.status(404).json({ message: 'usuario no encontrado' })
    }
})

app.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}`)
})
