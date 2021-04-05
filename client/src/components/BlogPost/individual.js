import React, { Component } from 'react';
import Card from '../../UI/Card';
import axios from 'axios';

export default class Individual extends Component {

    constructor(props){
        super(props);
        this.state = {
            blogData: []
        }
    }

    async componentDidMount() {
        const res = await axios.get('http://localhost:8080' + window.location.pathname);
        this.setState({
            blogData: res.data
        });
    }

    async deleteBlog(id, event){
        console.log(this.state.blogData);
        const res = await axios.delete(`https://localhost:8080/api/blogPosts/delete/${id}`);
        console.log(res);
        const blogData = this.state.blogData.filter(item => item.id !== id)
        this.setState({
            blogData
        })
    }

    render() {
        return (
            <div>
                <Card>
                    <div>
                        <div className="blogHeader">
                            <h1 className="postTitle">{this.state.blogData.title}</h1>
                            <span className = "postedBy"> Posted on {this.state.blogData.date} </span>
                        </div>

                        <div className="postContent">
                            <h2>{this.state.blogData.title}</h2>
                            <p>{this.state.blogData.body}</p>
                        </div>

                        <div className="blogUpdate">
                            <button>Edit blog</button>
                            <button onClick={ (e) => this.deleteBlog(this.state.blogData.id, e) }>Delete blog</button>
                        </div>


                    </div>
                </Card>
            </div>
        )
    }
}
