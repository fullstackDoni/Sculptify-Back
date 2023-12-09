const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017/Sculptify'

let UserSchema = new mongoose.Schema({
	fullName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	is_active: {
		type: Boolean,
		default: false,
	},
	phone: {
		type: String,
		required: true,
	},
	photo: {
		type: String,
	},
})
const User = mongoose.model('User', UserSchema)
module.exports = User
