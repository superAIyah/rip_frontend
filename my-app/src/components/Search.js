import React, {useContext, useEffect, useState} from "react"
import { useParams} from "react-router-dom";
import axios from "axios";

import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AuthContext} from "../context";

export default function Search() {
    var searchText = window.localStorage.getItem('searchText')
    var minPrice = window.localStorage.getItem('minPrice')
    var maxPrice = window.localStorage.getItem('maxPrice')
    console.log(searchText)
    console.log(minPrice)
    console.log(maxPrice)

    const [data, setData] = useState([])
    async function fetchSubjects() {  // Using local server django rest api
        const response = await axios.get("/api/articles/?min_price="+minPrice+"&max_price="+maxPrice+"&text="+searchText)
        console.log(response.data)
        setData(response.data)
    }

    useEffect( () => {
            console.log('effect')
            fetchSubjects()
        }, []
    )

    async function handleClick(article) {
        await axios.patch('/api/articles/'+article.id+'/', {
            "cart" : true
        })
    }

    return (
        <div>
            <center><h2>Results filtered by price from {minPrice} $ to {maxPrice} $ having text: {searchText}</h2></center>
            {data
                .map(article => {
                    return (
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={article.photo_link} />
                            <Card.Body>
                                <Card.Title>
                                    <p><a href={article.link}>Demo version</a></p>
                                </Card.Title>
                                <Card.Text>
                                    {article.title}
                                </Card.Text>
                                <ListGroup.Item>{article.price} $</ListGroup.Item>
                                <Button variant="primary" onClick={()=>handleClick(article)}>
                                    Buy this article
                                </Button>
                            </Card.Body>
                        </Card>
                    )
                })}
        </div>
    )
}