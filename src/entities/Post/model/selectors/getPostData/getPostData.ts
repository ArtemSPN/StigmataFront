import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";
// @ts-ignore
export const getPostData = (state: StateSchema) => state.posts?.data?.posts;

