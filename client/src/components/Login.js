import React, {useContext, useState} from "react";
import {Form} from "semantic-ui-react";
import { CoffeeContext } from "./Context/coffee";



function Login(){
  
  const {setUser, password, setPassword, username, setUsername} = useContext(CoffeeContext)
  
  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
    },
      body: JSON.stringify({ username, password }),
    })
    .then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
      // else {
      //   r.json().then((errorData) => setErrors(errorData.errors));
      //   alert(errors)
      // }
    });
  }
      return(
    
    <Form onSubmit ={handleSubmit}>
        <h1>Coffee Shop</h1>
        <h3>Login</h3>
         

        <Form.Group widths="equal">
            <Form.Input
            fluid
            placeholder ="username"
            name ="username"
            value = {username}
            onChange = { (e) => setUsername(e.target.value)}
            >
            </Form.Input>
            <Form.Input
            fluid
            placeholder ="password"
            name ="password"
            value = {password}
            onChange = {(e)=> setPassword(e.target.value)}
            >
            </Form.Input>
            <Form.Button>Submit</Form.Button>

        </Form.Group>
        </Form>
    )
}
export default Login;
