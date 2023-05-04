import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";

export const getPostSectionHasMore = (state: StateSchema) => state.postSection?.hasMore;