var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var sqlite = require('sqlite');
var SQL = require('sql-template-strings');

const port = 3001;

const dbPromise = sqlite.open('./database.sqlite', { Promise });

dbPromise.then((db) => {
    db.run("CREATE TABLE IF NOT EXISTS Messages ( id INTEGER PRIMARY KEY, text TEXT)");
});


io.on('connection', (socket) => {

    socket.on('getMessages', async () => {
        const db = await dbPromise;
        const dbMessages = await db.all('SELECT * FROM Messages ORDER BY id DESC LIMIT 10');
        const messages = dbMessages.map(e => e.text);
        socket.emit('messages', messages);
    })

    socket.on('newMeassage', async (data) => {
        try {
            const db = await dbPromise;
            if (data && data.message) {
                db.run(SQL`INSERT Into Messages (text) VALUES (${data.message})`)
                const lastMessages = await db.all('SELECT * FROM Messages ORDER BY id DESC LIMIT 1');
                io.emit('newMessage', lastMessages[0].text)
            }
        } catch (err) {
            next(err);
        }

    });
});

io.listen(port);
console.log('listening on port ', port);