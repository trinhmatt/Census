import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import getVisibleSurveys from '../selectors/surveys'

const SurveyList = (props) => (
  <div>
    {props.surveys.map( (survey) => {
      return <Link key={survey.id} to={`/survey/${survey.id}`}>{survey.title}</Link>
    })}
  </div>
)

const mapStateToProps = (state, props) => ({
  surveys: getVisibleSurveys(
    state.surveys,
    (props.onPage === 'dashboard'
    ? state.filters
    : {...state.filters, author: state.auth.uid}
  ))
})

export default connect(mapStateToProps)(SurveyList)
