import React from 'react'

class SurveyResponse extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      response: props.response,
      formattedResponse: []
    }
  }
  componentDidMount() {
    let formattedResponse = []
    for (const question in this.state.response) {
      if (typeof this.state.response[question] === 'string') {
        formattedResponse.push(
          (<tr>
            <td>{question}</td>
            <td>{this.state.response[question]}</td>
          </tr>)
        )
      } else {
        let answerString = ''
        formattedResponse.push(
          (<tr>
            <td>{question}</td>
            <td>{this.state.response[question].map((answer) => {
              if (this.state.response[question].indexOf(answer) === this.state.response[question].length-1) {
                return answer
              } else {
                return answer + ', '
              }
            })}</td>
          </tr>)
        )
      }
    }
    return this.setState( () => ({formattedResponse}))
  }
  render() {
    return (
      <div>
        <h4>Survey response</h4>
        <table>
          <tr>
            <th>Question</th>
            <th>Response</th>
          </tr>
          <tbody>
            {this.state.formattedResponse}
          </tbody>
        </table>
      </div>
    )
  }
}


export default SurveyResponse;
