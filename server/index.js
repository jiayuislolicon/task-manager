const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.static('../dist'));
app.use(express.json()); // parse request body as JSON

app.use('/api/tasks', tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 8080;

const start = async () => {
  try {
    // 連線到 MongoDB 的 test 資料庫
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
