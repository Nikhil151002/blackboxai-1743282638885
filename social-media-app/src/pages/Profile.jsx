import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../services/api';
import PostCard from '../components/posts/PostCard';
import { FaUserPlus, FaUserCheck, FaEdit } from 'react-icons/fa';

export default function Profile() {
  const { username } = useParams();
  const { user: currentUser } = useContext(AuthContext);
  const [profileUser, setProfileUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get(`/profile/${username}`);
        setProfileUser(data.user);
        setPosts(data.posts);
        
        if (currentUser) {
          const relationships = await api.get(`/relationships?followerId=${currentUser.id}&followedId=${data.user.id}`);
          setIsFollowing(relationships.data.length > 0);
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [username, currentUser]);

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await api.delete(`/relationships/${profileUser.id}`);
      } else {
        await api.post('/relationships', { followedId: profileUser.id });
      }
      setIsFollowing(!isFollowing);
    } catch (err) {
      console.error('Failed to toggle follow:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!profileUser) {
    return <div className="text-center py-8">User not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8 mb-8">
        <div className="flex-shrink-0">
          <img
            src={profileUser.profilePicture || '/default-avatar.png'}
            alt={profileUser.username}
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-4 mb-4">
            <h1 className="text-2xl font-bold">{profileUser.username}</h1>
            
            {currentUser && currentUser.id !== profileUser.id && (
              <button
                onClick={handleFollow}
                className={`px-4 py-1 rounded-md flex items-center space-x-1 ${
                  isFollowing 
                    ? 'bg-gray-200 text-gray-800' 
                    : 'bg-indigo-600 text-white'
                }`}
              >
                {isFollowing ? (
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
            
            {currentUser?.id === profileUser.id && (
              <button className="px-4 py-1 rounded-md bg-gray-200 text-gray-800 flex items-center space-x-1">
                <FaEdit />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
          
          <div className="flex space-x-8 mb-4">
            <div>
              <span className="font-semibold">{posts.length}</span> posts
            </div>
            <div>
              <span className="font-semibold">{profileUser.followersCount || 0}</span> followers
            </div>
            <div>
              <span className="font-semibold">{profileUser.followingCount || 0}</span> following
            </div>
          </div>
          
          <div>
            <h2 className="font-semibold">{profileUser.fullName}</h2>
            <p className="text-gray-700">{profileUser.bio}</p>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h2 className="text-xl font-semibold mb-6">Posts</h2>
        
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map(post => (
              <PostCard 
                key={post.id} 
                post={post} 
                currentUser={currentUser}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No posts yet
          </div>
        )}
      </div>
    </div>
  );
}