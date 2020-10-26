const http = require('http');
const app = require('./app');

app.set('port',3000 || process.env.PORT);
const serv = http.createServer(app);
server.listen(process.env.PORT || 3000);