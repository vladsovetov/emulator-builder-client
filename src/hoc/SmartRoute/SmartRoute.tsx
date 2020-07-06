import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { RootState } from '../../store';

interface SmartRouteProps extends RouteProps {
  roles: UserRoles[];
}

const SmartRoute = ({ roles, children, ...rest }: SmartRouteProps) => {
  const user = useSelector((state: RootState) => state.authorization.user);
  const userRole: UserRoles = user ? user.role : 'GUEST';
  return (
    <Route
      {...rest}
      render={() => {
        if (!roles.length || roles.includes(userRole)) {
          return children;
        } else {
          return <Redirect to={{ pathname: '/' }} />;
        }
      }}
    />
  );
};
export default SmartRoute;
