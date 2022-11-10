const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
	{
		title: String,
		text: String,
		date: Date,
	},
	{ collection: 'blog-posts' }
);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
