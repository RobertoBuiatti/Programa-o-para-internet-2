const express = require('express')
const mongoose =  require('mongoose')
const routes = require('./routes/routes')
const app = express()

// Habilitar CORS para permitir que o frontend acesse a API
const cors = require('cors');
app.use(cors());

require("dotenv").config()

const mongoString = process.env.DATABASE_URL
const port = 3000

mongoose.connect(mongoString)

const database = mongoose.connection

database.on('error', (error) => {
    console.error(error)
})

database.once('connected', () => {
    console.log("DB conectado")
})

//app.get('/', (req, res) => {
//  res.send('Hello World!')
// })
app.use(express.json())

app.use('/api', routes)

//criar a aplicação
//criar as rotas
//rota getAll -> retorna todos os elementos do banco de dados
//rota getOne -> retorna um elemento de acordo com um elemento especifico
//rota post -> criar um documento no banco de dados
//rota delete -> apagar um documento no banco de dados
//rota update -> atualizar um documento no banco de dados
//criar a logica do negocio

// const senha = process.env.SENHA
// const usuário = process.env.USUÁRIO

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})