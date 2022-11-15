import React, { useState } from 'react';
import { TextField, Box, Button, CircularProgress } from '@mui/material';

const EditBlog = ({ data, fetchData, handleDialogClose }) => {
	const { _id } = data;
	const [title, setTitle] = useState(data.title);
	const [text, setText] = useState(data.text);
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const handleTitleChange = event => setTitle(event.target.value);
	const handleContentChange = event => setText(event.target.value);
	const handlePasswordChange = event => setPassword(event.target.value);

	const onSubmit = async e => {
		e.preventDefault();
		setLoading(true);
		const body = JSON.stringify({
			_id,
			title,
			text,
			password,
		});
		const data = await fetch('http://localhost:3000/blog/edit', {
			method: 'PUT',
			body,
			headers: { 'Content-Type': 'application/json' },
		})
			.then(async res => {
				if (res.status !== 201) {
					const text = await res.text();
					return alert(text);
				}
				alert('Success');
				fetchData();
				handleDialogClose();
			})
			.catch(() => alert('An error has occurred'));
		setLoading(false);
	};

	return (
		<div>
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
					type='text'
				/>
				<TextField
					label='Content'
					multiline
					value={text}
					onChange={handleContentChange}
					rows={10}
					margin='dense'
					type='text'
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

export default EditBlog;
