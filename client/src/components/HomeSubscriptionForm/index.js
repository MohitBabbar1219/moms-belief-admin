import React from "react";
import {Form} from 'react-bootstrap';

const HomeSubscriptionForm = (props) => {
  const subscription = props.subscription;
  return <form key={subscription._id} onSubmit={(evt) => props.updateElement(evt)} className="m-5">
    <div className="w-100 d-flex">
      <div className="w-25">
        {/*<img src={`/${subscription.image}`} className="w-75" alt=""/>*/}
        {/*<input type="file" name="newsImage" className="d-inline-block mt-2 btn" onChange={props.addImage}/>*/}
      </div>
      <div className="w-75">
        <label>Title</label>
        <input className="w-100 form-control" name="title" onChange={props.onInputChange} value={subscription.title}/>
        <label>Link</label>
        <input className="w-100 form-control" name="link" onChange={props.onInputChange} value={subscription.link}/>
        <label>Amount</label>
        <input className="w-100 form-control" name="amount" onChange={props.onInputChange} value={subscription.amount}/>
        <label>Tier</label>
        <div key="inline-radio" className="mb-3">
          <Form.Check inline label="Holistic" onChange={props.onInputChange} name="tier" value="holistic" type="radio" id="inline-radio-1" />
          <Form.Check inline label="Comprehensive" onChange={props.onInputChange} name="tier" value="comprehensive" type="radio" id="inline-radio-2" />
        </div>
        <button onClick={props.updateElement} className="btn btn-success mt-3 w-25">Update</button>
        <button onClick={props.cancelEditing} className="btn btn-danger mt-3 ml-3 w-25">Cancel</button>
      </div>
    </div>
  </form>;
};

export default HomeSubscriptionForm;