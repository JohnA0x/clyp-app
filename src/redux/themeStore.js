import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import themeReducer from "../redux/themeReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeo = createStore(
  combineReducers({ themeReducer }),
  applyMiddleware(thunk)
);

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, themeReducer);

export const store = createStore(
  combineReducers({ persistedReducer }),
  applyMiddleware(thunk)
);
export const persistor = persistStore(store);
