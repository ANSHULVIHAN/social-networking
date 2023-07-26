import React from 'react';
import './footer.scss';
import { Link } from 'react-router-dom';
import {  FaLinkedin, } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-sm-6">
            <h5 className="footer__title">Our Services</h5>
            <ul className="footer__list">
              <li><Link to="/About">BreakHeart++</Link></li>
             
            </ul>
          </div>

          <div className="col-md-3 col-sm-6">
            <h5 className="footer__title">MyThoughts</h5>
            <ul className="footer__list">
              <li><Link to="/Privacy">Privacy & Policy</Link></li>
              <li><Link to="/Term">Term & Conditions</Link></li>
              <li><Link to="/Disclaimer">Disclaimer</Link></li>
          
            </ul>
          </div>

       

          <div className="col-md-3 col-sm-6">
            <h5 className="footer__title">Connect with Us</h5>
            <ul className="footer__social-icons">
           
              <li><a href="myconfession-share-ur-thoughts-with-world"><FaLinkedin /></a></li>
              <p className="footer__contact-info">
         
             
         ContactMyconfesion@gmail.com
       </p>

              
            </ul>
          </div>
        </div>
      </div>

      <div className="above-footer">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <p>&copy; 2023 Codingjobs Technology. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
