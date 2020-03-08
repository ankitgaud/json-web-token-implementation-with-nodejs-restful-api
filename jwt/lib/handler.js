const jwt = require('jsonwebtoken');

const jwtKey = 'eyJ1c2VybmFtZSI6InBhc3N3b3JkIiwicGFzc3dvcmQiOiJwYXNzd29yZDEiLCJpYXQiOjE1ODM2NzYxNzgsImV4cCI6MTU4MzY3NjQ3OH0';
const jwtExpirySeconds = 300;

const users = {
  username: 'password',
  password: 'password1'
}

const logIn = (req, res) => {
  const { username, password } = req.body
  console.log(username, users.username)

  if (username == users.username) {
    console.log("hi")
    if(password !== users.password){
      return res.status(401).end()
    }
  }else{
    return res.status(401).end()
  }

  const token = jwt.sign({ username, password }, jwtKey, {
    algorithm: 'HS256',
    expiresIn: jwtExpirySeconds
  })
  //res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000 })
  res.send(token)
  res.end()
}

const verify = (req, res, next) => {
  try{
  const token = req.get("Authorization").slice(7)

  if (!token) {
    return res.status(401).end()
  }

  var payload
  try {
    payload = jwt.verify(token, jwtKey)
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).end()
    }
    return res.status(400).end()
  }
  return next()
}catch(error){
  throw error
}
}


  const logout = (req, res) => {
    const token = req.cookies.token
    if (!token) {
      return res.status(401).end()
    }

    var payload
    try {
      payload = jwt.verify(token, jwtKey)
    } catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        return res.status(401).end()
      }
      return res.status(400).end()
    }

    const nowUnixSeconds = Math.round(Number(new Date()) / 1000)
    if (payload.exp - nowUnixSeconds > 30) {
      return res.status(400).end()
    }

    const newToken = jwt.sign({ username: payload.username }, jwtKey, {
      algorithm: 'HS256',
      expiresIn: jwtExpirySeconds
    })

    res.cookie('token', newToken, { maxAge: jwtExpirySeconds * 1000 })
    res.end()
  }


module.exports = {
    logIn,
    verify,
    logout
}