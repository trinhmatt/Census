import React from 'react'

export default class CreateSurveyQuestion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      question: '',
      answers: [],
      nAnswers: 0,
      error: '',
      disabled: false
    }
  }
  onQuestionChange = (e) => {
    e.preventDefault();
    const question = e.target.value;
    this.setState( () => ({question}) )
  }
  onAnswerChange = (e) => {
    e.preventDefault();
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
    let stateAnswers = []
    for (let i=0; i<this.state.nAnswers; i++) {
      const answerInput = (
        <input
          type='text'
          placeholder='answer'
          key={i}
          id={i}
          value={this.state.answers[i]}
          onChange={this.onAnswerChange}
          disabled={this.state.disabled}
        />
      )
      answers.push(answerInput)
      stateAnswers.push('')
    }
    return answers
  }
  saveQuestion = (e) => {
    e.preventDefault();
    if (this.state.answers.length === 0) {
      this.setState(() => ({error: 'Please add at least one answer'}))
    } else {
      this.setState( () => ({error: ''}) )
      this.props.onSubmit({
        question: this.state.question,
        answers: this.state.answers
      })
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={this.saveQuestion}>
          <input
            type='text'
            placeholder='question'
            value={this.state.question}
            onChange={this.onQuestionChange}
            disabled={this.state.disabled}
          />
          <button onClick={() => {
            this.setState(() => ({disabled: true}))
          }}>Save question</button>
        </form>
        <button
          onClick={ () => {
            this.setState( (prevState) => {
              const answerSetUp = ['']
              return {
                nAnswers: prevState.nAnswers + 1,
                answers: prevState.answers.concat(answerSetUp)
              }
            })
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
