import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      if (typeof action.payload === "function") {
        state.tasks = action.payload(state.tasks);
      } else {
        state.tasks = action.payload;
      }
    },
    updateTaskStatusInStore: (state, action) => {
      const { id, status } = action.payload;
      const task = state.tasks.find((task) => task._id === id);
      if (task) task.status = status;
    },
  },
});

export const { setTasks, updateTaskStatusInStore } = taskSlice.actions;
export default taskSlice.reducer;
