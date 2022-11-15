import React, { useState, useEffect } from 'react';
import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material';
import Blog from '../components/Blog';

const MyBlogs = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [password, setPassword] = useState('');
	const [id, setId] = useState('');
	const [dialogOpen, setDialogOpen] = useState(false);

	const fetchData = async () => {
		const result = await fetch('http://localhost:3000/blog');
		const json = await result.json();
		setData(json);
		setLoading(false);
	};

	const openDialog = _id => {
		if (_id) setId(_id);
		setDialogOpen(true);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleDelete = async () => {
		const data = await fetch('http://localhost:3000/blog/delete', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ _id: id, password }),
		});
		setPassword('');
		if (data.status === 204) fetchData();
		else if (data.status === 401) {
			const text = await data.text();
			return alert(text);
		}
		setDialogOpen(false);
	};

	const handlePasswordChange = event => setPassword(event.target.value);

	const blogs =
		data.length === 0
			? 'No blogs yet'
			: data.map(val => {
					return (
						<Blog
							data={val}
							key={val._id}
							fetchData={fetchData}
							openDialog={openDialog}
						/>
					);
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
			<Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
				<DialogTitle>Delete Post</DialogTitle>
				<DialogContent>
					<TextField
						label='Password'
						value={password}
						onChange={handlePasswordChange}
						margin='dense'
						type='password'
						inputProps={{
							form: { autocomplete: 'off' },
						}}
						autoComplete='off'
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDelete}>Submit</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default MyBlogs;
