const Course = require('../models/Course')

module.exports.addCourse = (data) => {
	if(data.isAdmin){
		let new_course = new Course({
			name: data.course.name,
			description: data.course.description,
			price: data.course.price
		})
		
		return new_course.save().then((new_course, error) => {
			if(error){
				return false
			}

			return {
				message: 'New course successfully created!'
			}
		})
	}

	let message = Promise.resolve({
		message: 'User must be ADMIN to access this.'
	})

	return message.then((value) => {
		return value
	})
}