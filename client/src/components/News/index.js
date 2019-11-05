import React from "react";

const News = (props) => {
  const news = props.news;
  return <div className="w-100 d-flex m-4">
      <div className="w-25">
        <img src={`/${news.image}`} className="w-75" alt=""/>
      </div>
      <div className="w-75">
        <p className="font-weight-bold">Title</p>
        <p className="fs-9">{news.title}</p>
        <p className="font-weight-bold mt-3">Link</p>
        <p className="fs-9">{news.link}</p>
        <p className="font-weight-bold mt-3">Date</p>
        <p className="fs-9">{news.date}</p>
        <button onClick={props.edit} className="btn btn-secondary mt-3 w-25">Edit</button>
      </div>
    </div>;
};

export default News;