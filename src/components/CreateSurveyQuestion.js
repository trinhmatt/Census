import React from 'react'

export default class CreateSurveyQuestion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      question: '',
      answers: []
    }
  }
  onQuestionChange = (e) => {
    const question = e.target.value;
    this.setState( () => ({question}) )
  }
  render() {
    return (
      <div>
        <form>
          <input type='text' placeholder='question' value={this.state.question} onChange={this.onQuestionChange}/>
        </form>
      </div>
    )
  }
}
