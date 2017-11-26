import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const SurveyList = (props) => (
  <div>
    <h1>All Surveys</h1>
    {props.surveys.map( (survey) => {
      return <Link key={survey.id} to={`/survey/${survey.id}`}>{survey.title}</Link>
    })}
  </div>
)

const mapStateToProps = (state) => ({
  surveys: state.surveys
})

export default connect(mapStateToProps)(SurveyList)
