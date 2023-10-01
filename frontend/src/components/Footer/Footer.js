import React from "react";
import linkedinIcon from "../images/linkedin.svg";
import githubIcon from "../images/github.svg";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="footer">
      <p className="footer__copyright">
        © {year} Timothy Russo - Around The U.S.
      </p>
      <a href="https://github.com/timothyrusso" target="_blank">
        <img src={githubIcon} className="footer__icon"></img>
      </a>
      <a
        href="https://www.linkedin.com/in/russotimothysoftwareengineer/"
        target="_blank"
      >
        <img src={linkedinIcon} className="footer__icon"></img>
      </a>
    </footer>
  );
};

export default Footer;
