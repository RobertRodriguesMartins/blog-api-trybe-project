const express = require('express');
require('express-async-errors');
const cors = require('cors');
const { errorMiddleware } = require('./middlewares');
const { loginRouter, userRouter, categoryRouter } = require('./routes');
// ...

const app = express();

app.use(express.json());
app.use(cors());
app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/categories', categoryRouter);
// working in progres...

app.use(errorMiddleware);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
