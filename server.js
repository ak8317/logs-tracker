require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors');
//connecting to database
connectDB();

//middleware
app.use(cors());
app.use(express.json({ extended: false }));

//defining routes
app.use('/api/logs', require('./routes/logs'));
app.use('/api/techs', require('./routes/techs'));

//defining port
const port = process.env.PORT || 5000;

//running server
app.listen(port, () => {
  console.log(`Server running on port:${port}`);
});
