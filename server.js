require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
//connecting to database
connectDB();

//middleware
app.use(cors());
app.use(express.json({ extended: false }));

//defining routes
app.use('/api/logs', require('./routes/logs'));
app.use('/api/techs', require('./routes/techs'));

//serve static assests
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

//defining port
const port = process.env.PORT || 5000;

//running server
app.listen(port, () => {
  console.log(`Server running on port:${port}`);
});
