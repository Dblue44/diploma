import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type UserState = {
    userId: number | null;
    theme: boolean;
    lang: boolean;
}

const initialState: UserState = {
    userId: null,
    theme: true,
    lang: true,
};

const userReducer = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateTheme(state, action: PayloadAction<boolean>) {
            state.theme = action.payload
        }
    },
});
export const {updateTheme} = userReducer.actions;
export default userReducer.reducer;
