import 'dotenv/config'
import Fastify from 'fastify'
import { UsersRepositories } from './repositories/users.repositories'
import { ProductsRepositories } from './repositories/products.repositories'
import { env } from './config/env'

const usersRepositories = new UsersRepositories()

const productsRepositories = new ProductsRepositories()

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

// Interface of Products

interface IProduct {
  name: string
  slug: string
  category: string
  brand: string
  price: number
  description: string
  stock: number
  isFeatured: boolean
  images: Array<string>
  banner: string
  weight: number
  dimensions: Array<number>
  warranty: string
  colorOptions: Array<string>
  features: Array<string>
}

interface IUpdateProduct {
  id: string
  name: string
  slug: string
  category: string
  brand: string
  price: number
  description: string
  stock: number
  isFeatured: boolean
  images: Array<string>
  banner: string
  weight: number
  dimensions: Array<number>
  warranty: string
  colorOptions: Array<string>
  features: Array<string>
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

// products

app.get('/products', async (request, reply) => {
  const products = await productsRepositories.listProducts()

  return products
})

app.post<{
  Body: IProduct
}>('/products', async (request, reply) => {
  const {
    name,
    slug,
    category,
    brand,
    price,
    description,
    stock,
    isFeatured,
    images,
    banner,
    weight,
    dimensions,
    warranty,
    colorOptions,
    features,
  } = request.body

  try {
    await productsRepositories.createProduct({
      name,
      slug,
      category,
      brand,
      price,
      description,
      stock,
      isFeatured,
      images,
      banner,
      weight,
      dimensions,
      warranty,
      colorOptions,
      features,
    })
  } catch (err) {
    console.log(err)
    reply.status(400).send()
  } finally {
    reply.status(201).send('created!')
  }
})

app.delete('/products', async (request, reply) => {
  const { id } = request.body as IDeleteUserRequest

  try {
    await productsRepositories.removeProduct(id)
  } catch (err) {
    console.log(err)
    reply.status(400).send()
  } finally {
    reply.status(200).send('product removed successfully!')
  }
})

app.patch<{ Body: IUpdateProduct }>('/products', async (request, reply) => {
  const {
    id,
    name,
    slug,
    category,
    brand,
    price,
    description,
    stock,
    isFeatured,
    images,
    banner,
    weight,
    dimensions,
    warranty,
    colorOptions,
    features,
  } = request.body

  try {
    await productsRepositories.updateProduct({
      id,
      name,
      slug,
      category,
      brand,
      price,
      description,
      stock,
      isFeatured,
      images,
      banner,
      weight,
      dimensions,
      warranty,
      colorOptions,
      features,
    })
  } catch (err) {
    console.log(err)
    reply.status(400).send()
  } finally {
    reply.status(200).send()
  }
})

app.listen({ port: env.PORT }, (err, adress) => {
  if (err) {
    console.log(err)
    app.log.error(err)
    process.exit(1)
  }
  console.log(`Server is Running on ${adress}`)
})
