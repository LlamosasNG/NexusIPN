import { corsConfig } from '@/config/cors'

describe('corsConfig', () => {
  const originalFrontendUrl = process.env.FRONTEND_URL
  const originalFrontendUrls = process.env.FRONTEND_URLS
  const originalArgv = [...process.argv]

  afterEach(() => {
    process.env.FRONTEND_URL = originalFrontendUrl
    process.env.FRONTEND_URLS = originalFrontendUrls
    process.argv = [...originalArgv]
    jest.clearAllMocks()
  })

  it('permite el origen definido en FRONTEND_URL aunque se configure después de importar el módulo', () => {
    process.env.FRONTEND_URL = 'http://localhost:5173'
    process.env.FRONTEND_URLS = ''
    const callback = jest.fn()

    if (typeof corsConfig.origin !== 'function') {
      throw new Error('corsConfig.origin debe ser una función')
    }

    corsConfig.origin('http://localhost:5173', callback)

    expect(callback).toHaveBeenCalledWith(null, true)
  })

  it('permite orígenes adicionales definidos en FRONTEND_URLS', () => {
    process.env.FRONTEND_URL = 'http://localhost:8080'
    process.env.FRONTEND_URLS = 'http://localhost:5173, https://nexus.example.edu'
    const callback = jest.fn()

    if (typeof corsConfig.origin !== 'function') {
      throw new Error('corsConfig.origin debe ser una función')
    }

    corsConfig.origin('https://nexus.example.edu', callback)

    expect(callback).toHaveBeenCalledWith(null, true)
  })

  it('permite solicitudes sin encabezado Origin', () => {
    process.env.FRONTEND_URL = 'http://localhost:8080'
    process.env.FRONTEND_URLS = ''
    const callback = jest.fn()

    if (typeof corsConfig.origin !== 'function') {
      throw new Error('corsConfig.origin debe ser una función')
    }

    corsConfig.origin(undefined, callback)

    expect(callback).toHaveBeenCalledWith(null, true)
  })

  it('rechaza orígenes no configurados', () => {
    process.env.FRONTEND_URL = 'http://localhost:8080'
    process.env.FRONTEND_URLS = ''
    const callback = jest.fn()

    if (typeof corsConfig.origin !== 'function') {
      throw new Error('corsConfig.origin debe ser una función')
    }

    corsConfig.origin('http://localhost:5173', callback)

    expect(callback).toHaveBeenCalledWith(expect.any(Error))
  })
})
