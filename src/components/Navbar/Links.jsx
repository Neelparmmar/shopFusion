import React from "react";
import "./Links.css";
import Sidebar from "./../ProductPage/Sidebar";
import { NavLink } from "react-router-dom";
const Links = ({ title, link, Sidebar }) => {
  return (
    <div
      className={
        Sidebar ? "flex-align sidebar-link" : "flex-align navbar-links"
      }
    >
      <NavLink to={link}>{title}</NavLink>
    </div>
  );
};

export default Links;
