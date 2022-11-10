import React, { useState, useEffect } from 'react';
import { CircularProgress, TextField } from '@mui/material';
import Blog from '../components/Blog';

const MyBlogs = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		(async () => {
			const result = await fetch('http://localhost:3000/blog');
			const json = await result.json();
			setData(json);
			setLoading(false);
		})();
	}, []);

	const blogs =
		data.length === 0
			? 'No blogs yet'
			: data.map(val => {
					return <Blog data={val} key={val._id} />;
			  });

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'flex-start',
			}}
		>
			{loading ? <CircularProgress /> : blogs}
		</div>
	);
};

export default MyBlogs;
