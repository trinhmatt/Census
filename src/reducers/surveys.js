const surveysDefaultState = [];

const surveysReducer = (state = surveysDefaultState, action) => {
  switch (action.type) {
    case 'CREATE_SURVEY':
      return [
        ...state,
        action.survey
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
    case 'SUBMIT_SURVEY':
      return state.map( (survey) => {
        if (survey.id === action.id) {
          return {
            ...survey,
            completedSurveys: [...survey.completedSurveys, action.recordedAnswers]
          }
        } else {
          return survey
        }
      })
    case 'SET_SURVEYS':
      return action.surveys
    default:
      return state
  }
}

export default surveysReducer;
