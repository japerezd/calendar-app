import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom'

export const PublicRoute = ({
    isLoggedIn,
    component: Component,
    ...rest
}) => {
// Si no esta autenticado, manda el componente el cual es el login
    return (
        <Route {...rest}
            component = { props => (
                (isLoggedIn)
                    ? <Redirect to="/"/>
                    : <Component {...props}/>
            )}
        />
    )
}

PublicRoute.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}