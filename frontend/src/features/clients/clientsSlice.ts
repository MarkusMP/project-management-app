import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IClient, IClientsState, ICreateClient } from "./clientsInterface";
import clientsService from "./clientsService";

const initialState: IClientsState = {
  errorMessage: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  clients: [],
  client: null,
};

export const createClient = createAsyncThunk(
  "clients/createClient",
  async (data: ICreateClient, thunkAPI) => {
    try {
      return await clientsService.createClient(data);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getClients = createAsyncThunk(
  "clients/getClients",
  async (_, thunkAPI) => {
    try {
      return await clientsService.getClients();
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getClient = createAsyncThunk(
  "clients/getClient",
  async (id: string, thunkAPI) => {
    try {
      return await clientsService.getClient(id);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteClient = createAsyncThunk(
  "clients/deleteClient",
  async (id: string, thunkAPI) => {
    try {
      return await clientsService.deleteClient(id);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    reset: (state: IClientsState) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createClient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        createClient.fulfilled,
        (state, action: PayloadAction<IClient>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.clients.unshift(action.payload);
        }
      )
      .addCase(createClient.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = payload;
      })
      .addCase(getClients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getClients.fulfilled,
        (state, action: PayloadAction<IClient[]>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.clients = action.payload;
        }
      )
      .addCase(getClients.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = payload;
      })
      .addCase(deleteClient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        deleteClient.fulfilled,
        (state, action: PayloadAction<{ message: string; id: string }>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.message = action.payload.message;
          state.clients = state.clients.filter(
            (client) => client.id !== action.payload.id
          );
        }
      )
      .addCase(deleteClient.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = payload;
      })
      .addCase(getClient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClient.fulfilled, (state, action: PayloadAction<IClient>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.client = action.payload;
      })
      .addCase(getClient.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = payload;
      });
  },
});

export const { reset } = clientsSlice.actions;
export default clientsSlice.reducer;
