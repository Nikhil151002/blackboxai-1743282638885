import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Tabs, Tab } from '../components/common/Tabs';
import TextPosts from '../components/posts/TextPosts';
import ImagePosts from '../components/posts/ImagePosts';
import VideoPosts from '../components/posts/VideoPosts';

export default function Home() {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('text');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome{user ? `, ${user.username}` : ''}</h1>
      
      <Tabs>
        <Tab 
          label="Text Posts" 
          active={activeTab === 'text'} 
          onClick={() => setActiveTab('text')} 
        />
        <Tab 
          label="Image Posts" 
          active={activeTab === 'images'} 
          onClick={() => setActiveTab('images')} 
        />
        <Tab 
          label="Video Posts" 
          active={activeTab === 'videos'} 
          onClick={() => setActiveTab('videos')} 
        />
      </Tabs>

      <div className="mt-6">
        {activeTab === 'text' && <TextPosts />}
        {activeTab === 'images' && <ImagePosts />}
        {activeTab === 'videos' && <VideoPosts />}
      </div>
    </div>
  );
}