import React from 'react'
import SurveyList from './SurveyList'
import TextFilter from './TextFilter'


const AllUserSurveys = () => (
  <div>
    <h1>My Surveys</h1>
    <TextFilter />
    <SurveyList onPage={'userSurveys'}/>
  </div>
)

export default AllUserSurveys;
