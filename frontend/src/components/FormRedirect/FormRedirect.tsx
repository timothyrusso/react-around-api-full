import React from "react";
import { Link } from 'react-router-dom';

const FormRedirect = ({ text, textLink, redirectElement }) => {
    return (
        <p className="form-redirect">{text}<Link to={`/${redirectElement}`} className="form-redirect_type_link">{textLink}</Link></p>
    )
}

export default FormRedirect;