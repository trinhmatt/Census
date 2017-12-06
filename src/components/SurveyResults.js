import React from 'react'
import { connect } from 'react-redux'
import { startDeleteSurvey } from '../actions/surveys'
import SurveyResponse from './SurveyResponse'

class SurveyResults extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      survey: props.surveys[0],
      dispatch: props.dispatch,
      history: props.history
    }
  }
  generateResponse = () => {
    let responses = []
    for (const response in this.state.survey.completedSurveys) {
      responses.push(<SurveyResponse key={response.question} response={this.state.survey.completedSurveys[response]} />)
    }
    return responses
  }
  deleteSurvey = () => {
    this.state.dispatch(startDeleteSurvey(this.state.survey.id))
    this.state.history.push('/dashboard')
  }
  render() {
    return (
      <div className='survey-results'>
        <div id='results-header'>
          <h1>{this.state.survey.title}</h1>
          <button onClick={this.deleteSurvey}>Delete survey</button>
          <p>
            Number of responses: {this.state.survey.completedSurveys ? Object.keys(this.state.survey.completedSurveys).length : '0'}
          </p>
        </div>
        <div id='results-body'>
          {this.generateResponse()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  surveys: state.surveys.filter((survey) => {
    return survey.id === props.match.params.id
  })
})

export default connect(mapStateToProps)(SurveyResults);
