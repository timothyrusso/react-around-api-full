import React, { useRef } from "react";

const Form = ({ name, onSubmit, onFormUpdate, children }) => {
  const formRef = useRef();

  const handleFormValidity = () => {
    const formValidityBoolean: boolean = formRef.current.checkValidity();
    onFormUpdate(formValidityBoolean);
  };

  return (
    <form
      action="#"
      className="popup__form"
      name={`myForm${name}`}
      onSubmit={onSubmit}
      ref={formRef}
      onChange={handleFormValidity}
    >
      {children}
    </form>
  );
};

export default Form;
