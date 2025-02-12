import React from "react";
import "./MyOrderPage.css";
import Table from "../common/Table";
import UseData from "./../hooks/UseData";

const MyOrderPage = () => {
  const { isLoading, data: orders, error } = UseData("/order");
  const getProductString = (order) => {
    const productString = order.products.map(
      (p) => `${p.product.title}(${p.quantity})`
    );
    return productString.join(", ");
  };
  return (
    <section className="myorder-page">
      {orders && (
        <Table Headings={["Order", "Product", "Total", "Status"]}>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{getProductString(order)}</td>
                <td>${order.total}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </section>
  );
};

export default MyOrderPage;
