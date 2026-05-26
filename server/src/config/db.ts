import dotenv from 'dotenv'
import { Sequelize } from 'sequelize-typescript'
//import { fileURLToPath } from 'url'
//import { dirname } from 'path'
dotenv.config({ quiet: true })

//const __filename = fileURLToPath(import.meta.url)
//const __dirname = dirname(__filename)

const useSsl = process.env.DATABASE_SSL === 'true'
const rejectUnauthorized =
  process.env.DATABASE_SSL_REJECT_UNAUTHORIZED === 'true'

const databaseUrl =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 5432}/${process.env.POSTGRES_DB}`

export const db = new Sequelize(databaseUrl, {
  models: [__dirname + '/../models/**/*'],
  logging: false,
  dialectOptions: useSsl
    ? {
        ssl: {
          require: true,
          rejectUnauthorized,
        },
      }
    : undefined,
})
