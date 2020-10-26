const express = require('express');
const cors = require('cors');
const port = 3000 || process.env.PORT
const app = express();

app.listen(port, ()=> {console.log('Server listening on port '+ port);});
app.use(cors);

app.use((req, res) => {
    res.json({ message: 'Votre requête a bien été reçue !' }); 
});

var ctn = 0;
app.use('/test', (req,res, next)=>{
   ctn++;
   if(ctn<4){
       res.send('/itachi.png');
   } 
   else{
       res.send('Compteur dépassé');
   }
})

module.exports = app;