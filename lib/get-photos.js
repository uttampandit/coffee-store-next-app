import { createApi } from "unsplash-js";
import nodeFetch from "node-fetch";

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  fetch: nodeFetch,
});

export const getUnsplashPhotos = async () => {
  const result = await unsplash.search.getPhotos({
    query: "coffee-store",
    perPage: 30,
  });

  let photos = result.response.results.map((photo) => {
    return photo.urls.small;
  });
  console.log(photos.length);
  return photos;
};
