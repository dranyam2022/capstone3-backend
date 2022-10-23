const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const auth = require('../auth')

// Check if email exists
router.post("/check-email", (request, response) => {
	UserController.checkIfEmailExists(request.body).then((result) => {
		response.send(result)
	})
})

// Register new user
router.post("/register", (request, response) => {
	UserController.register(request.body).then((result) => {
		response.send(result)
	})
})

// Login user
router.post("/login", (request, response) => {
	UserController.login(request.body).then((result) => {
		response.send(result)
	})
})

// PASTE TO ROUTES

// Get user details from token
router.get("/details", auth.verify, (request, response) => {

	// Retrieves the user data from the token
	const user_data = auth.decode(request.headers.authorization);

	// Provides the user's ID for the getProfile controller method
	UserController.getProfile({ userId: user_data.id }).then(result => response.send(result));

});

// Enroll a user
router.post('/enroll', auth.verify, (request, response) => {
	let data = {
		userId: request.body.userId,
		courseId: request.body.courseId
	}

	UserController.enroll(data).then((result) => {
		response.send(result)
	})
})

module.exports = router