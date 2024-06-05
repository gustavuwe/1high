import 'dotenv/config'
import Fastify from 'fastify'
import { usersRepositories } from './repositories/users.repositories'

// interface RequestUser {
//   email: string
//   username: string
//   password: string
// }

console.log(process.env.DATABASE_URL)

const app = Fastify({})

app.get('/', (request, reply) => {
  reply.send({ hello: 'world' })
})

app.post('/register', async (request, reply) => {
  const { email, username, password } = request.body

  try {
    usersRepositories.createUser(email, username, password)
  } catch (err) {
    return reply.status(500).send(err)
  }

  return reply.status(201).send()
})

app.listen({ port: 3000 }, (err, adress) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  console.log(`Server is Running on ${adress}`)
})
