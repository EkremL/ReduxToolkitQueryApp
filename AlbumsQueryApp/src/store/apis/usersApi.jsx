import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const usersApi = createApi({
  //reducerpath: index.jsx de nasıl ulaşacağımız
  reducerPath: "users",
  //basequery: nereye istek atıcaz  fetchbasequery ile de çekiceğimiz değeri yazıcaz
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  //veri çekme ekleme silme gibi islemler endpoints de tutulur ve builder argümanı alır
  endpoints(builder) {
    return {
      //çekme için query, update,silme veya ekleme için mutation kullanilir
      //kişileri çekme
      fetchUsers: builder.query({
        query: () => {
          return {
            // "http://localhost:3000" ın devamındaki userse istek atıcaz yani json serverdeki path
            url: "/users",
            //çekmek için GET
            method: "GET",
          };
        },
      }),
      //kişi ekleme
      addUser: builder.mutation({
        query: () => {
          return {
            url: "/users",
            //çekmek için GET
            method: "POST",
            body: {
              //ilerde random isim olusturma ypcaz suanlik elle isim ekliyoruz, idyi otomatik jsonserver ekliyor
              name: "Ahmet",
            },
          };
        },
      }),
      //kişi silme
      removeUser: builder.mutation({
        //kimi silceksek parametre vermeliyiz yani id belirtmeliyiz
        query: (user) => {
          return {
            url: `/users/${user.id}`,
            //silmek için DELETE
            method: "DELETE",
          };
        },
      }),
    };
  },
});
//dışarı açma
export const { useFetchUsersQuery, useAddUserMutation, useRemoveUserMutation } =
  usersApi;

export { usersApi };
