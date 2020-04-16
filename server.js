const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Init middlewares
app.use(express.json());

// Connect database
connectDB();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('API running'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));

app.listen(PORT, () => {
  console.log('Server listening on port:', PORT);
});
