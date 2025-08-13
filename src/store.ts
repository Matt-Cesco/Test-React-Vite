import { configureStore } from "@reduxjs/toolkit";
import { cocktailApi } from "./services/cocktailApi";


export const store = configureStore({
    reducer: { [cocktailApi.reducerPath]: cocktailApi.reducer },
    middleware: (gDM) => gDM().concat(cocktailApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
