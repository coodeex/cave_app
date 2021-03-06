const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('products', {name: 1, price: 1, weight: 1, id: 1})
  response.json(users.map(u => u.toJSON()))
})

//Uncomment the method below only if you want to add more users
/*usersRouter.post('/', async (request, response) => {
  const body = request.body

  if(body.password.length < 3 || body.username.length < 3){
    return response.status(400).json({
      error: 'The length of a password and a username must be at least 3 characters'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})*/

module.exports = usersRouter