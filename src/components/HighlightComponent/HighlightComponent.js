import React, { useRef } from "react";
import "./HighlightComponent.css";

const HighlightComponent = ({
  text,
  color,
  highlights,
  onTextChange,
  addHighlight,
  removeHighlight
}) => {
  const textRef = useRef(null);
  const highlightsRef = useRef(null);

  const onScroll = e => {
    e.persist();
    highlightsRef.current.scrollTop = e.target.scrollTop;
  };

  const checkRange = (start, end, highlight) => {
    if (
      (end > highlight.range.start && end <= highlight.range.end) ||
      (start >= highlight.range.start && start < highlight.range.end) ||
      (start <= highlight.range.start && end > highlight.range.end)
    )
      removeHighlight(highlight.id);
  };

  const findHighlights = ({ highlights, start, end }) =>
    highlights.find(
      highlights =>
        highlights.range.start === start && highlights.range.end === end
    );

  const onMouseUp = e => {
    e.persist();
    const start = textRef.current.selectionStart;
    const end = textRef.current.selectionEnd;
    const finded = findHighlights({ highlights, start, end });
    if (start === end || finded) {
      return false;
    }
    highlights.forEach(highlight => checkRange(start, end, highlight));
    addHighlight({ range: { start, end }, color });
  };

  const parseHighlights = text => {
    let extraMarkupChars = 0;
    return highlights.reduce((acc, selection) => {
      const highlight =
        `${acc.slice(0, selection.range.start + extraMarkupChars)}` +
        `<span class="${selection.color}" data-testid="highlight">${acc.slice(
          selection.range.start + extraMarkupChars,
          selection.range.end + extraMarkupChars
        )}</span>` +
        `${acc.slice(selection.range.end + extraMarkupChars)}`;
      extraMarkupChars += 13 + selection.color.length + 26 + 7;
      return highlight;
    }, text);
  };

  return (
    <div className="wrapper">
      <textarea
        className="text"
        ref={textRef}
        value={text}
        onChange={e => onTextChange(e.target.value)}
        onMouseUp={onMouseUp}
        onScroll={onScroll}
      />
      <div
        ref={highlightsRef}
        className="highlight text"
        dangerouslySetInnerHTML={{
          __html: parseHighlights(text)
        }}
      />
    </div>
  );
};

export default HighlightComponent;
