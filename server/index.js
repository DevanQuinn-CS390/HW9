const PORT = 3000;
const app = require('express')();
const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/.env' });
const Blog = require('./schema');
const cors = require('cors');
const bodyParser = require('body-parser');

const { DATABASE, PASSWORD } = process.env;

const connect = async () => {
	await mongoose.connect(DATABASE).then(() => console.log('success'));
};

app.use(cors());

app.use(bodyParser.json());

const postAuth = (req, res, next) => {
	const { body } = req;
	if (body.password !== PASSWORD) {
		return res.status(401).send('Password is incorrect');
	}
	if (!body.title.length || !body.text.length)
		return res.status(400).send('Title and body fields are required');
	next();
};

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/blog', async (req, res) => {
	const data = await Blog.find({}).sort({ date: 'desc' });
	res.status(200).send(data);
});

app.post('/blog/create-post', postAuth, (req, res) => {
	const { body } = req;
	body.date = Date.now();
	const data = new Blog(body);
	data.save();
	res.status(201).send();
});

app.put('/blog/edit', postAuth, (req, res) => {
	const { _id, title, text } = req.body;
	Blog.updateOne({ _id }, { $set: { title, text } })
		.then(() => res.sendStatus(201))
		.catch(() => res.sendStatus(500));
});

app.delete('/blog/delete', (req, res) => {
	const { _id, password } = req.body;
	if (password !== PASSWORD) {
		return res.status(401).send('Password is incorrect');
	}
	Blog.deleteOne({ _id })
		.then(() => res.sendStatus(204))
		.catch(() => res.sendStatus(500));
});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
	connect();
});
