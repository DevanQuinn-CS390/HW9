import React, { useState, useRef, useEffect } from 'react';
import './Blog.css';
import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	Fab,
	Popover,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import EditBlog from './EditBlog';

const Blog = ({ data, openDialog, fetchData }) => {
	const { title, text, _id } = data;
	const date = new Date(data.date);
	const [hover, setHover] = useState(false);
	const containerElement = useRef();
	const fabRef = useRef();
	const [dialogOpen, setDialogOpen] = useState(false);
	const [popoverOpen, setPopoverOpen] = useState(false);

	const handleEditClick = () => {
		setPopoverOpen(false);
		setDialogOpen(true);
		setHover(false);
	};

	const handleDialogClose = () => setDialogOpen(false);

	return (
		<div>
			<div
				className='container'
				ref={containerElement}
				onMouseOver={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
			>
				<div className='options' hidden={!hover}>
					<Fab size='small' onClick={() => setPopoverOpen(true)} ref={fabRef}>
						<MoreVertIcon />
					</Fab>
				</div>
				<Popover
					id={'simple-popover'}
					open={popoverOpen}
					anchorEl={fabRef.current}
					onClose={() => setPopoverOpen(false)}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
				>
					<div className='column'>
						<Button onClick={handleEditClick}>
							<EditIcon />
							Edit
						</Button>
						<Button
							onClick={() => {
								setPopoverOpen(false);
								openDialog(_id);
							}}
						>
							<DeleteIcon />
							Delete
						</Button>
					</div>
				</Popover>
				<div className='inner-row'>
					<h1>{title}</h1>
					<h4>{date.toLocaleDateString()}</h4>
				</div>
				<p>{text}</p>
			</div>
			<Dialog
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
				fullWidth={true}
			>
				<DialogTitle>Edit Blog Post</DialogTitle>
				<DialogContent>
					<EditBlog
						data={data}
						fetchData={fetchData}
						handleDialogClose={handleDialogClose}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default Blog;
