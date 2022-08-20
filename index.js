const express = require('express');
const http = require('http');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const hostname = 'localhost';
const port =3000;
const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.all('/dishes', (req, res, next) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});

app.get('/dishes', (req, res, next) => {
    res.end('Will send all the dishes to you!');
});

app.post('/dishes', (req, res, next) => {
    res.end('Will add the dish: '+req.body.name + ' with details: ' +
     req.body.description); 
});

app.put('/dishes', (req, res, next) => {
    res.statusCode = 403;
    res.end('Put operation is not supported on dishes '); 
});
// dangerous, must specify who can and cannot delete dishes!
app.delete('/dishes', (req, res, next) => {
    res.end('Deleting all dishes!');
});

app.get('/dishes/:dishID', (req, res, next) => {
    res.end('Will send details of the dish: ' +
    req.params.dishID + ' to you!');
});

app.post('/dishes/:dishID', (req, res, next) => {
    res.statusCode = 403;
    res.end('Post operation is not supported on a dish/'+ 
    req.params.dishID); 
});

app.put('/dishes/:dishID', (req, res, next) => {
    res.statusCode = 403;
    res.write('Updating the dish...' + req.params.dishID + '\n');
    res.end('Will update the dish: ' + req.body.name + 'with details: '+
    req.body.description); 
});
// dangerous, must specify who can and cannot delete dishes!
app.delete('/dishes/:dishID', (req, res, next) => {
    res.end('Deleting the dish: ' + req.params.dishID);
});


app.use((req, res, next) => {
    // console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body> <h1>This is an Express Server </h1></body> </html>');
} );



const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}`);
});