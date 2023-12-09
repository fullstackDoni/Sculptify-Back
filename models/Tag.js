const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017/Sculptify'

let TagSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
		unique: true,
	},
})
let Tag = new mongoose.model('Tag', TagSchema)
module.exports = Tag
