import React from "react";
import "./Results.css";

const Results = ({ highlights, color, text }) => (
  <ul className="results">
    {highlights
      .filter(highlight => highlight.color === color)
      .map(highlight => (
        <li key={highlight.id}>
          <span className={highlight.color} data-testid="highlight-result">
            {text.slice(highlight.range.start, highlight.range.end)}
          </span>
        </li>
      ))}
  </ul>
);

export default Results;
