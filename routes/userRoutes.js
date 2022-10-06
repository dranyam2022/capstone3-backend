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

// Get single user details
router.get("/:id/details", auth.verify, (request, response) => {
	UserController.getUserDetails(request.params.id).then((result) => {
		response.send(result)
	})
})

module.exports = router