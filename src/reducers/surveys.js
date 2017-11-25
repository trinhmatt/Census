const surveysDefaultState = [];

const surveysReducer = (state = surveysDefaultState, action) => {
  switch (action.type) {
    case 'CREATE_SURVEY':
      return [
        ...state,
        action.post
      ]
    case 'EDIT_SURVEY':
      return state.map((post) => {
        if (post.id === action.id) {
          return {
            ...post,
            ...action.update
          }
        } else {
          return post
        }
      })
    case 'REMOVE_SURVEY':
      return state.filter((post) => {
        return action.id !== post.id
      })
    case 'SET_SURVEYS':
      return action.surveys
    default:
      return state
  }
}

export default surveysReducer;
