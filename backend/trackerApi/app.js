const express = require('express');
const cors = require('cors');

const userRouter = require('./routers/user');
const transactionRouter = require('./routers/transaction')
const app = express();

// Middleware
app.use(express.json());
app.use(cors({origin:'https://trackit-j167.onrender.com'}));

app.get('/', (req, res) => {
  res.send('This is the Auth API');
});

// Routes

app.use('/users', userRouter);
app.use('/transaction',transactionRouter)

module.exports = app;
