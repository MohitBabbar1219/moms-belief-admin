import React from 'react';
import Aux from './../../hoc/Aux';
import NavBar from "../../components/NavBar";
import {Accordion, Card} from "react-bootstrap";
import axios from "axios";
import AdvisoryBoardMember from "../../components/AdvisoryBoardMember";
import AdvisoryBoardMemberForm from "../../components/AdvisoryBoardMemberForm";
import ClinicalConsultantForm from "../../components/ClinicalConsultantForm";
import ClinicalConsultant from "../../components/ClinicalConsultant";
import ClinicalExpertForm from "../../components/ClinicalExpertForm";
import ClinicalExpert from "../../components/ClinicalExpert";
import ManagementTeamMemberForm from "../../components/ManagementTeamMemberForm";
import ManagementTeamMember from "../../components/ManagementTeamMember";

class AboutUs extends React.Component {
  state = {
    advisoryBoardMembers: [],
    clinicalConsultants: [],
    clinicalExperts: [],
    managementTeamMembers: [],
    editableElement: null,
    elementBeingEdited: null,
    uploadedImage: null,
  };

  edit = (type, index) => {
    console.log(this.state[type][index]);
    this.setState({editableElement: this.state[type][index]});
    this.setState({elementBeingEdited: {...this.state[type][index], type: type, index: index}});
  };

  cancelEditing = () => {
    if (!this.state.elementBeingEdited._id) {
      const listOfElements = this.state[this.state.elementBeingEdited.type].filter((element, index) => index !== this.state.elementBeingEdited.index);
      this.setState({[this.state.elementBeingEdited.type]: listOfElements});
    }
    this.setState({editableElement: null});
    this.setState({elementBeingEdited: null});
    this.setState({uploadedImage: null});
  };

  componentDidMount() {
    this.updateAboutUsElements();
  }

  updateAboutUsElements = () => {
    axios.get('/api/aboutUs/advisoryBoardMembers').then(advisoryBoardMembers => {
      console.log(advisoryBoardMembers.data);
      this.setState({advisoryBoardMembers: advisoryBoardMembers.data.data});
    });

    axios.get('/api/aboutUs/clinicalConsultants').then(advisoryBoardMembers => {
      console.log(advisoryBoardMembers.data);
      this.setState({clinicalConsultants: advisoryBoardMembers.data.data});
    });

    axios.get('/api/aboutUs/clinicalExperts').then(advisoryBoardMembers => {
      console.log(advisoryBoardMembers.data);
      this.setState({clinicalExperts: advisoryBoardMembers.data.data});
    });

    axios.get('/api/aboutUs/managementTeamMembers').then(advisoryBoardMembers => {
      console.log(advisoryBoardMembers.data);
      this.setState({managementTeamMembers: advisoryBoardMembers.data.data});
    });
  };

  addImage = (evt, type, index) => {
    console.log(evt.target.files);
    this.setState({uploadedImage: {image: evt.target.files[0], type: type, index: index}});
  };

  onInputChange = (evt) => {
    const elementBeingEdited = {...this.state.elementBeingEdited};
    elementBeingEdited[evt.target.name] = evt.target.value;
    this.setState({elementBeingEdited: elementBeingEdited});
  };

  updateElement = (e = null) => {
    if (this.state.elementBeingEdited._id) {
      return this.putData(e);
    }
    this.postData(e)
  };

  postData = (e = null) => {
    if (e !== null) {
      e.preventDefault();
    }
    const formData = new FormData();
    if (Object.keys(this.state.elementBeingEdited).includes('image') && (!this.state.uploadedImage || this.state.uploadedImage.type !== this.state.elementBeingEdited.type || this.state.uploadedImage.index !== this.state.elementBeingEdited.index)) {
      return alert("Image is required");
    }
    if (!!this.state.uploadedImage && this.state.uploadedImage.type === this.state.elementBeingEdited.type && this.state.uploadedImage.index === this.state.elementBeingEdited.index) {
      formData.append('image', this.state.uploadedImage.image);
    }
    console.log(Object.keys(this.state.elementBeingEdited));
    Object.keys(this.state.elementBeingEdited).forEach(key => formData.append(key, this.state.elementBeingEdited[key]));
    console.log(JSON.stringify(this.state.elementBeingEdited, null, 2));
    const contentType = Object.keys(this.state.elementBeingEdited).includes('image') ? 'multipart/form-data' : 'application/json';
    const reqBody = Object.keys(this.state.elementBeingEdited).includes('image') ? formData : this.state.elementBeingEdited;
    const config = {
      headers: {
        'content-type': contentType,
        'Authorization': localStorage.getItem('authToken')
      }
    };
    axios.post(`/api/aboutUs/${this.state.elementBeingEdited.type}`, reqBody, config)
      .then((response) => {
        if (response.data.message !== "successful") {
          return;
        }
        this.cancelEditing();
        this.updateAboutUsElements();
      }).catch((error) => {
    });
  };

  putData = (e = null) => {
    if (e !== null) {
      e.preventDefault();
    }
    const formData = new FormData();
    if (!!this.state.uploadedImage && this.state.uploadedImage.type === this.state.elementBeingEdited.type && this.state.uploadedImage.index === this.state.elementBeingEdited.index) {
      formData.append('image', this.state.uploadedImage.image);
    }
    Object.keys(this.state.elementBeingEdited).forEach(key => formData.append(key, this.state.elementBeingEdited[key]));
    console.log(formData);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': localStorage.getItem('authToken')
      }
    };
    axios.put(`/api/aboutUs/${this.state.elementBeingEdited.type}/${this.state[this.state.elementBeingEdited.type][this.state.elementBeingEdited.index]._id}`, formData, config)
      .then((response) => {
        if (response.data.message !== "found") {
          return;
        }
        this.cancelEditing();
        this.updateAboutUsElements();
      }).catch((error) => {
    });
  };

  toggleNew = (type) => {
    const newToggleMap = {
      advisoryBoardMembers: {
        name: '',
        designation: '',
        about: '',
        type: type,
        index: 0
      },
      clinicalConsultants: {
        image: '',
        name: '',
        designation: '',
        about: '',
        type: type,
        index: 0
      },
      clinicalExperts: {
        image: '',
        name: '',
        designation: '',
        link: '',
        about: '',
        type: type,
        index: 0
      },
      managementTeamMembers: {
        image: '',
        name: '',
        designation: '',
        about: '',
        type: type,
        index: 0
      },
    };
    const newElement = newToggleMap[type];
    this.setState({editableElement: newElement});
    this.setState({elementBeingEdited: newElement});
    let newList = this.state[type];
    newList = [newElement, ...newList];
    this.setState({[type]: newList});
  };

  render() {
    let advisoryBoardMembersSection = <Card.Body>
      <button className="btn btn-primary m-4" onClick={() => this.toggleNew("advisoryBoardMembers")}>Add new Advisory
        Board Member
      </button>
      {this.state.advisoryBoardMembers.map((advisoryBoardMember, index) => {
        return this.state.editableElement === advisoryBoardMember ?
          <AdvisoryBoardMemberForm addImage={(evt) => this.addImage(evt, "advisoryBoardMembers", index)}
                                   cancelEditing={this.cancelEditing}
                                   onInputChange={this.onInputChange}
                                   updateElement={this.updateElement}
                                   advisoryBoardMember={this.state.elementBeingEdited}/> :
          <AdvisoryBoardMember edit={() => this.edit("advisoryBoardMembers", index)}
                               key={advisoryBoardMember._id}
                               advisoryBoardMember={advisoryBoardMember}/>
      })}
    </Card.Body>;

    let clinicalConsultants = <Card.Body>
      <button className="btn btn-primary m-4" onClick={() => this.toggleNew("clinicalConsultants")}>Add new Clinical Consultant
      </button>
      {this.state.clinicalConsultants.map((advisoryBoardMember, index) => {
        return this.state.editableElement === advisoryBoardMember ?
          <ClinicalConsultantForm addImage={(evt) => this.addImage(evt, "clinicalConsultants", index)}
                                  cancelEditing={this.cancelEditing}
                                  onInputChange={this.onInputChange}
                                  updateElement={this.updateElement}
                                  clinicalConsultant={this.state.elementBeingEdited}/> :
          <ClinicalConsultant edit={() => this.edit("clinicalConsultants", index)}
                              key={advisoryBoardMember._id}
                              clinicalConsultant={advisoryBoardMember}/>
      })}
    </Card.Body>;

    let clinicalExperts = <Card.Body>
      <button className="btn btn-primary m-4" onClick={() => this.toggleNew("clinicalExperts")}>Add new Clinical Consultant
      </button>
      {this.state.clinicalExperts.map((clinicalExpert, index) => {
        return this.state.editableElement === clinicalExpert ?
          <ClinicalExpertForm addImage={(evt) => this.addImage(evt, "clinicalExperts", index)}
                                  cancelEditing={this.cancelEditing}
                                  onInputChange={this.onInputChange}
                                  updateElement={this.updateElement}
                                  clinicalExpert={this.state.elementBeingEdited}/> :
          <ClinicalExpert edit={() => this.edit("clinicalExperts", index)}
                              key={clinicalExpert._id}
                              clinicalExpert={clinicalExpert}/>
      })}
    </Card.Body>;

    let managementTeamMembers = <Card.Body>
      <button className="btn btn-primary m-4" onClick={() => this.toggleNew("managementTeamMembers")}>Add New Management Team Members</button>
      {this.state.managementTeamMembers.map((clinicalExpert, index) => {
        return this.state.editableElement === clinicalExpert ?
          <ManagementTeamMemberForm addImage={(evt) => this.addImage(evt, "managementTeamMembers", index)}
                              cancelEditing={this.cancelEditing}
                              onInputChange={this.onInputChange}
                              updateElement={this.updateElement}
                              managementTeamMember={this.state.elementBeingEdited}/> :
          <ManagementTeamMember edit={() => this.edit("managementTeamMembers", index)}
                          key={clinicalExpert._id}
                          managementTeamMember={clinicalExpert}/>
      })}
    </Card.Body>;

    return (<Aux>
      <NavBar/>
      <h1 className="container py-4 text-center">About Us</h1>
      <section className="testimonials-banner container">
        <Accordion>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              <h2>Advisory Board Members</h2>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              {advisoryBoardMembersSection}
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              <h2>Clinical Consultants</h2>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              {clinicalConsultants}
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="2">
              <h2>Clinical Experts</h2>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              {clinicalExperts}
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="3">
              <h2>Management Team Members</h2>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="3">
              {managementTeamMembers}
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </section>
    </Aux>);
  }
}

export default AboutUs;