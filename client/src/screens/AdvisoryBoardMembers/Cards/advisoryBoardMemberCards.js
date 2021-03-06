import React, {Component} from 'react';
import {Row} from 'reactstrap';
import axios from "axios";
import Aux from './../../../hoc/Aux';
import AdvisoryBoardMemberForm from "../../../components/AdvisoryBoardMemberForm";
import AdvisoryBoardMemberCard from "../../../components/AdvisoryBoardMemberCard";

class AdvisoryBoardMemberCards extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      advisoryBoardMembers: [],
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
    axios.get('/api/aboutUs/advisoryBoardMembers').then(testimonials => {
      console.log(testimonials.data);
      this.setState({advisoryBoardMembers: testimonials.data.data});
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
      {this.state.advisoryBoardMembers.map((advisoryBoardMember, index) => {
        return this.state.editableElement === advisoryBoardMember ?
          <AdvisoryBoardMemberForm addImage={(evt) => this.addImage(evt, "advisoryBoardMembers", index)}
                                   cancelEditing={this.cancelEditing}
                                   onInputChange={this.onInputChange}
                                   updateElement={this.updateElement}
                                   advisoryBoardMember={this.state.elementBeingEdited}/> :
          <AdvisoryBoardMemberCard edit={() => this.edit("advisoryBoardMembers", index)}
                                   key={advisoryBoardMember._id}
                                   delete={() => this.delete("advisoryBoardMembers", advisoryBoardMember._id)}
                                   advisoryBoardMember={advisoryBoardMember}/>
      })}
    </Aux>;
    return (
      <div className="animated fadeIn">
        <button className="btn btn-primary m-4" onClick={() => this.toggleNew("advisoryBoardMembers")}>Add new
          advisory board member
        </button>
        <Row>
          {testimonialSection}
        </Row>
      </div>
    );
  }
}

export default AdvisoryBoardMemberCards;
