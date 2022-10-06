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