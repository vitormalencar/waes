import React from "react";
import { Provider } from "react-redux";

import HighlightContainer from "./components/HighlightComponent";
import ResultsContainer from "./components/Results/ResultsContainer";
import HighLightSelectorContainer from "./components/Filter/HighLightFilterContainer";
import ViewColorSelectorContainer from "./components/Filter/ViewColorSelectorContainer";
import configureStore from "./store/ConfigureStore";

import "./App.css";
const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <div className="app-wrapper">
        <HighLightSelectorContainer />
        <HighlightContainer />
        <ViewColorSelectorContainer />
        <ResultsContainer />
      </div>
    </Provider>
  );
};

export default App;
