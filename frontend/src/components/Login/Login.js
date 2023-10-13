import React, { useState } from "react";
import SignForm from "../SignForm";
import FormRedirect from "../FormRedirect/FormRedirect";

const Login = ({ handleLoginSubmit }) => {

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setInputs((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = (evt) => {
        const { email, password } = inputs;
        evt.preventDefault();
        handleLoginSubmit(password, email)
    }

    return (
        <>
            <SignForm title="Log in" handleSubmit={handleSubmit} handleChange={handleChange} inputs={inputs} />
            <FormRedirect text="Not a member yet? " textLink="Sign up here!" redirectElement="signup" />
        </>
    )
}

export default Login;