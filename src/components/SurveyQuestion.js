import React from 'react'

class SurveyQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: props.question.question,
      answers: props.question.answers,
      selectedAnswers: [],
      type: props.type
    }
  }
  simulateClick = (e) => {
    e.target.parentNode.parentNode.firstChild.click()
  }
  onAnswerSelect = (e) => {
    e.persist()
    const selectedAnswer = e.target.value;
    if (this.state.selectedAnswers.indexOf(selectedAnswer) > -1) {
      this.setState( (prevState) => ({
        selectedAnswers: prevState.selectedAnswers.filter( (answer) => {
          return answer !== selectedAnswer
        })}),
      this.simulateClick.bind(this,e)
      )
    } else {
      this.setState((prevState) => (
        {selectedAnswers: [...prevState.selectedAnswers, selectedAnswer]}),
        this.simulateClick.bind(this,e)
      )
    }
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(({question: this.state.question, selectedAnswer: this.state.selectedAnswers}))
  }
  render() {
    return (
      <div>
        <p>{this.state.question}</p>
        <form onSubmit={this.onSubmit}>
          {/* Button needed to submit answer data */}
          <button style={{display:'none'}}>Submit answer</button>
          {this.state.answers.map( (answer) => {
            if (this.state.type === 'SA') {
              return (
                <div key={answer}>
                  <input type='radio' value={answer} name='answer' onFocus={this.onAnswerSelect}/>
                  <label>{answer}</label>
                </div>
              )
            } else {
              return (
                <div key={answer}>
                  <input type='checkbox' value={answer} name='answer' onClick={this.onAnswerSelect}/>
                  <label>{answer}</label>
                </div>
              )
            }

          })}
        </form>
      </div>
    )
  }
}

export default SurveyQuestion;
