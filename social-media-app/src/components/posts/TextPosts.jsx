import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import api from '../../services/api';
import PostForm from './PostForm';
import PostCard from './PostCard';

export default function TextPosts() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await api.get('/posts?type=text');
        setPosts(data);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleCreatePost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post._id !== postId));
  };

  return (
    <div>
      {user && <PostForm type="text" onCreate={handleCreatePost} />}
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map(post => (
            <PostCard 
              key={post._id} 
              post={post} 
              onDelete={handleDeletePost}
              currentUser={user}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No text posts available
        </div>
      )}
    </div>
  );
}