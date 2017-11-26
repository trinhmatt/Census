import React from 'react'

const SurveyQuestion = (props) => {
  return (
    <div>
      <p>{props.question.question}</p>
      <form>
        {props.question.answers.map( (answer) => {
          return <div><input type='radio' value={answer} name='answer'/><label>{answer}</label></div>
        })}
      </form>
    </div>
  )
}

export default SurveyQuestion;
