const Room = require('../models/user')

class Users {
  constructor() {
    this.users = []
  }

  CreateUser(req, res){
      const user = new User({
          name: req.body.name
      })

      room.save()
  }

  add(user) {
    this.users.push(user)
  }

  get(id) {
    return this.users.find(user => user.id === id)
  }

  remove(id) {
    const user = this.get(id)

    if (user) {
      this.users = this.users.filter(user => user.id !== id)
    }

    return user
  }

  getByRoom(room) {
    return this.users.filter(user => user.room === room)
  }
}

module.exports = function() {
  return new Users()
}
