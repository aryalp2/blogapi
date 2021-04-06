/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, { Component } from 'react';
import Card from '../../UI/Card';
import './style.css';
import { Link } from 'react-router-dom';
import Forms from '../Form';


export default class BlogPost extends Component {

    constructor(props){
        super(props);
        this.state = {
            blogData: []
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
    
    render() {
        return (
            <div>
                <div className="blogPostContainer">
                    <Card>
                        <div>
                            <div className="blogList">
                                <ul>
                                    {
                                        this.state.blogData.map((item, i) => <Link key={i} to= {`/api/blogPosts/${item._id}`}>
                                        <li>
                                            <img src= {`${item.url}`} alt="Images" ></img>
                                            {item.title}
                                        </li>
                                        </Link>)
                                    }
                                </ul>
                            </div>
                        </div>
                    </Card>
                </div>
                <Forms />
            </div>

        );
    }
}
