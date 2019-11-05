import React from "react";

const HomeSubscription = (props) => {
  const subscription = props.subscription;
  return <div className="w-100 d-flex m-4">
      <div className="w-25">
        {/*<img src={`/${subscription.image}`} className="w-75" alt=""/>*/}
      </div>
      <div className="w-75">
        <p className="font-weight-bold">Title</p>
        <p className="fs-9">{subscription.title}</p>
        <p className="font-weight-bold mt-3">Link</p>
        <p className="fs-9">{subscription.link}</p>
        <p className="font-weight-bold mt-3">Amount</p>
        <p className="fs-9">{subscription.amount}</p>
        <p className="font-weight-bold mt-3">Tier</p>
        <p className="fs-9">{subscription.tier}</p>
        <button onClick={props.edit} className="btn btn-secondary mt-3 w-25">Edit</button>
      </div>
    </div>;
};

export default HomeSubscription;