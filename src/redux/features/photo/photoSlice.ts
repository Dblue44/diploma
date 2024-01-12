import {createSlice} from "@reduxjs/toolkit";

type InitialStateType = {
    userId: number | null
}


const initialState: InitialStateType = {
    userId: null
};

const photoSlice = createSlice({
    name: "photo",
    initialState,
    reducers: {
    },
});
export default photoSlice.reducer;