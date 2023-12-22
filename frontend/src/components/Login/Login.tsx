import { useState } from 'react';
import SignForm from '../SignForm/SignForm';
import FormRedirect from '../FormRedirect/FormRedirect';

export type LoginProps = {
  handleLoginSubmit: (password: string, email: string) => void;
};

const Login = ({ handleLoginSubmit }: LoginProps) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    const { email, password } = inputs;
    evt.preventDefault();
    handleLoginSubmit(password, email);
  };

  return (
    <>
      <SignForm
        title="Log in"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        inputs={inputs}
      />
      <FormRedirect
        text="Not a member yet? "
        textLink="Sign up here!"
        redirectElement="signup"
      />
    </>
  );
};

export default Login;
