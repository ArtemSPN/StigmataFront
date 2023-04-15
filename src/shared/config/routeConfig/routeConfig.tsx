import { MainPage } from "@/pages/MainPage"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { PostItemPage } from "@/pages/PostItemPage"
import { PostPage } from "@/pages/PostPage"
import { RouteProps } from "react-router-dom"

export enum AppRoutes {
    MAIN = 'main',
    POST = 'post',
    POST_LIST = 'post_list',
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.POST]: '/post/',
    [AppRoutes.POST_LIST]: '/postList',
    [AppRoutes.NOT_FOUND]: '*',
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage/>
    },
    [AppRoutes.POST]: {
        path: `${RoutePath.post}:id`,
        element: <PostItemPage/>,
    },
    [AppRoutes.POST_LIST]: {
        path: RoutePath.post_list,
        element: <PostPage />,
    },
    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
}