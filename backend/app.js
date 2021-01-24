const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const User = require('./models/User')

const path = require('path');

const port = 8800
const app = express()

const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
const friendRoutes = require('./routes/friend')

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

// Connexion à MongoDB
mongoose.connect('mongodb+srv://padol_usr:S9_PaDoL_MMK@padolcluster.pn3hp.mongodb.net/PadolDB?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('Connected to MongoDB !'))
  .catch(() => console.log('Connection to MongoDB failed !'))

// Lecture des corps de requête en json
app.use(bodyParser.json())
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/user', userRoutes)
app.use('/post', postRoutes)
app.use('/friend', friendRoutes)

app.listen(port, () => { console.log('Server listening on port ' + port) })
module.exports = app
