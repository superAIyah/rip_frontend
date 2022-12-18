import React, {useState} from "react"
import './App.css';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Home from "./components/Home";
import Subjects from "./components/Subjects";
import Articles from "./components/Articles";
import ListGroup from "react-bootstrap/ListGroup";
import {AuthContext} from "./context/index"

function App() {
    const  [isAuth, setIsAuth] = useState(false);
    return (
        <AuthContext.Provider value = {{
            isAuth,
            setIsAuth
        }}>
            <BrowserRouter basename="/" >
              <div>
                  <ListGroup horizontal>
                      <ListGroup.Item action href="/">
                          Start
                      </ListGroup.Item>
                      <ListGroup.Item action href="/subjects">
                          Subjects
                      </ListGroup.Item>
                  </ListGroup>
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
        </AuthContext.Provider>
    );

  }export default App;




