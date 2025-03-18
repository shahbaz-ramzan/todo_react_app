import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskList: { backlog: [], todo: [], inprogress: [], done: [], closed: [] },
  categoryList:[],
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.taskList = action.payload || { backlog: [], todo: [], inprogress: [], done: [], closed: [] };
    },
    setCategoryList: (state, action) => {
      state.categoryList = action.payload || [];
    },
  },
});

// Action creators
export const { setTasks ,setCategoryList} = taskSlice.actions;

export default taskSlice.reducer;
