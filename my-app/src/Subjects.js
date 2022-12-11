import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom";
import axios from "axios";

export default function Subjects(){

    const [data, setData] = useState([])
    async function fetchSubjects() {
        const response = await axios.get('http://127.0.0.1:8000/api/subjects/')
        console.log(response.data)
        setData(response.data)
    }

    useEffect( () => {
            console.log('effect')
            fetchSubjects()
        }, []
    )

    return(
        <div>
            <ul>
                <li><Link to="/subjects/1">{data[0]?.name}</Link></li>
                <li><Link to="/subjects/2">{data[1]?.name}</Link></li>
                <li><Link to="/subjects/3">{data[2]?.name}</Link></li>
            </ul>
        </div>
    )

}