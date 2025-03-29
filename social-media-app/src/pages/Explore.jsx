import { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import api from '../services/api';
import { FaSearch, FaUserPlus, FaUserCheck } from 'react-icons/fa';

export default function Explore() {
  const { user } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get('/users');
        setUsers(data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleFollow = async (userId) => {
    try {
      await api.post('/relationships', { followedId: userId });
      setUsers(users.map(u => 
        u.id === userId ? {...u, isFollowing: true} : u
      ));
    } catch (err) {
      console.error('Failed to follow user:', err);
    }
  };

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Explore</h1>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search users..."
            className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : filteredUsers.length > 0 ? (
        <div className="space-y-4">
          {filteredUsers.map(user => (
            <div key={user.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
              <div className="flex items-center space-x-4">
                <img
                  src={user.profilePicture || '/default-avatar.png'}
                  alt={user.username}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{user.username}</h3>
                  <p className="text-gray-500 text-sm">{user.bio}</p>
                </div>
              </div>
              {user.id !== user?.id && (
                <button
                  onClick={() => handleFollow(user.id)}
                  disabled={user.isFollowing}
                  className={`px-4 py-2 rounded-md flex items-center space-x-1 ${
                    user.isFollowing
                      ? 'bg-gray-200 text-gray-800'
                      : 'bg-indigo-600 text-white'
                  }`}
                >
                  {user.isFollowing ? (
                    <>
                      <FaUserCheck />
                      <span>Following</span>
                    </>
                  ) : (
                    <>
                      <FaUserPlus />
                      <span>Follow</span>
                    </>
                  )}
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No users found
        </div>
      )}
    </div>
  );
}