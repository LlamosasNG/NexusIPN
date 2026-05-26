import { CorsOptions } from 'cors'

const configuredOrigins = [
  process.env.FRONTEND_URL,
  ...(process.env.FRONTEND_URLS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
]

export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    const whiteList = [...configuredOrigins]
    if (process.argv[2] === '--api') {
      whiteList.push(undefined)
    }
    if (whiteList.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
