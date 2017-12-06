import React from 'react'
import { Link } from 'react-router-dom'

const CompletedSurvey = () => (
  <div className='completed-survey-page'>
    <h1>Thank you for your participation</h1>
    <p>Your response has been recorded.</p>
    <Link to='/dashboard'>Go back to the dashboard</Link>
  </div>
)

export default CompletedSurvey;
