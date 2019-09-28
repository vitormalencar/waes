import React, { Component } from "react";
import { connect } from "react-redux";
import { getHighlightColors, setViewColor } from "../../ducks/highlight";
import Filter from "./Filter";

export class HighLightFilterContainer extends Component {
  render() {
    const { colors, setViewColor } = this.props;
    return (
      <Filter colors={colors} onColorClick={payload => setViewColor(payload)} />
    );
  }
}

const mapStateToProps = state => ({
  colors: getHighlightColors(state)
});

const mapDispatchToProps = {
  setViewColor
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HighLightFilterContainer);
