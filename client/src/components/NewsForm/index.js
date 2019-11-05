import React from "react";

const NewsForm = (props) => {
  const news = props.news;
  return <form key={news._id} onSubmit={(evt) => props.updateElement(evt)} className="m-5">
    <div className="w-100 d-flex">
      <div className="w-25">
        <img src={`/${news.image}`} className="w-75" alt=""/>
        <input type="file" name="newsImage" className="d-inline-block mt-2 btn" onChange={props.addImage}/>
      </div>
      <div className="w-75">
        <label>Title</label>
        <textarea className="w-100 form-control" name="title" rows="2" onChange={props.onInputChange} value={news.title}/> <br/>
        <label>Link</label>
        <input className="w-100 form-control" name="link" onChange={props.onInputChange} value={news.link}/>
        <label>Date</label>
        <input className="w-100 form-control" name="date" onChange={props.onInputChange} value={news.date}/>
        <button onClick={props.updateElement} className="btn btn-success mt-3 w-25">Update</button>
        <button onClick={props.cancelEditing} className="btn btn-danger mt-3 ml-3 w-25">Cancel</button>
      </div>
    </div>
  </form>;
};

export default NewsForm;