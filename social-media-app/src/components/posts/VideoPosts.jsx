import { useState, useEffect, useContext, useRef } from 'react';
import AuthContext from '../../context/AuthContext';
import api from '../../services/api';
import PostForm from './PostForm';
import ReactPlayer from 'react-player';
import { FaPlay, FaPause } from 'react-icons/fa';

export default function VideoPosts() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playingId, setPlayingId] = useState(null);
  const playerRefs = useRef({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await api.get('/posts?type=video');
        setPosts(data);
      } catch (err) {
        console.error('Failed to fetch video posts:', err);
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

  const togglePlay = (postId) => {
    if (playingId === postId) {
      playerRefs.current[postId]?.pause();
      setPlayingId(null);
    } else {
      if (playingId) {
        playerRefs.current[playingId]?.pause();
      }
      setPlayingId(postId);
      playerRefs.current[postId]?.play();
    }
  };

  return (
    <div>
      {user && <PostForm type="video" onCreate={handleCreatePost} />}

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : posts.length > 0 ? (
        <div className="space-y-6">
          {posts.map(post => (
            <div key={post._id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="relative pt-[56.25%] bg-black">
                <ReactPlayer
                  ref={el => playerRefs.current[post._id] = el}
                  url={post.content}
                  width="100%"
                  height="100%"
                  style={{ position: 'absolute', top: 0, left: 0 }}
                  controls={false}
                  playsinline
                  onPlay={() => setPlayingId(post._id)}
                  onPause={() => setPlayingId(null)}
                />
                {playingId !== post._id && (
                  <button
                    onClick={() => togglePlay(post._id)}
                    className="absolute inset-0 flex items-center justify-center text-white text-4xl"
                  >
                    <div className="bg-black bg-opacity-50 rounded-full p-4">
                      {playingId === post._id ? <FaPause /> : <FaPlay />}
                    </div>
                  </button>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={post.author.profilePicture || '/default-avatar.png'} 
                      alt={post.author.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{post.author.username}</h3>
                      <p className="text-gray-500 text-sm">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {user?._id === post.author._id && (
                    <button 
                      onClick={() => handleDeletePost(post._id)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
                <p className="mb-3">{post.caption}</p>
                <div className="flex space-x-4 text-gray-500">
                  <button className="flex items-center space-x-1">
                    <FaHeart className="text-red-500" />
                    <span>{post.likes.length}</span>
                  </button>
                  <button className="flex items-center space-x-1">
                    <FaComment />
                    <span>{post.comments.length}</span>
                  </button>
                  <button className="flex items-center space-x-1">
                    <FaShare />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No video posts available
        </div>
      )}
    </div>
  );
}