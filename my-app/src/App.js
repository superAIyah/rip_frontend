import React from "react"
import './App.css';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Home from "./Home";
import Subjects from "./Subjects";
import Articles from "./Articles";

function App() {

    return (
        <BrowserRouter basename="/" >
          <div>
            <ul>
              <li>
                <Link to="/">Старт</Link>
              </li>
                <li>
                    <Link to="/subjects">Предмет</Link>
                </li>
            </ul>
            <hr />
            <Routes>
              <Route exact path="/" element={<Home />}>
              </Route>
                <Route exact path="/subjects" element={<Subjects />}>
                </Route>
                <Route exact path="/subjects/:id" element={<Articles />}>
                </Route>
            </Routes>
          </div>
        </BrowserRouter>
    );

  }export default App;




