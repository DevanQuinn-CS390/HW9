const PORT = 3000;
const app = require('express')();
const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/.env' });
const Blog = require('./schema');
const cors = require('cors');
const bodyParser = require('body-parser');

const { DATABASE } = process.env;

const connect = async () => {
	await mongoose.connect(DATABASE).then(() => console.log('success'));
};

app.use(cors());

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/blog', async (req, res) => {
	const data = await Blog.find({}).sort({ date: 'desc' });
	res.status(200).send(data);
});

app.post('/blog/create-post', (req, res) => {
	const { body } = req;
	if (!body.title.length || !body.text.length) return res.status(500).send();
	body.date = Date.now();
	const data = new Blog(body);
	data.save();
	res.status(201).send();
});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
	connect();
});
