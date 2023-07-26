import React from 'react';
import Topbar from '../components/common/Topbar';
import './boy.scss';
import Footer from '../components/Footer/Footer';

const StoryboyLayout = () => {
  return (
    <div>
      <Topbar/>
      <div className="story-container">
        <h1 className="story-title">My Journey to Success</h1>
        <p className="story-text">
        Hello, world! I am a 25-year-old Indian boy who was struggling to find a job. I was wasting my time on social media, feeling lost and depressed. Then I heard about this platform where people from all over the world come together to offer advice and support. I decided to share my story here, and many people saw my post and gave me valuable advice. Their suggestions were so helpful that I managed to turn my life around. Now, I am working in Singapore, thanks to one piece of advice that changed my life in just one year. I am truly grateful for this platform!.
        </p>
        <p className="story-text">
        
        </p>
        <p className="story-text">
       
        </p>
      </div>
      <Footer/>
    </div>
  );
}

export default StoryboyLayout;
