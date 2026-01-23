import rateLimit from 'express-rate-limit'

export const limiter = rateLimit({
  windowMs: 60000,
  limit: 5,
  message: {
    error: 'Haz alcanzado el límite de peticiones posibles, intenta más tarde',
  },
})
