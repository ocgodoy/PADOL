const express = require('express');
const port = 3000 || process.env.PORT
const app = express();

app.listen(port, ()=> {console.log('Server listening on port '+ port);});

app.use((req, res) => {
    res.json({ message: 'Votre requête a bien été reçue !' }); 
});

module.exports = app;