import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
  location: [number, number];
}

interface UserState {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
}
// initialiser le state d'users vide
const initialState: UserState = {
  users: [],
  status: "idle",
};
// API URL 
const apiUrl = process.env.REACT_APP_API_URL;
// Fetch tous les users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(`${apiUrl}/users`);
  return response.data;
});
//  ajouter nouveau user
export const addUser = createAsyncThunk(
  "users/new",
  async (user: {
    name: string;
    email: string;
    latitude: number;
    longitude: number;
  }) => {
    const response = await axios.post(`${apiUrl}/users`, user);
    return response.data;
  }
);
// modifier existing user
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (user: {
    _id: string;
    name: string;
    email: string;
    latitude: number;
    longitude: number;
  }) => {
    const response = await axios.put(`${apiUrl}/users/${user._id}`, {
      name: user.name,
      email: user.email,
      latitude: user.latitude,
      longitude: user.longitude,
    });
    return response.data;
  }
);
// Fetch tous les users
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedUser = action.payload;
        const index = state.users.findIndex(
          (user) => user._id === updatedUser._id
        );
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      })
      .addCase(updateUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default userSlice.reducer;
