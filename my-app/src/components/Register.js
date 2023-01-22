import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Cookies from 'js-cookie';
import { register } from '../actions/auth';
import { connect } from 'react-redux';
import CSRFToken from './CSRFToken';

function Register({register}) {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        re_password: ''
    });

    const [accountCreated, setAccountCreated] = useState(false);

    const { username, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            console.log("REGISTER")
            register(username, password, re_password);
            setAccountCreated(true);
        }
    };

    if (accountCreated)
        return <Navigate to='/login' />;

    return (

        <Form onSubmit={e => onSubmit(e)}
        style = {{marginLeft : "3em", marginRight: "5em"}}>
        <CSRFToken/>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" name = "username" onChange={e => onChange(e)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword" name = "password" onChange={e => onChange(e)}>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={e => onChange(e)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicRePassword" name = "re_password" onChange={e => onChange(e)}>
            <Form.Label>Confirm password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
  );
}

export default connect(null, {register})(Register);