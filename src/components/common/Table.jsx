import React from "react";
import "./Table.css";

const Table = ({ Headings, children }) => {
  return (
    <table className="common-table">
      <thead>
        <tr>
          {Headings.map((item, index) => (
            <th key={index}>{item}</th>
          ))}
        </tr>
      </thead>
      {children}
    </table>
  );
};

export default Table;
