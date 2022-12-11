import React from "react"
import { Link } from 'react-router-dom';
import { useParams} from "react-router-dom";
import responseData from "./components/data";

export default function Articles() {
    const {id} = useParams()

    const data = responseData()

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
                            <img src={article.photo} height="380" width="500"/>
                            <br/>
                            <a href="url">{article.link}</a>
                        </div>
                    )
                })}
        </div>
    )
}