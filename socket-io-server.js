const io = require('socket.io')(3000);

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

