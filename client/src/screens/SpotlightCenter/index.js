import React from 'react';
import Aux from './../../hoc/Aux';
import NavBar from "../../components/NavBar";
import axios from "axios";
import Center from "../../components/Center";
import {Form} from "react-bootstrap";
import divWithClassName from "react-bootstrap/cjs/utils/divWithClassName";

class SpotlightCenter extends React.Component {
  state = {
    center: null,
    elementBeingEdited: null,
    images: [null, null, null, null]
  };

  componentDidMount() {
    this.updateAboutUsElements();
  }

  addImage = (evt, type, index) => {
    console.log(evt.target.files);
    const images = [...this.state.images];
    images[index] = {image: evt.target.files[0], type: type, index: index};
    this.setState({images: images});
    console.log(this.state.images);
  };

  updateAboutUsElements = () => {
    if (this.props.match.params.centerUrl === "new") {
      const newAddress = {
        "address": {
          "toShow": "",
          "city": "",
          "zipCode": "",
          "state": ""
        },
        "services": [],
        "title": "",
        "url": "",
        "doctor": "",
        "type": "",
        "thumbImage": "",
        "description": "",
        "about": "",
        "aboutDoctor": "",
        "strengths": [],
        "doctorImage": "",
        "imageOne": "",
        "imageTwo": "",
        "isFeatured": false,
        "__v": 0
      };
      this.setState({center: newAddress});
      this.setState({elementBeingEdited: {...newAddress, address: {...newAddress.address}, services: [...newAddress.services], strengths: [...newAddress.strengths]}});
      return;
    }
    axios.get(`/api/centers/${this.props.match.params.centerUrl}`).then(advisoryBoardMembers => {
      console.log(advisoryBoardMembers.data);
      this.setState({center: advisoryBoardMembers.data.data});
      this.setState({elementBeingEdited: {...advisoryBoardMembers.data.data, address: {...advisoryBoardMembers.data.data.address}, services: [...advisoryBoardMembers.data.data.services], strengths: [...advisoryBoardMembers.data.data.strengths]}});
    });
  };

  onInputChange = (evt) => {
    const elementBeingEdited = {...this.state.elementBeingEdited};
    elementBeingEdited[evt.target.name] = evt.target.value;
    console.log(evt.target.name, evt.target.value);
    this.setState({elementBeingEdited: elementBeingEdited});
  };

  updateElement = (e = null) => {
    if (this.props.match.params.centerUrl !== "new") {
      return this.putData(e);
    }
    this.postData(e)
  };

  postData = (e = null) => {
    if (e !== null) {
      e.preventDefault();
    }
    const formData = new FormData();
    const trackImages = [];
    this.state.images.forEach((image, index) => {
      if (image) {
        console.log(image.image);
        formData.append(`images`, image.image);
        trackImages.push(image.type)
      }
    });
    if (trackImages.length < 4) {
      return alert("All Images is required");
    }
    Object.keys(this.state.elementBeingEdited).forEach(key => formData.append(key, Object(this.state.elementBeingEdited[key]) === this.state.elementBeingEdited[key] ? JSON.stringify(this.state.elementBeingEdited[key]) : this.state.elementBeingEdited[key]));
    console.log(formData);
    formData.append("trackImages", JSON.stringify(trackImages));
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': localStorage.getItem('authToken')
      }
    };
    axios.post(`/api/centers`, formData, config)
      .then((response) => {
        if (response.data.message !== "successful") {
          return;
        }
        this.props.history.push('/centers')
      }).catch((error) => {
    });
  };

  putData = (e = null) => {
    if (e !== null) {
      e.preventDefault();
    }
    const formData = new FormData();
    const trackImages = [];
    this.state.images.forEach((image, index) => {
      if (image) {
        console.log(image.image);
        formData.append(`images`, image.image);
        trackImages.push(image.type)
      }
    });
    Object.keys(this.state.elementBeingEdited).forEach(key => formData.append(key, Object(this.state.elementBeingEdited[key]) === this.state.elementBeingEdited[key] ? JSON.stringify(this.state.elementBeingEdited[key]) : this.state.elementBeingEdited[key]));
    console.log(formData);
    formData.append("trackImages", JSON.stringify(trackImages));
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': localStorage.getItem('authToken')
      }
    };
    axios.put(`/api/centers/${this.props.match.params.centerUrl}`, formData, config)
      .then((response) => {
        if (response.data.message !== "found") {
          return;
        }
        this.updateAboutUsElements();
      }).catch((error) => {
    });
  };

  onSpecialInputChange = (evt, type, index = null) => {
    if (type === "strengths") {
      let elementToBeEdited = {...this.state.elementBeingEdited[type][index]};
      elementToBeEdited[evt.target.name] = evt.target.value;
      const collection = [...this.state.elementBeingEdited[type]];
      collection[index] = elementToBeEdited;
      const superObj = {...this.state.elementBeingEdited};
      superObj[type] = collection;
      this.setState({elementBeingEdited: superObj})
    } else if (type === "services") {
      let elementToBeEdited = evt.target.value;
      const collection = [...this.state.elementBeingEdited[type]];
      collection[index] = elementToBeEdited;
      const superObj = {...this.state.elementBeingEdited};
      superObj[type] = collection;
      this.setState({elementBeingEdited: superObj});
    } else {
      const address = {...this.state.elementBeingEdited.address}
      address[evt.target.name] = evt.target.value;
      const superObj = {...this.state.elementBeingEdited};
      superObj[type] = address;
      this.setState({elementBeingEdited: superObj})
    }
  };

  addNewStrength = () => {
    let elementToBeEdited = {strength: "", number: ""};
    const collection = [...this.state.elementBeingEdited["strengths"]];
    collection.push(elementToBeEdited);
    const superObj = {...this.state.elementBeingEdited};
    superObj["strengths"] = collection;
    this.setState({elementBeingEdited: superObj})
  };

  addNewService = () => {
    let elementToBeEdited = "";
    const collection = [...this.state.elementBeingEdited["services"]];
    collection.push(elementToBeEdited);
    const superObj = {...this.state.elementBeingEdited};
    superObj["services"] = collection;
    this.setState({elementBeingEdited: superObj})
  };

  render() {
    return (<Aux>
      <NavBar/>
      <h1 className="container py-4 text-center">Center</h1>
      <section className="testimonials-banner container d-flex">
        {this.state.elementBeingEdited ? <form key={this.state.elementBeingEdited._id} onSubmit={(evt) => this.updateElement(evt)} className="m-5">
          <div className="w-100 d-flex">
            <div className="w-25">
              <div>
                <p>Thumbnail Image</p>
                <img src={`/${this.state.elementBeingEdited.thumbImage}`} className="w-75" alt=""/>
                <input type="file" name="thumbImage" className="d-inline-block mt-2 btn" onChange={(evt) => this.addImage(evt, "thumbImage", 0)}/>
              </div>
              <div>
                <p>Doctor Image</p>
                <img src={`/${this.state.elementBeingEdited.doctorImage}`} className="w-75" alt=""/>
                <input type="file" name="doctorImage" className="d-inline-block mt-2 btn" onChange={(evt) => this.addImage(evt, "doctorImage", 1)}/>
              </div>
              <div>
                <p>Image One</p>
                <img src={`/${this.state.elementBeingEdited.imageOne}`} className="w-75" alt=""/>
                <input type="file" name="imageOne" className="d-inline-block mt-2 btn" onChange={(evt) => this.addImage(evt, "imageOne", 2)}/>
              </div>
              <div>
                <p>Image Two</p>
                <img src={`/${this.state.elementBeingEdited.imageTwo}`} className="w-75" alt=""/>
                <input type="file" name="imageTwo" className="d-inline-block mt-2 btn" onChange={(evt) => this.addImage(evt, "imageTwo", 3)}/>
              </div>
            </div>
            <div className="w-75">
              <h1>Basic Info</h1>
              <label>Title</label>
              <input className="w-100 form-control" name="title" onChange={this.onInputChange} value={this.state.elementBeingEdited.title}/>
              <label>Url</label>
              <input className="w-100 form-control" name="url" onChange={this.onInputChange} value={this.state.elementBeingEdited.url}/>
              <label>Doctor</label>
              <input className="w-100 form-control" name="doctor" onChange={this.onInputChange} value={this.state.elementBeingEdited.doctor}/>
              <label>Type</label>
              <input className="w-100 form-control" name="type" onChange={this.onInputChange} value={this.state.elementBeingEdited.type}/>
              <label>About Doctor</label>
              <textarea className="w-100 form-control" name="aboutDoctor" rows="2" onChange={this.onInputChange} value={this.state.elementBeingEdited.aboutDoctor}/> <br/>
              <label>Center Description</label>
              <textarea className="w-100 form-control" name="description" rows="2" onChange={this.onInputChange} value={this.state.elementBeingEdited.description}/> <br/>
              <label>About Center</label>
              <textarea className="w-100 form-control" name="about" rows="2" onChange={this.onInputChange} value={this.state.elementBeingEdited.about}/> <br/>
              <div key="inline-radio" className="mb-3">
                <p>Featured?</p>
                <Form.Check inline label="Yes" onChange={this.onInputChange} name="isFeatured" value={true} type="radio" id="inline-radio-1" />
                <Form.Check inline label="No" onChange={this.onInputChange} name="isFeatured" value={false} type="radio" id="inline-radio-2" />
              </div>
              <h1 className="mt-5">Strengths</h1>
              <div>
                {this.state.elementBeingEdited.strengths.map((strength, index) => {
                  return <div className="d-flex mt-2">
                    <input className="w-25 form-control mr-3" name="number" onChange={(evt) => this.onSpecialInputChange(evt, "strengths", index)} value={strength.number}/>
                    <input className="w-50 form-control" name="strength" onChange={(evt) => this.onSpecialInputChange(evt, "strengths", index)} value={strength.strength}/>
                  </div>
                })}
                <button onClick={this.addNewStrength} className="btn btn-secondary mt-2 w-25">Add Strength</button>
              </div>
              <h1 className="mt-5">Services</h1>
              <div>
                {this.state.elementBeingEdited.services.map((strength, index) => {
                  return <div className="d-flex mt-2">
                    <input className="w-50 form-control" name="service" onChange={(evt) => this.onSpecialInputChange(evt, "services", index)} value={strength}/>
                  </div>
                })}
                <button onClick={this.addNewService} className="btn btn-secondary mt-2 w-25">Add Service</button>
              </div>
              <h1 className="mt-5">Address</h1>
              <label>City</label>
              <input className="w-100 form-control" name="city" onChange={(evt) => this.onSpecialInputChange(evt, "address")} value={this.state.elementBeingEdited.address.city}/>
              <label>Zip Code</label>
              <input className="w-100 form-control" name="zipCode" onChange={(evt) => this.onSpecialInputChange(evt, "address")} value={this.state.elementBeingEdited.address.zipCode}/>
              <label>State</label>
              <input className="w-100 form-control" name="state" onChange={(evt) => this.onSpecialInputChange(evt, "address")} value={this.state.elementBeingEdited.address.state}/>
              <label>Display Address</label>
              <textarea className="w-100 form-control" name="toShow" rows="2" onChange={(evt) => this.onSpecialInputChange(evt, "address")} value={this.state.elementBeingEdited.address.toShow}/> <br/>
              <button onClick={this.updateElement} className="btn btn-success mt-5 w-25">Update</button>
              <button onClick={() => this.props.history.push('/centers')} className="btn btn-danger mt-5 ml-3 w-25">Cancel</button>
            </div>
          </div>
        </form> : null}
      </section>
    </Aux>);
  }
}

export default SpotlightCenter;