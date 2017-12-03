import React from 'react'
import { connect } from 'react-redux'
import SurveyResponse from './SurveyResponse'

class SurveyResults extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      survey: props.surveys[0]
    }
  }
  generateResponse = () => {
    let responses = []
    for (const response in this.state.survey.completedSurveys) {
      responses.push(<SurveyResponse response={this.state.survey.completedSurveys[response]} />)
    }
    return responses
  }
  render() {
    return (
      <div>
        <h1>{this.state.survey.title}</h1>
        <p>Number of responses: {this.state.survey.completedSurveys ? Object.keys(this.state.survey.completedSurveys).length : '0'}</p>
        {this.generateResponse()}
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
