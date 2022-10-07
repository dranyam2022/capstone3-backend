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

module.exports.getAllCourses = () => {
	return Course.find({}).then((result) => {
		return result
	})
}

module.exports.getAllActive = () => {
	return Course.find({isActive: true}).then((result) => {
		return result
	})
}

module.exports.getCourse = (course_id) => {
	return Course.findById(course_id).then((result) => {
		return result 
	})
}

module.exports.updateCourse = (course_id, new_data) => {
	return Course.findByIdAndUpdate(course_id, {
		name: new_data.name,
		description: new_data.description, 
		price: new_data.price 
	}).then((updated_course, error) => {
		if(error){
			return false
		}

		return {
			message: 'Course has been updated successfully!'
		}
	})
}

module.exports.archiveCourse = (course_id) => {
	return Course.findByIdAndUpdate(course_id, {
		isActive: false
	}).then((archived_course, error) => {
		if(error){
			return false
		}

		return {
			message: 'Course has been archived successfully!'
		}
	})
}