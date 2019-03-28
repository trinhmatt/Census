import React from 'react';
import SurveyList from './SurveyList'
import TextFilter from './TextFilter'

const AllSurveys = () => (
  <div className='dashboard'>
    <h1>All Surveys</h1>
    <div className='dashboard-header'>
      <TextFilter />
    </div>
    <SurveyList onPage={'dashboard'}/>
  </div>
)

export default AllSurveys;
