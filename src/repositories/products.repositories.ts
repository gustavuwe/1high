import { PgTable, pgTable } from 'drizzle-orm/pg-core'
import { db } from '../drizzle/db'
import { ProductTable } from '../drizzle/schemas/Product'
import { eq } from 'drizzle-orm'

interface IProducts {
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

class ProductsRepositories {
  constructor() {}

  async createProduct({
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
  }: IProducts): Promise<void> {
    await db.insert(ProductTable).values({
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
  }

  async listProducts() {
    // const products = await db.select().from(ProductTable)
    const products = await db.query.ProductTable.findMany()

    return products
  }

  async removeProduct(id: string) {
    await db.delete(ProductTable).where(eq(ProductTable.id, id))
  }

  async updateProduct({
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
  }: IUpdateProduct): Promise<void> {
    await db
      .update(ProductTable)
      .set({
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
      .where(eq(ProductTable.id, id))
  }
}

export { ProductsRepositories }
