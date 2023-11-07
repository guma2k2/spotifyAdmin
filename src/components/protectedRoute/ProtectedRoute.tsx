import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
interface Props { children: JSX.Element | JSX.Element[] }

const ProtectedRoute = ({ children }: Props) => {
    const {state,dispatch} = useContext(AuthContext);
    const isAuthenticated = state.isAuthenticated;
    return (
        <div>
            {isAuthenticated === true ? children : <Navigate to='/login' replace />}
        </div>
    );
};

export default ProtectedRoute;