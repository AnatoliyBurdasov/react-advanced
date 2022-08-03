import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IRepo, IUser, SeverResponse } from "../models/models";

export const githubApi = createApi({
  reducerPath: "github/api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.github.com/" }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    searchUsers: build.query<IUser[], string>({
      query: (search: string) => ({
        url: "search/users",
        params: {
          q: search,
          per_page: 10,
        },
      }),
      transformResponse: (response: SeverResponse<IUser>) => response.items,
    }),

    getUserRepositories: build.query<IRepo[], string>({
      query: (username: string) => ({
        url: `users/${username}/repos`,
        params: {
          q: username,
        },
      }),
    }),
  }),
});

export const { useSearchUsersQuery, useLazyGetUserRepositoriesQuery } =
  githubApi;

/* useLazyGetUserRepositoriesQuery имеет слово Lazy которое говорит о том
 что когда мне нужно будет сделать запрос то тогда я и его выполню  */

/*useSearchUsersQuery данный хук генерируется автоматически в зависимости что я указал в эндпоинтах
 в данном случает строка 7 searchUsers 
 Если бы в searchUsers: build.query был бы метод mutation то в итоге бы сгенерировался хук useSearchUsersMutation*/

/* reducerPath это просто строка которая будет говорить
 по какому адресу в нашем сторе будут храниться все необходимые закешерованные данные
 когда я буду работать с апишкой
 
 baseQuery это еще один параметр в который передаю спецфункцию
 
 baseUrl это всё базовый url с помощью которого будет конкатенироваться уже полный end point по которому я буду делать запрос.
 Пример: Request URL: https://api.github.com/search/users?q=vladilen
 
 endponts это функция которая принимается в себя параметр build и она должна вернуть объект
  в котором я буду перечислять все необходимые мне endpoints. С помощью build я формирую запросы.
  У build есть два метода это query и mutation.  query выполняется для запроса и получения данных,
  а mutation для того что бы эти данные изменять
 */

/* build.query<IUser[], string>  IUser[] первый дженерик указывает на то что какого типа должны прилететь данные с сервера,
а второй параметр указывает на то каким параметром я хочу принимать для того что бы осуществить запрос*/
