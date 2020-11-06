const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const port = 8800;
const app = express();
//const router = express.Router();

const userRoutes = require('./routes/user');
const imageRoutes = require('./routes/image');

app.use(cors());
const urlencodeParser = bodyParser.urlencoded({extended: true});
app.use(urlencodeParser);
app.use(bodyParser.json());

// Connexion à notre base de données
mongoose.connect('mongodb+srv://padol_usr:<password>@padolcluster.pn3hp.mongodb.net/<dbname>?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

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
db.dropDatabase()
