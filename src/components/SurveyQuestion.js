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

    this.setState(() => {
      return {selectedAnswers: [selectedAnswer]}
    })
  }
  onCustomInputClick = (e) => {
    //Unchecked radio = the child of the label
    //To simulate a click on the button from the radio button, you need to go up two elements
    if (e.target.id === 'unchecked-radio' || e.target.id === 'unchecked-checkbox') {
      e.target.parentNode.parentNode.firstChild.click()
    } else if (e.target.id === 'checked-radio' || e.target.id === 'checked-checkbox') {
      e.target.parentNode.parentNode.parentNode.firstChild.click()
    } else {
      e.target.parentNode.firstChild.click()
    }
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
                  <label onClick={this.onCustomInputClick}>
                    <span onClick={this.onCustomInputClick} id='unchecked-radio'>
                      <div>
                        <span onClick={this.onCustomInputClick} id='checked-radio'></span>
                      </div>

                    </span>  <p>{answer}</p>
                  </label>
                </div>
              )
            } else {
              return (
                <div id='mc-answer' key={answer}>
                  <input style={{'display': 'none'}} type='checkbox' value={answer} name='answer' onClick={this.onCheckSelect}/>
                  <label onClick={this.onCustomInputClick}>
                    <span onClick={this.onCustomInputClick} id='unchecked-checkbox'>
                      <span onClick={this.onCustomInputClick} id='checked-checkbox'></span>
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
