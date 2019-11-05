import React from 'react';
import Aux from './../../hoc/Aux';
import NavBar from "../../components/NavBar";
import {Accordion, Card} from "react-bootstrap";
import axios from "axios";
import './home.css';
import Testimonial from "../../components/Testimonial";
import TestimonialForm from "../../components/TestimonialForm";
import NewsForm from "../../components/NewsForm";
import News from "../../components/News";
import MediaMentionForm from "../../components/MediaMentionForm";
import MediaMention from "../../components/MediaMention";
import SponsorForm from "../../components/SponsorForm";
import Sponsor from "../../components/Sponsor";

class Home extends React.Component {
  state = {
    testimonials: [],
    news: [],
    mediaMentions: [],
    sponsors: [],
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
    this.updateHomeElements();
  }

  updateHomeElements = () => {
    axios.get('/api/home/testimonials').then(testimonials => {
      console.log(testimonials.data);
      this.setState({testimonials: testimonials.data.data});
    });

    axios.get('/api/home/news').then(news => {
      console.log(news.data);
      this.setState({news: news.data.data});
    });

    axios.get('/api/home/mediaMentions').then(mediaMention => {
      console.log(mediaMention.data);
      this.setState({mediaMentions: mediaMention.data.data});
    });

    axios.get('/api/home/sponsors').then(sponsor => {
      console.log(sponsor.data);
      this.setState({sponsors: sponsor.data.data});
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
    axios.post(`/api/home/${this.state.elementBeingEdited.type}`, formData, config)
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
    axios.put(`/api/home/${this.state.elementBeingEdited.type}/${this.state[this.state.elementBeingEdited.type][this.state.elementBeingEdited.index]._id}`, formData, config)
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
      testimonials: {
        author: '',
        content: '',
        image: '',
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

  render() {
    let testimonialSection = <Card.Body>
      <button className="btn btn-primary m-4" onClick={() => this.toggleNew("testimonials")}>Add new
        testimonial
      </button>
      {this.state.testimonials.map((testimonial, index) => {
        return this.state.editableElement === testimonial ?
          <TestimonialForm addImage={(evt) => this.addImage(evt, "testimonials", index)}
                           cancelEditing={this.cancelEditing}
                           onInputChange={this.onInputChange}
                           updateElement={this.updateElement}
                           testimonial={this.state.elementBeingEdited}/> :
          <Testimonial edit={() => this.edit("testimonials", index)}
                       key={testimonial._id}
                       testimonial={testimonial}/>
      })}
    </Card.Body>;

    let newsSection = <Card.Body>
      <button className="btn btn-primary m-4" onClick={() => this.toggleNew("news")}>Add new
        testimonial
      </button>
      {this.state.news.map((news, index) => {
        return this.state.editableElement === news ?
          <NewsForm addImage={(evt) => this.addImage(evt, "news", index)}
                           cancelEditing={this.cancelEditing}
                           onInputChange={this.onInputChange}
                           updateElement={this.updateElement}
                           news={this.state.elementBeingEdited}/> :
          <News edit={() => this.edit("news", index)}
                       key={news._id}
                       news={news}/>
      })}
    </Card.Body>;

    let mediaMentions = <Card.Body>
      <button className="btn btn-primary m-4" onClick={() => this.toggleNew("mediaMentions")}>New Media Mention</button>
      {this.state.mediaMentions.map((media, index) => {
        return this.state.editableElement === media ?
          <MediaMentionForm addImage={(evt) => this.addImage(evt, "mediaMentions", index)}
                    cancelEditing={this.cancelEditing}
                    onInputChange={this.onInputChange}
                    updateElement={this.updateElement}
                    mediaMention={this.state.elementBeingEdited}/> :
          <MediaMention edit={() => this.edit("mediaMentions", index)}
                key={media._id}
                mediaMention={media}/>
      })}
    </Card.Body>;

    let sponsors = <Card.Body>
      <button className="btn btn-primary m-4" onClick={() => this.toggleNew("sponsors")}>New Sponsor</button>
      {this.state.sponsors.map((sponsor, index) => {
        return this.state.editableElement === sponsor ?
          <SponsorForm addImage={(evt) => this.addImage(evt, "sponsors", index)}
                            cancelEditing={this.cancelEditing}
                            onInputChange={this.onInputChange}
                            updateElement={this.updateElement}
                            sponsor={this.state.elementBeingEdited}/> :
          <Sponsor edit={() => this.edit("sponsors", index)}
                        key={sponsor._id}
                        sponsor={sponsor}/>
      })}
    </Card.Body>;

    return (<Aux>
      <NavBar/>
      <h1 className="container py-4 text-center">Home</h1>
      <section className="testimonials-banner container">
        <Accordion>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              <h2>Testimonials</h2>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              {testimonialSection}
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              <h2>News</h2>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              {newsSection}
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="2">
              <h2>Sponsors</h2>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              {sponsors}
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="3">
              <h2>Media Mentions</h2>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="3">
              {mediaMentions}
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </section>
    </Aux>);
  }
}

export default Home;