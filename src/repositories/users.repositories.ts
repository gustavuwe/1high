import "dotenv/config";
import { UserTable } from "../drizzle/schemas/User";
import { db } from "../drizzle/db";

interface RegisterUser {
  email: string;
  username: string;
  password: string;
}

class usersRepositories {
  async registerUser({
    email,
    username,
    password,
  }: RegisterUser): Promise<void> {
    await db.insert(UserTable).values({
      email: email,
      name: username,
      password: password,
    });

    const user = await db.query.UserTable.findFirst();
  }
}

export { usersRepositories };
