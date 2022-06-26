import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  ICreateProject,
  IProject,
  IProjectsState,
  IUpdateProject,
} from "./projectsInterface";
import projectsService from "./projectsService";

const initialState: IProjectsState = {
  errorMessage: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  projects: [],
  project: null,
};

export const getProjects = createAsyncThunk(
  "projects/getProjects",
  async (_, thunkAPI) => {
    try {
      return await projectsService.getProjects();
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getProject = createAsyncThunk(
  "projects/getProject",
  async (id: string, thunkAPI) => {
    try {
      return await projectsService.getProject(id);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (data: ICreateProject, thunkAPI) => {
    try {
      return await projectsService.createProject(data);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (id: string, thunkAPI) => {
    try {
      return await projectsService.deleteProject(id);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async (data: IUpdateProject, thunkAPI) => {
    try {
      return await projectsService.updateProject(data);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    reset: (state: IProjectsState) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getProjects.fulfilled,
        (state, action: PayloadAction<IProject[]>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.projects = action.payload;
        }
      )
      .addCase(getProjects.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = payload;
      })
      .addCase(createProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        createProject.fulfilled,
        (state, action: PayloadAction<IProject>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.projects.unshift(action.payload);
        }
      )
      .addCase(createProject.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = payload;
      })
      .addCase(getProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getProject.fulfilled,
        (state, action: PayloadAction<IProject>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.project = action.payload;
        }
      )
      .addCase(getProject.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = payload;
      })
      .addCase(deleteProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        deleteProject.fulfilled,
        (state, action: PayloadAction<{ message: string }>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.project = null;
          state.message = action.payload.message;
        }
      )
      .addCase(deleteProject.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = payload;
      })
      .addCase(updateProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateProject.fulfilled,
        (state, action: PayloadAction<IProject>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.project = action.payload;
        }
      )
      .addCase(updateProject.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = payload;
      });
  },
});

export const { reset } = projectsSlice.actions;
export default projectsSlice.reducer;
