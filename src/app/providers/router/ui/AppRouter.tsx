import { RequireAuth } from "@/app/providers/router/ui/Require";
import { LoaderPage } from "@/pages/LoaderPage";
import { AppRoutesProps, routeConfig } from "@/shared/config/routeConfig/routeConfig";
import { useCallback, Suspense, memo } from "react";
import { Route, Routes } from "react-router-dom";

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = (
            <Suspense fallback={<LoaderPage />}>
                <div className="page-wrapper">
                    {route.element}
                </div>
            </Suspense>
        );
        return (
            <Route
                key={route.path}
                path={route.path}
                element={route.authOnly ? <RequireAuth>{element}</RequireAuth> : element}
            />
        );
    }, []);

    return (
        <Routes>
            {Object.values(routeConfig).map(renderWithWrapper)}
        </Routes>
    );
};

export default memo(AppRouter);







