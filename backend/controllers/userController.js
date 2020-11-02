const user = require('../utils/user.js');

module.exports = function(app){
    app.get('', user.connexion);
    app.post('',user.inscription);
}
