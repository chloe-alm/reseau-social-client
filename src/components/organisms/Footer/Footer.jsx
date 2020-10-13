import React from 'react';
import FacebookIcon  from '../../../assets/images/icon-facebook.png';
import TwitterIcon from '../../../assets/images/icon-instagram.png';
import InstagramIcon from '../../../assets/images/icon-twitter.png';

require('./_footer.scss');



export default function Footer(props) {
  

  return (
    <>
      <footer className="footer">
        <div className="footer_reseaux">
          <a href="https://www.facebook.com/CEJablines">
            <span>
              <img className="footer_reseaux-sociaux" src={FacebookIcon} alt="logo reseau social facebook"/>
            </span>
          </a>
          <a href="https://twitter.com/">
            <span>
              <img className="footer_reseaux-sociaux" src={TwitterIcon} alt="logo reseau social twitter" />
            </span>
          </a>
          <a href="https://www.instagram.com/">
            <span>
              <img className="footer_reseaux-sociaux" src={InstagramIcon} alt="logo reseau social instagram" />
            </span>
          </a>
        </div>
          <div>© 2020 Reseau social centre équestre, Inc. All rights reserved</div>
        
      </footer>
    </>
  );
}

