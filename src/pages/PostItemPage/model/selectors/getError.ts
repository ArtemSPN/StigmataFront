import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";

export const getError = (state: StateSchema) => state.postItem?.error;
