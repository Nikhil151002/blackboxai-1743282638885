import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { FaImage, FaVideo, FaFileAlt, FaTimes, FaPaperPlane } from 'react-icons/fa';

export default function CreatePost() {
  const [postType, setPostType] = useState('text');
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !media) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('type', postType);
      formData.append('content', content);
      if (media) {
        formData.append('media', media);
      }

      await api.post('/posts', formData);
      navigate('/');
    } catch (err) {
      console.error('Failed to create post:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMediaChange = (e) => {
    setMedia(e.target.files[0]);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Create Post</h1>
          <button 
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setPostType('text')}
            className={`flex-1 py-2 rounded-md flex items-center justify-center space-x-2 ${
              postType === 'text' 
                ? 'bg-indigo-100 text-indigo-600' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <FaFileAlt />
            <span>Text</span>
          </button>
          <button
            onClick={() => setPostType('image')}
            className={`flex-1 py-2 rounded-md flex items-center justify-center space-x-2 ${
              postType === 'image' 
                ? 'bg-indigo-100 text-indigo-600' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <FaImage />
            <span>Image</span>
          </button>
          <button
            onClick={() => setPostType('video')}
            className={`flex-1 py-2 rounded-md flex items-center justify-center space-x-2 ${
              postType === 'video' 
                ? 'bg-indigo-100 text-indigo-600' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <FaVideo />
            <span>Video</span>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {postType === 'text' ? (
            <textarea
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-4"
              rows={5}
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          ) : (
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                {postType === 'image' ? 'Upload Image' : 'Upload Video'}
              </label>
              <input
                type="file"
                accept={postType === 'image' ? 'image/*' : 'video/*'}
                onChange={handleMediaChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-indigo-50 file:text-indigo-700
                  hover:file:bg-indigo-100"
              />
              {media && (
                <div className="mt-2 text-sm text-gray-500">
                  Selected: {media.name}
                </div>
              )}
              <textarea
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent mt-4"
                rows={3}
                placeholder="Add a caption..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || (!content.trim() && !media)}
            className={`w-full py-2 px-4 rounded-md flex items-center justify-center space-x-2 ${
              isSubmitting || (!content.trim() && !media)
                ? 'bg-indigo-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            <FaPaperPlane />
            <span>{isSubmitting ? 'Posting...' : 'Post'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}