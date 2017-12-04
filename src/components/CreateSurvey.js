import React from 'react'
import { connect } from 'react-redux'
import { startCreateSurvey } from '../actions/surveys'
import uuid from 'uuid'
import CreateMC from './CreateMC'
import CreateUA from './CreateUA'


class CreateSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      questions: [], //Stores the question objects from the children
      dispatch: props.dispatch,
      history: props.history,
      questionType: 'SA',  //Needed in case the user doesn't change the question type
      typesToRender: [], //Component renders the entire array on mount
      nQuestions: 0 //Track the number of questions + individual questions
    }
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
    this.state.history.push('/dashboard')
  }
  onTypeSelect = (e) => {
    const questionType = e.target.value
    this.setState(() => ({questionType}))
  }
  deleteQuestion = (questionID) => {
    this.setState( (prevState) => {
      //Each question is related to three variables in state
      const newTypesToRender = this.state.typesToRender.filter((question) => {
        return question.props.id !== questionID
      })
      let newQuestions = this.state.questions.filter((question) => {
        return question !== this.state.questions[questionID]
      })
      //Need to iterate through the remaining questions and correct their IDs
      //IDs are needed to ensure that the order of the questions is correct
      newQuestions = newQuestions.map((question) => {
        if (question.id === 0) {
          return question
        } else {
          return {...question, id: question.id - 1}
        }
      })
      return {
        typesToRender: newTypesToRender,
        nQuestions: prevState.nQuestions - 1,
        questions: newQuestions
      }
    })
  }
  createQuestionForm = (e) => {
    e.preventDefault();
    switch (this.state.questionType) {
      case 'SA': //SA = SINGLE ANSWER
        return this.setState( (prevState) => ({
          typesToRender: [
            ...prevState.typesToRender,
            <CreateMC
              id={this.state.nQuestions}
              key={uuid()}
              type={'SA'}
              onSubmit={this.onQuestionSave}
              deleteQuestion={this.deleteQuestion}
            />
          ],
          nQuestions: prevState.nQuestions + 1,
          questions: [...prevState.questions, {}]
        }))
      case 'MA': //MA = MULTIPLE ANSWERS
        return this.setState( (prevState) => ({
          typesToRender: [
            ...prevState.typesToRender,
            <CreateMC
              id={this.state.nQuestions}
              key={uuid()}
              type={'MA'}
              onSubmit={this.onQuestionSave}
              deleteQuestion={this.deleteQuestion}
            />
          ],
          nQuestions: prevState.nQuestions + 1,
          questions: [...prevState.questions, {}]
        }))
      case 'UA': //UA = USER PROVIDED ANSWER
        return this.setState( (prevState) => ({
          typesToRender: [
            ...prevState.typesToRender,
            <CreateUA
              id={this.state.nQuestions}
              key={uuid()}
              type={'UA'}
              onSubmit={this.onQuestionSave}
              deleteQuestion={this.deleteQuestion}
            />
          ],
          nQuestions: prevState.nQuestions + 1,
          questions: [...prevState.questions, {}]
        }))
      case 'RA': //RA = Answer from a scale
        return this.setState( (prevState) => ({
          typesToRender: [
            ...prevState.typesToRender,
            <CreateUA
              id={this.state.nQuestions}
              key={uuid()}
              type={'RA'}
              onSubmit={this.onQuestionSave}
              deleteQuestion={this.deleteQuestion}
            />
          ],
          nQuestions: prevState.nQuestions + 1,
          questions: [...prevState.questions, {}]
        }))
    }
  }
  onQuestionSave = (question) => {
    this.setState( (prevState) => {
      const questionIndex = question.id;
      let prevQuestions = prevState.questions;
      prevQuestions[questionIndex] = {...question};

      return {questions: prevQuestions}
    })
  }
  render() {
    return (
      <div className='create-survey'>
        <h1>Create Survey</h1>
        <form id='survey-title-form' onSubmit={this.createSurvey}>
          <div>
            <input type='text' placeholder='title' value={this.state.title} onChange={this.onTitleChange} />
          </div>
          <div>
            <button
              disabled={
                (this.state.questions[0]) ? (!this.state.questions[0].question) : true
              }>Create survey</button>
          </div>
        </form>
        <div id='create-question-form'>
          <p>Create a question:</p>
          <form id='question-select' onSubmit={this.createQuestionForm}>
            <select value={this.state.questionType} onChange={this.onTypeSelect}>
              <option value='SA'>Single answer</option>
              <option value='MA'>Multiple answers</option>
              <option value='UA'>User answer</option>
              <option value='RA'>Range answer</option>
            </select>
            <button>Add</button>
          </form>
        </div>
        {this.state.typesToRender}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(CreateSurvey);
