import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import sellerLoginIn from '../helpers/sellerLoginIn';

function AppRoute ({
    component: Component,
    exact,
    path,
    isPrivate,
    ...props
})  {

    return (
        <Route
            path={path}
            exact={exact}
            render= {props =>  
                isPrivate && !sellerLoginIn() ? (
                    <Redirect to={"/login"} />
                ): (
                    <Component {...props} />
                )
            }
            {...props}
        />
    );
}

export default AppRoute;
