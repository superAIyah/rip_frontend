import React, {useContext, useEffect, useState} from "react"
import { useParams} from "react-router-dom";
import axios from "axios";

import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AuthContext} from "../context";

export default function Articles() {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    console.log(isAuth)
    const {id} = useParams()

    const [data, setData] = useState([])
    async function fetchSubjects() {  // Using local server django rest api
        const response = await axios.get('http://127.0.0.1:8000/api/articles/')
        console.log(response.data)
        setData(response.data)
    }

    useEffect( () => {
            console.log('effect')
            fetchSubjects()
        }, []
    )

    console.log(data)

    const [cart, setCart] = useState([]);
    const handleClick = (article) => {
        cart.push(article);
        console.log(cart);
    }

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/subjects">
                    Library
                </Breadcrumb.Item>
                <Breadcrumb.Item active>{data.find(article => article.subject_id === +id)?.subject}</Breadcrumb.Item>
            </Breadcrumb>

            {data
                .filter(article => article.subject_id === +id)
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