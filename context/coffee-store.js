import { createContext, useReducer } from "react";

export const CoffeeContext = createContext(null);

export const action_type = {
  SET_LATLONG: "SET_LATLONG",
  SET_COFFEE_STORE: "SET_COFFEE_STORE",
};

const reducer = (state, action) => {
  if (action.type === action_type.SET_LATLONG) {
    return {
      ...state,
      latLong: action.payload.latLang,
    };
  } else if (action.type === action_type.SET_COFFEE_STORE) {
    return {
      ...state,
      coffeeStores: action.payload,
    };
  } else {
    throw new Error(`Cannot set state: ${action.type}`);
  }
};

const ContextProvider = ({ children }) => {
  const initialState = {
    latLong: "",
    coffeeStores: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CoffeeContext.Provider value={{ state, dispatch }}>
      {children}
    </CoffeeContext.Provider>
  );
};

export default ContextProvider;
