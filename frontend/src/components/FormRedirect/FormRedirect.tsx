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
