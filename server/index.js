var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var sqlite = require('sqlite');
var SQL = require('sql-template-strings');

const dbPromise = sqlite.open('./database.sqlite', { Promise });
const messages = [];

app.use(async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();

    const db = await dbPromise;
    db.run("CREATE TABLE IF NOT EXISTS Messages ( id INTEGER PRIMARY KEY, text TEXT)");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/send', async (req, res) => {
    // if (req.body && req.body.message)
    //     messages.push(req.body.message)
    // res.send({ answer: messages });

    try {
        const db = await dbPromise;
        if (req.body && req.body.message)
            db.run(SQL`INSERT Into Messages (text) VALUES (${req.body.message})`)

        const messages = await db.all('SELECT * FROM Messages');    
        res.send({ answer: messages });
    } catch (err) {
        next(err);
    }

});

app.get('/messages', async (req, res) => {
    const db = await dbPromise;
    const dbMessages = await db.all('SELECT * FROM Messages ORDERE BY id DESC LIMIT 10');
    const messages = dbMessages.map(e => e.text);
    res.send({ messages: messages });
});

app.listen(3001, function () {
    console.log('Example app listening on port 3001!');
});