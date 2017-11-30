import React from 'react'


export default class SurveyUAQuestion extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      question: props.question.question,
      answer: ''
    }
  }
  onAnswerChange = (e) => {
    e.persist()
    const answer = e.target.value
    this.setState( () => ({answer}), this.simulateClick.bind(this,e))
  }
  simulateClick = (e) => {
    e.target.parentNode.firstChild.click()
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(({question: this.state.question, answer: this.state.answer}))
  }
  render() {
    return (
      <div>
        <p>{this.state.question}</p>
        <form onSubmit={this.onSubmit}>
          {/* Button needed to submit answer data */}
          <button style={{display:'none'}}>Submit answer</button>
          <textarea
            placeholder='Answer here...'
            value={this.state.answer}
            onChange={this.onAnswerChange}
          />
        </form>
      </div>
    )
  }
}
