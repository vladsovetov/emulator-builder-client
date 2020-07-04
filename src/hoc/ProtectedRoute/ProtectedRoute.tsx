import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface ProtectedRouteProps extends RouteProps {
  isAuthorized: boolean;
}

const ProtectedRoute = ({
  isAuthorized,
  children,
  ...rest
}: ProtectedRouteProps) => (
  <Route
    {...rest}
    render={() => {
      if (isAuthorized) {
        return children;
      } else {
        return <Redirect to={{ pathname: '/' }} />;
      }
    }}
  />
);

export default ProtectedRoute;
