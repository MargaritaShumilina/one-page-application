import React, {type ComponentType, FC} from 'react';
import { Navigate } from 'react-router-dom';
import type {TreeNode, UserInfo} from "../../utils/types";

type Props = {
    element: ComponentType<any>;
    loggedIn: boolean;
    props?: {};
    handleLoginClick?: (email: string, password: string) => void;
    errorMessage?: string;
    currentUser?: UserInfo,
    isLoading:boolean,
    objectTree?:TreeNode[]
}

const ProtectedRouteElement:FC<Props> = ({ element: Component, isLoading, loggedIn, handleLoginClick, errorMessage, currentUser, ...props}) => {
    return loggedIn ? (
        <Component {...props} handleLoginClick={handleLoginClick} errorMessage={errorMessage} isLoading={isLoading}/>
    ) : (
        <Navigate to="/" replace />
    );
};

export default ProtectedRouteElement;
