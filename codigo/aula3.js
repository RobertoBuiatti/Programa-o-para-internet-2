const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/about', (req, res) => {
    res.send('This is the about page, Ituiutaba 16/09/2024')
})

app.get('/a*t', (req, res) => {
    res.send('This is the page with a wildcard, Ituiutaba 16/09')
})

app.get('/users/:userID/livros/:livroID', (req, res) => {
    res.send(`Usuario com ID ${req.params.userID} e livro com o ID ${req.params.livroID}`)
})

app.use('*',(req, res) => {
    res.status(404).send('Page not found')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})