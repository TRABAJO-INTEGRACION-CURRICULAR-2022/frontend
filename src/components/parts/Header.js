import React from "react";
import "../../styles.css";

export default function Header() {
  return (
    <nav>
      <a href="/" className="site-title">
        Nombre App
      </a>
      <ul>
        <li>
          <a href="/home">Home</a>
        </li>
        <li>
          <a href="/table">Table</a>
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
        <li>
          <a href="/register">Register</a>
        </li>
      </ul>
    </nav>
  );
}
