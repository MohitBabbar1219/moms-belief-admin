import React, {Component} from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Input, Label} from 'reactstrap';
import axios from "axios";
import {withRouter} from "react-router-dom";

class SpotlightCenterForm extends Component {
  state = {
    center: null,
    elementBeingEdited: null,
    images: [null, null, null, null],
    collapse: true,
    fadeIn: true,
    timeout: 300,
  };

  toggle = () => {
    this.setState({collapse: !this.state.collapse});
  }

  toggleFade = () => {
    this.setState((prevState) => {
      return {fadeIn: !prevState}
    });
  }

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
      this.setState({
        elementBeingEdited: {
          ...newAddress,
          address: {...newAddress.address},
          services: [...newAddress.services],
          strengths: [...newAddress.strengths]
        }
      });
      return;
    }
    axios.get(`/api/centers/${this.props.match.params.centerUrl}`).then(advisoryBoardMembers => {
      console.log(advisoryBoardMembers.data);
      this.setState({center: advisoryBoardMembers.data.data});
      this.setState({
        elementBeingEdited: {
          ...advisoryBoardMembers.data.data,
          address: {...advisoryBoardMembers.data.data.address},
          services: [...advisoryBoardMembers.data.data.services],
          strengths: [...advisoryBoardMembers.data.data.strengths]
        }
      });
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
    console.log("in post data functions")
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
        this.props.history.push('/centers');
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
    return (
      <div className="animated fadeIn">
        {this.state.elementBeingEdited ? <Card>
          <CardHeader>
            <strong>Add New</strong>
          </CardHeader>
          <CardBody>
            <Form onSubmit={(evt) => this.updateElement(evt)}>
              <div className="w-100 d-flex">
                <div className="w-25">
                  <div>
                    <p>Thumbnail Image</p>
                    <img src={`/${this.state.elementBeingEdited.thumbImage}`} className="w-75" alt=""/>
                    <input type="file" name="thumbImage" className="d-inline-block mt-2 btn"
                           onChange={(evt) => this.addImage(evt, "thumbImage", 0)}/>
                  </div>
                  <div>
                    <p>Doctor Image</p>
                    <img src={`/${this.state.elementBeingEdited.doctorImage}`} className="w-75" alt=""/>
                    <input type="file" name="doctorImage" className="d-inline-block mt-2 btn"
                           onChange={(evt) => this.addImage(evt, "doctorImage", 1)}/>
                  </div>
                  <div>
                    <p>Image One</p>
                    <img src={`/${this.state.elementBeingEdited.imageOne}`} className="w-75" alt=""/>
                    <input type="file" name="imageOne" className="d-inline-block mt-2 btn"
                           onChange={(evt) => this.addImage(evt, "imageOne", 2)}/>
                  </div>
                  <div>
                    <p>Image Two</p>
                    <img src={`/${this.state.elementBeingEdited.imageTwo}`} className="w-75" alt=""/>
                    <input type="file" name="imageTwo" className="d-inline-block mt-2 btn"
                           onChange={(evt) => this.addImage(evt, "imageTwo", 3)}/>
                  </div>
                </div>
                <div className="w-75">
                  <h1>Basic Info</h1>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Title</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="text-input" name="title" onChange={this.onInputChange}
                             value={this.state.elementBeingEdited.title}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Url</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="text-input" name="url" onChange={this.onInputChange}
                             value={this.state.elementBeingEdited.url}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Doctor</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="text-input" name="doctor" onChange={this.onInputChange}
                             value={this.state.elementBeingEdited.doctor}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Type</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="text-input" name="type" onChange={this.onInputChange}
                             value={this.state.elementBeingEdited.type}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="textarea-input">About Doctor</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="textarea" id="textarea-input" placeholder="about doctor..." name="aboutDoctor"
                             rows="2" onChange={this.onInputChange} value={this.state.elementBeingEdited.aboutDoctor}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="textarea-input">Center Description</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="textarea" id="textarea-input" placeholder="center description..." name="description"
                             rows="2" onChange={this.onInputChange} value={this.state.elementBeingEdited.description}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="textarea-input">About Center</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="textarea" id="textarea-input" placeholder="about center..." name="about" rows="2"
                             onChange={this.onInputChange} value={this.state.elementBeingEdited.about}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Featured?</Label>
                    </Col>
                    <Col md="9">
                      <FormGroup check inline>
                        <Input className="form-check-input" onChange={this.onInputChange} name="isFeatured" value={true}
                               type="radio" id="inline-radio-1"/>
                        <Label className="form-check-label" check htmlFor="inline-radio1">Yes</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input className="form-check-input" onChange={this.onInputChange} name="isFeatured"
                               value={false} type="radio" id="inline-radio-2"/>
                        <Label className="form-check-label" check htmlFor="inline-radio2">No</Label>
                      </FormGroup>
                    </Col>
                  </FormGroup>

                  <h1 className="mt-5">Strengths</h1>
                  <div>
                    {this.state.elementBeingEdited.strengths.map((strength, index) => {
                      return <FormGroup row>
                        <Col md="3">
                          {/*<Label htmlFor="text-input">Doctor</Label>*/}
                        </Col>
                        <Col xs="12 d-flex mt-2" md="9">
                          <Input type="text" id="text-input" name="number" placeholder="number" className="w-25"
                                 onChange={(evt) => this.onSpecialInputChange(evt, "strengths", index)}
                                 value={strength.number}/>
                          <Input type="text" id="text-input" className="ml-3 w-75" placeholder="strength"
                                 name="strength" onChange={(evt) => this.onSpecialInputChange(evt, "strengths", index)}
                                 value={strength.strength}/>
                        </Col>
                      </FormGroup>
                    })}
                    <Button size="sm" onClick={this.addNewStrength} color="primary"><i
                      className="fa fa-plus"></i> Add Strength</Button>
                  </div>
                  <h1 className="mt-5">Services</h1>
                  <div>
                    {this.state.elementBeingEdited.services.map((strength, index) => {
                      return <FormGroup row>
                        <Col md="3">
                          {/*<Label htmlFor="text-input">Doctor</Label>*/}
                        </Col>
                        <Col xs="12 d-flex mt-2" md="9">
                          <Input type="text" id="text-input" placeholder="service" name="service"
                                 onChange={(evt) => this.onSpecialInputChange(evt, "services", index)}
                                 value={strength}/>
                        </Col>
                      </FormGroup>
                    })}
                    <Button size="sm" onClick={this.addNewService} color="primary"><i className="fa fa-plus"></i> Add
                      Service</Button>
                  </div>
                  <h1 className="mt-5">Address</h1>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">City</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="text-input" name="city"
                             onChange={(evt) => this.onSpecialInputChange(evt, "address")}
                             value={this.state.elementBeingEdited.address.city}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Zip Code</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="text-input" name="zipCode"
                             onChange={(evt) => this.onSpecialInputChange(evt, "address")}
                             value={this.state.elementBeingEdited.address.zipCode}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">State</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="text-input" name="state"
                             onChange={(evt) => this.onSpecialInputChange(evt, "address")}
                             value={this.state.elementBeingEdited.address.state}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="textarea-input">Display Address</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="textarea" id="textarea-input" placeholder="display address..." name="toShow" rows="2"
                             onChange={(evt) => this.onSpecialInputChange(evt, "address")}
                             value={this.state.elementBeingEdited.address.toShow}/>
                    </Col>
                  </FormGroup>
                </div>
              </div>
            </Form>
          </CardBody>
          <CardFooter>
            <Button onClick={this.updateElement} type="submit" size="sm" color="primary"><i
              className="fa fa-dot-circle-o"></i> Submit</Button>
            <Button onClick={() => this.props.history.push('/centers')} type="reset" size="sm" color="danger"><i
              className="fa fa-ban"></i> Reset</Button>
          </CardFooter>
        </Card> : null}
      </div>
    );
  }
}

export default withRouter(SpotlightCenterForm);
