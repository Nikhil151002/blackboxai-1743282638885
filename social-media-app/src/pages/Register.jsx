import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaImage } from 'react-icons/fa';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePicture: null
  });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const form = new FormData();
      form.append('username', formData.username);
      form.append('email', formData.email);
      form.append('password', formData.password);
      if (formData.profilePicture) {
        form.append('profilePicture', formData.profilePicture);
      }

      const { data } = await axios.post('/api/auth/register', form);
      await login({ email: formData.email, password: formData.password });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="username">
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="text-gray-400" />
            </div>
            <input
              id="username"
              type="text"
              className="pl-10 w-full px-3 py-2 border rounded-md"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className="text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              className="pl-10 w-full px-3 py-2 border rounded-md"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="text-gray-400" />
            </div>
            <input
              id="password"
              type="password"
              className="pl-10 w-full px-3 py-2 border rounded-md"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="text-gray-400" />
            </div>
            <input
              id="confirmPassword"
              type="password"
              className="pl-10 w-full px-3 py-2 border rounded-md"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="profilePicture">
            Profile Picture (Optional)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaImage className="text-gray-400" />
            </div>
            <input
              id="profilePicture"
              type="file"
              accept="image/*"
              className="pl-10 w-full px-3 py-2 border rounded-md"
              onChange={(e) => setFormData({...formData, profilePicture: e.target.files[0]})}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
        >
          Register
        </button>
      </form>

      <p className="mt-4 text-center text-gray-600">
        Already have an account?{' '}
        <a href="/login" className="text-indigo-600 hover:underline">
          Login
        </a>
      </p>
    </div>
  );
}