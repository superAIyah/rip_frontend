import React, {useEffect, useState} from "react"
import { Link } from 'react-router-dom';
import { useParams} from "react-router-dom";
import axios from "axios";

export default function Articles() {
    const {id} = useParams()

    const [data, setData] = useState([])
    async function fetchSubjects() {
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

    return (
        <div>
            <p><Link to="/">Главная</Link>/
                <Link to="/subjects">Предметы</Link>/
                {data.find(article => article.subject_id === +id)?.subject}
            </p>

            {data
                .filter(article => article.subject_id === +id)
                .map(article => {
                    return (
                        <div key={article.title}>
                            <p>{article.title}</p>
                            <img src={article.photo_link} height="380" width="500"/>
                            <br/>
                            <a href="url">{article.link}</a>
                        </div>
                    )
                })}
        </div>
    )
}