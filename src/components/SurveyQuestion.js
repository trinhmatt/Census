import React from 'react'

class SurveyQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: props.question.question,
      answers: props.question.answers,
      selectedAnswer: null
    }
  }
  simulateClick = (e) => {
    e.target.parentNode.parentNode.firstChild.click()
  }
  onAnswerSelect = (e) => {
    e.persist()
    const selectedAnswer = e.target.value;
    this.setState(() => ({selectedAnswer}), this.simulateClick.bind(this,e))
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(({question: this.state.question, selectedAnswer: this.state.selectedAnswer}))
  }
  render() {
    return (
      <div>
        <p>{this.state.question}</p>
        <form onSubmit={this.onSubmit}>
          <button style={{display:'none'}}>Submit answer</button>
          {this.state.answers.map( (answer) => {
            return (
              <div key={answer}>
                <input type='radio' value={answer} name='answer' onFocus={this.onAnswerSelect}/>
                <label>{answer}</label>
              </div>
            )
          })}
        </form>
      </div>
    )
  }
}

export default SurveyQuestion;
