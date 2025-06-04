const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock user database
const users = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'adminpassword',
    createdAt: '2025-05-23T21:24:22.176Z',
    updatedAt: '2025-05-23T21:24:22.176Z',
    roles: ['staff', 'supervisor', 'admin'],
  },
];

// JWT token generation (simplified for demo)
const generateToken = (user) => {
  // In a real app, use a library like jsonwebtoken
  return 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsIm5hbWUiOiJBZG1pbiBVc2VyIiwicm9sZXMiOlsic3RhZmYiLCJzdXBlcnZpc29yIiwiYWRtaW4iXSwiZXhwIjoxNzQ5MDg1MjYxfQ.CgY9sWxX33x96h7y8DUEDT7--FFGHldi1YKlT7qQo0M';
};

// Auth routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  console.log(`Login attempt: ${email}`);

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    console.log('Login failed: Invalid credentials');
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const token = generateToken(user);
  const userResponse = { ...user };
  delete userResponse.password;

  console.log(`Login successful for: ${email}`);
  res.json({
    user: userResponse,
    token,
  });
});

app.post('/api/auth/refresh-token', (req, res) => {
  // In a real app, verify the token from Authorization header
  const authHeader = req.headers.authorization;
  console.log(`Refresh token request received. Auth header: ${authHeader ? 'present' : 'missing'}`);

  if (authHeader) {
    console.log(`Auth header value: ${authHeader.substring(0, 20)}...`);
  }

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('Refresh token failed: Invalid authorization header');
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  // For demo, always return a success
  const user = { ...users[0] };
  delete user.password;

  console.log('Refresh token successful');
  res.json({
    success: true,
    message: 'Token refreshed successfully',
    token:
      'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsIm5hbWUiOiJBZG1pbiBVc2VyIiwicm9sZXMiOlsic3RhZmYiLCJzdXBlcnZpc29yIiwiYWRtaW4iXSwiZXhwIjoxNzQ5MDg1NzI3fQ.VVj-Tgnvw1E9C92ik3uyXiKEXt73w7_2UMhf5qXieSg',
    user,
  });
});

app.post('/api/auth/logout', (req, res) => {
  // In a real app, invalidate the token
  res.json({
    success: true,
    message: 'Successfully logged out',
  });
});

app.get('/api/auth/me', (req, res) => {
  // In a real app, verify the token from Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  // For demo, always return the admin user
  const user = { ...users[0] };
  delete user.password;

  res.json({
    message: 'User profile retrieved',
    user,
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Auth API mock server running at http://localhost:${PORT}`);
  console.log(`For mobile devices, use http://YOUR_IP_ADDRESS:${PORT}`);
});
