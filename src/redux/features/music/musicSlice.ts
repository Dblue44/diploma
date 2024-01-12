import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type Music = {
    userId: number;
    isLoading: boolean;
}

const initialState: Music = {
    userId: 0,
    isLoading: false,
};

const musicSlice = createSlice({
    name: "music",
    initialState,
    reducers: {
        updateLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        }
    },
});
export default musicSlice.reducer;