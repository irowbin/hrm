const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

const app = express()

const server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(3000);
//here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/dist')))

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
	res.sendFile(path.join(__dirname, '/dist/index.html'))
})

const port = process.env.PORT || 8080
app.listen(port)
console.log(`app is listening on port: ${port}`)

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
