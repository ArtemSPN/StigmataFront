import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";

export const getPostData = (state: StateSchema) => state.posts?.data?.posts;
