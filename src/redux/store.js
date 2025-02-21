import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/taskSlices"


const store = configureStore({
    reducer:{
        task:taskReducer
    }
})

export default store;