import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";

export const getPostSectionPage = (state: StateSchema) => state.postSection?.page;
