import React from 'react';
import SurveyList from './SurveyList'
import TextFilter from './TextFilter'

const Dashboard = () => (
  <div>
    <h1>Dashboard</h1>
    <h2>All Surveys</h2>
    <TextFilter />
    <SurveyList onPage={'dashboard'}/>
  </div>
)

export default Dashboard;
