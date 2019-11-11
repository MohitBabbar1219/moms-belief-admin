import React, {Component} from 'react';
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
import Register from "./views/Pages/Register";
import SomeRouter from "./components/SomeRoute";


class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <SomeRouter allow path='/login' exact component={Login}/>
          <SomeRouter path='/register' allow exact component={Register}/>
          <SomeRouter path='/' exact component={Dashboard}/>
          <SomeRouter path='/dashboard' exact component={Dashboard}/>
          <SomeRouter path='/home/testimonials' exact component={Testimonials}/>
          <SomeRouter path='/home/news' exact component={News}/>
          <SomeRouter path='/home/sponsors' exact component={Sponsors}/>
          <SomeRouter path='/home/media-mentions' exact component={MediaMentions}/>
          <SomeRouter path='/about-us/advisory-board-members' exact component={AdvisoryBoardMembers}/>
          <SomeRouter path='/about-us/clinical-consultants' exact component={ClinicalConsultants}/>
          <SomeRouter path='/about-us/clinical-experts' exact component={ClinicalExperts}/>
          <SomeRouter path='/about-us/management-team-members' exact component={ManagementTeamMembers}/>
          <SomeRouter path='/home-based-program/home-based-subscriptions' exact component={HomeSubscriptions}/>
          <SomeRouter path='/home-based-program/program-assistance' exact component={ProgramAssistances}/>
          <SomeRouter path='/schools/schools' exact component={Schools}/>
          <SomeRouter path='/schools/center-locations' exact component={CenterLocations}/>
          <SomeRouter path='/centers' exact component={Centers}/>
          <SomeRouter path='/centers/:centerUrl' exact component={SpotlightCenter}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
