import express from 'express'
import multer from 'multer'
import path from 'path'
import {User, Post} from './models'

// ------------------ Setup ---------------------------------------

const app = express()
const APP_URL = `http://${process.env.HOST}${process.env.APP_PORT ? ':' + process.env.APP_PORT : ''}`
const API_URL = `http://${process.env.HOST}${process.env.API_PORT ? ':' + process.env.API_PORT : ''}`
const STORAGE_PATH = path.join(__dirname, '/public')

let users = {'usr': new User('usr', 'usr', 'blog-1', 'LOOOOOOOOOOOOOOOOL')}

const cookieSession = require('cookie-session')
app.use(cookieSession({
  name: 'session',
  keys: ['profile']
}))

// --- multer

console.log(STORAGE_PATH)
app.use(express.static(STORAGE_PATH))

const upload = multer({dest: STORAGE_PATH})

// parse urlencoded request bodies into req.body
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', APP_URL)
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

// ------------------ Helpers ---------------------------------------

const checkParam = (req, res, param, paramName) => {
  if (!req.body.hasOwnProperty(param) || req.body[param] === '') {
    res.status(400).send({message: `${paramName} not provided`})
    return false
  }
  return true
}

const checkUsername = (req, res) => checkParam(req, res, 'username', 'Username')
const checkPassword = (req, res) => checkParam(req, res, 'password', 'Password')
const checkDesignType = (req, res) => checkParam(req, res, 'designType', 'Design type')

const checkUsernameAndPassword = (req, res) => checkUsername(req, res) && checkPassword(req, res)

const checkAuth = (req, res, next) => {
  if (req.session.profile && req.session.profile.username in users) {
    next()
  } else {
    res.status(401).send({message: 'Youre not logged in'})
  }
}

// ------------------ Endpoints ---------------------------------------

app.post('/register', (req, res) => {
  if (checkUsernameAndPassword(req, res) && checkDesignType(req, res)) {
    const username = req.body['username']
    const password = req.body['password']
    const designType = req.body['designType']
    const about = req.body['about'] || ''
    if (users.hasOwnProperty(username)) {
      res.status(400).send({message: 'username already exists'})
    } else {
      const usr = new User(username, password, designType, about)
      const profile = usr.getProfile()
      users[usr.username] = usr
      req.session.profile = profile
      res.status(200).send(profile)
    }
  }
})

app.post('/login', (req, res) => {
  if (checkUsernameAndPassword(req, res)) {
    const username = req.body['username']
    const password = req.body['password']
    const usrId = username.toLowerCase()
    if (users.hasOwnProperty(usrId) && users[usrId].password === password) {
      const profile = users[usrId].getProfile()
      req.session.profile = profile
      res.status(200).send(profile)
    } else {
      res.status(400).send({message: 'Incorrect username or password'})
    }
  }
})

app.post('/logout', (req, res) => {
  delete req.session
  res.status(200).send({message: 'Logout successful'})
})

app.post('/images/upload', upload.single('image'), (req, res) => {
  res.status(200).send({filename: req.file.filename})
})

app.get('/profiles/:username', checkAuth, (req, res) => {
  let username = req.params['username']
  if (users.hasOwnProperty(username)) {
    res.status(200).send(users[username].getProfile())
  } else {
    res.status(404).send({message: 'User not found'})
  }
})

app.put('/profiles/:username', checkAuth, (req, res) => {
  let username = req.params['username']
  const postData = req.body
  if (users.hasOwnProperty(username)) {
    if (username === req.session.profile.username) {
      users[username].update(postData)
      res.status(200).send(users[username].getProfile())
    } else {
      res.status(401).send({message: 'Unauthorised user'})
    }
  } else {
    res.status(404).send({message: 'User not found'})
  }
})

app.get('/posts/:username', checkAuth, (req, res) => {
  let username = req.params['username']
  if (users.hasOwnProperty(username)) {
    res.status(200).send({posts: Object.values(users[username].posts).sort((a, b) => b.date - a.date).map(post => post.getPost())})
  } else {
    res.status(404).send({message: 'User not found'})
  }
})

app.post('/posts/:username', checkAuth, (req, res) => {
  let username = req.params['username']
  const postData = req.body
  if (users.hasOwnProperty(username)) {
    if (username === req.session.profile.username) {
      const post = new Post(postData.title, postData.content)
      users[username].posts[post.id] = post
      res.status(200).send({})
    } else {
      res.status(401).send({message: 'Unauthorised user'})
    }
  } else {
    res.status(404).send({message: 'User not found'})
  }
})

app.put('/posts/:username', checkAuth, (req, res) => {
  let username = req.params['username']
  const postData = req.body
  if (users.hasOwnProperty(username)) {
    if (username === req.session.profile.username) {
      const post = users[username].posts[postData.id]
      post.update(postData)
      users[username].posts[post.id] = post
      res.status(200).send({})
    } else {
      res.status(401).send({message: 'Unauthorised user'})
    }
  } else {
    res.status(404).send({message: 'User not found'})
  }
})

app.delete('/posts/:username', checkAuth, (req, res) => {
  let username = req.params['username']
  const postData = JSON.parse(req.query['post'])
  if (users.hasOwnProperty(username)) {
    if (username === req.session.profile.username) {
      console.log(Object.keys(users[username].posts))
      console.log()
      console.log(postData.id)
      if (users[username].posts.hasOwnProperty(postData.id)) {
        delete users[username].posts[postData.id]
        res.status(200).send({})
      } else {
        res.status(404).send({message: 'Post not found'})
      }
    } else {
      res.status(401).send({message: 'Unauthorised user'})
    }
  } else {
    res.status(404).send({message: 'User not found'})
  }
})

app.listen(process.env.API_PORT, process.env.HOST, () => console.log(`Api listening on port ${API_URL}!`))
