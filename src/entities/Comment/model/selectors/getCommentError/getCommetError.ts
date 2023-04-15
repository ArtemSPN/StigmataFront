import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";

export const getCommentError = (state: StateSchema) => state.comments.error;
