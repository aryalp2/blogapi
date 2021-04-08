/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, { Component } from 'react';
import Card from '../../UI/Card';
import './style.css';
import { Link } from 'react-router-dom';
// import Forms from '../Form';


export default class BlogPost extends Component {

    constructor(props){
        super(props);
        this.state = {
            blogData: [],
            url: "",
            title: "",
            body: "",
            date: Date.now,
            form: false,
            formMsg: "Add new blog"
        }
    }

    async componentDidMount() {
        this.getBlogbyId();
    }

    getBlogbyId = async () => {
        const res = await axios.get(`http://localhost:8080/api/blogPosts`);
        this.setState({
            blogData:res.data
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    clickHandler = (state) => {
        if (!this.state.form) {
            this.setState( state => ({
                form: true,
                formMsg: "Hide form",
                url: "",
                title: "",
                body: "",
            }))
        } else {
            this.setState(state => ({
                form: false,
                formMsg: "Add your blog",
                url: "",
                title: "",
                body: "",
            }))
        }
    }

    whenClick = async () => {
        try {
            const blog = {
                url: this.state.url,
                title: this.state.title,
                body: this.state.body
            }
            const res = await axios.post(`http://localhost:8080/api/blogPosts`, blog);
            console.log(res.data);
            this.getBlogbyId();
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        return (
            <div>
                <div className="blogPostContainer">
                    <Card>
                        <div>
                            <div className="blogList">
                                <h1>Prashant's Blog</h1>
                                <br></br>
                                <ul>
                                    {
                                        this.state.blogData.map((item, i) => <Link key={i} to= {`/api/blogPosts/${item._id}`}>
                                        <li>
                                            <img src= {`${item.url}`} alt="Images" ></img>
                                            <p>{item.title}</p>
                                        </li>
                                        </Link>)
                                    }
                                </ul>
                            </div>
                        </div>
                    </Card>
                </div>

                <div>
                    <button className="addButton" onClick={ this.clickHandler }> { this.state.formMsg } </button>
                    <div className="form-page">
                        <div>
                            <form className= {!this.state.form ? "form" : "onClickForm"}>

                                <label>URL:</label>
                                <input onChange = {this.handleChange} name="url" placeholder="URL for your blog" value={this.state.url} />

                                <br></br>
                                <label>Title:</label>
                                <input onChange = {this.handleChange} name="title" placeholder="Title of your blog" value={this.state.title} />

                                <br></br>
                                <label>Body:</label>
                                <textarea rows="4" cols="50" onChange = {this.handleChange} name="body" placeholder="Body for your blog" value={this.state.body} />

                            </form>
                            <br></br>
                            <button type="submit" className= {!this.state.form ? "form" : "onClickForm"} onClick={() => this.whenClick()}>Submit</button>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
