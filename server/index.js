var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const messages = [];

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/send', function (req, res) {
    console.log(req.body);
    if (req.body && req.body.message)
        messages.push(req.body.message)
    res.send({ answer: messages });
});

app.get('/messages', function (req, res) {
    res.send({ messages: messages });
});

app.listen(3001, function () {
    console.log('Example app listening on port 3001!');
});