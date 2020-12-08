import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom'

export const PrivateRoute = ({
    isLoggedIn,
    component: Component,
    ...rest
}) => {
// Si no esta autenticado, manda el componente el cual es el login
    return (
        <Route {...rest}
            component = { props => (
                (isLoggedIn)
                    ? <Component {...props}/>
                    : <Redirect to="/login"/>
            )}
        />
    )
}

PrivateRoute.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}