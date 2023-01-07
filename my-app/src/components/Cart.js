import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from "react-bootstrap/Button";
import React, {useEffect, useState} from "react";
import axios from "axios";

function KitchenSinkExample() {
    const [data, setData] = useState([])
    const [sum, setSum] = useState(0)
    async function fetchSubjects() {  // Using local server django rest api
        const response = await axios.get('/api/articles/')
        setData(response.data)

        let article
        let sum_tmp = 0
        for (article of response.data) {
            if (article.cart)
                sum_tmp += article.price
        }
        setSum(sum_tmp)
    }

    useEffect( () => {
            console.log('effect')
            fetchSubjects()
        }, []
    )

    function handleClick(article) {
        axios.patch('/api/articles/'+article.id+'/', {
            "cart" : false
        })
        const ind = data.indexOf(article)
        const arr = data
        arr[ind].cart = false

        setData([...arr])
    }

    return (
        <div>
            {data
                .filter(article => article.cart === true)
                .map(article => {
                    return (
                        <Card style={{ width: '20rem'}}>
                            <Card.Img variant="top" src={article.photo_link} />
                            <Card.Body>
                                <Card.Title>
                                    <p><a href={article.link}>Demo version</a></p>
                                </Card.Title>
                                <Card.Text>
                                    {article.title}
                                </Card.Text>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item>Subject: {article.subject}</ListGroup.Item>
                                    <ListGroup.Item>Price: {article.price} $</ListGroup.Item>
                                </ListGroup>
                                <Button variant="danger" onClick={()=>handleClick(article)}>
                                    Delete
                                </Button>
                            </Card.Body>
                        </Card>
                    )
                })}
            <Button variant="primary" style={{margin: "10px"}}>Buy for {sum}$</Button>
        </div>
    )
}

export default KitchenSinkExample;