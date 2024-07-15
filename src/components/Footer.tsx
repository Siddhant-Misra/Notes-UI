import React from "react";
import "../styles/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGoogle } from "@fortawesome/free-brands-svg-icons";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <a href="https://helpful-frangollo-23f30c.netlify.app" target="_blank" rel="noopener noreferrer">
          Check out my Portfolio
        </a>
      </div>
      <div className="footer-right">
        <a href="https://www.linkedin.com/in/siddhant-misra" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} size="2x" />
        </a>
        <a href="mailto:msiddhant22@gmail.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGoogle} size="2x" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
