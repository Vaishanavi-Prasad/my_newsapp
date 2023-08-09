import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
// import { unmountComponentAtNode } from 'react-dom';
// import PropTypes from 'prop-types'

export class News extends Component {

    // static defautProps ={
    //   pageSize: 8,
    //   country: "in",
    //   category: "general",
    // }

    // static PropTypes ={
    //   pageSize: PropTypes.number,
    //   country: PropTypes.string,
    //   category: this.PropTypes.string,
    // }

    Capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.Capitalize(this.props.category)} : NewsMonkey - Get your Daily News here!`
    }

    async updateNews() {
        this.props.setProgress(0);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parseddata = await data.json();
        this.props.setProgress(70);
        console.log(parseddata);
        this.setState({
            articles: parseddata.articles,
            totalResults: parseddata.totalResults,
            loading: false
        })
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updateNews();
    }

    // handleNextButton = async () => {
    //     this.setState({
    //         page: this.state.page + 1
    //     })
    //     this.updateNews();
    // }

    // handlePrevButton = async () => {
    //     this.setState({
    //         page: this.state.page - 1
    //     })
    //     this.updateNews();
    // }

    fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({
                    page: this.state.page + 1
                })
        let data = await fetch(url);
        let parseddata = await data.json();
        console.log(parseddata);
        this.setState({
            articles: this.state.articles.concat(parseddata.articles),
            totalResults: parseddata.totalResults,
        })
      };

    render() {
        return (
            <div className="container">
                <h1 className="text-center" style={{ width: "35px 0px" }}>{`NewsMonkey - Top ${this.Capitalize(this.props.category)} Headlines!`}</h1>
                <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<Spinner/>}
                    >
                    <div className="container">
                        <div className="row">
                                {this.state.loading && <Spinner />}
                                { this.state.articles.map((element) => {
                                    return <div className="col-md-4" key={element.url}>
                                        <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""}
                                            imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                    </div>
                                })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevButton}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextButton}>Next &rarr;</button>
                </div> */}
            </div>
        )
    }
}

export default News
