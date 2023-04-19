import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";

export const getPostSectionError = (state: StateSchema) => state.postSection?.error;