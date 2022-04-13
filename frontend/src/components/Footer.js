import React from "react";

const Footer = () => {

  const date = new Date()
  const year = date.getFullYear()

  return (
    <footer className="footer">
      <p className="footer__copyright">© {year} Timothy Russo - Around The U.S.</p>
    </footer>
  )
}

export default Footer;
