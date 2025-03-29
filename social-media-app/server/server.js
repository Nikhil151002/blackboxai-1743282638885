const jsonServer = require('json-server/lib/server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 5000;

// Add custom routes before JSON Server router
server.get('/api/profile/:username', (req, res) => {
  const user = router.db.get('users').find({ username: req.params.username }).value();
  if (user) {
    const posts = router.db.get('posts').filter({ authorId: user.id }).value();
    res.json({ user, posts });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Add authentication middleware
server.use((req, res, next) => {
  if (req.method === 'POST' && req.path === '/api/auth/login') {
    const { email, password } = req.body;
    const user = router.db.get('users').find({ email, password }).value();
    
    if (user) {
      res.json({
        token: 'mock-jwt-token',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          profilePicture: user.profilePicture
        }
      });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } else {
    next();
  }
});

server.use(middlewares);
server.use('/api', router);
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});