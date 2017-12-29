import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import getVisibleSurveys from '../selectors/surveys'

//Conditional rendering based on which component requires a list
const SurveyList = (props) => (
  <div className='survey-list'>
    {(props.onPage === 'dashboard') ? (props.surveys.map( (survey) => {
      return <Link id='survey-link' key={survey.id} to={`/survey/${survey.id}`}>{survey.title}</Link>
    })) : (props.surveys.map( (survey) => {
      return <Link id='survey-link' key={survey.id} to={`/survey/${survey.id}/results`}>{survey.title}</Link>
    }))}
  </div>
)

//Map state based on which component is rendering the list
const mapStateToProps = (state, props) => ({
  surveys: getVisibleSurveys(
    state.surveys,
    (props.onPage === 'dashboard'
    ? state.filters
    : {...state.filters, author: state.auth.uid}
  ))
})

export default connect(mapStateToProps)(SurveyList)
