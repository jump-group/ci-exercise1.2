const { app } = require('./src/app'); 

app.listen(3001, (req, res) => { 
	console.log("App is running on port 3001") 
})