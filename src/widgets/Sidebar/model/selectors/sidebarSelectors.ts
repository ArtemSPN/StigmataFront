import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";

export const getSidebarTheme = (state: StateSchema) => state.sidebar.isLightTheme;

export const getSidebarVisible = (state: StateSchema) => state.sidebar.isVisible;

export const getSidebarDesktop = (state: StateSchema) => state.sidebar.isDesktop;
