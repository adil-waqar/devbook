const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
const path = require('path');
require('dotenv').config();

const app = express();

// Init middlewares
app.use(express.json());
app.use(errorHandler);

// Connect database
connectDB();

const PORT = process.env.PORT || 5000;

app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log('Server listening on port', PORT);
});
