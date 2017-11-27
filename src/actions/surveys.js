import database from '../firebase/firebase'


export const createSurvey = (survey) => ({
  type: 'CREATE_SURVEY',
  survey
})

export const startCreateSurvey = (surveyData = {}) => {
  return (dispatch) => {
    const {
      title = '',
      questions = [],
      completedSurveys = []
    } = surveyData

    const survey = { title, questions, completedSurveys }

    return database.ref('surveys').push(survey).then( (ref) => {
      dispatch(createSurvey({
        id: ref.key,
        ...survey
      }))
    })
  }
}

export const submitSurvey = (recordedAnswers, id) => ({
  type: 'SUBMIT_SURVEY',
  recordedAnswers,
  id
})

export const startSubmitSurvey = (recordedAnswers = {}, id = '') => {
  return (dispatch) => {
    return database.ref(`surveys/${id}/completedSurveys`).push(recordedAnswers).then(
      () => {
        dispatch(submitSurvey(recordedAnswers, id))
      }
    )
  }
}

export const setSurveys = (surveys) => ({
  type: 'SET_SURVEYS',
  surveys
})

export const startSetSurveys = () => {
  return (dispatch) => {
    return database.ref('surveys').once('value').then((snapshot) => {
      const surveys = []

      snapshot.forEach((survey) => {
        surveys.push({
          id: survey.key,
          ...survey.val()
        })
      })

      dispatch(setSurveys(surveys))
    })
  }
}
