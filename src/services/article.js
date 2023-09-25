import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://article-extractor-and-summarizer.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", import.meta.env.VITE_RapidAPI_Key);
      headers.set("X-RapidAPI-Host", import.meta.env.VITE_RapidAPI_Host);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (params) => `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
    }),
  }),
});

// loads on demand, not on first load
export const { useLazyGetSummaryQuery } = articleApi;
