import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const apiGetAllContacts = createAsyncThunk(
  "contacts/getAll",
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get(
        "https://66d06abc181d059277de845b.mockapi.io/contacts"
      );
      console.log("data:", data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiDeleteContact = createAsyncThunk(
  "contacts/delete",
  async (contactId, thunkApi) => {
    try {
      const { data } = await axios.delete(
        `https://66d06abc181d059277de845b.mockapi.io/contacts/${contactId}`
      );
      console.log("data:", data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const apiAddContact = createAsyncThunk(
  "contacts/add",
  async (contact, thunkApi) => {
    try {
      const { data } = await axios.post(
        `https://66d06abc181d059277de845b.mockapi.io/contacts`,
        contact
      );
      console.log("data:", data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const INITIAL_STATE = {
  contacts: [],
  isLoading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "contacts",
  initialState: INITIAL_STATE,
  reducers: {
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    setContact: (state, action) => {
      state.contacts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(apiGetAllContacts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiGetAllContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload;
      })
      .addCase(apiGetAllContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(apiDeleteContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiDeleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.payload.id
        );
      })
      .addCase(apiDeleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(apiAddContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiAddContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts.push(action.payload);
      })
      .addCase(apiAddContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const contactsReducer = profileSlice.reducer;
export const { addContact, setContact } = profileSlice.actions;
