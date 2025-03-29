import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import CreatePost from './pages/CreatePost';
import Navbar from './components/navigation/Navbar';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="pb-16 md:pb-0 md:pt-16">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/create" element={<CreatePost />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;