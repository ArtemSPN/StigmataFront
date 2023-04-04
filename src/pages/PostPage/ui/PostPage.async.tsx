import { lazy } from 'react';

export const PostPageAsync = lazy(() => new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setTimeout(() => resolve(import('./PostPage')), 1500);
}));