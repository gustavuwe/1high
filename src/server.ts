import 'dotenv/config'
import Fastify from 'fastify'
import { UsersRepositories } from './repositories/users.repositories'
import { env } from './config/env'

const usersRepositories = new UsersRepositories()

const app = Fastify({})

interface IUserInfo {
  email: string
  username: string
  password: string
}

interface IUserInfoUpdate {
  id: string
  email: string
  username: string
  password: string
}

interface IDeleteUserRequest {
  id: string
}

app.get('/', (_request, _reply) => {
  const allUsers = usersRepositories.listUsers()

  return allUsers
})

app.post<{
  Body: IUserInfo
}>('/', async (request, reply) => {
  const { email, username, password } = request.body

  try {
    usersRepositories.registerUser({
      email,
      username,
      password,
    })
  } catch (err) {
    return reply.status(400).send(err)
  }

  return reply.status(201).send()
})

app.delete('/', async (request, reply) => {
  const { id } = request.body as IDeleteUserRequest

  try {
    await usersRepositories.removeUserById(id)
  } catch (err) {
    reply.status(400).send(err)
  }

  return reply.status(200).send()
})

app.patch('/', async (request, reply) => {
  const { id, email, username, password } = request.body as IUserInfoUpdate

  try {
    usersRepositories.updateUser({ id, email, username, password })
  } catch (err) {
    reply.status(500).send(err)
  }

  reply.status(200).send()
})

app.listen({ port: env.PORT }, (err, adress) => {
  if (err) {
    console.log(err)
    app.log.error(err)
    process.exit(1)
  }
  console.log(`Server is Running on ${adress}`)
})
