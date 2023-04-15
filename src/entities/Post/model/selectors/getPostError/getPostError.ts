import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";

export const getPostError = (state: StateSchema) => state.posts?.error;
