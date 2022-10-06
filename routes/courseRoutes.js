const express = require('express')
const router = express.Router()
const CourseController = require('../controllers/CourseController')
const auth = require('../auth')

// Create single course
router.post('/create', auth.verify, (request, response) => {
	const data = {
		course: request.body,
		isAdmin: auth.decode(request.headers.authorization).isAdmin
	}

	CourseController.addCourse(data).then((result) => {
		response.send(result)
	})
})

module.exports = router 