import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";

export const getPostItem = (state: StateSchema) => state.postItem?.data;
