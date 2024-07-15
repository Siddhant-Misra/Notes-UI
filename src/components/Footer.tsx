import React from "react";
import "../styles/Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <p>Left container text</p>
      </div>
      <div className="footer-right">
        <p>Right container text</p>
      </div>
    </footer>
  );
};

export default Footer;
