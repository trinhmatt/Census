import React from 'react'
import SurveyList from './SurveyList'
import { connect } from 'react-redux'


const AllUserSurveys = () => (
  <div>
    <h1>My Surveys</h1>
    <SurveyList onPage={'userSurveys'}/>
  </div>
)

export default AllUserSurveys;
