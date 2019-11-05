import React from "react";

const MediaMention = (props) => {
  const mediaMention = props.mediaMention;
  return <div className="w-100 d-flex m-4">
      <div className="w-25">
        <img src={`/${mediaMention.image}`} className="w-75" alt=""/>
      </div>
      <div className="w-75">
        <p className="font-weight-bold">Text</p>
        <p className="fs-9">{mediaMention.text}</p>
        <button onClick={props.edit} className="btn btn-secondary mt-3 w-25">Edit</button>
      </div>
    </div>;
};

export default MediaMention;