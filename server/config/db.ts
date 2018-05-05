import * as mongodb from 'mongodb'

export * from 'mongodb'

let client: mongodb.MongoClient
let db: mongodb.Db

const collections: { [key: string]: mongodb.Collection } = {}

async function getDb () {
  // TODO: check for disconnected client?
  if (!client) {
    client = await mongodb.MongoClient.connect(process.env.MONGO_URL)
  }

  if (!db) {
    db = client.db(process.env.MONGO_DB_NAME)
  }

  return db
}

export async function collection<T>(name: string): Promise<mongodb.Collection<T>> {
  const db = await getDb()

  if (!collections[name]) {
    collections[name] = await db.collection<T>(name)
  }

  return collections[name]
}
