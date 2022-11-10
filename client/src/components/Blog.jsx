import React from 'react';
import './Blog.css';

const Blog = ({ data }) => {
	const { title, text } = data;
	const date = new Date(data.date);

	return (
		<div className='container'>
			<div className='inner-row'>
				<h1>{title}</h1>
				<h4>{date.toLocaleDateString()}</h4>
			</div>
			<p>{text}</p>
		</div>
	);
};

export default Blog;
