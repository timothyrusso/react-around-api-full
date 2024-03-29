import React, { FC } from 'react';

type SignFormProps = {
  title: string;
  handleSubmit: (evt: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  inputs: {
    email: string;
    password: string;
  };
};

const SignForm: FC<SignFormProps> = ({
  title,
  handleSubmit,
  handleChange,
  inputs,
}) => {
  return (
    <form className="sign-form" onSubmit={handleSubmit}>
      <div className="sign-form__intro">
        <div className="circle rotation"></div>
        <div className="square rotation-inverse"></div>
        <p className="sign-form__intro-paragraph">
          Original photos of original places. Share the most original.
        </p>
      </div>
      <div className="sign-form__wrapper">
        <h2 className="sign-form__title">{title}</h2>
        <input
          type="email"
          className="sign-form__input"
          id="email-input"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={inputs.email}
        ></input>
        <input
          type="password"
          className="sign-form__input"
          id="password-input"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={inputs.password}
        ></input>
        <button className="sign-form__submit">{title}</button>
      </div>
    </form>
  );
};

export default SignForm;
