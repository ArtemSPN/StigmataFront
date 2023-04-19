import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";

export const getCommentData = (state: StateSchema) => state.comments.data?.comments;


