import { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import api from '../../services/api';
import { FaPaperPlane, FaTimes } from 'react-icons/fa';

export default function PostForm({ type, onCreate }) {
  const { user } = useContext(AuthContext);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      const { data } = await api.post('/posts', {
        type,
        content,
        author: user._id
      });
      onCreate(data);
      setContent('');
      setError('');
    } catch (err) {
      setError('Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-6 bg-white rounded-lg shadow p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start space-x-3">
          <img 
            src={user.profilePicture || '/default-avatar.png'} 
            alt={user.username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <textarea
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              rows={3}
              placeholder={`What's on your mind? Share some ${type}...`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        </div>
        <div className="flex justify-end mt-3 space-x-2">
          <button
            type="button"
            className="px-3 py-1.5 text-gray-500 hover:text-gray-700"
            onClick={() => setContent('')}
          >
            <FaTimes />
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !content.trim()}
            className={`px-4 py-1.5 rounded-full flex items-center ${
              isSubmitting || !content.trim()
                ? 'bg-indigo-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            } text-white`}
          >
            {isSubmitting ? (
              'Posting...'
            ) : (
              <>
                <FaPaperPlane className="mr-1" />
                Post
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}