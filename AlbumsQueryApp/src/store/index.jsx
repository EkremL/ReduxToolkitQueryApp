//konfigüre etme işlemi
import { configureStore } from "@reduxjs/toolkit";
//querye özel setuplisteners ı dispatch etmek için kullanacağız
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersApi } from "./apis/usersApi";
import { albumsApi } from "./apis/albumsApi";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
  },
  //middleware
  middleware: (getDefaultMiddleware) => {
    //birleştirme islemi
    return getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(albumsApi.middleware);
  },
});

setupListeners(store.dispatch);

export {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} from "./apis/albumsApi";

export {
  useFetchUsersQuery,
  useAddUserMutation,
  useRemoveUserMutation,
} from "./apis/usersApi";
