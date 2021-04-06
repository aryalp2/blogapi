import React, { Component } from 'react';
import Card from '../../UI/Card';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Form.css'

export default class Individual extends Component {

    constructor(props){
        super(props);
        this.state = {
            blogData: [],
            form: false
        }
    }

    async componentDidMount() {
        const res = await axios.get('http://localhost:8080' + window.location.pathname);
        this.setState({
            blogData: res.data
        });
    }

    async deleteBlog(id, event){
        const res = await axios.delete(`http://localhost:8080/api/blogPosts/delete/${id}`);
        console.log(res.data);

    }

    clickHandler = (state) => {
        if (!this.state.form) {
            this.setState( state => ({
                form: true
            }))
        } else {
            this.setState(state => ({
                form: false
            }))
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    clickUpdate = async (id) => {
        try {
            const updateBlog = {
                url: !!this.state.url ? this.state.url: this.state.blogData.url ,
                title: !!this.state.title ? this.state.title : this.state.blogData.title ,
                body: !!this.state.body ? this.state.body : this.state.blogData.body,
                date: this.state.blogData.date,
                id: this.state.blogData.id
            }
            const res = await axios.patch(`http://localhost:8080/api/blogPosts/update/${id}`, updateBlog);
            console.log(res.config.data);

        } catch (err) {
            console.error(err);
        }
        this.getBlogbyId(id);
    }

    getBlogbyId = async (id) => {
        const res = await axios.get(`http://localhost:8080/api/blogPosts/${id}`);
        this.setState({
            blogData:res.data
        })
    }

    render() {
        return (
            <div>
                <Card>
                    <div>
                        <div className="blogHeader">
                            <h1 className="postTitle">{this.state.blogData.title} </h1>
                            <span className = "postedBy"> Posted on {this.state.blogData.date} </span>
                        </div>

                        <div className="postContent">
                        <img className="individualImage" src= {`${this.state.blogData.url}`} alt="Images" ></img>
                            <h2>{this.state.blogData.title}</h2>
                            <p style={{width:'95%'}}>{this.state.blogData.body}</p>
                        </div>

                        <div className="blogUpdate">
                            <button onClick={ this.clickHandler }>Edit blog</button>
                            <Link to='/api/blogPosts'><button onClick={ (e) => this.deleteBlog(this.state.blogData.id, e) }>Delete blog</button></Link>
                        </div>

                        <div className="updateForm">
                            <form className= {!this.state.form ? "form" : "onClickForm"}>
                                <input onChange = {this.handleChange} name="url" placeholder="Update URL " defaultValue={this.state.blogData.url} />

                                <input onChange = {this.handleChange} name="title" placeholder="Update Title" defaultValue={this.state.blogData.title} />

                                <textarea rows="4" cols="50" onChange = {this.handleChange} name="body" placeholder="Update Body" defaultValue={this.state.blogData.body} />
                            </form>
                        </div>
                        <div className= {!this.state.form ? "form" : "onClickForm"}>
                            <button onClick = { () => {this.clickUpdate(this.state.blogData.id)} }>Update</button>
                        </div>


                    </div>
                </Card>
            </div>
        )
    }
}
