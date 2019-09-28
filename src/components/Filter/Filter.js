import React from "react";
import "./Filter.css";

export default ({ colors, onColorClick }) => {
  return (
    <div className="Filter">
      {colors.map((color, index) => (
        <button
          key={index}
          className={`button ${color}`}
          onClick={() => onColorClick(color)}
        >
          {color} filter
        </button>
      ))}
    </div>
  );
};
