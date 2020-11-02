const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const port = 8800;
const app = express();
const router = express.Router();

app.use(cors());
const urlencodeParser = bodyParser.urlencoded({extended: true});
app.use(urlencodeParser);
app.use(bodyParser.json());

// Connexion à notre base de données
mongoose.connect("mongodb://localhost:27017", { useNewUrlParser: true,  useUnifiedTopology: true } );
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("\nConnecté à la bdd !");
});
module.exports = db;




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
app.use("/user", router);
require(__dirname + "/controllers/userController")(router);


app.listen(port, ()=> {console.log('Server listening on port '+ port);});
module.exports = app;
db.dropDatabase()
