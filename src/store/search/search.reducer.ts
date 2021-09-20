import * as SearchType from './search.types';

const INITIAL_STATE = {
  loading: false,
  query: null,
  autocompleteSuggestions: [],
  results: [],
  errors: {},
};

const searchReducer = (state = INITIAL_STATE, action:any) => {
  const { type, payload } = action;
  switch (type) {
    case SearchType.SEARCH_START:
      return {
        ...state,
        loading: true,
        query: payload.value
      };

    case SearchType.SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        results: payload,
      };

    default:
      return state;
  }
};

export default searchReducer;
