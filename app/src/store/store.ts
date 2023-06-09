import { configureStore } from "@reduxjs/toolkit";
import { fixerupperApi } from "./apis/fixerupper";

export const store = configureStore({
  reducer: {
    [fixerupperApi.reducerPath]: fixerupperApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(fixerupperApi.middleware)
  },
});
