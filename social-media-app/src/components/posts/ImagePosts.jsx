import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import api from '../../services/api';
import PostForm from './PostForm';
import PostCard from './PostCard';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

export default function ImagePosts() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await api.get('/posts?type=image');
        setPosts(data);
      } catch (err) {
        console.error('Failed to fetch image posts:', err);
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

  const openLightbox = (index) => {
    setPhotoIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div>
      {user && <PostForm type="image" onCreate={handleCreatePost} />}

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post, index) => (
            <div key={post._id} className="relative group">
              <img
                src={post.content}
                alt={`Post by ${post.author.username}`}
                className="w-full h-64 object-cover rounded-lg cursor-pointer"
                onClick={() => openLightbox(index)}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-300 rounded-lg flex items-end p-3 opacity-0 group-hover:opacity-100">
                <div className="text-white">
                  <p className="font-semibold">{post.author.username}</p>
                  <p className="text-sm">{post.likes.length} likes</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No image posts available
        </div>
      )}

      {lightboxOpen && (
        <Lightbox
          mainSrc={posts[photoIndex]?.content}
          nextSrc={posts[(photoIndex + 1) % posts.length]?.content}
          prevSrc={posts[(photoIndex + posts.length - 1) % posts.length]?.content}
          onCloseRequest={() => setLightboxOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + posts.length - 1) % posts.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % posts.length)
          }
          imageTitle={`Post by ${posts[photoIndex]?.author?.username}`}
          imageCaption={posts[photoIndex]?.caption}
        />
      )}
    </div>
  );
}