import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type UserState = {
    userId: number | null;
    theme: boolean;
    lang: boolean;
    loadPhoto: boolean;
}

const initialState: UserState = {
    userId: null,
    theme: true,
    lang: true,
    loadPhoto: false,
};

const userReducer = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateTheme(state, action: PayloadAction<boolean>) {
            state.theme = action.payload
        },
        updateLoadPhoto(state, action: PayloadAction<boolean>) {
            state.loadPhoto = action.payload
        },
    },
});
export const {updateTheme, updateLoadPhoto} = userReducer.actions;
export default userReducer.reducer;
