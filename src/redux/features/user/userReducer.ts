import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type UserState = {
    userId: number | null;
    theme: boolean;
    lang: boolean;
    loadPhoto: boolean;
    isListen: boolean;
    isPlay: boolean;
}

const initialState: UserState = {
    userId: null,
    theme: true,
    lang: true,
    loadPhoto: false,
    isListen: false,
    isPlay: false
};

const userReducer = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateTheme(state, action: PayloadAction<boolean>) {
            state.theme = action.payload;
        },
        updateLoadPhoto(state, action: PayloadAction<boolean>) {
            state.loadPhoto = action.payload;
        },
        updateListenState(state, action: PayloadAction<boolean>){
            state.isListen = action.payload;
            state.isPlay = action.payload;
        },
        updatePlayState(state) {
            state.isPlay = !state.isPlay;
        }
    },
});
export const {updateTheme, updateLoadPhoto, updateListenState, updatePlayState} = userReducer.actions;
export default userReducer.reducer;
