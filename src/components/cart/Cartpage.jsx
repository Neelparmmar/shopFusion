import React, { useEffect, useState, useContext } from "react";
import "./Cartpage.css";
import user from "../../assets/user.png";
import Table from "../common/Table";
import Quantity from "../ProductPage/SingleProduct/Quantity";
import remove from "../../assets/remove-icon.jpg";
import userContex from "../../contex/userContex";
import cartContex from "../../contex/cartContex";
import { checkoutAPI } from "../../services/orderContex";
import { toast } from "react-toastify";
const Cartpage = () => {
  const [subTotal, setsubTotal] = useState(0);
  const userObj = useContext(userContex);
  const { cart, removeFromCart, updateCart, setCart } = useContext(cartContex);
  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    setsubTotal(total);
  }, [cart]);
  const checkout = () => {
    const oldcart = [...cart];
    setCart([]);
    checkoutAPI()
      .then(() => {
        toast.success("order placed successfully");
      })
      .catch(() => {
        toast.error("somthing went wrong");
        setCart(oldcart);
      });
  };
  return (
    <section className="flex-align cart-page">
      <div className="flex-align user-info">
        <img
          src={`http://localhost:5000/profile/${userObj?.profilePic}`}
          alt=""
        />{" "}
        <div>
          <p className="user-name">Name : {userObj?.name}</p>
          <p className="user-email">Email : {userObj?.email}</p>
        </div>
      </div>
      <Table Headings={["Item", "Price", "Quantity", "Total", "Remove"]}>
        <tbody>
          {cart.map(({ product, quantity }) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td className="flex-align table-quantity">
                <Quantity
                  quantity={quantity}
                  stock={product.stock}
                  setQuantity={updateCart}
                  cartPage={true}
                  productID={product._id}
                />
              </td>
              <td>${quantity * product.price}</td>
              <td className="remove-icon">
                {" "}
                <img src={remove} onClick={() => removeFromCart(product._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <table className="cart-bill">
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td>${subTotal}</td>
          </tr>
          <tr>
            <td>Shipping Charge</td>
            <td>$5</td>
          </tr>
          <tr className="cart-bill-final">
            <td>Total</td>
            <td>${subTotal + 5}</td>
          </tr>
        </tbody>
      </table>
      <button className="search-button checkout-button" onClick={checkout}>
        Checkout{" "}
      </button>
    </section>
  );
};
export default Cartpage;
