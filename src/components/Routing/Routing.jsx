import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../Home/HomePage";
import ProductPage from "../ProductPage/ProductPage";
import SingleProduct from "../ProductPage/SingleProduct/SingleProduct";
import Cartpage from "../cart/Cartpage";
import MyOrderPage from "../Myorder/MyOrderPage";
import LoginPage from "../Authentication/LoginPage";
import SignupPage from "../Authentication/SignupPage";
import Logout from "../Authentication/Logout";
const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductPage />} />
      <Route path="/product/:id" element={<SingleProduct />} />
      <Route path="/cart" element={<Cartpage />} />
      <Route path="/myorder" element={<MyOrderPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
};

export default Routing;
