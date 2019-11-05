import React from 'react';
import Aux from './../../hoc/Aux';
import NavBar from "../../components/NavBar";
import {Accordion, Card} from "react-bootstrap";
import axios from "axios";
import School from "../../components/School";
import SchoolForm from "../../components/SchoolForm";
import CityCenterCountForm from "../../components/CityCenterCountForm";
import CityCenterCount from "../../components/CityCenterCount";

class SchoolScreen extends React.Component {
  state = {
    schools: [],
    cityCenterCounts: [],
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
    axios.get('/api/schools/schools').then(advisoryBoardMembers => {
      console.log(advisoryBoardMembers.data);
      this.setState({schools: advisoryBoardMembers.data.data});
    });
    axios.get('/api/schools/cityCenterCounts').then(advisoryBoardMembers => {
      console.log(advisoryBoardMembers.data);
      this.setState({cityCenterCounts: advisoryBoardMembers.data.data});
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
    axios.post(`/api/schools/${this.state.elementBeingEdited.type}`, reqBody, config)
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
    axios.put(`/api/schools/${this.state.elementBeingEdited.type}/${this.state[this.state.elementBeingEdited.type][this.state.elementBeingEdited.index]._id}`, formData, config)
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
      schools: {
        image: '',
        description: '',
        link: '',
        type: type,
        index: 0
      },
      cityCenterCounts: {
        city: '',
        count: '',
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
    let schools = <Card.Body>
      <button className="btn btn-primary m-4" onClick={() => this.toggleNew("schools")}>Add new School
      </button>
      {this.state.schools.map((school, index) => {
        return this.state.editableElement === school ?
          <SchoolForm addImage={(evt) => this.addImage(evt, "schools", index)}
                                cancelEditing={this.cancelEditing}
                                onInputChange={this.onInputChange}
                                updateElement={this.updateElement}
                                school={this.state.elementBeingEdited}/> :
          <School edit={() => this.edit("schools", index)}
                            key={school._id}
                            school={school}/>
      })}
    </Card.Body>;

    let centerLocations = <Card.Body>
      <button className="btn btn-primary m-4" onClick={() => this.toggleNew("cityCenterCounts")}>Add new City Centers Count
      </button>
      {this.state.cityCenterCounts.map((cityCenterCount, index) => {
        return this.state.editableElement === cityCenterCount ?
          <CityCenterCountForm addImage={(evt) => this.addImage(evt, "cityCenterCounts", index)}
                      cancelEditing={this.cancelEditing}
                      onInputChange={this.onInputChange}
                      updateElement={this.updateElement}
                      cityCenterCount={this.state.elementBeingEdited}/> :
          <CityCenterCount edit={() => this.edit("cityCenterCounts", index)}
                  key={cityCenterCount._id}
                  cityCenterCount={cityCenterCount}/>
      })}
    </Card.Body>;

    return (<Aux>
      <NavBar/>
      <h1 className="container py-4 text-center">Home Based Program</h1>
      <section className="testimonials-banner container">
        <Accordion>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              <h2>Schools</h2>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              {schools}
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              <h2>Center Locations</h2>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              {centerLocations}
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </section>
    </Aux>);
  }
}

export default SchoolScreen;