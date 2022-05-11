import React, { Component } from "react";
import { MenuItems } from "./MenuItems";

class Navbar extends Component {
  render() {
    return (
      <header className="header">
        <a href="#" className="logo">
          <i className="fas fa-heartbeat"></i> Make-Med Sync
        </a>
        <nav className="navbar">
            <a href="#home">Home</a>
            <a href="#services">Services</a>
            <a href="#doctors">Porfolio</a>
            <a href="#blogs">Blogs</a>
            <a href="#about">About</a>
            <a href="#need help">Need help?</a>
        </nav>
        <div className="icons">
          <i className="fas fa-search" id="search-btn"></i>
          <i className="fas fa-user" id="login-btn"></i>
        </div>
      </header>
    );
  }
}
export default Navbar;
