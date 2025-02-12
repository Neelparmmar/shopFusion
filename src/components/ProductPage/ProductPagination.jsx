import React from "react";
import "./ProductPagination.css";
const ProductPagination = ({
  totalPost,
  NumberofProduct,
  onClick,
  currentPage,
}) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPost / NumberofProduct); i++) {
    pages.push(i);
  }
  return (
    <>
      {pages.length > 1 && (
        <ul className="pagination">
          {pages.map((page) => (
            <li key={page}>
              <button
                className={
                  parseInt(currentPage) === page
                    ? "pagination-button active"
                    : "pagination-button"
                }
                onClick={() => onClick(page)}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ProductPagination;
