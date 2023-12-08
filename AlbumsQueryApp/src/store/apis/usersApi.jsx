import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const usersApi = createApi({
  //reducerpath: index.jsx de nasıl ulaşacağımız
  reducerPath: "users",
  //basequery: nereye istek atıcaz  fetchbasequery ile de çekiceğimiz değeri yazıcaz
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args);
    },
  }),
  //veri çekme ekleme silme gibi islemler endpoints de tutulur ve builder argümanı alır
  endpoints(builder) {
    return {
      //çekme için query, update,silme veya ekleme için mutation kullanilir
      //kişileri çekme
      fetchUsers: builder.query({
        //kişi ekledikten sonra da fetch ederek sayfada anında gözükmesini sağlamak için tag kullanıyoruz
        providesTags: ["User"],
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
        invalidatesTags: () => {
          //eleman eklendikten sonra serverdeki yeni elemanla birlikte çekme işlemi yapmak için önceki tagı invalidatesTags ile iptal etmiş olduk ve verilerin tamamı artık çekilip ekranda gözükecek aynı işlemi kişi silme için de kullanmamız gerek
          return [{ type: "User" }];
        },
        query: () => {
          return {
            url: "/users",
            //çekmek için GET
            method: "POST",
            body: {
              //ilerde random isim olusturma ypcaz suanlik elle isim ekliyoruz, idyi otomatik jsonserver ekliyor
              //   name: "Ahmet",
              //Artik faker ile random isim ekliyoruz
              name: faker.name.fullName(),
            },
          };
        },
      }),
      //kişi silme
      removeUser: builder.mutation({
        invalidatesTags: () => {
          return [{ type: "User" }];
        },
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
