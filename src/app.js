const express = require('express') 
const bodyParser = require('body-parser') 
const users = [{ 
	userName: "Giada Amaducci", 
	userEmail: "giada.a@jumpgroup.it", 
	userAge: "25", 
	userUniqueId: '1'
}, 
{ 
	userName: "Simone Mazzotti", 
	userEmail: "simone.m@jumpgroup.it", 
	userAge: "32", 
	userUniqueId: '2'
}, 
{ 
	userName: "Erica Marchi", 
	userEmail: "erica.m@jumpgroup.it", 
	userAge: "30", 
	userUniqueId: '3'
} 
] 

const app = express() 

app.set('view engine', 'ejs') 

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ 
	extended: true
})) 

app.get("/", function (req, res) { 
	res.render("home", { 
		data: users 
	}) 
}) 

app.post("/", (req, res) => { 
	const inputUserName = req.body.userName 
	const inputUserEmail = req.body.userEmail 
	const inputUserAge = req.body.userAge 
	const inputUserUniqueId = req.body.userUniqueId 

	users.push({ 
		userName: inputUserName, 
		userEmail: inputUserEmail, 
		userAge: inputUserAge, 
		userUniqueId: inputUserUniqueId 
	}) 

	res.render("home", { 
		data: users 
	}) 
}) 

app.post('/delete', (req, res) => { 
	var requestedUserUniqueId = req.body.userUniqueId; 
	var j = 0; 
	users.forEach(user => { 
		j = j + 1; 
		if (user.userUniqueId === requestedUserUniqueId) { 
			users.splice((j - 1), 1) 
		} 
	}) 
	res.render("home", { 
		data: users 
	}) 
}) 

app.post('/update', (req, res) => { 
	const inputUserName = req.body.userName 
	const inputUserEmail = req.body.userEmail 
	const inputUserAge = req.body.userAge 
	const inputUserUniqueId = req.body.userUniqueId 

	var j = 0; 
	users.forEach(user => { 
		j = j + 1; 
		if (user.userUniqueId === inputUserUniqueId) { 
			user.userName = inputUserName 
			user.userEmail = inputUserEmail 
			user.userAge = inputUserAge 
		} 
	}) 
	res.render("home", { 
		data: users 
	}) 
})

app.use(express.static(__dirname + '/public'));

module.exports = { app };


