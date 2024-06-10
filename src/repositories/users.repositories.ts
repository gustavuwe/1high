import { UserTable } from '../drizzle/schemas/User'
import { db } from '../drizzle/db'
import { eq } from 'drizzle-orm'

interface IRegisterUser {
  email: string
  username: string
  password: string
}

interface IUpdateUser {
  id: string
  email: string
  username: string
  password: string
}

class UsersRepositories {
  async registerUser({
    email,
    username,
    password,
  }: IRegisterUser): Promise<void> {
    await db.insert(UserTable).values({
      email: email,
      name: username,
      password: password,
    })
  }

  async removeUserById(id: string) {
    await db.delete(UserTable).where(eq(UserTable.id, id))
  }

  async listUsers() {
    const users = await db.query.UserTable.findMany()

    return users
  }

  async updateUser({ id, email, username, password }: IUpdateUser) {
    await db
      .update(UserTable)
      .set({
        email: email,
        name: username,
        password: password,
      })
      .where(eq(UserTable.id, id))
  }
}

export { UsersRepositories }
