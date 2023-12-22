import { ReactNode, FC } from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: ReactNode;
  loggedIn: boolean;
};

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, loggedIn }) => {
  if (loggedIn) {
    return <>{children}</>;
  } else {
    return <Navigate to="/signin" />;
  }
};

export default ProtectedRoute;
