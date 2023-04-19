import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";

export const getPostSectionIsLoading = (state: StateSchema) => state.postSection?.isLoading;