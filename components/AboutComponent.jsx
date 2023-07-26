import React from 'react';
import Topbar from './common/Topbar';
import './About.scss'; // Assuming you have a CSS file for styling
import vi from '../assets/1.mp4';
import Footer from './Footer/Footer';

const AboutComponent = () => {
  return (
    <div>
      <Topbar />

      <div className="container">
        <p className='head'>About us:Share ur thoughts freely.</p>
        <h1 className='container7'>
         1.On our platform, users can seek advice anonymously by using a hashtag like #meeto to share their past experiences without revealing their identities. Whether someone needs guidance on any matter or feels uncertain about their course of action, they can find support and advice from thousands of users worldwide. No one is required to follow anyone or make friends; it's an open space where people come together to offer help and support.
         Our platform is a  place that allows all of us to share yours thoughts freely without the need for friends, followers, or any obligations. Here, your identities are hidden, so you can share  innermost thoughts and seek advice from worldwide.
         <br></br>
           2.We operate a unique platform that empowers individuals to express their thoughts and perspectives on various
          global issues, including mental health challenges like depression. <br></br>
       
          3.They can
          freely share their thoughts with our global community. People from around the world will have the opportunity
          to view these posts and offer their valuable insights. Our mission is to provide a safe, supportive, and
          enjoyable space for users to freely share their thoughts and experiences, fostering a community where
          everyone can lead a free and happy life.<br></br>
          4.We strictly prohibit the sharing of any vulgar content on our platform. If such content is found or used, immediate and permanent suspension from our platform will be enforced. We are committed to maintaining a safe and respectful environment for all our users, fostering a positive and supportive community. Please be mindful of our guidelines and ensure that your contributions align with our values to preserve the integrity of our platform.
        </h1>

        <div className="video-container">
          <video controls autoPlay muted>
            <source src={vi} type="video/mp4" />
            {/* Add alternative sources for different video formats here if needed */}
            Your browser does not support the video tag.
          </video>
        </div>
       
      </div>
 <Footer/>
    </div>
    
  );
};

export default AboutComponent;

