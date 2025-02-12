import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import Links from "../Navbar/Links.jsx";
import apiClient from "../utils/apiClient.js";
import UseData from "../hooks/UseData.js";
const Sidebar = () => {
  const { data: categories, error } = UseData("/category");
  return (
    <aside className="product-sidebar">
      <h2>Category</h2>
      <div className="category-links">
        {error && <em>{error}</em>}
        {categories &&
          categories.map((category) => (
            <Links
              key={category._id}
              id={category._id}
              title={category.name}
              link={`/products?category=${category.name}`}
              Sidebar={true}
            />
          ))}
      </div>
    </aside>
  );
};

export default Sidebar;
