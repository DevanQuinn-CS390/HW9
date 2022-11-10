import React, { useState } from 'react';
import { TextField, Box, Button, CircularProgress } from '@mui/material';

const CreatePost = () => {
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');
	const [loading, setLoading] = useState(false);

	const handleTitleChange = event => setTitle(event.target.value);
	const handleContentChange = event => setText(event.target.value);

	const onSubmit = async () => {
		setLoading(true);
		const body = JSON.stringify({
			title,
			text,
		});
		const data = await fetch('http://localhost:3000/blog/create-post', {
			method: 'POST',
			body,
			headers: { 'Content-Type': 'application/json' },
		})
			.then(res => {
				if (res.status !== 201) return alert('Both fields are required.');
				alert('Success');
				setTitle('');
				setText('');
			})
			.catch(() => alert('An error has occurred'));
		setLoading(false);
	};

	return (
		<div>
			<h3>Create a Post</h3>
			<Box
				component='form'
				sx={{
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<TextField
					label='Title'
					value={title}
					onChange={handleTitleChange}
					margin='dense'
				/>
				<TextField
					label='Content'
					multiline
					value={text}
					onChange={handleContentChange}
					rows={10}
					margin='dense'
				/>
				<Button variant='contained' size='large' onClick={onSubmit}>
					{loading ? (
						<CircularProgress color='secondary' size={30} />
					) : (
						'Submit'
					)}
				</Button>
			</Box>
		</div>
	);
};

export default CreatePost;
