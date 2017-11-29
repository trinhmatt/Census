import moment from 'moment'

const filtersReducerDefaultState = {
  text: '',
  author: ''
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      };
    case 'FILTER_BY_AUTHOR':
      return {
        ...state,
        author: action.id
      }
    default:
      return state;
  }
};

export default filtersReducer;
