const express = require('express');
const cors = require('cors');
const port = 8800;
const app = express();

app.use(cors());

app.get('/',(req, res) => {
    res.json({ message: 'Votre requête a bien été reçue !' }); 
});

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

app.listen(port, ()=> {console.log('Server listening on port '+ port);});
module.exports = app;