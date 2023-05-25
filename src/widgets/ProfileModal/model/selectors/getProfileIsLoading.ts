import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";
//@ts-ignore
export const getProfileIsLoading = (state: StateSchema) => state.user?.isLoading?.user?.user;