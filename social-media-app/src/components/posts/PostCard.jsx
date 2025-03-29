import { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import api from '../../services/api';
import { 
  FaHeart, FaRegHeart, FaComment, FaShare, FaTrash, FaEllipsisH 
} from 'react-icons/fa';
import moment from 'moment';

export default function PostCard({ post, onDelete, currentUser }) {
  const [isLiked, setIsLiked] = useState(post.likes.includes(currentUser?._id));
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [showOptions, setShowOptions] = useState(false);
  const { token } = useContext(AuthContext);

  const handleLike = async () => {
    try {
      if (isLiked) {
        await api.delete(`/posts/${post._id}/like`);
        setLikeCount(likeCount - 1);
      } else {
        await api.post(`/posts/${post._id}/like`);
        setLikeCount(likeCount + 1);
      }
      setIsLiked(!isLiked);
    } catch (err) {
      console.error('Failed to toggle like:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/posts/${post._id}`);
      onDelete(post._id);
    } catch (err) {
      console.error('Failed to delete post:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-3">
          <img 
            src={post.author.profilePicture || '/default-avatar.png'} 
            alt={post.author.username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold">{post.author.username}</h3>
            <p className="text-gray-500 text-sm">
              {moment(post.createdAt).fromNow()}
            </p>
          </div>
        </div>
        
        {currentUser?._id === post.author._id && (
          <div className="relative">
            <button 
              onClick={() => setShowOptions(!showOptions)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaEllipsisH />
            </button>
            
            {showOptions && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                <button
                  onClick={handleDelete}
                  className="flex items-center w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100"
                >
                  <FaTrash className="mr-2" />
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mb-4">
        <p className="whitespace-pre-line">{post.content}</p>
      </div>

      <div className="flex justify-between text-gray-500 border-t pt-3">
        <button 
          onClick={handleLike}
          className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : ''}`}
        >
          {isLiked ? <FaHeart /> : <FaRegHeart />}
          <span>{likeCount}</span>
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
  );
}