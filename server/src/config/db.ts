import dotenv from 'dotenv'
import { Sequelize } from 'sequelize-typescript'
dotenv.config({ quiet: true })

export const db = new Sequelize(process.env.DATABASE_URL, {
  models: [__dirname + '/../models/**/*'],
  logging: false,
  // dialectOptions: {
  //   ssl: {
  //     require: false,
  //   },
  // },
})
