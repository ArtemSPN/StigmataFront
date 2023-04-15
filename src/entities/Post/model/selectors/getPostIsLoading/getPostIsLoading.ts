import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";

export const getPostIsLoading = (state: StateSchema) => state.posts?.isLoading;
