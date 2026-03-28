import dotenv from 'dotenv'
import { Sequelize } from 'sequelize-typescript'
//import { fileURLToPath } from 'url'
//import { dirname } from 'path'
dotenv.config({ quiet: true })

//const __filename = fileURLToPath(import.meta.url)
//const __dirname = dirname(__filename)

export const db = new Sequelize(process.env.DATABASE_URL, {
  models: [__dirname + '/../models/**/*'],
  logging: false,
  // dialectOptions: {
  //   ssl: {
  //     require: false,
  //   },
  // },
})
