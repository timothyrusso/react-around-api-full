<<<<<<< HEAD
import React from "react";
import { Link } from 'react-router-dom';

export type FormRedirectProps = {
    text: string;
    textLink: string;
    redirectElement: string;
}

const FormRedirect = ({ text, textLink, redirectElement }: FormRedirectProps) => {
    return (
        <p className="form-redirect">{text}<Link to={`/${redirectElement}`} className="form-redirect_type_link">{textLink}</Link></p>
    )
}

export default FormRedirect;
=======
import React from 'react';
import { Link } from 'react-router-dom';

export type FormRedirectProps = {
  text: string;
  textLink: string;
  redirectElement: string;
};

const FormRedirect = ({
  text,
  textLink,
  redirectElement,
}: FormRedirectProps) => {
  return (
    <p className="form-redirect">
      {text}
      <Link to={`/${redirectElement}`} className="form-redirect_type_link">
        {textLink}
      </Link>
    </p>
  );
};

export default FormRedirect;
>>>>>>> a803ba4e6f159d668b55c87e66f25cf7c58de314
