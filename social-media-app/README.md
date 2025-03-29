# Social Media App

A modern social media application built with React, Vite, and Tailwind CSS.

## Features

- User authentication (login/register)
- Create and view posts (text, images, videos)
- User profiles
- Explore other users
- Responsive design
- Dark mode support
- Animated transitions

## Technologies

- React 18
- Vite 4
- Tailwind CSS 3
- React Router 6
- Axios
- JSON Server (mock API)
- Framer Motion (animations)
- React Icons
- JWT authentication

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. The app will be running at `http://localhost:3000`

## Scripts

- `dev`: Runs both client and server concurrently
- `client`: Starts the Vite development server (port 3000)
- `server`: Starts the mock API server (port 5000)
- `build`: Builds the app for production
- `preview`: Previews the production build

## Mock API Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post
- `GET /api/users` - Get all users
- `GET /api/profile/:username` - Get user profile
- `POST /api/relationships` - Follow a user
- `DELETE /api/relationships/:id` - Unfollow a user

## Project Structure

```
social-media-app/
├── src/
│   ├── components/       # Reusable UI components
│   ├── context/          # React contexts
│   ├── hooks/            # Custom hooks
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── server/               # Mock API server
│   ├── db.json           # Database file
│   └── server.js         # Server configuration
└── public/               # Static assets
```

## Screenshots

![Home Page](screenshots/home.png)
![Profile Page](screenshots/profile.png)
![Create Post](screenshots/create.png)

## License

MIT