import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout, setCredentials } from '../features/userSlice';


const baseQuery = fetchBaseQuery({
    baseUrl:`${process.env.REACT_APP_DOMAIN}/api`,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.accessToken;
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  });
  
  const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
  
    if (result.error && result.error.status === 403) {
      const refreshResult = await baseQuery('/users/refresh', api, extraOptions);
      if (refreshResult.data) {
        const { accessToken } = refreshResult.data;
        api.dispatch(setCredentials({ user: api.getState().user.user, accessToken }));
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    }
    return result;
  };

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}), 
});

export default apiSlice;
