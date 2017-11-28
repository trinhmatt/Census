import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const SurveyList = (props) => (
  <div>
    {props.surveys.map( (survey) => {
      return <Link key={survey.id} to={`/survey/${survey.id}`}>{survey.title}</Link>
    })}
  </div>
)

const mapStateToProps = (state, props) => ({
  //If on the MySurveys route, filter by author
  //Else, return all surveys
  surveys: state.surveys.filter( (survey) => {
    if (props.onPage === 'dashboard') {
      return true
    } else {
      return (state.auth.uid === survey.author)
    }
  })
})

export default connect(mapStateToProps)(SurveyList)
