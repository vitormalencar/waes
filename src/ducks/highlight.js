import { createSelector } from "reselect";
import { createAction, handleActions } from "redux-actions";

export const initialState = {
  nextId: 0,
  colors: ["red", "green", "blue"],
  highlightColor: "red",
  viewColor: "red",
  highlights: [],
  text: ""
};

// Selectors
export const getRoot = state => state;

export const getHighlightState = createSelector(
  getRoot,
  ({ highlight }) => highlight || initialState
);

export const getHighlight = createSelector(
  getHighlightState,
  ({ highlights }) => highlights || initialState.highlights
);

export const getHighlightColors = createSelector(
  getHighlightState,
  ({ colors }) => colors || initialState.colors
);

export const getHighlightColor = createSelector(
  getHighlightState,
  ({ highlightColor }) => highlightColor || initialState.highlightColor
);

export const getViewColor = createSelector(
  getHighlightState,
  ({ viewColor }) => viewColor || initialState.viewColor
);

export const getHighlightText = createSelector(
  getHighlightState,
  ({ text }) => text || initialState.text
);

// Action Creators
export const updateText = createAction("updateText");
export const setViewColor = createAction("setViewColor");
export const addHighlight = createAction("addHighlight");
export const updateHighlights = createAction("updateHighlights");
export const removeHighlights = createAction("removeHighlights");
export const setHighlightColor = createAction("setHighlightColor");

// Helpers
const sortRange = (a, b) => a.range.start - b.range.start;
const rangeFilter = (highlight, payload) =>
  !(
    highlight.range.start >= payload.changePosition &&
    highlight.range.end < payload.changePosition + Math.abs(payload.diffLength)
  );

const mappedHightLights = (highlight, payload) => {
  const hgStart = highlight.range.start;
  const hgEnd = highlight.range.end;
  if (
    hgStart === payload.changePosition &&
    hgEnd > payload.changePosition + Math.abs(payload.diffLength)
  ) {
    highlight.range.start = payload.changePosition;
  }
  if (hgStart > payload.changePosition)
    highlight.range.start += payload.diffLength;

  if (hgEnd >= payload.changePosition)
    highlight.range.end += payload.diffLength;

  return highlight;
};

// Reduce Actions
export const setHighlightColorReducer = ({ state, action }) => ({
  ...state,
  highlightColor: action.payload
});

export const setViewColorReducer = ({ state, action }) => ({
  ...state,
  viewColor: action.payload
});

export const addHighlightReducer = ({ state, action }) => {
  action.payload.id = state.nextId;
  return {
    ...state,
    nextId: state.nextId + 1,
    highlights: [...state.highlights, action.payload].sort((a, b) =>
      sortRange(a, b)
    )
  };
};

export const updateHighlightsReducer = ({ state, action }) => ({
  ...state,
  highlights: state.highlights
    .filter(highlight => rangeFilter(highlight, action.payload))
    .map(highlight => mappedHightLights(highlight, action.payload))
});

export const removeHighlightsReducer = ({ state, action }) => ({
  ...state,
  highlights: state.highlights.filter(
    highlight => highlight.id !== action.payload
  )
});

export const updateTextReducer = ({ state, action }) => ({
  ...state,
  text: action.payload
});

const combinedReducers = {
  setHighlightColor: (state, action) =>
    setHighlightColorReducer({ state, action }),
  setViewColor: (state, action) => setViewColorReducer({ state, action }),
  addHighlight: (state, action) => addHighlightReducer({ state, action }),
  updateHighlights: (state, action) =>
    updateHighlightsReducer({ state, action }),
  removeHighlights: (state, action) =>
    removeHighlightsReducer({ state, action }),
  updateText: (state, action) => updateTextReducer({ state, action })
};

export const reducer = handleActions(combinedReducers, initialState);

export default reducer;
