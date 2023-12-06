//konfigüre etme işlemi
import { configureStore } from "@reduxjs/toolkit";
//querye özel setuplisteners ı dispatch etmek için kullanacağız
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersApi } from "./apis/usersApi";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
  },
  //middleware
  middleware: (getDefaultMiddleware) => {
    //birleştirme islemi
    return getDefaultMiddleware().concat(usersApi.middleware);
  },
});

setupListeners(store.dispatch);

export {
  useFetchUsersQuery,
  useAddUserMutation,
  useRemoveUserMutation,
} from "./apis/usersApi";
