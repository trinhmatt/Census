import React from 'react'
import { connect } from 'react-redux'
import SurveyQuestion from './SurveyQuestion'

const SurveyPage = (props) => (
  <div>
    <h1>{props.surveys[0].title}</h1>
    {props.surveys[0].questions.map( (question) => {
      return <SurveyQuestion key={question.id} question={question} />
    })}
  </div>
)

const mapStateToProps = (state, props) => ({
  surveys: state.surveys.filter( (survey) => {
    return survey.id === props.match.params.id
  })
})

export default connect(mapStateToProps)(SurveyPage);
