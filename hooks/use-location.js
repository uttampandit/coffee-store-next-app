import { useContext, useState } from "react";
import { action_type, CoffeeContext } from "../context/coffee-store";
const useLocation = () => {
  const { dispatch } = useContext(CoffeeContext);

  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    dispatch({
      type: action_type.SET_LATLONG,
      payload: {
        latLang: `${latitude},${longitude}`,
      },
    });
    setErrorMsg("");
    setIsLoading(false);
  }

  function error() {
    setErrorMsg("Unable to retrieve your location");
    setIsLoading(false);
  }
  const getLocation = () => {
    setIsLoading(true);
    if (!navigator.geolocation) {
      setErrorMsg("Geolocation is not supported by your browser");
      setIsLoading(false);
    } else {
      // status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };
  return {
    errorMsg,
    getLocation,
    isLoading,
  };
};
export default useLocation;
