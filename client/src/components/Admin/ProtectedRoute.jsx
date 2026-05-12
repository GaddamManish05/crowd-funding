import { Navigate } from "react-router-dom";
import { userAuth } from "../../store/AuthStore.js";

function ProtectedRoute({ children,role }) {
    const { isAuthenticated, currentUser } = userAuth();
    console.log('user :',currentUser);
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

  // Role check
    if (role && currentUser?.Role !== role) {
        return <Navigate to="/login" replace />;
    }

    return children;

}

export default ProtectedRoute;