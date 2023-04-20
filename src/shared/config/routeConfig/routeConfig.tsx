import { AddPostPage } from "@/pages/AddPostPage"
import { MainPage } from "@/pages/MainPage"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { PostItemPage } from "@/pages/PostItemPage"
import { PostPage } from "@/pages/PostPage"
import { RouteProps } from "react-router-dom"

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
}

export enum AppRoutes {
    MAIN = 'main',
    POST = 'post',
    CREATE_POST = 'createPost',
    POST_LIST = 'post_list',
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.POST]: '/post/',
    [AppRoutes.POST_LIST]: '/postList/',
    [AppRoutes.CREATE_POST]: '/createPost',
    [AppRoutes.NOT_FOUND]: '*',
}

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage/>
    },
    [AppRoutes.POST]: {
        path: `${RoutePath.post}:id`,
        element: <PostItemPage/>,
    },
    [AppRoutes.POST_LIST]: {
        path: `${RoutePath.post_list}:sec`,
        element: <PostPage/>,
    },
    [AppRoutes.CREATE_POST]: {
        path: RoutePath.createPost,
        element: <AddPostPage/>,
        authOnly: true,
    },
    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
}