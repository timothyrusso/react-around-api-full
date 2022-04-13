import React from "react";

const SignForm = ({ title, handleSubmit, handleChange, inputs }) => {

    return (
        <form className="sign-form" onSubmit={handleSubmit}>
            <h2 className="sign-form__title">{title}</h2>
            <input type="email" className="sign-form__input" id="email-input" name="email" placeholder="Email" onChange={handleChange} value={inputs.email}></input>
            <input type="password" className="sign-form__input" id="password-input" name="password" placeholder="Password" onChange={handleChange} value={inputs.password}></input>
            <button className="sign-form__submit">{title}</button>
        </form>
    )
}

export default SignForm;