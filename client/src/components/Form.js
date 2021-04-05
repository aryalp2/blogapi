import React, { Component } from 'react';
import './Form.css';
import axios from 'axios';

class Forms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "",
            title: "",
            body: "",
            date: Date.now,
            form: false,
            formMsg: "Add new blog"
        }
        this.whenClick = this.whenClick.bind(this);
    }
    render() {
        return (
            <div>
                <button onClick={ this.clickHandler }> { this.state.formMsg } </button>
                <div className="form-page">
                    <div>
                        <form className= {!this.state.form ? "form" : "onClickForm"}>
                            <input onChange = {this.handleChange} name="url" placeholder="URL for your blog" value={this.state.url} />
                            <input onChange = {this.handleChange} name="title" placeholder="Title of your blog" value={this.state.title} />
                            <textarea rows="4" cols="50" onChange = {this.handleChange} name="body" placeholder="Body for your blog" value={this.state.body} />
                        </form>
                        <button type="submit" className= {!this.state.form ? "form" : "onClickForm"} onClick={() => this.whenClick()}>Submit</button>
                    </div>
                </div>
                
            </div>
        )
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
        } catch (err) {
            console.error(err);
        }
    }

}


export default Forms;
