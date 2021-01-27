const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const users = require('./users')()

const m = (name, text, id) => ({ name, text, id })

io.on('connection', socket => {
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

    cb({ userId: socket.id })
    io.to(data.room).emit('updateUsers', users.getByRoom(data.room))
    socket.emit('newMessage', m('admin', `Wellcome ${data.name}.`))
    socket.broadcast
      .to(data.room)
      .emit('newMessage', m('admin', `User ${data.name} joined.`))
  })

  socket.on('createMessage', (data, cb) => {
    if (!data.text) {
      return cb('The text cannot be empty')
    }

    const user = users.get(data.id)
    if (user) {
      io.to(user.room).emit('newMessage', m(user.name, data.text, data.id))
    }
    cb()
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

  socket.on('stop', () => {
      io.to('room').emit('stopChat')
  })

  socket.on('changeVideoProccess', () => {
      io.to('room').emit('changeVideoProccess')
  })

  socket.on('changeAudioProccess', () => {
      io.to('room').emit('changeAudioProccess')
  })

  socket.on('videoMute', (data) => {
      io.to('room').emit('videoMute', data)
  })

  socket.on('videoUnmute', (data) => {
      io.to('room').emit('videoUnmute', data)
  })

  socket.on('audioMute', (data) => {
      io.to('room').emit('audioMute', data)
  })

  socket.on('audioUnmute', (data) => {
      io.to('room').emit('audioUnmute', data)
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
