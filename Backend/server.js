const express = require('express')

const { readFileSync , writeFileSync } = require('fs')
const app = express()
const port = 3000

app.use(express.static('../FrontPage'))
app.use(express.static('../SignIn'))
app.use(express.static('../SignUp'))

const frontend = readFileSync('../FrontPage/index.html')
const homestyle = readFileSync('../FrontPage/style.css')

const signin = readFileSync('../SignIn/signin.html')
const signup = readFileSync('../SignUp/signUp.html')

const donors = readFileSync('../Donors/index.html')


const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded( { extended:true } )) 

app.use(express.json())

const log = console.log

app.get('/home', (req, res) => {
  res.type('html')
  res.send(frontend)
})

app.post('/home', (req, res) => {
  // log(req.body)
  // res.json({'done':true})

  const users = require('../DataBase/Users.json')

  const match = []

  users.forEach(user => {

    // log(user['District'] , user['Blood Group'])  	

  	if(user['District'] === req.body['inp1'].trim() && user['Blood Group'] === req.body['inp2'])
    {
    	const obj = {}
    	obj['Name'] = user['Full Name']
    	obj['Blood Group'] = user['Blood Group']
    	obj['Contact No'] = user['Contact']
    	obj['Email'] = user['Email']

	    match.push(obj)
    }   
  })

  // log(match)
  res.json(match)
})

app.get('/home/css', (req, res) => {
  res.type('text/css')
  res.send(homestyle)
})

app.get('/signin', (req, res) => {
  res.type('html')
  res.send(signin)
})

app.post('/signin', (req, res) => {

  log(req.body)

  const users = require('../DataBase/Users.json')
  log(users)

  users.forEach(user => {

  	if(user.Email === req.body.Email && user.Password === req.body.Password)
	  res.json({'Done':true})
  		// res.redirect('/home')
  	else
	  res.json({'Done':false})

  })

})


app.get('/signup', (req, res) => {
  res.type('html')
  res.send(signup)
})

app.post('/signup', (req, res) => {

  log(req.body)
  const users = require('../DataBase/Users.json')
  log(users)

  users.push(req.body)
  log(users)
  
  writeFileSync('../DataBase/Users.json' , JSON.stringify(users))
  res.json({'Done':true})
})


app.get('/donors',(req , res) => {

    res.type('html')
	res.send(donors)
})

app.listen(port, 'localhost' , () => {
  console.log(`Example app listening on port ${port}`)
})
	


