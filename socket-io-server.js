
const express = require('express')
const app = express()
const server = app.listen(3000)

app.get('/', (req, res) => {

    res.send(`Hi! Server is listening on port ${3000}`)
});

const io = require('socket.io')(server);
console.log('current evn: ',process.env.NODE_ENV)
io.on('connection', (socket) => {
    socket.on('addOrUpdateEmployee', (data) => {
        console.log('an employee is created: ', data)
        socket.broadcast.emit('employeeCreatedOrUpdated', data);
    });
    socket.on('deleteEmployee', (id) => {
        console.log('an employee is deleted: ',id)
        socket.broadcast.emit('employeeDeleted', id);
    });
    socket.on('disconnect', () => {
    });
});

