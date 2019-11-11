import React, { Component } from 'react';
import {BrowserRouter, Redirect, Route} from 'react-router-dom';
import './App.scss';
import './scss/index.css';
import isAuthenticated from "./utils/authStatus";
import Dashboard from "./views/Dashboard/index";
import Login from "./views/Pages/Login";
import Testimonials from "./screens/Testimonials/testimonials";
import News from "./screens/News/news";
import Sponsors from "./screens/Sponsors/sponsors";
import MediaMentions from "./screens/MediaMentions/mediaMentions";
import AdvisoryBoardMembers from "./screens/AdvisoryBoardMembers/AdvisoryBoardMembers";
import ClinicalConsultants from "./screens/ClinicalConsultants/clinicalConsultants";
import ClinicalExperts from "./screens/ClinicalExperts/clinicalExperts";
import ManagementTeamMembers from "./screens/ManagementTeamMembers/managementTeamMembers";
import HomeSubscriptions from "./screens/HomeSubscriptions/homeSubscriptions";
import ProgramAssistances from "./screens/ProgramAssistances/programAssistances";
import Schools from "./screens/Schools/schools";
import CenterLocations from "./screens/CenterLocations/centerLocations";
import Centers from "./screens/Centers/centers";
import SpotlightCenter from "./screens/SpotlightCenter/spotlightCenter";


class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path='/login' exact component={Login} />
          <Route path='/' exact component={Dashboard} />
          <Route path='/dashboard' exact component={Dashboard} />
          <Route path='/home/testimonials' exact component={Testimonials} />
          <Route path='/home/news' exact component={News} />
          <Route path='/home/sponsors' exact component={Sponsors} />
          <Route path='/home/media-mentions' exact component={MediaMentions} />
          <Route path='/about-us/advisory-board-members' exact component={AdvisoryBoardMembers} />
          <Route path='/about-us/clinical-consultants' exact component={ClinicalConsultants} />
          <Route path='/about-us/clinical-experts' exact component={ClinicalExperts} />
          <Route path='/about-us/management-team-members' exact component={ManagementTeamMembers} />
          <Route path='/home-based-program/home-based-subscriptions' exact component={HomeSubscriptions} />
          <Route path='/home-based-program/program-assistance' exact component={ProgramAssistances} />
          <Route path='/schools/schools' exact component={Schools} />
          <Route path='/schools/center-locations' exact component={CenterLocations} />
          <Route path='/centers' exact component={Centers} />
          <Route path='/centers/:centerUrl' exact component={SpotlightCenter} />
          {isAuthenticated() ? null : <Redirect to='/login' />}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
