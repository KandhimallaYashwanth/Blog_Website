import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: false,
  theme: 'light',
  loading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    closeSidebar: (state) => {
      state.sidebarOpen = false;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { toggleSidebar, closeSidebar, toggleTheme, setLoading } = uiSlice.actions;
export default uiSlice.reducer;

