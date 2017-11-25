import React from 'react'
import CreateSurveyQuestion from './CreateSurveyQuestion'

//NEED TO RENDER QUESTIONS ON CLICK
class CreateSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nQuestions: 0
    }
  }
  renderQuestion = () => {
    console.log('fired')
    return <CreateSurveyQuestion />
  }
  loop = () => {
    for (let i=0; i<this.state.nQuestions; i++) {
      this.renderQuestion()
    }
  }
  render() {
    return (
      <div>
        <h1>Create Survey</h1>
        <button onClick={() => {
          this.setState( (prevState) => {
            return {nQuestions: prevState.nQuestions + 1}
          })
        }}>Add Question</button>
        {this.state.nQuestions ? this.loop() : ''}
      </div>
    )
  }
}


export default CreateSurvey;
