import React, { useState } from 'react';
import './App.css';
import { AppBar, Toolbar, Box, Tab, Tabs } from '@mui/material';
import MyBlogs from './pages/MyBlogs';
import CreatePost from './pages/CreatePost';
import { useEffect } from 'react';

const App = () => {
	const [value, setValue] = useState(1);

	const handleChange = (event, val) => setValue(val);

	return (
		<div className='App'>
			<React.Fragment>
				<AppBar
					position='fixed'
					color='secondary'
					sx={{ backgroundColor: 'white' }}
				>
					<Toolbar>
						<Tabs
							value={value}
							onChange={handleChange}
							textColor='primary'
							centered
						>
							<Tab label='My Blogs' value={1} />
							<Tab label='Create Blog Post' value={2} />
						</Tabs>
					</Toolbar>
				</AppBar>
				<Toolbar />
				{value == 1 ? <MyBlogs /> : <CreatePost />}
			</React.Fragment>
		</div>
	);
};

export default App;
