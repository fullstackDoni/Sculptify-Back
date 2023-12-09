const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017/Sculptify'

let CommentSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	post: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
	created_at: { type: Date, default: Date.now },
	parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
	text: { type: String, required: true },
})
let Comment = new mongoose.model('Comment', CommentSchema)
module.exports = Comment
