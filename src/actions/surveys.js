import database from '../firebase/firebase';

export const createSurvey = (survey) => ({
  type: 'CREATE_SURVEY',
  survey
})

export const startCreateSurvey = (surveyData = {}) => {
  return (dispatch, getState) => {
    const {
      title = '',
      questions = [],
      completedSurveys = []
    } = surveyData

    const author = getState().auth.uid;

    const survey = { title, questions, completedSurveys, author };

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

export const deleteSurvey = (id) => ({
  type: 'DELETE_SURVEY',
  id
})

export const startDeleteSurvey = (id) => {
  return (dispatch) => {
    return database.ref(`surveys/${id}`).remove().then( () => {
      dispatch(deleteSurvey(id))
    })
  }
}

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
