import React from 'react'
import { connect } from 'react-redux'
import { startDeleteSurvey } from '../actions/surveys'
import { startSubmitSurvey } from '../actions/surveys'
import SurveyQuestion from './SurveyQuestion'
import SurveyUAQuestion from './SurveyUAQuestion'

class SurveyPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      survey: props.surveys[0],
      recordedAnswers: {},
      dispatch: props.dispatch,
      history: props.history,
      auth: props.auth
    }
  }
  submitAnswers = () => {
    const completedSurvey = this.state.recordedAnswers
    this.state.dispatch(startSubmitSurvey(completedSurvey, this.state.survey.id))
    this.state.history.push(`/survey/${this.state.survey.id}/complete`)
  }
  deleteSurvey = () => {
    this.state.dispatch(startDeleteSurvey(this.state.survey.id))
    this.state.history.push('/dashboard')
  }
  render() {
    return (
      <div className='survey-page'>
        <h1>{this.state.survey.title}</h1>
        {(this.state.auth.uid === this.state.survey.author)
          ?
          <button onClick={this.deleteSurvey}>Delete survey</button>
          : ''
        }
        {this.state.survey.questions.map( (question) => {
          if (question.type === 'SA' || question.type === 'MA') {
            return (
              <SurveyQuestion
                key={question.question}
                question={question}
                type={question.type}
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
          } else {
            return (
              <SurveyUAQuestion
                key={question.question}
                question={question}
                onSubmit={(questionData) => {
                  this.setState( (prevState) => {
                    return {
                      recordedAnswers: {
                        ...prevState.recordedAnswers,
                        [questionData.question]: questionData.answer
                      }
                    }
                  })
                }}
              />
            )
          }

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
  }),
  auth: state.auth
})

export default connect(mapStateToProps)(SurveyPage);
