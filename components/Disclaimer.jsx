import React from 'react'
import Topbar from './common/Topbar';
import Footer from './Footer/Footer';
import './dis.scss';

const Disclaimer = () => {
  return (
    <div className=''>
        <Topbar/>

<p className='disclaimer'>Disclaimer: <br></br>
The information provided on Confession.com is for general informational purposes only. The website does not guarantee the accuracy, completeness, or reliability of any of the content posted by its users. The confessions, stories, and discussions shared on the platform are solely the opinions and experiences of the individuals who posted them.

Confession.com does not endorse or take responsibility for any actions, decisions, or consequences that may result from the content shared on the website. Users are advised to exercise their own judgment and discretion when engaging with the platform and considering the information provided.

Confession.com is an anonymous platform, and while measures are in place to protect user identities, the website cannot guarantee absolute anonymity or confidentiality. Users should be aware that there are inherent risks associated with sharing personal experiences and information online.

The website reserves the right to moderate, edit, or remove any content that violates its guidelines or terms of service. Users are responsible for their own actions and are encouraged to adhere to ethical standards, respect others' privacy, and refrain from engaging in any form of harassment, hate speech, or illegal activities.

Confession.com is not a substitute for professional advice or therapy. If users require specific assistance or support, it is recommended to seek guidance from qualified professionals or relevant resources. The website is not liable for any reliance placed on the information provided and disclaims any liability for damages or losses incurred as a result of using or relying on the website's content.

By using Confession.com, users agree to indemnify and hold harmless the website, its administrators, and affiliates from any claims, damages, or liabilities arising out of their use of the platform.

It is important to read and understand the terms of service, privacy policy, and guidelines provided by Confession.com before using the website. Users are encouraged to use the platform responsibly and to report any inappropriate or concerning content to the website administrators for further review and action.</p>




<Footer/>
    </div>
  )
}

export default Disclaimer;