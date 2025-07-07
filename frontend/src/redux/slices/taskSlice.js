import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      if (action.payload) {
        state.tasks = action.payload;
      }
    },
  },
});

export const { setTasks } = taskSlice.actions;
export default taskSlice.reducer;
