import React, {Component} from 'react';
import {Row} from 'reactstrap';
import axios from "axios";
import Aux from './../../../hoc/Aux';
import ClinicalConsultantForm from "../../../components/ClinicalConsultantForm";
import ClinicalConsultantCard from "../../../components/ClinicalConsultantCard";

class ClinicalConsultantCards extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      clinicalConsultants: [],
      collapse: true,
      fadeIn: true,
      timeout: 300,
      editableElement: null,
      elementBeingEdited: null,
      uploadedImage: null,
    };
  }

  toggle() {
    this.setState({collapse: !this.state.collapse});
  }

  toggleFade() {
    this.setState((prevState) => {
      return {fadeIn: !prevState}
    });
  }

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
    this.updateHomeElements();
  }

  updateHomeElements = () => {
    axios.get('/api/aboutUs/clinicalConsultants').then(testimonials => {
      console.log(testimonials.data);
      this.setState({clinicalConsultants: testimonials.data.data});
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
    if (!this.state.uploadedImage || this.state.uploadedImage.type !== this.state.elementBeingEdited.type || this.state.uploadedImage.index !== this.state.elementBeingEdited.index) {
      return alert("Image is required");
    }
    formData.append('image', this.state.uploadedImage.image);
    Object.keys(this.state.elementBeingEdited).forEach(key => formData.append(key, this.state.elementBeingEdited[key]));
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': localStorage.getItem('authToken')
      }
    };
    axios.post(`/api/aboutUs/${this.state.elementBeingEdited.type}`, formData, config)
      .then((response) => {
        if (response.data.message !== "successful") {
          return;
        }
        this.cancelEditing();
        this.updateHomeElements();
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
        this.updateHomeElements();
      }).catch((error) => {
    });
  };

  toggleNew = (type) => {
    const newToggleMap = {
      clinicalConsultants: {
        image: '',
        name: '',
        designation: '',
        about: '',
        type: type,
        index: 0
      },
      news: {
        title: '',
        link: '',
        image: '',
        date: '',
        type: type,
        index: 0
      },
      mediaMentions: {
        text: '',
        image: '',
        type: type,
        index: 0
      },
      sponsors: {
        name: '',
        image: '',
        type: type,
        index: 0
      }
    };
    const newElement = newToggleMap[type];
    this.setState({editableElement: newElement});
    this.setState({elementBeingEdited: newElement});
    let newList = this.state[type];
    newList = [newElement, ...newList];
    this.setState({[type]: newList});
  };

  delete = (type, id) => {
    const config = {
      headers: {
        'content-type': 'application/form-data',
        'Authorization': localStorage.getItem('authToken')
      }
    };

    axios.delete(`/api/aboutUs/${type}/${id}`, config)
      .then((response) => {
        console.log(response.data.message.includes("deleted"));
        if (!response.data.message.includes("deleted")) {
          return;
        }
        this.updateHomeElements();
      }).catch((error) => {
    });
  };

  render() {
    let testimonialSection = <Aux>
      {this.state.clinicalConsultants.map((clinicalConsultant, index) => {
        return this.state.editableElement === clinicalConsultant ?
          <ClinicalConsultantForm addImage={(evt) => this.addImage(evt, "clinicalConsultants", index)}
                                  cancelEditing={this.cancelEditing}
                                  onInputChange={this.onInputChange}
                                  updateElement={this.updateElement}
                                  clinicalConsultant={this.state.elementBeingEdited}/> :
          <ClinicalConsultantCard edit={() => this.edit("clinicalConsultants", index)}
                                  key={clinicalConsultant._id}
                                  delete={() => this.delete("clinicalConsultants", clinicalConsultant._id)}
                                  clinicalConsultant={clinicalConsultant}/>
      })}
    </Aux>;
    return (
      <div className="animated fadeIn">
        <button className="btn btn-primary m-4" onClick={() => this.toggleNew("clinicalConsultants")}>Add new
          clinical consultant
        </button>
        <Row>
          {testimonialSection}
        </Row>
      </div>
    );
  }
}

export default ClinicalConsultantCards;
