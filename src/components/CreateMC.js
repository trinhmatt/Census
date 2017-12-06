import React from 'react'


export default class CreateMC extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      question: '',
      answers: [],
      inputToRender: [],
      nAnswers: 0,
      error: '',
      disabled: false,
      type: props.type,
      id: props.id,
      deleteQuestion: props.deleteQuestion
    }
  }
  onQuestionChange = (e) => {
    e.preventDefault();
    const question = e.target.value;
    this.setState( () => ({question}) )
  }
  onAnswerChange = (e) => {
    const answerID = e.target.id
    const answerVal = e.target.value
    this.setState( (prevState) => {
      let allAnswers = prevState.answers
      allAnswers[answerID] = answerVal
      return {answers: allAnswers}
    })
  }
  generateAnswerInput = () => {
    let answers = []
    for (let i=0; i<this.state.nAnswers; i++) {
      const answerInput = (
        <div key={i}>
          <input
            type='text'
            placeholder={`Answer #${i+1}`}
            id={i}
            value={this.state.answers[i]}
            onChange={this.onAnswerChange}
            disabled={this.state.disabled}
          />
          <i
            id='delete-button'
            className="fa fa-window-close-o"
            aria-hidden="true"
            onClick={this.deleteAnswer}
          ></i>
        </div>
      )
      answers.push(answerInput)
    }
    return answers
  }
  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.answers.length === 0) {
      this.setState(() => ({error: 'Please add at least one answer'}))
    } else if (!this.state.disabled){
      this.setState( () => ({error: '', disabled: true}) )
      this.props.onSubmit({
        question: this.state.question,
        answers: this.state.answers,
        type: this.state.type,
        id: this.state.id
      })
    } else {
      this.setState( () => ({disabled: false}))
    }
  }
  deleteQuestion = () => {
    this.state.deleteQuestion(this.state.id)
  }
  deleteAnswer = (e) => {
    const deletedAnswer = e.target.parentNode.firstChild.value
    const newAnswers = this.state.answers.filter( (answer) => {
      return answer !== deletedAnswer
    })
    this.setState((prevState) => ({
      nAnswers: prevState.nAnswers - 1,
      answers: newAnswers
    }))
  }
  render() {
    return (
      <div id='MC-question'>
        <i id='delete-button' className="fa fa-window-close-o" aria-hidden="true" onClick={this.deleteQuestion}></i>
        {this.state.error}
        <span>{this.state.type === 'SA' ? 'Single Answer' : 'Multiple Answers'}</span>
        <form onSubmit={this.onSubmit}>
          <input
            type='text'
            placeholder='question'
            value={this.state.question}
            onChange={this.onQuestionChange}
            disabled={this.state.disabled}
          />
          <button>
            {this.state.disabled ? 'Edit' : 'Save'}
          </button>
        </form>
        <button
          onClick={ () => {
            this.setState( (prevState) => {
              const answerSetUp = ''
              return {
                nAnswers: prevState.nAnswers + 1,
                answers: [...prevState.answers, answerSetUp]
              }
            }, this.generateAnswerInput)
          }}
          disabled={this.state.disabled}
          >
            Add answer
          </button>
        {this.state.nAnswers ? this.generateAnswerInput() : ''}
      </div>
    )
  }
}
