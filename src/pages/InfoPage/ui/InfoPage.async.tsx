import { lazy } from "react";

export const InfoPageAsync = lazy(() => new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setTimeout(() => resolve(import('./InfoPage')), 1500);
}));