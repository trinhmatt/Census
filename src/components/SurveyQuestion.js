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
  onCheckSelect = (e) => {
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
  onRadioSelect = (e) => {
    const selectedAnswer = e.target.value
    console.log('fired')

    this.setState(() => {
      return {selectedAnswers: [selectedAnswer]}
    })
  }
  onCustomInputClick = (e) => {
    e.target.parentNode.parentNode.firstChild.click()
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(({question: this.state.question, selectedAnswer: this.state.selectedAnswers}))
  }
  render() {
    return (
      <div id='survey-mc-question'>
        <p>{this.state.question}</p>
        <form onSubmit={this.onSubmit}>
          {/* Button needed to submit answer data */}
          <button style={{display:'none'}}>Submit answer</button>
          {this.state.answers.map( (answer) => {
            if (this.state.type === 'SA') {
              return (
                <div id='mc-answer' key={answer}>
                  <input style={{'display': 'none'}} type='radio' value={answer} name='answer' onClick={this.onRadioSelect}/>
                  <label>
                    <span onClick={this.onCustomInputClick} id='unchecked-radio'>
                      <span id='checked-radio'></span>
                    </span>  {answer}
                  </label>
                </div>
              )
            } else {
              return (
                <div id='mc-answer' key={answer}>
                  <input style={{'display': 'none'}} type='checkbox' value={answer} name='answer' onClick={this.onCheckSelect}/>
                  <label>
                    <span onClick={this.onCustomInputClick} id='unchecked-checkbox'>
                      <span id='checked-checkbox'></span>
                    </span>  {answer}
                  </label>
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
