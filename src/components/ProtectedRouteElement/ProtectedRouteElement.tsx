import React, {type ComponentType, FC} from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
    element: ComponentType<any>;
    loggedIn: boolean;
    props?: {};
    handleLoginClick?: (email: string, password: string) => void;
    errorMessage?: string;
    currentUser?: {},
    isLoading:boolean
}

const ProtectedRouteElement:FC<Props> = ({ element: Component, isLoading, loggedIn, handleLoginClick, errorMessage, currentUser, ...props}) => {
    return loggedIn ? (
        <Component {...props} handleLoginClick={handleLoginClick} errorMessage={errorMessage} currentUser={currentUser} isLoading={isLoading}/>
    ) : (
        <Navigate to="/" replace />
    );
};

export default ProtectedRouteElement;
