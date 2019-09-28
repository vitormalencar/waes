import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getHighlight,
  getHighlightText,
  getViewColor
} from "../../ducks/highlight";
import Results from "./Results";

export class ResultsContainer extends Component {
  render() {
    const { highlights, viewColor, text } = this.props;
    return <Results highlights={highlights} color={viewColor} text={text} />;
  }
}

const mapStateToProps = state => ({
  highlights: getHighlight(state),
  viewColor: getViewColor(state),
  text: getHighlightText(state)
});

export default connect(mapStateToProps)(ResultsContainer);
