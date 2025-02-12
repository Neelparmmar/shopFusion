import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { FaSearch } from "react-icons/fa";
import Links from "./Links";
import { Link, NavLink, useNavigate } from "react-router-dom";
import cartContex from "../../contex/cartContex";
import userContex from "../../contex/userContex";
import { getSuggestionAPI } from "../../services/productServices";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const Navigate = useNavigate();
  const user = useContext(userContex);
  const [suggestions, setSuggestions] = useState([]);
  const { cart } = useContext(cartContex);
  const [selectedItem, setSelectedItem] = useState(-1);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      Navigate(`/products?search=${search.trim()}`);
    }
    setSuggestions([]);
  };
  useEffect(() => {
    const delaySuggestions = setTimeout(() => {
      if (search.trim() !== "") {
        getSuggestionAPI(search)
          .then((res) => setSuggestions(res.data))
          .catch((err) => console.log(err));
      } else {
        setSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(delaySuggestions);
  }, [search]);

  const handleKeyDown = (e) => {
    if (selectedItem < suggestions.length) {
      if (e.key === "ArrowDown") {
        setSelectedItem((current) =>
          current === suggestions.length - 1 ? 0 : current + 1
        );
      } else if (e.key === "ArrowUp") {
        setSelectedItem((current) =>
          current === 0 ? suggestions.length - 1 : current - 1
        );
      } else if (e.key === "Enter" && selectedItem > -1) {
        const suggestion = suggestions[selectedItem];
        Navigate(`/products?search=${suggestion.title}`);
        setSearch("");
        setSuggestions([]);
      }
    } else {
      selectedItem(-1);
    }
  };
  return (
    <nav className="navbar">
      <div className="navbar-heading">
        <h1 className="navbar-heading">ShopFusion</h1>
        <form className="navbar-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="navbar-search"
            placeholder="Search movies"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <FaSearch className="search-icon" />
          {suggestions.length > 0 && (
            <ul className="search-result">
              {suggestions.map((suggestion, index) => (
                <li
                  className={
                    selectedItem === index
                      ? "search-suggestion-link active"
                      : "search-suggestion-link"
                  }
                  key={suggestion._id}
                >
                  <Link
                    to={`/products?search=${suggestion.title}`}
                    onClick={() => {
                      setSearch("");
                      setSuggestions([]);
                    }}
                  >
                    {suggestion.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
      <div className="flex-align navbar-links">
        <Links title="Home" link="/" />
        <Links title="Products" link="/products" />
        {!user && (
          <>
            <Links title="Login" link="/login" />
            <Links title="signUp" link="/signup" />
          </>
        )}
        {user && (
          <>
            {" "}
            <Links title="My Order" link="/myorder" />
            <NavLink to="/cart" className="flex-align">
              Cart<p className=" navbar-count">{cart.length}</p>
            </NavLink>
            <Links title="Log Out" link="/logout" />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
