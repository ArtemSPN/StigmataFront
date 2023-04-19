import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";

export const getPostSectionData = (state: StateSchema) => state.postSection?.data;
