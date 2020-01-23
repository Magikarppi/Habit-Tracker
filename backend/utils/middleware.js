const tokenExtractor = (request, response, next) => {
  if (Object.getOwnPropertyNames(request.headers).includes('authorization')) {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      const token = authorization.substring(7)
      Object.assign(request, { token })
    } else {
      return null
    }
  }
  next()
}

module.exports = {
  tokenExtractor
}