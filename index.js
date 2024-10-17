const express = require('express');
const cors = require('cors');
const authRouter = require('./Router/auth-router');
const contactRoute = require('./Router/contact-router');
const serviceRouter = require('./Router/service-router');
const adminRouter = require('./Router/admin-router');
const connectDB = require('./Utils/db');
const errorMiddleware = require('./Middleware/error-middleware');

const corsOptions = {
  origin: 'http://localhost:5173',
  method: 'GET, POST, PUT, DELETE',
  optionsSuccessStatus: 200,
  Credentials: true,
};

const app = express();
app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/form', contactRoute);
app.use('/api/data', serviceRouter);
app.use('/api/admin', adminRouter);

app.use(errorMiddleware);

// app.get('/', (req, res) => {
//   res.status(200).send('Hello World');
// });

const port = 4000;

connectDB().then(() => {
  console.log('Database connected');
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
