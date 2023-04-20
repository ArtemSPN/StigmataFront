import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';

export function RequireAuth({ children }: { children: JSX.Element }) {
    const auth = window.localStorage.getItem("user");
    const location = useLocation();

    if (!auth && auth == undefined) {
        return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
    }

    return children;
}
