import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";
// @ts-ignore
export const getCommentData = (state: StateSchema) => state.comments.data?.comments;


