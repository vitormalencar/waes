import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addHighlight,
  getHighlight,
  getHighlightColor,
  getHighlightText,
  removeHighlights,
  updateHighlights,
  updateText
} from "../../ducks/highlight";
import { findDiffPosition, getStringLengthDifference } from "../../lib/utils";
import HighlightComponent from "./HighlightComponent";

export class HighlightContainer extends Component {
  onChange = text => {
    const diffLength = getStringLengthDifference(text, this.props.text);
    const changePosition = findDiffPosition(text, this.props.text);
    if (changePosition !== null) {
      this.props.updateHighlights({ changePosition, diffLength });
    }
    this.props.updateText(text);
  };

  render() {
    const {
      text,
      color,
      highlights,
      addHighlight,
      removeHighlights
    } = this.props;
    return (
      <HighlightComponent
        text={text}
        color={color}
        highlights={highlights}
        addHighlight={addHighlight}
        onTextChange={this.onChange}
        removeHighlight={removeHighlights}
      />
    );
  }
}

const mapStateToProps = state => ({
  highlights: getHighlight(state),
  color: getHighlightColor(state),
  text: getHighlightText(state)
});

const mapDispatchToProps = {
  updateText,
  addHighlight,
  updateHighlights,
  removeHighlights
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HighlightContainer);
