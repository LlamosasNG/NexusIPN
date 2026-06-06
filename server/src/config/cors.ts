import { CorsOptions } from 'cors'
import dotenv from 'dotenv'

dotenv.config({ quiet: true })

const getConfiguredOrigins = () =>
  [
    process.env.FRONTEND_URL,
    ...(process.env.FRONTEND_URLS || '')
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean),
  ].filter(Boolean)

export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true)
    }
    const whiteList = getConfiguredOrigins()
    if (process.argv[2] === '--api') {
      whiteList.push(undefined)
    }
    if (whiteList.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
}
