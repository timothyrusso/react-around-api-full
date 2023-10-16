import React, { useState } from "react";
import SignForm from "../SignForm";
import FormRedirect from "../FormRedirect/FormRedirect";

const Register = ({ handleRegisterSubmit }) => {

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
        handleRegisterSubmit(password, email)
    }

    return (
        <>
            <SignForm title="Sign up" handleSubmit={handleSubmit} handleChange={handleChange} inputs={inputs}/>
            <FormRedirect text={"Already a member? "} textLink="Log in here!" redirectElement="signin" />
        </>
    )
}

export default Register;