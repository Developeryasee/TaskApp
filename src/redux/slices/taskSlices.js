import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import taskService from "../../services/taskService";


let initialState={
    loading:'Idle',
    tasklist:[],
    userdata:{},
}

export const fetchAllTasks=createAsyncThunk('task/fetchAllTasks',async()=>{
    let response = await taskService.getAllTask();
    
    return response.data;
})

const taskSlices = createSlice({
    name:'task',
    initialState,
    reducers:{
        insertnewTask:(state,action)=>{
            
            state.tasklist.push(action.payload);
        },
        updateTaskByID: (state, action) => {
            const { id, updatedTask } = action.payload;
            const index = state.tasklist.findIndex(task => task._id === id);
            if (index !== -1) {
                state.tasklist[index] = { ...state.tasklist[index], ...updatedTask };
            }
        },
        deleteTaskByID: (state, action) => {
            state.tasklist = state.tasklist.filter(task => task._id !== action.payload);
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchAllTasks.pending,(state,action)=>{
            state.loading = 'loading'
        }),
        builder.addCase(fetchAllTasks.fulfilled,(state,action)=>{
            state.tasklist = action.payload.tasks
            state.userdata = action.payload.user
            state.loading = 'succeeded'
        }),
        builder.addCase(fetchAllTasks.rejected,(state,action)=>{
            state.tasklist=[]
            state.loading='failed'
        })
    }
})
export const {insertnewTask,updateTaskByID,deleteTaskByID}=taskSlices.actions;
export default taskSlices.reducer;