import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface SmartRouteProps extends RouteProps {
  isAuthorized: boolean;
  type: 'private' | 'public' | 'publicOnly';
}

const SmartRoute = ({
  isAuthorized,
  children,
  type,
  ...rest
}: SmartRouteProps) => (
  <Route
    {...rest}
    render={() => {
      switch (type) {
        case 'private': {
          if (isAuthorized) {
            return children;
          } else {
            return <Redirect to={{ pathname: '/' }} />;
          }
        }
        case 'public': {
          return children;
        }
        case 'publicOnly': {
          if (!isAuthorized) {
            return children;
          } else {
            return <Redirect to={{ pathname: '/' }} />;
          }
        }
        default:
          return children;
      }
    }}
  />
);

export default SmartRoute;
