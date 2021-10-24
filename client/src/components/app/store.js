import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./../../features/counter/counterSlice";

// Create a Redux Store​
// This creates a Redux store, and also automatically configure the
// Redux DevTools extension so that you can inspect the store while developing.
export const store = configureStore({
  // Here we add the imported counterReducer-function to our store.
  // By defining a field inside the reducer parameter, we tell the store
  // to use this slice reducer function to handle all updates to that state.
  reducer: {
    counter: counterReducer,
  },
});
