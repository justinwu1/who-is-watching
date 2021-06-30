// import status from './api/status.route.js'
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
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

const statusRouter = require('./routes/status')
app.use('/status', statusRouter)

// Serve static assests for production
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('frontend/build'))

//   app.get('*', (req, res) => {
//     res.sendFile(path, resolve(__dirname, 'client', 'build', 'index.html'))
//   })
// }
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
