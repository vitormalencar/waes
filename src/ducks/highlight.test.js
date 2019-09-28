import reducer, {
  updateText,
  addHighlight,
  setViewColor,
  initialState,
  updateHighlights,
  setHighlightColor,
  updateTextReducer,
  addHighlightReducer,
  setViewColorReducer,
  removeHighlightsReducer,
  updateHighlightsReducer,
  setHighlightColorReducer,
  getRoot,
  getHighlight,
  getHighlightColors,
  getHighlightColor,
  getViewColor,
  getHighlightText
} from "./highlight";

describe("actions", () => {
  it("should create an action to add Highlight", () => {
    const payload = {
      range: {
        start: 0,
        end: 7
      },
      color: "red",
      id: 0
    };
    const expectedAction = {
      type: "addHighlight",
      payload
    };

    expect(addHighlight(payload)).toEqual(expectedAction);
  });
  it("should create an action to update current text", () => {
    const payload = "foo";
    const expectedAction = {
      type: "updateText",
      payload
    };
    expect(updateText(payload)).toEqual(expectedAction);
  });
  it("should create an action to set the view color", () => {
    const payload = "blue";
    const expectedAction = {
      type: "setViewColor",
      payload
    };
    expect(setViewColor(payload)).toEqual(expectedAction);
  });

  it("should create an action to update the highlights", () => {
    const payload = {
      payload: {
        changePosition: 5,
        diffLength: 1
      }
    };
    const expectedAction = {
      type: "updateHighlights",
      payload
    };
    expect(updateHighlights(payload)).toEqual(expectedAction);
  });

  it("should create an action to remove the highlights", () => {
    const payload = 7;
    const expectedAction = {
      type: "updateHighlights",
      payload
    };
    expect(updateHighlights(payload)).toEqual(expectedAction);
  });
  it("should create an action to remove the set highlight color", () => {
    const payload = "red";
    const expectedAction = {
      type: "setHighlightColor",
      payload
    };
    expect(setHighlightColor(payload)).toEqual(expectedAction);
  });
});

describe("highlights reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handler update text ", () => {
    const state = [];
    const action = {
      type: "updateText",
      payload: "Run the tests"
    };
    expect(updateTextReducer({ state, action })).toEqual({
      text: "Run the tests"
    });
  });

  it("should handler set view color", () => {
    const state = [];
    const action = {
      type: "setViewColor",
      payload: "blue"
    };
    const expectedResult = {
      viewColor: "blue"
    };
    expect(setViewColorReducer({ state, action })).toEqual(expectedResult);
  });

  it("should handler set add highlight reducer", () => {
    const state = initialState;
    const action = {
      type: "addHighlight",
      payload: {
        range: {
          start: 0,
          end: 45
        },
        color: "blue",
        id: 9
      }
    };
    const expectedResult = {
      nextId: 1,
      colors: ["red", "green", "blue"],
      highlightColor: "red",
      viewColor: "red",
      highlights: [
        {
          range: {
            start: 0,
            end: 45
          },
          color: "blue",
          id: 0
        }
      ],
      text: ""
    };
    expect(addHighlightReducer({ state, action })).toEqual(expectedResult);
  });
  it("should handler set update highlights reducer", () => {
    const state = {
      ...initialState,
      text: "foo",
      highlights: [
        {
          range: {
            start: 9,
            end: 23
          },
          color: "red",
          id: 0
        }
      ]
    };
    const action = {
      type: "updateHighlights",
      payload: {
        changePosition: 0,
        diffLength: -44
      }
    };
    const expectedResult = {
      nextId: 0,
      colors: ["red", "green", "blue"],
      highlightColor: "red",
      viewColor: "red",
      highlights: [],
      text: "foo"
    };
    expect(updateHighlightsReducer({ state, action })).toEqual(expectedResult);
  });
  it("should handler set remove highlight reducer", () => {
    const state = {
      ...initialState,
      text: "foo",
      highlights: [
        {
          range: {
            start: 9,
            end: 23
          },
          color: "red",
          id: 0
        }
      ]
    };
    const action = {
      type: "removeHighlights",
      payload: 0
    };
    const expectedResult = {
      nextId: 0,
      colors: ["red", "green", "blue"],
      highlightColor: "red",
      viewColor: "red",
      highlights: [],
      text: "foo"
    };
    expect(removeHighlightsReducer({ state, action })).toEqual(expectedResult);
  });

  describe("selectors", () => {
    it("should return the root state", () => {
      const state = initialState;
      const expectedResult = initialState;
      expect(getRoot(state)).toEqual(expectedResult);
    });

    it("should return current highlights state", () => {
      const state = initialState;
      const expectedResult = initialState.highlights;
      expect(getHighlight(state)).toEqual(expectedResult);
    });

    it("should return current colors state", () => {
      const state = initialState;
      const expectedResult = initialState.colors;
      expect(getHighlightColors(state)).toEqual(expectedResult);
    });

    it("should return current highlighted color state", () => {
      const state = initialState;
      const expectedResult = initialState.highlightColor;
      expect(getHighlightColor(state)).toEqual(expectedResult);
    });

    it("should return current view color  state", () => {
      const state = initialState;
      const expectedResult = initialState.viewColor;
      expect(getViewColor(state)).toEqual(expectedResult);
    });

    it("should return current highlighted text  state", () => {
      const state = initialState;
      const expectedResult = initialState.text;
      expect(getHighlightText(state)).toEqual(expectedResult);
    });
  });
});
