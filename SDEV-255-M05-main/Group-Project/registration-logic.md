### Frontend (HTML + JavaScript)

Let's start by creating the login form:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Login</title>
<script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
<div class="min-h-screen flex items-center justify-center bg-gray-100">
  <div class="p-8 bg-white shadow-lg rounded-lg">
    <h2 class="text-2xl font-semibold mb-5">Login</h2>
    <form id="loginForm" class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="email" name="email" required
               class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
      </div>
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" id="password" name="password" required
               class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
      </div>
      <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Log in</button>
    </form>
  </div>
</div>

<script>
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }).then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Login successful!');
          // Redirect based on role
          if (data.user.role === 'teacher') {
            window.location.href = '/teacher-dashboard.html';
          } else {
            window.location.href = '/student-dashboard.html';
          }
        } else {
          alert('Login failed: ' + data.message);
        }
      })
      .catch(error => console.error('Error:', error));
  });
</script>
</body>
</html>
```

### Backend (Node.js + Express + MongoDB)

Here's a basic outline for the server-side logic to handle login:

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// MongoDB User Model
const User = mongoose.model('User', new mongoose.Schema({
  email: String,
  password: String,
  role: String  // 'teacher' or 'student'
}));

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mydatabase');

// Login Endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && bcrypt.compareSync(password, user.password)) {
    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, 'your-secret-key', { expiresIn: '24h' });
    res.json({ success: true, token, user: { role: user.role } });
  } else {
    res.json({ success: false, message: 'Invalid credentials' });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
```

### Security and Access Control

1. **Secure Passwords**: Use `bcrypt` to hash and store passwords securely.
2. **JWT for Authentication**: Use JSON Web Tokens to manage session authentication and store them securely in `httpOnly` cookies or localStorage with care.
3. **Role-Based Authorization**: Implement middleware in Express that checks the user's role from the JWT to allow or deny access to specific routes.

This solution sets the foundation for a basic login

 system. You will need to expand this with registration logic, error handling, and further security considerations such as HTTPS and CORS.





---

# Ideas for iterations

Expanding the basic login system to include registration logic, enhanced error handling, and additional security measures like HTTPS and CORS involves several steps. 

### 1. Registration Logic

Registration allows new users to create accounts. Here’s how we can add this to the existing Node.js and Express backend:

#### Adding the Registration Endpoint

```javascript
// Registration Endpoint
app.post('/api/register', async (req, res) => {
  const { email, password, role } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'Email already in use' });
  }

  // Hash password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  // Create new user
  const user = new User({ email, password: hashedPassword, role });
  await user.save();

  res.status(201).json({ success: true, message: 'User registered successfully' });
});
```

### 2. Error Handling

Proper error handling is crucial for debugging and providing a good user experience. Here’s how to improve error handling:

#### Global Error Handler

Implement a global error handler in Express to catch any unhandled errors:

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ success: false, message: 'An unexpected error occurred!' });
});
```

#### Validation and Detailed Errors

Validate request inputs and provide detailed error messages:

```javascript
if (!email || !password || !role) {
  return res.status(400).json({ success: false, message: 'Missing required fields' });
}
```

### 3. Security Considerations

#### HTTPS

Use HTTPS to secure connections. If deploying your application, services like Heroku provide HTTPS by default. For local development or self-hosted deployments, set up HTTPS as follows:

- Use `openssl` to generate SSL certificates.
- Configure Express to use these certificates with the `https` module.

```javascript
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

https.createServer(options, app).listen(3000, () => {
  console.log('HTTPS Server running on https://localhost:3000');
});
```

#### CORS (Cross-Origin Resource Sharing)

Manage CORS to allow or restrict requests from other domains. Use the `cors` package to handle it in Express:

```javascript
const cors = require('cors');

// Configure CORS
app.use(cors({
  origin: 'https://example.com', // Allow only specific domains or use '*' to allow all
  methods: ['GET', 'POST'],
  credentials: true  // Allow cookies
}));
```