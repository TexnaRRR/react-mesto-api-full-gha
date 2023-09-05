import React from "react";

function Footer({loggedIn}) {
  return (
    <div>
      {loggedIn && <footer className={loggedIn ? "footer" : ""}> 
        <p className="footer__copyright">© 2023 Mesto Russia</p>
      </footer> }
    </div>
  );
}

export default Footer;