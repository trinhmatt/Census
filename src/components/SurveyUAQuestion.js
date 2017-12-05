import React from 'react'


export default class SurveyUAQuestion extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      question: props.question.question,
      answer: '',
      type: props.question.type
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
  generateRadioInput = () => {
    let radios = []
    for (let i=1; i<=5; i++) {
      radios.push(
        <div>
          <input
            type='radio'
            value={i}
            onFocus={this.onRadioChange}
            name='scale'
          />
          <label>{i}</label>
        </div>
      )
    }
    return radios
  }
  onRadioChange = (e) => {
    e.persist()
    const radioAnswer = e.target.value;

    this.setState(() => ({answer: radioAnswer}), this.simulateClick.bind(this,e))
  }
  simulateClick = (e) => {
    //Double parentNode because each input is inside a container div
    e.target.parentNode.parentNode.firstChild.click()
  }
  render() {
    return (
      <div id='survey-ua-question'>
        <p>{this.state.question}</p>
        <form onSubmit={this.onSubmit}>
          {/* Button needed to submit answer data */}
          <button style={{display:'none'}}>Submit answer</button>
          {this.state.type === 'UA' ? (<textarea
            placeholder='Answer here...'
            value={this.state.answer}
            onChange={this.onAnswerChange}
          />) : this.generateRadioInput()}
        </form>
      </div>
    )
  }
}
