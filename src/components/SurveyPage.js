import React from 'react'
import { connect } from 'react-redux'
import { startSubmitSurvey } from '../actions/surveys'
import SurveyQuestion from './SurveyQuestion'

class SurveyPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      survey: props.surveys[0],
      recordedAnswers: {},
      dispatch: props.dispatch,
      history: props.history
    }
  }
  submitAnswers = () => {
    const completedSurvey = this.state.recordedAnswers
    this.state.dispatch(startSubmitSurvey(completedSurvey, this.state.survey.id))
    this.state.history.push('/')
  }
  render() {
    return (
      <div>
        <h1>{this.state.survey.title}</h1>
        {this.state.survey.questions.map( (question) => {
          return (
            <SurveyQuestion
              key={question.question}
              question={question}
              onSubmit={(questionData) => {
                this.setState( (prevState) => {
                  return {
                    recordedAnswers: {
                      ...prevState.recordedAnswers,
                      [questionData.question]: questionData.selectedAnswer
                    }
                  }
                })
              }}
            />
          )
        })}
        <br />
        <button onClick={this.submitAnswers}>Submit answers</button>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  surveys: state.surveys.filter( (survey) => {
    return survey.id === props.match.params.id
  })
})

export default connect(mapStateToProps)(SurveyPage);
