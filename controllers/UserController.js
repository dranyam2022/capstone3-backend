const User = require('../models/User')
const Course = require('../models/Course')
const bcrypt = require('bcrypt')
const auth = require('../auth')

module.exports.checkIfEmailExists = (data) => {
	return User.find({email: data.email}).then((result) => {
		if(result.length > 0){
			return true
		}

		return false
	})
}

module.exports.register = (data) => {
	let encrypted_password = bcrypt.hashSync(data.password, 10)

	let new_user = new User({
		firstName: data.firstName,
		lastName: data.lastName,
		email: data.email,
		mobileNo: data.mobileNo,
		password: encrypted_password
	})

	return new_user.save().then((created_user, error) => {
		if(error){
			return false 
		}

		return {
			message: 'User successfully registered!'
		}
	})
}

module.exports.login = (data) => {
	return User.findOne({email: data.email}).then((result) => {
		if(result == null){
			return {
				message: "User doesn't exist!"
			}
		}

		const is_password_correct = bcrypt.compareSync(data.password, result.password)

		if(is_password_correct) {
			return {
				accessToken: auth.createAccessToken(result)
			}
		}

		return {
			message: 'Password is incorrect!'
		}
	})
}

module.exports.getUserDetails = (user_id) => {
	return User.findById(user_id, {password: 0}).then((result) => {
		return result
	})
}

module.exports.enroll = async (data) => {
	// Check if user is done adding the course to its enrollments array
	let is_user_updated = await User.findById(data.userId).then((user) => {
		user.enrollments.push({
			courseId: data.courseId
		})

		return user.save().then((updated_user, error) => {
			if(error){
				return false
			}

			return true
		}) 
	})

	// Check if course is done adding the user to its enrollees array
	let is_course_updated = await Course.findById(data.courseId).then((course) => {
		course.enrollees.push({
			userId: data.userId
		})

		return course.save().then((updated_course, error) => {
			if(error){
				return false
			}

			return true
		}) 
	})

	// Check if both the user and course have been updated successfully, and return a success message if so
	if(is_user_updated && is_course_updated){
		return {
			message: 'User enrollment is successful!'
		}
	}

	// If the enrollment failed, return 'Something went wrong.'
	return {
		message: 'Something went wrong.'
	}
}