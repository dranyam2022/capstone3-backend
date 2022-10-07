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

// Get all courses
router.get('/', (request, response) => {
	CourseController.getAllCourses().then((result) => {
		response.send(result)
	})
})

// Get all ACTIVE courses
router.get('/active', (request, response) => {
	CourseController.getAllActive().then((result) => {
		response.send(result)
	})
})

// Get single course
router.get('/:courseId', (request, response) => {
	CourseController.getCourse(request.params.courseId).then((result) => {
		response.send(result)
	})
})

// Update single course
router.patch('/:courseId/update', auth.verify, (request, response) => {
	CourseController.updateCourse(request.params.courseId, request.body).then((result) => {
		response.send(result)
	})
})

// MINI ACTIVITY (30 mins.)
// Create a route and a controller function for setting the isActive field of a course to false
// The user must be logged in to archive a course
// The endpoint must be '/archive'
// The response must be 'The course has been archived successfully!'
// Send screenshot of response from postman to our hangouts GC
router.patch('/:courseId/archive', auth.verify, (request, response) => {
	CourseController.archiveCourse(request.params.courseId).then((result) => {
		response.send(result)
	})
})

module.exports = router 