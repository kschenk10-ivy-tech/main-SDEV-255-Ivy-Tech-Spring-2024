const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const coursesRouter = require('./routes/courses');

app.use(bodyParser.json());
app.use('/courses', coursesRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
