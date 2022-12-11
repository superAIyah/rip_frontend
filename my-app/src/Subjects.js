import React from "react"
import {Link} from "react-router-dom";

export default function Subjects(){
    return(
        <div>
            <ul>
                <li><Link to="/subjects/1">Computer science</Link></li>
                <li><Link to="/subjects/2">Physics</Link></li>
                <li><Link to="/subjects/3">Math</Link></li>
            </ul>
        </div>
    )

}