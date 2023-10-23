import React, { useRef } from "react";

export type FormProps = {
  name: string;
  onSubmit: (evt: { preventDefault: () => void; }) => void;
  onFormUpdate: (data: boolean) => void;
  children: React.ReactNode;
}

const Form = ({ name, onSubmit, onFormUpdate, children }: FormProps) => {
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
