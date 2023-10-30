import React from "react";

export type InputProps = {
  type: string;
  idName: string;
  name: string;
  fieldName: string;
  placeholder: string;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  minLength?: string;
  maxLength?: string;
  value: string;
  errorMessage: {[name: string]: string} | {};
}

const Input = ({ type, idName, name, fieldName, placeholder, onChange, minLength, maxLength, value, errorMessage }: InputProps) => {

  return (
    <>
      <input type={type} id={idName} name={name} className={`popup__input popup__input_${fieldName}`} placeholder={placeholder} required
        minLength={+minLength} maxLength={+maxLength} value={value} onChange={onChange} />
      <span id={`${idName}-error`} className="popup__input_type_error">{errorMessage[name]}</span>
    </>
  )
}

export default Input;
