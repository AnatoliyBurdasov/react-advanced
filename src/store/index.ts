import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import { githubApi } from "./github.api";
import { githubReducer } from "./github.slice";

export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
    github: githubReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
/*RootState таким образом я создаю кастомные типы для того что бы я понимал с какими данными я работаю в store*/

console.log(githubApi.reducerPath);
console.log(githubApi.reducer);
