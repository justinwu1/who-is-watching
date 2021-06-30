// import status from './api/status.route.js'
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

const uri =
  'mongodb+srv://justinwu:123qwe@cluster0.ubf4o.mongodb.net/who-is-watching?retryWrites=true&w=majority'
mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
})

const connection = mongoose.connection

connection.once('open', () => {
  console.log('MongoDB database connected')
})

// app.use('/api/v1/status', status)
app.use('*', (req, res) => res.status(400).json({ error: 'Path not found' }))

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
