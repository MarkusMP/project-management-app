import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import clientsSlice from "../features/clients/clientsSlice";
import projectsSlice from "../features/projects/projectsSlice";

export const rootReducer = combineReducers({
  clients: clientsSlice,
  projects: projectsSlice,
});

export const store = configureStore({
  reducer: {
    clients: clientsSlice,
    projects: projectsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
