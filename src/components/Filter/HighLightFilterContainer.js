import React, { Component } from "react";
import { connect } from "react-redux";
import { getHighlightColors, setHighlightColor } from "../../ducks/highlight";
import Filter from "./Filter";

export class HighLightFilterContainer extends Component {
  render() {
    const { colors, setHighlightColor } = this.props;
    return (
      <Filter
        colors={colors}
        onColorClick={payload => setHighlightColor(payload)}
      />
    );
  }
}

const mapStateToProps = state => ({
  colors: getHighlightColors(state)
});

const mapDispatchToProps = {
  setHighlightColor
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HighLightFilterContainer);
