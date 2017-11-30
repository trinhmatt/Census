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
      questions: [],
      dispatch: props.dispatch,
      history: props.history,
      questionType: 'SA',  //Needed in case the user doesn't change the question type
      typesToRender: []
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
  createQuestionForm = (e) => {
    e.preventDefault();
    switch (this.state.questionType) {
      case 'SA': //SA = SINGLE ANSWER
        return this.setState( (prevState) => ({
          typesToRender: [...prevState.typesToRender, <CreateMC key={uuid()} type={'SA'} onSubmit={this.onQuestionSave}/>]
        }))
      case 'MA': //MA = MULTIPLE ANSWERS
        return this.setState( (prevState) => ({
          typesToRender: [...prevState.typesToRender, <CreateMC key={uuid()} type={'MA'} onSubmit={this.onQuestionSave}/>]
        }))
      case 'UA': //UA = USER PROVIDED ANSWER
        return this.setState( (prevState) => ({
          typesToRender: [...prevState.typesToRender, <CreateUA key={uuid()} onSubmit={this.onQuestionSave}/>]
        }))
    }
  }
  onQuestionSave = (question) => {
    this.setState( (prevState) => ({
      questions: [...prevState.questions, question]
    }))
  }
  render() {
    return (
      <div>
        <h1>Create Survey</h1>
        <form onSubmit={this.createSurvey}>
          <input type='text' placeholder='title' value={this.state.title} onChange={this.onTitleChange} />
          <button disabled={!this.state.questions}>Create survey</button>
        </form>
        <h3>Create a question</h3>
        <form onSubmit={this.createQuestionForm}>
          <select value={this.state.questionType} onChange={this.onTypeSelect}>
            <option value='SA'>Single answer</option>
            <option value='MA'>Multiple answers</option>
            <option value='UA'>User answer</option>
          </select>
          <button>Add</button>
        </form>
        {this.state.typesToRender}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(CreateSurvey);
