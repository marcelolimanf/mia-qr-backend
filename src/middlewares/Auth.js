const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

module.exports = (request, response, next) => {
  const authHeader = request.headers.authorization

  if(!authHeader)
  return response.status(401).json({ ok: false, message: 'No token provided!', notallowed: true })

  const parts = authHeader.split(' ')

  if(!parts.length === 2)
  return response.status(401).json({ ok: false, message: 'Token error!', notallowed: true })

  const [ scheme, token ] = parts

  if(!scheme === 'Bearer')
  return response.status(401).json({ ok: false, message: 'Token malformatted!', notallowed: true })

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if(err) return response.status(401).json({ ok:false, messsage: 'Token invalid!', notallowed: true })

    request.userId = decoded.id

    return next()
  })

}
