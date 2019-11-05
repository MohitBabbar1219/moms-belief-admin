import React from 'react';
import Aux from './../../hoc/Aux';
import NavBar from "../../components/NavBar";
import axios from "axios";
import Center from "../../components/Center";

class Centers extends React.Component {
  state = {
    centers: []
  };

  componentDidMount() {
    this.updateAboutUsElements();
  }

  updateAboutUsElements = () => {
    axios.get('/api/centers').then(advisoryBoardMembers => {
      console.log(advisoryBoardMembers.data);
      this.setState({centers: advisoryBoardMembers.data.data});
    });
  };

  edit = (id) => {
    this.props.history.push(`/centers/${id}`);
  };
  
  addNewCenter = () => {
    this.props.history.push('/centers/new');
  };

  render() {
    return (<Aux>
      <NavBar/>
      <h1 className="container py-4 text-center">Centers</h1>
      <div className="container"><button onClick={this.addNewCenter} className="btn btn-secondary mt-2 w-25">Add Center</button></div>
      <section className="testimonials-banner container d-flex">
        {
          this.state.centers.map((center, index) => {
            return <Center key={center._id} edit={() => this.edit(center._id)} delete={this.delete} center={center} />
          })
        }
      </section>
    </Aux>);
  }
}

export default Centers;