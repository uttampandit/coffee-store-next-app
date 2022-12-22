import axios from "axios";
import { getUnsplashPhotos } from "./get-photos";

export const getCoffeeStore = async (
  long = 28.74866467846766,
  lat = 77.04733444406916
) => {
  const options = {
    method: "GET",
    url: "https://api.foursquare.com/v3/places/search",
    params: {
      query: "coffee-shop",
      ll: `${long},${lat}`,
    },
    headers: {
      accept: "application/json",
      Authorization: process.env.FOURSQUARE_AUTHORIZATION_KEY,
    },
  };
  const { data } = await axios.request(options);
  const photos = await getUnsplashPhotos();
  console.log(data.results);
  let coffeestore = data.results.map((store, index) => {
    return {
      id: store.fsq_id,
      name: store.name,
      address: store.location.address,
      neighborhood:
        (store.neighbourhood &&
          store.neighbourhood.length > 0 &&
          store.neighbourhood[0]) ||
        store.location.cross_street ||
        "",
      imgUrl: photos[index],
    };
  });
  return coffeestore;
};
