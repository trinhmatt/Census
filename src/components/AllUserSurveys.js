import React from 'react'
import SurveyList from './SurveyList'
import TextFilter from './TextFilter'


const AllUserSurveys = () => (
  <div className='my-surveys'>
    <div className='my-surveys-header'>
      <h1>My Surveys</h1>
      <TextFilter />
    </div>
    <div className='my-surveys-list'>
      <SurveyList onPage={'userSurveys'}/>
    </div>
  </div>
)

export default AllUserSurveys;
