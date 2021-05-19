const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const users = require('./controllers/Users')()
const actions = require('./services/ActionService')()

const cron = require('node-cron')
let loading = false

cron.schedule('*/20 * * * * *', async () => {
    if (!loading) {
        loading = true
        console.log('20 seconds cron...')
        await actions.setOfflineUsers()
        await io.emit('pingUsers')

        setTimeout(async res => {
            const data = await actions.getUsersList()
            await io.emit('refreshUserList', data)
            loading = false
        },4000)
    }
})

const m = (name, text, id) => ({name, text, id})

io.on('connection', socket => {

    socket.on('pingUsers', async () => {
        console.log(loading)
        if (!loading) {
            loading = true
            console.log('refresh cron...')
            await actions.setOfflineUsers()
            await io.emit('pingUsers')

            setTimeout(async res => {
                const data = await actions.getUsersList()
                await io.emit('refreshUserList', data)
                loading = false
            },4000)
        }
    })

    // Start: user join socket
    socket.on('userJoin', (id) => {
        socket.join(id)
    })

    socket.on('createMessage', (data, cb) => {
        socket.broadcast.to(data.to).emit('newMessage', data)
        cb()
    })

    socket.on('refreshReadedMessages', (data) => {
        socket.broadcast.to(data.to).emit('refreshReadedMessages', data)
    })

    socket.on('startCall', data => {
        socket.broadcast.to(data.to._id).emit('incomingCall', data)
    })

    socket.on('endCall', data => {
        socket.broadcast.to(data.to._id).emit('cancelCall', data)
    })

    socket.on('acceptCall', (data, cb) => {
        socket.broadcast.to(data.to._id).emit('acceptCall', data)
        cb()
    })

    socket.on('refreshUsersData', () => {
        io.emit('refreshUsersData')
        socket.emit('refreshUsersData')
    })

    socket.on('remoteLogin', (data, cb) => {
        console.log('remoteLogin socket');
        console.log(data.to._id);
        socket.broadcast.to(data.to._id).emit('remoteLogin', data)
        cb()
    })

    socket.on('refreshCart', userId => {
        socket.broadcast.to(userId).emit('refreshCart')
    })


    // Start: employee create a room
    socket.on('employeeJoined', (data, cb) => {
        socket.join(data.roomId)
        cb()
    })

    // joinRoomAsClient
    socket.on('joinRoomAsClient', async (data, cb) => {
        socket.join(data.roomId)
        io.to(data.roomId).emit('joinRoom', {client: data.client})
        cb()
    })

    // joinRoomAsClient
    socket.on('joinRoomAsEmployee', async (data, cb) => {
        socket.join(data.roomId)
        io.to(data.roomId).emit('joinRoom', {employee: data.employee})
        cb()
    })

    // Update active rooms
    socket.on('updateActiveRooms', async data => {
        io.emit('reloadEmployeeList', data)
    })

    // Create an send a message
    // socket.on('createMessage', (data, cb) => {
    //     if (!data.text) {
    //         return cb('The text cannot be empty')
    //     }
    //
    //     if (data.user && data.room) {
    //         const res = {
    //             message: data.message,
    //             simpleMessage: m(data.user.name, data.text, data.user._id),
    //         }
    //
    //         io.to(data.room).emit('newMessage', res)
    //     }
    //     cb()
    // })

    // Create an send a message
    socket.on('shareHistory', (data) => {
        io.to(data.roomId).emit('shareHistory', data.messages)
    })


    // Video Calling modificators
    socket.on('videoMute', (data) => {
        io.to(data.roomId).emit('videoMute', data.userId)
    })

    socket.on('videoUnmute', (data) => {
        io.to(data.roomId).emit('videoUnmute', data.userId)
    })

    socket.on('audioMute', (data) => {
        io.to(data.roomId).emit('audioMute', data.userId)
    })

    socket.on('audioUnmute', (data) => {
        io.to(data.roomId).emit('audioUnmute', data.userId)
    })

    socket.on('shareUserAction', async data => {
        let action = {}
        if (data) {
            socket.join(data.userId)
            action = await actions.addUser(data)
        }
        console.log('sockets share user actions')
        const actionsAll = await actions.getAllActions()

        io.emit('refreshActions', {action, actionsAll})
    })


    socket.on('shareEmployeeStatus', employee => {
        io.emit('refreshEmployeeStatus', employee)
        socket.join(employee._id)
    })


    socket.on('rejectCall', data => {
        io.to(data.roomId).emit('call_reject', true)
    })

    socket.on('responseCall', data => {
        io.to(data.roomId).emit('call_response', true)
    })


    socket.on('userJoined', (data, cb) => {
        if (!data.name || !data.room) {
            return cb('Data is incorrect')
        }

        socket.join(data.room)

        users.remove(socket.id)
        users.add({
            id: socket.id,
            name: data.name,
            room: data.room
        })

        cb({userId: socket.id})
        io.to(data.room).emit('updateUsers', users.getByRoom(data.room))
        socket.emit('newMessage', m('admin', `Wellcome ${data.name}.`))
        socket.broadcast
            .to(data.room)
            .emit('newMessage', m('admin', `User ${data.name} joined.`))
    })


    socket.on('userLeft', (id, cb) => {
        const user = users.remove(id)
        if (user) {
            io.to(user.room).emit('updateUsers', users.getByRoom(user.room))
            io.to(user.room).emit(
                'newMessage',
                m('admin', `User ${user.name} logged out.`)
            )
        }
        cb()
    })

    socket.on('stop', (roomId) => {
        io.to(roomId).emit('stopChat')
    })


    socket.on('disconnect', () => {
        const user = users.remove(socket.id)
        if (user) {
            io.to(user.room).emit('updateUsers', users.getByRoom(user.room))
            io.to(user.room).emit(
                'newMessage',
                m('admin', `User ${user.name} logged out.`)
            )
        }
    })
})

module.exports = {
    app,
    server
}
