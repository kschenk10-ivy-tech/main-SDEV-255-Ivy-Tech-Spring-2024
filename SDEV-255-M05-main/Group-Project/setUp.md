# Backend using Node.js with Express 

> Last updated on April 16th, 2024 by khristinschenk@gmail.com




### File Directory

```
project/
  |- app.js
  |- models/
  |    |- teacher.js
  |    |- course.js
  |- routes/
       |- courses.js
```


## Backend code set-up

`app.js`

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const coursesRouter = require('./routes/courses');

app.use(bodyParser.json());
app.use('/courses', coursesRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

`models/teacher.js`

```javascript
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://username:password@localhost/school');

const Teacher = sequelize.define('Teacher', {
  TeacherID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Teacher;
```

`models/course.js`

```javascript
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://username:password@localhost/school');
const Teacher = require('./teacher');

const Course = sequelize.define('Course', {
  CourseID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Description: {
    type: DataTypes.TEXT
  }
});

Course.belongsTo(Teacher);

module.exports = Course;
```

`routes/courses.js`

```javascript
const express = require('express');
const router = express.Router();
const Course = require('../models/course');

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a course
router.post('/', async (req, res) => {
  const { Title, Description, TeacherID } = req.body;
  try {
    const course = await Course.create({ Title, Description, TeacherID });
    res.status(201).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update a course
router.put('/:id', async (req, res) => {
  const { Title, Description } = req.body;
  const id = req.params.id;
  try {
    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    course.Title = Title;
    course.Description = Description;
    await course.save();
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a course
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    await course.destroy();
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
```