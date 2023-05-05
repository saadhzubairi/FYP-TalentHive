// app.js
const express = require('express');
const connectDB = require('./config/db');

const cors = require('cors');

const app = express();

const companys = require('./routes/api/companys');
const hr_admins = require('./routes/api/hr_admins');

// Connect Database
connectDB();
app.use(cors({ origin: true, credentials: true }));

app.use(express.json({ extended: false })); 

app.get('/', (req, res) => res.send('Hello world!'));

app.use('/api/companys', companys);
app.use('/api/hr_admins', hr_admins);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));