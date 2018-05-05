import * as DB from '../config/db'
import * as httpErrors from 'http-errors'

export type UserDoc = {
  id: DB.ObjectId
  email: string
  token?: string
  tokenExpires?: Date
  createdAt?: Date
}

export const getCollection = () => DB.collection<UserDoc>('users')

/**
 * Create -------------
 */

type CreateParams = {
  email: string
}

export async function create (params: CreateParams): Promise<DB.ObjectId> {
  await validateCreate(params)

  const users = await getCollection()
  const { insertedId } = await users.insertOne(params)

  return insertedId
}

export async function validateCreate (params: CreateParams): Promise<void> {
  const users = await getCollection()

  // Email should be unique
  const usersWithEmail = await users.find({ email: params.email }).count()
  if (usersWithEmail !== 0) {
    throw new httpErrors[400]('Email taken')
  }
}

/**
 * Find ---------------
 */

// export async function findByToken (token: string): Promise<UserDoc> {
//   const users = await getCollection()
//   return users.findOne({ token })
// }
