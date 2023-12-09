const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017/Sculptify'

let ArticleSchema = new mongoose.Schema({
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User',
		require:true
	},
	title:{
		type:String,
		require:true,
	},
	tags: [{ type: mongoose.Schema.Types.ObjectId,ref:'Tag' }],
  created_at: { type: Date, default: Date.now },
  content: { type: String },
  preview: { type: String },
});
let Article = new mongoose.model('Article', ArticleSchema)
module.exports = Article