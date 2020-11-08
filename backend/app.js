const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = 8800;
const app = express();


const userRoutes = require('./routes/user');
const imageRoutes = require('./routes/image');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Connexion à MongoDB
mongoose.connect('mongodb+srv://padol_usr:S9_PaDoL_MMK@padolcluster.pn3hp.mongodb.net/<dbname>?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true })
.then(() => console.log('Connected to MongoDB !'))
.catch(() => console.log('Connection to MongoDB failed !'));

// Lecture des corps de requête en json 
app.use(bodyParser.json());

var ctn = 0;
app.use('/test', (req,res, next)=>{
   ctn++;
   if(ctn<4){
       res.send('./itachi.png');
   }
   else{
       res.send('Compteur dépassé');
   }
})

app.use('/user', userRoutes);
app.use('/image', imageRoutes);


app.listen(port, ()=> {console.log('Server listening on port '+ port);});
module.exports = app;
