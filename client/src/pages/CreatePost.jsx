import React, { useState } from 'react';
import { TextField, Box, Button, CircularProgress } from '@mui/material';

const CreatePost = () => {
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const handleTitleChange = event => setTitle(event.target.value);
	const handleContentChange = event => setText(event.target.value);
	const handlePasswordChange = event => setPassword(event.target.value);

	const onSubmit = async () => {
		setLoading(true);
		const body = JSON.stringify({
			title,
			text,
			password,
		});
		const data = await fetch('http://localhost:3000/blog/create-post', {
			method: 'POST',
			body,
			headers: { 'Content-Type': 'application/json' },
		})
			.then(async res => {
				if (res.status !== 201) {
					const text = await res.text();
					return alert(text);
				}
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
				<TextField
					label='Password'
					value={password}
					onChange={handlePasswordChange}
					margin='dense'
					type='password'
					inputProps={{
						form: { autocomplete: 'off' },
					}}
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
