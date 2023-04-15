import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";

export const getCommentIsLoading = (state: StateSchema) => state.comments.isLoading;
