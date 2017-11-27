import React from 'react'
import { connect } from 'react-redux'
import CreateSurveyQuestion from './CreateSurveyQuestion'
import { startCreateSurvey } from '../actions/surveys'


class CreateSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nQuestions: 0,
      title: '',
      questions: [],
      dispatch: props.dispatch,
      history: props.history
    }
  }
  renderQuestion = () => {
    let questions = []
    for (let i=0; i<this.state.nQuestions; i++) {
      questions.push(<CreateSurveyQuestion
        onSubmit={ (question) => {
          this.setState( (prevState) => {
            const questionText = question.question
            const formattedQuestion = {
              question: questionText,
              answers: question.answers
            }
            return {questions: prevState.questions.concat(formattedQuestion)}
          })
        }}
        key={i}
      />)
    }
    return questions
  }
  onTitleChange = (e) => {
    const title = e.target.value
    this.setState( () => ({title}))
  }
  createSurvey = (e, props) => {
    e.preventDefault();
    const survey = {
      title: this.state.title,
      questions: this.state.questions,
      completedSurveys: []
    }
    this.state.dispatch(startCreateSurvey(survey))
    this.state.history.push('/')
  }
  render() {
    return (
      <div>
        <h1>Create Survey</h1>
        <form onSubmit={this.createSurvey}>
          <input type='text' placeholder='title' value={this.state.title} onChange={this.onTitleChange} />
          <button disabled={!this.state.nQuestions}>Create survey</button>
        </form>
        <button onClick={() => {
          this.setState( (prevState) => {
            return {nQuestions: prevState.nQuestions + 1}
          })
        }}>Add Question</button>
        {this.state.nQuestions ? this.renderQuestion() : ''}
      </div>
    )
  }
}

export default connect()(CreateSurvey);
