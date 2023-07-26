import React from 'react';
import Topbar from '../components/common/Topbar';
import './girl.scss';
import Footer from '../components/Footer/Footer';

const StoryboyLayout = () => {
  return (
    <div>
      <Topbar />

      <div className="slide-container">
        <div className="slide">
          <h2>Thoughts-1</h2>
          <p>
          Hello, world! I am Ava, a Native American girl living in New York. When I came across this platform, I felt thrilled because it seemed like a place where I could freely share my thoughts with the entire world. Unlike other social media platforms, here, you don't need to make friends or follow others. You can simply post your thoughts, and everyone who is online on the platform will be able to see your posts, give advice, and leave comments. It's amazing how this platform allows you to connect with people without the pressure of viral videos or popularity contests. I really love this concept!
          </p>
        </div>
        <div className="slide">
          <h2>Thoughts-2</h2>
          <p>
          Hello, I am a mother from India. I was really distressed about the problems going on in my home with my husband. When I posted about it on this platform, hundreds of people offered their advice. I carefully considered the suggestions and used the ones that resonated with me the most. Thanks to this platform, I am now a much happier woman..
          </p>
        </div>
        <div className="slide">
          <h2>Thoughts-3</h2>
          <p>
          Hello, I am a single mother from Amsterdam. When I was young, I had feelings for an Italian boy, but I could never express them to him, and we lost touch. However, through this platform, I was able to share my story with the place name mentioned. Later, I received a comment on that post, and after so many years, I finally shared my feelings with him. This platform is truly awesome!.
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default StoryboyLayout;
