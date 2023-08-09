import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;

        return (
            <div className='my-4'>
                <div className="card">
                    <span className="badge sqaure-pill bg-danger" style={{ display:'flex', justifyContent:'flex-end', position:'absolute', right:'0'}}>{source}</span>
                    <img src={!imageUrl ? "https://www.hindustantimes.com/ht-img/img/2023/04/06/1600x900/rana_du_Plessis_1680769689140_1680769702189_1680769702189.jpg" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title} </h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}
